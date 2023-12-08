package com.enigma;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class EnigmaGatewayApp {
	public static void main(String[] args) {
		SpringApplication.run(EnigmaGatewayApp.class, args);
	}
}
