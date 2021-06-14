<template>
  <div @click="$emit('click')">
    <router-link @click="$emit('click')" v-if="to" :to="to" class="button" :class="{ isEnabled }">
      <Icon :icon="icon" />
    </router-link>
    <div @click="$emit('click')" v-if="!to && !href" class="button" :class="{ isEnabled }">
      <Icon :icon="icon" />
    </div>
    <a v-if="href" :href="href" target="_blank" @click="$emit('click')" class="button" :class="{ isEnabled }">
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
    isEnabled: { type: Boolean, required: false }
  },
  components: {
    Icon
  }
};
</script>

<style scoped>
.button {
  padding: 16px;
  background-color: var(--background-color);
  box-sizing: border-box;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 48px;
  height: 48px;
  cursor: pointer;
  transition: 100ms ease;
  user-select: none;
}

.button:hover {
  background-color: var(--theme-color);
}

.button:hover img {
  filter: invert(1);
}

.button.router-link-active {
  background-color: var(--theme-color);
}

.button.router-link-active img {
  filter: invert(1);
}

.button.isEnabled {
  filter: invert(1);
}

.button img {
  width: 24px;
  height: 24px;
  filter: invert(var(--filter));
}
</style>
