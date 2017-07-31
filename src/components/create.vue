<template>
	<div class="wrap">
		<el-form :model="create" :rules="rules" ref="create" label-width="100px" class="demo-ruleForm">
			<el-form-item label="标题" prop="title">
				<el-input v-model="create.title"></el-input>
			</el-form-item>
			<el-form-item label="作者" prop="author">
				<el-input v-model="create.author"></el-input>
			</el-form-item>
			<el-form-item label="责任编辑人" prop="editor">
				<el-input v-model="create.editor"></el-input>
			</el-form-item>
			<el-form-item label="作品描述" prop="description" v-if="config.description">
				<el-input type="textarea" v-model="create.description"></el-input>
			</el-form-item>
			<el-form-item label="添加标签" prop="moretag">
				<el-input v-model="moretag"><el-button slot="append" type="primary" @click="addTag"><i class="el-icon-plus"></i></el-button></el-input>
			</el-form-item>
			<el-form-item label="封面图网址" prop="img_url">
				<el-input v-model="create.img_url"></el-input>
			</el-form-item>
			<el-form-item label="音乐URL" prop="music_url" v-if="config.music_img_url">
				<el-input v-model="create.music_url" v-if="config.music_url"></el-input>
			</el-form-item>
			<el-form-item label="音乐标题" prop="music_title" v-if="config.music_title">
				<el-input v-model="create.music_title"></el-input>
			</el-form-item>
			<el-form-item label="音乐图片" prop="music_img_url" v-if="config.music_img_url">
				<el-input v-model="create.music_img_url"></el-input>
			</el-form-item>
			<el-form-item label="歌手" prop="singer" v-if="config.singer">
				<el-input v-model="create.singer"></el-input>
			</el-form-item>
			<el-form-item label="电影url" prop="film_url" v-if="config.film_url">
				<el-input v-model="create.film_url"></el-input>
			</el-form-item>
			<el-form-item label="电影图片url" prop="film_img_url" v-if="config.film_img_url">
				<el-input v-model="create.film_img_url"></el-input>
			</el-form-item>
			<el-form-item>
				<el-tag
				  v-for="tag in create.tags"
				  :closable="true"
				  :close-transition="false"
				  @close="handleClose(tag)"
				>
				{{tag}}
				</el-tag>
			</el-form-item>
			<el-form-item>
				<el-button type="primary"  v-show="!modify" @click="handleSubmit">立即创建</el-button>
				<el-button type="primary"  v-show="modify" @click="handleSubmit">修改</el-button>
				<el-button @click="handleReset">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
var specialRoute = ""
import config from '../common/consts'
import 'whatwg-fetch'
	export default{
		data (){
			return {
				route:"",
				kind:'',
				id:0,
				modify: true,
				index:'',
				url:'',
				url_kind:'',
				config:{
				},
				moretag:'',
				create: {
					title: '',
					author:'',
					editor:'',
					description:'',
			        tags:[],
			        img_url:'',
			        music_title:'',
			        music_img_url:'',
			        music_url:'' ,  //返回一个音乐的URL
			        singer:'',
			        film_url:'',  //返回一个电影的URL
			        scores:'',
			        film_img_url:''
        		},
        		rules:{
        			title:[
        				{ required: true, message: '请输入作品标题', trigger: 'blur' }
        			],
        			author:[
        				{ required: true, message: '请输入作者名称', trigger: 'blur' }
        			],
        			editor:[
        				{ required: true, message: '请输入编辑者名称', trigger: 'blur' }
        			]
        		},
			}
		},
		created(){
			this.geturl()
		},
  		methods:{
  			geturl(){
  				this.url = this.$route.matched[0].path
  				if(this.url === '/special'){
  					console.log(this.$route.path)
				  	specialRoute =  /\/article/.test(this.$route.path)?'article':'picture'
				}
  				var reg
  				if(this.url === '/article'){
  					reg = new RegExp('\/article\/([a-z]+)\/')
  					this.url_kind = `${this.$route.matched[1].path}/`.match(reg)[0]
  				}else if(this.url === '/interaction'){
  					reg = new RegExp('\/interaction\/([a-z]+)\/')
  					this.url_kind = `${this.$route.matched[1].path}/`.match(reg)[0]
  				}else{
  					this.url_kind = this.url
  				}
  				this.modify = this.$route.params.aid ? true:false
  				// this.index = this.nameArr.indexOf(this.url_kind)
  				if(config.category.hasOwnProperty(this.url_kind)){
  					this.config = config.category[this.url_kind]
  				}
  				if(this.modify){
  				    this.id = this.$route.params.aid
  				    if(this.url === '/special'){
  				    	this.url = (specialRoute === 'article'?'/news':'/pics')
  				    }
		            fetch(`/api/v1.0${this.url}/${this.id}/`,{
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
				  		if(this.url === '/article'){
					  		result = this.create
				  			result.flag = config.list[this.url_kind]
				  			console.log(result.flag)
				  		}else{
					  		var result = new Object()
					  		result.title = this.create.title
					  		result.author = this.create.author
					  		result.editor = this.create.editor
					  		result.img_url = this.create.img_url
					  		result.tags = this.create.tags
					  		if(this.url === '/interaction'){
					  			result.flag = config.list[this.url_kind]
					  		}
					  		for(var key in this.config){
					  			if(this.config[key]===true){
					  				result[key] = this.create[key]
					  			}
					  		}
				  		}

				  		if(this.modify) {
				  			if(specialRoute === 'article'){
				  				this.route = `/api/v1.0/news/${this.$route.params.aid}`
				  			}else if(specialRoute === 'picture'){
				  				this.route = `/api/v1.0/pics/${this.$route.params.aid}`
				  			}else{
				  				this.route = `/api/v1.0${this.url}/${this.id}/`
				  			}
				  		}else{
					  		if(this.url === '/special'){
					  			this.route = `/api/v1.0/special/${this.$route.params.id}/${this.$route.params.cid}/${specialRoute}/`
					  		}else{
					  			this.route = `/api/v1.0${this.url}/`
					  		}
				  		}
				  		console.log(result)
				  		fetch(this.route, {
		                    method: this.modify?'PUT':'POST',
		                    headers: {
		                    	'Authorization': 'Basic ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZNVEo5Lmp6bjJKMzc0WlByN1ZscDFkeFowUFZLcGQyVmpvUkowbHdadkVmdkljQ00=',
		                        'Accept': 'application/json',
		                        'Content-Type': 'application/json'
		                    },
		                    body: JSON.stringify(result)
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
		        this.img_url = ''
		    },
		    handlePreview(file) {
		        console.log(file.response);
		    },
			addTag(){
				this.create.tags.push(this.moretag)
			}
  		}
	}
</script>