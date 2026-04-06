'use client';

import Script from 'next/script';
import {useEffect} from 'react';

declare global {
  interface Window {
    Chart?: unknown;
    RewriteGenInit?: (root?: ParentNode) => void;
  }
}

function tryInit() {
  if (typeof window === 'undefined') {
    return false;
  }

  if (!window.Chart || typeof window.RewriteGenInit !== 'function') {
    return false;
  }

  window.RewriteGenInit(document);

  return true;
}

export default function RewritegenRuntime() {
  useEffect(() => {
    if (tryInit()) {
      return;
    }

    const interval = window.setInterval(() => {
      if (tryInit()) {
        window.clearInterval(interval);
      }
    }, 250);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      <Script
        src="/vendor/chart.umd.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/rewritegen/rewritegen.blocks.js"
        strategy="afterInteractive"
        onReady={() => {
          tryInit();
        }}
      />
    </>
  );
}
