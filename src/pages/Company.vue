<template>
  <page>
      <top title="实习单位" :showBack="true"/>
       <card title='实习单位列表'>
                                <r-table :data="data" :border="true"/>
       </card>
  <tab-bar>
          <cell type="row" :vertical="true">
                        <cell top='0px'>
                   <box padding='10px 20px'>
          <r-button type='primary'>增加</r-button>
                   </box>
                        </cell>
            </cell>
       </tab-bar>
  </page>
</template>

<script>
import { Page, RImage, RButton,TabBar,RForm, Cell, Box, MenuBar,Grid,Card,RTable } from "rainbow-mobile-core";
import  Top from '../components/Top.vue';
import index from "../assets/top.gif";

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
      head:[
        {"class":"index","src":index}
      ],
       data:{
        "head":[
          [{'text':'开始时间'},{'text':'结束时间'},{'text':'单位'}]
        ],
        "body":[
          [{'text':'2017-09-09'},{'text':'2017-09-09'},{'text':'地点1','link':'/company/detail?id=1'}],
          [{'text':'2017-09-09'},{'text':'2017-09-09'},{'text':'地点2','link':'/company/detail?id=2'}]
        ]
      },
    };
  },
  computed :{
    
    
  }
};
</script>


