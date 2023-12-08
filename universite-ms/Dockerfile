FROM openjdk:21-jdk
LABEL authors="khoui"
EXPOSE 8761
ADD target/universite-service-0.0.1-SNAPSHOT.jar EnigmaUniversiteServiceDocker.jar
ENTRYPOINT ["java","-jar","EnigmaUniversiteServiceDocker.jar"]