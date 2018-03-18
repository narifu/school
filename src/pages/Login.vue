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
                        <toast :model="user" value="showFlag" :text="toastText" type='warn'/>

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
import { Page, RImage,RBody, Toast,RButton,RInput, Cell,Card, Box, RHeader,Divider,TabBar } from "rainbow-mobile-core";
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
    RBody,
    Toast
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
            name: 'huxiangting',
            password: "111111",
            showFlag:false
      },
      toastText:""
    };
  },
  methods: {
    async login(){

          if(_.isEmpty(this.user.name)){
                this.toastText="手机号不能为空";
                this.user.showFlag = true;
          }else if(_.isEmpty(this.user.password)){
                this.toastText="密码不能为空";
                this.user.showFlag = true;
          }else{
            // localStorage.setItem('auth.jwt_token',"111111");
                            // this.$router.push({"name":"Home"});
                  const url = `user/login?userName=${this.user.name}&password=${this.user.password}`;
                  const login = await this.$http.get(url);
                  console.log(login)
                  if(login.body.success){
                    sessionStorage.setItem("user",JSON.stringify(login.body.userInfo));
                    sessionStorage.setItem("functions",JSON.stringify(login.body.functions));
                    this.$router.push({"name":"Home","params":{identityId:login.body.userInfo.identityId,functions:login.body.functions}});
                  }else{
                    this.toastText= login.body.message;
                    this.user.showFlag = true;
                  }
          }

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
