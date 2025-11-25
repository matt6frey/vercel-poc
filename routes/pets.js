import { dataService } from '../services/dataService.js';

export default async function petsRoutes(fastify, options) {
  fastify.get('/pets', async (request, reply) => {
    try {
      const pets = dataService.getAllPets();
      return { success: true, data: pets };
    } catch (error) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });

  fastify.get('/pets/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const pet = dataService.getPetById(id);

      if (!pet) {
        return reply.code(404).send({ success: false, error: 'Pet not found' });
      }

      // Get pet's appointments
      const appointments = dataService.getAppointmentsByPetId(id);

      return { success: true, data: { ...pet, appointments } };
    } catch (error) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });
}
