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
    		} else {
    			this.personaBox.off('mouseenter mouseleave');
    			this.personaInput.off('change');
    			this.resetBtn.off('click');
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
            selectAria : 'aria-hidden',
            openClass : 'is-opened',
    		selectItem : 'li > a',
    		accessibilityElem : '.blind',
            slideSpeed : 120
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
    		this.selectList.attr('aria-hidden', true);
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
			this.selectList.slideDown(this.opts.slideSpeed);
            this.selectList.attr('aria-hidden', false);
            this.selectWrap.addClass(this.opts.openClass);
    		this.accessibilityElem.text(this.globalText.collapse);
                this.clickOutsideBindEvent(true);
        },
        closeSelect : function () {
			this.selectList.slideUp(this.opts.slideSpeed);
            this.selectList.attr('aria-hidden', true);
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
            filterContainer : '.manual-download-filter-new__module-aside',
            filterWrap : '.manual-download-filter-new__filters',
            filterTab : '.manual-download-filter-new__tab',
            filterTabBtn : '.manual-download-filter-new__tab-btn',
            filterListWrap : '.manual-download-filter-new__list-wrap',
            filterListArea : '.manual-download-filter-new__list',
            filterToggler : '.manual-download-filter-new__list-title',
            accessibilityElem : '.blind',
            filterList : '.manual-download-filter-new__list-items',
            filterInputWrap : '.support-checkbox',
            filterInput : 'input[type="checkbox"]',
            activeClass : 'filter-active',
            checkedClass : 'is-checked',
            contentList : '.manual-download-filter-new__content-list',
            contentItem : 'li',
            contentCta : '.manual-download-filter-new__content-cta',
            contentCtaBtn : '.s-btn-text',
            showClass : 'is-show',
            fixedClass : 'is-fixed',
            openClass : 'is-opened',
            animateSpeed : 150,
            showType : true,
            listNum : null,
            viewType : null
        }
        this.opts = UTIL.def(defParams, (args || {}));
        if (!(this.obj = $(this.opts.container)).length) return;
        this.init();
    };
    win.smg.support[filterPlugin].prototype = {
        init : function () {
            this.setElements();
            this.checkResponsive();
            this.initOpts();
            this.initLayout();
            this.bindEvents();
            this.resizeFunc();
        },
        setElements : function () {
            this.filterParent = $(this.opts.filterParent);
            this.filterContainer = this.obj.find(this.opts.filterContainer);
            this.filterWrap = this.obj.find(this.opts.filterWrap);
            this.filterTab = this.filterWrap.find(this.opts.filterTab);
            this.filterTabBtn = this.filterTab.find(this.opts.filterTabBtn);
            this.filterListWrap = this.filterWrap.find(this.opts.filterListWrap);
            this.filterListArea = this.filterListWrap.find(this.opts.filterListArea);
            this.filterToggler = this.filterListWrap.find(this.opts.filterToggler);
            this.accessibilityElem = this.filterToggler.find(this.opts.accessibilityElem);
            this.filterList = this.filterListArea.find(this.opts.filterList);
            this.filterInputWrap = this.filterListArea.find(this.opts.filterInputWrap);
            this.filterInput = this.filterInputWrap.find(this.opts.filterInput);

            this.contentList = this.obj.find(this.opts.contentList);
            this.contentItem = this.contentList.find(this.opts.contentItem);
            this.contentCta = this.contentList.find(this.opts.contentCta);
            this.contentCtaBtn = this.contentCta.find(this.opts.contentCtaBtn);
        },
        initOpts : function () {
            var globalText = this.filterParent.data('global-text');
            this.globalText = {
                Collapse : (globalText && globalText.Collapse) ? $.trim(globalText.Collapse) : '',
                Expand : (globalText && globalText.Expand) ? $.trim(globalText.Expand) : '',
                showMore : (globalText && globalText.showMore) ? $.trim(globalText.showMore) : '',
                showLess : (globalText && globalText.showLess) ? $.trim(globalText.showLess) : '' 
            };
            this.filterInput.filter(':checked').closest(this.filterInputWrap).addClass(this.opts.checkedClass);
            this.opts.listNum = this.contentList.data('view-list');
        },
        checkResponsive : function () {
            this.isSupportTransform = (function() {
                return ('WebkitTransform' in doc.body.style || 'MozTransform' in doc.body.style || 'msTransform' in doc.body.style || 'OTransform' in doc.body.style || 'transform' in doc.body.style);
            })();
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
            $(win).on('resize', $.proxy(this.resizeFunc, this));
            this.filterToggler.on('click', $.proxy(this.onClickFilterToggler, this));
            this.filterInput.on('change', $.proxy(this.onChangeFilter, this));
            this.contentCtaBtn.on('click', $.proxy(this.onClickMore, this));
        },
        resizeFunc : function () {
            this.winWidth = $(win).width();

            clearTimeout(this.clearTime);
            this.clearTime = setTimeout($.proxy(this.resizeEndFunc, this), 150);
        },
        resizeEndFunc : function () {
            if (this.winWidth >= BREAKPOINTS.MOBILE && this.opts.viewType != 'PC' ) {
                this.opts.viewType = 'PC';

                $(win).off('scroll');
            } else if (this.winWidth < BREAKPOINTS.MOBILE && this.opts.viewType != 'MO' && this.isSupportTransform) {
                this.opts.viewType = 'MO';

                this.checkOffset();
                $(win).on('scroll', $.proxy(this.onScrollFunc, this));
                this.filterTabBtn.on('click', $.proxy(this.onClickFilterTab, this));
            }
            console.log(this.opts.viewType);
        },
        onClickFilterToggler : function (e) {
            var target = $(e.currentTarget),
                targetAccess = target.find(this.accessibilityElem),
                targetListArea = target.closest(this.filterListArea),
                targetList = targetListArea.find(this.filterList);

            e.preventDefault();
            if (!targetListArea.hasClass(this.opts.activeClass)) {
                targetListArea.addClass(this.opts.activeClass);
                targetAccess.text(this.globalText.Collapse);
                targetList.slideDown(this.opts.animateSpeed);
            } else {
                targetListArea.removeClass(this.opts.activeClass);
                targetAccess.text(this.globalText.Expand);
                targetList.slideUp(this.opts.animateSpeed);
            }
        },
        onChangeFilter : function (e) {
            var target = $(e.currentTarget),
                targetWrap = target.closest(this.filterInputWrap);

            if (target.prop('checked')) {
                targetWrap.addClass(this.opts.checkedClass);
            } else {
                targetWrap.removeClass(this.opts.checkedClass);
            }
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
            var target = $(e.currentTarget);

            e.preventDefault();
            if (this.opts.showType) {
                this.opts.showType = false;
                target.removeClass('s-ico-down').addClass('s-ico-up');
                target.text(this.globalText.showLess);
                this.contentItem.addClass(this.opts.showClass);
            } else {
                this.opts.showType = true;
                target.removeClass('s-ico-up').addClass('s-ico-down');
                target.text(this.globalText.showMore);
                this.viewContentFunc();
            }
        },
        checkOffset : function () {
            this.scrollTop = $(win).scrollTop();
            this.filterOffset  = this.filterWrap.offset().top;
            this.filterHeight = this.filterWrap.height();
            this.filterCurrentOffset = this.filterOffset - this.scrollTop;
            this.areaEndOffset = this.obj.offset().top + this.obj.height();

            this.filterContainer.css('height', this.filterHeight);
        },
        onScrollFunc : function () {
            this.scrollTop = $(win).scrollTop();

            if (this.scrollTop > this.filterOffset && this.scrollTop < this.areaEndOffset) {
                this.topPositionFunc(true);
            } else {
                this.topPositionFunc(false);
            }
        },
        onClickFilterTab : function (e) {
            e.preventDefault();
            var _this = this;
            this.scrollTop = $(win).scrollTop();

            if (!this.filterWrap.hasClass(this.opts.openClass)) {
                if (this.scrollTop < this.filterOffset) {
                    $('html, body').animate({
                        scrollTop : this.filterOffset
                    }, function () {
                            _this.filterWrap.addClass(_this.opts.openClass);
                            _this.filterWrap.addClass(_this.opts.fixedClass).css('top', 0);
                            _this.filterListWrap.css('top', _this.filterHeight);
                    });
                }
            } else {
                this.filterWrap.removeClass(this.opts.openClass);
            }
        },
        topPositionFunc : function (type) {
            if (type) {
                this.filterWrap.addClass(this.opts.fixedClass).animate({
                    top : 0
                });
            } else {
                this.filterWrap.removeClass(this.opts.fixedClass).animate({
                    top : ''
                });
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
})(window, window.jQuery, window.document)