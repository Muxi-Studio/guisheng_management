<template>
<div class="wrap">
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column 
      v-if="route === 'user'"
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
      v-if="route === 'admin'" 
      prop="user_role" 
      label="状态" 
      width="100"
      :filters="[{ text: '管理员', value: 1 }, { text: '编辑', value: 0 }]" 
      :filter-method="filterAdmin" inline-template>
      <el-tag :type="row.user_role === 0 ? 'primary' : 'success'" close-transition>
        {{row.user_role === 1 ? '管理员':'编辑'}}
      </el-tag>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名">
    </el-table-column>
    <el-table-column
      width="100"
      :context="_self"
      inline-template
      label="操作">
      <div>
        <el-button
          size="small"
          type="text"
          v-if="route === 'user' && row.user_role == 1"
          @click="setRole($index, row,1)">
          设为用户
        </el-button>
        <el-button
          size="small"
          type="text"
          v-if="route === 'user' && row.user_role == 0"
          @click="setRole($index, row,0)">
          设为作者
        </el-button>
        <el-button
          size="small"
          type="text"
          v-if="route === 'admin' && row.user_role == 1"
          @click="setAdmin($index, row,1)">
          设为编辑
        </el-button>
        <el-button
          size="small"
          type="text"
          v-if="route === 'admin' && row.user_role == 0"
          @click="setAdmin($index, row,0)">
          设为管理员
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
var req = "";
import config from "../common/consts.js"
import Cookie from '../cookie.js'
  export default {
    data(){
      return {
        tableData:[],
        currentPage:"",
        count: 0,
        route: 'user'
      }
    },
    created(){
      if(this.$route.path === '/adminlist') {
        this.route = 'admin'
      }
      this.updateCnt()     
    },
    methods:{
      updateCnt(){
        fetch(`/api/v1.0/${this.route}/list/?count=10&page=1`,{
            headers: {
                'Authorization': Cookie.getCookie("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
          },
        })
        .then((res) =>{
          return res.json()
        }).then(value =>{
          this.tableData = value.users
          this.count = value.num
        })
      },
      handleCurrentChange(val) {
          this.currentPage = val;
          fetch(`/api/v1.0/${this.route}/list/?count=10&page=${val}`,{
            headers: {
              'Authorization': Cookie.getCookie("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          })
          .then((res) =>{
            return res.json()
          }).then(value =>{
            this.tableData = value.users
          })
        },
      filterTag(value, row) {
        return row.user_role === value;
      },
      filterAdmin(value, row) {
        return row.user_role === value
      },
      setRole(index, row, role){
        if(role){
          req = "/api/v1.0/role/user/"
        }else{
          req = "/api/v1.0/role/author/"
        }
        fetch(req, {
            method: 'POST',
            headers: {
            'Authorization': Cookie.getCookie("token"),
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:row.id})
          }).then(value =>{
            this.updateCnt()
          })  
      },
      setAdmin(index, row, role){
        if(role){
          req = "/api/v1.0/admin/downgrade/"
        }else{
          req = "/api/v1.0/admin/upgrade/"
        }
        fetch(req, {
            method: 'POST',
            headers: {
            'Authorization': Cookie.getCookie("token"),
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:row.id})
          }).then(value =>{
            this.updateCnt()        
        })
      }
    }
  }
</script>