<template>
  <page>
             <top title="消息详情" :showBack="true"/>
             <r-body>
              <card>
                  <r-input title="标题" :model="this" value="title" :readonly="true"/>
                  <r-textarea :readonly="true" placeholder="消息详情" :model="this" value="content" :height="517" :max="300"></r-textarea>
              </card>
             </r-body>
  </page>
</template>

<script>
import {
  Page,
  RTextarea,
  Card,
  RInput,
  RBody
} from "rainbow-mobile-core";
import Top from "../components/Top.vue";
export default {
  components: {
    Top,
    Page,
    Card,
    RTextarea,
    RInput,
    RBody
  },
  data() {
    return {
      title: this.$route.query.title,
      content:  this.$route.query.content,
    };
  },
  methods: {
    onChange() {}
  },
  async mounted(){
              const id = this.$route.query.id;
              const url = 'message/readed?messageId='+id;
              const resault = await this.$http.get(url);
              if(!_.isEmpty(resault.body)){
                          ConfirmApi.show(this,{
                            content: '更新消息失败',
                           });
               }
               document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
};
</script>


