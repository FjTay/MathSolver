# Math Solver Project

This web application allows users to propose, save, retrieve, modify, and delete mathematical solutions. The project is built using React, React Router Dom v6, Vite for the frontend, and JPA, Spring Boot-Maven, and H2 for the backend and database. The frontend also incorporates Framer Motion for animations and native CSS keyframes.

## Getting Started

### Frontend

1. **Clone the repository:**

git clone https://github.com/FjTay/MathSolver.git
cd MathSolver/frontend

2. **Install dependencies:**
npm install

3. **Run the development server:**
npm run dev

Follow the link for starting the app.

### Backend

1. **Navigate to the backend directory:**
cd ../backend

2. **Build and run the Spring Boot application:**
./mvnw spring-boot:run

3. **Database Configuration:**

The project is configured to use H2 as an in-memory database for development. You can access the H2 console at http://localhost:8080/h2-console with the following credentials:

JDBC URL: jdbc:h2:mem:testdb
Username: sa
Password:

## Features

### Propose a Solution:

Users can propose mathematical solutions using the provided interface.

### Save Solutions:

Save proposed solutions to the database for future reference.

### Retrieve Solutions:

Retrieve previously saved solutions from the database.

### Modify Solutions:

Update and modify existing solutions.

### Delete Solutions:

Remove solutions from the database.

### Data Validation:

Backend controls ensure the validity of data before saving or modifying solutions.

### User Feedback:

Users receive comments and feedback on their actions.

## Frontend Technologies
**React**: JavaScript library for building user interfaces.
**React Router Dom v6**: Declarative routing for React.
**Vite**: Fast frontend build tool with a modern development experience.
**Framer Motion**: A motion library for React to create animations.

## Backend Technologies
**Spring Boot**: Framework for building Java-based enterprise applications.
**JPA**: Java specification for managing relational data.
**H2 Database**: In-memory database for development purposes.

