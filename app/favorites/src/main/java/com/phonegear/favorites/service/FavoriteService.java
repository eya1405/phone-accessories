package com.phonegear.favorites.service;

import com.phonegear.favorites.model.Favorite;
import com.phonegear.favorites.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;

    @Autowired
    public FavoriteService(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    @Cacheable(value = "userFavorites", key = "#userId")
    public List<Favorite> getUserFavorites(String userId) {
        return favoriteRepository.findByUserId(userId);
    }

    public boolean isFavorite(String userId, String productId) {
        return favoriteRepository.existsByUserIdAndProductId(userId, productId);
    }

    @CacheEvict(value = "userFavorites", key = "#favorite.userId")
    public Favorite addFavorite(Favorite favorite) {
        Optional<Favorite> existingFavorite = favoriteRepository.findByUserIdAndProductId(
                favorite.getUserId(), favorite.getProductId());
        
        if (existingFavorite.isPresent()) {
            return existingFavorite.get();
        }
        
        return favoriteRepository.save(favorite);
    }

    @CacheEvict(value = "userFavorites", key = "#userId")
    public void removeFavorite(String userId, String productId) {
        favoriteRepository.deleteByUserIdAndProductId(userId, productId);
    }

    @CacheEvict(value = "userFavorites", key = "#userId")
    public void clearUserFavorites(String userId) {
        List<Favorite> userFavorites = favoriteRepository.findByUserId(userId);
        favoriteRepository.deleteAll(userFavorites);
    }
}
