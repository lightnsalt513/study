(function (win, $, doc) {
    'use strict';  // var 없이 선언되는 경우 전역변수가 됨 기존 전역변수를 덮어쓰는 변수 선언을 방지
    win.smg = win.smg || {}; // window 객체에 smg 속성이 없는 경우 새로운 객체 속성으로 선언 (이하 구문 동일 방식)
    win.smg.support = win.smg.support || {}; /
    win.smg.support.common = win.smg.support.common || {}; 

    var CST_EVENT = win.smg.support.common.customEvent, // 변수 저장
        UTIL = win.smg.support.common.util,
        BREAKPOINTS = win.smg.support.common.breakpoints,
        PAGE = win.smg.support.page,
        pluginName = 'manualDownloadFilterNew',
        filterpluginName = 'productManualDownloadNewPlugin',
        personaPluginName = 'manualPersonaPlugin';

    win.smg.support[pluginName] = function (container, args) {
    // filter plugin과 persona plugin을 호출하여 win.smg.support 내 pluginName 객체를 만드는 생성자 함수; container와 args 매개변수를 받음
        var defParams = {
            obj : container,
            filterModule : '.manual-download-filter-new__module',
            personaAnchor : '.manual-download-filter-new__persona-box',
            ManualDownloadPlugins : [],
            personaAnchorPlugins : [],
            loadAfter : null
        }
        this.opts = UTIL.def(defParams, (args || {})); // defParams의 변수를 this.opts에 저장;
                                                       // args에 해당하는 인수가 선언된 경우는 해당 값을 defParams에 merge시키고, 없는 경우 새로운 객체를 merge
        if (!(this.obj = $(this.opts.obj)).length) return; // container에 해당하는 인수값이 선언되지 않은 경우 아래 init 구문이 호출되지 않음
        this.init(); // 아래 프로토타입으로 선언되는 init 함수를 호출
    }; 
    win.smg.support[pluginName].prototype = { // 프로토타입 선언
        init : function () { // init 매써드 호출 시 아래 함수 호출
            this.setElements();
            this.manualDownloadPluginCall();
        },
        setElements : function () {
            this.filterModule = this.obj.find(this.opts.filterModule);
            this.personaAnchor = this.obj.find(this.opts.personaAnchor);
        },
        manualDownloadPluginCall : function () {
            var _this = this; // 이 매서드가 바라보는 객체(즉, win.smg.support.pluginName)를 가르키는 this를 별도 변수에 저장
            for (var i = 0, max = this.filterModule.length; i < max; i++) { // filterModule 요소의 개수만큼 for loop를 돌려 아래 즉시실행 함수를 호출
                (function (index) {
                    var target = _this.filterModule.eq(index); 
                    _this.opts.ManualDownloadPlugins.push(new win.smg.support[filterpluginName](target, {
                        loadAfter : $.proxy(_this.loadAfterFunc, _this)
                    })); // ManualDownloadPlugin 배열에 filterModule 요소 개수 만큼 filter plugin을 생성하고 해당 요소를 container 인수값으로 받음
                         // 해당 플러그인의 매써드인 loadAfterFunc를 호출할 수 있도록 proxy구문을 활용하여 loadAfter에 저장 
                })(i);
            }
            for (var i = 0, max = this.personaAnchor.length; i < max; i++) { // personaAnchor 요소의 개수만큼 for loop를 돌려 아래 즉시실행 함수를 호출
                (function (index) {
                    var target = _this.personaAnchor.eq(index);
                    _this.opts.personaAnchorPlugins.push(new win.smg.support[personaPluginName](target));
                })(i); // 위의 for loop 와 유사 구문 (단, args에 해당하는 인수값 없음)
            }
        },
        loadAfterFunc : function () {
            // loadAfter는 win.smg.support.manualDownloadFilterNewCall 의 globalObjsCall 매써드를 호출하게 됨
            this.outCallback('loadAfter');  
        },
        outCallback : function (ing) {
            var callbackObj = this.opts[ing];
            if (callbackObj == null) return; // loadAfter 값이 null인 경우 해당 매써드 실행하지 않음
            callbackObj(); // loadAfter 매써드가 있는 경우 실행
        },
        reInit : function () { // 아래 구문을 실행하는 reInit 매써드 (의문 : 하지만 이 매써드를 불러들이는 호출함수는 보이지 않음)
            var _this = this;
            for (var i = 0, max = this.opts.ManualDownloadPlugins.length; i < max; i++) {
            // filter plugin 개수 만큼 for loop를 돌리고 해당 객체의 reinit 매써드 호출
                (function (index) {
                    var target = _this.opts.ManualDownloadPlugins[i];
                    target.reInit();
                })(i);
            }
        }
    };

    //filter plugin
    win.smg.support[filterpluginName] = function (container, args) {
    // win.smg.support 내에 filterpluginName 객체를 생성할 생성자 함수; container와 args 매개변수를 받음
        var defParams = {
            obj : container,
            anchorObj : '.support-anchor-navi',
            filterObj : '.manual-download-filter-new',
            filterArea : '.manual-download-filter-new__filters',
            filterWrap : '.manual-download-filter-new__list',
            filterLayerArea : '.manual-download-filter-new__list-group',
            filterListWrap : '.manual-download-filter-new__list-items',
            filterToggler : '.manual-download-filter-new__list-title',
            filterMoToggler : '.support-filter-btn',
            filterActiveClass : 'filter-active',
            filterFixedClass : 'is-fixed',
            filterToggleClass : 'is-opened',
            filterToggleSpeed : 100,
            filterViewType : false,
            accessText : '.blind',
            accessData : {
                accessAria : 'aria-expanded',
                dataActive : 'accessbility-Active'
            },
            listWrap : '.manual-download-filter-new__content-list',
            listParent : 'ul',
            listBtnArea : '.manual-download-filter-new__content-cta',
            listToggleBtn : '.s-btn-text',
            listViewClass : 'is-show',
            icoDownClass : 's-ico-down',
            icoUpClass : 's-ico-up',
            duration : 500,
            scrollLock : true,
            scrollLockClass : 'hive-scroll-lock',
            scrollLockOpts : {
                scrollLocked : false,
                lockElements : 'html',
                appliedLock : {},
                prevStyles : {},
                prevScroll : {},
                lockStyles : {
                    'overflow-y' : 'scroll',
                    'position' : 'fixed',
                    'width' : '100%'
                }
            },
            focusOutObj : {
                CLASS : 'hive-layer-focusout',
                CSS : {
                    'overflow' : 'hidden',
                    'position' : 'fixed',
                    'left' : 0,
                    'top' : 0,
                    'z-index' : -1,
                    'width' : 1,
                    'height' : 1,
                    'font-size' : '1px',
                    'line-height' : 0
                }
            },
            customEvent : '.' + pluginName + (new Date()).getTime(), // 1970년 1월 1일 이후 현재 시간을 milliseconds로 반환된 숫자와 pluginName을 합친 변수
            viewType : null,
            loadAfter : null
        };
        this.opts = UTIL.def(defParams, (args || {}));
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };
    win.smg.support[filterpluginName].prototype = {
        init : function () {
            this.setElements();
            this.initOpts();
            this.initLayout();
            this.setLayout();
            this.bindEvents();
        },
        setElements : function () {
            this.anchorObj = $(this.opts.anchorObj);
            this.filterObj = $(this.opts.filterObj);
            this.filterArea = this.obj.find(this.opts.filterArea);
            this.filterWrap = this.filterArea.find(this.opts.filterWrap);
            this.filterLayerArea = this.filterArea.find(this.opts.filterLayerArea);
            this.filterListWrap = this.filterWrap.find(this.opts.filterListWrap);
            this.filterToggler = this.filterWrap.find(this.opts.filterToggler);
            this.filterMoToggler = this.filterArea.find(this.opts.filterMoToggler);
            this.listWrap = this.obj.find(this.opts.listWrap);
            this.listParent = this.listWrap.find(this.opts.listParent);
            this.listChild = this.listParent.children();
            this.listBtnArea = this.listWrap.find(this.opts.listBtnArea);
            this.listToggleBtn = this.listBtnArea.find(this.opts.listToggleBtn);
            this.accessText = this.filterWrap.find(this.opts.accessText);
        },
        initOpts : function () { // 초기 옵션값 설정하는 매써드
            var globalText = this.filterObj.data('global-text');
            this.globalText = {
                // globalText 값이 유효하고 Collapse 속성이 있는 경우 해당 속성값을 양쪽끝 공백 제거 후 반환하고, false 인경우 '' 반환 (이하 구문 동일 로직) 
                Collapse : (globalText && globalText.Collapse) ? $.trim(globalText.Collapse) : '',
                Expand : (globalText && globalText.Expand) ? $.trim(globalText.Expand) : '',
                showMore : (globalText && globalText.showMore) ? $.trim(globalText.showMore) : '',
                showLess : (globalText && globalText.showLess) ? $.trim(globalText.showLess) : ''
            };
            this.listViewNum = this.listWrap.data('view-list'); // content list 노출되어야 하는 수 저장
            this.listNum = this.listChild.length; // 실제 content list 개수 저장
        },
        initLayout : function () { // 초기 레이아웃 값을 설정하는 매써드
            this.filterToggleType = true;
            this.listChild.removeClass(this.opts.listViewClass); // 초기에  content list에 붙은 is-show 클래스 다 제거
            this.initFilterArea(); 
            this.initListView();
        },
        initFilterArea : function () {
            var stickyWrapClass = this.filterArea.attr('class'),
                jsStickyWrapClass = 'js-' + stickyWrapClass;
            this.filterArea.wrap('<div class="' + jsStickyWrapClass + '"/>'); // filterArea를 jsStickyWrapClass 클래스명의 div 요소로 랩핑
            this.filterObjWrap = this.filterArea.parent(); // 새로 생성된 div 요소를 filterObjWrap로 저장
            // 모바일 스티키가 펼쳐진 상태에서는 focus가 안에서 계속 돌 수 있도록 filterArea 바로 위 형제요소와
            // 바로 아래 형제요소로 빈 span 태그 생성하여 focusOutClass 지정
            var focusOutClass = this.opts.focusOutObj.CLASS, 
                focusOutElements = '<span class="' + focusOutClass + '">""</span>';
            if (!this.filterArea.prev().hasClass(focusOutClass)) {
                this.filterArea.before(focusOutElements);
            }
            if (!this.filterArea.next().hasClass(focusOutClass)) {
                this.filterArea.after(focusOutElements);
            }
            this.prevFocusOutObj = this.filterArea.prev();
            this.nextFocusOutObj = this.filterArea.next();
            this.focusOutObj = this.filterArea.prev().add(this.filterArea.next()); // focusOutObj 에 filterArea 바로 위 형제, 바로 아래 형제요소를 저장
            this.focusOutObj.css(this.opts.focusOutObj.CSS); // focusOutObj에 기 저장된 css값 부여
        },
        moFocusInitLayout : function (type) {
            if (type) { // 값 true일 시 모바일에서는 스티키가 붙음으로 기존 생성된 빈 focusOutObj 요소들에 focus가 가도록 tabIndex 값 0 으로 변경
                this.focusOutObj.attr('tabIndex', 0);
            } else {
                this.focusOutObj.attr('tabIndex', -1);
            }
        },
        changeEvents : function (event) {
            // 이벤트 네임스페이스 개념을 적용하여 바인딩된 이벤트 해제가 필요할 경우 해당 시점에 발생한 이벤트만
            // 해제 되도록 events 배열에 저장해서 이벤트 바인딩 시 사용
            var events = [],
                eventNames = event.split(' ');
            for (var key in eventNames) {
                events.push(eventNames[key] + this.opts.customEvent);
            }
            return events.join(' ');
        },
        bindEvents : function () { // 이벤트 바인딩 매써드
            $(win).on(this.changeEvents('resize orientationchange'), $.proxy(this.resizeFunc, this));
            this.filterToggler.on(this.changeEvents('click'), $.proxy(this.filterToggleFunc, this));
            this.listToggleBtn.on(this.changeEvents('click'), $.proxy(this.listToggleFunc, this));
            this.listWrap.on(this.changeEvents('ajaxafter'), $.proxy(this.listAjaxAfter, this)); // 
        },
        bindResponsiveEvents : function (type) {
            if (type) { // PC 구간인 경우 아래 구문 실행 (window의 scroll, filterMoToggler의 click 이벤트 바인딩 해제)
                $(win).off(this.changeEvents('scroll'));
                this.filterMoToggler.off(this.changeEvents('click'));
            } else { // PC 구간이 아닌 경우 아래 구문 실행 (바인딩 이벤트)
                $(win).on(this.changeEvents('scroll'), $.proxy(this.scrollFunc, this)); // filter offset값, 위치 등 계산하는 함수 바인딩
                this.filterMoToggler.on(this.changeEvents('click'), $.proxy(this.filterMoClickFunc, this)); // filter 버튼 클릭 시 open/close 하는 기능의 함수 바인딩
            }
        },
        moFocusBindEvents : function (type) {
            if (type) { // 모바일 구간 에서는 sticky 형재 효소로 생성된 빈 태그에 아래 함수 각각 바인딩 처리
                this.prevFocusOutObj.on(this.changeEvents('focusin'), $.proxy(this.onPrevOut, this)); // focus가 filterArea 안에서 돌게 함
                this.nextFocusOutObj.on(this.changeEvents('focusin'), $.proxy(this.onNextOut, this)); // focus가 filterArea 안에서 돌게 함
            } else { // PC 구간 바인딩 해제
                this.prevFocusOutObj.off(this.changeEvents('focusin'));
                this.nextFocusOutObj.off(this.changeEvents('focusin'));
            }
        },
        onPrevOut : function () { // filterArea 내의 visible한 아래 요소들 (a, input, ...) 중 마지막 요소에 focus 이동 
            this.filterArea.find('a, input, button, select').filter(':visible').last().focus();
        },
        onNextOut : function () { // filterArea 내의 visible한 아래 요소들 (a, input, ...) 중 첫번째 요소에 focus 이동
            this.filterArea.find('a, input, button, select').filter(':visible').first().focus();
        },
        resizeFunc : function () {
            this.winWidth = UTIL.winSize().w;
            if (this.opts.resizeStart == null) { // this.opts.resizeStart 값이 null인 경우 아래 구문 실행
                this.opts.resizeStart = this.winWidth; // 현재 윈도우 너비를 resizeStart 값으로 저장
                this.resizeAnimateFunc(); // 해당 매써드 호출
            }

            // 윈도우 resizing이 150 milliseconds 멈췄을 경우 resizeEndFunc 매써드 호출
            win.clearTimeout(this.resizeEndTime);
            this.resizeEndTime = win.setTimeout($.proxy(this.resizeEndFunc, this), 150);
        },
        resizeEndFunc : function () {
            this.opts.resizeStart = null; // resize가 끝난 시점에 resizeStart 값 다시 null로 설정해서 초기화
            this.setLayout(); // PC/MO 구간인지 체크 해서 viewType 지정 및 바인딩 또는 바인딩 해제 매써드 호출 
            if (UTIL.winSize().w <= BREAKPOINTS.MOBILE) { // 모바일 구간에서만 아래 함수 실행
                this.createHeightFunc(); // filter 영역 높이값 및 위치 잡는 함수
                this.fixedObjFunc(); // filter 영역 fixed class 토글하는 함수
                this.setFilterRange(); // 각 filter 영역의 위치에 따라 해당 filter 노출/비노출 제어하는 함수
            }
            UTIL.cancelAFrame.call(win, this.resizeRequestFrame); // resizeAnimateFunc에서 호출 된 requestAnimationFrame 해제 
        },
        resizeAnimateFunc : function () {
            this.setLayout();
            if (UTIL.winSize().w <= BREAKPOINTS.MOBILE) { // 모바일 구간에서만 아래 함수 실행
                this.createHeightFunc();
                this.fixedObjFunc();
                this.setFilterRange();
            }
            // UTIL에 있는 requestAFrame (requestAnimationFrame) 매써드 호출해서 부드러운 애니메이션 구현
            this.resizeRequestFrame = UTIL.requestAFrame.call(win, $.proxy(this.resizeAnimateFunc, this));
        },
        setLayout : function () {
            if (!UTIL.isSupportTransform || UTIL.isSupportTransform && UTIL.winSize().w > BREAKPOINTS.MOBILE) {
            // IE8이하 이거나 (css transform 미지원) 최신 브라우저이면서 브라우저 너비가 모바일 구간보다 넒은 경우
            // 아래 구문 실행
                if (this.opts.viewType != 'pc') {
                    this.opts.viewType = 'pc';
                    this.setPcLayout(); // PC 설정 및 레리아웃 설정하는 함수 호출 매써드
                }
            } else {
                if (this.opts.viewType != 'mo') {
                    this.opts.viewType = 'mo';
                    this.setMoLayout(); // MO 설정 및 레리아웃 설정하는 함수 호출 매써드
                    this.bindResponsiveEvents(false);
                }
            }
        },
        setPcLayout : function () {
            this.opts.filterViewType = false; // filter 노출상태 false로 저장
            this.scrollLock.init.call(this, false); // this.scrollLock의 init 매써드 호출
            this.bindOutsideEvents(false);
            this.moFocusInitLayout(false); // 모바일 초기 레이아웃 설정 함수 호출
            this.moFocusBindEvents(false); // 모바일 초기 레이아웃 이벤트 바인딩 해제 함수 호출
            this.filterMoToggler.attr(this.opts.accessData.accessAria, false);
            this.filterObjWrap.css('height', ''); // 높이값 초기화
            this.filterArea.show().css('top', ''); // filterArea 노출하고 top값 초기화
            this.filterArea.removeClass(this.opts.filterFixedClass); // sticky 고정하는 클래스 제거
            this.filterArea.removeClass(this.opts.filterToggleClass); // sticky 열고 닫는 클래스 제거
        },
        setMoLayout : function () {
            this.filterArea.removeClass(this.opts.filterFixedClass); 
            this.filterArea.removeClass(this.opts.filterToggleClass); 
        },
        scrollFunc : function () {
            this.fixedObjFunc(); // 현재 스크롤 위치 파악하여 fixed 클래스 토글하는 함수
            this.setFilterRange(); // 각각 filter 노출 비노출 구간 연산하여 노출/비노출하는 함수
        },
        createHeightFunc : function () {
            if (!UTIL.isSupportTransform) {  // 최신 브라우저가 아닌경우 아래의 css값들 초기화
                this.filterObjWrap.css('height', '');
                this.filterArea.css('top', '');
            } else {
                if (UTIL.winSize().w > BREAKPOINTS.MOBILE) { // 최신 브라우저 이고 윈도우 너비값이 PC 구간이면 아래의 css 값 추기화
                    this.filterObjWrap.css('height', '');
                    this.filterArea.css('top', '');
                } else { // 최신 브라우저이고 모바일 구간인경우
                    this.anchorObjHeight = this.anchorObj.outerHeight(true); // anchorObj (서포트 앵커 네비) 의 높이값 저장
                    this.filterObjHeight = this.filterArea.outerHeight(true); // filterArea의 높이값 저장
                    this.filterObjPosition = (this.anchorObj.length) ? this.anchorObjHeight : 0; // anchorObj가 있는 경우 해당 높이값을 저장 (없는 경우 0)
                    this.filterObjWrap.css('height', this.filterObjHeight); // filterObjWrap(js- 클래스명 붙는 빈 태그) 에 filterArea 높이만큼 높이 지정
                    this.filterArea.css('top', this.filterObjPosition); // filterArea의 top 위치를 서포트 앵커 네비 높이만큼 지정
                }
            }
        },
        fixedObjFunc : function () {
            var winTop = $(win).scrollTop();

            var lockScroll = $('html').data('lockScroll'),
                lockType = (lockScroll != null) ? true : false,
                scrollTop = (lockType) ? lockScroll.top : winTop;

            // filter가 위치해야하는 offset 값 계산
            var filterOffsetTop = (lockType) ? lockScroll.top + this.filterObjWrap.offset().top : this.filterObjWrap.offset().top - this.anchorObjHeight;

            if (scrollTop >= filterOffsetTop) { // 현재 윈도우/html offset값이 filter가 위치한 offset top 값 보다 많은 경우 아래 구문 실행
                if (!this.filterArea.hasClass(this.opts.filterFixedClass)) { // fixed 클래스가 없는 경우 아래 구문 실행 (클래스 추가 구문)
                    this.filterArea.addClass(this.opts.filterFixedClass);
                }
            } else { // 반대
                if (this.filterArea.hasClass(this.opts.filterFixedClass) && !lockType) {
                    this.filterArea.removeClass(this.opts.filterFixedClass);
                }
            }
            this.setPosition();
        },
        setFilterRange : function () {
            var winTop = $(win).scrollTop();

            var lockScroll = $('html').data('lockScroll'),
                lockType = (lockScroll != null) ? true : false,
                scrollTop = (lockType) ? lockScroll.top : winTop;

            var filterWrapHeight = this.obj.height(),
                filterOffsetTop = (lockType) ? lockScroll.top + this.obj.offset().top : this.obj.offset().top,
                filterEndRange = filterWrapHeight + filterOffsetTop - this.filterObjHeight;
            
            // 해당 filter의 offset 위치보다 현재 스크롤된 위치가 더 높을 경우 해당 filterArea는 비노출, 반대일 경우 노출
            if (scrollTop >= filterEndRange) {
                this.filterArea.hide();
            } else {
                this.filterArea.show();
            }
        },
        setPosition : function () {
            if (this.opts.viewType === 'pc') {
                this.filterArea.css('top', ''); // pc 구간에선 filtareArea top값(js로 변경한 값) 초기화 
            } else {
                if (this.filterArea.hasClass(this.opts.filterFixedClass)) { // 모바일 구간에서 fixed class 붙은 경우는
                    this.filterArea.css('top', this.filterObjPosition); // filterArea top 값 filterObjPsotion만큼 지정
                } else {
                    this.filterArea.css('top', ''); // 아닌 경우는 top 값 초기화
                }
            }
        },
        scrollLock : {
            init : function (type) {
                if (!this.opts.scrollLock) return;
                var lockClass = this.opts.scrollLockClass,
                    lockOpts = this.opts.scrollLockOpts,
                    lockElements = $(lockOpts.lockElements);
                lockElements.toggleClass(lockClass, type);
                if (type) {
                    if (UTIL.isDevice && UTIL.isIOS) {
                        if (lockOpts.scrollLocked || (lockElements.data('lockScroll') != null)) return;
                        lockOpts.appliedLock = {};
                        this.scrollLock.saveStyles.call(this);
                        this.scrollLock.saveScrolls.call(this);
                        $.extend(lockOpts.appliedLock, lockOpts.lockStyles, {
                            'left' : - lockOpts.prevScroll.scrollLeft,
                            'top' : - lockOpts.prevScroll.scrollTop
                        });
                        lockElements.css(lockOpts.appliedLock);
                        lockElements.data('lockScroll', {
                            'left' : lockOpts.prevScroll.scrollLeft,
                            'top' : lockOpts.prevScroll.scrollTop
                        });
                        lockOpts.scrollLocked = true;
                    }
                } else {
                    if (UTIL.isDevice && UTIL.isIOS) {
                        if (!lockOpts.scrollLocked || (lockElements.data('lockScroll') == null)) return;
                        this.scrollLock.saveStyles.call(this);
                        for (var key in lockOpts.appliedLock) {
                            delete lockOpts.prevStyles[key];
                        }
                        lockElements.attr('style', $('<x>').css(lockOpts.prevStyles).attr('style') || '');
                        lockElements.data('lockScroll', null);
                        $(win).scrollLeft(lockOpts.prevScroll.scrollLeft).scrollTop(lockOpts.prevScroll.scrollTop);
                        lockOpts.scrollLocked = false;
                    }
                }
            },
            saveStyles : function () {
                var styleStrs = [],
                    styleHash = {},
                    lockOpts = this.opts.scrollLockOpts,
                    lockElements = $(lockOpts.lockElements),
                    styleAttr =  lockElements.attr('style');
                if (!styleAttr) return;
                styleStrs = styleAttr.split(';');
                $.each(styleStrs, function styleProp (styleString) {
                    var styleString = styleStrs[styleString];
                    if (!styleString) return;
                    var keyValue = styleString.split(':');
                    if (keyValue.length < 2) return;
                    styleHash[$.trim(keyValue[0])] = $.trim(keyValue[1]);
                });
                $.extend(lockOpts.prevStyles, styleHash);
            },
            saveScrolls : function () {
                var lockOpts = this.opts.scrollLockOpts;
                lockOpts.prevScroll = {
                    scrollLeft : $(win).scrollLeft(),
                    scrollTop : $(win).scrollTop()
                };
            }
        },
        filterMoClickFunc : function (e) {
            e.preventDefault();
            var filterOffsetTop = Math.ceil(this.filterObjWrap.offset().top - this.anchorObjHeight, 10);
            if (!this.opts.filterViewType) { // click 시 filterViewType이 false(비노출 상태)인 경우에만 아래 구문 실행 
                this.opts.filterViewType = true;
                if (!this.filterArea.hasClass(this.opts.filterFixedClass)) { 
                    // filter에 fixed 클래스가 붙지 않은 경우, 자연스럽게 filter를 서포트 앵커 네비 빝으로 이동하도록 animation 활용
                    $('html, body').stop().animate({
                        scrollTop : filterOffsetTop
                    }, this.opts.duration, $.proxy(function () {
                        this.filterMoToggleFunc();
                        win.setTimeout($.proxy(function () {
                            this.bindOutsideEvents(true);
                        }, this), 10);
                    }, this))
                } else { // 이미 fixed 된 상태에서는 animation 불필요함으로 아래 매써드 바로 호출
                    this.filterMoToggleFunc();
                }
            }
        },
        filterMoToggleFunc : function () { // MO구간 filter 펼친 상태를 위한 기본 매써드
            this.filterArea.addClass(this.opts.filterToggleClass);
            win.setTimeout($.proxy(function () {
                this.scrollLock.init.call(this, true);
                this.bindOutsideEvents(true); // outside 이벤트 바인딩
            }, this), 10);
            this.layerViewType = (this.filterArea.hasClass(this.opts.filterToggleClass)) ? true : false;
            // 어차피 펼친 상태를 위한 매써드이기 때문에... if 문은 굳이 필요없어 보임?
            if (this.layerViewType) { // filterArea 열려 있는 경우 (toggleClass 붙어 있는 경우) 아래 모바일 포커스 관련 매써드 호출
                this.moFocusInitLayout(true); 
                this.moFocusBindEvents(true); 
            }
            this.filterMoToggler.attr(this.opts.accessData.accessAria, this.layerViewType); // layerViewType 값에 따라 접근성 속성값 true/false 로 변경 
        },
        bindOutsideEvents : function (type) { // clickoutside, touchendoutside 이벤트 바인딩/바인딩 해제 매써드
            if (type) {
                this.filterLayerArea.on('clickoutside touchendoutside', $.proxy(this.onLayerOutsideFunc, this));
            } else {
                this.filterLayerArea.off('clickoutside touchendoutside');
            }
        },
        onLayerOutsideFunc : function (e) { // MO구간 펼쳐진 filter 영역을 닫는 기능의 매써드
            e.preventDefault();
            win.setTimeout($.proxy(function () {
                this.opts.filterViewType = false;
                this.layerViewType = false;
                this.filterArea.removeClass(this.opts.filterToggleClass);
                this.filterMoToggler.attr(this.opts.accessData.accessAria, this.layerViewType);
                this.scrollLock.init.call(this, false);
                this.bindOutsideEvents(false);
                this.moFocusInitLayout(false);
                this.moFocusBindEvents(false);
                this.outCallback('loadAfter');
            }, this), 10);
        },
        filterToggleFunc : function (e) { // filter title 클릭 시 호출되는 매써드
            e.preventDefault();
            this.filterViewFunc(e);
            this.accessbilityFunc(true);
        },
        filterViewFunc : function (e) {
            var target = $(e.currentTarget);
            var targetList = target.parent(this.opts.filterWrap),
            targetListWrap = targetList.find(this.opts.filterListWrap);
            if (!targetList.hasClass(this.opts.filterActiveClass)) { // targetList에 active 클래스 없는 경우
                targetList.toggleClass(this.opts.filterActiveClass); // 해당 클래스를 토글하고
                targetListWrap.slideToggle(this.opts.filterToggleSpeed, $.proxy(function () { // filter sub 항목 영역 슬라이드 토글
                    this.filterViewAfterFunc(); // callback function으로 해당 함수 호출
                }, this));
            } else {
                targetListWrap.slideUp(this.opts.filterToggleSpeed, $.proxy(function () { // filter sub 항목영역 slide up
                    targetList.removeClass(this.opts.filterActiveClass); // callback function으로 targetList에서 active class 제거하고
                    this.filterViewAfterFunc(); // 해당 함수 호출
                }, this));
            }
        },
        filterViewAfterFunc : function () {
            if (!UTIL.isSupportTransform || (UTIL.isSupportTransform && this.winWidth > BREAKPOINTS.MOBILE)) {
                this.outCallback('loadAfter');
            }
        },
        accessbilityFunc : function (type) { // 접근성 매써드
            if (type) { // true인 경우 아래 구문 실행 (filter 영역 접근성 용)
                var currentAccessType = !this.filterToggler.data(this.opts.accessData.dataActive),
                    globalTxt = (currentAccessType) ? this.globalText.Expand : this.globalText.Collapse; // true일 경우 Expand값, false인 경우 Collapse값 저장
                this.filterToggler.data(this.opts.accessData.dataActive, currentAccessType); // filter title (세부 항목 펼치는 부분)에 aria 값 true/false 지정
                this.filterToggler.find(this.opts.accessText).text(globalTxt);
            } else { // content list 영역의 show more 버튼 관련 접근성 함수 호출
                this.listToggleBtn.toggleClass(this.opts.icoUpClass, this.currentAllView);
                this.listToggleBtn.toggleClass(this.opts.icoDownClass, !this.currentAllView);
                this.listToggleBtn.text(this.currentAllView ? this.globalText.showLess : this.globalText.showMore);
            }
        },
        initListView : function () { // content list 초기 화면 관련 매써드
            this.currentAllView = false; // 전체 펼침 상태 false로 저장
            if (this.listNum <= this.listViewNum) { // 최대 노출 숫자보다 현재 content list 개수가 적으면 show more 버튼 숨김처리
                this.listBtnArea.hide();
            } else { // 반대
                this.listBtnArea.show();
            }
            for (var i = 0, max = this.listNum; i < max; i++) { // content list 총 개수만큼 loop를 돌림
                var contChildTarget = this.listChild.eq(i);
                if (i < this.listViewNum) { // 만약 index값이 최대 노출 list 숫자보다 적을 경우
                    contChildTarget.addClass(this.opts.listViewClass); // 노출 클래스를 붙이고
                } else { // 아닌 경우 노출 클래스 제거
                    contChildTarget.removeClass(this.opts.listViewClass);
                }
            }
            this.listToggleBtn.toggleClass(this.opts.icoUpClass, this.currentAllView); // currentAllView값 true인 경우 icoUpClass 를 붙이고
            this.listToggleBtn.toggleClass(this.opts.icoDownClass, !this.currentAllView); // 아닌 경우 icoDownClass 클래스를 붙임
            this.accessbilityFunc(false); // 접근성 매써드 호출
            this.outCallback('loadAfter');
        },
        listToggleFunc : function (e) {
            e.preventDefault();
            this.currentAllView = !this.currentAllView; // 기존 currenAllView의 반대값을 다시 저장
            this.setListLayout();
            this.scrollMoveFunc(this.listWrap);
            this.accessbilityFunc(false);
        },
        listAjaxAfter : function () {
            this.listChild = this.listParent.children();
            this.listNum = this.listParent.children().length;
            this.initListView();
        },
        setListLayout : function () {
            if (this.currentAllView) { // 전체 펼침 상태가 true인 경우
                this.listChild.addClass(this.opts.listViewClass); // list 노출시키는 클래스 추가
            } else { // 아닌 경우, 최대 노출 개수까지는 노출 클래스를 붙이고 이후 list에서는 해당 클래스 제거 
                this.listChild.eq(this.listViewNum - 1).addClass(this.opts.listViewClass).nextAll().removeClass(this.opts.listViewClass);
            }
            this.outCallback('loadAfter');
        },
        scrollMoveFunc : function (target) {
            if (!target.length) return; // target으로 불러들인 인수가 없는 경우 아래 구문 미실행
            var scrollTop = Math.ceil(target.offset().top),
                winTop = $(win).scrollTop(),
                stickyHeight = PAGE.stickyArea(scrollTop),
                filterHeight = this.filterObjHeight,
                moveTopPosition = scrollTop - stickyHeight,
                moveTop = (!this.filterArea.hasClass(this.opts.filterFixedClass)) ? moveTopPosition : moveTopPosition - filterHeight;
                    // filterArea에 filterFixedClass가 없는 경우 moveTop값은 moveTopPosition 값; 반대일 경우 moveTopPosition값에서 filterHeight를 뺀 값
            if (moveTop === winTop) return; // 상단으로 이동해야 하는 높이값이 현재 스크롤 위치와 같지 않으면 아래 구문 실행
            $('html, body').animate({
                'scrollTop' : moveTop
            }, this.opts.duration); // moveTop 값 만큼 위로 스크롤하고 duration 값만큼 animate 
        },
        outCallback : function (ing) {
            var callbackObj = this.opts[ing];
            if (callbackObj == null) return;
            callbackObj();
        },
        reInit : function () {
            this.resizeFunc();
        }
    };

    //persona plugin
    win.smg.support[personaPluginName] = function (container, args) {
        var defParams = {
            obj : container,
            activeClass : 'is-active',
            objResetBtn : '.s-btn-reset',
            disabledClass : 'is-disabled',
            checkedClass : 'is-checked',
            inputWrap : '.js-chkbox-wrap',
            windowClass : 's-detail-window',
            objInput : '.support-checkbox__input',
            customEvent : '.' + pluginName + (new Date()).getTime(),
            viewType : null,
            resizeStart : null,
            loadAfter : null
        };
        this.opts = UTIL.def(defParams, (args || {}));
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };
    win.smg.support[personaPluginName].prototype = {
        init : function () {
            if (UTIL.winSize().w > BREAKPOINTS.MOBILE) { // PC 구간에서만 아래 함수 호출
                this.setElements();
                this.initLayout();
                this.resizeFunc();
                this.bindEvents();
            }
        },
        setElements : function () {
            this.objResetBtn = this.obj.find(this.opts.objResetBtn);
            this.objInput = this.obj.find(this.opts.objInput);
        },
        initLayout : function () {
            this.objResetBtn.toggleClass(this.opts.disabledClass, !this.objInput.prop('checked')); // objInput의 checked 값(true 또는 false)의 반대 값을 적용하여 disabled class 토글
            this.objResetBtn.prop('disabled', !this.objInput.prop('checked')); // objInput의 checked 값(true 또는 false)의 반대 값을 objResetBtn disabled 속성값으로 적용  
        },
        changeEvents : function (event) {
            var events = [],
                eventNames = event.split(' ');
            for (var key in eventNames) {
                events.push(eventNames[key] + this.opts.customEvent);
            }
            return events.join(' ');
        },
        bindEvents : function () {
            $(win).on(this.changeEvents('resize orientationchange'), $.proxy(this.resizeFunc, this));
        },
        resizeBindEvents : function (type) {
            if (type) { // 인수가 true인 경우 아래 바인딩 함수 실행
                this.obj.on(this.changeEvents('focusin mouseenter mouseleave'), $.proxy(this.onHoverFunc, this));
                this.objInput.on(this.changeEvents('change'), $.proxy(this.onChangeFunc, this));
                this.objResetBtn.on(this.changeEvents('click'), $.proxy(this.onResetFunc, this));
            } else { // false 인 경우 아래의 바인딩 해제 함수 실행 
                this.obj.off(this.changeEvents('focusin mouseenter mouseleave'));
                this.objInput.off(this.changeEvents('change'));
                this.objResetBtn.off(this.changeEvents('click'));
            }
        },
        resizeFunc : function () {
            this.winWidth = UTIL.winSize().w;
            if (this.opts.resizeStart == null) { // this.opts.resizeStart 값이 null인 경우 아래 구문 실행
                this.opts.resizeStart = this.winWidth; // 현재 윈도우 너비를 resizeStart 값으로 저장
                this.resizeAnimateFunc(); // 해당 매써드 호출
            }
            win.clearTimeout(this.resizeEndTime);
            this.resizeEndTime = win.setTimeout($.proxy(this.resizeEndFunc, this), 150); // 윈도우 resizing이 150 milliseconds 멈췄을 경우 resizeEndFunc 매써드 호출
        },
        resizeEndFunc : function () {
            this.opts.resizeStart = null; // resize가 끝난 시점에 resizeStart 값 다시 null로 설정
            this.resizeControl(); // PC/MO 구간인지 체크 해서 viewType 지정 및 바인딩 또는 바인딩 해제 매써드 호출 
            UTIL.cancelAFrame.call(win, this.resizeRequestFrame);  // resizeAnimateFunc에서 호출 된 requestAnimationFrame 해제 
        },
        resizeAnimateFunc : function () {
            this.resizeControl(); // PC/MO 구간인지 체크 해서 viewType 지정 및 바인딩 또는 바인딩 해제 매써드 호출
            this.resizeRequestFrame = UTIL.requestAFrame.call(win, $.proxy(this.resizeAnimateFunc, this)); // UTIL에 있는 requestAFrame (requestAnimationFrame) 매써드 호출
        },
        resizeControl : function () {
            if (!UTIL.isSupportTransform || UTIL.isSupportTransform && (this.winWidth > BREAKPOINTS.MOBILE)) { // IE8이하이거나 최신브라우저이고 PC 구간인경우 아래 구문 실행
                if (this.opts.viewType !== 'pc') {
                    this.opts.viewType = 'pc';
                    this.resizeBindEvents(true); // 바인딩 매써드 호출
                }
            } else {
                if (this.opts.viewType !== 'mo') {
                    this.opts.viewType = 'mo';
                    this.resizeBindEvents(false); // 바인딩 해제 매써드 호출
                }
            }
        },
        onChangeFunc : function () { // input의 변화 가 있을 시 호출되는 매써드
            if (this.objInput.filter(':checked').length) { // input이 checked 상태일 경우 아래 함수 실행
                this.objResetBtn.removeClass(this.opts.disabledClass);
                this.objResetBtn.prop('disabled', false);
            } else { // checked 상태가 아닌 경우 아래 함수 실행
                this.objResetBtn.addClass(this.opts.disabledClass);
                this.objResetBtn.prop('disabled', true);
            }
        },
        onResetFunc : function () { // reset 버튼 클릭 시 호출되는 매써드
            this.objInput.prop('checked', false);
            this.objInput.closest(this.opts.inputWrap).removeClass(this.opts.checkedClass);
            this.objResetBtn.addClass(this.opts.disabledClass);
            this.objResetBtn.prop('disabled', true);
            this.obj.triggerHandler('mouseleave'); // obj 에 mouseleave 이벤트로 바인딩 된 함수 호출
        },
        onHoverFunc : function (e) { 
            var target = $(e.currentTarget);
            if (target.hasClass(this.opts.windowClass)) return; // 현재 호버된 target에 windowClass가 있는 경우 아래 구문 미 실행
            if (e.type === 'mouseenter' || e.type === 'focusin') { // 이벤트 타입이 mouseenter 또는 focusin인 경우 아래 구문 실행
                if (!target.hasClass(this.opts.activeClass)) { // 만약 target에 activeClass가 어없는 경우 아래 구문 실행
                    target.addClass(this.opts.activeClass); 
                    this.bindOutsideEvents(target, true); // focusout 이벤트 제어하는 매써드 호출
                }
            } else if (e.type === 'mouseleave' || e.type === 'focusout') { // 이벤트 타입이 mouseleave 또는 focusout인 경우 아래 구문 실행
                if (this.objInput.filter(':checked').length) return; // objInput이 checked 된  아닌경우 아래 구문 실행
                this.bindOutsideEvents(target, false); // focusout 이벤트 제어하는 매써드 호출
            }
            this.outCallback('loadAfter');
        },
        bindOutsideEvents : function (target, type) {
            if (type) { // true인 경우 아래 구문실행
                this.obj.removeClass(this.opts.activeClass);
                target.on('focusoutside', $.proxy(function () {
                    target.triggerHandler('mouseleave');
                }, this)); // focusoutside 이벤트 발생 시 mouseleave 이벤트 발생
                target.addClass(this.opts.activeClass);
            } else {
                if (target) {
                    target.removeClass(this.opts.activeClass);
                    target.off('focusoutside'); // focusoutside 이벤트 바인딩 해제
                }
            }
        },
        outCallback : function (ing) {
            var callbackObj = this.opts[ing];
            if (callbackObj == null) return;
            callbackObj();
        },
    }

    win.smg.support.manualDownloadFilterNewCall = function (args) { // manual download filter 를 호출할 생성자 함수 선언
        var defParams = {
            obj : '.manual-download-filter-new'
        };
        this.opts = UTIL.def(defParams, (args || {}));
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };
    win.smg.support.manualDownloadFilterNewCall.prototype = UTIL.def({ // UTIL의 def 매써드를 사용해 emmitter 객체와 위의 선언 객채를 merge하여 prototype으로 저장
        init : function () {
            this.callComponent();
            this.globalObjs();
        },
        callComponent : function () {
            this.callPlugins = [];
            for (var i = 0, max = this.obj.length; i < max; i++) { // manual download filter 요소 개수 만큼 loop를 돌려 callPlugins 배열에 저장
                this.callPlugins.push(new win.smg.support[pluginName](this.obj.eq(i), {
                    loadAfter : $.proxy(this.globalObjsCall, this)
                }));
            }
        },
        globalObjs : function () {
            for (var i = 0, max = this.callPlugins.length; i < max; i++) { // callPlugins 배열에 저장된 요소 만큼 loop 돌리기
                CST_EVENT.PAGEIS.PAGEOBJS.push(this.callPlugins[i]);
            }
        },
        globalObjsCall : function () {
            CST_EVENT.PAGEIS.EVENT_MANAGER.trigger(CST_EVENT.PAGEIS.REPOSITION);
        }
    }, UTIL.emitter);  
    $(function () {
        win.supportManualDownloadFilterNew = new win.smg.support.manualDownloadFilterNewCall(); // filter plugin과 persona plugin을 모두 생성할 신규 객체 생성
    });
})(window, window.jQuery, window.document);