<template>
	<div>
	   <el-select v-model="value" placeholder="月份">
            <el-option
              v-for="item in options"
              :label="item.label"
              :key="item.value"
              :value="item.value">
            </el-option>
        </el-select>
		<monthlyauthor :month="value"></monthlyauthor>
	</div>
</template>
<script>
import rankMonthlyAuthor from './rankauthor.vue'
export default {
    data() {
        return {
            options: [
            {
                value: null,
                label:'全部'
            },{
              value: 1,
              label: '1月'
            }, {
              value: 2,
              label: '2月'
            }, {
              value: 3,
              label: '3月'
            }, {
              value: 4,
              label: '4月'
            }, {
              value: 5,
              label: '5月'
            }, {
              value: 6,
              label: '6月'
            }, {
              value: 7,
              label: '7月'
            }, {
              value: 8,
              label: '8月'
            }, {
              value: 9,
              label: '9月'
            }, {
              value: 10,
              label: '10月'
            }, {
              value: 11,
              label: '11月'
            }, {
              value: 12,
              label: '12月'
            }],
            value: null
        }
    },
    components:{
    	'monthlyauthor':rankMonthlyAuthor
    }
}
</script>