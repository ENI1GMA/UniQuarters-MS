const axios = require('axios');

module.exports = class ChambreService {
  static async getChambre(id) {
    if (!id) throw new Error('id is required');
    const response = await axios.get(`${process.env.API_CHAMBRE_ENDPOINT}/${id}`);
    return response.data.data.chambre;
  }
};
