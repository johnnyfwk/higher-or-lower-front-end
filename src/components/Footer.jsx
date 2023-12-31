import { Link } from "react-router-dom";

export default function Footer() {
    function onClickFooterLinks() {
        window.scrollTo(0, 0);
    }

    return (
        <footer className="max-width">
            <div id="footer-links" onClick={onClickFooterLinks}>
                <Link to="/terms-and-conditions">Terms & Conditions</Link>
            </div>
            <div id="copyright">Copyright &copy; {new Date().getFullYear()} HigherorLower.co.uk. All Rights Reserved.</div>
        </footer>
    )
}