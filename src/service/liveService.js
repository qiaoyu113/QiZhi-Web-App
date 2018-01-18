/**
 * Created by LXH on 2017/11/7.
 */
import axios from 'axios'
import qs from 'qs'
let form = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}
export const liveService = {
    api: {},
    getLiveList: function(params) { // 获得直播列表
        return axios.get('/lives' + this.getParam(params))
    },
    getLiveInfo: function(watchNo) { // 获取详情页基本信息
        return axios.get('/lives/'+ watchNo)
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
export default {liveService}
