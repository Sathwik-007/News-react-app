import { defer, Link } from "react-router-dom";
import classes from "./TopPosts.module.css";

const TopPosts = (props) => {
  const TOP_POSTS = props.topPosts;
  // console.log(TOP_POSTS);
  // TOP_POSTS.sort((a, b) => a.)
  return (
    <div className={classes.side_card}>
      <h4>Top Posts</h4>
      <ol>
        {TOP_POSTS.map((post) => (
          <Link to={`articles/${post.articleId}`}>
            <li>
              <h6>{post.title}</h6>
              <p>{new Date(post.timestamp * 1000).toDateString()}</p>
            </li>
            <hr />
          </Link>
        ))}
      </ol>
    </div>
  );
};

export default TopPosts;

async function loader() {}

export function headlinesLoader() {
  return defer({
    topHeadlines: loader(),
  });
}
