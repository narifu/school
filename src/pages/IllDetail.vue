<template>
  <page>
      <top title="请假详情" :showBack="true"/>
              <card>
                  <date-time  title='开始时间' :model="startDate" @on-change="onChange"></date-time>
                  <date-time  title='结束时间' :model="startDate" @on-change="onChange"></date-time>
              </card>
              <card>
                  <selector  title="请假类型" :options="options" :model="type" @on-change="onChange"></selector>
              </card>
           
              <card>
                  <r-textarea placeholder="请假事由" :model="value" :height="250" :max="300"></r-textarea>
              </card>

     
             <tab-bar>
                  <cell type="row" :vertical="true">
                                <cell>
                                    <box>
                                          <r-button>上传病假单图片</r-button>
                                    </box>
                                </cell>
                                <cell>
                                  <box>
                                      <r-button>提交</r-button>
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
  Selector,
  Cell,
  Box,
  TabBar,
  DateTime,
  Grid,
  Card,
  RTable,
  RForm,
  Selecter
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
    Selector,
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
      options: [{ key: "sj", value: "事假" }, { key: "bj", value: "病假" }]
    };
  },
  methods: {
    onChange() {}
  }
};
</script>


