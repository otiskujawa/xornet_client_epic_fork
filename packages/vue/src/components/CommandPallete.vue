<template>
  <base-dialog v-model="state.window.isShowingCommandPallete">
    <div class="border-2 border-background-200 flexcol gap-2 fixed bg-background-300 z-50 text-text w-128 p-2 rounded-8px center">
      <div class="p-2 flexcol gap-4">
        <input ref="commandPalleteInput" v-model="search" class="bg-transparent placeholder-text placeholder-opacity-50 text-lg" placeholder="Quick search...">
        <div class="h-1px bg-background-200 w-full" />
      </div>

      <div class="min-h-72 max-h-72 overflow-hidden overflow-y-scroll">
        <div v-for="category of new Set(filteredCommandPaletteOptions.map(option => option.category))" :key="category" class=" flexcol">
          <p class="opacity-50 mx-4 my-2 capitalize">
            {{ category }}s
          </p>
          <button
            v-for="option of filteredCommandPaletteOptions.filter(option => option.category === category)"
            :key="option.title"
            class="capitalize items-center flex gap-4 p-4 py-3 rounded-6px focus:bg-background-400 hover:bg-background-200 text-left"
            @click="option.onClickHandler && option.onClickHandler(); state.window.isShowingCommandPallete = false;"
          >
            <fluency-icon :icon="option.icon" />
            {{ option.title }}
          </button>
        </div>
      </div>
    </div>
  </base-dialog>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useState } from "/@/app";
import BaseDialog from "/@/components/base/BaseDialog.vue";

export type CommandPalleteOptionCategory = "route" | "machine" | "appearance" | "sound";

const router = useRouter();
const search = ref("");
const state = useState();
const commandPalleteInput = ref() as Ref<HTMLInputElement>;
watch(
	() => state.window.isShowingCommandPallete,
	() => setTimeout(() => commandPalleteInput.value && commandPalleteInput.value.focus(), 10),
);

interface CommandPalleteOption {
	title: string
	icon?: string
	category: CommandPalleteOptionCategory
	onClickHandler?: Function
}

const commandPaletteOptions: CommandPalleteOption[] = [
	{
		onClickHandler: () => state.settings.theme.value = "light",
		category: "appearance",
		title: "Set Light theme",
		icon: "palette",
	},
	{
		onClickHandler: () => state.settings.enableBloom.value = !state.settings.enableBloom.value,
		category: "appearance",
		title: "Toggle bloom",
		icon: "palette",
	},
	{
		onClickHandler: () => state.settings.enableRoundedCorners.value = !state.settings.enableRoundedCorners.value,
		category: "appearance",
		title: "Toggle rounded corners",
		icon: "palette",
	},
	{
		onClickHandler: () => state.settings.enableSoundEffects.value = !state.settings.enableSoundEffects.value,
		category: "sound",
		title: "Toggle sound effects",
		icon: "sound",
	},
	{
		onClickHandler: () => state.settings.enableStatusBar.value = !state.settings.enableStatusBar.value,
		category: "appearance",
		title: "Toggle status bar",
		icon: "palette",
	},
	{
		onClickHandler: () => state.settings.theme.value = "dark",
		category: "appearance",
		title: "Set Dark theme",
		icon: "palette",
	},
	{
		onClickHandler: () => state.settings.theme.value = "nord",
		category: "appearance",
		title: "Set Nord theme",
		icon: "palette",
	},
	{
		onClickHandler: () => router.push({ name: "machines" }),
		category: "route",
		title: "Machines Page",
		icon: "nas",
	},
	{
		onClickHandler: () => router.push({ name: "settings" }),
		category: "route",
		title: "Settings Page",
		icon: "settings",
	},
	{
		onClickHandler: () => router.push({ name: "profile" }),
		category: "route",
		title: "Profile Page",
		icon: "user",
	},
];

const filteredCommandPaletteOptions = computed(() => {
	return commandPaletteOptions.filter(option => option.title.toLowerCase().includes(search.value.toLowerCase()));
});

</script>
