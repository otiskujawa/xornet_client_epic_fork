<template>
  <kbd :class="active && 'active'">{{ keyButton.replace("Control", "Ctrl").replace("CapsLock", "CapsLk") }}</kbd>
</template>

<script setup lang="ts">import { onKeyDown, onKeyUp } from "@vueuse/core";
import { ref } from "vue";
const props = defineProps<{keyButton: string}>();
const active = ref(false);

// These are here twice because when holding shift you're actually
// clicking P instead of p, so sometimes shortcuts that
// require Shift get the shifted key stuck active
onKeyDown(props.keyButton, () => active.value = true);
onKeyDown(props.keyButton.toLowerCase(), () => active.value = true);
onKeyUp(props.keyButton, () => active.value = false);
onKeyUp(props.keyButton.toLowerCase(), () => active.value = false);
</script>

<style  lang="postcss">
:root {
  --kbd-100: #0c0d0f;
  --kbd-200: #111215;
  --kbd-250: #131418;
  --kbd-300: #17191e;
  --kbd-400: #1d2026;
  --kbd-500: #2a2d34;
  --kbd-600: #3e4147;
  --kbd-700: #6d6e72;
  --kbd-800: #a0a0a0;
  --kbd-900: #b9b9b9;
}
kbd {
  @apply font-bold;
  margin: 0px 0.1em;
  padding: 0.1em 0.6em;
  border-radius: 2px;
  border: 1px solid var(--kbd-200);
  color: var(--kbd-700);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
  display: inline-block;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2), inset 0px 0px 0px 2px var(--kbd-500);
  background-color: var(--kbd-400);
  -moz-box-shadow: 0 1px 0px rgba(0, 0, 0, 0.2), 0 0 0 2px var(--kbd-500) inset;
  -webkit-box-shadow: 0 1px 0px rgba(0, 0, 0, 0.2), 0 0 0 2px var(--kbd-500) inset;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  text-shadow: 0 1px 0 var(--kbd-500);
}

kbd.active {
  @apply  text-black bg-primary-500 border-1 border-primary-300;
  text-shadow: 0 1px 0 rgb(var(--color-primary-300));
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2), inset 0px 0px 0px 2px rgb(var(--color-primary-300));
}
</style>
