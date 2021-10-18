<template>
  <div style="width: 100%; margin: 0 auto 30px">
    <PolarAreaChart :options="newOptions" :chartData="testData" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { Flavor } from '@/types'
import { PolarAreaChart } from 'vue-chart-3'
import { Chart, ChartData, registerables } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { getRelativePosition } from 'chart.js/helpers'

Chart.register(...registerables)
Chart.register(ChartDataLabels)
export default defineComponent({
  name: 'flavorWheelChart',
  components: { PolarAreaChart },
  props: {
    flavors: {
      type: Array as PropType<Array<Flavor>>,
      required: true
    }
  },
  setup(props) {
    const labels = computed(() => {
      return props?.flavors?.map((flavor: Flavor) => flavor.name)
    })
    const values = computed(() => {
      return props.flavors.map((flavor: Flavor) => flavor.value)
    })

    const testData = computed<ChartData<'polarArea'>>(() => ({
      labels: labels.value,
      datasets: [
        {
          data: values.value,
          backgroundColor: [
            '#f5bd33',
            '#e89e13',
            '#dc7217',
            '#cc502f',
            '#9f241d'
            // '#712b1e'
            // '#77CEFF',
            // '#0079AF',
            // '#123E6B',
            // '#97B0C4',
            // '#A5C8ED'
          ]
        }
      ]
    }))

    const newOptions = ref({
      responsive: true,
      onClick: (e: any, data: any) => {
        // This is almost there, just need to figure out how to get the value based on click position. Polar doesn't have X or Y defined on r
        // const chart = e.chart
        // const canvasPosition = getRelativePosition(e, chart)
        // console.log(chart.scales.r)
        // const dataX = chart.scales.r.getValueForPixel(canvasPosition.x);
        // const dataY = chart.scales.r.getValueForPixel(canvasPosition.y);
        // console.log('x', dataX)
        // console.log('y', dataY)
        // console.log(Chart.helpers.getRelativePositon(e, e.chart))
        // console.log(e)
      },
      plugins: {
        legend: {
          display: false
        },
        datalabels: {
          formatter: (value: any, context: any) =>
            context.chart.data.labels[context.dataIndex].replace(' ', '\n'),
          anchor: 'start',
          align: 'end',
          textAlign: 'center',
          offset: 0 // Gets updated in onResize based on size of chart
        }
      },
      onResize(chart: any, size: any) {
        if (!chart) return
        const firstOffset = !chart.options.plugins.datalabels.offset
        const padding = chart.options.layout.padding
        const minSize = Math.min(size.width, size.height)
        chart.options.plugins.datalabels.offset = minSize / 2 - padding
        if (firstOffset) chart.update()
      },
      layout: {
        padding: 40
      },
      scales: {
        r: {
          pointLabels: {
            display: false
          },
          angleLines: {
            display: true
          },
          suggestedMin: 0,
          suggestedMax: 5,
          ticks: {
            min: 0,
            max: 100,
            stepSize: 1,
            beginAtZero: true
          }
        }
      }
    })

    return {
      testData,
      newOptions
    }
  }
})
</script>
