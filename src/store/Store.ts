import { createReducers } from '../reducers/CombinedReducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import * as firebase from 'firebase';
import 'firebase/firestore';
// import { CONFIG } from '../firebase-config';

export const initializeStore = (app: firebase.app.App) => {
    const history = createBrowserHistory();
    firebase.firestore().settings({timestampsInSnapshots: true});

    return createStore(
        createReducers(history),
        composeWithDevTools(
            applyMiddleware(routerMiddleware(history), thunk.withExtraArgument({db: app.firestore()})),
        )
    );
}
