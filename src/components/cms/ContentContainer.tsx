import styled from "styled-components";
import CategoryCard from "./CategoryCard";
import CategoryPopup from "./CategoryPopup";
import { useCMS } from "../../context/useCMS";
import { fetchMainEntries } from "../../hooks/useSupabase";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import AddEntry from "./AddEntry";

const Container = {
  Main: styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `,
  Wrapper: styled.div`
    flex: 1;
    overflow: hidden;
  `,
  Contents: styled.ul`
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
  const { isPopup, setIsPopup, insertPopup } = useCMS();
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
    if (!insertPopup) {
      setSelectedGroupId(groupId);
      setIsPopup(true);
    }
  };

  return (
    <Container.Main>
      <SearchBar groupId={selectedGroupId} />

      {insertPopup ? (
        <Container.Wrapper>
          <AddEntry />
        </Container.Wrapper>
      ) : isPopup ? (
        <Container.Wrapper>
          <CategoryPopup groupId={selectedGroupId} />
        </Container.Wrapper>
      ) : (
        <Container.Contents>
          {mainEntries.map((entry) => (
            <CategoryCard
              key={entry.group_id}
              question={entry.question}
              groupId={entry.group_id}
              onClick={() => handleClick(entry.group_id)}
            />
          ))}
        </Container.Contents>
      )}
    </Container.Main>
  );
};

export default ContentContainer;
