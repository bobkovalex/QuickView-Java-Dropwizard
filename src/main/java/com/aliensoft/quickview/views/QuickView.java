package com.aliensoft.quickview.views;

import com.aliensoft.quickview.config.QuickViewConfig;
import io.dropwizard.views.View;
import java.nio.charset.Charset;

/**
 * @author Alex Bobkov
 */

public class QuickView extends View {
    private String filesDirectory;
    private String fontsDirectory;

    public QuickView(QuickViewConfig quickViewConfig){
        super((quickViewConfig.getRunAsService())? "quickview-service.ftl" : "quickview.ftl", Charset.forName("UTF-8"));
        filesDirectory = quickViewConfig.getFilesDirectory();
        fontsDirectory = quickViewConfig.getFontsDirectory();
    }

    public String getFilesDirectory() {
        return filesDirectory;
    }

    public void setFilesDirectory(String filesDirectory) {
        this.filesDirectory = filesDirectory;
    }

    public String getFontsDirectory() {
        return fontsDirectory;
    }

    public void setFontsDirectory(String fontsDirectory) {
        this.fontsDirectory = fontsDirectory;
    }
}
