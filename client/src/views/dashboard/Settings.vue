<template>
  <div class="settingspage">
    <div @click="isStroked()">Filled</div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  components: {},
  data: () => {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    isStroked() {
      const isStroked = localStorage.getItem("isStroked") === "true" ? "false" : "true";
      localStorage.setItem("isStroked", isStroked);
    }
  },
  watch: {}
};
</script>

<style scoped></style>
