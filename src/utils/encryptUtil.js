import {JSEncrypt} from "jsencrypt"
// import AJAX  from './AJAX';

let encryptUtil = {
  getPublicKey: function () {
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: '1111111',
        success: function (data) {
          resolve(data);
        },
        error: function (data) {
          reject();
        }
      });
    })
  },
  encryptStr: function (password, publicKey, noEnCode) {
    let data = "";
    //导入公钥
    if (publicKey.indexOf('-----') < 0) {
      publicKey = "-----BEGIN PUBLIC KEY-----" + publicKey + "-----END PUBLIC KEY-----";
    }
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);

    if (password instanceof Array) {
      password = password.join('|');
    }
    if (noEnCode) {
      data = encrypt.encrypt(password)
    } else {
      data = encodeURIComponent(encrypt.encrypt(password))
    }
    return data;
  },
  encryptLongStr: function (password, publicKey, noEnCode) {
    let data = "";
    //导入公钥
    if (publicKey.indexOf('-----') < 0) {
      publicKey = "-----BEGIN PUBLIC KEY-----" + publicKey + "-----END PUBLIC KEY-----";
    }
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);

    if (password instanceof Array) {
      password = password.join('|');
    }

    if (noEnCode) {
      data = encrypt.encryptLong(password)
    } else {
      data = encodeURIComponent(encrypt.encryptLong(password))
    }

    return data;
  },
  decryptStr: function (encryptedPwd, privateKey) {
    var decrypt = new JSEncrypt();
    decrypt.setPrivateKey(privateKey);
    return decrypt.decrypt(encryptedPwd);
  },
  isEncrypt: function (password, publicKey, noEnCode) {
    if (publicKey) {
      return this.encryptStr(password, publicKey, noEnCode);
    } else {
      if (password instanceof Array) {
        password = password.join('|');
      }
      return password;
    }
  }
}

module.exports = encryptUtil;
