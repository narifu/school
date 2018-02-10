<template>
  <page>
      <top title="记录详情" :showBack="true"/>
              <card>
                  <date-time  title='开始时间' :model="startDate" ></date-time>
                  <date-time  title='结束时间' :model="startDate" ></date-time>
              </card>
              <card>
                  <r-textarea placeholder="实习描述" :model="value" :height="200" :max="200"></r-textarea>
              </card>
                <card>
                  <r-textarea placeholder="实习评价" :model="value"  :autoSize="true" :rows="10" :max="200"></r-textarea>
              </card>
     
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
import { Page, RImage,RTextarea, RButton, Selector,Cell, Box,TabBar, DateTime,Grid,Card,RTable,Selecter} from "rainbow-mobile-core";
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
    Selector,
    RTextarea,
    TabBar,
    Cell
  },
  data() {
    return {
      startDate:null,
      endDate:null,
      type:null,
      value:null,
      options:[{"key":"sj","value":"事假"},{"key":"bj","value":"病假"}]
    };
  },
  methods :{
    onChange(){

    }
  }
};
</script>


