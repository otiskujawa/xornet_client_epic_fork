<template>
  <router-link class="settingsRoute" :to="{name: `settings.${to}`}">
    <li>
      <div class="active">
        <br>
      </div>
      <div class="icon">
        <slot />
      </div>
      {{ name }}
    </li>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{to: string; name: string}>();

</script>

<style scoped lang="postcss">

@keyframes twist {
  0% {
    transform: rotate(0deg);
  }
  15% {
    transform: rotate(20deg);
  }
  40% {
    transform: rotate(-10deg);
  }
  60% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.icon {
  @apply h-4 ease-in-out transition duration-100 transform;
}
.settingsRoute {
  @apply p-2 px-4 flex  items-center gap-3 text-text text-opacity-50 hover:text-opacity-100 rounded-4px cursor-pointer;

  & .active {
    @apply opacity-0 h-full w-2 bg-primary-400 rounded-full;
  }

  &:hover {
    .icon  {
      animation: twist 750ms;
    }
    .active {
      @apply opacity-50;
    }
  }

  &.router-link-active {
    @apply bg-background-300 text-opacity-100;
    .active {
      @apply opacity-100;
    }
  }

  & li {
    @apply flex items-center gap-3;
  }
}
</style>
