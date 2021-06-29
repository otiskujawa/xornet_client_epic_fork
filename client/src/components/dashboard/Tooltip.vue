<template>
  <div class="toolTipBox" :class="{ sideways }">
    <slot />
    <div class="tooltip">
      <span class="text">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    sideways: {
      type: Boolean,
      required: false
    }
  }
};
</script>

<style scoped>
.toolTipBox {
  position: relative;
  z-index: 20;
  display: inline-block;
}

.toolTipBox:hover .tooltip {
  pointer-events: initial;
  opacity: 1;
}

.tooltip {
  color: #ffffff;
  text-align: center;
  padding: 8px 4px;
  border-radius: 4px;

  pointer-events: none;

  width: 120px;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
  margin-bottom: 8px;

  opacity: 0;
  transition: opacity 100ms ease;

  position: absolute;

  font-family: Roboto Mono, monospace;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  background: var(--theme-color);
}

.toolTipBox.sideways .tooltip {
  bottom: 0;
  left: 100%;
  margin-left: 8px;
}

.text {
  color: white;
  text-transform: capitalize;
}

.text::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;

  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: var(--theme-color) transparent transparent transparent;
}

.toolTipBox.sideways .text::after {
  top: 52%;
  left: 0%;
  margin-left: -9px;
  transform: rotate(90deg) translateX(-50%);
}
</style>
