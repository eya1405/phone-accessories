package com.phonegear.favorites.controller;

import com.phonegear.favorites.model.Favorite;
import com.phonegear.favorites.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    @Autowired
    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping
    public ResponseEntity<List<Favorite>> getUserFavorites(@RequestHeader("X-User-ID") String userId) {
        List<Favorite> favorites = favoriteService.getUserFavorites(userId);
        return ResponseEntity.ok(favorites);
    }

    @PostMapping
    public ResponseEntity<Favorite> addFavorite(
            @RequestHeader("X-User-ID") String userId,
            @RequestBody Favorite favorite) {
        
        favorite.setUserId(userId);
        Favorite savedFavorite = favoriteService.addFavorite(favorite);
        return new ResponseEntity<>(savedFavorite, HttpStatus.CREATED);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> removeFavorite(
            @RequestHeader("X-User-ID") String userId,
            @PathVariable String productId) {
        
        favoriteService.removeFavorite(userId, productId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/check/{productId}")
    public ResponseEntity<Map<String, Boolean>> checkFavorite(
            @RequestHeader("X-User-ID") String userId,
            @PathVariable String productId) {
        
        boolean isFavorite = favoriteService.isFavorite(userId, productId);
        return ResponseEntity.ok(Map.of("isFavorite", isFavorite));
    }

    @DeleteMapping
    public ResponseEntity<Void> clearFavorites(@RequestHeader("X-User-ID") String userId) {
        favoriteService.clearUserFavorites(userId);
        return ResponseEntity.noContent().build();
    }
}
