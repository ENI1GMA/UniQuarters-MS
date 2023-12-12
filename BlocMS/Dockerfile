FROM openjdk:21-jdk
LABEL authors="khoui"
EXPOSE 8084
ADD target/BlocMS-0.0.1-SNAPSHOT.jar EnigmaBlocServiceDocker.jar
ENTRYPOINT ["java","-jar","EnigmaBlocServiceDocker.jar"]