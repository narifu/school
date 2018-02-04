<template>
  <page>
      <top title="公告" :showBack="true"/>
            <panel :data="list" type='4'/>
  </page>
</template>

<script>
import { Page, RImage, RButton, Cell, Box, MenuBar,Grid,Card,Panel} from "rainbow-mobile-core";
import  Top from '../components/Top.vue';
import index from "../assets/top.gif";

export default {
  components: {
    Top,
    Page,
    RImage,
    Card,
    Grid,
    Panel
  },
  data() {
    return {
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
  computed :{
    
  }
};
</script>


