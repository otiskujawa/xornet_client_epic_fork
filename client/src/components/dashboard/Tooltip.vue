<template>
  <div class="toolTipBox" :side="side" :class="side">
    <slot />
    <div class="tooltip" :style="bgcolor">
      <span class="text" :style="textcolor">{{ text }}</span>
      <div class="arrow" :style="bordercolor"></div>
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
      required: false
    },
    color: {
      type: String,
      required: false,
      default: "#6142ff"
    }
  },
  computed: {
    bgcolor() {
      return "background: " + this.color;
    },
    bordercolor() {
      return "border-color: " + this.color + " transparent transparent transparent";
    },
    textcolor() {
      let num = Math.sqrt((0.299 * this.hexToRgb.r) ^ (2 + 0.587 * this.hexToRgb.g) ^ (2 + 0.114 * this.hexToRgb.b) ^ 2);
      return num < 7 ? "color: white" : "color: black";
    },
    hexToRgb() {
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      let hex = this.color;
      hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
      });

      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          }
        : null;
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
}

.toolTipBox.under .tooltip {
  bottom: -100%;
}

.toolTipBox.left .tooltip {
  bottom: 0;
  left: -100%;
  margin-right: 8px;
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

.arrow {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;

  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
}

.toolTipBox.under .arrow {
  top: -25%;
  transform: rotate(180deg);
}

.toolTipBox.left .arrow {
  top: 52%;
  left: 104%;
  margin-right: 9px;
  transform: rotate(270deg) translateX(50%);
}

.toolTipBox.right .arrow {
  top: 52%;
  left: 0%;
  margin-left: -9px;
  transform: rotate(90deg) translateX(-50%);
}
</style>

<!-- ADD ABILITY TO
HAVE TEXT COLOR WHITE/BLACK BASED ON VISBILITY AGAINST BG
-->
