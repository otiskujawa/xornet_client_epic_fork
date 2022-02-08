<template>
  <base-dialog v-model="state.window.isShowingCommandPallete">
    <div class="flexcol gap-2 fixed bg-background-300 z-50 text-text w-128 p-4 rounded-8px center">
      <input ref="commandPalleteInput" v-model="search" class="bg-transparent text-lg" placeholder="Quick search...">
      <div class="h-1px bg-background-600 w-full" />
      <p class="opacity-50">
        Routes
      </p>
    </div>
  </base-dialog>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { onMounted, ref } from "vue";
import { useState } from "../services/state";
import BaseDialog from "./base/BaseDialog.vue";
const search = ref("");
const state = useState();
const commandPalleteInput = ref() as Ref<HTMLInputElement>;
onMounted(() => {
	commandPalleteInput.value.focus();
});
</script>

<style scoped lang="postcss">

</style>
