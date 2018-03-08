<template>
  <page>
      <top title="实习记录" :showBack="true"/>
      <r-body>
                <card>
                      <r-table :data="data" />
                </card>
      </r-body>
                <tab-bar>
                  <cell type="row" :vertical="true">
                                <cell >
                                    <box >
                                        <r-button >增加记录</r-button>
                                    </box>
                                </cell>
                    </cell>
              </tab-bar>
  </page>
</template>

<script>
import { Page,RBody, RImage, RButton,TabBar, Cell, Box, MenuBar,Grid,Card,RTable } from "rainbow-mobile-core";
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
    RBody
  },
  data() {
    return {
       data:{
      
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


