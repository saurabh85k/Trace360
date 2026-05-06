FROM amazoncorretto:17-alpine AS build
WORKDIR /app
COPY backend /app/backend
WORKDIR /app/backend
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

FROM amazoncorretto:17-alpine
COPY --from=build /app/backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]