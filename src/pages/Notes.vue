<template>
  <page>
      <top title="公告" :showBack="true"/>
      <r-body>
      <row title="筛选" :isLink="true" :model="this" value="filterValue" :onClick="onClickFilter"/>
      <panel :data="article_list" type='4'/>
      <popup position="right" :model="this" value="showFilter" :disableMask="true">
        <checker title="信息来源"  :data="objectList" :modelKey="true" :model="this" value="filter" />
        <box position="center" >
        <r-button :mini="true">筛选</r-button>
        </box>
      </popup>
      </r-body>
  </page>
</template>

<script>
import { Page,RBody, RImage, RButton,Row, Cell, Box,Popup,Checker, MenuBar,Grid,Card,Panel} from "rainbow-mobile-core";
import  Top from '../components/Top.vue';
import index from "../assets/top.gif";
import Util from "../util/util";
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
    Box,
    RBody
  },
  data() {
    return {
       filter:null,
       showFilter:false,
       filterValue:null,
       objectList: [{key: '0', value: '学校'}, {key: '1', value: '教务'}, {key: '2', value: '系部'}],
       article_list: []
    };
  },
  methods :{
    onClickFilter(){
        this.showFilter= true;
    },
    getSourceNameById(id){
       const source =   _.find(this.objectList,(source)=>{
          return source.key==id;
       });
       if(source){
         return source.value;
       }
    }
  },
  async mounted(){
            const identityId = Util.getIdentityId(this);
            let param = null;
            if(this.filterValue){
              param = {"identityId":identityId,"source":this.filterValue,"pageNo":1,"pageSize":5};
            }else{
              param = {"identityId":identityId,"pageNo":1,"pageSize":5};
            }
            let url = "article/list";
            if(this.$route.query&&this.$route.query.type){
                url = "message/list"
            }
            const articles = await this.$http.post(url,param);
            
            const List = [];
            _.each(articles.body,(article)=>{
              const _article = {};
              _article["id"] = article.id;
              _article["title"] = article.title;
              _article["desc"] = article.content;
              _article["url"] = '/notes/detail?title='+article.title+'&content='+ article.content;
              _article["meta"] = {"source":"来源： "+ this.getSourceNameById(article.author),"date":"更新时间： "+article.updateTime};
              List.push(_article)
            });
            this.article_list = List;
  }
};
</script>


