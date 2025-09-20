# sweet-shop
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

---

## Project Overview

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



### My AI Usage

During the development of this project, ChatGPT was used for:

- Generating boilerplate for controllers and routes.
- Providing guidance on TDD structure and test-writing.
- Suggesting JWT authentication patterns and middleware setup.
- Reviewing commit message conventions and project refactoring.

All implementation and modifications were manually reviewed and adapted to fit the project requirements.
