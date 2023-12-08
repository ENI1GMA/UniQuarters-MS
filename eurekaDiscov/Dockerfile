FROM openjdk:21-jdk
LABEL authors="khoui"
EXPOSE 8761
ADD target/eurekaDiscov-0.0.1-SNAPSHOT.jar EnigmaEurekaDiscovDocker.jar
ENTRYPOINT ["java","-jar","EnigmaEurekaDiscovDocker.jar"]