const axios = require('axios');
const { sendRequestToService } = require('./eureka.js');
module.exports = class ChambreService {
  static async getChambre(id) {
    if (!id) throw new Error('id is required');
    const response = await sendRequestToService('CHAMBRE-SERVICE', `/chambres/${id}`);
    return response.data.data.chambre;
  }

  static async getAllChambres() {
    const response = await sendRequestToService('CHAMBRE-SERVICE', '/chambres');
    return response.data.data.chambres;
  }
};
