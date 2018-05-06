package com.aliensoft.quickview;

import com.aliensoft.quickview.config.QuickViewConfig;
import com.aliensoft.quickview.health.TemplateHealthCheck;
import com.aliensoft.quickview.manager.WebAssetsManager;
import com.aliensoft.quickview.resources.QuickViewResource;
import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.dropwizard.views.ViewBundle;
import org.eclipse.jetty.servlets.CrossOriginFilter;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import java.util.EnumSet;

/**
 *
 * @author Alex Bobkov
 */

public class MainService extends Application<QuickViewConfig> {
    
    public static void main( String[] args ) throws Exception{
        new MainService().run(args);
    }

    @Override
    public void initialize(Bootstrap<QuickViewConfig> bootstrap) {
        // add assets bundle in order to get resources from assets directory
        bootstrap.addBundle(new AssetsBundle());
        // init view bundle
        bootstrap.addBundle(new ViewBundle());
    }

    @Override
    public void run(QuickViewConfig config, Environment environment) throws Exception {
        // Enable CORS headers
        final FilterRegistration.Dynamic cors = environment.servlets().addFilter("CORS", CrossOriginFilter.class);

        // Configure CORS parameters
        cors.setInitParameter("allowedOrigins", "*");
        cors.setInitParameter("allowedHeaders", "X-Requested-With,Content-Type,Accept,Origin");
        cors.setInitParameter("allowedMethods", "OPTIONS,GET,PUT,POST,DELETE,HEAD");

        // Add URL mapping
        cors.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "/*");

        // Get web resources for standalone mode
        if(!config.getResources().getRunAsService() && !config.getResources().isOfflineMode()){
            WebAssetsManager webAssetsManager = new WebAssetsManager();
            webAssetsManager.update(config.getResources().getResourcesUrl());
        }

        // Initiate QuickView
        environment.jersey().register(new QuickViewResource(config));

        // Add dummy health check to get rid of console warnings
        // TODO: implement health check
        final TemplateHealthCheck healthCheck = new TemplateHealthCheck("");
        environment.healthChecks().register("HelthCheck", healthCheck);
    }
}