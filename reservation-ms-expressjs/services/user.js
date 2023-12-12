const axios = require('axios');
module.exports = class UserService {
  static async getUser(id, bearerToken) {
    console.log('bearerToken', bearerToken);
    if (!id) throw new Error('id is required');
    const response = await axios.get(`${process.env.API_USER_ENDPOINT}/${id}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return response.data;
  }
};
