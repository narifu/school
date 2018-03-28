<template>
  <page>
      <top title="位置共享" :showBack="true"/>
      <r-body>
             <card>
                  <selector title="班级" :options="classes" :model="this.share" value="classes" :onChange="classChange" ></selector>
                  <row title="学生" :model="this" value="v_student"  :onClick="showStudent" :isLink="true" ></row>
              </card>
             
      </r-body>  
                    <confirm :model="this" value="show" title="您确认发起共享么?"  :onConfirm="onConfirm">共享学生是：{{ v_student }}</confirm>
       <r-dialog :model="this" value="showDialog" :disableMask="false">
                        <checker :model="this.share" value="student" :data='students' type="list" :onChange="onChange"/>
       </r-dialog>
        <tab-bar>
                      <toast :model="this" value="showFlag" :text="toastText" :type='type'/>

            <cell type="row" :vertical="true">
                          <cell >
                            <box >
                                <r-button :onClick="shareCreate" :disabled="disableButton">发起响应</r-button>
                            </box>
                          </cell>
              </cell>
       </tab-bar>
  </page>
</template>

<script>
import { Page,RDialog,Toast,Row,Checker, RImage,RBody,Confirm, RButton,TabBar,Picker, Cell, Box, DateTime,Grid,Card,RTable,Selector } from "rainbow-mobile-core";
import  Top from '../components/Top.vue';
import Util from "../util/util";

export default {
  components: {
    Top,
    Page,
    Card,
    Box,
    RButton,
    RTable,
    TabBar,
    Cell,
    Picker,
    DateTime,
    RBody,
    Selector,
    Confirm,
    RDialog,
    Row,
    Checker,
    Toast
  },
  data() {
    return {
       data:{
        "head":[
          [{'text':'时间'},{'text':'地点'}]
        ],
        "body":[
          [{'text':'2017-09-09 09:09'},{'text':'地点1','link':'/location/detail?id=1'}],
          [{'text':'2017-09-09 09:09'},{'text':'地点2','link':'/location/detail?id=2'}]
        ]
      },
      classes:[],
      options2:[['张三','李四']],
      startDate:null,
      name:[],
      students:[],
      v_student:[],
      share:{},
      show:false,
      showFlag:false,
      toastText:"",
      type:"success",
      showDialog:false
    };
  },
  computed :{
      disableButton(){
        return _.isEmpty(this.share.student);
      }
    
  },
  methods:{
    shareCreate(){
        this.show=true;
    },
    async onConfirm(){
       const status = await this.$http.post(`location/sharing/create`,{"studentNos":this.share.student});
      if(status){
        this.toastText="发起成功";
        this.showFlag=true;
      }else{
        this.toastText="发起失败";
        this.type = "warn";
        this.showFlag=true;
      }
    },
    showStudent(){
        this.showDialog=true;
    },
    onChange(){
                  const _class = [];
                  _.each(this.students,(cla)=>{
                      _.each(this.share.student,(pcla)=>{
                            if(pcla==cla.key){
                                  _class.push(cla.value);
                            }
                      });
                  });
                  this.v_student = _.isEmpty(_class)?"":_class.join(",");
    },
    async classChange(){
                  const identityId = Util.getIdentityId(this);
                  const students = await this.$http.get(`user/class/students?identityId=${identityId}&&classNo=${this.share.classes}`);
                  const _students = [];
                  _.each(students.body,(stu)=>{
                      _students.push({"key":stu.studentNo,"value":stu.studentName})
                  });
                  this.students=_students;
    }
  },
  async mounted(){
                  // const identityId = Util.getIdentityId(this);
                  // const classes = await this.$http.get(`user/teacherclass?identityId=${identityId}`);
                  // this.classes = _.map(classes.body,(cla)=>{
                  //     return {"key":cla.classNo,"value":cla.className}
                  // })
  }
};
</script>


