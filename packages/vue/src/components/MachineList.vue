<template>
  <resizable-div @resize="handleResize" id="list" :minimum-width="96" class="bg-black pt-3 bg-opacity-25 h-full w-64">
    <machine-button v-for="machine of machines" :mode="mode" :machine="machine" :key="machine.uuid" />
  </resizable-div>
</template>

<script setup lang="ts">
import MachineButton from "/@/components/MachineButton.vue";
import ResizableDiv from "/@/components/shared/ResizableDiv.vue";
import { IMachine } from "../../types/api/machine";
import { Ref, ref, computed, onMounted } from "vue";

const mode: Ref<"minimal" | "normal" | "maximal"> = ref("normal");

const handleResize = (value: number) => {
  if (value < 128) return (mode.value = "minimal");
  else if (value >= 128 && value < 256) return (mode.value = "normal");
  else return (mode.value = "maximal");
};

const machines = [
  {
    uuid: "1",
    hostname: "kurokami",
    distro: "endeavour",
    isOnline: true,
  },
  {
    uuid: "2",
    hostname: "shimakaze",
    distro: "arch",
    isOnline: true,
  },
  {
    uuid: "3",
    hostname: "fubuki",
    distro: "windows11",
    isOnline: false,
  },
];
</script>

<style scoped lang="postcss"></style>
