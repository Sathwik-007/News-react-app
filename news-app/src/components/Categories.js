import classes from "./Categories.module.css";

const CATEGORIES = [
  "All",
  "World",
  "Technology",
  "Politics",
  "Finance",
  "Health",
  "Travel",
];

const Categories = (props) => {
  const captureCategory = (event) => {
    const category = event.target.innerHTML;
    props.category(category);
  }
  return (
    <div className={classes.category_side_card}>
      <h4>Categories</h4>
      <br />
      {CATEGORIES.map((category) => (
        <div key={category}>
          <button onClick={captureCategory}>{category}</button>
          <hr></hr>
        </div>
      ))}
    </div>
  );
};

export default Categories;
