<#-- @ftlvariable name="" type="com.aliensoft.quickview.views.QuickView" -->
<!DOCTYPE html>
<html>
    <head>
        <title>QuickView for Java Dropwizard</title>
        <style>
            body {
                font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
                font-size: 13px;
                margin: 0;
                width: 100%;
                height: 100%;
            }
            ul, li{
                margin: 0;
                padding: 0;
                list-style: none;
            }
            li > a{
                color: #777;
                text-decoration: none;
            }
            h3{
                font-size: 16px;
                font-weight: 200;
                margin: 40px auto;
                width: 200px;
            }
            h3 > span{
                font-weight: 500;
            }
            h4{
                font-size: 15px;
                font-weight: 500;
                text-transform: uppercase;
                color: #333;
                padding-left: 20px;
            }
            h5{
                margin: 20px 0px 8px 20px;
                font-size: 14px;
                font-weight: 500;
                color: #555;
            }
            #qvs-service-info-container{
                float:left;
                width: 50%;
                margin-bottom: 50px;
                min-width: 400px;
            }
            #qvs-service-info-container li{
                color: #555;
                margin: 10px 20px;
            }
            #qvs-service-info-container li > span{
                font-weight: 500;
            }

            #qvs-service-api-container{
                float: left;
                width: 49%;
                border-left: #eee 1px solid;
            }
            #qvs-service-api-container ul, #qvs-service-api-container li{
                margin-left: 20px;
                margin-bottom: 8px;
            }
            #qvs-service-api-container li > a{
                color: #777;
                text-decoration: none;
            }
        </style>
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
                <li><a href ="/rotateDocumentPages" target="_blank">/rotateDocumentPages</a></li>
            </ul>
        </div>

    </body>
</html>