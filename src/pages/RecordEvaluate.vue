<template>
  <page>
      <top title="记录评价" :showBack="true"/>
      <r-body>
          <card>
                  <r-input title="分数" :model="this" value="name"/>
                  <r-textarea placeholder="实习评价" :model="this" value="name"  :autoSize="true" :height="400" :max="400"></r-textarea>
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
import { Page, RBody,RImage,RTextarea, RButton, Selector,Cell, Box,TabBar, DateTime,Grid,Card,RTable,RInput,Selecter} from "rainbow-mobile-core";
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
    RInput,
    Selector,
    RTextarea,
    TabBar,
    Cell,
    RBody
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


