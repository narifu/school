<template>
  <page>
      <top title="实习成绩" :showBack="true"/>
              <card>
                  <previewer title="总成绩" value="84分" :data="list1"></previewer>
              </card>
              <card>
                   <previewer title="企业考核" value="24分" :data="list2"></previewer>
              </card>
              <card>
                   <previewer title="学院考核" value="60分" :data="list3"></previewer>
              </card>
         
  </page>
</template>

<script>
import { Page,Card} from "rainbow-mobile-core";
import {Previewer} from 'rainbow-mobile-previewer'
import Top from "../components/Top.vue";
export default {
  components: {
    Top,
    Page,
    Card,
    Previewer
  },
  data() {
    return {
      list1: [{
        label: '姓名',
        value: '张三'
      }, {
        label: '班级',
        value: '计算机三班'
      }, {
        label: '学号',
        value: '123456789'
      }],
       list2: [{
        label: '单位',
        value: '计算机网络技术有限公司'
      }, {
        label: '部门',
        value: '研发部'
      }, {
        label: '导师',
        value: '王五'
      }],
       list3: [{
        label: '学院',
        value: '信息技术学院'
      }, {
        label: '辅导员',
        value: '李四'
      }],
    };
  },
  methods: {
    onChange() {}
  }
};
</script>


