const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
    res.json({
        message: "Profile accessed successfully",
        user: req.user
    });
});

module.exports = router;