<template>
	<div class="wrap">
		<el-form :model="create" :rules="rules" ref="create" label-width="100px" class="demo-ruleForm">
			<el-form-item label="标题" prop="title">
				<el-input v-model="create.title"></el-input>
			</el-form-item>
			<el-form-item label="作者" prop="author">
				<el-input v-model="create.author"></el-input>
			</el-form-item>
			<el-form-item label="作品描述" prop="description" v-if="config.description">
				<el-input type="textarea" v-model="create.description"></el-input>
			</el-form-item>
			<el-form-item label="添加标签" prop="moretag">
				<el-input v-model="create.moretag"><el-button slot="append" type="primary" @click="addTag"><i class="el-icon-plus"></i></el-button></el-input>
			<el-tag
			  v-for="tag in create.tags"
			  :closable="true"
			  :close-transition="false"
			  @close="handleClose(tag)"
			>
			{{tag}}
			</el-tag>
	        <el-upload
	                action="http://120.24.4.254:7777/guisheng/upload_pics/"
	                type="drag"
	                :multiple = "false"
	                :thumbnail-mode="true"
	                :on-success="handleSuccess"
	                :on-preview="handlePreview"
	                :on-remove="handleRemove"
	                :on-error="handleError"
	        >
	            <i class="el-icon-upload"></i>
	            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
	            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
	        </el-upload>
			<el-form-item>
				<el-button type="primary"  v-show="modify" @click="handleSubmit">立即创建</el-button>
				<el-button type="primary"  v-show="!modify" @click="handleSubmit">修改</el-button>
				<el-button @click="handleReset">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
import 'whatwg-fetch'
	export default{
		data (){
			return {
				kind:'',
				id:0,
				modify: true,
				index:'',
				url:'',
				config:{
				},
				create: {
					title: '',
					author:'',
					description:'',
					moretag:'',
			        tags:[],
			        img_url:''
        		},
        		rules:{
        			title:[
        				{ required: true, message: '请输入作品标题', trigger: 'blur' }
        			],
        			author:[
        				{ required: true, message: '请输入作者名称', trigger: 'blur' }
        			]
        		},
			}
		},
		props: {
	    	category: {
	          	type: Array
	      	},
	      	nameArr:{
	      		type: Array
	      	}
  		},
		created(){
			this.geturl()
		},
  		methods:{
  			geturl(){
  				this.url = this.$route.matched[0].path
  				this.modify = this.$route.params.aid ? true:false
  				this.index = this.nameArr.indexOf(this.url)
  				if(this.index != -1){
  					this.config = this.category[this.index]
  					console.log(this.config)
  				}
  				if(this.modify){
  				  this.id = this.$route.params.aid 
  				  console.log(this.kind)
		          fetch(`http://120.24.4.254:8888/api/v1.0${this.url}/${this.id}/`,{
		                method: 'GET',
		                headers: {
		                	'Accept': 'application/json',
                    		'Content-Type': 'application/json',
		                    'Authorization': 'Basic ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVEo5Lmp6bjJKMzc0WlByN1ZscDFkeFowUFZLcGQyVmpvUkowbHdadkVmdkljQ00='
	                	},
	            	})
		            .then( (res) => {
          				return res.json()
        			}).then( value => {
        				this.create = value
        			})
  				}
  			},
			handleClose(tag) {
				this.create.tags.splice(this.create.tags.indexOf(tag), 1);
			},
			handleReset() {
				this.$refs.create.resetFields();
			},
			handleSubmit(ev) {
				this.$refs.create.validate((valid) => {
				  	if (valid) {
				  		let config = new Object()
				  		config.title = this.create.title
				  		config.author_id = this.create.author
				  		config.img_url = this.create.img_url
				  		config.tags = this.create.tags
				  		for(var key in this.config){
				  			if(this.config[key]===true){
				  				config[key] = this.create[key]
				  			}
				  		}
				  		console.log(JSON.stringify(config))
				  		fetch("/api/v1.0/news/", {
		                    method: 'POST',
		                    headers: {
		                    	'Authorization': 'Basic ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVEo5Lmp6bjJKMzc0WlByN1ZscDFkeFowUFZLcGQyVmpvUkowbHdadkVmdkljQ00=',
		                        'Accept': 'application/json',
		                        'Content-Type': 'application/json'
		                    },
		                    body: JSON.stringify(config)
		                }).then(value =>{
		                	console.log(value)
		                })
		            }
				})     	
			},
			handleSuccess(response,file,fileList){
				this.create.img_url = response.pic_url
				console.log(response)
			},
			handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePreview(file) {
		        console.log(file.response);
		    },
			addTag(){
				console.log(this.create.moretag)
				this.create.tags.push(this.create.moretag)
			}
  		}
	}
</script>