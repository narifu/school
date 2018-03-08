<template>
  <page>
      <top title="手机审批" :showBack="true"/>
      <r-body>
                  <card>
                      <picker  title="班级" :options="options1" :model="this" value="name"></picker>
                      <picker  title="学生" :options="options2" :model="this" value="name"></picker>
                  </card>
                  <card>
                      <r-table :data="data" />
                  </card>  
      </r-body>         
        <tab-bar>
            <cell type="row" :vertical="true">
                          <cell >
                            <box >
                                <r-button >同意</r-button>
                            </box>
                          </cell>
                          <cell >
                            <box >
                                <r-button type='danger'>拒绝</r-button>
                            </box>
                          </cell>
              </cell>
       </tab-bar>
  </page>
</template>

<script>
import { Page, RBody,RImage, RButton,TabBar,Picker, Cell, Box, DateTime,Grid,Card,RTable } from "rainbow-mobile-core";
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
    Picker,
    DateTime,
    RBody
  },
  data() {
    return {
       data:{
        "head":[
          [{'text':'姓名'},{'text':'手机号'}]
        ],
        "body":[
          [{'text':'张三'},{'text':'12345678911'}],
          [{'text':'李四'},{'text':'12345678911'}]
        ]
      },
      options1:[['一班','二班']],
      options2:[['张三','李四']],
      name:[]
    };
  },
  computed :{
    
    
  }
};
</script>


