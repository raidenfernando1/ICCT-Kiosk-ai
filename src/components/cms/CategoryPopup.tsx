import React, { useEffect } from "react";
import styled from "styled-components";
import { fetchGroupData } from "../../hooks/useSupabase";
import { useState } from "react";

const Popup = {
  Main: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    overflow: hidden;

    > :first-child {
      width: 50%;
    }
    > :last-child {
      width: 50%;
    }
  `,
  Left: styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding-top: 30px;
  `,
  Right: styled.div`
    padding-block: 30px;
  `,

  Questions: styled.ul`
    overflow-y: auto;
    flex: 1;
    list-style: none;
    margin-top: 30px;
  `,
  Content: styled.div`
    margin-top: 30px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding-right: 10px;
  `,
  Textarea: styled.div`
    margin-top: 30px;
    flex: 1;
    overflow: hidden;
    display: flex;

    > textarea {
      background: none;
      border: none;
      outline: none;
      color: inherit;
      width: 100%;
      font-size: 1rem;
    }
  `,
};

const CategoryPopup: React.FC<{ groupId: string | null }> = ({ groupId }) => {
  const [content, setContent] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!groupId) return;
    setLoading(true);

    fetchGroupData(groupId)
      .then((data) => {
        setContent(data?.[0]?.content || "No content available");
        setQuestions(data?.[0]?.questions || []);
      })
      .catch(() => setContent("Error loading content"))
      .finally(() => setLoading(false));
  }, [groupId]);

  return (
    <Popup.Main>
      <Popup.Left>
        <p>Possible Questions</p>
        <Popup.Questions>
          {loading ? (
            <p>Loading...</p>
          ) : (
            questions.map((question, index) => <p key={index}>{question}</p>)
          )}
        </Popup.Questions>
      </Popup.Left>
      <Popup.Content>
        <p>Contents</p>
        <Popup.Textarea>
          <textarea readOnly value={loading ? "Loading..." : content} />
        </Popup.Textarea>
      </Popup.Content>
    </Popup.Main>
  );
};

export default CategoryPopup;
