import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../Providers/blog-provider";
import {useForm} from "react-hook-form";

export function EditPost() {

    const {listOfPosts, editPost} = useContext(BlogContext);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [uniqueCategories, setUniqueCategories] = useState([]);
    const [selectedPost, setSelectedPost] = useState(filteredPosts[0]);

    // useForm setup with empty default values for when no post is selected
    const {register, handleSubmit, reset, formState: {errors}} = useForm({values: {
            postTitleEdit:  selectedPost ? selectedPost.postTitle: '',
            postBlurbEdit: selectedPost ? selectedPost.postBlurb: ''
        }});

    // Use regex to make sure titles only contain text, spaces and single quotes
    // And that article content doesn't contain URLs and code.
    const editTitleRgx = /^[A-Za-z0-9 ']*$/;
    const articleContentRgx = /^(?:(?!:\/\/|www\.)[^"<>()\[\]\\.,;:\s@"]+)*$/;

    // Create set of unique categories to display in the category selection dropdown menu
    useEffect(() => {
        const categoriesSet = new Set(listOfPosts.map((post) => post.postCategory));
        const uniqueCategoriesArray = Array.from(categoriesSet);

        setUniqueCategories(uniqueCategoriesArray);
    }, [listOfPosts])


    const handleCategoryChange = (event) => {
        event.preventDefault();

        // Clear selected post if no category is selected
        const category = event.target.value;
        if (!category) {
            setSelectedPost(null);
        }

        // Filter the posts based on the selected category
        const postsInCategory = listOfPosts.filter((post) => post.postCategory === category);
        setFilteredPosts(postsInCategory);
    };

    // Keep track of selected post, so we know what to edit
    // and what to display in the form fields
    const handlePostChange = (event) => {
        event.preventDefault();

        const id = event.target.value.toString();
        setSelectedPost(listOfPosts.find(post => post.postId === id))
    };

    const handlePostEdit = (data) => {
        editPost(data, selectedPost);
        reset()
        setSelectedPost(null)
    };

    return (
        <div className="postEditFormWrapper">
            <form className="categoryAndPostSelectForm">
                <label htmlFor="postCategoryList">Select Category:</label>
                <select id="postCategoryList" onChange={handleCategoryChange} >
                    <option value="">Select Category</option>
                    {uniqueCategories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <label htmlFor="postEditTitleList">Select Post:</label>
                <select id="postEditTitleList" onChange={handlePostChange}>
                    <option value="">Select Post</option>
                    {filteredPosts.map((post) => (
                        <option key={post.postTitle} value={post.postId}>
                            {post.postTitle}
                        </option>
                    ))}
                </select>
            </form>
            <form className="postEditForm" onSubmit={handleSubmit(data => handlePostEdit(data))}>
                <label htmlFor="postTitleEdit">Edit Title</label>
                <input {...register("postTitleEdit", {
                    required: "This is a required field", maxLength: {
                        value: 15,
                        message: "Title mustn't be more than 15 characters long."
                    },
                    pattern: {
                        value: editTitleRgx,
                        message: "Please enter letters and numbers only."
                    }
                })} type="text" id="postTitleEdit" placeholder={selectedPost ? selectedPost.postTitle: ''}/>
                {errors.postTitleEdit && <p>{errors.postTitleEdit.message}</p>}
                <label htmlFor="postBlurbEdit">Edit Content</label>
                <textarea {...register("postBlurbEdit", {
                    required: "This is a required field", maxLength: {
                        value: 500,
                        message: "Content mustn't be more than 500 characters long."
                    },
                    pattern: {
                        value: articleContentRgx,
                        message: "Please don't enter URLs or code."
                    }
                })} id="postBlurbEdit" placeholder={selectedPost ? selectedPost.postBlurb: ''}/>
                {errors.postBlurbEdit && <p>{errors.postBlurbEdit.message}</p>}
                <button type="submit">Submit Edit</button>
            </form>
        </div>
    )
}