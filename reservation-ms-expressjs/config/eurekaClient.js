// eureka-config.js

const Eureka = require('eureka-js-client').Eureka;

const eurekaConfig = {
  instance: {
    app: 'RESERVATION-SERVICE-EXPRESSJS', // Replace with your service name
    hostName: process.env.APP_HOST,
    ipAddr: process.env.APP_IP_ADRESS, // for check
    statusPageUrl: `http://${process.env.APP_HOST}:${process.env.PORT}/info`,
    port: {
      $: process.env.PORT,
      '@enabled': 'true',
    },
    vipAddress: 'RESERVATION-SERVICE-EXPRESSJS', // Replace with your service name
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: process.env.EUREKA_CLIENT_HOST,
    port: 8761,
    servicePath: '/eureka/apps/',
    maxRetries: 100,
    requestRetryDelay: 10000,
  },
};

const eurekaClient = new Eureka(eurekaConfig);

module.exports = eurekaClient;
