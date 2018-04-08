$(function () {

  'use strict';
    var m1 = $(window).height(),
        m2 = $(window).width();

  /* jVector Maps
   * ------------
   * Create a world map with markers
   */
    if ( m1>500 ) {
        $('#world-map-markers').css({
        "height":m1-120,
        });
    };
    

    if ( m2 >767 ) {
        $('.treeview ').mouseover(function(){
            $('.skin-blue .main-header .navbar a.big-sidebar-toggle').css({
                'visibility':'hidden'
            });
        });
        $('.treeview ').mouseout(function(){
            $('.skin-blue .main-header .navbar a.big-sidebar-toggle').css({
                'visibility':'visible'
            });
        });
    };
    
    

});
function carM(){
        $(".home-car-state").addClass("hide");
        $(".car-messageBox").removeClass("hide");
    };