<template>
<page>
            <menu-bar title="上海行健职业技术学院"/>
            <r-image :list="logo"/>
             <card>
                <r-input :model="name" placeholder="请输入手机号" :isPhone="true">
                  <span class="fa fa-phone" style="margin-left:10px;margin-right:10px;"/>
                </r-input>
                <r-input :model="password" placeholder="请输入密码" :isPassword="true">
                  <span class="fa fa-eye-slash"  style="margin-left:10px;margin-right:10px;"/>
                </r-input>
              </card>
              <tab-bar>
                  <cell type="row" :vertical="true">
                                <cell >
                                    <box >
                                    <r-button  link='/home'>登录</r-button>
                                    </box>
                                </cell>
                    </cell>
              </tab-bar>

</page>
</template>

<script>
import { Page, RImage, RButton,RInput, Cell,Card, Box, MenuBar,Divider,TabBar } from "rainbow-mobile-core";
import logo from "../assets/logo.png";
export default {
  components: {
    Page,
    RImage,
    RButton,
    Cell,
    Card,
    RInput,
    Box,
    MenuBar,
    Divider,
    TabBar
  },
  data() {
    return {
      logo: [
        {
          class: "logo",
          src: logo
        }
      ],
      name: null,
      password: null
    };
  },
  computed: {
    cardList() {
      return [
        {
          link: "/component/core",
          number: "40",
          text: this.$t("component.core")
        },
        {
          link: "/component/advanced",
          number: "16",
          text: this.$t("component.advanced")
        },
        {
          link: "/component/business",
          number: "1",
          text: this.$t("component.business")
        },
        {
          link: "/component/business",
          number: "1",
          text: this.$t("component.project")
        }
      ];
    }
  },
  mounted(){
        var md = new MobileDetect(window.navigator.userAgent);
        console.log( md.mobile() );          // 'Sony'  
        console.log( md.phone() );           // 'Sony'  
        console.log( md.tablet() );          // null  
        console.log( md.userAgent() );       // 'Safari'  
        console.log( md.os() );              // 'AndroidOS'  
        console.log( md.is('iPhone') );      // false  
        console.log( md.is('bot') );         // false  
        console.log( md.version('Webkit') );         // 534.3  
        console.log( md.versionStr('Build') );       // '4.1.A.0.562'  
        console.log( md.match('playstation|xbox') ); // false 
  }
};
</script>

<style lang="less">
.logo  img {
  width: 40% !important;
}
.logo {
  text-align: center;
  margin-top: 15px;
}
.login-page {
  height: 100%;
}

</style>
