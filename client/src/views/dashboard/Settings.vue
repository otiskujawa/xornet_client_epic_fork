<template>
  <div class="settingspage">
    <div @click="isStroked()">Filled</div>
  </div>
</template>

<script>
export default {
  methods: {
    isStroked() {
      const isStroked = localStorage.getItem("isStroked") === "true" ? "false" : "true";
      localStorage.setItem("isStroked", isStroked);
    }
  },
};
</script>

<style scoped></style>
