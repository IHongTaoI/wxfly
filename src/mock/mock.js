import Mock from 'mockjs';
import store from './../vuex/store';

const baseUrl = store.state.ajaxUrl;

function formatData(v) {
  return {
    status: '200000',
    data: {
      serviceHeader: {
        token: 'mock数据',
        userid: 'mock数据'
      },
      serviceBody: v
    }
  };
}

const mockList = [
  {
    name: 'getChatList',
    url: `${baseUrl}/search/chat/conversations`,
    data: formatData({
      'conversations|5': [
        {
          'conversationID|12345678-23456789': 23456789,
          formUser: {
            'userId|12345678-23456789': 23456789,
            'userava|1': [
              'http://img.wuxfly.com/1552029040043447',
              'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoCCQA6BUhL2kqReaa9Gt8oMmFmSD7PjthlFtsubSlS6wy0JnpxCp7ppHMTbiaMQpWSnV5bqOa0yibA/132'
            ]
          },
          toUser: {
            'userId|12345678-23456789': 23456789,
            'userava|1': [
              'http://img.wuxfly.com/1552029040043447',
              'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoCCQA6BUhL2kqReaa9Gt8oMmFmSD7PjthlFtsubSlS6wy0JnpxCp7ppHMTbiaMQpWSnV5bqOa0yibA/132'
            ]
          },
          msg: {
            'type|1': ['文字', '图片', '其他'],
            'contet|1': ['mock数据1', 'mock数据2', 'mock数据3', 'mock数据4']
          }
        }
      ]
    })
  }
];

export default function() {
  for (let i = 0, len = mockList.length; i < len; i++) {
    let o = mockList[i];
    // Mock.mock(o.url, o.data);
  }
}
