import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <div id="logo-container">
            <Link to="/" id="logo" className="max-width">Home</Link>
        </div>
    )
}