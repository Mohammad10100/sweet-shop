# [SWEET SHOP](https://sweet-shop-iota.vercel.app/)
Click Above To Visit The Deployed Site

# 📢 Note to Incubyte Team

I wanted to provide some context regarding my submission.

Due to an unexpected medical emergency in my family (a close member suffered a rib fracture and required hospital visits and care), I was only left with two days to work on this assessment. Because of the time constraints, I made the following decisions:

- I chose to keep the frontend and backend repositories separate. This ensures cleaner code organization, no commit interference, and easier maintainability.
- For the frontend, I had to rely heavily on AI tools (primarily Claude SONET 4) to accelerate the development process within the limited time. I carefully reviewed all AI-generated code before integrating it.
- While I successfully implemented all required frontend functionality, I was not able to include **FRONTEND TEST CASES** due to time limitations.
- On the backend, I followed a TDD approach with Jest and Supertest, so the backend is well-covered with tests.

I hope this clarifies my approach and the trade-offs I made given the situation. Thank you for understanding.

Sincerely,
Mohammad

---

## TDD Backend

A **Node.js** + **Express** backend application for managing a Sweet Shop, built with **TDD** using **Jest** and **Supertest**. It provides authentication, sweet management, purchasing, and admin-only restocking/deletion functionality.  

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Setup & Run](#setup--run)  
5. [API Endpoints](#api-endpoints)  
6. [Screenshots](#screenshots)  
7. [My AI Usage](#my-ai-usage)  
8. [Testing](#testing)  

---

## Project Overview [SWEET SHOP](https://sweet-shop-iota.vercel.app)

This project demonstrates a fully tested REST API for a Sweet Shop using the **Red-Green-Refactor TDD cycle**.  

- Users can **register** and **login**.  
- Authenticated users can **view** and **search sweets**.  
- Users can **purchase sweets**.  
- Admins can **add, update, restock, and delete sweets**.  
- Token-based **JWT authentication** secures endpoints.  
- Project follows **SOLID principles** for maintainable code.  

---

## Features

- User authentication with JWT  
- CRUD operations for sweets  
- Purchase sweets with stock validation  
- Admin-only operations: delete & restock sweets  
- Unit & integration tests with Jest + Supertest  

---

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose  
- **Testing:** Jest, Supertest  
- **Authentication:** JWT  
- **Environment:** dotenv  

---

## Setup & Run

### Prerequisites

- Node.js ≥ 18  
- npm  
- MongoDB (local or Atlas)  

### Clone Repository

```bash
git clone https://github.com/Mohammad10100/sweet-shop
cd sweet-shop-backend
```

### Install dependencies

```bash
npm install
```

### Environment Variables
Create a .env file:

```bash
PORT=3000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
```

### Run Backend

```bash
npm run dev   # with nodemon
npm start     # without nodemon
```

### Run Tests

```bash
npm test
```


## Next Steps
Frontend [README.md](https://github.com/mohammad10100/sweet-shop-frontend?tab=readme-ov-file#-sweet-store-frontend)
```bash
Follow the sweet-shop-fronted README.md
And setup the frontend
```

---

## API Endpoints

### Auth

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| POST   | /api/auth/register | Register a new user     |
| POST   | /api/auth/login    | Login and get JWT token |


### Sweets (Protected)

| Method | Endpoint           | Description                          |
| ------ | ------------------ | ------------------------------------ |
| POST   | /api/sweets        | Add a new sweet (Admin only)         |
| GET    | /api/sweets        | View all sweets                      |
| GET    | /api/sweets/search | Search sweets by name/category/price |
| PUT    | /api/sweets/\:id   | Update sweet details                 |
| DELETE | /api/sweets/\:id   | Delete sweet (Admin only)            |


### Inventory (Protected)

| Method | Endpoint                  | Description                  |
| ------ | ------------------------- | ---------------------------- |
| POST   | /api/sweets/\:id/purchase | Purchase a sweet             |
| POST   | /api/sweets/\:id/restock  | Restock a sweet (Admin only) |

---

### Screenshots 
## [Visit the live website](https://sweet-shop-iota.vercel.app)

<img width="2553" height="1380" alt="Landing Page" src="https://github.com/user-attachments/assets/b0fab97c-923c-49d8-b122-9f613f0b83af" />
<img width="2554" height="1379" alt="Features" src="https://github.com/user-attachments/assets/ded5f45e-6327-40a6-ad94-01afa7923721" />
<img width="2552" height="925" alt="Testimonials" src="https://github.com/user-attachments/assets/4f2e3bd1-2e7b-4b9d-97fb-849c7002dbe5" />
<img width="2552" height="896" alt="Footer" src="https://github.com/user-attachments/assets/2ca79755-8e59-4f8e-a575-f4b7e7fa9f02" />
<img width="2550" height="1382" alt="Form" src="https://github.com/user-attachments/assets/07981820-16b8-4e41-82f3-1eaaf6ab6485" />
<img width="2560" height="1382" alt="Dashboard" src="https://github.com/user-attachments/assets/2236e574-b3c3-468e-8a9a-163095aa9a7b" />
<img width="2559" height="1242" alt="Admin Panel" src="https://github.com/user-attachments/assets/ca57ee35-3c75-40b2-8caf-7b86b1988865" />

---

### My AI Usage

During the development of this project, ChatGPT was used for:

- Generating boilerplate for controllers and routes.
- Providing guidance on TDD structure and test-writing.
- Suggesting JWT authentication patterns and middleware setup.
- Reviewing commit message conventions and project refactoring.

All implementation and modifications were manually reviewed and adapted to fit the project requirements.


***Reflection***
Using AI sped up my workflow significantly, especially since I had only a couple of days to complete the assessment.
However, I made sure to review and edit all generated code before integrating it, ensuring I understood each part.
Without AI, I wouldn’t have been able to finish the frontend and backend within the limited time, but I retained full control over the logic and design choices.

---

### Testing

### ✅ Test Coverage
![Coverage](https://img.shields.io/badge/coverage-88%25-brightgreen)

This project maintains high test coverage to ensure reliability and stability.  

- **Total Statements Covered:** 88.19%  
- **Branches Covered:** 81.66% 
- **Functions Covered:** 100%  
- **Lines Covered:** 89.33%  

📊 You can view the detailed HTML coverage report here:  
👉 [Coverage Report](./docs/test-report/index.html)
<img width="2560" height="896" alt="test" src="https://github.com/user-attachments/assets/5fa30a3d-0c5a-45c4-b4a7-c36df732bd7c" />