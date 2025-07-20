<template>
  <div>
    <el-card>
      <!-- 按钮 -->
      <el-button type="primary" icon="Plus" @click="handleAdd">添加品牌</el-button>
      <!-- 表格 -->
      <el-table :data="tableData" class="table-box" border>
        <el-table-column type="index" label="序号" width="120"></el-table-column>
        <el-table-column prop="tmName" label="品牌名称" />
        <el-table-column prop="logoUrl" label="品牌LOGO">
          <template #default="{ row }">
            <img :src="row.logoUrl.replace('/api', baseUrl)" class="trademark-img" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="品牌操作">
          <template #default="{ row }">
            <el-button type="warning" icon="Edit" size="small"></el-button>
            <el-popconfirm
              confirm-button-text="是"
              cancel-button-text="否"
              icon="InfoFilled"
              title="确认删除？"
              @confirm="handleDel(row.id)"
            >
              <template #reference>
                <el-button type="danger" icon="Delete" size="small"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="queryParams.page"
        v-model:page-size="queryParams.limit"
        :page-sizes="[10, 20, 30, 40]"
        size="default"
        :background="background"
        layout="prev, pager, next, jumper, ->,sizes, total"
        :total="queryParams.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <Edit v-model:visible="dialogVisible"></Edit>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRaw, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import {
  getTrademarkList,
  deleteTrademark,
  addTrademark,
  updateTrademark,
} from '@/api/product/index'
import { TradeMarkResponseData, Records, ResponseData } from '@/api/product/type'
import Edit from './edit.vue'

const baseUrl = import.meta.env.VITE_API_BASE_URL
const background = ref(true)

const tableData = ref<Records>([])

const loading = ref(false)

const dialogVisible = ref(false)

const queryParams = reactive({
  limit: 10,
  page: 1,
  total: 0,
})

const getTrademarkData = () => {
  const data = toRaw(queryParams)
  loading.value = true
  getTrademarkList(data)
    .then((res: TradeMarkResponseData) => {
      if (res.ok) {
        tableData.value = res.data.records || []
        queryParams.total = res.data.total || 0
      }
    })
    .finally(() => {
      loading.value = false
    })
}

const handleSizeChange = () => {
  queryParams.page = 1
  getTrademarkData()
}
const handleCurrentChange = () => {
  getTrademarkData()
}

const handleDel = (id: number) => {
  deleteTrademark(id).then(res => {
    if (res.ok) {
      ElMessage({
        message: `删除成功`,
        type: 'success',
      })
      getTrademarkData()
    }
  })
}

const handleAdd = () => {
  dialogVisible.value = true
}

onMounted(() => {
  getTrademarkData()
})
</script>

<style scoped lang="scss">
.table-box {
  margin: 16px 0;
  width: 100%;
  .trademark-img {
    object-fit: cover;
    height: 40px;
    width: 40px;
  }
}
</style>
