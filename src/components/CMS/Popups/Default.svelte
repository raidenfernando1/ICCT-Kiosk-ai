<script lang="ts">
  import { popupStore } from "../../../store/PopupStates";
  import Card from "./../Card.svelte";
  import { onMount } from "svelte";
  import { fetchMainEntries } from "../../../store/Supabase";

  type Entry = {
    group_id: string;
    question: string;
  };

  let fetchedEntries: Entry[] = [];

  onMount(async () => {
    fetchedEntries = await fetchMainEntries();
  });

  function handleGroupID(id: string) {
    popupStore.open("entry", id);
  }
</script>

<main class="default">
  {#each fetchedEntries as entry}
    <Card
      title={entry.question}
      groupID={entry.group_id}
      sendID={handleGroupID}
    />
  {/each}
</main>

<style scoped>
  .default {
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
</style>
