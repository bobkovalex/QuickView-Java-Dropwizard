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
        <div id="quickview"></div>
            <script type="text/javascript">
                $('#quickview').quickView({
                    zoom : true,
                    pageSelector: true,
                    search: true,
                    thumbnails: true
                });
                $('#qv-panzoom').append('<div id="qv-page1" class="qv-page"><div class="qv-wrapper"><h1 class="name">John Smith <br><span>Interactive Designer</span></h1><ul><li class="ad">111 Lorem Street, 34785, Ipsum City</li><li class="mail">johnsmith@business.com</li><li class="tel">+11 444 555 22 33</li><li class="web">www.businessweb.com</li></ul></div></div><div id="qv-page2" class="qv-page"><div class="qv-wrapper"><h2>OBJECTIVE</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim viverra nibh sed varius. Proin bibendum nunc in sem ultrices posuere. Aliquam ut aliquam lacus.</p><h2>EDUCATION</h2><div class="content"><h3>Sep 2005 - Feb 2007</h3><p>Academy of Art University, London <br><em>Master in Communication Design</em></p><h3>Sep 2001 - Jun 2005</h3><p>University of Art &amp; Design, New York <br><em>Bachelor of Science in Graphic Design</em></p></div><h2>EXPERIENCE</h2><div class="content"><h3>May 2009 - Feb 2010</h3><p>Agency Creative, London <br><em>Senior Web Designer</em></p><ul class="info"><li>Vestibulum eu ante massa, sed rhoncus velit.</li><li>Pellentesque at lectus in <a href="#">libero dapibus</a> cursus. Sed arcu ipsum, varius at ultricies acuro, tincidunt iaculis diam.</li></ul><h3>Jun 2007 - May 2009</h3><p>Junior Web Designer <br><em>Bachelor of Science in Graphic Design</em></p><ul class="info"><li>Sed fermentum sollicitudin interdum. Etiam imperdiet sapien in dolor rhoncus a semper tortor posuere. </li><li>Pellentesque at lectus in libero dapibus cursus. Sed arcu ipsum, varius at ultricies acuro, tincidunt iaculis diam.</li></ul></div></div></div><div id="qv-page3" class="qv-page"><div class="qv-wrapper"><h2>SKILLS</h2><h3>Software Knowledge</h3><ul class="skills"><li>Photoshop</li><li>Illustrator</li><li>InDesign</li><li>Flash</li><li>Fireworks</li><li>Dreamweaver</li><li>After Effects</li><li>Cinema 4D</li><li>Maya</li></ul><h3>Languages</h3><ul class="skills"><li>CSS/XHTML</li><li>PHP</li><li>JavaScript</li><li>Ruby on Rails</li><li>ActionScript</li><li>C++</li></ul></div></div>');
            </script>
    </body>
</html>