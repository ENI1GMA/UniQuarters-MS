package com.example.musicmservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;

import java.util.HashSet;

@SpringBootApplication
@EnableEurekaClient
public class MusicMServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(MusicMServiceApplication.class, args);
    }




}
