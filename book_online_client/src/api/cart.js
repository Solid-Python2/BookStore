import ajax from "./ajax";

const BASE_URL = 'http://localhost:8080/cart'

//添加图书到购物车
export const reqAddCart = (username,bookId,num) => ajax(BASE_URL+'/addCart/', {username,bookId,num},'POST')

//从购物车中删除指定商品
export const reqDelCart = (username,id) => ajax(BASE_URL+'/delCart/', {username,id},'DELETE')

//批量删除购物车中的商品
export const reqBatchDelCart = (username,ids) => ajax(BASE_URL+'/batchDelCart/', {username,ids},'DELETE')

//修改购物车中指定图书的数量
export const reqModCart = (username,id,num) => ajax(BASE_URL+'/modifyCart/', {username,id,num},'PUT')

//得到购物车中图书列表
export const reqGetCartList = (username,page,pageSize) => ajax(BASE_URL+'/getCartList/', {username,page,pageSize})
