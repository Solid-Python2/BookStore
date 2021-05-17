<template>
  <div class="gallery-book">
    <div class="gallery-book_list">
      <div class="gallery-book_card" v-for="item in bookList" :key="item.id">
        <router-link :to="{path: '/book',query:{id:item.id}}">
          <el-image
            style="width: 82%; height: 190px;margin:5px 9%"
            :src="item.coverImg"
            fit="fill"></el-image>
          <div style="width: 86%;margin: 0px 7%">
            <a href="#" class="gallery-book_text">
              {{item.bookName}}
            </a>
            <div class="gallery-book_author">
              {{item.author}}
            </div>
            <div class="gallery-book_price">
              <span style="font-size:14px;color: #bf7f5f;">￥</span>
              {{item.price}}
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import {reqGetRecBookList} from "../../api/book";

  export default {
    name: "NewBook",
    data() {
      return {
        bookList: [],
      };
    },
    methods: {

      getBookList() {
        reqGetRecBookList("newPut").then(response => {
          if (response.code == 200) {
            console.log(response.bookList)
            this.bookList = response.bookList;
            console.log(this.bookList)
          } else {
            this.$message({
              type: 'warning',
              message: response.message
            })
          }
        }).catch(err => {
          this.$message({
            type: 'warning',
            message: "获取图书列表数据失败"
          })
        })
      }
    },
    created() {
      this.getBookList();
    }
  }
</script>

<style scoped>

  .gallery-book_list {
    width: 100%;
  }

  .gallery-book_card {
    width: 18%;
    margin: 3px 1%;
    height: 290px;
    border: 1px solid #e4e4e4;
    display: inline-block;
  }

  .gallery-book_card:hover {
    border: 1px #d9d9d9 solid;
    box-shadow: 0px 0px 6px #9a9a9a;
  }

  .gallery-book_text {
    display: block;
    width: 100%;
    font-size: 12px;
    color: #333;
    word-break: break-all;
    max-height: 40px;
    line-height: 20px;
    overflow: hidden;
    margin: 0 auto;
  }

  .gallery-book_author {
    width: 98px;
    height: 22px;
    overflow: hidden;
    margin: 0;
    color: #999;
    font-size: 12px;
  }

  .gallery-book_price {
    float: left;
    font-style: normal;
    margin-right: 3px;
  }

  .gallery-book {
    width: 100%;
    font-family: 微软雅黑;
  }

  a {
    font-size: 16px;
    text-decoration: none;
  }

</style>
