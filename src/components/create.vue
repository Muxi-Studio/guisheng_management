<template>
	<div class="wrap">
		<div>ha</div>
	</div>
</template>
<script>
	export default{
		created(){
			this.geturl()
		},
  		methods:{
  			geturl(){
  				console.log(this.$route.path)
  			}
  		}
	}
</script>