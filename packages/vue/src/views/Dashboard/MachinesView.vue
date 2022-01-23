<template>
  <div class="flex w-full flex-col bg-black bg-opacity-25 overflow-hidden">
    <top-bar />
    <machine-list />
  </div>
</template>

<script setup lang="ts">
import MachineList from "../../components/MachineList.vue";
import TopBar from "/@/components/TopBar.vue";
</script>
