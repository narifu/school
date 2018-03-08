<template>
  <page>
      <top title="修改密码" :showBack="true"/>
      <r-body>
              <card>
                 <r-input title="原密码" placeholder="请输入原密码" :model="this" value="name" :isPassword="true"/>
                 <r-input title="新密码" placeholder="请输入新密码" :model="this" value="name" :isPassword="true"/>
                 <r-input title="确认密码" placeholder="再输入新密码" :model="this" value="name" :isPassword="true"/>
              </card>
      </r-body>
              <tab-bar>
                  <cell type="row" :vertical="true">
                                <cell >
                                  <box >
                                      <r-button >提交</r-button>
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
  RInput,
  Selector,
  Cell,
  Box,
  TabBar,
  DateTime,
  Grid,
  Card,
  RTable,
  Selecter,
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
    Selector,
    RInput,
    TabBar,
    Cell,
    RBody
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      type: null,
      value: null,
      name:null,
      options: [{ key: "sj", value: "事假" }, { key: "bj", value: "病假" }]
    };
  },
  methods: {
    onChange() {}
  }
};
</script>


