const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv");

dotenv.config();

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
    console.warn("MONGO_URL not set. Skipping DB connection. To enable DB, set MONGO_URL in a .env file.");
} else {
    mongoose.connect(mongoUrl)
        .then(() => console.log("DB connection is successful"))
        .catch((err) => {
            console.error("DB connection error:", err);
            process.exit(1);
        });
}
app.get("/api/test", (req, res) => {
    console.log("test is successful");
});



app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running");
});