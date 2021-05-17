import axios from 'axios'
// 包装的axios ajax请求接口
function ajax1 (url, data={}, method='GET') {
  return new Promise(function (resolve, reject) {
    let promise
    console.log(data)
    if (method === 'GET') {
      // 准备url query参数数据
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }

      promise = axios.get(url)
    } else {
      promise = axios.post(url, data)
    }

    promise.then(function (response) {
      resolve(response)
    }).catch(function (error) {
      reject(error)
    })
  })
}
import ajax from "./ajax";
export const BASE_URL = 'http://localhost:8080'

//登录
export const reqLogin = ({username, password}) => ajax1(BASE_URL+'/user/login/', {username, password}, 'POST')

// 检测该邮箱账号是否已经被注册
export const reqAccountVerify = ({username})=>ajax(BASE_URL+'/user/usernameVerify/',{username})

// 注册账号
export const reqRegister = (username,password)=>ajax(BASE_URL+'/user/register/',{username,password},'POST')

//getUserList得到用户列表
export const reqGetUserList = (page,pageSize)=>ajax(BASE_URL+'/user/getUserList/',{page,pageSize})

//getUserList得到用户列表
export const reqGetSearchUserList = (search,page,pageSize)=>ajax(BASE_URL+'/user/reqGetSearchUserList/',{search,page,pageSize})

//修改用户的的禁用状态
export const reqModifyUserStatus = (id,status)=>ajax(BASE_URL+'/user/modifyUserStatus/',{id,status},'PUT')

//得到用户的基本信息getUserInfo
export const reqGetUserInfo = ({username})=>ajax(BASE_URL+'/user/getUserInfo/',{username})
//修改个人信息
export const reqUpdateUserInfo=(data,headers)=>ajax(BASE_URL+'/user/updateUserInfo/',data,'PUT',headers)
//修改密码
export const reqModUserPwd = (username,oldPassword,newPassword)=>ajax(BASE_URL+'/user/modifyUserPwd/',{username,oldPassword,newPassword},'POST')

