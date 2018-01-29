<template>
<page>
            <menu-bar title="登录"/>
            <r-image :list="logo"/>
             <card>
            <cell type="row" :vertical="true">
                        <cell top='0px'>
    <x-input title="账号" v-model="name" placeholder="请输入手机号">
      <span class="fa fa-phone" slot="label" style="margin-left:10px;margin-right:10px;"/>
    </x-input>
                        </cell>
                        <cell top='0px'>
    <x-input title="密码" v-model="password" placeholder="请输入密码">
      <span class="fa fa-eye-slash" slot="label" style="margin-left:10px;margin-right:10px;"/>
      
    </x-input>
                        </cell>
                      
            </cell>
              </card>

               
              <tab-bar>
          <cell type="row" :vertical="true">
                        <cell top='0px'>
                   <box padding='10px 20px'>
                  <r-button type="primary" link='/home'>登录</r-button>
                   </box>
                        </cell>
            </cell>
       </tab-bar>

</page>
</template>

<script>
import { Page, RImage, RButton, Cell,Card, Box, MenuBar,Divider,TabBar } from "rainbow-mobile-core";
import { XInput } from "vux";
import logo from "../assets/logo.png";
export default {
  components: {
    Page,
    RImage,
    RButton,
    Cell,
    Card,
    XInput,
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
  }
};
</script>

<style lang="less">
.logo > img {
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
