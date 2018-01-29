<template>
  <page>
      <top title="实习单位详情" :showBack="true"/>
       <card>
              <x-input title="名称" v-model="name" placeholder="请输入实习单位名称"/>
              <x-input title="地址" v-model="name" placeholder="请输入实习单位地址"/>

       </card>
       <card>
          <date-time  title='开始时间' :model="startDate" @on-change="onChange"></date-time>
          <date-time  title='开始时间' :model="startDate" @on-change="onChange"></date-time>

       </card>
       <card>
          <x-input title="名字" v-model="name" placeholder="请输入导师名字"/>
              <x-input title="电话" v-model="name" placeholder="请输入导师手机号"/>
       </card>
           
    

     
  <tab-bar>
          <cell type="row" :vertical="true">
                        <cell top='0px'>
                   <box padding='10px 20px'>
          <r-button type='danger'>删除</r-button>
                   </box>
                        </cell>
                        <cell top='0px'>
                   <box padding='10px 20px'>
          <r-button type='primary'>提交</r-button>
                   </box>
                        </cell>
            </cell>
       </tab-bar>
  </page>
</template>

<script>
import { Page, RImage, RButton, Selector,Cell, Box,TabBar, DateTime,Grid,Card,RTable,RForm,Selecter} from "rainbow-mobile-core";
import  Top from '../components/Top.vue';
import index from "../assets/top.gif";
import { XInput } from "vux";
export default {
  components: {
    Top,
    Page,
    Card,
    Box,
    RButton,
    RTable,
    DateTime,
    RForm,
    Selector,
    XInput,
    TabBar,
    Cell
  },
  data() {
    return {
      startDate:null,
      endDate:null,
      type:null,
      value:null,
      options:[{"key":"sj","value":"事假"},{"key":"bj","value":"病假"}]
    };
  },
  methods :{
    onChange(){

    }
  }
};
</script>


