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

##项目启动后，首页是登录界面, 登录失败弹框提示，成功则跳转主页面

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
>效果图如下：<br> 
>![]()     
