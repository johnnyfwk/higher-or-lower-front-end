import { Link } from "react-router-dom";

export default function Footer() {
    function onClickFooterLinks() {
        window.scrollTo(0, 0);
    }

    return (
        <footer>
            <div id="footer-links" onClick={onClickFooterLinks}>
                <Link to="/terms-and-conditions">Terms & Conditions</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/disclaimer">Disclaimer</Link>
            </div>
            <div id="copyright">Copyright &copy; {new Date().getFullYear()} HigherorLower.co.uk.com. All Rights Reserved.</div>
        </footer>
    )
}