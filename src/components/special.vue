<template>
	<div class="wrap">
		<el-form :model="create" :rules="rules" ref="create" label-width="100px" class="demo-ruleForm">
			<el-form-item label="专题名字" prop="special_name">
				<el-input v-model="create.special_name"></el-input>
			</el-form-item>
<!-- 			<el-form-item label="专题描述" prop="description">
				<el-input type="textarea" v-model="create.description"></el-input>
			</el-form-item> -->
			<el-form-item>
				<el-button type="primary"  @click="handleSubmit">立即创建</el-button>
				<el-button @click="handleReset">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
import config from '../common/consts'
import Cookie from '../cookie.js'
import 'whatwg-fetch'
	export default{
		data (){
			return {
				create: {
					special_name:"",
					// description:""
        		},
        		rules:{
        			special_name:[
        				{ required: true, message: '请输入专题名字', trigger: 'blur' }
        			],
        			description:[
        				{ required: true, message: '请输入专题描述', trigger: 'blur' }
        			]
        		},
			}
		},
  		methods:{
			handleReset() {
				this.$refs.create.resetFields();
			},
			handleSubmit(ev) {
				console.log(this.create)
				this.$refs.create.validate((valid) => {
			  		fetch('/api/v1.0/special/', {
	                    method: 'POST',
	                    headers: {
	                    	'Authorization': Cookie.getCookie("token"),
	                        'Accept': 'application/json',
	                        'Content-Type': 'application/json'
	                    },
	                    body: JSON.stringify(this.create)
	                }).then(value =>{
	                	console.log(value)
	                })
	            })
			},
  		}
	}
</script>