<template>
  <page>
      <top title="位置共享" :showBack="true"/>
      <r-body>
                    <card>
                                <r-table :data="data" />
                    </card> 
      </r-body>          
  </page>
</template>

<script>
import { Page, RBody,RImage, RButton,TabBar, Cell, Box, MenuBar,Grid,Card,RTable} from "rainbow-mobile-core";
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
          [{'text':'时间'},{'text':'发起人'},{'text':'响应结果'}]
        ],
        "body":[
          [{'text':'2017-09-09 09:09'},{'text':'万老师'},{'text':'地点1','link':'/location/detail?id=1'}],
          [{'text':'2017-09-09 09:09'},{'text':'李老师'},{'text':'地点2','link':'/location/detail?id=2'}]
        ]
      },
    };
  },
  computed :{
    
    
  }
};
</script>


