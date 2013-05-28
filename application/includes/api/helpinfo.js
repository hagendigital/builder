

$(window).bind("resize load", function(e){
  if(e.type=='resize' && mw.$(".mwcurrhelp").length === 0) { return false; }
    mw.helpinfo.init();
});


mw.mouse = {
  create:function(){
    if(typeof mw.mouse.m === 'undefined'){
      mw.mouse.m = mwd.createElement('div');
      mw.mouse.m.className = 'mw-mouse mw-mouseclick';
      mw.mouse.m.id = 'mw-mouse';
      mwd.body.appendChild(mw.mouse.m);
      setTimeout(function(){
         mw.mouse.m.className = 'mw-mouse';
      }, 222);
    }
    return mw.mouse.m;
  },
  goto:function(el, callback){
    mw.mouse.create();
    var off = $(el).offset();
    $(mw.mouse.m).css({
      left:'50%',
      top:'50%',
      display:'block'
    })
    .animate({top:off.top - 5, left:off.left - 5}, 1500, function(){
       if( typeof callback === 'function'){
         callback.call(el)
       }
       else{
          $(mw.mouse.m).css({
            left:'50%',
            top:'50%',
            display:'none'
          });
       }
    });
  },
  click:function(el, callback){
       $(el).click();
       $(mw.mouse.m).addClass("mw-mouseclick");
       setTimeout(function(){
         $(mw.mouse.m).removeClass("mw-mouseclick");
         if(typeof callback === 'function'){
           callback.call(el);
         }
         else{
           $(mw.mouse.m).fadeOut();
         }
       }, 200);
  },
  gotoAndClick:function(el){
    mw.mouse.goto(el, function(){
      mw.mouse.click(el);
    })
  }
}


mw.helpinfo = {
    helper : function(){
      if( typeof mw.helpinfo_helper === 'undefined'){
        mw.helpinfo_helper = mwd.createElement('div');
        mw.helpinfo_helper.className = 'helpinfo_helper semi_hidden';
        mw.helpinfo_helper.id = 'helpinfo_helper';
        var footer = ''
            + '<div id="mw_info_helper_footer">'
              + '<span class="mw-ui-btn  left" onclick="mw.helpinfo.hide();">Hide</span>'
              + '<span class="mw-ui-btn mw-ui-btn-green right" id="mw_helpinfo_next_btn" onclick="mw.helpinfo.next();">Next</span>'
              + '<span class="mw-ui-btn mw-ui-btn-blue right" id="mw_helpinfo_prev_btn" onclick="mw.helpinfo.previous();">Previous</span>'
            + '</div>';
        mw.helpinfo_helper.innerHTML = '<span id="helpinfo_arr"></span><div id="mw_info_helper_content"></div>' + footer;
        mwd.body.appendChild( mw.helpinfo_helper );
        mw.helpinfo_container = mwd.getElementById('mw_info_helper_content');
        mw.helpinfo_overlay = mwd.createElement('div');
        mw.helpinfo_overlay.className = 'mw_helpinfo_overlay';
        mwd.body.appendChild(mw.helpinfo_overlay);
      }
    },
    position:function(el, pos){
       var pos = pos || 'bottomleft';

       var off = $(el).offset();
       var w = $(el).outerWidth();
       var h = $(el).outerHeight();

       var tipheight = $(mw.helpinfo_helper).height();
       var tipwidth = $(mw.helpinfo_helper).width();

       if(pos == 'bottomleft'){
         $(mw.helpinfo_helper).css({
             top:off.top + h + 17,
             left:off.left
         });
          mw.helpinfo_helper.className = 'helpinfo_helper bottomleft';
       }
       if(pos == 'bottomcenter'){
         $(mw.helpinfo_helper).css({
             top:off.top + h + 17,
             left:off.left - tipwidth/2 + w/2
         });
          mw.helpinfo_helper.className = 'helpinfo_helper bottomcenter';
       }
       else if(pos=='bottomright'){
          $(mw.helpinfo_helper).css({
             top:off.top + h + 17,
             left:off.left - tipwidth + w
         });
          mw.helpinfo_helper.className = 'helpinfo_helper bottomright';
       }
       else if(pos=='topright'){
          $(mw.helpinfo_helper).css({
             top:off.top - tipheight - 17,
             left:off.left - tipwidth + w
         });
         mw.helpinfo_helper.className = 'helpinfo_helper topright';
       }
       else if(pos=='topleft'){
          $(mw.helpinfo_helper).css({
             top:off.top - tipheight - 17,
             left:off.left
         });
         mw.helpinfo_helper.className = 'helpinfo_helper topleft';
       }
       else if(pos=='topcenter'){
          $(mw.helpinfo_helper).css({
             top:off.top - tipheight - 17,
             left:off.left - tipwidth/2 + w/2
         });
         mw.helpinfo_helper.className = 'helpinfo_helper topcenter';
       }
       else if(pos=='lefttop'){
         $(mw.helpinfo_helper).css({
             top:off.top,
             left:off.left - tipwidth -17
         });
         mw.helpinfo_helper.className = 'helpinfo_helper lefttop';
       }
       else if(pos == 'leftcenter'){
         $(mw.helpinfo_helper).css({
             top:off.top -  tipheight/2 + h/2,
             left:off.left - tipwidth - 17
         });
         mw.helpinfo_helper.className = 'helpinfo_helper leftcenter';
       }
       else if(pos=='righttop'){
         $(mw.helpinfo_helper).css({
             top:off.top,
             left:off.left + w + 17
         });
         mw.helpinfo_helper.className = 'helpinfo_helper righttop';
       }
       else if(pos == 'rightcenter'){
         $(mw.helpinfo_helper).css({
             top:off.top -  tipheight/2 + h/2,
             left:off.left + w + 17
         });
         mw.helpinfo_helper.className = 'helpinfo_helper rightcenter';
       }
    },
    autoscroll:function(el){
      var off = $(el).offset();
      var elh = $(el).outerHeight();
      var h = $(window).height();
      var scr = $(window).scrollTop();
      var tipo = $(mw.helpinfo_helper).offset();
      var scr = $(window).scrollTop();
      var speed = 150;
      if(tipo.top < off.top){
        mw.$([mwd.documentElement, mwd.body]).stop().animate({scrollTop:tipo.top - 10 }, speed);
      }
      else if(tipo.top > off.top){
         mw.$([mwd.documentElement, mwd.body]).stop().animate({scrollTop:$(el).offset().top }, speed);
      }
    },
    init:function(){
       if( typeof mw.helpinfo_helper === 'undefined'){
         mw.helpinfo.helper();
         mw.helpinfo.active =  $(mwd.getElementsByClassName('mw-help-item')[0]);
       }
       mw.$(".mwcurrhelp").removeClass("mwcurrhelp");
       $(mw.helpinfo_overlay).show();
       $(mw.helpinfo.active).addClass("active");
       var who = $($(mw.helpinfo.active).dataset("for"));
       mw.$(who).addClass("mwcurrhelp");

       $(mw.helpinfo_helper).removeClass('semi_hidden');
       $(mw.helpinfo_container).html($(mw.helpinfo.active).html());
       if($(mw.helpinfo.active).dataset("onbeforeshow") != ''){
          var func = mw.helpinfo.parseCallback($(mw.helpinfo.active).dataset("onbeforeshow"));
          if(typeof mw.helpinfo.functions[func.name] === 'function'){
               mw.helpinfo.functions[func.name](func.params);
          }
        }
       mw.helpinfo.position(who, $(mw.helpinfo.active).dataset("pos"));
       mw.helpinfo.autoscroll(who);
       if(mw.helpinfo.active.dataset("onshow") != ''){
          var func = mw.helpinfo.parseCallback($(mw.helpinfo.active).dataset("onshow"));
          if(typeof mw.helpinfo.functions[func.name] === 'function'){
               mw.helpinfo.functions[func.name](func.params);
          }
        }
    },
    next:function(){
        $(mw.helpinfo.active).removeClass("active");
        mw.helpinfo.active = $(mw.helpinfo.active).next().length > 0 ? $(mw.helpinfo.active).next() : mw.$(".mw-help-item").eq(0);
        mw.helpinfo.init();
    },
    previous:function(){
        $(mw.helpinfo.active).removeClass("active");
        mw.helpinfo.active = $(mw.helpinfo.active).prev().length > 0 ? $(mw.helpinfo.active).prev() : mw.$(".mw-help-item:last");
        mw.helpinfo.init();
    },
    hide:function(){
       mw.$(".mwcurrhelp").removeClass("mwcurrhelp");
       $(mw.helpinfo_helper).css({left:-9999});
       $(mw.helpinfo_overlay).hide();
    },
    parseCallback:function(str){
        var arr = str.split('(');
        var name = arr[0];
        var params = arr[1].replace(/\)/g, '').replace(/\'/g, '').replace(/\"/g, '').replace(/;/g, '');
        return {
          name : name,
          params : params
        }
    },
    functions:{
      gotonextpage:function(url){
        mw.$("#mw_helpinfo_next_btn").bind("mouseup", function(e){
          if($(".mw-help-item:last").hasClass("active")){
            $(this).removeAttr("onclick");
            window.location.href = url;
            return false;
          }
        });
      }
    }
  }