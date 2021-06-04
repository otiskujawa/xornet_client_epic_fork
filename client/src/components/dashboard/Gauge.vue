<template>
  <div class="gauge">
    <svg class="gaugeTrack" overflow="visible" viewBox="0 0 100 100">
      <circle cx="70" cy="70" r="40"></circle>
      <circle class="progress" cx="70" cy="70" r="40" :style="{ 'stroke': color, 'stroke-dashoffset': 250 - (250 * (((value >= maxValue ? (maxValue - 0.01) : value) * 75) / ((maxValue * 100) / 100))) / 100 }"></circle>
    </svg>
    <img class="gaugeIcon" :src="icon" alt="" />
    <h1 v-if="driveLetter" class="gaugeText gaugeDriveLetter">{{ driveLetter }}</h1>
    <h1 class="gaugeText">{{ value + suffix }}</h1>
  </div>
</template>

<script>
export default {
  name: "Gauge",
  props: {
    icon: { type: String, required: true },
    value: { type: Number, required: true },
    maxValue: { type: Number, default: 100 },
    suffix: { type: String, required: true },
    color: { type: String, default: '#4d9fff'},
    driveLetter: { type: String, required: false }
  }
};
</script>

<style scoped>
.gauge {
  position: relative;
  width: 100px;
  height: 100px;
}

.gaugeIcon {
  position: absolute;
  user-select: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 32px;
  width: 32px;
  filter: invert(var(--filter));
}

.gaugeText {
  font-family: "Courier Prime", monospace;
  color: var(--black);
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: -0.04em;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 48px;
}

.gaugeDriveLetter {
  margin-top: 60px;
}

.gaugeTrack {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;
  transform: translate(-14px, -51px) rotate(135deg);
}

.gaugeTrack circle {
  height: 100%;
  width: 100%;
  fill: none;
  stroke-dasharray: 250;
  stroke-dashoffset: calc(250 - (250 * 75) / 100);

  stroke: var(--white);
  stroke-width: 8px;
  stroke-linecap: round;
  transition: 100ms ease;
  transform: translate(6px, 3px);
}

.gaugeTrack circle.progress {
  stroke-dasharray: 250;
  stroke-width: 10px;
}
</style>
