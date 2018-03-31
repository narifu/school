<template>
  <page>
      <top title="请假列表" :showBack="true"/>
<r-body>
              <card v-if="!isStudent">
                  <picker  title="班级" :options="options1"  :model="this"  value="class" ></picker>
                  <picker  title="学生" :options="options2"  :model="this"  value="name" ></picker>
              </card>
              <card>
                  <date-time  title='开始时间' :model="this" value="startDateStr" format="YYYY-MM-DD HH:mm" :hourList="['09', '10', '11', '12', '13', '14', '15', '16', '17', '18']" :minuteList="['00', '15', '30', '45']" :onChange="flash"></date-time>
                  <date-time  title='结束时间' :model="this" value="endDateStr" format="YYYY-MM-DD HH:mm" :hourList="['09', '10', '11', '12', '13', '14', '15', '16', '17', '18']" :minuteList="['00', '15', '30', '45']" :onChange="flash"></date-time>
              </card>
               <card>
                  <selector  title="状态" :options="options" :model="this" value="type" :onChange="flash"></selector>
              </card>
                <card>
                      <r-table :data="data" />
                </card>
</r-body>   
  <tab-bar>
                <cell type="row" :vertical="true" v-if="isStudent">
                              <cell>
                                  <box>
                                      <r-button link='/ill/detail?type=submit'>请假申请</r-button>
                                  </box>
                              </cell>
                  </cell>
            </tab-bar>  
  </page>
</template>

<script>
import { Page,RBody, RImage, RButton,TabBar,Picker, Cell,Selector, Box, DateTime,Grid,Card,RTable } from "rainbow-mobile-core";
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
    DateTime,
    Cell,
    Picker,
    TabBar,
    Selector,
    RBody
  },
  data() {
    return {
      data:{
        "head":[
          [{'text':'学生姓名'},{'text':'请假时间'},{'text':'状态'}]
        ],
        "body":[]
      },
      options1:[['一班','二班']],
      options2:[['张三','李四']],
      startDateStr:null,
      endDateStr:null,
      type:null,
      options: [{ key: 0, value: "未审批" }, { key: 1, value: "已审批" }],
      class:[],
      name:[],
      flag:false
    };
  },
  computed:{
    isStudent(){
      return Util.isStudent(this);
    }
  },
  methods:{
      goto(){
        window.location.hash='/record/evaluate'
      },
      flash(){
         this.loadLeave();
         this.flag=!this.flag;
      },
      async loadLeave(){
            this.user = JSON.parse(sessionStorage.getItem("user"));
            const identityId = Util.getIdentityId(this);
            const url = `leave/list`;
            let param = {"pageNo":1,"pageSize":20};
            if(this.isStudent){
              param["studentNos"] = [identityId];
            }else{
              param["identityId"] = identityId;
            }
            if(this.type!=null){
              param["status"] = this.type;
            }else{
              param["status"] = "0"
            }
            if(this.startDateStr!=null){
              param["startDateStr"] = this.startDateStr+":00";
            }
            if(this.endDateStr!=null){
              param["endDateStr"] = this.endDateStr+":00";
            }
            const leaves = await this.$http.post(url,param);
            const loadLeaves = [];
            _.each(leaves.body,(leave)=>{
              leave.leaveStartDate = leave.leaveStartDate?leave.leaveStartDate.substring(0,16):"";
              leave.leaveEndDate = leave.leaveEndDate?leave.leaveEndDate.substring(0,16):"";
              loadLeaves.push([{'text':leave.studentName},{'text':leave.leaveStartDate},{'text':leave.state==1?'已审批':'未审批','link':'/ill/detail?leaveId='+leave.leaveId}])
            })
            if(!_.isEmpty(leaves.body)){
              sessionStorage.setItem("leaves",JSON.stringify(leaves.body));
            }
            this.data.body = loadLeaves;
      }
  },
   mounted(){
         this.loadLeave();
  }
};
</script>


