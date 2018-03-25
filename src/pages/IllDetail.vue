<template>
  <page>
      <top title="请假详情" :showBack="true"/>
      <r-body>
              <card>
                  <date-time  title='开始时间' :required="true" :readonly="isReadlony" :model="this" value="leaveStartDate" format="YYYY-MM-DD HH:mm" :hourList="['09', '10', '11', '12', '13', '14', '15', '16', '17', '18']" :minuteList="['00', '15', '30', '45']"></date-time>
                  <date-time  title='结束时间' :required="true" :readonly="isReadlony" :model="this" value="leaveEndDate" format="YYYY-MM-DD HH:mm" :hourList="['09', '10', '11', '12', '13', '14', '15', '16', '17', '18']" :minuteList="['00', '15', '30', '45']"></date-time>
              </card>
              <card>
                  <selector  title="请假类型" :required="true" :readonly="isReadlony" :options="options" :model="this" value="leaveType" ></selector>
              </card>
           
              <card>
                  <r-textarea placeholder="请假事由" :required="true" :readonly="isReadlony" :model="this"  value="reason" :height="200" :max="300"></r-textarea>
              </card>

              <card title="上传病假单">
                  <upload :max="1" url="leave/img" name="file" :onSuccess="uploadSuccess" v-if="!isReadlony"/>
                  <r-image :list="leaveImg" v-if="isReadlony"/>
              </card>

                   <cell type="row" :vertical="true" v-if="!isStudent">
                                <cell>
                                  <box>
                                      <r-button :onClick="approve" >审核通过</r-button>

                                      <r-button :onClick="reject" type="danger">审核拒绝</r-button>
                                  </box>
                                </cell>
                    </cell>
      </r-body>
             <tab-bar v-if="!isReadlony">
                  <cell type="row" :vertical="true">
                                <cell>
                                  <box>
                                      <r-button :onClick="submit">提交</r-button>
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
  Selector,
  Cell,
  Box,
  TabBar,
  DateTime,
  Grid,
  Card,
  RTable,
  Selecter,
  RBody,
  ConfirmApi,
} from "rainbow-mobile-core";
import {Upload} from "rainbow-mobile-upload";
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
    Selector,
    RTextarea,
    TabBar,
    Cell,
    Upload,
    RBody,
    RImage
  },
  data() {
    return {
      leavePath:null,
      leaveStartDate:null,
      leaveEndDate:null,
      leaveType:null,
      reason:null,
      leaveImg:null,
      options: [{ key: 2, value: "事假" }, { key: 1, value: "病假" }]
    };
  },
  methods: {
    async submit() {
            if(!this.leavePath){
                  ConfirmApi.show(this,{
                    title: '',
                    content: '请上传病假单',
                  });
            }else{
                const url = `leave/create`;
                let param = {"imgUrl":this.leavePath,"reason":this.reason,"leaveStartDateStr":this.leaveStartDate+":00","leaveEndDateStr":this.leaveEndDate+":00","leaveType":this.leaveType};
                const leaves = await this.$http.post(url,param);
                if(!_.isEmpty(leaves.body)){
                  ConfirmApi.show(this,{
                    title: '申请失败',
                    content: leaves.bodyText,
                  });
                }else{
                    this.$router.back()
                }
            }
         
    },
    async approve() {
                const leaveId = this.$route.query.leaveId;
                const url = `leave/approval?auditReply=1`;
                const leaves = await this.$http.post(url,[Number(leaveId)]);
                console.log(leaves)
                this.$router.back()
    },
     async reject() {
                const leaveId = this.$route.query.leaveId;
                const url = `leave/approval?auditReply=0`;
                const leaves = await this.$http.post(url,[Number(leaveId)]);
                console.log(leaves)
                this.$router.back()
    },
    uploadSuccess(data){
        if(data){
          this.leavePath=data;
        }
    }
  },
  computed:{
    isReadlony(){
      return this.$route.query.leaveId?true:false;
    },
    isStudent(){
      return Util.isStudent(this);
    }
  },
  mounted(){
         const leaves = sessionStorage.getItem("leaves");
         const leaveId = this.$route.query.leaveId;
         if(!_.isEmpty(leaves)&&!_.isEmpty(leaveId)){
           const leave =  _.find(JSON.parse(leaves),(leave)=>{
               return leave.leaveId==leaveId;
            })
           this.leaveType = leave.leaveType;
           this.reason = leave.reason;
           this.leaveEndDate = leave.leaveEndDate;
           this.leaveStartDate = leave.leaveStartDate;
           this.leaveImg = [{"class":"index","src":leave.imgUrl}];
         }
  }
};
</script>
<style>
.cover{
  display: none
}
</style>


