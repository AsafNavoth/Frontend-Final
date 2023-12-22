import {Post} from "./post";
import {useContext} from "react";
import {BlogContext} from "../Providers/blog-provider";
import {Link} from "react-router-dom";

export function Posts() {

    const {getListByCategory} = useContext(BlogContext);


    return (
        <div className="articles">
            <div className="articleCard">
                <div className="categoryHeader">
                    <p className="categoryTitle">Daily Digest</p>
                    <Link to="/category/Daily Digest/" className="viewAllButton">
                        View All
                    </Link>
                </div>
                <Post
                    list={getListByCategory("Daily Digest").slice(0,3)}/>
            </div>
            <div className="articleCard">
                <div className="categoryHeader">
                    <p className="categoryTitle">Design Tools</p>
                    <Link to="/category/Design Tools" className="viewAllButton">
                        View All
                    </Link>
                </div>
                <Post
                    list={getListByCategory("Design Tools").slice(0,3)}/>
            </div>
            <div className="articleCard">
                <div className="categoryHeader">
                    <p className="categoryTitle">Tutorials</p>
                    <Link to="/category/Tutorials" className="viewAllButton">
                        View All
                    </Link>
                </div>
                <Post
                    list={getListByCategory("Tutorials").slice(0,3)}/>
            </div>
        </div>
    );
}
