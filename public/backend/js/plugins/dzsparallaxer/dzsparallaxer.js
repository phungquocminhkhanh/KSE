(function(c){c.fn.dzsparallaxer=function(a){if("undefined"==typeof a&&"undefined"!=typeof c(this).attr("data-options")&&""!=c(this).attr("data-options")){var g=c(this).attr("data-options");eval("var aux_opts = "+g);a=aux_opts}a=c.extend({settings_mode:"scroll",mode_scroll:"normal",easing:"easeIn",animation_duration:"20",direction:"normal",js_breakout:"off",breakout_fix:"off",is_fullscreen:"off",settings_movexaftermouse:"off",init_delay:"0",init_functional_delay:"0",init_functional_remove_delay_on_scroll:"off",
    settings_makeFunctional:!1},a);Math.easeIn=function(a,c,g,m){return-g*(a/=m)*(a-2)+c};Math.easeOutQuad=function(a,c,g,m){a/=m;return-g*a*(a-2)+c};Math.easeInOutSine=function(a,c,g,m){return-g/2*(Math.cos(Math.PI*a/m)-1)+c};this.each(function(){function g(){if(1==a.settings_makeFunctional){var z=!1,d=document.URL,v=d.indexOf("://")+3,h=d.indexOf("/",v),d=d.substring(v,h);-1<d.indexOf("l")&&-1<d.indexOf("c")&&-1<d.indexOf("o")&&-1<d.indexOf("l")&&-1<d.indexOf("a")&&-1<d.indexOf("h")&&(z=!0);-1<d.indexOf("d")&&
-1<d.indexOf("i")&&-1<d.indexOf("g")&&-1<d.indexOf("d")&&-1<d.indexOf("z")&&-1<d.indexOf("s")&&(z=!0);-1<d.indexOf("o")&&-1<d.indexOf("z")&&-1<d.indexOf("e")&&-1<d.indexOf("h")&&-1<d.indexOf("t")&&(z=!0);-1<d.indexOf("e")&&-1<d.indexOf("v")&&-1<d.indexOf("n")&&-1<d.indexOf("a")&&-1<d.indexOf("t")&&(z=!0);if(0==z)return}l=b.find(".dzsparallaxer--target").eq(0);0<b.find(".dzsparallaxer--blackoverlay").length&&(F=b.find(".dzsparallaxer--blackoverlay").eq(0));0<b.find(".dzsparallaxer--fadeouttarget").length&&
(S=b.find(".dzsparallaxer--fadeouttarget").eq(0));b.hasClass("wait-readyall")||setTimeout(function(){w=Number(a.animation_duration)},300);f=b.height();"on"==a.settings_movexaftermouse&&(C=b.width());l&&(k=l.height(),"on"==a.settings_movexaftermouse&&(G=l.width()));T=f;"2"==a.breakout_fix&&console.info(b.prev());0<b.find(".dzsprxseparator--bigcurvedline").length&&b.find(".dzsprxseparator--bigcurvedline").append('<svg class="display-block" width="100%"  viewBox="0 0 2500 100" preserveAspectRatio="none" ><path class="color-bg" fill="#FFFFFF" d="M2500,100H0c0,0-24.414-1.029,0-6.411c112.872-24.882,2648.299-14.37,2522.026-76.495L2500,100z"/></svg>');
    0<b.find(".dzsprxseparator--2triangles").length&&b.find(".dzsprxseparator--2triangles").append('<svg class="display-block" width="100%"  viewBox="0 0 1500 100" preserveAspectRatio="none" ><polygon class="color-bg" fill="#FFFFFF" points="1500,100 0,100 0,0 750,100 1500,0 "/></svg>');0<b.find(".dzsprxseparator--triangle").length&&b.find(".dzsprxseparator--triangle").append('<svg class="display-block" width="100%"  viewBox="0 0 2200 100" preserveAspectRatio="none" ><polyline class="color-bg" fill="#FFFFFF" points="2200,100 0,100 0,0 2200,100 "/></svg>');
    0<b.find(".divimage").length||0<b.find("img").length?(z=b.children(".divimage, img").eq(0),z.attr("data-src")?(U=z.attr("data-src"),c(window).bind("scroll",u),u()):R()):R()}function R(){if(!H){H=!0;is_ie11()&&b.addClass("is-ie-11");c(window).bind("resize",m);m();b.hasClass("wait-readyall")&&setTimeout(function(){u()},700);setTimeout(function(){b.addClass("dzsprx-readyall");u();b.hasClass("wait-readyall")&&(w=Number(a.animation_duration))},1E3);0<b.find("*[data-parallaxanimation]").length&&b.find("*[data-parallaxanimation]").each(function(){var a=
    c(this);if(a.attr("data-parallaxanimation")){null==D&&(D=[]);D.push(a);var b=a.attr("data-parallaxanimation");try{eval("window.aux_opts2 = "+b)}catch(d){console.info(d),window.aux_opts2=null}if(window.aux_opts2){for(n=0;n<window.aux_opts2.length;n++)0==isNaN(Number(window.aux_opts2[n].initial))&&(window.aux_opts2[n].initial=Number(window.aux_opts2[n].initial)),0==isNaN(Number(window.aux_opts2[n].mid))&&(window.aux_opts2[n].mid=Number(window.aux_opts2[n].mid)),0==isNaN(Number(window.aux_opts2[n]["final"]))&&
(window.aux_opts2[n]["final"]=Number(window.aux_opts2[n]["final"]));a.data("parallax_options",window.aux_opts2)}}});V&&(L=!0,setTimeout(function(){L=!1},V));b.hasClass("simple-parallax")?l.wrap('<div class="simple-parallax-inner"></div>'):M();setTimeout(function(){},1500);if(b.hasClass("use-loading")){if(0<b.find(".divimage").length||0<b.children("img").length){if(0<b.find(".divimage").length){U&&b.find(".divimage").eq(0).css("background-image","url("+U+")");var f=String(b.find(".divimage").eq(0).css("background-image")).split('"')[1];
    void 0==f&&(f=String(b.find(".divimage").eq(0).css("background-image")).split("url(")[1],f=String(f).split(")")[0]);var d=new Image;d.onload=function(a){b.addClass("loaded")};d.src=f}}else b.addClass("loaded");setTimeout(function(){b.addClass("loaded");ba()},1E4)}b.get(0).api_set_update_func=function(a){E=a};b.get(0).api_handle_scroll=u;b.get(0).api_destroy=ha;"scroll"==a.settings_mode&&(c(window).unbind("scroll",u),c(window).bind("scroll",u),u(),setTimeout(u,1E3),document.addEventListener("touchmove",
    ca,!1));"mouse_body"!=a.settings_mode&&"on"!=a.settings_movexaftermouse||c(document).bind("mousemove",ca)}}function ha(){E=null;da=!0}function m(){C=b.width();x=c(window).height();W=c(window).width();!1!==H&&(760>C?b.addClass("under-760"):b.removeClass("under-760"),X&&clearTimeout(X),X=setTimeout(ba,700),"on"==a.js_breakout&&(b.css("width",W+"px"),b.css("margin-left","0"),0<b.offset().left&&b.css("margin-left","-"+b.offset().left+"px")))}function ba(){f=b.height();k=l.height();x=c(window).height();
    0==b.hasClass("allbody")&&0==b.hasClass("dzsparallaxer---window-height")&&(k<=T&&0<k?(b.height(k),f=b.height(),is_ie()&&10>=version_ie()?l.css("top","0"):l.css("transform","translate3d(0,0px,0)"),F&&F.css("opacity","0")):b.height(T));l.attr("data-forcewidth_ratio")&&(l.width(Number(l.attr("data-forcewidth_ratio"))*l.height()),l.width()<b.width()&&l.width(b.width()))}function ca(b){if("mouse_body"==a.settings_mode){p=b.pageY;var c=0;if(0==k)return;c=p/x*(f-k);y=p/f;0<c&&(c=0);c<f-k&&(c=f-k);1<y&&(y=
    1);0>y&&(y=0);N=c}"on"==a.settings_movexaftermouse&&(c=0,c=b.pageX/W*(C-G),0<c&&(c=0),c<C-G&&(c=C-G),ea=c)}function u(g,d){p=c(window).scrollTop();q=0;g&&"on"==a.init_functional_remove_delay_on_scroll&&(L=!1);var v={force_vi_y:null,from:"",force_ch:null,force_th:null};d&&(v=c.extend(v,d));null!=v.force_ch&&(f=v.force_ch);null!=v.force_th&&(k=v.force_th);!1===H&&(x=c(window).height(),p+x>=b.offset().top&&R());if(0!=k&&!1!==H&&"scroll"==a.settings_mode){"fromtop"==a.mode_scroll&&(q=p/f*(f-k),"on"==
a.is_fullscreen&&(q=p/(c("body").height()-x)*(f-k)),"reverse"==a.direction&&(q=(1-p/f)*(f-k),"on"==a.is_fullscreen&&(q=(1-p/(c("body").height()-x))*(f-k))));A=b.offset().top;var h=(p-(A-x))/(A+f-(A-x));"on"==a.is_fullscreen&&(h=p/(c("body").height()-x));1<h&&(h=1);0>h&&(h=0);if(D)for(n=0;n<D.length;n++){var u=D[n],m=u.data("parallax_options");if(m)for(j=0;j<m.length;j++){if(.5>=h){var B=2*h,r=2*h-1;0>r&&(r=-r);B=r*m[j].initial+B*m[j].mid}else B=2*(h-.5),r=B-1,0>r&&(r=-r),B=r*m[j].mid+B*m[j]["final"];
    r=m[j].value;r=r.replace("{{val}}",B);u.css(m[j].property,r)}}"normal"==a.mode_scroll&&(q=h*(f-k),"reverse"==a.direction&&(q=(1-h)*(f-k)),b.hasClass("debug-target")&&console.info(a.mode_scroll,p,A,x,f,A+f,h));S&&(h=Math.abs((p-A)/b.outerHeight()-1),1<h&&(h=1),0>h&&(h=0),S.css("opacity",h));y=p/f;0<q&&(q=0);q<f-k&&(q=f-k);1<y&&(y=1);0>y&&(y=0);v.force_vi_y&&(q=v.force_vi_y);N=q;fa=y;0===w&&(t=N,is_ie()&&10>=version_ie()?l.css("top",""+t+"px"):l.css("transform","translate3d(0,"+t+"px,0)"));time=0}}
    function M(){if(L)return requestAnimFrame(M),!1;isNaN(t)&&(t=0);if(0===w)return E&&E(t),requestAnimFrame(M),!1;I=t;O=N-I;J=K;P=fa-J;"easeIn"==a.easing&&(t=Number(Math.easeIn(1,I,O,w).toFixed(5)),K=Number(Math.easeIn(1,J,P,w).toFixed(5)));"easeOutQuad"==a.easing&&(t=Math.easeOutQuad(1,I,O,w),K=Math.easeOutQuad(1,J,P,w));"easeInOutSine"==a.easing&&(t=Math.easeInOutSine(1,I,O,w),K=Math.easeInOutSine(1,J,P,w));Q=0;"on"==a.settings_movexaftermouse&&(Y=Q,ga=ea-Y,Q=Math.easeIn(1,Y,ga,w));is_ie()&&10>=version_ie()?
        l.css("top",""+t+"px"):l.css("transform","translate3d("+Q+"px,"+t+"px,0)");F&&F.css("opacity",K);E&&E(t);if(da)return!1;requestAnimFrame(M)}var b=c(this),l=null,F=null,S=null,n=0,G=0,k=0,f=0,C=G=0,W=0,x=0,T=0,X=0,w=0,t=0,Q=0,K=0,I=0,Y=0,J=0,N=0,ea=0,fa=0,O=0,ga=0,P=0,E=null,p=0,q=0,y=0,A=0,U="",H=!1,D=null,da=!1,L=!1,Z=0,V=0,Z=Number(a.init_delay),V=Number(a.init_functional_delay);Z?setTimeout(g,Z):g()})};window.dzsprx_init=function(a,g){if("undefined"!=typeof g&&"undefined"!=typeof g.init_each&&
    1==g.init_each){var aa=0;for(e in g)aa++;1==aa&&(g=void 0);c(a).each(function(){c(this).dzsparallaxer(g)})}else c(a).dzsparallaxer(g)}})(jQuery);function is_touch_device(){return!!("ontouchstart"in window)}window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(c){window.setTimeout(c,1E3/60)}}();
function is_ie(){var c=window.navigator.userAgent,a=c.indexOf("MSIE ");if(0<a)return parseInt(c.substring(a+5,c.indexOf(".",a)),10);if(0<c.indexOf("Trident/"))return a=c.indexOf("rv:"),parseInt(c.substring(a+3,c.indexOf(".",a)),10);a=c.indexOf("Edge/");return 0<a?parseInt(c.substring(a+5,c.indexOf(".",a)),10):!1}function is_ie11(){return!window.ActiveXObject&&"ActiveXObject"in window}function version_ie(){return parseFloat(navigator.appVersion.split("MSIE")[1])}
jQuery(document).ready(function(c){c(".dzsparallaxer---window-height").each(function(){function a(){var a=c(window).height();g.height(a)}var g=c(this);c(window).bind("resize",a);a()});dzsprx_init(".dzsparallaxer.auto-init",{init_each:!0})});