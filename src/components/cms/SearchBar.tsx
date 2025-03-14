import styled from "styled-components";
import { useCMS } from "../../context/useCMS";
import { deleteGroup } from "../../hooks/useSupabase";

const Search = {
  Main: styled.div`
    display: flex;
    padding-block: 30px;
    gap: 10px;
    border-bottom: 1px solid rgb(55, 55, 55);

    > button {
      padding: 10px;
      text-align: left;
      background: none;
      color: inherit;
      border: 1px solid var(--border-color);
      border-radius: 5px;
      cursor: pointer;
    }

    > input {
      margin-right: auto;
      width: 30%;
      border: 1px solid var(--border-color);
      background: none;
      color: inherit;
      border-radius: 5px;
      padding: 10px;
      outline: none;
    }
  `,
};

const SearchBar = ({ groupId }: { groupId: string | null }) => {
  const { isPopup, setIsPopup, setInsertPopup } = useCMS();

  const handleDelete = async () => {
    if (!groupId) {
      console.warn("No groupId provided for deletion.");
      return;
    }
    console.log("Deleting group:", groupId);
    await deleteGroup(groupId);
    console.log("Deletion completed, closing popup.");
    setIsPopup(false);
  };

  const handleExit = () => {
    setIsPopup(false);
  };

  return (
    <Search.Main>
      <input placeholder="Search an entry" />
      {!isPopup ? (
        <button onClick={() => setInsertPopup((prev) => !prev)}>
          ADD AN ENTRY
        </button>
      ) : (
        <>
          <button onClick={handleDelete}>DELETE THIS ENTRY</button>
          <button onClick={handleExit}>EXIT</button>
        </>
      )}
    </Search.Main>
  );
};

export default SearchBar;
