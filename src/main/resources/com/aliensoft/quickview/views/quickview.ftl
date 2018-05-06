<#-- @ftlvariable name="" type="com.aliensoft.quickview.views.QuickView" -->
<!DOCTYPE html>
<html>
    <head>
        <title>QuickView for Java Dropwizard</title>
        <link type="text/css" rel="stylesheet" href="assets/css/font-awesome.min.css"/>
        <link type="text/css" rel="stylesheet" href="assets/css/quickview.css"/>
        <link type="text/css" rel="stylesheet" href="assets/css/quickview.mobile.css"/>
        <link type="text/css" rel="stylesheet" href="assets/css/quickview-dark.css"/>
		<link type="text/css" rel="stylesheet" href="assets/css/quickview-circle-progress.css"/>
		<link rel="stylesheet" href="assets/css/swiper.min.css">
        <script src="assets/js/jquery.min.js"></script>
		<script src="assets/js/swiper.min.js"></script>
        <script type="text/javascript" src="assets/js/quickview.js"></script>
    </head>
    <body>
        <div id="element"></div>
        <script type="text/javascript">
            $('#element').quickView({
                applicationPath: 'http://${config.server.hostAddress}:${config.server.httpPort?c}/viewer',
				offlineMode: ${config.resources.offlineMode?c},
				defaultDocument: '${config.resources.defaultDocument}',
				htmlMode: ${config.resources.htmlMode?c},
                preloadPageCount: ${config.resources.preloadPageCount?c},
				zoom : ${config.resources.zoom?c},
				pageSelector: ${config.resources.pageSelector?c},
				search: ${config.resources.search?c},
				thumbnails: ${config.resources.thumbnails?c},
				rotate: ${config.resources.rotate?c},
				download: ${config.resources.download?c},
                upload: ${config.resources.upload?c},
                print: ${config.resources.print?c},                
                browse: ${config.resources.browse?c},               
                rewrite: ${config.resources.rewrite?c}
            });
        </script>
    </body>
</html>