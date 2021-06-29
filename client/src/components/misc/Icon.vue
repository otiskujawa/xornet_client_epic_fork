<template>
  <div v-if="!borderless && color" class="coloredIconContainer" :style="{ 'background-color': `${color}1f` }">
    <div class="coloredIcon" :style="{ 'mask-image': `url(https://xornet.cloud${image})`, 'background-color': color }"></div>
  </div>
  <div
    v-else-if="borderless && color"
    class="coloredIcon"
    :style="{ 'mask-image': `url(https://xornet.cloud${image})`, 'background-color': color }"
  ></div>
  <img v-else name="icon" :class="{ app }" class="icon" :src="image" :alt="icon" />
</template>

<script>
export default {
  name: "Icon",
  props: {
    icon: { type: String, required: true },
    default: { type: String, required: false },
    app: { type: Boolean, required: false },
    color: { type: String, required: false },
    borderless: { type: Boolean, required: false }
  },
  computed: {
    isStroked() {
      return localStorage.getItem("isStroked") === "true" ? true : false;
    },
    image() {
      try {
        if (this.app) var icon = require(`@/assets/icons/apps/${this.icon}.svg`);
        else var icon = require(`@/assets/icons/${this.isStroked ? "stroked" : "filled"}/${this.icon}.svg`);
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
.coloredIconContainer {
  padding: 4px;
  border-radius: 12489px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.coloredIcon {
  mask-position: center;
  mask-size: contain;
  mask-repeat: no-repeat;
  width: inherit;
  height: inherit;
}

.icon:not(.taskIcon) {
  max-width: initial;
  filter: invert(1);
}
</style>
