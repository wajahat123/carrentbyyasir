// const cluster = require("node:cluster");
// const os = require("os");
const express = require("express");
const cors = require("cors"); 
const nodemailer = require("nodemailer");
const { MongoDBConnect } = require("./conncetion");
const cookieParser = require('cookie-parser');
const adminRoutes = require('./routes/adminRoutes');
const carRoutes = require('./routes/carRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); 
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require("./routes/contactRoutes");

const path = require('path');
const app = express();
const PORT = process.env.PORT || 3006;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const dotenv = require('dotenv');

dotenv.config();
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Enable CORS for all origins
app.use(cors());  

// app.use(cors({ origin: 'http://localhost:3001' }));  // Allow requests from localhost:3001

MongoDBConnect("mongodb+srv://yasirkh261:yasirkh261@cluster0.yhwramo.mongodb.net/carkarent?retryWrites=true&w=majority&appName=Cluster0");
// Run the email logic only in the primary process
app.get("/", (req, res) => {
  res.send("Hello Friend!");
});

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.use("/admin", adminRoutes);
app.use('/cars', carRoutes);
app.use("/category", categoryRoutes);
app.use('/bookings', bookingRoutes);
app.use("/contact",contactRoutes);
app.listen(PORT, () => {
    console.log("Server Started on", PORT);
});

