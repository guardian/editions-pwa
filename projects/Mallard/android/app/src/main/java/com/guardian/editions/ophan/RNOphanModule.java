package com.guardian.editions.ophan;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import ophan.OphanKt;

import javax.annotation.Nonnull;

class RNOphanModule extends ReactContextBaseJavaModule {

    public RNOphanModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "Ophan";
    }

    @ReactMethod
    public void getGreeting(Callback callback) {
        String kotlinGreeting = OphanKt.hello();
        callback.invoke(kotlinGreeting);
    }
}