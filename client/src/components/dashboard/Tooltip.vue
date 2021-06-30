<template>
  <div class="toolTipBox" :side="side" :class="side">
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
    side: {
      type: String,
      required: false,
    }
  }
};
</script>

<style scoped>
.toolTipBox {
  position: relative;
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
  z-index: 400;

  font-family: Roboto Mono, monospace;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  background: var(--theme-color);
}

.toolTipBox.right .tooltip {
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

.toolTipBox.right .text::after {
  top: 52%;
  left: 0%;
  margin-left: -9px;
  transform: rotate(90deg) translateX(-50%);
}
</style>

<!-- ADD ABILITY TO
COLOR THE BG
USE ANY POSITION
HAVE TEXT COLOR WHITE/BLACK BASED ON VISBILITY AGAINST BG
ADJUST ARROW SO IT ALWAYS POINTS TO ELEMENT
-->