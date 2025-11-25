import { dataService } from '../services/dataService.js';

export default async function usersRoutes(fastify, options) {
  fastify.get('/users', async (request, reply) => {
    try {
      const users = dataService.getAllUsers();
      return { success: true, data: users };
    } catch (error) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });

  fastify.get('/users/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const user = dataService.getUserById(id);

      if (!user) {
        return reply.code(404).send({ success: false, error: 'User not found' });
      }

      // Get user's pets
      const pets = dataService.getPetsByUserId(id);

      return { success: true, data: { ...user, pets } };
    } catch (error) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });
}
