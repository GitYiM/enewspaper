<template>
  <div class="comment-list-item">
    <div class="item-avatar-box">
      <el-avatar shape="circle" :size="35" :src="headUrl"></el-avatar>  
    </div>
    <div class="item-content-box">
      <div class="meta-box">{{replyInfo.name}}</div>
      <div
        class="content-box">{{replyInfo.content}}</div>
      <div class="oper-box">
        <time style="font-size:90%;">{{replyInfo.commentTime}}</time>
        <div class="operation">
          <span @click="likeit">
            <svg-icon :iconClass="[liked?'liked':'like']" size="0.2" />
            <span style="margin-left:10px;" :class="[liked?'chosed':'']">{{acclainmNum}}</span>
          </span>
        </div>
      </div>
      <div class="split-line"></div>
    </div>
  </div>
</template>

<script>
import {likeNumUpdate} from '@/api/api.js'
export default {
  props: {
    replyInfo:{
       required:true,
       default:() => {}
      //  default:{
      //    name:'',
      //    content:'',
      //    commentTime:'',
      //    acclainmNum:0
      //  }
    }
  },
  data() {
    return {
      liked: false,
      acclainmNum:0,
    };
  },
  computed:{
    headUrl:function(){
      return `http://q2lnakrj2.bkt.clouddn.com/head${this.replyInfo.imageType}.jpeg`
    }
  },
  methods: {
    likeNumChange(value){
      likeNumUpdate({
          typeId:this.replyInfo.comment_unique_key,
          userUniqueKey:this.$store.state.userUniId,
          acclaimType:0,
          value:value
        }) 
        .then(res => {
          this.$message({
            type:value==-1?'warning':'success',
            message:value==-1?'取消点赞':'点赞成功',
            duration:3*1000
          })
        }).catch(err => {
          console.log(err)
        })
    },
    likeit() { 
      if(this.liked){
        this.liked = false
        this.likeNumChange(-1)
        this.acclainmNum -= 1
      }else{
        this.liked = true
        this.likeNumChange(1)
        this.acclainmNum += 1
      }
    } 
  },
  created() {
    //初始化点赞数量
    // console.log(this.replyInfo)
    this.acclainmNum = this.replyInfo.acclaimCount
    //初始化点赞按钮状态
    if(this.replyInfo.acclaimStatus==1){
        this.liked = true
      }else{
        this.liked = false
      }
  }
};
</script>

<style lang="scss" scoped>
.comment-list-item {
  // position: relative;
  display: flex;
  .item-avatar-box {
    flex: 0 0 auto;
    .el-avatar {
      margin-right: 10px;
    }
  }
  .item-content-box {
    flex: 1 1 auto;
    position: relative;
    // height: 50px;
    .meta-box {
      text-align: start;
    }
    .content-box {
      margin-top: 10px;
      text-align: start;
    }
    .oper-box {
      display: flex;
      margin: 20px 0 15px 0;
      color: #8a9aa9;
      font-weight: 400;
      .operation {
        margin-left: auto;
        width: 50px;
        display: flex;
        justify-content: space-between;
      }
    }
    .split-line {
      margin: 15px 0;
      padding: 0.5px 0;
      background-color: rgb(244, 245, 245);
    }
  }
}
 .chosed{
        color: rgb(18,150,219);
    }
</style>