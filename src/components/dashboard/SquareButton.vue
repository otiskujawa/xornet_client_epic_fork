<template>
  <div @click="$emit('click')">
    <router-link @click="$emit('click')" v-if="to" :to="to" class="button" :class="{ isEnabled, boxless }">
      <Icon :icon="icon" />
    </router-link>
    <div @click="$emit('click')" v-if="!to && !href" class="button" :class="{ isEnabled, boxless }">
      <Icon :icon="icon" />
    </div>
    <a v-if="href" :href="href" target="_blank" @click="$emit('click')" class="button" :class="{ isEnabled, boxless }">
      <Icon :icon="icon" />
    </a>
  </div>
</template>

<script>
import Icon from "@/components/misc/Icon";

export default {
  name: "SquareButton",
  props: {
    to: { type: Object, required: false },
    icon: { type: String, required: true },
    href: { type: String, required: false },
    isEnabled: { type: Boolean, required: false },
    boxless: { type: Boolean, required: false }
  },
  components: {
    Icon
  }
};
</script>

<style lang="postcss" scoped>
.button {
  @apply gap-2 flex items-center justify-center select-none cursor-pointer w-12 h-12 box-border border-solid border-1 border-none;
}

.button:hover {
  @apply bg-primary-100;
}

.button.router-link-active {
  @apply bg-primary-200;
}

.button img {
  @apply w-6 h-6 opacity-100;
}
</style>
