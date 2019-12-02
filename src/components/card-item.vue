<template>
    <div class="card-container" id="curcard" >
        <el-card shadow="none" @mouseenter.native="overForBtn" @mouseleave.native="outHideBtn">
            <el-col :span="19" class="left-title">
                <div style="width:85%;">
                    <span style="color : orange; font-size:90%; line-height:1.5rem;">来源:</span>
                    <span style="color : lightgray; font-size:90%; margin-left:10px;">{{ itemData.author_name }}</span>
                    <span style="color : lightgray; font-size:90%; margin-left:10px">{{ itemData.date }} </span>
                    <h3 class="singline-omit">{{ itemData.title }}</h3>
                </div>
                <div class="operation" style="margin-top:20px;">
                    <el-button-group>
                        <el-button  size="small" title="点赞" state="false" @click.prevent="likeit">
                            <span>
                                <svg-icon :iconClass="[liked?'liked':'like']" size="0.75" />
                            </span>
                            <span :class="[liked?'chosed':'']" style="margin-left:5px;font-weight:600;"> {{ acclaimNum }}</span>
                        </el-button>
                        <el-button size="small" title='评论' @click.prevent="">
                            <span>
                                <svg-icon iconClass="comment" size="0.8" />
                            </span>
                             <span  style="margin-left:5px;font-weight:600;"> {{ commentNum }} </span>
                        </el-button>
                    </el-button-group>
                    <el-button v-show="distateBtn" @click.prevent="closeVisible=true" style="margin-left:20px" type="danger" title="删除"  size="small" icon="el-icon-delete" circle></el-button>
                </div>
            </el-col>
            <el-col :span="5" class="right-img" >
                <el-image class="imgItem" :src="itemData.thumbnail_pic_s" lazy alt="新闻图片" />
            </el-col>
        </el-card>

        <!-- 反馈理由弹窗 -->
        <el-dialog class="feed-dialog" title="选择理由，精准屏蔽" top="15%" :visible.sync="closeVisible" width="40%"  center close-on-press-escape modal append-to-body @closed="feedBackBtnReset">
            
            <div class="feedback-content">
                <el-button class="feed-btn" :class="[item.clicked?'chosed_btn':'']" v-for="(item,index) in feedBtnList" plain :key="index" @click.prevent="addReason(item)">{{item.content}}</el-button>
            </div>
            <span slot="footer">
                <el-button @click.prevent="closeVisible=false" size="mini">取消</el-button>
                <el-button @click.prevent="feedback" :loading="loadingState" type="primary" size="mini">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import  { distate,likeNumUpdate,getacclaim }  from '@/api/api'
    export default {
        props: {
            itemData:{
                required:true,
                default: {}
            }
        },
        data() {
            return{
                distateBtn : false,
                closeVisible : false,
                feedBtnList: [
                    {
                        content:'重复、旧闻',
                        clicked:false
                    },
                    {
                        content:'内容质量差',
                        clicked:false
                    },
                    {
                        content:'来源不当',
                        clicked:false
                    },
                    {
                        content:'低俗、色情',
                        clicked:false
                    }
                    ],
                feedReasons: [],
                loadingState:false, //弹窗的按钮loading
                liked:false,
                //点赞 评论
                acclaimNum: 0,
                commentNum: 0

            }
        },
        methods: {
            overForBtn() {
                this.distateBtn = true
            },
            outHideBtn () {
                this.distateBtn = false
            },
            feedback () {
                this.loadingState = true
                distate({
                    userUniqueKey:this.$store.state.userUniId,
                    newsUniqueKey:this.itemData.uniquekey,
                    feedbackContent:this.feedReasons.join('、')
                }).then(data => {
                    this.loadingState = false
                    this.closeVisible = false
                    this.$message({
                        message:'反馈成功',
                        type:'success',
                        showClose:false,
                        offset:100
                    })
                    this.destroyElement();
                    console.log(data)
                }).catch(err => {
                    console.log(err)
                })
            },
            addReason(reason){
                if(reason.clicked){
                    reason.clicked = false
                    this.feedReasons =  this.feedReasons.filter(item=>{
                       return item!=reason.content
                    })
                    console.log(this.feedReasons)
                }else{
                    reason.clicked = true
                    this.feedReasons.push(reason.content)
                    console.log(this.feedReasons)
                }
            },
            feedBackBtnReset() {
                for(let i = 0; i<this.feedBtnList.length; ++i){
                    this.feedBtnList[i].clicked = false;
                }
                this.feedReasons = []
            },
            destroyElement() {
                this.$destroy(true)
                this.$el.parentNode.removeChild(this.$el)
            },
            // 跟新点赞数量函数
            updateLikeNum(type) {
                likeNumUpdate({
                        typeId: this.itemData.uniquekey, //新闻Id
                        userUniqueKey: this.$store.state.userUniId, //用户Id
                        acclaimType:1,  //未知
                        value: type //增 或 减
                    }).then(res => {
                        this.$message({
                            type:'success',
                            message:type==-1?'取消点赞':'点赞成功',
                            duration:2 * 1000,
                            offset:100
                        }) 
                    }).catch(err => {
                        console.log(err)
                    })
            },
            likeit () {
                if(this.liked){
                    this.liked = false
                    this.acclaimNum -= 1 
                    this.updateLikeNum(-1)
                }else{
                    this.liked = true
                    this.acclaimNum += 1 
                    this.updateLikeNum(1)
                }
            }
        },
        created () {
            getacclaim ({
                newsUniqueKey:this.itemData.uniquekey,
                userUniqueKey:this.$store.state.userUniId
            }).then(data => {
                this.acclaimNum = data.result.data[0].object.acclaimCount
                this.commentNum = data.result.data[0].object.commentCount
                
                this.liked =  data.result.data[0].object.acclaimStatus == 1?true:false
            }).catch(err => {
                console.log(err)
            })
        },
        mounted () {
            console.log(this.itemData)
        }
    }
</script>

<style lang="scss" >
@import '~@/styles/mixin.scss';

    .card-container{
        height: 9rem;
        width: 100%;
        cursor: pointer;
        border: solid 1px #EBEEF5;
        .el-card{
            height: 100%;
            width: 100%;
            text-align: left;
            display: flex;
            border: none;
            border-radius: 0;
            .el-card__body{
                width: 100%!important;
            }
            .left-title{
                height: 100%;
            }
            .right-img{
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                .el-image{
                    // min-width: 50px;
                    width: 100%;
                    height: 100%;
                }
            }
            &:hover{
                background-color: rgba(183, 222, 247, 0.01)
            }
        }
    }
    .singline-omit{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .feedback-content{
        height: 100%;
        widows: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        .feed-btn{
            margin-bottom: 20px;
        }
    }
    .chosed_btn{
        background-color:rgb(236,245,255) !important;
        color: rgb(80,166,255) !important;
    }
    .feed-dialog{
        min-width: 40%;
    }
    .el-button{
        &:hover{
            background-color: inherit;
            color: inherit;
        }
        &:focus{
            background-color: inherit;
            color: inherit;
        }
    }
    .chosed{
        color: rgb(18,150,219);
    }

</style> 