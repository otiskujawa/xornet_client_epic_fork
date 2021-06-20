<template>
  <div v-if="color" class="coloredIconContainer icon" :style="{ 'background-color': `${color}1f` }">
    <div class="coloredIcon" :style="{ 'mask-image': `url(https://xornet.cloud${image})`, 'background-color': color }"></div>
  </div>
  <img v-else name="icon" :class="{app}" class="blackIcon" :src="image" :alt="icon" />
</template>

<script>
export default {
  name: "Icon",
  props: {
    icon: { type: String, required: true },
    default: { type: String, required: false },
    app: { type: Boolean, required: false },
    color: { type: String, required: false }
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

.blackIcon:not(.app) {
  max-width: initial;
  filter: invert(var(--filter));
}
</style>
