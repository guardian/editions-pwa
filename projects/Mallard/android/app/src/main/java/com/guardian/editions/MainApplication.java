package com.guardian.editions;

import android.app.Application;

import android.util.Log;
import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.guardian.editions.ophan.OphanPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            @SuppressWarnings("UnnecessaryLocalVariable")
            List<ReactPackage> packages = new PackageList(this).getPackages();

            // packages.add(new MainReactPackage());
            // packages.add(new RNDeviceInfo());
            // packages.add(new NetInfoPackage());
            // packages.add(new RNSentryPackage());
            // packages.add(new ReactNativePushNotificationPackage());
            // packages.add(new ReactNativeConfigPackage());
            // packages.add(new KeychainPackage());
            // packages.add(new RNCMaskedViewPackage());
            // packages.add(new RNCWebViewPackage());
            // packages.add(new RNZipArchivePackage());
            // packages.add(new SvgPackage());
            // packages.add(new AsyncStoragePackage());
            // packages.add(new RNFetchBlobPackage());
            // packages.add(new RNScreensPackage());
            // packages.add(new RNGestureHandlerPackage());
            return packages;
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativeConfigPackage(),
            new KeychainPackage(),
            new RNCMaskedViewPackage(),
            new RNCWebViewPackage(),
            new RNZipArchivePackage(),
            new SvgPackage(),
            new AsyncStoragePackage(),
            new RNFetchBlobPackage(),
            new RNScreensPackage(),
            new RNGestureHandlerPackage(),
            new OphanPackage()
      );
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
