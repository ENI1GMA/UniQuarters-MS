FROM openjdk:21-jdk
LABEL authors="khoui"
EXPOSE 8081
ADD target/enigma-gateway-0.0.1-SNAPSHOT.jar EnigmaGatewayDocker.jar
ENTRYPOINT ["java","-jar","EnigmaGatewayDocker.jar"]