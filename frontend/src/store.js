import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

const pointsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_POINTS':
            return action.points;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    points: pointsReducer, 
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, 
        }),
});
const persistor = persistStore(store);

export { store, persistor };
