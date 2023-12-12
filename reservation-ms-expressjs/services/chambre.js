const axios = require('axios');
const { sendRequestToService } = require('./eureka');
module.exports = class ChambreService {
  static async getChambre(id) {
    if (!id) throw new Error('id is required');
    //const response = await axios.get(`${process.env.API_CHAMBRE_ENDPOINT}/${id}`);
    const response = await sendRequestToService('CHAMBRE-SERVICE', `/chambres/${id}`);
    console.log('🚀 ~ ChambreService ~ getChambre ~ response:', response);
    return response.data.data.chambre;
  }
};