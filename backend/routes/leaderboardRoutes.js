const express = require("express");
const pool = require("../config/database");

const router = express.Router();

// Get leaderboard
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT username, score
             FROM users
             ORDER BY score DESC
             LIMIT 10`
        );

        res.json({
            leaderboard: result.rows
        });

    } catch (error) {
        console.error("Error fetching leaderboard:", error);

        res.status(500).json({
            message: "Failed to fetch leaderboard"
        });
    }
});

module.exports = router;