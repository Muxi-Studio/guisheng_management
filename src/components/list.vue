<template>
	<div class="wrap">
		<div v-if="category === '/news'">la</div>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column 
      prop="published" 
      label="状态" 
      width="100" 
      :filters="[{ text: '已发布', value: 1 }, { text: '未发布', value: 0 }]" 
      :filter-method="filterTag" inline-template>
      <el-tag :type="row.published === 0 ? 'primary' : 'success'" close-transition>
        {{row.published === 1 ? '已发布':'未发布'}}
      </el-tag>
    </el-table-column>
    <el-table-column
      prop="time"
      label="编辑时间"
      width="120">
    </el-table-column>
    <el-table-column
      prop="article_id"
      label="ID"
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
      <el-tag v-if="row.tags[0]!=='' " v-for="tag in row.tags">{{ tag }}</el-tag>
    </el-table-column>
    <el-table-column
      prop="img_url"
      label="头图url"
      width="180">
    </el-table-column>
    <el-table-column
      prop="views"
      label="浏览量"
      width="100">
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
        layout="total, prev, pager, next"
        :total="count">
      </el-pagination>
    </div>
	</div>
</template>
<script>
import config from "../common/consts.js"
	export default{
		data(){
			return {
        tableData:[],
        currentPage:"",
        path: 0,
        count: 0
			}
		},
		created(){
      this.path = config.list[this.$route.matched[0].path]
      fetch("http://120.24.4.254:8888/api/v1.0/feed/?page=1&count=10&kind=" + this.path)
        .then( (res) => {
          return res.json()
        }).then( value => {
          this.tableData = value
          this.count = value[0].count
        })
		},
  		methods:{
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push({name:this.$route.matched[0].path,params: { aid:row.article_id }})

      },
      handleDelete(index, row) {
        fetch(`http://120.24.4.254:8888/api/v1.0/news/${row.article_id}/`, {
            method: 'DELETE',
        }).then((res) =>{
          return res.json()
        }).then(value =>{
          console.log(value)
        })
        // fetch(`/api/v1.0/feed/?page=${this.currentPage}&count=10&kind=1`)
        //   .then( (res) => {
        //     return res.json()
        //   }).then( value => {
        //     this.tableData = value
        //     console.log(value)
        //   })
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.state === value;
      },
      handleCurrentChange(val) {
          this.currentPage = val;
          fetch(`http://120.24.4.254:8888/api/v1.0/feed/?page=${val}&count=10&kind=${this.path}`)
            .then((res) =>{
              return res.json()
            }).then(value =>{
              this.tableData = value
              console.log(value)
            })
        }
  		}
	}
</script>