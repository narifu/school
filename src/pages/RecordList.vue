<template>
  <page>
      <top title="学生记录" :showBack="true"/>
        <r-body>
              <card>
                  <picker  title="班级" :options="options1" :model="this" value="name"></picker>
                  <picker  title="学生" :options="options2" :model="this" value="name"></picker>
              </card>
              <card>
                  <date-time  title='开始时间' :model="this" value="startDate"></date-time>
                  <date-time  title='结束时间' :model="this" value="startDate"></date-time>
              </card>
                <card>
                      <r-table :data="data" />
                </card>
        </r-body>
              <tab-bar>
                <cell type="row" :vertical="true">
                              <cell >
                                  <box >
                                      <r-button link="/record/evaluate">全部评价</r-button>
                                  </box>
                              </cell>
                  </cell>
             </tab-bar>
  </page>
</template>

<script>
import { Page, RImage,RBody, RButton,TabBar,Picker, Cell, Box, DateTime,Grid,Card,RTable } from "rainbow-mobile-core";
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
    Cell,
    Picker,
    TabBar,
    RBody
  },
  data() {
    return {
       data:{
        "head":[
          [{'text':'姓名'},{'text':'班级'},{'text':'时间'}]
        ],
        "body":[
          [{'text':'张三','link':'/record/detail?id=1'},{'text':'计算机三班'},{'text':'2017-09-09'}],
          [{'text':'李四','link':'/record/detail?id=1'},{'text':'计算机三班'},{'text':'2017-09-09'}]
        ]
      },
      options1:[['一班','二班']],
      options2:[['张三','李四']],
      startDate:null,
      name:[]
    };
  },
  methods:{
    
  }
};
</script>


