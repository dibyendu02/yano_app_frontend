package com.yano_frontend;

import android.util.Log;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.linktop.MonitorDataTransmissionManager;
import com.linktop.MonitorDataTransmissionManager.OnServiceBindListener;
import com.linktop.MonitorDataTransmissionManager.ReadBPFileThread;
import com.linktop.constant.BluetoothState; 

public class HealthMonitorModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    // Singleton instance of MonitorDataTransmissionManager
    private MonitorDataTransmissionManager monitorDataManager;

    public HealthMonitorModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        monitorDataManager = MonitorDataTransmissionManager.getInstance();
    }

    @Override
    public String getName() {
        return "HealthMonitor";
    }


    @ReactMethod
    public void bindService(Promise promise) {
        Log.d("HealthMonitorModule", "Attempting to bind service...");
        monitorDataManager.bind(
            MonitorDataTransmissionManager.DeviceType.HEALTH_MONITOR, // Correct reference to DeviceType
            new OnServiceBindListener() { // Correct usage for the OnServiceBindListener inner class
                @Override
                public void onServiceBind() {
                    Log.d("HealthMonitorModule", "Service bound successfully.");
                    promise.resolve("Service bound successfully.");

                    // Set up the blood pressure result listener
                    setupBpResultListener();
                }

                @Override
                public void onServiceUnbind() {
                    Log.d("HealthMonitorModule", "Service unbound.");
                    promise.resolve("Service unbound.");
                }

                @Override
                public void onSDKThrowable(Throwable e) {
                    Log.e("HealthMonitorModule", "SDK Error: " + e.getMessage());
                    promise.reject("SDK_ERROR", e.getMessage());
                }
            }
        );
    }

    @ReactMethod
    public void unbindService(Promise promise) {
        try {
            monitorDataManager.unBind(); // Corrected method name
            Log.d("HealthMonitorModule", "Service unbound successfully.");
            promise.resolve("Service unbound successfully.");
        } catch (Exception e) {
            Log.e("HealthMonitorModule", "Error unbinding service: " + e.getMessage());
            promise.reject("UNBIND_ERROR", e.getMessage());
        }
    }

    // Start heart rate (blood pressure) measurement
    @ReactMethod
    public void startHeartRateMeasurement(Promise promise) {
        try {
            if (monitorDataManager.isMeasuring()) {
                promise.reject("MEASUREMENT_ERROR", "A measurement is already in progress.");
                return;
            }

            // Start blood pressure measurement, which includes heart rate
            monitorDataManager.startMeasure(MonitorDataTransmissionManager.MeasureType.BP); 
            Log.d("HealthMonitorModule", "Heart rate (blood pressure) measurement started."); 
            promise.resolve("Measurement started successfully.");
        } catch (Exception e) {
            Log.e("HealthMonitorModule", "Error starting measurement: " + e.getMessage());
            promise.reject("MEASUREMENT_ERROR", e.getMessage());
        }
    }

    // Stop heart rate (blood pressure) measurement
    @ReactMethod
    public void stopHeartRateMeasurement(Promise promise) {
        try {
            monitorDataManager.stopMeasure();
            Log.d("HealthMonitorModule", "Heart rate (blood pressure) measurement stopped.");
            promise.resolve("Measurement stopped successfully.");
        } catch (Exception e) {
            Log.e("HealthMonitorModule", "Error stopping measurement: " + e.getMessage());
            promise.reject("MEASUREMENT_ERROR", e.getMessage());
        }
    }

    // Set up blood pressure result listener
    private void setupBpResultListener() {
        monitorDataManager.setOnBpResultListener(new MonitorDataTransmissionManager.OnBpResultListener() { // Correct path to OnBpResultListener
            @Override
            public void onBpResult(int systolicPressure, int diastolicPressure, int heartRate) {
                Log.d("HealthMonitorModule", "BP Result - Systolic: " + systolicPressure +
                        ", Diastolic: " + diastolicPressure + ", Heart Rate: " + heartRate);
                sendHeartRateResult(systolicPressure, diastolicPressure, heartRate);
            }

            @Override
            public void onLeakError(int errorType) {
                Log.e("HealthMonitorModule", "Blood Pressure Measurement Error: " + errorType);
                sendHeartRateError("Measurement error occurred. Error Type: " + errorType);
            }
        });
    }

    // Send heart rate result to React Native
    private void sendHeartRateResult(int systolicPressure, int diastolicPressure, int heartRate) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit("HeartRateResultEvent", "Systolic: " + systolicPressure +
                    ", Diastolic: " + diastolicPressure + ", Heart Rate: " + heartRate);
    }

    // Send heart rate error to React Native
    private void sendHeartRateError(String error) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit("HeartRateErrorEvent", error);
    }

    // Check if a measurement is ongoing
    @ReactMethod
    public void isMeasuring(Promise promise) {
        try {
            boolean measuring = monitorDataManager.isMeasuring();
            promise.resolve(measuring);
        } catch (Exception e) {
            Log.e("HealthMonitorModule", "Error checking measurement status: " + e.getMessage());
            promise.reject("MEASURING_STATUS_ERROR", e.getMessage());
        }
    }
}
