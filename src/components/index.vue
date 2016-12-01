<template>
<div class="wrap">
	<router-view :category="category"></router-view>
</div>
</template>
<script>
import category from '../common/consts'
export default {
  data(){
    return {
      category:category.category,
      // name:category.name
    }
  }
}
</script>
