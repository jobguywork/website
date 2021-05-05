<template>
  <div class="container">
    <div v-loading="loading" class="my-reviews-wrap rtl">
      <h3>مصاحبه های من:</h3>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="عنوان">
          <template slot-scope="scope">
            <nuxt-link :to="link(scope.row.id)">
              {{ scope.row.title }}
            </nuxt-link>
          </template>
        </el-table-column>
        <el-table-column label="شرکت">
          <template slot-scope="scope">
            {{ scope.row.company.name }}
          </template>
        </el-table-column>
        <el-table-column width="100px" label="وضعیت">
          <template slot-scope="scope">
            <div class="text-center">
              <div v-if="scope.row.approved">
                <ElTag>تایید شده</ElTag>
              </div>
              <div v-else>
                <ElTag type="info">در حال بررسی</ElTag>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="تاریخ">
          <template slot-scope="scope">
            {{ scope.row.created | timeAgo }}
          </template>
        </el-table-column>
        <el-table-column prop="address" width="70px" label="ویرایش">
          <template slot-scope="scope">
            <div class="text-center">
              <Edit :id="scope.row.id" type="interview" />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { DOMAIN_TITLE } from '@/config/app.js'
import Edit from '@/components/Shared/Edit'

export default {
  components: {
    Edit,
  },
  middleware: 'authenticated',
  data() {
    return {
      tableData: [],
      loading: false,
    }
  },
  head() {
    let meta = []
    meta = [
      {
        property: 'og:site_name',
        content: DOMAIN_TITLE,
      },
      {
        property: 'og:title',
        content: DOMAIN_TITLE,
      },
    ]
    return {
      bodyAttrs: {
        class: 'settings-page',
      },
      title: `مصاحبه های من - ${DOMAIN_TITLE}`,
      meta,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        this.loading = true
        const res = await this.$axios.get('/authnz/my_interviews')

        this.tableData = res.data.data
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
    link(id) {
      return `/interview/${id}`
    },
  },
}
</script>

<style lang="scss">
.my-reviews-wrap {
  min-height: 500px;
  margin-top: 170px;
  padding-bottom: 50px;
  table {
    td,
    th {
      text-align: right;
    }
  }
}
</style>
