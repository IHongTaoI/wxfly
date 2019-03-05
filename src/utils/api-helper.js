import store from './../vuex/store';
import { post } from './../lib/http';

export default {
  async getShearList() {
    return await post({
      url: '/search/share/list',
      data: {
        lng: '23.21463',
        lat: '23.12463',
        searchType: '2',
        page: '',
        pageSize: '1'
      },
      config: {
        showLoading: false
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
  //回复文章
  async shareReplyArticle(data) {
    return await post({
      url: '/user/share/reply/article',
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
  //获取邮箱验证码
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
      data
    });
  }
};
