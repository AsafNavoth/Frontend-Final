import {RecommendedArticles} from "./recommendedArticles";
import {useParams} from "react-router-dom";
import {useContext} from "react";
import {BlogContext} from "../Providers/blog-provider";

export function SingleArticlePage() {
    const {listOfPosts} = useContext(BlogContext)
    const {title} = useParams();
    const post = listOfPosts.filter(post => post.postTitle === title)[0];

    return (
        <div className="container">
            {post ? (
                <div className="articlePage">
                    <div className="hero">
                        <h1>{post.postTitle}</h1>
                        <p>
                            {post.publishDate}・{post.postCategory}
                        </p>
                    </div>
                    <div className="articlePageContent">
                        <img src={post.imgAddress} alt="Article Image"/>
                        <div className="articleText">
                            <p className="paragraphOne">
                                {post.postBlurb}
                            </p>
                        </div>
                    </div>
                    <RecommendedArticles category={post.postCategory} articleName={post.postTitle}/>
                </div>
            ) : (
                <div className="spinner-border"
                     role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
        </div>
    )
}
