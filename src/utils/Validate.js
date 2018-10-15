import {
   showTips
 } from '../actions';

const Validate = {
    //手机号码
    checkTel: function(val){
        return {
          result:function(){
            return /^1\d{10}$/.test(val)
          },
          msg:'请输入正确的手机号'
        };
    },
    //是否为空
    chekEmpty:function(val){
      return {
          result:function(){
            return val !== '';
          },
          msg:'请输入内容'
        };
    },
    //校验金额
    checkAmount: function(val){
      return {
        result:function(){
          return /^[1-9]\d*(\.\d{1,2})?$|^0\.[1-9]\d?$|^0\.0[1-9]$/.test(val)
        },
        msg:'请输入正确的金额'
      };
    },
    //银行卡检验
    checkBankCard: function(val){
        return {
          result:function(){
            return /^\d{13,19}$/.test(val)
          },
          msg:'请输入正确银行卡号'
        };
    },
    //银行卡有效期校验
    checkExpiry: function(val){
        return {
          result:function(){
            return /^((1[0-2])|(0?[1-9]))\/\d{2}$/.test(val)
          },
          msg:'请输入正确的有效期'
        };
     },
    //短信码校验
    checkSmsCode: function(val){
         return {
          result:function(){
            return /^\d{6}$/.test(val)
          },
          msg:'请输入正确的验证码'
        };
    },
    //身份证校验
    checkIdCardNo:function(val){
       return {
          result:function(){
            //15位或18位
            return /^\d{15}|(\d{17}(\d|x|X))$/.test(val)
          },
          msg:'请输入正确的身份证号码'
        };
    },
    //邮箱校验
    checkEmail: function(val){
      return {
          result:function(){
            return /^['_A-Za-z0-9-]+(\.['_A-Za-z0-9-]+)*@([A-Za-z0-9-])+(\.[A-Za-z0-9-]+)*((\.[A-Za-z0-9]{2,})|(\.[A-Za-z0-9]{2,}\.[A-Za-z0-9]{2,}))$/.test(val);
          },
          msg:'请输入正确的邮箱'
      };
    }
}

const validateAll = function(opt){

  this.el = opt.el || '';
  this.rules = opt.rules || '' ;
  this.dispatch = opt.dispatch || '';
  this.success = opt.success || '';
  this.fail = opt.fail || '';
  
  this.error  = false ;
  this.data = {};

  this.init();
}

validateAll.prototype = {

  init() {

    if( this.el && this.rules  ){
      var _validate = this.el.querySelectorAll('[data-rules]');

      _validate = [].slice.call(_validate);
      
      this.check(_validate);
    }

  },
  check(arr) {

    arr.forEach((target,index)=>{  
      
      const value = target.value ;
      const name = target.name ;
      const rulesName = target.getAttribute('data-rules') ;
      const rulesCont = this.rules[rulesName]
      
      this.data[name] = value;

      if( rulesCont && !this.error ){
        const _name = rulesCont.name
        _name.forEach((target)=>{
          const _type = Validate[target] ;
          if( _type &&  !this.error ){
            if( _type(value).result() ){
                rulesCont.callback && rulesCont.callback(true)
            }else{
                if( !rulesCont.tipsHide && this.dispatch ){
                  this.dispatch(showTips(rulesCont.msg ? rulesCont.msg : _type(value).msg))
                } 
                rulesCont.callback && rulesCont.callback(false);
                this.error = true;
                if( this.error ){
                   this.data = {};
                   this.fail && this.fail.call(this); 
                }
            }
          }
        })

        if( arr.length-1 == index && !this.error ){
          this.success && this.success.call(this,this.data); 
        }
      }

    })

  }

}



Validate.init = function(el, rules, msg){
    new validateAll(el, rules, msg);
  }


module.exports = Validate ;