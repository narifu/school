<template>
  <page>
      <top :title="_title" :showBack="true"/>
      <div id="container" class="map"></div>
                      <toast :model="this" value="showFlag" :text="toastText" :type='type'/>

       <tab-bar>
            <cell type="row" :vertical="true">
                        <cell >
                            <div class='location-name'>{{locationName}}</div>
                        </cell>
                        <cell >
                            <box >
                                <r-button :onClick="click" >{{_share}}</r-button>
                            </box>
                        </cell>
            </cell>
       </tab-bar>
  </page>
</template>

<script>
import {
  Page,
  RBody,
  RImage,
  RButton,
  Cell,
  Box,
  MenuBar,
  Grid,
  Card,
  RTable,
  TabBar,
  Toast
} from "rainbow-mobile-core";
import Top from "../components/Top.vue";

export default {
  components: {
    Top,
    Page,
    Card,
    Box,
    RButton,
    RTable,
    Cell,
    TabBar,
    RBody,
    Toast
  },
  data() {
    return {
      locationName: null,
      latitude: null,
      longitude: null,
      showFlag:false,
      toastText:"",
      type:"success",
    };
  },
  computed:{
      _title(){
        const shareId = this.$route.query.shareId;
        return shareId?"位置响应":"签到详情"
      },
      _share(){
        const shareId = this.$route.query.shareId;
        return shareId?"响应":"签到"
      }
  },
  methods: {
    async click() {
      const param = {
        "id": this.$route.query.shareId,
        "sharedLongitude": this.longitude,
        "sharedLatitude": this.latitude,
        "sharedAddress": this.locationName
      };
      const status = await this.$http.post(`location/sharing/response`,param);
      if(status){
        this.toastText="响应成功";
        this.showFlag=true;
        // this.$router.back()

      }else{
        this.toastText="响应失败";
        this.type = "warn";
        this.showFlag=true;
      }
    }
  },
  mounted() {
    const self = this;
    const map = new BMap.Map("container");
    //var point = new BMap.Point(116.331398,39.897445);
    //map.centerAndZoom(point,12);

    map.disableDragging(); //禁止拖拽

    var myGeo = new BMap.Geocoder();

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(
      function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          map.centerAndZoom(r.point, 16);
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
          myGeo.getLocation(r.point, function(result) {
            if (result) {
              self.longitude = r.longitude;
              self.latitude = r.latitude;
              self.locationName = result.address;
            }
          });

          //mk.enableDragging();

          mk.addEventListener("dragend", function(e) {
            // alert("当前位置：" + e.point.lng + ", " + e.point.lat);
            myGeo.getLocation(e.point, function(result) {
              if (result) {
                self.locationName = result.address;
              }
            });
          });
          mk.addEventListener("click", function() {
            var p = mk.getPosition(); //获取marker的位置
            // alert("marker的位置是" + p.lng + "," + p.lat);
            myGeo.getLocation(p, function(result) {
              if (result) {
                self.locationName = result.address;
              }
            });
          });
        } else {
          alert("failed" + this.getStatus());
        }
      },
      { enableHighAccuracy: true }
    );

    // var navigationControl = new BMap.NavigationControl({
    //   // 靠左上角位置
    //   anchor: BMAP_ANCHOR_TOP_LEFT,
    //   // LARGE类型
    //   type: BMAP_NAVIGATION_CONTROL_LARGE,
    //   // 启用显示定位
    //   enableGeolocation: true
    // });
    // map.addControl(navigationControl);
  }
};
</script>

<style>
#container {
  height: 812px;
}
.location-name {
  font-size: 16px;
  text-align: center;
}
</style>

