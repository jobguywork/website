<template>
  <div class="donator layout-v layout-center pb-15 pt-25">
    <div v-if="rank" class="rank layout-v layout-center-center">{{ rank }}</div>
    <Medal v-if="order === 'THE_MOST'" :rank="rank" />
    <div class="coin">
      <img :src="image" :alt="donator.coin" />
    </div>
    <div class="name text-center mt-10">{{ donator.name }}</div>
    <div class="price mt-10 ltr">
      <span class="currency">~ $</span>
      <span class="val">
        {{ donator.cost }}
      </span>
    </div>
    <div class="amount mt-10 ltr">
      <span class="currency">{{ donator.coin }}</span>
      <span class="val">
        {{ donator.amount }}
      </span>
    </div>
    <div class="date mt-10">
      {{ donator.created | timeAgo }}
    </div>

    <a
      v-if="donator.link"
      class="trx"
      :href="donator.link"
      target="_blank"
      rel="nofollow"
    >
      <i class="fa fa-external-link" />
    </a>
  </div>
</template>

<script>
import Medal from './Medal'

export default {
  components: {
    Medal,
  },
  props: {
    donator: {
      type: Object,
      required: true,
    },
    rank: {
      type: Number,
      default: 0,
    },
    order: {
      type: String,
      default: '',
    },
  },
  computed: {
    image() {
      const { coin } = this.donator
      return `/images/coins/${coin}.png`
    },
  },
  methods: {
    formatWithComma(interval, num) {
      const digits = String(num).split('').reverse()
      const output = []

      digits.forEach(function (digit, index, digits) {
        output.push(digit)
        if ((index + 1) % interval === 0 && index + 1 < digits.length) {
          output.push(',')
        }
      })

      return output.reverse().join('')
    },
  },
}
</script>

<style lang="scss" scoped>
.donator {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  min-width: 140px;
  position: relative;
  user-select: none;
  @media (max-width: 740px) {
    min-width: 48%;
  }

  .rank {
    font-size: 11px;
    border: 1px solid #bbb;
    border-radius: 50%;
    background: white;
    width: 28px;
    height: 28px;
    position: absolute;
    top: -14px;
    cursor: default;
  }

  .coin {
    img {
      object-fit: cover;
      width: 32px;
      height: 32px;
      border-radius: 100%;
    }
  }

  .name {
    width: 128px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .amount,
  .price {
    .val {
      color: rgb(60, 72, 88);
      font-weight: bold;
      font-size: 17px;
    }
    .currency {
      font-size: 12px;
    }
  }

  .date {
    font-size: 12px;
  }

  .trx {
    position: absolute;
    right: 10px;
    bottom: 5px;
  }
}
</style>
