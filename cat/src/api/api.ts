import httpUtil from '../util/httpUtil';

//const host =  "http://47.95.255.54/gameApi";
 const host = window.location.href.indexOf("http://192.168.88.113") >= 0 ? "http://192.168.88.113:8080/game" : "http://47.95.255.54/gameApi";

export default class Api {

    static loginApi(param) {
        const url = `${host}/game/login`;
        return httpUtil.httpPost(url, param);
    }
    static logoutApi() {
        const url = `${host}/game/logout`;
        return httpUtil.httpPost(url, null);
    }
    static setSuccessStepApi(param) {
        const url = `${host}/game/success`;
        return httpUtil.httpPost(url, param);
    }
    static setFailStepApi(param) {
        if(!param['steps']){
        return;
        }
        const url = `${host}/game/fail`;
        return httpUtil.httpPost(url, param);
    }

    static queryFailRankApi(param) {
        const url = `${host}/game/getFailRank`;
        return httpUtil.httpPost(url, param);
    }

    static querySuccessRankApi(param) {
        const url = `${host}/game/getSuccessRank`;
        return httpUtil.httpPost(url, param);
    }
    static queryOnlineNameApi() {
        const url = `${host}/game/queryOnlineName`;
        return httpUtil.httpPost(url, null);
    }
}