<template>
  <page>
             <top title="消息详情" :showBack="true"/>
              <card>
                  <r-input title="标题"/>
                  <r-textarea placeholder="消息详情" :model="value" :height="667" :max="300"></r-textarea>
              </card>
  </page>
</template>

<script>
import {
  Page,
  RTextarea,
  Card,
  RInput,
} from "rainbow-mobile-core";
import Top from "../components/Top.vue";
export default {
  components: {
    Top,
    Page,
    Card,
    RTextarea,
    RInput
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


