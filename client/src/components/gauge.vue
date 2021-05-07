<template>
  <div class="gauge">
    <svg class="gaugeTrack" overflow="visible">
      <circle cx="70" cy="70" r="70"></circle>
      <circle class="progress" cx="70" cy="70" r="70" :style="{'stroke-dashoffset': 440 - (440 * ((value * 75) / ((maxValue * 100) / 100))) / 100}"></circle>
    </svg>
    <img class="gaugeIcon" :src="icon" alt="">
    <h1 class="gaugeText">{{value + suffix}}</h1>
  </div>
</template>

<script>
export default {
  name: "gauge",
  props: {
    icon: { type: String, required: true },
    value: { type: Number, required: true },
    maxValue: { type: Number, required: true, default: 100},
    suffix: { type: String, required: true},
  },
}
</script>

<style scoped>

.gauge {
  position: relative;
}

.gaugeIcon {
  position: absolute;
  user-select: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 32px;
  width: 32px;
  filter: invert(1);
}

.gaugeText {
  font-family: 'Courier Prime', monospace;
  color: var(--white);
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: -0.04em;
  position: absolute;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 56px;
}

.gaugeTrack {
  position: relative;
  width: 150px;
  height: 150px;
  z-index: 1;
  transform: rotate(135deg) scale(0.6);
}

.gaugeTrack circle {
  height: 100%;
  width: 100%;
  fill: none;
  stroke-dasharray: 440;
  stroke-dashoffset: calc(440 - (440 * 75) / 100);

  stroke: #17172E;
  stroke-width: 8px;
  stroke-linecap: round;
  transition: 100ms ease;
  transform: translate(6px, 3px);
}

.gaugeTrack circle.progress {
  stroke-dasharray: 440;
  stroke-width: 12px;
  stroke: aqua;
}

</style>