import { useState } from "react";
import styled from "styled-components";
import { insertData } from "../../hooks/useSupabase";
import { AddBar } from "./ActionBars";
import { CMSStore } from "../../context/useCMS";

const Container = {
  Main: styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,

  Left: styled.div`
    padding: 10px 0px;
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
  `,
  Right: styled.div`
    height: 100%;
    width: 50%;
    padding: 10px 0px;

    > textarea {
      outline: none;
      font-size: 1.2rem;
      border: 1px solid rgb(55, 55, 55);
      padding: 10px;
      border-radius: 5px;
      background: none;
      color: inherit;
      height: 100%;
      width: 100%;
      resize: none;
    }
  `,
  Questions: styled.ul`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    list-style: none;
    padding: 0;
    font-weight: bold;
    font-size: 1rem;
  `,
  Item: styled.li`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  Input: styled.div`
    display: flex;
    gap: 10px;

    > button {
      background: none;
      font-weight: bold;
      color: inherit;
      border: 1px solid rgb(55, 55, 55);
      border-radius: 5px;
    }

    > input {
      width: 100%;
      background: none;
      padding: 5px;
      outline: none;
      color: inherit;
      font-size: 1.2rem;
      border: 1px solid rgb(55, 55, 55);
      border-radius: 5px;
    }
  `,
  Wrapper: styled.div`
    height: 100%;
    display: flex;
    gap: 30px;
  `,
};

const AddEntry = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [mainIndex, setMainIndex] = useState<number>(0);
  const { closePopup } = CMSStore();

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, newQuestion.trim()]);
      setNewQuestion("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (questions.length === 0 || !content) return;
    await insertData(questions, content, mainIndex);
    closePopup("addPopup");
  };

  return (
    <Container.Main onSubmit={handleSubmit}>
      <AddBar insertData={() => handleSubmit} />
      <Container.Wrapper>
        <Container.Left>
          <Container.Input>
            <input
              type="text"
              placeholder="Enter question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <button type="button" onClick={addQuestion}>
              Add Question
            </button>
          </Container.Input>
          <Container.Questions>
            {questions.map((question, index) => (
              <Container.Item key={index}>
                <input
                  type="radio"
                  checked={index === mainIndex}
                  onChange={() => setMainIndex(index)}
                />
                <p>{question}</p>
              </Container.Item>
            ))}
          </Container.Questions>
        </Container.Left>
        <Container.Right>
          <textarea
            placeholder="Enter Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Container.Right>
      </Container.Wrapper>
    </Container.Main>
  );
};

export default AddEntry;
