<template>
  <img name="icon" :src="image" :alt="icon" />
</template>

<script>
export default {
  name: "Icon",
  props: {
    icon: { type: String, required: true },
    default: { type: String, required: false }
  },
  computed: {
    isStroked() {
      return localStorage.getItem("isStroked") === "true" ? true : false;
    },
    image() {
      try {
        var icon = require(`@/assets/icons/${this.isStroked ? "stroked" : "filled"}/${this.icon}.svg`);
      } catch (error) {
        try {
          if (!icon) icon = require(`@/assets/icons/${this.isStroked ? "stroked" : "filled"}/${this.default}.svg`);
        } catch (error) {
          if (!icon) icon = require(`@/assets/icons/${this.isStroked ? "stroked" : "filled"}/missing.svg`);
        }
      }
      return icon;
    }
  }
};
</script>

<style scoped></style>
