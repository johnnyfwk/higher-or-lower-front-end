import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import * as utils from "../utils";
import * as api from "../api";

export default function Home() {
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
    }, [])

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
            setScore(0);
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
            setScore(0);
        }
    }

    const styleCurrentNumber = {
        color: isGuessCorrect === null
            ? "#FFFFFF"
            : isGuessCorrect === true
                ? "#32CD32"
                : "#FF206E"
    }

    if (isLoading) {
        return (
            <header>
                <p>Page is loading...</p>
            </header>
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

            <header>
                <h1>Higher or Lower</h1>
                <p>A random number between 1 and 100 (inclusive) has been generated. Guess whether the next number will be higher or lower than the current number.</p>
                <p>If you guess correctly enough times in a row, you will be immortalised on our global leaderboard forever...or until someone beats your score.</p>
            </header>

            <main>
                <section>
                    <div id="scores">
                        <div>High Score: {highScore}</div>
                        <div>Score: {score}</div>
                    </div>
                    
                    <div className="current-random-number" style={styleCurrentNumber}>{currentNumber}</div>

                    {previousNumber
                        ? <div className="previous-random-number">Previous number: {previousNumber}</div>
                        : null
                    }

                    <div>
                        <button type="button" onClick={handleButtonLower}>Lower</button>
                        <button type="button" onClick={handleButtonHigher}>Higher</button>
                    </div>
                </section>

                <section id="global-leaderboard">
                    <h2>Global Leaderboard</h2>
                    <div id="global-leaderboard-table">
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
                                    <div>{score.name}</div>
                                    <div>{score.country}</div>
                                    <div>{score.score}</div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </main>
        </div>
    )
}