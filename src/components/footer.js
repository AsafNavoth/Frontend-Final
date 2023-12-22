import {Link} from "react-router-dom";

export function Footer() {
    return (
        <footer>
            <div className="upperFooter">
                <h2>Personally Newsletter</h2>
                <h3>
                    A bi-weekly newsletter of design inspiration, resources <br/>and anything
                    related to career development.
                </h3>
                <div className="lowerFooter">
                    <form className="newsletter" id="newsletter">
                        <input type="text" className="emailAddress" id="emailAddress" placeholder="Email Address"/>
                        <label htmlFor="emailAddress">
                            <button className="subButton">Subscribe</button>
                        </label>
                    </form>
                    <Link to="/contact-us">Contact Us</Link>
                </div>
            </div>
            <hr/>
            <p className="copyRight">Figma Design Copyright 2021 - Elikem Daniels</p>
        </footer>
    );
}