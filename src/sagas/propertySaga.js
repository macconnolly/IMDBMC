import {put, call} from 'redux-saga/effects';
import {push} from "connected-react-router";
import {createPropertyService} from "../services/propertyService";
import {CREATE_PROPERTY, CREATE_PROPERTY_SUCCESS, CREATE_PROPERTY_FAILURE, FINISH_CREATE_REDIRECT} from '../actions'




export function* createNewPropertySaga(action) {
    try {
        console.log('create property saga');
        const response = yield call(createPropertyService, action);
        yield [
            put({ type: CREATE_PROPERTY_SUCCESS, response }),
            put({type: FINISH_CREATE_REDIRECT})


        ];
        push('/');
        push('/');
    } catch(error) {
        yield put({ type: CREATE_PROPERTY_FAILURE, error })
    }
}
