FROM maven:3.8.8-eclipse-temurin-21-alpine AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk-slim
COPY --from=build /target/a1_quizapp-0.0.1-SNAPSHOT.jar a1_quizapp.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","a1_quizapp.jar"]
