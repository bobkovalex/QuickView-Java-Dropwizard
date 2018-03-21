<#-- @ftlvariable name="" type="com.aliensoft.quickview.views.QuickView" -->
<!DOCTYPE html>
<html>
    <head>
        <title>QuickView for Java Dropwizard</title>
        <link type="text/css" rel="stylesheet" href="assets/css/font-awesome.min.css"/>
        <link type="text/css" rel="stylesheet" href="assets/css/quickview.css"/>
        <link type="text/css" rel="stylesheet" href="assets/css/quickview-dark.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
        <script type="text/javascript" src="assets/js/quickview.js"></script>
    </head>
    <body>
        <div id="element"></div>
        <script type="text/javascript">
            $('#element').quickView({
                applicationPath: 'http://localhost:8082/',
                preloadPageCount: 0,
                zoom : true,
                pageSelector: true,
                search: true,
                thumbnails: true
            });
        </script>
    </body>
</html>