<template>
  <page>
      <top title="个人信息" :showBack="true"/>
      <r-body>
            <r-image :list="user"/>
            <row title="姓名" value='张三'/>
            <row title="学号" value='123456789'/>
            <row title="学院" value='计算机信息技术学院'/>
            <row title="班级" value='计算机三班'/>
            <row title="电话" value='123456789' :isLink="true"/>

      </r-body>     
  </page>
</template>

<script>
import { Page, RBody,RImage, RButton,TabBar,RForm, Row, Box, MenuBar,Grid,Card,RTable } from "rainbow-mobile-core";
import  Top from '../components/Top.vue';
import user from "../assets/user.gif";

export default {
  components: {
    Top,
    Page,
    Card,
    Box,
    RButton,
    RTable,
    TabBar,
    Row,
    RImage,
    RBody
  },
  data() {
    return {
       user: [
        {
          src: user
        }
      ],
    };
  },
  computed :{
    
    
  }
};
</script>


