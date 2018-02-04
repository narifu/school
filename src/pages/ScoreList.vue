<template>
  <page>
      <top title="学生成绩" :showBack="true"/>
              <card>
                  <picker  title="班级" :options="options1" ></picker>
                  <picker  title="学生" :options="options2" ></picker>
              </card>
           
              
              <card>
                   <r-table :data="data" />
              </card>
             
          
  </page>
</template>

<script>
import {
  Page,
  RImage,
  RButton,
  RTextarea,
  Picker,
  Cell,
  Box,
  TabBar,
  DateTime,
  Grid,
  Card,
  RTable,
  RForm
} from "rainbow-mobile-core";
import Top from "../components/Top.vue";
export default {
  components: {
    Top,
    Page,
    Card,
    Box,
    RButton,
    RTable,
    DateTime,
    RForm,
    Picker,
    RTextarea,
    TabBar,
    Cell
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      type: null,
      value: null,
      options1:[['一班','二班']],
      options2:[['张三','李四']],
      data:{
        "head":[
          [{'text':'姓名'},{'text':'班级'},{'text':'分数'},{'text':'操作'}]
        ],
        "body":[
          [{'text':'张三'},{'text':'计算机三班'},{'text':'86分'},{'text':'打分','link':'/summary/detail?id=1'}],
          [{'text':'张三'},{'text':'计算机三班'},{'text':'86分'},{'text':'打分','link':'/summary/detail?id=2'}],
          [{'text':'张三'},{'text':'计算机三班'},{'text':'86分'},{'text':'打分','link':'/summary/detail?id=2'}]
        ]
      },

    };
  },
  methods: {
    onChange() {}
  }
};
</script>


