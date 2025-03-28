<script lang="ts">
  export let placeholder = "Enter text";
  export let variant = "default";
  export let value = "";
  export let type = "";
</script>

<input class={variant} {type} {placeholder} bind:value />

<style scoped>
  .login-page {
    background: #e6e6e6;
    color: #141414;
    border: 1px solid #e6e6e6;
    border-radius: 12px;
    font-size: 1.2rem;
    padding: 12px;
    outline: none;
    width: 100%;
  }
</style>
