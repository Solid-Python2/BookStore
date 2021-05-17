import ajax from "./ajax";

const BASE_URL = 'http://localhost:8080/'

//初始化订单
export const reqInitOrder = (ids,from,username) => ajax(BASE_URL+"dto/initOrder/",{ids,from,username})

//提交订单 addOrder
export const reqAddOrder = (orderInitDto) => ajax(BASE_URL+"order/addOrder/", {
  username: orderInitDto.username,
  bookList: orderInitDto.bookList,
  expense: orderInitDto.expense,
  address: orderInitDto.address
},"POST")

//管理员得到订单列表
export const reqAdminGetOrderList = (page,pageSize) => ajax(BASE_URL+"order/getAdminOrderList/",{page,pageSize})
export const reqAdminSearchGetOrderList = (page,pageSize,orderId,username,orderStatus) => ajax(BASE_URL+"order/getAdminSearchOrderList/",{page,pageSize,orderId,username,orderStatus})
export const reqOrderStatusList =  ()=> ajax(BASE_URL+"order/getOrderStatusList/")

//管理员得到订单的明细getOrderDto
export const reqAdminGetOrderDetail = (id) => ajax(BASE_URL+"dto/getOrderDto/",{id})

//删除订单
export const reqDelOrder = (id) => ajax(BASE_URL+"order/delOrder/",{id},'DELETE')
export const reqAdminDelOrder = (id) => ajax(BASE_URL+"order/delAdminOrder/",{id},'DELETE')

//发货deliverOrder
export const reqDeliverOrder = (id,logisticsCompany) => ajax(BASE_URL+"order/deliverOrder/",{id,logisticsCompany},'PUT')

//普通用户得到自己的订单列表getUserOrderList
export const reqUserGetOrderList = (username,page,pageSize,orderStatus,beUserDelete) => ajax(BASE_URL+"dto/getUserOrderList/",{username,page,pageSize,orderStatus,beUserDelete})

//修改订单状态modifyOrderStatus
export const reqModOrderStatus = (id,orderStatus) => ajax(BASE_URL+"order/modifyOrderStatus/",{id,orderStatus},'PUT')

//得到时间筛选后的订单统计信息
export const reqGetOrderStatistic = (beginDate,endDate) => ajax(BASE_URL+"/order/date/",{beginDate,endDate})
