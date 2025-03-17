import styled from "styled-components";
import CardPopup from "./EntryCard";
import { fetchMainEntries } from "../../hooks/useSupabase";
import { useEffect, useState } from "react";
import { CMSStore } from "../../context/useCMS";
import { DefaultBar } from "./ActionBars";

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
  const [mainEntries, setMainEntries] = useState<
    { group_id: string; question: string }[]
  >([]);
  const { openPopup, setSelectedEntry } = CMSStore();

  useEffect(() => {
    async function getMainEntries() {
      const data = await fetchMainEntries();
      setMainEntries(data);
    }
    getMainEntries();
  }, []);

  return (
    <Container.Main>
      <DefaultBar />
      <Container.Contents>
        {mainEntries.map((entry) => (
          <CardPopup
            key={entry.group_id}
            question={entry.question}
            groupId={entry.group_id}
            onClick={() => {
              setSelectedEntry(entry.group_id);
              openPopup("entryPopup");
            }}
          />
        ))}
      </Container.Contents>
    </Container.Main>
  );
};

export default ContentContainer;
