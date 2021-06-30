<template>
  <div class="settingspage">
    <button @click="isStroked()">Filled</button>
    <Switch :name="'Filled'" v-model="filled" class="text-primary-200"/>
  </div>
</template>

<script>
import Switch from '@/components/library/Switch.vue';

export default {
  components: {
    Switch,
  },
  methods: {
    isStroked() {
      const isStroked = localStorage.getItem("isStroked") === "true" ? "false" : "true";
      localStorage.setItem("isStroked", isStroked);
    }
  },
  data() {
    return {
      filled: false,
    }
  }
};
</script>

<style scoped></style>
