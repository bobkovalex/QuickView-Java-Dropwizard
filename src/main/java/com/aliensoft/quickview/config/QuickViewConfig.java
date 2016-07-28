package com.aliensoft.quickview.config;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.yammer.dropwizard.config.Configuration;

import javax.validation.Valid;

/**
 * Object to hold all application's configurations from yml file
 *
 * @author Alex Bobkov
 */
public class QuickViewConfig extends Configuration{
    @Valid
    @JsonProperty
    private String filesDirectory;

    @Valid
    @JsonProperty
    private Boolean runAsService;

    @Valid
    @JsonProperty
    private String licensePath;

    @Valid
    @JsonProperty
    private String fontsDirectory;

    public String getFilesDirectory() {
        return filesDirectory;
    }

    public void setFilesDirectory(String filesDirectory) {
        this.filesDirectory = filesDirectory;
    }

    public Boolean getRunAsService() {
        return runAsService;
    }

    public void setRunAsService(Boolean runAsService) {
        this.runAsService = runAsService;
    }

    public String getLicensePath() { return licensePath; }

    public void setLicensePath(String licensePath) {
        this.licensePath = licensePath;
    }

    public String getFontsDirectory() { return fontsDirectory; }

    public void setFontsDirectory(String fontsDirectory) { this.fontsDirectory = fontsDirectory; }
}
