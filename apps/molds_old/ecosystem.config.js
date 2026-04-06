module.exports = {
  apps: [{
    name: 'moldstud.com',
    script: 'PORT=4000 npm run start',
    env: {
      NODE_ENV: 'production',
      PORT: 4000,
    },
    error_file: '/dev/null',
    out_file: '/dev/null',
    max_memory_restart: '1G',
    cron_restart: '0 4 * * *',
    min_uptime: '15s',
    max_restarts: 20,
  }, {
    name: 'cron.moldstud.com',
    cwd: './cron',
    script: 'npm run start',
    env: {
      NODE_ENV: 'production',
    },
    error_file: '/dev/null',
    out_file: '/dev/null',
    max_memory_restart: '100M',
  }],
};
