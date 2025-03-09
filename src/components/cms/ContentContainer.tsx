import styled from "styled-components";
import CategoryCard from "./CategoryCard";
import CategoryPopup from "./CategoryPopup";
import { useCMS } from "../../context/useCMS";
import { fetchMainEntries } from "../../hooks/useSupabase";
import { useEffect } from "react";
import { useState } from "react";
import SearchBar from "./SearchBar";

const Container = {
  Container: styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden; /* Prevent container from scrolling */
  `,

  PopupWrapper: styled.div`
    flex: 1; /* Take remaining space */
    overflow: hidden; /* Ensure no overflow */
  `,
  ContentsContainer: styled.ul`
    padding-block: 30px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  `,
};

const ContentContainer = () => {
  const { isPopup, setIsPopup } = useCMS();
  const [mainEntries, setMainEntries] = useState<
    { group_id: string; question: string }[]
  >([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  useEffect(() => {
    async function getMainEntries() {
      const data = await fetchMainEntries();
      setMainEntries(data);
    }
    getMainEntries();
  }, []);

  const handleClick = (groupId: string) => {
    setSelectedGroupId(groupId);
    setIsPopup(true);
  };

  return (
    <Container.Container>
      <SearchBar groupId={selectedGroupId} />

      {!isPopup ? (
        <Container.ContentsContainer>
          {mainEntries.map((entry) => (
            <CategoryCard
              key={entry.group_id}
              question={entry.question}
              groupId={entry.group_id}
              onClick={() => handleClick(entry.group_id)} // ✅ Pass groupId on click
            />
          ))}
        </Container.ContentsContainer>
      ) : (
        <Container.PopupWrapper>
          <CategoryPopup groupId={selectedGroupId} />
        </Container.PopupWrapper>
      )}
    </Container.Container>
  );
};

export default ContentContainer;
