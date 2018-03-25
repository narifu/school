
export default {
    getIdentityId(self){
        const id = self.$route.params.identityId;
        if(_.isEmpty(id)){
          const user = JSON.parse(sessionStorage.getItem("user"));
          if(!_.isEmpty(user)){
            return user.identityId;
          }
        }else{
          return id;
        }
    },
    isStudent(self){
      const user = JSON.parse(sessionStorage.getItem("user"));
      if(!_.isEmpty(user)){
        return user.userType==0?true:false;
      }
  },
}
