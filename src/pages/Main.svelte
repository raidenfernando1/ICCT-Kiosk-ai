<script>
  import Bar from "./../components/CMS/Bar.svelte";
  import { onMount } from "svelte";
  import { fetchMainEntries } from "../store/Supabase";
  import Navbar from "../components/CMS/Navbar.svelte";
  import Layout from "./../components/CMS/Layout.svelte";

  let entries = [];

  onMount(async () => {
    const data = await fetchMainEntries();
    entries = data;
  });
</script>

<main class="cms-layout">
  <Navbar />
  <Bar />
  <Layout />
</main>

<style scoped>
  .cms-layout {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    padding-inline: 5%;
    padding-bottom: 5%;
  }
</style>
