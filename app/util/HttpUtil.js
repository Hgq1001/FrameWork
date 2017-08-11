/**
 * @Author:JACK-GU
 * @Date:2017-08-10
 * @E-Mail:528489389@qq.com
 * @Describe: 网络请求的工具类
 */
import {Axios, CancelToken} from 'axios';

const TIMEOUT = 20 * 1000;
const BASEURL = "https://facebook.github.io/react-native/";
const responseType = "json";

const instance = new Axios({
    baseURL: BASEURL,
    timeout: TIMEOUT,
    responseType: responseType,
    headers: {'X-Custom-Header': 'foobar'}
});

var cancel;

export default class HttpUtil {

    /**
     * get请求
     * @param params 请求的参数
     * @param url 请求地址
     * @param callBack 回调，{success: true, response: response}
     * */
    connectGet(params, url, callBack) {
        this.connectHttp(params, url, "get", callBack, null, null);
    }

    /**
     * post
     * @param params 请求的参数
     * @param url 请求地址
     * param callBack 回调,{success: true, response: response}
     * */
    connectPost(params, url, callBack) {
        this.connectHttp(params, url, "post", callBack, null, null);
    }

    /**
     * @param params 请求的参数
     * @param url 请求地址
     * @param method 请求的方式，post，get
     * @param onUploadProgress 上传进度
     * @param onDownloadProgress 下载进度
     * param callBack 回调,{success: true, response: response}
     * */
    connectHttp(params, url, method, callBack, onUploadProgress, onDownloadProgress) {
        instance.request({
            url: url,
            cancelToken: new CancelToken(function executor(c) {
                cancel = c;
            }),
            method: method,
            params: params,
            onUploadProgress: onUploadProgress,
            onDownloadProgress: onDownloadProgress,
        }).then(function (response) {
            //请求的结果
            if (callBack) {
                if (response.status == 200) {
                    callBack({success: true, response: response});
                } else {
                    callBack({success: false, response: response});
                }
            }
        }).catch(function (error) {
            if (callBack) {
                callBack({success: false, response: error});
            }
            if (error.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                //显示错误消息
            }
            console.log(error.config);
        });
    }

    /**
     * 取消方法
     * */
    cancel() {
        cancel();
    }
}