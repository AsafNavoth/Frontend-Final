import {Post} from "./post";
import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../Providers/blog-provider";
import {useLocation} from "react-router-dom";

export function CategoryPage({category}) {
    const {getListByCategory} = useContext(BlogContext);
    const [searchInput, setSearchInput] = useState('');
    const [postsInPage, setPostsInPage] = useState(3);
    const location = useLocation();

    // We use this useEffect to make it so routing out of the category page
    // and then back to it will reset the posts in page number.
    useEffect(() => {
        setPostsInPage(3)
    }, [location]);

    // User input handler for the search function
    // converts to lowercase so that it's less strict
    const handleUserInput = (event) => {
        setSearchInput(event.target.value.toLowerCase())
    }

    const handleLoadMorePosts = () => {
        setPostsInPage(postsInPage + 3)
    }

    const filteredPosts = (category) => {
        return (
            getListByCategory(category)
                .filter(post => post.postTitle.toLowerCase().includes(searchInput)
                    || post.postBlurb.toLowerCase().includes(searchInput))
        )
    }

    return (
        <div className="categoryPage">
            <h1 className="categoryTitle">{category}</h1>
            <div className="postQuery">
                <label htmlFor="postQuery">Search Post</label>
                <input type="text" id="postQuery" onChange={handleUserInput}/>
            </div>
            <div className="categoryPagePosts">
            <Post list={filteredPosts(category).slice(0, postsInPage)}/>
            {(filteredPosts(category).length > postsInPage) ?
                <button className="loadMoreButton" onClick={handleLoadMorePosts}>Load More</button> : null}
            </div>
        </div>
    );
}