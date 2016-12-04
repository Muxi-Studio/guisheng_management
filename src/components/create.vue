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
			<el-form-item label="ID编辑框" prop="url" v-if="config.url">
				<el-input v-model="create.url"></el-input>
			</el-form-item>
			<el-form-item label="添加标签" prop="moretag" v-if="config.tag">
				<el-input v-model="create.moretag"><el-button slot="append" type="primary" @click="addTag"><i class="el-icon-plus"></i></el-button></el-input>
			<el-tag
			  v-for="tag in create.tags"
			  :closable="true"
			  :close-transition="false"
			  @close="handleClose(tag)"
			  v-if="config.tag"
			>
			{{tag}}
			</el-tag>
			<el-upload
			  action="//jsonplaceholder.typicode.com/posts/"
			  type="drag"
			  :thumbnail-mode="true"
			  :on-preview="handlePreview"
			  :on-remove="handleRemove"
			>
			  <i class="el-icon-upload"></i>
			  <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
			  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
			<el-form-item v-if="modify">
				<el-button type="primary" @click="handleSubmit">立即创建</el-button>
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
				modify:false,
				index:'',
				url:'',
				config:{
					name:'',
					tag:true,
			        url:false,
			        textarea:false
				},
				create: {
					title: '',
					author: '',
					description:'',
					moretag:'',
					url:'',
			        tags:['标签一','标签二','标签三','标签四','标签五','标签六']
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
  				this.url = this.$route.path
  				console.log(this.$route)
  				this.modify = this.$route.matched[1].path === 'edit' ? true:false
  				this.index = this.nameArr.indexOf(this.url)
  				if(this.index != -1){
  					this.config = this.category[this.index]
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
				    	alert('submit!');
				  	} else {
				    	console.log('error submit!!');
				    	return false;
				  	}
				});
			},
			handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePreview(file) {
		        console.log(file);
		    },
			addTag(){
				console.log(this.create.moretag)
				this.create.tags.push({name:this.create.moretag})
			}
  		}
	}
</script>