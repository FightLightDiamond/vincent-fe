import {put, takeLeading} from 'redux-saga/effects'
import {
	index,
	indexError,
	indexSuccess,
	find,
	findError,
	findSuccess,
	store,
	storeError,
	storeSuccess,
	update,
	updateError,
	updateSuccess,
	destroy,
	destroyError,
	destroySuccess
} from '../reducers/lesson.slice'
import {message as msg} from "antd";
import Service from "../../services/lesson.service";
import {IAction} from "../IAction";

function* indexWorker(action: IAction<any>): any {
	const [response, error] = yield Service.index(action.payload)

	if (error) {
		msg.error(error.toString())
		yield put({type: indexError.toString()})
	} else {
			const {data} = response
			const payload = data
			yield put({type: indexSuccess.toString(), payload})
	}
}

function* storeWorker(action: IAction<any>): any {
	const [response, error] = yield Service.store(action.payload)

	if (error) {
		msg.error(error.toString())
		yield put({type: storeError.toString()})
	} else {
			const payload = response
			yield put({type: storeSuccess.toString(), payload})
	}
}

function* findWorker(action: IAction<number>): any {
	const [response, error] = yield Service.find(action.payload)

	console.log({response, error})

	if (error) {
		msg.error(error.toString())
		yield put({type: findError.toString()})
	} else {
			const payload = response
			yield put({type: findSuccess.toString(), payload})
	}
}

function* updateWorker(action: IAction<any>): any {
	const {id, body} = action.payload
	const [response, error] = yield Service.update(id, body)
	console.log({response})
	if (error) {
		msg.error(error.toString())
		yield put({type: updateError.toString()})
	} else {
			const payload = response
			yield put({type: updateSuccess.toString(), payload})
	}
}

function* destroyWorker(action: IAction<any>): any {
	const [response, error] = yield Service.delete(action.payload)

	if (error) {
		msg.error(error.toString())
		yield put({type: destroyError.toString()})
	} else {
			const payload = response
			yield put({type: destroySuccess.toString(), payload})
	}
}

function* Watcher() {
	yield takeLeading(index.toString(), indexWorker)
	yield takeLeading(find.toString(), findWorker)
	yield takeLeading(store.toString(), storeWorker)
	yield takeLeading(update.toString(), updateWorker)
	yield takeLeading(destroy.toString(), destroyWorker)
}

export default Watcher
