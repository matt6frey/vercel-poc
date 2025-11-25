import { dataService } from '../services/dataService.js';

export default async function clinicsRoutes(fastify, options) {
  fastify.get('/clinics', async (request, reply) => {
    try {
      const clinics = dataService.getAllClinics();
      return { success: true, data: clinics };
    } catch (error) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });

  fastify.get('/clinics/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const clinic = dataService.getClinicById(id);

      if (!clinic) {
        return reply.code(404).send({ success: false, error: 'Clinic not found' });
      }

      // Get clinic's appointments
      const appointments = dataService.getAppointmentsByClinicId(id);

      return { success: true, data: { ...clinic, appointments } };
    } catch (error) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });
}
