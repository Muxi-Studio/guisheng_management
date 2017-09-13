<template>
	<div class="wrap">
		<!-- <input type="file" id="file" name="file"  v-on:change="getName" v-bind:value="this.inputValue" accept="image/*"> -->

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
				<el-input v-model="moretag">
					<el-button slot="append" type="primary" @click="addTag">
						<i class="el-icon-plus"></i>
					</el-button>
				</el-input>
			</el-form-item>
			<el-form-item label="封面图网址" prop="img_url">
				<!-- <el-input v-model="create.img_url"></el-input> -->
				<el-upload class="upload-demo" drag :before-upload="beforeAvatarUpload">
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">将文件拖到此处，或
						<em>点击上传</em>
					</div>
					<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过200kb</div>
				</el-upload>
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
			<el-form-item label="电影豆瓣评分" prop="scores" v-if="config.scores">
				<el-input v-model="create.scores"></el-input>
			</el-form-item>
			<el-form-item>
				<el-tag v-for="tag in create.tags" :closable="true" :close-transition="false" @close="handleClose(tag)">
					{{tag}}
				</el-tag>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" v-show="!modify" @click="handleSubmit">立即创建</el-button>
				<el-button type="primary" v-show="modify" @click="handleSubmit">修改</el-button>
				<el-button @click="handleReset">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
var specialRoute = ""
import config from '../common/consts'
import Cookie from '../cookie.js'
import 'whatwg-fetch'
export default {
	data() {
		return {
			route: "",
			kind: '',
			id: 0,
			modify: true,
			index: '',
			url: '',
			url_kind: '',
			config: {
			},
			moretag: '',
			create: {
				title: '',
				author: '',
				editor: '',
				description: '',
				tags: [],
				img_url: '',
				music_title: '',
				music_img_url: '',
				music_url: '',  //返回一个音乐的URL
				singer: '',
				film_url: '',  //返回一个电影的URL
				scores: '',
				film_img_url: ''
			},
			rules: {
				title: [
					{ required: true, message: '请输入作品标题', trigger: 'blur' }
				],
				author: [
					{ required: true, message: '请输入作者名称', trigger: 'blur' }
				],
				editor: [
					{ required: true, message: '请输入编辑者名称', trigger: 'blur' }
				]
			},
		}
	},
	created() {
		this.geturl()
	},
	methods: {
		geturl() {
			this.url = this.$route.matched[0].path
			if (this.url === '/special') {
				console.log(this.$route.path)
				specialRoute = /\/article/.test(this.$route.path) ? 'article' : 'picture'
			}
			var reg
			if (this.url === '/article') {
				reg = new RegExp('\/article\/([a-z]+)\/')
				this.url_kind = `${this.$route.matched[1].path}/`.match(reg)[0]
			} else if (this.url === '/interaction') {
				reg = new RegExp('\/interaction\/([a-z]+)\/')
				this.url_kind = `${this.$route.matched[1].path}/`.match(reg)[0]
			} else {
				this.url_kind = this.url
			}
			this.modify = this.$route.params.aid ? true : false
			// this.index = this.nameArr.indexOf(this.url_kind)
			if (config.category.hasOwnProperty(this.url_kind)) {
				this.config = config.category[this.url_kind]
			}
			if (this.modify) {
				this.id = this.$route.params.aid
				if (this.url === '/special') {
					this.url = (specialRoute === 'article' ? '/news' : '/pics')
				}
				fetch(`/api/v1.0${this.url}/${this.id}/`, {
					method: 'GET',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization': Cookie.getCookie("token")
					},
				})
					.then((res) => {
						return res.json()
					}).then(value => {
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
		getName(e) {
			this.changedImg = URL.createObjectURL(e.target.files[0])
			console.log(e.target.files[0])
			this.avatarData = new FormData()
			this.avatarData.append('file', e.target.files[0])
			console.log(this.avatarData)
			// fetch('/api/v1.0/guisheng/upload_pics/', {
			//     method: 'POST',
			//     body: this.avatarData
			// }).then(res => {
			//     return res.json()
			// }).then(value => {
			//     console.log(value)
			// })
			// this.editChange = true
		},
		handleSubmit(ev) {
			this.$refs.create.validate((valid) => {
				if (valid) {
					if (this.url === '/article') {
						result = this.create
						result.flag = config.list[this.url_kind]
						result.saver = Cookie.getCookie("uid")
					} else {
						var result = new Object()
						result.title = this.create.title
						result.author = this.create.author
						result.editor = this.create.editor
						result.img_url = this.create.img_url
						result.tags = this.create.tags
						result.saver = Cookie.getCookie("uid")
						if (this.url === '/interaction') {
							result.flag = config.list[this.url_kind]
						}
						for (var key in this.config) {
							if (this.config[key] === true) {
								result[key] = this.create[key]
							}
						}
					}

					if (this.modify) {
						if (specialRoute === 'article') {
							this.route = `/api/v1.0/news/${this.$route.params.aid}/`
						} else if (specialRoute === 'picture') {
							this.route = `/api/v1.0/pics/${this.$route.params.aid}/`
						} else {
							this.route = `/api/v1.0${this.url}/${this.id}/`
						}
					} else {
						if (this.url === '/special') {
							this.route = `/api/v1.0/special/${this.$route.params.id}/${this.$route.params.cid}/${specialRoute}/`
						} else {
							this.route = `/api/v1.0${this.url}/`
						}
					}
					fetch(this.route, {
						method: this.modify ? 'PUT' : 'POST',
						headers: {
							'Authorization': Cookie.getCookie("token"),
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(result)
					}).then(value => {
						this.$notify({
							title: '成功',
							message: this.modify ? '修改成功' : '创建成功',
							type: 'success'
						});
					})
				}
			})
		},
		beforeAvatar(elefile) {
			var selft = this
			var reader = new FileReader(), img = new Image();
			reader.readAsDataURL(elefile);
			reader.onload = function(e) {
				img.src = e.target.result;
			};
			var canvas = document.createElement('canvas');
			var context = canvas.getContext('2d');
			img.onload = function() {
				// 图片原始尺寸
				var originWidth = this.width;
				var originHeight = this.height;
				// 最大尺寸限制
				var maxWidth = 400, maxHeight = 400;
				// 目标尺寸
				var targetWidth = originWidth, targetHeight = originHeight;
				// 图片尺寸超过400x400的限制
				if (originWidth > maxWidth || originHeight > maxHeight) {
					if (originWidth / originHeight > maxWidth / maxHeight) {
						// 更宽，按照宽度限定尺寸
						targetWidth = maxWidth;
						targetHeight = Math.round(maxWidth * (originHeight / originWidth));
					} else {
						targetHeight = maxHeight;
						targetWidth = Math.round(maxHeight * (originWidth / originHeight));
					}
				}

				// canvas对图片进行缩放
				canvas.width = targetWidth;
				canvas.height = targetHeight;
				// 清除画布
				context.clearRect(0, 0, targetWidth, targetHeight);
				// 图片压缩
				context.drawImage(img, 0, 0, targetWidth, targetHeight)

				// canvas转为blob并上传
				var dataUrl = canvas.toDataURL('image/jpeg');

				var binary = atob(dataUrl.split(',')[1]);
				var array = [];
				for (var i = 0; i < binary.length; i++) {
					array.push(binary.charCodeAt(i));
				}
				var blobData = new Blob([new Uint8Array(array)], { type: 'image/jpeg' })

				fetch('/upload', {
					method: 'POST',
					body: blobData
				}).then(res => {
					return res.json()
				}).then(value => {
					console.log(value)
				})

				//   canvas.toBlob(function (blob) {
				// fetch('/api/v1.0/guisheng/upload_pics/', {
				//              method: 'POST',
				//              body: blob
				//          }).then(res => {
				//              return res.json()
				//          }).then(value => {
				//             	console.log(value)
				//          })  
				//   }, elefile.type || 'image/png');

				// canvas.toBlob(function (blob) {
				//     var xhr = new XMLHttpRequest();
				//     xhr.onreadystatechange = function() {
				//         if (xhr.status == 200) {
				//         	console.log(xhr.responseText)
				//         }
				//     };
				//     xhr.open("POST", '/api/v1.0/guisheng/upload_pics/', true);
				//     xhr.send(blob);    
				// }, elefile.type || 'image/png'); 

			};
			return false;
		},
		beforeAvatarUpload(elefile) {
			console.log(elefile)
			// this.changedImg = URL.createObjectURL(e.target.files[0])
			// this.avatarData = new FormData()
			// this.avatarData.append('file', e.target.files[0])
			// fetch('/upload', {
			//     method: 'POST',
			//     body: elefile
			// }).then(res => {
			//     return res.json()
			// }).then(value => {
			//     console.log(value)
			// })			
		},
		handleSuccess(response, file, fileList) {
			this.create.img_url = response.pic_url
			console.log(response)
		},
		handleRemove(file, fileList) {
			this.create.img_url = ''
		},
		handlePreview(file) {
			console.log(file.response);
		},
		addTag() {
			this.create.tags.push(this.moretag)
		}
	}
}
</script>