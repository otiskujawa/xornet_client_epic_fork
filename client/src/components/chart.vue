<template>
    <canvas id="myChart" width="400" height="400"></canvas>
</template>

<script>
export default {
    name: 'chart',
    props: {
        data: { type: Object, required: true },
        type: { type: String, required: true },
        options: { type: Object, required: true },
    },
    mounted(){
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: this.type,
            data: this.data,
            options: this.options
        });
    },
}
</script>
