import store from './../vuex/store';
import { post } from './../lib/http';

export default {
  async getShearList(data) {
    return await post({
      url: '/search/share/list',
      data,
      config: {
        showLoading: false,
        showErr: false
      }
    });
  },
  // 获取分享的详情
  async getShardDetail(id) {
    return await post({
      url: '/user/share/init',
      config: {
        showLoading: false
      },
      data: {
        shareId: id
      }
    });
  },
  // 获取所有评论
  async shareReplyAll(data) {
    return await post({
      url: '/user/share/reply/all',
      data,
      config: {
        showLoading: false
      }
    });
  },
  // 收藏
  async userCollect(id) {
    return await post({
      url: '/user/collect',
      data: {
        shardId: id
      }
    });
  },
  // 回复文章
  async shareReplyArticle(data) {
    return await post({
      url: '/user/share/reply/article',
      data
    });
  },
  // 二级回复详情
  async getReplyDetail(data) {
    return await post({
      url: '/user/share/reply/desc',
      data
    });
  },
  // 回复二级评论
  async shareReplyArticleChild(data) {
    return await post({
      url: '/user/share/reply/article/child',
      data
    });
  },
  // 获取邮箱验证码
  async getMailSms(data) {
    return await post({
      url: '/user/share/mail/activate',
      data,
      config: {
        headers: {
          login: 'login'
        }
      }
    });
  },
  // 邮箱注册
  async mailRegister(data) {
    return await post({
      url: '/user/share/mail/register',
      data,
      config: {
        headers: {
          login: 'login'
        }
      }
    });
  },
  // 邮箱登陆
  async mailLogin(data) {
    return await post({
      url: '/user/share/mail/login',
      data,
      config: {
        headers: {
          login: 'login'
        }
      }
    });
  },
  // 发布分享
  async sendShare(data) {
    return await post({
      url: '/user/share/send',
      data
    });
  },
  // 上传图片
  async uploadImg(data) {
    return await post({
      url: '/admin/upload/img/',
      data,
      config: {
        showLoading: false,
        files: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          login: 'login',
          token: store.state.user.token,
          userId: store.state.user.userId
        }
      }
    });
  },
  // 获取收藏列表
  async getCollectionList(data) {
    return await post({
      url: '/user/collect/list',
      data
    });
  },
  // 取消收藏
  async delectCollection(data) {
    return await post({
      url: '/user/collect/delect',
      data
    });
  },
  // 退出登录
  async outLogin() {
    return await post({
      url: '/user/share/cencel',
      config: {
        headers: {
          login: 'login'
        }
      }
    });
  },
  // 删除分享
  async delectShare(shareId) {
    return await post({
      url: '/user/share/del',
      data: {
        shareId
      }
    });
  },
  // 文章点赞
  async parseLikeShare(data) {
    return await post({
      url: '/user/parse/share',
      data
    });
  },
  // 评论点赞
  async parseLikeReplay(data) {
    return await post({
      url: '/user/parse/reply',
      data
    });
  },
  // 所有回复记录
  async getReplyMeList(data) {
    return await post({
      url: '/search/reply/list',
      data
    });
  },
  // 点赞记录
  async getLikeMeLogs(data) {
    return await post({
      url: '/search/parse/list',
      data
    });
  },
  // 修改用户信息
  async editUserInfo(type, value) {
    let { userName, gender, addRess, userAvatar } = store.state.user.userInfo;
    let data = {
      userName,
      gender,
      addRess,
      avatar: userAvatar
    };
    data[type] = value;
    return await post({
      url: '/user/info/edit',
      data
    });
  },
  // 获取用户信息
  async getUserInfo(token) {
    return await post({
      url: '/search/userInfo',
      data: {
        token,
        loginType: 'N'
      },
      config: {
        headers: {
          login: 'login'
        }
      }
    });
  },
  // 删除评论
  async delReply(replyId, replyType) {
    return await post({
      url: '/user/share/reply/del',
      data: {
        replyId,
        replyType
      }
    });
  }
};
