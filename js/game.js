//Variables
const gameComplexityList = ["Easy", "Medium", "Hard"];
let gameCorrectAnswers = [];
let gameTime = 120; // 2 min
let gameTimer = 0;
let gameScore = 0;
let jsonData = [];
let gameQuestionIndex = 0;
//API
const easyGameApi =
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
const mediumGameApi =
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";
const hardGameApi =
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple";

let easyModJson = "";
let mediumModJson = "";
let hardModJson = "";
//Selectors
//Scenes
const startField = document.querySelector("#start");
const gameField = document.querySelector("#game");
const gameOverField = document.querySelector("#gameOver");
// launch the game
const startGameButton = document.querySelector(".start-game-button");
// Game Complexity
const gcLeftButton = document.querySelector(".gc-left-button");
const gcText = document.querySelector(".gc-text");
const gcRightButton = document.querySelector(".gc-right-button");
// Time Remaining
const trClock = document.querySelector(".tr-clock");
// Question Counter
const questionCounter = document.querySelector(".question-counter");
//Next Button
const nextButton = document.querySelector(".next-button");
//Game Question Field
const gameQuestion = document.querySelector(".game-question");
//Answer Buttons
const answerAButton = document.querySelector(".answer-a-button");
const answerBButton = document.querySelector(".answer-b-button");
const answerCButton = document.querySelector(".answer-c-button");
const answerDButton = document.querySelector(".answer-d-button");
//Answer Buttons Text
const answerAText = document.querySelector(".a-option-text");
const answerBText = document.querySelector(".b-option-text");
const answerCText = document.querySelector(".c-option-text");
const answerDText = document.querySelector(".d-option-text");
//Answer Result Enter Button
const answerResButton = document.querySelector(".result-enter");
//Score Result
const scoreResult = document.querySelector(".score-result-text");
//Game Over Scene
const goScoreResult = document.querySelector(".go-score-result");
const goInputEnterName = document.querySelector(
    ".save-game-score input[type='text']"
);
//Save Game Score
const goSaveGameButton = document.querySelector(".save-game-button");
//Score game table
const goScoreTable = document.querySelector(".sb-table");
//Try Game Again
const goTryAgainButton = document.querySelector(".try-again");
//Event listeners
//Start Scene
//Start new game
startGameButton.addEventListener("click", startGame);
//Game Scene
// Game Complexity
gcLeftButton.addEventListener("click", gsLeftBtnGameComplexity);
gcRightButton.addEventListener("click", gsRightBtnGameComplexity);
//Next Button
nextButton.addEventListener("click", nextQuestionButton);
//Answer Buttons
answerAButton.addEventListener("click", setUserAnswer);
answerBButton.addEventListener("click", setUserAnswer);
answerCButton.addEventListener("click", setUserAnswer);
answerDButton.addEventListener("click", setUserAnswer);
//Answer Result Enter Button
answerResButton.addEventListener("click", checkCorrectAnswer);
//Game Over Scene
goSaveGameButton.addEventListener("click", saveGameResult);
//Try Again Button
goTryAgainButton.addEventListener("click", tryAgain);

//Functions
//Start Game
function startGame() {
    //Reset all values to default;
    defaultValues();
    //Show Game Field
    showGameField(1);
    //Load Timer
    gameTimerRemaining();
    //Load Api data
    //Easy mode
    getJSON(easyGameApi, (err, data) => {
        if (err !== null) {
            console.error(err.message);
        } else {
            easyModJson = data;
        }
    });
    //Medium mode
    getJSON(mediumGameApi, (err, data) => {
        if (err !== null) {
            console.error(err.message);
        } else {
            mediumModJson = data;
            // Load default game
            loadQuestion(mediumModJson);
        }
    });
    //Hard mode
    getJSON(hardGameApi, (err, data) => {
        if (err !== null) {
            console.error(err.message);
        } else {
            hardModJson = data;
        }
    });
    //Set buttons to array
    gameCorrectAnswers.push(new Triple(answerAButton, answerAText, 0));
    gameCorrectAnswers.push(new Triple(answerBButton, answerBText, 0));
    gameCorrectAnswers.push(new Triple(answerCButton, answerCText, 0));
    gameCorrectAnswers.push(new Triple(answerDButton, answerDText, 0));
    // Check if game over
    gameOver();
}

//Refresh to default values
function defaultValues() {
    //Refresh Button States
    buttonEnable(true);
    buttonEnterResultsEnable(true);
    refreshButton();
    //Set default values
    gameCorrectAnswers = [];
    gameTimer = gameTime;
    gameScore = 0;
    jsonData = [];
    gameQuestionIndex = 0;
}

//Show game fields: 0 - login 1 - Game 2 - GameOver
function showGameField(f) {
    switch (f) {
        case 0:
            {
                // Login
                startField.classList.remove("hideElements");
                gameField.classList.add("hideElements");
                gameOverField.classList.add("hideElements");
            }
            break;
        case 1:
            {
                // Game
                startField.classList.add("hideElements");
                gameField.classList.remove("hideElements");
                gameOverField.classList.add("hideElements");
            }
            break;
        case 2:
            {
                // Game Over
                startField.classList.add("hideElements");
                gameField.classList.add("hideElements");
                gameOverField.classList.remove("hideElements");
            }
            break;
        default:
            {
                //Default - Login
                startField.classList.remove("hideElements");
                gameField.classList.add("hideElements");
                gameOverField.classList.add("hideElements");
            }
            break;
    }
}
// Game Complexity
function gsLeftBtnGameComplexity() {
    let gameComplexity = gcText.textContent.toLocaleLowerCase();
    //If not null
    if (gameComplexity !== "") {
        for (let i = gameComplexityList.length - 1; i > 0; i--) {
            const element = gameComplexityList[i].toLocaleLowerCase();
            if (gameComplexity.includes(element) && i != 0) {
                let m = gameComplexityList[i - 1];
                gameMode(m);
                gcText.innerHTML = m + " " + "<strong>Game</strong>";
            }
        }
    }
    //Refresh Button States
    buttonEnable(true);
    buttonEnterResultsEnable(true);
    refreshButton();
}

function gsRightBtnGameComplexity() {
    let gameComplexity = gcText.textContent.toLocaleLowerCase();
    //If not null
    if (gameComplexity !== "") {
        for (let i = 0; i < gameComplexityList.length; i++) {
            const element = gameComplexityList[i].toLocaleLowerCase();
            if (
                gameComplexity.includes(element) &&
                i != gameComplexityList.length - 1
            ) {
                let m = gameComplexityList[i + 1];
                gameMode(m);
                gcText.innerHTML = m + " " + "<strong>Game</strong>";
            }
        }
    }
    //Refresh Button States
    buttonEnable(true);
    buttonEnterResultsEnable(true);
    refreshButton();
}

//Change game mode
function gameMode(m) {
    if (m !== null) {
        let gameDifficulty = mod(m.toLocaleLowerCase()); // 0 - easy; 1 - medium; 2 - hard;
        //Question Counter
        switch (gameDifficulty) {
            case 0:
                loadQuestion(easyModJson);
                break;
            case 1:
                loadQuestion(mediumModJson);
                break;
            case 2:
                loadQuestion(hardModJson);
                break;
            default:
                loadQuestion(mediumModJson);
                break;
        }
    }
}

//Timer Remaining
function gameTimerRemaining() {
    let timer = setInterval(() => {
        if (gameTimer > 0) trClock.innerText = convertSeconds(--gameTimer);
        else {
            trClock.innerText = convertSeconds(gameTimer);
            clearInterval(timer); //Stop timer
        }
    }, 1000);
}

//Next Question Button
function nextQuestionButton() {
    //Refresh Button States
    buttonEnable(true);
    buttonEnterResultsEnable(true);
    refreshButton();
    //Next Question
    if (
        jsonData !== undefined &&
        gameQuestionIndex < jsonData.results.length - 1
    ) {
        gameQuestionIndex++;
        loadQuestion(jsonData);
    }
}

//Buttons enable/disable
function buttonEnable(bool) {
    if (!bool) {
        gameCorrectAnswers.forEach((e) => {
            e.value1.classList.add("buttonEventDisable");
        });
    } else {
        gameCorrectAnswers.forEach((e) => {
            e.value1.classList.remove("buttonEventDisable");
        });
    }
}

function buttonEnterResultsEnable(bool) {
    if (!bool) {
        answerResButton.classList.add("buttonEventDisable");
    } else {
        answerResButton.classList.remove("buttonEventDisable");
    }
}

//Button refresh states
function refreshButton() {
    gameCorrectAnswers.forEach((e) => {
        if (e.value1.classList.contains("selected-answer")) {
            e.value1.classList.remove("selected-answer");
        }

        if (e.value1.classList.contains("incorrect-answer")) {
            e.value1.classList.remove("incorrect-answer");
        }
    });
}

//Load Question
function loadQuestion(json) {
    if (json !== undefined) {
        jsonData = json;
        let gameDataJson = json.results[gameQuestionIndex];
        //Question counter
        questionCounter.innerText =
            "Question " +
            (gameQuestionIndex + 1) +
            " of " +
            json.results.length;
        //Question
        gameQuestion.innerHTML = gameDataJson.question;
        //Question Answers
        //Random correct answer
        let correct = Math.floor(Math.random() * 4);
        setAnswerButtons(gameDataJson, correct);
    }
}

//Set answers to the buttons
function setAnswerButtons(gameDataJson, correctBtnIndex) {
    for (let i = 0, j = 0; i < gameCorrectAnswers.length; i++) {
        const pair = gameCorrectAnswers[i];
        if (correctBtnIndex === i) {
            pair.value2.innerHTML = gameDataJson.correct_answer;
            pair.value3 = 1;
        } else {
            pair.value2.innerHTML = gameDataJson.incorrect_answers[j];
            pair.value3 = 0;
            j++;
        }
    }
}

//Set user answer
function setUserAnswer(e) {
    e.target.classList.add("selected-answer");
    buttonEnable(false);
}

//Check correct answers after user press enter
function checkCorrectAnswer() {
    let isAnswerIncorrect = false;
    //Check if user selected correct answer
    gameCorrectAnswers.forEach((a) => {
        if (a.value1.classList.contains("selected-answer") && a.value3 === 1) {
            gameScore += 10;
            scoreResult.innerText = gameScore;
            isAnswerIncorrect = false;
        } else {
            isAnswerIncorrect = true;
        }
        buttonEnterResultsEnable(false);
    });
    //Show correct answer
    gameCorrectAnswers.forEach((a) => {
        //Check correct answer
        if (a.value3 === 1) {
            a.value1.classList.add("selected-answer");
        } else {
            //if answer is incorrect
            if (a.value1.classList.contains("selected-answer")) {
                a.value1.classList.remove("selected-answer");
            }
            a.value1.classList.add("incorrect-answer");
        }
    });

    //Reduce game time if answer incorrect
    if (isAnswerIncorrect) {
        if (gameTimer >= 10) gameTimer -= 10;
        else gameTimer = 0;
    }
}

//Game Over
function gameOver() {
    let go = setInterval(() => {
        if (
            gameTimer === 0 ||
            (jsonData.results &&
                gameQuestionIndex === jsonData.results.length - 1)
        ) {
            showGameField(2);
            clearInterval(go);
            showGameOverScore();
        }
    }, 1000);
}
//Show Game Over score
function showGameOverScore() {
    goScoreResult.innerText = gameScore;
    let values = loadFromStorage();
    showResults(values);
}

//Save game result and show on game over table
function saveGameResult() {
    let playerName = goInputEnterName.value;
    saveToStorage(playerName);
    let values = loadFromStorage();
    showResults(values);
}

function saveToStorage(playerName) {
    if (typeof Storage !== "undefined") {
        localStorage.setItem(
            Number(localStorage.length) + 1,
            JSON.stringify({
                player: playerName,
                score: gameScore,
            })
        );
    } else {
        console.log("Sorry! No Web Storage support..");
    }
}

function loadFromStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        values.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    return values;
}

function showResults(values) {
    values = values.sort(getSortOrder("score"));
    let rows = goScoreTable.querySelectorAll(".sb-table .sb-row");
    for (let i = 0; i < values.length && i < 5; i++) {
        rows[i].querySelectorAll(".sb-cell p")[0].innerText = i + 1; //Rank
        rows[i].querySelectorAll(".sb-cell p")[1].innerText = values[i].player; //Name
        rows[i].querySelectorAll(".sb-cell p")[2].innerText = values[i].score; //Score
    }
}
//Tray Again Game
function tryAgain() {
    showGameField(0);
}
//Utils
//Game Mode
function mod(m) {
    switch (m) {
        case "easy":
            return 0;
        case "medium":
            return 1;
        case "hard":
            return 2;
        default:
            return 1;
    }
}
//Time
function convertSeconds(s) {
    //Check if the integer
    if (Number.isInteger(s)) {
        let min = Math.floor(s / 60);
        let sec = s % 60;
        return pad2(min) + ":" + pad2(sec);
    }
}

function pad2(n) {
    return (n < 10 ? "0" : "") + n;
}
//Json
let getJSON = function (url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.onload = function () {
        let status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};
//Pair Class
class Triple {
    constructor(value1, value2, value3) {
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
    }
}
//Comparer Function
function getSortOrder(prop) {
    return function (a, b) {
        if (a[prop] < b[prop]) {
            return 1;
        } else if (a[prop] > b[prop]) {
            return -1;
        }
        return 0;
    };
}
