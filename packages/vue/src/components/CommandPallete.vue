<template>
  <base-dialog v-model="state.window.isShowingCommandPallete">
    <div class="border-2 border-background-200 flexcol gap-2 fixed bg-background-300 z-50 text-text w-128 p-2 rounded-8px center">
      <div class="p-2 flexcol gap-4">
        <input ref="commandPalleteInput" v-model="search" class="bg-transparent placeholder-text placeholder-opacity-50 text-lg" placeholder="Quick search...">
        <div class="h-1px bg-background-200 w-full" />
      </div>

      <div v-for="category of new Set(filteredCommandPaletteOptions.map(option => option.category))" :key="category" class="flexcol">
        <p class="opacity-50 ml-4 mb-2 capitalize">
          {{ category }}s
        </p>
        <button
          v-for="option of filteredCommandPaletteOptions.filter(option => option.category === category)"
          :key="option.title"
          class="capitalize items-center flex gap-4 p-4 py-3 rounded-6px hover:bg-background-200 text-left"
          @click="option.onClickHandler && option.onClickHandler(); state.window.isShowingCommandPallete = false;"
        >
          <fluency-icon :icon="option.icon" />
          {{ option.title }}
        </button>
      </div>
    </div>
  </base-dialog>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { computed, onMounted, ref } from "vue";

import { useRouter } from "vue-router";
import { useState } from "/@/app";

import BaseDialog from "/@/components/base/BaseDialog.vue";
export type CommandPalleteOptionCategory = "route" | "machine";
const router = useRouter();
const search = ref("");
const state = useState();
const commandPalleteInput = ref() as Ref<HTMLInputElement>;
onMounted(() => {
	commandPalleteInput.value.focus();
});

interface CommandPalleteOption {
	title: string
	icon?: string
	category: CommandPalleteOptionCategory
	onClickHandler?: Function
}

const commandPaletteOptions: CommandPalleteOption[] = [
	{
		onClickHandler: () => router.push({ name: "machines" }),
		category: "route",
		title: "machines",
		icon: "nas",
	},
	{
		onClickHandler: () => router.push({ name: "settings" }),
		category: "route",
		title: "settings",
		icon: "settings",
	},
	{
		onClickHandler: () => router.push({ name: "profile" }),
		category: "route",
		title: "profile",
		icon: "user",
	},
];

const filteredCommandPaletteOptions = computed(() => {
	return commandPaletteOptions.filter(option => option.title.includes(search.value.toLowerCase()));
});

</script>
