<template>
<div>
  <el-table
    :data="table"
    border
    style="width: 100%">
    <el-table-column
      v-if="specialist"
      prop="special_name"
      label="专题名称"
      min-width="80">
    </el-table-column>
    <el-table-column
      v-if="!specialist"
      prop="childtopic_name"
      min-width="200"
      label="话题名称">
    </el-table-column>
    <el-table-column
      prop="id"
      label="id"
      width="120">
    </el-table-column>
    <el-table-column
      width="240"
      :context="_self"
      inline-template
      label="操作">
      <div v-if="specialist">
        <el-button
          size="small"
          type="text">
          添加话题
          <template scope="scope">
            <el-popover trigger="click" placement="top">
              <el-input placeholder="请输入内容" v-model="row.input">
                <el-button slot="append" icon="plus" @click="addChild($index,row)"></el-button>
              </el-input>
              <div slot="reference" class="name-wrapper">
                添加话题
              </div>
            </el-popover>
          </template>
        </el-button>
        <el-button
          type="text"
          size="small"
          @click="handleChild($index, row)">
          管理话题
        </el-button>
      </div>
      <div v-else>
        <el-button
          type="text"
          size="small"
          @click="checklist($index, row)">
          查看列表
        </el-button>      
        <el-button
          type="text"
          size="small"
          @click="addArticle($index, row)">
          添加文章
        </el-button> 
        <el-button
          type="text"
          size="small"
          @click="addPics($index, row)">
          添加图集
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
var route = ""
import Cookie from '../cookie.js'
  export default {
    data() {
      return {
        specialist:true,
        table:[],
        count:0,
        input:""
      }
    },
    created(){
      if(this.$route.params.id){
        this.specialist = false
        route = `/api/v1.0/special/list/${this.$route.params.id}/`
      }else{
        this.specialist = true
        route = "/api/v1.0/special/list/"
      }
      this.updateCnt()
      console.log(route)
    },
    methods: {
      updateCnt(){
        fetch(`${route}?page=1`,{
            headers: {
              'Authorization': Cookie.getCookie("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then( (res) => {
          return res.json()
        }).then( value => {
          if(value.length >0){
            this.table = value
            this.count = value[0].count
          }
        })
      },
      handleCurrentChange(val) {
          this.currentPage = val;
          fetch(`${route}?page=${val}`,{
            headers: {
              'Authorization': Cookie.getCookie("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          })
          .then((res) =>{
            return res.json()
          }).then(value =>{
            this.table = value
          })
      },
      addChild(index,row){
        fetch(`/api/v1.0/special/${row.id}/`, {
            method: 'POST',
            headers: {
              'Authorization': Cookie.getCookie("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({childtopic_name:row.input})
        }).then(value =>{
          this.updateCnt()
          row.input = ""
        }) 
      },
      handleChild(index,row){
        this.$router.push({name:`/Special`,params: { id:row.id }})
      },
      checklist(index, row){
        this.$router.push({name:"childContent", params:{id:this.$route.params.id,cid:row.id}})
      },
      addArticle(index, row){
        this.$router.push({name:"childAddArticle", params:{id:this.$route.params.id,cid:row.id}})
      },
      addPics(index, row){
        this.$router.push({name:"childAddPics", params:{id:this.$route.params.id,cid:row.id}})
      }
    },
  }
</script>