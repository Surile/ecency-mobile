import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import {configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import FilesystemStorage from 'redux-persist-filesystem-storage'
import createMigrate from 'redux-persist/es/createMigrate';
import Reactotron from '../../../reactotron-config';

import reducer from '../reducers';
import MigrationHelpers from '../../utils/migrationHelpers';

const transformCacheVoteMap = createTransform(
  (inboundState: any) => ({
    ...inboundState,
    votes: Array.from(inboundState.votes),
    comments: Array.from(inboundState.comments),
    drafts: Array.from(inboundState.drafts),
    subscribedCommunities: Array.from(inboundState.subscribedCommunities),
    pointActivities: Array.from(inboundState.pointActivities),
  }),
  (outboundState) => ({
    ...outboundState,
    votes: new Map(outboundState.votes),
    comments: new Map(outboundState.comments),
    drafts: new Map(outboundState.drafts),
    subscribedCommunities: new Map(outboundState.subscribedCommunities),
    pointActivities: new Map(outboundState.pointActivities),
  }),
  { whitelist: ['cache'] },
);

const transformWalkthroughMap = createTransform(
  (inboundState: any) => ({
    ...inboundState,
    walkthroughMap: Array.from(inboundState.walkthroughMap),
  }),
  (outboundState) => ({ ...outboundState, walkthroughMap: new Map(outboundState.walkthroughMap) }),
  { whitelist: ['walkthrough'] },
);

// Middleware: Redux Persist Config
// const persistConfig = {
//   // Root
//   key: 'root',
//   // Storage Method (React Native)
//   storage: FilesystemStorage,
//   // version: 1, // New version 0, default or previous version -1, versions are useful migrations
//   // migrate: createMigrate(MigrationHelpers.reduxMigrations, { debug: false }),
//   // Blacklist (Don't Save Specific Reducers)
//   blacklist: ['communities', 'user', 'ui'],
//   timeout: 0,
//   // transforms: [transformCacheVoteMap, transformWalkthroughMap],

// };

// Middleware: Redux Persist Persisted Reducer
// const persistedReducer = persistReducer(persistConfig, reducer as any);

const middleware = [thunk];

// const enhancers = __DEV__
//   ? compose(applyMiddleware(...middleware), Reactotron.createEnhancer())
//   : applyMiddleware(...middleware);

const store = configureStore({
  reducer,
  middleware
}) 


// (persistedReducer, enhancers);

const persistor = {}// persistStore(store);

export { store, persistor };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
