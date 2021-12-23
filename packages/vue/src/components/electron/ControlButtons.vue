<template>
  <div class="control-buttons absolute flex" :class="state.window.state.isMaximized && 'maximized'">
    <button @click="onMinimizeClick()">
      <icon name="minimize" />
    </button>
    <button v-if="!state.window.state.isMaximized" @click="onMaximizeClick()">
      <icon name="maximize" />
    </button>
    <button v-else @click="onUnmaximizeClick()">
      <icon name="unmaximize" />
    </button>
    <button class="red" @click="onCloseClick()">
      <icon name="close" />
    </button>
  </div>
</template>
<script setup lang="ts">
import { nodeEmit } from "/@/services/logic";
import { useState } from "/@/services/state";

const { state } = useState();

const onCloseClick = () => {
  nodeEmit("close");
};
const onMinimizeClick = () => {
  nodeEmit("minimize");
};
const onMaximizeClick = () => {
  state.window.state.isMaximized = true;
  nodeEmit("maximize");
};
const onUnmaximizeClick = () => {
  state.window.state.isMaximized = false;
  nodeEmit("unmaximize");
};
</script>

<style lang="postcss" scoped>
.control-buttons {
  @apply top-8px right-8px;
  &.maximized {
    @apply top-0px right-0px;

    & button {
      @apply rounded-0px;
    }
  }
  button {
    @apply rounded-4px;

    -webkit-app-region: no-drag;

    & .icon {
      @apply w-4 h-4;
    }

    @apply p-6px px-16px text-white text-opacity-50 flex items-center justify-center;

    &:hover {
      @apply bg-black bg-opacity-25 text-opacity-75;
    }

    &.red {
      &:hover {
        @apply bg-caution text-white text-opacity-100;
      }
    }
  }
}
</style>
