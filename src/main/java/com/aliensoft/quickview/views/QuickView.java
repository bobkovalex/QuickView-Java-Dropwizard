package com.aliensoft.quickview.views;

import com.aliensoft.quickview.config.QuickViewConfig;
import io.dropwizard.views.View;
import java.nio.charset.Charset;

/**
 * @author Alex Bobkov
 */

public class QuickView extends View {
    private QuickViewConfig config;

    public QuickView(QuickViewConfig quickViewConfig){
        super((quickViewConfig.getResources().getRunAsService())? "quickview-service.ftl" : "quickview.ftl", Charset.forName("UTF-8"));
        config = quickViewConfig;
    }

    public QuickViewConfig getConfig() {
        return config;
    }

    public void setConfig(QuickViewConfig config) {
        this.config = config;
    }

}
