<template>
<div id="sellweek">
   <el-table v-loading="loading" element-loading-text="拼命加载中" :data="tableData" border show-summary style="width: 100%">
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
    <el-pagination 
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 30, 50]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
    </el-pagination>
  </div>

  <!--弹出dialog-->
  <el-dialog title="信息编辑" :visible.sync="dialogFormVisible">
    <el-form >
      <el-form-item label="销售人员" :label-width="formLabelWidth">
        <el-input  auto-complete="off" v-model="editForm.name"></el-input>
      </el-form-item>
      <el-form-item label="原价" :label-width="formLabelWidth">
        <el-input  auto-complete="off" v-model="editForm.amount1"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
  export default {
    name:'sellweek',
    data() {
      return {
        //是否显示dialog
        dialogFormVisible: false,
        //
        formLabelWidth: '120px',
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //查询的页码
        start: 1,
        //默认数据总数
        totalCount: 100,
        //是否显示加载动画
        loading: true,
        //数据表格
        tableData: [],
        //编辑对象
        editForm:{
          name:'',
          amount1:''
        }
      };
    },
    methods: {
      //每页显示数目
      handleSizeChange(val){
        alert(val);
      },
      //当前页码
      handleCurrentChange(val){
        alert(val)
      },
      handleEdit(index,row){
       this.dialogFormVisible = true;
       this.editForm.name = row.name;
       this.editForm.amount1 = row.amount1;
      },
      handleDelete(index,row){
        console.log(row)
      }
    },
    mounted(){
      this.$axios.get('/api/getTableData')
        .then((response)=>{
          if(response.data!=null){
            setTimeout(() => {
              this.tableData = response.data;
              this.totalCount = response.data.length;
              this.loading = false;
            }, 2000);
          }
        })
        .catch((err)=>{
            this.$notify.error({title:'数据请求错误',message: '错误原因'+err});
      });
    }
  };
  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
