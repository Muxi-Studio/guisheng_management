<template>
	<div class="wrap">
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
          @click="handleEditBody($index, row)">
          编辑正文
        </el-button>
        <el-button
          size="small"
          type="text">
          操作
          <template scope="scope">
            <el-popover trigger="hover" placement="top">
                <el-button type="primary" size="small" v-if="row.published" @click="handleUnPublish($index,row)">取消发布</el-button>
                <el-button type="primary" size="small" v-if="!row.published" @click="handlePublish($index,row)">发布</el-button>
                 <el-button type="primary" size="small" @click="handleComment($index, row)">查看评论</el-button>
                <span v-if="subroute=='/interaction/list/tea'">
                  <el-button type="primary" size="small" v-if="row.published &&!row.tea" @click="handlePop($index,row)">置顶</el-button>
                </span>
                <el-button type="danger" size="small" @click="handleDelete($index, row)">删除</el-button>

              <div slot="reference" class="name-wrapper">
                操作
              </div>
            </el-popover>
          </template>
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
var route = ''
var sub = ''
import config from "../common/consts.js"
	export default{
		data(){
			return {
        tableData:[],
        currentPage:"",
        path: 0,
        count: 0,
        url:'',
        subroute:''
			}
		},
		created(){
      this.url = this.$route.matched[0].path
      this.path = config.list[this.$route.matched[0].path]
      this.subroute = this.$route.matched[1].path
      console.log(this.subroute)
      sub = config.list[this.subroute]
      if(this.path == 3||this.path == 4){
        route = `${this.path}&flag=${sub}`
      }else{
        route = this.path
      }
      this.updateCnt()
		},
  	methods:{
      updateCnt(){
        fetch("/api/v1.0/list/?page=1&count=10&kind=" + route,{
          headers: {
            'Authorization': 'Basic ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVEo5Lmp6bjJKMzc0WlByN1ZscDFkeFowUFZLcGQyVmpvUkowbHdadkVmdkljQ00=',
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
      })
      .then( (res) => {
        return res.json()
      }).then( value => {
        this.tableData = value
        console.log(this.tableData)
        if(value[0]){
          this.count = value[0].count
        }
        if(route === "4&flag=1"){
          fetch("/api/v1.0/tea/", {
              method: 'Get',
              headers: {
                'Authorization': 'Basic ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVEo5Lmp6bjJKMzc0WlByN1ZscDFkeFowUFZLcGQyVmpvUkowbHdadkVmdkljQ00=',
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
          }).then( (res) => {
            return res.json()
          }).then( value => {
            this.tableData.unshift(value)
            console.log(this.tableData)
          })
        }
        })
      },
      handleComment(index, row){
        this.$router.push({name:`${this.url}/comment`,params: { id:row.article_id }})
      },
      handleEdit(index, row) {
        if(sub){
          this.$router.push({name:`${this.url}/${sub}`,params: { aid:row.article_id }})
        }else{
          this.$router.push({name:this.url,params: { aid:row.article_id }})
        }
      },
      handlePop(index,row){
        fetch("/api/v1.0/tea/", {
            method: 'POST',
            headers: {
              'Authorization': 'Basic ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVEo5Lmp6bjJKMzc0WlByN1ZscDFkeFowUFZLcGQyVmpvUkowbHdadkVmdkljQ00=',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({article_id:row.article_id})
        }).then(value =>{
          console.log(value)
        })
      },
      handleUnPublish(index,row){
        fetch("/api/v1.0/unpublish/", {
            method: 'POST',
            headers: {
              'Authorization': 'Basic ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVEo5Lmp6bjJKMzc0WlByN1ZscDFkeFowUFZLcGQyVmpvUkowbHdadkVmdkljQ00=',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({kind:row.kind,post_id:row.article_id})
        }).then(value =>{
          this.updateCnt()
        })        
      },
      handlePublish(index,row){
        fetch("/api/v1.0/publish/", {
            method: 'POST',
            headers: {
              'Authorization': 'Basic ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVEo5Lmp6bjJKMzc0WlByN1ZscDFkeFowUFZLcGQyVmpvUkowbHdadkVmdkljQ00=',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({kind:row.kind,post_id:row.article_id})
        }).then(value =>{
          this.updateCnt()
        })  
      },
      handleEditBody(index, row){
        if(this.url === '/pics'){
          this.$router.push({name:'/pics/editor/',params:{id:row.article_id}})
        }else{
          window.location = `/editor${this.url}/${row.article_id}`
        }
      },
      handleDelete(index, row) {
        fetch(`/api/v1.0${this.url}/${row.article_id}/`, {
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
        return row.published === value;
      },
      handleCurrentChange(val) {
          this.currentPage = val;
          fetch(`/api/v1.0/list/?page=${val}&count=10&kind=${route}`,{
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