<script lang="ts">
  export let variant = "default";
  export let type: "button" | "submit" | "reset" = "button";
</script>

<button class={variant} {type}>
  <slot />
</button>

<style>
</style>
