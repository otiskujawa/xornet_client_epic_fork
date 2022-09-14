<template>
  <div class="w-full h-full flexcol bg-black bg-opacity-25 overflow-hidden">
    <top-bar />
    <machine-list />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useDiscord } from "/@/app";
import MachineList from "/@/components/MachineList.vue";
import TopBar from "/@/components/TopBar.vue";
onMounted(() => {
	useDiscord().updatePresence({
		state: "Monitoring Machines",
		largeImageKey: "main_logo",
		largeImageText: "Xornet Cloud",
		buttons: [
			{
				label: "Website",
				url: "https://xornet.cloud/",
			},
			{
				label: "GitHub",
				url: "https://github.com/xornet-cloud/",
			},
		],
	});
});
</script>
