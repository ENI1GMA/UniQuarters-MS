package com.example.musicmservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class BlocServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BlocServiceApplication.class, args);
    }




}
