export default function(Vueinit) {
  var push = api.require('push');
  push.bind({
      userName:'testName',
      userId:'testId'
  },function(ret,err){
      if(ret.status){
          api.alert({msg:'绑定成功'});
      }else{
          api.alert({msg:err.msg});
      }
  });
  Vueinit();
}
