(function(){
  'use strict';

  function resolvePageSlug(root){
    var scope = root || document;
    var metaEl = scope.querySelector('#runMeta') || document.getElementById('runMeta');
    if (!metaEl) return '';
    try {
      var meta = JSON.parse(metaEl.textContent || '{}');
      return (meta.slug || '').toString();
    } catch(e) {
      return '';
    }
  }

  function initDecisionSimulatorForSection(_section){
      const section = _section;
      if(!section) return;
      if(section.dataset.dsBootstrapped) return; section.dataset.dsBootstrapped = "1";
      if (section.getAttribute("data-initialized") === "1") return;
      section.setAttribute("data-initialized", "1");
      const modelEl = section.querySelector("#rg-decision-simulator-model");
      if(!modelEl){ console.warn("decision_simulator:no_model_el"); return; }
      let model = {};
      try { model = JSON.parse(modelEl ? modelEl.textContent : "{}"); }
      catch(e) {
        console.warn("decision_simulator:model_parse_fail", e, (modelEl && modelEl.textContent ? modelEl.textContent.slice(0,120) : "no-model"));
        return;
      }
      const inputs = Object.assign({}, model.inputs || {});
      const scales = Object.assign({}, model.scales || {});
      const inputEls = section.querySelectorAll("[data-ds-input]");
      function clamp(v,min,max){ return Math.max(min, Math.min(max, v)); }
      function labelForKey(key){ return String(key || "").replace(/_/g, " "); }
      function scaleValue(key, val){
        const meta = inputs[key] || {};
        if(key === "team_size"){
          const num = parseFloat(val);
          if(!isFinite(num)) return 0;
          if(num <= 3) return 0;
          if(num <= 7) return 0.33;
          if(num <= 12) return 0.66;
          return 1;
        }
        if(key === "state_complexity"){
          if(val === "Low") return 0;
          if(val === "Medium") return 0.5;
          if(val === "High") return 1;
        }
        if(key === "risk_weight"){
          const num = parseFloat(val);
          if(!isFinite(num)) return 0;
          return clamp(num / 3, 0, 1);
        }
        if(meta.enum){
          const mapping = (scales[key] && typeof scales[key] === "object") ? scales[key] : (scales.state_complexity || {});
          if(mapping && Object.prototype.hasOwnProperty.call(mapping, val)){ return parseFloat(mapping[val]); }
          if(Array.isArray(meta.enum)){ const idx = meta.enum.indexOf(val); return idx >= 0 ? idx / Math.max(1, meta.enum.length - 1) : 0; }
        }
        if(meta.type === "bool"){
          const mapping = (scales.bool && typeof scales.bool === "object") ? scales.bool : {"false":0,"true":1};
          const keyVal = (val === true || String(val).toLowerCase() === "true") ? "true" : "false";
          if(Object.prototype.hasOwnProperty.call(mapping, keyVal)){ return parseFloat(mapping[keyVal]); }
          return val ? 1 : 0;
        }
        let num = parseFloat(val);
        if(isNaN(num)) num = 0;
        if(meta.min != null && meta.max != null && meta.max !== meta.min){
          num = (num - meta.min) / (meta.max - meta.min);
          return clamp(num, 0, 1);
        }
        return num;
      }
      function readInputs(){
        const out = {};
        inputEls.forEach(el => {
          const k = el.getAttribute("data-ds-input");
          if(!k) return;
          if(el.type === "checkbox"){ out[k] = el.checked; }
          else if(el.tagName === "SELECT"){ out[k] = el.value; }
          else { out[k] = parseFloat(el.value); }
        });
        return out;
      }
      function applyDefaults(){
        inputEls.forEach(el => {
          const k = el.getAttribute("data-ds-input");
          const meta = inputs[k] || {};
          if(el.type === "checkbox"){ el.checked = !!meta.default; }
          else if(el.tagName === "SELECT"){ el.value = meta.default || el.options[0].value; }
          else { el.value = meta.default != null ? meta.default : (meta.min || 0); }
        });
      }
      function scoreAndBreakdown(opt, inVals){
        let score = opt.base_score || 0;
        const w = opt.weights || {};
        const contribs = [];
        let total = 0;
        for(const key in w){
          const weight = parseFloat(w[key] || 0);
          if(!isFinite(weight)) continue;
          const val = scaleValue(key, inVals[key]);
          if(!isFinite(val)) continue;
          const delta = weight * val;
          total += delta;
          contribs.push({ key, label: labelForKey(key), delta });
        }
        contribs.sort((a,b)=>Math.abs(b.delta)-Math.abs(a.delta));
        score = clamp((score + total), 0, 100);
        return { score: Math.round(score), breakdown: contribs.slice(0,5) };
      }
      function renderScores(inVals){
        const container = section.querySelector("[data-ds-table]");
        if(!container) return;
        const rows = [];
        const optMap = [];
        (model.scenarios||[]).forEach(scen => {
          (scen.options||[]).forEach(opt => {
            const res = scoreAndBreakdown(opt, inVals);
            const score = res.score;
            rows.push({ scenario: scen.title || scen.id, option: opt.label || opt.id, score });
            optMap.push({ scenario: scen, option: opt, score });
            opt.__score = score;
            opt.__breakdown = res.breakdown;
          });
        });
        rows.sort((a,b)=>b.score-a.score);
        optMap.sort((a,b)=>b.score-a.score);
        const top = optMap[0];
        const recEl = section.querySelector("[data-ds-recommend]");
        if(recEl && top){ recEl.textContent = `Recommended: ${top.option.label || top.option.id} (score ${top.score})`; }
        let html = "<table class=\"rg-table mini\"><thead><tr><th>Scenario</th><th>Option</th><th>Score</th></tr></thead><tbody>";
        rows.forEach(r => { html += `<tr><td>${r.scenario}</td><td>${r.option}</td><td><div class=\"score\"><div class=\"bar\"><i style=\"width:${r.score}%\"></i></div><span class=\"num\">${r.score}</span></div></td></tr>`; });
        html += "</tbody></table>";
        container.innerHTML = html;
        return {rows, top};
      }
      function matchCond(key, expected, inVals){
        const actual = inVals[key];
        if(typeof expected === "boolean"){ return (actual === true || String(actual).toLowerCase() === "true") === expected; }
        if(typeof expected === "number"){ return parseFloat(actual) === expected; }
        return String(actual) === String(expected);
      }
      function evalTriggers(triggers, inVals){
        const addWhy = []; const addSteps = []; const addGuards = [];
        (triggers || []).forEach(tr => {
          if(!tr || typeof tr !== "object") return;
          const cond = tr["if"];
          if(!cond || typeof cond !== "object") return;
          let match = true;
          for(const key in cond){ if(!matchCond(key, cond[key], inVals)){ match = false; break; } }
          if(!match) return;
          if(Array.isArray(tr.add_why)) addWhy.push(...tr.add_why);
          if(Array.isArray(tr.add_next_step)) addSteps.push(...tr.add_next_step);
          if(Array.isArray(tr.add_guardrail)) addGuards.push(...tr.add_guardrail);
        });
        return { addWhy, addSteps, addGuards };
      }
      function renderList(target, items, header){
        if(!target) return;
        target.innerHTML = "";
        if(header){ const li = document.createElement("li"); li.textContent = header; target.appendChild(li); }
        items.forEach(text => { const li = document.createElement("li"); li.textContent = text; target.appendChild(li); });
      }
      function updateDetails(top, inVals){
        const whyEl = section.querySelector("[data-ds-why]");
        const planEl = section.querySelector("[data-ds-plan]");
        const guardEl = section.querySelector("[data-ds-guardrails]");
        const whyList = whyEl ? whyEl.querySelector("ul") : null;
        const planList = planEl ? planEl.querySelector("ul") : null;
        const guardList = guardEl ? guardEl.querySelector("ul") : null;
        const baseWhy = top && top.option && Array.isArray(top.option.why) ? top.option.why.slice() : [];
        const baseSteps = top && top.option && Array.isArray(top.option.next_steps) ? top.option.next_steps.slice() : [];
        const baseGuards = top && top.option && Array.isArray(top.option.guardrails) ? top.option.guardrails.slice() : [];
        const trig = evalTriggers(top && top.scenario ? top.scenario.triggers : [], inVals || {});
        const why = baseWhy.concat(trig.addWhy);
        const steps = baseSteps.concat(trig.addSteps);
        const guards = baseGuards.concat(trig.addGuards);
        const breakdown = top && top.option && Array.isArray(top.option.__breakdown) ? top.option.__breakdown.slice(0,3) : [];
        const driverLines = breakdown.map(entry => {
          const sign = entry.delta >= 0 ? "+" : "";
          const delta = isFinite(entry.delta) ? entry.delta.toFixed(1) : "0.0";
          return `${entry.label}: ${sign}${delta}`;
        });
        if(driverLines.length){ why.push("Score drivers:"); why.push(...driverLines); }
        renderList(whyList, why);
        renderList(planList, steps);
        renderList(guardList, guards);
        if(whyEl){ whyEl.style.display = why.length ? "" : "none"; }
        if(planEl){ planEl.style.display = steps.length ? "" : "none"; }
        if(guardEl){ guardEl.style.display = guards.length ? "" : "none"; }
      }
      function currentResult(){
        const inputsNow = readInputs();
        const scores = renderScores(inputsNow);
        if(scores && scores.top){ updateDetails(scores.top, inputsNow); }
        return { inputs: inputsNow, scores: scores ? scores.rows : [], recommended: scores ? scores.top : null };
      }
      function wireActions(){
        inputEls.forEach(el => el.addEventListener("input", () => currentResult()));
        const btnReset = section.querySelector("[data-ds-action='reset']");
        if(btnReset){ btnReset.addEventListener("click", () => { applyDefaults(); currentResult(); }); }
        const btnCopy = section.querySelector("[data-ds-action='copy']");
        if(btnCopy){ btnCopy.addEventListener("click", () => {
          const res = currentResult();
          const text = JSON.stringify(res, null, 2);
          if(navigator.clipboard){ navigator.clipboard.writeText(text).catch(()=>{}); } else {
            const ta = document.createElement("textarea"); ta.value=text; section.appendChild(ta); ta.select(); try{ document.execCommand("copy"); }catch(e){} ta.remove();
          }
        }); }
      }
      applyDefaults();
      renderScores(readInputs());
      wireActions();
  }

  function initDecisionSimulator(root){
    var scope = root || document;
    var sections = scope.querySelectorAll("section[data-kind='decision-simulator']");
    if (!sections.length) return;
    sections.forEach(function(section){
      initDecisionSimulatorForSection(section);
    });
  }

  function initCharts(root){
    var scope = root || document;
    var PAGE_SLUG = resolvePageSlug(scope);
    var SHAPE_TO_VARIANTS = {"trend": ["line_basic", "line_area", "line_stepped", "line_multi"], "compare": ["bar_grouped", "bar_stacked", "bar_hbar", "bar_hbar_stacked"], "composition": ["doughnut", "pie", "polar"], "relationship": ["scatter", "bubble"], "mixed": ["mixed_bar_line"]};
    var styleRoot = document.querySelector(".rg-article-body") || document.documentElement;
    function cssVar(name, fallback){
      try{
        var v = getComputedStyle(styleRoot).getPropertyValue(name);
        v = (v||"").trim();
        return v || fallback;
      }catch(e){ return fallback; }
    }
    function deepMerge(target, source){
      if (Array.isArray(source)) return source.slice();
      if (source && typeof source === "object"){
        var out = target && typeof target === "object" ? Object.assign({}, target) : {};
        Object.keys(source).forEach(function(k){ out[k] = deepMerge(out[k], source[k]); });
        return out;
      }
      return source;
    }
    function hashStr(str){
      var h = 0;
      for (var i=0;i<str.length;i++){ h = ((h<<5)-h) + str.charCodeAt(i); h |= 0; }
      return h >>> 0;
    }
    function attachAutoResize(chart, canvas){
      try{ requestAnimationFrame(function(){ chart.resize(); }); }catch(e){}
      if (window.ResizeObserver){
        try{ new ResizeObserver(function(){ try{chart.resize();}catch(e){} }).observe(canvas.parentElement); }catch(e){}
      }
      if (window.IntersectionObserver){
        try{
          var io = new IntersectionObserver(function(entries){
            for (var i=0;i<entries.length;i++){ if(entries[i].isIntersecting){ try{chart.resize();}catch(e){} break; } }
          }, {threshold:0.15});
          io.observe(canvas);
        }catch(e){}
      }
    }
    function pickVariant(slug, chartId, shape, override){
      var variants = SHAPE_TO_VARIANTS[shape] || SHAPE_TO_VARIANTS["trend"];
      if (override && variants.indexOf(override) !== -1) return override;
      var idx = variants.length ? hashStr((slug||"") + ":" + chartId + ":" + shape) % variants.length : 0;
      return variants[Math.max(0, idx)];
    }
    function inferShape(ch){
      if (ch.shape && SHAPE_TO_VARIANTS[ch.shape]) return ch.shape;
      if (Array.isArray(ch.series) && ch.series.length >= 2) return "compare";
      if (Array.isArray(ch.series) && ch.series.length){
        var s0 = ch.series[0];
        if (s0 && Array.isArray(s0.values)){
          var hasObj = s0.values.some(function(v){ return v && typeof v === "object"; });
          if (hasObj) return "relationship";
        }
      }
      return "trend";
    }
    function buildConfig(ch, variant){
      var labels = Array.isArray(ch.labels) ? ch.labels.slice() : [];
      var series = Array.isArray(ch.series) ? ch.series : [];
      var palette = [
        cssVar("--rg-chart-c1","#2d36ff"), cssVar("--rg-chart-c2","#171726"), cssVar("--rg-chart-c3","#5d68ff"), cssVar("--rg-chart-c4","#cfd5ff"), cssVar("--rg-chart-c5","#24253f"),
        cssVar("--rg-chart-c6","#7b88ff"), cssVar("--rg-chart-c7","#9ca7ff"), cssVar("--rg-chart-c8","#e6e9ff"), cssVar("--rg-chart-c9","#6c6f88"), cssVar("--rg-chart-c10","#9aa1c2")
      ];
      var txt = cssVar("--rg-chart-text","#0f172a");
      var muted = cssVar("--rg-chart-muted","#475569");
      var grid = cssVar("--rg-chart-grid","rgba(148,163,184,.35)");
      var border = cssVar("--rg-chart-border","rgba(148,163,184,.55)");
      try{ Chart.defaults.color = muted; Chart.defaults.borderColor = border; Chart.defaults.font.family = getComputedStyle(document.body).fontFamily || "system-ui"; }catch(e){}
      function toNumber(v){ var n = Number(v); return isFinite(n)?n:0; }
      function buildStandard(){
        var out = [];
        series.forEach(function(s, idx){
          if (!s || typeof s !== "object") return;
          var vals = Array.isArray(s.values) ? s.values : [];
          var nums = vals.map(toNumber);
          var color = palette[idx % palette.length];
          out.push({ label:(s.name||("Series "+(idx+1))), data: nums, borderColor: color, backgroundColor: color, fill:false, tension:0.2 });
        });
        return out;
      }
      function buildCartesian(asBubble){
        var out = [];
        series.forEach(function(s, idx){
          if (!s || typeof s !== "object") return;
          var vals = Array.isArray(s.values) ? s.values : [];
          var color = palette[idx % palette.length];
          var mapped = vals.map(function(v,i){
            var y = (v && typeof v === "object") ? Number(v.y || v.value || v) : Number(v);
            if (!isFinite(y)) y = 0;
            var r = v && typeof v === "object" && v.r ? Number(v.r) : null;
            if (r === null){ var abs = Math.abs(y); r = 3 + Math.min(12, (abs % 15)); }
            return asBubble ? {x:i+1, y:y, r:r} : {x:i+1, y:y};
          });
          out.push({ label:(s.name||("Series "+(idx+1))), data:mapped, borderColor: color, backgroundColor: color, showLine:!asBubble });
        });
        return out;
      }
      var datasets = buildStandard();
      var baseOpts = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: !!ch.title, text: ch.title || "" },
          subtitle: { display: !!ch.subtitle, text: ch.subtitle || "" },
          legend: { display: true },
          tooltip: { enabled: true }
        },
        interaction: { mode:"index", intersect:false }
      };
      var type = "bar";
      var data = { labels: labels, datasets: datasets };
  switch(variant){
        case "line_area":
          type = "line";
          data.datasets = datasets.map(function(d){ return Object.assign({}, d, {fill:true, tension:0.35}); });
          break;
        case "line_stepped":
          type = "line";
          data.datasets = datasets.map(function(d){ return Object.assign({}, d, {stepped:true, pointRadius:0}); });
          break;
        case "line_multi":
        case "line_basic":
          type = "line";
          break;
        case "bar_grouped":
          type = "bar";
          baseOpts.scales = { y:{ beginAtZero:true } };
          break;
        case "bar_stacked":
          type = "bar";
          baseOpts.scales = { x:{ stacked:true }, y:{ stacked:true, beginAtZero:true } };
          break;
        case "bar_hbar":
          type = "bar";
          baseOpts.indexAxis = "y";
          baseOpts.plugins.legend.display = false;
          baseOpts.scales = { x:{ beginAtZero:true }, y:{} };
          break;
        case "bar_hbar_stacked":
          type = "bar";
          baseOpts.indexAxis = "y";
          baseOpts.scales = { x:{ stacked:true, beginAtZero:true }, y:{ stacked:true } };
          break;
        case "doughnut":
          type = "doughnut";
          baseOpts.plugins.legend.position = "right";
          baseOpts.cutout = "60%";
          break;
        case "pie":
          type = "pie";
          baseOpts.plugins.legend.position = "right";
          break;
        case "polar":
          type = "polarArea";
          baseOpts.plugins.legend.position = "right";
          baseOpts.scales = { r:{ beginAtZero:true } };
          break;
        case "scatter":
          type = "scatter";
          data = { datasets: buildCartesian(false) };
          baseOpts.scales = { x:{ type:"linear", position:"bottom" }, y:{ beginAtZero:true } };
          baseOpts.interaction = { mode:"nearest", intersect:true };
          break;
        case "bubble":
          type = "bubble";
          data = { datasets: buildCartesian(true) };
          baseOpts.scales = { x:{ type:"linear", position:"bottom" }, y:{ beginAtZero:true } };
          baseOpts.interaction = { mode:"nearest", intersect:true };
          break;
        case "mixed_bar_line":
          type = "bar";
          if (datasets.length >= 2){
            var line = Object.assign({}, datasets[1], { type:"line", yAxisID:"y1", tension:0.2, fill:false });
            data.datasets = [ Object.assign({}, datasets[0], { type:"bar" }), line ];
            baseOpts.scales = { y:{ beginAtZero:true }, y1:{ beginAtZero:true, position:"right", grid:{ drawOnChartArea:false } } };
          }
          break;
        default:
          type = "bar";
          baseOpts.scales = { y:{ beginAtZero:true } };
      }
      if (baseOpts.scales){
        if (baseOpts.scales.x){
          baseOpts.scales.x.grid = baseOpts.scales.x.grid || {};
          baseOpts.scales.x.ticks = baseOpts.scales.x.ticks || {};
          baseOpts.scales.x.grid.color = grid;
          baseOpts.scales.x.ticks.color = muted;
          baseOpts.scales.x.border = baseOpts.scales.x.border || {};
          baseOpts.scales.x.border.color = border;
        }
        if (baseOpts.scales.y){
          baseOpts.scales.y.grid = baseOpts.scales.y.grid || {};
          baseOpts.scales.y.ticks = baseOpts.scales.y.ticks || {};
          baseOpts.scales.y.grid.color = grid;
          baseOpts.scales.y.ticks.color = muted;
          baseOpts.scales.y.border = baseOpts.scales.y.border || {};
          baseOpts.scales.y.border.color = border;
        }
        if (baseOpts.scales.r){
          baseOpts.scales.r.grid = baseOpts.scales.r.grid || {};
          baseOpts.scales.r.ticks = baseOpts.scales.r.ticks || {};
          baseOpts.scales.r.grid.color = grid;
          baseOpts.scales.r.ticks.color = muted;
        }
      }
      if (!data.datasets.length) return null;
      return { type:type, data:data, options:baseOpts };
    }
    var payload = {};
    var payloadEl = scope.querySelector("#payloadCharts") || document.getElementById("payloadCharts");
    if (!payloadEl) { console.warn("charts:payload_missing"); return; }
    try { payload = JSON.parse(payloadEl.textContent || "{}"); } catch(e) { console.warn("charts:payload_parse_fail", e); return; }
    if (!window.Chart) { console.warn("charts:Chart_missing"); return; }
    var charts = Array.isArray(payload.charts) ? payload.charts : [];
    if (!charts.length) { console.warn("charts:empty"); return; }
    var usedVariants = new Set();
    charts.forEach(function(ch, idx){
      if (!ch || typeof ch !== "object") return;
      var cid = (ch.id || ("chart_" + (idx+1))).toString().toLowerCase().replace(/[^a-z0-9_]+/g, "_") || "chart";
      var shape = inferShape(ch);
      var variant = pickVariant(PAGE_SLUG, cid, shape, ch.variant);
      if (usedVariants.has(variant)){
        var variantsList = SHAPE_TO_VARIANTS[shape] || SHAPE_TO_VARIANTS["trend"];
        var startIdx = variantsList.indexOf(variant);
        if (startIdx < 0) startIdx = 0;
        for (var k=1; k<variantsList.length; k++){ 
          var cand = variantsList[(startIdx + k) % variantsList.length];
          if (!usedVariants.has(cand)) { variant = cand; break; }
        }
      }
      var cfg = buildConfig(ch, variant);
      if (!cfg || !cfg.data || !cfg.data.datasets || !cfg.data.datasets.length) return;
      usedVariants.add(variant);
      var canvas = scope.querySelector('canvas[data-chart-id="' + cid + '"]') || document.querySelector('canvas[data-chart-id="' + cid + '"]');
    if (canvas && canvas.getAttribute("data-initialized") === "1") return;
      if (!canvas || !canvas.getContext) return;
      try {
      var inst = new Chart(canvas.getContext("2d"), cfg);
      canvas.setAttribute("data-initialized", "1");
      var chartSection = canvas.closest("section[data-kind='chart']");
      if (chartSection) chartSection.setAttribute("data-initialized", "1");
        attachAutoResize(inst, canvas);
      } catch(err){ console.warn("charts:render_fail", cid, err); }
    });
  }

  window.RewriteGenInit = function(root){
    initDecisionSimulator(root || document);
    initCharts(root || document);
  };

  function autoRun(){
    window.RewriteGenInit(document);
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', autoRun);
  } else {
    setTimeout(autoRun, 0);
  }
})();
