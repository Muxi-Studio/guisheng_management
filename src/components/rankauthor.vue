<template>
  <div class="wrap">
  <el-table
    :data="tableData"
    border>
    <el-table-column
      prop="name"
      label="作者">
    </el-table-column>
    <el-table-column
      prop="articles_sum"
      label="文章总量"
      width="180">
    </el-table-column>
    <el-table-column
      prop="views_sum"
      label="浏览总量"
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
          this.route = `/api/v1.0/rank/authors/${this.month}/?count=10`
        }else{
          this.route = `/api/v1.0/rank/authors/?count=10`
        }
        this.updateRankCnt()
    },
    watch: {
      month: function (val) {
        if(val){
          this.route = `/api/v1.0/rank/authors/${val}/?count=10`          
        }else{
          this.route = `/api/v1.0/rank/authors/?count=10`
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