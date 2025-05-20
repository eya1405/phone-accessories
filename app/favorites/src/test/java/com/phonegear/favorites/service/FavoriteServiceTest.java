package com.phonegear.favorites.service;

import com.phonegear.favorites.model.Favorite;
import com.phonegear.favorites.repository.FavoriteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class FavoriteServiceTest {

    @Mock
    private FavoriteRepository favoriteRepository;

    @InjectMocks
    private FavoriteService favoriteService;

    private Favorite favorite1;
    private Favorite favorite2;
    private final String userId = "user123";
    private final String productId = "product123";

    @BeforeEach
    void setUp() {
        favorite1 = new Favorite(userId, productId, "Test Product 1", 99.99, "image1.jpg", "Cases");
        favorite2 = new Favorite(userId, "product456", "Test Product 2", 49.99, "image2.jpg", "Chargers");
    }

    @Test
    void getUserFavorites_ShouldReturnUserFavorites() {
        // Arrange
        List<Favorite> expectedFavorites = Arrays.asList(favorite1, favorite2);
        when(favoriteRepository.findByUserId(userId)).thenReturn(expectedFavorites);

        // Act
        List<Favorite> actualFavorites = favoriteService.getUserFavorites(userId);

        // Assert
        assertEquals(expectedFavorites.size(), actualFavorites.size());
        assertEquals(expectedFavorites, actualFavorites);
        verify(favoriteRepository, times(1)).findByUserId(userId);
    }

    @Test
    void isFavorite_WhenProductIsFavorite_ShouldReturnTrue() {
        // Arrange
        when(favoriteRepository.existsByUserIdAndProductId(userId, productId)).thenReturn(true);

        // Act
        boolean result = favoriteService.isFavorite(userId, productId);

        // Assert
        assertTrue(result);
        verify(favoriteRepository, times(1)).existsByUserIdAndProductId(userId, productId);
    }

    @Test
    void isFavorite_WhenProductIsNotFavorite_ShouldReturnFalse() {
        // Arrange
        when(favoriteRepository.existsByUserIdAndProductId(userId, "nonExistentProduct")).thenReturn(false);

        // Act
        boolean result = favoriteService.isFavorite(userId, "nonExistentProduct");

        // Assert
        assertFalse(result);
        verify(favoriteRepository, times(1)).existsByUserIdAndProductId(userId, "nonExistentProduct");
    }

    @Test
    void addFavorite_WhenFavoriteDoesNotExist_ShouldSaveAndReturnFavorite() {
        // Arrange
        when(favoriteRepository.findByUserIdAndProductId(userId, productId)).thenReturn(Optional.empty());
        when(favoriteRepository.save(any(Favorite.class))).thenReturn(favorite1);

        // Act
        Favorite result = favoriteService.addFavorite(favorite1);

        // Assert
        assertEquals(favorite1, result);
        verify(favoriteRepository, times(1)).findByUserIdAndProductId(userId, productId);
        verify(favoriteRepository, times(1)).save(favorite1);
    }

    @Test
    void addFavorite_WhenFavoriteExists_ShouldReturnExistingFavorite() {
        // Arrange
        when(favoriteRepository.findByUserIdAndProductId(userId, productId)).thenReturn(Optional.of(favorite1));

        // Act
        Favorite result = favoriteService.addFavorite(favorite1);

        // Assert
        assertEquals(favorite1, result);
        verify(favoriteRepository, times(1)).findByUserIdAndProductId(userId, productId);
        verify(favoriteRepository, times(0)).save(any(Favorite.class));
    }

    @Test
    void removeFavorite_ShouldCallRepositoryDeleteMethod() {
        // Act
        favoriteService.removeFavorite(userId, productId);

        // Assert
        verify(favoriteRepository, times(1)).deleteByUserIdAndProductId(userId, productId);
    }

    @Test
    void clearUserFavorites_ShouldFindAndDeleteAllUserFavorites() {
        // Arrange
        List<Favorite> userFavorites = Arrays.asList(favorite1, favorite2);
        when(favoriteRepository.findByUserId(userId)).thenReturn(userFavorites);

        // Act
        favoriteService.clearUserFavorites(userId);

        // Assert
        verify(favoriteRepository, times(1)).findByUserId(userId);
        verify(favoriteRepository, times(1)).deleteAll(userFavorites);
    }
}
