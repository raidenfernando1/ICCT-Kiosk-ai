<script lang="ts">
  import Input from "./../components/Input.svelte";
  import { supabaseLogin } from "../store/Supabase";
  import { userAuth } from "../store/Supabase";
  import { navigateTo } from "../helper/Goto";

  let userID = "";
  let password = "";
  let error = "";

  const handleSubmit = async () => {
    const login = await supabaseLogin(userID, password);
    if (!login) {
      error = "Invalid Credentials";
      setTimeout(() => (error = ""), 5000); // 5 seconds
    } else {
      error = "";
      userAuth.set(true);
    }
  };
</script>

<main class="home">
  <form class="login" on:submit|preventDefault={handleSubmit}>
    <h1>ADMIN LOGIN</h1>
    {#if error}
      <p class="error-message">Invalid Credentials</p>
    {/if}
    <Input
      variant="login-page"
      placeholder="UserID"
      type="email"
      bind:value={userID}
    />
    <Input
      variant="login-page"
      placeholder="Password"
      type="password"
      bind:value={password}
    />
    <div class="button-container">
      <button class="cta-button" type="submit">SUBMIT</button>
      <button class="cta-button" type="reset">RESET</button>
    </div>
  </form>
  <article class="info">
    <div class="warn-container">
      <img src="src\assets\icct-logo.png" alt="icct-logo" />
      <p>
        Unauthorized access is strictly prohibited. Only authorized personnel
        may access this system. Activities are logged and monitored to ensure
        security and compliance. Any unauthorized attempts will be reported to
        the system administrator.
      </p>
      <p>
        Need an admin account? Contact: <span class="email"
          ><button on:click={() => navigateTo("/register")}>Click here</button
          ></span
        >
      </p>
    </div>
  </article>
</main>

<style scoped>
  .error-message {
    color: var(--font-accent);
    padding: 0;
    margin: 0;
  }

  .home {
    height: 100vh;
    display: flex;
    align-items: center;
  }

  .login {
    flex: 1;
    min-width: 50%;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 5%;
  }

  .button-container {
    display: flex;
    gap: 10px;
  }

  .cta-button {
    flex: 1;
    color: var(--font-color-b);
    border-radius: 12px;
    padding: 12px;
  }

  .info {
    flex: 1;
    background: var(--bg-accent);
    color: var(--font-color-default);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5%;
    gap: 20px;
  }
  .warn-container > img {
    height: 300px;
    width: 300px;
  }

  .info > .warn-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .email {
    font-weight: bold;
    color: #ffd98d;
  }
</style>
