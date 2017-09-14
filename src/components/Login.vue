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
      <el-checkbox checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="info" style="width:100%;" @click="userlogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>  
</template>

<script>
  export default {
    name:'login',
    data() {
      return {
        username:'',
        password:'',
      };
    },
    methods: {
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