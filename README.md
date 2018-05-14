# QuickView Dropwizard Sample
###### version 1.0.2


## System Requirements
- Java 8 (JDK 1.8)
- Maven 3



## Description
Native, simple, fully configurable and optimized java document viewer application. Open and view your document without losing data and/or formatting.

Thanks to powerful and flexible [GroupDocs.Viewer for Java](http://www.groupdocs.com/java/document-viewer-library) API, over 50 document formats are supported across all platforms (Windows, Unix) and browsers (Chrome, Firefox, Safari, Opera, IE). All rendered documents are 100% copies of original documents without any quality loss.

This sample can be run as service with RESTful API or as standalone application with built-in UI.

**Note** In order to get all benifits and to use all features without any limmitations you need to purchace valid [GroupDocs.Viewer for Java license](http://purchase.groupdocs.com/purchase/order-online-step-1-of-8.aspx) or request [GroupDocs.Viewer for Java temporary license](http://groupdocs.com/Community/getting-started/java/document-viewer-java-library.aspx).


## Instructions

#### Run as RESTful Service
Running QuickView Dropwizard Sample as service will allow you to host your application on any instance and provide fully working RESTful API.

###### Features
- Doesn't require to access working server all the time for UI updates.
- Doesn't require service restart for any UI updates.
- Allows to have multiple UI applications on a different instances but with one main server.
- Allows to implement additional features in your application, such as user-roles, additional permissions, groups, etc.
- Remote controls and access.

###### How to run in **Service Mode**
1. Download QuickView Dropwizard Sample.
2. Extract QuickView Dropwizard Sample to desired/work directory (if sample was downloaded as zip).
3. Navigate to QuickView Dropwizard Sample root directory.
4. Update `configuration.yml` file by setting `runAsService: true`.
5. Open console and type `cd 'QuickView Dropwizard Sample root directory'`, press enter.
6. In console type following command `mvn clean compile exec:java`, press enter.
7. Download [QuickView](https://github.com/LilAlex/QuickView).
8. Extract QuickView to desired/work directory (if downloaded as zip).
9. Navigate to QuickView root directory.
10. Open `quickview.html` file in text editor.
11. Update `applicationPath` parameter with your server URL.
12. Open `quickview.html` with any browser.


#### Run as Standalone Application
Running QuickView Dropwizard Sample as standalone application is more simple and host all-in-one on single server, which will be accessible by all users directly.

###### Features
- Simple all-in-one application.
- Allows to implement additional features in your application, such as user-roles, additional permissions, groups, etc.

###### How to run in **Standalone Mode**
1. Download QuickView Dropwizard Sample.
2. Extract QuickView Dropwizard Sample to desired/work directory (if sample was downloaded as zip).
3. Navigate to QuickView Dropwizard Sample root directory.
4. Update params in `configuration.yml` to meet your requirements.
5. Open console and type `cd 'QuickView Dropwizard Sample root directory'`, press enter.
6. In console type following command `mvn clean compile exec:java`, press enter.
7. Go to `http://localhost:{PORT}/viewer/`   
PORT - port number specified in `configuration.yml` (by default http://localhost:8080/viewer/).
