/**
 * QuickView Plugin
 * Copyright (c) 2016 Alexandr Bobkov <lilalex85@gmail.com>
 * Dual licensed under MIT and GPL.
 * @author Alexandr Bobkov
 * @version 1.0.0
 */

$(document).ready(function(){
/*
******************************************************************
NAV BAR CONTROLS
******************************************************************
*/
	// Clear search input
	$('#qv-nav-search-cancel').on('click', function(e){
		clearSearch();
	});

	// Toggle navigation dropdown menus
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

	// Open file browser event
	$('#qv-header-logo').on('click', function(e){
		loadFilesTree();	
		$('#fileBrowser')
			.css('opacity', 0)
			.fadeIn('fast')
			.animate(
				{ opacity: 1 },
				{ queue: false, duration: 'fast' }
			);
		$('#fileBrowser').addClass('in');
	});

	// Close file browser event
	$('.qv-modal-close-action').on('click', function(e){
		$('#fileBrowser').removeClass('in');
		$('#fileBrowser')
			.css('opacity', 1)
			.fadeIn('fast')
			.animate(
				{ opacity: 0 },
				{ queue: false, duration: 'fast' }
			)
			.css('display', 'none');
	});

	// Zoom values event
	$('#qv-btn-zoom-value > li').bind('click', function(e){
		var zoom_val = $(this).text();

		switch(zoom_val){
			case 'Fit Width':
				// get page width
				var page_width = $('.qv-page').width();
				// get screen width
				var screen_width = $('#qv-pages').width();
				// get scale ratio
				var scale = (page_width / screen_width) * 100;
				// set values
				zoom_val = 200 - scale;
				break;
			case 'Fit Height': 
				// get page height
				var page_height = $('.qv-page').height();
				// get screen height
				var screen_height = $('#qv-pages').height();
				// get scale ratio
				var scale = (screen_height / page_height) * 100;
				// set values
				zoom_val = scale;
				break;
			default:
				zoom_val = zoom_val.slice(0, -1);
				break;
		}
		setZoomValue(zoom_val);
	});

	// zoom in event
	$('#qv-btn-zoom-in').on('click', function(e){
		var zoom_val = parseInt($('#qv-zoom-value').text().slice(0, -1));
		if(zoom_val < 490){
			zoom_val = zoom_val + 10;
		}
		setZoomValue(zoom_val);
	});

	// zoom in event
	$('#qv-btn-zoom-out').on('click', function(e){
		var zoom_val = parseInt($('#qv-zoom-value').text().slice(0, -1));
		if(zoom_val > 20){
			zoom_val = zoom_val - 10;
		}
		setZoomValue(zoom_val);
	});

	// page navigation events
	$('.qv-nav-btn-pages').on('click', function(e){
		var page_array = $('#qv-page-num').text().split('/');
		var current_page = parseInt(page_array[0]);
		var last_page = parseInt(page_array[1]);
		// get clicked id
		switch($(this).attr('id')){
			case 'qv-btn-page-first':
				current_page = 1;
			break;
			case 'qv-btn-page-prev':
				current_page = current_page - 1;
			break;
			case 'qv-btn-page-next':
				current_page = current_page + 1;
			break;
			case 'qv-btn-page-last':
				current_page = last_page;
			break;
		}
		// scroll to page
		if(current_page > 0 && current_page <= last_page){
			$('#qv-pages').scrollTo('#qv-page' + current_page);
		}
	});

	// set page number on page scrolling
	$('#qv-pages').scroll(function() {
		var page_array = $('#qv-page-num').text().split('/');
		var current_page = parseInt(page_array[0]);
		var last_page = parseInt(page_array[1]);
		var zoom_val = $('#qv-panzoom').css('zoom');
		if(zoom_val == 'undefined'){
			zoom_val = 1;
		}
	    var scrollPosition = $(this).scrollTop();
	    var page_height = $('.qv-page').height();
	    var page_position = parseInt(Math.floor(scrollPosition / page_height / zoom_val)) + 1;
	    if(current_page != page_position){
	    	$('#qv-page-num').text(page_position + '/' + last_page);
		}
	});

	// read search input
	$('#qv-search-input').on('input', function(e){
		highlightSearch($(this).val());
	});

	// search next/prev events
	var search_position = 0;
	$('#qv-nav-search-next').on('click', function(e){
		var count = 0;
		$('.qv-highlight').each(function(e){
			if(count == search_position){
				// scroll to next page
				$('#qv-pages').scrollTo(this, {
					offsetTop: 150
				});
				// check if this is last rearch result instance
				if(search_position >= $('.qv-highlight').length){
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
	});

	$('#qv-nav-search-prev').on('click', function(e){
		var count = 1;
		var prev;
		$('.qv-highlight').each(function(e){
			if((count == (search_position)) && (prev != undefined)){
				// scroll to previous page
				$('#qv-pages').scrollTo(prev, {
					offsetTop: 150
				});
				// check if this is first rearch result instance
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
	});
	

/*
******************************************************************
PRIVATE FUNCTIONS
******************************************************************
*/

	function highlightSearch(text) {
		clearHighlightSearch();
		if(text.length > 0){
			var textNodes = $('#qv-pages').find('*').contents().filter(function() { 
				return this.nodeType === 3 
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
  		}
	}

	function clearHighlightSearch(){
		// get src html
	    var srcHtml = $('#qv-pages').html();
	    // clear highlights
	    var newHtml = srcHtml.replace(/(<span class="qv-highlight">|<\/span>)/igm, '');
	    $('#qv-pages').html(newHtml);
	}
/*
	function goToByScroll(id){
		// Remove "link" from the ID
		//id = id.replace("link", "");
		// Scroll
		$('html,body').animate({
		scrollTop: $(id).offset().top
		}, 'slow');
	}*/

	function setZoomValue(zoom_val){
		// adapt value for css
		var zoom_val_non_webkit = zoom_val / 100;
		var zoom_val_webkit = Math.round(zoom_val) + '%';
		// display zoom value
		$('#qv-zoom-value').text(zoom_val_webkit);
		// set css zoom values
		var style = [
			'zoom: ' + zoom_val_webkit,
			'zoom: ' + zoom_val_non_webkit, // for non webkit browsers
			'-moz-transform: (' + zoom_val_non_webkit + ', ' + zoom_val_non_webkit + ')' // for mozilla browser
		].join(';');
		// add style
		$('#qv-panzoom').attr('style', style);
	}

	function getElementByClass(target, class_id){
		var elem = target.find(class_id);
		if(!elem.hasClass(class_id.slice(1))){
			return getElementByClass(target.parent(), class_id);
		}else{
			return elem;
		}
	}

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

	function clearSearch(){
		$('#qv-nav-search-container :input').val('');
		clearHighlightSearch();
	}

	function loadFilesTree() {
	    var data = {path: ''};
	    $.ajax({
	        type: 'POST',
	        url: 'loadFilesTree',
	        data: JSON.stringify(data),
	        contentType: "application/json",
	        success: function(returnedData) {
	            $.each(returnedData, function(index, elements) {
	                $.each(elements, function(index, elem) {
	                    var name = elem.name;
	                    var path = elem.path;
	                    var size = elem.size;
	                    var docType = elem.docType;
	                    $('.qv-modal-table tbody').append(
	                    	'<tr>'+
								'<td><i class="fa fa-file-word-o"></i></td>'+
								'<td>' + name + '</td>'+
								'<td>' + docType + '</td>'+
								'<td>' + size + ' KB</td>'+
		                	'</tr>');
	                });
	            });
	        },
	        error: function(xhr, status, error) {
              var err = eval("(" + xhr.responseText + ")");
              console.log(err.Message);
            }
	    });
	}

});

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
				zoom : true,
				pageSelector: true,
				search: true,
				thumbnails: true
			};
			options = $.extend(defaults, options);

			// assembly html base
			this.append(getHtmlBase);

			// assembly nav bar
			if(options.zoom){
				$(qv_navbar).append(getHtmlNavZoomPanel);
				$(qv_navbar).append(getHtmlNavSplitter);
			}
			if(options.pageSelector){
				$(qv_navbar).append(getHtmlNavPagesPanel);
				$(qv_navbar).append(getHtmlNavSplitter);
			}
			if(options.search){
				$(qv_navbar).append(getHtmlNavSearchPanel);
				$(qv_navbar).append(getHtmlNavSplitter);
			}
			if(options.thumbnails){
				$(qv_navbar).append(getHtmlNavThumbTogglePanel);
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
				// header BEGIN
				'<div id="qv-header">'+
					'<div id="qv-header-logo"></div>'+
					// nav bar BEGIN
					'<ul id="' + qv_navbar.slice(1) + '">'+
						// nav bar content	
					'</ul>'+
					// nav bar END
				'</div>'+
				// header END

				// pages BEGIN
				'<div id="qv-pages">'+
					'<div id="qv-panzoom">'+
						// list of pages
			    	'</div>'+
			    '</div>'+
			    // pages END

			    '<!-- modal dialog begin -->'+
				'<div class="qv-modal fade" id="fileBrowser">'+
			      '<div class="qv-modal-dialog">'+
			        '<div class="qv-modal-content">'+
			          '<div class="qv-modal-header">'+
			            '<div class="qv-modal-close qv-modal-close-action"><span>x</span></div>'+
			            '<h4 class="qv-modal-title">Open Document</h4>'+
			          '</div>'+
			          '<div class="qv-modal-body">'+
			            '<table class="qv-modal-table">'+
			              '<thead>'+
			                '<tr>'+
			                  '<th class="col-md-1"> </th>'+
			                  '<th class="col-md-5">Document</th>'+
			                  '<th class="col-md-3">Format</th>'+
			                  '<th class="col-md-3">Size</th>'+
			                '</tr>'+
			              '</thead>'+
			              '<tbody>'+
			                '<tr>'+
			                  '<td class="text-center"><i class="fa fa-level-up"></i></td>'+
			                  '<td>...</td>'+
			                  '<td></td>'+
			                  '<td></td>'+
			                '</tr>'+
			                // list of files
			              '</tbody>'+
			            '</table>'+
			          '</div>'+
			          '<div class="qv-modal-footer">'+
			            '<div class="btn qv-modal-close-action">Cancel</div>'+
			            '<div class="btn qv-modal-close-action">Open</div>'+
			          '</div>'+
			        '</div><!-- /.modal-content -->'+
			      '</div><!-- /.modal-dialog -->'+
			    '</div>'+
			    '<!-- modal dialog end -->'+
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
				'</li>'+
				'<li id="qv-btn-zoom-out">'+
					'<i class="fa fa-search-minus"></i>'+
				'</li>';
	}

	function getHtmlNavPagesPanel(){
		return '<li id="qv-btn-page-first" class="qv-nav-btn-pages">'+
					'<i class="fa fa-angle-double-left"></i>'+
				'</li>'+
				'<li id="qv-btn-page-prev" class="qv-nav-btn-pages">'+
					'<i class="fa fa-angle-left"></i>'+
				'</li>'+
				'<li id="qv-page-num">1/3</li>'+
				'<li id="qv-btn-page-next" class="qv-nav-btn-pages">'+
					'<i class="fa fa-angle-right"></i>'+
				'</li>'+
				'<li id="qv-btn-page-last" class="qv-nav-btn-pages">'+
					'<i class="fa fa-angle-double-right"></i>'+
				'</li>';
	}

	function getHtmlNavSearchPanel(){
		return '<li>'+
					'<i class="fa fa-search qv-nav-toggle"></i>'+
					'<div id="qv-nav-search-container" class="qv-nav-dropdown">'+
						'<input type="text" id="qv-search-input"/>'+
						'<div id="qv-nav-search-cancel"><i class="fa fa-times"></i></div>'+
						'<div class="qv-nav-search-btn" id="qv-nav-search-prev"><i class="fa fa-chevron-left"></i></div>'+
						'<div class="qv-nav-search-btn" id="qv-nav-search-next"><i class="fa fa-chevron-right"></i></div>'+
					'</div>'+
				'</li>';
	}

	function getHtmlNavThumbTogglePanel(){
		return '<li id="qv-nav-right"><i class="fa fa-th-large"></i></li>';
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
		scrollTarget  : target,
		offsetTop     : 50,
		duration      : 500,
		easing        : 'swing'
		}, options);
		return this.each(function(){
			var scrollPane = $(this);
			var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
			var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
			scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
			  if (typeof callback == 'function') { callback.call(this); }
		});
	});
}