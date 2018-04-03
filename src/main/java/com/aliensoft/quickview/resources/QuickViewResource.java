package com.aliensoft.quickview.resources;

import com.aliensoft.quickview.config.QuickViewConfig;
import com.aliensoft.quickview.domain.web.MediaType;
import com.aliensoft.quickview.domain.wrapper.ErrorMsgWrapper;
import com.aliensoft.quickview.domain.wrapper.FileDescriptionWrapper;
import com.aliensoft.quickview.domain.wrapper.RotatedPageWrapper;
import com.aliensoft.quickview.views.QuickView;
import com.google.gson.Gson;
import com.groupdocs.viewer.config.ViewerConfig;
import com.groupdocs.viewer.converter.options.HtmlOptions;
import com.groupdocs.viewer.domain.FileDescription;
import com.groupdocs.viewer.domain.containers.DocumentInfoContainer;
import com.groupdocs.viewer.domain.containers.FileListContainer;
import com.groupdocs.viewer.domain.options.DocumentInfoOptions;
import com.groupdocs.viewer.domain.options.FileListOptions;
import com.groupdocs.viewer.domain.options.RotatePageOptions;
import com.groupdocs.viewer.handler.ViewerHtmlHandler;
import com.groupdocs.viewer.licensing.License;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import java.io.File;
import java.util.ArrayList;

/**
 * QuickView
 *
 * @author Alex Bobkov
 */

@Path(value = "/viewer")
public class QuickViewResource extends QuickViewResourcesBase{
    private final QuickViewConfig quickViewConfig;
    private final ViewerHtmlHandler viewerHtmlHandler;
    //private final ViewerImageHandler viewerImageHandler;

    public QuickViewResource(QuickViewConfig quickViewConfig){
        this.quickViewConfig = quickViewConfig;
        // create viewer application configuration
        ViewerConfig config = new ViewerConfig();
        config.setStoragePath(quickViewConfig.getFilesDirectory());
        config.setUseCache(true);
        config.getFontDirectories().add(quickViewConfig.getFontsDirectory());
        // set GroupDocs license
        License license = new License();
        license.setLicense(quickViewConfig.getLicensePath());
        // initialize viewer instance for the HTML mode
        viewerHtmlHandler = new ViewerHtmlHandler(config);
    }

    @GET
    public QuickView getView(){
        // initiate index page
        return new QuickView(quickViewConfig);
    }

    /*
    ***********************************************************
    * FILE TREE
    ***********************************************************
    */
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
        FileListOptions fileListOptions = new FileListOptions(relDirPath);
        // get not allowed for view elements
        String tempFolderName =  new ViewerConfig().getCacheFolderName();

        try{
            FileListContainer fileListContainer = viewerHtmlHandler.getFileList(fileListOptions);

            ArrayList<FileDescriptionWrapper> fileList = new ArrayList<>();
            // parse file lists
            for(FileDescription fd : fileListContainer.getFiles()){
                FileDescriptionWrapper fileDescription = new FileDescriptionWrapper();
                fileDescription.setGuid(fd.getGuid());
                // check if current element can be shown to user
                File hiddenFile = new File(fileDescription.getGuid());
                if(tempFolderName.equals(fd.getName())
                        || hiddenFile.isHidden()) {
                    continue;
                } else {
                    fileDescription.setName(fd.getName());
                }
                fileDescription.setDocType(fd.getDocumentType());
                fileDescription.setDirectory(fd.isDirectory());
                fileDescription.setSize(fd.getSize());
                // add object to array list
                fileList.add(fileDescription);
            }
            return objectToJson(fileList);
        }catch (Exception ex){
            // set exception message
            ErrorMsgWrapper errorMsgWrapper = new ErrorMsgWrapper();
            errorMsgWrapper.setError(ex.getMessage());
            return objectToJson(errorMsgWrapper);
        }
    }

    /*
    ***********************************************************
    * DOCUMENT DESCRIPTION
    ***********************************************************
    */
    @GET
    @Path(value = "/getDocumentDescription")
    public Object getDocumentDescription(@Context HttpServletRequest request, @Context HttpServletResponse response){
        // set response content type
        setResponseContentType(response, MediaType.APPLICATION_JSON);
        try {
            //set parameters
            String documentGuid = "/Users/Alex/Documents/GroupDocs/java-codeconventions.pdf";
            // get/set document description
            DocumentInfoOptions documentInfoOptions = new DocumentInfoOptions(documentGuid);
            DocumentInfoContainer documentInfoContainer = viewerHtmlHandler.getDocumentInfo(documentGuid, documentInfoOptions);
            // return document description
            return objectToJson(documentInfoContainer.getPages());
        }catch (Exception ex){
            // set exception message
            ErrorMsgWrapper errorMsgWrapper = new ErrorMsgWrapper();
            errorMsgWrapper.setError(ex.getMessage());
            return objectToJson(errorMsgWrapper);
        }
    }

    @POST
    @Path(value = "/loadDocumentDescription")
    public Object loadDocumentDescription(@Context HttpServletRequest request, @Context HttpServletResponse response){
        // set response content type
        setResponseContentType(response, MediaType.APPLICATION_JSON);
        try {
            // get request body
            String requestBody = getRequestBody(request);
            // get/set parameters
            String documentGuid = getJsonString(requestBody, "guid");
            // get/set document description
            DocumentInfoOptions documentInfoOptions = new DocumentInfoOptions(documentGuid);
            DocumentInfoContainer documentInfoContainer = viewerHtmlHandler.getDocumentInfo(documentGuid, documentInfoOptions);
            System.out.println(documentInfoOptions.getCellsOptions());
            System.out.println(documentInfoOptions.getEmailOptions());
            System.out.println(documentInfoContainer.getGuid());
            System.out.println(documentInfoOptions.getPassword());
            System.out.println(documentInfoOptions.getWordsOptions());
            // return document description
            return objectToJson(documentInfoContainer.getPages());
        }catch (Exception ex){
            // set exception message
            ErrorMsgWrapper errorMsgWrapper = new ErrorMsgWrapper();
            errorMsgWrapper.setError(ex.getMessage());
            return objectToJson(errorMsgWrapper);
        }
    }

    /*
    ***********************************************************
    * DOCUMENT PAGES
    ***********************************************************
    */
    @GET
    @Path(value = "/getDocumentPage")
    public Object getDocumentPage(@Context HttpServletRequest request, @Context HttpServletResponse response){
        try {
            // set response content type
            setResponseContentType(response, MediaType.TEXT_HTML);
            // set parameters
            String documentGuid = "/Users/Alex/Documents/GroupDocs/java-codeconventions.pdf";
            int pageNumber = 1;
            int countPagesToConvert = 1;
            // set options
            HtmlOptions htmlOptions = new HtmlOptions();
            htmlOptions.setPageNumber(pageNumber);
            htmlOptions.setCountPagesToRender(countPagesToConvert);
            htmlOptions.setResourcesEmbedded(true);
            // return html
            return viewerHtmlHandler.getPages(documentGuid, htmlOptions).get(0).getHtmlContent();
        }catch (Exception ex){
            // set response content type
            setResponseContentType(response, MediaType.APPLICATION_JSON);
            // set exception message
            ErrorMsgWrapper errorMsgWrapper = new ErrorMsgWrapper();
            errorMsgWrapper.setError(ex.getMessage());
            return objectToJson(errorMsgWrapper);
        }
    }

    @POST
    @Path(value = "/loadDocumentPage")
    public Object loadDocumentPage(@Context HttpServletRequest request, @Context HttpServletResponse response){
        try {
            // set response content type
            setResponseContentType(response, MediaType.TEXT_HTML);
            // get request body
            String requestBody = getRequestBody(request);
            // get/set parameters
            String documentGuid = getJsonString(requestBody, "guid");
            int pageNumber = getJsonInteger(requestBody, "page");
            // set options
            HtmlOptions htmlOptions = new HtmlOptions();
            htmlOptions.setPageNumber(pageNumber);
            htmlOptions.setCountPagesToRender(1);
            htmlOptions.setResourcesEmbedded(true);
            // return html
            return viewerHtmlHandler.getPages(documentGuid, htmlOptions).get(0).getHtmlContent();
        }catch (Exception ex){
            // set response content type
            setResponseContentType(response, MediaType.APPLICATION_JSON);
            // set exception message
            ErrorMsgWrapper errorMsgWrapper = new ErrorMsgWrapper();
            errorMsgWrapper.setError(ex.getMessage());
            return objectToJson(errorMsgWrapper);
        }
    }

    /*
     ***********************************************************
     * PAGES ROTATION
     ***********************************************************
     */
    @POST
    @Path(value = "/rotateDocumentPages")
    public Object rotateDocumentPages(@Context HttpServletRequest request, @Context HttpServletResponse response){
        try {
            // set response content type
            setResponseContentType(response, MediaType.APPLICATION_JSON);
            // get request body
            String requestBody = getRequestBody(request);
            // get/set parameters
            String documentGuid = getJsonString(requestBody, "guid");
            int angle =  Integer.parseInt(getJsonString(requestBody, "angle"));
            JSONArray pages = new JSONObject(requestBody).getJSONArray("pages");
            // a list of the rotated pages info
            ArrayList<RotatedPageWrapper> rotatedPages = new ArrayList<RotatedPageWrapper>();
            // rotate pages
            for(int i = 0; i < pages.length(); i++) {
                // prepare reotated page info object
                RotatedPageWrapper rotatedPage = new RotatedPageWrapper();
                int pageNumber = Integer.parseInt(pages.get(i).toString());
                RotatePageOptions rotateOptions = new RotatePageOptions(pageNumber, angle);
                // Perform page rotation
                viewerHtmlHandler.rotatePage(documentGuid, rotateOptions);
                // set rotated page info for results
                rotatedPage.setPageNumber(pageNumber);
                String resultAngle = String.valueOf(viewerHtmlHandler.getDocumentInfo(documentGuid).getPages().get(pageNumber - 1).getAngle());
                rotatedPage.setAngle(resultAngle);
                // add rotated page in to the resulting array
                rotatedPages.add(rotatedPage);
            }
            return new Gson().toJson(rotatedPages);
        }catch (Exception ex){
            // set response content type
            setResponseContentType(response, MediaType.APPLICATION_JSON);
            // set exception message
            ErrorMsgWrapper errorMsgWrapper = new ErrorMsgWrapper();
            errorMsgWrapper.setError(ex.getMessage());
            return objectToJson(errorMsgWrapper);
        }
    }
}
