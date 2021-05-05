<template>
  <div v-loading="loading" class="salary">
    <client-only>
      <div id="chart-line2">
        <component
          :is="apexchart"
          :options="chartOptions"
          :series="series"
          type="area"
          :height="height"
        />
      </div>
      <div id="chart-line">
        <component
          :is="apexchart"
          :options="chartOptionsLine"
          :series="seriesLine"
          type="area"
          height="150"
        />
      </div>
    </client-only>
  </div>
</template>

<script>
import momentJalaali from 'moment-jalaali'

export default {
  data() {
    return {
      height: 400,
      loading: false,
      series: [],
      seriesLine: [],
      chartOptions: {
        tooltip: {
          x: {
            show: true,
            formatter(value, timestamp) {
              return momentJalaali
                .unix(parseInt(value / 1000))
                .format('jMMMM jYYYY')
            },
          },
        },
        chart: {
          id: 'chart2',
          type: 'area',
          height: 400,
          fontFamily: 'Vazir',
          toolbar: {
            autoSelected: 'pan',
            show: false,
          },
        },
        colors: ['#239df9', '#20BF55'],
        stroke: {
          width: 3,
        },
        dataLabels: {
          enabled: true,
        },
        fill: {
          opacity: 1,
        },
        markers: {
          size: 0,
        },
        xaxis: {
          labels: {
            show: false,
            formatter(value, timestamp) {
              return momentJalaali
                .unix(parseInt(value / 1000))
                .format('jMMM jYY')
            },
          },
        },
      },
      chartOptionsLine: {
        chart: {
          id: 'chart1',
          height: 170,
          type: 'area',
          fontFamily: 'Vazir',
          brush: {
            target: 'chart2',
            enabled: true,
          },
          selection: {
            enabled: true,
            xaxis: {
              min: parseInt(
                momentJalaali()
                  .startOf('month')
                  .subtract('months', 12)
                  .format('x')
              ),
              max: parseInt(
                momentJalaali()
                  .startOf('month')
                  .subtract('months', 2)
                  .format('x')
              ),
            },
          },
        },
        colors: ['#239df9', '#20BF55'],
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 0.95,
            opacityTo: 0.1,
          },
        },
        xaxis: {
          labels: {
            formatter(value, timestamp) {
              return momentJalaali
                .unix(parseInt(value / 1000))
                .startOf('month')
                .format('jMMM jYY')
            },
          },
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          tickAmount: 2,
        },
      },
    }
  },
  computed: {
    apexchart() {
      return () => {
        if (process.client) {
          return import('vue-apexcharts')
        }
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.onChangeHeight)
    this.getChart()
  },
  destroyed() {
    window.removeEventListener('resize', this.onChangeHeight)
  },
  methods: {
    async getChart() {
      const slug = this.$route.params.company

      try {
        this.loading = true
        const { data } = await this.$axios.get(
          `/public/company/${slug}/salary/`
        )
        const reviews = []
        const salaries = []
        data.data.forEach((element) => {
          const time = momentJalaali(element.time, 'YYYY-MM-DD')
            .startOf('month')
            .format('x')

          reviews.push([parseInt(time), element.reviews])
          salaries.push([parseInt(time), element.salary])
        })

        this.series.push({
          name: 'تعداد تجربه',
          data: reviews,
        })
        this.seriesLine.push({
          name: 'تعداد تجربه',
          data: reviews,
        })

        this.series.push({
          name: 'میانگین حقوق',
          data: salaries,
        })
        this.seriesLine.push({
          name: 'میانگین حقوق',
          data: salaries,
        })
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
    onChangeHeight() {
      if (screen.width < 600) {
        this.height = 300
      } else {
        this.height = 400
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.salary {
  min-height: 400px;
}
</style>
