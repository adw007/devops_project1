const express = require("express");
const pool = require("../config/database");

const router = express.Router();

router.get("/questions", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, question_text, option_a, option_b, option_c, option_d, category
             FROM questions
             ORDER BY id`
        );

        res.json({
            questions: result.rows
        });

    } catch (error) {
        console.error("Error fetching questions:", error);

        res.status(500).json({
            message: "Failed to fetch quiz questions"
        });
    }
});

module.exports = router;