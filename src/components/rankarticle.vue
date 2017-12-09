<template>
  <div class="wrap">
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="kind"
      label="类别"
      width="120"
      :filters="[{ text: '文章', value: 1 }, { text: '图集', value: 2 }]" 
      :filter-method="filterKind" inline-template>
      <el-tag :type="row.kind === 1 ? 'primary' : 'success'" close-transition>
        {{row.kind === 1 ? '文章':'图集'}}
      </el-tag>
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
import Cookie from '../cookie.js'
  export default{
    data(){
      return {
        tableData:[],
        currentPage:"",
        count: 0,
        route:""
      }
    },
    props:["month"],
    created(){
        if(this.month){
          this.route = `/api/v1.0/rank/articles/${this.month}/?count=10`
        }else{
          this.route = `/api/v1.0/rank/articles/?count=10`
        }
        this.updateRankCnt()
    },
    watch: {
      month: function (val) {
        if(val){
          this.route = `/api/v1.0/rank/articles/${val}/?count=10`          
        }else{
          this.route = `/api/v1.0/rank/articles/?count=10`
        }
        this.updateRankCnt()      
      },
    },
    methods:{
      updateRankCnt(){
        fetch(`${this.route}&page=1`,{
          headers: {
            'Authorization': Cookie.getCookie("token"),
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
        })
      .then( (res) => {
        return res.json()
      }).then( value => {
        this.tableData = value
        if(value[0]){
          this.count = value[0].count
        }
        })        
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.published === value;
      },
      filterKind(value, row) {
        return row.kind === value;
      },
      handleCurrentChange(val) {
          this.currentPage = val;
            fetch(`${this.route}&page=${val}`,{
              headers: {
                'Authorization': Cookie.getCookie("token"),
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
            })
          .then( (res) => {
            return res.json()
          }).then( value => {
            this.tableData = value            
          })
      }
    }
  }
</script>