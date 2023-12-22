import {useContext} from "react";
import {Link, useLocation} from "react-router-dom";
import {AuthContext} from "../Providers/auth-provider";

export function Header() {

    const {user, signOut} = useContext(AuthContext);

    // Keep track of current route path
    // This is used for className changes for page-specific styling
    const location = useLocation()

    // Regex to check whether the current URL is on one of
    // the random articles (i.e. after /article/ it's just a number between 1 and 100)
    const randomArticleRgx = /^\/article\/\d{1,2}$/;

    const scrollToTopOfPage = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

    };

    return (
        <header className="navigation">
            <p onClick={scrollToTopOfPage} className="logo">
                <Link to="/">Personally™
                </Link>
            </p>
            <div className="right-buttons">
                <nav className="navCategories">
                    <Link onClick={scrollToTopOfPage}
                          className={location.pathname.includes('Daily%20Digest') ? 'currentPageButton' : ''}
                          id="dailyDigest"
                          to="/category/Daily Digest">Daily Digest
                    </Link>
                    <Link onClick={scrollToTopOfPage}
                          className={location.pathname.includes('Design%20Tools') ? 'currentPageButton' : ''}
                          id="designTools"
                          to="/category/Design Tools">Design Tools
                    </Link>
                    <Link onClick={scrollToTopOfPage}
                          className={location.pathname.includes('Tutorials') ? 'currentPageButton' : ''} id="tutorials"
                          to="/category/Tutorials">Tutorials
                    </Link>
                    <Link onClick={scrollToTopOfPage} to={`article/${Math.floor((Math.random() * 101))}`}
                          className={location.pathname.match(randomArticleRgx) ? 'currentPageButton' : ''}>
                        Random Article
                    </Link>
                    {/* This section determines when to display the Sign In, Sign Out
                     & Admin link elements in the header.*/}
                    {user ? <>
                            <Link onClick={scrollToTopOfPage}
                                  className={location.pathname.includes('/admin') ? 'currentPageButton' : ''} id="Admin"
                                  to="admin">Admin
                            </Link>
                            <Link to="/" className="subButton" onClick={() => {
                                signOut();
                                scrollToTopOfPage();
                            }}>Sign Out
                            </Link>
                        </> :
                         !location.pathname.includes('/sign-in') ?
                             <Link onClick={scrollToTopOfPage} to="/sign-in/" className="subButton">
                            Sign In</Link>: ''
                    }
                </nav>
                <a href={"#newsletter"} className="subButton" id="headerSubButton">
                    Subscribe
                </a>
            </div>
        </header>
    )
}