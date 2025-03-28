<script lang="ts">
  import { onMount } from "svelte";
  import { fetchGroupData } from "../../../store/Supabase";

  export let groupID: string = "";
  let content: string = "Loading...";
  let questions: string[] = [];

  onMount(async () => {
    if (!groupID) return;
    try {
      const data = await fetchGroupData(groupID);
      if (data && data.length > 0) {
        content = data[0]?.content || "No content available";
        questions = data[0]?.questions || [];
      } else {
        content = "No content available";
        questions = [];
      }
    } catch (error) {
      console.error("Error fetching group data:", error);
      content = "Error loading content";
    }
  });
</script>

<main class="entry-cms">
  <section class="possible-questions">
    <h3>Possible Questions</h3>
    <div class="questions-wrapper">
      <ul class="container">
        {#each questions as question, index}
          <li>
            <div class="question">
              <p>{index + 1 + "."}</p>
              <p>{question}</p>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </section>
  <section class="question-content">
    <h3>Contents</h3>
    <textarea readonly bind:value={content}></textarea>
  </section>
</main>

<style scoped>
  h3 {
    margin-bottom: 30px;
  }

  .entry-cms {
    display: flex;
    gap: 30px;
    height: 100%;
    width: 100%;
  }

  .possible-questions {
    min-width: 50%;
    max-width: 50%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .questions-wrapper {
    flex-grow: 1;
    overflow: hidden;
  }

  .container {
    height: 100%;
    max-height: 100%;
    overflow-y: auto;
    padding: 0;
    margin: 0;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .question {
    margin-top: 5px;
    display: flex;
    gap: 5px;
  }

  .question-content {
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .question-content textarea {
    padding: 10px;
    border-radius: 12px;
    color: inherit;
    resize: none;
    height: 100%;
    width: 100%;
    background: none;
    outline: none;
  }
</style>
