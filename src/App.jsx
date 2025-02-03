// import React, { useState, useEffect } from "react";
// import "./app.css"; // Include CSS for styling and animations

// // Function to generate a random color in hex format
// const getRandomColor = () => {
// 	const letters = "0123456789ABCDEF";
// 	let color = "#";
// 	for (let i = 0; i < 6; i++) {
// 		color += letters[Math.floor(Math.random() * 16)];
// 	}
// 	return color;
// };

// // Function to generate similar shades of a base color
// const generateSimilarColors = (baseColor, numberOfShades) => {
// 	const shades = [];
// 	for (let i = 0; i < numberOfShades; i++) {
// 		// Adjust the lightness of the base color to create similar shades
// 		const lightness = 50 + (i - numberOfShades / 2) * 10; // Adjust this formula for more/less similarity
// 		const shade = `hsl(${baseColor.h}, ${baseColor.s}%, ${lightness}%)`;
// 		shades.push(shade);
// 	}
// 	return shades;
// };

// function App() {
// 	const [targetColor, setTargetColor] = useState("");
// 	const [colorOptions, setColorOptions] = useState([]);
// 	const [gameStatus, setGameStatus] = useState("");
// 	const [score, setScore] = useState(0);

// 	// Function to start a new game
// 	const startNewGame = () => {
// 		// Reset score to 0
// 		setScore(0);
// 		// Generate a new random base color
// 		const randomColor = getRandomColor();
// 		// Convert the random color to HSL for generating similar shades
// 		const tempElement = document.createElement("div");
// 		tempElement.style.color = randomColor;
// 		document.body.appendChild(tempElement);
// 		const computedColor = window.getComputedStyle(tempElement).color;
// 		document.body.removeChild(tempElement);
// 		const hslValues = computedColor.match(/\d+/g);
// 		const baseColor = { h: hslValues[0], s: hslValues[1] };
// 		// Generate 6 similar shades of the base color
// 		const similarColors = generateSimilarColors(baseColor, 6);
// 		// Randomly select one as the target color
// 		const newTargetColor =
// 			similarColors[Math.floor(Math.random() * similarColors.length)];
// 		// Shuffle the color options
// 		const newColorOptions = [...similarColors].sort(() => Math.random() - 0.5);
// 		setTargetColor(newTargetColor);
// 		setColorOptions(newColorOptions);
// 		setGameStatus("");
// 	};

// 	// Function to handle user's color selection
// 	const handleColorSelection = (selectedColor) => {
// 		if (selectedColor === targetColor) {
// 			setGameStatus("Correct! 🎉");
// 			setScore(score + 1); // Increment score for correct selection
// 			// Start a new round after a short delay
// 			setTimeout(() => {
// 				startNewGame();
// 			}, 1000); // 1-second delay before starting a new round
// 		} else {
// 			setGameStatus("Wrong! Try again. ❌");
// 		}
// 	};

// 	// Start the game when the component mounts
// 	useEffect(() => {
// 		startNewGame();
// 	}, []);

// 	return (
// 		<div className="game-container">
// 			<h1>Color Perception Game</h1>
// 			<div
// 				className="color-box"
// 				style={{ backgroundColor: targetColor }}
// 				data-testid="colorBox"></div>
// 			<p data-testid="gameInstructions">Match the target color above!</p>
// 			<div className="color-options">
// 				{colorOptions.map((color, index) => (
// 					<button
// 						key={index}
// 						style={{ backgroundColor: color }}
// 						onClick={() => handleColorSelection(color)}
// 						data-testid="colorOption"></button>
// 				))}
// 			</div>
// 			<p data-testid="gameStatus">{gameStatus}</p>
// 			<p data-testid="score">Score: {score}</p>
// 			<button onClick={startNewGame} data-testid="newGameButton">
// 				New Game
// 			</button>
// 		</div>
// 	);
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import "./app.css";

// // Function to generate a random HSL color
// const generateRandomColor = () => {
// 	const h = Math.floor(Math.random() * 360); // Random hue (0-359)
// 	const s = 50 + Math.floor(Math.random() * 30); // Saturation between 50-80%
// 	return { h, s };
// };

// // Function to generate similar shades of a base color
// const generateSimilarColors = (baseColor, numberOfShades) => {
// 	const shades = [];
// 	for (let i = 0; i < numberOfShades; i++) {
// 		// Adjust the lightness of the base color to create similar shades
// 		const lightness = 50 + (i - numberOfShades / 2) * 10; // Adjust this formula for more/less similarity
// 		const shade = `hsl(${baseColor.h}, ${baseColor.s}%, ${lightness}%)`;
// 		shades.push(shade);
// 	}
// 	return shades;
// };

// function App() {
// 	const [targetColor, setTargetColor] = useState("");
// 	const [colorOptions, setColorOptions] = useState([]);
// 	const [gameStatus, setGameStatus] = useState("");
// 	const [score, setScore] = useState(0);
// 	const [baseColor, setBaseColor] = useState(generateRandomColor());

// 	// Function to start a new game
// 	const startNewGame = () => {
// 		// Reset score to 0
// 		setScore(0);
// 		// Generate a new random base color
// 		const newBaseColor = generateRandomColor();
// 		setBaseColor(newBaseColor);
// 		// Generate 6 similar shades of the new base color
// 		const similarColors = generateSimilarColors(newBaseColor, 6);
// 		// Randomly select one as the target color
// 		const newTargetColor =
// 			similarColors[Math.floor(Math.random() * similarColors.length)];
// 		// Shuffle the color options
// 		const newColorOptions = [...similarColors].sort(() => Math.random() - 0.5);
// 		setTargetColor(newTargetColor);
// 		setColorOptions(newColorOptions);
// 		setGameStatus("");
// 	};

// 	// Function to handle user's color selection
// 	const handleColorSelection = (selectedColor) => {
// 		if (selectedColor === targetColor) {
// 			setGameStatus("Correct! 🎉");
// 			setScore(score + 1); // Increment score for correct selection
// 			// Start a new round after a short delay
// 			setTimeout(() => {
// 				const newBaseColor = generateRandomColor();
// 				setBaseColor(newBaseColor);
// 				const similarColors = generateSimilarColors(newBaseColor, 6);
// 				const newTargetColor =
// 					similarColors[Math.floor(Math.random() * similarColors.length)];
// 				const newColorOptions = [...similarColors].sort(
// 					() => Math.random() - 0.5
// 				);
// 				setTargetColor(newTargetColor);
// 				setColorOptions(newColorOptions);
// 				setGameStatus("");
// 			}, 1500); // 1.5-seconds delay before starting a new round
// 		} else {
// 			setGameStatus("Wrong! Try again. ❌");
// 		}
// 	};

// 	// Start the game when the component mounts
// 	useEffect(() => {
// 		startNewGame();
// 	}, []);

// 	return (
// 		<div className="game-container">
// 			<h1>Color Perception Game</h1>
// 			<div
// 				className="color-box"
// 				style={{ backgroundColor: targetColor }}
// 				data-testid="colorBox"></div>
// 			<p data-testid="gameInstructions">Match the target color above!</p>
// 			<div className="color-options">
// 				{colorOptions.map((color, index) => (
// 					<button
// 						key={index}
// 						style={{ backgroundColor: color }}
// 						onClick={() => handleColorSelection(color)}
// 						data-testid="colorOption"></button>
// 				))}
// 			</div>
// 			<p
// 				data-testid="gameStatus"
// 				className={gameStatus.includes("Correct") ? "correct" : "wrong"}>
// 				{gameStatus}
// 			</p>
// 			<p data-testid="score">Score: {score}</p>
// 			<button onClick={startNewGame} data-testid="newGameButton">
// 				New Game
// 			</button>
// 		</div>
// 	);
// }

// export default App;

import React, { useState, useEffect } from "react";
import "./app.css";

// Function to generate a random HSL color
const generateRandomColor = () => {
	const h = Math.floor(Math.random() * 360); // Random hue (0-359)
	const s = 50 + Math.floor(Math.random() * 30); // Saturation between 50-80%
	return { h, s };
};

// Function to generate similar shades of a base color
const generateSimilarColors = (baseColor, numberOfShades, difficulty) => {
	const shades = [];
	for (let i = 0; i < numberOfShades; i++) {
		// Adjust the lightness of the base color to create similar shades
		let lightness;
		switch (difficulty) {
			case "easy":
				lightness = 50 + (i - numberOfShades / 2) * 20; // More distinct
				break;
			case "medium":
				lightness = 50 + (i - numberOfShades / 2) * 10; // Moderately similar
				break;
			case "hard":
				lightness = 50 + (i - numberOfShades / 2) * 5; // Very similar
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
	const [difficulty, setDifficulty] = useState("medium");
	const [timeLeft, setTimeLeft] = useState(10);
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
			setIsGameActive(false); // Disable the game
		}
	}, [timeLeft, isGameActive, hasFirstCorrectGuess]);

	const startNewGame = () => {
		setScore(0);
		setProgress(0);
		setHintsUsed(0);
		setTimeLeft(10);
		setIsGameActive(true);
		setHasFirstCorrectGuess(false);
		const newBaseColor = generateRandomColor();
		setBaseColor(newBaseColor);
		const similarColors = generateSimilarColors(newBaseColor, 6, difficulty);
		const newTargetColor =
			similarColors[Math.floor(Math.random() * similarColors.length)];
		const newColorOptions = [...similarColors].sort(() => Math.random() - 0.5);
		setTargetColor(newTargetColor);
		setColorOptions(newColorOptions);
		setGameStatus("");
	};

	const handleColorSelection = (selectedColor) => {
		if (!isGameActive) return; // Prevent clicks if the game is over

		if (selectedColor === targetColor) {
			setGameStatus("Correct! 🎉");
			setScore(score + 1);
			setProgress(progress + 1);

			// Start the timer after the first correct guess
			if (!hasFirstCorrectGuess) {
				setHasFirstCorrectGuess(true);
				setIsGameActive(true);
			}

			// Update high score
			if (score + 1 > highScore) {
				setHighScore(score + 1);
				localStorage.setItem("highScore", score + 1);
			}

			setTimeout(() => {
				const newBaseColor = generateRandomColor();
				setBaseColor(newBaseColor);
				const similarColors = generateSimilarColors(
					newBaseColor,
					6,
					difficulty
				);
				const newTargetColor =
					similarColors[Math.floor(Math.random() * similarColors.length)];
				const newColorOptions = [...similarColors].sort(
					() => Math.random() - 0.5
				);
				setTargetColor(newTargetColor);
				setColorOptions(newColorOptions);
				setGameStatus("");
				setTimeLeft(10);
			}, 1500);
		} else {
			setGameStatus("Wrong! Try again. ❌");
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

	// Initialize the game on first render
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
			<p data-testid="gameInstructions">Match the target color above!</p>
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
			<p
				data-testid="gameStatus"
				className={gameStatus.includes("Correct") ? "correct" : "wrong"}>
				{gameStatus}
			</p>
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
