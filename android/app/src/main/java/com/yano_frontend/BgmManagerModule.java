package com.yano_frontend;

import android.util.Log;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.microtechmd.bgmlib.BgmManager;
import com.microtechmd.bgmlib.entity.BgmHistoryEntity;
import com.microtechmd.bgmlib.inter.Callback;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

public class BgmManagerModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    public BgmManagerModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "BgmManager";
    }

    @ReactMethod
    public void init() {
        Log.d("BgmManagerModule", "Initializing BgmManager");
        // init func was here
        BgmManager.getInstance().init(reactContext);
        Log.d("BgmManagerModule", "BgmManager initialized successfully");
    }

    @ReactMethod
    public void getHistory(String deviceSn, int eventIndex, Promise promise) {
        BgmManager.getInstance().getHistory(deviceSn, eventIndex, new Callback() {
            @Override
            public void onFailure(int code) {
                promise.reject("SYNC_ERROR", "Sync error: " + code);
            }

            @Override
            public void onReceiveHistory(BgmHistoryEntity entity) {
                promise.resolve(entity.toString());
            }

            @Override
            public void onComplete() {
                promise.resolve("Sync completed");
            }
        });
    }
}
