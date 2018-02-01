<template>
  <page>
      <top title="签到详情" :showBack="true"/>
      <div class="map">88888</div>
       <tab-bar>
            <cell type="row" :vertical="true">
                        <cell top='0px'>
                            <div>宝山区</div>
                        </cell>
                        <cell top='0px'>
                            <box padding='10px 20px'>
                                <r-button type="primary">签到</r-button>
                            </box>
                        </cell>
            </cell>
       </tab-bar>
  </page>
</template>

<script>
import { Page, RImage, RButton,RForm, Cell, Box, MenuBar,Grid,Card,RTable,TabBar } from "rainbow-mobile-core";
import  Top from '../components/Top.vue';

export default {
  components: {
    Top,
    Page,
    Card,
    Box,
    RButton,
    RTable,
    Cell,
    RForm,
    TabBar
  },
  data() {
    return {
      head:[
        {"class":"index","src":index}
      ],
       data:{
        "head":[
          [{'text':'时间'},{'text':'地点'}]
        ],
        "body":[
          [{'text':'2017-09-09 09:09'},{'text':'地点1','link':'/ill/sign?id=1'}],
          [{'text':'2017-09-09 09:09'},{'text':'地点2','link':'/ill/sign?id=2'}]
        ]
      },
    };
  },
  computed :{
    
    
  }
};
</script>

<style>


</style>

