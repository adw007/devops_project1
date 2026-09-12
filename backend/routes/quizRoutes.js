const express = require("express");
const pool = require("../config/database");

const router = express.Router();

// Get quiz questions
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

// Submit quiz answers
router.post("/submit", async (req, res) => {
    try {
        const { answers } = req.body;

        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({
                message: "Answers must be provided as an array"
            });
        }

        let score = 0;

        for (const answer of answers) {
            const result = await pool.query(
                `SELECT correct_answer
                 FROM questions
                 WHERE id = $1`,
                [answer.question_id]
            );

            if (result.rows.length === 0) {
                continue;
            }

            const correctAnswer = result.rows[0].correct_answer;

            if (answer.selected_answer === correctAnswer) {
                score++;
            }
        }

        res.json({
            message: "Quiz submitted successfully",
            score: score,
            total_questions: answers.length
        });

    } catch (error) {
        console.error("Error submitting quiz:", error);

        res.status(500).json({
            message: "Failed to submit quiz"
        });
    }
});

module.exports = router;