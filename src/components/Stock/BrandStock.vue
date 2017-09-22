<template>
    <div id="brand">

      <!--左上角添加-->
      <div :style="{float:'left',padding:'0px 0px 20px 0px'}">
          <el-button type="primary" icon="plus" @click="addStock">添加库存</el-button>
      </div>

      <!--右上角操作-->
      <div :style="{float:'right',padding:'0px 0px 20px 0px'}">
          <el-input v-model="searchinput" placeholder="请输入内容" icon="search"></el-input>
      </div>


        <el-table v-loading="loading" element-loading-text="拼命加载中" :data="stockTable"  style="width: 100%">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="stockproductid" label="货品编号：">
          </el-table-column>
          <el-table-column prop="stockproductname" label="货品名称：">
          </el-table-column>
          <el-table-column prop="stockinprice" sortable label="进货价：">
          </el-table-column>
          <el-table-column prop="intime" sortable label="进货时间：">
              <template scope="scope">
                <el-icon name="time"></el-icon>
                <span style="margin-left: 10px">{{ scope.row.intime | TimeFiliter }}</span>
              </template>
          </el-table-column>
          <el-table-column prop="stocktype" sortable label="货品备注：">
          </el-table-column>
          <el-table-column prop="stocknumber" sortable label="货品数量：">
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

      <!--右下角分页-->
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
      <el-dialog title="添加库存" :visible.sync="dialogFormVisible">
        
      </el-dialog>

    </div>
</template>

<script>
    import {formatDate} from '../../assets/js/filiter'
    export default {
      name: 'brand',
      data() {
        return {

          //dialog是否可见
          dialogFormVisible:false,

          //搜索框值
          searchinput:'',
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
          stockTable: []

        };
      },
      methods: {

        //添加库存
        addStock(){
          this.dialogFormVisible = true;
        },

        //每页显示数目
        handleSizeChange(val){
          alert(val);
        },
        //当前页码
        handleCurrentChange(val){
          alert(val)
        },
        handleEdit(index,row){

        },
        handleDelete(index,row){

        }
      },
      //过滤时间
      filters:{
        TimeFiliter(time){
            let date = new Date(time)
            return formatDate(date, 'yyyy-MM-dd hh:mm')
        }
      },
      //axios加载数据
      mounted(){
          this.$axios.get('/api/getAllStock')
            .then((response)=>{
              if(response.data!=null){
                setTimeout(() => {
                  this.stockTable = response.data;
                  this.totalCount = response.data.length;
                  this.loading = false;
                }, 2000);
              }
            })
            .catch((err)=>{
                this.$notify.error({title:'数据请求错误',message: '错误原因'+err});
          });
      }
    }
</script>

<style scoped>

</style>
