<template>
  <div id="login">
    <el-form ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" auto-complete="off" placeholder="账号" v-model="username"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" auto-complete="off" placeholder="密码" v-model="password"></el-input>
      </el-form-item>
      <el-checkbox  class="remember" v-model="checked">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="info" style="width:100%;" @click="userlogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>  
</template>

<script>
  import {setCookie,getCookie} from '../assets/js/cookie.js'
  export default {
    name:'login',
    data() {
      return {
        username:'',
        password:'',
        checked: false
      };
    },
    //页面渲染之前加载cookie
    mounted(){
      if(getCookie('username')!=''&&getCookie('password')!=''){
        this.username=getCookie('username');
        this.password=getCookie('password');
        this.checked  = true;
        this.$notify({title: '用户信息读取成功',message: '点击登录免输入',type: 'success'});
      }
    },
    methods: {
      userlogin(){
          this.$axios.post('/api/userlogin',{
            username:this.username,
            password:this.password
          })
          .then((response)=>{
            console.log(response)
              if(response.data.code=='200'){
                  this.$notify({title: '用户登录成功',message: '进入系统后台首页',type: 'success'});
                  if(this.checked==true){
                    //设置cookie
                    setCookie('username',this.username,1000*60);
                    setCookie('password',this.password,1000*60);
                  }
                  
                  setTimeout(function(){
                    console.log(this);
                    this.$router.push('/main/index');
                  }.bind(this),1000)

              }else{
                this.$notify({title: '用户登录失败',message: '请输入正确的用户名与密码',type: 'warning'});
                this.username = "";
                this.password = "";
                this.checked = false
              }
          })
          .catch((err)=>{
              this.$notify.error({title: '登录请求错误',message: '错误原因'+err});
          });
      }
    }
  }
</script>

<style scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6
  }
  .title {
      margin:  0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
  .remember {
      margin: 0px 0px 35px 0px;
    }  
</style>