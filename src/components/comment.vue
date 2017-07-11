<template>
<div>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
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
</template>

<script>
import config from "../common/consts.js"
  export default {
    data(){
      return {
        tableData:[],
        currentPage:""
      }
    },
    created(){
      this.url = this.$route.matched[0].path
      this.path = config.list[this.$route.matched[0].path]
      // this.subroute = this.$route.matched[1].path
      // console.log(this.subroute)
      // sub = config.list[this.subroute]
      console.log(this.path)
      console.log(this.$route.params)
      this.updateCnt()
    },
    methods:{
      updateCnt(){
        fetch(`/api/v1.0/comments/?id=${this.$route.params.id}&kind=${this.path}`,{
            headers: {
              'Authorization': 'Basic ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVEo5Lmp6bjJKMzc0WlByN1ZscDFkeFowUFZLcGQyVmpvUkowbHdadkVmdkljQ00=',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
          },
        })
        .then((res) =>{
          return res.json()
        }).then(value =>{
          this.tableData = value
        })
      },
      handleCurrentChange(val) {
          this.currentPage = val;
          fetch(`/api/v1.0/comments/?id=12&kind${this.path}`,{
            headers: {
              'Authorization': 'Basic ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVEo5Lmp6bjJKMzc0WlByN1ZscDFkeFowUFZLcGQyVmpvUkowbHdadkVmdkljQ00=',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          })
          .then((res) =>{
            return res.json()
          }).then(value =>{
            this.tableData = value
          })
        }
      }
  }
</script>