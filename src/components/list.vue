<template>
	<div class="wrap">
		<div v-if="category === '/news'">la</div>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="title"
      label="标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="author"
      label="作者"
      width="180">
    </el-table-column>
    <el-table-column
      prop="description"
      label="描述"
      width="180">
    </el-table-column>
    <el-table-column
      prop="description"
      label="描述"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
      :context="_self"
      inline-template
      label="操作">
      <div>
        <el-button
          size="small"
          @click="handleEdit($index, row)">
          编辑信息
        </el-button>
        <el-button
          size="small"
          @click="handleEdit($index, row)">
          编辑正文
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete($index, row)">
          删除
        </el-button>
      </div>
    </el-table-column>

	</div>
</template>
<script>
	export default{
		data(){
			return {
				category:"",
        tableData: [{
            title: 'HAHA',
            author: 'AMANDA',
            description:'lajgle',
            id:'012345',
            tags: [
              {name: '标签一'},
              {name: '标签二'},
              {name: '标签三'},
              {name: '标签四'},
              {name: '标签五'},
              {name: '标签六'}
            ]
          }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
			}
		},
		created(){
			this.geturl()
		},
  		methods:{
    			geturl(){
    				this.category = this.$route
      				console.log(this.category)
    			},
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
  		}
	}
</script>