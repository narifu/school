<template>
  <page>
      <top title="请假列表" :showBack="true"/>
            <card>
                <r-table :data="data" />
            </card>
            <tab-bar>
                <cell type="row" :vertical="true">
                              <cell>
                                  <box>
                                      <r-button link='/ill/detail'>请假申请</r-button>
                                  </box>
                              </cell>
                  </cell>
            </tab-bar>
  </page>
</template>

<script>
import { Page, RImage, RButton,RForm, Cell, Box, MenuBar,TabBar,Card,RTable } from "rainbow-mobile-core";
import  Top from '../components/Top.vue';

export default {
  components: {
    Top,
    Page,
    Card,
    Box,
    RButton,
    RTable,
    TabBar,
    Cell,
    RForm
  },
  data() {
    return {
       data:{
        "head":[
          [{'text':'时间'},{'text':'类型'},{'text':'状态'}]
        ],
        "body":[
          [{'text':'2017-09-09 09:09'},{'text':'事假'},{'text':'已审批','link':'/ill/detail?id=1'}],
          [{'text':'2017-09-09 09:09'},{'text':'病假'},{'text':'未审批','link':'/ill/detail?id=2'}]
        ]
      },
    };
  },
  computed :{
    
    
  }
};
</script>


