<template>
	<div class="wrap">
		<div v-if="category === '/news'">news</div>
		<el-form :model="create" :rules="rules" ref="create" label-width="100px" class="demo-ruleForm">
			<el-form-item label="标题" prop="title">
				<el-input v-model="create.title"></el-input>
			</el-form-item>
			<el-form-item label="作者" prop="author">
				<el-input v-model="create.author"></el-input>
			</el-form-item>
			<el-form-item label="活动形式" prop="textarea">
				<el-input type="textarea" v-model="create.textarea"></el-input>
			</el-form-item>
			<el-form-item label="添加标签" prop="moretag">
				<el-input v-model="create.moretag"><el-button slot="append" type="primary" @click="addTag"><i class="el-icon-plus"></i></el-button></el-input>
			<el-tag
			  v-for="tag in create.tags"
			  :closable="true"
			  :type="tag.type"
			  :close-transition="false"
			  @close="handleClose(tag)"
			>
			{{tag.name}}
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
			<el-form-item>
				<el-button type="primary" @click="handleSubmit">立即创建</el-button>
				<el-button @click="handleReset">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default{
		data (){
			return {
				category:"",
				create: {
					title: '',
					author: '',
					textarea:'',
					moretag:'',
			        tags: [
						{name: '标签一', type: '' },
						{name: '标签二', type: 'gray' },
						{name: '标签三', type: 'primary' },
						{name: '标签四', type: 'success' },
						{name: '标签五', type: 'warning' },
						{name: '标签六', type: 'danger' }
			        ]
        		},
        		rules:{
        			title:[
        				{ required: true, message: '请输入作品标题', trigger: 'blur' }
        			],
        			author:[
        				{ required: true, message: '请输入作者名称', trigger: 'blur' }
        			],
        			textarea:[
        				{ required: true, message: '请输入作品描述', trigger: 'blur' }
        			]
        		},
			}
		},
		created(){
			this.geturl()
		},
  		methods:{
  			geturl(){
  				this.category = this.$route.matched[0].path
  				console.log(this.category)
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
				this.create.tags.push({name:this.create.moretag,type:''})
			}
  		}
	}
</script>