<template>
  <div class="gauge">
    <svg class="gaugeTrack">
      <path d='M95,50 A45,45 0 0,1 5,50 A45,45 0 0,1 50,5'/>
    </svg>
    <svg class="gaugeProgress">
      <path d='M95,50 A45,45 0 0,1 5,50 A45,45'/>
    </svg>
    <img class="gaugeIcon" :src="icon" alt="">
    <h1 class="gaugeText">{{value}}</h1>
  </div>
</template>

<script>
export default {
  name: "gauge",
  props: {
    icon: { type: String, require: true },
    value: { type: Number, require: true },
    maxValue: { type: Number, require: true },
  },
}
</script>

<style scoped>

.gauge {
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gaugeIcon {
  user-select: none;
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
  margin-top: 82px;
}

.gaugeTrack {
  position: absolute;
  height: 100px;
  width: 100px;
  fill: none;
  transform: scale(0.7) rotateZ(135deg);
  stroke: #17172E;
  stroke-width: 8;
  stroke-linecap: round;
}

.gaugeProgress {
  position: absolute;
  height: 100px;
  fill: none;
  width: 100px;
  transform: scale(0.7) rotateZ(0deg);
  stroke: #DB00FF;
  stroke-width: 8;
  stroke-linecap: round;
}

</style>