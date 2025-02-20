import FaqSection from "../../components/Faq";
import GroqChat from "../../components/GroqChat";
import styles from "./styles.module.css";

const MainPage = () => {
  return (
    <div className={styles.MainContainer}>
      <GroqChat />
      <FaqSection />
    </div>
  );
};

export default MainPage;
