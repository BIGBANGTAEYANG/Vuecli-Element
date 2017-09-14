<template>
      <div id="app">
        <!-- 头部导航 -->
        <header class="header">
          <el-menu theme="dark"  class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
            <el-menu-item index="/main/index">首页</el-menu-item>
            <el-menu-item index="/main/sell">销售管理</el-menu-item>
            <el-menu-item index="/main/stock">库存管理</el-menu-item>
            <el-menu-item index="/main/customer">客户管理</el-menu-item>
            <el-menu-item index="/main/employee">员工管理</el-menu-item>
            
            <el-submenu :style="{float:'right',padding:'0px 30px 0px 0px'}" index="">
              <template slot="title">用户管理</template>
              <el-menu-item class="el-icon-caret-right" index="" @click="logout">退出系统</el-menu-item>
              <el-menu-item class="el-icon-information" index="/main/userinfo">用户信息</el-menu-item>
            </el-submenu>
            
          </el-menu>
        </header>


      <router-view></router-view>

      </div>
</template>

<script>
    export default {
      name: 'app',
      data() {
        return {
          activeIndex: '1',
          activeIndex2: '1'
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        logout(){
          this.$router.push('/');
        }
      }
    }
</script>

<style>
    body{margin: 0;}
    #app {
      min-width: 1200px;
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: left;
      color: #2c3e50;
      margin: 0 auto;
    }
    /* 头部导航 */
    header{z-index: 1000;min-width: 1200px;transition: all 0.5s ease;  border-top: solid 4px #3091F2;  background-color: #fff;  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);  }
    header.header-fixed{position: fixed;top: 0;left: 0;right: 0;}
    header .el-menu-demo{padding-left: 30px!important;}

    /* 主内容区 */
    main{display: -webkit-box;  display: -ms-flexbox;  display: flex;  min-height: 800px;  border: solid 30px #E5E9F2;  background-color: #FCFCFC;  }
    main .main-left{text-align: center; width:150px; float:left;}
    main .main-right{-webkit-box-flex: 1;  -ms-flex: 1;  flex: 1;  background-color: #fff; padding: 50px 70px; }
    main .el-menu{background-color: transparent!important;}
</style>







