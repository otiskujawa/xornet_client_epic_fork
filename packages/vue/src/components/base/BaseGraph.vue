<template>
  <apexchart
    class="apexChart"
    type="line"
    height="100%"
    width="100%"
    :options="options"
    :series="series"
  />
</template>

<script setup lang="ts">
import type { ApexOptions } from "apexcharts";
const props = defineProps<{series: ApexAxisChartSeries}>();
const options: ApexOptions = {
	chart: {
		id: Date.now().toString(),
		sparkline: {
			enabled: true,
		},
		animations: {
			enabled: false,
			dynamicAnimation: {
				speed: 1000,
			},
		},
	},
	yaxis: {
		// This constraints the vertical zoom
		// so small values arent too massive
		// and it keeps some space above
		// the peak of the graph so it looks spacious
		max: n => Math.max(n + n / 4, 50),
	},
	stroke: {
		show: true,
		curve: "smooth",
		lineCap: "round",
		width: 2,
	},
	colors: [
		"#00bcd4",
		"#ff00b6",
	],
	fill: {
		type: "gradient",
		gradient: {
			shade: "dark",
			type: "vertical",
			shadeIntensity: 0.5,
			opacityFrom: 0.6,
			opacityTo: 0.5,
			stops: [0, 50, 100],
		},
	},
	tooltip: {
		theme: "dark",
		x: {
			formatter: (value: number) => {
				const val = props.series[0].data.length * 2 - value * 2;
				return `${val} seconds ago`;
			},
		},
		y: {
			formatter: (value: number) => {
				return `${getDataValue(value, 0)} ${getDataUnit(value)}`;
			},
		},
	},
};

function getDataUnit(a: number) {
	if (a === -1) return null;
	if (!a) return "Mbps";
	const c = 1024;
	const e = ["Mbps", "Gbps", "Tbps", "Pbps", "Ebps", "Zbps", "Ybps"];
	const f = Math.floor(Math.log(a) / Math.log(c));

	return `${e[f]}`;
}

function getDataValue(a: number, b: number) {
	if (a === -1) return "None";
	if (!a) return "0";
	const c = 1024;
	const d = b || 2;
	const f = Math.floor(Math.log(a) / Math.log(c));

	return `${parseFloat((a / Math.pow(c, f)).toFixed(d))}`;
}

</script>
