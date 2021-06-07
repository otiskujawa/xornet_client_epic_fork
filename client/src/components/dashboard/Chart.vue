<template>
  <div class="chart">
    <canvas :id="identity" width="800" height="600"></canvas>
  </div>
</template>

<script>
export default {
  name: "Chart",
  props: {
    data: { type: [Object, Array], required: true },
    type: { type: String, required: true },
    options: { type: Object, required: false },
    identity: { type: String, required: true }
  },
  mounted() {
    var ctx = document.getElementById(this.identity).getContext("2d");
    var myChart = new Chart(ctx, {
      type: this.type,
      data: this.data,
      options: this.options || {
        plugins: {
          tooltip: {
            intersect: false,
            interaction: {
              mode: "index",
              axis: "x"
            }
          }
        },
        maintainAspectRatio: false,
        fill: false,
        borderWidth: 3,
        tension: 0.35,
        legend: {
          display: false
        },
        animation: {
          duration: 0
        },
        pointBackgroundColor: "#00000000",
        pointBorderColor: "#00000000",
        spanGaps: 55,
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              display: false
            },
            beginAtZero: true
          },
          y: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
};
</script>

<style scoped>
.chart {
  background-color: var(--background-color);
  width: 800px;
  height: 200px;
}
</style>
