package com.phonegear.favorites.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Value("${auth.service.url}")
    private String authServiceUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Authentication required");
            return;
        }
        
        String token = authHeader.substring(7);
        
        try {
            // Verify token with Auth service
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            
            Map<String, String> requestBody = new HashMap<>();
            requestBody.put("token", token);
            
            HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);
            
            ResponseEntity<Map> responseEntity = restTemplate.exchange(
                    authServiceUrl + "/api/auth/verify",
                    HttpMethod.POST,
                    entity,
                    Map.class
            );
            
            Map<String, Object> responseBody = responseEntity.getBody();
            
            if (responseBody != null && (Boolean) responseBody.get("valid")) {
                Map<String, Object> user = (Map<String, Object>) responseBody.get("user");
                String userId = (String) user.get("id");
                
                // Add user ID to request headers for downstream use
                request.setAttribute("userId", userId);
                request.setAttribute("userRole", user.get("role"));
                
                // Add X-User-ID header for the controller
                request = new MutableHttpServletRequest(request);
                ((MutableHttpServletRequest) request).putHeader("X-User-ID", userId);
                
                filterChain.doFilter(request, response);
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid or expired token");
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Error during authentication");
        }
    }
}
