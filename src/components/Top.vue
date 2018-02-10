<template>
<div>
        <r-header :title="title" :showBack="showBack" backText="后退" :showMore="true" :onClickMore="onClickMore"></r-header>
        <actionsheet :showMenu="showMenu" :menuList="menuList" :headerHtml="headerHtml" :onClick="onClickSheet"/>
</div>
</template>

<script>
import { RHeader,Actionsheet} from 'rainbow-mobile-core';

export default {
  components: {
    RHeader,
    Actionsheet 
  },
  props: {
    title: String,
    showBack:Boolean
  },
  data() {
    return {
      showMenu:false,
      menuList:{
          zh: '退出',
      }
    };
  },
  methods:{
    onClickMore(){
        if(this.showMenu){
          this.showMenu = false;
        }else{
          this.showMenu = true;
        }
    },
    onClickSheet(key){
      window.location.hash="/"
    }
  },
  computed: {
    headerHtml(){
        return `<h6>操作</h6>`
    },
  }
};
</script>