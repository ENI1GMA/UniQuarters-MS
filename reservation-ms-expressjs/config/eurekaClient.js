// eureka-config.js

const Eureka = require('eureka-js-client').Eureka;

const eurekaConfig = {
  instance: {
    app: 'RESERVATION-SERVICE-EXPRESSJS', // Replace with your service name
    hostName: process.env.EUREKA_CLIENT_HOST,
    ipAddr: '127.0.0.1', // for check
    statusPageUrl: `http://${process.env.EUREKA_CLIENT_HOST}:${process.env.PORT}/info`,
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
  },
};

const eurekaClient = new Eureka(eurekaConfig);

module.exports = eurekaClient;
