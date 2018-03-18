<template>
  <page>
      <top title="签到详情" :showBack="true"/>
      <div id="container" class="map"></div>

       <tab-bar>
            <cell type="row" :vertical="true">
                        <cell >
                            <div class='location-name'>{{locationName}}</div>
                        </cell>
                        <cell >
                            <box >
                                <r-button :onClick="click" >签到</r-button>
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
  TabBar
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
    RBody
  },
  data() {
    return {
      locationName: null,
      latitude: null,
      longitude: null
    };
  },
  methods: {
    async click() {
      const param = {
        id: this.$route.query.id,
        longitude: this.longitude,
        latitude: this.latitude,
        address: this.locationName
      };
      const status = await this.$http.post(`location/sharing/response`,param);
      console.log(status)
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

