<template>
    <div>
        <canvas :id="'chart' + labels[0] + randomId"></canvas>
    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
    name: 'LineChart',

    props: {
        type: {
            type: String,
            required: true,
        },
        labels: {
            type: Array,
            required: true,
        },
        datasets: {
            type: Array,
            required: true,
        },
        randomId: {
            type: Number,
            default: 0,
        }
    },

    data: () => ({
    }),
    mounted() {
    const ctx = document.getElementById('chart' + this.labels[0] + this.randomId);
    new Chart(ctx, {
        type: this.type,
        data: {
            labels: this.labels,
            datasets: this.datasets,
        },
        options: {
            responsive: true,
            lineTension: 1,
            scales: {
                yAxes: [
                {
                    ticks: {
                    beginAtZero: true,
                    padding: 25
                    }
                }
                ]
            }
        }
    });
  }
}
</script>

<style scoped>

</style>
