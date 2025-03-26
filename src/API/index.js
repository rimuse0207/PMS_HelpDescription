import axios from 'axios';
import { getCookie, removeCookie } from '../Configs/Cookies';
import { toast } from '../ToastMessage/ToastManager';

export const request = axios.create({
    baseURL: process.env.REACT_APP_DB_HOST,
    // headers: { Authorization: `Bearer ${getCookie('Token')}` },
});
request.interceptors.request.use(
    config => {
        const token = localStorage.getItem('Token'); // 최신 Token 가져오기
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
export const Request_Post_Axios = async (path, data) => {
    try {
        const Post_Axios = await request.post(path, data);

        if (Post_Axios.status === 200) {
            //서버 전송 성공
            if (Post_Axios.data.status === 200) {
                //데이터 조회 성공
                return {
                    status: true,
                    data: Post_Axios.data.data,
                };
            } else if (Post_Axios.data.status === 600 || Post_Axios.data.status === 401) {
                console.log('로그인 토큰 이상 발생.');
                localStorage.removeItem('Token');
                toast.show({
                    title: `로그인 유효기간이 만료 되었습니다. 재 로그인 후 사용 바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });

                return (window.location.href = '/Home/Helps');
            } else {
                //실패
                toast.show({
                    title: `데이터 전송에 실패하였습니다. 다시 시도 후 IT팀에 문의바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });

                return {
                    status: false,
                    error: `전송은 성공이나 데이터 조회 실패`,
                };
            }
        } else {
            //서버 전송 실패
            toast.show({
                title: `서버와의 연결이 끊겼습니다. 인터넷 상태 확인 바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
            return {
                status: false,
                error: `서버와의 연결 끊김`,
            };
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const Request_Get_Axios = async (path, params) => {
    try {
        const Post_Axios = await request.get(path, {
            params: params,
        });

        if (Post_Axios.status === 200) {
            //서버 전송 성공
            if (Post_Axios.data.status === 200) {
                //데이터 조회 성공
                return {
                    status: true,
                    data: Post_Axios.data.data,
                };
            } else if (Post_Axios.data.status === 600 || Post_Axios.data.status === 401) {
                console.log('로그인 토큰 이상 발생.');
                localStorage.removeItem('Token');
                toast.show({
                    title: `로그인 유효기간이 만료 되었습니다. 재 로그인 후 사용 바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });
                return (window.location.href = '/Home/Helps');
            } else {
                //실패
                toast.show({
                    title: `데이터 불러오기에 실패 하였습니다. 다시 시도 후 IT팀에 문의바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });
                return {
                    status: false,
                    error: `전송은 성공이나 데이터 조회 실패`,
                };
            }
        } else {
            //서버 전송 실패
            toast.show({
                title: `서버와의 연결이 끊겼습니다. 인터넷 상태 확인 바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
            return {
                status: false,
                error: `서버와의 연결 끊김`,
            };
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};
