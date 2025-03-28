<script lang="ts">
  import { popupStore } from "../../store/PopupStates";
  import { insertEntryStore } from "../../store/PopupStates"; // Ensure this is the correct path
  import { deleteGroup } from "../../store/Supabase";

  let popupType: "none" | "add" | "entry" = "none";

  $: popupType = $popupStore.activePopup;
  $: selectedGroupID = $popupStore.selectedGroupID;

  async function handleInsert() {
    try {
      await insertEntryStore.saveEntry();
      alert("Entry successfully saved!");

      insertEntryStore.reset(); // Clear stored data
      popupStore.reset(); // Close the popup
    } catch (error) {
      console.error("Error inserting entry:", error);
      alert("Failed to save entry. Please try again.");
    }
  }

  async function handleDelete() {
    try {
      await deleteGroup(selectedGroupID);
      popupStore.reset();
    } catch (error) {
      console.error(error);
    }
  }

  function handleExit() {
    popupStore.close();
  }
</script>

<section class="action-bar">
  {#if popupType === "none"}
    <div class="wrapper">
      <div class="popup-none">
        <input placeholder="SEARCH AN ENTRY" />
        <button on:click={() => popupStore.open("add")}>ADD AN ENTRY</button>
      </div>
    </div>
  {/if}

  {#if popupType === "add"}
    <div class="wrapper">
      <div class="popup-add">
        <button on:click={handleExit}>EXIT</button>
        <button on:click={handleInsert}>SUBMIT</button>
      </div>
    </div>
  {/if}

  {#if popupType === "entry"}
    <div class="wrapper">
      <div class="popup-entry">
        <button on:click={handleExit}>EXIT</button>
        <button on:click={handleDelete}>DELETE THIS ENTRY</button>
        <button>EDIT ENTRY</button>
      </div>
    </div>
  {/if}
</section>

<style scoped>
  .wrapper {
    padding-block: 10px;

    input {
      padding: 8px;
      border: 1px solid var(--bd-color);
      border-radius: 5px;
      background-color: transparent;
      color: var(--font-color-default);
    }

    button {
      padding: 5px 10px;
      border-radius: 5px;
    }
  }
  .popup-none {
    display: flex;
    justify-content: space-between;
  }
  .popup-add {
    display: flex;
    justify-content: space-between;
  }
  .popup-entry {
    display: flex;
    gap: 10px;
    > :first-child {
      margin-right: auto;
    }
  }
</style>
