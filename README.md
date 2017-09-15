# Vue-Cli & Element

> 一个 Vue.js + Element 的项目

## 构建项目

``` bash
# 进入项目使用下面命令进行安装项目依赖
npm install

# 使用下面的命令启动项目,在浏览器中访问 localhost:2333
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 项目启动后，首页是登录界面, 登录失败弹框提示，成功则跳转主页面, 代码如下：

```javascript
      userlogin(){
         this.$axios.post('/api/userlogin',{
           name:this.username,
           pwd:this.password
         })
         .then((response)=>{
            if(response.data.result){
               this.$notify({title: '登录成功',message: '这是一条成功的提示消息',type: 'success'});
               this.$router.push('/main/index');
            }else{
              this.$notify.error({title: '登录失败',message: '这是一条失败的提示消息'});
              this.username = "";
              this.password = "";
            }
         })
         .catch((err)=>{
            console.log(err);
         });
      }
```
## 登录失败效果图如下：
>![](https://github.com/BIGBANGTAEYANG/Vuecli-Element/blob/master/gitimage/login.png)     
## 登录成功效果图如下：
>![](https://github.com/BIGBANGTAEYANG/Vuecli-Element/blob/master/gitimage/main.png)
### 登录成功后首页第一个图表是使用Echarts和axios异步数据加载而成，代码如下：
```javascript
 drawColumnChart() {
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                //使用axios加载数据并且初始化图表
                this.$axios.get('/api/getEchartData')
                    .then((response)=>{
                        var seriesdata = [];
                        for ( var  i = 0;i<response.data.series.length;i++){
                            var jsondata = {type:"",name:"",data:""};
                            jsondata.type = response.data.series[i].type;
                            jsondata.name = response.data.series[i].name;
                            jsondata.data = response.data.series[i].data;
                            seriesdata.push(jsondata);
                        }
                        this.chartColumn.setOption({
                            title: { text: response.data.title.text },
                            tooltip: {},
                            xAxis: {
                                type: response.data.categories.type,
                                data: response.data.categories.data,
                                axisTick:{
                                    alignWithLabel:response.data.categories.axisTick.alignWithLabel
                                }
                            },
                            yAxis: {},
                            series: seriesdata
                        });
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            },
```
## 点击销售管理的周销售，异步加载table如下：
>![]()

