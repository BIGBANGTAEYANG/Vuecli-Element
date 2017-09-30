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
          <el-table-column prop="productid" label="货品编号：">
          </el-table-column>
          <el-table-column prop="productname" label="货品名称：">
          </el-table-column>
          <el-table-column prop="inprice" sortable label="进货价：">
          </el-table-column>
          <el-table-column prop="intime" sortable label="进货时间：">
              <template scope="scope">
                <el-icon name="time"></el-icon>
                <span style="margin-left: 10px">{{ scope.row.intime | TimeFiliter }}</span>
              </template>
          </el-table-column>
          <el-table-column prop="producttype" sortable label="货品类型：">
          </el-table-column>
          <el-table-column prop="stocknumber" sortable label="库存数量：">
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
      <el-dialog title="添加库存" :visible.sync="dialogFormVisible" :style="{width:'1200px'}" :before-close="opendialog">
          <el-form  label-width="80px">
            <el-form-item label="货品名称" prop="stockproductname">
              <el-input v-model="stockform.productname"></el-input>
            </el-form-item>
            <el-form-item label="货品进价" prop="stockinprice" :style="{width:'300px'}">
              <el-input v-model="stockform.stockinprice"></el-input>
            </el-form-item>
            <el-form-item label="货品数量" prop="stocknumber" :style="{width:'300px'}">
              <el-input v-model="stockform.stocknumber"></el-input>
            </el-form-item>
            <el-form-item label="进货时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="stockform.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="stockform.date2" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="货品类型">
              <el-cascader :options="options" v-model="stockform.selectedOptions" @change="handleChange">
              </el-cascader>
            </el-form-item>

            <el-form-item>
              <el-button type="primary">添加</el-button>
              <el-button type="primary" @click="clearform">重置</el-button>
            </el-form-item>

            

          </el-form>
      </el-dialog>

    </div>
</template>

<script>
    import {formatDate} from '../../assets/js/filiter'
    export default {
      name: 'brand',
      data() {
        return {
          //表单对象
          stockform:{
            productname:'',
            stockinprice:'',
            date1:'',
            date2:'',
            //下拉框选中项
            selectedOptions:[]
          },

          //下来列表选项
          options:[{
            value:'leixingyi',
            label:'类型一',
            children:[{
              value: 'shejiyuanze',
              label: '设计原则',
              children: [{
                value: 'yizhi',
                label: '一致'
              }]
            }]
          }],

          

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

        //清空表单
        clearform(){
          this.stockform.productname='';
          this.stockform.stockinprice='';
          this.stockform.date1='';
          this.stockform.date2='';
          this.stockform.selectedOptions = [];
        },

        //打开dialog的回调
        opendialog(done){
          this.$confirm('确认关闭吗')
            .then(_=>{
              clearform();
              done();
            })
            .catch(_=>{})
        },

        //下拉框选中事件
        handleChange(value) {
          this.selectedOptions = value;
        },

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
        //获取库存表格
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
       //获取下拉框选项
        this.$axios.get('/api/getoptions')
          .then((response)=>{
            if(response.data!=null){
              this.options = response.data;
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
