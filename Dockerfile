# Stage 1: Build the JAR file
FROM openjdk:17-jdk-slim AS build
WORKDIR /app
COPY backend /app/backend
WORKDIR /app/backend
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Stage 2: Run the JAR
FROM openjdk:17-jdk-slim
COPY --from=build /app/backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]