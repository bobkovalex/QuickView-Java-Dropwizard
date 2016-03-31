package com.aliensoft.quickview.resources;

import com.aliensoft.quickview.config.QuickViewConfig;
import com.aliensoft.quickview.domain.web.MediaType;
import com.aliensoft.quickview.domain.wrapper.FileDescriptionWrapper;
import com.aliensoft.quickview.views.QuickView;
import com.groupdocs.viewer.config.ViewerConfig;
import com.groupdocs.viewer.converter.options.HtmlOptions;
import com.groupdocs.viewer.domain.FileDescription;
import com.groupdocs.viewer.domain.containers.DocumentInfoContainer;
import com.groupdocs.viewer.domain.containers.FileTreeContainer;
import com.groupdocs.viewer.domain.options.DocumentInfoOptions;
import com.groupdocs.viewer.domain.options.FileTreeOptions;
import com.groupdocs.viewer.handler.ViewerHtmlHandler;
import com.groupdocs.viewer.licensing.License;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import java.util.ArrayList;

/**
 * QuickView
 *
 * @author Alex Bobkov
 */

@Path(value = "")
public class QuickViewResource extends QuickViewResourcesBase{
    private final QuickViewConfig quickViewConfig;
    private final ViewerHtmlHandler viewerHtmlHandler;

    public QuickViewResource(QuickViewConfig quickViewConfig){
        this.quickViewConfig = quickViewConfig;
        // create viewer application configuration
        ViewerConfig config = new ViewerConfig();
        config.setStoragePath(quickViewConfig.getFilesDirectory());
        config.setUseCache(true);
        License license = new License();
        license.setLicense(quickViewConfig.getLicensePath());
        // initialize viewer instance
        viewerHtmlHandler = new ViewerHtmlHandler(config);
    }

    @GET
    public QuickView getView(){
        // initiate index page
        return new QuickView(quickViewConfig);
    }

    @GET
    @Path(value = "/getFileTree")
    public Object getFileTree(@Context HttpServletRequest request, @Context HttpServletResponse response){
        return loadFileTree(request, response);
    }

    @POST
    @Path(value = "/loadFileTree")
    public Object loadFileTree(@Context HttpServletRequest request, @Context HttpServletResponse response){
        // set response content type
        setResponseContentType(response, MediaType.APPLICATION_JSON);
        // get request body
        String requestBody = getRequestBody(request);
        String relDirPath = getJsonString(requestBody, "path");
        // get file list from storage path
        FileTreeOptions fileTreeOptions = new FileTreeOptions(relDirPath);
        FileTreeContainer fileTreeContainer = viewerHtmlHandler.loadFileTree(fileTreeOptions);

        ArrayList<FileDescriptionWrapper> fileList = new ArrayList<>();
        // parse file lists
        for(FileDescription fd : fileTreeContainer.getFileTree()){
            FileDescriptionWrapper fileDescription = new FileDescriptionWrapper();
            fileDescription.setGuid(fd.getGuid());
            fileDescription.setName(fd.getName());
            fileDescription.setDocType(fd.getDocumentType());
            fileDescription.setDirectory(fd.isDirectory());
            fileDescription.setSize(fd.getSize());
            // add object to array list
            fileList.add(fileDescription);
        }
        return objectToJson(fileList);
    }

    @GET
    @Path(value = "/getDocumentDescription")
    public Object getDocumentDescription(@Context HttpServletRequest request, @Context HttpServletResponse response) throws Exception {
        request.setAttribute("guid", "/Users/Alex/Documents/GroupDocs/10_page.doc");
        return loadDocumentDescription(request, response);
    }

    @POST
    @Path(value = "/loadDocumentDescription")
    public Object loadDocumentDescription(@Context HttpServletRequest request, @Context HttpServletResponse response) throws Exception {
        // set response content type
        setResponseContentType(response, MediaType.APPLICATION_JSON);
        // get request body
        String requestBody = getRequestBody(request);
        String documentGuid = getJsonString(requestBody, "guid");
        // GET dummy values
        if(documentGuid == null || documentGuid.isEmpty()){
            documentGuid = request.getAttribute("guid").toString();
        }
        // get document description
        DocumentInfoOptions documentInfoOptions = new DocumentInfoOptions(documentGuid);
        DocumentInfoContainer documentInfoContainer = viewerHtmlHandler.getDocumentInfo(documentInfoOptions);

        return objectToJson(documentInfoContainer.getPages());
    }

    @GET
    @Path(value = "/getDocumentPage")
    public Object getDocumentPage(@Context HttpServletRequest request, @Context HttpServletResponse response) throws Exception {
        request.setAttribute("guid", "/Users/Alex/Documents/GroupDocs/10_page.doc");
        request.setAttribute("pageNumber", 1);
        return loadDocumentPage(request, response);
    }

    @POST
    @Path(value = "/loadDocumentPage")
    public Object loadDocumentPage(@Context HttpServletRequest request, @Context HttpServletResponse response) throws Exception {
        // set response content type
        setResponseContentType(response, MediaType.TEXT_HTML);
        // get request body
        String requestBody = getRequestBody(request);
        String documentGuid = getJsonString(requestBody, "guid");
        // GET dummy values
        if(documentGuid == null || documentGuid.isEmpty()){
            documentGuid = request.getAttribute("guid").toString();
        }
        int pageNumber = getJsonInteger(requestBody, "page");
        HtmlOptions htmlOptions = new HtmlOptions();
        htmlOptions.setPageNumber(pageNumber);
        htmlOptions.setResourcesEmbedded(true);

        return viewerHtmlHandler.getPages(documentGuid, htmlOptions).get(0).getHtmlContent();
    }

}
