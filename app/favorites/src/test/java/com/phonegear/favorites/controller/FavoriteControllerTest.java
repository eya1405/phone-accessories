package com.phonegear.favorites.controller;

import com.phonegear.favorites.model.Favorite;
import com.phonegear.favorites.service.FavoriteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class FavoriteControllerTest {

    @Mock
    private FavoriteService favoriteService;

    @InjectMocks
    private FavoriteController favoriteController;

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
        when(favoriteService.getUserFavorites(userId)).thenReturn(expectedFavorites);

        // Act
        ResponseEntity<List<Favorite>> response = favoriteController.getUserFavorites(userId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(expectedFavorites.size(), response.getBody().size());
        assertEquals(expectedFavorites, response.getBody());
        verify(favoriteService, times(1)).getUserFavorites(userId);
    }

    @Test
    void addFavorite_ShouldReturnCreatedFavorite() {
        // Arrange
        when(favoriteService.addFavorite(any(Favorite.class))).thenReturn(favorite1);

        // Act
        ResponseEntity<Favorite> response = favoriteController.addFavorite(userId, favorite1);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(favorite1, response.getBody());
        assertEquals(userId, favorite1.getUserId());
        verify(favoriteService, times(1)).addFavorite(favorite1);
    }

    @Test
    void removeFavorite_ShouldReturnNoContent() {
        // Arrange
        doNothing().when(favoriteService).removeFavorite(userId, productId);

        // Act
        ResponseEntity<Void> response = favoriteController.removeFavorite(userId, productId);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(favoriteService, times(1)).removeFavorite(userId, productId);
    }

    @Test
    void checkFavorite_WhenProductIsFavorite_ShouldReturnTrue() {
        // Arrange
        when(favoriteService.isFavorite(userId, productId)).thenReturn(true);

        // Act
        ResponseEntity<Map<String, Boolean>> response = favoriteController.checkFavorite(userId, productId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().containsKey("isFavorite"));
        assertTrue(response.getBody().get("isFavorite"));
        verify(favoriteService, times(1)).isFavorite(userId, productId);
    }

    @Test
    void clearFavorites_ShouldReturnNoContent() {
        // Arrange
        doNothing().when(favoriteService).clearUserFavorites(userId);

        // Act
        ResponseEntity<Void> response = favoriteController.clearFavorites(userId);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(favoriteService, times(1)).clearUserFavorites(userId);
    }
}
