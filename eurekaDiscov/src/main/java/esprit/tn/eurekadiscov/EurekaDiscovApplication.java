package esprit.tn.eurekadiscov;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer // Enable eureka server
public class EurekaDiscovApplication {

    public static void main(String[] args) {
        SpringApplication.run(EurekaDiscovApplication.class, args);
    }

}
