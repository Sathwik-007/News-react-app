import classes from "./PostArticle.module.css";

const PostArticle = () => {
  return (
    <form className={classes.container}>
      <div className={classes.main_container}>
        {/* input for title */}
        <div className={classes.title}>
          <textarea type="text" placeholder="Add title..." />
        </div>
        {/* input for content */}
        <div className={classes.content}>
          <textarea type="text" placeholder="Description..." />
        </div>
        {/* image upload button */}
        
      </div>
    </form>
  );
};

export default PostArticle;
