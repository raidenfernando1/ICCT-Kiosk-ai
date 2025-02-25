import { useState, useRef, useEffect, useContext } from "react";
import styles from "./styles.module.css";
import { GroqContext } from "../../../context/useGroq";

const InputBar: React.FC = () => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MAX_HEIGHT = 150;
  const CHAR_LIMIT = 500;
  const groq = useContext(GroqContext);

  useEffect(() => {
    adjustHeight();
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= CHAR_LIMIT) {
      setValue(newValue);
    }
  };

  // adjusts input bar height when text get too long.
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, MAX_HEIGHT);
      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY =
        textarea.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (value.trim()) {
      setValue("");
      await groq?.createPrompt(value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.InputBar}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          placeholder="Ask me anything!"
          className={styles.textarea}
          rows={1}
          maxLength={CHAR_LIMIT}
        />
        <div className={styles.CTAbtns}>
          <div className={styles.charCount}>
            {value.length}/{CHAR_LIMIT}
          </div>
          <button type="submit">SUBMIT</button>
        </div>
      </div>
    </form>
  );
};

export default InputBar;
