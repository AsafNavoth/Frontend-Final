import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import {ErrorPage} from './components/errorPage';
import App from './App';
import {Admin} from "./components/admin";
import {Home} from "./components/home";
import {RandomArticle} from "./components/randomArticlePage";
import {CategoryPage} from "./components/category-page";
import {BlogProvider} from "./Providers/blog-provider";
import {AuthProvider} from "./Providers/auth-provider";
import {SignInPage} from "./components/sign-in-page";
import {SingleArticlePage} from "./components/singleArticlePage";
import {ContactPage} from "./components/contact";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home/>,
                errorElement: <ErrorPage/>
            },
            {
                path: "/sign-in",
                element: <SignInPage/>,
                errorElement: <ErrorPage/>
            },
            {
                path: "/admin",
                element: <Admin/>,
                errorElement: <ErrorPage/>
            },
            {
                path: "/article/:id",
                element: <RandomArticle/>,
                errorElement: <ErrorPage/>
            },
            {
                path: "/article/single/:title",
                element: <SingleArticlePage/>,
                errorElement: <ErrorPage/>
            },
            {
                path: "/category/Daily Digest",
                element: <CategoryPage category="Daily Digest"/>,
                errorElement: <ErrorPage/>
            },
            {
                path: "/category/Design Tools",
                element: <CategoryPage category="Design Tools"/>,
                errorElement: <ErrorPage/>
            },
            {
                path: "/category/Tutorials",
                element: <CategoryPage category="Tutorials"/>,
                errorElement: <ErrorPage/>
            },
            {
                path: "/contact-us",
                element: <ContactPage/>,
                errorElement: <ErrorPage/>
            }
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <AuthProvider>
            <BlogProvider>
                <RouterProvider router={router}/>
            </BlogProvider>
        </AuthProvider>
    </React.StrictMode>
)
