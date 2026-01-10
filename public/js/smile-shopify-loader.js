var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
(function() {
  function asyncLoad() {
  // Begin and End comments are used by script to replace identifier
  var smileUIUrl = /* begin */ 'js.smile.io' /* end */
  var smileShopifyJsUrl = 'https:\/\/'+smileUIUrl+'\/v1\/smile-shopify.js'
  var urls = [smileShopifyJsUrl+"?shop="+Shopify.shop];
  for (var i = 0; i < urls.length; i++) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = urls[i];
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
    }
  };
  if(window.attachEvent) {
    window.attachEvent('onload', asyncLoad);
  } else {
    window.addEventListener('load', asyncLoad, false);
  }
  // for stores that might migrate, without uninstalling smile. Having the init code duplicated does not throws any error, this is here just for cleanliness
  var smileShopifyInitElement = document.getElementsByClassName('smile-shopify-init');
  if(smileShopifyInitElement.length == 2){ 
  smileShopifyInitElement[0].parentNode.removeChild( smileShopifyInitElement[0] );
  }
})();

}
/*
     FILE ARCHIVED ON 10:24:17 Jun 05, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:49:04 Jan 08, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.883
  exclusion.robots: 0.097
  exclusion.robots.policy: 0.086
  esindex: 0.012
  cdx.remote: 61.037
  LoadShardBlock: 359.443 (6)
  PetaboxLoader3.datanode: 363.653 (7)
  load_resource: 126.654
  PetaboxLoader3.resolve: 102.128
*/