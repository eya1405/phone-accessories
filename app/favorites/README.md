# Favorites Microservice

This microservice is part of the PhoneGear e-commerce platform, responsible for managing user favorites for phone accessories.

## Description

The Favorites microservice provides REST API endpoints for adding, removing, and retrieving user favorites. It uses MongoDB for persistent storage and Redis for caching to optimize read operations.

## Architecture

The microservice follows a standard Spring Boot architecture:

- **Controller Layer**: Handles HTTP requests and responses
- **Service Layer**: Contains business logic
- **Repository Layer**: Interfaces with the MongoDB database
- **Model Layer**: Defines data structures
- **Configuration**: Redis cache and security configuration

## Technologies

- Java 17
- Spring Boot 2.7.0
- Spring Data MongoDB
- Spring Data Redis
- JUnit 5 & Mockito for testing

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/favorites | Get all favorites for the authenticated user |
| POST | /api/favorites | Add a product to favorites |
| DELETE | /api/favorites/{productId} | Remove a product from favorites |
| GET | /api/favorites/check/{productId} | Check if a product is in favorites |
| DELETE | /api/favorites | Clear all favorites for the authenticated user |

## Authentication

The microservice uses JWT authentication. Each request must include a valid JWT token in the Authorization header:

\`\`\`
Authorization: Bearer <token>
\`\`\`

The token is verified with the Authentication microservice.

## Caching Strategy

Redis is used to cache user favorites to improve read performance:

- User favorites are cached with the key pattern `userFavorites::userId`
- Cache entries expire after 10 minutes
- Cache is automatically invalidated when favorites are added, removed, or cleared

## Running the Service

### Prerequisites

- Java 17
- MongoDB
- Redis

### Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `REDIS_HOST`: Redis host
- `REDIS_PORT`: Redis port
- `AUTH_SERVICE_URL`: URL of the Authentication service

### Running Locally

\`\`\`bash
mvn spring-boot:run
\`\`\`

### Running with Docker

\`\`\`bash
docker build -t favorites-service .
docker run -p 3005:3005 favorites-service
\`\`\`

## Testing

The service includes comprehensive unit tests and integration tests:

\`\`\`bash
# Run unit tests
mvn test

# Run integration tests
mvn verify
\`\`\`

## End-to-End Testing

End-to-end tests are implemented using JUnit and RestAssured to test the complete flow from API to database and cache.
