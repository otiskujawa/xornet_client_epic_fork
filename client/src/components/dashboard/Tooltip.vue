<template>
  <div class="toolTipBox">
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
  opacity: 1;
}

.tooltip {
  color: #ffffff;
  text-align: center;
  padding: 8px 4px;
  border-radius: 4px;

  width: 120px;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
  margin-bottom: 8px;

  opacity: 0;
  transition: opacity 100ms ease;

  position: absolute;
  z-index: 1;

  font-family: Roboto Mono, monospace;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  background: var(--theme-color);
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
</style>
