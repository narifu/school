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
        { 'link': '/notes', 'number': '40','text': '实习公告' },
        { 'link': '/notes', 'number': '16','text': '实习任务' },
        { 'link': '/notes', 'number': '1','text': '指导意见' },
        { 'link': '/ill', 'number': '1','text': '请假申请' },
      ]
    },
    gridItems(){
      return [
        { 'icon':"fa fa-address-card fa-2x",'text': '签到提交','link':'/location?type=sign'},
        { 'icon':"fa fa-address-card fa-2x",'text': '位置共享','link':'/share'},
        { 'icon':"fa fa-address-card fa-2x",'text': '实习单位','link':'/company'},
        { 'icon':"fa fa-address-card fa-2x",'text': '实习记录','link':'/record'},
        { 'icon':"fa fa-address-card fa-2x",'text': '实习总结','link':'/summary'},
        { 'icon':"fa fa-address-card fa-2x",'text': '实习成绩','link':'/score'},
        { 'icon':"fa fa-address-card fa-2x",'text': '实习表现','link':'/performance'},

        { 'icon':"fa fa-address-card fa-2x",'text': '信息发布','link':'/publish'},
        { 'icon':"fa fa-address-card fa-2x",'text': '学生总结','link':'/summary/list'},
        { 'icon':"fa fa-address-card fa-2x",'text': '学生考勤','link':'/location/list'},
        { 'icon':"fa fa-address-card fa-2x",'text': '学生记录','link':'/record/list'},
        { 'icon':"fa fa-address-card fa-2x",'text': '请假审批','link':'/ill/list'},
        { 'icon':"fa fa-address-card fa-2x",'text': '学生成绩','link':'/score/list'},
        { 'icon':"fa fa-address-card fa-2x",'text': '位置共享','link':'/share/list'},
        { 'icon':"fa fa-address-card fa-2x",'text': '更换手机','link':'/phone/list'},
        { 'icon':"fa fa-address-card fa-2x",'text': '实习评价','link':'/performance/List'},


        { 'icon':"fa fa-address-card fa-2x",'text': '个人信息','link':'/personal'},
        { 'icon':"fa fa-address-card fa-2x",'text': '修改密码','link':'/password'},

      ]
    }
  }
};
</script>


