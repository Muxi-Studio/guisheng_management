<template>
	<div class="wrap">
		<div v-if="category === '/news'">la</div>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
      prop="tag"
      label="标签"
      width="100"
      :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
      :filter-method="filterTag"
      inline-template>
      <el-tag :type="row.tag === '家' ? 'primary' : 'success'" close-transition>{{row.tag}}</el-tag>
    </el-table-column>
    <el-table-column
      inline-template
      :context="_self"
      label="操作"
      width="100">
      <span>
        <el-button @click="handleClick" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </span>
    </el-table-column>
  </el-table>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				category:"",
				tableData: [{
              title:'haha',
              count:'4',
              tag:['好玩','有意思'],
              saver:'amanda',
              update:'2016-07-11'
				    }, {
              title:'haha',
              count:'4',
              tag:['好玩','有意思'],
              saver:'amanda',
              update:'2016-07-11'
				    }, {
              title:'haha',
              count:'4',
              tag:['好玩','有意思'],
              saver:'amanda',
              update:'2016-07-11'
				    }, {
              title:'haha',
              count:'4',
              tag:['好玩','有意思'],
              saver:'amanda',
              update:'2016-07-11'
				}]
			}
		},
		created(){
			this.geturl()
		},
  		methods:{
			geturl(){
				this.category = this.$route.matched[0].path
  				console.log(this.category)
			},
			formatter(row, column) {
       		 	return row.address;
      		},
      		filterTag(value, row) {
        		return row.tag === value;
      		},
      		handleClick() {
        		console.log(1);
        	}
  		}
	}
</script>