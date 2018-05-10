/**
 * GroupDocs Plugin
 * Copyright (c) 2001-2018 Aspose Pty Ltd
 * Licensed under MIT.
 * @author Aspose Pty Ltd
 * @version 1.0.1
 */

 /*
******************************************************************
******************************************************************
GLOBAL VARIABLES
******************************************************************
******************************************************************
*/
var applicationPath;
var preloadPageCount;
var currentDirectory;
var uploadFilesList = [];
var documentGuid;
var htmlMode = false;
var documentData = [];
var password = "";
var rewrite;
var map = {};
// add supported formats
map['folder'] = { 'format': '', 'icon': 'fa-folder' };
map['pdf'] = { 'format': 'Portable Document Format', 'icon': 'fa-file-pdf-o' };
map['doc'] = { 'format': 'Microsoft Word', 'icon': 'fa-file-word-o' };
map['docx'] = { 'format': 'Microsoft Word', 'icon': 'fa-file-word-o' };
map['docm'] = { 'format': 'Microsoft Word', 'icon': 'fa-file-word-o' };
map['dot'] = { 'format': 'Microsoft Word', 'icon': 'fa-file-word-o' };
map['dotx'] = { 'format': 'Microsoft Word', 'icon': 'fa-file-word-o' };
map['dotm'] = { 'format': 'Microsoft Word', 'icon': 'fa-file-word-o' };
map['xls'] = { 'format': 'Microsoft Excel', 'icon': 'fa-file-excel-o' };
map['xlsx'] = { 'format': 'Microsoft Excel', 'icon': 'fa-file-excel-o' };
map['xlsm'] = { 'format': 'Microsoft Excel', 'icon': 'fa-file-excel-o' };
map['xlsb'] = { 'format': 'Microsoft Excel', 'icon': 'fa-file-excel-o' };
map['ppt'] = { 'format': 'Microsoft PowerPoint', 'icon': 'fa-file-powerpoint-o' };
map['pptx'] = { 'format': 'Microsoft PowerPoint', 'icon': 'fa-file-powerpoint-o' };
map['pps'] = { 'format': 'Microsoft PowerPoint', 'icon': 'fa-file-powerpoint-o' };
map['ppsx'] = { 'format': 'Microsoft PowerPoint', 'icon': 'fa-file-powerpoint-o' };
map['vsd'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code-o' };
map['vdx'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code-o' };
map['vss'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code-o' };
map['vsx'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code-o' };
map['vst'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code-o' };
map['vtx'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code-o' };
map['vsdx'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code-o' };
map['vdw'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code-o' };
map['vstx'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code-o' };
map['vssx'] = { 'format': 'Microsoft Visio', 'icon': 'fa-file-code-o' };
map['mpp'] = { 'format': 'Microsoft Project', 'icon': 'fa-file-text' };
map['mpt'] = { 'format': 'Microsoft Project', 'icon': 'fa-file-text' };
map['msg'] = { 'format': 'Microsoft Outlook', 'icon': 'fa-file-text-o' };
map['eml'] = { 'format': 'Microsoft Outlook', 'icon': 'fa-file-text-o' };
map['emlx'] = { 'format': 'Microsoft Outlook', 'icon': 'fa-file-text-o' };
map['one'] = { 'format': 'Microsoft OneNote', 'icon': 'fa-file-word-o' };
map['odt'] = { 'format': 'Open Document Text', 'icon': 'fa-file-word-o' };
map['ott'] = { 'format': 'Open Document Text Template', 'icon': 'fa-file-word-o' };
map['ods'] = { 'format': 'Open Document Spreadsheet', 'icon': 'fa-file-excel-o' };
map['odp'] = { 'format': 'Open Document Presentation', 'icon': 'fa-file-powerpoint-o' };
map['otp'] = { 'format': 'Open Document Presentation', 'icon': 'fa-file-powerpoint-o' };
map['ots'] = { 'format': 'Open Document Presentation', 'icon': 'fa-file-powerpoint-o' };
map['rtf'] = { 'format': 'Rich Text Format', 'icon': 'fa-file-text-o' };
map['txt'] = { 'format': 'Plain Text File', 'icon': 'fa-file-text-o' };
map['csv'] = { 'format': 'Comma-Separated Values', 'icon': 'fa-file-excel-o' };
map['html'] = { 'format': 'HyperText Markup Language', 'icon': 'fa-file-word-o' };
map['mht'] = { 'format': 'HyperText Markup Language', 'icon': 'fa-file-word-o' };
map['mhtml'] = { 'format': 'HyperText Markup Language', 'icon': 'fa-file-word-o' };
map['xml'] = { 'format': 'Extensible Markup Language', 'icon': 'fa-file-word-o' };
map['xps'] = { 'format': 'XML Paper Specification', 'icon': 'fa-file-word-o' };
map['dxf'] = { 'format': 'AutoCAD Drawing File Format', 'icon': 'fa-file-image-o' };
map['dwg'] = { 'format': 'AutoCAD Drawing File Format', 'icon': 'fa-file-image-o' };
map['bmp'] = { 'format': 'Bitmap Picture', 'icon': 'fa-file-image-o' };
map['gif'] = { 'format': 'Graphics Interchange Format', 'icon': 'fa-file-image-o' };
map['jpg'] = { 'format': 'Joint Photographic Experts Group', 'icon': 'fa-file-image-o' };
map['jpe'] = { 'format': 'Joint Photographic Experts Group', 'icon': 'fa-file-image-o' };
map['jpeg'] = { 'format': 'Joint Photographic Experts Group', 'icon': 'fa-file-image-o' };
map['jfif'] = { 'format': 'Joint Photographic Experts Group', 'icon': 'fa-file-image-o' };
map['png'] = { 'format': 'Portable Network Graphics', 'icon': 'fa-file-image-o' };
map['tiff'] = { 'format': 'Tagged Image File Format', 'icon': 'fa-file-photo-o' };
map['tif'] = { 'format': 'Tagged Image File Format', 'icon': 'fa-file-photo-o' };
map['epub'] = { 'format': 'Electronic Publication', 'icon': 'fa-file-pdf-o' };
map['ico'] = { 'format': 'Windows Icon', 'icon': 'fa-file-image-o' };
map['webp'] = { 'format': 'Compressed Image', 'icon': 'fa-file-image-o' };
map['mobi'] = { 'format': 'Mobipocket eBook', 'icon': 'fa-file-pdf-o' };
map['tex'] = { 'format': 'LaTeX Source Document', 'icon': 'fa-file-pdf-o' };
map['djvu'] = { 'format': 'Multi-Layer Raster Image', 'icon': 'fa-file-text' };
map['unknown'] = { 'format': 'This format is not supported', 'icon': 'fa-file-o' };

$(document).ready(function(){
		
/*
******************************************************************
NAV BAR CONTROLS
******************************************************************
*/

	//////////////////////////////////////////////////
	// Toggle navigation dropdown menus
	//////////////////////////////////////////////////
	$('.qv-nav-toggle').on('click', function(e){
		if($(this).hasClass('open')){
			$(this).removeClass('open');
		}else{
			$(this).addClass('open');
		}
		var nav_drop = getElementByClass($(this), '.qv-nav-dropdown');
		toggleNavDropdown(nav_drop);
		//set focus to search input
		$('#qv-search-input').focus();
	});

	//////////////////////////////////////////////////
	// Prevent toggle events on search container click
	//////////////////////////////////////////////////
	$('#qv-nav-search-container').on('click', function(e){
		e.stopPropagation();
	});

	//////////////////////////////////////////////////
	// Close modal dialog event
	//////////////////////////////////////////////////
	$('.qv-modal-close-action').on('click', closeModal);

	//////////////////////////////////////////////////
	// File or directory click event from file tree
	//////////////////////////////////////////////////
	$('.qv-modal-body').on('click', '.qv-filetree-name', function(e){
		var isDir = $(this).parent().find('.fa-folder').hasClass('fa-folder');
		if(isDir){
			// if directory -> browse
			if(currentDirectory.length > 0){
				currentDirectory = currentDirectory + "/" + $(this).text();
			}else{
				currentDirectory = $(this).text();
			}
			toggleModalDialog(false, '');
			loadFileTree(currentDirectory);
		}else{
			// if document -> open
			clearPageContents();
			toggleModalDialog(false, '');
			documentGuid = $(this).attr('data-guid');
			loadDocument(function(data){
				// Generate thumbnails
				generatePagesTemplate(data, data.length, 'thumbnails-');
			});
		}
	});

	//////////////////////////////////////////////////
	// Go to parent directory event from file tree
	//////////////////////////////////////////////////
	$('.qv-modal-body').on('click', '.qv-go-up', function(e){
		if(currentDirectory.length > 0 && currentDirectory.indexOf('/') == -1){
			currentDirectory = '';
		}else{
			currentDirectory = currentDirectory.replace(/\/[^\/]+\/?$/, '');	
		}
		loadFileTree(currentDirectory);
	});	

	//////////////////////////////////////////////////
	// Zoom values event
	//////////////////////////////////////////////////
	$('#qv-btn-zoom-value > li').bind('click', function(e){
		var zoomValue = $(this).text();
		switch(zoomValue){
			case 'Fit Width':
				// get page width
				var pageWidth = $('.qv-page').width();
				// get screen width
				var screenWidth = $('#qv-pages').width();
				// get scale ratio
				var scale = (pageWidth / screenWidth) * 100;
				// set values
				zoomValue = 200 - scale;
				break;
			case 'Fit Height': 
				// get page height
				var pageHeight = $('.qv-page').height();
				// get screen height
				var screenHeight = $('#qv-pages').height();
				// get scale ratio
				var scale = (screenHeight / pageHeight) * 100;
				// set values
				zoomValue = scale;
				break;
			default:
				zoomValue = zoomValue.slice(0, -1);
				break;
		}
		setZoomValue(zoomValue);
	});

	//////////////////////////////////////////////////
	// Zoom in event
	//////////////////////////////////////////////////
	$('#qv-btn-zoom-in').on('click', function(e){
		var zoom_val = getZoomValue();
		if(zoom_val < 490){
			zoom_val = zoom_val + 10;
		}
		setZoomValue(zoom_val);
	});

	//////////////////////////////////////////////////
	// Zoom out event
	//////////////////////////////////////////////////
	$('#qv-btn-zoom-out').on('click', function(e){
		var zoom_val = getZoomValue();
		if(zoom_val > 30){
			zoom_val = zoom_val - 10;
		}
		setZoomValue(zoom_val);
	});

	//////////////////////////////////////////////////
	// Page navigation event
	//////////////////////////////////////////////////
	$('.qv-nav-btn-pages').on('click', function(e){
		var pagesAttr = $('#qv-page-num').text().split('/');
		var currentPageNumber = parseInt(pagesAttr[0]);
		var lastPageNumber = parseInt(pagesAttr[1]);
		var prevPage = false;
		// get clicked id
		switch($(this).attr('id')){
			case 'qv-btn-page-first':
				currentPageNumber = 1;
			break;
			case 'qv-btn-page-prev':
				currentPageNumber = currentPageNumber - 1;
				prevPage = true;
			break;
			case 'qv-btn-page-next':
				currentPageNumber = currentPageNumber + 1;
			break;
			case 'qv-btn-page-last':
				currentPageNumber = lastPageNumber;
			break;
		}
		// scroll to page
		if(currentPageNumber > 0 && currentPageNumber <= lastPageNumber){
			scrollToPage(currentPageNumber);
			// set navigation to current page
			setNavigationPageValues(currentPageNumber, lastPageNumber);
			// load next page
			if(preloadPageCount > 0){
				// check if next page number is not bigger than total page number
				if(currentPageNumber + 1 <= lastPageNumber){
					if(prevPage){
						// load previous page
						// to set correct page size we use global array documentData which contains all info about current document
						appendHtmlContent(currentPageNumber, documentGuid, '', documentData[currentPageNumber - 1].Width, documentData[currentPageNumber - 1].Height);						
					} else {
						// load next page
						appendHtmlContent(currentPageNumber + 1, documentGuid, '', documentData[currentPageNumber].Width, documentData[currentPageNumber].Height);									
					}
				} else {
					// load last page if to jump to it via last page button
					appendHtmlContent(currentPageNumber, documentGuid, '', documentData[currentPageNumber - 1].Width, documentData[currentPageNumber - 1].Height);	
					appendHtmlContent(currentPageNumber - 1, documentGuid, '', documentData[currentPageNumber - 2].Width, documentData[currentPageNumber - 2].Height);						
				}
			}
		}
	});

	//////////////////////////////////////////////////
	// Page scrolling event
	//////////////////////////////////////////////////
	var previousScroll = 0;
	$('#qv-pages').scroll(function() {
		var pagesAttr = $('#qv-page-num').text().split('/');
		// get current page number
		var currentPageNumber = parseInt(pagesAttr[0]);
		// get last page number
    	var lastPageNumber = parseInt(pagesAttr[1]);
    	// get zoom value
		var zoomValue = getZoomValue()/100;
		var pagePosition = 0;
		// get scroll direction
		var scrollDown = true;
		var currentScroll = $(this).scrollTop();
		if (currentScroll > previousScroll){
		   pagePosition = currentPageNumber + 1;
	    } else {
		   pagePosition = currentPageNumber - 1;
		   scrollDown = false;
	    }
		// set scroll direction
		previousScroll = currentScroll;
		// check if page is visible in the view port more than 50%
		if($('#qv-page-' + pagePosition).isOnScreen(0.5, 0.5)){
			if((currentPageNumber > 0) && (currentPageNumber <= lastPageNumber)){
				// change current page value
				if(pagePosition != currentPageNumber){
					// set current page number
					setNavigationPageValues(pagePosition, lastPageNumber);
				}
				// load next page
				// to set correct page size we use global array documentData which contains all info about current document
				if(preloadPageCount > 0){
					// if scroll down load next page
					if(scrollDown){
						if(pagePosition + 1 <= lastPageNumber){
							appendHtmlContent(pagePosition + 1, documentGuid, '', documentData[pagePosition].Width, documentData[pagePosition].Height);
						} else if(pagePosition == lastPageNumber){
							appendHtmlContent(pagePosition, documentGuid, '', documentData[pagePosition - 1].Width, documentData[pagePosition - 1].height);
						}							
					} else {
						// if scroll up load previous page
						if(currentPageNumber - 1 >= 1){
							appendHtmlContent(currentPageNumber - 1, documentGuid, '', documentData[pagePosition - 1].Width, documentData[pagePosition - 1].Height);							
						}
					}
				}
			}
		}		
	});

	//////////////////////////////////////////////////
	// Clear search input
	//////////////////////////////////////////////////
	$('#qv-nav-search-cancel').on('click', function(e){
		clearSearch();
		$(this).parent().parent().click();
		
	});

	//////////////////////////////////////////////////
	// Read search input value on input change event
	//////////////////////////////////////////////////
	var search_position = 0;
	$('#qv-search-input').on('input', function(e){
		// fix search position if first much
		search_position = 0;
		highlightSearch($(this).val());
	});

	//////////////////////////////////////////////////
	// Search next event
	//////////////////////////////////////////////////	
	$('#qv-nav-search-next').on('click', function(e){
		var count = 0;
		// remove/clear previously selected highlights
		$('#qv-pages').find('.qv-highlight-select').removeClass('qv-highlight-select');
		// search for matched elements
		$('.qv-highlight').each(function(e){
			if(count == search_position){
				console.log(this);
				// add selected highlight
				$(this).addClass('qv-highlight-select');
				// scroll to next page
				$('#qv-pages').scrollTo(this, {
					offsetTop: 150
				});
				// check if this is last rearch result instance
				if(search_position >= getTotalSearchMatches()){
					// deactivate next button
				}else{
					// increment search position
					search_position++;	
				}
				// end each loop
				return false;
			}
			count++;
		});
		setSearchMatchCount(search_position, getTotalSearchMatches());
	});

	//////////////////////////////////////////////////
	// Search prev event
	//////////////////////////////////////////////////
	$('#qv-nav-search-prev').on('click', function(e){
		var count = 1;
		var prev;
		// remove/clear previously selected highlights
		$('#qv-pages').find('.qv-highlight-select').removeClass('qv-highlight-select');
		// search for matched elements
		$('.qv-highlight').each(function(e){
			if((count == (search_position)) && (prev != undefined)){
				// add selected highlight
				$(prev).addClass('qv-highlight-select');
				// scroll to previous page
				$('#qv-pages').scrollTo(prev, {
					offsetTop: 150
				});
				// check if this is first search result instance
				if(search_position <= 1){
					// deactivate prev button
				}else{
					// decrement search position
					search_position--;
				}
				// end each loop
				return false;
			}
			count++;
			// store last instance
			prev = $(this);
		});
		setSearchMatchCount(search_position, getTotalSearchMatches());
	});
	
	//////////////////////////////////////////////////
	// Open/Close thumbnails event
	//////////////////////////////////////////////////
	$('#qv-nav-right').on('click', function(){
	    // open/close sidebar
        $('#qv-thumbnails').toggleClass('active');
        if($("#qv-pages").css("margin-left") == "0px"){
	        $("#qv-pages").css("margin-left", "280px");
        } else {
	        $("#qv-pages").css("margin-left", "0px");
        }
    });
	
	//////////////////////////////////////////////////
	// Thumbnail click event
	//////////////////////////////////////////////////
	$('#qv-thumbnails-panzoom').on('click', '.qv-page',function(){
	    // get clicked thumbnail page number
		var page = parseInt($(this).attr('id').split('-')[3]);
		var pagesAttr = $('#qv-page-num').text().split('/');
		// get last page number
    	var lastPageNumber = parseInt(pagesAttr[1]);
		appendHtmlContent(page, documentGuid, "", documentData[page - 1].Width, documentData[page - 1].Height);
		appendHtmlContent(page + 1, documentGuid, "", documentData[page].Width, documentData[page].Height);
		// set navigation to current page
		setNavigationPageValues(page, lastPageNumber);
		scrollToPage(page);
	});

	//////////////////////////////////////////////////
	// Rotate counterclockwise event
	//////////////////////////////////////////////////
	$('#qv-btn-counterclockwise').on('click', function(e){
		rotatePages("-90");
	});
	
	//////////////////////////////////////////////////
	// Rotate clockwise event
	//////////////////////////////////////////////////
	$('#qv-btn-clockwise').on('click', function(e){
		rotatePages("90");
	});
	
	//////////////////////////////////////////////////
	// Download event
	//////////////////////////////////////////////////
	$('#qv-btn-download').on('click', function(e){
		downloadDocument();
	});	
	
	//////////////////////////////////////////////////
	// Select files for upload event
	//////////////////////////////////////////////////
	$('.qv-modal-body').on('change', '#qv-upload-input', function(e){
	    // get selected files
	    var input = $(this);
       	    // add files to the table		
	    addFileForUpload(input.get(0).files);
	});
	
	//////////////////////////////////////////////////
	// Cancel file upload event
	//////////////////////////////////////////////////
	 $('.qv-modal-body').on('click', ".qv-cancel-button", function(e){
            // get selected files
            var button = $(this);
            // get file name which will be deleted
            var fileName = button.closest("div").parent().parent().find("div.qv-file-name")[0].innerHTML;
            // find its index in the array
            for(var i = 0; i < uploadFilesList.length; i++){
              if(uploadFilesList[i].name == fileName){
                  // remove file from the files array
                  uploadFilesList.splice(i, 1);
              }
            }
            // remove table row
       	   button.closest("div").parent().parent().parent().remove();
	    $('#qv-upload-input').val('');
	    // recalculate indexes in the files table
	    var tableRows = $('#qv-upload-files-table > div');
	    for(var n = 0; n < tableRows.length; n++){
		$(tableRows[n]).find("div.qv-pregress").attr("id", "qv-pregress-bar-" + n);
		$(tableRows[n]).find("div.qv-upload-complete").attr("id", "qv-upload-complete-" + n);
	    }
	    // if table is empty disable upload button
	    if(tableRows.length == 0){
		$("#qv-upload-button").prop("disabled", true);
	    }
	});
	
	//////////////////////////////////////////////////
	// Upload event
	//////////////////////////////////////////////////
	$(".qv-modal-body").on('click', '#qv-upload-button', function(e){
            // get current number of table rows
		var tableRows = $('#qv-upload-files-table > div');
		// initiate URL counter required for proper calculating of the uploaded files in case local files uploaded with URLs
		var urlCounter = 0;
		// upload file one by one
		for (var i = 0; i < tableRows.length; i++) {
	        // check if current table row contains URL instead of file
	        if($(tableRows[i]).find("div[data-value]").length > 0) {
		        // upload URL
		        uploadDocument(null, i, $(tableRows[i]).find("div.qv-filetree-name").data().value);
		        // increase URL counter
		        urlCounter++;
	        } else {
				// check if the current file already uploaded
				var isUploaded = $(tableRows[i]).find("div.qv-filetree-name").data().uploaded;
				if(!isUploaded){
					// upload local file
					uploadDocument(uploadFilesList[i - urlCounter], i);
					// mark file as uploaded		
					$(tableRows[i]).find("div.qv-filetree-name").data().uploaded = true;					
				} else {	
					continue;
				}				
			}
        }
	});
	
	//////////////////////////////////////////////////
	// Open URL input event
	//////////////////////////////////////////////////
	$('.qv-modal-body').on('click', '#qv-url-button', function () {
            $('#qv-url-wrap').slideDown('fast');
        });
	
	//////////////////////////////////////////////////
	// Close URL input event
	//////////////////////////////////////////////////
	$('.qv-modal-body').on('click', '#qv-url-cancel', function () {
            $('#qv-url-wrap').slideUp('fast');
            $('#qv-url').val('');
        });
	
	//////////////////////////////////////////////////
	// Add file via URL event
	//////////////////////////////////////////////////
	$('.qv-modal-body').on('click', '#qv-add-url', function () {
        addFileForUpload(null, $("#qv-url").val());
	    $('#qv-url').val('');
        });

	//////////////////////////////////////////////////
	// Print event
	//////////////////////////////////////////////////
	$('#qv-btn-print').on('click', function(e){
            printDocument();
	});
	
	//////////////////////////////////////////////////
	// Open modal dialog (file upload) event
	//////////////////////////////////////////////////
	$('#qv-btn-upload').on('click', function(e){	   
	    toggleModalDialog(true, 'Upload Document', getHtmlUpload());	
		var dropZone = $('#qv-dropZone');
        if (typeof dropZone[0] != "undefined") {
            //Drag n drop functional
            if ($('#qv-dropZone').length) {
                if (typeof (window.FileReader) == 'undefined') {
                    dropZone.text("Your browser doesn't support Drag and Drop");
                    dropZone.addClass('error');
                }
            }
    
            dropZone[0].ondragover = function () {
                dropZone.addClass('hover');
                return false;
            };
    
            dropZone[0].ondragleave = function () {
                dropZone.removeClass('hover');
                return false;
            };
    
            dropZone[0].ondrop = function (event) {
                event.preventDefault();
                dropZone.removeClass('hover');
                var files = event.dataTransfer.files;
                addFileForUpload(files);
            };
        }
	});
	
	//////////////////////////////////////////////////
	// Open document button (upload dialog) click
	//////////////////////////////////////////////////
	$('.qv-modal-body').on('click', '#qv-open-document', function(e){	   
		toggleModalDialog(false, ''); 	
	    loadFileTree('');	
	});
	
	//////////////////////////////////////////////////
	// Open search event
	//////////////////////////////////////////////////
	$('#qv-btn-search').on('click', function(e){
	    if($("#qv-nav-search-container").parent().find("span").is(":visible")){
			$("#qv-nav-search-container").parent().find("span").css("display", "none");
		} else {
			$("#qv-nav-search-container").parent().find("span").css("display", "initial");
		}
	});
	
	//////////////////////////////////////////////////
	// Submit password button click (password required modal)
	//////////////////////////////////////////////////
	$('.qv-modal-body').on('click', "#qv-password-submit", function(e){
	    password = $("#qv-password-input").val();
		$("#qv-password-input").val('');
		toggleModalDialog(false, ''); 	
		loadDocument(function(data){
			// Generate thumbnails
			generatePagesTemplate(data, data.length, 'thumbnails-');
		});		
	});
	
	//////////////////////////////////////////////////
	// Click on modal body event (used to change slide in swiper)
	//////////////////////////////////////////////////
	$('.qv-modal-body').on('click', '#qv-modal-content', function(e){
		if(isMobile()){
			if($("#qv-upload-files-table > div").length > 0){
			    var swiper = new Swiper(".swiper-container");
				if(typeof swiper.length == "undefined"){
				   swiper.slideNext();
				   swiper.slidePrev();
			    }
			    for(var i = 0; i < swiper.length; i++){
				   swiper[i].slideNext();
				   swiper[i].slidePrev();
			    }
			}
	   	}	   
	});
	
	//
// END of document ready function
});

/*
******************************************************************
FUNCTIONS
******************************************************************
*/
	
/**
* Load file tree
* @param {string} dir - files location directory
*/
function loadFileTree(dir) {
    var data = {path: dir};
    currentDirectory = dir;
	// clear previously entered password
	clearPassword();
    // show loading spinner
    $('#qv-modal-spinner').show();
    // get data
    $.ajax({
	type: 'POST',
	url: getApplicationPath('loadFileTree'),
	data: JSON.stringify(data),
	contentType: "application/json",
	success: function(returnedData) {
	    if(returnedData.message != undefined){
		// open error popup
		printMessage(returnedData.message);
		return;
	    }
		// assembly modal html
		toggleModalDialog(true, "Open Document", getHtmlFileBrowser());
	    // hide loading spinner
	    $('#qv-modal-spinner').hide();
	    // clear tree list from previous data
	    $('#qv-modal-filebroswer tbody').html(
		'<tr>'+
		    '<td class="text-center qv-go-up"><i class="fa fa-level-up"></i></td>'+
		    '<td class="qv-filetree-up qv-go-up">...</td>'+
		    '<td></td>'+
		    '<td></td>'+
		'</tr>');	    
	    // append files to tree list
	    $.each(returnedData, function(index, elem){
		// document name
		var name = elem.name;
		// document guid
		var guid = elem.guid;
		// document size
		var size = elem.size;
		// convert to proper size
		var new_size = size + ' Bytes';
		if((size / 1024 / 1024) > 1){
			new_size = (Math.round((size / 1024 / 1024) * 100) / 100) + ' MB';
		}else if((size / 1024) > 1){
			new_size = (Math.round((size / 1024) * 100) / 100) + ' KB';
		}
		// document format
		var docFormat = (getDocumentFormat(name, elem.isDirectory) == undefined)? 'fa-folder' : getDocumentFormat(name, elem.isDirectory);
		// append document
		$('.qv-modal-table tbody').append(
			'<tr>'+
			'<td><i class="fa ' + docFormat.icon + '"></i></td>'+
			'<td class="qv-filetree-name" data-guid="' + guid + '"><div class="qv-file-name">' + name + '</div></td>'+
			'<td>' + docFormat.format + '</td>'+
			'<td>' + new_size + '</td>'+
		'</tr>');
	    });
	},
	error: function(xhr, status, error) {
	  var err = eval("(" + xhr.responseText + ")");
	  console.log(err.Message);
	}
    });
}

/**
* Open/Load document
* @param {object} callback - document pages array
*/
function loadDocument(callback){
	// clear global documentData array from previous document info
	documentData = [];
	// get document description
	var data = {guid: documentGuid, htmlMode: htmlMode, password: password};	
	$.ajax({
	type: 'POST',
	url: getApplicationPath('loadDocumentDescription'),
	data: JSON.stringify(data),
	contentType: "application/json",
	success: function(returnedData) {
		if(returnedData.message != undefined){
			if(returnedData.message == "Password Required"){							
				openPasswordModal();
			} else if(returnedData.message == "Incorrect password"){
				openPasswordModal(returnedData.message);
				return;	
			} else {			
				// open error popup
				printMessage(returnedData.message);
			}
			return;
		}
		// get total page number
		var totalPageNumber = returnedData.length;
		// set total page number on navigation panel
		setNavigationPageValues('1', totalPageNumber);
		// set current document data globally
		documentData = returnedData;		
		// render pages		
		generatePagesTemplate(returnedData, totalPageNumber);			
	},
	error: function(xhr, status, error) {
		var err = eval("(" + xhr.responseText + ")");
		console.log(err.Message);
	}
	}).done(function(data){
	// return POST data
	callback(data);
	});	
}

/**
* Generate empty pages temples before the actual get pages request
* @param {object} data - document pages array
* @param {int} totalPageNumber - total number of document pages
* @param {string} prefix - elements id prefix
*/
function generatePagesTemplate(data, totalPageNumber, prefix){
	if(data.message == undefined){
		// set empty for undefined of null
		prefix = prefix || '';
		// loop though pages	
		$.each(data, function(index, elem){
			// set document description
			var pageNumber = elem.Number;
			var pageWidth = elem.Width;
			var pageHeight = elem.Height;
			// append empty page		
			$('#qv-' + prefix + 'panzoom').append(
				'<div id="qv-' + prefix + 'page-' + pageNumber + '" class="qv-page" style="min-width: ' + pageWidth + 'px; min-height: ' + pageHeight + 'px;">'+
				'<div class="qv-page-spinner"><i class="fa fa-circle-o-notch fa-spin"></i> &nbsp;Loading... Please wait.</div>'+
				'</div>'
			);			
		});	
		var counter = 0;		
		// check pre-load page number is bigger than total pages number
		if(preloadPageCount > totalPageNumber){
			counter = totalPageNumber;
		} else {
			counter = preloadPageCount;
		}	
		if(prefix == ""){
			// get page according to the pre-load page number
			if(preloadPageCount > 0){
				for(var i = 0; i < counter; i++){
					// render page
					appendHtmlContent(i + 1, documentGuid, "", data[i].Width, data[i].Height);		
				}	
							
			} else {
				// get all pages
				for(var i = 0; i < totalPageNumber; i++){
					appendHtmlContent(i + 1, documentGuid, "", data[i].Width, data[i].Height);	
				}							
			}	
		} else {
			// load all thumbnails only when any of document pages is loaded.
			// this is required to fix issue with thumbnails resolution
			isPageLoaded($("#qv-page-1")).then(function(element) {
				for(var i = 0; i < totalPageNumber; i++){
					appendHtmlContent(i + 1, documentGuid, "thumbnails-", data[i].Width, data[i].Height);	
				}
			});
		}
	}	
}

/**
* Append html content to an empty page
* @param {int} pageNumber - page number
* @param {string} documentName - document name/id
* @param {string} prefix - elements id prefix
* @param {int} width - current page width
* @param {int} height - current page height
*/
function appendHtmlContent(pageNumber, documentName, prefix, width, height){
    // set empty for undefined of null
    prefix = prefix || '';
    // initialize data
    var qv_prefix_page = $('#qv-' + prefix + 'page-' + pageNumber);
    var qv_page = $('#qv-page-' + pageNumber);

    if(!qv_prefix_page.hasClass('loaded')){
	qv_prefix_page.addClass('loaded');
	// get document description
	var data = {guid: documentGuid, page: pageNumber, htmlMode: htmlMode, password: password};
	$.ajax({
	    type: 'POST',
	    url: getApplicationPath('loadDocumentPage'),
	    data: JSON.stringify(data),
	    contentType: "application/json",
	    success: function(htmlData) {
			if(htmlData.error != undefined){
				// open error popup
				printMessage(htmlData.error);
				return;
			}			
			
			// fix zoom in/out scaling
			var zoomValue = 1;
			// append page content in HTML mode
			if(htmlMode){
				// append page
				qv_prefix_page.append('<div class="qv-wrapper">' + htmlData.pageHtml + '</div>');
				// remove spinner
				qv_prefix_page.find('.qv-page-spinner').hide();
				// fix to avoid using the spinner DIV size
				if(preloadPageCount == 0){
					if(qv_page.innerWidth() >= width - 1 &&  qv_page.innerHeight() >= height - 1){
						width = qv_page.innerWidth();
						height =  qv_page.innerHeight();
					}
				} else {
					// set correct width and height for document pages
					if(prefix == ""){
						if(qv_page.innerWidth() >= width - 1 &&  qv_page.innerHeight() >= height - 1){
							width = qv_page.innerWidth();
							height =  qv_page.innerHeight();
						}
					} else {
						// set correct width and height for thumbnails
						if(width > height && htmlData.angle == 0){
							// change the width and height in places if page is landscape oriented
							width = $("#qv-page-1").innerHeight();
							height = $("#qv-page-1").innerWidth();
						} else {
							// use first document page sezie to fix thumbnails size issue
							width = $("#qv-page-1").innerWidth();
							height = $("#qv-page-1").innerHeight();
						}
					}
				}			
				// check if page is horizontally displayed
				if(width > height || width >= $(window).width()){
					zoomValue = 0.79;
				}				
				// set correct size
				qv_prefix_page.css('width', width);
				qv_prefix_page.css('height', height);
				qv_prefix_page.css('zoom', zoomValue);
			// render document in image mode
			} else {			
				qv_prefix_page.find('.qv-page-spinner').hide();
				// check if page is horizontally displayed
				if(width > height){
					zoomValue = 0.79;
				} 			
				// if current document if image file fix its zoom
				if(getDocumentFormat(documentGuid).icon.search("image") > 0 || getDocumentFormat(documentGuid).icon.search("photo") > 0){
					if(prefix == "thumbnails-"){
						if(width > ($("#qv-thumbnails").width() * 2)){
							zoomValue = 0.5;
						} else {
							zoomValue = 1.2;
						}
					} else {
						if(width > $(window).width()){
							zoomValue = 0.79;
						}
					}						
				} else {
					zoomValue = 1.2;
				}
				// set correct size
				qv_prefix_page.css('width', width);
				qv_prefix_page.css('height', height);
				qv_prefix_page.css('zoom', zoomValue);
				// append page image, in image mode append occurred after setting the size to avoid zero size usage
				qv_prefix_page.append('<div class="qv-wrapper">'+
										'<image style="width: inherit !important" class="qv-page-image" src="data:image/png;base64,' + htmlData.pageImage + '" alt></image>'+
									'</div>');
			}					
			// set correct width and hight for OneNote format
			if(documentName.substr((documentName.lastIndexOf('.') +1)) == "one"){
				if(htmlMode){
					$(".qv-wrapper").css("width", "initial");
				} else {
					$(".qv-wrapper").css("width", "inherit");
				}
			}			
			// rotate page if it were rotated earlier
			if(htmlData.angle != 0){
				qv_prefix_page.css('animation', 'none'); 
				qv_prefix_page.css('transition-property', 'none');
				qv_prefix_page.css('transform', 'rotate(' + htmlData.angle + 'deg)');
				if(htmlData.angle == 90 || htmlData.angle == 270){
					// set styles for HTML mode
					if(htmlMode){
						qv_page.addClass("qv-landscape");
						if(prefix == "thumbnails-"){
							qv_prefix_page.addClass("qv-thumbnails-landscape");
						}
					} else {
						// set style for image mode
						qv_page.addClass("qv-landscape-image");	
						if(prefix == "thumbnails-"){
							qv_prefix_page.addClass("qv-thumbnails-landscape-image");	
							qv_prefix_page.find("img").removeClass("qv-page-image");							
						}
					}
				} else {
					qv_page.removeClass("qv-landscape");
					qv_prefix_page.removeClass("qv-thumbnails-landscape");				
					qv_page.removeClass("qv-landscape-image");
					qv_prefix_page.removeClass("qv-thumbnails-landscape-image");
				}				
			}			
	    },
	    error: function(xhr, status, error) {
	        var err = eval("(" + xhr.responseText + ")");
	        console.log(err.Message);
	    }
	});
    }
}

/**
* Get document format (type)
* @param {string} filename - document name
* @param {boolean} isDirectory - define if the current element is directory or file
*/
function getDocumentFormat(filename, isDirectory){
	if(!isDirectory){
		if(typeof map[filename.split('.').pop().toLowerCase()] == "undefined"){
			if(filename.split('.').length > 1){
				return map["unknown"];
			} else {
				return map["folder"];
			}
		} else {
			return map[filename.split('.').pop().toLowerCase()];
		}
	} else {
		return map["folder"];
	}
}

/**
* Get application path for GET/POST requests
* @param {string} context - application context
*/
function getApplicationPath(context){
    if(applicationPath != null){
	if(applicationPath.slice(-1) == '/'){
	    return applicationPath + context;
	}else{
	    return applicationPath + "/" + context;
	}
    }else{
        return context;
    }
}

/**
* Search for element by class (recursive)
* @param {object} target - object where to search for an id
* @param {string} class_id - class id
*/
function getElementByClass(target, class_id){
    var elem = target.find(class_id);
    if(!elem.hasClass(class_id.slice(1))){
	return getElementByClass(target.parent(), class_id);
    }else{
	return elem;
    }
}

/**
* Toggle modal dialog
* @param {boolean} open - open/close value
* @param {string} title - title to display in modal dialog (popup)
*/
function toggleModalDialog(open, title, content){
	if(open){
		$('#modalDialog .qv-modal-title').text(title);
		$('#modalDialog')
			.css('opacity', 0)
			.fadeIn('fast')
			.animate(
			{ opacity: 1 },
			{ queue: false, duration: 'fast' }
			);
		$('#modalDialog').addClass('in');
		$(".qv-modal-body").append(content);
    }else{
		$('#modalDialog').removeClass('in');
		$('#modalDialog')
			.css('opacity', 1)
			.fadeIn('fast')
			.animate(
			{ opacity: 0 },
			{ queue: false, duration: 'fast' }
			)
			.css('display', 'none');
		$(".qv-modal-body").html("");
    }
}

/**
* Toggle top navigation menus (zoom, search)
* @param {object} target - dropdown target to be opened/closed
*/
function toggleNavDropdown(target){
    var isOpened = target.hasClass('opened');
    if(!isOpened){
	$(target).addClass('opened');
	$(target)
	    .css('opacity', 0)
	    .slideDown('fast')
	    .animate(
		{ opacity: 1 },
		{ queue: false, duration: 'fast' }
	    );
    }else{
	$(target).removeClass('opened');
	$(target)
	    .css('opacity', 1)
	    .slideUp('fast')
	    .animate(
		{ opacity: 0 },
		{ queue: false, duration: 'fast' }
	    );
    }
}

/**
* Highlight search results
* @param {string} text - text to search
*/
function highlightSearch(text) {
    clearHighlightSearch();
    if(text.length > 1){
	var textNodes = $('#qv-pages .qv-wrapper div').find('*').contents().filter(function() { 
		return this.nodeType === 3;
	});
	textNodes.each(function() {
	    var $this = $(this);
	    var content = $this.text();
	    // ignor upper/lower cases
	    var regEx = new RegExp(text, "ig");
	    // find mattching string
	    var str_start = content.search(regEx);
	    var originalString = 'did not worked!';
	    if(str_start >= 0){
		var originalString = content.substring(str_start, str_start + text.length);
	    }
	    // add highlight
	    content = content.replace(regEx, '<span class="qv-highlight">' + originalString + '</span>');
	    // update to new content
	    $this.replaceWith(content);
	});
	var totalSearchMatches = getTotalSearchMatches();
	setSearchMatchCount(0, totalSearchMatches);
	if(totalSearchMatches > 0){
	    $('#qv-nav-search-next').click();
	}
    }
}

/**
* Clear search input
*/
function clearSearch(){
    $('#qv-nav-search-container :input').val('');
    setSearchMatchCount(0, 0);
    clearHighlightSearch();
}

/**
* Zoom document
* @param {int} zoom_val - zoom value from 0 to 100
*/
function setZoomValue(zoom_val){
    // adapt value for css
    var zoom_val_non_webkit = zoom_val / 100;
    var zoom_val_webkit = Math.round(zoom_val) + '%';
    // display zoom value
    setNavigationZoomValues(zoom_val_webkit);
    // set css zoom values
    var style = [
	'zoom: ' + zoom_val_webkit,
	'zoom: ' + zoom_val_non_webkit, // for non webkit browsers
	'-moz-transform: (' + zoom_val_non_webkit + ', ' + zoom_val_non_webkit + ')' // for mozilla browser
    ].join(';');
    // add style
    $('#qv-panzoom').attr('style', style);
}

/**
* Get currently set zoom value
*/
function getZoomValue(){
    return parseInt($('#qv-zoom-value').text().slice(0, -1));
}

/**
* Get total matches count from search
*/
function getTotalSearchMatches(){
    return $('.qv-highlight').length;
}

/**
* Set number of currently selected match
* @param {int} index - current searched result position
* @param {int} totalCound - total search matches
*/
function setSearchMatchCount(index, totalCount){
    $('#qv-search-count').text(index + " of " + totalCount);
}

/**
* Set zoom values on navigation panel
* @param {int} value - zoom value from 0 to 100
*/
function setNavigationZoomValues(value){
    $('#qv-zoom-value').text(value);
}

/**
* Set page values on navigation panel
* @param {int} firstPageNumber - first page number
* @param {int} lastPageNumber - last page number or total pages
*/
function setNavigationPageValues(firstPageNumber, lastPageNumber){
    $('#qv-page-num').text(firstPageNumber + '/' + lastPageNumber);
}

/**
* Clear previously highlighted search
*/
function clearHighlightSearch(){
    //remove highlights
    $('#qv-pages .qv-highlight').contents().unwrap();
    // normalize text
    $('#qv-pages').each(function(index, element){
	element.normalize();
    });
    search_position = 0;
}

/**
* Clear all data from peviously loaded document
*/
function clearPageContents(){
    // set zoom to default
    setZoomValue(100);
    // set page number and total pages to zero
    setNavigationPageValues('0', '0');
    // remove previously rendered document pages
    $('#qv-panzoom').html('');
    $('#qv-thumbnails-panzoom').html('');
    // go to top
    $('#qv-pages').scrollTo(0, {
	duration: 0
    });
}

/**
* Clear all data from peviously loaded document
* @param {string} message - message to diplay in popup
*/
function printMessage(message){   
	var content = '<div id="qv-modal-error">' + message + '</div>';
    toggleModalDialog(true, 'Error', content);		
}

/**
* Scroll to page
* @param {int} pageNumber - page number where to scroll
*/
function scrollToPage(pageNumber){
    // get zoom value
    var zoomValue = $('#qv-panzoom').css('zoom');
    if(zoomValue == 'undefined'){
	zoomValue = 100;
    }else{
	zoomValue = zoomValue * 100;
    }
    // scroll
    $('#qv-pages').scrollTo('#qv-page-' + pageNumber, {
	zoom: zoomValue
    });
}

/**
* Rotate document pages
* @param {int} angle - document page rotation angle
*/
function rotatePages(angle){
    // Get current page number
    var pagesAttr = $('#qv-page-num').text().split('/');
    var currentPageNumber = parseInt(pagesAttr[0]);
    // Prepare pages numbers array
    var pages = [];
    pages[0] = currentPageNumber;
    // Prepare ajax data
    var data = {guid: documentGuid, angle: angle, pages: pages, htmlMode: htmlMode, password: password};
    $.ajax({
	type: 'POST',
	url: getApplicationPath('rotateDocumentPages'),
	data: JSON.stringify(data),
	contentType: "application/json",
	success: function(returnedData) {
	    if(returnedData.message != undefined){
		// open error popup
		printMessage(returnedData.message);
		return;
	    }
	    $.each(returnedData, function(index, elem){
			// Rotate the page
			$('#qv-page-' + elem.pageNumber).css('animation', 'none'); 
			$('#qv-page-' + elem.pageNumber).css('transition-property', 'none');
			$('#qv-page-' + elem.pageNumber).css('transform', 'rotate(' + elem.angle + 'deg)');
			// set correct styles when page has landscape orientation
			if(elem.angle == 90 || elem.angle == 270){
				if(htmlMode){
					$('#qv-page-' + elem.pageNumber).addClass("qv-landscape");
					$('#qv-thumbnails-page-' + elem.pageNumber).addClass("qv-thumbnails-landscape");	
				} else {
					$('#qv-page-' + elem.pageNumber).addClass("qv-landscape-image");	
					$('#qv-thumbnails-page-' + elem.pageNumber).addClass("qv-thumbnails-landscape-image");	
					$('#qv-thumbnails-page-' + elem.pageNumber).find("img").removeClass("qv-page-image");							
				}
			} else {
				$('#qv-page-' + elem.pageNumber).removeClass("qv-landscape");
				$('#qv-thumbnails-page-' + elem.pageNumber).removeClass("qv-thumbnails-landscape");				
				$('#qv-page-' + elem.pageNumber).removeClass("qv-landscape-image");
				$('#qv-thumbnails-page-' + elem.pageNumber).removeClass("qv-thumbnails-landscape-image");
			}	
	        // rotate page thumbnail
			$('#qv-thumbnails-page-' + elem.pageNumber).css('animation', 'none'); 
			$('#qv-thumbnails-page-' + elem.pageNumber).css('transition-property', 'none');
	        $('#qv-thumbnails-page-' + elem.pageNumber).css('transform', 'rotate(' + elem.angle + 'deg)');					
	    });	   
	},
	error: function(xhr, status, error) {
	  var err = eval("(" + xhr.responseText + ")");
	  console.log(err.Message);
	}
    });
}

/**
* Download current document
*/
function downloadDocument(){
    if(documentGuid != "" && typeof documentGuid != "undefined"){
	// Open download dialog
	window.location.assign(getApplicationPath('downloadDocument/?path=') + documentGuid);
    } else {
	// open error popup
	printMessage("Please open document first");
    }
}

/**
* Add file to the upload list
* @param {file[]} uploadFiles - Files array for uploading
* @param {string} url - URL of the file
*/
function addFileForUpload(uploadFiles, url) {
    // get table in which files will be added
    var table = $("#qv-upload-files-table");
    // get current count of table rows
    var tableRowsNumber = $('#qv-upload-files-table > div').length;
	
    if(url){
		// append URL
		table.append('<div class="swiper-container">'+	
						'<div class="swiper-wrapper">'+	
							'<div class="swiper-slide">'+
								'<i class="fa ' + getDocumentFormat(url.split('/').pop()).icon + '"></i>'+
								'<div class="qv-filetree-name" data-uploaded="false" data-value="' + url + '">'+
									'<div class="qv-file-name">' + url.split('/').pop() + '</div>'+ 
									'<span id="qv-upload-size"> type: ' + url.split('/').pop().split('.').pop() +'</span>'+
								'</div>'+
								'<div id="qv-pregress-bar-' + tableRowsNumber + '" class="qv-pregress p0 small green">'+
									'<div class="slice">'+
										'<div class="bar"></div>'+
										'<div class="fill"></div>'+
									'</div>'+
								'</div>'+
								'<div id="qv-upload-complete-' + tableRowsNumber + '" class="qv-upload-complete"><i class="fa fa-check-circle-o"></i></div>'+
							'</div>'+	
							'<div class="swiper-slide qv-desktop swiper-slide-cancel">'+
								'<div class="files-table-remove">'+
									'<button class="btn qv-cancel-button"><i class="fa fa-trash-o"></i></button>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>');
		// increase table rows counter after adding new record
		tableRowsNumber++			
    } else {
	// append files
	$.each(uploadFiles, function(index, file){
	uploadFilesList.push(file);
	// document format
	var docFormat = getDocumentFormat(file.name);
	// convert to proper size
	var new_size = file.size + ' Bytes';
	if((file.size / 1024 / 1024) > 1){
	new_size = (Math.round((file.size / 1024 / 1024) * 100) / 100) + ' MB';
	}else if((file.size / 1024) > 1){
	new_size = (Math.round((file.size / 1024) * 100) / 100) + ' KB';
	}
	// append document
	table.append('<div class="swiper-container">'+	
					'<div class="swiper-wrapper">'+	
						'<div class="swiper-slide">'+
							'<i class="fa ' + docFormat.icon + '"></i>'+
							'<div class="qv-filetree-name" data-uploaded="false">'+
								'<div class="qv-file-name">' + file.name + '</div>'+ 
								'<span id="qv-upload-size">size: ' + new_size +'</span>'+
								'<span id="qv-upload-size"> type: ' + file.name.split('.').pop() +'</span>'+
							'</div>'+
							'<div id="qv-pregress-bar-' + tableRowsNumber + '" class="qv-pregress p0 small green">'+
								'<div class="slice">'+
									'<div class="bar"></div>'+
									'<div class="fill"></div>'+
								'</div>'+
							'</div>'+
							'<div id="qv-upload-complete-' + tableRowsNumber + '" class="qv-upload-complete"><i class="fa fa-check-circle-o"></i></div>'+
						'</div>'+	
						'<div class="swiper-slide qv-desktop swiper-slide-cancel">'+
							'<div class="files-table-remove">'+
								'<button class="btn qv-cancel-button"><i class="fa fa-trash-o"></i> Remove</button>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>');
	// increase table rows counter after adding new record
	tableRowsNumber++	
	});
    }		
    $("#qv-upload-button").prop("disabled", false);
	if(isMobile()){
		$.each($(".swiper-slide"), function(index, slide){
			$(slide).removeClass("qv-desktop");
		});
		//initialize swiper when document ready
		var swiper = new Swiper ('.swiper-container');
	} else {
		$.each($(".swiper-slide"), function(index, slide){
			$(slide).removeClass("swiper-slide-cancel");
		});
	}
}

/**
* Upload document
* @param {file} file - File for uploading
* @param {int} index - Number of the file to upload
* @param {string} url - URL of the file, set it if URL used instead of file
*/
function uploadDocument(file, index, url = ''){
    // prepare form data for uploading
    var formData = new FormData();    
    // add local file for uploading
    formData.append("file", file);
    // add URL if set
    formData.append("url", url);
	formData.append("rewrite", rewrite);
    $.ajax({
	// callback function which updates upload progress bar
	xhr: function()
	{
	    var xhr = new window.XMLHttpRequest();
	    // upload progress
	    xhr.upload.addEventListener("progress", function(event){
	        if (event.lengthComputable) {
	            $(".qv-modal-close-action").off('click');
	            $("#qv-open-document").prop("disabled", true);
		        // increase progress
		        $("#qv-pregress-bar-" + index).addClass("p"+ Math.round(event.loaded / event.total * 100));
	            if(event.loaded == event.total){
					$("#qv-pregress-bar-" + index).fadeOut();
					$("#qv-upload-complete-" + index).fadeIn();
					$('.qv-modal-close-action').on('click', closeModal);
					$("#qv-open-document").prop("disabled", false);
	            }
	        }
	    }, false);
	    return xhr;
	},
	type: 'POST',
	url: getApplicationPath('uploadDocument'), 
	data: formData,   
	cache: false,
	contentType: false,
	processData: false,			                      
	success: function(returnedData) {
	    if(returnedData.message != undefined){
	        // open error popup
	        printMessage(returnedData.message);
	        return;
	    }	  
	},
	error: function(xhr, status, error) {
	  var err = eval("(" + xhr.responseText + ")");
	  console.log(err.Message);
	}
    });		
}

/**
* Print current document
*/
function printDocument(){
    // get current document content
    var documentContainer = $("#qv-panzoom");
    // force each document page to be printed as a new page
    var cssPrint = '<style>'+
		    '@media print'+
		    '{.qv-wrapper {page-break-after:always;}';
    // set correct page orientation if page were rotated						
    documentContainer.find(".qv-page").each(function(index, page){
        if($(page).css("transform") != "none"){
	    cssPrint = cssPrint + "#" + $(page).attr("id") + "{transform: rotate(0deg) !important;}";
        }
    });
    cssPrint = cssPrint + '}</style>';	
    // open print dialog 
    var windowObject = window.open('', "PrintWindow", "width=750,height=650,top=50,left=50,toolbars=yes,scrollbars=yes,status=yes,resizable=yes");
    // add current document into the print window
    windowObject.document.writeln(cssPrint);
    // add current document into the print window
    windowObject.document.writeln(documentContainer[0].innerHTML);
    windowObject.document.close();
    windowObject.focus();
    windowObject.print();
    windowObject.close();
}
	
/**
* Close modal
*/
function closeModal(){
    // remove all files from the upload list
    uploadFilesList = [];
    var tableRows = $('#qv-upload-files-table > div');
    for(var n = 0; n < tableRows.length; n++){
	    $(tableRows[n]).remove();
    }
    $("#qv-upload-input").val('');
    toggleModalDialog(false, '');
}

function openBrowseModal(){	
	loadFileTree('');
}

/**
* Open password modal
* @param {string} error - error message
**/
function openPasswordModal(error){
	var passwordSection = '<section id="qv-password-section" class="tab-slider-body">'+		       
								'<div class="inner-addon left-addon btn qv-password-wrap" id="qv-password-wrap">'+
									'<input type="password" class="form-control" id="qv-password-input" placeholder="Enter password">'+
									'<button class="btn btn-primary" id="qv-password-submit">Submit</button>'+
									'<span class="qv-password-error" style="display: none;"></span>'+
							    '</div>'+
							'</section>';	
	toggleModalDialog(true, 'Password required', passwordSection);	
	if(error != "" && typeof error != "undefined"){
		$(".qv-password-error")[0].innerHTML = error;
		$(".qv-password-error").show();	
	} else {
		$(".qv-password-error").hide();	
	}		
}

/**
* Check if all document pages are loaded and clear the password
**/
function clearPassword(){
	if(password != "" && typeof password != "undefined"){
		var totalPagesNumber = $('#qv-panzoom > div').length;
		var loadedPages = [];
		if(totalPagesNumber > 0){
			$('#qv-panzoom > div').each(function(index, page){
					if($(page).has(".qv-wrapper").length){
						loadedPages.push(true);
					}		
			});
			if(loadedPages.length == totalPagesNumber){
				password = "";
			}
		}
	}
}

/**
* On-promise function which waits until the element is loaded
* @param {Object} selector - element to wait for
**/
function isPageLoaded(selector) {
	return new Promise((resolve, reject) => {
		// check if loaded
		const waitForEl = (selector, count = 0) => {
			const el = selector.find(".qv-wrapper");
			// check if element is loaded
			if (el.length > 0) {
				resolve(el);
			} else {
				// wait 100 milliseconds and check again
				setTimeout(() => {
					count++;

					if (count < 60) {
						waitForEl(selector, count);
					} else {
						reject();
					}
				}, 1000);
			}
		};
		waitForEl(selector);
	});
}

/**
* Get HTML content for file browser modal
**/
function getHtmlFileBrowser(){
	return '<section id="qv-browse-section" class="tab-slider-body">'+
			'<div id="qv-modal-spinner"><i class="fa fa-circle-o-notch fa-spin"></i> &nbsp;Loading... Please wait.</div>'+					        
			'<table id="qv-modal-filebroswer" class="qv-modal-table">'+
			'<thead>'+
				'<tr>'+
				'<th class="col-md-1"> </th>'+
				'<th class="col-md-5">Document</th>'+
				'<th class="col-md-3">Format</th>'+
				'<th class="col-md-3">Size</th>'+
				'</tr>'+
			'</thead>'+
			'<tbody>'+
			// list of files
			'</tbody>'+
			'</table>'+
		'</section>';		
}
	
/**
* Get HTML content for upload modal
**/
function getHtmlUpload(){
	// upload section
	var uploadSection = '<section id="qv-upload-section" class="tab-slider-body">'+
							'<div class="qv-drag-n-drop-wrap" id="qv-dropZone">'+
								'<div class="qv-drag-n-drop-icon"><i class="fa fa-cloud-download fa-5x" aria-hidden="true"></i></div>'+
								'<h2>Drag &amp; Drop your files here</h2>'+
								'<h4>OR</h4>'+
								'<div class="qv-drag-n-drop-buttons">'+
									'<label class="btn btn-primary">'+
										'<i class="fa fa-file"></i>'+
										'SELECT FILE'+
										'<input id="qv-upload-input" type="file" multiple style="display: none;">'+
									'</label>'+
									'<label class="btn" id="qv-url-button">'+
										'<i class="fa fa-link"></i>'+
										'URL'+
									'</label>'+
								'</div>'+
							'</div>'+
							'<div class="inner-addon left-addon btn qv-url-wrap" id="qv-url-wrap" style="display: none;">'+
								'<input type="url" class="form-control" id="qv-url" placeholder="Enter your file URL">'+
								'<button class="btn" id="qv-url-cancel"><i class="fa fa-trash-o"></i></button>'+
								'<button class="btn btn-primary" id="qv-add-url">Add</button>'+
							'</div>'+
							'<div id="qv-upload-files-table">'+									
								// list of files
							'</div>'+
							'<button id="qv-upload-button" type="button" class="btn btn-success" disabled>Upload</button>'+
							'<button id="qv-open-document" type="button" class="btn">Browse files</button>'+
						'</section>';  
	return uploadSection;
}	

/*
******************************************************************
******************************************************************
QUICKVIEW PLUGIN
******************************************************************
******************************************************************
*/
(function( $ ) {
/*
******************************************************************
STATIC VALUES
******************************************************************
*/
	var qv_navbar = '#qv-navbar';

/*
******************************************************************
METHODS
******************************************************************
*/
	var methods = {
		init : function( options ) {
			// set defaults
			var defaults = {
				applicationPath: null,
				preloadPageCount: 1,
				zoom : true,
				pageSelector: true,
				search: true,
				thumbnails: true,
				rotate: true,
				download: true,
                upload: true,
				print: true,
				defaultDocument: null,
				browse: true,
				htmlMode: false,
				rewrite: true
			};
			options = $.extend(defaults, options);

			// set global option params
			applicationPath = options.applicationPath;
			preloadPageCount = options.preloadPageCount;
			htmlMode = options.htmlMode;
			rewrite = options.rewrite;
			
			// assembly html base
			this.append(getHtmlBase);
			this.append(getHtmlModalDialog);	

			// assembly nav bar
			if(options.zoom){
				$(qv_navbar).append(getHtmlNavZoomPanel);
				$(qv_navbar).append(getHtmlNavSplitter);
			}
			if(options.pageSelector){
				$(qv_navbar).append(getHtmlNavPagesPanel);
				$(qv_navbar).append(getHtmlNavSplitter);
			}
			if(options.rotate){
				$(qv_navbar).append(getHtmlRotatePanel);
				$(qv_navbar).append(getHtmlNavSplitter);
			}
			if(options.search){
				$(qv_navbar).append(getHtmlNavSearchPanel);
				$(qv_navbar).append(getHtmlNavSplitter);
			}
			if(options.download){
				$(qv_navbar).append(getHtmlNavDownloadPanel);
				$(qv_navbar).append(getHtmlNavSplitter);
			}			
			if(options.upload){
				$(qv_navbar).append(getHtmlNavUploadPanel);
				$(qv_navbar).append(getHtmlNavSplitter);					
			} 			
			if(options.print){
			        $(qv_navbar).append(getHtmlNavPrintPanel);
			        $(qv_navbar).append(getHtmlNavSplitter);
			}
			if(options.thumbnails){
				$(qv_navbar).append(getHtmlNavThumbTogglePanel);
			}	
			if(options.defaultDocument){
			    documentGuid = options.defaultDocument;
			    loadDocument(function(data){
				// Generate thumbnails
				generatePagesTemplate(data, data.length, 'thumbnails-');
			    });
			}			
			if(options.browse){
				$("#qv-header-logo").on('click', openBrowseModal);
			}
		}
	};
	

/*
******************************************************************
INIT PLUGIN
******************************************************************
*/
	$.fn.quickView = function( method ) {
		if ( methods[method] ) {
      		return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    	} else if ( typeof method === 'object' || ! method ) {
      		return methods.init.apply( this, arguments );
    	} else {
      		$.error( 'Method' +  method + ' does not exist on jQuery.quickView' );
    	} 	
	};


/*
******************************************************************
HTML MARKUP
******************************************************************
*/
	function getHtmlBase(){
		return '<div id="qv-container">'+
			    '<div class="wrapper">'+
			        // header BEGIN
			        '<div id="qv-header">'+
						'<div id="qv-header-logo">'+
							'<span class="qv-tooltip">Browse Files</span>'+
						'</div>'+
						
						// nav bar BEGIN
						'<ul id="' + qv_navbar.slice(1) + '">'+
							// nav bar content	
						'</ul>'+
						// nav bar END
			        '</div>'+
			        // header END
    
			        // thumbnails sidebar BEGIN
			        '<div id="qv-thumbnails">'+
						'<div id="qv-thumbnails-panzoom">'+
							// Thumbnails will be added here automatically on document open
						'</div>'+
			        '</div>'+
			        // thumbnails sidebar END
			        
			        // pages BEGIN
			        '<div id="qv-pages">'+
						'<div id="qv-panzoom">'+
							// list of pages
						'</div>'+
			        '</div>'+
			        // pages END
								        
			    '</div>'+
			'</div>';
	}

	function getHtmlModalDialog(){
		return 	'<div class="qv-modal fade" id="modalDialog">'+
			      '<div class="qv-modal-dialog">'+
			        '<div class="qv-modal-content" id="qv-modal-content">'+
			            // header
			            '<div class="qv-modal-header">'+
							'<div class="qv-modal-close qv-modal-close-action"><span>x</span></div>'+
							'<h4 class="qv-modal-title"></h4>'+						
			            '</div>'+
			            // body
			            '<div class="qv-modal-body">'+							
							// modal content will be here							
						'</div>'+						
			            // footer
			            '<div class="qv-modal-footer">'+
			            // empty footer
			            '</div>'+
			        '</div><!-- /.modal-content -->'+
			      '</div><!-- /.modal-dialog -->'+
			    '</div>';
	}

	function getHtmlNavSplitter(){
		return '<li class="qv-nav-separator" role="separator"></li>';
	}

	function getHtmlNavZoomPanel(){
		return '<li class="qv-nav-toggle" id="qv-zoom-val-container">'+
					'<span id="qv-zoom-value">100%</span>'+
					'<span class="qv-nav-caret"></span>'+
					'<ul class="qv-nav-dropdown-menu qv-nav-dropdown" id="qv-btn-zoom-value">'+
						'<li>25%</li>'+
						'<li>50%</li>'+
						'<li>100%</li>'+
						'<li>150%</li>'+
						'<li>200%</li>'+
						'<li>300%</li>'+
						'<li role="separator" class="qv-nav-dropdown-menu-separator"></li>'+
						'<li>Fit Width</li>'+
						'<li>Fit Height</li>'+
		            '</ul>'+
				'</li>'+
				'<li id="qv-btn-zoom-in">'+
					'<i class="fa fa-search-plus"></i>'+
					'<span class="qv-tooltip">Zoom In</span>'+
				'</li>'+
				'<li id="qv-btn-zoom-out">'+
					'<i class="fa fa-search-minus"></i>'+
					'<span class="qv-tooltip">Zoom Out</span>'+
				'</li>';
	}

	function getHtmlNavPagesPanel(){
		return '<li id="qv-btn-page-first" class="qv-nav-btn-pages">'+
					'<i class="fa fa-angle-double-left"></i>'+
					'<span class="qv-tooltip">First Page</span>'+
				'</li>'+
				'<li id="qv-btn-page-prev" class="qv-nav-btn-pages">'+
					'<i class="fa fa-angle-left"></i>'+
					'<span class="qv-tooltip">Previous Page</span>'+
				'</li>'+
				'<li id="qv-page-num">0/0</li>'+
				'<li id="qv-btn-page-next" class="qv-nav-btn-pages">'+
					'<i class="fa fa-angle-right"></i>'+
					'<span class="qv-tooltip">Next Page</span>'+
				'</li>'+
				'<li id="qv-btn-page-last" class="qv-nav-btn-pages">'+
					'<i class="fa fa-angle-double-right"></i>'+
					'<span class="qv-tooltip">Last Page</span>'+
				'</li>';
	}

	function getHtmlNavSearchPanel(){
		return '<li id="qv-btn-search" class="qv-nav-toggle">'+
					'<i class="fa fa-search"></i>'+
					'<span class="qv-tooltip">Search</span>'+
					'<div id="qv-nav-search-container" class="qv-nav-dropdown">'+
						'<input type="text" id="qv-search-input"/>'+
						'<div id="qv-search-count">0 of 0</div>'+
						'<div class="qv-nav-search-btn" id="qv-nav-search-prev"><i class="fa fa-chevron-left"></i></div>'+
						'<div class="qv-nav-search-btn" id="qv-nav-search-next"><i class="fa fa-chevron-right"></i></div>'+
						'<div class="qv-nav-search-btn" id="qv-nav-search-cancel"><i class="fa fa-times"></i></div>'+
					'</div>'+					
				'</li>';
	}

	function getHtmlNavThumbTogglePanel(){
		return '<li id="qv-nav-right"><i class="fa fa-th-large"></i><span class="qv-tooltip">Thumbnails</span></li>';
	}

	function getHtmlRotatePanel(){
		return '<li id="qv-btn-counterclockwise"><i class="fa fa-rotate-left"></i><span class="qv-tooltip">Rotate CCW</span></li>'+
		       '<li id="qv-btn-clockwise"><i class="fa fa-rotate-right"></i><span class="qv-tooltip">Rotate CW</span></li>';
	}
	
	function getHtmlNavDownloadPanel(){
		return '<li id="qv-btn-download"><i class="fa fa-download"></i><span class="qv-tooltip">Download</span></li>';
	}	
	
	function getHtmlNavPrintPanel(){
	        return '<li id="qv-btn-print"><i class="fa fa-print"></i><span class="qv-tooltip">Print</span></li>';
	}
	
	function getHtmlNavUploadPanel(){
	    return '<li id="qv-btn-upload"><i class="fa fa-upload"></i><span class="qv-tooltip">Upload</span></li>';
	}	
})(jQuery);

/*
******************************************************************
******************************************************************
JQUERY SCROLL TO PLUGIN
******************************************************************
******************************************************************
*/
$.fn.scrollTo = function( target, options, callback ){
	if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
		var settings = $.extend({
			scrollTarget : target,
			offsetTop    : 50,
			duration     : 500,
			zoom         : 100,
			easing       : 'swing'
		}, options);
		return this.each(function(){
			var scrollPane = $(this);
			var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
			if(typeof settings.scrollTarget != "number"){
				var scrollYTop = scrollTarget.offset().top * settings.zoom / 100;
			}
			var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollYTop + scrollPane.scrollTop() - parseInt(settings.offsetTop);
			scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
			  if (typeof callback == 'function') { callback.call(this); }
		});
	});
}

/*
******************************************************************
******************************************************************
JQUERY CHECK IF IN VIEWPORT PLUGIN
******************************************************************
******************************************************************
*/
$.fn.isOnScreen = function(x, y){
    
    if(x == null || typeof x == 'undefined') x = 1;
    if(y == null || typeof y == 'undefined') y = 1;
    
    var win = $(window);
    
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    
    var height = this.outerHeight();
    var width = this.outerWidth();
 
    if(!width || !height){
        return false;
    }
    
    var bounds = this.offset();
    bounds.right = bounds.left + width;
    bounds.bottom = bounds.top + height;
    
    var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    
    if(!visible){
        return false;   
    }
    
    var deltas = {
        top : Math.min( 1, ( bounds.bottom - viewport.top ) / height),
        bottom : Math.min(1, ( viewport.bottom - bounds.top ) / height),
        left : Math.min(1, ( bounds.right - viewport.left ) / width),
        right : Math.min(1, ( viewport.right - bounds.left ) / width)
    };
    
    return (deltas.left * deltas.right) >= x && (deltas.top * deltas.bottom) >= y;
};

/*
******************************************************************
******************************************************************
CHECK IF MOBILE
******************************************************************
******************************************************************
*/
var isMobile = function(){
  return 'ontouchstart' in window // works on most browsers 
	  || 'onmsgesturechange' in window; // works on ie10	
};