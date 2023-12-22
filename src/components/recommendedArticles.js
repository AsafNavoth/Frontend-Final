import {Post} from "./post";
import {useContext} from "react";
import {BlogContext} from "../Providers/blog-provider";

export function RecommendedArticles(props) {
    const {listOfPosts} = useContext(BlogContext);

    // Create list of 3 articles to recommend, that
    // don't share a name with the current article
    const getList = (category) => listOfPosts.filter(post => post.postCategory === category &&
        post.postTitle !== props.articleName).slice(0, 3)

    return (
        <div className="recommendedArticles">
            <h1>Recommended Articles</h1>
            <Post onClickArticle={props.onClickArticle} list={getList(props.category)}/>
        </div>
    )
}