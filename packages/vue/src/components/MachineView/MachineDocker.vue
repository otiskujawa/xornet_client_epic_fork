<template>
  <div>
    <div v-for="container of docker" :key="container.container" class="flex items-center justify-between py-2">
      <div class="flex items-center gap-8 ">
        <div class=" flex items-center justify-center w-min h-min p-2 rounded-4px bg-[#0db7ed] text-[#0db7ed] bg-opacity-50">
          <i-fluency-docker class="text-2xl" />
        </div>
        <p>{{ container.container }}</p>
        <p>{{ container.name }}</p>
      </div>
      <div class="flex items-center gap-8 ">
        <p>{{ container.cpu }}</p>
        <p>{{ container.memory.percent }}</p>
        <p>{{ container.memory.raw }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DockerStats } from "/@/types/api/machine";

defineProps<{docker: DockerStats[]}>();

</script>

<style scoped lang="postcss">

</style>
