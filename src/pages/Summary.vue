<template>
  <page>
      <top title="实习总结" :showBack="true"/>
                  <r-textarea placeholder="请输入实习总结描述" :model="this" value="name" :height="600" :max="600"></r-textarea>
      
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
  RTextarea,
  Selector,
  Cell,
  Box,
  TabBar,
  DateTime,
  Grid,
  Card,
  RTable,
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
      name: null,
      options: [{ key: "sj", value: "事假" }, { key: "bj", value: "病假" }]
    };
  },
  methods: {
    onChange() {}
  }
};
</script>


