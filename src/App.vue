<template>
	<div class="app">
		<header class="header">
			<div class="content">
				<a class="title">华大桂声管理后台</a>
<!-- 				<a href="https://user.muxixyz.com/?landing=120.24.4.254:8777/admin" class="login">登录</a> -->
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
							<el-menu-item index="/user">用户管理</el-menu-item>
							<el-submenu index="/rank">
					    		<template slot="title">统计</template>
								<el-menu-item index="/rank/articles">内容排名</el-menu-item>
					    		<el-menu-item index="/rank/authors">作者排名</el-menu-item>
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
	height: 100%;
}
.header{
	position: fixed;
	top: 0;
	left: 0;
	z-index:40;
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
	margin-top:120px;
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
	margin-top:40px;
	margin-left: 320px;
	margin-bottom:40px;
	width:70%;
}
</style>

<script>
import Cookie from './cookie.js'
import FETCH from './fetch.js'
var profile = {}
export default {
  	mounted(){
  		if(Cookie.getCookie("token")==='' && window.location.search===''){
  			window.location.href = "https://user.muxixyz.com/?landing=119.23.35.1/admin"
  		}else if(window.location.search!==''){
		    var email = window.location.href.split('?')[1].split('=')[1]
		    fetch("https://user.muxixyz.com/api/user/?email=" + email).then(res => {
            	return res.json()
        	}).then(value => {
            	console.log("value = ",value)
            	profile = value
        	})
	        fetch("/api/v1.0/admin/login/",{
	            method: 'POST',
	            headers: {
	                'Accept': 'application/json',
	                'Content-Type': 'application/json'
	            },
	            body: JSON.stringify({
	                username: email,
	                password:"muxistudio304"
	            })
	        }).then(res => {
	            if(res.ok){
	                return res.json()
	            }else{
	                FETCH.FetchData("/api/v1.0/admin/register/","POST",{
	                    email: email,
	                    password:"muxistudio304",
	                    username: profile.username
	                }).then(value => {
	                    FETCH.FetchData("/api/v1.0/admin/login/","POST",{
	                        email: email,
	                        password:"muxistudio304",
	                    })		            
	                })
	            }
	        }).then( value => {
	            Cookie.setCookie("token", value.token)
	            Cookie.setCookie("uid", value.uid)
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
