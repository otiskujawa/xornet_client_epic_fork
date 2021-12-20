<template>
  <div class="absolute top-0 right-0 flex">
    <button type="button" @click="onMinimizeClick()">
      <icon name="minimize" />
    </button>
    <button v-if="!isMaximized" type="button" @click="onMaximizeClick()">
      <icon name="maximize" />
    </button>
    <button v-else type="button" @click="onUnmaximizeClick()">
      <icon name="unmaximize" />
    </button>
    <button type="button" class="red" @click="onCloseClick()">
      <icon name="close" />
    </button>
  </div>
</template>
<script setup lang="ts">
import { nodeEmit } from "/@/services/logic";
import { ref } from "vue";

const isMaximized = ref(false);

const onCloseClick = () => {
  nodeEmit("close");
};
const onMinimizeClick = () => {
  nodeEmit("minimize");
};
const onMaximizeClick = () => {
  isMaximized.value = true;
  nodeEmit("maximize");
};
const onUnmaximizeClick = () => {
  isMaximized.value = false;
  nodeEmit("unmaximize");
};
</script>

<style lang="postcss" scoped>
button {
  -webkit-app-region: no-drag;

  @apply p-6px px-16px text-white text-opacity-50 flex items-center justify-center;

  &:hover {
    @apply bg-black bg-opacity-25 text-opacity-75;
  }

  &.red {
    &:hover {
      @apply bg-red-600 text-white text-opacity-100;
    }
  }
}
</style>
