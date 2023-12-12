FROM openjdk:21-jdk
LABEL authors="khoui"
EXPOSE 8085
ADD target/chambre-ms-0.0.1-SNAPSHOT.jar EnigmaChambreServiceDocker.jar
ENTRYPOINT ["java","-jar","EnigmaChambreServiceDocker.jar"]