<template>
  <page>
      <top title="签到" :showBack="true"/>
      <r-body>
                    <card>
                          <r-table :data="data" />
                    </card>  
      </r-body>         
        <tab-bar>
            <cell type="row" :vertical="true">
                          <cell >
                            <box >
                                <r-button link="/location/detail" >在线签到</r-button>
                            </box>
                          </cell>
              </cell>
       </tab-bar>
  </page>
</template>

<script>
import { Page, RBody,RImage, RButton,TabBar, Cell, Box, MenuBar,Grid,Card,RTable } from "rainbow-mobile-core";
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
        "head":[
          [{'text':'时间'},{'text':'地点'}]
        ],
        "body":[
          [{'text':'2017-09-09 09:09'},{'text':'地点1','link':'/location/detail?id=1'}],
          [{'text':'2017-09-09 09:09'},{'text':'地点2','link':'/location/detail?id=2'}]
        ]
      },
    };
  },
  computed :{
    
    
  }
};
</script>


