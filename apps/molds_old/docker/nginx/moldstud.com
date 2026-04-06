server {
    server_name moldstud.com www.moldstud.com;

    charset utf-8;

    include /etc/nginx/mime.types;
    default_type  application/octet-stream;
    client_max_body_size 20M;

    gzip on;
    gzip_types text/plain application/xml text/css application/javascript;
    gzip_min_length 1000;

    js_path "/var/www/docker/njs/";
    js_import env.js;
    js_import main from imgproxy.js;
    
    add_header X-Frame-Options              "DENY" always;
    add_header X-Content-Type-Options       "nosniff" always;
    add_header Referrer-Policy              "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy           "camera=(), microphone=(), geolocation=(), payment=()" always;
    add_header Cross-Origin-Opener-Policy   "same-origin" always;
    add_header Cross-Origin-Resource-Policy "same-origin" always;
    add_header Strict-Transport-Security    "max-age=31536000; includeSubDomains; preload" always;

    location ~ ^/uploads {
        js_set $hashed_uri main.hashURL;
        proxy_pass http://128.140.47.16:6000/$hashed_uri;
    }

    location / {
        root /var/www/moldstud.com/.next/static/;

        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header "Connection" "";
        proxy_http_version 1.1;
        proxy_send_timeout 30;
        proxy_read_timeout 30;
        proxy_connect_timeout 30;
        send_timeout 30;
        proxy_pass http://127.0.0.1:4000;
    }

    listen [::]:443 ssl; # managed by Certbot
    listen 443 ssl default_server; # managed by Certbot
    http2 on;
    ssl_certificate /etc/letsencrypt/live/moldstud.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/moldstud.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = moldstud.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    listen [::]:80;

    server_name moldstud.com www.moldstud.com;
    return 404; # managed by Certbot
}
