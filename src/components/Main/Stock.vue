<template>
    <main id="main">
        <!-- 左侧导航 -->
        <div class="main-left">
            <el-menu  class="el-menu-vertical-demo" :router="true">
            <el-menu-item index="/main/stock/brand"  :class="{'isActive': active}">品牌货品库存</el-menu-item>
            <el-menu-item index="/main/stock/nobrand" :class="{'isActive': !active}">散件货品库存</el-menu-item>
            </el-menu>
        </div>

        <!-- 右侧主内容区 -->
        <div  class="main-right" >
            <router-view></router-view>
        </div>
    </main>    
</template>

<script>
    export default {
      name: 'main',
      data() {
        return {
            active:true
        };
      },
      methods: {
        
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
