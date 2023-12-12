FROM openjdk:21-jdk
LABEL authors="nassim"
EXPOSE 8085
ADD target/reclamation-service-0-0-1-SNAPSHOT.jar EnigmaReclamationServiceDocker.jar
ENTRYPOINT ["java","-jar","EnigmaReclamationServiceDocker.jar"]