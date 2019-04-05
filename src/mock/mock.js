import Mock from 'mockjs';
import store from './../vuex/store';

const baseUrl = store.state.ajaxUrl;
const myuserId = store.state.user.userId;

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
      'conversations|5-8': [
        {
          'conversationID|12345678-23456789': 23456789,
          info: {
            'ava|+1': [
              'http://img.wuxfly.com/1552029040043447',
              'https://gss3.bdstatic.com/84oSdTum2Q5BphGlnYG/timg?wapp&quality=80&size=b150_150&subsize=20480&cut_x=0&cut_w=0&cut_y=0&cut_h=0&sec=1369815402&srctrace&di=4ce80937b3c819f42e7fd5389d186454&wh_rate=null&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2F2cf5e0fe9925bc31ca72c2bc50df8db1cb1370e3.jpg',
              'https://gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/280ae5a682e69c88e4b8b6536379746865598c?t=1453561031',
              'https://gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/eda1e5b2815f5fe6b581e7a09a6f2e?t=1403955147'
            ],
            'name|+1': ['张三', '李四', '雄武', '大壮', '州基隆']
          },
          meId: myuserId,
          'toId|12345678-23456789': 23456789,
          'msgList|1-5': [
            {
              'userid|12345678-23456789': 23456789,
              'text|1': ['十大', 'asd啊是大', '发哦i请问']
            }
          ]
        }
      ]
    })
  }
];

export default function() {
  for (let i = 0, len = mockList.length; i < len; i++) {
    let o = mockList[i];
    Mock.mock(o.url, o.data);
  }
}
