package com.rndemo;

import android.app.Application;

import com.facebook.react.ReactApplication;
import me.listenzz.modal.TranslucentModalReactPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.github.yamill.orientation.OrientationPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.zmxv.RNSound.RNSoundPackage;

import org.reactnative.camera.RNCameraPackage;

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
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new TranslucentModalReactPackage(),
                    new RNSpinkitPackage(),
                    new RNCardViewPackage(),
                    new FingerprintAuthPackage(),
                    new RNSoundPackage(),
                    new OrientationPackage(),
                    new RNCameraPackage(),
                    new VectorIconsPackage()
            );
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
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
