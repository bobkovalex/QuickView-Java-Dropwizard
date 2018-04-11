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
    private String hostAddress;
    private String httpPort;

    public QuickView(QuickViewConfig quickViewConfig){
        super((quickViewConfig.getResources().getRunAsService())? "quickview-service.ftl" : "quickview.ftl", Charset.forName("UTF-8"));
        filesDirectory = quickViewConfig.getApplication().getFilesDirectory();
        fontsDirectory = quickViewConfig.getApplication().getFontsDirectory();
        hostAddress = quickViewConfig.getServer().getHostAddress();
        httpPort = String.valueOf(quickViewConfig.getServer().getHttpPort());
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

    public String getHostAddress() {
        return hostAddress;
    }

    public void setHostAddress(String hostAddress) {
        this.hostAddress = hostAddress;
    }

    public String getHttpPort() {
        return httpPort;
    }

    public void setHttpPort(String httpPort) {
        this.httpPort = httpPort;
    }
}
