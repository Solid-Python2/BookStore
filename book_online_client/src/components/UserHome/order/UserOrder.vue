<template>
  <div class="content">
    <h1>我的订单</h1>
    <div class="box_info">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部有效订单" name="first">
          <div class="tab_box" v-show="total<1">
            <p class="noMesInfo" v-show="true">暂无数据</p>
          </div>
          <div class="tab_box" v-show="total>0">
            <div class="order_list" v-for="order in orderList">
              <div class="order_summary">
                <p class="order_status">{{order.orderStatus}}</p>
                <p class="caption-info">
                  {{order.orderTime}}
                  <span>|</span>
                  {{order.address.name}}
                  <span>|</span>
                  订单号：{{order.orderId}}

                  <span style="float: right">实付金额： <span class="money">{{order.expense.finallyPrice}} </span>元</span>
                </p>
              </div>
              <div class="bookInfo">
                <div class="book_item">
                  <el-image class="bookImg" v-for="(img,index) in order.coverImgList" :src="img" :key="index" fit="fill"></el-image>
                </div>
                <div class="book_action">
                  <button class="plainBtn" @click="goToOrderDetail(order.id)">订单详情</button>
                  <br>
                  <button class="plainBtn">申请售后</button>
                  <br>
                  <button class="plainBtn">联系客服</button>
                  <br>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待支付" name="second">
          <div class="tab_box">
            <p class="noMesInfo" v-show="true">暂无数据</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待收货" name="third">
          <div class="tab_box" v-show="total<1">
            <p class="noMesInfo" v-show="true">暂无数据</p>
          </div>
          <div class="tab_box" v-show="total>0">
            <div class="order_list" v-for="order in orderList">
              <div class="order_summary">
                <p class="order_status">{{order.orderStatus}}</p>
                <p class="caption-info">
                  {{order.orderTime}}
                  <span>|</span>
                  {{order.address.name}}
                  <span>|</span>
                  订单号：{{order.orderId}}

                  <span style="float: right">实付金额： <span class="money">{{order.expense.finallyPrice}} </span>元</span>
                </p>
              </div>
              <div class="bookInfo">
                <div class="book_item">
                  <el-image class="bookImg" v-for="(img,index) in order.coverImgList" :src="img" :key="index" fit="fill"></el-image>
                </div>
                <div class="book_action">
                  <button class="plainBtn" @click="goToOrderDetail(order.id)">订单详情</button>
                  <br>
                  <button class="plainBtn" @click="getOrder(order.id)">确认收货</button>
                  <br>
                  <button class="plainBtn">联系客服</button>
                  <br>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="订单回收站" name="four">
          <div class="tab_box" v-show="total<1">
            <p class="noMesInfo" v-show="true">暂无数据</p>
          </div>
          <div class="tab_box" v-show="total>0">
            <div class="order_list" v-for="order in orderList">
              <div class="order_summary">
                <p class="order_status">{{order.orderStatus}}</p>
                <p class="caption-info">
                  {{order.orderTime}}
                  <span>|</span>
                  {{order.address.name}}
                  <span>|</span>
                  订单号：{{order.orderId}}

                  <span style="float: right">实付金额： <span class="money">{{order.expense.finallyPrice}} </span>元</span>
                </p>
              </div>
              <div class="bookInfo">
                <div class="book_item">
                  <el-image class="bookImg" v-for="(img,index) in order.coverImgList" :src="img" :key="index" fit="fill"></el-image>
                </div>
                <div class="book_action">
                  <button class="plainBtn" @click="goToOrderDetail(order.id)">订单详情</button>
                  <br>
                  <button class="plainBtn">申请售后</button>
                  <br>
                  <button class="plainBtn">联系客服</button>
                  <br>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="margin: 10px 0px 20px;width: 100%" v-show="total>0">
      <div class="block" style="float: right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="page_size"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
// <!--  reqUserGetOrderList-->
    import {reqUserGetOrderList,reqModOrderStatus} from "../../../api/order";
// <!--用户订单页面-->
    export default {
        name: "UserOrder",
        data() {
            return {
                activeName: 'first',
                currentPage: 1,
                page_size: 5,
                total:20,
                orderList:[
                    {
                        id:null,
                        orderId:null,
                        username:null,
                        orderTime:null,
                        shipTime:null,
                        getTime:null,
                        evaluateTime:null,
                        closeTime:null,
                        confirmTime:null,
                        orderStatus:null,
                        logisticsNum:null,
                        coverImgList:[],
                        orderDetailDtoList:[
                            {
                                book:{
                                    id: null,
                                    bookName: '',
                                    author: '',
                                    isbn: '',
                                    publish: '',
                                    birthday: '',
                                    marketPrice: '',
                                    price: '',
                                    stock: '',
                                    description: '',
                                    put: true,
                                    coverImg: '',
                                    rank: '',
                                },
                                num:1,
                                price: 0.0,
                            }
                        ],
                        expense:{
                            orderId:null,//订单编号
                            productTotalMoney:null,//商品总价
                            freight:null,//运费 默认为0元
                            coupon:null,//优惠券 默认为0元
                            activityDiscount:null,//活动优惠 默认为0元
                            allPrice:null,//订单总金额
                            finallyPrice:null,//最终实付总额
                        },
                        address:{
                            id: 1,
                            username: "黄小龙",
                            name: "小胖",
                            phone: "18988798892",
                            addr: "江西抚州市临川区西大街街道东华理工大学长江学院本部(330006)",
                            label: "家",
                            off: false,
                        }
                    },
                ],
                orderStatus: "",
                beUserDelete: 0
            };
        },
        created(){
          this.getOrderList(1,5);
        },
        methods: {
            handleClick(tab, event) {
                console.log("=====this.activeName===="+this.activeName+"=======");
                switch (this.activeName) {
                    case "first":
                        this.orderStatus="";
                        this.beUserDelete=0;
                        break;
                    case "third":
                        this.orderStatus="已发货";
                        this.beUserDelete=0;
                        break;
                    case "four":
                        this.orderStatus="";
                        this.beUserDelete=1;
                        break;
                }
                console.log("=====this.orderStatus====="+this.orderStatus+"======")
                this.getOrderList(1,5);
            },

            //跳转到订单明细页面
            goToOrderDetail(id) {
                console.log("=====跳转到订单详情页========")
                this.$router.push({
                    path:'/user/userOrderDetail',
                    query: {
                        id: id
                    }
                });
            },
            //分页函数
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.page_size = val;
                this.getOrderList(1,this.page_size);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                console.log(this.currentPage+":"+this.page_size);
                this.getOrderList(this.currentPage,this.page_size);
            },
            //得到订单列表
            getOrderList(page,pageSize){
                let username= this.$store.getters.getUser.username;
                reqUserGetOrderList(username,page,pageSize,this.orderStatus,this.beUserDelete).then(response=>{
                    if(response.code==200){
                        this.total = response.total;
                        console.log(this.total);
                        this.orderList = response.orderDtoList;
                        console.log(this.orderList)
                    }else {
                        this.$message({
                            message: response.message,
                            type: "warning"
                        })
                    }
                }).catch(err=>{
                    this.$message({
                        message: "获取用户订单出错了",
                        type: "warning"
                    })
                })
            },

            //进行订单收货
            getOrder(id){
                this.$confirm('确认收货码?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    reqModOrderStatus(id,"已收货").then(response=>{
                        if(response.code==200){
                            this.$message({
                                message: response.message,
                                type: "success"
                            })
                        }else {
                            this.$message({
                                message: response.message,
                                type: "warning"
                            })
                        }
                    }).catch(err=>{
                        this.$message({
                            message: "确认收货出错了",
                            type: "warning"
                        })
                    })
                }).catch(()=>{
                    this.$message({
                        message: "取消确认收货",
                        type: "warning"
                    })
                });
            },
        }
    }
</script>

<style scoped>

  .content{
    margin: 10px auto;
    width:1000px;
    background-color: white;
    padding: 30px 20px;
  }
  h1{
    color: #757575;
    font-family: 新宋体;
  }
  .box_info{
    width: 960px;
    margin: 10px auto;
  }
  /deep/ .el-tabs__item {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #757575;
  }
  .tab_box{
    width:960px;
  }

  .order_list{
    border: 1px #f3f0e9 solid;
    margin: 12px auto;
    width: 960px;
    height: 250px;
    max-height: 240px;
    line-height: 35px;
    border: 1px solid #cacaca;
  }
  .order_summary{
    width: 960px;
    height: 105px;
    padding: 15px 25px;
    border-bottom: 1px solid #e7e7e7;
  }
  .order_status{
    font-size: 22px;
    color: #757575;
  }
  .caption-info{
    font-size: 14px;
    color: #757575;
  }
  .money{
    font-size: 23px;
    color: black;
  }
  .bookInfo{
    width: 960px;
    height: 145px;
    padding: 15px 25px;
  }
  .book_item{
    width: 660px;
    height: 105px;
    float: left;
  }
  .bookImg{
    float: left;
    margin-top: 10px;
    width: 60px;
    height: 85px;
    margin-right: 15px;
  }
  .book_detail{
    margin: 25px 20px;
    height: 55px;
    line-height: 27.5px;
    float: left;
    font-size: 14px;
  }
  .book_action{
    width: 250px;
    font-size: 14px;
    color: #757575;
    float: left;
    height: 105px;
  }
  .plainBtn{
    width: 120px;
    height: 30px;
    margin: 2px 0px;
    background-color: white;
    color: #757575;
    border: 1px #cacaca solid;
    float: right;
  }
  .plainBtn:hover{
    border: 1px #393a42 solid;
    background-color: #e7e7e7;
  }
  .noMesInfo{
    text-align: center;
    font-size: 18px;
    color: #757575;
    line-height: 60px
  }

</style>
