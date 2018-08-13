(function (win, $, doc) {
    'use strict';

    win.smg = win.smg || {};
    win.smg.support = win.smg.support || {};
    win.smg.support.common =  win.smg.support.common || {};

    var UTIL = win.smg.support.common.util,
    	BREAKPOINTS = win.smg.support.common.breakpoints,
        manualDownloadPlugin = 'manualDownloadPlugin',
    	personaPlugin = 'personaPlugin',
    	searchPlugin = 'searchPlugin',
    	filterPlugin = 'filterPlugin';
    
    // Persona Area
    win.smg.support[personaPlugin] = function (container, args) {
    	var defParams = {
    		container : container,
    		personaList : '.manual-download-filter-new__persona-list',
    		personaBox : '.manual-download-filter-new__persona-box',
    		personaToggler : '.manual-download-filter-new__persona-toggler',
    		personaInputWrap : '.manual-download-filter-new__persona-btn',
            personaInput : 'input',
			resetBtn : '.s-btn-reset',
    		excludeClass : 's-detail-window',
    		activeClass : 'is-active',
    		checkedClass : 'is-checked',
    		disabledClass : 'is-disabled'
    	}
    	this.opts = UTIL.def(defParams, (args || {}));
    	if (!(this.obj = $(this.opts.container)).length) return;
    	this.init();
    };
    win.smg.support[personaPlugin].prototype = {
    	init : function () {
    		this.setElements();
    		this.initOpts();
    		this.initLayout();
    		this.resizeFunc();
    		this.bindEvents();
    	},
    	setElements : function () {
    		this.personaList = this.obj.find(this.opts.personaList);
    		this.personaBox = this.personaList.find(this.opts.personaBox);
    		this.personaToggler = this.personaBox.find(this.opts.personaToggler);
    		this.personaInputWrap = this.personaBox.find(this.opts.personaInputWrap);
    		this.personaInput = this.personaInputWrap.find(this.opts.personaInput);
    		this.resetBtn = this.personaBox.find(this.opts.resetBtn);
    	},
    	initOpts : function () {

    	},
    	initLayout : function () {
    		this.personaBox.removeClass(this.opts.activeClass);
    		this.personaInputWrap.removeClass(this.opts.checkedClass);
    		this.personaInput.prop('checked', false);
    		this.resetBtn.addClass(this.opts.disabledClass).prop('disabled', true);
    	},
    	bindEvents : function () {
    		$(win).on('resize', $.proxy(this.resizeFunc, this));
    	},
    	resizeFunc : function () {
    		this.winWidth = $(win).width();

    		clearTimeout(this.clearTime);
    		this.clearTime = setTimeout($.proxy(this.resizeEndFunc, this), 150);
    	},
    	resizeEndFunc : function () {
    		if (this.winWidth >= BREAKPOINTS.MOBILE) {
	    		this.personaBox.on('mouseenter mouseleave', $.proxy(this.onHoverFunc, this));
	    		this.personaInput.on('change', $.proxy(this.onChangeFunc, this));
	    		this.resetBtn.on('click', $.proxy(this.onResetFunc, this));
	    		console.log('PC');
    		} else {
    			this.personaBox.off('mouseenter mouseleave');
    			this.personaInput.off('change');
    			this.resetBtn.off('click');
	    		console.log('MO');
    		}
    	},
    	onHoverFunc : function (e) {
    		var target = $(e.currentTarget),
                targetInputChecked = target.find(this.personaInput).filter(':checked').length;

    		if (target.hasClass(this.opts.excludeClass)) return;
    		if (e.type === 'mouseenter') {
	    		target.addClass(this.opts.activeClass);
    		} else if (e.type === 'mouseleave' && !targetInputChecked) {
	    		target.removeClass(this.opts.activeClass);
    		}
    	},
    	onChangeFunc : function (e) {
    		var target = $(e.currentTarget),
				targetWrap = target.closest(this.personaBox),
				targetGroup = targetWrap.find(this.personaInput); // attr('name') 으로 체크하는 것이 나을까?

    		if (target.filter(':checked').length) {
    			target.parent().addClass(this.opts.checkedClass);
    		} else {
    			target.parent().removeClass(this.opts.checkedClass); 		
    		}

    		if (targetGroup.filter(':checked').length) {
                targetWrap.addClass(this.opts.activeClass);
                targetWrap.find(this.resetBtn).removeClass(this.opts.disabledClass).prop('disabled', false);
    		} else {
    			targetWrap.find(this.resetBtn).addClass(this.opts.disabledClass).prop('disabled', true);
    		}
    	},
    	onResetFunc : function (e) {
    		var target = $(e.currentTarget),
    			targetWrap = target.closest(this.personaBox);

    		targetWrap.find(this.personaInputWrap).removeClass(this.opts.checkedClass);
    		targetWrap.find(this.personaInput).prop('checked', false);
    		target.addClass(this.opts.disabledClass).prop('disabled', true);
    	}
    }

    // Search Area
    win.smg.support[searchPlugin] = function (container, args) {
    	var defParams = {
    		container : container,
    		searchWrap : '.support-input__wrap',
    		searchInput : '.support-input__input',
    		searchLabel : '.support-input__label',
            searchClear : '.support-input__clear',
    		selectWrap : '.support-select',
    		selectBtn : '.support-select__placeholder',
    		selectPlaceholder : '.js-align-placeholder > span',
    		selectList : '.support-select__options',
            openClass : 'is-opened',
    		selectItem : 'li > a',
    		accessibilityElem : '.blind'
    	}
    	this.opts = UTIL.def(defParams, (args || {}));
    	if (!(this.obj = $(this.opts.container)).length) return;
    	this.init();
    };
    win.smg.support[searchPlugin].prototype = {
    	init : function () {
    		this.setElements();
    		this.initOpts();
    		this.initLayout();
    		this.bindEvents();
    	},
    	setElements : function () {
    		this.searchWrap = this.obj.find(this.opts.searchWrap);
    		this.searchInput = this.searchWrap.find(this.opts.searchInput);
    		this.searchLabel = this.searchWrap.find(this.opts.searchLabel);
            this.searchClear = this.searchWrap.find(this.opts.searchClear);
    		this.selectWrap = this.obj.find(this.opts.selectWrap);
    		this.selectBtn = this.selectWrap.find(this.opts.selectBtn);
    		this.selectPlaceholder = this.selectBtn.find(this.opts.selectPlaceholder);
    		this.selectList = this.selectWrap.find(this.opts.selectList);
    		this.selectItem = this.selectList.find(this.opts.selectItem);
    		this.accessibilityElem = this.selectWrap.find(this.opts.accessibilityElem);
    	},
    	initOpts : function () {
    		var globalText = this.selectWrap.data('global-text');
    		this.globalText = {
    			collapse : (globalText && globalText.Collapse) ? $.trim(globalText.Collapse) : '',
    			expand : (globalText && globalText.Expand) ? $.trim(globalText.Expand) : ''
    		};
    	},
    	initLayout : function () {
    		this.accessibilityElem.text(this.globalText.expand);
    		this.selectList.hide();
    	},
    	bindEvents : function () {
            this.searchInput.on('focusin focusout', $.proxy(this.inputFocusFunc, this));
    		this.searchInput.on('keyup keydown', $.proxy(this.inputKeyFunc, this));
            this.searchClear.on('click', $.proxy(this.inputClearFunc, this));
            this.selectBtn.on('click', $.proxy(this.onClickSelect, this));
            this.selectItem.on('click', $.proxy(this.onClickSelectItem, this));
    	},
    	inputFocusFunc : function (e) {
    		var target = $(e.currentTarget);
    		if (e.type === 'focusin') {
	    		this.searchLabel.hide();
            } else if (e.type === 'focusout' && !target.val().length) {
                this.searchLabel.show();    
            }
        },
        inputKeyFunc : function (e) {
            var target = $(e.currentTarget);
            target.val().length ? this.searchClear.show() : this.searchClear.hide();
        },
        inputClearFunc : function () {
            this.searchInput.val('');
            this.searchClear.hide();
            this.searchLabel.show();
        },
    	onClickSelect : function () {
            if (!this.selectList.filter(':visible').length) {
                this.openSelect();
            } else {
                this.closeSelect();
            }
    	},
    	onClickSelectItem : function (e) {
    		var target = $(e.currentTarget),
    			targetText = target.text();

    		this.selectPlaceholder.text(targetText);
            this.onClickSelect();
    	},
        clickOutsideBindEvent : function (type) {
            if (type) {
                this.selectWrap.on('clickoutside', $.proxy(this.closeSelect, this));
            } else {
                this.selectWrap.off('clickoutside');
            }
        },
        openSelect : function () {
			this.selectList.slideDown(120);
            this.selectWrap.addClass(this.opts.openClass);
    		this.accessibilityElem.text(this.globalText.collapse);
                this.clickOutsideBindEvent(true);
        },
        closeSelect : function () {
			this.selectList.slideUp(120);
            this.selectWrap.removeClass(this.opts.openClass);
    		this.accessibilityElem.text(this.globalText.expand);
            this.clickOutsideBindEvent(false);
        }
    }

    // Filter Area
    win.smg.support[filterPlugin] = function (container, args) {
        var defParams = {
            container : container,
            filterParent : '.manual-download-filter-new',
            filterWrap : '.manual-download-filter-new__filters',
            filterTab : '.manual-download-filter-new__tab',
            filterListWrap : '.manual-download-filter-new__list-wrap',
            filterListArea : '.manual-download-filter-new__list',
            filterToggler : '.manual-download-filter-new__list-title',
            filterInputWrap : '.support-checkbox',
            filterInput : 'input[type="checkbox"]',
            activeClass : 'filter-active',
            contentList : '.manual-download-filter-new__content-list',
            contentItem : 'li',
            contentCta : '.manual-download-filter-new__content-cta',
            contentCtaBtn : '.s-btn-text',
            showClass : 'is-show',
            showType : true,
            listNum : null
        }
        this.opts = UTIL.def(defParams, (args || {}));
        if (!(this.obj = $(this.opts.container)).length) return;
        this.init();
    };
    win.smg.support[filterPlugin].prototype = {
        init : function () {
            this.setElements();
            this.initOpts();
            this.initLayout();
            this.bindEvents();
        },
        setElements : function () {
            this.filterParent = $(this.opts.filterParent);
            this.filterWrap = this.obj.find(this.opts.filterWrap);
            this.filterTab = this.filterWrap.find(this.opts.filterTab);
            this.filterListWrap = this.filterWrap.find(this.opts.filterListWrap);
            this.filterListArea = this.filterListWrap.find(this.opts.filterListArea);
            this.filterToggler = this.filterListWrap.find(this.opts.filterToggler);

            this.contentList = this.obj.find(this.opts.contentList);
            this.contentItem = this.contentList.find(this.opts.contentItem);
            this.contentCta = this.contentList.find(this.opts.contentCta);
            this.contentCtaBtn = this.contentCta.find(this.opts.contentCtaBtn);
        },
        initOpts : function () {
            var globalText = this.filterParent.data('global-text');
            this.globalText = {
                Collapse : (globalText && globalText.Collapse) ? globalText.Collapse : '',
                Expand : (globalText && globalText.Expand) ? globalText.Expand : '',
                showMore : (globalText && globalText.showMore) ? globalText.showMore : '',
                showLess : (globalText && globalText.showLess) ? globalText.showLess : '' 
            }
            this.opts.listNum = this.contentList.data('view-list');
        },
        initLayout : function () {
            if (this.contentItem.length > this.opts.listNum) {
                this.contentCta.show();
            } else {
                this.contentCta.hide();
            }
            this.viewContentFunc();
        },
        bindEvents : function () {
            this.contentCta.on('click', $.proxy(this.onClickMore, this));
        },
        viewContentFunc : function () {
            for (var i = 0, max = this.contentItem.length; i < max; i++) {
                if (i < this.opts.listNum) {
                    this.contentItem.eq(i).addClass(this.opts.showClass);
                } else {
                    this.contentItem.eq(i).removeClass(this.opts.showClass);
                }
            }
        },
        onClickMore : function (e) {
            e.preventDefault();
            if (this.opts.showType) {
                this.opts.showType = false;
                this.contentCtaBtn.removeClass('s-ico-down').addClass('s-ico-up');
                this.contentCtaBtn.text(this.globalText.showLess);
                this.contentItem.addClass(this.opts.showClass);
            } else {
                this.opts.showType = true;
                this.contentCtaBtn.removeClass('s-ico-up').addClass('s-ico-down');
                this.contentCtaBtn.text(this.globalText.showMore);
                this.viewContentFunc();
            }
        }
    }

    // Plugin Call 
    win.smg.support[manualDownloadPlugin] = function (container, args) {
        var defParams = {
            container : container,
            personaObj : {
                wrap : '.manual-download-filter-new__persona',
                pluginName : personaPlugin
            },
            searchObj : {
                wrap : '.manual-download-filter-new__search',
                pluginName : searchPlugin
            },
            filterObj : {
                wrap : '.manual-download-filter-new__module',
                pluginName : filterPlugin
            }
        }
        this.opts = UTIL.def(defParams, (args || {}));
        if (!(this.obj = $(this.opts.container)).length) return;
        this.init();
    };
    win.smg.support[manualDownloadPlugin].prototype  = {
        init : function () {
            this.callPlugins();
        },
        callPlugins : function () {
            this.createPlugins(this.opts.personaObj);
            this.createPlugins(this.opts.searchObj);
            this.createPlugins(this.opts.filterObj);
        },
        createPlugins : function (pluginObj, args) {
            var pluginElement = this.obj.find(pluginObj.wrap);

            for (var i = 0, max = pluginElement.length; i < max; i++ ) {
                var target = pluginElement.eq(i);
                new win.smg.support[pluginObj.pluginName](target, args);
            }
        }
    };

    $(function() {
        new win.smg.support[manualDownloadPlugin]('.manual-download-filter-new');
    });  

    // $.fn.pluginCall  = function (pluginName) {
    //     for (var i = 0, max = this.length; i < max; i++) {
    //         new pluginName(this.eq(i));
    //     }
    // };

    // $(function() {
    //     $('.manual-download-filter-new__persona').pluginCall(win.smg.support[personaPlugin]);
    //     $('.manual-download-filter-new__search').pluginCall(win.smg.support[searchPlugin]);
    //     $('.manual-download-filter-new__module').pluginCall(win.smg.support[filterPlugin]);
    // });
        
})(window, window.jQuery, window.document)