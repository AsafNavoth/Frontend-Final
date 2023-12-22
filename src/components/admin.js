import {useContext} from "react";
import {BlogContext} from "../Providers/blog-provider";
import {EditPost} from "./edit-post";
import {useForm} from "react-hook-form";

export function Admin() {
    const {addPost, clearPosts} = useContext(BlogContext);
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const randomImage = Math.floor(Math.random() * 28)

    // Regex to enforce input patterns
    const lettersAndNumbersRgx = /^[A-Za-z0-9 ']*$/;
    const articleContentRgx = /^(?:(?!:\/\/|www\.)[^"<>()\[\]\\.,;:\s@"]+)*$/;


    const handlePostFormSubmit = (data) => {
        const formData = {
            postId: new Date().getMilliseconds().toString(),
            publishDate: (new Date()).toLocaleDateString('en-GB'),
            postTitle: data.postTitle,
            postBlurb: data.postBlurb,
            postCategory: data.postCategory,
            imgAddress: `/images/articleImage (${randomImage}).png`
        };

        addPost(formData);
        reset();
    };

    const handleClearAllButton = () => {
        window.confirm("Are you sure you wish to delete all posts?") && clearPosts()
    }

    return (
        <div className="adminForms">
            <div className="postFormWrapper">
                <form className="addPostForm" onSubmit={handleSubmit(data => handlePostFormSubmit(data))}>
                    <label htmlFor="postTitleId">Enter Post Title</label>
                    <input
                        {...register("postTitle", {
                            required: "This is a required field.", pattern: {
                                value: lettersAndNumbersRgx,
                                message: "Please only enter letters and numbers."
                            }
                        })}
                        type="text"
                        id="postTitleId"
                        placeholder="Post Title"/>
                    {errors.postTitle && <p>{errors.postTitle.message}</p>}
                    <label htmlFor="postBlurbId">Enter Post blurb</label>
                    <textarea
                        {...register("postBlurb", {
                            required: "This is a required field.", pattern: {
                                value: articleContentRgx,
                                message: "Please don't enter URLs or code."
                            }
                        })}
                        id="postBlurbId"
                        placeholder="Post Blurb"/>
                    {errors.postBlurb && <p>{errors.postBlurb.message}</p>}
                    <label htmlFor="postCategoryId">Enter Post Category</label>
                    <select
                        {...register("postCategory", {
                            required: "This is a required field."
                        })} id="postCategoryId">
                        <option value="">Select Category</option>
                        <option value="Daily Digest">Daily Digest</option>
                        <option value="Design Tools">Design Tools</option>
                        <option value="Tutorials">Tutorials</option>
                    </select>
                    {errors.postCategory && <p>{errors.postCategory.message}</p>}
                    <button type="submit">Submit Post</button>
                </form>
                <button onClick={handleClearAllButton}>Clear All Posts</button>
            </div>
            <EditPost/>
        </div>

    );
}
