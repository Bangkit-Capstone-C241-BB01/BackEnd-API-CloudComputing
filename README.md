# BACK END API Cloud Computing
This is the Github Repository for the back end side of our capstone project. <br>
For the API development, we use [RESTful API](https://en.wikipedia.org/wiki/REST).

## Local Development
Clone the repository:
```
git clone -b main https://github.com/Bangkit-Capstone-C241-BB01/BackEnd-API-CloudComputing.git
```

There is a `.env` file to store credentials and secret keys. This is what the `.env` looks like for this project:
```dockerfile
PORT = ''

# Jsonwebtoken
JWT_SECRET_KEY = ''

# Connect to database
DB_CONNECTION_NAME = ''
DB_USER = ''
DB_PASSWORD = ''
DB_NAME = ''

# Connect to Google Cloud Platform
PROJECT_ID = ''
BUCKET_PRODUCT_NAME = ''
BUCKET_STORE_NAME = ''
BUCKET_PROFILE_NAME = ''
SERVICE_ACCOUNT_KEY = ''

# Machine Learning Flask Server URL
ML_URL = ''
```
> [!NOTE]
> For Google Cloud Storage, I used service account key to connect into Google Cloud Platform for the local development.

## Database
In the local development, utilizing [phpMyAdmin](https://www.phpmyadmin.net/) for testing MySQL database.

## Services in Google Cloud
- Cloud Run
- Cloud Storage
- Cloud SQL (MySQL)

## Tech Stacks and Libraries
- Node.js
- Express.js
- Sequelize

## API Documentation
[Postman BrainStore Back End API](https://www.postman.com/capstone-brainstore-api/workspace/capstone-brainstore-api/collection/29625845-f3f022e3-a54b-4ff7-b7f8-9b0f200aa7f0?action=share&creator=29625845&active-environment=29625845-4fb12986-f8cf-4c20-a13a-a5bf383a2d5b)
