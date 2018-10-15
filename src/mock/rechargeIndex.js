module.exports = function(){
    return {
        "code": "00000", 
        "msg": "成功",
        "data": {
        	"telphone":'13191110000',
        	"tagCardNum":"1",
        	"cardNum":"1",
        	"isWhite":true,
        	"pin":"1",
        	"rechargeCardList":[
        		{
        			activate: true,
                    activeTag: 0,
                    bankCardId: 61364,
                    bankCardTailNumber: "0385",
                    bankCardType: 1,
                    bankCode: "CGB",
                    bankCodeEn: "CGB",
                    bankName: "广发银行",
                    bankcardTel: "15004001003",
                    cofferTagCard: false,
                    defaultCard: false,
                    exprSignType: "ONE_AFFIRM",
                    isCardHolder: true,
                    name: "知不道三",
                    tagRechargeCard: true,
                    withdrawFlag: false,
                    withrechargeFlag: true
        		},
                {
                    activate: false,
                    activeTag: 0,
                    bankCardId: 61464,
                    bankCardTailNumber: "3412",
                    bankCardType: 1,
                    bankCode: "CGB",
                    bankCodeEn: "CGB",
                    bankName: "广发银行",
                    bankcardTel: "15004001003",
                    cofferTagCard: false,
                    defaultCard: false,
                    exprSignType: "EVERY_AFFIRM",
                    isCardHolder: true,
                    name: "知不道三",
                    tagRechargeCard: false,
                    withdrawFlag: false,
                    withrechargeFlag: true
                },
        		{
        			"bankName":"成都银行",
        			"bankCode":"GDB",
        			"name":"小成",
        			"bankcardTel":"13191110000",//卡绑定手机号
        			"bankCardTailNumber":"2201",//银行卡尾号 后四位
        			"bankCardType":"1001",//1001 信用卡 1002储蓄卡
        			"bindType":"1001" ,// 银行卡绑定类型 1001 "普通绑定",1002 "开通快捷",1003 "完整绑定"
        			"defaultCard":false,//是否默认银行卡
        			"isActivate":true, //银行卡是否激活
        			"activeTag":0, //资金标签 0/1
        			"delayTime":'2016-10-30',//到账时间
        			"withdrawFlag":true,//是否可以提现
        			"withrechargeFlag":true,//是否可以充值
        			"isTagDrawCard":true,//是否标签提现卡
        			"isTagRechargeCard":true //是否标签充值卡
        		}
        	]
        }
    }
}