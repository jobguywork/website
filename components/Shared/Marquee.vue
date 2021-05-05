<template>
  <div class="scores-marquee flex-row">
    <div v-if="marqueeList.length > 0" class="marquee-all">
      <div class="marquee flex-row">
        <div :style="stylesWrap" class="marque-wrap">
          <div id="detail-marquee-list" :style="styles" class="list">
            <div
              v-for="(item, index) in marqueeList"
              :key="index"
              :style="stylesItem"
              class="item"
            >
              {{ item }}
            </div>

            <div v-if="marqueeList.length > 0" :style="stylesItem" class="item">
              {{ marqueeList[0] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const regNumber = /^\d+$/

export default {
  components: {},
  props: {
    width: {
      validator(val) {
        return regNumber.test(val)
      },
      default: 200,
    },

    height: {
      validator(val) {
        return regNumber.test(val)
      },
      default: 38,
    },

    bg: {
      type: String,
      default: '#BD9955',
    },

    color: {
      type: String,
      default: '#fff',
    },

    fontSize: {
      validator(val) {
        return regNumber.test(val)
      },
      default: 12,
    },

    autoplay: {
      validator(val) {
        return regNumber.test(val)
      },
      default: 3000,
    },

    speed: {
      validator(val) {
        return regNumber.test(val)
      },
      default: 500,
    },
    marqueeList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      indexMq: 0,
      timer: null,

      styles: {
        top: 0,
        transitionDuration: 0,
      },

      stylesWrap: {
        width: this.width + 'px',
        height: this.height + 'px',
      },

      stylesItem: {
        height: this.height + 'px',
        lineHeight: this.height + 'px',
        color: this.color,
        fontSize: this.fontSize + 'px',
      },
    }
  },
  computed: {
    lenMq() {
      return this.marqueeList ? this.marqueeList.length : 0
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      this.setTop(this.speed, -(++this.indexMq * this.height))
      if (this.indexMq >= this.lenMq) {
        setTimeout(() => {
          this.indexMq = 0
          this.setTop(0, 0)
        }, this.speed)
      }
    }, this.autoplay)
  },
  destroyed() {
    clearInterval(this.timer)
    this.timer = null
    this.indexMq = 0
  },
  methods: {
    setTop(speed, top) {
      this.styles.transitionDuration = speed + 'ms'
      this.styles.top = top + 'px'
    },
  },
}
</script>

<style scoped>
.flex-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.marque-wrap {
  overflow: hidden;
  position: relative;
}

.list {
  position: absolute;
  right: 0;
  top: 0;
}

.item {
  overflow: hidden;
}
</style>
