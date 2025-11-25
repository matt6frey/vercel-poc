export default async function healthCheckRoutes(fastify, options) {
  fastify.get('/health-check', async (request, reply) => {
    return {
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    };
  });
}
