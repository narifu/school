<template>
  <page>
      <top title="实习总结列表" :showBack="true"/>
      <r-body>
              <card>
                  <picker  title="班级" :options="options1" :model="this" value="name"></picker>
                  <picker  title="学生" :options="options2" :model="this" value="name"></picker>
              </card>
           
              
              <card>
                   <r-table :data="data" />
              </card>
             
      </r-body>
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
  RBody
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
    Picker,
    RTextarea,
    TabBar,
    Cell,
    RBody
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      type: null,
      name: [],
      options1:[['一班','二班']],
      options2:[['张三','李四']],
      data:{
        "head":[
          [{'text':'姓名'},{'text':'班级'},{'text':'状态'}]
        ],
        "body":[
          [{'text':'张三'},{'text':'计算机'},{'text':'未评价','link':'/performance?id=1'}],
          [{'text':'张三'},{'text':'计算机'},{'text':'已评价','link':'/performance?id=1'}],
        ]
      },

    };
  },
  methods: {
    onChange() {}
  }
};
</script>


