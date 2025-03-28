<script lang="ts">
  import { userAuth } from "./store/Supabase";
  import { push } from "svelte-spa-router";
  import Router from "svelte-spa-router";
  import Home from "./pages/Home.svelte";
  import Main from "./pages/Main.svelte";
  import Register from "./pages/Register.svelte";

  const routes = {
    "/": Home,
    "/cms": Main,
    "/register": Register,
  };

  $: if (!$userAuth) {
    push("/");
  } else {
    push("/cms");
  }
</script>

<main class="layout">
  <Router {routes} />
</main>

<style scoped>
  .layout {
    height: 100vh;
    width: 100%;
  }
</style>
