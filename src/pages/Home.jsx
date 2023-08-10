import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Countries from "../components/Countries";
import Loading from "../components/Loading";
import * as utils from "../utils";
import * as api from "../api";


export default function Home({setIsScorePostedMessageVisible, isScoreNotPostedMessageVisible, setIsScoreNotPostedMessageVisible}) {
    const minNumber = 1;
    const maxNumber = 100;
    const [previousNumber, setPreviousNumber] = useState(null);
    const [currentNumber, setCurrentNumber] = useState(null);
    const [isGuessCorrect, setIsGuessCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [hasGlobalLeaderboardLoadedSuccessfully, setHasGlobalLeaderboardLoadedSuccessfully] = useState(null);
    const [globalLeaderboard, setGlobalLeaderboard] = useState([]);
    const [isSubmitScoreFormVisible, setIsSubmitScoreFormVisible] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const [isNameValid, setIsNameValid] = useState(null);
    const [countryInput, setCountryInput] = useState("Select Your Country");
    const [isScoreBeingSubmitted, setIsScoreBeingSubmitted] = useState(false);
    const [isScorePostedSuccessfully, setIsScorePostedSuccessfully] = useState(null)

    useEffect(() => {
        setCurrentNumber(utils.generateRandomNumber(minNumber, maxNumber));
        setIsLoading(true);
        setHasGlobalLeaderboardLoadedSuccessfully(null);
        api.getOriginalScores()
            .then((response) => {
                setIsLoading(false);
                setHasGlobalLeaderboardLoadedSuccessfully(true);
                let rank = 0;
                const globalLeaderBoardCopy = response.map((score) => {
                    rank += 1;
                    const newScoreObject = {};
                    newScoreObject.rank = rank;
                    newScoreObject.name = score.name;
                    newScoreObject.score = score.score;
                    newScoreObject.country = score.country;
                    return newScoreObject;
                })
                setGlobalLeaderboard(globalLeaderBoardCopy);
            })
            .catch((error) => {
                setIsLoading(false);
                setHasGlobalLeaderboardLoadedSuccessfully(false);
            })
    }, [isScorePostedSuccessfully])

    function handleButtonLower() {
        setPreviousNumber(currentNumber);
        const newNumber = utils.generateRandomNumber(minNumber, maxNumber);
        setCurrentNumber(newNumber);
        if (newNumber <= currentNumber) {
            setIsGuessCorrect(true);
            setScore((currentScore) => {
                if (currentScore + 1 > highScore) {
                    setHighScore((currentHighScore) => {
                        return currentHighScore + 1;
                    })
                }
                return currentScore + 1;
            });
        }
        else {
            setIsGuessCorrect(false);
            if (score > 0) {
                if (globalLeaderboard.length < 100) {
                    setIsSubmitScoreFormVisible(true);
                }
                else if (score > globalLeaderboard[globalLeaderboard.length - 1].score) {
                    setIsSubmitScoreFormVisible(true);
                }
                else {
                    setScore(0);
                    setIsSubmitScoreFormVisible(false);
                }
            }
            else {
                setScore(0);
            }
        }
    }

    function handleButtonHigher() {
        setPreviousNumber(currentNumber);
        const newNumber = utils.generateRandomNumber(minNumber, maxNumber);
        setCurrentNumber(newNumber);
        if (newNumber >= currentNumber) {
            setIsGuessCorrect(true);
            setScore((currentScore) => {
                if (currentScore + 1 > highScore) {
                    setHighScore((currentHighScore) => {
                        return currentHighScore + 1;
                    })
                }
                return currentScore + 1;
            });
        }
        else {
            setIsGuessCorrect(false);
            if (score > 0) {
                if (globalLeaderboard.length < 100) {
                    setIsSubmitScoreFormVisible(true);
                }
                else if (score > globalLeaderboard[globalLeaderboard.length - 1].score) {
                    setIsSubmitScoreFormVisible(true);
                }
                else {
                    setScore(0);
                    setIsSubmitScoreFormVisible(false);
                }
            }
            else {
                setScore(0);
            }
        }
    }

    function handleNameInput(event) {
        setNameInput(event.target.value);
        setIsNameValid(null);
        if (event.target.value === "") {
            setIsNameValid(null);
        }
        else if (!/^[a-zA-Z]+[0-9]*$/.test(event.target.value)) {
            setIsNameValid(false);
        }
        else {
            setIsNameValid(true);
        }
    }

    function handleCancelSubmitScoreButton() {
        setScore(0);
        setNameInput("");
        setCountryInput("Select Your Country");
        setIsSubmitScoreFormVisible(false);
    }

    function handleSubmitScoreButton() {
        setIsScoreBeingSubmitted(true);
        setIsScorePostedSuccessfully(null);
        api.postOriginalScore(nameInput, score, countryInput)
            .then((response) => {
                setIsScoreBeingSubmitted(false);
                setIsScorePostedSuccessfully(true);
                setIsScorePostedMessageVisible(true);
                setTimeout(() => setIsScorePostedMessageVisible(false), 3000);
                setScore(0);
                setNameInput("");
                setCountryInput("Select Your Country");
                setIsSubmitScoreFormVisible(false);
            })
            .catch((error) => {
                setIsScoreBeingSubmitted(false);
                setIsScoreNotPostedMessageVisible(true);
                setTimeout(() => setIsScoreNotPostedMessageVisible(false), 3000);
            })
    }

    const styleCurrentNumber = {
        color: isGuessCorrect === null
            ? "#FFFFFF"
            : isGuessCorrect === true
                ? "#32CD32"
                : "#FF206E"
    }

    const styleSubmitScore = {
        display: isSubmitScoreFormVisible ? "grid" : "none"
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (hasGlobalLeaderboardLoadedSuccessfully === false) {
        return (
            <header>
                <p className="error">Page could not be loaded.</p>
            </header>
        )
    }

    return (
        <div id="original">
            <Helmet>
                <link rel="canonical" href="https://higherorlower.co.uk/" />
                <title>Play Higher or Lower and top the global leaderboard • Higher or Lower</title>
                <meta name="description" content="Guess whether the next number will be higher or lower than the current number and get on the global leaderboard if you score high enough." />
            </Helmet>

            <header className="max-width">
                <h1>Higher or Lower</h1>
                <p>A random number between 1 and 100 (inclusive) has been generated. Guess whether the next number will be higher or lower than the current number.</p>
                <p>If you guess correctly enough times in a row, you will be immortalised on our global leaderboard forever...or until someone beats your score.</p>
            </header>

            <main className="max-width">
                <section id="scores-numbers-and-buttons">
                    <div id="scores">
                        <div><b>High Score</b>: {highScore}</div>
                        <div><b>Score</b>: {score}</div>
                    </div>
                    
                    <div className="current-number" style={styleCurrentNumber}>{currentNumber}</div>

                    {previousNumber
                        ? <div className="previous-number"><b>Previous number</b>: {previousNumber}</div>
                        : null
                    }

                    <div className="buttons">
                        <button
                            type="button"
                            onClick={handleButtonLower}
                            disabled={isSubmitScoreFormVisible}
                        >Lower</button>
                        <button
                            type="button"
                            onClick={handleButtonHigher}
                            disabled={isSubmitScoreFormVisible}
                        >Higher</button>
                    </div>
                </section>

                <section id="submit-score" style={styleSubmitScore}>
                    <h2>Submit Your Score</h2>
                    <p>You scored {score}! Add your details to the global leaderboard.</p>
                    {isNameValid === null || isNameValid === true
                        ? null
                        : <div className="error">Name can only contain letters and numbers and must start with a letter.</div>
                    }
                    <form>
                        <div className="label-and-input">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={nameInput}
                                onChange={handleNameInput}
                                maxLength="10"
                            />
                        </div>
                        
                        <Countries countryInput={countryInput} setCountryInput={setCountryInput} />

                        {isScoreBeingSubmitted
                            ? <p>Submitting score...</p>
                            : null
                        }
                        
                        <div className="buttons">
                            <button
                                type="button"
                                onClick={handleCancelSubmitScoreButton}
                            >Cancel</button>
                            <button
                                type="button"
                                onClick={handleSubmitScoreButton}
                                disabled={
                                    !nameInput ||
                                    countryInput === "Select Your Country" ||
                                    !isNameValid ||
                                    isScoreNotPostedMessageVisible ||
                                    isScoreBeingSubmitted
                                }
                            >Submit</button>
                        </div>
                    </form>
                </section>

                <section id="global-leaderboard">
                    <h2>Global Leaderboard</h2>
                    {globalLeaderboard.length > 0
                        ? <div id="global-leaderboard-table">
                            <div id="global-leaderboard-headers">
                                <div>#</div>
                                <div>Name</div>
                                <div>Country</div>
                                <div>Score</div>
                            </div>
                            {globalLeaderboard.map((score) => {
                                return (
                                    <div key={score.rank} className="global-leaderboard-row">
                                        <div>{score.rank}</div>
                                        <div className="global-leaderboard-column-name">{score.name}</div>
                                        <div>{score.country}</div>
                                        <div>{score.score}</div>
                                    </div>
                                )
                            })}
                        </div>
                        : <div id="global-leaderboard-first-player-message">Be the first player on the global leaderboard.</div>
                    }
                </section>
            </main>
        </div>
    )
}