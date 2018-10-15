# 用户认证接口

## 1 验证身份证  GET /auth/validateIdCard

### 1.1 访问权限：登录后 

### 1.2 访问方式：

AJAX

### 1.3 使用场景：

用户注册,用于手机验证码的验证和用户点击注册按钮不在同一步的时候

### 1.4 请求参数

| 名称           | 类型     | 是否必填 | 描述                     |
| ------------ | ------ | ---- | ---------------------- |
| contactIdCard | string | 是    | 身份证号                 |
| contactName   | string | 是    | 姓名                  |


### 1.5 返回 Json

```json
{
  "success":true,
}
```

如果失败，则返回

```json
{
    "success":false,
    "message":"40004:短信验证码不正确"
}
```
