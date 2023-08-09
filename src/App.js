import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Logo from './components/Logo';
import Home from './pages/Home';
import Footer from './components/Footer';
import TermsAndConditions from "./pages/TermsAndConditions";
import './App.css';

function App() {
    const [isScorePostedMessageVisible, setIsScorePostedMessageVisible] = useState(false);
    const [isScoreNotPostedMessageVisible, setIsScoreNotPostedMessageVisible] = useState(false);

    const styleScoreAddedToGlobalLeaderboard = {
        bottom: isScorePostedMessageVisible ? "0%" : "-100%"
    }

    const styleScoreNotAddedToGlobalLeaderboard = {
        bottom: isScoreNotPostedMessageVisible ? "0%" : "-100%"
    }

    return (
        <div className="App">
            <Logo />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            setIsScorePostedMessageVisible={setIsScorePostedMessageVisible}
                            isScoreNotPostedMessageVisible={isScoreNotPostedMessageVisible}
                            setIsScoreNotPostedMessageVisible={setIsScoreNotPostedMessageVisible}
                        />
                    }
                />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            </Routes>
            <Footer />

            <div id="score-added-to-global-leaderboard" style={styleScoreAddedToGlobalLeaderboard}>Your score has been added to the global leaderboard</div>
            <div id="score-not-added-to-global-leaderboard" style={styleScoreNotAddedToGlobalLeaderboard}>Your score could not be added to the global leaderboard</div>
        </div>
    );
}

export default App;