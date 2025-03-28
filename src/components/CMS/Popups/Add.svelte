<script lang="ts">
  import { insertEntryStore } from "../../../store/PopupStates";
  import { onMount } from "svelte";

  let possibleQuestions: string[] = [];
  let inputQuestion = "";
  let main = 0;
  let content = "";
  let errorMessage = "";

  $: if (errorMessage) {
    setTimeout(() => {
      errorMessage = "";
    }, 5000);
  }

  onMount(() => {
    insertEntryStore.updateEntry({
      questionsList: possibleQuestions,
      mainIndex: main,
      content,
    });
  });

  function addQuestion() {
    const trimmedQuestion = inputQuestion.trim();

    if (trimmedQuestion.length < 10) {
      return (errorMessage = "Question must be at least 10 characters long.");
    }
    if (trimmedQuestion.length > 300) {
      return (errorMessage = "Questions must not exceed 300 characters.");
    }

    possibleQuestions = [...possibleQuestions, trimmedQuestion];
    inputQuestion = "";

    insertEntryStore.updateEntry({ questionsList: possibleQuestions });
  }

  function updateMain(index: number) {
    main = index;
    insertEntryStore.updateEntry({ mainIndex: main });
  }

  function updateContent() {
    insertEntryStore.updateEntry({ content });
  }
</script>

<main class="insert-container">
  <div class="questions-container">
    <form class="questions-form" on:submit|preventDefault={addQuestion}>
      <input bind:value={inputQuestion} placeholder="Add a possible question" />
      <button type="submit">ADD QUESTION</button>
    </form>

    <ul class="questions-list">
      {#if errorMessage}
        <div class="error-container">
          <p>{errorMessage}</p>
        </div>
      {/if}

      {#each possibleQuestions as question, index}
        <li>
          <div class="question">
            <input
              type="radio"
              bind:group={main}
              value={index}
              on:change={() => updateMain(index)}
            />
            <p>{question}</p>
          </div>
        </li>
      {/each}
    </ul>
  </div>
  <div class="insert-content-container">
    <textarea bind:value={content} on:input={updateContent}></textarea>
  </div>
</main>

<style scoped>
  .error-container {
    padding-block: 10px;
    color: var(--font-accent);
  }
  .insert-container {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 30px;
  }
  .questions-container {
    min-width: 50%;
    max-width: 50%;
    display: flex;
    flex-direction: column;
  }
  .questions-form {
    display: flex;
    gap: 10px;

    > input {
      flex: 1;
      padding: 5px;
      border: 1px solid var(--bd-color);
      background: none;
      border-radius: 8px;
      color: inherit;
      outline: none;
    }
    > button {
      border-radius: 5px;
      padding: 5px;
    }
  }
  .questions-list {
    display: flex;
    flex-direction: column;
  }
  .question {
    margin-top: 10px;
    display: flex;
    gap: 10px;
    padding: 8px;
    border-radius: 12px;
    border: 1px solid var(--bd-color);
    overflow-y: hidden;
  }
  .question p {
    word-break: break-word;
    margin: 0;
    padding: 0;
  }
  .insert-content-container {
    width: 100%;
  }
  .insert-content-container > textarea {
    padding: 10px;
    border: 1px solid var(--bd-color);
    border-radius: 12px;
    color: inherit;
    resize: none;
    height: 100%;
    width: 100%;
    background: none;
    outline: none;
    font-family: inherit;
  }
</style>
