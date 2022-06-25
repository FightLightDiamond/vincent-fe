import {put, takeLeading} from 'redux-saga/effects'
import {
  signIn,
  signInSuccess,
  signInFail,
} from '../reducers/auth.slice'
import {message as msg} from "antd";
import authService from "../../services/auth.service";
import {IAction} from "../IAction";

function* signInWorker(action: IAction<any>): any {
  const [response, error] = yield authService.signIn(action.payload)
  if (error) {
    msg.error(error.toString())
    yield put({type: signInFail.type})
  } else {
    const {data} = response
    const payload = data
    yield put({type: signInSuccess.type, payload})
  }
}

function* authWatcher() {
  yield takeLeading(signIn.type, signInWorker)
}

export default authWatcher
