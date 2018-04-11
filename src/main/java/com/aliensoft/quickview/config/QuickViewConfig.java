package com.aliensoft.quickview.config;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.dropwizard.Configuration;

import javax.validation.Valid;

/**
 * Object to hold all application's configurations from yml file
 *
 * @author Alex Bobkov
 */
public class QuickViewConfig extends Configuration{
    @Valid
    @JsonProperty
    private Application application;

    @Valid
    @JsonProperty
    private Resources resources;

    private Server server;

    public QuickViewConfig(){
        application = new Application();
        resources = new Resources();
        server = new Server();
    }

    public Application getApplication() {
        return application;
    }

    public Resources getResources() {
        return resources;
    }

    public Server getServer() {
        return server;
    }

    /**
     * Application related configurations
     */
    public class Application{
        @Valid
        @JsonProperty
        private String filesDirectory;

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

        public String getLicensePath() {
            return licensePath;
        }

        public void setLicensePath(String licensePath) {
            this.licensePath = licensePath;
        }

        public String getFontsDirectory() {
            return fontsDirectory;
        }

        public void setFontsDirectory(String fontsDirectory) {
            this.fontsDirectory = fontsDirectory;
        }
    }

    /**
     * Resources related configuration
     */
    public class Resources{
        @Valid
        @JsonProperty
        private Boolean runAsService;

        @Valid
        @JsonProperty
        private String resourcesUrl;

        public Boolean getRunAsService() {
            return runAsService;
        }

        public void setRunAsService(Boolean runAsService) {
            this.runAsService = runAsService;
        }

        public String getResourcesUrl() {
            return resourcesUrl;
        }

        public void setResourcesUrl(String resourcesUrl) {
            this.resourcesUrl = resourcesUrl;
        }
    }

    /**
     * Server related configurations
     */
    public class Server{
        private int httpPort;
        private String hostAddress;

        public int getHttpPort() {
            return httpPort;
        }

        public void setHttpPort(int httpPort) {
            this.httpPort = httpPort;
        }

        public String getHostAddress() {
            return hostAddress;
        }

        public void setHostAddress(String hostAddress) {
            this.hostAddress = hostAddress;
        }
    }

}


