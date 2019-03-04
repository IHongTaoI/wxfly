import http from '../lib/http';
import apiHelper from './api-helper';
import {
  ImagePreview
} from 'vant';

// 微信获取地理位置
function getlocation() {}

function dateFromat(date, text = '') {
  let artDate = new Date(date);
  let nowDate = new Date();
  if (isNaN(artDate)) {
    artDate = new Date(date.replace(/\\-/g, '/'));
  }
  if (nowDate.getFullYear() === artDate.getFullYear()) {
    let nowt = nowDate.getMonth() + nowDate.getDate();
    let artt = artDate.getMonth() + artDate.getDate();
    // 如果日期一样
    if (nowt === artt) {
      // let timecha = nowDate - artDate
      let hours = Math.floor((nowDate - artDate) / 1000 / 60 / 60);
      let min = Math.floor((nowDate - artDate) / 1000 / 60);
      let sec = Math.floor((nowDate - artDate) / 1000);
      if (hours < 24 && hours > 0) return `${hours}小时前${text}`;
      else if (hours <= 0 && min > 0) return `${min}分钟前${text}`;
      else if (min <= 0) return sec > 10 ? `${sec}秒前${text}` : '刚刚';
      else return `${artDate.getMonth() + 1}-${artDate.getDate()}`;
    } else {
      return `${artDate.getMonth() + 1}-${artDate.getDate()}`;
    }
  } else {
    return `${artDate.getFullYear()}-${artDate.getMonth() +
      1}-${artDate.getDate()}`;
  }
}

function getPosition() {
  return new Promise(resolve => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude; // 获取纬度
        let longitude = position.coords.longitude; // 获取经度
        //alert(latitude + " " + longitude)
        resolve(latitude, longitude); //回调函数传入经度纬度
      });
    } else {
      alert('您的设备不支持定位');
    }
  });
}

// 图片预览
function imagePreview(urlList) {
  ImagePreview(urlList);
}

export default {
  dateFromat,
  getPosition,
  apiHelper,
  imagePreview
};
