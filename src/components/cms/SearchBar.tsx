import styled from "styled-components";
import { useCMS } from "../../context/useCMS";
import { deleteGroup } from "../../hooks/useSupabase";

const Search = {
  Main: styled.div`
    display: flex;
    padding-block: 30px;
    gap: 10px;
    border-bottom: 1px solid rgb(55, 55, 55);

    > :first-child {
      margin-right: auto;
      width: 300px;
      padding: 10px;
    }

    > button {
      padding: 5px 10px;
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
      <input placeholder="Search Categories" />
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
