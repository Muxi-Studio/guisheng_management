<template>
	<div class="wrap">
		<div v-if="category === '/news'">la</div>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column 
      prop="state" 
      label="状态" 
      width="100" 
      :filters="[{ text: '已发布', value: 1 }, { text: '未发布', value: 0 }]" 
      :filter-method="filterTag" inline-template>
      <el-tag :type="row.state === 0 ? 'primary' : 'success'" close-transition>
        {{row.state === 1 ? '已发布':'未发布'}}
      </el-tag>
    </el-table-column>
    <el-table-column
      prop="id"
      label="id"
      width="100">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="author"
      label="作者"
      width="180">
    </el-table-column>
    <el-table-column
      prop="description"
      label="描述"
      width="180">
    </el-table-column>
    <el-table-column
      prop="tags"
      label="标签"
      width="200"
      inline-template>
      <el-tag v-for="tag in row.tags">{{ tag }}</el-tag>
    </el-table-column>
    <el-table-column
      fixed="right"
      width="250"
      :context="_self"
      inline-template
      label="操作">
      <div>
        <el-button
          size="small"
          @click="handleEdit($index, row)">
          编辑信息
        </el-button>
        <el-button
          size="small"
          @click="handleEdit($index, row)">
          编辑正文
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete($index, row)">
          删除
        </el-button>
      </div>
    </el-table-column>
  </el-table>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
        tableData:[]
			}
		},
		created(){
      console.log(this.$route.path)
      // fetch("/api"+"/news")
      // .then( (res) => {
      //   return res.json()
      // }).then( value => {
      //   this.tableData = value.tableData
      // })
		},
  		methods:{
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push({name:this.$route.matched[0].path,params: { aid:row.id }})

      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.state === value;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      }
  		}
	}
</script>