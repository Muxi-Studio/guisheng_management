<template>
<div class="wrap">
	<router-view></router-view>
</div>
</template>
<script>
  export default {
    methods: {
      handleClick(tab) {
      	this.$router.push(this.$route.matched[0].path + "/" + tab.name)
      	console.log(this.$route)
        console.log(tab.name);
      }
    }
  };
</script>
