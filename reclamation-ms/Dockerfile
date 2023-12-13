FROM openjdk:21-jdk
LABEL authors="nassim"
EXPOSE 8086
ADD target/reclamation-service-0.0.1-SNAPSHOT.jar EnigmaReclamation-ms.jar
ENTRYPOINT ["java","-jar","EnigmaReclamation-ms.jar"]