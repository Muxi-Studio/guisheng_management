<template>
	<div class="app">
		<header class="header">
			<div class="content">
				<div class="logo"></div>
				<div class="info">欢迎，{{username}}</div>
			</div>
		</header>
		<div class="container">
			<div class="menu">
				<div class="side">
					<el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :router="true" default-active="1" :unique-opened="true">
						<el-submenu index="/news">
							<template slot="title">新闻</template>
							<el-menu-item index="/news/create">新建</el-menu-item>
							<el-menu-item index="/news/list">查看列表</el-menu-item>
						</el-submenu>
						<el-submenu index="/pics">
							<template slot="title">图片</template>
							<el-menu-item index="/pics/create">新建</el-menu-item>
							<el-menu-item index="/pics/list">查看列表</el-menu-item>
						</el-submenu>
						<el-submenu index="/articles">
							<template slot="title">水墨</template>
							<el-menu-item-group title="新建">
								<el-menu-item index="/article/pics">文章</el-menu-item>
								<el-menu-item index="/article/movies">电影</el-menu-item>
								<el-menu-item index="/article/music">音乐</el-menu-item>
							</el-menu-item-group>
							<el-menu-item-group title="列表">
								<el-menu-item index="/article/list/pics">文章列表</el-menu-item>
								<el-menu-item index="/article/list/movies">电影列表</el-menu-item>
								<el-menu-item index="/article/list/music">音乐列表</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="/interaction">
							<template slot="title">互动</template>
							<el-menu-item-group title="新建">
								<el-menu-item index="/interaction/tea">喝茶吧</el-menu-item>
								<el-menu-item index="/interaction/topic">话题</el-menu-item>
							</el-menu-item-group>
							<el-menu-item-group title="列表">
								<el-menu-item index="/interaction/list/tea">喝茶吧列表</el-menu-item>
								<el-menu-item index="/interaction/list/topic">话题列表</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="/special">
							<template slot="title">专题</template>
							<el-menu-item index="/special/create">新建</el-menu-item>
							<el-menu-item index="/special/list">查看列表</el-menu-item>
						</el-submenu>
						<el-menu-item index="/everydaypic">每日一图</el-menu-item>
						<el-menu-item index="/userlist">用户管理</el-menu-item>
						<el-menu-item index="/adminlist">权限管理</el-menu-item>
						<el-submenu index="/rank">
							<template slot="title">统计</template>
							<el-menu-item index="/rank/articles">内容排名</el-menu-item>
							<el-menu-item index="/rank/authors">作者排名</el-menu-item>
<!-- 							<el-menu-item index="/rank/authors">作者排名</el-menu-item> -->
						</el-submenu>
					</el-menu>
				</div>
			</div>
			<div class="right">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<style lang='sass'>
/*@import '../scss/color.scss';*/
.app{
	height:100%;
	overflow:hidden;
}
.header{
	position: fixed;
	top: 0;
	left: 0;
	z-index:40;
	height: 80px;
	width: 100%;
	border-bottom:2px solid #D3D3D3;
	.content{
		width:100%;
		height:100%;
		display:flex;
		justify-content:space-between;
		.logo{
			width:300px;
			height:100%;
			background-image:url('./image/logo.png');
			background-position:center;
			background-repeat:no-repeat;
		}
		.info{
			width:300px;
			height:100%;
			color: grey;
			line-height:80px;
			font-size:18px;
		}
	}
}
.fixed{
	position:fixed;
}
.container{
	position:absolute;
	top:80px;
	width:100%;
	height:calc(100% - 80px);
	overflow:hidden;
}
.menu{
	position:fixed;
	top:0px;
	bottom:0px;
	background-color: #eef1f6;
	width:260px;
	margin-top:80px;
	overflow-y: auto;
}
.right{
	padding-top:30px;
	margin-left: 320px;
	width:70%;
	box-sizing:border-box;
	height:100%;
	overflow-y:scroll;
}
</style>

<script>
import Cookie from './cookie.js'
import FETCH from './fetch.js'
export default {
	mounted() {
		var username = ""
		var email = Cookie.getCookie("email")
		email = decodeURIComponent(email)
		fetch("https://user.muxixyz.com/api/user/?email=" + email)
			.then(res => {
				return res.json()
			}).then(value => {
				username = value.username
				Cookie.setCookie("username", username)
				this.username = username
				fetch("/api/v1.0/admin/login/", {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: email,
						password: "muxistudio304"
					})
				}).then(res => {
					if (res.ok) {
						return res.json()
					} else {
						FETCH.FetchData("/api/v1.0/admin/register/", "POST", {
							email: email,
							password: "muxistudio304",
							username: username
						}).then(value => {
							FETCH.FetchData("/api/v1.0/admin/login/", "POST", {
								email: email,
								password: "muxistudio304",
							}).then(value => {
								Cookie.setCookie("token", value.token)
								Cookie.setCookie("uid", value.uid)
							})
						})
					}
				}).then(value => {
					Cookie.setCookie("token", value.token)
					Cookie.setCookie("uid", value.uid)
				})
			})
	},
	data() {
		return {
			username: ""
		}
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		push() {
			console.log("hah");
		},
	}
}
</script>
