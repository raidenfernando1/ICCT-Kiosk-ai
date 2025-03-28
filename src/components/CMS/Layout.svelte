<script lang="ts">
  import { popupStore } from "../../store/PopupStates";
  import Default from "./Popups/Default.svelte";
  import Add from "./Popups/Add.svelte";
  import Entry from "./Popups/Entry.svelte";

  let popupType: "none" | "add" | "entry" = "none";
  let selectedGroupID: string = "";

  $: {
    popupType = $popupStore.activePopup;
    selectedGroupID = $popupStore.selectedGroupID;
  }
</script>

<main class="bar-wrapper">
  {#if popupType === "none"}
    <Default />
  {/if}

  {#if popupType === "add"}
    <Add />
  {/if}

  {#if popupType === "entry"}
    <Entry groupID={selectedGroupID} />
  {/if}
</main>

<style scoped>
  .bar-wrapper {
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
