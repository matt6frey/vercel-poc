import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load data from JSON file
const dataPath = join(__dirname, '../data/data.json');
const rawData = readFileSync(dataPath, 'utf-8');
const data = JSON.parse(rawData);

export const dataService = {
  // Users
  getAllUsers() {
    return data.users;
  },

  getUserById(id) {
    return data.users.find(u => u.id === parseInt(id));
  },

  getPetsByUserId(userId) {
    const userPetIds = data.users_pets
      .filter(up => up.user_id === parseInt(userId))
      .map(up => up.pet_id);

    return data.pets.filter(p => userPetIds.includes(p.id));
  },

  // Pets
  getAllPets() {
    return data.pets.map(pet => {
      const owner = data.users.find(u => u.id === pet.owner_id);
      return {
        ...pet,
        owner_name: owner?.name || null,
        owner_email: owner?.email || null
      };
    });
  },

  getPetById(id) {
    const pet = data.pets.find(p => p.id === parseInt(id));
    if (!pet) return null;

    const owner = data.users.find(u => u.id === pet.owner_id);
    return {
      ...pet,
      owner_name: owner?.name || null,
      owner_email: owner?.email || null
    };
  },

  getAppointmentsByPetId(petId) {
    const appointmentIds = data.pets_appointments
      .filter(pa => pa.pet_id === parseInt(petId))
      .map(pa => pa.appointment_id);

    return data.appointments.filter(a => appointmentIds.includes(a.id));
  },

  // Clinics
  getAllClinics() {
    return data.clinics;
  },

  getClinicById(id) {
    return data.clinics.find(c => c.id === parseInt(id));
  },

  getAppointmentsByClinicId(clinicId) {
    const appointmentIds = data.clinics_appointments
      .filter(ca => ca.clinic_id === parseInt(clinicId))
      .map(ca => ca.appointment_id);

    return data.appointments.filter(a => appointmentIds.includes(a.id));
  }
};
