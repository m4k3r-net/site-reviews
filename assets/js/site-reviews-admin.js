"use strict";var x=jQuery.noConflict(),GLSR={addons:{},keys:{ENTER:13,ESC:27,SPACE:32,UP:38,DOWN:40},pinned:{},shortcode:{},translation:{}};GLSR.colorControls=function(){"object"==typeof x.wp&&"function"==typeof x.wp.wpColorPicker&&x(document).find('input[type="text"].color-picker-hex').each(function(){var t=x(this),e=t.data("colorpicker")||{};t.wpColorPicker(e)})},GLSR.dismissNotices=function(){x(".notice.is-dismissible").each(function(){var t=x(this);t.fadeTo(100,0,function(){t.slideUp(100,function(){t.remove()})})})},GLSR.getURLParameter=function(t){return decodeURIComponent((new RegExp("[?|&]"+t+"=([^&;]+?)(&|#|;|$)").exec(location.search)||[null,""])[1].replace(/\+/g,"%20"))||null},GLSR.insertNotices=function(t){t=t||!1,t&&(x("#glsr-notices").length||(x("#message.notice").remove(),x("form#post").before('<div id="glsr-notices" />')),x("#glsr-notices").html(t),x(document).trigger("wp-updates-notice-added"))},GLSR.isUndefined=function(t){var e=void 0;return t===e},GLSR.normalizeValue=function(t){return["true","on","1"].indexOf(t)>-1||!(["false","off","0"].indexOf(t)>-1)&&t},GLSR.normalizeValues=function(t){return t.map(GLSR.normalizeValue)},GLSR.onChangeAssignedTo=function(t){if(!this.value)return void(t.target.nextElementSibling.innerHTML="");var e=x(t.target.previousElementSibling),n={action:"change-assigned-to",ID:this.value};e.addClass("is-active"),GLSR.postAjax(t,n,function(n){t.target.nextElementSibling.innerHTML=n,e.removeClass("is-active")})},GLSR.onChangeStatus=function(t){var e=this.href.match(/post=([0-9]+)/)[1],n=this.href.match(/action=([a-z]+)/)[1];if(!GLSR.isUndefined(n)&&!GLSR.isUndefined(e)){var s={action:"change-review-status",status:n,post_id:e};GLSR.postAjax(t,s,function(e){var n=x(t.target);n.closest("tr").removeClass("status-pending status-publish").addClass(e["class"]),n.closest("td.column-title").find("strong").html(e.link)})}},GLSR.onClearLog=function(t){var e={action:"clear-log"};GLSR.postAjax(t,e,function(t){GLSR.insertNotices(t.notices),x("#log-file").val(t.log)})},GLSR.onFieldChange=function(){var t=x(this).closest("form").find("[data-depends]");if(t.length)for(var e=this.getAttribute("name"),n=this.getAttribute("type"),s=0;s<t.length;s++)try{var i,o=JSON.parse(t[s].getAttribute("data-depends"));if(o.name!==e)continue;i="checkbox"===n?!!this.checked:x.isArray(o.value)?x.inArray(GLSR.normalizeValue(this.value),GLSR.normalizeValues(o.value))!==-1:GLSR.normalizeValue(o.value)===GLSR.normalizeValue(this.value),GLSR.toggleHiddenField(t[s],i)}catch(a){}},GLSR.onKeypressAssignedTo=function(t){13===t.keyCode&&(t.preventDefault(),t.target.blur())},GLSR.pointers=function(t){x(t.target).pointer({content:t.options.content,position:t.options.position,close:function(){x.post(ajaxurl,{pointer:t.id,action:"dismiss-wp-pointer"})}}).pointer("open").pointer("sendToTop"),x(document).on("wp-window-resized",function(){x(t.target).pointer("reposition")})},GLSR.postAjax=function(t,e,n){t.preventDefault();var s=x(t.target);if(!s.is(":disabled")){var i={action:site_reviews.action,request:e};s.prop("disabled",!0),x.post(site_reviews.ajaxurl,i,function(t){"function"==typeof n&&n(t),s.prop("disabled",!1)},"json")}},GLSR.textareaResize=function(t){var e=320,n=t[0];n.style.height="auto",n.style.height=n.scrollHeight>e?n.scrollHeight+"px":e+"px"},GLSR.toggleHiddenField=function(t,e){var n=x(t).closest(".glsr-field");n.length&&(e?n.removeClass("hidden"):n.addClass("hidden"))},GLSR.pinned.events=function(){var t=x("#pinned-status-select");x("a.cancel-pinned-status").on("click",function(e){e.preventDefault(),t.slideUp("fast").siblings("a.edit-pinned-status").show().focus(),t.find("select").val("0"===x("#hidden-pinned-status").val()?1:0)}),x("a.edit-pinned-status").on("click",function(e){e.preventDefault(),t.is(":hidden")&&(t.slideDown("fast",function(){t.find("select").focus()}),x(this).hide())}),x("a.save-pinned-status").on("click",function(e){e.preventDefault(),t.slideUp("fast").siblings("a.edit-pinned-status").show().focus(),GLSR.pinned.save(x(this))}),x("table").on("click","td.sticky i",GLSR.pinned.onToggle)},GLSR.pinned.onToggle=function(){var t=x(this),e={action:site_reviews.action,request:{action:"toggle-pinned",id:t[0].getAttribute("data-id")}};x.post(site_reviews.ajaxurl,e,function(e){e.pinned?t.addClass("pinned"):t.removeClass("pinned")})},GLSR.pinned.save=function(t){var e={action:site_reviews.action,request:{action:"toggle-pinned",id:x("#post_ID").val(),pinned:x("#pinned-status").val()}};x.post(site_reviews.ajaxurl,e,function(e){x("#pinned-status").val(0|!e.pinned),x("#hidden-pinned-status").val(0|e.pinned),x("#pinned-status-text").text(e.pinned?t.data("yes"):t.data("no")),GLSR.insertNotices(e.notices)})},GLSR.shortcode.close=function(t){var e=x(t=t||".glsr-mce-button");e.length&&e.removeClass("active").parent().find(".glsr-mce-menu").hide()},GLSR.shortcode.open=function(t){x(t).addClass("active").parent().find(".glsr-mce-menu").show()},GLSR.shortcode.toggle=function(t){t.preventDefault(),x(this).hasClass("active")?GLSR.shortcode.close(this):GLSR.shortcode.open(this)},GLSR.shortcode.trigger=function(t){t.preventDefault(),GLSR.shortcode.current=x(this).attr("data-shortcode"),GLSR.shortcode.current&&(tinymce.get(window.wpActiveEditor)?tinymce.execCommand("GLSR_Shortcode"):(x("#scTemp").length||(x("body").append('<textarea id="scTemp" style="display: none;" />'),tinymce.init({mode:"exact",elements:"scTemp",plugins:["glsr_shortcode","wplink"]})),setTimeout(function(){tinymce.execCommand("GLSR_Shortcode")},200)),setTimeout(function(){GLSR.shortcode.close()},100))},GLSR.shortcode.create=function(t){var e=tinymce.get(t);if(e){var n={action:site_reviews.action,request:{action:"mce-shortcode",shortcode:GLSR.shortcode.current}};x.post(site_reviews.ajaxurl,n,function(t){if(t.body){if(0===t.body.length)return window.send_to_editor("["+t.shortcode+"]"),void GLSR.shortcode.destroy();var n=[{text:t.ok,classes:"btn glsr-btn primary",onclick:function(){var t,n,s,i;i=e.windowManager.getWindows()[0],n=site_reviews.shortcodes[GLSR.shortcode.current],s=!0;for(var o in n)if(n.hasOwnProperty(o)&&(t=i.find("#"+o)[0],"undefined"!=typeof t&&""===t.state.data.value)){s=!1,alert(n[o]);break}s&&i.submit()}},{text:t.close,onclick:"close"}],s={title:t.title,body:t.body,classes:"glsr-mce-popup",minWidth:320,buttons:n,onsubmit:function(e){var n="",s=GLSR.shortcode.normalize(e.data);for(var i in s)s.hasOwnProperty(i)&&""!==s[i]&&(n+=" "+i+'="'+s[i]+'"');window.send_to_editor("["+t.shortcode+n+"]")},onclose:function(){GLSR.shortcode.destroy()}};t.ok.constructor===Array&&(s.buttons[0].text=t.ok[0],s.buttons[0].onclick="close",delete s.buttons[1]),e.windowManager.open(s)}})}},GLSR.shortcode.normalize=function(t){var e={site_reviews:["author","date","excerpt","rating","response","title"],site_reviews_form:["email","name","terms","title"],site_reviews_summary:["bars","rating","stars","summary"]},n=[];for(var s in t)if(t.hasOwnProperty(s)){if(e.hasOwnProperty(GLSR.shortcode.current)){var i="";0===s.lastIndexOf("hide_",0)&&(i=s.substring(5)),e[GLSR.shortcode.current].indexOf(i)>-1&&(t[s]&&n.push(i),delete t[s])}"count"!==s||x.isNumeric(t[s])||(t[s]=""),"id"===s&&(t[s]=(+new Date).toString(36))}return t.hide=n.join(","),t},GLSR.shortcode.destroy=function(){var t=x("#scTemp");t.length&&(tinymce.get("scTemp").remove(),t.remove())},GLSR.translation.abort=function(){"undefined"!=typeof GLSR.translation.searchRequest&&GLSR.translation.searchRequest.abort()},GLSR.translation.clearResults=function(){GLSR.translation.abort(),GLSR.translation._.resultsEl.empty(),x("body").removeClass("glsr-focus loading-content")},GLSR.translation.deleteEntry=function(t){var e=GLSR.translation._.entriesEl.children("tr").eq(t);e.find("td").css({backgroundColor:"#faafaa"}),e.fadeOut(350,function(){x(this).remove(),GLSR.translation._.results={},GLSR.translation.reindexRows(),GLSR.translation.setVisibility()})},GLSR.translation.displayResults=function(t){x("body").addClass("glsr-focus"),GLSR.translation._.resultsEl.append(t),GLSR.translation._.resultsEl.children("span").on("click",GLSR.translation.onResultClick)},GLSR.translation.init=function(){GLSR.translation._={entriesEl:x(".glsr-strings-table tbody"),exclude:[],noResults:"",results:{},resultsEl:x(".glsr-strings-results"),searchEl:x(".glsr-strings-search"),selected:-1,selectedClass:"glsr-selected-result"},GLSR.translation._.searchEl.length&&(GLSR.translation.makeSortable(),GLSR.translation._.searchEl.attr("aria-describedby","live-search-desc"),GLSR.translation._.searchEl.on("input",_.debounce(GLSR.translation.onSearchInput,500)),GLSR.translation._.searchEl.on("keyup",GLSR.translation.onSearchKeyup),GLSR.translation._.entriesEl.on("click","a.delete",GLSR.translation.onEntryDelete),x(document).on("click",GLSR.translation.onDocumentClick),x(document).on("keydown",GLSR.translation.onDocumentKeydown))},GLSR.translation.makeSortable=function(){GLSR.translation._.entriesEl.sortable({items:"tr",tolerance:"pointer",start:function(t,e){e.placeholder.height(e.helper[0].scrollHeight)},sort:function(t,e){var n=t.pageY-x(this).offsetParent().offset().top-e.helper.outerHeight(!0)/2;e.helper.css({top:n+"px"})}})},GLSR.translation.navigateResults=function(t){GLSR.translation._.selected+=t,GLSR.translation._.results.removeClass(GLSR.translation._.selectedClass),GLSR.translation._.selected<0&&(GLSR.translation._.selected=-1,GLSR.translation._.searchEl.focus()),GLSR.translation._.selected>=GLSR.translation._.results.length&&(GLSR.translation._.selected=GLSR.translation._.results.length-1),GLSR.translation._.selected>=0&&GLSR.translation._.results.eq(GLSR.translation._.selected).addClass(GLSR.translation._.selectedClass).focus()},GLSR.translation.onDocumentClick=function(t){var e=t.target.closest(".glsr-strings-searchbox");!e&&x("body").hasClass("glsr-focus")&&GLSR.translation.clearResults()},GLSR.translation.onDocumentKeydown=function(t){if(GLSR.translation._.results){if(GLSR.keys.ESC===t.which&&GLSR.translation.clearResults(),GLSR.keys.ENTER===t.which||GLSR.keys.SPACE===t.which){var e=GLSR.translation._.resultsEl.find("."+GLSR.translation._.selectedClass);e&&e.trigger("click")}GLSR.keys.UP===t.which&&(GLSR.translation.navigateResults(-1),t.preventDefault()),GLSR.keys.DOWN===t.which&&(GLSR.translation.navigateResults(1),t.preventDefault())}},GLSR.translation.onEntryDelete=function(t){t.preventDefault(),GLSR.translation.deleteEntry(x(this).closest("tr").index())},GLSR.translation.onResultClick=function(t){t.preventDefault();var e=x(this),n=e.data("entry"),s=wp.template("glsr-string-"+(n.p1?"plural":"single"));n.index=GLSR.translation._.entriesEl.children().length,n.prefix=GLSR.translation._.resultsEl.data("prefix"),s&&(GLSR.translation._.entriesEl.append(s(n)),GLSR.translation._.exclude.push({id:n.id}),GLSR.translation._.results=GLSR.translation._.results.filter(function(t,n){return n!==e.get(0)})),GLSR.translation.setVisibility(),GLSR.translation.clearResults()},GLSR.translation.onSearchInput=function(t){return GLSR.translation.abort(),GLSR.translation.searchTerm===t.target.value&&GLSR.translation._.results.length?GLSR.translation.displayResults(GLSR.translation._.results):(GLSR.translation._.resultsEl.empty(),GLSR.translation._.selected=-1,GLSR.translation.searchTerm=t.target.value,""===GLSR.translation.searchTerm?GLSR.translation.reset():(x("body").addClass("loading-content"),void(GLSR.translation.searchRequest=wp.ajax.post(site_reviews.action,{_nonce:site_reviews.ajaxnonce,request:{action:"search-translations",exclude:GLSR.translation._.exclude,search:t.target.value}}).done(function(t){x("body").removeClass("loading-content"),GLSR.translation.displayResults(t.items?t.items:t.empty),GLSR.translation._.results=GLSR.translation._.resultsEl.children(),delete GLSR.translation.searchRequest}))))},GLSR.translation.onSearchKeyup=function(t){GLSR.keys.ESC===t.which&&GLSR.translation.reset(),GLSR.keys.ENTER===t.which&&GLSR.translation.onSearchInput(t)},GLSR.translation.reset=function(){GLSR.translation.clearResults(),GLSR.translation._.results={},GLSR.translation._.searchEl.val("")},GLSR.translation.reindexRows=function(){GLSR.translation._.exclude=[],GLSR.translation._.entriesEl.children("tr").each(function(t){x(this).find(".glsr-string-td2").children().filter(":input").each(function(){var e=x(this),n=e.attr("name").replace(/\[\d+\]/i,"["+t+"]");e.attr("name",n),e.is("[data-id]")&&GLSR.translation._.exclude.push({id:e.val()})})})},GLSR.translation.setVisibility=function(){var t=GLSR.translation._.entriesEl.children().length>0?"remove":"add";GLSR.translation._.entriesEl.parent()[t+"Class"]("glsr-hidden")},x(function(){var t=GLSR.getURLParameter("fix"),e=x("#contentdiv > textarea");t&&x('td [data-key="'+t+'"]').focus(),e.length&&(GLSR.textareaResize(e),x(document).on("wp-window-resized.editor-expand",function(){GLSR.textareaResize(e)})),x("form").on("change",":input",GLSR.onFieldChange),x("form").on("click","#clear-log",GLSR.onClearLog),GLSR.colorControls(),GLSR.pinned.events(),x.each(site_reviews_pointers.pointers,function(t,e){GLSR.pointers(e)}),x(document).on("click",function(t){x(t.target).closest(".glsr-mce").length||GLSR.shortcode.close()}),x(document).on("change","input#assigned_to",GLSR.onChangeAssignedTo),x(document).on("keypress","input#assigned_to",GLSR.onKeypressAssignedTo),x(document).on("click",".glsr-mce-button",GLSR.shortcode.toggle),x(document).on("click",".glsr-mce-menu-item",GLSR.shortcode.trigger),x(document).on("click","a.change-site-review-status",GLSR.onChangeStatus),x(document).on("click",".branch-4 .toggle-row, .branch-4-1 .toggle-row, .branch-4-2 .toggle-row",function(){x(this).closest("tr").toggleClass("is-expanded")}),GLSR.translation.init()});