# fomo
# Real-Time Stock Data Mini-Website
This project is a mini-website built to display real-time stock data fetched from a backend API using React, Redux, and MongoDB. It fetches stock prices from an external API, stores them in a MongoDB database, and displays them in real-time on the frontend.

# Technologies Used
## Frontend:
React.js
Redux (Redux Toolkit)
TypeScript
Axios for HTTP requests
Next.js (for server-side rendering, optional if used)
## Backend:
Node.js with Express.js
MongoDB (MongoDB Atlas for cloud hosting)
Mongoose (for MongoDB object modeling)

# Setup Instructions
To run this project locally, follow these steps:
## Clone the repository:
git clone <repository-url>
cd <project-folder>
## Install dependencies:
cd backend
npm install

cd ../frontend
npm install

# Set up MongoDB:
Create a MongoDB Atlas cluster.
Replace the MongoDB connection string (mongoUri) in backend/server.js with your MongoDB Atlas connection string.
## Start the backend server:
cd backend
node server.js
## Start the frontend development server:
cd frontend
npm run dev

# Access the application:
Open your browser and go to http://localhost:3000 (assuming you are using Next.js or your respective frontend URL).
