package com.yano_frontend

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.yano_frontend.BgmManagerPackage
import com.yano_frontend.HealthMonitorPackage

class MainApplication : Application(), ReactApplication {

    override val reactNativeHost: ReactNativeHost = object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> {
            // Get the default list of packages and add custom packages manually
            return PackageList(this).packages.apply {
                add(BgmManagerPackage())
                add(HealthMonitorPackage()) // Add custom package here
            }
        }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        // Enable New Architecture if defined in build config
        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED

        // Enable Hermes if defined in build config
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
    }

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, /* native exopackage */ false)

        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            // Load the New Architecture native entry point
            com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load()
        }
    }
}
