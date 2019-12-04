<template>
  <div>
    <!-- 新闻html -->
    <div v-html="message"></div>
    <!-- 评论添加部分 -->
    <div class="comment-container">
      <div class="title">评论</div>
      <div class="comment-form">
        <div class="avatar-box">
          <el-avatar
            shape="circle"
            :size="35"
            src="http://hbimg.huabanimg.com/f6ee1b095215b8c2955fd07e56e2739b2671cd3579f0d-5feCNB_fw658"
          ></el-avatar>
        </div>
        <div class="form-box">
          <div class="input-box">
            <el-input
              ref="commentInput"
              @focus="showBtn"
              maxlength="200"
              show-word-limit
              type="textarea"
              autosize
              v-model="commentValue"
              placeholder="输入评论..."
            ></el-input>
          </div>
          <div class="btn-box">
            <el-button
              :loading="sendLoading"
              class="send-btn"
              v-show="btnShow"
              size="medium"
              type="primary"
              @click="sendComment"
            >评论</el-button>
          </div>
        </div>
      </div>
      <div class="comment-list">
        <reply-item v-for="item in replyList" :replyInfo="item.object" :key="item.object.comment_unique_key"></reply-item>
      </div>
    </div>
    <!-- 滑倒顶部 -->
    <el-button
        style="color:blue"
        :class="['float-button',toTopBtn?'top':'']"
        circle
        icon="el-icon-caret-top"
        @click.native="toTop"
      ></el-button>
  </div>
</template>
<script>
import { getHtml, addComment, getComments } from "@/api/api.js";
import axios from "axios";
import replyItem from "@/components/reply-item.vue";
import utils from "@/utils/normalUtils.js";
import md5 from "js-md5";
export default {
  name: "About",
  components: {
    replyItem
  },
  data() {
    return {
      toTopBtn: false, //滑倒顶部按钮 变量
      message: "",
      newsUrl: "",
      newsId: "",
      commentValue: "",
      btnShow: false,
      replyList: [],
      sendLoading:false
        // {
        //   name: "GitYiM",
        //   content: "评论的内容哦哈哈哈哈哈",
        //   commentTime: "2017年12月11日 17:50"
        // }]
    };
  },
  methods: {
    showBtn() {
      this.btnShow = true;
    },
    hideBtn() { 
      this.btnShow = false;
    },
    
    //提交评论
    sendComment() {
      //
      this.sendLoading = true
      //假操作 用于增强用户体验
      const commentId =  md5(this.$store.state.userUniId + utils.getCurTime()+Math.random())
      const curTime = utils.getCurTime()  
       //请求到后台添加评论
        addComment({
          newsUniqueKey: this.newsId,
          commentUniqueKey: commentId,
          composeType: 1,
          content: this.commentValue,
          userUniqueKey: this.$store.state.userUniId,
          commentTime: curTime,
          ip: "192.186.53.7"
        })
          .then(res => {
            this.getComments()
           
            //   this.replyList.unshift(
            //   {
            //     object: {
            //       name: "来自火星的网友",
            //       content: this.commentValue,
            //       commentTime: curTime,
            //       acclaimCount:0,
            //       acclaimStatus:0,
            //       comment_unique_key:commentId
            //     }
            //   }
            // ),
            this.commentValue = "";
            this.$message({
              type: "success",
              message: "评论成功",
              duration: 3 * 1000
            });
            this.sendLoading = false
            //重新获取评论内容
            
          })
          .catch(err => {
            this.$message({
              type: "error",
              message: "评论失败",
              duration: 3 * 1000
            });
            console.log(err);
          });
    },
    getComments: function() {
      getComments({
        newsUniqueKey: this.newsId,
        userUniqueKey: this.$store.state.userUniId
      })
        .then(res => {
          this.replyList = res.result.data.slice(1)
           this.$forceUpdate()//强制更新
        })
        .catch(err => {
          console.log(err)
        });
    },
    articleLoad: function() {
      const fullLoading = this.$loading({
        fullscreen: true,
        text: "正在加载内容",
        lock: true
      });
      axios({
        url: this.newsUrl
      })
        .then(res => {
          this.message = res.data;
          fullLoading.close();
        })
        .catch(err => {
          fullLoading.close();
          window.console.log(err);
          this.$message({
            type: "error",
            message: "内容加载错误",
            duration: 3 * 1000
          });
        })
        .finally(dd => {
          fullLoading.close();
        });
    },
    getFromTop() {
      let fromTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (fromTop >= 100) {
        this.toTopBtn = true;
      } else {
        this.toTopBtn = false;
      }
    },
    toTop() {
        let mode =
          document.compatMode === "CSS1Compat" ? "documentElement" : "body";
        let fromTop = document[mode].scrollTop;
        // 回到顶部滚动条滑动的速度应该和高度有关
        let speed = Math.round(fromTop / 20);
        let timer = setInterval(function() {
          document[mode].scrollTop -= speed;
          if (document[mode].scrollTop <= 0) {
            clearInterval(timer);
            timer = null;
          }
        }, 10);
      }
  },
  created() {
    this.newsUrl = this.$route.query.newsUrl;
    this.newsId = this.$route.query.newsId;
    this.articleLoad();
    this.getComments();
  },

    mounted() {
      window.addEventListener("scroll", this.getFromTop, false);
    }

};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.comment-container {
  min-height: 300px;
  position: relative;
  .title {
    color: #8a9aa9;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
    padding: 20px 0px 5px 0px;
  }
  .comment-form {
    position: relative;
    margin: 20px 0;
    padding: 15px 20px;
    background-color: rgb(250, 251, 252);
    border-radius: 3px;
    display: flex;
    .avatar-box {
      flex: 0 0 auto;
      .el-avatar {
        margin-right: 10px;
      }
    }
    .form-box {
      flex: 1 1 auto;
      position: relative;
      .btn-box {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        .send-btn {
          margin-top: 10px;
        }
      }
    }
  }
  .comment-list {
    margin-left: 70px;
    display: flex;
    flex-direction: column;
    @include clearfix;
    
  }
  
}
.float-button {
      position: fixed;
      right: 100px;
      bottom: -50px;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
      transition: all .3s linear 0s;
      opacity: .8;
    }
    .top{
      bottom: 100px;
      opacity: 1;
    }
</style>
<style lang="scss">
</style>