<template>
  <page>
      <top title="签到" :showBack="true"/>
        <card title='签到列表'>
                                <r-table :data="data" :border="true"/>
        </card>
        <tab-bar>
            <cell type="row" :vertical="true">
                          <cell top='0px'>
                            <box padding='10px 20px'>
                                <r-button type='primary'>在线签到</r-button>
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
      head:[
        {"class":"index","src":index}
      ],
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


