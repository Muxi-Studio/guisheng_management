<template>
	<div class="app">
		<header class="header">
			<div class="content">
				<a class="title">华大桂声管理后台</a>
				<a href="https://user.muxixyz.com/?landing=localhost:3000/admin" class="login">登录</a>
			</div>
		</header>
		<div class="container">
			<el-row> 
				<el-col :span="6">
					<div class="side">
						<el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :router="true" default-active="1" :unique-opened="true">
					 		<el-submenu index="/news">
					    		<template slot="title">新闻</template>
								<el-menu-item index="/news/create">新建</el-menu-item>
					    		<el-menu-item-group title="列表">
					    			<el-menu-item index="/news/list">查看列表</el-menu-item>
					    		</el-menu-item-group>
					  		</el-submenu>
					  		<el-submenu index="/pics">
					    		<template slot="title">图片</template>
								<el-menu-item index="/pics/create">新建</el-menu-item>
					    		<el-menu-item-group title="列表">
					    			<el-menu-item index="/pics/list">查看列表</el-menu-item>
					    		</el-menu-item-group>
					  		</el-submenu>
					  		<el-submenu index="/articles">
					    		<template slot="title">水墨</template>
					    		<el-menu-item-group title="新建">
					    			<el-menu-item index="/article/pics">图片</el-menu-item>
					    			<el-menu-item index="/article/movies">电影</el-menu-item>
					      			<el-menu-item index="/article/music">音乐</el-menu-item>
					    		</el-menu-item-group>
					    		<el-menu-item-group title="列表">
					    			<el-menu-item index="/article/list/pics">图片列表</el-menu-item>
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
							<el-menu-item index="/everydaypic">每日一图</el-menu-item>
							<el-menu-item index="/user">用户管理</el-menu-item>
						</el-menu>
					</div>
				</el-col>
  				<el-col :span="17">
  					<div class="main">
						<router-view></router-view>
					</div>
  				</el-col>
			</el-row>
		</div>
	</div>
</template>
<style lang='sass'>
/*@import '../scss/color.scss';*/
.app{
	height: 100%;
}
.header{
	position: absolute;
	top: 0;
	left: 0;
	height: 80px;
	width: 100%;
	background-color: rgb(32, 160, 255);
	.content{
		margin:0px 50px;
		a{
			line-height:80px;
			color:white;
		}
		.title{
			font-size:30px;
		}
		.login{
			font-size: 16px;
			float:right;
			text-decoration: none;
		}
	}
}
.fixed{
	position:fixed;
}
.container{
	min-height: 100%;
	margin-bottom:80px;
	padding-top: 120px;
	box-sizing: border-box;
}
.side{
	padding-right: 40px;
}
</style>

<script>
  export default {
  	created(){
  		if(!window.location.search){
	        this.$notify({
	          	title: '请先登录',
	          	message: '点击登录按钮前往木犀通行证页面',
	          	type: 'warning',
	          	offset: 50
	        })
  		}
  	},
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      push(){
      	console.log("hah");
      },
    }
  }
</script>
