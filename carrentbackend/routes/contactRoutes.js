const express = require("express");
const router = express.Router();
const { sendContactEmail } = require("../controller/contactController");

// POST Route for Contact Form
router.post("/", sendContactEmail);

module.exports = router;
