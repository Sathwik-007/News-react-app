import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Main";
import HomePage from "./pages/Home";
import PostArticle from "./pages/PostArticle";
import ErrorPage from "./pages/Error";
import ArticleDetails from "./pages/ArticleDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, 
        element: <HomePage />, 
      },
      {
        path: "post-article",
        element: <PostArticle />
      },
      {
        path: "articles/:articleId",
        element: <ArticleDetails />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
