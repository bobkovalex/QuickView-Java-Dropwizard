<#-- @ftlvariable name="" type="com.aliensoft.quickview.views.QuickView" -->
<!DOCTYPE html>
<html>
    <head>
        <title>QuickView for Java Dropwizard</title>
        <link type="text/css" rel="stylesheet" href="assets/css/quickview-service.css"/>
    </head>
    <body>
        <h3><span>QuickView</span> Service Started!</h3>

        <div id="qvs-service-info-container">
            <h4>Current Configuration</h4>
            <ul>
                <li><span>filesDirectory: </span>${filesDirectory}</li>
            </ul>
        </div>

        <div id="qvs-service-api-container">
            <h4>Service API</h4>
            <h5>GET Requests</h5>
            <ul>
                <li><a href ="/getFileTree" target="_blank">/getFileTree</a></li>
            </ul>
            <h5>GET Requests (Dummy)</h5>
                <ul>
                    <li><a href ="/getDocumentDescription" target="_blank">/getDocumentDescription</a></li>
                    <li><a href ="/getDocumentPage" target="_blank">/getDocumentPage</a></li>
                </ul>
            <h5>POST Requests</h5>
            <ul>
                <li><a href ="/loadFileTree" target="_blank">/loadFileTree</a></li>
                <li><a href ="/loadDocumentDescription" target="_blank">/loadDocumentDescription</a></li>
                <li><a href ="/loadDocumentPage" target="_blank">/loadDocumentPage</a></li>
            </ul>
        </div>

    </body>
</html>