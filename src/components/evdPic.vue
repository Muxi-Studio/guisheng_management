<template>
	<div class="wrap">
	<el-col :span="10">
		<el-col :span="16">
			<el-card :body-style="{ padding: '0px' }">
		      	<img :src="this.pic.img_url" class="image">
		      	<div style="padding: 14px;">
		        	<span>天气:{{this.pic.climate}}</span>
		        	<div class="bottom clearfix">
		          		<time class="time">{{ this.pic.date }}</time>
		        	</div>
		      </div>
		    </el-card>
	    </el-col>
	</el-col>
	<el-col :span="10">
		<el-form :model="create" :rules="rules" ref="create" label-width="100px" class="demo-ruleForm">
			<el-form-item label="图片链接" prop="img_url">
				<el-input v-model="create.img_url"></el-input>
			</el-form-item>
			<el-form-item label="天气">
			<el-radio-group v-model="create.climate">
			    <el-radio :label="1">晴</el-radio>
			    <el-radio :label="2">阴</el-radio>
			    <el-radio :label="3">雨</el-radio>
			</el-radio-group>
			</el-form-item>
			<el-form-item label="日期">
				<el-date-picker type="date" placeholder="选择日期" v-model="create.date" style="width: 100%;" format="M/dd"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary"  @click="handleSubmit">上传</el-button>
			</el-form-item>
		</el-form>
	</el-col>
	</div>
</template>
<script>
	var climatetype = ['晴','阴','雨']
	export default{
		data(){
			return{
				create:{
					img_url:'',
		  			climate:1,
		  			date:'',
				},
				pic:{},
				formatdate:''
  			}
		},
		created(){
			this.getpic()
		},
		methods:{
			handleSubmit(){
				this.create.date = `${this.create.date.getMonth() + 1}/${this.create.date.getDate()}`
		  		fetch(`/api/v1.0/everydaypic/`, {
	                method: 'POST',
	                headers: {
	                	'Authorization': 'Basic ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVEo5Lmp6bjJKMzc0WlByN1ZscDFkeFowUFZLcGQyVmpvUkowbHdadkVmdkljQ00=',
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                },
	                body: JSON.stringify(this.create)
	            }).then(value =>{
	            	console.log(value)
	            	this.getpic()
	            })
			},
			getpic(){
				fetch(`/api/v1.0/everydaypic/`,{
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
    				this.pic = value
    				this.pic.climate = climatetype[this.pic.climate - 1]
    			})
			}
		}
	}
</script>