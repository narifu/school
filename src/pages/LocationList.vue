<template>
  <page>
      <top title="学生考勤" :showBack="true"/>
              <card>
                  <picker  title="班级" :options="options1" ></picker>
                  <picker  title="学生" :options="options2" ></picker>
              </card>
              <card>
                  <date-time  title='开始时间' :model="startDate" ></date-time>
                  <date-time  title='结束时间' :model="startDate" ></date-time>
              </card>
                <card>
                      <r-table :data="data" />
                </card>
               
  </page>
</template>

<script>
import { Page, RImage, RButton,TabBar,Picker, Cell, Box, DateTime,Grid,Card,RTable } from "rainbow-mobile-core";
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
    TabBar
  },
  data() {
    return {
       data:{
        "head":[
          [{'text':'姓名'},{'text':'地点'},{'text':'状态'}]
        ],
        "body":[
          [{'text':'2017-09-09'},{'text':'上海市杨浦区政立路','link':'/location/detail?id=1'},{'text':'已签到'}],
          [{'text':'2017-09-09'},{'text':'上海市杨浦区政立路','link':'/location/detail?id=2'},{'text':'未签到'}]
        ]
      },
      options1:[['一班','二班']],
      options2:[['张三','李四']],
      startDate:null
    };
  },
  computed :{
    
    
  }
};
</script>


