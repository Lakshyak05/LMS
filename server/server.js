import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebHooks } from './controllers/webhooks.js';

const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // Global JSON middleware for all other routes

// Routes
app.get('/', (req, res) => res.send("API is working"));

// ❗ Use raw body ONLY for Clerk webhook route
app.post('/clerk', express.raw({ type: 'application/json' }), clerkWebHooks);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
