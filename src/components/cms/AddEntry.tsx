import { useState } from "react";
import styled from "styled-components";
import { insertData } from "../../hooks/useSupabase";

const Container = {
  Main: styled.form`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
  `,
  Left: styled.div`
    width: 50%;
  `,
  Right: styled.div`
    width: 50%;
  `,
  QuestionsContainer: styled.ul`
    list-style: none;
    padding: 0;
  `,
  QuestionItem: styled.li`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
};

const AddEntry = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [mainIndex, setMainIndex] = useState<number>(0);

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
  };

  return (
    <Container.Main onSubmit={handleSubmit}>
      <Container.Left>
        <input
          type="text"
          placeholder="Enter question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <button type="button" onClick={addQuestion}>
          Add Question
        </button>
        <Container.QuestionsContainer>
          {questions.map((q, index) => (
            <Container.QuestionItem key={index}>
              <input
                type="radio"
                checked={index === mainIndex}
                onChange={() => setMainIndex(index)}
              />
              <p>{q}</p>
            </Container.QuestionItem>
          ))}
        </Container.QuestionsContainer>
      </Container.Left>
      <Container.Right>
        <textarea
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Submit</button>
      </Container.Right>
    </Container.Main>
  );
};

export default AddEntry;
