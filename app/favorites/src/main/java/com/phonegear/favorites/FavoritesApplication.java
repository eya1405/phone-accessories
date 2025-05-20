package com.phonegear.favorites;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class FavoritesApplication {
    public static void main(String[] args) {
        SpringApplication.run(FavoritesApplication.class, args);
    }
}
