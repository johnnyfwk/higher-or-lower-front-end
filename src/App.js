import './App.css';
import { Routes, Route } from 'react-router-dom';
import Logo from './components/Logo';
import Home from './pages/Home';
import Footer from './components/Footer';
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from './pages/PrivacyPolicy';
import Disclaimer from './pages/Disclaimer';

function App() {
    return (
        <div className="App">
            <Logo />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;