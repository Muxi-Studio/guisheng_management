<template>
<div>
  <el-row>
    <el-col :span="20">
    {{this.content.title}} - by {{ this.content.author}}
    </el-col>
    <el-col :span="4">
      <el-button type="text" class="button" size="large" @click="addPic">添加图片</el-button>
    </el-col>
  </el-row>
  <el-row v-show="upload">
    <el-form :model="create" :rules="rules" ref="create" label-width="100px">
      <el-form-item label="图片链接" prop="img_url">
        <el-input v-model="create.img_url"></el-input>
      </el-form-item>
      <el-form-item label="图片描述" prop="description">
        <el-input v-model="create.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">立即创建</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-row>
  <el-row>
    <el-col class="col-pics" :span="8" v-for="(o, index) in this.content.pics" :offset="3">
      <el-card :body-style="{ padding: '0px', height:'400px'}">
        <img :src="o" class="image">
        <div style="padding: 14px;">
          <span>{{ content.introduction[index] }}</span>
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="delPic(index)">删除</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<style>
  .col-pics{
    margin-bottom: 30px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 240px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

<script>
import { MessageBox } from 'element-ui';
export default {
  data() {
    return {
      currentDate: new Date(),
      id:'',
      content:{},
      upload:false,
      create: {
        img_url:'',
        description:''
      },
      rules:{
        img_url:[
          { required: true, message: '请输入图片链接', trigger: 'blur' }
        ],
        description:[
          { required: true, message: '请输入图片描述', trigger: 'blur' }
        ]
      },
    }
  },
  created(){
      this.id = this.$route.params.id
      this.updateCnt()
  },
  methods:{
    updateCnt(){
      fetch(`/api/v1.0/pics/${this.id}/`, {
          method: 'GET',
          headers: {
          'Authorization': 'Basic ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVEo5Lmp6bjJKMzc0WlByN1ZscDFkeFowUFZLcGQyVmpvUkowbHdadkVmdkljQ00=',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
      }).then((res) =>{
        return res.json()
      }).then(value =>{
        this.content = value
        console.log(this.content)
      }) 
    },
    addPic(){
      this.upload = !this.upload
    },
    delPic(e){
      fetch(`/api/v1.0/pics/${this.id}/pic/${e}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Basic ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVEo5Lmp6bjJKMzc0WlByN1ZscDFkeFowUFZLcGQyVmpvUkowbHdadkVmdkljQ00=',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(value =>{
        console.log(value)
        this.updateCnt()
      })
    },
    handleReset() {
      this.$refs.create.resetFields();
    },
    handleSubmit(ev) {
      this.$refs.create.validate((valid) => {
        if (valid) {
          var config = this.create
          config.title = this.content.title
          config.author = this.content.author
          config.tags = this.content.tags
          fetch('/api/v1.0/pics/', {
            method: 'POST',
            headers: {
              'Authorization': 'Basic ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVEo5Lmp6bjJKMzc0WlByN1ZscDFkeFowUFZLcGQyVmpvUkowbHdadkVmdkljQ00=',
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(config)
          }).then(value =>{
            console.log(value)
            this.updateCnt()
          })
        }
      })
    }
  }
}
</script>