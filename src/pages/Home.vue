<template>
  <page>
      <top title="主页"/>
      <r-image :list="head"/>
      <div style='margin-top:-15px'>
           <card title="消息列表" :list="cardList"/>
      </div>
      <card title="功能列表">
        <grid :data='gridItems'/>
      </card>

  </page>
</template>

<script>
import { Page, RImage, RButton, Cell, Box, MenuBar,Grid,Card } from "rainbow-mobile-core";
import  Top from '../components/Top.vue';
import index from "../assets/top.gif";

export default {
  components: {
    Top,
    Page,
    RImage,
    Card,
    Grid
  },
  data() {
    return {
      head:[
        {"class":"index","src":index}
      ]
    };
  },
  computed :{
    cardList(){
      return [
        { 'link': '/component/core', 'number': '40','text': '实习公告' },
        { 'link': '/component/advanced', 'number': '16','text': '实习任务' },
        { 'link': '/component/business', 'number': '1','text': '指导意见' },
        { 'link': '/ill', 'number': '1','text': '请假申请' },
      ]
    },
    gridItems(){
      return [
        { 'icon':"fa fa-address-card fa-2x",'text': '签到提交','link':'/location?type=sign'},
        { 'icon':"fa fa-address-card fa-2x",'text': '位置共享','link':'/location?type=share'},
        { 'icon':"fa fa-address-card fa-2x",'text': '实习单位','link':'/company'},
        { 'icon':"fa fa-address-card fa-2x",'text': '实习记录','link':'/record'},
        { 'icon':"fa fa-address-card fa-2x",'text': '实习总结'},
        { 'icon':"fa fa-address-card fa-2x",'text': '实习成绩'},
        { 'icon':"fa fa-address-card fa-2x",'text': '实习表现'},
        { 'icon':"fa fa-address-card fa-2x",'text': '个人信息'},
        { 'icon':"fa fa-address-card fa-2x",'text': '修改密码'},

      ]
    }
  }
};
</script>


