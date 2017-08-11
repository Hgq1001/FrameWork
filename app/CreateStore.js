/**
 * Created by chenakira on 2016/10/11.
 */

import {createStore,applyMiddleware} from 'redux'
import reducers from './reducers/IndexReducer'
import thunk from 'redux-thunk'

const middleware = applyMiddleware(thunk);

export default (data = {}) =>{
    return createStore(reducers,data,middleware);
}
