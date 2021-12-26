<template>
  <base-popover :open="open">
    <base-button @click="open = true">
      Your Father      
    </base-button>
    <template #content>
      <div class="bg-black">
        <div class="p-2 text-white" v-for="option in options">
          {{ option }}
        </div>
      </div>
    </template>
  </base-popover>
  <div v-if="open" @click="open = false" class="fullscreen"></div>
</template>

<!-- https://windicss.org/ -->

<script setup lang="ts">
import BasePopover from "./BasePopover.vue";
import BaseButton from "./BaseButton.vue";
import { ref } from "vue";
const props = defineProps<{
  options: string[];
}>();

const open = ref(false);
</script>

<style scoped lang="postcss">



</style>
