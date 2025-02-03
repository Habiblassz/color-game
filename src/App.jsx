import React, { useState, useEffect } from "react";
import "./app.css";

const generateRandomColor = () => {
	const h = Math.floor(Math.random() * 360);
	const s = 50 + Math.floor(Math.random() * 30);
	return { h, s };
};

const generateSimilarColors = (baseColor, numberOfShades, difficulty) => {
	const shades = [];
	for (let i = 0; i < numberOfShades; i++) {
		let lightness;
		switch (difficulty) {
			case "easy":
				lightness = 50 + (i - numberOfShades / 2) * 20;
				break;
			case "medium":
				lightness = 50 + (i - numberOfShades / 2) * 10;
				break;
			case "hard":
				lightness = 50 + (i - numberOfShades / 2) * 5;
				break;
			default:
				lightness = 50 + (i - numberOfShades / 2) * 10;
		}
		const shade = `hsl(${baseColor.h}, ${baseColor.s}%, ${lightness}%)`;
		shades.push(shade);
	}
	return shades;
};

function App() {
	const [targetColor, setTargetColor] = useState("");
	const [colorOptions, setColorOptions] = useState([]);
	const [gameStatus, setGameStatus] = useState("");
	const [score, setScore] = useState(0);
	const [baseColor, setBaseColor] = useState(generateRandomColor());
	const [difficulty, setDifficulty] = useState("easy");
	const [timeLeft, setTimeLeft] = useState(15);
	const [highScore, setHighScore] = useState(0);
	const [progress, setProgress] = useState(0);
	const [isGameActive, setIsGameActive] = useState(false);
	const [hintsUsed, setHintsUsed] = useState(0);
	const [hasFirstCorrectGuess, setHasFirstCorrectGuess] = useState(false);

	useEffect(() => {
		const highScoreFromStorage = localStorage.getItem("highScore");
		if (highScoreFromStorage) {
			setHighScore(parseInt(highScoreFromStorage, 10));
		}
	}, []);

	useEffect(() => {
		if (isGameActive && hasFirstCorrectGuess && timeLeft > 0) {
			const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
			return () => clearTimeout(timer);
		} else if (timeLeft === 0) {
			setGameStatus("Time's up! Game over. ❌");
			setIsGameActive(false);
		}
	}, [timeLeft, isGameActive, hasFirstCorrectGuess]);

	const generateNewRound = () => {
		const newBaseColor = generateRandomColor();
		setBaseColor(newBaseColor);
		const similarColors = generateSimilarColors(newBaseColor, 6, difficulty);
		const newTargetColor =
			similarColors[Math.floor(Math.random() * similarColors.length)];
		const newColorOptions = [...similarColors].sort(() => Math.random() - 0.5);
		setTargetColor(newTargetColor);
		setColorOptions(newColorOptions);
	};

	const startNewGame = () => {
		setScore(0);
		setProgress(0);
		setHintsUsed(0);
		setTimeLeft(15);
		setIsGameActive(true);
		setHasFirstCorrectGuess(false);
		generateNewRound();
		setGameStatus("");
	};

	const handleColorSelection = (selectedColor) => {
		if (!isGameActive) return;

		if (selectedColor === targetColor) {
			setGameStatus("Correct! ✅");
			document.querySelector(".color-box").classList.add("correct-animation");
			setScore(score + 1);
			setProgress(progress + 1);

			document.querySelector(".progress").classList.add("progress-animation");
			setTimeout(() => {
				document
					.querySelector(".progress")
					.classList.remove("progress-animation");
			}, 300);

			if (!hasFirstCorrectGuess) {
				setHasFirstCorrectGuess(true);
				setIsGameActive(true);
			}

			if (score + 1 > highScore) {
				setHighScore(score + 1);
				localStorage.setItem("highScore", score + 1);
			}

			setTimeout(() => {
				generateNewRound();
				setGameStatus("");
				setTimeLeft(15);
				document
					.querySelector(".color-box")
					.classList.remove("correct-animation");
			}, 1500);
		} else {
			setGameStatus("Wrong! Try again. ❌");
			document.querySelector(".color-box").classList.add("wrong-animation");
			setTimeout(() => {
				document
					.querySelector(".color-box")
					.classList.remove("wrong-animation");
			}, 500);
		}
	};

	const handleHint = () => {
		if (hintsUsed < 2) {
			const incorrectOptions = colorOptions.filter(
				(color) => color !== targetColor
			);
			const randomIncorrectOption =
				incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
			const newColorOptions = colorOptions.filter(
				(color) => color !== randomIncorrectOption
			);
			setColorOptions(newColorOptions);
			setHintsUsed(hintsUsed + 1);
		}
	};

	useEffect(() => {
		if (isGameActive) {
			generateNewRound();
		}
	}, [difficulty]);

	useEffect(() => {
		startNewGame();
	}, []);

	return (
		<div className="game-container">
			<h1>Color Game</h1>
			<div className="difficulty-selector">
				<label htmlFor="difficulty">Difficulty: </label>
				<select
					id="difficulty"
					value={difficulty}
					onChange={(e) => setDifficulty(e.target.value)}>
					<option value="easy">Easy</option>
					<option value="medium">Medium</option>
					<option value="hard">Hard</option>
				</select>
			</div>
			<div
				data-testid="colorBox"
				className="color-box"
				style={{ backgroundColor: targetColor }}></div>
			<p data-testid="gameInstructions">
				Select the color that matches the target color above!
			</p>
			<div className="color-options">
				{colorOptions.map((color, index) => (
					<button
						key={index}
						style={{ backgroundColor: color }}
						onClick={() => handleColorSelection(color)}
						disabled={!isGameActive || timeLeft === 0}
						data-testid="colorOption"></button>
				))}
			</div>
			<div className="game-status">
				<p
					data-testid="gameStatus"
					className={gameStatus.includes("Correct") ? "correct" : "wrong"}>
					{gameStatus}
				</p>
			</div>
			<p data-testid="score">Score: {score}</p>
			<p>High Score: {highScore}</p>
			<p>Time Left: {timeLeft} seconds</p>
			<div className="progress-bar">
				<div
					className="progress"
					style={{
						width: `${(score / Math.max(highScore, 15)) * 100}%`,
					}}></div>
			</div>
			<button data-testid="newGameButton" onClick={startNewGame}>
				New Game
			</button>
			<button onClick={handleHint} disabled={hintsUsed >= 2 || !isGameActive}>
				Hint ({2 - hintsUsed} left)
			</button>
		</div>
	);
}

export default App;
