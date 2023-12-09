FROM openjdk:21-jdk
LABEL authors="khoui"
EXPOSE 8083
ADD target/foyer-service-0.0.1-SNAPSHOT.jar EnigmaFoyerServiceDocker.jar
ENTRYPOINT ["java","-jar","EnigmaFoyerServiceDocker.jar"]