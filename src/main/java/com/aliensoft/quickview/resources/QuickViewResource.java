package com.aliensoft.quickview.resources;

import com.aliensoft.quickview.config.QuickViewConfig;
import com.aliensoft.quickview.domain.web.MediaType;
import com.aliensoft.quickview.domain.wrapper.ErrorMsgWrapper;
import com.aliensoft.quickview.domain.wrapper.FileDescriptionWrapper;
import com.aliensoft.quickview.domain.wrapper.LoadedPageWrapper;
import com.aliensoft.quickview.domain.wrapper.RotatedPageWrapper;
import com.aliensoft.quickview.domain.wrapper.UploadedDocumentWrapper;
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
import io.dropwizard.jetty.ConnectorFactory;
import io.dropwizard.jetty.HttpConnectorFactory;
import io.dropwizard.server.SimpleServerFactory;
import org.apache.commons.io.FilenameUtils;
import org.eclipse.jetty.server.Request;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
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

    /**
     * Constructor
     * @param quickViewConfig config object
     */
    public QuickViewResource(QuickViewConfig quickViewConfig) throws UnknownHostException {
        this.quickViewConfig = quickViewConfig;
        // set HTTP port
        SimpleServerFactory serverFactory = (SimpleServerFactory) quickViewConfig.getServerFactory();
        ConnectorFactory connector = serverFactory.getConnector();
        quickViewConfig.getServer().setHttpPort(((HttpConnectorFactory) connector).getPort());
        // set host address
        quickViewConfig.getServer().setHostAddress(InetAddress.getLocalHost().getHostAddress());
        // create viewer application configuration
        ViewerConfig config = new ViewerConfig();
        config.setStoragePath(quickViewConfig.getApplication().getFilesDirectory());
        config.setUseCache(true);
        config.getFontDirectories().add(quickViewConfig.getApplication().getFontsDirectory());
        // set GroupDocs license
        License license = new License();
        license.setLicense(quickViewConfig.getApplication().getLicensePath());
        // initialize viewer instance for the HTML mode
        viewerHtmlHandler = new ViewerHtmlHandler(config);
    }

    /**
     * Get and set index page
     * @return html view
     */
    @GET
    public QuickView getView(){
        // initiate index page
        return new QuickView(quickViewConfig);
    }

    /**
     * Get files and directories
     * @param request
     * @param response
     * @return files and directories list
     */
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
        // get temp directory name
        String tempDirectoryName =  new ViewerConfig().getCacheFolderName();
        try{
            FileListContainer fileListContainer = viewerHtmlHandler.getFileList(fileListOptions);

            ArrayList<FileDescriptionWrapper> fileList = new ArrayList<>();
            // parse files/folders list
            for(FileDescription fd : fileListContainer.getFiles()){
                FileDescriptionWrapper fileDescription = new FileDescriptionWrapper();
                fileDescription.setGuid(fd.getName());
                // check if current file/folder is temp directory or is hidden
                if(tempDirectoryName.equals(fd.getName()) || new File(fileDescription.getGuid()).isHidden()) {
                    // ignore current file and skip to next one
                    continue;
                } else {
                    // set file/folder name
                    fileDescription.setName(fd.getName());
                }
                // set file type
                fileDescription.setDocType(fd.getDocumentType());
                // set is directory true/false
                fileDescription.setDirectory(fd.isDirectory());
                // set file size
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

    /**
     * Get document description
     * @param request
     * @param response
     * @return document description
     */
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
            // check if documentGuid contains path or only file name
            if(!Paths.get(documentGuid).isAbsolute()){
                documentGuid = quickViewConfig.getApplication().getFilesDirectory() + "/" + documentGuid;
            }
            // get document info options
            DocumentInfoOptions documentInfoOptions = new DocumentInfoOptions(documentGuid);
            // get document info container
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

    /**
     * Get document page
     * @param request
     * @param response
     * @return document page
     */
    @POST
    @Path(value = "/loadDocumentPage")
    public Object loadDocumentPage(@Context HttpServletRequest request, @Context HttpServletResponse response){
        try {
            // set response content type
            setResponseContentType(response, MediaType.APPLICATION_JSON);
            // get request body
            String requestBody = getRequestBody(request);
            // get/set parameters
            String documentGuid = getJsonString(requestBody, "guid");
            int pageNumber = getJsonInteger(requestBody, "page");
            LoadedPageWrapper loadedPage = new LoadedPageWrapper();
            // set options
            HtmlOptions htmlOptions = new HtmlOptions();
            htmlOptions.setPageNumber(pageNumber);
            htmlOptions.setCountPagesToRender(1);
            htmlOptions.setResourcesEmbedded(true);
            // get page HTML
            loadedPage.setPageHtml(viewerHtmlHandler.getPages(documentGuid, htmlOptions).get(0).getHtmlContent());
            // get page rotation angle
            String angle = String.valueOf(viewerHtmlHandler.getDocumentInfo(documentGuid).getPages().get(pageNumber - 1).getAngle());
            loadedPage.setAngle(angle);
            // return html
            return objectToJson(loadedPage);
        }catch (Exception ex){
            // set response content type
            setResponseContentType(response, MediaType.APPLICATION_JSON);
            // set exception message
            ErrorMsgWrapper errorMsgWrapper = new ErrorMsgWrapper();
            errorMsgWrapper.setError(ex.getMessage());
            return objectToJson(errorMsgWrapper);
        }
    }

    /**
     * Rotate page(s)
     * @param request
     * @param response
     * @return rotated pages list (each obejct contains page number and rotated angle information)
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
                // prepare rotated page info object
                RotatedPageWrapper rotatedPage = new RotatedPageWrapper();
                int pageNumber = Integer.parseInt(pages.get(i).toString());
                RotatePageOptions rotateOptions = new RotatePageOptions(pageNumber, angle);
                // perform page rotation
                viewerHtmlHandler.rotatePage(documentGuid, rotateOptions);
                // add rotated page number
                rotatedPage.setPageNumber(pageNumber);
                // add rotated page angle
                String resultAngle = String.valueOf(viewerHtmlHandler.getDocumentInfo(documentGuid).getPages().get(pageNumber - 1).getAngle());
                rotatedPage.setAngle(resultAngle);
                // add rotated page object into resulting list
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

    /**
     * Download document
     * @param request
     * @param response
     */
    @GET
    @Path(value = "/downloadDocument")
    public void downloadDocument(@Context HttpServletRequest request, @Context HttpServletResponse response) throws ServletException, IOException {
        int bytesRead = 0;
        int count = 0;
        byte[] buff = new byte[16 * 1024];
        OutputStream out = response.getOutputStream();
        // set response content type
        setResponseContentType(response, MediaType.APPLICATION_OCTET_STREAM);
        // get document path
        String documentGuid = request.getParameter("path");
        String fileName = new File(documentGuid).getName();
        // set response content disposition
        response.setHeader("Content-disposition", "attachment; filename=" + fileName);
        BufferedOutputStream outStream = null;
        BufferedInputStream inputStream = null;
        try {
            // download the document
            inputStream = new BufferedInputStream(new FileInputStream(documentGuid));
            outStream = new BufferedOutputStream(out);
            while((count = inputStream.read(buff)) != -1) {
                outStream.write(buff, 0, count);
            }
        } finally {
            // close streams
            if (inputStream != null)
                inputStream.close();
            if (outStream != null)
                outStream.close();
        }
    }

    /**
     * Upload document
     * @param request
     * @param response
     * @return uploaded document object (the object contains uploaded document guid)
     */
    @POST
    @Path(value = "/uploadDocument")
    public Object uploadDocument(@Context HttpServletRequest request, @Context HttpServletResponse response) {
        try {
            // set multipart configuration
            MultipartConfigElement multipartConfigElement = new MultipartConfigElement((String) null);
            request.setAttribute(Request.__MULTIPART_CONFIG_ELEMENT, multipartConfigElement);
            // set response content type
            setResponseContentType(response, MediaType.APPLICATION_JSON);
            // get the file chosen by the user
            Part filePart = request.getPart("file");
            // get document URL
            String documentUrl = request.getParameter("url");
            InputStream uploadedInputStream = null;
            String fileName = "";
            if(documentUrl.isEmpty() || documentUrl == null) {
                // get the InputStream to store the file
                uploadedInputStream = filePart.getInputStream();
                fileName = filePart.getSubmittedFileName();
            } else {
                // get the InputStream from the URL
                URL url =  new URL(documentUrl);
                uploadedInputStream = url.openStream();
                fileName = FilenameUtils.getName(url.getPath());
            }
            // get documents storage path
            String documentStoragePath = quickViewConfig.getApplication().getFilesDirectory();
            // save the file
            File file = new File(documentStoragePath + "/" + fileName);
            Files.copy(uploadedInputStream, file.toPath(), StandardCopyOption.REPLACE_EXISTING);
            UploadedDocumentWrapper uploadedDocument = new UploadedDocumentWrapper();
            uploadedDocument.setGuid(documentStoragePath + "/" + fileName);
            return objectToJson(uploadedDocument);
        }catch(Exception ex){
            // set response content type
            setResponseContentType(response, MediaType.APPLICATION_JSON);
            // set exception message
            ErrorMsgWrapper errorMsgWrapper = new ErrorMsgWrapper();
            errorMsgWrapper.setError(ex.getMessage());
            return objectToJson(errorMsgWrapper);
        }
    }
}
