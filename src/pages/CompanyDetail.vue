<template>
  <page>
      <top title="实习单位详情" :showBack="true"/>
      <r-body>
                <card>
                    <r-input title="名称" :model="this" value="name" placeholder="请输入实习单位名称"/>
                    <r-input title="地址" :model="this" value="name" placeholder="请输入实习单位地址"/>
                </card>
                <card>
                    <date-time  title='开始时间' :model="this" value="startDate" ></date-time>
                    <date-time  title='开始时间' :model="this" value="startDate" ></date-time>
                </card>
                <card>
                    <r-input title="导师名字" :model="this" value="name" placeholder="请输入导师名字"/>
                    <r-input title="导师电话" :model="this" value="name" placeholder="请输入导师手机号"/>
                </card>
      </r-body>
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
import { Page, RImage,RBody, RInput,RButton, Selector,Cell, Box,TabBar, DateTime,Grid,Card,RTable,Selecter} from "rainbow-mobile-core";
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
    Selector,
    RInput,
    TabBar,
    Cell,
    RBody
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


