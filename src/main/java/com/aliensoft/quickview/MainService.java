package com.aliensoft.quickview;


import com.aliensoft.quickview.config.QuickViewConfig;
import com.aliensoft.quickview.health.TemplateHealthCheck;
import com.aliensoft.quickview.resources.QuickViewResource;
import com.yammer.dropwizard.Service;
import com.yammer.dropwizard.assets.AssetsBundle;
import com.yammer.dropwizard.config.Bootstrap;
import com.yammer.dropwizard.config.Environment;
import com.yammer.dropwizard.config.FilterBuilder;
import com.yammer.dropwizard.views.ViewBundle;
import org.eclipse.jetty.servlets.CrossOriginFilter;

/**
 *
 * @author Alex Bobkov
 */

public class MainService extends Service<QuickViewConfig>{
    
    public static void main( String[] args ) throws Exception{
        new MainService().run(args);
    }

    @Override
    public void initialize(Bootstrap<QuickViewConfig> bootstrap) {
        bootstrap.setName("QuickView for Java");
        // add assets bundle in order to get resources from assets directory
        bootstrap.addBundle(new AssetsBundle());
        // init view bundle
        bootstrap.addBundle(new ViewBundle());
    }

    @Override
    public void run(QuickViewConfig config, Environment enviroment) throws Exception {
        // Set cross origin filter
        FilterBuilder filterConfig = enviroment.addFilter(CrossOriginFilter.class, "/*");
        filterConfig.setInitParam(CrossOriginFilter.ACCESS_CONTROL_ALLOW_ORIGIN_HEADER, "*");
        // Initiate QuickView
        enviroment.addResource(new QuickViewResource(config));
        // Add dummy health check to get rid of console warnings
        // TODO: implement health check
        final TemplateHealthCheck healthCheck = new TemplateHealthCheck("");
        enviroment.addHealthCheck(healthCheck);
    }
}
