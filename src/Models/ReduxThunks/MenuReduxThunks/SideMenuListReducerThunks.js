import { useDispatch } from 'react-redux';
import { Request_Get_Axios } from '../../../API';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const fetchDataRequest = () => ({ type: FETCH_DATA_REQUEST });
export const fetchDataSuccess = data => ({ type: FETCH_DATA_SUCCESS, payload: data });
export const fetchDataFailure = error => ({ type: FETCH_DATA_FAILURE, payload: error });

export const MenuSidefetchData = () => {
    console.log('실행');
    return async dispatch => {
        console.log('111');
        dispatch(fetchDataRequest()); // 요청 시작

        try {
            const response = await Request_Get_Axios('/Ce_Route/Tools/Test_Test_Test'); // Axios API 호출
            console.log(response);
            if (response.data) dispatch(fetchDataSuccess(response.data)); // 성공 시 데이터 저장
            else dispatch(fetchDataFailure('error'));
        } catch (error) {
            dispatch(fetchDataFailure(error.message)); // 실패 시 에러 저장
        }
    };
};

const initialState = {
    loading: false,
    data: [],
    error: null,
};

const SideMenuListReducerThunks = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return { ...state, loading: true };
        case FETCH_DATA_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: action.payload, data: [] };
        default:
            return state;
    }
};

export default SideMenuListReducerThunks;
