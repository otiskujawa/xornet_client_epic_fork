<template>
  <router-link @click="$emit('click')" v-if="to" :to="to" class="button" :class="{ enabled }">
    <img :src="require(`@/assets/icons/${icon}.svg`)" :alt="icon" />
  </router-link>
  <div @click="$emit('click')" v-if="!to && !href" class="button" :class="{ enabled }">
    <img :src="require(`@/assets/icons/${icon}.svg`)" :alt="icon" />
  </div>
  <a v-if="href" :href="href" target="_blank" @click="$emit('click')" class="button" :class="{ enabled }">
    <img :src="require(`@/assets/icons/${icon}.svg`)" :alt="icon" />
  </a>
</template>

<script>
export default {
  name: "SquareButton",
  props: {
    to: {type: Object, required: false},
    icon: {type: String, required: true},
    href: {type: String, required: false},
    enabled: {type: Boolean, required: false}
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

.button.router-link-active {
  background-color: var(--theme-color);
}

.button.router-link-active img {
  filter: invert(1);
}

.button.enabled {
  filter: invert(1);
}

.button:hover {
  background-color: var(--theme-color);
}

.button img {
  width: 24px;
  height: 24px;
  filter: invert(var(--filter));
}

.button:hover img {
  filter: invert(1);
}

</style>
