<script lang="ts">
  import Input from "../components/Input.svelte";
  import { createUser } from "../store/Supabase";
  import { navigateTo } from "../helper/Goto";

  let email = "";
  let name = "";
  let password = "";

  const handleSubmit = async () => {
    try {
      const result = await createUser(email, name, password);

      if (result.success) {
        alert(
          "User registered successfully! Your account is pending approval."
        );
      } else {
        alert(`Registration failed: ${result.error}`);
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again later.");
      console.error("Unexpected error during registration:", error);
    }
  };
</script>

<form class="register-layout" on:submit|preventDefault={handleSubmit}>
  <div class="title-container">
    <h1>Account Registration</h1>
    <button on:click={() => navigateTo("/")}>EXIT</button>
  </div>
  <div class="register-wrapper">
    <div class="inputs-wrapper">
      <p>Email:</p>
      <input type="text" bind:value={email} />
      <p>Name:</p>
      <input type="text" bind:value={name} />
      <p>Password:</p>
      <input type="password" bind:value={password} />
    </div>
    <div class="btns-wrapper">
      <button type="submit">SUBMIT</button>
      <button type="reset">RESET</button>
    </div>
  </div>
  <div class="footer">
    <div class="left">
      <h2>Registration Process</h2>
      <ul>
        <li>
          <p>1. Submit your Name, Email, and Password.</p>
        </li>
        <li>
          <p>2. Your request will be reviewed by a Super Administrator.</p>
        </li>
        <li>
          <p>
            3. Upon approval, you will receive a confirmation email, after which
            you can log in and access your account.
          </p>
        </li>
      </ul>
    </div>
    <div class="right">
      <h2>Important Notice</h2>
      <ul>
        <li>
          <p>
            1. Account activation is subject to approval and may take some time.
          </p>
        </li>
        <li>
          <p>
            2. You will be notified via email once your registration has been
            approved.
          </p>
        </li>
      </ul>
    </div>
  </div>
</form>

<style scoped>
  ul {
    list-style: none;
  }
  input {
    padding: 5px;
    background: none;
    outline: none;
    border: 1px solid var(--bd-color);
    margin-bottom: 10px;
    font-size: 1rem;
    color: inherit;
  }
  button {
    font-size: 1rem;
    padding: 5px 10px;
    border-radius: 7px;
  }
  .title-container {
    display: flex;
    justify-content: space-between;

    > a {
      color: inherit;
      text-decoration: none;
    }
  }

  .register-layout {
    padding: 5%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .register-wrapper {
    height: 50%;
    display: flex;
    flex-direction: column;
  }
  .inputs-wrapper {
    display: flex;
    flex-direction: column;
    width: 50%;
  }
  .footer {
    display: flex;
    gap: 30px;
  }
</style>
