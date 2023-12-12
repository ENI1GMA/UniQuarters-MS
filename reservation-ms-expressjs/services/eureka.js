// eureka service
const axios = require('axios');
const eurekaClient = require('../config/eurekaClient');

async function sendRequestToService(serviceName, endpoint, method = 'get', data = null) {
  try {
    console.log('Before getInstancesByAppId');
    const instance = await eurekaClient.getInstancesByAppId(serviceName);
    if (instance.length === 0) {
      throw new Error(`No instances available for service: ${serviceName}`);
    }

    const serviceUrl = `http://${instance[0].hostName}:${instance[0].port.$}${endpoint}`;
    console.log('serviceUrl', serviceUrl);
    const response = await axios({
      method,
      url: serviceUrl,
      data,
    });
    console.log('response', response);

    return response;
  } catch (error) {
    console.error('Error sending request:', error.message);
    throw error;
  }
}

module.exports = {
  sendRequestToService,
};
