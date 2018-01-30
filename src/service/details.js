import axios from 'axios'
import qs from 'qs'
let form = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}
export const details = {
    api: {},
    getArticle: function(params) { // 获得文章详情
       return axios.get('/articles/'+params);
    },
    getActivity: function(params) { // 获得活动详情
       return axios.get('/activities/'+params);
    },
    getLiveListpeople: function(params) { // 获得活动报名列表
        return axios.get('/activities/people' + this.getParam(params))
    },
    getColumn: function(params) { // 获得专栏详情
       return axios.get('/columns/'+params);
    },
    getContent: function(params,type) { // 获得专栏单品详情
       return axios.get('/singles/'+params + this.getParam(type));
    },
    getBroadcast: function(params) { // 获得直播详情
       return axios.get('/lives/'+params);
    },


    getLiveList: function(params) { // 获得直播列表
        return axios.get('/lives' + this.getParam(params))
    },
    getLiveInfo: function(shopId, watchNo) { // 获取详情页基本信息
        return axios.get('/shops/' + shopId + '/lives/'+ watchNo)
    },
    appointment: function (shopId, watchNo) { // 预约直播
        return axios.put('/shops/' + shopId + '/lives/'+ watchNo + '/appointment')
    },
    isAppointed: function (shopId, watchNo) { // 是否已经预约
        return axios.get('/shops/' + shopId + '/lives/'+ watchNo + '/checkappointment')
    },
    isOauth: function (shopId, watchNo, params) { //是否有权限
        return axios.post('/shops/' + shopId + '/lives/'+ watchNo + '/access', qs.stringify(params))
    },
    getChatAppKey: function (shopId, chatroomId) { // 获得聊天室信息(yes_no_token)
        return axios.get('/shops/' + shopId + '/chatrooms/'+ chatroomId)
    },
    isAllowedToTalk: function (shopId, chatroomId) { // 检查用户是否被禁言(yes_token) 必须登录
        return axios.get('/shops/' + shopId + '/chatrooms/'+ chatroomId + '/check')
    },
    sendImage: function (shopId, chatroomId, options) { // 发送图片消息(yes_token)
        return axios.put('/shops/' + shopId + '/chatrooms/'+ chatroomId + '/image', options, form)
    },
    sendTxt: function (shopId, chatroomId, params) { // 发送文字消息(yes_token)
        return axios.put('/shops/' + shopId + '/chatrooms/'+ chatroomId + '/message', qs.stringify(params))
    },
    getChatMessOfSponsor: function(shopId, params) {
        return axios.get('/shops/' + shopId + '/hostMessages'+ this.getParam(params))
    },
    getParam: function(param) { //
        let url = ''
        for(let key in param) {
            if(param[key] !== null){
                url ? url += '&' + key + '=' +param[key]: url += key + '=' + param[key]
            }
        }
        return url ? "?" + url : ''
    }
}
export default {details}