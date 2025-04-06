# ----------- Stage 1: Build with Maven -----------
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Set working directory
WORKDIR /app

# Copy pom.xml and download dependencies (cache step)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code
COPY src ./src

# Build the Spring Boot app (skip tests for faster build)
RUN mvn clean package -DskipTests


# ----------- Stage 2: Run the Spring Boot App -----------
FROM eclipse-temurin:21-jdk-alpine

# Set working directory
WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/target/el-fraudico-0.0.1-SNAPSHOT.jar .

# Expose the port
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "el-fraudico-0.0.1-SNAPSHOT.jar"]
