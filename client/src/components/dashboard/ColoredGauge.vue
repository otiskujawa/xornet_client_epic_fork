<template>
  <div class="coloredGauge">
    <svg class="gaugeTrack" overflow="visible" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40"></circle>
      <circle class="progress" cx="50" cy="50" r="40" :style="{ stroke: color, 'stroke-dashoffset': 250 - (250 * value) / maxValue }"></circle>
    </svg>
    <Icon colored :color="color" :icon="icon"/>
  </div>
</template>

<script>
import Icon from "@/components/misc/Icon";

export default {
    name: "ColoredGauge",
    props: {
      icon: { type: String },
      value: { type: [Number, String], required: true, default: 0 },
      maxValue: { type: [Number, String], required: true, default: 100 },
      color: { type: String, required: true, default: "#ff00b6" }
    },
    components: {
        Icon
    }
}
</script>

<style scoped>
.coloredGauge {
  position: relative;
  width: 100px;
  height: 100px;
}

.gaugeIcon {
  user-select: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;

}

.gaugeDriveLetter {
  margin-top: 60px;
}

.gaugeTrack {
  display: flex;
  justify-content: center;
  transform: rotate(90deg);
  align-items: center;
}

.gaugeTrack circle {
  height: 100%;
  width: 100%;
  fill: none;
  stroke-dasharray: 250;

  /* stroke: var(--white); */
  stroke-width: 8px;
  stroke-linecap: round;
  transition: 100ms ease;
}

.gaugeTrack circle.progress {
  stroke-dasharray: 250;
  stroke-width: 6px;
}
</style>