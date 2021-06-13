<template>  
  <div v-if="colored" class="coloredIcon" :style="{'mask-image': `url(https://xornet.cloud${image})`, 'background-color': color}"></div>
  <img v-else name="icon" class="blackIcon" :src="image" :alt="icon" />
</template>

<script>
export default {
  name: "Icon",
  props: {
    icon: { type: String, required: true },
    default: { type: String, required: false },
    colored: {type: Boolean, required: false, default: false },
    color: { type: String, required: false },
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

<style scoped>
.coloredIcon {
  mask-position: center;
  mask-size: contain;
}

.blackIcon {
  filter: invert(var(--filter));
}
</style>
