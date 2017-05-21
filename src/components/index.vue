<template>
<div class="wrap">
	<router-view :category="category" :nameArr="name" :list="list"></router-view>
</div>
</template>
<script>
import category from '../common/consts'
export default {
  data(){
    return {
      category:category.category,
      list:category.list,
      name:category.name
    }
  }
}
</script>
