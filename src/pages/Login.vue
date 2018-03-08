<template>
<page>
            <r-header title="上海行健职业技术学院"/>
            <r-body>
            <r-image :list="logo"/>
             <card>
                <r-input :model="user" value="name" placeholder="请输入手机号" :isPhone="true">
                  <span class="fa fa-phone" style="margin-left:10px;margin-right:10px;"/>
                </r-input>
                <r-input placeholder="请输入密码" :isPassword="true" :model="user" value="password">
                  <span class="fa fa-eye-slash"  style="margin-left:10px;margin-right:10px;"/>
                </r-input>
              </card>
            </r-body>
              <tab-bar>
                  <cell type="row" :vertical="true">
                                <cell >
                                    <box >
                                    <r-button  :onClick="login">登录</r-button>
                                    </box>
                                </cell>
                    </cell>
              </tab-bar>

</page>
</template>

<script>
import { Page, RImage,RBody, RButton,RInput, Cell,Card, Box, RHeader,Divider,TabBar } from "rainbow-mobile-core";
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
    RHeader,
    Divider,
    TabBar,
    RBody
  },
  data() {
    return {
      logo: [
        {
          class: "logo",
          src: logo
        }
      ],
      user:{
            name: null,
            password: null
      }
    };
  },
  methods: {
    login(){
            // const url = `user/login?userName=${this.user.name}&password=${this.user.password}`;
                        const url = `location/sharing/count?studentNo=1`;

            this.$http.get(url).then((res)=>{
                console.log(res)
                this.$router.push({"name":"Home"});
            },(error)=>{
                console.error(error);
            });

            //  AjaxUtil.call("http://118.190.96.118:8080/exercitation-app/user/login?userName=null&password=null").then((res)=>{
            //     console.log(res)
            // },(error)=>{
            //     console.log(error);
            // });
    }
  },
  mounted(){
    
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
