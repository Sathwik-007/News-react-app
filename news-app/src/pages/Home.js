import classes from "./Home.module.css";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  return (
    <div className={classes.main_content}>
      <Sidebar />
      <div className={classes.right_div}>
        <MainContent />
      </div>
    </div>
  );
};

export default HomePage;
