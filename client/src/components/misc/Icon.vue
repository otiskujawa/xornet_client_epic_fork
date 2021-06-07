<template>
  <img name="icon" :src="image" :alt="icon" />
</template>

<script>
export default {
  name: "Icon",
  props: {
    icon: { type: String, required: true }
  },
  computed: {
    isStroked() {
      return localStorage.getItem("isStroked") === "true" ? true : false;
    },
    image() {
      return require(`@/assets/icons/${this.isStroked ? "stroked" : "filled"}/${this.icon}.svg`);
    }
  }
};
</script>

<style scoped></style>
