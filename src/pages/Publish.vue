<template>
  <page>
      <top title="信息发布" :showBack="true"/>
      <r-body>
              <card>
                  <selector title="发布对象" :options="target" :model="this.publish" value="target"  ></selector>
                  <row title="班级" :model="this" value="v_classes"  :onClick="showClass" :isLink="true" v-if="this.publish.target==3"></row>
                  <selector title="发布源" :options="source" :model="this.publish" value="source"  ></selector>
              </card>
              
              <card>
                 <r-input title="标题" :model="this.publish" value="title" ></r-input>
                 <r-textarea :model="this.publish" value="content" placeholder="请输入要发布的信息" :max='300' :height="350"/>
              </card>
      </r-body> 
            <popup :model="this" value="show"  :disableMask="true">
                 <checker :model="this.publish" value="classes" :data='classes' type="list" :onChange="onChange"/>
            </popup>
            <toast :model="this" value="showFlag" :text="toastText" :type='type'/>

            <tab-bar>
                <cell type="row" :vertical="true">
                              <cell >
                                  <box >
                                      <r-button :onClick="create">发布</r-button>
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
  Picker,
  Cell,
  Box,
  TabBar,
  DateTime,
  Grid,
  Card,
  RTable,
  RBody,
  Selector,
  RInput,
  Popup,
  Row,
  Checker,
  Toast,
  LoadingApi
} from "rainbow-mobile-core";
import Top from "../components/Top.vue";
import Util from "../util/util";

export default {
  components: {
    Top,
    Page,
    Card,
    Box,
    RButton,
    RTable,
    DateTime,
    Picker,
    RTextarea,
    TabBar,
    Cell,
    RBody,
    Selector,
    RInput,
    Popup,
    Row,
    Checker,
    Toast
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      type: null,
      name: [],
      v_classes:"",
      classes:[],
      publish: {},
      show:false,
      showFlag:false,
      toastText:"",
      type:"success",
      source:[{"key":"0","value":"学校"},{"key":"1","value":"教务"},{"key":"2","value":"系部"}],
      target:[{"key":"0","value":"全体师生"},{"key":"1","value":"全体教师"},{"key":"2","value":"全体学生"},{"key":"3","value":"班级学生"}],
    };
  },
  methods: {
    onChange() {
                 const _class = [];
                  _.each(this.classes,(cla)=>{
                      _.each(this.publish.classes,(pcla)=>{
                            if(pcla==cla.key){
                                  _class.push(cla.value);
                            }
                      });
                  });
                  this.v_classes = _.isEmpty(_class)?"":_class.join(",");
    },
    showClass(){
        this.show = true;
    },
    async create(){
        if(this.check()){
            const url = `article/create?title=${this.publish.title}&source=${this.publish.source}&target=${this.publish.target}&content=${this.publish.content}`
              // LoadingApi.show(this,{
              //   transition: '',
              //   text: "正在发布"
              //  });
              const publish = await this.$http.post(url,this.publish.classes);
              // LoadingApi.hide(this);
              if(publish){
                  this.toastText="发布成功";
              }else{
                  this.toastText="发布失败";
                  this.type="warn";
              }
              this.showFlag = true;
        }
    },
    check(){
      if(_.isEmpty(this.publish.title)){
            this.toastText="标题不能为空";
            this.type="warn";
            this.showFlag = true;
            return false;
      }
       if(_.isEmpty(this.publish.source)){
            this.toastText="发布源不能为空";
            this.type="warn";
            this.showFlag = true;
            return false;
      }
       if(_.isEmpty(this.publish.target)){
            this.toastText="发布对象不能为空";
            this.type="warn";
            this.showFlag = true;
            return false;
      }
       if(_.isEmpty(this.publish.content)){
            this.toastText="内容不能为空";
            this.type="warn";
            this.showFlag = true;
            return false;
      }
      if(this.publish.target==3){
          if(_.isEmpty(this.publish.classes)){
            this.toastText="班级不能为空";
            this.type="warn";
            this.showFlag = true;
            return false;
         }
      }
      return true;
    }
  },
  async mounted(){
                  const identityId = Util.getIdentityId(this);
                  const classes = await this.$http.get(`user/teacherclass?identityId=${identityId}`);
                  this.classes = _.map(classes.body,(cla)=>{
                      return {"key":cla.classNo,"value":cla.className}
                  })
  }
};
</script>


