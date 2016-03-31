package com.aliensoft.quickview.views;

import com.aliensoft.quickview.config.QuickViewConfig;
import com.yammer.dropwizard.views.View;
import java.nio.charset.Charset;

/**
 * @author Alex Bobkov
 */

public class QuickView extends View {
    private String filesDirectory;

    public QuickView(QuickViewConfig quickViewConfig){
        super((quickViewConfig.getRunAsService())? "quickview-service.ftl" : "quickview.ftl", Charset.forName("UTF-8"));
        filesDirectory = quickViewConfig.getFilesDirectory();
    }

    public String getFilesDirectory() {
        return filesDirectory;
    }

    public void setFilesDirectory(String filesDirectory) {
        this.filesDirectory = filesDirectory;
    }
}
