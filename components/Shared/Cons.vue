<template>
  <span class="wrap-cons-select">
    <el-select
      v-model="cons"
      :multiple-limit="20"
      :remote-method="remoteMethod"
      :loading="loading"
      class="full-width"
      multiple
      filterable
      remote
      reserve-keyword
      allow-create
      placeholder="انتخاب معایب"
    >
      <el-option
        v-for="(item, index) in consList"
        :key="index"
        :label="item.name"
        :value="item.name"
      />
    </el-select>
  </span>
</template>

<script>
import lscache from 'lscache'

export default {
  props: {
    value: {
      type: Array,
      default() {
        return []
      },
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      consList: [],
    }
  },
  computed: {
    cons: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  async mounted() {
    let cons = lscache.get('cons')
    if (!cons) {
      await this.getList()
    } else {
      cons = JSON.parse(cons)
      this.consList = cons
    }
  },
  methods: {
    remoteMethod(query) {
      this.getList(query)
    },
    async getList(query) {
      try {
        this.loading = true
        const res = await this.$axios.get('/public/cons/list/', {
          params: {
            name__icontains: query || '',
          },
        })

        this.consList = res.data.data
        if (!query) {
          lscache.set('cons', JSON.stringify(this.consList), 30)
        }
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
<style lang="scss">
.wrap-cons-select {
  .el-input__suffix {
    display: none;
  }
  .el-input--suffix .el-input__inner {
    padding-right: 15px;
  }
  .el-select .el-select__tags {
    margin-right: 15px;
  }
}
</style>
