import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

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
  const [mousePosition, setMousePosition] = useState({
  x: 0,
  y: 0,
});
  const handleMouseMove = (event) => {
    const x =
      (event.clientX / window.innerWidth - 0.5) * 2;

    const y =
      (event.clientY / window.innerHeight - 0.5) * 2;

    setMousePosition({ x, y });
  };

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
        `${API_URL}/api/auth/login`,
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
        `${API_URL}/api/auth/register`,
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

            <p className="auth-subtitle">
              Sign in to continue your DevOps challenge.
            </p>

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

            <p className="auth-subtitle">
              Create your account and enter the arena.
            </p>

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

          <button onClick={() => requireLogin("leaderboard")}>
            Leaderboard
          </button>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard">

        <div className="dashboard-header">
          <p className="eyebrow">COMMAND CENTER</p>

          <h1>
            Ready to <span>level up?</span>
          </h1>

          <p className="description">
            Test your DevOps knowledge, improve your score,
            and climb the arena leaderboard.
          </p>
        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <span>CURRENT SCORE</span>
            <strong>0</strong>
            <small>points</small>
          </div>

          <div className="stat-card">
            <span>QUIZZES COMPLETED</span>
            <strong>0</strong>
            <small>challenges</small>
          </div>

          <div className="stat-card">
            <span>GLOBAL RANK</span>
            <strong>#—</strong>
            <small>keep playing</small>
          </div>

        </div>

        <div className="dashboard-main-grid">

          <div className="dashboard-card quiz-card">

            <div className="card-icon">
              &gt;_
            </div>

            <p className="card-label">
              KNOWLEDGE CHALLENGE
            </p>

            <h2>DevOps Quiz</h2>

            <p>
              Challenge yourself across Linux, Git, Docker,
              networking, CI/CD and more.
            </p>

            <div className="quiz-meta">
              <span>10+ Questions</span>
              <span>Multiple Choice</span>
            </div>

            <button
              className="primary-button"
              onClick={() => requireLogin("quiz")}
            >
              Start Challenge
            </button>

          </div>

          <div className="dashboard-card leaderboard-card">

            <div className="card-icon">
              #
            </div>

            <p className="card-label">
              COMPETITION
            </p>

            <h2>Leaderboard</h2>

            <p>
              See how your score compares with other
              DevOps Arena players.
            </p>

            <div className="mini-ranking">

              <div>
                <span>01</span>
                <strong>Top Player</strong>
                <small>—</small>
              </div>

              <div>
                <span>02</span>
                <strong>Player</strong>
                <small>—</small>
              </div>

              <div>
                <span>03</span>
                <strong>Player</strong>
                <small>—</small>
              </div>

            </div>

            <button
              className="secondary-button"
              onClick={() => requireLogin("leaderboard")}
            >
              View Full Leaderboard
            </button>

          </div>

        </div>

        <div className="activity-card">

          <div>
            <p className="card-label">
              ACTIVITY
            </p>

            <h2>Your DevOps journey starts here.</h2>

            <p>
              Complete your first challenge to begin
              tracking your progress.
            </p>
          </div>

          <button
            className="secondary-button"
            onClick={() => requireLogin("quiz")}
          >
            Start First Quiz
          </button>

        </div>

      </main>
    </div>
  );
}
  /*
   * QUIZ PAGE
   */

  if (page === "quiz") {
  const question = questions[currentQuestion];
  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

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

          <div className="quiz-top">
            <div>
              <p className="eyebrow">KNOWLEDGE CHALLENGE</p>

              <h1>DevOps Quiz</h1>
            </div>

            <div className="quiz-counter">
              {currentQuestion + 1}
              <span>/</span>
              {questions.length}
            </div>
          </div>

          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="question-card">

            <div className="question-meta">
              <span className="question-category">
                {question.category}
              </span>

              <span>
                QUESTION {currentQuestion + 1}
              </span>
            </div>

            <h2>
              {question.question_text}
            </h2>

            <div className="options">

              {[
                ["A", question.option_a],
                ["B", question.option_b],
                ["C", question.option_c],
                ["D", question.option_d],
              ].map(([key, option]) => (
                <button
                  key={key}
                  className={
                    selectedAnswer === key
                      ? "selected-option"
                      : ""
                  }
                  onClick={() => setSelectedAnswer(key)}
                >
                  <span className="option-key">
                    {key}
                  </span>

                  <span className="option-text">
                    {option}
                  </span>
                </button>
              ))}

            </div>

            <div className="quiz-footer">

              <span className="selection-status">
                {selectedAnswer
                  ? `Answer ${selectedAnswer} selected`
                  : "Select an answer"}
              </span>

              <button
                className="primary-button next-button"
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
              >
                {currentQuestion === questions.length - 1
                  ? "Finish Quiz"
                  : "Next Question"}
              </button>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

  /*
   * RESULT PAGE
   */

  if (page === "result") {
  const percentage =
    questions.length > 0
      ? Math.round((score / questions.length) * 100)
      : 0;

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">DEVOPS ARENA</div>

        <div className="nav-links">
          <button onClick={() => setPage("dashboard")}>
            Dashboard
          </button>

          <button onClick={() => requireLogin("leaderboard")}>
            Leaderboard
          </button>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="result-page">

        <div className="result-container">

          <p className="eyebrow">CHALLENGE COMPLETE</p>

          <h1>Quiz <span>Complete.</span></h1>

          <p className="result-subtitle">
            Your DevOps challenge has been completed.
          </p>

          <div
            className="score-ring"
            style={{
              "--score": `${percentage * 3.6}deg`,
            }}
          >
            <div className="score-ring-inner">
              <strong>{score}</strong>
              <span>/ {questions.length}</span>
            </div>
          </div>

          <p className="score-label">
            {percentage}% SCORE
          </p>

          <div className="result-stats">

            <div>
              <span>CORRECT</span>
              <strong>{score}</strong>
            </div>

            <div>
              <span>QUESTIONS</span>
              <strong>{questions.length}</strong>
            </div>

            <div>
              <span>ACCURACY</span>
              <strong>{percentage}%</strong>
            </div>

          </div>

          <div className="result-actions">

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
              onClick={() => setPage("dashboard")}
            >
              Back to Dashboard
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
          <button onClick={() => setPage("dashboard")}>
            Dashboard
          </button>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="leaderboard-page">

        <div className="leaderboard-container">

          <div className="leaderboard-header">
            <p className="eyebrow">GLOBAL RANKINGS</p>

            <h1>
              The <span>Arena.</span>
            </h1>

            <p>
              Compete with other players and climb
              the DevOps Arena rankings.
            </p>
          </div>

          <div className="leaderboard-table">

            <div className="leaderboard-table-header">
              <span>RANK</span>
              <span>PLAYER</span>
              <span>SCORE</span>
            </div>

            {mockLeaderboard.map((player, index) => (
              <div
                className={
                  `leaderboard-row ${
                    index === 0
                      ? "top-player"
                      : ""
                  }`
                }
                key={index}
              >

                <span className="rank">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="player-name">
                  {player.username}
                </span>

                <span className="player-score">
                  {player.score}
                </span>

              </div>
            ))}

          </div>

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
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("login")}>Login</button>
        <button onClick={() => setPage("register")}>Register</button>
      </div>
    </nav>

    <main
      className="hero"
      onMouseMove={handleMouseMove}
      style={{
        "--mouse-x": mousePosition.x,
        "--mouse-y": mousePosition.y,
      }}
    >
      <div className="devops-network">
        <span className="network-node node-1"></span>
        <span className="network-node node-2"></span>
        <span className="network-node node-3"></span>
        <span className="network-node node-4"></span>
        <span className="network-node node-5"></span>
        <span className="network-node node-6"></span>

        <span className="network-line line-1"></span>
        <span className="network-line line-2"></span>
        <span className="network-line line-3"></span>
        <span className="network-line line-4"></span>
        <span className="network-line line-5"></span>
        <span className="network-line line-6"></span>
      </div>

      <div className="hero-content">

        <p className="eyebrow">DEVOPS LEARNING PLATFORM</p>

        <h1 className="interactive-title">
          <span className="title-line">
            {"Master DevOps.".split("").map((letter, index) => (
              <span
                className="title-letter"
                key={index}
                style={{
                  "--letter-depth": `${(index % 5) + 1}`,
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </span>

          <span className="title-line accent-line">
            {"One challenge at a time.".split("").map((letter, index) => (
              <span
                className="title-letter"
                key={index}
                style={{
                  "--letter-depth": `${(index % 5) + 1}`,
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </span>
        </h1>

        <p className="description">
          Test your knowledge of Linux, Git, Docker,
          networking, CI/CD and more. Challenge yourself,
          track your score, and climb the leaderboard.
        </p>

        <div className="actions">
          <button
            className="primary-button"
            onClick={() => setPage("register")}
          >
            Start Learning
          </button>

          <button
            className="secondary-button"
            onClick={() => setPage("login")}
          >
            Login
          </button>
        </div>

        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <span>devops-arena ~</span>
          </div>

          <div className="terminal-body">
            <p>
              <span className="terminal-prompt">$</span> git status
            </p>

            <p className="terminal-success">
              ✓ working tree clean
            </p>

            <p>
              <span className="terminal-prompt">$</span> docker build .
            </p>

            <p className="terminal-success">
              ✓ image created
            </p>

            <p>
              <span className="terminal-prompt">$</span> deploy
            </p>

            <p className="terminal-success">
              ✓ application ready
            </p>

            <p>
              <span className="terminal-prompt">$</span>
              <span className="terminal-cursor">█</span>
            </p>
          </div>
        </div>

        <div className="hero-stats">
          <div>
            <strong>6+</strong>
            <span>DevOps Topics</span>
          </div>

          <div>
            <strong>10+</strong>
            <span>Quiz Questions</span>
          </div>

          <div>
            <strong>∞</strong>
            <span>Attempts</span>
          </div>
        </div>

      </div>
    </main>
  </div>
);
}

export default App;