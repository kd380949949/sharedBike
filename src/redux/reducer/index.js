/**
 * reducer
 */
import {combineReducers} from 'redux'
import {type} from '../action'
const initialState = {
    menuName: ''
}
const ebikeData = (initialState,action)=>{
    switch(action.type){
        case type.SWITCH_MENU:
            return {
                ...state,
                menuName:action.menuName
            };
        default:
            return {...state};  //保持默认state
    }
}
export default ebikeData;