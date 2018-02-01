<template>
  <page>
      <top title="实习记录" :showBack="true"/>
                <card title="实习记录列表">
                      <r-table :data="data" :border="true"/>
                </card>
                <tab-bar>
                  <cell type="row" :vertical="true">
                                <cell top='0px'>
                                    <box padding='10px 20px'>
                                        <r-button type='primary'>增加记录</r-button>
                                    </box>
                                </cell>
                    </cell>
              </tab-bar>
  </page>
</template>

<script>
import { Page, RImage, RButton,TabBar,RForm, Cell, Box, MenuBar,Grid,Card,RTable } from "rainbow-mobile-core";
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
          [{'text':'开始时间'},{'text':'结束时间'},{'text':'操作'}]
        ],
        "body":[
          [{'text':'2017-09-09'},{'text':'2017-09-09'},{'text':'查看','link':'/record/detail?id=1'}],
          [{'text':'2017-09-09'},{'text':'2017-09-09'},{'text':'查看','link':'/record/detail?id=2'}]
        ]
      },
    };
  },
  computed :{
    
    
  }
};
</script>


