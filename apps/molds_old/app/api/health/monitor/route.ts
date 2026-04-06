export async function GET() {
  const used = process.memoryUsage();

  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    memory: {
      rss: `${Math.round(used.rss / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(used.heapUsed / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(used.heapTotal / 1024 / 1024)} MB`,
      external: `${Math.round(used.external / 1024 / 1024)} MB`,
    },
    uptime: `${Math.floor(process.uptime())} seconds`,
  });
}
