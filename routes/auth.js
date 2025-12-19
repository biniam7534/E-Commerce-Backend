const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require('bcryptjs');
// register
router.post("/register", async(req, res) => {
    const { username, email, password } = req.body || {};

    if (!username || !email || !password) {
        return res.status(400).json({ error: "username, email and password are required" });
    }

    // Hash password with bcrypt
    let hashedPassword;
    try {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
    } catch (err) {
        console.error('Password hashing failed:', err);
        return res.status(500).json({ error: 'Password hashing failed' });
    }

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;