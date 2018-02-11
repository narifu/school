<template>
  <page>
      <top title="公告" :showBack="true"/>
      <row title="筛选" :isLink="true" :value="filterValue" :onClick="onClickFilter"/>
      <panel :data="list" type='4'/>
      <popup position="right" :model="this" value="showFilter" :disableMask="true">

        <checker title="信息来源"  :data="objectList" :modelKey="true" :model="this" value="filter" />
        <box position="center" >
        <r-button :mini="true">筛选</r-button>
        </box>
      </popup>
  </page>
</template>

<script>
import { Page, RImage, RButton,Row, Cell, Box,Popup,Checker, MenuBar,Grid,Card,Panel} from "rainbow-mobile-core";
import  Top from '../components/Top.vue';
import index from "../assets/top.gif";

export default {
  components: {
    Top,
    Page,
    RImage,
    Card,
    Grid,
    Panel,
    Row,
    Popup,
    Checker,
    RButton,
    Box
  },
  data() {
    return {
       filter:null,
       showFilter:false,
       filterValue:null,
       objectList: [{key: '1', value: '学校公告'}, {key: '2', value: '系公告'}, {key: '3', value: '导师公告'}],
       list: [{
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '标题一',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: '/notes/detail',
        meta: {
          source: '来源信息',
          date: '时间',
          other: '其他信息'
        }
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '标题二',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url:  '/notes/detail',
        meta: {
          source: '来源信息',
          date: '时间',
          other: '其他信息'
        }
      }]
    };
  },
  methods :{
    onClickFilter(){
        this.showFilter= true;
    }
  }
};
</script>


