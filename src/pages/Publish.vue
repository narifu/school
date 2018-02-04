<template>
  <page>
      <top title="信息发布" :showBack="true"/>
              <card>
                  <picker  title="班级" :options="options1" ></picker>
                  <picker  title="学生" :options="options2" ></picker>
              </card>
              
              <card>
                 <r-textarea placeholder="请输入要发布的信息" :max='300' :height="350"/>
              </card>
             
            <tab-bar>
                <cell type="row" :vertical="true">
                              <cell >
                                  <box >
                                      <r-button>发布</r-button>
                                  </box>
                              </cell>
                  </cell>
            </tab-bar>
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
      options2:[['张三','李四']]

    };
  },
  methods: {
    onChange() {}
  }
};
</script>


