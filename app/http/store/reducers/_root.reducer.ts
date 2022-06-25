import { combineReducers } from "redux";
import { IAction } from '../IAction';
import authReducer from './auth.slice';
import wsReducer from './ws.slice';
import tutorialReducer from './tutorial.slice'
import lessonReducer from './lesson.slice'
import taskReducer from './task.slice'

const appReducer = combineReducers({
	auth: authReducer,
	lesson: lessonReducer,
	task: taskReducer,
	tutorial: tutorialReducer,
	ws: wsReducer,
})

const _rootReducer = (state: any, action: IAction<any>) => {
    return appReducer(state, action);
}

export type RootState = ReturnType<typeof _rootReducer>

export default _rootReducer;
