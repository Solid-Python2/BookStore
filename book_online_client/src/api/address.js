import ajax from "./ajax";

const BASE_URL = 'http://localhost:8080/user'

//添加地址
export const reqAddAddress = (data) => ajax(BASE_URL+'/addUserAddress/', data, 'POST')

//修改地址
export const reqModAddress = (data) => ajax(BASE_URL+"/modifyUserAddress/",data,'PUT')

//删除地址
export const reqDelAddress = (id) => ajax(BASE_URL+"/delUserAddress/",{id},'DELETE')

//得到某个用户的地址列表
export const reqGetAddressList = (username) => ajax(BASE_URL+"/getUserAddress/",{username})
