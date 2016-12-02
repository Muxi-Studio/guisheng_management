<template>
	<div class="app">
		<header class="header"></header>
		<div class="container">
			<el-row> 
				<el-col :span="6">
					<div class="side">
						<el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :router="true" default-active="1">
					 		<el-submenu index="/news">
					    		<template slot="title">新闻</template>
								<el-menu-item index="/news/create">新建</el-menu-item>
					    		<el-menu-item-group title="列表">
					    			<el-menu-item index="/news/list">所有</el-menu-item>
					    			<el-menu-item index="/news/posted">已发布</el-menu-item>
					      			<el-menu-item index="/news/unposted">未发布</el-menu-item>
					    		</el-menu-item-group>
					  		</el-submenu>
					  		<el-submenu index="/pics">
					    		<template slot="title">图片</template>
								<el-menu-item index="/pics/create">新建</el-menu-item>
					    		<el-menu-item-group title="列表">
					    			<el-menu-item index="/pics/list">所有</el-menu-item>
					    			<el-menu-item index="/pics/posted">已发布</el-menu-item>
					      			<el-menu-item index="/pics/unposted">未发布</el-menu-item>
					    		</el-menu-item-group>
					  		</el-submenu>
					  		<el-submenu index="/articles">
					    		<template slot="title">水墨</template>
					    		<el-menu-item-group title="新建">
					    			<el-menu-item index="/articles/pics">图片</el-menu-item>
					    			<el-menu-item index="/articles/movies">电影</el-menu-item>
					      			<el-menu-item index="/articles/music">音乐</el-menu-item>
					    		</el-menu-item-group>
					    		<el-menu-item-group title="列表">
					    			<el-menu-item index="/articles/list">所有</el-menu-item>
					    			<el-menu-item index="/articles/posted">已发布</el-menu-item>
					      			<el-menu-item index="/articles/unposted">未发布</el-menu-item>
					    		</el-menu-item-group>
					  		</el-submenu>
					  		<el-submenu index="/interaction">
					    		<template slot="title">互动</template>
					    		<el-menu-item-group title="新建">
					    			<el-menu-item index="/interaction/tea">喝茶吧</el-menu-item>
					    			<el-menu-item index="/interaction/topic">话题</el-menu-item>
					    		</el-menu-item-group>
					    		<el-menu-item-group title="列表">
					    			<el-menu-item index="/interaction/list">所有</el-menu-item>
					    			<el-menu-item index="/interaction/posted">已发布</el-menu-item>
					      			<el-menu-item index="/interaction/unposted">未发布</el-menu-item>
					    		</el-menu-item-group>
					  		</el-submenu>
						</el-menu>
					</div>
				</el-col>
  				<el-col :span="16">
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
}
.container{
	min-height: 100%;
	padding-top: 80px;
	box-sizing: border-box;
}
.side{
	padding-right: 40px;
}
</style>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      push(){
      	console.log("hah");
      }
    }
  }
</script>
