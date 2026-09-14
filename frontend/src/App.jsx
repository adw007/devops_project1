import { useEffect, useState } from "react";

const mockQuestions = [
    {
      id: 1,
      question_text:
        "Which command is used to create a new Git repository?",
      option_a: "git init",
      option_b: "git start",
      option_c: "git create",
      option_d: "git new",
      correct_answer: "A",
      category: "Git",
    },
    {
      id: 2,
      question_text:
        "Which tool is commonly used as a reverse proxy and web server?",
      option_a: "Nginx",
      option_b: "PostgreSQL",
      option_c: "Redis",
      option_d: "Git",
      correct_answer: "A",
      category: "Web Server",
    },
    {
      id: 3,
      question_text:
        "Which technology is used to package an application with its dependencies?",
      option_a: "Docker",
      option_b: "Jira",
      option_c: "Power BI",
      option_d: "PostgreSQL",
      correct_answer: "A",
      category: "Docker",
    },
  ];

  const mockLeaderboard = [
    { username: "Alex", score: 10 },
    { username: "Rahul", score: 8 },
    { username: "Adwaith", score: 7 },
    { username: "John", score: 6 },
    { username: "David", score: 5 },
  ];

function App() {
  const [page, setPage] = useState("home");

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  /*
   * Temporary mock data.
   * This will be replaced by PostgreSQL data later.
   */

  

  /*
   * Load quiz questions.
   * Currently using mock data because PostgreSQL
   * is not configured on the company system.
   */

  useEffect(() => {
    if (page === "quiz") {
      setQuestions(mockQuestions);
    }
  }, [page]);

  /*
   * Login
   */

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);

      setLoginData({
        email: "",
        password: "",
      });

      setPage("dashboard");
    } catch (error) {
      console.error(error);
      alert("Unable to connect to the server");
    }
  };

  /*
   * Register
   */

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Registration successful. You can now login.");

      setRegisterData({
        username: "",
        email: "",
        password: "",
      });

      setPage("login");
    } catch (error) {
      console.error(error);
      alert("Unable to connect to the server");
    }
  };

  /*
   * Logout
   */

  const handleLogout = () => {
    localStorage.removeItem("token");

    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setScore(0);

    setPage("home");
  };

  /*
   * Check whether user is logged in
   */

  const requireLogin = (targetPage) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      setPage("login");
      return;
    }

    setPage(targetPage);
  };

  /*
   * LOGIN PAGE
   */

  if (page === "login") {
    return (
      <div className="app">
        <nav className="navbar">
          <div className="logo">DEVOPS ARENA</div>

          <div className="nav-links">
            <button onClick={() => setPage("home")}>
              Home
            </button>

            <button onClick={() => setPage("register")}>
              Register
            </button>
          </div>
        </nav>

        <main className="form-page">
          <form className="auth-form" onSubmit={handleLogin}>
            <p className="eyebrow">WELCOME BACK</p>

            <h1>Login</h1>

            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(event) =>
                setLoginData({
                  ...loginData,
                  email: event.target.value,
                })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(event) =>
                setLoginData({
                  ...loginData,
                  password: event.target.value,
                })
              }
              required
            />

            <button
              className="primary-button"
              type="submit"
            >
              Login
            </button>

            <p className="form-switch">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setPage("register")}
              >
                Register
              </button>
            </p>
          </form>
        </main>
      </div>
    );
  }

  /*
   * REGISTER PAGE
   */

  if (page === "register") {
    return (
      <div className="app">
        <nav className="navbar">
          <div className="logo">DEVOPS ARENA</div>

          <div className="nav-links">
            <button onClick={() => setPage("home")}>
              Home
            </button>

            <button onClick={() => setPage("login")}>
              Login
            </button>
          </div>
        </nav>

        <main className="form-page">
          <form
            className="auth-form"
            onSubmit={handleRegister}
          >
            <p className="eyebrow">JOIN DEVOPS ARENA</p>

            <h1>Register</h1>

            <input
              type="text"
              placeholder="Username"
              value={registerData.username}
              onChange={(event) =>
                setRegisterData({
                  ...registerData,
                  username: event.target.value,
                })
              }
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(event) =>
                setRegisterData({
                  ...registerData,
                  email: event.target.value,
                })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(event) =>
                setRegisterData({
                  ...registerData,
                  password: event.target.value,
                })
              }
              required
            />

            <button
              className="primary-button"
              type="submit"
            >
              Create Account
            </button>

            <p className="form-switch">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setPage("login")}
              >
                Login
              </button>
            </p>
          </form>
        </main>
      </div>
    );
  }

  /*
   * DASHBOARD PAGE
   */

  if (page === "dashboard") {
    return (
      <div className="app">
        <nav className="navbar">
          <div className="logo">DEVOPS ARENA</div>

          <div className="nav-links">
            <button onClick={() => setPage("dashboard")}>
              Dashboard
            </button>

            <button
              onClick={() =>
                requireLogin("leaderboard")
              }
            >
              Leaderboard
            </button>

            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>

        <main className="dashboard">
          <div className="dashboard-header">
            <p className="eyebrow">
              WELCOME TO DEVOPS ARENA
            </p>

            <h1>Dashboard</h1>

            <p className="description">
              Test your knowledge, improve your score,
              and compete with other players.
            </p>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h2>DevOps Quiz</h2>

              <p>
                Test your knowledge of Linux, Git,
                Docker, networking, CI/CD and more.
              </p>

              <button
                className="primary-button"
                onClick={() => requireLogin("quiz")}
              >
                Start Quiz
              </button>
            </div>

            <div className="dashboard-card">
              <h2>Leaderboard</h2>

              <p>
                See the top players and compare your
                quiz scores.
              </p>

              <button
                className="secondary-button"
                onClick={() =>
                  requireLogin("leaderboard")
                }
              >
                View Leaderboard
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /*
   * QUIZ PAGE
   */

  if (page === "quiz") {
    return (
      <div className="app">
        <nav className="navbar">
          <div className="logo">DEVOPS ARENA</div>

          <div className="nav-links">
            <button onClick={() => setPage("dashboard")}>
              Dashboard
            </button>

            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>

        <main className="quiz-page">
          <div className="quiz-container">
            <p className="eyebrow">DEVOPS QUIZ</p>

            <h1>Test your knowledge</h1>

            <div className="question-card">
              {questions.length === 0 ? (
                <p>Loading questions...</p>
              ) : (
                <>
                  <p className="question-number">
                    Question {currentQuestion + 1} of{" "}
                    {questions.length}
                  </p>

                  <h2>
                    {
                      questions[currentQuestion]
                        .question_text
                    }
                  </h2>

                  <div className="options">
                    <button
                      className={
                        selectedAnswer === "A"
                          ? "selected-option"
                          : ""
                      }
                      onClick={() =>
                        setSelectedAnswer("A")
                      }
                    >
                      {
                        questions[currentQuestion]
                          .option_a
                      }
                    </button>

                    <button
                      className={
                        selectedAnswer === "B"
                          ? "selected-option"
                          : ""
                      }
                      onClick={() =>
                        setSelectedAnswer("B")
                      }
                    >
                      {
                        questions[currentQuestion]
                          .option_b
                      }
                    </button>

                    <button
                      className={
                        selectedAnswer === "C"
                          ? "selected-option"
                          : ""
                      }
                      onClick={() =>
                        setSelectedAnswer("C")
                      }
                    >
                      {
                        questions[currentQuestion]
                          .option_c
                      }
                    </button>

                    <button
                      className={
                        selectedAnswer === "D"
                          ? "selected-option"
                          : ""
                      }
                      onClick={() =>
                        setSelectedAnswer("D")
                      }
                    >
                      {
                        questions[currentQuestion]
                          .option_d
                      }
                    </button>
                  </div>
                </>
              )}
            </div>

            {questions.length > 0 && (
              <button
                className="primary-button next-button"
                onClick={() => {
                  if (!selectedAnswer) {
                    alert("Please select an answer.");
                    return;
                  }

                  const currentAnswer = {
                    question_id:
                      questions[currentQuestion].id,
                    selected_answer: selectedAnswer,
                  };

                  const finalAnswers = [
                    ...answers,
                    currentAnswer,
                  ];

                  if (
                    currentQuestion <
                    questions.length - 1
                  ) {
                    setAnswers(finalAnswers);
                    setCurrentQuestion(
                      currentQuestion + 1
                    );
                    setSelectedAnswer(null);
                  } else {
                    let calculatedScore = 0;

                    finalAnswers.forEach((answer) => {
                      const question =
                        questions.find(
                          (question) =>
                            question.id ===
                            answer.question_id
                        );

                      if (
                        question &&
                        answer.selected_answer ===
                          question.correct_answer
                      ) {
                        calculatedScore++;
                      }
                    });

                    setAnswers(finalAnswers);
                    setScore(calculatedScore);
                    setPage("result");
                  }
                }}
              >
                {currentQuestion ===
                questions.length - 1
                  ? "Finish Quiz"
                  : "Next Question"}
              </button>
            )}
          </div>
        </main>
      </div>
    );
  }

  /*
   * RESULT PAGE
   */

  if (page === "result") {
    return (
      <div className="app">
        <nav className="navbar">
          <div className="logo">DEVOPS ARENA</div>

          <div className="nav-links">
            <button
              onClick={() => setPage("dashboard")}
            >
              Dashboard
            </button>

            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>

        <main className="quiz-page">
          <div className="quiz-container">
            <p className="eyebrow">QUIZ COMPLETE</p>

            <h1>Your Score</h1>

            <div className="question-card">
              <h2>
                {score} / {questions.length}
              </h2>

              <button
                className="primary-button"
                onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswer(null);
                  setAnswers([]);
                  setScore(0);
                  setPage("quiz");
                }}
              >
                Try Again
              </button>

              <button
                className="secondary-button"
                onClick={() =>
                  setPage("dashboard")
                }
              >
                Dashboard
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /*
   * LEADERBOARD PAGE
   */

  if (page === "leaderboard") {
    return (
      <div className="app">
        <nav className="navbar">
          <div className="logo">DEVOPS ARENA</div>

          <div className="nav-links">
            <button
              onClick={() => setPage("dashboard")}
            >
              Dashboard
            </button>

            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>

        <main className="dashboard">
          <div className="dashboard-header">
            <p className="eyebrow">
              DEVOPS ARENA RANKINGS
            </p>

            <h1>Leaderboard</h1>

            <p className="description">
              Top players based on their quiz scores.
            </p>
          </div>

          <div
            className="dashboard-card"
            style={{
              maxWidth: "900px",
            }}
          >
            {mockLeaderboard.map(
              (player, index) => (
                <div
                  key={player.username}
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    padding: "18px 0",
                    borderBottom:
                      index !==
                      mockLeaderboard.length - 1
                        ? "1px solid #292e3a"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        width: "30px",
                        color: "#7c8494",
                        fontWeight: "600",
                      }}
                    >
                      #{index + 1}
                    </span>

                    <span
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      {player.username}
                    </span>
                  </div>

                  <span
                    style={{
                      color: "#6c8cff",
                      fontWeight: "600",
                    }}
                  >
                    {player.score} points
                  </span>
                </div>
              )
            )}
          </div>
        </main>
      </div>
    );
  }

  /*
   * HOME PAGE
   */

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">DEVOPS ARENA</div>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>
            Home
          </button>

          <button onClick={() => setPage("login")}>
            Login
          </button>

          <button
            onClick={() => setPage("register")}
          >
            Register
          </button>
        </div>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <p className="eyebrow">
            DEVOPS LEARNING PLATFORM
          </p>

          <h1>
            Test your
            <span> DevOps skills.</span>
          </h1>

          <p className="description">
            Challenge yourself with DevOps quizzes,
            track your score, and compete on the
            leaderboard.
          </p>

          <div className="actions">
            <button
              className="primary-button"
              onClick={() =>
                requireLogin("quiz")
              }
            >
              Start Quiz
            </button>

            <button
              className="secondary-button"
              onClick={() =>
                requireLogin("leaderboard")
              }
            >
              View Leaderboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;