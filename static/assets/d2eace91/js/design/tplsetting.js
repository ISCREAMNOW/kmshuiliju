/*
 * 处理装修模块拖拽的js
 */
$(function() {
	/*
	 * 设置初始化变量
	 */
	var flag = true;
	var temp = '';
	var uid = '';

	if (typeof (topic_id) == 'undefined') {
		topic_id = 0;
	}
	/* -------------------- 主区域拖拽事件start ---------------------- */

	/**
	 * 放置事件
	 */
	$('.SZY-TEMPLATE-MAIN-CONTAINER').droppable({
		accept: ".drag",
		activeClass: "dragactive",
		hoverClass: "draghover",
		// accept: ":not(.ui-sortable-helper)", // Reject clones generated by
		drop: function(e, ui) {
			if (flag == true) {
				$('.SZY-TEMPLATE-MAIN-CONTAINER').find('li.drag').addClass('hide');
				$.ajax({
					type: 'get',
					url: 'select-template',
					async: false,
					dataType: "json",
					data: {
						id: ui.draggable['context'].id,
						code: ui.draggable['context']['dataset']['code'],
						sort: $(".drop-item").size() + 1,
						page: page,
						topic_id: topic_id
					},
					beforeSend: function() {
						$.loading.start();
					},
					success: function(result) {
						temp = result.data;
						uid = result.uid;
						$.loading.stop();
						flag = false;
						$.msg(result.message);
					}
				});
			}
		}
	}).sortable({
		items: '.drop-item',
		scroll: true,
		tolerance: 'intersect',
		opacity: 0.6,
		distance: 50,
		placeholder: 'position-box',
		sort: function() {
			// 获取由 droppable 与 sortable 交互而加入的条目
			// 使用 connectWithSortable 可以解决这个问题，但不允许您自定义 active/hoverClass 选项
			$(this).removeClass("active");
		},
		stop: function(event, ui) {
			if (ui.item[0].id == '') {
				if (temp) {
					var $el = $(temp);
					var i = $(this).find('li.drag').prevAll('div.drop-item').size() - 1;
					if ($(this).find('.drop-item').size() > 0) {
						if (i < 0) {
							$(this).find('.drop-item').eq(0).before($el);
						} else {
							$(this).find('.drop-item').eq(i).after($el);
						}
					} else {
						$(this).append($el);
					}

					refreshTpl(page, uid);
				}
				$(this).find('li.drag').remove();
			}
			savesort(page, ui.item.attr('id'));
			flag = true;
		}
	});

	$(".SZY-TEMPLATE-MAIN-CONTAINER").disableSelection();

	/**
	 * 拖拽模块
	 */
	$('.drag').draggable({
		appendTo: 'body',
		connectToSortable: ".SZY-TEMPLATE-MAIN-CONTAINER",
		scroll: false,
		helper: 'clone',
		cursor: 'move',
		revert: 'invalid',
		opacity: 0.6,
		zIndex: 99
	});
	/* -------------------- 主区域拖拽事件end ---------------------- */

	/* -------------------- 导航区域拖拽事件start ---------------------- */

	$('.SZY-TEMPLATE-NAV-CONTAINER').droppable({
		accept: ".nav-drag",
		activeClass: "nav-dragactive",
		hoverClass: "draghover",
		// accept: ":not(.ui-sortable-helper)", // Reject clones generated by
		drop: function(e, ui) {
			if (flag == true) {
				$('.SZY-TEMPLATE-NAV-CONTAINER').find('li.nav-drag').addClass('hide');
				$.ajax({
					type: 'get',
					url: 'select-template',
					async: false,
					dataType: "json",
					data: {
						id: ui.draggable['context'].id,
						code: ui.draggable['context']['dataset']['code'],
						sort: $(".drop-item").size() + 1,
						page: page,
					},
					beforeSend: function() {
						$.loading.start();
					},
					success: function(result) {
						temp = result.data;
						uid = result.uid;
						$.loading.stop();
						flag = false;
						$.msg(result.message);
					}
				});
			}
		}
	}).sortable({
		items: '.drop-item',
		scroll: true,
		tolerance: 'intersect',
		opacity: 0.6,
		distance: 50,
		placeholder: 'nav-position-box',
		sort: function() {
			// 获取由 droppable 与 sortable 交互而加入的条目
			// 使用 connectWithSortable 可以解决这个问题，但不允许您自定义 active/hoverClass 选项
			$(this).removeClass("active");
		},
		stop: function(event, ui) {
			if (ui.item[0].id == '') {
				if (temp) {
					var $el = $(temp);
					var i = $(this).find('li.nav-drag').prevAll('div.drop-item').size() - 1;
					if ($(this).find('.drop-item').size() > 0) {
						if (i < 0) {
							$(this).find('.drop-item').eq(0).before($el);
						} else {
							$(this).find('.drop-item').eq(i).after($el);
						}
					} else {
						$(this).append($el);
					}

					refreshTpl(page, uid);
				}
				$(this).find('li.nav-drag').remove();
			}
			savesort(page, ui.item.attr('id'));
			flag = true;
		}

	});

	$('.nav-drag').draggable({
		appendTo: 'body',
		connectToSortable: ".SZY-TEMPLATE-NAV-CONTAINER",
		scroll: false,
		helper: 'clone',
		cursor: 'move',
		revert: 'invalid',
		opacity: 0.6,
		zIndex: 99
	});

	$(".SZY-TEMPLATE-NAV-CONTAINER").disableSelection();

	/* -------------------- 导航区域拖拽事件end ---------------------- */

	/* ----------------- 公共方法 ------------------------ */

	/**
	 * 页面发布
	 */
	$('.SZY-TPL-RELEASE').click(function() {
		$.ajax({
			type: 'get',
			async: false, // 同步请求
			url: 'setting',
			dataType: 'json',
			data: {
				page: page,
				topic_id: topic_id
			},
			beforeSend: function() {
				$.loading.start();
			},
			success: function(result) {
				$.loading.stop();
				if (result.code == 0 && result.url != null) {
					$.confirm("设置成功,您需要打开首页吗?", function(s) {
						if (s) {
							$.go(result.url, "_blank");
						}
					});

				} else {
					$.msg(result.message);
				}
			}
		});
	});

	/**
	 * 整站改色模块
	 */
	$('.SZY-SITE-STYLE').click(function() {
		$.loading.start();
		modal = $.modal($(this));
		if (modal) {
			modal.show();
			$.loading.stop();
		} else {
			modal = $.modal({
				title: '自定义风格',
				trigger: $(this),
				ajax: {
					url: '/system/config/index?group=site_style',
				},

			});
		}
	});

	/**
	 * 模板备份
	 */
	$('.SZY-TPL-BACKUP').click(function() {
		$.loading.start();
		modal = $.modal($(this));
		if (modal) {
			modal.show();
			$.loading.stop();
		} else {
			modal = $.modal({
				title: '模板备份',
				trigger: $(this),
				ajax: {
					url: '/site/tpl-backup.html',
					data: {
						action: 'add',
						output: 1,
						design_page: page
					}
				},

			});
		}
	});

	/**
	 * 使用备份
	 */
	$('.SZY-TPL-USE').click(function() {
		$.loading.start();
		modal = $.modal($(this));
		if (modal) {
			modal.show();
			$.loading.stop();
		} else {
			modal = $.modal({
				title: '使用备份',
				trigger: $(this),
				ajax: {
					url: '/site/tpl-backup.html',
					data: {
						action: 'list',
						output: 1,
						design_page: page,
						search_id : $(this).data('id')
					}
				},

			});
		}
	});
});

function savesort(page, uid) {
	var arr = [];
	$.each($(".drop-item"), function(i, v) {
		var tpl = {};
		tpl.uid = $(v).attr('id');
		tpl.sort = i + 1;
		if (tpl.uid && tpl.sort) {
			arr.push(tpl);
		}
	});
	if (arr.length > 0) {
		$.ajax({
			type: 'post',
			url: 'sort',
			dataType: 'json',
			data: {
				tpl: arr,
			},
			success: function(result) {
				// 调用模板设置助手
				getHelper(uid);
			}
		});
	} else {
		getHelper(uid);
	}
}

// 模板住手排序
function savesortHelper() {
	var arr = [];
	$.each($("#helper_tool_nav").find("ul li"), function(i, v) {
		var tpl = {};
		tpl.uid = $(v).data('id');
		tpl.sort = i + 1;
		if (tpl.uid && tpl.sort) {
			arr.push(tpl);
		}
	});
	$.ajax({
		type: 'get',
		url: 'sort',
		dataType: 'json',
		data: {
			tpl: arr,
		},
		success: function(result) {
			var $item = $('<div></div>');
			$.each(arr, function(i, v) {
				$item.append($('.SZY-TEMPLATE-MAIN-CONTAINER').find("#" + v.uid));
			});
			$('.SZY-TEMPLATE-MAIN-CONTAINER').html($item);
		}
	});
}

// 清空数据
function clearTplData() {
	chk_value = [];
	data = [];
	data_m = {};
}

// 删除模板
function delTpls(uid) {
	$.confirm("您确定要删除这个模块吗?", function(s) {
		if (s) {
			$.ajax({
				type: 'get',
				url: 'delete-tpls',
				dataType: 'json',
				data: {
					uid: uid,
				},
				beforeSend: function() {
					$.loading.start();
				},
				success: function(result) {
					$('#' + uid).detach();
					// 从新排序
					$.loading.stop();
					savesort(page, uid);
					$.msg(result.message);
				}
			});
		}
	});
}
// 打开选择器
function open_selector(uid, type, cat_id, max) {
	$.selector({
		uid: uid,
		type: type,
		cat_id: cat_id,
		max: max,
	});
}

// 设置是否有效
function setIsValidTpls(uid) {
	$.ajax({
		type: 'get',
		url: 'valid-tpls',
		dataType: 'json',
		data: {
			uid: uid,
		},
		beforeSend: function() {
			$.loading.start();
		},
		success: function(result) {
			refreshTpl(result.data.page, result.data.uid);
			$.msg(result.message);
			$.loading.stop();
		}
	});
}

// 上下交换位置
function setSortTpls(uid, move) {
	var tpl = $("#" + uid);
	if (move == 'up') {
		var tplprevs = tpl.prevAll(".drop-item");
		var tplprev = tplprevs[0];
		if (tplprev) {
			tpl.insertBefore($("#" + tplprev.id));
			$('html').animate({
				scrollTop: tpl.offset().top - 100
			}, 1000);
		} else {
			$.msg("已经到顶了!");
		}
	}
	if (move == 'down') {
		var tplnexts = tpl.nextAll(".drop-item");
		var tplnext = tplnexts[0];
		if (tplnext) {
			$("#" + tplnext.id).insertBefore(tpl);
			$('html').animate({
				scrollTop: tpl.offset().top - 100
			}, 1000);
		} else {
			$.msg("已经到底了!");
		}
	}
	savesort(page, uid);
}

/*
 * 模板设置助手js
 */
function getHelper(id) {

	/* 模板设置助手js */
	$('.helper-icon').click(function() {
		$('.helper-icon').animate({
			'right': '-40px'
		}, 200, function() {
			$('.helper-wrap').animate({
				'right': '0'
			}, 200);
		});
	});

	$('.help-header .fa-times-circle').click(function() {
		$('.helper-wrap').animate({
			'right': '-140px'
		}, 200, function() {
			$('.helper-icon').animate({
				'right': '0'
			}, 200);
		});
	});

	// 生成页面导航助手
	$("#helper_tool_nav").find("ul").html("");
	var count = 0;
	$(".SZY-TEMPLATE-MAIN-CONTAINER").find(".drop-item").each(function() {
		var title = $(this).data("tpl_name");
		var uid = $(this).attr('id');
		var selected_class = '';
		var is_valid_class = '';
		var is_valid_text = '';
		if ($(this).data('is_valid') > 0) {
			is_valid_class = 'fa fa-check-circle-o';
		} else {
			is_valid_class = 'fa fa-times-circle-o';
			is_valid_text = '<em>隐藏</em>';
		}
		var element = $($.parseHTML("<li id='helper_" + uid + "' data-id='" + uid + "'>" + is_valid_text + "<a class='title' href='javascript:void(0);'>" + title + "</a><a class='handle' href=javascript:delTpls('" + uid + "') title='删除'><i class='fa fa-trash-o'></i></a></a><a class='handle' href=javascript:setIsValidTpls('" + uid + "') title='是否有效'><i class='" + is_valid_class + "'></i></a><a class='handle' href=javascript:setSortTpls('" + uid + "','up') title='上移'><i class='fa fa-arrow-circle-o-up'></i></a><a class='handle' href=javascript:setSortTpls('" + uid + "','down') title='下移'><i class='fa fa-arrow-circle-o-down'></i></a></li>"));
		if (id != '' && id == uid) {
			$(element).addClass('selected');
		}
		$("#helper_tool_nav").find("ul").append(element);

		var target = this;
		$(element).click(function() {
			$(this).addClass('selected');
			$(this).siblings().removeClass('selected');
			$('html, body').animate({
				scrollTop: $(target).offset().top - 100
			}, 500);
			if ($(target).is(":input")) {
				$(target).focus();
			} else {
				$(target).find(":input").first().focus();
			}
		});
		count++;
	});

	$("#helper_tool_nav").find(".count").html(count);

	// 为了实现与模板助手的互动
	$('.drop-item').mouseover(function() {
		var id = $(this).attr('id');
		$('#helper_' + id).addClass('hover');
	});

	$('.drop-item').mouseout(function() {
		var id = $(this).attr('id');
		$('#helper_' + id).removeClass('hover');
	});

	$("#helper_tool_nav").find('ul').sortable({
		revert: true,
		tolerance: 'intersect',
		opacity: 0.6,
		out: function(event, ui) {
			savesortHelper();
		}
	});
}

var _timer = {};
function delay_till_last(id, fn, wait) {

	if (_timer[id]) {
		window.clearTimeout(_timer[id]);
		delete _timer[id];
	}

	return _timer[id] = window.setTimeout(function() {
		fn();
		delete _timer[id];
	}, wait);
}

// 刷新当前模板 传入uid可以刷新对应模板 uid为空刷新所有模板
function refreshTpl(page, uid) {
	clearTplData();
	$.ajax({
		type: 'get',
		async: false, // 同步请求
		url: "tpl-ref",
		dataType: 'json',
		data: {
			page: page,
			uid: uid,
		},
		beforeSend: function() {
			// $.loading.start();
		},
		success: function(tpls) {
			if (uid == undefined || uid == '') {
				$('.SZY-TEMPLATE-NAV-CONTAINER').html('');
				$('.SZY-TEMPLATE-MAIN-CONTAINER').html('');
			}
			$.each(tpls, function(index, value) {
				var $el = $(value.file);
				var is_valid_class = '';
				if (value.is_valid > 0) {
					is_valid_class = 'fa fa-check-circle-o';
				} else {
					is_valid_class = 'fa fa-times-circle-o';
				}
				if (value.type == NAV_CAT_TPL) {
					$el.append($('<button type="button" class="decor-btn sort-tpls" data-uid="' + value.uid + '" data-sort="up"><i class="fa fa-arrow-circle-o-up"></i></button>'));
					$el.append($('<button type="button" class="decor-btn sort-tpls" data-uid="' + value.uid + '" data-sort="down"><i class="fa fa-arrow-circle-o-down"></i></button>'));
					$el.append($('<button type="button" class="decor-btn is-valid-tpls" data-uid="' + value.uid + '"><i class="' + is_valid_class + '"></i></button>'));
					$el.append($('<button type="button" class="decor-btn del-tpls" data-uid="' + value.uid + '"><i class="fa fa-trash-o"></i></button>'));
					if (uid == undefined || uid == '') {
						$('.SZY-TEMPLATE-NAV-CONTAINER').append($el);
					} else {
						$('.SZY-TEMPLATE-NAV-CONTAINER').find("#" + value.uid).replaceWith($el);
					}
				} else {

					$el.append($('<button type="button" class="decor-btn"><i class="fa fa-arrow-circle-o-up"></i>上移</button>').click(function() {
						setSortTpls(value.uid, 'up');
					}));
					$el.append($('<button type="button" class="decor-btn"><i class="fa fa-arrow-circle-o-down"></i>下移</button>').click(function() {
						setSortTpls(value.uid, 'down');
					}));
					$el.append($('<button type="button" class="decor-btn"><i class="' + is_valid_class + '"></i>' + value.format_is_valid + '</span></button>').click(function() {
						setIsValidTpls(value.uid);
					}));
					$el.append($('<button type="button" class="decor-btn"><i class="fa fa-trash-o"></i>删除</button>').click(function() {
						delTpls(value.uid);
					}));
					if (uid == undefined || uid == '') {
						$('.SZY-TEMPLATE-MAIN-CONTAINER').append($el);
					} else {
						$('.SZY-TEMPLATE-MAIN-CONTAINER').find("#" + value.uid).replaceWith($el);
					}
				}
			});

			// 从新加载图片
			$.imgloading.loading();
			// 生成模板助手
			getHelper(uid);
		}
	});
}

// 刷新头部
function ajaxRender(page, tpl, container) {
	// 如果没有模板文件则刷新页面
	if (tpl == undefined || tpl == '') {
		$.go(window.location);
		return;
	}
	// 判断是否存在分类导航模板
	$nav_container = '';
	if ($('.SZY-TEMPLATE-NAV-CONTAINER').length > 0 && container == '.SZY-TPL-HEADER') {
		$nav_container = $.parseHTML($('.SZY-TEMPLATE-NAV-CONTAINER').html());
	}
	$.ajax({
		type: 'get',
		async: false, // 同步请求
		url: "ajax-render",
		dataType: 'json',
		data: {
			page: page,
			tpl: tpl
		},
		success: function(result) {
			if (result.code == 0) {
				$(container).html($.parseHTML(result.data));
				if ($('.SZY-TEMPLATE-NAV-CONTAINER').length > 0 && container == '.SZY-TPL-HEADER') {
					$('.SZY-TEMPLATE-NAV-CONTAINER').html($nav_container);
				}
			}

		}
	});

}
