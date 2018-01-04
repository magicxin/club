<template>
  <div class="dynamic">
    <div class="dynamic-item">
      <div class="top">
        <div class="left co-center">
          <img :src="itemData.avatar || defaultAvatar" />
        </div>
        <div class="right">
          <div class="dynamic-title">
            {{itemData.name}}
          </div>
          <div class="row">
            <div class="dynamic-date">
              {{itemData.date}}
            </div>
          </div>
        </div>
      </div>
      <div class="middle">
      	<div class="topic-container">
          <!--<div class="topic" v-if="itemData.topics.length>0">{{itemData.topics[0].content | topic}}</div>-->
          <div v-html="itemData.content"></div>
        </div>
        <!--start 发音频 -->
        <magic-audio v-if="itemData.audios.length>0" :audioData="itemData | audioData"></magic-audio>
        <!--end 发音频 -->

        <!--start 发视频 -->
        <video class="video" v-if="itemData.videos.length>0" poster="defaultAvatar" controls :src="itemData.videos[0]"></video>
        <!--end 发视频 -->

        <!--start 发图片 -->
        <magic-image v-if="itemData.images.length>0" :bigImage="itemData.images"></magic-image>
        <!--end 发图片 -->
      </div>
      <div class='bottom' v-if="showBottom">
        <div class="reply" v-tap="{methods:goComment,id:itemData.id}">
          <i class="iconfont icon-pinglun"></i>{{itemData.commentCount}}
        </div>
        <div class="like" v-tap="{methods:like,id:itemData.id}">
          <i v-show="itemData.isSupport === '0'" class="iconfont icon-xihuan"></i>
          <i v-show="itemData.isSupport === '1'" class="iconfont icon-xihuan1"></i>{{itemData.supportCount}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import defaultAvatar from "assets/face.png";
import magicAudio from "components/audio/ma_audio";
import magicImage from "components/image/ma_image";
export default {
  name: "dynamic",
  data() {
    return {
      audioData: {
        id: "",
        url: ""
      },
      defaultAvatar:defaultAvatar,
      support: false,
      isSupport: "",
      supportCount: ""
    };
  }, // 截取日期字符串
  components: {
    magicAudio,
    magicImage
  },
  filters: {
//  sliceDate: function(value) {
//    if (!value) return "";
//    return value.slice(5, 10);
//  },
//  topic(value) {
//    return "#" + value + "#";
//  },
    audioData(value) {
      return {
        id: value.id,
        url: value.audios[0]
      };
    }
  },
  computed: {
//  showComments() {
//    return this.itemData.comments.slice(0, 3);
//  }
  },
  watch: {
    itemData(newV, oldV) {
      return newV;
    }
  },
  props: {
    itemData: {
      type: Object,
      required: true
    },
    showBottom: {
      type: Boolean,
      required: false,
      default() {
        return true;
      }
    },
    showDetail: {
      type: Boolean,
      required: false,
      default() {
        return true;
      }
    }
  },
  methods: {
    goArticle(params) {
      //进入文章
      console.log(params);
      let item = params.item.share;
      this.$router.push({
        name: "channelDetail",
        query: {
          channel: JSON.stringify({
            desc: item.content,
            id: item.id,
            image: item.image,
            name: item.title,
            date: params.item.date,
            url: item.path
          })
        }
      });
    },
    goComment(params) {
      //进入评论
      this.$router.push({
        name: "comment",
        params: {
          id: params.id
        }
      });
    },
    like(params) {
      //点赞
      this.$
        .get({
          methodName: "CreateSpaceSupport",
          spaceId: params.id
        })
        .then(res => {
          this.support = true;
          this.isSupport = res.data.isSupport;
          this.supportCount = res.data.supportCount;
        });
    }
  }
};
</script>

<style scoped>
.dynamic-item {
  display: flex;
  flex-flow: column;
  padding: 1em;
  border-bottom:4px solid #eee;
}

.top {
  display: flex;
}

.top .left {
  padding: 4px;
}

.top .left img {
  width: 40px;
  height: 40px;
  flex: 1 1 0;
  border-radius: 20px;
  overflow: hidden;
}

.top .right {
  flex: 4 1 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding: 4px;
}

.dynamic-title {
  font-size: 16px;
  margin-bottom: 6px;
}

.row {
  display: flex;
  justify-content: flex-start;
}

.dynamic-date {
  color: #999;
  margin-right: 1em;
}

.delete {
  color: #f98700;
}

.middle {
  padding: 6px;
}

.bottom {
  display: flex;
}

.topic-container {
  display: flex;
}

.topic {
  color: #f98700;
  margin-right: 0.5em;
}

.reply,
.like {
  flex: 1 1 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border: 1px solid #f1f1f5;
}

i {
	display:flex;
	align-items: center;
  margin-right: 2px;
}

.comments {
  display: flex;
  flex-flow: column;
  padding: 1em;
  background: #f2f2f2;
  margin: 0.5em;
}

.comments-item {
  padding: 0.5em;
}

.all-comments {
  display: flex;
  justify-content: center;
  color: #f98700;
  padding: 1em;
}

.comments-item .left {
  color: #f98700;
}

.video {
  width: 90%;
  height: 75vw;
}
</style>