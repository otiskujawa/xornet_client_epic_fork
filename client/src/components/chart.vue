<template>
    <div class="chart" >
        <canvas :id="identity" width="400" height="400"></canvas>
    </div>
</template>

<script>
export default {
    name: 'chart',
    props: {
        data: { type: [Object, Array], required: true },
        type: { type: String, required: true },
        options: { type: Object, required: false },
        identity: { type: String, required: true },
    },
    mounted(){
        var ctx = document.getElementById(this.identity).getContext('2d');
        var myChart = new Chart(ctx, {
            type: this.type,
            data: this.data,
            options: this.options || {
                maintainAspectRatio: false,
                fill: true,
                tension: 0.4,
                animation: {
                    duration: 0
                },
                pointBackgroundColor: '#00000000',
                pointBorderColor: '#00000000',
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        grid: {
                            display: false,
                        },
                    }
                }
            }
        });
    },
}
</script>

<style scoped>
.chart {
    background-color: white;
    width: 800px;
    height: 250px;
}
</style>