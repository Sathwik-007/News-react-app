import classes from "./Home.module.css";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const HomePage = () => {
  const [category, setCategory] = useState("");
  const [topPosts, setTopPosts] = useState([]);

  const setCategoryHandler = (category) => {
    setCategory(category);
  };
  const articlesThroughProps = (articles) => {
    let posts = [];
    for (let i = 0; i < 5; i++) {
      posts.push(articles[i]);
    }
    /**
     * @dev sort the posts here itself before setting the state.
     */
    setTopPosts(posts);
    // console.log(topPosts);
  };
  return (
    <div className={classes.main_content}>
      <Sidebar topPosts={topPosts} choosenCategory={setCategoryHandler} />
      <div className={classes.right_div}>
        <MainContent
          articles={articlesThroughProps}
          selectedCategory={category}
        />
      </div>
    </div>
  );
};

export default HomePage;
