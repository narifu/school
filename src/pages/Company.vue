<template>
  <page>
      <top title="实习单位" :showBack="true"/>
       <card>
             <r-table :data="data" />
       </card>
       <tab-bar>
            <cell type="row" :vertical="true">
                        <cell>
                            <box>
                                <r-button>增加</r-button>
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
          [{'text':'开始时间'},{'text':'结束时间'},{'text':'单位地址'}]
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


