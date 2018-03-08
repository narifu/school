<template>
  <page>
      <top title="请假审批" :showBack="true"/>
<r-body>
              <card>
                  <picker  title="班级" :options="options1"  :model="this"  value="name" ></picker>
                  <picker  title="学生" :options="options2"  :model="this"  value="name" ></picker>
              </card>
              <card>
                  <selector  title="状态" :options="options" :model="this" value="type" ></selector>
              </card>
              <card>
                  <date-time  title='开始时间' :model="this" value="startDate"></date-time>
                  <date-time  title='结束时间' :model="this" value="startDate" ></date-time>
              </card>
                <card>
                      <r-table :data="data" />
                </card>
</r-body>     
  </page>
</template>

<script>
import { Page,RBody, RImage, RButton,TabBar,Picker, Cell,Selector, Box, DateTime,Grid,Card,RTable } from "rainbow-mobile-core";
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
    Selector,
    RBody
  },
  data() {
    return {
       data:{
        "head":[
          [{'text':'姓名'},{'text':'班级'},{'text':'时间'}]
        ],
        "body":[
          [{'text':'张三','link':'/ill/detail?id=1'},{'text':'计算机三班'},{'text':'2017-09-09'}],
          [{'text':'李四','link':'/ill/detail?id=1'},{'text':'计算机三班'},{'text':'2017-09-09'}]
        ]
      },
      options1:[['一班','二班']],
      options2:[['张三','李四']],
      startDate:null,
      type:null,
      options: [{ key: "sj", value: "未审批" }, { key: "bj", value: "已审批" }],
      name:[]
    };
  },
  methods:{
      goto(){
        window.location.hash='/record/evaluate'
      }
  }
};
</script>


