package com.aliensoft.quickview.resources;

import com.aliensoft.quickview.views.QuickView;
import com.aliensoft.quickview.config.QuickViewConfig;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

/**
 * QuickView
 *
 * @author Alex Bobkov
 */

@Path(value = "")
public class QuickViewResource {

    public QuickViewResource(QuickViewConfig config){

    }

    @GET
    public QuickView getView(){
        return new QuickView();
    }
}
