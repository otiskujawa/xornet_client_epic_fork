<template>
  <div class="multiGauge">
    <svg class="track" overflow="visible" viewBox="0 0 100 100" v-for="(color, index) of colors" :key="color">
      <circle
        class="road"
        cx="50"
        cy="50"
        :r="radius - index * spacingMultiplier"
        :style="{
          'stroke-dasharray': calculateCircumference(radius - index * spacingMultiplier),
          'stroke-dashoffset': calculateCircumference(radius - index * spacingMultiplier) - (calculateCircumference(radius - index * spacingMultiplier) * (25 * circleDegreePercentage)) / 100
        }"
      ></circle>
      <circle
        class="progress"
        cx="50"
        cy="50"
        :r="radius - index * spacingMultiplier"
        :style="{
          stroke: color,
          'stroke-dasharray': calculateCircumference(radius - index * spacingMultiplier),
          'stroke-dashoffset': calculateProgress(values[index], maxValues[index], radius - index * spacingMultiplier)
        }"
      ></circle>
    </svg>
    <img class="logo" :src="logo" alt="" />
  </div>
</template>

<script>
export default {
  name: "MultiGauge",
  data() {
    return {
      // The starting radius
      radius: 48,

      // The spacing between each circle
      spacingMultiplier: 6,

      // This is the percentage of 360deg of the circle
      // for example 75% would be 270deg,
      circleDegreePercentage: 75
    };
  },
  methods: {
    calculateCircumference(radius) {
      return 2 * 3.1415927 * radius;
    },
    calculateProgress(value, maxValue, radius) {
      const PERCENT = 100;
      const CIRCUMFERENCE = this.calculateCircumference(radius);
      const normalizedValue = value >= maxValue ? maxValue - 0.01 : value;

      const offset = CIRCUMFERENCE - (CIRCUMFERENCE * ((normalizedValue * this.circleDegreePercentage) / maxValue)) / PERCENT;

      return offset;
    }
  },
  props: {
    logo: { type: String },
    values: { type: Array, required: true, default: [0, 0, 0, 0] },
    maxValues: { type: Array, required: true, default: [100, 100, 100, 100] },
    colors: { type: Array, required: true }
  }
};
</script>

<style scoped>
.multiGauge {
  position: relative;
  width: 200px;
  height: 200px;
}

.multiGauge .logo {
  user-select: none;
  filter: invert(var(--filter));
  width: 35%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}

.multiGauge .track {
  position: absolute;
  overflow: visible;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  transform: rotate(90deg);
  align-items: center;
}

.multiGauge .track circle {
  height: 100%;
  width: 100%;
  fill: none;
  stroke-width: 8px;
  stroke-linecap: round;
  transition: 500ms ease;
}

.multiGauge .track circle.road {
  stroke: var(--white);
  stroke-width: 3px;
}

.multiGauge .track circle.progress {
  stroke-width: 4px;
}
</style>
