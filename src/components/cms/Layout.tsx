import styled from "styled-components";
import { CMSStore } from "../../context/useCMS";
import AddEntry from "./AddEntry";

import EntryContainer from "./Container";
import CardPopup from "./CardPopup";

const Layout = {
  Main: styled.div`
    height: 100%;
    width: 100%;
  `,
};

export default function CMSLayout() {
  const { popups, selectedEntry } = CMSStore();

  let content;
  if (popups.addPopup) {
    content = <AddEntry />;
  } else if (popups.entryPopup) {
    content = <CardPopup groupId={selectedEntry} />;
  } else {
    content = <EntryContainer />;
  }

  return (
    <>
      <Layout.Main>{content}</Layout.Main>
    </>
  );
}
