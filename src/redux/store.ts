import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/authSlice';
import adminReducer from "./admin/adminSlice";
import aircraftReducer from './aircraft/aircraftSlice';
import destinationsReducer from './destination/destinationSlice';
import seatReducer from './seat/seatSlice';
import flightReudcer from './flight/flightSlice';
import bookingReducer from './booking/bookingSlice';
import foodReducer from './food/foodSlice';
import offerReducer from './offer/offerSlice';
import providerBookingsReducer from './providerBooking/peoviderBookingSlice';
import walletReducer from './wallet/walletSlice';

const persistConfig = {
    key:"root",
    storage,
    whitelist:["auth"]
};

const persistedReducer = persistReducer(persistConfig, authReducer);



const store = configureStore({
    reducer:{
        auth: persistedReducer,
        admin:adminReducer,
        aircraft:aircraftReducer,
        destinations:destinationsReducer,
        seat:seatReducer,
        flight:flightReudcer,
        booking:bookingReducer,
        food:foodReducer,
        offer:offerReducer,
        providerBooking:providerBookingsReducer,
        wallet:walletReducer

        

    },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/PURGE",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/REMOVE",
        ],
      },
    }),

})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
