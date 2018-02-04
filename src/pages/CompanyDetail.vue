<template>
  <page>
      <top title="实习单位详情" :showBack="true"/>
                <card>
                    <r-input title="名称" :model="name" placeholder="请输入实习单位名称"/>
                    <r-input title="地址" :model="name" placeholder="请输入实习单位地址"/>
                </card>
                <card>
                    <date-time  title='开始时间' :model="startDate" ></date-time>
                    <date-time  title='开始时间' :model="startDate" ></date-time>
                </card>
                <card>
                    <r-input title="导师名字" :model="name" placeholder="请输入导师名字"/>
                    <r-input title="导师电话" :model="name" placeholder="请输入导师手机号"/>
                </card>
           
                <tab-bar>
                    <cell type="row" :vertical="true">
                                  <cell>
                                      <box>
                                            <r-button type='danger'>删除</r-button>
                                      </box>
                                  </cell>
                                  <cell>
                                      <box>
                                            <r-button >提交</r-button>
                                      </box>
                                  </cell>
                      </cell>
                </tab-bar>
  </page>
</template>

<script>
import { Page, RImage, RInput,RButton, Selector,Cell, Box,TabBar, DateTime,Grid,Card,RTable,RForm,Selecter} from "rainbow-mobile-core";
import  Top from '../components/Top.vue';
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
    RInput,
    TabBar,
    Cell
  },
  data() {
    return {
      startDate:null,
      endDate:null,
      type:null,
      name:null,
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


