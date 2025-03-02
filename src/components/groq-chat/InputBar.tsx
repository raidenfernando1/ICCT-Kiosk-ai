import { useState, useContext } from "react";
import { GroqContext } from "../../context/useGroq";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

const Container = {
  Container: styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: rgb(20, 20, 20);
    border: 1px solid rgb(55, 55, 55);
  `,
  InputWrapper: styled.div`
    display: flex;
    width: 100%;

    > textarea {
      border: none;
      background-color: transparent;
      outline: none;
      flex-grow: 1;
      font-size: 1.2rem;
      resize: none;
      color: inherit;
      padding: 5px;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
  `,
  CTAwrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 30px;

    > button {
      padding: 5px 10px;
      background-color: transparent;
      border: 1px solid rgb(190, 190, 190);
      color: inherit;
      cursor: pointer;
      border-radius: 5px;
    }
  `,
};

const InputBar: React.FC = () => {
  const [input, setInput] = useState("");
  const groq = useContext(GroqContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && input.length <= 300) {
      const currentInput = input;
      setInput("");
      await groq?.createPrompt(currentInput);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 300) {
      setInput(text);
    }
  };

  return (
    <Container.Container onSubmit={handleSubmit}>
      <Container.InputWrapper>
        <TextareaAutosize
          placeholder="Ask me anything."
          minRows={1}
          maxRows={6}
          value={input}
          onChange={handleChange}
          maxLength={300}
        />
      </Container.InputWrapper>
      <Container.CTAwrapper>
        <button
          type="submit"
          disabled={input.length === 0 || input.length > 300}
        >
          SUBMIT
        </button>
        <p>{input.length}/300</p>
      </Container.CTAwrapper>
    </Container.Container>
  );
};

export default InputBar;
