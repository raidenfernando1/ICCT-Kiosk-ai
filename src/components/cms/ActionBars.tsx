import styled from "styled-components";
import { CMSStore } from "../../context/useCMS";

const Default = {
  Main: styled.div`
    padding-block: 30px;
    border-bottom: 1px solid rgb(55, 55, 55);
    display: flex;
    justify-content: space-between;

    > input {
      padding: 5px 10px;
      width: 30%;
    }

    > button {
      padding: 5px 10px;
    }
  `,
};

const Add = {
  Main: styled.div`
    padding-block: 30px;
    border-bottom: 1px solid rgb(55, 55, 55);
    display: flex;
    gap: 10px;

    > :last-child {
      margin-left: auto;
    }

    > input {
      padding: 5px 10px;
      width: 30%;
    }

    > button {
      padding: 5px 10px;
    }
  `,
};

const Popup = {
  Main: styled.div`
    padding-block: 30px;
    border-bottom: 1px solid rgb(55, 55, 55);
    display: flex;
    gap: 10px;

    > :last-child {
      margin-left: auto;
    }

    > input {
      padding: 5px 10px;
      width: 30%;
    }

    > button {
      padding: 5px 10px;
    }
  `,
};

export function DefaultBar() {
  const { openPopup } = CMSStore();

  return (
    <Default.Main>
      <input placeholder="Search entry" />
      <button onClick={() => openPopup("addPopup")}>ADD AN ENTRY</button>
    </Default.Main>
  );
}

export function AddBar({ insertData }: { insertData: () => void }) {
  const { closePopup } = CMSStore();

  return (
    <Add.Main>
      <button onClick={insertData}>SUBMIT</button>
      <button onClick={() => closePopup("addPopup")}>EXIT</button>
    </Add.Main>
  );
}

export function PopupBar({ deleteEntry }: { deleteEntry: () => void }) {
  const { closePopup } = CMSStore();

  return (
    <Popup.Main>
      <button onClick={deleteEntry}>DELETE THIS ENTRY</button>
      <button>EDIT ENTRY</button>
      <button onClick={() => closePopup("entryPopup")}>EXIT</button>
    </Popup.Main>
  );
}
