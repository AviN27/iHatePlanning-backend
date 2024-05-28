# IHatePlanning backend APIs

## Overview

This backend application is built with Express.js and MongoDB. It provides APIs to manage plans, including creating, reading, updating, and deleting plans. Each plan has a unique user ID, email, name, and various plan details.

## Requirements

- Node.js (v14.x or later)
- npm (v6.x or later)
- MongoDB (v4.x or later)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/backend.git
cd backend
```

### 2. Install the dependencies

```npm
npm install
```

### 3. Create environment variables
```env
MONGODB_URI=mongodb://localhost:27017/yourdb
```

### 4. Start the server
```bash
npm devStart
```

## Endpoints

```bash
GET /plans/id/${ObjectId}
GET /plans/email/${Email}
POST /plans
PATCH /plans/${ObjectId}
DELETE /plans/${ObjectId}
```

## Acknowledgements
- [Express.js](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)
- [Mongoose](https://mongoosejs.com)
- [Nodemon](https://www.npmjs.com/package/nodemon)
