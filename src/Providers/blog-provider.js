import {createContext, useEffect, useState} from "react";

export const BlogContext = createContext(null);

export function BlogProvider({children}) {
    const [listOfPosts, setPosts] = useState([]);

    const savePostsToLocal = (list) => {
        localStorage.setItem('listOfPosts', JSON.stringify(list));
    }

    // Set post list using localStorage in case of refresh/close
    useEffect(() => {
        const stringifiedListOfPosts = localStorage.getItem('listOfPosts')
        if (stringifiedListOfPosts) {
            setPosts(JSON.parse(stringifiedListOfPosts))
        }
    }, []);


    const getListByCategory = (category) => listOfPosts.filter(post => post.postCategory === category);

    const clearPosts = () => {
        setPosts([])
        savePostsToLocal(listOfPosts)
    }

    // Posts are added before the existing list
    // so that the most recently added posts appear first
    const addPost = (post) => {
        setPosts([post, ...listOfPosts])
        savePostsToLocal([post, ...listOfPosts])
    }

    const deletePost = (id) => {
        const filteredList = listOfPosts.filter(post => post.postId !== id)
        setPosts(filteredList)
        savePostsToLocal(filteredList)
    }

    const editPost = (data, selectedPost) => {
        if (selectedPost) {
            listOfPosts.map(post => {
                if (post.postId === selectedPost.postId) {
                    post.postTitle = data.postTitleEdit;
                    post.postBlurb = data.postBlurbEdit;
                }
                savePostsToLocal(listOfPosts)
            })
        }
    }

    const value = {listOfPosts, addPost, deletePost, clearPosts, editPost, getListByCategory}

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    )
}