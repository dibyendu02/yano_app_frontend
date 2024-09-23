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

    // Define error constants manually if they are not available in BgmManager
    private static final int ERROR_DEVICE_MISS = 1;
    private static final int ERROR_CONNECT_ERROR = 2;
    private static final int ERROR_MESSAGE_TIMEOUT = 3;
    private static final int ERROR_BLUETOOTH_CLOSE = 4;
    private static final int ERROR_BLE_NO_PERMISSION = 5;
    private static final int ERROR_CALIBRATION_TIME = 6;
    private static final int ERROR_HISTORY_EMPTY = 7;

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
        BgmManager.getInstance().init(reactContext);
        Log.d("BgmManagerModule", "BgmManager initialized successfully");
    }

    @ReactMethod
    public void getHistory(String deviceSn, int eventIndex, Promise promise) {
        BgmManager.getInstance().getHistory(deviceSn, eventIndex, new Callback() {
            @Override
            public void onFailure(int code) {
                Log.e("BgmManagerModule", "Error code: " + code);
                String errorMessage = getErrorMessage(code);
                promise.reject(String.valueOf(code), errorMessage);
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

    // Updated getErrorMessage method to use defined constants
    private String getErrorMessage(int code) {
        switch (code) {
            case ERROR_DEVICE_MISS:
                return "Device not found!";
            case ERROR_CONNECT_ERROR:
                return "Connection failed!";
            case ERROR_MESSAGE_TIMEOUT:
                return "Communication timeout!";
            case ERROR_BLUETOOTH_CLOSE:
                return "Bluetooth turned off!";
            case ERROR_BLE_NO_PERMISSION:
                return "Bluetooth permission not opened!";
            case ERROR_CALIBRATION_TIME:
                return "Location services turned off!";
            case ERROR_HISTORY_EMPTY:
                return "No data!";
            default:
                return "Something went wrong!";
        }
    }
}
