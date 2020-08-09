import { defer, Observable } from 'rxjs';
import { axiosInstance, refreshHeader } from './axiosSetup';
import { map, tap } from 'rxjs/operators';
import { emitInternalEvent } from './index'


const respIntercepterMap = map((result: any) => result?.data?.data);
const respIntercepterTap = tap((res: any) => {
    emitInternalEvent({
        type: 'circularProgressBar',
        data: false
    })
    if (res.status === 'Invalid SessionId') {
        emitInternalEvent({
            type: res.status,
            data: null
        });
    } else if (res['status'] !== "success") {
        emitInternalEvent({
            type: "alert_toast",
            data: res.message
        })
    }
}, err => {
    emitInternalEvent({
        type: 'circularProgressBar',
        data: false
    })
    emitInternalEvent({
        type: "alert_toast",
        data: err
    })
});

const get = (url: string, queryParams?: object): Observable<any> => {
    emitInternalEvent({
        type: 'circularProgressBar',
        data: true
    })

    return defer(() => axiosInstance.get<any>(url, { params: queryParams }))
        .pipe(respIntercepterMap, respIntercepterTap);
};

const post = (url: string, body: object, queryParams?: object): Observable<any | void> => {
    emitInternalEvent({
        type: 'circularProgressBar',
        data: true
    })

    return defer(() => axiosInstance.post<any>(url, body, { params: queryParams }))
        .pipe(respIntercepterMap, respIntercepterTap);
};

const put = (url: string, body: object, queryParams?: object): Observable<any | void> => {
    emitInternalEvent({
        type: 'circularProgressBar',
        data: true
    })

    return defer(() => axiosInstance.put(url, body, { params: queryParams }))
        .pipe(respIntercepterMap, respIntercepterTap);
};

const patch = (url: string, body: object, queryParams?: object): Observable<any | void> => {
    emitInternalEvent({
        type: 'circularProgressBar',
        data: true
    })

    return defer(() => axiosInstance.patch(url, body, { params: queryParams }))
        .pipe(respIntercepterMap, respIntercepterTap);
};

const deleteR = (url: string, id: string): Observable<any | void> => {
    emitInternalEvent({
        type: 'circularProgressBar',
        data: true
    })

    return defer(() => (axiosInstance.delete(`${url}?_id=${id}`)))
        .pipe(respIntercepterMap, respIntercepterTap
        );
};

export default { get, post, put, patch, delete: deleteR, refreshHeader };
