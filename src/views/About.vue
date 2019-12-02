<template>
  <div>
    <!-- 新闻html -->
    <div v-html="message"></div>
    <!-- 评论添加部分 -->
    <div class="comment-container">
        <span>评论</span>
    </div>  
  </div>
</template>

<script>
import { getHtml } from '@/api/api.js'
import axios from 'axios'
export default {
    data () {
      return {
        message:'',
        newsUrl:''
      }
    },
    created () {
      
      this.newsUrl = this.$route.query.newsUrl
      axios({
        url:this.newsUrl
      }).then(res => {
          this.message = res.data
      })

    },
    mounted () {
      // const html =  document.getElementsByTagName('html')[0]
      // html.style.backgroundColor = '#00000000'
    },
    activated () {
       this.newsUrl = this.$route.query.newsUrl
       const fullLoading =  this.$loading({
              fullscreen:true,
              text:'正在加载内容',
              lock:true
            })
     
      axios({
        url:this.newsUrl
      }).then(res => {
          this.message = res.data
          setTimeout(function(){
            fullLoading.close()
          },500) 
      }).catch(err => {
        console.log(err)
        fullLoading.close()
        this.$message({
          type:'danger',
          message:'内容加载错误',
          duration:3*1000
        })
      })
    }
  }
</script>

<style lang="scss" scoped>
  .comment-container{

  }
</style>
<style lang="scss">
  
</style>