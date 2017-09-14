<template>
<div id="sellweek">
   <el-table :data="tableData6" border show-summary style="width: 100%">
    <el-table-column prop="id" label="货品编号：">
    </el-table-column>
    <el-table-column prop="name" label="销售人员：">
    </el-table-column>
    <el-table-column prop="amount1" sortable label="原价：">
    </el-table-column>
    <el-table-column prop="amount2" sortable label="折扣：">
    </el-table-column>
    <el-table-column prop="amount3" sortable label="出售价：">
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div :style="{float:'right',padding:'20px 0px 0px 0px'}">
    <el-pagination layout="prev, pager, next" :total="100">
    </el-pagination>
  </div>
</div>
</template>

<script>
  export default {
    name:'sellweek',
    data() {
      return {
        list:[{
          propname:"id",
          labelname:"货品编号"
        }],
        tableData6: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }]
      };
    },
    methods: {
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
