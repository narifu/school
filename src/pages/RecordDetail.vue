<template>
  <page>
      <top title="记录详情" :showBack="true"/>
       <r-form>
          <date-time  title='开始时间' :model="startDate" @on-change="onChange"></date-time>
          <date-time  title='结束时间' :model="startDate" @on-change="onChange"></date-time>

       </r-form>
       <r-form>
          <x-textarea title="实习描述" :model="value"></x-textarea>
       </r-form>
        <r-form>
          <x-textarea title="实习评价" :model="value"></x-textarea>
       </r-form>
     
  <tab-bar>
          <cell type="row" :vertical="true">
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
import {XTextarea} from 'vux'
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
    XTextarea,
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


