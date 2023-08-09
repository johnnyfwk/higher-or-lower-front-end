import { Helmet } from "react-helmet";

export default function TermsAndConditions() {
    return (
        <div id="terms-and-conditions">
            <Helmet>
                <link rel="canonical" href="https://higherorlower.co.uk/terms-and-conditions" />
                <title>Terms & Conditions • Higher or Lower</title>
                <meta name="description" content="The terms and conditions for HigherorLower.co.uk." />
            </Helmet>

            <header className="max-width">
                <h1>Terms & Conditions</h1>
            </header>

            <main className="max-width">
                <p>These Terms and Conditions ("Agreement") govern your use of the "Higher or Lower" game ("Game") provided on this website ("Website"). By accessing or using the Game, you agree to be bound by this Agreement. If you do not agree with these terms, please refrain from using the Game.</p>

                <h2>Gameplay</h2>
                <p>The Game involves predicting whether the next number will be higher or lower than the current number displayed.</p>
                <p>Your predictions are solely based on chance and do not require any skill or knowledge.</p>
                <p>The numbers generated in the Game are entirely random and not influenced by external factors.</p>

                <h2>Responsible Gaming</h2>
                <p>The Game is intended for entertainment purposes only. You should not consider the Game as a means to make money or as a form of gambling.</p>
                <p>If you believe you may have a gambling problem, we encourage you to seek help from appropriate resources.</p>

                <h2>Termination</h2>
                <p>We reserve the right to suspend or terminate your access to the Game at our discretion, without notice or liability, for any reason including, but not limited to, violation of these Terms and Conditions.</p>

                <h2>Intellectual Property</h2>
                <p>The Game, including all its components, graphics, and designs, are protected by intellectual property laws and are owned by the Website or its licensors. You are granted a limited, non-transferable, non-exclusive, revocable license to use the Game solely for personal, non-commercial purposes.</p>

                <h2>Disclaimer of Warranties</h2>
                <p>The Game is provided "as is" and "as available" without any warranties of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>

                <h2>Limitation of Liability</h2>
                <p>In no event shall the Website or its affiliates be liable to you for any indirect, consequential, incidental, special, punitive damages, or any loss or damages whatsoever arising out of or in connection with your use of the Game.</p>

                <h2>Changes to Terms and Conditions</h2>
                <p>We reserve the right to update or modify these Terms and Conditions at any time. It is your responsibility to review these terms periodically for changes.</p>

                <h2>Governing Law</h2>
                <p>This Agreement shall be governed by and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law principles.</p>
                <p>By accessing and using the Game, you acknowledge that you have read, understood, and agreed to these Terms and Conditions. If you do not agree with any part of this Agreement, you should not use the Game.</p>
                <p>Last updated: 9 August 2023.</p>
                <p>For any inquiries regarding these Terms and Conditions, please contact us at hi@higherorlower.co.uk.</p>
            </main>
        </div>
    )
}