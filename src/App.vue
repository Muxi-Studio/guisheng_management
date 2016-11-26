<template>
	<div class="app">
		<header class="header">header</header>
		<div class="container">
			<el-row>
  				<el-col :span="5">
  					<div class="sidebar">jjj</div>
  				</el-col>
  				<el-col :span="19">
  					<div class="main">
						<router-view></router-view>
					</div>
  				</el-col>
			</el-row>
		</div>
	</div>
</template>
<style></style>