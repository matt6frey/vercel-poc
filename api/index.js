import Fastify from 'fastify';
import usersRoutes from '../routes/users.js';
import petsRoutes from '../routes/pets.js';
import clinicsRoutes from '../routes/clinics.js';
import healthCheckRoutes from '../routes/health-check.js';

const fastify = Fastify({
  logger: true
});

// Register routes
fastify.register(usersRoutes);
fastify.register(petsRoutes);
fastify.register(clinicsRoutes);
fastify.register(healthCheckRoutes);

// Root endpoint
fastify.get('/', async (request, reply) => {
  return {
    success: true,
    message: 'Welcome to the Veterinary API',
    endpoints: {
      users: '/users',
      pets: '/pets',
      clinics: '/clinics',
      healthCheck: '/health-check'
    }
  };
});

// For Vercel serverless function
export default async function handler(req, res) {
  await fastify.ready();
  fastify.server.emit('request', req, res);
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  const start = async () => {
    try {
      await fastify.listen({ port: 3000, host: '0.0.0.0' });
      console.log('Server listening on http://localhost:3000');
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };

  start();
}
