
import { stringify } from 'qs';

export class httpUtil {

    static async httpGet(url, params) {

        if (params)
            url = url + `?${stringify(params)}`;
        const response = await fetch(url, { credentials: 'include', method: 'GET', })
            .catch(err => {
                console.log(err);
            }) as Response;
        // await closeLoading();
        return response.json();

    }
    static async httpPost(url, params) {
        const formData = this.jsonHandleParam(params);
        const response = await fetch(url, { credentials: 'include', body: formData, method: 'POST', })
            .catch(err => {
                console.log(err);
            }) as Response;
        return response.json();
    }


    static jsonHandleParam(params) {
        const formData = new FormData();
        let val;
        if (params)
            Object.keys(params).forEach(key => {
                val = params[key];
                if (typeof val == 'string') val = val.trim();
                if (typeof val == 'string' || typeof val === 'number' || typeof val == 'boolean') {
                    formData.append(key, val + "");
                } else if (typeof val == 'undefined' || val == 'null' || val == undefined || val == null) {
                    formData.append(key, "");
                }
                // else  if (val instanceof moment)
                // {
                //     formData.append(key,UtilService.formatDate(val));//获取时间戳
                // }
                else {
                    formData.append(key, JSON.stringify(val));
                }
            })
        return formData;
    }
}
export default httpUtil;