import { all } from 'redux-saga/effects';
import authWatcher from './auth.saga';
import lessonWatcher from './lesson.saga';
import taskWatcher from './task.saga';
import tutorialWatcher from './tutorial.saga';
import wsWatcher from "./ws.saga";

export default function* _rootSaga() {
  yield all([
	  authWatcher(),
    lessonWatcher(),
    taskWatcher(),
    tutorialWatcher(),
    wsWatcher(),
  ]);
}
