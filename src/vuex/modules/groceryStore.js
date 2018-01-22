/**
 * Created by LXH on 2017/11/17.
 */
const groceryStore = {
    state: {
        pageTitle: '', //页面带返回按钮的白色头部
        redirect_uri: {
            name: 'home', // 路由name
            params: '' // 路由参数
        }, //返回路径
        chatRoomHost: 0, ////直播是否连接
        visitedUrl: [] //整个项目中走过哪些页面
        //imgBaseUrl: 'http://test.resource.vjuzhen.com/' //图片基本路径

    },
    mutations: {},
    actions: {},
    getters: {}
}
export default groceryStore