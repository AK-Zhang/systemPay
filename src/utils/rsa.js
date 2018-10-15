const NodeRSA = require('node-rsa');

const RsaUtil = {
    encryptStr: function(password, publicKey){
        //导入公钥
        var clientKey = new NodeRSA({b: 512});
        clientKey.importKey(publicKey);
        if( !clientKey.isPublic() ){        //验证公钥是否正确
            console.log("导入RSA公钥失败!!");
            return null;
        }
        //加密
        return clientKey.encrypt(password, 'base64');
    },
    decryptStr: function(encryptedPwd, privateKey){
        var key=new NodeRSA({b:512});
        key.importKey(privateKey);
        if( !key.isPrivate() ){        //验证私钥是否正确
            console.log("导入RSA私钥失败!!");
            return null;
        }
        return key.decrypt(encryptedPwd, 'utf8');
    }
}




// 服务端生成密钥对 start
var key = new NodeRSA({b: 512});
var publicKey = key.exportKey('pkcs8-public');
var privateKey = key.exportKey('pkcs8-private');
console.log("公钥：" + publicKey);
console.log("私钥" + privateKey);
// 服务端生成密钥对 end

// 测试例子
var text = '123456';
/*var encrypted = RsaUtil.encryptStr(text, publicKey);
console.log('加密: ', encrypted);*/

var pbkey = "-----BEGIN PUBLIC KEY-----MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAOxW1Ae5l1GstKpd6ahVNQeh5MXVEEPccS9Ktv5/w0vTVzYyNm2BTbKFf1/voQARAAnvPb8/KWEN6rnZmkvRe/sCAwEAAQ==-----END PUBLIC KEY-----";
var priKey = "-----BEGIN PRIVATE KEY-----MIIBVgIBADANBgkqhkiG9w0BAQEFAASCAUAwggE8AgEAAkEA7FbUB7mXUay0ql3pqFU1B6HkxdUQQ9xxL0q2/n/DS9NXNjI2bYFNsoV/X++hABEACe89vz8pYQ3qudmaS9F7+wIDAQABAkEAjcGCyeNixMVvU+Sieqoo9ZwAST0D1YBKj1AkNMBTVo2U3/UDJgkTSAMI5PEGBrvQXdkvMHF/xyc6+EAc6p+5mQIhAPkgG+O911mQz1hEe4tZ7xxgg3KBs1fY95/zFW2NK87/AiEA8txkx0d7Xh2X9HQBJvD0oHLNuot2usQh3trHWGSqjwUCICQvPL3Mgi35MZShhcxMyMU3Y4BLRHBbDESIOzGJUrajAiEA1HWUQHW7alFvXu6hF2USTM9CRSC+xJLSorg4To76WtUCIQCWaOnLz5UYcS9zHnpa/YW7TqGutlUx4PbQfOFAY9Y3hg==-----END PRIVATE KEY-----"

var encrypted = RsaUtil.encryptStr(text, pbkey)
console.log("加密：" + encrypted);

var decrypted = RsaUtil.decryptStr(encrypted, priKey);
console.log('解密: ', decrypted);