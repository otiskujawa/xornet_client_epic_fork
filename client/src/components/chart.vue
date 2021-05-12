<template>
    <div class="chart" >
        <canvas id="myChart" width="400" height="400"></canvas>
    </div>
</template>

<script>
export default {
    name: 'chart',
    props: {
        data: { type: [Object, Array], required: true },
        type: { type: String, required: true },
        options: { type: Object, required: false },
    },
    mounted(){
        var ctx = document.getElementById('myChart').getContext('2d');
        ctx.height = 500;
        var myChart = new Chart(ctx, {
            type: this.type,
            data: this.data,
            options: this.options || {
                maintainAspectRatio: false,
                fill: true,
                backgroundColor: 'rgba(200, 0, 150, 0.50)'
            }
        });
    },
}
</script>

<style scoped>
.chart {
    background-color: white;
    width: 500px;
    height: 250px;
}
</style>