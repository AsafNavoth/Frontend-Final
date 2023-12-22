import {BlogContext} from "../Providers/blog-provider";
import {useContext} from "react";
import {AuthContext} from "../Providers/auth-provider";
import {Link} from "react-router-dom";

export function Post(props) {
    const {deletePost} = useContext(BlogContext);
    const {user} = useContext(AuthContext);

    const scrollToTopOfPage = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };

    return (
        <div>
            {props.list.map((post, index) => (
                <div key={index} onClick={scrollToTopOfPage} className="article">
                    <div className="articleText">
                        <div className="articleHead">
                            <div className="articleButtons">
                                <Link to={`/article/single/${post.postTitle}`}>Read More</Link>
                                {user ? <button onClick={() => deletePost(post.postId)}>Delete</button> : null}
                            </div>
                            <p className="publishDate">{post.publishDate}</p>
                            <h3 className="articleTitle">{post.postTitle}</h3>
                        </div>
                        <p className="summaryBlurb">{post.postBlurb}</p>
                    </div>
                    <img src={post.imgAddress} alt=""/>
                </div>))}
        </div>);
}