<template>
<div class="wrap">
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column 
      prop="user_role" 
      label="状态" 
      width="100" 
      :filters="[{ text: '作者', value: 1 }, { text: '用户', value: 0 }]" 
      :filter-method="filterTag" inline-template>
      <el-tag :type="row.user_role === 0 ? 'primary' : 'success'" close-transition>
        {{row.user_role === 1 ? '作者':'用户'}}
      </el-tag>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="message"
      label="评论内容">
    </el-table-column>
    <el-table-column
      prop="likes"
      label="评论点赞"
      width="100">
    </el-table-column>
    <el-table-column
      width="100"
      :context="_self"
      inline-template
      label="操作">
        <el-button
          size="small"
          type="text"
          @click="handleDelete($index, row)">
          删除
        </el-button>
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
        currentPage:"",
        count: 0,
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
        fetch(`/api/v1.0/comments/list/?id=${this.$route.params.id}&kind=${this.path}&count=10&page=1`,{
            headers: {
              'Authorization': 'Basic ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVEo5Lmp6bjJKMzc0WlByN1ZscDFkeFowUFZLcGQyVmpvUkowbHdadkVmdkljQ00=',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
          },
        })
        .then((res) =>{
          return res.json()
        }).then(value =>{
          this.tableData = value.comments
          this.count = value.num
        })
      },
      handleCurrentChange(val) {
          this.currentPage = val;
          fetch(`/api/v1.0/comments/list/?id=${this.$route.params.id}&kind=${this.path}&count=10&page=${val}`,{
            headers: {
              'Authorization': 'Basic ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVEo5Lmp6bjJKMzc0WlByN1ZscDFkeFowUFZLcGQyVmpvUkowbHdadkVmdkljQ00=',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          })
          .then((res) =>{
            return res.json()
          }).then(value =>{
            this.tableData = value.comments
          })
        },
      filterTag(value, row) {
        return row.user_role === value;
      },
      handleDelete(index, row){
        console.log(row)
        fetch(`/api/v1.0/comments/${row.comment_id}/`, {
            method: 'DELETE',
            headers: {
            'Authorization': 'Basic ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVEo5Lmp6bjJKMzc0WlByN1ZscDFkeFowUFZLcGQyVmpvUkowbHdadkVmdkljQ00=',
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
        }).then((res) =>{
          return res.json()
        }).then(value =>{
          console.log(value)
          this.updateCnt()
        })
      }
    }
  }
</script>