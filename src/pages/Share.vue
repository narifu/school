<template>
  <page>
      <top title="位置共享" :showBack="true"/>
      <r-body>
                    <card>
                                <r-table :data="data" />
                    </card> 
      </r-body>          
  </page>
</template>

<script>
import { Page, RBody,RImage, RButton,TabBar, Cell, Box, MenuBar,Grid,Card,RTable} from "rainbow-mobile-core";
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
    RBody
  },
  data() {
    return {
       data:{
        "head":[
          [{'text':'时间'},{'text':'发起人'},{'text':'响应结果'}]
        ],
        "body":[
        ]
      },
    };
  },
  computed :{
    
    
  },
  async mounted(){
            const identityId = Util.getIdentityId(this);
            let param = {"studentNos":[identityId],"status":0,"pageNo":1,"pageSize":5};
            let url = "location/sharing/list";
            const shareList= await this.$http.post(url,param);
            const List = [];
            _.each(shareList.body,(share)=>{
              const _share = [];
              _share.push({"text":share.updateTime});
             _share.push({"text":share.fkSharedRecordCreater});
             _share.push({'text':'点击响应','link':'/location/detail?id='+share.id});
              List.push(_share)
            });
            this.data.body = List;
  }




};
</script>


?studentNos={studentNos}&startDate={startDate}&endDate={endDate}&status={responseStatus}