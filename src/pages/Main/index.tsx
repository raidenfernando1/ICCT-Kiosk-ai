import FaqSection from "../../components/faq-section";
import GroqChat from "../../components/groq-chat";
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
