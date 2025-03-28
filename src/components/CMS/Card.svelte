<script lang="ts">
  export let title: string = "";
  export let groupID: string = "";
  export let sendID: (id: string) => void = () => {};

  function handleClick() {
    sendID(groupID);
  }
</script>

<button on:click={handleClick} class="entry-card">
  {title}
</button>

<style scoped>
  .entry-card {
    padding: 10px;
    background: none;
    color: inherit;
    text-align: left;
    border-radius: 10px;
    cursor: pointer;
  }
</style>
