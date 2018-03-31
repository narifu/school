<template>
  <page>
      <top title="公告" :showBack="true"/>
      <r-body>
      <row title="筛选" :isLink="true" :model="this" value="filterValue" :onClick="onClickFilter"/>
      <panel :data="article_list" type='4'/>
      <popup position="right" :model="this" value="showFilter" :disableMask="true">
        <checker title="信息来源"  :data="objectList" :modelKey="true" :model="this" value="filter" :max="1" v-if="!isMessage"/>
        <checker title="已读/未读"  :data="filterList" :modelKey="true" :model="this" value="readFilter" :max="1" />
        <box position="center" >
        <r-button :mini="true" :onClick="_filter">筛选</r-button>
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
       readFilter:null,
       showFilter:false,
       filterValue:null,
       objectList: [{key: '0', value: '学校'}, {key: '1', value: '教务'}, {key: '2', value: '系部'}],
       filterList: [{key: '0', value: '未读'}, {key: '1', value: '已读'}],
       article_list: []
    };
  },
  computed:{
    isMessage(){
      if(this.$route.query&&this.$route.query.type){
        return true;
      }else{
        return false;
      }
    }
  },
  methods :{
    onClickFilter(){
        this.showFilter= true;
    },
    getSourceNameById(id){
       const source =  _.find(this.objectList,(source)=>{
          return source.key==id;
       });
       if(source){
         return source.value;
       }else{
         return id;
       }
    },
    _filter(){
        let source = null;
        if(this.isMessage){
            source = this.filterList
        }else{
            source = this.objectList;
        }
        _.each(source,(obj)=>{
            _.each(this.filter,(f)=>{
                if(obj.key==f){
                  this.filterValue = obj.value;
                }
            })
        })
        this.loadMessage();
    },
    async loadMessage(){
            const identityId = Util.getIdentityId(this);
            let param = {"identityId":identityId,"pageNo":1,"pageSize":30};

             if(this.isMessage){
                if(this.readFilter){
                    param["status"]=this.readFilter[0];
                }
              }else{

                if(this.filter){
                    param["source"]=this.filter[0];
                }

                if(this.readFilter){
                    param["status"]=this.readFilter[0];
                }
              }

         
            let url = "article/list";
            if(this.isMessage){
                url = "message/list"
            }
            const articles = await this.$http.post(url,param);
            
            const List = [];
            _.each(articles.body,(article)=>{
              const _article = {};
              _article["id"] = this.isMessage?article.id:article.readId;
              _article["title"] = article.title;
              _article["desc"] = article.content;
              debugger;
              _article["url"] = '/notes/detail?type='+this.isMessage+'&id='+_article.id+'&title='+article.title+'&content='+ article.content;
              _article["meta"] = {"source":"来源： "+ this.getSourceNameById(article.author),"date":"更新时间： "+article.updateTime};
              List.push(_article)
            });
            this.article_list = List;
            if(this.showFilter){
              this.showFilter = false;
            }
    }
  },
   mounted(){
           this.loadMessage();
  }
};
</script>


