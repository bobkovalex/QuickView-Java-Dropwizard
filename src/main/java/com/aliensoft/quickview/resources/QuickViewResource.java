package com.aliensoft.quickview.resources;

import com.aliensoft.quickview.config.QuickViewConfig;
import com.aliensoft.quickview.views.QuickView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * QuickView
 *
 * @author Alex Bobkov
 */

@Path(value = "")
public class QuickViewResource {
    private final String DEFAULT_CHARSET = "UTF-8";

    public QuickViewResource(QuickViewConfig config){

    }

    @GET
    public QuickView getView(){
        return new QuickView();
    }

    @POST
    @Path(value = "/loadFilesTree")
    public Object loadFilesTree(@Context HttpServletRequest request, @Context HttpServletResponse response){
        try {
            response.setContentType("application/json");
            response.setCharacterEncoding(DEFAULT_CHARSET);
            response.getOutputStream().flush();
        } catch (IOException ex) {
            Logger.getLogger(QuickViewResource.class.getName()).log(Level.SEVERE, null, ex);
        }
        return "{\"fileNodeList\" : [{\"name\":\"John\", \"path\":\"Doe\", \"size\":\"Doe\", \"docType\":\"Word\"}, \n" +
                "    {\"name\":\"Anna\", \"path\":\"Smith\", \"size\":\"Doe\", \"docType\":\"Word\"}, \n" +
                "    {\"name\":\"Peter\",\"path\":\"Jones\", \"size\":\"Doe\", \"docType\":\"Word\"}]}";
    }
}
