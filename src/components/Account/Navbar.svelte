<script>
  import { navigateTo, logout } from "../../helper/Goto";
</script>

<nav class="cms-navbar">
  <button class="nav-btns" on:click={() => logout("/")}>LOGOUT</button>
  <button class="nav-btns" on:click={() => navigateTo("/cms")}>EXIT</button>
</nav>

<style scoped>
  .cms-navbar {
    display: flex;
    justify-content: space-between;
    padding-block: 20px;
  }
  .nav-btns {
    padding: 10px 0px;
    font-weight: 400;
    border: 0px;
    color: var(--font-color-default);
    background-color: transparent;
    border-radius: 5px;
  }
</style>
