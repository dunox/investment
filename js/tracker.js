/*** Script File: /assets/161cbb97/jquery.ba-bbq.min.js, Original size: 4,802, Compressed size: 4,802 ***/
/*
 * jQuery BBQ: Back Button & Query Library - v1.3pre - 8/26/2010
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($, r) {
  var h, n = Array.prototype.slice,
      t = decodeURIComponent,
      a = $.param,
      j, c, m, y, b = $.bbq = $.bbq || {},
      s, x, k, e = $.event.special,
      d = "hashchange",
      B = "querystring",
      F = "fragment",
      z = "elemUrlAttr",
      l = "href",
      w = "src",
      p = /^.*\?|#.*$/g,
      u, H, g, i, C, E = {};

  function G(I) {
      return typeof I === "string"
  }

  function D(J) {
      var I = n.call(arguments, 1);
      return function() {
          return J.apply(this, I.concat(n.call(arguments)))
      }
  }

  function o(I) {
      return I.replace(H, "$2")
  }

  function q(I) {
      return I.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1")
  }

  function f(K, P, I, L, J) {
      var R, O, N, Q, M;
      if (L !== h) {
          N = I.match(K ? H : /^([^#?]*)\??([^#]*)(#?.*)/);
          M = N[3] || "";
          if (J === 2 && G(L)) {
              O = L.replace(K ? u : p, "")
          } else {
              Q = m(N[2]);
              L = G(L) ? m[K ? F : B](L) : L;
              O = J === 2 ? L : J === 1 ? $.extend({}, L, Q) : $.extend({}, Q, L);
              O = j(O);
              if (K) {
                  O = O.replace(g, t)
              }
          }
          R = N[1] + (K ? C : O || !N[1] ? "?" : "") + O + M
      } else {
          R = P(I !== h ? I : location.href)
      }
      return R
  }
  a[B] = D(f, 0, q);
  a[F] = c = D(f, 1, o);
  a.sorted = j = function(J, K) {
      var I = [],
          L = {};
      $.each(a(J, K).split("&"), function(P, M) {
          var O = M.replace(/(?:%5B|=).*$/, ""),
              N = L[O];
          if (!N) {
              N = L[O] = [];
              I.push(O)
          }
          N.push(M)
      });
      return $.map(I.sort(), function(M) {
          return L[M]
      }).join("&")
  };
  c.noEscape = function(J) {
      J = J || "";
      var I = $.map(J.split(""), encodeURIComponent);
      g = new RegExp(I.join("|"), "g")
  };
  c.noEscape(",/");
  c.ajaxCrawlable = function(I) {
      if (I !== h) {
          if (I) {
              u = /^.*(?:#!|#)/;
              H = /^([^#]*)(?:#!|#)?(.*)$/;
              C = "#!"
          } else {
              u = /^.*#/;
              H = /^([^#]*)#?(.*)$/;
              C = "#"
          }
          i = !!I
      }
      return i
  };
  c.ajaxCrawlable(0);
  $.deparam = m = function(L, I) {
      var K = {},
          J = {
              "true": !0,
              "false": !1,
              "null": null
          };
      $.each(L.replace(/\+/g, " ").split("&"), function(O, T) {
          var N = T.split("="),
              S = t(N[0]),
              M, R = K,
              P = 0,
              U = S.split("]["),
              Q = U.length - 1;
          if (/\[/.test(U[0]) && /\]$/.test(U[Q])) {
              U[Q] = U[Q].replace(/\]$/, "");
              U = U.shift().split("[").concat(U);
              Q = U.length - 1
          } else {
              Q = 0
          }
          if (N.length === 2) {
              M = t(N[1]);
              if (I) {
                  M = M && !isNaN(M) ? +M : M === "undefined" ? h : J[M] !== h ? J[M] : M
              }
              if (Q) {
                  for (; P <= Q; P++) {
                      S = U[P] === "" ? R.length : U[P];
                      R = R[S] = P < Q ? R[S] || (U[P + 1] && isNaN(U[P + 1]) ? {} : []) : M
                  }
              } else {
                  if ($.isArray(K[S])) {
                      K[S].push(M)
                  } else {
                      if (K[S] !== h) {
                          K[S] = [K[S], M]
                      } else {
                          K[S] = M
                      }
                  }
              }
          } else {
              if (S) {
                  K[S] = I ? h : ""
              }
          }
      });
      return K
  };

  function A(K, I, J) {
      if (I === h || typeof I === "boolean") {
          J = I;
          I = a[K ? F : B]()
      } else {
          I = G(I) ? I.replace(K ? u : p, "") : I
      }
      return m(I, J)
  }
  m[B] = D(A, 0);
  m[F] = y = D(A, 1);
  $[z] || ($[z] = function(I) {
      return $.extend(E, I)
  })({
      a: l,
      base: l,
      iframe: w,
      img: w,
      input: w,
      form: "action",
      link: l,
      script: w
  });
  k = $[z];

  function v(L, J, K, I) {
      if (!G(K) && typeof K !== "object") {
          I = K;
          K = J;
          J = h
      }
      return this.each(function() {
          var O = $(this),
              M = J || k()[(this.nodeName || "").toLowerCase()] || "",
              N = M && O.attr(M) || "";
          O.attr(M, a[L](N, K, I))
      })
  }
  $.fn[B] = D(v, B);
  $.fn[F] = D(v, F);
  b.pushState = s = function(L, I) {
      if (G(L) && /^#/.test(L) && I === h) {
          I = 2
      }
      var K = L !== h,
          J = c(location.href, K ? L : {}, K ? I : 2);
      location.href = J
  };
  b.getState = x = function(I, J) {
      return I === h || typeof I === "boolean" ? y(I) : y(J)[I]
  };
  b.removeState = function(I) {
      var J = {};
      if (I !== h) {
          J = x();
          $.each($.isArray(I) ? I : arguments, function(L, K) {
              delete J[K]
          })
      }
      s(J, 2)
  };
  e[d] = $.extend(e[d], {
      add: function(I) {
          var K;

          function J(M) {
              var L = M[F] = c();
              M.getState = function(N, O) {
                  return N === h || typeof N === "boolean" ? m(L, N) : m(L, O)[N]
              };
              K.apply(this, arguments)
          }
          if ($.isFunction(I)) {
              K = I;
              return J
          } else {
              K = I.handler;
              I.handler = J
          }
      }
  })
})(jQuery, this);
/*
* jQuery hashchange event - v1.3 - 7/21/2010
* http://benalman.com/projects/jquery-hashchange-plugin/
* 
* Copyright (c) 2010 "Cowboy" Ben Alman
* Dual licensed under the MIT and GPL licenses.
* http://benalman.com/about/license/
*/
(function($, e, b) {
  var c = "hashchange",
      h = document,
      f, g = $.event.special,
      i = h.documentMode,
      d = "on" + c in e && (i === b || i > 7);

  function a(j) {
      j = j || location.href;
      return "#" + j.replace(/^[^#]*#?(.*)$/, "$1")
  }
  $.fn[c] = function(j) {
      return j ? this.bind(c, j) : this.trigger(c)
  };
  $.fn[c].delay = 50;
  g[c] = $.extend(g[c], {
      setup: function() {
          if (d) {
              return false
          }
          $(f.start)
      },
      teardown: function() {
          if (d) {
              return false
          }
          $(f.stop)
      }
  });
  f = (function() {
      var j = {},
          p, m = a(),
          k = function(q) {
              return q
          },
          l = k,
          o = k;
      j.start = function() {
          p || n()
      };
      j.stop = function() {
          p && clearTimeout(p);
          p = b
      };

      function n() {
          var r = a(),
              q = o(m);
          if (r !== m) {
              l(m = r, q);
              $(e).trigger(c)
          } else {
              if (q !== m) {
                  location.href = location.href.replace(/#.*/, "") + q
              }
          }
          p = setTimeout(n, $.fn[c].delay)
      }!d && (function() {
          var q, r;
          j.start = function() {
              if (!q) {
                  r = $.fn[c].src;
                  r = r && r + a();
                  q = $('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
                      r || l(a());
                      n()
                  }).attr("src", r || "javascript:0").insertAfter("body")[0].contentWindow;
                  h.onpropertychange = function() {
                      try {
                          if (event.propertyName === "title") {
                              q.document.title = h.title
                          }
                      } catch (s) {}
                  }
              }
          };
          j.stop = k;
          o = function() {
              return a(q.location.href)
          };
          l = function(v, s) {
              var u = q.document,
                  t = $.fn[c].domain;
              if (v !== s) {
                  u.title = h.title;
                  u.open();
                  t && u.write('<script>document.domain="' + t + '"<\/script>');
                  u.close();
                  q.location.hash = v
              }
          }
      })();
      return j
  })()
})(jQuery, this);

;
/*** Script File: /assets/161cbb97/jquery.cookie.js, Original size: 3,937, Compressed size: 971 ***/
jQuery.cookie = function(name, value, options) {
  if (typeof value != 'undefined') {
      options = options || {};
      if (value === null) {
          value = '';
          options.expires = -1
      };
      var expires = '';
      if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
          var date;
          if (typeof options.expires == 'number') {
              date = new Date();
              date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1e3))
          } else date = options.expires;
          expires = '; expires=' + date.toUTCString()
      };
      var path = options.path ? '; path=' + options.path : '',
          domain = options.domain ? '; domain=' + options.domain : '',
          secure = options.secure ? '; secure' : '';
      document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('')
  } else {
      var cookieValue = null;
      if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
              var cookie = jQuery.trim(cookies[i]);
              if (cookie.substring(0, name.length + 1) == (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break
              }
          }
      };
      return cookieValue
  }
};
/*** Script File: /assets/161cbb97/jquery.yiiactiveform.js, Original size: 14,540, Compressed size: 7,803 ***/
(function($) {
  var getAFValue = function(o) {
      var type, c = [];
      if (!o.length) return undefined;
      if (o[0].tagName.toLowerCase() === 'span') {
          o.find(':checked').each(function() {
              c.push(this.value)
          });
          return c.join(',')
      };
      type = o.attr('type');
      if (type === 'checkbox' || type === 'radio') {
          return o.filter(':checked').val()
      } else return o.val()
  };
  $.fn.yiiactiveform = function(options) {
      return this.each(function() {
          var settings = $.extend({}, $.fn.yiiactiveform.defaults, options || {}),
              $form = $(this);
          if (settings.validationUrl === undefined) settings.validationUrl = $form.attr('action');
          $.each(settings.attributes, function(i) {
              this.value = getAFValue($form.find('#' + this.inputID));
              settings.attributes[i] = $.extend({}, {
                  validationDelay: settings.validationDelay,
                  validateOnChange: settings.validateOnChange,
                  validateOnType: settings.validateOnType,
                  hideErrorMessage: settings.hideErrorMessage,
                  inputContainer: settings.inputContainer,
                  errorCssClass: settings.errorCssClass,
                  successCssClass: settings.successCssClass,
                  beforeValidateAttribute: settings.beforeValidateAttribute,
                  afterValidateAttribute: settings.afterValidateAttribute,
                  validatingCssClass: settings.validatingCssClass
              }, this)
          });
          $form.data('settings', settings);
          settings.submitting = false;
          var validate = function(attribute, forceValidate) {
              if (forceValidate) attribute.status = 2;
              $.each(settings.attributes, function() {
                  if (this.value !== getAFValue($form.find('#' + this.inputID))) {
                      this.status = 2;
                      forceValidate = true
                  }
              });
              if (!forceValidate) return;
              if (settings.timer !== undefined) clearTimeout(settings.timer);
              settings.timer = setTimeout(function() {
                  if (settings.submitting || $form.is(':hidden')) return;
                  if (attribute.beforeValidateAttribute === undefined || attribute.beforeValidateAttribute($form, attribute)) {
                      $.each(settings.attributes, function() {
                          if (this.status === 2) {
                              this.status = 3;
                              $.fn.yiiactiveform.getInputContainer(this, $form).addClass(this.validatingCssClass)
                          }
                      });
                      $.fn.yiiactiveform.validate($form, function(data) {
                          var hasError = false;
                          $.each(settings.attributes, function() {
                              if (this.status === 2 || this.status === 3) hasError = $.fn.yiiactiveform.updateInput(this, data, $form) || hasError
                          });
                          if (attribute.afterValidateAttribute !== undefined) attribute.afterValidateAttribute($form, attribute, data, hasError)
                      })
                  }
              }, attribute.validationDelay)
          };
          $.each(settings.attributes, function(i, attribute) {
              if (this.validateOnChange) $form.find('#' + this.inputID).change(function() {
                  validate(attribute, false)
              }).blur(function() {
                  if (attribute.status !== 2 && attribute.status !== 3) validate(attribute, !attribute.status)
              });
              if (this.validateOnType) $form.find('#' + this.inputID).keyup(function() {
                  if (attribute.value !== getAFValue($(this))) validate(attribute, false)
              })
          });
          if (settings.validateOnSubmit) {
              $form.on('mouseup keyup', ':submit', function() {
                  $form.data('submitObject', $(this))
              });
              var validated = false;
              $form.submit(function() {
                  if (validated) {
                      validated = false;
                      return true
                  };
                  if (settings.timer !== undefined) clearTimeout(settings.timer);
                  settings.submitting = true;
                  if (settings.beforeValidate === undefined || settings.beforeValidate($form)) {
                      $.fn.yiiactiveform.validate($form, function(data) {
                          var hasError = false;
                          $.each(settings.attributes, function() {
                              hasError = $.fn.yiiactiveform.updateInput(this, data, $form) || hasError
                          });
                          $.fn.yiiactiveform.updateSummary($form, data);
                          if (settings.afterValidate === undefined || settings.afterValidate($form, data, hasError))
                              if (!hasError) {
                                  validated = true;
                                  var $button = $form.data('submitObject') || $form.find(':submit:first');
                                  if ($button.length) {
                                      $button.click()
                                  } else $form.submit();
                                  return
                              };
                          settings.submitting = false
                      })
                  } else settings.submitting = false;
                  return false
              })
          };
          $form.bind('reset', function() {
              setTimeout(function() {
                  $.each(settings.attributes, function() {
                      this.status = 0;
                      var $error = $form.find('#' + this.errorID),
                          $container = $.fn.yiiactiveform.getInputContainer(this, $form);
                      $container.removeClass(this.validatingCssClass + ' ' + this.errorCssClass + ' ' + this.successCssClass);
                      $error.html('').hide();
                      this.value = getAFValue($form.find('#' + this.inputID))
                  });
                  $form.find('label, :input').each(function() {
                      $(this).removeClass(settings.errorCss)
                  });
                  $('#' + settings.summaryID).hide().find('ul').html('');
                  if (settings.focus !== undefined && !window.location.hash) $form.find(settings.focus).focus()
              }, 1)
          });
          if (settings.focus !== undefined && !window.location.hash) $form.find(settings.focus).focus()
      })
  };
  $.fn.yiiactiveform.getInputContainer = function(attribute, form) {
      if (attribute.inputContainer === undefined) {
          return form.find('#' + attribute.inputID).closest('div')
      } else return form.find(attribute.inputContainer).filter(':has("#' + attribute.inputID + '")')
  };
  $.fn.yiiactiveform.updateInput = function(attribute, messages, form) {
      attribute.status = 1;
      var $error, $container, hasError = false,
          $el = form.find('#' + attribute.inputID),
          errorCss = form.data('settings').errorCss;
      if ($el.length) {
          hasError = messages !== null && $.isArray(messages[attribute.id]) && messages[attribute.id].length > 0;
          $error = form.find('#' + attribute.errorID);
          $container = $.fn.yiiactiveform.getInputContainer(attribute, form);
          $container.removeClass(attribute.validatingCssClass + ' ' + attribute.errorCssClass + ' ' + attribute.successCssClass);
          $container.find('label, :input').each(function() {
              $(this).removeClass(errorCss)
          });
          if (hasError) {
              $error.html(messages[attribute.id][0]);
              $container.addClass(attribute.errorCssClass)
          } else if (attribute.enableAjaxValidation || attribute.clientValidation) $container.addClass(attribute.successCssClass);
          if (!attribute.hideErrorMessage) $error.toggle(hasError);
          attribute.value = getAFValue($el)
      };
      return hasError
  };
  $.fn.yiiactiveform.updateSummary = function(form, messages) {
      var settings = $(form).data('settings'),
          content = '';
      if (settings.summaryID === undefined) return;
      if (messages) {
          var summaryAttributes = [];
          for (var i in settings.attributes)
              if (settings.attributes[i].summary) summaryAttributes.push(settings.attributes[i].id);
          $.each(settings.attributes, function() {
              if ($.inArray(this.id, summaryAttributes) !== -1 && $.isArray(messages[this.id])) $.each(messages[this.id], function(j, message) {
                  content = content + '<li>' + message + '</li>'
              })
          })
      };
      $('#' + settings.summaryID).toggle(content !== '').find('ul').html(content)
  };
  $.fn.yiiactiveform.validate = function(form, successCallback, errorCallback) {
      var $form = $(form),
          settings = $form.data('settings'),
          needAjaxValidation = false,
          messages = {};
      $.each(settings.attributes, function() {
          var value, msg = [];
          if (this.clientValidation !== undefined && (settings.submitting || this.status === 2 || this.status === 3)) {
              value = getAFValue($form.find('#' + this.inputID));
              this.clientValidation(value, msg, this);
              if (msg.length) messages[this.id] = msg
          };
          if (this.enableAjaxValidation && !msg.length && (settings.submitting || this.status === 2 || this.status === 3)) needAjaxValidation = true
      });
      if (!needAjaxValidation || settings.submitting && !$.isEmptyObject(messages)) {
          if (settings.submitting) {
              setTimeout(function() {
                  successCallback(messages)
              }, 200)
          } else successCallback(messages);
          return
      };
      var $button = $form.data('submitObject'),
          extData = '&' + settings.ajaxVar + '=' + $form.attr('id');
      if ($button && $button.length) extData += '&' + $button.attr('name') + '=' + $button.attr('value');
      $.ajax({
          url: settings.validationUrl,
          type: $form.attr('method'),
          data: $form.serialize() + extData,
          dataType: 'json',
          success: function(data) {
              if (data !== null && typeof data === 'object') {
                  $.each(settings.attributes, function() {
                      if (!this.enableAjaxValidation) delete data[this.id]
                  });
                  successCallback($.extend({}, messages, data))
              } else successCallback(messages)
          },
          error: function() {
              if (errorCallback !== undefined) errorCallback()
          }
      })
  };
  $.fn.yiiactiveform.getSettings = function(form) {
      return $(form).data('settings')
  };
  $.fn.yiiactiveform.defaults = {
      ajaxVar: 'ajax',
      validationUrl: undefined,
      validationDelay: 200,
      validateOnSubmit: false,
      validateOnChange: true,
      validateOnType: false,
      hideErrorMessage: false,
      inputContainer: undefined,
      errorCss: 'error',
      errorCssClass: 'error',
      successCssClass: 'success',
      validatingCssClass: 'validating',
      summaryID: undefined,
      timer: undefined,
      beforeValidateAttribute: undefined,
      afterValidateAttribute: undefined,
      beforeValidate: undefined,
      afterValidate: undefined,
      focus: undefined,
      attributes: []
  }
})(jQuery);
/*** Script File: /f/js/jquery_ui.min.js, Original size: 228,539, Compressed size: 228,539 ***/
/*! jQuery UI - v1.10.4 - 2014-01-17
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.effect.js, jquery.ui.effect-blind.js, jquery.ui.effect-bounce.js, jquery.ui.effect-clip.js, jquery.ui.effect-drop.js, jquery.ui.effect-explode.js, jquery.ui.effect-fade.js, jquery.ui.effect-fold.js, jquery.ui.effect-highlight.js, jquery.ui.effect-pulsate.js, jquery.ui.effect-scale.js, jquery.ui.effect-shake.js, jquery.ui.effect-slide.js, jquery.ui.effect-transfer.js, jquery.ui.menu.js, jquery.ui.progressbar.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.slider.js, jquery.ui.sortable.js, jquery.ui.spinner.js, jquery.ui.tabs.js, jquery.ui.tooltip.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

(function(e, t) {
  function i(t, i) {
      var s, a, o, r = t.nodeName.toLowerCase();
      return "area" === r ? (s = t.parentNode, a = s.name, t.href && a && "map" === s.nodeName.toLowerCase() ? (o = e("img[usemap=#" + a + "]")[0], !!o && n(o)) : !1) : (/input|select|textarea|button|object/.test(r) ? !t.disabled : "a" === r ? t.href || i : i) && n(t)
  }

  function n(t) {
      return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
          return "hidden" === e.css(this, "visibility")
      }).length
  }
  var s = 0,
      a = /^ui-id-\d+$/;
  e.ui = e.ui || {}, e.extend(e.ui, {
      version: "1.10.4",
      keyCode: {
          BACKSPACE: 8,
          COMMA: 188,
          DELETE: 46,
          DOWN: 40,
          END: 35,
          ENTER: 13,
          ESCAPE: 27,
          HOME: 36,
          LEFT: 37,
          NUMPAD_ADD: 107,
          NUMPAD_DECIMAL: 110,
          NUMPAD_DIVIDE: 111,
          NUMPAD_ENTER: 108,
          NUMPAD_MULTIPLY: 106,
          NUMPAD_SUBTRACT: 109,
          PAGE_DOWN: 34,
          PAGE_UP: 33,
          PERIOD: 190,
          RIGHT: 39,
          SPACE: 32,
          TAB: 9,
          UP: 38
      }
  }), e.fn.extend({
      focus: function(t) {
          return function(i, n) {
              return "number" == typeof i ? this.each(function() {
                  var t = this;
                  setTimeout(function() {
                      e(t).focus(), n && n.call(t)
                  }, i)
              }) : t.apply(this, arguments)
          }
      }(e.fn.focus),
      scrollParent: function() {
          var t;
          return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
              return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
          }).eq(0) : this.parents().filter(function() {
              return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
          }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
      },
      zIndex: function(i) {
          if (i !== t) return this.css("zIndex", i);
          if (this.length)
              for (var n, s, a = e(this[0]); a.length && a[0] !== document;) {
                  if (n = a.css("position"), ("absolute" === n || "relative" === n || "fixed" === n) && (s = parseInt(a.css("zIndex"), 10), !isNaN(s) && 0 !== s)) return s;
                  a = a.parent()
              }
          return 0
      },
      uniqueId: function() {
          return this.each(function() {
              this.id || (this.id = "ui-id-" + ++s)
          })
      },
      removeUniqueId: function() {
          return this.each(function() {
              a.test(this.id) && e(this).removeAttr("id")
          })
      }
  }), e.extend(e.expr[":"], {
      data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
          return function(i) {
              return !!e.data(i, t)
          }
      }) : function(t, i, n) {
          return !!e.data(t, n[3])
      },
      focusable: function(t) {
          return i(t, !isNaN(e.attr(t, "tabindex")))
      },
      tabbable: function(t) {
          var n = e.attr(t, "tabindex"),
              s = isNaN(n);
          return (s || n >= 0) && i(t, !s)
      }
  }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(i, n) {
      function s(t, i, n, s) {
          return e.each(a, function() {
              i -= parseFloat(e.css(t, "padding" + this)) || 0, n && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), s && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
          }), i
      }
      var a = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"],
          o = n.toLowerCase(),
          r = {
              innerWidth: e.fn.innerWidth,
              innerHeight: e.fn.innerHeight,
              outerWidth: e.fn.outerWidth,
              outerHeight: e.fn.outerHeight
          };
      e.fn["inner" + n] = function(i) {
          return i === t ? r["inner" + n].call(this) : this.each(function() {
              e(this).css(o, s(this, i) + "px")
          })
      }, e.fn["outer" + n] = function(t, i) {
          return "number" != typeof t ? r["outer" + n].call(this, t) : this.each(function() {
              e(this).css(o, s(this, t, !0, i) + "px")
          })
      }
  }), e.fn.addBack || (e.fn.addBack = function(e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
  }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
      return function(i) {
          return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
      }
  }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.support.selectstart = "onselectstart" in document.createElement("div"), e.fn.extend({
      disableSelection: function() {
          return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
              e.preventDefault()
          })
      },
      enableSelection: function() {
          return this.unbind(".ui-disableSelection")
      }
  }), e.extend(e.ui, {
      plugin: {
          add: function(t, i, n) {
              var s, a = e.ui[t].prototype;
              for (s in n) a.plugins[s] = a.plugins[s] || [], a.plugins[s].push([i, n[s]])
          },
          call: function(e, t, i) {
              var n, s = e.plugins[t];
              if (s && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)
                  for (n = 0; s.length > n; n++) e.options[s[n][0]] && s[n][1].apply(e.element, i)
          }
      },
      hasScroll: function(t, i) {
          if ("hidden" === e(t).css("overflow")) return !1;
          var n = i && "left" === i ? "scrollLeft" : "scrollTop",
              s = !1;
          return t[n] > 0 ? !0 : (t[n] = 1, s = t[n] > 0, t[n] = 0, s)
      }
  })
})(jQuery);
(function(t, e) {
  var i = 0,
      s = Array.prototype.slice,
      n = t.cleanData;
  t.cleanData = function(e) {
      for (var i, s = 0; null != (i = e[s]); s++) try {
          t(i).triggerHandler("remove")
      } catch (o) {}
      n(e)
  }, t.widget = function(i, s, n) {
      var o, a, r, h, l = {},
          c = i.split(".")[0];
      i = i.split(".")[1], o = c + "-" + i, n || (n = s, s = t.Widget), t.expr[":"][o.toLowerCase()] = function(e) {
          return !!t.data(e, o)
      }, t[c] = t[c] || {}, a = t[c][i], r = t[c][i] = function(t, i) {
          return this._createWidget ? (arguments.length && this._createWidget(t, i), e) : new r(t, i)
      }, t.extend(r, a, {
          version: n.version,
          _proto: t.extend({}, n),
          _childConstructors: []
      }), h = new s, h.options = t.widget.extend({}, h.options), t.each(n, function(i, n) {
          return t.isFunction(n) ? (l[i] = function() {
              var t = function() {
                      return s.prototype[i].apply(this, arguments)
                  },
                  e = function(t) {
                      return s.prototype[i].apply(this, t)
                  };
              return function() {
                  var i, s = this._super,
                      o = this._superApply;
                  return this._super = t, this._superApply = e, i = n.apply(this, arguments), this._super = s, this._superApply = o, i
              }
          }(), e) : (l[i] = n, e)
      }), r.prototype = t.widget.extend(h, {
          widgetEventPrefix: a ? h.widgetEventPrefix || i : i
      }, l, {
          constructor: r,
          namespace: c,
          widgetName: i,
          widgetFullName: o
      }), a ? (t.each(a._childConstructors, function(e, i) {
          var s = i.prototype;
          t.widget(s.namespace + "." + s.widgetName, r, i._proto)
      }), delete a._childConstructors) : s._childConstructors.push(r), t.widget.bridge(i, r)
  }, t.widget.extend = function(i) {
      for (var n, o, a = s.call(arguments, 1), r = 0, h = a.length; h > r; r++)
          for (n in a[r]) o = a[r][n], a[r].hasOwnProperty(n) && o !== e && (i[n] = t.isPlainObject(o) ? t.isPlainObject(i[n]) ? t.widget.extend({}, i[n], o) : t.widget.extend({}, o) : o);
      return i
  }, t.widget.bridge = function(i, n) {
      var o = n.prototype.widgetFullName || i;
      t.fn[i] = function(a) {
          var r = "string" == typeof a,
              h = s.call(arguments, 1),
              l = this;
          return a = !r && h.length ? t.widget.extend.apply(null, [a].concat(h)) : a, r ? this.each(function() {
              var s, n = t.data(this, o);
              return n ? t.isFunction(n[a]) && "_" !== a.charAt(0) ? (s = n[a].apply(n, h), s !== n && s !== e ? (l = s && s.jquery ? l.pushStack(s.get()) : s, !1) : e) : t.error("no such method '" + a + "' for " + i + " widget instance") : t.error("cannot call methods on " + i + " prior to initialization; " + "attempted to call method '" + a + "'")
          }) : this.each(function() {
              var e = t.data(this, o);
              e ? e.option(a || {})._init() : t.data(this, o, new n(a, this))
          }), l
      }
  }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
      widgetName: "widget",
      widgetEventPrefix: "",
      defaultElement: "<div>",
      options: {
          disabled: !1,
          create: null
      },
      _createWidget: function(e, s) {
          s = t(s || this.defaultElement || this)[0], this.element = t(s), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this.bindings = t(), this.hoverable = t(), this.focusable = t(), s !== this && (t.data(s, this.widgetFullName, this), this._on(!0, this.element, {
              remove: function(t) {
                  t.target === s && this.destroy()
              }
          }), this.document = t(s.style ? s.ownerDocument : s.document || s), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
      },
      _getCreateOptions: t.noop,
      _getCreateEventData: t.noop,
      _create: t.noop,
      _init: t.noop,
      destroy: function() {
          this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
      },
      _destroy: t.noop,
      widget: function() {
          return this.element
      },
      option: function(i, s) {
          var n, o, a, r = i;
          if (0 === arguments.length) return t.widget.extend({}, this.options);
          if ("string" == typeof i)
              if (r = {}, n = i.split("."), i = n.shift(), n.length) {
                  for (o = r[i] = t.widget.extend({}, this.options[i]), a = 0; n.length - 1 > a; a++) o[n[a]] = o[n[a]] || {}, o = o[n[a]];
                  if (i = n.pop(), 1 === arguments.length) return o[i] === e ? null : o[i];
                  o[i] = s
              } else {
                  if (1 === arguments.length) return this.options[i] === e ? null : this.options[i];
                  r[i] = s
              }
          return this._setOptions(r), this
      },
      _setOptions: function(t) {
          var e;
          for (e in t) this._setOption(e, t[e]);
          return this
      },
      _setOption: function(t, e) {
          return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!e).attr("aria-disabled", e), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
      },
      enable: function() {
          return this._setOption("disabled", !1)
      },
      disable: function() {
          return this._setOption("disabled", !0)
      },
      _on: function(i, s, n) {
          var o, a = this;
          "boolean" != typeof i && (n = s, s = i, i = !1), n ? (s = o = t(s), this.bindings = this.bindings.add(s)) : (n = s, s = this.element, o = this.widget()), t.each(n, function(n, r) {
              function h() {
                  return i || a.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof r ? a[r] : r).apply(a, arguments) : e
              }
              "string" != typeof r && (h.guid = r.guid = r.guid || h.guid || t.guid++);
              var l = n.match(/^(\w+)\s*(.*)$/),
                  c = l[1] + a.eventNamespace,
                  u = l[2];
              u ? o.delegate(u, c, h) : s.bind(c, h)
          })
      },
      _off: function(t, e) {
          e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(e).undelegate(e)
      },
      _delay: function(t, e) {
          function i() {
              return ("string" == typeof t ? s[t] : t).apply(s, arguments)
          }
          var s = this;
          return setTimeout(i, e || 0)
      },
      _hoverable: function(e) {
          this.hoverable = this.hoverable.add(e), this._on(e, {
              mouseenter: function(e) {
                  t(e.currentTarget).addClass("ui-state-hover")
              },
              mouseleave: function(e) {
                  t(e.currentTarget).removeClass("ui-state-hover")
              }
          })
      },
      _focusable: function(e) {
          this.focusable = this.focusable.add(e), this._on(e, {
              focusin: function(e) {
                  t(e.currentTarget).addClass("ui-state-focus")
              },
              focusout: function(e) {
                  t(e.currentTarget).removeClass("ui-state-focus")
              }
          })
      },
      _trigger: function(e, i, s) {
          var n, o, a = this.options[e];
          if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent)
              for (n in o) n in i || (i[n] = o[n]);
          return this.element.trigger(i, s), !(t.isFunction(a) && a.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
      }
  }, t.each({
      show: "fadeIn",
      hide: "fadeOut"
  }, function(e, i) {
      t.Widget.prototype["_" + e] = function(s, n, o) {
          "string" == typeof n && (n = {
              effect: n
          });
          var a, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : e;
          n = n || {}, "number" == typeof n && (n = {
              duration: n
          }), a = !t.isEmptyObject(n), n.complete = o, n.delay && s.delay(n.delay), a && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, o) : s.queue(function(i) {
              t(this)[e](), o && o.call(s[0]), i()
          })
      }
  })
})(jQuery);
(function(t) {
  var e = !1;
  t(document).mouseup(function() {
      e = !1
  }), t.widget("ui.mouse", {
      version: "1.10.4",
      options: {
          cancel: "input,textarea,button,select,option",
          distance: 1,
          delay: 0
      },
      _mouseInit: function() {
          var e = this;
          this.element.bind("mousedown." + this.widgetName, function(t) {
              return e._mouseDown(t)
          }).bind("click." + this.widgetName, function(i) {
              return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : undefined
          }), this.started = !1
      },
      _mouseDestroy: function() {
          this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
      },
      _mouseDown: function(i) {
          if (!e) {
              this._mouseStarted && this._mouseUp(i), this._mouseDownEvent = i;
              var s = this,
                  n = 1 === i.which,
                  a = "string" == typeof this.options.cancel && i.target.nodeName ? t(i.target).closest(this.options.cancel).length : !1;
              return n && !a && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                  s.mouseDelayMet = !0
              }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === t.data(i.target, this.widgetName + ".preventClickEvent") && t.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t) {
                  return s._mouseMove(t)
              }, this._mouseUpDelegate = function(t) {
                  return s._mouseUp(t)
              }, t(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), e = !0, !0)) : !0
          }
      },
      _mouseMove: function(e) {
          return t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button ? this._mouseUp(e) : this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
      },
      _mouseUp: function(e) {
          return t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), !1
      },
      _mouseDistanceMet: function(t) {
          return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
      },
      _mouseDelayMet: function() {
          return this.mouseDelayMet
      },
      _mouseStart: function() {},
      _mouseDrag: function() {},
      _mouseStop: function() {},
      _mouseCapture: function() {
          return !0
      }
  })
})(jQuery);
(function(t, e) {
  function i(t, e, i) {
      return [parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)]
  }

  function s(e, i) {
      return parseInt(t.css(e, i), 10) || 0
  }

  function n(e) {
      var i = e[0];
      return 9 === i.nodeType ? {
          width: e.width(),
          height: e.height(),
          offset: {
              top: 0,
              left: 0
          }
      } : t.isWindow(i) ? {
          width: e.width(),
          height: e.height(),
          offset: {
              top: e.scrollTop(),
              left: e.scrollLeft()
          }
      } : i.preventDefault ? {
          width: 0,
          height: 0,
          offset: {
              top: i.pageY,
              left: i.pageX
          }
      } : {
          width: e.outerWidth(),
          height: e.outerHeight(),
          offset: e.offset()
      }
  }
  t.ui = t.ui || {};
  var a, o = Math.max,
      r = Math.abs,
      l = Math.round,
      h = /left|center|right/,
      c = /top|center|bottom/,
      u = /[\+\-]\d+(\.[\d]+)?%?/,
      d = /^\w+/,
      p = /%$/,
      f = t.fn.position;
  t.position = {
          scrollbarWidth: function() {
              if (a !== e) return a;
              var i, s, n = t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                  o = n.children()[0];
              return t("body").append(n), i = o.offsetWidth, n.css("overflow", "scroll"), s = o.offsetWidth, i === s && (s = n[0].clientWidth), n.remove(), a = i - s
          },
          getScrollInfo: function(e) {
              var i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"),
                  s = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"),
                  n = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth,
                  a = "scroll" === s || "auto" === s && e.height < e.element[0].scrollHeight;
              return {
                  width: a ? t.position.scrollbarWidth() : 0,
                  height: n ? t.position.scrollbarWidth() : 0
              }
          },
          getWithinInfo: function(e) {
              var i = t(e || window),
                  s = t.isWindow(i[0]),
                  n = !!i[0] && 9 === i[0].nodeType;
              return {
                  element: i,
                  isWindow: s,
                  isDocument: n,
                  offset: i.offset() || {
                      left: 0,
                      top: 0
                  },
                  scrollLeft: i.scrollLeft(),
                  scrollTop: i.scrollTop(),
                  width: s ? i.width() : i.outerWidth(),
                  height: s ? i.height() : i.outerHeight()
              }
          }
      }, t.fn.position = function(e) {
          if (!e || !e.of) return f.apply(this, arguments);
          e = t.extend({}, e);
          var a, p, g, m, v, _, b = t(e.of),
              y = t.position.getWithinInfo(e.within),
              k = t.position.getScrollInfo(y),
              w = (e.collision || "flip").split(" "),
              D = {};
          return _ = n(b), b[0].preventDefault && (e.at = "left top"), p = _.width, g = _.height, m = _.offset, v = t.extend({}, m), t.each(["my", "at"], function() {
              var t, i, s = (e[this] || "").split(" ");
              1 === s.length && (s = h.test(s[0]) ? s.concat(["center"]) : c.test(s[0]) ? ["center"].concat(s) : ["center", "center"]), s[0] = h.test(s[0]) ? s[0] : "center", s[1] = c.test(s[1]) ? s[1] : "center", t = u.exec(s[0]), i = u.exec(s[1]), D[this] = [t ? t[0] : 0, i ? i[0] : 0], e[this] = [d.exec(s[0])[0], d.exec(s[1])[0]]
          }), 1 === w.length && (w[1] = w[0]), "right" === e.at[0] ? v.left += p : "center" === e.at[0] && (v.left += p / 2), "bottom" === e.at[1] ? v.top += g : "center" === e.at[1] && (v.top += g / 2), a = i(D.at, p, g), v.left += a[0], v.top += a[1], this.each(function() {
              var n, h, c = t(this),
                  u = c.outerWidth(),
                  d = c.outerHeight(),
                  f = s(this, "marginLeft"),
                  _ = s(this, "marginTop"),
                  x = u + f + s(this, "marginRight") + k.width,
                  C = d + _ + s(this, "marginBottom") + k.height,
                  M = t.extend({}, v),
                  T = i(D.my, c.outerWidth(), c.outerHeight());
              "right" === e.my[0] ? M.left -= u : "center" === e.my[0] && (M.left -= u / 2), "bottom" === e.my[1] ? M.top -= d : "center" === e.my[1] && (M.top -= d / 2), M.left += T[0], M.top += T[1], t.support.offsetFractions || (M.left = l(M.left), M.top = l(M.top)), n = {
                  marginLeft: f,
                  marginTop: _
              }, t.each(["left", "top"], function(i, s) {
                  t.ui.position[w[i]] && t.ui.position[w[i]][s](M, {
                      targetWidth: p,
                      targetHeight: g,
                      elemWidth: u,
                      elemHeight: d,
                      collisionPosition: n,
                      collisionWidth: x,
                      collisionHeight: C,
                      offset: [a[0] + T[0], a[1] + T[1]],
                      my: e.my,
                      at: e.at,
                      within: y,
                      elem: c
                  })
              }), e.using && (h = function(t) {
                  var i = m.left - M.left,
                      s = i + p - u,
                      n = m.top - M.top,
                      a = n + g - d,
                      l = {
                          target: {
                              element: b,
                              left: m.left,
                              top: m.top,
                              width: p,
                              height: g
                          },
                          element: {
                              element: c,
                              left: M.left,
                              top: M.top,
                              width: u,
                              height: d
                          },
                          horizontal: 0 > s ? "left" : i > 0 ? "right" : "center",
                          vertical: 0 > a ? "top" : n > 0 ? "bottom" : "middle"
                      };
                  u > p && p > r(i + s) && (l.horizontal = "center"), d > g && g > r(n + a) && (l.vertical = "middle"), l.important = o(r(i), r(s)) > o(r(n), r(a)) ? "horizontal" : "vertical", e.using.call(this, t, l)
              }), c.offset(t.extend(M, {
                  using: h
              }))
          })
      }, t.ui.position = {
          fit: {
              left: function(t, e) {
                  var i, s = e.within,
                      n = s.isWindow ? s.scrollLeft : s.offset.left,
                      a = s.width,
                      r = t.left - e.collisionPosition.marginLeft,
                      l = n - r,
                      h = r + e.collisionWidth - a - n;
                  e.collisionWidth > a ? l > 0 && 0 >= h ? (i = t.left + l + e.collisionWidth - a - n, t.left += l - i) : t.left = h > 0 && 0 >= l ? n : l > h ? n + a - e.collisionWidth : n : l > 0 ? t.left += l : h > 0 ? t.left -= h : t.left = o(t.left - r, t.left)
              },
              top: function(t, e) {
                  var i, s = e.within,
                      n = s.isWindow ? s.scrollTop : s.offset.top,
                      a = e.within.height,
                      r = t.top - e.collisionPosition.marginTop,
                      l = n - r,
                      h = r + e.collisionHeight - a - n;
                  e.collisionHeight > a ? l > 0 && 0 >= h ? (i = t.top + l + e.collisionHeight - a - n, t.top += l - i) : t.top = h > 0 && 0 >= l ? n : l > h ? n + a - e.collisionHeight : n : l > 0 ? t.top += l : h > 0 ? t.top -= h : t.top = o(t.top - r, t.top)
              }
          },
          flip: {
              left: function(t, e) {
                  var i, s, n = e.within,
                      a = n.offset.left + n.scrollLeft,
                      o = n.width,
                      l = n.isWindow ? n.scrollLeft : n.offset.left,
                      h = t.left - e.collisionPosition.marginLeft,
                      c = h - l,
                      u = h + e.collisionWidth - o - l,
                      d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
                      p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
                      f = -2 * e.offset[0];
                  0 > c ? (i = t.left + d + p + f + e.collisionWidth - o - a, (0 > i || r(c) > i) && (t.left += d + p + f)) : u > 0 && (s = t.left - e.collisionPosition.marginLeft + d + p + f - l, (s > 0 || u > r(s)) && (t.left += d + p + f))
              },
              top: function(t, e) {
                  var i, s, n = e.within,
                      a = n.offset.top + n.scrollTop,
                      o = n.height,
                      l = n.isWindow ? n.scrollTop : n.offset.top,
                      h = t.top - e.collisionPosition.marginTop,
                      c = h - l,
                      u = h + e.collisionHeight - o - l,
                      d = "top" === e.my[1],
                      p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
                      f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
                      g = -2 * e.offset[1];
                  0 > c ? (s = t.top + p + f + g + e.collisionHeight - o - a, t.top + p + f + g > c && (0 > s || r(c) > s) && (t.top += p + f + g)) : u > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + g - l, t.top + p + f + g > u && (i > 0 || u > r(i)) && (t.top += p + f + g))
              }
          },
          flipfit: {
              left: function() {
                  t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
              },
              top: function() {
                  t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
              }
          }
      },
      function() {
          var e, i, s, n, a, o = document.getElementsByTagName("body")[0],
              r = document.createElement("div");
          e = document.createElement(o ? "div" : "body"), s = {
              visibility: "hidden",
              width: 0,
              height: 0,
              border: 0,
              margin: 0,
              background: "none"
          }, o && t.extend(s, {
              position: "absolute",
              left: "-1000px",
              top: "-1000px"
          });
          for (a in s) e.style[a] = s[a];
          e.appendChild(r), i = o || document.documentElement, i.insertBefore(e, i.firstChild), r.style.cssText = "position: absolute; left: 10.7432222px;", n = t(r).offset().left, t.support.offsetFractions = n > 10 && 11 > n, e.innerHTML = "", i.removeChild(e)
      }()
})(jQuery);
(function(e) {
  var t = 0,
      i = {},
      a = {};
  i.height = i.paddingTop = i.paddingBottom = i.borderTopWidth = i.borderBottomWidth = "hide", a.height = a.paddingTop = a.paddingBottom = a.borderTopWidth = a.borderBottomWidth = "show", e.widget("ui.accordion", {
      version: "1.10.4",
      options: {
          active: 0,
          animate: {},
          collapsible: !1,
          event: "click",
          header: "> li > :first-child,> :not(li):even",
          heightStyle: "auto",
          icons: {
              activeHeader: "ui-icon-triangle-1-s",
              header: "ui-icon-triangle-1-e"
          },
          activate: null,
          beforeActivate: null
      },
      _create: function() {
          var t = this.options;
          this.prevShow = this.prevHide = e(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), t.collapsible || t.active !== !1 && null != t.active || (t.active = 0), this._processPanels(), 0 > t.active && (t.active += this.headers.length), this._refresh()
      },
      _getCreateEventData: function() {
          return {
              header: this.active,
              panel: this.active.length ? this.active.next() : e(),
              content: this.active.length ? this.active.next() : e()
          }
      },
      _createIcons: function() {
          var t = this.options.icons;
          t && (e("<span>").addClass("ui-accordion-header-icon ui-icon " + t.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(t.header).addClass(t.activeHeader), this.headers.addClass("ui-accordion-icons"))
      },
      _destroyIcons: function() {
          this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
      },
      _destroy: function() {
          var e;
          this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function() {
              /^ui-accordion/.test(this.id) && this.removeAttribute("id")
          }), this._destroyIcons(), e = this.headers.next().css("display", "").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function() {
              /^ui-accordion/.test(this.id) && this.removeAttribute("id")
          }), "content" !== this.options.heightStyle && e.css("height", "")
      },
      _setOption: function(e, t) {
          return "active" === e ? (this._activate(t), undefined) : ("event" === e && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(t)), this._super(e, t), "collapsible" !== e || t || this.options.active !== !1 || this._activate(0), "icons" === e && (this._destroyIcons(), t && this._createIcons()), "disabled" === e && this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!t), undefined)
      },
      _keydown: function(t) {
          if (!t.altKey && !t.ctrlKey) {
              var i = e.ui.keyCode,
                  a = this.headers.length,
                  s = this.headers.index(t.target),
                  n = !1;
              switch (t.keyCode) {
                  case i.RIGHT:
                  case i.DOWN:
                      n = this.headers[(s + 1) % a];
                      break;
                  case i.LEFT:
                  case i.UP:
                      n = this.headers[(s - 1 + a) % a];
                      break;
                  case i.SPACE:
                  case i.ENTER:
                      this._eventHandler(t);
                      break;
                  case i.HOME:
                      n = this.headers[0];
                      break;
                  case i.END:
                      n = this.headers[a - 1]
              }
              n && (e(t.target).attr("tabIndex", -1), e(n).attr("tabIndex", 0), n.focus(), t.preventDefault())
          }
      },
      _panelKeyDown: function(t) {
          t.keyCode === e.ui.keyCode.UP && t.ctrlKey && e(t.currentTarget).prev().focus()
      },
      refresh: function() {
          var t = this.options;
          this._processPanels(), t.active === !1 && t.collapsible === !0 || !this.headers.length ? (t.active = !1, this.active = e()) : t.active === !1 ? this._activate(0) : this.active.length && !e.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (t.active = !1, this.active = e()) : this._activate(Math.max(0, t.active - 1)) : t.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
      },
      _processPanels: function() {
          this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"), this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()
      },
      _refresh: function() {
          var i, a = this.options,
              s = a.heightStyle,
              n = this.element.parent(),
              r = this.accordionId = "ui-accordion-" + (this.element.attr("id") || ++t);
          this.active = this._findActive(a.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function(t) {
              var i = e(this),
                  a = i.attr("id"),
                  s = i.next(),
                  n = s.attr("id");
              a || (a = r + "-header-" + t, i.attr("id", a)), n || (n = r + "-panel-" + t, s.attr("id", n)), i.attr("aria-controls", n), s.attr("aria-labelledby", a)
          }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
              "aria-selected": "false",
              "aria-expanded": "false",
              tabIndex: -1
          }).next().attr({
              "aria-hidden": "true"
          }).hide(), this.active.length ? this.active.attr({
              "aria-selected": "true",
              "aria-expanded": "true",
              tabIndex: 0
          }).next().attr({
              "aria-hidden": "false"
          }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(a.event), "fill" === s ? (i = n.height(), this.element.siblings(":visible").each(function() {
              var t = e(this),
                  a = t.css("position");
              "absolute" !== a && "fixed" !== a && (i -= t.outerHeight(!0))
          }), this.headers.each(function() {
              i -= e(this).outerHeight(!0)
          }), this.headers.next().each(function() {
              e(this).height(Math.max(0, i - e(this).innerHeight() + e(this).height()))
          }).css("overflow", "auto")) : "auto" === s && (i = 0, this.headers.next().each(function() {
              i = Math.max(i, e(this).css("height", "").height())
          }).height(i))
      },
      _activate: function(t) {
          var i = this._findActive(t)[0];
          i !== this.active[0] && (i = i || this.active[0], this._eventHandler({
              target: i,
              currentTarget: i,
              preventDefault: e.noop
          }))
      },
      _findActive: function(t) {
          return "number" == typeof t ? this.headers.eq(t) : e()
      },
      _setupEvents: function(t) {
          var i = {
              keydown: "_keydown"
          };
          t && e.each(t.split(" "), function(e, t) {
              i[t] = "_eventHandler"
          }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, i), this._on(this.headers.next(), {
              keydown: "_panelKeyDown"
          }), this._hoverable(this.headers), this._focusable(this.headers)
      },
      _eventHandler: function(t) {
          var i = this.options,
              a = this.active,
              s = e(t.currentTarget),
              n = s[0] === a[0],
              r = n && i.collapsible,
              o = r ? e() : s.next(),
              h = a.next(),
              d = {
                  oldHeader: a,
                  oldPanel: h,
                  newHeader: r ? e() : s,
                  newPanel: o
              };
          t.preventDefault(), n && !i.collapsible || this._trigger("beforeActivate", t, d) === !1 || (i.active = r ? !1 : this.headers.index(s), this.active = n ? e() : s, this._toggle(d), a.removeClass("ui-accordion-header-active ui-state-active"), i.icons && a.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header), n || (s.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), i.icons && s.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader), s.next().addClass("ui-accordion-content-active")))
      },
      _toggle: function(t) {
          var i = t.newPanel,
              a = this.prevShow.length ? this.prevShow : t.oldPanel;
          this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = i, this.prevHide = a, this.options.animate ? this._animate(i, a, t) : (a.hide(), i.show(), this._toggleComplete(t)), a.attr({
              "aria-hidden": "true"
          }), a.prev().attr("aria-selected", "false"), i.length && a.length ? a.prev().attr({
              tabIndex: -1,
              "aria-expanded": "false"
          }) : i.length && this.headers.filter(function() {
              return 0 === e(this).attr("tabIndex")
          }).attr("tabIndex", -1), i.attr("aria-hidden", "false").prev().attr({
              "aria-selected": "true",
              tabIndex: 0,
              "aria-expanded": "true"
          })
      },
      _animate: function(e, t, s) {
          var n, r, o, h = this,
              d = 0,
              c = e.length && (!t.length || e.index() < t.index()),
              l = this.options.animate || {},
              u = c && l.down || l,
              v = function() {
                  h._toggleComplete(s)
              };
          return "number" == typeof u && (o = u), "string" == typeof u && (r = u), r = r || u.easing || l.easing, o = o || u.duration || l.duration, t.length ? e.length ? (n = e.show().outerHeight(), t.animate(i, {
              duration: o,
              easing: r,
              step: function(e, t) {
                  t.now = Math.round(e)
              }
          }), e.hide().animate(a, {
              duration: o,
              easing: r,
              complete: v,
              step: function(e, i) {
                  i.now = Math.round(e), "height" !== i.prop ? d += i.now : "content" !== h.options.heightStyle && (i.now = Math.round(n - t.outerHeight() - d), d = 0)
              }
          }), undefined) : t.animate(i, o, r, v) : e.animate(a, o, r, v)
      },
      _toggleComplete: function(e) {
          var t = e.oldPanel;
          t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), t.length && (t.parent()[0].className = t.parent()[0].className), this._trigger("activate", null, e)
      }
  })
})(jQuery);
(function(e) {
  e.widget("ui.autocomplete", {
      version: "1.10.4",
      defaultElement: "<input>",
      options: {
          appendTo: null,
          autoFocus: !1,
          delay: 300,
          minLength: 1,
          position: {
              my: "left top",
              at: "left bottom",
              collision: "none"
          },
          source: null,
          change: null,
          close: null,
          focus: null,
          open: null,
          response: null,
          search: null,
          select: null
      },
      requestIndex: 0,
      pending: 0,
      _create: function() {
          var t, i, s, n = this.element[0].nodeName.toLowerCase(),
              a = "textarea" === n,
              o = "input" === n;
          this.isMultiLine = a ? !0 : o ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[a || o ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
              keydown: function(n) {
                  if (this.element.prop("readOnly")) return t = !0, s = !0, i = !0, undefined;
                  t = !1, s = !1, i = !1;
                  var a = e.ui.keyCode;
                  switch (n.keyCode) {
                      case a.PAGE_UP:
                          t = !0, this._move("previousPage", n);
                          break;
                      case a.PAGE_DOWN:
                          t = !0, this._move("nextPage", n);
                          break;
                      case a.UP:
                          t = !0, this._keyEvent("previous", n);
                          break;
                      case a.DOWN:
                          t = !0, this._keyEvent("next", n);
                          break;
                      case a.ENTER:
                      case a.NUMPAD_ENTER:
                          this.menu.active && (t = !0, n.preventDefault(), this.menu.select(n));
                          break;
                      case a.TAB:
                          this.menu.active && this.menu.select(n);
                          break;
                      case a.ESCAPE:
                          this.menu.element.is(":visible") && (this._value(this.term), this.close(n), n.preventDefault());
                          break;
                      default:
                          i = !0, this._searchTimeout(n)
                  }
              },
              keypress: function(s) {
                  if (t) return t = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && s.preventDefault(), undefined;
                  if (!i) {
                      var n = e.ui.keyCode;
                      switch (s.keyCode) {
                          case n.PAGE_UP:
                              this._move("previousPage", s);
                              break;
                          case n.PAGE_DOWN:
                              this._move("nextPage", s);
                              break;
                          case n.UP:
                              this._keyEvent("previous", s);
                              break;
                          case n.DOWN:
                              this._keyEvent("next", s)
                      }
                  }
              },
              input: function(e) {
                  return s ? (s = !1, e.preventDefault(), undefined) : (this._searchTimeout(e), undefined)
              },
              focus: function() {
                  this.selectedItem = null, this.previous = this._value()
              },
              blur: function(e) {
                  return this.cancelBlur ? (delete this.cancelBlur, undefined) : (clearTimeout(this.searching), this.close(e), this._change(e), undefined)
              }
          }), this._initSource(), this.menu = e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
              role: null
          }).hide().data("ui-menu"), this._on(this.menu.element, {
              mousedown: function(t) {
                  t.preventDefault(), this.cancelBlur = !0, this._delay(function() {
                      delete this.cancelBlur
                  });
                  var i = this.menu.element[0];
                  e(t.target).closest(".ui-menu-item").length || this._delay(function() {
                      var t = this;
                      this.document.one("mousedown", function(s) {
                          s.target === t.element[0] || s.target === i || e.contains(i, s.target) || t.close()
                      })
                  })
              },
              menufocus: function(t, i) {
                  if (this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type))) return this.menu.blur(), this.document.one("mousemove", function() {
                      e(t.target).trigger(t.originalEvent)
                  }), undefined;
                  var s = i.item.data("ui-autocomplete-item");
                  !1 !== this._trigger("focus", t, {
                      item: s
                  }) ? t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(s.value) : this.liveRegion.text(s.value)
              },
              menuselect: function(e, t) {
                  var i = t.item.data("ui-autocomplete-item"),
                      s = this.previous;
                  this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = s, this._delay(function() {
                      this.previous = s, this.selectedItem = i
                  })), !1 !== this._trigger("select", e, {
                      item: i
                  }) && this._value(i.value), this.term = this._value(), this.close(e), this.selectedItem = i
              }
          }), this.liveRegion = e("<span>", {
              role: "status",
              "aria-live": "polite"
          }).addClass("ui-helper-hidden-accessible").insertBefore(this.element), this._on(this.window, {
              beforeunload: function() {
                  this.element.removeAttr("autocomplete")
              }
          })
      },
      _destroy: function() {
          clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
      },
      _setOption: function(e, t) {
          this._super(e, t), "source" === e && this._initSource(), "appendTo" === e && this.menu.element.appendTo(this._appendTo()), "disabled" === e && t && this.xhr && this.xhr.abort()
      },
      _appendTo: function() {
          var t = this.options.appendTo;
          return t && (t = t.jquery || t.nodeType ? e(t) : this.document.find(t).eq(0)), t || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t
      },
      _initSource: function() {
          var t, i, s = this;
          e.isArray(this.options.source) ? (t = this.options.source, this.source = function(i, s) {
              s(e.ui.autocomplete.filter(t, i.term))
          }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function(t, n) {
              s.xhr && s.xhr.abort(), s.xhr = e.ajax({
                  url: i,
                  data: t,
                  dataType: "json",
                  success: function(e) {
                      n(e)
                  },
                  error: function() {
                      n([])
                  }
              })
          }) : this.source = this.options.source
      },
      _searchTimeout: function(e) {
          clearTimeout(this.searching), this.searching = this._delay(function() {
              this.term !== this._value() && (this.selectedItem = null, this.search(null, e))
          }, this.options.delay)
      },
      search: function(e, t) {
          return e = null != e ? e : this._value(), this.term = this._value(), e.length < this.options.minLength ? this.close(t) : this._trigger("search", t) !== !1 ? this._search(e) : undefined
      },
      _search: function(e) {
          this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
              term: e
          }, this._response())
      },
      _response: function() {
          var t = ++this.requestIndex;
          return e.proxy(function(e) {
              t === this.requestIndex && this.__response(e), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading")
          }, this)
      },
      __response: function(e) {
          e && (e = this._normalize(e)), this._trigger("response", null, {
              content: e
          }), !this.options.disabled && e && e.length && !this.cancelSearch ? (this._suggest(e), this._trigger("open")) : this._close()
      },
      close: function(e) {
          this.cancelSearch = !0, this._close(e)
      },
      _close: function(e) {
          this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", e))
      },
      _change: function(e) {
          this.previous !== this._value() && this._trigger("change", e, {
              item: this.selectedItem
          })
      },
      _normalize: function(t) {
          return t.length && t[0].label && t[0].value ? t : e.map(t, function(t) {
              return "string" == typeof t ? {
                  label: t,
                  value: t
              } : e.extend({
                  label: t.label || t.value,
                  value: t.value || t.label
              }, t)
          })
      },
      _suggest: function(t) {
          var i = this.menu.element.empty();
          this._renderMenu(i, t), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(e.extend({
              of: this.element
          }, this.options.position)), this.options.autoFocus && this.menu.next()
      },
      _resizeMenu: function() {
          var e = this.menu.element;
          e.outerWidth(Math.max(e.width("").outerWidth() + 1, this.element.outerWidth()))
      },
      _renderMenu: function(t, i) {
          var s = this;
          e.each(i, function(e, i) {
              s._renderItemData(t, i)
          })
      },
      _renderItemData: function(e, t) {
          return this._renderItem(e, t).data("ui-autocomplete-item", t)
      },
      _renderItem: function(t, i) {
          return e("<li>").append(e("<a>").text(i.label)).appendTo(t)
      },
      _move: function(e, t) {
          return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(e) || this.menu.isLastItem() && /^next/.test(e) ? (this._value(this.term), this.menu.blur(), undefined) : (this.menu[e](t), undefined) : (this.search(null, t), undefined)
      },
      widget: function() {
          return this.menu.element
      },
      _value: function() {
          return this.valueMethod.apply(this.element, arguments)
      },
      _keyEvent: function(e, t) {
          (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(e, t), t.preventDefault())
      }
  }), e.extend(e.ui.autocomplete, {
      escapeRegex: function(e) {
          return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
      },
      filter: function(t, i) {
          var s = RegExp(e.ui.autocomplete.escapeRegex(i), "i");
          return e.grep(t, function(e) {
              return s.test(e.label || e.value || e)
          })
      }
  }), e.widget("ui.autocomplete", e.ui.autocomplete, {
      options: {
          messages: {
              noResults: "No search results.",
              results: function(e) {
                  return e + (e > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
              }
          }
      },
      __response: function(e) {
          var t;
          this._superApply(arguments), this.options.disabled || this.cancelSearch || (t = e && e.length ? this.options.messages.results(e.length) : this.options.messages.noResults, this.liveRegion.text(t))
      }
  })
})(jQuery);
(function(e) {
  var t, i = "ui-button ui-widget ui-state-default ui-corner-all",
      n = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
      s = function() {
          var t = e(this);
          setTimeout(function() {
              t.find(":ui-button").button("refresh")
          }, 1)
      },
      a = function(t) {
          var i = t.name,
              n = t.form,
              s = e([]);
          return i && (i = i.replace(/'/g, "\\'"), s = n ? e(n).find("[name='" + i + "']") : e("[name='" + i + "']", t.ownerDocument).filter(function() {
              return !this.form
          })), s
      };
  e.widget("ui.button", {
      version: "1.10.4",
      defaultElement: "<button>",
      options: {
          disabled: null,
          text: !0,
          label: null,
          icons: {
              primary: null,
              secondary: null
          }
      },
      _create: function() {
          this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, s), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
          var n = this,
              o = this.options,
              r = "checkbox" === this.type || "radio" === this.type,
              h = r ? "" : "ui-state-active";
          null === o.label && (o.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(i).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
              o.disabled || this === t && e(this).addClass("ui-state-active")
          }).bind("mouseleave" + this.eventNamespace, function() {
              o.disabled || e(this).removeClass(h)
          }).bind("click" + this.eventNamespace, function(e) {
              o.disabled && (e.preventDefault(), e.stopImmediatePropagation())
          }), this._on({
              focus: function() {
                  this.buttonElement.addClass("ui-state-focus")
              },
              blur: function() {
                  this.buttonElement.removeClass("ui-state-focus")
              }
          }), r && this.element.bind("change" + this.eventNamespace, function() {
              n.refresh()
          }), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
              return o.disabled ? !1 : undefined
          }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
              if (o.disabled) return !1;
              e(this).addClass("ui-state-active"), n.buttonElement.attr("aria-pressed", "true");
              var t = n.element[0];
              a(t).not(t).map(function() {
                  return e(this).button("widget")[0]
              }).removeClass("ui-state-active").attr("aria-pressed", "false")
          }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
              return o.disabled ? !1 : (e(this).addClass("ui-state-active"), t = this, n.document.one("mouseup", function() {
                  t = null
              }), undefined)
          }).bind("mouseup" + this.eventNamespace, function() {
              return o.disabled ? !1 : (e(this).removeClass("ui-state-active"), undefined)
          }).bind("keydown" + this.eventNamespace, function(t) {
              return o.disabled ? !1 : ((t.keyCode === e.ui.keyCode.SPACE || t.keyCode === e.ui.keyCode.ENTER) && e(this).addClass("ui-state-active"), undefined)
          }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
              e(this).removeClass("ui-state-active")
          }), this.buttonElement.is("a") && this.buttonElement.keyup(function(t) {
              t.keyCode === e.ui.keyCode.SPACE && e(this).click()
          })), this._setOption("disabled", o.disabled), this._resetButton()
      },
      _determineButtonType: function() {
          var e, t, i;
          this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", "checkbox" === this.type || "radio" === this.type ? (e = this.element.parents().last(), t = "label[for='" + this.element.attr("id") + "']", this.buttonElement = e.find(t), this.buttonElement.length || (e = e.length ? e.siblings() : this.element.siblings(), this.buttonElement = e.filter(t), this.buttonElement.length || (this.buttonElement = e.find(t))), this.element.addClass("ui-helper-hidden-accessible"), i = this.element.is(":checked"), i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
      },
      widget: function() {
          return this.buttonElement
      },
      _destroy: function() {
          this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(i + " ui-state-active " + n).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
      },
      _setOption: function(e, t) {
          return this._super(e, t), "disabled" === e ? (this.element.prop("disabled", !!t), t && this.buttonElement.removeClass("ui-state-focus"), undefined) : (this._resetButton(), undefined)
      },
      refresh: function() {
          var t = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
          t !== this.options.disabled && this._setOption("disabled", t), "radio" === this.type ? a(this.element[0]).each(function() {
              e(this).is(":checked") ? e(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
          }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
      },
      _resetButton: function() {
          if ("input" === this.type) return this.options.label && this.element.val(this.options.label), undefined;
          var t = this.buttonElement.removeClass(n),
              i = e("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),
              s = this.options.icons,
              a = s.primary && s.secondary,
              o = [];
          s.primary || s.secondary ? (this.options.text && o.push("ui-button-text-icon" + (a ? "s" : s.primary ? "-primary" : "-secondary")), s.primary && t.prepend("<span class='ui-button-icon-primary ui-icon " + s.primary + "'></span>"), s.secondary && t.append("<span class='ui-button-icon-secondary ui-icon " + s.secondary + "'></span>"), this.options.text || (o.push(a ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || t.attr("title", e.trim(i)))) : o.push("ui-button-text-only"), t.addClass(o.join(" "))
      }
  }), e.widget("ui.buttonset", {
      version: "1.10.4",
      options: {
          items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
      },
      _create: function() {
          this.element.addClass("ui-buttonset")
      },
      _init: function() {
          this.refresh()
      },
      _setOption: function(e, t) {
          "disabled" === e && this.buttons.button("option", e, t), this._super(e, t)
      },
      refresh: function() {
          var t = "rtl" === this.element.css("direction");
          this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
              return e(this).button("widget")[0]
          }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(t ? "ui-corner-left" : "ui-corner-right").end().end()
      },
      _destroy: function() {
          this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
              return e(this).button("widget")[0]
          }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
      }
  })
})(jQuery);
(function(e, t) {
  function i() {
      this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
          closeText: "Done",
          prevText: "Prev",
          nextText: "Next",
          currentText: "Today",
          monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          weekHeader: "Wk",
          dateFormat: "mm/dd/yy",
          firstDay: 0,
          isRTL: !1,
          showMonthAfterYear: !1,
          yearSuffix: ""
      }, this._defaults = {
          showOn: "focus",
          showAnim: "fadeIn",
          showOptions: {},
          defaultDate: null,
          appendText: "",
          buttonText: "...",
          buttonImage: "",
          buttonImageOnly: !1,
          hideIfNoPrevNext: !1,
          navigationAsDateFormat: !1,
          gotoCurrent: !1,
          changeMonth: !1,
          changeYear: !1,
          yearRange: "c-10:c+10",
          showOtherMonths: !1,
          selectOtherMonths: !1,
          showWeek: !1,
          calculateWeek: this.iso8601Week,
          shortYearCutoff: "+10",
          minDate: null,
          maxDate: null,
          duration: "fast",
          beforeShowDay: null,
          beforeShow: null,
          onSelect: null,
          onChangeMonthYear: null,
          onClose: null,
          numberOfMonths: 1,
          showCurrentAtPos: 0,
          stepMonths: 1,
          stepBigMonths: 12,
          altField: "",
          altFormat: "",
          constrainInput: !0,
          showButtonPanel: !1,
          autoSize: !1,
          disabled: !1
      }, e.extend(this._defaults, this.regional[""]), this.dpDiv = a(e("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
  }

  function a(t) {
      var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
      return t.delegate(i, "mouseout", function() {
          e(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && e(this).removeClass("ui-datepicker-next-hover")
      }).delegate(i, "mouseover", function() {
          e.datepicker._isDisabledDatepicker(n.inline ? t.parent()[0] : n.input[0]) || (e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), e(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && e(this).addClass("ui-datepicker-next-hover"))
      })
  }

  function s(t, i) {
      e.extend(t, i);
      for (var a in i) null == i[a] && (t[a] = i[a]);
      return t
  }
  e.extend(e.ui, {
      datepicker: {
          version: "1.10.4"
      }
  });
  var n, r = "datepicker";
  e.extend(i.prototype, {
      markerClassName: "hasDatepicker",
      maxRows: 4,
      _widgetDatepicker: function() {
          return this.dpDiv
      },
      setDefaults: function(e) {
          return s(this._defaults, e || {}), this
      },
      _attachDatepicker: function(t, i) {
          var a, s, n;
          a = t.nodeName.toLowerCase(), s = "div" === a || "span" === a, t.id || (this.uuid += 1, t.id = "dp" + this.uuid), n = this._newInst(e(t), s), n.settings = e.extend({}, i || {}), "input" === a ? this._connectDatepicker(t, n) : s && this._inlineDatepicker(t, n)
      },
      _newInst: function(t, i) {
          var s = t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
          return {
              id: s,
              input: t,
              selectedDay: 0,
              selectedMonth: 0,
              selectedYear: 0,
              drawMonth: 0,
              drawYear: 0,
              inline: i,
              dpDiv: i ? a(e("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
          }
      },
      _connectDatepicker: function(t, i) {
          var a = e(t);
          i.append = e([]), i.trigger = e([]), a.hasClass(this.markerClassName) || (this._attachments(a, i), a.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), e.data(t, r, i), i.settings.disabled && this._disableDatepicker(t))
      },
      _attachments: function(t, i) {
          var a, s, n, r = this._get(i, "appendText"),
              o = this._get(i, "isRTL");
          i.append && i.append.remove(), r && (i.append = e("<span class='" + this._appendClass + "'>" + r + "</span>"), t[o ? "before" : "after"](i.append)), t.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), a = this._get(i, "showOn"), ("focus" === a || "both" === a) && t.focus(this._showDatepicker), ("button" === a || "both" === a) && (s = this._get(i, "buttonText"), n = this._get(i, "buttonImage"), i.trigger = e(this._get(i, "buttonImageOnly") ? e("<img/>").addClass(this._triggerClass).attr({
              src: n,
              alt: s,
              title: s
          }) : e("<button type='button'></button>").addClass(this._triggerClass).html(n ? e("<img/>").attr({
              src: n,
              alt: s,
              title: s
          }) : s)), t[o ? "before" : "after"](i.trigger), i.trigger.click(function() {
              return e.datepicker._datepickerShowing && e.datepicker._lastInput === t[0] ? e.datepicker._hideDatepicker() : e.datepicker._datepickerShowing && e.datepicker._lastInput !== t[0] ? (e.datepicker._hideDatepicker(), e.datepicker._showDatepicker(t[0])) : e.datepicker._showDatepicker(t[0]), !1
          }))
      },
      _autoSize: function(e) {
          if (this._get(e, "autoSize") && !e.inline) {
              var t, i, a, s, n = new Date(2009, 11, 20),
                  r = this._get(e, "dateFormat");
              r.match(/[DM]/) && (t = function(e) {
                  for (i = 0, a = 0, s = 0; e.length > s; s++) e[s].length > i && (i = e[s].length, a = s);
                  return a
              }, n.setMonth(t(this._get(e, r.match(/MM/) ? "monthNames" : "monthNamesShort"))), n.setDate(t(this._get(e, r.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - n.getDay())), e.input.attr("size", this._formatDate(e, n).length)
          }
      },
      _inlineDatepicker: function(t, i) {
          var a = e(t);
          a.hasClass(this.markerClassName) || (a.addClass(this.markerClassName).append(i.dpDiv), e.data(t, r, i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(t), i.dpDiv.css("display", "block"))
      },
      _dialogDatepicker: function(t, i, a, n, o) {
          var u, c, h, l, d, p = this._dialogInst;
          return p || (this.uuid += 1, u = "dp" + this.uuid, this._dialogInput = e("<input type='text' id='" + u + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), e("body").append(this._dialogInput), p = this._dialogInst = this._newInst(this._dialogInput, !1), p.settings = {}, e.data(this._dialogInput[0], r, p)), s(p.settings, n || {}), i = i && i.constructor === Date ? this._formatDate(p, i) : i, this._dialogInput.val(i), this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null, this._pos || (c = document.documentElement.clientWidth, h = document.documentElement.clientHeight, l = document.documentElement.scrollLeft || document.body.scrollLeft, d = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [c / 2 - 100 + l, h / 2 - 150 + d]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), p.settings.onSelect = a, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), e.blockUI && e.blockUI(this.dpDiv), e.data(this._dialogInput[0], r, p), this
      },
      _destroyDatepicker: function(t) {
          var i, a = e(t),
              s = e.data(t, r);
          a.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), e.removeData(t, r), "input" === i ? (s.append.remove(), s.trigger.remove(), a.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && a.removeClass(this.markerClassName).empty())
      },
      _enableDatepicker: function(t) {
          var i, a, s = e(t),
              n = e.data(t, r);
          s.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i ? (t.disabled = !1, n.trigger.filter("button").each(function() {
              this.disabled = !1
          }).end().filter("img").css({
              opacity: "1.0",
              cursor: ""
          })) : ("div" === i || "span" === i) && (a = s.children("." + this._inlineClass), a.children().removeClass("ui-state-disabled"), a.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = e.map(this._disabledInputs, function(e) {
              return e === t ? null : e
          }))
      },
      _disableDatepicker: function(t) {
          var i, a, s = e(t),
              n = e.data(t, r);
          s.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i ? (t.disabled = !0, n.trigger.filter("button").each(function() {
              this.disabled = !0
          }).end().filter("img").css({
              opacity: "0.5",
              cursor: "default"
          })) : ("div" === i || "span" === i) && (a = s.children("." + this._inlineClass), a.children().addClass("ui-state-disabled"), a.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = e.map(this._disabledInputs, function(e) {
              return e === t ? null : e
          }), this._disabledInputs[this._disabledInputs.length] = t)
      },
      _isDisabledDatepicker: function(e) {
          if (!e) return !1;
          for (var t = 0; this._disabledInputs.length > t; t++)
              if (this._disabledInputs[t] === e) return !0;
          return !1
      },
      _getInst: function(t) {
          try {
              return e.data(t, r)
          } catch (i) {
              throw "Missing instance data for this datepicker"
          }
      },
      _optionDatepicker: function(i, a, n) {
          var r, o, u, c, h = this._getInst(i);
          return 2 === arguments.length && "string" == typeof a ? "defaults" === a ? e.extend({}, e.datepicker._defaults) : h ? "all" === a ? e.extend({}, h.settings) : this._get(h, a) : null : (r = a || {}, "string" == typeof a && (r = {}, r[a] = n), h && (this._curInst === h && this._hideDatepicker(), o = this._getDateDatepicker(i, !0), u = this._getMinMaxDate(h, "min"), c = this._getMinMaxDate(h, "max"), s(h.settings, r), null !== u && r.dateFormat !== t && r.minDate === t && (h.settings.minDate = this._formatDate(h, u)), null !== c && r.dateFormat !== t && r.maxDate === t && (h.settings.maxDate = this._formatDate(h, c)), "disabled" in r && (r.disabled ? this._disableDatepicker(i) : this._enableDatepicker(i)), this._attachments(e(i), h), this._autoSize(h), this._setDate(h, o), this._updateAlternate(h), this._updateDatepicker(h)), t)
      },
      _changeDatepicker: function(e, t, i) {
          this._optionDatepicker(e, t, i)
      },
      _refreshDatepicker: function(e) {
          var t = this._getInst(e);
          t && this._updateDatepicker(t)
      },
      _setDateDatepicker: function(e, t) {
          var i = this._getInst(e);
          i && (this._setDate(i, t), this._updateDatepicker(i), this._updateAlternate(i))
      },
      _getDateDatepicker: function(e, t) {
          var i = this._getInst(e);
          return i && !i.inline && this._setDateFromField(i, t), i ? this._getDate(i) : null
      },
      _doKeyDown: function(t) {
          var i, a, s, n = e.datepicker._getInst(t.target),
              r = !0,
              o = n.dpDiv.is(".ui-datepicker-rtl");
          if (n._keyEvent = !0, e.datepicker._datepickerShowing) switch (t.keyCode) {
              case 9:
                  e.datepicker._hideDatepicker(), r = !1;
                  break;
              case 13:
                  return s = e("td." + e.datepicker._dayOverClass + ":not(." + e.datepicker._currentClass + ")", n.dpDiv), s[0] && e.datepicker._selectDay(t.target, n.selectedMonth, n.selectedYear, s[0]), i = e.datepicker._get(n, "onSelect"), i ? (a = e.datepicker._formatDate(n), i.apply(n.input ? n.input[0] : null, [a, n])) : e.datepicker._hideDatepicker(), !1;
              case 27:
                  e.datepicker._hideDatepicker();
                  break;
              case 33:
                  e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(n, "stepBigMonths") : -e.datepicker._get(n, "stepMonths"), "M");
                  break;
              case 34:
                  e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(n, "stepBigMonths") : +e.datepicker._get(n, "stepMonths"), "M");
                  break;
              case 35:
                  (t.ctrlKey || t.metaKey) && e.datepicker._clearDate(t.target), r = t.ctrlKey || t.metaKey;
                  break;
              case 36:
                  (t.ctrlKey || t.metaKey) && e.datepicker._gotoToday(t.target), r = t.ctrlKey || t.metaKey;
                  break;
              case 37:
                  (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, o ? 1 : -1, "D"), r = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(n, "stepBigMonths") : -e.datepicker._get(n, "stepMonths"), "M");
                  break;
              case 38:
                  (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, -7, "D"), r = t.ctrlKey || t.metaKey;
                  break;
              case 39:
                  (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, o ? -1 : 1, "D"), r = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(n, "stepBigMonths") : +e.datepicker._get(n, "stepMonths"), "M");
                  break;
              case 40:
                  (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, 7, "D"), r = t.ctrlKey || t.metaKey;
                  break;
              default:
                  r = !1
          } else 36 === t.keyCode && t.ctrlKey ? e.datepicker._showDatepicker(this) : r = !1;
          r && (t.preventDefault(), t.stopPropagation())
      },
      _doKeyPress: function(i) {
          var a, s, n = e.datepicker._getInst(i.target);
          return e.datepicker._get(n, "constrainInput") ? (a = e.datepicker._possibleChars(e.datepicker._get(n, "dateFormat")), s = String.fromCharCode(null == i.charCode ? i.keyCode : i.charCode), i.ctrlKey || i.metaKey || " " > s || !a || a.indexOf(s) > -1) : t
      },
      _doKeyUp: function(t) {
          var i, a = e.datepicker._getInst(t.target);
          if (a.input.val() !== a.lastVal) try {
              i = e.datepicker.parseDate(e.datepicker._get(a, "dateFormat"), a.input ? a.input.val() : null, e.datepicker._getFormatConfig(a)), i && (e.datepicker._setDateFromField(a), e.datepicker._updateAlternate(a), e.datepicker._updateDatepicker(a))
          } catch (s) {}
          return !0
      },
      _showDatepicker: function(t) {
          if (t = t.target || t, "input" !== t.nodeName.toLowerCase() && (t = e("input", t.parentNode)[0]), !e.datepicker._isDisabledDatepicker(t) && e.datepicker._lastInput !== t) {
              var i, a, n, r, o, u, c;
              i = e.datepicker._getInst(t), e.datepicker._curInst && e.datepicker._curInst !== i && (e.datepicker._curInst.dpDiv.stop(!0, !0), i && e.datepicker._datepickerShowing && e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])), a = e.datepicker._get(i, "beforeShow"), n = a ? a.apply(t, [t, i]) : {}, n !== !1 && (s(i.settings, n), i.lastVal = null, e.datepicker._lastInput = t, e.datepicker._setDateFromField(i), e.datepicker._inDialog && (t.value = ""), e.datepicker._pos || (e.datepicker._pos = e.datepicker._findPos(t), e.datepicker._pos[1] += t.offsetHeight), r = !1, e(t).parents().each(function() {
                  return r |= "fixed" === e(this).css("position"), !r
              }), o = {
                  left: e.datepicker._pos[0],
                  top: e.datepicker._pos[1]
              }, e.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
                  position: "absolute",
                  display: "block",
                  top: "-1000px"
              }), e.datepicker._updateDatepicker(i), o = e.datepicker._checkOffset(i, o, r), i.dpDiv.css({
                  position: e.datepicker._inDialog && e.blockUI ? "static" : r ? "fixed" : "absolute",
                  display: "none",
                  left: o.left + "px",
                  top: o.top + "px"
              }), i.inline || (u = e.datepicker._get(i, "showAnim"), c = e.datepicker._get(i, "duration"), i.dpDiv.zIndex(e(t).zIndex() + 1), e.datepicker._datepickerShowing = !0, e.effects && e.effects.effect[u] ? i.dpDiv.show(u, e.datepicker._get(i, "showOptions"), c) : i.dpDiv[u || "show"](u ? c : null), e.datepicker._shouldFocusInput(i) && i.input.focus(), e.datepicker._curInst = i))
          }
      },
      _updateDatepicker: function(t) {
          this.maxRows = 4, n = t, t.dpDiv.empty().append(this._generateHTML(t)), this._attachHandlers(t), t.dpDiv.find("." + this._dayOverClass + " a").mouseover();
          var i, a = this._getNumberOfMonths(t),
              s = a[1],
              r = 17;
          t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), s > 1 && t.dpDiv.addClass("ui-datepicker-multi-" + s).css("width", r * s + "em"), t.dpDiv[(1 !== a[0] || 1 !== a[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), t === e.datepicker._curInst && e.datepicker._datepickerShowing && e.datepicker._shouldFocusInput(t) && t.input.focus(), t.yearshtml && (i = t.yearshtml, setTimeout(function() {
              i === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml), i = t.yearshtml = null
          }, 0))
      },
      _shouldFocusInput: function(e) {
          return e.input && e.input.is(":visible") && !e.input.is(":disabled") && !e.input.is(":focus")
      },
      _checkOffset: function(t, i, a) {
          var s = t.dpDiv.outerWidth(),
              n = t.dpDiv.outerHeight(),
              r = t.input ? t.input.outerWidth() : 0,
              o = t.input ? t.input.outerHeight() : 0,
              u = document.documentElement.clientWidth + (a ? 0 : e(document).scrollLeft()),
              c = document.documentElement.clientHeight + (a ? 0 : e(document).scrollTop());
          return i.left -= this._get(t, "isRTL") ? s - r : 0, i.left -= a && i.left === t.input.offset().left ? e(document).scrollLeft() : 0, i.top -= a && i.top === t.input.offset().top + o ? e(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + s > u && u > s ? Math.abs(i.left + s - u) : 0), i.top -= Math.min(i.top, i.top + n > c && c > n ? Math.abs(n + o) : 0), i
      },
      _findPos: function(t) {
          for (var i, a = this._getInst(t), s = this._get(a, "isRTL"); t && ("hidden" === t.type || 1 !== t.nodeType || e.expr.filters.hidden(t));) t = t[s ? "previousSibling" : "nextSibling"];
          return i = e(t).offset(), [i.left, i.top]
      },
      _hideDatepicker: function(t) {
          var i, a, s, n, o = this._curInst;
          !o || t && o !== e.data(t, r) || this._datepickerShowing && (i = this._get(o, "showAnim"), a = this._get(o, "duration"), s = function() {
              e.datepicker._tidyDialog(o)
          }, e.effects && (e.effects.effect[i] || e.effects[i]) ? o.dpDiv.hide(i, e.datepicker._get(o, "showOptions"), a, s) : o.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? a : null, s), i || s(), this._datepickerShowing = !1, n = this._get(o, "onClose"), n && n.apply(o.input ? o.input[0] : null, [o.input ? o.input.val() : "", o]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
              position: "absolute",
              left: "0",
              top: "-100px"
          }), e.blockUI && (e.unblockUI(), e("body").append(this.dpDiv))), this._inDialog = !1)
      },
      _tidyDialog: function(e) {
          e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
      },
      _checkExternalClick: function(t) {
          if (e.datepicker._curInst) {
              var i = e(t.target),
                  a = e.datepicker._getInst(i[0]);
              (i[0].id !== e.datepicker._mainDivId && 0 === i.parents("#" + e.datepicker._mainDivId).length && !i.hasClass(e.datepicker.markerClassName) && !i.closest("." + e.datepicker._triggerClass).length && e.datepicker._datepickerShowing && (!e.datepicker._inDialog || !e.blockUI) || i.hasClass(e.datepicker.markerClassName) && e.datepicker._curInst !== a) && e.datepicker._hideDatepicker()
          }
      },
      _adjustDate: function(t, i, a) {
          var s = e(t),
              n = this._getInst(s[0]);
          this._isDisabledDatepicker(s[0]) || (this._adjustInstDate(n, i + ("M" === a ? this._get(n, "showCurrentAtPos") : 0), a), this._updateDatepicker(n))
      },
      _gotoToday: function(t) {
          var i, a = e(t),
              s = this._getInst(a[0]);
          this._get(s, "gotoCurrent") && s.currentDay ? (s.selectedDay = s.currentDay, s.drawMonth = s.selectedMonth = s.currentMonth, s.drawYear = s.selectedYear = s.currentYear) : (i = new Date, s.selectedDay = i.getDate(), s.drawMonth = s.selectedMonth = i.getMonth(), s.drawYear = s.selectedYear = i.getFullYear()), this._notifyChange(s), this._adjustDate(a)
      },
      _selectMonthYear: function(t, i, a) {
          var s = e(t),
              n = this._getInst(s[0]);
          n["selected" + ("M" === a ? "Month" : "Year")] = n["draw" + ("M" === a ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(n), this._adjustDate(s)
      },
      _selectDay: function(t, i, a, s) {
          var n, r = e(t);
          e(s).hasClass(this._unselectableClass) || this._isDisabledDatepicker(r[0]) || (n = this._getInst(r[0]), n.selectedDay = n.currentDay = e("a", s).html(), n.selectedMonth = n.currentMonth = i, n.selectedYear = n.currentYear = a, this._selectDate(t, this._formatDate(n, n.currentDay, n.currentMonth, n.currentYear)))
      },
      _clearDate: function(t) {
          var i = e(t);
          this._selectDate(i, "")
      },
      _selectDate: function(t, i) {
          var a, s = e(t),
              n = this._getInst(s[0]);
          i = null != i ? i : this._formatDate(n), n.input && n.input.val(i), this._updateAlternate(n), a = this._get(n, "onSelect"), a ? a.apply(n.input ? n.input[0] : null, [i, n]) : n.input && n.input.trigger("change"), n.inline ? this._updateDatepicker(n) : (this._hideDatepicker(), this._lastInput = n.input[0], "object" != typeof n.input[0] && n.input.focus(), this._lastInput = null)
      },
      _updateAlternate: function(t) {
          var i, a, s, n = this._get(t, "altField");
          n && (i = this._get(t, "altFormat") || this._get(t, "dateFormat"), a = this._getDate(t), s = this.formatDate(i, a, this._getFormatConfig(t)), e(n).each(function() {
              e(this).val(s)
          }))
      },
      noWeekends: function(e) {
          var t = e.getDay();
          return [t > 0 && 6 > t, ""]
      },
      iso8601Week: function(e) {
          var t, i = new Date(e.getTime());
          return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), t = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((t - i) / 864e5) / 7) + 1
      },
      parseDate: function(i, a, s) {
          if (null == i || null == a) throw "Invalid arguments";
          if (a = "object" == typeof a ? "" + a : a + "", "" === a) return null;
          var n, r, o, u, c = 0,
              h = (s ? s.shortYearCutoff : null) || this._defaults.shortYearCutoff,
              l = "string" != typeof h ? h : (new Date).getFullYear() % 100 + parseInt(h, 10),
              d = (s ? s.dayNamesShort : null) || this._defaults.dayNamesShort,
              p = (s ? s.dayNames : null) || this._defaults.dayNames,
              g = (s ? s.monthNamesShort : null) || this._defaults.monthNamesShort,
              m = (s ? s.monthNames : null) || this._defaults.monthNames,
              f = -1,
              _ = -1,
              v = -1,
              k = -1,
              y = !1,
              b = function(e) {
                  var t = i.length > n + 1 && i.charAt(n + 1) === e;
                  return t && n++, t
              },
              D = function(e) {
                  var t = b(e),
                      i = "@" === e ? 14 : "!" === e ? 20 : "y" === e && t ? 4 : "o" === e ? 3 : 2,
                      s = RegExp("^\\d{1," + i + "}"),
                      n = a.substring(c).match(s);
                  if (!n) throw "Missing number at position " + c;
                  return c += n[0].length, parseInt(n[0], 10)
              },
              w = function(i, s, n) {
                  var r = -1,
                      o = e.map(b(i) ? n : s, function(e, t) {
                          return [
                              [t, e]
                          ]
                      }).sort(function(e, t) {
                          return -(e[1].length - t[1].length)
                      });
                  if (e.each(o, function(e, i) {
                          var s = i[1];
                          return a.substr(c, s.length).toLowerCase() === s.toLowerCase() ? (r = i[0], c += s.length, !1) : t
                      }), -1 !== r) return r + 1;
                  throw "Unknown name at position " + c
              },
              M = function() {
                  if (a.charAt(c) !== i.charAt(n)) throw "Unexpected literal at position " + c;
                  c++
              };
          for (n = 0; i.length > n; n++)
              if (y) "'" !== i.charAt(n) || b("'") ? M() : y = !1;
              else switch (i.charAt(n)) {
                  case "d":
                      v = D("d");
                      break;
                  case "D":
                      w("D", d, p);
                      break;
                  case "o":
                      k = D("o");
                      break;
                  case "m":
                      _ = D("m");
                      break;
                  case "M":
                      _ = w("M", g, m);
                      break;
                  case "y":
                      f = D("y");
                      break;
                  case "@":
                      u = new Date(D("@")), f = u.getFullYear(), _ = u.getMonth() + 1, v = u.getDate();
                      break;
                  case "!":
                      u = new Date((D("!") - this._ticksTo1970) / 1e4), f = u.getFullYear(), _ = u.getMonth() + 1, v = u.getDate();
                      break;
                  case "'":
                      b("'") ? M() : y = !0;
                      break;
                  default:
                      M()
              }
              if (a.length > c && (o = a.substr(c), !/^\s+/.test(o))) throw "Extra/unparsed characters found in date: " + o;
          if (-1 === f ? f = (new Date).getFullYear() : 100 > f && (f += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (l >= f ? 0 : -100)), k > -1)
              for (_ = 1, v = k;;) {
                  if (r = this._getDaysInMonth(f, _ - 1), r >= v) break;
                  _++, v -= r
              }
          if (u = this._daylightSavingAdjust(new Date(f, _ - 1, v)), u.getFullYear() !== f || u.getMonth() + 1 !== _ || u.getDate() !== v) throw "Invalid date";
          return u
      },
      ATOM: "yy-mm-dd",
      COOKIE: "D, dd M yy",
      ISO_8601: "yy-mm-dd",
      RFC_822: "D, d M y",
      RFC_850: "DD, dd-M-y",
      RFC_1036: "D, d M y",
      RFC_1123: "D, d M yy",
      RFC_2822: "D, d M yy",
      RSS: "D, d M y",
      TICKS: "!",
      TIMESTAMP: "@",
      W3C: "yy-mm-dd",
      _ticksTo1970: 1e7 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
      formatDate: function(e, t, i) {
          if (!t) return "";
          var a, s = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
              n = (i ? i.dayNames : null) || this._defaults.dayNames,
              r = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
              o = (i ? i.monthNames : null) || this._defaults.monthNames,
              u = function(t) {
                  var i = e.length > a + 1 && e.charAt(a + 1) === t;
                  return i && a++, i
              },
              c = function(e, t, i) {
                  var a = "" + t;
                  if (u(e))
                      for (; i > a.length;) a = "0" + a;
                  return a
              },
              h = function(e, t, i, a) {
                  return u(e) ? a[t] : i[t]
              },
              l = "",
              d = !1;
          if (t)
              for (a = 0; e.length > a; a++)
                  if (d) "'" !== e.charAt(a) || u("'") ? l += e.charAt(a) : d = !1;
                  else switch (e.charAt(a)) {
                      case "d":
                          l += c("d", t.getDate(), 2);
                          break;
                      case "D":
                          l += h("D", t.getDay(), s, n);
                          break;
                      case "o":
                          l += c("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                          break;
                      case "m":
                          l += c("m", t.getMonth() + 1, 2);
                          break;
                      case "M":
                          l += h("M", t.getMonth(), r, o);
                          break;
                      case "y":
                          l += u("y") ? t.getFullYear() : (10 > t.getYear() % 100 ? "0" : "") + t.getYear() % 100;
                          break;
                      case "@":
                          l += t.getTime();
                          break;
                      case "!":
                          l += 1e4 * t.getTime() + this._ticksTo1970;
                          break;
                      case "'":
                          u("'") ? l += "'" : d = !0;
                          break;
                      default:
                          l += e.charAt(a)
                  }
                  return l
      },
      _possibleChars: function(e) {
          var t, i = "",
              a = !1,
              s = function(i) {
                  var a = e.length > t + 1 && e.charAt(t + 1) === i;
                  return a && t++, a
              };
          for (t = 0; e.length > t; t++)
              if (a) "'" !== e.charAt(t) || s("'") ? i += e.charAt(t) : a = !1;
              else switch (e.charAt(t)) {
                  case "d":
                  case "m":
                  case "y":
                  case "@":
                      i += "0123456789";
                      break;
                  case "D":
                  case "M":
                      return null;
                  case "'":
                      s("'") ? i += "'" : a = !0;
                      break;
                  default:
                      i += e.charAt(t)
              }
              return i
      },
      _get: function(e, i) {
          return e.settings[i] !== t ? e.settings[i] : this._defaults[i]
      },
      _setDateFromField: function(e, t) {
          if (e.input.val() !== e.lastVal) {
              var i = this._get(e, "dateFormat"),
                  a = e.lastVal = e.input ? e.input.val() : null,
                  s = this._getDefaultDate(e),
                  n = s,
                  r = this._getFormatConfig(e);
              try {
                  n = this.parseDate(i, a, r) || s
              } catch (o) {
                  a = t ? "" : a
              }
              e.selectedDay = n.getDate(), e.drawMonth = e.selectedMonth = n.getMonth(), e.drawYear = e.selectedYear = n.getFullYear(), e.currentDay = a ? n.getDate() : 0, e.currentMonth = a ? n.getMonth() : 0, e.currentYear = a ? n.getFullYear() : 0, this._adjustInstDate(e)
          }
      },
      _getDefaultDate: function(e) {
          return this._restrictMinMax(e, this._determineDate(e, this._get(e, "defaultDate"), new Date))
      },
      _determineDate: function(t, i, a) {
          var s = function(e) {
                  var t = new Date;
                  return t.setDate(t.getDate() + e), t
              },
              n = function(i) {
                  try {
                      return e.datepicker.parseDate(e.datepicker._get(t, "dateFormat"), i, e.datepicker._getFormatConfig(t))
                  } catch (a) {}
                  for (var s = (i.toLowerCase().match(/^c/) ? e.datepicker._getDate(t) : null) || new Date, n = s.getFullYear(), r = s.getMonth(), o = s.getDate(), u = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, c = u.exec(i); c;) {
                      switch (c[2] || "d") {
                          case "d":
                          case "D":
                              o += parseInt(c[1], 10);
                              break;
                          case "w":
                          case "W":
                              o += 7 * parseInt(c[1], 10);
                              break;
                          case "m":
                          case "M":
                              r += parseInt(c[1], 10), o = Math.min(o, e.datepicker._getDaysInMonth(n, r));
                              break;
                          case "y":
                          case "Y":
                              n += parseInt(c[1], 10), o = Math.min(o, e.datepicker._getDaysInMonth(n, r))
                      }
                      c = u.exec(i)
                  }
                  return new Date(n, r, o)
              },
              r = null == i || "" === i ? a : "string" == typeof i ? n(i) : "number" == typeof i ? isNaN(i) ? a : s(i) : new Date(i.getTime());
          return r = r && "Invalid Date" == "" + r ? a : r, r && (r.setHours(0), r.setMinutes(0), r.setSeconds(0), r.setMilliseconds(0)), this._daylightSavingAdjust(r)
      },
      _daylightSavingAdjust: function(e) {
          return e ? (e.setHours(e.getHours() > 12 ? e.getHours() + 2 : 0), e) : null
      },
      _setDate: function(e, t, i) {
          var a = !t,
              s = e.selectedMonth,
              n = e.selectedYear,
              r = this._restrictMinMax(e, this._determineDate(e, t, new Date));
          e.selectedDay = e.currentDay = r.getDate(), e.drawMonth = e.selectedMonth = e.currentMonth = r.getMonth(), e.drawYear = e.selectedYear = e.currentYear = r.getFullYear(), s === e.selectedMonth && n === e.selectedYear || i || this._notifyChange(e), this._adjustInstDate(e), e.input && e.input.val(a ? "" : this._formatDate(e))
      },
      _getDate: function(e) {
          var t = !e.currentYear || e.input && "" === e.input.val() ? null : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
          return t
      },
      _attachHandlers: function(t) {
          var i = this._get(t, "stepMonths"),
              a = "#" + t.id.replace(/\\\\/g, "\\");
          t.dpDiv.find("[data-handler]").map(function() {
              var t = {
                  prev: function() {
                      e.datepicker._adjustDate(a, -i, "M")
                  },
                  next: function() {
                      e.datepicker._adjustDate(a, +i, "M")
                  },
                  hide: function() {
                      e.datepicker._hideDatepicker()
                  },
                  today: function() {
                      e.datepicker._gotoToday(a)
                  },
                  selectDay: function() {
                      return e.datepicker._selectDay(a, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                  },
                  selectMonth: function() {
                      return e.datepicker._selectMonthYear(a, this, "M"), !1
                  },
                  selectYear: function() {
                      return e.datepicker._selectMonthYear(a, this, "Y"), !1
                  }
              };
              e(this).bind(this.getAttribute("data-event"), t[this.getAttribute("data-handler")])
          })
      },
      _generateHTML: function(e) {
          var t, i, a, s, n, r, o, u, c, h, l, d, p, g, m, f, _, v, k, y, b, D, w, M, C, x, I, N, T, A, E, S, Y, F, P, O, j, K, R, H = new Date,
              W = this._daylightSavingAdjust(new Date(H.getFullYear(), H.getMonth(), H.getDate())),
              L = this._get(e, "isRTL"),
              U = this._get(e, "showButtonPanel"),
              B = this._get(e, "hideIfNoPrevNext"),
              z = this._get(e, "navigationAsDateFormat"),
              q = this._getNumberOfMonths(e),
              G = this._get(e, "showCurrentAtPos"),
              J = this._get(e, "stepMonths"),
              Q = 1 !== q[0] || 1 !== q[1],
              V = this._daylightSavingAdjust(e.currentDay ? new Date(e.currentYear, e.currentMonth, e.currentDay) : new Date(9999, 9, 9)),
              $ = this._getMinMaxDate(e, "min"),
              X = this._getMinMaxDate(e, "max"),
              Z = e.drawMonth - G,
              et = e.drawYear;
          if (0 > Z && (Z += 12, et--), X)
              for (t = this._daylightSavingAdjust(new Date(X.getFullYear(), X.getMonth() - q[0] * q[1] + 1, X.getDate())), t = $ && $ > t ? $ : t; this._daylightSavingAdjust(new Date(et, Z, 1)) > t;) Z--, 0 > Z && (Z = 11, et--);
          for (e.drawMonth = Z, e.drawYear = et, i = this._get(e, "prevText"), i = z ? this.formatDate(i, this._daylightSavingAdjust(new Date(et, Z - J, 1)), this._getFormatConfig(e)) : i, a = this._canAdjustMonth(e, -1, et, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (L ? "e" : "w") + "'>" + i + "</span></a>" : B ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (L ? "e" : "w") + "'>" + i + "</span></a>", s = this._get(e, "nextText"), s = z ? this.formatDate(s, this._daylightSavingAdjust(new Date(et, Z + J, 1)), this._getFormatConfig(e)) : s, n = this._canAdjustMonth(e, 1, et, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (L ? "w" : "e") + "'>" + s + "</span></a>" : B ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (L ? "w" : "e") + "'>" + s + "</span></a>", r = this._get(e, "currentText"), o = this._get(e, "gotoCurrent") && e.currentDay ? V : W, r = z ? this.formatDate(r, o, this._getFormatConfig(e)) : r, u = e.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(e, "closeText") + "</button>", c = U ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (L ? u : "") + (this._isInRange(e, o) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + r + "</button>" : "") + (L ? "" : u) + "</div>" : "", h = parseInt(this._get(e, "firstDay"), 10), h = isNaN(h) ? 0 : h, l = this._get(e, "showWeek"), d = this._get(e, "dayNames"), p = this._get(e, "dayNamesMin"), g = this._get(e, "monthNames"), m = this._get(e, "monthNamesShort"), f = this._get(e, "beforeShowDay"), _ = this._get(e, "showOtherMonths"), v = this._get(e, "selectOtherMonths"), k = this._getDefaultDate(e), y = "", D = 0; q[0] > D; D++) {
              for (w = "", this.maxRows = 4, M = 0; q[1] > M; M++) {
                  if (C = this._daylightSavingAdjust(new Date(et, Z, e.selectedDay)), x = " ui-corner-all", I = "", Q) {
                      if (I += "<div class='ui-datepicker-group", q[1] > 1) switch (M) {
                          case 0:
                              I += " ui-datepicker-group-first", x = " ui-corner-" + (L ? "right" : "left");
                              break;
                          case q[1] - 1:
                              I += " ui-datepicker-group-last", x = " ui-corner-" + (L ? "left" : "right");
                              break;
                          default:
                              I += " ui-datepicker-group-middle", x = ""
                      }
                      I += "'>"
                  }
                  for (I += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + x + "'>" + (/all|left/.test(x) && 0 === D ? L ? n : a : "") + (/all|right/.test(x) && 0 === D ? L ? a : n : "") + this._generateMonthYearHeader(e, Z, et, $, X, D > 0 || M > 0, g, m) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", N = l ? "<th class='ui-datepicker-week-col'>" + this._get(e, "weekHeader") + "</th>" : "", b = 0; 7 > b; b++) T = (b + h) % 7, N += "<th" + ((b + h + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + d[T] + "'>" + p[T] + "</span></th>";
                  for (I += N + "</tr></thead><tbody>", A = this._getDaysInMonth(et, Z), et === e.selectedYear && Z === e.selectedMonth && (e.selectedDay = Math.min(e.selectedDay, A)), E = (this._getFirstDayOfMonth(et, Z) - h + 7) % 7, S = Math.ceil((E + A) / 7), Y = Q ? this.maxRows > S ? this.maxRows : S : S, this.maxRows = Y, F = this._daylightSavingAdjust(new Date(et, Z, 1 - E)), P = 0; Y > P; P++) {
                      for (I += "<tr>", O = l ? "<td class='ui-datepicker-week-col'>" + this._get(e, "calculateWeek")(F) + "</td>" : "", b = 0; 7 > b; b++) j = f ? f.apply(e.input ? e.input[0] : null, [F]) : [!0, ""], K = F.getMonth() !== Z, R = K && !v || !j[0] || $ && $ > F || X && F > X, O += "<td class='" + ((b + h + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (K ? " ui-datepicker-other-month" : "") + (F.getTime() === C.getTime() && Z === e.selectedMonth && e._keyEvent || k.getTime() === F.getTime() && k.getTime() === C.getTime() ? " " + this._dayOverClass : "") + (R ? " " + this._unselectableClass + " ui-state-disabled" : "") + (K && !_ ? "" : " " + j[1] + (F.getTime() === V.getTime() ? " " + this._currentClass : "") + (F.getTime() === W.getTime() ? " ui-datepicker-today" : "")) + "'" + (K && !_ || !j[2] ? "" : " title='" + j[2].replace(/'/g, "&#39;") + "'") + (R ? "" : " data-handler='selectDay' data-event='click' data-month='" + F.getMonth() + "' data-year='" + F.getFullYear() + "'") + ">" + (K && !_ ? "&#xa0;" : R ? "<span class='ui-state-default'>" + F.getDate() + "</span>" : "<a class='ui-state-default" + (F.getTime() === W.getTime() ? " ui-state-highlight" : "") + (F.getTime() === V.getTime() ? " ui-state-active" : "") + (K ? " ui-priority-secondary" : "") + "' href='#'>" + F.getDate() + "</a>") + "</td>", F.setDate(F.getDate() + 1), F = this._daylightSavingAdjust(F);
                      I += O + "</tr>"
                  }
                  Z++, Z > 11 && (Z = 0, et++), I += "</tbody></table>" + (Q ? "</div>" + (q[0] > 0 && M === q[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), w += I
              }
              y += w
          }
          return y += c, e._keyEvent = !1, y
      },
      _generateMonthYearHeader: function(e, t, i, a, s, n, r, o) {
          var u, c, h, l, d, p, g, m, f = this._get(e, "changeMonth"),
              _ = this._get(e, "changeYear"),
              v = this._get(e, "showMonthAfterYear"),
              k = "<div class='ui-datepicker-title'>",
              y = "";
          if (n || !f) y += "<span class='ui-datepicker-month'>" + r[t] + "</span>";
          else {
              for (u = a && a.getFullYear() === i, c = s && s.getFullYear() === i, y += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", h = 0; 12 > h; h++)(!u || h >= a.getMonth()) && (!c || s.getMonth() >= h) && (y += "<option value='" + h + "'" + (h === t ? " selected='selected'" : "") + ">" + o[h] + "</option>");
              y += "</select>"
          }
          if (v || (k += y + (!n && f && _ ? "" : "&#xa0;")), !e.yearshtml)
              if (e.yearshtml = "", n || !_) k += "<span class='ui-datepicker-year'>" + i + "</span>";
              else {
                  for (l = this._get(e, "yearRange").split(":"), d = (new Date).getFullYear(), p = function(e) {
                          var t = e.match(/c[+\-].*/) ? i + parseInt(e.substring(1), 10) : e.match(/[+\-].*/) ? d + parseInt(e, 10) : parseInt(e, 10);
                          return isNaN(t) ? d : t
                      }, g = p(l[0]), m = Math.max(g, p(l[1] || "")), g = a ? Math.max(g, a.getFullYear()) : g, m = s ? Math.min(m, s.getFullYear()) : m, e.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; m >= g; g++) e.yearshtml += "<option value='" + g + "'" + (g === i ? " selected='selected'" : "") + ">" + g + "</option>";
                  e.yearshtml += "</select>", k += e.yearshtml, e.yearshtml = null
              }
          return k += this._get(e, "yearSuffix"), v && (k += (!n && f && _ ? "" : "&#xa0;") + y), k += "</div>"
      },
      _adjustInstDate: function(e, t, i) {
          var a = e.drawYear + ("Y" === i ? t : 0),
              s = e.drawMonth + ("M" === i ? t : 0),
              n = Math.min(e.selectedDay, this._getDaysInMonth(a, s)) + ("D" === i ? t : 0),
              r = this._restrictMinMax(e, this._daylightSavingAdjust(new Date(a, s, n)));
          e.selectedDay = r.getDate(), e.drawMonth = e.selectedMonth = r.getMonth(), e.drawYear = e.selectedYear = r.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(e)
      },
      _restrictMinMax: function(e, t) {
          var i = this._getMinMaxDate(e, "min"),
              a = this._getMinMaxDate(e, "max"),
              s = i && i > t ? i : t;
          return a && s > a ? a : s
      },
      _notifyChange: function(e) {
          var t = this._get(e, "onChangeMonthYear");
          t && t.apply(e.input ? e.input[0] : null, [e.selectedYear, e.selectedMonth + 1, e])
      },
      _getNumberOfMonths: function(e) {
          var t = this._get(e, "numberOfMonths");
          return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t
      },
      _getMinMaxDate: function(e, t) {
          return this._determineDate(e, this._get(e, t + "Date"), null)
      },
      _getDaysInMonth: function(e, t) {
          return 32 - this._daylightSavingAdjust(new Date(e, t, 32)).getDate()
      },
      _getFirstDayOfMonth: function(e, t) {
          return new Date(e, t, 1).getDay()
      },
      _canAdjustMonth: function(e, t, i, a) {
          var s = this._getNumberOfMonths(e),
              n = this._daylightSavingAdjust(new Date(i, a + (0 > t ? t : s[0] * s[1]), 1));
          return 0 > t && n.setDate(this._getDaysInMonth(n.getFullYear(), n.getMonth())), this._isInRange(e, n)
      },
      _isInRange: function(e, t) {
          var i, a, s = this._getMinMaxDate(e, "min"),
              n = this._getMinMaxDate(e, "max"),
              r = null,
              o = null,
              u = this._get(e, "yearRange");
          return u && (i = u.split(":"), a = (new Date).getFullYear(), r = parseInt(i[0], 10), o = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (r += a), i[1].match(/[+\-].*/) && (o += a)), (!s || t.getTime() >= s.getTime()) && (!n || t.getTime() <= n.getTime()) && (!r || t.getFullYear() >= r) && (!o || o >= t.getFullYear())
      },
      _getFormatConfig: function(e) {
          var t = this._get(e, "shortYearCutoff");
          return t = "string" != typeof t ? t : (new Date).getFullYear() % 100 + parseInt(t, 10), {
              shortYearCutoff: t,
              dayNamesShort: this._get(e, "dayNamesShort"),
              dayNames: this._get(e, "dayNames"),
              monthNamesShort: this._get(e, "monthNamesShort"),
              monthNames: this._get(e, "monthNames")
          }
      },
      _formatDate: function(e, t, i, a) {
          t || (e.currentDay = e.selectedDay, e.currentMonth = e.selectedMonth, e.currentYear = e.selectedYear);
          var s = t ? "object" == typeof t ? t : this._daylightSavingAdjust(new Date(a, i, t)) : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
          return this.formatDate(this._get(e, "dateFormat"), s, this._getFormatConfig(e))
      }
  }), e.fn.datepicker = function(t) {
      if (!this.length) return this;
      e.datepicker.initialized || (e(document).mousedown(e.datepicker._checkExternalClick), e.datepicker.initialized = !0), 0 === e("#" + e.datepicker._mainDivId).length && e("body").append(e.datepicker.dpDiv);
      var i = Array.prototype.slice.call(arguments, 1);
      return "string" != typeof t || "isDisabled" !== t && "getDate" !== t && "widget" !== t ? "option" === t && 2 === arguments.length && "string" == typeof arguments[1] ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(i)) : this.each(function() {
          "string" == typeof t ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this].concat(i)) : e.datepicker._attachDatepicker(this, t)
      }) : e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(i))
  }, e.datepicker = new i, e.datepicker.initialized = !1, e.datepicker.uuid = (new Date).getTime(), e.datepicker.version = "1.10.4"
})(jQuery);
(function(e) {
  var t = {
          buttons: !0,
          height: !0,
          maxHeight: !0,
          maxWidth: !0,
          minHeight: !0,
          minWidth: !0,
          width: !0
      },
      i = {
          maxHeight: !0,
          maxWidth: !0,
          minHeight: !0,
          minWidth: !0
      };
  e.widget("ui.dialog", {
      version: "1.10.4",
      options: {
          appendTo: "body",
          autoOpen: !0,
          buttons: [],
          closeOnEscape: !0,
          closeText: "close",
          dialogClass: "",
          draggable: !0,
          hide: null,
          height: "auto",
          maxHeight: null,
          maxWidth: null,
          minHeight: 150,
          minWidth: 150,
          modal: !1,
          position: {
              my: "center",
              at: "center",
              of: window,
              collision: "fit",
              using: function(t) {
                  var i = e(this).css(t).offset().top;
                  0 > i && e(this).css("top", t.top - i)
              }
          },
          resizable: !0,
          show: null,
          title: null,
          width: 300,
          beforeClose: null,
          close: null,
          drag: null,
          dragStart: null,
          dragStop: null,
          focus: null,
          open: null,
          resize: null,
          resizeStart: null,
          resizeStop: null
      },
      _create: function() {
          this.originalCss = {
              display: this.element[0].style.display,
              width: this.element[0].style.width,
              minHeight: this.element[0].style.minHeight,
              maxHeight: this.element[0].style.maxHeight,
              height: this.element[0].style.height
          }, this.originalPosition = {
              parent: this.element.parent(),
              index: this.element.parent().children().index(this.element)
          }, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, this._createWrapper(), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), this._createTitlebar(), this._createButtonPane(), this.options.draggable && e.fn.draggable && this._makeDraggable(), this.options.resizable && e.fn.resizable && this._makeResizable(), this._isOpen = !1
      },
      _init: function() {
          this.options.autoOpen && this.open()
      },
      _appendTo: function() {
          var t = this.options.appendTo;
          return t && (t.jquery || t.nodeType) ? e(t) : this.document.find(t || "body").eq(0)
      },
      _destroy: function() {
          var e, t = this.originalPosition;
          this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), this.uiDialog.stop(!0, !0).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), e = t.parent.children().eq(t.index), e.length && e[0] !== this.element[0] ? e.before(this.element) : t.parent.append(this.element)
      },
      widget: function() {
          return this.uiDialog
      },
      disable: e.noop,
      enable: e.noop,
      close: function(t) {
          var i, a = this;
          if (this._isOpen && this._trigger("beforeClose", t) !== !1) {
              if (this._isOpen = !1, this._destroyOverlay(), !this.opener.filter(":focusable").focus().length) try {
                  i = this.document[0].activeElement, i && "body" !== i.nodeName.toLowerCase() && e(i).blur()
              } catch (s) {}
              this._hide(this.uiDialog, this.options.hide, function() {
                  a._trigger("close", t)
              })
          }
      },
      isOpen: function() {
          return this._isOpen
      },
      moveToTop: function() {
          this._moveToTop()
      },
      _moveToTop: function(e, t) {
          var i = !!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;
          return i && !t && this._trigger("focus", e), i
      },
      open: function() {
          var t = this;
          return this._isOpen ? (this._moveToTop() && this._focusTabbable(), undefined) : (this._isOpen = !0, this.opener = e(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this._show(this.uiDialog, this.options.show, function() {
              t._focusTabbable(), t._trigger("focus")
          }), this._trigger("open"), undefined)
      },
      _focusTabbable: function() {
          var e = this.element.find("[autofocus]");
          e.length || (e = this.element.find(":tabbable")), e.length || (e = this.uiDialogButtonPane.find(":tabbable")), e.length || (e = this.uiDialogTitlebarClose.filter(":tabbable")), e.length || (e = this.uiDialog), e.eq(0).focus()
      },
      _keepFocus: function(t) {
          function i() {
              var t = this.document[0].activeElement,
                  i = this.uiDialog[0] === t || e.contains(this.uiDialog[0], t);
              i || this._focusTabbable()
          }
          t.preventDefault(), i.call(this), this._delay(i)
      },
      _createWrapper: function() {
          this.uiDialog = e("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
              tabIndex: -1,
              role: "dialog"
          }).appendTo(this._appendTo()), this._on(this.uiDialog, {
              keydown: function(t) {
                  if (this.options.closeOnEscape && !t.isDefaultPrevented() && t.keyCode && t.keyCode === e.ui.keyCode.ESCAPE) return t.preventDefault(), this.close(t), undefined;
                  if (t.keyCode === e.ui.keyCode.TAB) {
                      var i = this.uiDialog.find(":tabbable"),
                          a = i.filter(":first"),
                          s = i.filter(":last");
                      t.target !== s[0] && t.target !== this.uiDialog[0] || t.shiftKey ? t.target !== a[0] && t.target !== this.uiDialog[0] || !t.shiftKey || (s.focus(1), t.preventDefault()) : (a.focus(1), t.preventDefault())
                  }
              },
              mousedown: function(e) {
                  this._moveToTop(e) && this._focusTabbable()
              }
          }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
              "aria-describedby": this.element.uniqueId().attr("id")
          })
      },
      _createTitlebar: function() {
          var t;
          this.uiDialogTitlebar = e("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), this._on(this.uiDialogTitlebar, {
              mousedown: function(t) {
                  e(t.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
              }
          }), this.uiDialogTitlebarClose = e("<button type='button'></button>").button({
              label: this.options.closeText,
              icons: {
                  primary: "ui-icon-closethick"
              },
              text: !1
          }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, {
              click: function(e) {
                  e.preventDefault(), this.close(e)
              }
          }), t = e("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), this._title(t), this.uiDialog.attr({
              "aria-labelledby": t.attr("id")
          })
      },
      _title: function(e) {
          this.options.title || e.html("&#160;"), e.text(this.options.title)
      },
      _createButtonPane: function() {
          this.uiDialogButtonPane = e("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), this.uiButtonSet = e("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), this._createButtons()
      },
      _createButtons: function() {
          var t = this,
              i = this.options.buttons;
          return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), e.isEmptyObject(i) || e.isArray(i) && !i.length ? (this.uiDialog.removeClass("ui-dialog-buttons"), undefined) : (e.each(i, function(i, a) {
              var s, n;
              a = e.isFunction(a) ? {
                  click: a,
                  text: i
              } : a, a = e.extend({
                  type: "button"
              }, a), s = a.click, a.click = function() {
                  s.apply(t.element[0], arguments)
              }, n = {
                  icons: a.icons,
                  text: a.showText
              }, delete a.icons, delete a.showText, e("<button></button>", a).button(n).appendTo(t.uiButtonSet)
          }), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog), undefined)
      },
      _makeDraggable: function() {
          function t(e) {
              return {
                  position: e.position,
                  offset: e.offset
              }
          }
          var i = this,
              a = this.options;
          this.uiDialog.draggable({
              cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
              handle: ".ui-dialog-titlebar",
              containment: "document",
              start: function(a, s) {
                  e(this).addClass("ui-dialog-dragging"), i._blockFrames(), i._trigger("dragStart", a, t(s))
              },
              drag: function(e, a) {
                  i._trigger("drag", e, t(a))
              },
              stop: function(s, n) {
                  a.position = [n.position.left - i.document.scrollLeft(), n.position.top - i.document.scrollTop()], e(this).removeClass("ui-dialog-dragging"), i._unblockFrames(), i._trigger("dragStop", s, t(n))
              }
          })
      },
      _makeResizable: function() {
          function t(e) {
              return {
                  originalPosition: e.originalPosition,
                  originalSize: e.originalSize,
                  position: e.position,
                  size: e.size
              }
          }
          var i = this,
              a = this.options,
              s = a.resizable,
              n = this.uiDialog.css("position"),
              r = "string" == typeof s ? s : "n,e,s,w,se,sw,ne,nw";
          this.uiDialog.resizable({
              cancel: ".ui-dialog-content",
              containment: "document",
              alsoResize: this.element,
              maxWidth: a.maxWidth,
              maxHeight: a.maxHeight,
              minWidth: a.minWidth,
              minHeight: this._minHeight(),
              handles: r,
              start: function(a, s) {
                  e(this).addClass("ui-dialog-resizing"), i._blockFrames(), i._trigger("resizeStart", a, t(s))
              },
              resize: function(e, a) {
                  i._trigger("resize", e, t(a))
              },
              stop: function(s, n) {
                  a.height = e(this).height(), a.width = e(this).width(), e(this).removeClass("ui-dialog-resizing"), i._unblockFrames(), i._trigger("resizeStop", s, t(n))
              }
          }).css("position", n)
      },
      _minHeight: function() {
          var e = this.options;
          return "auto" === e.height ? e.minHeight : Math.min(e.minHeight, e.height)
      },
      _position: function() {
          var e = this.uiDialog.is(":visible");
          e || this.uiDialog.show(), this.uiDialog.position(this.options.position), e || this.uiDialog.hide()
      },
      _setOptions: function(a) {
          var s = this,
              n = !1,
              r = {};
          e.each(a, function(e, a) {
              s._setOption(e, a), e in t && (n = !0), e in i && (r[e] = a)
          }), n && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", r)
      },
      _setOption: function(e, t) {
          var i, a, s = this.uiDialog;
          "dialogClass" === e && s.removeClass(this.options.dialogClass).addClass(t), "disabled" !== e && (this._super(e, t), "appendTo" === e && this.uiDialog.appendTo(this._appendTo()), "buttons" === e && this._createButtons(), "closeText" === e && this.uiDialogTitlebarClose.button({
              label: "" + t
          }), "draggable" === e && (i = s.is(":data(ui-draggable)"), i && !t && s.draggable("destroy"), !i && t && this._makeDraggable()), "position" === e && this._position(), "resizable" === e && (a = s.is(":data(ui-resizable)"), a && !t && s.resizable("destroy"), a && "string" == typeof t && s.resizable("option", "handles", t), a || t === !1 || this._makeResizable()), "title" === e && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
      },
      _size: function() {
          var e, t, i, a = this.options;
          this.element.show().css({
              width: "auto",
              minHeight: 0,
              maxHeight: "none",
              height: 0
          }), a.minWidth > a.width && (a.width = a.minWidth), e = this.uiDialog.css({
              height: "auto",
              width: a.width
          }).outerHeight(), t = Math.max(0, a.minHeight - e), i = "number" == typeof a.maxHeight ? Math.max(0, a.maxHeight - e) : "none", "auto" === a.height ? this.element.css({
              minHeight: t,
              maxHeight: i,
              height: "auto"
          }) : this.element.height(Math.max(0, a.height - e)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
      },
      _blockFrames: function() {
          this.iframeBlocks = this.document.find("iframe").map(function() {
              var t = e(this);
              return e("<div>").css({
                  position: "absolute",
                  width: t.outerWidth(),
                  height: t.outerHeight()
              }).appendTo(t.parent()).offset(t.offset())[0]
          })
      },
      _unblockFrames: function() {
          this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
      },
      _allowInteraction: function(t) {
          return e(t.target).closest(".ui-dialog").length ? !0 : !!e(t.target).closest(".ui-datepicker").length
      },
      _createOverlay: function() {
          if (this.options.modal) {
              var t = this,
                  i = this.widgetFullName;
              e.ui.dialog.overlayInstances || this._delay(function() {
                  e.ui.dialog.overlayInstances && this.document.bind("focusin.dialog", function(a) {
                      t._allowInteraction(a) || (a.preventDefault(), e(".ui-dialog:visible:last .ui-dialog-content").data(i)._focusTabbable())
                  })
              }), this.overlay = e("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), this._on(this.overlay, {
                  mousedown: "_keepFocus"
              }), e.ui.dialog.overlayInstances++
          }
      },
      _destroyOverlay: function() {
          this.options.modal && this.overlay && (e.ui.dialog.overlayInstances--, e.ui.dialog.overlayInstances || this.document.unbind("focusin.dialog"), this.overlay.remove(), this.overlay = null)
      }
  }), e.ui.dialog.overlayInstances = 0, e.uiBackCompat !== !1 && e.widget("ui.dialog", e.ui.dialog, {
      _position: function() {
          var t, i = this.options.position,
              a = [],
              s = [0, 0];
          i ? (("string" == typeof i || "object" == typeof i && "0" in i) && (a = i.split ? i.split(" ") : [i[0], i[1]], 1 === a.length && (a[1] = a[0]), e.each(["left", "top"], function(e, t) {
              +a[e] === a[e] && (s[e] = a[e], a[e] = t)
          }), i = {
              my: a[0] + (0 > s[0] ? s[0] : "+" + s[0]) + " " + a[1] + (0 > s[1] ? s[1] : "+" + s[1]),
              at: a.join(" ")
          }), i = e.extend({}, e.ui.dialog.prototype.options.position, i)) : i = e.ui.dialog.prototype.options.position, t = this.uiDialog.is(":visible"), t || this.uiDialog.show(), this.uiDialog.position(i), t || this.uiDialog.hide()
      }
  })
})(jQuery);
(function(t) {
  t.widget("ui.draggable", t.ui.mouse, {
      version: "1.10.4",
      widgetEventPrefix: "drag",
      options: {
          addClasses: !0,
          appendTo: "parent",
          axis: !1,
          connectToSortable: !1,
          containment: !1,
          cursor: "auto",
          cursorAt: !1,
          grid: !1,
          handle: !1,
          helper: "original",
          iframeFix: !1,
          opacity: !1,
          refreshPositions: !1,
          revert: !1,
          revertDuration: 500,
          scope: "default",
          scroll: !0,
          scrollSensitivity: 20,
          scrollSpeed: 20,
          snap: !1,
          snapMode: "both",
          snapTolerance: 20,
          stack: !1,
          zIndex: !1,
          drag: null,
          start: null,
          stop: null
      },
      _create: function() {
          "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
      },
      _destroy: function() {
          this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
      },
      _mouseCapture: function(e) {
          var i = this.options;
          return this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e), this.handle ? (t(i.iframeFix === !0 ? "iframe" : i.iframeFix).each(function() {
              t("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                  width: this.offsetWidth + "px",
                  height: this.offsetHeight + "px",
                  position: "absolute",
                  opacity: "0.001",
                  zIndex: 1e3
              }).css(t(this).offset()).appendTo("body")
          }), !0) : !1)
      },
      _mouseStart: function(e) {
          var i = this.options;
          return this.helper = this._createHelper(e), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {
              top: this.offset.top - this.margins.top,
              left: this.offset.left - this.margins.left
          }, this.offset.scroll = !1, t.extend(this.offset, {
              click: {
                  left: e.pageX - this.offset.left,
                  top: e.pageY - this.offset.top
              },
              parent: this._getParentOffset(),
              relative: this._getRelativeOffset()
          }), this.originalPosition = this.position = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
      },
      _mouseDrag: function(e, i) {
          if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), !i) {
              var s = this._uiHash();
              if (this._trigger("drag", e, s) === !1) return this._mouseUp({}), !1;
              this.position = s.position
          }
          return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1
      },
      _mouseStop: function(e) {
          var i = this,
              s = !1;
          return t.ui.ddmanager && !this.options.dropBehaviour && (s = t.ui.ddmanager.drop(this, e)), this.dropped && (s = this.dropped, this.dropped = !1), "original" !== this.options.helper || t.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
              i._trigger("stop", e) !== !1 && i._clear()
          }) : this._trigger("stop", e) !== !1 && this._clear(), !1) : !1
      },
      _mouseUp: function(e) {
          return t("div.ui-draggable-iframeFix").each(function() {
              this.parentNode.removeChild(this)
          }), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), t.ui.mouse.prototype._mouseUp.call(this, e)
      },
      cancel: function() {
          return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
      },
      _getHandle: function(e) {
          return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : !0
      },
      _createHelper: function(e) {
          var i = this.options,
              s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
          return s.parents("body").length || s.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s[0] === this.element[0] || /(fixed|absolute)/.test(s.css("position")) || s.css("position", "absolute"), s
      },
      _adjustOffsetFromHelper: function(e) {
          "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
              left: +e[0],
              top: +e[1] || 0
          }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
      },
      _getParentOffset: function() {
          var e = this.offsetParent.offset();
          return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
              top: 0,
              left: 0
          }), {
              top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
              left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
          }
      },
      _getRelativeOffset: function() {
          if ("relative" === this.cssPosition) {
              var t = this.element.position();
              return {
                  top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                  left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
              }
          }
          return {
              top: 0,
              left: 0
          }
      },
      _cacheMargins: function() {
          this.margins = {
              left: parseInt(this.element.css("marginLeft"), 10) || 0,
              top: parseInt(this.element.css("marginTop"), 10) || 0,
              right: parseInt(this.element.css("marginRight"), 10) || 0,
              bottom: parseInt(this.element.css("marginBottom"), 10) || 0
          }
      },
      _cacheHelperProportions: function() {
          this.helperProportions = {
              width: this.helper.outerWidth(),
              height: this.helper.outerHeight()
          }
      },
      _setContainment: function() {
          var e, i, s, n = this.options;
          return n.containment ? "window" === n.containment ? (this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : "document" === n.containment ? (this.containment = [0, 0, t(document).width() - this.helperProportions.width - this.margins.left, (t(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : n.containment.constructor === Array ? (this.containment = n.containment, undefined) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = t(n.containment), s = i[0], s && (e = "hidden" !== i.css("overflow"), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = i), undefined) : (this.containment = null, undefined)
      },
      _convertPositionTo: function(e, i) {
          i || (i = this.position);
          var s = "absolute" === e ? 1 : -1,
              n = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
          return this.offset.scroll || (this.offset.scroll = {
              top: n.scrollTop(),
              left: n.scrollLeft()
          }), {
              top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * s,
              left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * s
          }
      },
      _generatePosition: function(e) {
          var i, s, n, a, o = this.options,
              r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
              l = e.pageX,
              h = e.pageY;
          return this.offset.scroll || (this.offset.scroll = {
              top: r.scrollTop(),
              left: r.scrollLeft()
          }), this.originalPosition && (this.containment && (this.relative_container ? (s = this.relative_container.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, e.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), e.pageY - this.offset.click.top < i[1] && (h = i[1] + this.offset.click.top), e.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), e.pageY - this.offset.click.top > i[3] && (h = i[3] + this.offset.click.top)), o.grid && (n = o.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY, h = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - o.grid[1] : n + o.grid[1] : n, a = o.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX, l = i ? a - this.offset.click.left >= i[0] || a - this.offset.click.left > i[2] ? a : a - this.offset.click.left >= i[0] ? a - o.grid[0] : a + o.grid[0] : a)), {
              top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
              left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
          }
      },
      _clear: function() {
          this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
      },
      _trigger: function(e, i, s) {
          return s = s || this._uiHash(), t.ui.plugin.call(this, e, [i, s]), "drag" === e && (this.positionAbs = this._convertPositionTo("absolute")), t.Widget.prototype._trigger.call(this, e, i, s)
      },
      plugins: {},
      _uiHash: function() {
          return {
              helper: this.helper,
              position: this.position,
              originalPosition: this.originalPosition,
              offset: this.positionAbs
          }
      }
  }), t.ui.plugin.add("draggable", "connectToSortable", {
      start: function(e, i) {
          var s = t(this).data("ui-draggable"),
              n = s.options,
              a = t.extend({}, i, {
                  item: s.element
              });
          s.sortables = [], t(n.connectToSortable).each(function() {
              var i = t.data(this, "ui-sortable");
              i && !i.options.disabled && (s.sortables.push({
                  instance: i,
                  shouldRevert: i.options.revert
              }), i.refreshPositions(), i._trigger("activate", e, a))
          })
      },
      stop: function(e, i) {
          var s = t(this).data("ui-draggable"),
              n = t.extend({}, i, {
                  item: s.element
              });
          t.each(s.sortables, function() {
              this.instance.isOver ? (this.instance.isOver = 0, s.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(e), this.instance.options.helper = this.instance.options._helper, "original" === s.options.helper && this.instance.currentItem.css({
                  top: "auto",
                  left: "auto"
              })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", e, n))
          })
      },
      drag: function(e, i) {
          var s = t(this).data("ui-draggable"),
              n = this;
          t.each(s.sortables, function() {
              var a = !1,
                  o = this;
              this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions, this.instance.offset.click = s.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (a = !0, t.each(s.sortables, function() {
                  return this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions, this.instance.offset.click = s.offset.click, this !== o && this.instance._intersectsWith(this.instance.containerCache) && t.contains(o.instance.element[0], this.instance.element[0]) && (a = !1), a
              })), a ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = t(n).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                  return i.helper[0]
              }, e.target = this.instance.currentItem[0], this.instance._mouseCapture(e, !0), this.instance._mouseStart(e, !0, !0), this.instance.offset.click.top = s.offset.click.top, this.instance.offset.click.left = s.offset.click.left, this.instance.offset.parent.left -= s.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= s.offset.parent.top - this.instance.offset.parent.top, s._trigger("toSortable", e), s.dropped = this.instance.element, s.currentItem = s.element, this.instance.fromOutside = s), this.instance.currentItem && this.instance._mouseDrag(e)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", e, this.instance._uiHash(this.instance)), this.instance._mouseStop(e, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), s._trigger("fromSortable", e), s.dropped = !1)
          })
      }
  }), t.ui.plugin.add("draggable", "cursor", {
      start: function() {
          var e = t("body"),
              i = t(this).data("ui-draggable").options;
          e.css("cursor") && (i._cursor = e.css("cursor")), e.css("cursor", i.cursor)
      },
      stop: function() {
          var e = t(this).data("ui-draggable").options;
          e._cursor && t("body").css("cursor", e._cursor)
      }
  }), t.ui.plugin.add("draggable", "opacity", {
      start: function(e, i) {
          var s = t(i.helper),
              n = t(this).data("ui-draggable").options;
          s.css("opacity") && (n._opacity = s.css("opacity")), s.css("opacity", n.opacity)
      },
      stop: function(e, i) {
          var s = t(this).data("ui-draggable").options;
          s._opacity && t(i.helper).css("opacity", s._opacity)
      }
  }), t.ui.plugin.add("draggable", "scroll", {
      start: function() {
          var e = t(this).data("ui-draggable");
          e.scrollParent[0] !== document && "HTML" !== e.scrollParent[0].tagName && (e.overflowOffset = e.scrollParent.offset())
      },
      drag: function(e) {
          var i = t(this).data("ui-draggable"),
              s = i.options,
              n = !1;
          i.scrollParent[0] !== document && "HTML" !== i.scrollParent[0].tagName ? (s.axis && "x" === s.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - e.pageY < s.scrollSensitivity ? i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop + s.scrollSpeed : e.pageY - i.overflowOffset.top < s.scrollSensitivity && (i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop - s.scrollSpeed)), s.axis && "y" === s.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - e.pageX < s.scrollSensitivity ? i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft + s.scrollSpeed : e.pageX - i.overflowOffset.left < s.scrollSensitivity && (i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft - s.scrollSpeed))) : (s.axis && "x" === s.axis || (e.pageY - t(document).scrollTop() < s.scrollSensitivity ? n = t(document).scrollTop(t(document).scrollTop() - s.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < s.scrollSensitivity && (n = t(document).scrollTop(t(document).scrollTop() + s.scrollSpeed))), s.axis && "y" === s.axis || (e.pageX - t(document).scrollLeft() < s.scrollSensitivity ? n = t(document).scrollLeft(t(document).scrollLeft() - s.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < s.scrollSensitivity && (n = t(document).scrollLeft(t(document).scrollLeft() + s.scrollSpeed)))), n !== !1 && t.ui.ddmanager && !s.dropBehaviour && t.ui.ddmanager.prepareOffsets(i, e)
      }
  }), t.ui.plugin.add("draggable", "snap", {
      start: function() {
          var e = t(this).data("ui-draggable"),
              i = e.options;
          e.snapElements = [], t(i.snap.constructor !== String ? i.snap.items || ":data(ui-draggable)" : i.snap).each(function() {
              var i = t(this),
                  s = i.offset();
              this !== e.element[0] && e.snapElements.push({
                  item: this,
                  width: i.outerWidth(),
                  height: i.outerHeight(),
                  top: s.top,
                  left: s.left
              })
          })
      },
      drag: function(e, i) {
          var s, n, a, o, r, l, h, c, u, d, p = t(this).data("ui-draggable"),
              g = p.options,
              f = g.snapTolerance,
              m = i.offset.left,
              _ = m + p.helperProportions.width,
              v = i.offset.top,
              b = v + p.helperProportions.height;
          for (u = p.snapElements.length - 1; u >= 0; u--) r = p.snapElements[u].left, l = r + p.snapElements[u].width, h = p.snapElements[u].top, c = h + p.snapElements[u].height, r - f > _ || m > l + f || h - f > b || v > c + f || !t.contains(p.snapElements[u].item.ownerDocument, p.snapElements[u].item) ? (p.snapElements[u].snapping && p.options.snap.release && p.options.snap.release.call(p.element, e, t.extend(p._uiHash(), {
              snapItem: p.snapElements[u].item
          })), p.snapElements[u].snapping = !1) : ("inner" !== g.snapMode && (s = f >= Math.abs(h - b), n = f >= Math.abs(c - v), a = f >= Math.abs(r - _), o = f >= Math.abs(l - m), s && (i.position.top = p._convertPositionTo("relative", {
              top: h - p.helperProportions.height,
              left: 0
          }).top - p.margins.top), n && (i.position.top = p._convertPositionTo("relative", {
              top: c,
              left: 0
          }).top - p.margins.top), a && (i.position.left = p._convertPositionTo("relative", {
              top: 0,
              left: r - p.helperProportions.width
          }).left - p.margins.left), o && (i.position.left = p._convertPositionTo("relative", {
              top: 0,
              left: l
          }).left - p.margins.left)), d = s || n || a || o, "outer" !== g.snapMode && (s = f >= Math.abs(h - v), n = f >= Math.abs(c - b), a = f >= Math.abs(r - m), o = f >= Math.abs(l - _), s && (i.position.top = p._convertPositionTo("relative", {
              top: h,
              left: 0
          }).top - p.margins.top), n && (i.position.top = p._convertPositionTo("relative", {
              top: c - p.helperProportions.height,
              left: 0
          }).top - p.margins.top), a && (i.position.left = p._convertPositionTo("relative", {
              top: 0,
              left: r
          }).left - p.margins.left), o && (i.position.left = p._convertPositionTo("relative", {
              top: 0,
              left: l - p.helperProportions.width
          }).left - p.margins.left)), !p.snapElements[u].snapping && (s || n || a || o || d) && p.options.snap.snap && p.options.snap.snap.call(p.element, e, t.extend(p._uiHash(), {
              snapItem: p.snapElements[u].item
          })), p.snapElements[u].snapping = s || n || a || o || d)
      }
  }), t.ui.plugin.add("draggable", "stack", {
      start: function() {
          var e, i = this.data("ui-draggable").options,
              s = t.makeArray(t(i.stack)).sort(function(e, i) {
                  return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0)
              });
          s.length && (e = parseInt(t(s[0]).css("zIndex"), 10) || 0, t(s).each(function(i) {
              t(this).css("zIndex", e + i)
          }), this.css("zIndex", e + s.length))
      }
  }), t.ui.plugin.add("draggable", "zIndex", {
      start: function(e, i) {
          var s = t(i.helper),
              n = t(this).data("ui-draggable").options;
          s.css("zIndex") && (n._zIndex = s.css("zIndex")), s.css("zIndex", n.zIndex)
      },
      stop: function(e, i) {
          var s = t(this).data("ui-draggable").options;
          s._zIndex && t(i.helper).css("zIndex", s._zIndex)
      }
  })
})(jQuery);
(function(t) {
  function e(t, e, i) {
      return t > e && e + i > t
  }
  t.widget("ui.droppable", {
      version: "1.10.4",
      widgetEventPrefix: "drop",
      options: {
          accept: "*",
          activeClass: !1,
          addClasses: !0,
          greedy: !1,
          hoverClass: !1,
          scope: "default",
          tolerance: "intersect",
          activate: null,
          deactivate: null,
          drop: null,
          out: null,
          over: null
      },
      _create: function() {
          var e, i = this.options,
              s = i.accept;
          this.isover = !1, this.isout = !0, this.accept = t.isFunction(s) ? s : function(t) {
              return t.is(s)
          }, this.proportions = function() {
              return arguments.length ? (e = arguments[0], undefined) : e ? e : e = {
                  width: this.element[0].offsetWidth,
                  height: this.element[0].offsetHeight
              }
          }, t.ui.ddmanager.droppables[i.scope] = t.ui.ddmanager.droppables[i.scope] || [], t.ui.ddmanager.droppables[i.scope].push(this), i.addClasses && this.element.addClass("ui-droppable")
      },
      _destroy: function() {
          for (var e = 0, i = t.ui.ddmanager.droppables[this.options.scope]; i.length > e; e++) i[e] === this && i.splice(e, 1);
          this.element.removeClass("ui-droppable ui-droppable-disabled")
      },
      _setOption: function(e, i) {
          "accept" === e && (this.accept = t.isFunction(i) ? i : function(t) {
              return t.is(i)
          }), t.Widget.prototype._setOption.apply(this, arguments)
      },
      _activate: function(e) {
          var i = t.ui.ddmanager.current;
          this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", e, this.ui(i))
      },
      _deactivate: function(e) {
          var i = t.ui.ddmanager.current;
          this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", e, this.ui(i))
      },
      _over: function(e) {
          var i = t.ui.ddmanager.current;
          i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", e, this.ui(i)))
      },
      _out: function(e) {
          var i = t.ui.ddmanager.current;
          i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", e, this.ui(i)))
      },
      _drop: function(e, i) {
          var s = i || t.ui.ddmanager.current,
              n = !1;
          return s && (s.currentItem || s.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
              var e = t.data(this, "ui-droppable");
              return e.options.greedy && !e.options.disabled && e.options.scope === s.options.scope && e.accept.call(e.element[0], s.currentItem || s.element) && t.ui.intersect(s, t.extend(e, {
                  offset: e.element.offset()
              }), e.options.tolerance) ? (n = !0, !1) : undefined
          }), n ? !1 : this.accept.call(this.element[0], s.currentItem || s.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", e, this.ui(s)), this.element) : !1) : !1
      },
      ui: function(t) {
          return {
              draggable: t.currentItem || t.element,
              helper: t.helper,
              position: t.position,
              offset: t.positionAbs
          }
      }
  }), t.ui.intersect = function(t, i, s) {
      if (!i.offset) return !1;
      var n, a, o = (t.positionAbs || t.position.absolute).left,
          r = (t.positionAbs || t.position.absolute).top,
          l = o + t.helperProportions.width,
          h = r + t.helperProportions.height,
          c = i.offset.left,
          u = i.offset.top,
          d = c + i.proportions().width,
          p = u + i.proportions().height;
      switch (s) {
          case "fit":
              return o >= c && d >= l && r >= u && p >= h;
          case "intersect":
              return o + t.helperProportions.width / 2 > c && d > l - t.helperProportions.width / 2 && r + t.helperProportions.height / 2 > u && p > h - t.helperProportions.height / 2;
          case "pointer":
              return n = (t.positionAbs || t.position.absolute).left + (t.clickOffset || t.offset.click).left, a = (t.positionAbs || t.position.absolute).top + (t.clickOffset || t.offset.click).top, e(a, u, i.proportions().height) && e(n, c, i.proportions().width);
          case "touch":
              return (r >= u && p >= r || h >= u && p >= h || u > r && h > p) && (o >= c && d >= o || l >= c && d >= l || c > o && l > d);
          default:
              return !1
      }
  }, t.ui.ddmanager = {
      current: null,
      droppables: {
          "default": []
      },
      prepareOffsets: function(e, i) {
          var s, n, a = t.ui.ddmanager.droppables[e.options.scope] || [],
              o = i ? i.type : null,
              r = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
          t: for (s = 0; a.length > s; s++)
              if (!(a[s].options.disabled || e && !a[s].accept.call(a[s].element[0], e.currentItem || e.element))) {
                  for (n = 0; r.length > n; n++)
                      if (r[n] === a[s].element[0]) {
                          a[s].proportions().height = 0;
                          continue t
                      }
                  a[s].visible = "none" !== a[s].element.css("display"), a[s].visible && ("mousedown" === o && a[s]._activate.call(a[s], i), a[s].offset = a[s].element.offset(), a[s].proportions({
                      width: a[s].element[0].offsetWidth,
                      height: a[s].element[0].offsetHeight
                  }))
              }
      },
      drop: function(e, i) {
          var s = !1;
          return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function() {
              this.options && (!this.options.disabled && this.visible && t.ui.intersect(e, this, this.options.tolerance) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
          }), s
      },
      dragStart: function(e, i) {
          e.element.parentsUntil("body").bind("scroll.droppable", function() {
              e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
          })
      },
      drag: function(e, i) {
          e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
              if (!this.options.disabled && !this.greedyChild && this.visible) {
                  var s, n, a, o = t.ui.intersect(e, this, this.options.tolerance),
                      r = !o && this.isover ? "isout" : o && !this.isover ? "isover" : null;
                  r && (this.options.greedy && (n = this.options.scope, a = this.element.parents(":data(ui-droppable)").filter(function() {
                      return t.data(this, "ui-droppable").options.scope === n
                  }), a.length && (s = t.data(a[0], "ui-droppable"), s.greedyChild = "isover" === r)), s && "isover" === r && (s.isover = !1, s.isout = !0, s._out.call(s, i)), this[r] = !0, this["isout" === r ? "isover" : "isout"] = !1, this["isover" === r ? "_over" : "_out"].call(this, i), s && "isout" === r && (s.isout = !1, s.isover = !0, s._over.call(s, i)))
              }
          })
      },
      dragStop: function(e, i) {
          e.element.parentsUntil("body").unbind("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
      }
  }
})(jQuery);
(function(t, e) {
  var i = "ui-effects-";
  t.effects = {
          effect: {}
      },
      function(t, e) {
          function i(t, e, i) {
              var s = u[e.type] || {};
              return null == t ? i || !e.def ? null : e.def : (t = s.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : s.mod ? (t + s.mod) % s.mod : 0 > t ? 0 : t > s.max ? s.max : t)
          }

          function s(i) {
              var s = h(),
                  n = s._rgba = [];
              return i = i.toLowerCase(), f(l, function(t, a) {
                  var o, r = a.re.exec(i),
                      l = r && a.parse(r),
                      h = a.space || "rgba";
                  return l ? (o = s[h](l), s[c[h].cache] = o[c[h].cache], n = s._rgba = o._rgba, !1) : e
              }), n.length ? ("0,0,0,0" === n.join() && t.extend(n, a.transparent), s) : a[i]
          }

          function n(t, e, i) {
              return i = (i + 1) % 1, 1 > 6 * i ? t + 6 * (e - t) * i : 1 > 2 * i ? e : 2 > 3 * i ? t + 6 * (e - t) * (2 / 3 - i) : t
          }
          var a, o = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
              r = /^([\-+])=\s*(\d+\.?\d*)/,
              l = [{
                  re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                  parse: function(t) {
                      return [t[1], t[2], t[3], t[4]]
                  }
              }, {
                  re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                  parse: function(t) {
                      return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
                  }
              }, {
                  re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                  parse: function(t) {
                      return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
                  }
              }, {
                  re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                  parse: function(t) {
                      return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)]
                  }
              }, {
                  re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                  space: "hsla",
                  parse: function(t) {
                      return [t[1], t[2] / 100, t[3] / 100, t[4]]
                  }
              }],
              h = t.Color = function(e, i, s, n) {
                  return new t.Color.fn.parse(e, i, s, n)
              },
              c = {
                  rgba: {
                      props: {
                          red: {
                              idx: 0,
                              type: "byte"
                          },
                          green: {
                              idx: 1,
                              type: "byte"
                          },
                          blue: {
                              idx: 2,
                              type: "byte"
                          }
                      }
                  },
                  hsla: {
                      props: {
                          hue: {
                              idx: 0,
                              type: "degrees"
                          },
                          saturation: {
                              idx: 1,
                              type: "percent"
                          },
                          lightness: {
                              idx: 2,
                              type: "percent"
                          }
                      }
                  }
              },
              u = {
                  "byte": {
                      floor: !0,
                      max: 255
                  },
                  percent: {
                      max: 1
                  },
                  degrees: {
                      mod: 360,
                      floor: !0
                  }
              },
              d = h.support = {},
              p = t("<p>")[0],
              f = t.each;
          p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(c, function(t, e) {
              e.cache = "_" + t, e.props.alpha = {
                  idx: 3,
                  type: "percent",
                  def: 1
              }
          }), h.fn = t.extend(h.prototype, {
              parse: function(n, o, r, l) {
                  if (n === e) return this._rgba = [null, null, null, null], this;
                  (n.jquery || n.nodeType) && (n = t(n).css(o), o = e);
                  var u = this,
                      d = t.type(n),
                      p = this._rgba = [];
                  return o !== e && (n = [n, o, r, l], d = "array"), "string" === d ? this.parse(s(n) || a._default) : "array" === d ? (f(c.rgba.props, function(t, e) {
                      p[e.idx] = i(n[e.idx], e)
                  }), this) : "object" === d ? (n instanceof h ? f(c, function(t, e) {
                      n[e.cache] && (u[e.cache] = n[e.cache].slice())
                  }) : f(c, function(e, s) {
                      var a = s.cache;
                      f(s.props, function(t, e) {
                          if (!u[a] && s.to) {
                              if ("alpha" === t || null == n[t]) return;
                              u[a] = s.to(u._rgba)
                          }
                          u[a][e.idx] = i(n[t], e, !0)
                      }), u[a] && 0 > t.inArray(null, u[a].slice(0, 3)) && (u[a][3] = 1, s.from && (u._rgba = s.from(u[a])))
                  }), this) : e
              },
              is: function(t) {
                  var i = h(t),
                      s = !0,
                      n = this;
                  return f(c, function(t, a) {
                      var o, r = i[a.cache];
                      return r && (o = n[a.cache] || a.to && a.to(n._rgba) || [], f(a.props, function(t, i) {
                          return null != r[i.idx] ? s = r[i.idx] === o[i.idx] : e
                      })), s
                  }), s
              },
              _space: function() {
                  var t = [],
                      e = this;
                  return f(c, function(i, s) {
                      e[s.cache] && t.push(i)
                  }), t.pop()
              },
              transition: function(t, e) {
                  var s = h(t),
                      n = s._space(),
                      a = c[n],
                      o = 0 === this.alpha() ? h("transparent") : this,
                      r = o[a.cache] || a.to(o._rgba),
                      l = r.slice();
                  return s = s[a.cache], f(a.props, function(t, n) {
                      var a = n.idx,
                          o = r[a],
                          h = s[a],
                          c = u[n.type] || {};
                      null !== h && (null === o ? l[a] = h : (c.mod && (h - o > c.mod / 2 ? o += c.mod : o - h > c.mod / 2 && (o -= c.mod)), l[a] = i((h - o) * e + o, n)))
                  }), this[n](l)
              },
              blend: function(e) {
                  if (1 === this._rgba[3]) return this;
                  var i = this._rgba.slice(),
                      s = i.pop(),
                      n = h(e)._rgba;
                  return h(t.map(i, function(t, e) {
                      return (1 - s) * n[e] + s * t
                  }))
              },
              toRgbaString: function() {
                  var e = "rgba(",
                      i = t.map(this._rgba, function(t, e) {
                          return null == t ? e > 2 ? 1 : 0 : t
                      });
                  return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")"
              },
              toHslaString: function() {
                  var e = "hsla(",
                      i = t.map(this.hsla(), function(t, e) {
                          return null == t && (t = e > 2 ? 1 : 0), e && 3 > e && (t = Math.round(100 * t) + "%"), t
                      });
                  return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")"
              },
              toHexString: function(e) {
                  var i = this._rgba.slice(),
                      s = i.pop();
                  return e && i.push(~~(255 * s)), "#" + t.map(i, function(t) {
                      return t = (t || 0).toString(16), 1 === t.length ? "0" + t : t
                  }).join("")
              },
              toString: function() {
                  return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
              }
          }), h.fn.parse.prototype = h.fn, c.hsla.to = function(t) {
              if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
              var e, i, s = t[0] / 255,
                  n = t[1] / 255,
                  a = t[2] / 255,
                  o = t[3],
                  r = Math.max(s, n, a),
                  l = Math.min(s, n, a),
                  h = r - l,
                  c = r + l,
                  u = .5 * c;
              return e = l === r ? 0 : s === r ? 60 * (n - a) / h + 360 : n === r ? 60 * (a - s) / h + 120 : 60 * (s - n) / h + 240, i = 0 === h ? 0 : .5 >= u ? h / c : h / (2 - c), [Math.round(e) % 360, i, u, null == o ? 1 : o]
          }, c.hsla.from = function(t) {
              if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
              var e = t[0] / 360,
                  i = t[1],
                  s = t[2],
                  a = t[3],
                  o = .5 >= s ? s * (1 + i) : s + i - s * i,
                  r = 2 * s - o;
              return [Math.round(255 * n(r, o, e + 1 / 3)), Math.round(255 * n(r, o, e)), Math.round(255 * n(r, o, e - 1 / 3)), a]
          }, f(c, function(s, n) {
              var a = n.props,
                  o = n.cache,
                  l = n.to,
                  c = n.from;
              h.fn[s] = function(s) {
                  if (l && !this[o] && (this[o] = l(this._rgba)), s === e) return this[o].slice();
                  var n, r = t.type(s),
                      u = "array" === r || "object" === r ? s : arguments,
                      d = this[o].slice();
                  return f(a, function(t, e) {
                      var s = u["object" === r ? t : e.idx];
                      null == s && (s = d[e.idx]), d[e.idx] = i(s, e)
                  }), c ? (n = h(c(d)), n[o] = d, n) : h(d)
              }, f(a, function(e, i) {
                  h.fn[e] || (h.fn[e] = function(n) {
                      var a, o = t.type(n),
                          l = "alpha" === e ? this._hsla ? "hsla" : "rgba" : s,
                          h = this[l](),
                          c = h[i.idx];
                      return "undefined" === o ? c : ("function" === o && (n = n.call(this, c), o = t.type(n)), null == n && i.empty ? this : ("string" === o && (a = r.exec(n), a && (n = c + parseFloat(a[2]) * ("+" === a[1] ? 1 : -1))), h[i.idx] = n, this[l](h)))
                  })
              })
          }), h.hook = function(e) {
              var i = e.split(" ");
              f(i, function(e, i) {
                  t.cssHooks[i] = {
                      set: function(e, n) {
                          var a, o, r = "";
                          if ("transparent" !== n && ("string" !== t.type(n) || (a = s(n)))) {
                              if (n = h(a || n), !d.rgba && 1 !== n._rgba[3]) {
                                  for (o = "backgroundColor" === i ? e.parentNode : e;
                                      ("" === r || "transparent" === r) && o && o.style;) try {
                                      r = t.css(o, "backgroundColor"), o = o.parentNode
                                  } catch (l) {}
                                  n = n.blend(r && "transparent" !== r ? r : "_default")
                              }
                              n = n.toRgbaString()
                          }
                          try {
                              e.style[i] = n
                          } catch (l) {}
                      }
                  }, t.fx.step[i] = function(e) {
                      e.colorInit || (e.start = h(e.elem, i), e.end = h(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos))
                  }
              })
          }, h.hook(o), t.cssHooks.borderColor = {
              expand: function(t) {
                  var e = {};
                  return f(["Top", "Right", "Bottom", "Left"], function(i, s) {
                      e["border" + s + "Color"] = t
                  }), e
              }
          }, a = t.Color.names = {
              aqua: "#00ffff",
              black: "#000000",
              blue: "#0000ff",
              fuchsia: "#ff00ff",
              gray: "#808080",
              green: "#008000",
              lime: "#00ff00",
              maroon: "#800000",
              navy: "#000080",
              olive: "#808000",
              purple: "#800080",
              red: "#ff0000",
              silver: "#c0c0c0",
              teal: "#008080",
              white: "#ffffff",
              yellow: "#ffff00",
              transparent: [null, null, null, 0],
              _default: "#ffffff"
          }
      }(jQuery),
      function() {
          function i(e) {
              var i, s, n = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle,
                  a = {};
              if (n && n.length && n[0] && n[n[0]])
                  for (s = n.length; s--;) i = n[s], "string" == typeof n[i] && (a[t.camelCase(i)] = n[i]);
              else
                  for (i in n) "string" == typeof n[i] && (a[i] = n[i]);
              return a
          }

          function s(e, i) {
              var s, n, o = {};
              for (s in i) n = i[s], e[s] !== n && (a[s] || (t.fx.step[s] || !isNaN(parseFloat(n))) && (o[s] = n));
              return o
          }
          var n = ["add", "remove", "toggle"],
              a = {
                  border: 1,
                  borderBottom: 1,
                  borderColor: 1,
                  borderLeft: 1,
                  borderRight: 1,
                  borderTop: 1,
                  borderWidth: 1,
                  margin: 1,
                  padding: 1
              };
          t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(e, i) {
              t.fx.step[i] = function(t) {
                  ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (jQuery.style(t.elem, i, t.end), t.setAttr = !0)
              }
          }), t.fn.addBack || (t.fn.addBack = function(t) {
              return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
          }), t.effects.animateClass = function(e, a, o, r) {
              var l = t.speed(a, o, r);
              return this.queue(function() {
                  var a, o = t(this),
                      r = o.attr("class") || "",
                      h = l.children ? o.find("*").addBack() : o;
                  h = h.map(function() {
                      var e = t(this);
                      return {
                          el: e,
                          start: i(this)
                      }
                  }), a = function() {
                      t.each(n, function(t, i) {
                          e[i] && o[i + "Class"](e[i])
                      })
                  }, a(), h = h.map(function() {
                      return this.end = i(this.el[0]), this.diff = s(this.start, this.end), this
                  }), o.attr("class", r), h = h.map(function() {
                      var e = this,
                          i = t.Deferred(),
                          s = t.extend({}, l, {
                              queue: !1,
                              complete: function() {
                                  i.resolve(e)
                              }
                          });
                      return this.el.animate(this.diff, s), i.promise()
                  }), t.when.apply(t, h.get()).done(function() {
                      a(), t.each(arguments, function() {
                          var e = this.el;
                          t.each(this.diff, function(t) {
                              e.css(t, "")
                          })
                      }), l.complete.call(o[0])
                  })
              })
          }, t.fn.extend({
              addClass: function(e) {
                  return function(i, s, n, a) {
                      return s ? t.effects.animateClass.call(this, {
                          add: i
                      }, s, n, a) : e.apply(this, arguments)
                  }
              }(t.fn.addClass),
              removeClass: function(e) {
                  return function(i, s, n, a) {
                      return arguments.length > 1 ? t.effects.animateClass.call(this, {
                          remove: i
                      }, s, n, a) : e.apply(this, arguments)
                  }
              }(t.fn.removeClass),
              toggleClass: function(i) {
                  return function(s, n, a, o, r) {
                      return "boolean" == typeof n || n === e ? a ? t.effects.animateClass.call(this, n ? {
                          add: s
                      } : {
                          remove: s
                      }, a, o, r) : i.apply(this, arguments) : t.effects.animateClass.call(this, {
                          toggle: s
                      }, n, a, o)
                  }
              }(t.fn.toggleClass),
              switchClass: function(e, i, s, n, a) {
                  return t.effects.animateClass.call(this, {
                      add: i,
                      remove: e
                  }, s, n, a)
              }
          })
      }(),
      function() {
          function s(e, i, s, n) {
              return t.isPlainObject(e) && (i = e, e = e.effect), e = {
                  effect: e
              }, null == i && (i = {}), t.isFunction(i) && (n = i, s = null, i = {}), ("number" == typeof i || t.fx.speeds[i]) && (n = s, s = i, i = {}), t.isFunction(s) && (n = s, s = null), i && t.extend(e, i), s = s || i.duration, e.duration = t.fx.off ? 0 : "number" == typeof s ? s : s in t.fx.speeds ? t.fx.speeds[s] : t.fx.speeds._default, e.complete = n || i.complete, e
          }

          function n(e) {
              return !e || "number" == typeof e || t.fx.speeds[e] ? !0 : "string" != typeof e || t.effects.effect[e] ? t.isFunction(e) ? !0 : "object" != typeof e || e.effect ? !1 : !0 : !0
          }
          t.extend(t.effects, {
              version: "1.10.4",
              save: function(t, e) {
                  for (var s = 0; e.length > s; s++) null !== e[s] && t.data(i + e[s], t[0].style[e[s]])
              },
              restore: function(t, s) {
                  var n, a;
                  for (a = 0; s.length > a; a++) null !== s[a] && (n = t.data(i + s[a]), n === e && (n = ""), t.css(s[a], n))
              },
              setMode: function(t, e) {
                  return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e
              },
              getBaseline: function(t, e) {
                  var i, s;
                  switch (t[0]) {
                      case "top":
                          i = 0;
                          break;
                      case "middle":
                          i = .5;
                          break;
                      case "bottom":
                          i = 1;
                          break;
                      default:
                          i = t[0] / e.height
                  }
                  switch (t[1]) {
                      case "left":
                          s = 0;
                          break;
                      case "center":
                          s = .5;
                          break;
                      case "right":
                          s = 1;
                          break;
                      default:
                          s = t[1] / e.width
                  }
                  return {
                      x: s,
                      y: i
                  }
              },
              createWrapper: function(e) {
                  if (e.parent().is(".ui-effects-wrapper")) return e.parent();
                  var i = {
                          width: e.outerWidth(!0),
                          height: e.outerHeight(!0),
                          "float": e.css("float")
                      },
                      s = t("<div></div>").addClass("ui-effects-wrapper").css({
                          fontSize: "100%",
                          background: "transparent",
                          border: "none",
                          margin: 0,
                          padding: 0
                      }),
                      n = {
                          width: e.width(),
                          height: e.height()
                      },
                      a = document.activeElement;
                  try {
                      a.id
                  } catch (o) {
                      a = document.body
                  }
                  return e.wrap(s), (e[0] === a || t.contains(e[0], a)) && t(a).focus(), s = e.parent(), "static" === e.css("position") ? (s.css({
                      position: "relative"
                  }), e.css({
                      position: "relative"
                  })) : (t.extend(i, {
                      position: e.css("position"),
                      zIndex: e.css("z-index")
                  }), t.each(["top", "left", "bottom", "right"], function(t, s) {
                      i[s] = e.css(s), isNaN(parseInt(i[s], 10)) && (i[s] = "auto")
                  }), e.css({
                      position: "relative",
                      top: 0,
                      left: 0,
                      right: "auto",
                      bottom: "auto"
                  })), e.css(n), s.css(i).show()
              },
              removeWrapper: function(e) {
                  var i = document.activeElement;
                  return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === i || t.contains(e[0], i)) && t(i).focus()), e
              },
              setTransition: function(e, i, s, n) {
                  return n = n || {}, t.each(i, function(t, i) {
                      var a = e.cssUnit(i);
                      a[0] > 0 && (n[i] = a[0] * s + a[1])
                  }), n
              }
          }), t.fn.extend({
              effect: function() {
                  function e(e) {
                      function s() {
                          t.isFunction(a) && a.call(n[0]), t.isFunction(e) && e()
                      }
                      var n = t(this),
                          a = i.complete,
                          r = i.mode;
                      (n.is(":hidden") ? "hide" === r : "show" === r) ? (n[r](), s()) : o.call(n[0], i, s)
                  }
                  var i = s.apply(this, arguments),
                      n = i.mode,
                      a = i.queue,
                      o = t.effects.effect[i.effect];
                  return t.fx.off || !o ? n ? this[n](i.duration, i.complete) : this.each(function() {
                      i.complete && i.complete.call(this)
                  }) : a === !1 ? this.each(e) : this.queue(a || "fx", e)
              },
              show: function(t) {
                  return function(e) {
                      if (n(e)) return t.apply(this, arguments);
                      var i = s.apply(this, arguments);
                      return i.mode = "show", this.effect.call(this, i)
                  }
              }(t.fn.show),
              hide: function(t) {
                  return function(e) {
                      if (n(e)) return t.apply(this, arguments);
                      var i = s.apply(this, arguments);
                      return i.mode = "hide", this.effect.call(this, i)
                  }
              }(t.fn.hide),
              toggle: function(t) {
                  return function(e) {
                      if (n(e) || "boolean" == typeof e) return t.apply(this, arguments);
                      var i = s.apply(this, arguments);
                      return i.mode = "toggle", this.effect.call(this, i)
                  }
              }(t.fn.toggle),
              cssUnit: function(e) {
                  var i = this.css(e),
                      s = [];
                  return t.each(["em", "px", "%", "pt"], function(t, e) {
                      i.indexOf(e) > 0 && (s = [parseFloat(i), e])
                  }), s
              }
          })
      }(),
      function() {
          var e = {};
          t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(t, i) {
              e[i] = function(e) {
                  return Math.pow(e, t + 2)
              }
          }), t.extend(e, {
              Sine: function(t) {
                  return 1 - Math.cos(t * Math.PI / 2)
              },
              Circ: function(t) {
                  return 1 - Math.sqrt(1 - t * t)
              },
              Elastic: function(t) {
                  return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15)
              },
              Back: function(t) {
                  return t * t * (3 * t - 2)
              },
              Bounce: function(t) {
                  for (var e, i = 4;
                      ((e = Math.pow(2, --i)) - 1) / 11 > t;);
                  return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
              }
          }), t.each(e, function(e, i) {
              t.easing["easeIn" + e] = i, t.easing["easeOut" + e] = function(t) {
                  return 1 - i(1 - t)
              }, t.easing["easeInOut" + e] = function(t) {
                  return .5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2
              }
          })
      }()
})(jQuery);
(function(t) {
  var e = /up|down|vertical/,
      i = /up|left|vertical|horizontal/;
  t.effects.effect.blind = function(s, n) {
      var a, o, r, l = t(this),
          h = ["position", "top", "bottom", "left", "right", "height", "width"],
          c = t.effects.setMode(l, s.mode || "hide"),
          u = s.direction || "up",
          d = e.test(u),
          p = d ? "height" : "width",
          f = d ? "top" : "left",
          g = i.test(u),
          m = {},
          v = "show" === c;
      l.parent().is(".ui-effects-wrapper") ? t.effects.save(l.parent(), h) : t.effects.save(l, h), l.show(), a = t.effects.createWrapper(l).css({
          overflow: "hidden"
      }), o = a[p](), r = parseFloat(a.css(f)) || 0, m[p] = v ? o : 0, g || (l.css(d ? "bottom" : "right", 0).css(d ? "top" : "left", "auto").css({
          position: "absolute"
      }), m[f] = v ? r : o + r), v && (a.css(p, 0), g || a.css(f, r + o)), a.animate(m, {
          duration: s.duration,
          easing: s.easing,
          queue: !1,
          complete: function() {
              "hide" === c && l.hide(), t.effects.restore(l, h), t.effects.removeWrapper(l), n()
          }
      })
  }
})(jQuery);
(function(t) {
  t.effects.effect.bounce = function(e, i) {
      var s, n, a, o = t(this),
          r = ["position", "top", "bottom", "left", "right", "height", "width"],
          l = t.effects.setMode(o, e.mode || "effect"),
          h = "hide" === l,
          c = "show" === l,
          u = e.direction || "up",
          d = e.distance,
          p = e.times || 5,
          f = 2 * p + (c || h ? 1 : 0),
          g = e.duration / f,
          m = e.easing,
          v = "up" === u || "down" === u ? "top" : "left",
          _ = "up" === u || "left" === u,
          b = o.queue(),
          y = b.length;
      for ((c || h) && r.push("opacity"), t.effects.save(o, r), o.show(), t.effects.createWrapper(o), d || (d = o["top" === v ? "outerHeight" : "outerWidth"]() / 3), c && (a = {
              opacity: 1
          }, a[v] = 0, o.css("opacity", 0).css(v, _ ? 2 * -d : 2 * d).animate(a, g, m)), h && (d /= Math.pow(2, p - 1)), a = {}, a[v] = 0, s = 0; p > s; s++) n = {}, n[v] = (_ ? "-=" : "+=") + d, o.animate(n, g, m).animate(a, g, m), d = h ? 2 * d : d / 2;
      h && (n = {
          opacity: 0
      }, n[v] = (_ ? "-=" : "+=") + d, o.animate(n, g, m)), o.queue(function() {
          h && o.hide(), t.effects.restore(o, r), t.effects.removeWrapper(o), i()
      }), y > 1 && b.splice.apply(b, [1, 0].concat(b.splice(y, f + 1))), o.dequeue()
  }
})(jQuery);
(function(t) {
  t.effects.effect.clip = function(e, i) {
      var s, n, a, o = t(this),
          r = ["position", "top", "bottom", "left", "right", "height", "width"],
          l = t.effects.setMode(o, e.mode || "hide"),
          h = "show" === l,
          c = e.direction || "vertical",
          u = "vertical" === c,
          d = u ? "height" : "width",
          p = u ? "top" : "left",
          f = {};
      t.effects.save(o, r), o.show(), s = t.effects.createWrapper(o).css({
          overflow: "hidden"
      }), n = "IMG" === o[0].tagName ? s : o, a = n[d](), h && (n.css(d, 0), n.css(p, a / 2)), f[d] = h ? a : 0, f[p] = h ? 0 : a / 2, n.animate(f, {
          queue: !1,
          duration: e.duration,
          easing: e.easing,
          complete: function() {
              h || o.hide(), t.effects.restore(o, r), t.effects.removeWrapper(o), i()
          }
      })
  }
})(jQuery);
(function(t) {
  t.effects.effect.drop = function(e, i) {
      var s, n = t(this),
          a = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
          o = t.effects.setMode(n, e.mode || "hide"),
          r = "show" === o,
          l = e.direction || "left",
          h = "up" === l || "down" === l ? "top" : "left",
          c = "up" === l || "left" === l ? "pos" : "neg",
          u = {
              opacity: r ? 1 : 0
          };
      t.effects.save(n, a), n.show(), t.effects.createWrapper(n), s = e.distance || n["top" === h ? "outerHeight" : "outerWidth"](!0) / 2, r && n.css("opacity", 0).css(h, "pos" === c ? -s : s), u[h] = (r ? "pos" === c ? "+=" : "-=" : "pos" === c ? "-=" : "+=") + s, n.animate(u, {
          queue: !1,
          duration: e.duration,
          easing: e.easing,
          complete: function() {
              "hide" === o && n.hide(), t.effects.restore(n, a), t.effects.removeWrapper(n), i()
          }
      })
  }
})(jQuery);
(function(t) {
  t.effects.effect.explode = function(e, i) {
      function s() {
          b.push(this), b.length === u * d && n()
      }

      function n() {
          p.css({
              visibility: "visible"
          }), t(b).remove(), g || p.hide(), i()
      }
      var a, o, r, l, h, c, u = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3,
          d = u,
          p = t(this),
          f = t.effects.setMode(p, e.mode || "hide"),
          g = "show" === f,
          m = p.show().css("visibility", "hidden").offset(),
          v = Math.ceil(p.outerWidth() / d),
          _ = Math.ceil(p.outerHeight() / u),
          b = [];
      for (a = 0; u > a; a++)
          for (l = m.top + a * _, c = a - (u - 1) / 2, o = 0; d > o; o++) r = m.left + o * v, h = o - (d - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({
              position: "absolute",
              visibility: "visible",
              left: -o * v,
              top: -a * _
          }).parent().addClass("ui-effects-explode").css({
              position: "absolute",
              overflow: "hidden",
              width: v,
              height: _,
              left: r + (g ? h * v : 0),
              top: l + (g ? c * _ : 0),
              opacity: g ? 0 : 1
          }).animate({
              left: r + (g ? 0 : h * v),
              top: l + (g ? 0 : c * _),
              opacity: g ? 1 : 0
          }, e.duration || 500, e.easing, s)
  }
})(jQuery);
(function(t) {
  t.effects.effect.fade = function(e, i) {
      var s = t(this),
          n = t.effects.setMode(s, e.mode || "toggle");
      s.animate({
          opacity: n
      }, {
          queue: !1,
          duration: e.duration,
          easing: e.easing,
          complete: i
      })
  }
})(jQuery);
(function(t) {
  t.effects.effect.fold = function(e, i) {
      var s, n, a = t(this),
          o = ["position", "top", "bottom", "left", "right", "height", "width"],
          r = t.effects.setMode(a, e.mode || "hide"),
          l = "show" === r,
          h = "hide" === r,
          c = e.size || 15,
          u = /([0-9]+)%/.exec(c),
          d = !!e.horizFirst,
          p = l !== d,
          f = p ? ["width", "height"] : ["height", "width"],
          g = e.duration / 2,
          m = {},
          v = {};
      t.effects.save(a, o), a.show(), s = t.effects.createWrapper(a).css({
          overflow: "hidden"
      }), n = p ? [s.width(), s.height()] : [s.height(), s.width()], u && (c = parseInt(u[1], 10) / 100 * n[h ? 0 : 1]), l && s.css(d ? {
          height: 0,
          width: c
      } : {
          height: c,
          width: 0
      }), m[f[0]] = l ? n[0] : c, v[f[1]] = l ? n[1] : 0, s.animate(m, g, e.easing).animate(v, g, e.easing, function() {
          h && a.hide(), t.effects.restore(a, o), t.effects.removeWrapper(a), i()
      })
  }
})(jQuery);
(function(t) {
  t.effects.effect.highlight = function(e, i) {
      var s = t(this),
          n = ["backgroundImage", "backgroundColor", "opacity"],
          a = t.effects.setMode(s, e.mode || "show"),
          o = {
              backgroundColor: s.css("backgroundColor")
          };
      "hide" === a && (o.opacity = 0), t.effects.save(s, n), s.show().css({
          backgroundImage: "none",
          backgroundColor: e.color || "#ffff99"
      }).animate(o, {
          queue: !1,
          duration: e.duration,
          easing: e.easing,
          complete: function() {
              "hide" === a && s.hide(), t.effects.restore(s, n), i()
          }
      })
  }
})(jQuery);
(function(t) {
  t.effects.effect.pulsate = function(e, i) {
      var s, n = t(this),
          a = t.effects.setMode(n, e.mode || "show"),
          o = "show" === a,
          r = "hide" === a,
          l = o || "hide" === a,
          h = 2 * (e.times || 5) + (l ? 1 : 0),
          c = e.duration / h,
          u = 0,
          d = n.queue(),
          p = d.length;
      for ((o || !n.is(":visible")) && (n.css("opacity", 0).show(), u = 1), s = 1; h > s; s++) n.animate({
          opacity: u
      }, c, e.easing), u = 1 - u;
      n.animate({
          opacity: u
      }, c, e.easing), n.queue(function() {
          r && n.hide(), i()
      }), p > 1 && d.splice.apply(d, [1, 0].concat(d.splice(p, h + 1))), n.dequeue()
  }
})(jQuery);
(function(t) {
  t.effects.effect.puff = function(e, i) {
      var s = t(this),
          n = t.effects.setMode(s, e.mode || "hide"),
          a = "hide" === n,
          o = parseInt(e.percent, 10) || 150,
          r = o / 100,
          l = {
              height: s.height(),
              width: s.width(),
              outerHeight: s.outerHeight(),
              outerWidth: s.outerWidth()
          };
      t.extend(e, {
          effect: "scale",
          queue: !1,
          fade: !0,
          mode: n,
          complete: i,
          percent: a ? o : 100,
          from: a ? l : {
              height: l.height * r,
              width: l.width * r,
              outerHeight: l.outerHeight * r,
              outerWidth: l.outerWidth * r
          }
      }), s.effect(e)
  }, t.effects.effect.scale = function(e, i) {
      var s = t(this),
          n = t.extend(!0, {}, e),
          a = t.effects.setMode(s, e.mode || "effect"),
          o = parseInt(e.percent, 10) || (0 === parseInt(e.percent, 10) ? 0 : "hide" === a ? 0 : 100),
          r = e.direction || "both",
          l = e.origin,
          h = {
              height: s.height(),
              width: s.width(),
              outerHeight: s.outerHeight(),
              outerWidth: s.outerWidth()
          },
          c = {
              y: "horizontal" !== r ? o / 100 : 1,
              x: "vertical" !== r ? o / 100 : 1
          };
      n.effect = "size", n.queue = !1, n.complete = i, "effect" !== a && (n.origin = l || ["middle", "center"], n.restore = !0), n.from = e.from || ("show" === a ? {
          height: 0,
          width: 0,
          outerHeight: 0,
          outerWidth: 0
      } : h), n.to = {
          height: h.height * c.y,
          width: h.width * c.x,
          outerHeight: h.outerHeight * c.y,
          outerWidth: h.outerWidth * c.x
      }, n.fade && ("show" === a && (n.from.opacity = 0, n.to.opacity = 1), "hide" === a && (n.from.opacity = 1, n.to.opacity = 0)), s.effect(n)
  }, t.effects.effect.size = function(e, i) {
      var s, n, a, o = t(this),
          r = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
          l = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
          h = ["width", "height", "overflow"],
          c = ["fontSize"],
          u = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
          d = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
          p = t.effects.setMode(o, e.mode || "effect"),
          f = e.restore || "effect" !== p,
          g = e.scale || "both",
          m = e.origin || ["middle", "center"],
          v = o.css("position"),
          _ = f ? r : l,
          b = {
              height: 0,
              width: 0,
              outerHeight: 0,
              outerWidth: 0
          };
      "show" === p && o.show(), s = {
          height: o.height(),
          width: o.width(),
          outerHeight: o.outerHeight(),
          outerWidth: o.outerWidth()
      }, "toggle" === e.mode && "show" === p ? (o.from = e.to || b, o.to = e.from || s) : (o.from = e.from || ("show" === p ? b : s), o.to = e.to || ("hide" === p ? b : s)), a = {
          from: {
              y: o.from.height / s.height,
              x: o.from.width / s.width
          },
          to: {
              y: o.to.height / s.height,
              x: o.to.width / s.width
          }
      }, ("box" === g || "both" === g) && (a.from.y !== a.to.y && (_ = _.concat(u), o.from = t.effects.setTransition(o, u, a.from.y, o.from), o.to = t.effects.setTransition(o, u, a.to.y, o.to)), a.from.x !== a.to.x && (_ = _.concat(d), o.from = t.effects.setTransition(o, d, a.from.x, o.from), o.to = t.effects.setTransition(o, d, a.to.x, o.to))), ("content" === g || "both" === g) && a.from.y !== a.to.y && (_ = _.concat(c).concat(h), o.from = t.effects.setTransition(o, c, a.from.y, o.from), o.to = t.effects.setTransition(o, c, a.to.y, o.to)), t.effects.save(o, _), o.show(), t.effects.createWrapper(o), o.css("overflow", "hidden").css(o.from), m && (n = t.effects.getBaseline(m, s), o.from.top = (s.outerHeight - o.outerHeight()) * n.y, o.from.left = (s.outerWidth - o.outerWidth()) * n.x, o.to.top = (s.outerHeight - o.to.outerHeight) * n.y, o.to.left = (s.outerWidth - o.to.outerWidth) * n.x), o.css(o.from), ("content" === g || "both" === g) && (u = u.concat(["marginTop", "marginBottom"]).concat(c), d = d.concat(["marginLeft", "marginRight"]), h = r.concat(u).concat(d), o.find("*[width]").each(function() {
          var i = t(this),
              s = {
                  height: i.height(),
                  width: i.width(),
                  outerHeight: i.outerHeight(),
                  outerWidth: i.outerWidth()
              };
          f && t.effects.save(i, h), i.from = {
              height: s.height * a.from.y,
              width: s.width * a.from.x,
              outerHeight: s.outerHeight * a.from.y,
              outerWidth: s.outerWidth * a.from.x
          }, i.to = {
              height: s.height * a.to.y,
              width: s.width * a.to.x,
              outerHeight: s.height * a.to.y,
              outerWidth: s.width * a.to.x
          }, a.from.y !== a.to.y && (i.from = t.effects.setTransition(i, u, a.from.y, i.from), i.to = t.effects.setTransition(i, u, a.to.y, i.to)), a.from.x !== a.to.x && (i.from = t.effects.setTransition(i, d, a.from.x, i.from), i.to = t.effects.setTransition(i, d, a.to.x, i.to)), i.css(i.from), i.animate(i.to, e.duration, e.easing, function() {
              f && t.effects.restore(i, h)
          })
      })), o.animate(o.to, {
          queue: !1,
          duration: e.duration,
          easing: e.easing,
          complete: function() {
              0 === o.to.opacity && o.css("opacity", o.from.opacity), "hide" === p && o.hide(), t.effects.restore(o, _), f || ("static" === v ? o.css({
                  position: "relative",
                  top: o.to.top,
                  left: o.to.left
              }) : t.each(["top", "left"], function(t, e) {
                  o.css(e, function(e, i) {
                      var s = parseInt(i, 10),
                          n = t ? o.to.left : o.to.top;
                      return "auto" === i ? n + "px" : s + n + "px"
                  })
              })), t.effects.removeWrapper(o), i()
          }
      })
  }
})(jQuery);
(function(t) {
  t.effects.effect.shake = function(e, i) {
      var s, n = t(this),
          a = ["position", "top", "bottom", "left", "right", "height", "width"],
          o = t.effects.setMode(n, e.mode || "effect"),
          r = e.direction || "left",
          l = e.distance || 20,
          h = e.times || 3,
          c = 2 * h + 1,
          u = Math.round(e.duration / c),
          d = "up" === r || "down" === r ? "top" : "left",
          p = "up" === r || "left" === r,
          f = {},
          g = {},
          m = {},
          v = n.queue(),
          _ = v.length;
      for (t.effects.save(n, a), n.show(), t.effects.createWrapper(n), f[d] = (p ? "-=" : "+=") + l, g[d] = (p ? "+=" : "-=") + 2 * l, m[d] = (p ? "-=" : "+=") + 2 * l, n.animate(f, u, e.easing), s = 1; h > s; s++) n.animate(g, u, e.easing).animate(m, u, e.easing);
      n.animate(g, u, e.easing).animate(f, u / 2, e.easing).queue(function() {
          "hide" === o && n.hide(), t.effects.restore(n, a), t.effects.removeWrapper(n), i()
      }), _ > 1 && v.splice.apply(v, [1, 0].concat(v.splice(_, c + 1))), n.dequeue()
  }
})(jQuery);
(function(t) {
  t.effects.effect.slide = function(e, i) {
      var s, n = t(this),
          a = ["position", "top", "bottom", "left", "right", "width", "height"],
          o = t.effects.setMode(n, e.mode || "show"),
          r = "show" === o,
          l = e.direction || "left",
          h = "up" === l || "down" === l ? "top" : "left",
          c = "up" === l || "left" === l,
          u = {};
      t.effects.save(n, a), n.show(), s = e.distance || n["top" === h ? "outerHeight" : "outerWidth"](!0), t.effects.createWrapper(n).css({
          overflow: "hidden"
      }), r && n.css(h, c ? isNaN(s) ? "-" + s : -s : s), u[h] = (r ? c ? "+=" : "-=" : c ? "-=" : "+=") + s, n.animate(u, {
          queue: !1,
          duration: e.duration,
          easing: e.easing,
          complete: function() {
              "hide" === o && n.hide(), t.effects.restore(n, a), t.effects.removeWrapper(n), i()
          }
      })
  }
})(jQuery);
(function(t) {
  t.effects.effect.transfer = function(e, i) {
      var s = t(this),
          n = t(e.to),
          a = "fixed" === n.css("position"),
          o = t("body"),
          r = a ? o.scrollTop() : 0,
          l = a ? o.scrollLeft() : 0,
          h = n.offset(),
          c = {
              top: h.top - r,
              left: h.left - l,
              height: n.innerHeight(),
              width: n.innerWidth()
          },
          u = s.offset(),
          d = t("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(e.className).css({
              top: u.top - r,
              left: u.left - l,
              height: s.innerHeight(),
              width: s.innerWidth(),
              position: a ? "fixed" : "absolute"
          }).animate(c, e.duration, e.easing, function() {
              d.remove(), i()
          })
  }
})(jQuery);
(function(t) {
  t.widget("ui.menu", {
      version: "1.10.4",
      defaultElement: "<ul>",
      delay: 300,
      options: {
          icons: {
              submenu: "ui-icon-carat-1-e"
          },
          menus: "ul",
          position: {
              my: "left top",
              at: "right top"
          },
          role: "menu",
          blur: null,
          focus: null,
          select: null
      },
      _create: function() {
          this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
              role: this.options.role,
              tabIndex: 0
          }).bind("click" + this.eventNamespace, t.proxy(function(t) {
              this.options.disabled && t.preventDefault()
          }, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
              "mousedown .ui-menu-item > a": function(t) {
                  t.preventDefault()
              },
              "click .ui-state-disabled > a": function(t) {
                  t.preventDefault()
              },
              "click .ui-menu-item:has(a)": function(e) {
                  var i = t(e.target).closest(".ui-menu-item");
                  !this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(e), e.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(e) : !this.element.is(":focus") && t(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
              },
              "mouseenter .ui-menu-item": function(e) {
                  var i = t(e.currentTarget);
                  i.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(e, i)
              },
              mouseleave: "collapseAll",
              "mouseleave .ui-menu": "collapseAll",
              focus: function(t, e) {
                  var i = this.active || this.element.children(".ui-menu-item").eq(0);
                  e || this.focus(t, i)
              },
              blur: function(e) {
                  this._delay(function() {
                      t.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(e)
                  })
              },
              keydown: "_keydown"
          }), this.refresh(), this._on(this.document, {
              click: function(e) {
                  t(e.target).closest(".ui-menu").length || this.collapseAll(e), this.mouseHandled = !1
              }
          })
      },
      _destroy: function() {
          this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
              var e = t(this);
              e.data("ui-menu-submenu-carat") && e.remove()
          }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
      },
      _keydown: function(e) {
          function i(t) {
              return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
          }
          var s, n, a, o, r, l = !0;
          switch (e.keyCode) {
              case t.ui.keyCode.PAGE_UP:
                  this.previousPage(e);
                  break;
              case t.ui.keyCode.PAGE_DOWN:
                  this.nextPage(e);
                  break;
              case t.ui.keyCode.HOME:
                  this._move("first", "first", e);
                  break;
              case t.ui.keyCode.END:
                  this._move("last", "last", e);
                  break;
              case t.ui.keyCode.UP:
                  this.previous(e);
                  break;
              case t.ui.keyCode.DOWN:
                  this.next(e);
                  break;
              case t.ui.keyCode.LEFT:
                  this.collapse(e);
                  break;
              case t.ui.keyCode.RIGHT:
                  this.active && !this.active.is(".ui-state-disabled") && this.expand(e);
                  break;
              case t.ui.keyCode.ENTER:
              case t.ui.keyCode.SPACE:
                  this._activate(e);
                  break;
              case t.ui.keyCode.ESCAPE:
                  this.collapse(e);
                  break;
              default:
                  l = !1, n = this.previousFilter || "", a = String.fromCharCode(e.keyCode), o = !1, clearTimeout(this.filterTimer), a === n ? o = !0 : a = n + a, r = RegExp("^" + i(a), "i"), s = this.activeMenu.children(".ui-menu-item").filter(function() {
                      return r.test(t(this).children("a").text())
                  }), s = o && -1 !== s.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : s, s.length || (a = String.fromCharCode(e.keyCode), r = RegExp("^" + i(a), "i"), s = this.activeMenu.children(".ui-menu-item").filter(function() {
                      return r.test(t(this).children("a").text())
                  })), s.length ? (this.focus(e, s), s.length > 1 ? (this.previousFilter = a, this.filterTimer = this._delay(function() {
                      delete this.previousFilter
                  }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
          }
          l && e.preventDefault()
      },
      _activate: function(t) {
          this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(t) : this.select(t))
      },
      refresh: function() {
          var e, i = this.options.icons.submenu,
              s = this.element.find(this.options.menus);
          this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length), s.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
              role: this.options.role,
              "aria-hidden": "true",
              "aria-expanded": "false"
          }).each(function() {
              var e = t(this),
                  s = e.prev("a"),
                  n = t("<span>").addClass("ui-menu-icon ui-icon " + i).data("ui-menu-submenu-carat", !0);
              s.attr("aria-haspopup", "true").prepend(n), e.attr("aria-labelledby", s.attr("id"))
          }), e = s.add(this.element), e.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
              tabIndex: -1,
              role: this._itemRole()
          }), e.children(":not(.ui-menu-item)").each(function() {
              var e = t(this);
              /[^\-\u2014\u2013\s]/.test(e.text()) || e.addClass("ui-widget-content ui-menu-divider")
          }), e.children(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !t.contains(this.element[0], this.active[0]) && this.blur()
      },
      _itemRole: function() {
          return {
              menu: "menuitem",
              listbox: "option"
          }[this.options.role]
      },
      _setOption: function(t, e) {
          "icons" === t && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu), this._super(t, e)
      },
      focus: function(t, e) {
          var i, s;
          this.blur(t, t && "focus" === t.type), this._scrollIntoView(e), this.active = e.first(), s = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", s.attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), t && "keydown" === t.type ? this._close() : this.timer = this._delay(function() {
              this._close()
          }, this.delay), i = e.children(".ui-menu"), i.length && t && /^mouse/.test(t.type) && this._startOpening(i), this.activeMenu = e.parent(), this._trigger("focus", t, {
              item: e
          })
      },
      _scrollIntoView: function(e) {
          var i, s, n, a, o, r;
          this._hasScroll() && (i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0, s = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0, n = e.offset().top - this.activeMenu.offset().top - i - s, a = this.activeMenu.scrollTop(), o = this.activeMenu.height(), r = e.height(), 0 > n ? this.activeMenu.scrollTop(a + n) : n + r > o && this.activeMenu.scrollTop(a + n - o + r))
      },
      blur: function(t, e) {
          e || clearTimeout(this.timer), this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", t, {
              item: this.active
          }))
      },
      _startOpening: function(t) {
          clearTimeout(this.timer), "true" === t.attr("aria-hidden") && (this.timer = this._delay(function() {
              this._close(), this._open(t)
          }, this.delay))
      },
      _open: function(e) {
          var i = t.extend({
              of: this.active
          }, this.options.position);
          clearTimeout(this.timer), this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"), e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
      },
      collapseAll: function(e, i) {
          clearTimeout(this.timer), this.timer = this._delay(function() {
              var s = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu"));
              s.length || (s = this.element), this._close(s), this.blur(e), this.activeMenu = s
          }, this.delay)
      },
      _close: function(t) {
          t || (t = this.active ? this.active.parent() : this.element), t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
      },
      collapse: function(t) {
          var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
          e && e.length && (this._close(), this.focus(t, e))
      },
      expand: function(t) {
          var e = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
          e && e.length && (this._open(e.parent()), this._delay(function() {
              this.focus(t, e)
          }))
      },
      next: function(t) {
          this._move("next", "first", t)
      },
      previous: function(t) {
          this._move("prev", "last", t)
      },
      isFirstItem: function() {
          return this.active && !this.active.prevAll(".ui-menu-item").length
      },
      isLastItem: function() {
          return this.active && !this.active.nextAll(".ui-menu-item").length
      },
      _move: function(t, e, i) {
          var s;
          this.active && (s = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)), s && s.length && this.active || (s = this.activeMenu.children(".ui-menu-item")[e]()), this.focus(i, s)
      },
      nextPage: function(e) {
          var i, s, n;
          return this.active ? (this.isLastItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
              return i = t(this), 0 > i.offset().top - s - n
          }), this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())), undefined) : (this.next(e), undefined)
      },
      previousPage: function(e) {
          var i, s, n;
          return this.active ? (this.isFirstItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
              return i = t(this), i.offset().top - s + n > 0
          }), this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item").first())), undefined) : (this.next(e), undefined)
      },
      _hasScroll: function() {
          return this.element.outerHeight() < this.element.prop("scrollHeight")
      },
      select: function(e) {
          this.active = this.active || t(e.target).closest(".ui-menu-item");
          var i = {
              item: this.active
          };
          this.active.has(".ui-menu").length || this.collapseAll(e, !0), this._trigger("select", e, i)
      }
  })
})(jQuery);
(function(t, e) {
  t.widget("ui.progressbar", {
      version: "1.10.4",
      options: {
          max: 100,
          value: 0,
          change: null,
          complete: null
      },
      min: 0,
      _create: function() {
          this.oldValue = this.options.value = this._constrainedValue(), this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
              role: "progressbar",
              "aria-valuemin": this.min
          }), this.valueDiv = t("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this._refreshValue()
      },
      _destroy: function() {
          this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove()
      },
      value: function(t) {
          return t === e ? this.options.value : (this.options.value = this._constrainedValue(t), this._refreshValue(), e)
      },
      _constrainedValue: function(t) {
          return t === e && (t = this.options.value), this.indeterminate = t === !1, "number" != typeof t && (t = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, t))
      },
      _setOptions: function(t) {
          var e = t.value;
          delete t.value, this._super(t), this.options.value = this._constrainedValue(e), this._refreshValue()
      },
      _setOption: function(t, e) {
          "max" === t && (e = Math.max(this.min, e)), this._super(t, e)
      },
      _percentage: function() {
          return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
      },
      _refreshValue: function() {
          var e = this.options.value,
              i = this._percentage();
          this.valueDiv.toggle(this.indeterminate || e > this.min).toggleClass("ui-corner-right", e === this.options.max).width(i.toFixed(0) + "%"), this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = t("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({
              "aria-valuemax": this.options.max,
              "aria-valuenow": e
          }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== e && (this.oldValue = e, this._trigger("change")), e === this.options.max && this._trigger("complete")
      }
  })
})(jQuery);
(function(t) {
  function e(t) {
      return parseInt(t, 10) || 0
  }

  function i(t) {
      return !isNaN(parseInt(t, 10))
  }
  t.widget("ui.resizable", t.ui.mouse, {
      version: "1.10.4",
      widgetEventPrefix: "resize",
      options: {
          alsoResize: !1,
          animate: !1,
          animateDuration: "slow",
          animateEasing: "swing",
          aspectRatio: !1,
          autoHide: !1,
          containment: !1,
          ghost: !1,
          grid: !1,
          handles: "e,s,se",
          helper: !1,
          maxHeight: null,
          maxWidth: null,
          minHeight: 10,
          minWidth: 10,
          zIndex: 90,
          resize: null,
          start: null,
          stop: null
      },
      _create: function() {
          var e, i, s, n, a, o = this,
              r = this.options;
          if (this.element.addClass("ui-resizable"), t.extend(this, {
                  _aspectRatio: !!r.aspectRatio,
                  aspectRatio: r.aspectRatio,
                  originalElement: this.element,
                  _proportionallyResizeElements: [],
                  _helper: r.helper || r.ghost || r.animate ? r.helper || "ui-resizable-helper" : null
              }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                  position: this.element.css("position"),
                  width: this.element.outerWidth(),
                  height: this.element.outerHeight(),
                  top: this.element.css("top"),
                  left: this.element.css("left")
              })), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), this.elementIsWrapper = !0, this.element.css({
                  marginLeft: this.originalElement.css("marginLeft"),
                  marginTop: this.originalElement.css("marginTop"),
                  marginRight: this.originalElement.css("marginRight"),
                  marginBottom: this.originalElement.css("marginBottom")
              }), this.originalElement.css({
                  marginLeft: 0,
                  marginTop: 0,
                  marginRight: 0,
                  marginBottom: 0
              }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                  position: "static",
                  zoom: 1,
                  display: "block"
              })), this.originalElement.css({
                  margin: this.originalElement.css("margin")
              }), this._proportionallyResize()), this.handles = r.handles || (t(".ui-resizable-handle", this.element).length ? {
                  n: ".ui-resizable-n",
                  e: ".ui-resizable-e",
                  s: ".ui-resizable-s",
                  w: ".ui-resizable-w",
                  se: ".ui-resizable-se",
                  sw: ".ui-resizable-sw",
                  ne: ".ui-resizable-ne",
                  nw: ".ui-resizable-nw"
              } : "e,s,se"), this.handles.constructor === String)
              for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), e = this.handles.split(","), this.handles = {}, i = 0; e.length > i; i++) s = t.trim(e[i]), a = "ui-resizable-" + s, n = t("<div class='ui-resizable-handle " + a + "'></div>"), n.css({
                  zIndex: r.zIndex
              }), "se" === s && n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[s] = ".ui-resizable-" + s, this.element.append(n);
          this._renderAxis = function(e) {
              var i, s, n, a;
              e = e || this.element;
              for (i in this.handles) this.handles[i].constructor === String && (this.handles[i] = t(this.handles[i], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (s = t(this.handles[i], this.element), a = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), n = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), e.css(n, a), this._proportionallyResize()), t(this.handles[i]).length
          }, this._renderAxis(this.element), this._handles = t(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
              o.resizing || (this.className && (n = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), o.axis = n && n[1] ? n[1] : "se")
          }), r.autoHide && (this._handles.hide(), t(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
              r.disabled || (t(this).removeClass("ui-resizable-autohide"), o._handles.show())
          }).mouseleave(function() {
              r.disabled || o.resizing || (t(this).addClass("ui-resizable-autohide"), o._handles.hide())
          })), this._mouseInit()
      },
      _destroy: function() {
          this._mouseDestroy();
          var e, i = function(e) {
              t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
          };
          return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({
              position: e.css("position"),
              width: e.outerWidth(),
              height: e.outerHeight(),
              top: e.css("top"),
              left: e.css("left")
          }).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
      },
      _mouseCapture: function(e) {
          var i, s, n = !1;
          for (i in this.handles) s = t(this.handles[i])[0], (s === e.target || t.contains(s, e.target)) && (n = !0);
          return !this.options.disabled && n
      },
      _mouseStart: function(i) {
          var s, n, a, o = this.options,
              r = this.element.position(),
              h = this.element;
          return this.resizing = !0, /absolute/.test(h.css("position")) ? h.css({
              position: "absolute",
              top: h.css("top"),
              left: h.css("left")
          }) : h.is(".ui-draggable") && h.css({
              position: "absolute",
              top: r.top,
              left: r.left
          }), this._renderProxy(), s = e(this.helper.css("left")), n = e(this.helper.css("top")), o.containment && (s += t(o.containment).scrollLeft() || 0, n += t(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
              left: s,
              top: n
          }, this.size = this._helper ? {
              width: this.helper.width(),
              height: this.helper.height()
          } : {
              width: h.width(),
              height: h.height()
          }, this.originalSize = this._helper ? {
              width: h.outerWidth(),
              height: h.outerHeight()
          } : {
              width: h.width(),
              height: h.height()
          }, this.originalPosition = {
              left: s,
              top: n
          }, this.sizeDiff = {
              width: h.outerWidth() - h.width(),
              height: h.outerHeight() - h.height()
          }, this.originalMousePosition = {
              left: i.pageX,
              top: i.pageY
          }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, a = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === a ? this.axis + "-resize" : a), h.addClass("ui-resizable-resizing"), this._propagate("start", i), !0
      },
      _mouseDrag: function(e) {
          var i, s = this.helper,
              n = {},
              a = this.originalMousePosition,
              o = this.axis,
              r = this.position.top,
              h = this.position.left,
              l = this.size.width,
              c = this.size.height,
              u = e.pageX - a.left || 0,
              d = e.pageY - a.top || 0,
              p = this._change[o];
          return p ? (i = p.apply(this, [e, u, d]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate("resize", e), this.position.top !== r && (n.top = this.position.top + "px"), this.position.left !== h && (n.left = this.position.left + "px"), this.size.width !== l && (n.width = this.size.width + "px"), this.size.height !== c && (n.height = this.size.height + "px"), s.css(n), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(n) || this._trigger("resize", e, this.ui()), !1) : !1
      },
      _mouseStop: function(e) {
          this.resizing = !1;
          var i, s, n, a, o, r, h, l = this.options,
              c = this;
          return this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), n = s && t.ui.hasScroll(i[0], "left") ? 0 : c.sizeDiff.height, a = s ? 0 : c.sizeDiff.width, o = {
              width: c.helper.width() - a,
              height: c.helper.height() - n
          }, r = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null, h = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null, l.animate || this.element.css(t.extend(o, {
              top: h,
              left: r
          })), c.helper.height(c.size.height), c.helper.width(c.size.width), this._helper && !l.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1
      },
      _updateVirtualBoundaries: function(t) {
          var e, s, n, a, o, r = this.options;
          o = {
              minWidth: i(r.minWidth) ? r.minWidth : 0,
              maxWidth: i(r.maxWidth) ? r.maxWidth : 1 / 0,
              minHeight: i(r.minHeight) ? r.minHeight : 0,
              maxHeight: i(r.maxHeight) ? r.maxHeight : 1 / 0
          }, (this._aspectRatio || t) && (e = o.minHeight * this.aspectRatio, n = o.minWidth / this.aspectRatio, s = o.maxHeight * this.aspectRatio, a = o.maxWidth / this.aspectRatio, e > o.minWidth && (o.minWidth = e), n > o.minHeight && (o.minHeight = n), o.maxWidth > s && (o.maxWidth = s), o.maxHeight > a && (o.maxHeight = a)), this._vBoundaries = o
      },
      _updateCache: function(t) {
          this.offset = this.helper.offset(), i(t.left) && (this.position.left = t.left), i(t.top) && (this.position.top = t.top), i(t.height) && (this.size.height = t.height), i(t.width) && (this.size.width = t.width)
      },
      _updateRatio: function(t) {
          var e = this.position,
              s = this.size,
              n = this.axis;
          return i(t.height) ? t.width = t.height * this.aspectRatio : i(t.width) && (t.height = t.width / this.aspectRatio), "sw" === n && (t.left = e.left + (s.width - t.width), t.top = null), "nw" === n && (t.top = e.top + (s.height - t.height), t.left = e.left + (s.width - t.width)), t
      },
      _respectSize: function(t) {
          var e = this._vBoundaries,
              s = this.axis,
              n = i(t.width) && e.maxWidth && e.maxWidth < t.width,
              a = i(t.height) && e.maxHeight && e.maxHeight < t.height,
              o = i(t.width) && e.minWidth && e.minWidth > t.width,
              r = i(t.height) && e.minHeight && e.minHeight > t.height,
              h = this.originalPosition.left + this.originalSize.width,
              l = this.position.top + this.size.height,
              c = /sw|nw|w/.test(s),
              u = /nw|ne|n/.test(s);
          return o && (t.width = e.minWidth), r && (t.height = e.minHeight), n && (t.width = e.maxWidth), a && (t.height = e.maxHeight), o && c && (t.left = h - e.minWidth), n && c && (t.left = h - e.maxWidth), r && u && (t.top = l - e.minHeight), a && u && (t.top = l - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t
      },
      _proportionallyResize: function() {
          if (this._proportionallyResizeElements.length) {
              var t, e, i, s, n, a = this.helper || this.element;
              for (t = 0; this._proportionallyResizeElements.length > t; t++) {
                  if (n = this._proportionallyResizeElements[t], !this.borderDif)
                      for (this.borderDif = [], i = [n.css("borderTopWidth"), n.css("borderRightWidth"), n.css("borderBottomWidth"), n.css("borderLeftWidth")], s = [n.css("paddingTop"), n.css("paddingRight"), n.css("paddingBottom"), n.css("paddingLeft")], e = 0; i.length > e; e++) this.borderDif[e] = (parseInt(i[e], 10) || 0) + (parseInt(s[e], 10) || 0);
                  n.css({
                      height: a.height() - this.borderDif[0] - this.borderDif[2] || 0,
                      width: a.width() - this.borderDif[1] - this.borderDif[3] || 0
                  })
              }
          }
      },
      _renderProxy: function() {
          var e = this.element,
              i = this.options;
          this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
              width: this.element.outerWidth() - 1,
              height: this.element.outerHeight() - 1,
              position: "absolute",
              left: this.elementOffset.left + "px",
              top: this.elementOffset.top + "px",
              zIndex: ++i.zIndex
          }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
      },
      _change: {
          e: function(t, e) {
              return {
                  width: this.originalSize.width + e
              }
          },
          w: function(t, e) {
              var i = this.originalSize,
                  s = this.originalPosition;
              return {
                  left: s.left + e,
                  width: i.width - e
              }
          },
          n: function(t, e, i) {
              var s = this.originalSize,
                  n = this.originalPosition;
              return {
                  top: n.top + i,
                  height: s.height - i
              }
          },
          s: function(t, e, i) {
              return {
                  height: this.originalSize.height + i
              }
          },
          se: function(e, i, s) {
              return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
          },
          sw: function(e, i, s) {
              return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
          },
          ne: function(e, i, s) {
              return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
          },
          nw: function(e, i, s) {
              return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
          }
      },
      _propagate: function(e, i) {
          t.ui.plugin.call(this, e, [i, this.ui()]), "resize" !== e && this._trigger(e, i, this.ui())
      },
      plugins: {},
      ui: function() {
          return {
              originalElement: this.originalElement,
              element: this.element,
              helper: this.helper,
              position: this.position,
              size: this.size,
              originalSize: this.originalSize,
              originalPosition: this.originalPosition
          }
      }
  }), t.ui.plugin.add("resizable", "animate", {
      stop: function(e) {
          var i = t(this).data("ui-resizable"),
              s = i.options,
              n = i._proportionallyResizeElements,
              a = n.length && /textarea/i.test(n[0].nodeName),
              o = a && t.ui.hasScroll(n[0], "left") ? 0 : i.sizeDiff.height,
              r = a ? 0 : i.sizeDiff.width,
              h = {
                  width: i.size.width - r,
                  height: i.size.height - o
              },
              l = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
              c = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
          i.element.animate(t.extend(h, c && l ? {
              top: c,
              left: l
          } : {}), {
              duration: s.animateDuration,
              easing: s.animateEasing,
              step: function() {
                  var s = {
                      width: parseInt(i.element.css("width"), 10),
                      height: parseInt(i.element.css("height"), 10),
                      top: parseInt(i.element.css("top"), 10),
                      left: parseInt(i.element.css("left"), 10)
                  };
                  n && n.length && t(n[0]).css({
                      width: s.width,
                      height: s.height
                  }), i._updateCache(s), i._propagate("resize", e)
              }
          })
      }
  }), t.ui.plugin.add("resizable", "containment", {
      start: function() {
          var i, s, n, a, o, r, h, l = t(this).data("ui-resizable"),
              c = l.options,
              u = l.element,
              d = c.containment,
              p = d instanceof t ? d.get(0) : /parent/.test(d) ? u.parent().get(0) : d;
          p && (l.containerElement = t(p), /document/.test(d) || d === document ? (l.containerOffset = {
              left: 0,
              top: 0
          }, l.containerPosition = {
              left: 0,
              top: 0
          }, l.parentData = {
              element: t(document),
              left: 0,
              top: 0,
              width: t(document).width(),
              height: t(document).height() || document.body.parentNode.scrollHeight
          }) : (i = t(p), s = [], t(["Top", "Right", "Left", "Bottom"]).each(function(t, n) {
              s[t] = e(i.css("padding" + n))
          }), l.containerOffset = i.offset(), l.containerPosition = i.position(), l.containerSize = {
              height: i.innerHeight() - s[3],
              width: i.innerWidth() - s[1]
          }, n = l.containerOffset, a = l.containerSize.height, o = l.containerSize.width, r = t.ui.hasScroll(p, "left") ? p.scrollWidth : o, h = t.ui.hasScroll(p) ? p.scrollHeight : a, l.parentData = {
              element: p,
              left: n.left,
              top: n.top,
              width: r,
              height: h
          }))
      },
      resize: function(e) {
          var i, s, n, a, o = t(this).data("ui-resizable"),
              r = o.options,
              h = o.containerOffset,
              l = o.position,
              c = o._aspectRatio || e.shiftKey,
              u = {
                  top: 0,
                  left: 0
              },
              d = o.containerElement;
          d[0] !== document && /static/.test(d.css("position")) && (u = h), l.left < (o._helper ? h.left : 0) && (o.size.width = o.size.width + (o._helper ? o.position.left - h.left : o.position.left - u.left), c && (o.size.height = o.size.width / o.aspectRatio), o.position.left = r.helper ? h.left : 0), l.top < (o._helper ? h.top : 0) && (o.size.height = o.size.height + (o._helper ? o.position.top - h.top : o.position.top), c && (o.size.width = o.size.height * o.aspectRatio), o.position.top = o._helper ? h.top : 0), o.offset.left = o.parentData.left + o.position.left, o.offset.top = o.parentData.top + o.position.top, i = Math.abs((o._helper ? o.offset.left - u.left : o.offset.left - u.left) + o.sizeDiff.width), s = Math.abs((o._helper ? o.offset.top - u.top : o.offset.top - h.top) + o.sizeDiff.height), n = o.containerElement.get(0) === o.element.parent().get(0), a = /relative|absolute/.test(o.containerElement.css("position")), n && a && (i -= Math.abs(o.parentData.left)), i + o.size.width >= o.parentData.width && (o.size.width = o.parentData.width - i, c && (o.size.height = o.size.width / o.aspectRatio)), s + o.size.height >= o.parentData.height && (o.size.height = o.parentData.height - s, c && (o.size.width = o.size.height * o.aspectRatio))
      },
      stop: function() {
          var e = t(this).data("ui-resizable"),
              i = e.options,
              s = e.containerOffset,
              n = e.containerPosition,
              a = e.containerElement,
              o = t(e.helper),
              r = o.offset(),
              h = o.outerWidth() - e.sizeDiff.width,
              l = o.outerHeight() - e.sizeDiff.height;
          e._helper && !i.animate && /relative/.test(a.css("position")) && t(this).css({
              left: r.left - n.left - s.left,
              width: h,
              height: l
          }), e._helper && !i.animate && /static/.test(a.css("position")) && t(this).css({
              left: r.left - n.left - s.left,
              width: h,
              height: l
          })
      }
  }), t.ui.plugin.add("resizable", "alsoResize", {
      start: function() {
          var e = t(this).data("ui-resizable"),
              i = e.options,
              s = function(e) {
                  t(e).each(function() {
                      var e = t(this);
                      e.data("ui-resizable-alsoresize", {
                          width: parseInt(e.width(), 10),
                          height: parseInt(e.height(), 10),
                          left: parseInt(e.css("left"), 10),
                          top: parseInt(e.css("top"), 10)
                      })
                  })
              };
          "object" != typeof i.alsoResize || i.alsoResize.parentNode ? s(i.alsoResize) : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], s(i.alsoResize)) : t.each(i.alsoResize, function(t) {
              s(t)
          })
      },
      resize: function(e, i) {
          var s = t(this).data("ui-resizable"),
              n = s.options,
              a = s.originalSize,
              o = s.originalPosition,
              r = {
                  height: s.size.height - a.height || 0,
                  width: s.size.width - a.width || 0,
                  top: s.position.top - o.top || 0,
                  left: s.position.left - o.left || 0
              },
              h = function(e, s) {
                  t(e).each(function() {
                      var e = t(this),
                          n = t(this).data("ui-resizable-alsoresize"),
                          a = {},
                          o = s && s.length ? s : e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                      t.each(o, function(t, e) {
                          var i = (n[e] || 0) + (r[e] || 0);
                          i && i >= 0 && (a[e] = i || null)
                      }), e.css(a)
                  })
              };
          "object" != typeof n.alsoResize || n.alsoResize.nodeType ? h(n.alsoResize) : t.each(n.alsoResize, function(t, e) {
              h(t, e)
          })
      },
      stop: function() {
          t(this).removeData("resizable-alsoresize")
      }
  }), t.ui.plugin.add("resizable", "ghost", {
      start: function() {
          var e = t(this).data("ui-resizable"),
              i = e.options,
              s = e.size;
          e.ghost = e.originalElement.clone(), e.ghost.css({
              opacity: .25,
              display: "block",
              position: "relative",
              height: s.height,
              width: s.width,
              margin: 0,
              left: 0,
              top: 0
          }).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""), e.ghost.appendTo(e.helper)
      },
      resize: function() {
          var e = t(this).data("ui-resizable");
          e.ghost && e.ghost.css({
              position: "relative",
              height: e.size.height,
              width: e.size.width
          })
      },
      stop: function() {
          var e = t(this).data("ui-resizable");
          e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
      }
  }), t.ui.plugin.add("resizable", "grid", {
      resize: function() {
          var e = t(this).data("ui-resizable"),
              i = e.options,
              s = e.size,
              n = e.originalSize,
              a = e.originalPosition,
              o = e.axis,
              r = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid,
              h = r[0] || 1,
              l = r[1] || 1,
              c = Math.round((s.width - n.width) / h) * h,
              u = Math.round((s.height - n.height) / l) * l,
              d = n.width + c,
              p = n.height + u,
              f = i.maxWidth && d > i.maxWidth,
              g = i.maxHeight && p > i.maxHeight,
              m = i.minWidth && i.minWidth > d,
              v = i.minHeight && i.minHeight > p;
          i.grid = r, m && (d += h), v && (p += l), f && (d -= h), g && (p -= l), /^(se|s|e)$/.test(o) ? (e.size.width = d, e.size.height = p) : /^(ne)$/.test(o) ? (e.size.width = d, e.size.height = p, e.position.top = a.top - u) : /^(sw)$/.test(o) ? (e.size.width = d, e.size.height = p, e.position.left = a.left - c) : (p - l > 0 ? (e.size.height = p, e.position.top = a.top - u) : (e.size.height = l, e.position.top = a.top + n.height - l), d - h > 0 ? (e.size.width = d, e.position.left = a.left - c) : (e.size.width = h, e.position.left = a.left + n.width - h))
      }
  })
})(jQuery);
(function(t) {
  t.widget("ui.selectable", t.ui.mouse, {
      version: "1.10.4",
      options: {
          appendTo: "body",
          autoRefresh: !0,
          distance: 0,
          filter: "*",
          tolerance: "touch",
          selected: null,
          selecting: null,
          start: null,
          stop: null,
          unselected: null,
          unselecting: null
      },
      _create: function() {
          var e, i = this;
          this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
              e = t(i.options.filter, i.element[0]), e.addClass("ui-selectee"), e.each(function() {
                  var e = t(this),
                      i = e.offset();
                  t.data(this, "selectable-item", {
                      element: this,
                      $element: e,
                      left: i.left,
                      top: i.top,
                      right: i.left + e.outerWidth(),
                      bottom: i.top + e.outerHeight(),
                      startselected: !1,
                      selected: e.hasClass("ui-selected"),
                      selecting: e.hasClass("ui-selecting"),
                      unselecting: e.hasClass("ui-unselecting")
                  })
              })
          }, this.refresh(), this.selectees = e.addClass("ui-selectee"), this._mouseInit(), this.helper = t("<div class='ui-selectable-helper'></div>")
      },
      _destroy: function() {
          this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
      },
      _mouseStart: function(e) {
          var i = this,
              s = this.options;
          this.opos = [e.pageX, e.pageY], this.options.disabled || (this.selectees = t(s.filter, this.element[0]), this._trigger("start", e), t(s.appendTo).append(this.helper), this.helper.css({
              left: e.pageX,
              top: e.pageY,
              width: 0,
              height: 0
          }), s.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
              var s = t.data(this, "selectable-item");
              s.startselected = !0, e.metaKey || e.ctrlKey || (s.$element.removeClass("ui-selected"), s.selected = !1, s.$element.addClass("ui-unselecting"), s.unselecting = !0, i._trigger("unselecting", e, {
                  unselecting: s.element
              }))
          }), t(e.target).parents().addBack().each(function() {
              var s, n = t.data(this, "selectable-item");
              return n ? (s = !e.metaKey && !e.ctrlKey || !n.$element.hasClass("ui-selected"), n.$element.removeClass(s ? "ui-unselecting" : "ui-selected").addClass(s ? "ui-selecting" : "ui-unselecting"), n.unselecting = !s, n.selecting = s, n.selected = s, s ? i._trigger("selecting", e, {
                  selecting: n.element
              }) : i._trigger("unselecting", e, {
                  unselecting: n.element
              }), !1) : undefined
          }))
      },
      _mouseDrag: function(e) {
          if (this.dragged = !0, !this.options.disabled) {
              var i, s = this,
                  n = this.options,
                  a = this.opos[0],
                  o = this.opos[1],
                  r = e.pageX,
                  l = e.pageY;
              return a > r && (i = r, r = a, a = i), o > l && (i = l, l = o, o = i), this.helper.css({
                  left: a,
                  top: o,
                  width: r - a,
                  height: l - o
              }), this.selectees.each(function() {
                  var i = t.data(this, "selectable-item"),
                      h = !1;
                  i && i.element !== s.element[0] && ("touch" === n.tolerance ? h = !(i.left > r || a > i.right || i.top > l || o > i.bottom) : "fit" === n.tolerance && (h = i.left > a && r > i.right && i.top > o && l > i.bottom), h ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, s._trigger("selecting", e, {
                      selecting: i.element
                  }))) : (i.selecting && ((e.metaKey || e.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), s._trigger("unselecting", e, {
                      unselecting: i.element
                  }))), i.selected && (e.metaKey || e.ctrlKey || i.startselected || (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, s._trigger("unselecting", e, {
                      unselecting: i.element
                  })))))
              }), !1
          }
      },
      _mouseStop: function(e) {
          var i = this;
          return this.dragged = !1, t(".ui-unselecting", this.element[0]).each(function() {
              var s = t.data(this, "selectable-item");
              s.$element.removeClass("ui-unselecting"), s.unselecting = !1, s.startselected = !1, i._trigger("unselected", e, {
                  unselected: s.element
              })
          }), t(".ui-selecting", this.element[0]).each(function() {
              var s = t.data(this, "selectable-item");
              s.$element.removeClass("ui-selecting").addClass("ui-selected"), s.selecting = !1, s.selected = !0, s.startselected = !0, i._trigger("selected", e, {
                  selected: s.element
              })
          }), this._trigger("stop", e), this.helper.remove(), !1
      }
  })
})(jQuery);
(function(t) {
  var e = 5;
  t.widget("ui.slider", t.ui.mouse, {
      version: "1.10.4",
      widgetEventPrefix: "slide",
      options: {
          animate: !1,
          distance: 0,
          max: 100,
          min: 0,
          orientation: "horizontal",
          range: !1,
          step: 1,
          value: 0,
          values: null,
          change: null,
          slide: null,
          start: null,
          stop: null
      },
      _create: function() {
          this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
      },
      _refresh: function() {
          this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
      },
      _createHandles: function() {
          var e, i, s = this.options,
              n = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
              a = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
              o = [];
          for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), e = n.length; i > e; e++) o.push(a);
          this.handles = n.add(t(o.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(e) {
              t(this).data("ui-slider-handle-index", e)
          })
      },
      _createRange: function() {
          var e = this.options,
              i = "";
          e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
              left: "",
              bottom: ""
          }) : (this.range = t("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === e.range || "max" === e.range ? " ui-slider-range-" + e.range : ""))) : (this.range && this.range.remove(), this.range = null)
      },
      _setupEvents: function() {
          var t = this.handles.add(this.range).filter("a");
          this._off(t), this._on(t, this._handleEvents), this._hoverable(t), this._focusable(t)
      },
      _destroy: function() {
          this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
      },
      _mouseCapture: function(e) {
          var i, s, n, a, o, r, l, h, u = this,
              c = this.options;
          return c.disabled ? !1 : (this.elementSize = {
              width: this.element.outerWidth(),
              height: this.element.outerHeight()
          }, this.elementOffset = this.element.offset(), i = {
              x: e.pageX,
              y: e.pageY
          }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function(e) {
              var i = Math.abs(s - u.values(e));
              (n > i || n === i && (e === u._lastChangedValue || u.values(e) === c.min)) && (n = i, a = t(this), o = e)
          }), r = this._start(e, o), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = o, a.addClass("ui-state-active").focus(), l = a.offset(), h = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = h ? {
              left: 0,
              top: 0
          } : {
              left: e.pageX - l.left - a.width() / 2,
              top: e.pageY - l.top - a.height() / 2 - (parseInt(a.css("borderTopWidth"), 10) || 0) - (parseInt(a.css("borderBottomWidth"), 10) || 0) + (parseInt(a.css("marginTop"), 10) || 0)
          }, this.handles.hasClass("ui-state-hover") || this._slide(e, o, s), this._animateOff = !0, !0))
      },
      _mouseStart: function() {
          return !0
      },
      _mouseDrag: function(t) {
          var e = {
                  x: t.pageX,
                  y: t.pageY
              },
              i = this._normValueFromMouse(e);
          return this._slide(t, this._handleIndex, i), !1
      },
      _mouseStop: function(t) {
          return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
      },
      _detectOrientation: function() {
          this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
      },
      _normValueFromMouse: function(t) {
          var e, i, s, n, a;
          return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / e, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), a = this._valueMin() + s * n, this._trimAlignValue(a)
      },
      _start: function(t, e) {
          var i = {
              handle: this.handles[e],
              value: this.value()
          };
          return this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("start", t, i)
      },
      _slide: function(t, e, i) {
          var s, n, a;
          this.options.values && this.options.values.length ? (s = this.values(e ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === e && i > s || 1 === e && s > i) && (i = s), i !== this.values(e) && (n = this.values(), n[e] = i, a = this._trigger("slide", t, {
              handle: this.handles[e],
              value: i,
              values: n
          }), s = this.values(e ? 0 : 1), a !== !1 && this.values(e, i))) : i !== this.value() && (a = this._trigger("slide", t, {
              handle: this.handles[e],
              value: i
          }), a !== !1 && this.value(i))
      },
      _stop: function(t, e) {
          var i = {
              handle: this.handles[e],
              value: this.value()
          };
          this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("stop", t, i)
      },
      _change: function(t, e) {
          if (!this._keySliding && !this._mouseSliding) {
              var i = {
                  handle: this.handles[e],
                  value: this.value()
              };
              this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._lastChangedValue = e, this._trigger("change", t, i)
          }
      },
      value: function(t) {
          return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), this._change(null, 0), undefined) : this._value()
      },
      values: function(e, i) {
          var s, n, a;
          if (arguments.length > 1) return this.options.values[e] = this._trimAlignValue(i), this._refreshValue(), this._change(null, e), undefined;
          if (!arguments.length) return this._values();
          if (!t.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(e) : this.value();
          for (s = this.options.values, n = arguments[0], a = 0; s.length > a; a += 1) s[a] = this._trimAlignValue(n[a]), this._change(null, a);
          this._refreshValue()
      },
      _setOption: function(e, i) {
          var s, n = 0;
          switch ("range" === e && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (n = this.options.values.length), t.Widget.prototype._setOption.apply(this, arguments), e) {
              case "orientation":
                  this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                  break;
              case "value":
                  this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                  break;
              case "values":
                  for (this._animateOff = !0, this._refreshValue(), s = 0; n > s; s += 1) this._change(null, s);
                  this._animateOff = !1;
                  break;
              case "min":
              case "max":
                  this._animateOff = !0, this._refreshValue(), this._animateOff = !1;
                  break;
              case "range":
                  this._animateOff = !0, this._refresh(), this._animateOff = !1
          }
      },
      _value: function() {
          var t = this.options.value;
          return t = this._trimAlignValue(t)
      },
      _values: function(t) {
          var e, i, s;
          if (arguments.length) return e = this.options.values[t], e = this._trimAlignValue(e);
          if (this.options.values && this.options.values.length) {
              for (i = this.options.values.slice(), s = 0; i.length > s; s += 1) i[s] = this._trimAlignValue(i[s]);
              return i
          }
          return []
      },
      _trimAlignValue: function(t) {
          if (this._valueMin() >= t) return this._valueMin();
          if (t >= this._valueMax()) return this._valueMax();
          var e = this.options.step > 0 ? this.options.step : 1,
              i = (t - this._valueMin()) % e,
              s = t - i;
          return 2 * Math.abs(i) >= e && (s += i > 0 ? e : -e), parseFloat(s.toFixed(5))
      },
      _valueMin: function() {
          return this.options.min
      },
      _valueMax: function() {
          return this.options.max
      },
      _refreshValue: function() {
          var e, i, s, n, a, o = this.options.range,
              r = this.options,
              l = this,
              h = this._animateOff ? !1 : r.animate,
              u = {};
          this.options.values && this.options.values.length ? this.handles.each(function(s) {
              i = 100 * ((l.values(s) - l._valueMin()) / (l._valueMax() - l._valueMin())), u["horizontal" === l.orientation ? "left" : "bottom"] = i + "%", t(this).stop(1, 1)[h ? "animate" : "css"](u, r.animate), l.options.range === !0 && ("horizontal" === l.orientation ? (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({
                  left: i + "%"
              }, r.animate), 1 === s && l.range[h ? "animate" : "css"]({
                  width: i - e + "%"
              }, {
                  queue: !1,
                  duration: r.animate
              })) : (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({
                  bottom: i + "%"
              }, r.animate), 1 === s && l.range[h ? "animate" : "css"]({
                  height: i - e + "%"
              }, {
                  queue: !1,
                  duration: r.animate
              }))), e = i
          }) : (s = this.value(), n = this._valueMin(), a = this._valueMax(), i = a !== n ? 100 * ((s - n) / (a - n)) : 0, u["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[h ? "animate" : "css"](u, r.animate), "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
              width: i + "%"
          }, r.animate), "max" === o && "horizontal" === this.orientation && this.range[h ? "animate" : "css"]({
              width: 100 - i + "%"
          }, {
              queue: !1,
              duration: r.animate
          }), "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
              height: i + "%"
          }, r.animate), "max" === o && "vertical" === this.orientation && this.range[h ? "animate" : "css"]({
              height: 100 - i + "%"
          }, {
              queue: !1,
              duration: r.animate
          }))
      },
      _handleEvents: {
          keydown: function(i) {
              var s, n, a, o, r = t(i.target).data("ui-slider-handle-index");
              switch (i.keyCode) {
                  case t.ui.keyCode.HOME:
                  case t.ui.keyCode.END:
                  case t.ui.keyCode.PAGE_UP:
                  case t.ui.keyCode.PAGE_DOWN:
                  case t.ui.keyCode.UP:
                  case t.ui.keyCode.RIGHT:
                  case t.ui.keyCode.DOWN:
                  case t.ui.keyCode.LEFT:
                      if (i.preventDefault(), !this._keySliding && (this._keySliding = !0, t(i.target).addClass("ui-state-active"), s = this._start(i, r), s === !1)) return
              }
              switch (o = this.options.step, n = a = this.options.values && this.options.values.length ? this.values(r) : this.value(), i.keyCode) {
                  case t.ui.keyCode.HOME:
                      a = this._valueMin();
                      break;
                  case t.ui.keyCode.END:
                      a = this._valueMax();
                      break;
                  case t.ui.keyCode.PAGE_UP:
                      a = this._trimAlignValue(n + (this._valueMax() - this._valueMin()) / e);
                      break;
                  case t.ui.keyCode.PAGE_DOWN:
                      a = this._trimAlignValue(n - (this._valueMax() - this._valueMin()) / e);
                      break;
                  case t.ui.keyCode.UP:
                  case t.ui.keyCode.RIGHT:
                      if (n === this._valueMax()) return;
                      a = this._trimAlignValue(n + o);
                      break;
                  case t.ui.keyCode.DOWN:
                  case t.ui.keyCode.LEFT:
                      if (n === this._valueMin()) return;
                      a = this._trimAlignValue(n - o)
              }
              this._slide(i, r, a)
          },
          click: function(t) {
              t.preventDefault()
          },
          keyup: function(e) {
              var i = t(e.target).data("ui-slider-handle-index");
              this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), t(e.target).removeClass("ui-state-active"))
          }
      }
  })
})(jQuery);
(function(t) {
  function e(t, e, i) {
      return t > e && e + i > t
  }

  function i(t) {
      return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
  }
  t.widget("ui.sortable", t.ui.mouse, {
      version: "1.10.4",
      widgetEventPrefix: "sort",
      ready: !1,
      options: {
          appendTo: "parent",
          axis: !1,
          connectWith: !1,
          containment: !1,
          cursor: "auto",
          cursorAt: !1,
          dropOnEmpty: !0,
          forcePlaceholderSize: !1,
          forceHelperSize: !1,
          grid: !1,
          handle: !1,
          helper: "original",
          items: "> *",
          opacity: !1,
          placeholder: !1,
          revert: !1,
          scroll: !0,
          scrollSensitivity: 20,
          scrollSpeed: 20,
          scope: "default",
          tolerance: "intersect",
          zIndex: 1e3,
          activate: null,
          beforeStop: null,
          change: null,
          deactivate: null,
          out: null,
          over: null,
          receive: null,
          remove: null,
          sort: null,
          start: null,
          stop: null,
          update: null
      },
      _create: function() {
          var t = this.options;
          this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === t.axis || i(this.items[0].item) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
      },
      _destroy: function() {
          this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
          for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + "-item");
          return this
      },
      _setOption: function(e, i) {
          "disabled" === e ? (this.options[e] = i, this.widget().toggleClass("ui-sortable-disabled", !!i)) : t.Widget.prototype._setOption.apply(this, arguments)
      },
      _mouseCapture: function(e, i) {
          var s = null,
              n = !1,
              o = this;
          return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(e), t(e.target).parents().each(function() {
              return t.data(this, o.widgetName + "-item") === o ? (s = t(this), !1) : undefined
          }), t.data(e.target, o.widgetName + "-item") === o && (s = t(e.target)), s ? !this.options.handle || i || (t(this.options.handle, s).find("*").addBack().each(function() {
              this === e.target && (n = !0)
          }), n) ? (this.currentItem = s, this._removeCurrentsFromItems(), !0) : !1 : !1)
      },
      _mouseStart: function(e, i, s) {
          var n, o, a = this.options;
          if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                  top: this.offset.top - this.margins.top,
                  left: this.offset.left - this.margins.left
              }, t.extend(this.offset, {
                  click: {
                      left: e.pageX - this.offset.left,
                      top: e.pageY - this.offset.top
                  },
                  parent: this._getParentOffset(),
                  relative: this._getRelativeOffset()
              }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt), this.domPosition = {
                  prev: this.currentItem.prev()[0],
                  parent: this.currentItem.parent()[0]
              }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), a.containment && this._setContainment(), a.cursor && "auto" !== a.cursor && (o = this.document.find("body"), this.storedCursor = o.css("cursor"), o.css("cursor", a.cursor), this.storedStylesheet = t("<style>*{ cursor: " + a.cursor + " !important; }</style>").appendTo(o)), a.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", a.opacity)), a.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", a.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s)
              for (n = this.containers.length - 1; n >= 0; n--) this.containers[n]._trigger("activate", e, this._uiHash(this));
          return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(e), !0
      },
      _mouseDrag: function(e) {
          var i, s, n, o, a = this.options,
              r = !1;
          for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < a.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + a.scrollSpeed : e.pageY - this.overflowOffset.top < a.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - a.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < a.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + a.scrollSpeed : e.pageX - this.overflowOffset.left < a.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - a.scrollSpeed)) : (e.pageY - t(document).scrollTop() < a.scrollSensitivity ? r = t(document).scrollTop(t(document).scrollTop() - a.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < a.scrollSensitivity && (r = t(document).scrollTop(t(document).scrollTop() + a.scrollSpeed)), e.pageX - t(document).scrollLeft() < a.scrollSensitivity ? r = t(document).scrollLeft(t(document).scrollLeft() - a.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < a.scrollSensitivity && (r = t(document).scrollLeft(t(document).scrollLeft() + a.scrollSpeed))), r !== !1 && t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--)
              if (s = this.items[i], n = s.item[0], o = this._intersectsWithPointer(s), o && s.instance === this.currentContainer && n !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== n && !t.contains(this.placeholder[0], n) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], n) : !0)) {
                  if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(s)) break;
                  this._rearrange(e, s), this._trigger("change", e, this._uiHash());
                  break
              }
          return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
      },
      _mouseStop: function(e, i) {
          if (e) {
              if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
                  var s = this,
                      n = this.placeholder.offset(),
                      o = this.options.axis,
                      a = {};
                  o && "x" !== o || (a.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), o && "y" !== o || (a.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(a, parseInt(this.options.revert, 10) || 500, function() {
                      s._clear(e)
                  })
              } else this._clear(e, i);
              return !1
          }
      },
      cancel: function() {
          if (this.dragging) {
              this._mouseUp({
                  target: null
              }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
              for (var e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
          }
          return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
              helper: null,
              dragging: !1,
              reverting: !1,
              _noFinalSort: null
          }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this
      },
      serialize: function(e) {
          var i = this._getItemsAsjQuery(e && e.connected),
              s = [];
          return e = e || {}, t(i).each(function() {
              var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
              i && s.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
          }), !s.length && e.key && s.push(e.key + "="), s.join("&")
      },
      toArray: function(e) {
          var i = this._getItemsAsjQuery(e && e.connected),
              s = [];
          return e = e || {}, i.each(function() {
              s.push(t(e.item || this).attr(e.attribute || "id") || "")
          }), s
      },
      _intersectsWith: function(t) {
          var e = this.positionAbs.left,
              i = e + this.helperProportions.width,
              s = this.positionAbs.top,
              n = s + this.helperProportions.height,
              o = t.left,
              a = o + t.width,
              r = t.top,
              h = r + t.height,
              l = this.offset.click.top,
              c = this.offset.click.left,
              u = "x" === this.options.axis || s + l > r && h > s + l,
              d = "y" === this.options.axis || e + c > o && a > e + c,
              p = u && d;
          return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : e + this.helperProportions.width / 2 > o && a > i - this.helperProportions.width / 2 && s + this.helperProportions.height / 2 > r && h > n - this.helperProportions.height / 2
      },
      _intersectsWithPointer: function(t) {
          var i = "x" === this.options.axis || e(this.positionAbs.top + this.offset.click.top, t.top, t.height),
              s = "y" === this.options.axis || e(this.positionAbs.left + this.offset.click.left, t.left, t.width),
              n = i && s,
              o = this._getDragVerticalDirection(),
              a = this._getDragHorizontalDirection();
          return n ? this.floating ? a && "right" === a || "down" === o ? 2 : 1 : o && ("down" === o ? 2 : 1) : !1
      },
      _intersectsWithSides: function(t) {
          var i = e(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
              s = e(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
              n = this._getDragVerticalDirection(),
              o = this._getDragHorizontalDirection();
          return this.floating && o ? "right" === o && s || "left" === o && !s : n && ("down" === n && i || "up" === n && !i)
      },
      _getDragVerticalDirection: function() {
          var t = this.positionAbs.top - this.lastPositionAbs.top;
          return 0 !== t && (t > 0 ? "down" : "up")
      },
      _getDragHorizontalDirection: function() {
          var t = this.positionAbs.left - this.lastPositionAbs.left;
          return 0 !== t && (t > 0 ? "right" : "left")
      },
      refresh: function(t) {
          return this._refreshItems(t), this.refreshPositions(), this
      },
      _connectWith: function() {
          var t = this.options;
          return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
      },
      _getItemsAsjQuery: function(e) {
          function i() {
              r.push(this)
          }
          var s, n, o, a, r = [],
              h = [],
              l = this._connectWith();
          if (l && e)
              for (s = l.length - 1; s >= 0; s--)
                  for (o = t(l[s]), n = o.length - 1; n >= 0; n--) a = t.data(o[n], this.widgetFullName), a && a !== this && !a.options.disabled && h.push([t.isFunction(a.options.items) ? a.options.items.call(a.element) : t(a.options.items, a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), a]);
          for (h.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                  options: this.options,
                  item: this.currentItem
              }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), s = h.length - 1; s >= 0; s--) h[s][0].each(i);
          return t(r)
      },
      _removeCurrentsFromItems: function() {
          var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
          this.items = t.grep(this.items, function(t) {
              for (var i = 0; e.length > i; i++)
                  if (e[i] === t.item[0]) return !1;
              return !0
          })
      },
      _refreshItems: function(e) {
          this.items = [], this.containers = [this];
          var i, s, n, o, a, r, h, l, c = this.items,
              u = [
                  [t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
                      item: this.currentItem
                  }) : t(this.options.items, this.element), this]
              ],
              d = this._connectWith();
          if (d && this.ready)
              for (i = d.length - 1; i >= 0; i--)
                  for (n = t(d[i]), s = n.length - 1; s >= 0; s--) o = t.data(n[s], this.widgetFullName), o && o !== this && !o.options.disabled && (u.push([t.isFunction(o.options.items) ? o.options.items.call(o.element[0], e, {
                      item: this.currentItem
                  }) : t(o.options.items, o.element), o]), this.containers.push(o));
          for (i = u.length - 1; i >= 0; i--)
              for (a = u[i][1], r = u[i][0], s = 0, l = r.length; l > s; s++) h = t(r[s]), h.data(this.widgetName + "-item", a), c.push({
                  item: h,
                  instance: a,
                  width: 0,
                  height: 0,
                  left: 0,
                  top: 0
              })
      },
      refreshPositions: function(e) {
          this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
          var i, s, n, o;
          for (i = this.items.length - 1; i >= 0; i--) s = this.items[i], s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement ? t(this.options.toleranceElement, s.item) : s.item, e || (s.width = n.outerWidth(), s.height = n.outerHeight()), o = n.offset(), s.left = o.left, s.top = o.top);
          if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
          else
              for (i = this.containers.length - 1; i >= 0; i--) o = this.containers[i].element.offset(), this.containers[i].containerCache.left = o.left, this.containers[i].containerCache.top = o.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
          return this
      },
      _createPlaceholder: function(e) {
          e = e || this;
          var i, s = e.options;
          s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder, s.placeholder = {
              element: function() {
                  var s = e.currentItem[0].nodeName.toLowerCase(),
                      n = t("<" + s + ">", e.document[0]).addClass(i || e.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                  return "tr" === s ? e.currentItem.children().each(function() {
                      t("<td>&#160;</td>", e.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(n)
                  }) : "img" === s && n.attr("src", e.currentItem.attr("src")), i || n.css("visibility", "hidden"), n
              },
              update: function(t, n) {
                  (!i || s.forcePlaceholderSize) && (n.height() || n.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), n.width() || n.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
              }
          }), e.placeholder = t(s.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), s.placeholder.update(e, e.placeholder)
      },
      _contactContainers: function(s) {
          var n, o, a, r, h, l, c, u, d, p, f = null,
              g = null;
          for (n = this.containers.length - 1; n >= 0; n--)
              if (!t.contains(this.currentItem[0], this.containers[n].element[0]))
                  if (this._intersectsWith(this.containers[n].containerCache)) {
                      if (f && t.contains(this.containers[n].element[0], f.element[0])) continue;
                      f = this.containers[n], g = n
                  } else this.containers[n].containerCache.over && (this.containers[n]._trigger("out", s, this._uiHash(this)), this.containers[n].containerCache.over = 0);
          if (f)
              if (1 === this.containers.length) this.containers[g].containerCache.over || (this.containers[g]._trigger("over", s, this._uiHash(this)), this.containers[g].containerCache.over = 1);
              else {
                  for (a = 1e4, r = null, p = f.floating || i(this.currentItem), h = p ? "left" : "top", l = p ? "width" : "height", c = this.positionAbs[h] + this.offset.click[h], o = this.items.length - 1; o >= 0; o--) t.contains(this.containers[g].element[0], this.items[o].item[0]) && this.items[o].item[0] !== this.currentItem[0] && (!p || e(this.positionAbs.top + this.offset.click.top, this.items[o].top, this.items[o].height)) && (u = this.items[o].item.offset()[h], d = !1, Math.abs(u - c) > Math.abs(u + this.items[o][l] - c) && (d = !0, u += this.items[o][l]), a > Math.abs(u - c) && (a = Math.abs(u - c), r = this.items[o], this.direction = d ? "up" : "down"));
                  if (!r && !this.options.dropOnEmpty) return;
                  if (this.currentContainer === this.containers[g]) return;
                  r ? this._rearrange(s, r, null, !0) : this._rearrange(s, null, this.containers[g].element, !0), this._trigger("change", s, this._uiHash()), this.containers[g]._trigger("change", s, this._uiHash(this)), this.currentContainer = this.containers[g], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[g]._trigger("over", s, this._uiHash(this)), this.containers[g].containerCache.over = 1
              }
      },
      _createHelper: function(e) {
          var i = this.options,
              s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
          return s.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]), s[0] === this.currentItem[0] && (this._storedCSS = {
              width: this.currentItem[0].style.width,
              height: this.currentItem[0].style.height,
              position: this.currentItem.css("position"),
              top: this.currentItem.css("top"),
              left: this.currentItem.css("left")
          }), (!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()), (!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()), s
      },
      _adjustOffsetFromHelper: function(e) {
          "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
              left: +e[0],
              top: +e[1] || 0
          }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
      },
      _getParentOffset: function() {
          this.offsetParent = this.helper.offsetParent();
          var e = this.offsetParent.offset();
          return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
              top: 0,
              left: 0
          }), {
              top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
              left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
          }
      },
      _getRelativeOffset: function() {
          if ("relative" === this.cssPosition) {
              var t = this.currentItem.position();
              return {
                  top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                  left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
              }
          }
          return {
              top: 0,
              left: 0
          }
      },
      _cacheMargins: function() {
          this.margins = {
              left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
              top: parseInt(this.currentItem.css("marginTop"), 10) || 0
          }
      },
      _cacheHelperProportions: function() {
          this.helperProportions = {
              width: this.helper.outerWidth(),
              height: this.helper.outerHeight()
          }
      },
      _setContainment: function() {
          var e, i, s, n = this.options;
          "parent" === n.containment && (n.containment = this.helper[0].parentNode), ("document" === n.containment || "window" === n.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, t("document" === n.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (t("document" === n.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(n.containment) || (e = t(n.containment)[0], i = t(n.containment).offset(), s = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
      },
      _convertPositionTo: function(e, i) {
          i || (i = this.position);
          var s = "absolute" === e ? 1 : -1,
              n = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
              o = /(html|body)/i.test(n[0].tagName);
          return {
              top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()) * s,
              left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft()) * s
          }
      },
      _generatePosition: function(e) {
          var i, s, n = this.options,
              o = e.pageX,
              a = e.pageY,
              r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
              h = /(html|body)/i.test(r[0].tagName);
          return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (a = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (a = this.containment[3] + this.offset.click.top)), n.grid && (i = this.originalPageY + Math.round((a - this.originalPageY) / n.grid[1]) * n.grid[1], a = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - n.grid[1] : i + n.grid[1] : i, s = this.originalPageX + Math.round((o - this.originalPageX) / n.grid[0]) * n.grid[0], o = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - n.grid[0] : s + n.grid[0] : s)), {
              top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : h ? 0 : r.scrollTop()),
              left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : h ? 0 : r.scrollLeft())
          }
      },
      _rearrange: function(t, e, i, s) {
          i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
          var n = this.counter;
          this._delay(function() {
              n === this.counter && this.refreshPositions(!s)
          })
      },
      _clear: function(t, e) {
          function i(t, e, i) {
              return function(s) {
                  i._trigger(t, s, e._uiHash(e))
              }
          }
          this.reverting = !1;
          var s, n = [];
          if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
              for (s in this._storedCSS)("auto" === this._storedCSS[s] || "static" === this._storedCSS[s]) && (this._storedCSS[s] = "");
              this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
          } else this.currentItem.show();
          for (this.fromOutside && !e && n.push(function(t) {
                  this._trigger("receive", t, this._uiHash(this.fromOutside))
              }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || n.push(function(t) {
                  this._trigger("update", t, this._uiHash())
              }), this !== this.currentContainer && (e || (n.push(function(t) {
                  this._trigger("remove", t, this._uiHash())
              }), n.push(function(t) {
                  return function(e) {
                      t._trigger("receive", e, this._uiHash(this))
                  }
              }.call(this, this.currentContainer)), n.push(function(t) {
                  return function(e) {
                      t._trigger("update", e, this._uiHash(this))
                  }
              }.call(this, this.currentContainer)))), s = this.containers.length - 1; s >= 0; s--) e || n.push(i("deactivate", this, this.containers[s])), this.containers[s].containerCache.over && (n.push(i("out", this, this.containers[s])), this.containers[s].containerCache.over = 0);
          if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
              if (!e) {
                  for (this._trigger("beforeStop", t, this._uiHash()), s = 0; n.length > s; s++) n[s].call(this, t);
                  this._trigger("stop", t, this._uiHash())
              }
              return this.fromOutside = !1, !1
          }
          if (e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !e) {
              for (s = 0; n.length > s; s++) n[s].call(this, t);
              this._trigger("stop", t, this._uiHash())
          }
          return this.fromOutside = !1, !0
      },
      _trigger: function() {
          t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
      },
      _uiHash: function(e) {
          var i = e || this;
          return {
              helper: i.helper,
              placeholder: i.placeholder || t([]),
              position: i.position,
              originalPosition: i.originalPosition,
              offset: i.positionAbs,
              item: i.currentItem,
              sender: e ? e.element : null
          }
      }
  })
})(jQuery);
(function(t) {
  function e(t) {
      return function() {
          var e = this.element.val();
          t.apply(this, arguments), this._refresh(), e !== this.element.val() && this._trigger("change")
      }
  }
  t.widget("ui.spinner", {
      version: "1.10.4",
      defaultElement: "<input>",
      widgetEventPrefix: "spin",
      options: {
          culture: null,
          icons: {
              down: "ui-icon-triangle-1-s",
              up: "ui-icon-triangle-1-n"
          },
          incremental: !0,
          max: null,
          min: null,
          numberFormat: null,
          page: 10,
          step: 1,
          change: null,
          spin: null,
          start: null,
          stop: null
      },
      _create: function() {
          this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
              beforeunload: function() {
                  this.element.removeAttr("autocomplete")
              }
          })
      },
      _getCreateOptions: function() {
          var e = {},
              i = this.element;
          return t.each(["min", "max", "step"], function(t, s) {
              var n = i.attr(s);
              void 0 !== n && n.length && (e[s] = n)
          }), e
      },
      _events: {
          keydown: function(t) {
              this._start(t) && this._keydown(t) && t.preventDefault()
          },
          keyup: "_stop",
          focus: function() {
              this.previous = this.element.val()
          },
          blur: function(t) {
              return this.cancelBlur ? (delete this.cancelBlur, void 0) : (this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", t), void 0)
          },
          mousewheel: function(t, e) {
              if (e) {
                  if (!this.spinning && !this._start(t)) return !1;
                  this._spin((e > 0 ? 1 : -1) * this.options.step, t), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function() {
                      this.spinning && this._stop(t)
                  }, 100), t.preventDefault()
              }
          },
          "mousedown .ui-spinner-button": function(e) {
              function i() {
                  var t = this.element[0] === this.document[0].activeElement;
                  t || (this.element.focus(), this.previous = s, this._delay(function() {
                      this.previous = s
                  }))
              }
              var s;
              s = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), e.preventDefault(), i.call(this), this.cancelBlur = !0, this._delay(function() {
                  delete this.cancelBlur, i.call(this)
              }), this._start(e) !== !1 && this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e)
          },
          "mouseup .ui-spinner-button": "_stop",
          "mouseenter .ui-spinner-button": function(e) {
              return t(e.currentTarget).hasClass("ui-state-active") ? this._start(e) === !1 ? !1 : (this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e), void 0) : void 0
          },
          "mouseleave .ui-spinner-button": "_stop"
      },
      _draw: function() {
          var t = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
          this.element.attr("role", "spinbutton"), this.buttons = t.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(.5 * t.height()) && t.height() > 0 && t.height(t.height()), this.options.disabled && this.disable()
      },
      _keydown: function(e) {
          var i = this.options,
              s = t.ui.keyCode;
          switch (e.keyCode) {
              case s.UP:
                  return this._repeat(null, 1, e), !0;
              case s.DOWN:
                  return this._repeat(null, -1, e), !0;
              case s.PAGE_UP:
                  return this._repeat(null, i.page, e), !0;
              case s.PAGE_DOWN:
                  return this._repeat(null, -i.page, e), !0
          }
          return !1
      },
      _uiSpinnerHtml: function() {
          return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
      },
      _buttonHtml: function() {
          return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span>" + "</a>" + "<a class='ui-spinner-button ui-spinner-down ui-corner-br'>" + "<span class='ui-icon " + this.options.icons.down + "'>&#9660;</span>" + "</a>"
      },
      _start: function(t) {
          return this.spinning || this._trigger("start", t) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1
      },
      _repeat: function(t, e, i) {
          t = t || 500, clearTimeout(this.timer), this.timer = this._delay(function() {
              this._repeat(40, e, i)
          }, t), this._spin(e * this.options.step, i)
      },
      _spin: function(t, e) {
          var i = this.value() || 0;
          this.counter || (this.counter = 1), i = this._adjustValue(i + t * this._increment(this.counter)), this.spinning && this._trigger("spin", e, {
              value: i
          }) === !1 || (this._value(i), this.counter++)
      },
      _increment: function(e) {
          var i = this.options.incremental;
          return i ? t.isFunction(i) ? i(e) : Math.floor(e * e * e / 5e4 - e * e / 500 + 17 * e / 200 + 1) : 1
      },
      _precision: function() {
          var t = this._precisionOf(this.options.step);
          return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t
      },
      _precisionOf: function(t) {
          var e = "" + t,
              i = e.indexOf(".");
          return -1 === i ? 0 : e.length - i - 1
      },
      _adjustValue: function(t) {
          var e, i, s = this.options;
          return e = null !== s.min ? s.min : 0, i = t - e, i = Math.round(i / s.step) * s.step, t = e + i, t = parseFloat(t.toFixed(this._precision())), null !== s.max && t > s.max ? s.max : null !== s.min && s.min > t ? s.min : t
      },
      _stop: function(t) {
          this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", t))
      },
      _setOption: function(t, e) {
          if ("culture" === t || "numberFormat" === t) {
              var i = this._parse(this.element.val());
              return this.options[t] = e, this.element.val(this._format(i)), void 0
          }("max" === t || "min" === t || "step" === t) && "string" == typeof e && (e = this._parse(e)), "icons" === t && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(e.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(e.down)), this._super(t, e), "disabled" === t && (e ? (this.element.prop("disabled", !0), this.buttons.button("disable")) : (this.element.prop("disabled", !1), this.buttons.button("enable")))
      },
      _setOptions: e(function(t) {
          this._super(t), this._value(this.element.val())
      }),
      _parse: function(t) {
          return "string" == typeof t && "" !== t && (t = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(t, 10, this.options.culture) : +t), "" === t || isNaN(t) ? null : t
      },
      _format: function(t) {
          return "" === t ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(t, this.options.numberFormat, this.options.culture) : t
      },
      _refresh: function() {
          this.element.attr({
              "aria-valuemin": this.options.min,
              "aria-valuemax": this.options.max,
              "aria-valuenow": this._parse(this.element.val())
          })
      },
      _value: function(t, e) {
          var i;
          "" !== t && (i = this._parse(t), null !== i && (e || (i = this._adjustValue(i)), t = this._format(i))), this.element.val(t), this._refresh()
      },
      _destroy: function() {
          this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element)
      },
      stepUp: e(function(t) {
          this._stepUp(t)
      }),
      _stepUp: function(t) {
          this._start() && (this._spin((t || 1) * this.options.step), this._stop())
      },
      stepDown: e(function(t) {
          this._stepDown(t)
      }),
      _stepDown: function(t) {
          this._start() && (this._spin((t || 1) * -this.options.step), this._stop())
      },
      pageUp: e(function(t) {
          this._stepUp((t || 1) * this.options.page)
      }),
      pageDown: e(function(t) {
          this._stepDown((t || 1) * this.options.page)
      }),
      value: function(t) {
          return arguments.length ? (e(this._value).call(this, t), void 0) : this._parse(this.element.val())
      },
      widget: function() {
          return this.uiSpinner
      }
  })
})(jQuery);
(function(t, e) {
  function i() {
      return ++n
  }

  function s(t) {
      return t = t.cloneNode(!1), t.hash.length > 1 && decodeURIComponent(t.href.replace(a, "")) === decodeURIComponent(location.href.replace(a, ""))
  }
  var n = 0,
      a = /#.*$/;
  t.widget("ui.tabs", {
      version: "1.10.4",
      delay: 300,
      options: {
          active: null,
          collapsible: !1,
          event: "click",
          heightStyle: "content",
          hide: null,
          show: null,
          activate: null,
          beforeActivate: null,
          beforeLoad: null,
          load: null
      },
      _create: function() {
          var e = this,
              i = this.options;
          this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function(e) {
              t(this).is(".ui-state-disabled") && e.preventDefault()
          }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
              t(this).closest("li").is(".ui-state-disabled") && this.blur()
          }), this._processTabs(), i.active = this._initialActive(), t.isArray(i.disabled) && (i.disabled = t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"), function(t) {
              return e.tabs.index(t)
          }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(i.active) : t(), this._refresh(), this.active.length && this.load(i.active)
      },
      _initialActive: function() {
          var i = this.options.active,
              s = this.options.collapsible,
              n = location.hash.substring(1);
          return null === i && (n && this.tabs.each(function(s, a) {
              return t(a).attr("aria-controls") === n ? (i = s, !1) : e
          }), null === i && (i = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === i || -1 === i) && (i = this.tabs.length ? 0 : !1)), i !== !1 && (i = this.tabs.index(this.tabs.eq(i)), -1 === i && (i = s ? !1 : 0)), !s && i === !1 && this.anchors.length && (i = 0), i
      },
      _getCreateEventData: function() {
          return {
              tab: this.active,
              panel: this.active.length ? this._getPanelForTab(this.active) : t()
          }
      },
      _tabKeydown: function(i) {
          var s = t(this.document[0].activeElement).closest("li"),
              n = this.tabs.index(s),
              a = !0;
          if (!this._handlePageNav(i)) {
              switch (i.keyCode) {
                  case t.ui.keyCode.RIGHT:
                  case t.ui.keyCode.DOWN:
                      n++;
                      break;
                  case t.ui.keyCode.UP:
                  case t.ui.keyCode.LEFT:
                      a = !1, n--;
                      break;
                  case t.ui.keyCode.END:
                      n = this.anchors.length - 1;
                      break;
                  case t.ui.keyCode.HOME:
                      n = 0;
                      break;
                  case t.ui.keyCode.SPACE:
                      return i.preventDefault(), clearTimeout(this.activating), this._activate(n), e;
                  case t.ui.keyCode.ENTER:
                      return i.preventDefault(), clearTimeout(this.activating), this._activate(n === this.options.active ? !1 : n), e;
                  default:
                      return
              }
              i.preventDefault(), clearTimeout(this.activating), n = this._focusNextTab(n, a), i.ctrlKey || (s.attr("aria-selected", "false"), this.tabs.eq(n).attr("aria-selected", "true"), this.activating = this._delay(function() {
                  this.option("active", n)
              }, this.delay))
          }
      },
      _panelKeydown: function(e) {
          this._handlePageNav(e) || e.ctrlKey && e.keyCode === t.ui.keyCode.UP && (e.preventDefault(), this.active.focus())
      },
      _handlePageNav: function(i) {
          return i.altKey && i.keyCode === t.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : i.altKey && i.keyCode === t.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : e
      },
      _findNextTab: function(e, i) {
          function s() {
              return e > n && (e = 0), 0 > e && (e = n), e
          }
          for (var n = this.tabs.length - 1; - 1 !== t.inArray(s(), this.options.disabled);) e = i ? e + 1 : e - 1;
          return e
      },
      _focusNextTab: function(t, e) {
          return t = this._findNextTab(t, e), this.tabs.eq(t).focus(), t
      },
      _setOption: function(t, i) {
          return "active" === t ? (this._activate(i), e) : "disabled" === t ? (this._setupDisabled(i), e) : (this._super(t, i), "collapsible" === t && (this.element.toggleClass("ui-tabs-collapsible", i), i || this.options.active !== !1 || this._activate(0)), "event" === t && this._setupEvents(i), "heightStyle" === t && this._setupHeightStyle(i), e)
      },
      _tabId: function(t) {
          return t.attr("aria-controls") || "ui-tabs-" + i()
      },
      _sanitizeSelector: function(t) {
          return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
      },
      refresh: function() {
          var e = this.options,
              i = this.tablist.children(":has(a[href])");
          e.disabled = t.map(i.filter(".ui-state-disabled"), function(t) {
              return i.index(t)
          }), this._processTabs(), e.active !== !1 && this.anchors.length ? this.active.length && !t.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e.disabled.length ? (e.active = !1, this.active = t()) : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1)) : e.active = this.tabs.index(this.active) : (e.active = !1, this.active = t()), this._refresh()
      },
      _refresh: function() {
          this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
              "aria-selected": "false",
              tabIndex: -1
          }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
              "aria-expanded": "false",
              "aria-hidden": "true"
          }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
              "aria-selected": "true",
              tabIndex: 0
          }), this._getPanelForTab(this.active).show().attr({
              "aria-expanded": "true",
              "aria-hidden": "false"
          })) : this.tabs.eq(0).attr("tabIndex", 0)
      },
      _processTabs: function() {
          var e = this;
          this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist"), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
              role: "tab",
              tabIndex: -1
          }), this.anchors = this.tabs.map(function() {
              return t("a", this)[0]
          }).addClass("ui-tabs-anchor").attr({
              role: "presentation",
              tabIndex: -1
          }), this.panels = t(), this.anchors.each(function(i, n) {
              var a, o, r, h = t(n).uniqueId().attr("id"),
                  l = t(n).closest("li"),
                  c = l.attr("aria-controls");
              s(n) ? (a = n.hash, o = e.element.find(e._sanitizeSelector(a))) : (r = e._tabId(l), a = "#" + r, o = e.element.find(a), o.length || (o = e._createPanel(r), o.insertAfter(e.panels[i - 1] || e.tablist)), o.attr("aria-live", "polite")), o.length && (e.panels = e.panels.add(o)), c && l.data("ui-tabs-aria-controls", c), l.attr({
                  "aria-controls": a.substring(1),
                  "aria-labelledby": h
              }), o.attr("aria-labelledby", h)
          }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
      },
      _getList: function() {
          return this.tablist || this.element.find("ol,ul").eq(0)
      },
      _createPanel: function(e) {
          return t("<div>").attr("id", e).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
      },
      _setupDisabled: function(e) {
          t.isArray(e) && (e.length ? e.length === this.anchors.length && (e = !0) : e = !1);
          for (var i, s = 0; i = this.tabs[s]; s++) e === !0 || -1 !== t.inArray(s, e) ? t(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : t(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");
          this.options.disabled = e
      },
      _setupEvents: function(e) {
          var i = {
              click: function(t) {
                  t.preventDefault()
              }
          };
          e && t.each(e.split(" "), function(t, e) {
              i[e] = "_eventHandler"
          }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(this.anchors, i), this._on(this.tabs, {
              keydown: "_tabKeydown"
          }), this._on(this.panels, {
              keydown: "_panelKeydown"
          }), this._focusable(this.tabs), this._hoverable(this.tabs)
      },
      _setupHeightStyle: function(e) {
          var i, s = this.element.parent();
          "fill" === e ? (i = s.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
              var e = t(this),
                  s = e.css("position");
              "absolute" !== s && "fixed" !== s && (i -= e.outerHeight(!0))
          }), this.element.children().not(this.panels).each(function() {
              i -= t(this).outerHeight(!0)
          }), this.panels.each(function() {
              t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()))
          }).css("overflow", "auto")) : "auto" === e && (i = 0, this.panels.each(function() {
              i = Math.max(i, t(this).height("").height())
          }).height(i))
      },
      _eventHandler: function(e) {
          var i = this.options,
              s = this.active,
              n = t(e.currentTarget),
              a = n.closest("li"),
              o = a[0] === s[0],
              r = o && i.collapsible,
              h = r ? t() : this._getPanelForTab(a),
              l = s.length ? this._getPanelForTab(s) : t(),
              c = {
                  oldTab: s,
                  oldPanel: l,
                  newTab: r ? t() : a,
                  newPanel: h
              };
          e.preventDefault(), a.hasClass("ui-state-disabled") || a.hasClass("ui-tabs-loading") || this.running || o && !i.collapsible || this._trigger("beforeActivate", e, c) === !1 || (i.active = r ? !1 : this.tabs.index(a), this.active = o ? t() : a, this.xhr && this.xhr.abort(), l.length || h.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."), h.length && this.load(this.tabs.index(a), e), this._toggle(e, c))
      },
      _toggle: function(e, i) {
          function s() {
              a.running = !1, a._trigger("activate", e, i)
          }

          function n() {
              i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), o.length && a.options.show ? a._show(o, a.options.show, s) : (o.show(), s())
          }
          var a = this,
              o = i.newPanel,
              r = i.oldPanel;
          this.running = !0, r.length && this.options.hide ? this._hide(r, this.options.hide, function() {
              i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), n()
          }) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), r.hide(), n()), r.attr({
              "aria-expanded": "false",
              "aria-hidden": "true"
          }), i.oldTab.attr("aria-selected", "false"), o.length && r.length ? i.oldTab.attr("tabIndex", -1) : o.length && this.tabs.filter(function() {
              return 0 === t(this).attr("tabIndex")
          }).attr("tabIndex", -1), o.attr({
              "aria-expanded": "true",
              "aria-hidden": "false"
          }), i.newTab.attr({
              "aria-selected": "true",
              tabIndex: 0
          })
      },
      _activate: function(e) {
          var i, s = this._findActive(e);
          s[0] !== this.active[0] && (s.length || (s = this.active), i = s.find(".ui-tabs-anchor")[0], this._eventHandler({
              target: i,
              currentTarget: i,
              preventDefault: t.noop
          }))
      },
      _findActive: function(e) {
          return e === !1 ? t() : this.tabs.eq(e)
      },
      _getIndex: function(t) {
          return "string" == typeof t && (t = this.anchors.index(this.anchors.filter("[href$='" + t + "']"))), t
      },
      _destroy: function() {
          this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function() {
              t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
          }), this.tabs.each(function() {
              var e = t(this),
                  i = e.data("ui-tabs-aria-controls");
              i ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls")
          }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
      },
      enable: function(i) {
          var s = this.options.disabled;
          s !== !1 && (i === e ? s = !1 : (i = this._getIndex(i), s = t.isArray(s) ? t.map(s, function(t) {
              return t !== i ? t : null
          }) : t.map(this.tabs, function(t, e) {
              return e !== i ? e : null
          })), this._setupDisabled(s))
      },
      disable: function(i) {
          var s = this.options.disabled;
          if (s !== !0) {
              if (i === e) s = !0;
              else {
                  if (i = this._getIndex(i), -1 !== t.inArray(i, s)) return;
                  s = t.isArray(s) ? t.merge([i], s).sort() : [i]
              }
              this._setupDisabled(s)
          }
      },
      load: function(e, i) {
          e = this._getIndex(e);
          var n = this,
              a = this.tabs.eq(e),
              o = a.find(".ui-tabs-anchor"),
              r = this._getPanelForTab(a),
              h = {
                  tab: a,
                  panel: r
              };
          s(o[0]) || (this.xhr = t.ajax(this._ajaxSettings(o, i, h)), this.xhr && "canceled" !== this.xhr.statusText && (a.addClass("ui-tabs-loading"), r.attr("aria-busy", "true"), this.xhr.success(function(t) {
              setTimeout(function() {
                  r.html(t), n._trigger("load", i, h)
              }, 1)
          }).complete(function(t, e) {
              setTimeout(function() {
                  "abort" === e && n.panels.stop(!1, !0), a.removeClass("ui-tabs-loading"), r.removeAttr("aria-busy"), t === n.xhr && delete n.xhr
              }, 1)
          })))
      },
      _ajaxSettings: function(e, i, s) {
          var n = this;
          return {
              url: e.attr("href"),
              beforeSend: function(e, a) {
                  return n._trigger("beforeLoad", i, t.extend({
                      jqXHR: e,
                      ajaxSettings: a
                  }, s))
              }
          }
      },
      _getPanelForTab: function(e) {
          var i = t(e).attr("aria-controls");
          return this.element.find(this._sanitizeSelector("#" + i))
      }
  })
})(jQuery);
(function(t) {
  function e(e, i) {
      var s = (e.attr("aria-describedby") || "").split(/\s+/);
      s.push(i), e.data("ui-tooltip-id", i).attr("aria-describedby", t.trim(s.join(" ")))
  }

  function i(e) {
      var i = e.data("ui-tooltip-id"),
          s = (e.attr("aria-describedby") || "").split(/\s+/),
          n = t.inArray(i, s); - 1 !== n && s.splice(n, 1), e.removeData("ui-tooltip-id"), s = t.trim(s.join(" ")), s ? e.attr("aria-describedby", s) : e.removeAttr("aria-describedby")
  }
  var s = 0;
  t.widget("ui.tooltip", {
      version: "1.10.4",
      options: {
          content: function() {
              var e = t(this).attr("title") || "";
              return t("<a>").text(e).html()
          },
          hide: !0,
          items: "[title]:not([disabled])",
          position: {
              my: "left top+15",
              at: "left bottom",
              collision: "flipfit flip"
          },
          show: !0,
          tooltipClass: null,
          track: !1,
          close: null,
          open: null
      },
      _create: function() {
          this._on({
              mouseover: "open",
              focusin: "open"
          }), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable()
      },
      _setOption: function(e, i) {
          var s = this;
          return "disabled" === e ? (this[i ? "_disable" : "_enable"](), this.options[e] = i, void 0) : (this._super(e, i), "content" === e && t.each(this.tooltips, function(t, e) {
              s._updateContent(e)
          }), void 0)
      },
      _disable: function() {
          var e = this;
          t.each(this.tooltips, function(i, s) {
              var n = t.Event("blur");
              n.target = n.currentTarget = s[0], e.close(n, !0)
          }), this.element.find(this.options.items).addBack().each(function() {
              var e = t(this);
              e.is("[title]") && e.data("ui-tooltip-title", e.attr("title")).attr("title", "")
          })
      },
      _enable: function() {
          this.element.find(this.options.items).addBack().each(function() {
              var e = t(this);
              e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title"))
          })
      },
      open: function(e) {
          var i = this,
              s = t(e ? e.target : this.element).closest(this.options.items);
          s.length && !s.data("ui-tooltip-id") && (s.attr("title") && s.data("ui-tooltip-title", s.attr("title")), s.data("ui-tooltip-open", !0), e && "mouseover" === e.type && s.parents().each(function() {
              var e, s = t(this);
              s.data("ui-tooltip-open") && (e = t.Event("blur"), e.target = e.currentTarget = this, i.close(e, !0)), s.attr("title") && (s.uniqueId(), i.parents[this.id] = {
                  element: this,
                  title: s.attr("title")
              }, s.attr("title", ""))
          }), this._updateContent(s, e))
      },
      _updateContent: function(t, e) {
          var i, s = this.options.content,
              n = this,
              o = e ? e.type : null;
          return "string" == typeof s ? this._open(e, t, s) : (i = s.call(t[0], function(i) {
              t.data("ui-tooltip-open") && n._delay(function() {
                  e && (e.type = o), this._open(e, t, i)
              })
          }), i && this._open(e, t, i), void 0)
      },
      _open: function(i, s, n) {
          function o(t) {
              l.of = t, a.is(":hidden") || a.position(l)
          }
          var a, r, h, l = t.extend({}, this.options.position);
          if (n) {
              if (a = this._find(s), a.length) return a.find(".ui-tooltip-content").html(n), void 0;
              s.is("[title]") && (i && "mouseover" === i.type ? s.attr("title", "") : s.removeAttr("title")), a = this._tooltip(s), e(s, a.attr("id")), a.find(".ui-tooltip-content").html(n), this.options.track && i && /^mouse/.test(i.type) ? (this._on(this.document, {
                  mousemove: o
              }), o(i)) : a.position(t.extend({
                  of: s
              }, this.options.position)), a.hide(), this._show(a, this.options.show), this.options.show && this.options.show.delay && (h = this.delayedShow = setInterval(function() {
                  a.is(":visible") && (o(l.of), clearInterval(h))
              }, t.fx.interval)), this._trigger("open", i, {
                  tooltip: a
              }), r = {
                  keyup: function(e) {
                      if (e.keyCode === t.ui.keyCode.ESCAPE) {
                          var i = t.Event(e);
                          i.currentTarget = s[0], this.close(i, !0)
                      }
                  },
                  remove: function() {
                      this._removeTooltip(a)
                  }
              }, i && "mouseover" !== i.type || (r.mouseleave = "close"), i && "focusin" !== i.type || (r.focusout = "close"), this._on(!0, s, r)
          }
      },
      close: function(e) {
          var s = this,
              n = t(e ? e.currentTarget : this.element),
              o = this._find(n);
          this.closing || (clearInterval(this.delayedShow), n.data("ui-tooltip-title") && n.attr("title", n.data("ui-tooltip-title")), i(n), o.stop(!0), this._hide(o, this.options.hide, function() {
              s._removeTooltip(t(this))
          }), n.removeData("ui-tooltip-open"), this._off(n, "mouseleave focusout keyup"), n[0] !== this.element[0] && this._off(n, "remove"), this._off(this.document, "mousemove"), e && "mouseleave" === e.type && t.each(this.parents, function(e, i) {
              t(i.element).attr("title", i.title), delete s.parents[e]
          }), this.closing = !0, this._trigger("close", e, {
              tooltip: o
          }), this.closing = !1)
      },
      _tooltip: function(e) {
          var i = "ui-tooltip-" + s++,
              n = t("<div>").attr({
                  id: i,
                  role: "tooltip"
              }).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
          return t("<div>").addClass("ui-tooltip-content").appendTo(n), n.appendTo(this.document[0].body), this.tooltips[i] = e, n
      },
      _find: function(e) {
          var i = e.data("ui-tooltip-id");
          return i ? t("#" + i) : t()
      },
      _removeTooltip: function(t) {
          t.remove(), delete this.tooltips[t.attr("id")]
      },
      _destroy: function() {
          var e = this;
          t.each(this.tooltips, function(i, s) {
              var n = t.Event("blur");
              n.target = n.currentTarget = s[0], e.close(n, !0), t("#" + i).remove(), s.data("ui-tooltip-title") && (s.attr("title", s.data("ui-tooltip-title")), s.removeData("ui-tooltip-title"))
          })
      }
  })
})(jQuery);;
/*** Script File: /f/js/jslink.js, Original size: 325, Compressed size: 289 ***/
function js_link() {
  $('.js-link').replaceWith(function() {
      return '<a href="' + $(this).data('link') + '"' + (typeof $(this).data('blank') != 'undefined' ? ' target="_blank"' : '') + (typeof $(this).data('attr') != 'undefined' ? ' ' + $(this).data('attr') : '') + '>' + $(this).html() + '</a>'
  })
};
$(function() {
  js_link()
});
/*** Script File: /f/js/jquery.fancybox.min.js, Original size: 59,945, Compressed size: 59,945 ***/
// ==================================================
// fancyBox v3.2.10
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2017 fancyApps
//
// ==================================================
! function(t, e, n, o) {
  "use strict";

  function i(t) {
      var e = n(t.currentTarget),
          o = t.data ? t.data.options : {},
          i = e.attr("data-fancybox") || "",
          a = 0,
          s = [];
      t.isDefaultPrevented() || (t.preventDefault(), i ? (s = o.selector ? n(o.selector) : t.data ? t.data.items : [], s = s.length ? s.filter('[data-fancybox="' + i + '"]') : n('[data-fancybox="' + i + '"]'), a = s.index(e), a < 0 && (a = 0)) : s = [e], n.fancybox.open(s, o, a))
  }
  if (n) {
      if (n.fn.fancybox) return void("console" in t && console.log("fancyBox already initialized"));
      var a = {
              loop: !1,
              margin: [44, 0],
              gutter: 50,
              keyboard: !0,
              arrows: !0,
              infobar: !0,
              toolbar: !0,
              buttons: ["slideShow", "fullScreen", "thumbs", "share", "close"],
              idleTime: 3,
              smallBtn: "auto",
              protect: !1,
              modal: !1,
              image: {
                  preload: "auto"
              },
              ajax: {
                  settings: {
                      data: {
                          fancybox: !0
                      }
                  }
              },
              iframe: {
                  tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
                  preload: !0,
                  css: {},
                  attr: {
                      scrolling: "auto"
                  }
              },
              defaultType: "image",
              animationEffect: "zoom",
              animationDuration: 500,
              zoomOpacity: "auto",
              transitionEffect: "fade",
              transitionDuration: 366,
              slideClass: "",
              baseClass: "",
              baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div></div></div>',
              spinnerTpl: '<div class="fancybox-loading"></div>',
              errorTpl: '<div class="fancybox-error"><p>{{ERROR}}<p></div>',
              btnTpl: {
                  download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}"><svg viewBox="0 0 40 40"><path d="M20,23 L20,8 L20,23 L13,16 L20,23 L27,16 L20,23 M26,28 L13,28 L27,28 L14,28" /></svg></a>',
                  zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg viewBox="0 0 40 40"><path d="M 18,17 m-8,0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 M25,23 L31,29 L25,23" /></svg></button>',
                  close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg viewBox="0 0 40 40"><path d="M10,10 L30,30 M30,10 L10,30" /></svg></button>',
                  smallBtn: '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>',
                  arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><svg viewBox="0 0 40 40"><path d="M10,20 L30,20 L10,20 L18,28 L10,20 L18,12 L10,20"></path></svg></button>',
                  arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><svg viewBox="0 0 40 40"><path d="M30,20 L10,20 L30,20 L22,28 L30,20 L22,12 L30,20"></path></svg></button>'
              },
              parentEl: "body",
              autoFocus: !1,
              backFocus: !0,
              trapFocus: !0,
              fullScreen: {
                  autoStart: !1
              },
              touch: {
                  vertical: !0,
                  momentum: !0
              },
              hash: null,
              media: {},
              slideShow: {
                  autoStart: !1,
                  speed: 4e3
              },
              thumbs: {
                  autoStart: !1,
                  hideOnClose: !0,
                  parentEl: ".fancybox-container",
                  axis: "y"
              },
              wheel: "auto",
              onInit: n.noop,
              beforeLoad: n.noop,
              afterLoad: n.noop,
              beforeShow: n.noop,
              afterShow: n.noop,
              beforeClose: n.noop,
              afterClose: n.noop,
              onActivate: n.noop,
              onDeactivate: n.noop,
              clickContent: function(t, e) {
                  return "image" === t.type && "zoom"
              },
              clickSlide: "close",
              clickOutside: "close",
              dblclickContent: !1,
              dblclickSlide: !1,
              dblclickOutside: !1,
              mobile: {
                  idleTime: !1,
                  margin: 0,
                  clickContent: function(t, e) {
                      return "image" === t.type && "toggleControls"
                  },
                  clickSlide: function(t, e) {
                      return "image" === t.type ? "toggleControls" : "close"
                  },
                  dblclickContent: function(t, e) {
                      return "image" === t.type && "zoom"
                  },
                  dblclickSlide: function(t, e) {
                      return "image" === t.type && "zoom"
                  }
              },
              lang: "en",
              i18n: {
                  en: {
                      CLOSE: "Close",
                      NEXT: "Next",
                      PREV: "Previous",
                      ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                      PLAY_START: "Start slideshow",
                      PLAY_STOP: "Pause slideshow",
                      FULL_SCREEN: "Full screen",
                      THUMBS: "Thumbnails",
                      DOWNLOAD: "Download",
                      SHARE: "Share",
                      ZOOM: "Zoom"
                  },
                  de: {
                      CLOSE: "Schliessen",
                      NEXT: "Weiter",
                      PREV: "Zurück",
                      ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",
                      PLAY_START: "Diaschau starten",
                      PLAY_STOP: "Diaschau beenden",
                      FULL_SCREEN: "Vollbild",
                      THUMBS: "Vorschaubilder",
                      DOWNLOAD: "Herunterladen",
                      SHARE: "Teilen",
                      ZOOM: "Maßstab"
                  }
              }
          },
          s = n(t),
          r = n(e),
          c = 0,
          l = function(t) {
              return t && t.hasOwnProperty && t instanceof n
          },
          u = function() {
              return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function(e) {
                  return t.setTimeout(e, 1e3 / 60)
              }
          }(),
          d = function() {
              var t, n = e.createElement("fakeelement"),
                  i = {
                      transition: "transitionend",
                      OTransition: "oTransitionEnd",
                      MozTransition: "transitionend",
                      WebkitTransition: "webkitTransitionEnd"
                  };
              for (t in i)
                  if (n.style[t] !== o) return i[t];
              return "transitionend"
          }(),
          f = function(t) {
              return t && t.length && t[0].offsetHeight
          },
          p = function(t, o, i) {
              var a = this;
              a.opts = n.extend(!0, {
                  index: i
              }, n.fancybox.defaults, o || {}), n.fancybox.isMobile && (a.opts = n.extend(!0, {}, a.opts, a.opts.mobile)), o && n.isArray(o.buttons) && (a.opts.buttons = o.buttons), a.id = a.opts.id || ++c, a.group = [], a.currIndex = parseInt(a.opts.index, 10) || 0, a.prevIndex = null, a.prevPos = null, a.currPos = 0, a.firstRun = null, a.createGroup(t), a.group.length && (a.$lastFocus = n(e.activeElement).blur(), a.slides = {}, a.init())
          };
      n.extend(p.prototype, {
          init: function() {
              var i, a, s, c = this,
                  l = c.group[c.currIndex],
                  u = l.opts,
                  d = n.fancybox.scrollbarWidth;
              c.scrollTop = r.scrollTop(), c.scrollLeft = r.scrollLeft(), n.fancybox.getInstance() || (n("body").addClass("fancybox-active"), /iPad|iPhone|iPod/.test(navigator.userAgent) && !t.MSStream ? "image" !== l.type && n("body").css("top", n("body").scrollTop() * -1).addClass("fancybox-iosfix") : !n.fancybox.isMobile && e.body.scrollHeight > t.innerHeight && (d === o && (i = n('<div style="width:50px;height:50px;overflow:scroll;" />').appendTo("body"), d = n.fancybox.scrollbarWidth = i[0].offsetWidth - i[0].clientWidth, i.remove()), n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: ' + d + "px; }</style>"), n("body").addClass("compensate-for-scrollbar"))), s = "", n.each(u.buttons, function(t, e) {
                  s += u.btnTpl[e] || ""
              }), a = n(c.translate(c, u.baseTpl.replace("{{buttons}}", s).replace("{{arrows}}", u.btnTpl.arrowLeft + u.btnTpl.arrowRight))).attr("id", "fancybox-container-" + c.id).addClass("fancybox-is-hidden").addClass(u.baseClass).data("FancyBox", c).appendTo(u.parentEl), c.$refs = {
                  container: a
              }, ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function(t) {
                  c.$refs[t] = a.find(".fancybox-" + t)
              }), c.trigger("onInit"), c.activate(), c.jumpTo(c.currIndex)
          },
          translate: function(t, e) {
              var n = t.opts.i18n[t.opts.lang];
              return e.replace(/\{\{(\w+)\}\}/g, function(t, e) {
                  var i = n[e];
                  return i === o ? t : i
              })
          },
          createGroup: function(t) {
              var e = this,
                  i = n.makeArray(t);
              n.each(i, function(t, i) {
                  var a, s, r, c, l, u = {},
                      d = {};
                  n.isPlainObject(i) ? (u = i, d = i.opts || i) : "object" === n.type(i) && n(i).length ? (a = n(i), d = a.data(), d = n.extend({}, d, d.options || {}), d.$orig = a, u.src = d.src || a.attr("href"), u.type || u.src || (u.type = "inline", u.src = i)) : u = {
                      type: "html",
                      src: i + ""
                  }, u.opts = n.extend(!0, {}, e.opts, d), n.isArray(d.buttons) && (u.opts.buttons = d.buttons), s = u.type || u.opts.type, c = u.src || "", !s && c && (c.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? s = "image" : c.match(/\.(pdf)((\?|#).*)?$/i) ? s = "pdf" : (r = c.match(/\.(mp4|mov|ogv)((\?|#).*)?$/i)) ? (s = "video", u.opts.videoFormat || (u.opts.videoFormat = "video/" + ("ogv" === r[1] ? "ogg" : r[1]))) : "#" === c.charAt(0) && (s = "inline")), s ? u.type = s : e.trigger("objectNeedsType", u), u.index = e.group.length, u.opts.$orig && !u.opts.$orig.length && delete u.opts.$orig, !u.opts.$thumb && u.opts.$orig && (u.opts.$thumb = u.opts.$orig.find("img:first")), u.opts.$thumb && !u.opts.$thumb.length && delete u.opts.$thumb, "function" === n.type(u.opts.caption) && (u.opts.caption = u.opts.caption.apply(i, [e, u])), "function" === n.type(e.opts.caption) && (u.opts.caption = e.opts.caption.apply(i, [e, u])), u.opts.caption instanceof n || (u.opts.caption = u.opts.caption === o ? "" : u.opts.caption + ""), "ajax" === s && (l = c.split(/\s+/, 2), l.length > 1 && (u.src = l.shift(), u.opts.filter = l.shift())), "auto" == u.opts.smallBtn && (n.inArray(s, ["html", "inline", "ajax"]) > -1 ? (u.opts.toolbar = !1, u.opts.smallBtn = !0) : u.opts.smallBtn = !1), "pdf" === s && (u.type = "iframe", u.opts.iframe.preload = !1), u.opts.modal && (u.opts = n.extend(!0, u.opts, {
                      infobar: 0,
                      toolbar: 0,
                      smallBtn: 0,
                      keyboard: 0,
                      slideShow: 0,
                      fullScreen: 0,
                      thumbs: 0,
                      touch: 0,
                      clickContent: !1,
                      clickSlide: !1,
                      clickOutside: !1,
                      dblclickContent: !1,
                      dblclickSlide: !1,
                      dblclickOutside: !1
                  })), e.group.push(u)
              })
          },
          addEvents: function() {
              var o = this;
              o.removeEvents(), o.$refs.container.on("click.fb-close", "[data-fancybox-close]", function(t) {
                  t.stopPropagation(), t.preventDefault(), o.close(t)
              }).on("click.fb-prev touchend.fb-prev", "[data-fancybox-prev]", function(t) {
                  t.stopPropagation(), t.preventDefault(), o.previous()
              }).on("click.fb-next touchend.fb-next", "[data-fancybox-next]", function(t) {
                  t.stopPropagation(), t.preventDefault(), o.next()
              }).on("click.fb", "[data-fancybox-zoom]", function(t) {
                  o[o.isScaledDown() ? "scaleToActual" : "scaleToFit"]()
              }), s.on("orientationchange.fb resize.fb", function(t) {
                  t && t.originalEvent && "resize" === t.originalEvent.type ? u(function() {
                      o.update()
                  }) : (o.$refs.stage.hide(), setTimeout(function() {
                      o.$refs.stage.show(), o.update()
                  }, 600))
              }), r.on("focusin.fb", function(t) {
                  var i = n.fancybox ? n.fancybox.getInstance() : null;
                  i.isClosing || !i.current || !i.current.opts.trapFocus || n(t.target).hasClass("fancybox-container") || n(t.target).is(e) || i && "fixed" !== n(t.target).css("position") && !i.$refs.container.has(t.target).length && (t.stopPropagation(), i.focus(), s.scrollTop(o.scrollTop).scrollLeft(o.scrollLeft))
              }), r.on("keydown.fb", function(t) {
                  var e = o.current,
                      i = t.keyCode || t.which;
                  if (e && e.opts.keyboard && !n(t.target).is("input") && !n(t.target).is("textarea")) return 8 === i || 27 === i ? (t.preventDefault(), void o.close(t)) : 37 === i || 38 === i ? (t.preventDefault(), void o.previous()) : 39 === i || 40 === i ? (t.preventDefault(), void o.next()) : void o.trigger("afterKeydown", t, i)
              }), o.group[o.currIndex].opts.idleTime && (o.idleSecondsCounter = 0, r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function(t) {
                  o.idleSecondsCounter = 0, o.isIdle && o.showControls(), o.isIdle = !1
              }), o.idleInterval = t.setInterval(function() {
                  o.idleSecondsCounter++, o.idleSecondsCounter >= o.group[o.currIndex].opts.idleTime && !o.isDragging && (o.isIdle = !0, o.idleSecondsCounter = 0, o.hideControls())
              }, 1e3))
          },
          removeEvents: function() {
              var e = this;
              s.off("orientationchange.fb resize.fb"), r.off("focusin.fb keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), e.idleInterval && (t.clearInterval(e.idleInterval), e.idleInterval = null)
          },
          previous: function(t) {
              return this.jumpTo(this.currPos - 1, t)
          },
          next: function(t) {
              return this.jumpTo(this.currPos + 1, t)
          },
          jumpTo: function(t, e, i) {
              var a, s, r, c, l, u, d, p = this,
                  h = p.group.length;
              if (!(p.isDragging || p.isClosing || p.isAnimating && p.firstRun)) {
                  if (t = parseInt(t, 10), s = p.current ? p.current.opts.loop : p.opts.loop, !s && (t < 0 || t >= h)) return !1;
                  if (a = p.firstRun = null === p.firstRun, !(h < 2 && !a && p.isDragging)) {
                      if (c = p.current, p.prevIndex = p.currIndex, p.prevPos = p.currPos, r = p.createSlide(t), h > 1 && ((s || r.index > 0) && p.createSlide(t - 1), (s || r.index < h - 1) && p.createSlide(t + 1)), p.current = r, p.currIndex = r.index, p.currPos = r.pos, p.trigger("beforeShow", a), p.updateControls(), u = n.fancybox.getTranslate(r.$slide), r.isMoved = (0 !== u.left || 0 !== u.top) && !r.$slide.hasClass("fancybox-animated"), r.forcedDuration = o, n.isNumeric(e) ? r.forcedDuration = e : e = r.opts[a ? "animationDuration" : "transitionDuration"], e = parseInt(e, 10), a) return r.opts.animationEffect && e && p.$refs.container.css("transition-duration", e + "ms"), p.$refs.container.removeClass("fancybox-is-hidden"), f(p.$refs.container), p.$refs.container.addClass("fancybox-is-open"), r.$slide.addClass("fancybox-slide--current"), p.loadSlide(r), void p.preload("image");
                      n.each(p.slides, function(t, e) {
                          n.fancybox.stop(e.$slide)
                      }), r.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current"), r.isMoved ? (l = Math.round(r.$slide.width()), n.each(p.slides, function(t, o) {
                          var i = o.pos - r.pos;
                          n.fancybox.animate(o.$slide, {
                              top: 0,
                              left: i * l + i * o.opts.gutter
                          }, e, function() {
                              o.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous"), o.pos === p.currPos && (r.isMoved = !1, p.complete())
                          })
                      })) : p.$refs.stage.children().removeAttr("style"), r.isLoaded ? p.revealContent(r) : p.loadSlide(r), p.preload("image"), c.pos !== r.pos && (d = "fancybox-slide--" + (c.pos > r.pos ? "next" : "previous"), c.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous"), c.isComplete = !1, e && (r.isMoved || r.opts.transitionEffect) && (r.isMoved ? c.$slide.addClass(d) : (d = "fancybox-animated " + d + " fancybox-fx-" + r.opts.transitionEffect, n.fancybox.animate(c.$slide, d, e, function() {
                          c.$slide.removeClass(d).removeAttr("style")
                      }))))
                  }
              }
          },
          createSlide: function(t) {
              var e, o, i = this;
              return o = t % i.group.length, o = o < 0 ? i.group.length + o : o, !i.slides[t] && i.group[o] && (e = n('<div class="fancybox-slide"></div>').appendTo(i.$refs.stage), i.slides[t] = n.extend(!0, {}, i.group[o], {
                  pos: t,
                  $slide: e,
                  isLoaded: !1
              }), i.updateSlide(i.slides[t])), i.slides[t]
          },
          scaleToActual: function(t, e, i) {
              var a, s, r, c, l, u = this,
                  d = u.current,
                  f = d.$content,
                  p = parseInt(d.$slide.width(), 10),
                  h = parseInt(d.$slide.height(), 10),
                  g = d.width,
                  b = d.height;
              "image" != d.type || d.hasError || !f || u.isAnimating || (n.fancybox.stop(f), u.isAnimating = !0, t = t === o ? .5 * p : t, e = e === o ? .5 * h : e, a = n.fancybox.getTranslate(f), c = g / a.width, l = b / a.height, s = .5 * p - .5 * g, r = .5 * h - .5 * b, g > p && (s = a.left * c - (t * c - t), s > 0 && (s = 0), s < p - g && (s = p - g)), b > h && (r = a.top * l - (e * l - e), r > 0 && (r = 0), r < h - b && (r = h - b)), u.updateCursor(g, b), n.fancybox.animate(f, {
                  top: r,
                  left: s,
                  scaleX: c,
                  scaleY: l
              }, i || 330, function() {
                  u.isAnimating = !1
              }), u.SlideShow && u.SlideShow.isActive && u.SlideShow.stop())
          },
          scaleToFit: function(t) {
              var e, o = this,
                  i = o.current,
                  a = i.$content;
              "image" != i.type || i.hasError || !a || o.isAnimating || (n.fancybox.stop(a), o.isAnimating = !0, e = o.getFitPos(i), o.updateCursor(e.width, e.height), n.fancybox.animate(a, {
                  top: e.top,
                  left: e.left,
                  scaleX: e.width / a.width(),
                  scaleY: e.height / a.height()
              }, t || 330, function() {
                  o.isAnimating = !1
              }))
          },
          getFitPos: function(t) {
              var e, o, i, a, s, r = this,
                  c = t.$content,
                  l = t.width,
                  u = t.height,
                  d = t.opts.margin;
              return !(!c || !c.length || !l && !u) && ("number" === n.type(d) && (d = [d, d]), 2 == d.length && (d = [d[0], d[1], d[0], d[1]]), e = parseInt(r.$refs.stage.width(), 10) - (d[1] + d[3]), o = parseInt(r.$refs.stage.height(), 10) - (d[0] + d[2]), i = Math.min(1, e / l, o / u), a = Math.floor(i * l), s = Math.floor(i * u), {
                  top: Math.floor(.5 * (o - s)) + d[0],
                  left: Math.floor(.5 * (e - a)) + d[3],
                  width: a,
                  height: s
              })
          },
          update: function() {
              var t = this;
              n.each(t.slides, function(e, n) {
                  t.updateSlide(n)
              })
          },
          updateSlide: function(t, e) {
              var o = this,
                  i = t && t.$content;
              i && (t.width || t.height) && (o.isAnimating = !1, n.fancybox.stop(i), n.fancybox.setTranslate(i, o.getFitPos(t)), t.pos === o.currPos && o.updateCursor()), t.$slide.trigger("refresh"), o.trigger("onUpdate", t)
          },
          centerSlide: function(t, e) {
              var i, a, s = this;
              s.current && (i = Math.round(t.$slide.width()), a = t.pos - s.current.pos, n.fancybox.animate(t.$slide, {
                  top: 0,
                  left: a * i + a * t.opts.gutter,
                  opacity: 1
              }, e === o ? 0 : e, null, !1))
          },
          updateCursor: function(t, e) {
              var n, i = this,
                  a = i.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut");
              i.current && !i.isClosing && (i.isZoomable() ? (a.addClass("fancybox-is-zoomable"), n = t !== o && e !== o ? t < i.current.width && e < i.current.height : i.isScaledDown(), n ? a.addClass("fancybox-can-zoomIn") : i.current.opts.touch ? a.addClass("fancybox-can-drag") : a.addClass("fancybox-can-zoomOut")) : i.current.opts.touch && a.addClass("fancybox-can-drag"))
          },
          isZoomable: function() {
              var t, e = this,
                  o = e.current;
              if (o && !e.isClosing) return !!("image" === o.type && o.isLoaded && !o.hasError && ("zoom" === o.opts.clickContent || n.isFunction(o.opts.clickContent) && "zoom" === o.opts.clickContent(o)) && (t = e.getFitPos(o), o.width > t.width || o.height > t.height))
          },
          isScaledDown: function() {
              var t = this,
                  e = t.current,
                  o = e.$content,
                  i = !1;
              return o && (i = n.fancybox.getTranslate(o), i = i.width < e.width || i.height < e.height), i
          },
          canPan: function() {
              var t = this,
                  e = t.current,
                  n = e.$content,
                  o = !1;
              return n && (o = t.getFitPos(e), o = Math.abs(n.width() - o.width) > 1 || Math.abs(n.height() - o.height) > 1), o
          },
          loadSlide: function(t) {
              var e, o, i, a = this;
              if (!t.isLoading && !t.isLoaded) {
                  switch (t.isLoading = !0, a.trigger("beforeLoad", t), e = t.type, o = t.$slide, o.off("refresh").trigger("onReset").addClass("fancybox-slide--" + (e || "unknown")).addClass(t.opts.slideClass), e) {
                      case "image":
                          a.setImage(t);
                          break;
                      case "iframe":
                          a.setIframe(t);
                          break;
                      case "html":
                          a.setContent(t, t.src || t.content);
                          break;
                      case "inline":
                          n(t.src).length ? a.setContent(t, n(t.src)) : a.setError(t);
                          break;
                      case "ajax":
                          a.showLoading(t), i = n.ajax(n.extend({}, t.opts.ajax.settings, {
                              url: t.src,
                              success: function(e, n) {
                                  "success" === n && a.setContent(t, e)
                              },
                              error: function(e, n) {
                                  e && "abort" !== n && a.setError(t)
                              }
                          })), o.one("onReset", function() {
                              i.abort()
                          });
                          break;
                      case "video":
                          a.setContent(t, '<video controls><source src="' + t.src + '" type="' + t.opts.videoFormat + "\">Your browser doesn't support HTML5 video</video>");
                          break;
                      default:
                          a.setError(t)
                  }
                  return !0
              }
          },
          setImage: function(e) {
              var o, i, a, s, r = this,
                  c = e.opts.srcset || e.opts.image.srcset;
              if (c) {
                  a = t.devicePixelRatio || 1, s = t.innerWidth * a, i = c.split(",").map(function(t) {
                      var e = {};
                      return t.trim().split(/\s+/).forEach(function(t, n) {
                          var o = parseInt(t.substring(0, t.length - 1), 10);
                          return 0 === n ? e.url = t : void(o && (e.value = o, e.postfix = t[t.length - 1]))
                      }), e
                  }), i.sort(function(t, e) {
                      return t.value - e.value
                  });
                  for (var l = 0; l < i.length; l++) {
                      var u = i[l];
                      if ("w" === u.postfix && u.value >= s || "x" === u.postfix && u.value >= a) {
                          o = u;
                          break
                      }
                  }!o && i.length && (o = i[i.length - 1]), o && (e.src = o.url, e.width && e.height && "w" == o.postfix && (e.height = e.width / e.height * o.value, e.width = o.value))
              }
              e.$content = n('<div class="fancybox-image-wrap"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide), e.opts.preload !== !1 && e.opts.width && e.opts.height && (e.opts.thumb || e.opts.$thumb) ? (e.width = e.opts.width, e.height = e.opts.height, e.$ghost = n("<img />").one("error", function() {
                  n(this).remove(), e.$ghost = null, r.setBigImage(e)
              }).one("load", function() {
                  r.afterLoad(e), r.setBigImage(e)
              }).addClass("fancybox-image").appendTo(e.$content).attr("src", e.opts.thumb || e.opts.$thumb.attr("src"))) : r.setBigImage(e)
          },
          setBigImage: function(t) {
              var e = this,
                  o = n("<img />");
              t.$image = o.one("error", function() {
                  e.setError(t)
              }).one("load", function() {
                  clearTimeout(t.timouts), t.timouts = null, e.isClosing || (t.width = t.opts.width || this.naturalWidth, t.height = t.opts.height || this.naturalHeight, t.opts.image.srcset && o.attr("sizes", "100vw").attr("srcset", t.opts.image.srcset), e.hideLoading(t), t.$ghost ? t.timouts = setTimeout(function() {
                      t.timouts = null, t.$ghost.hide()
                  }, Math.min(300, Math.max(1e3, t.height / 1600))) : e.afterLoad(t))
              }).addClass("fancybox-image").attr("src", t.src).appendTo(t.$content), (o[0].complete || "complete" == o[0].readyState) && o[0].naturalWidth && o[0].naturalHeight ? o.trigger("load") : o[0].error ? o.trigger("error") : t.timouts = setTimeout(function() {
                  o[0].complete || t.hasError || e.showLoading(t)
              }, 100)
          },
          setIframe: function(t) {
              var e, i = this,
                  a = t.opts.iframe,
                  s = t.$slide;
              t.$content = n('<div class="fancybox-content' + (a.preload ? " fancybox-is-hidden" : "") + '"></div>').css(a.css).appendTo(s), e = n(a.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(a.attr).appendTo(t.$content), a.preload ? (i.showLoading(t), e.on("load.fb error.fb", function(e) {
                  this.isReady = 1, t.$slide.trigger("refresh"), i.afterLoad(t)
              }), s.on("refresh.fb", function() {
                  var n, i, s, r = t.$content,
                      c = a.css.width,
                      l = a.css.height;
                  if (1 === e[0].isReady) {
                      try {
                          i = e.contents(), s = i.find("body")
                      } catch (t) {}
                      s && s.length && (c === o && (n = e[0].contentWindow.document.documentElement.scrollWidth, c = Math.ceil(s.outerWidth(!0) + (r.width() - n)), c += r.outerWidth() - r.innerWidth()), l === o && (l = Math.ceil(s.outerHeight(!0)), l += r.outerHeight() - r.innerHeight()), c && r.width(c), l && r.height(l)), r.removeClass("fancybox-is-hidden")
                  }
              })) : this.afterLoad(t), e.attr("src", t.src), t.opts.smallBtn === !0 && t.$content.prepend(i.translate(t, t.opts.btnTpl.smallBtn)), s.one("onReset", function() {
                  try {
                      n(this).find("iframe").hide().attr("src", "//about:blank")
                  } catch (t) {}
                  n(this).empty(), t.isLoaded = !1
              })
          },
          setContent: function(t, e) {
              var o = this;
              o.isClosing || (o.hideLoading(t), t.$slide.empty(), l(e) && e.parent().length ? (e.parent(".fancybox-slide--inline").trigger("onReset"), t.$placeholder = n("<div></div>").hide().insertAfter(e), e.css("display", "inline-block")) : t.hasError || ("string" === n.type(e) && (e = n("<div>").append(n.trim(e)).contents(), 3 === e[0].nodeType && (e = n("<div>").html(e))), t.opts.filter && (e = n("<div>").html(e).find(t.opts.filter))), t.$slide.one("onReset", function() {
                  n(this).find("video,audio").trigger("pause"), t.$placeholder && (t.$placeholder.after(e.hide()).remove(), t.$placeholder = null), t.$smallBtn && (t.$smallBtn.remove(), t.$smallBtn = null), t.hasError || (n(this).empty(), t.isLoaded = !1)
              }), t.$content = n(e).appendTo(t.$slide), this.afterLoad(t))
          },
          setError: function(t) {
              t.hasError = !0, t.$slide.removeClass("fancybox-slide--" + t.type), this.setContent(t, this.translate(t, t.opts.errorTpl))
          },
          showLoading: function(t) {
              var e = this;
              t = t || e.current, t && !t.$spinner && (t.$spinner = n(e.opts.spinnerTpl).appendTo(t.$slide))
          },
          hideLoading: function(t) {
              var e = this;
              t = t || e.current, t && t.$spinner && (t.$spinner.remove(), delete t.$spinner)
          },
          afterLoad: function(t) {
              var e = this;
              e.isClosing || (t.isLoading = !1, t.isLoaded = !0, e.trigger("afterLoad", t), e.hideLoading(t), t.opts.smallBtn && !t.$smallBtn && (t.$smallBtn = n(e.translate(t, t.opts.btnTpl.smallBtn)).appendTo(t.$content.filter("div,form").first())), t.opts.protect && t.$content && !t.hasError && (t.$content.on("contextmenu.fb", function(t) {
                  return 2 == t.button && t.preventDefault(), !0
              }), "image" === t.type && n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)), e.revealContent(t))
          },
          revealContent: function(t) {
              var e, i, a, s, r, c = this,
                  l = t.$slide,
                  u = !1;
              return e = t.opts[c.firstRun ? "animationEffect" : "transitionEffect"], a = t.opts[c.firstRun ? "animationDuration" : "transitionDuration"], a = parseInt(t.forcedDuration === o ? a : t.forcedDuration, 10), !t.isMoved && t.pos === c.currPos && a || (e = !1), "zoom" !== e || t.pos === c.currPos && a && "image" === t.type && !t.hasError && (u = c.getThumbPos(t)) || (e = "fade"), "zoom" === e ? (r = c.getFitPos(t), r.scaleX = r.width / u.width, r.scaleY = r.height / u.height, delete r.width, delete r.height, s = t.opts.zoomOpacity, "auto" == s && (s = Math.abs(t.width / t.height - u.width / u.height) > .1), s && (u.opacity = .1, r.opacity = 1), n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"), u), f(t.$content), void n.fancybox.animate(t.$content, r, a, function() {
                  c.complete()
              })) : (c.updateSlide(t), e ? (n.fancybox.stop(l), i = "fancybox-animated fancybox-slide--" + (t.pos >= c.prevPos ? "next" : "previous") + " fancybox-fx-" + e, l.removeAttr("style").removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous").addClass(i), t.$content.removeClass("fancybox-is-hidden"), f(l), void n.fancybox.animate(l, "fancybox-slide--current", a, function(e) {
                  l.removeClass(i).removeAttr("style"), t.pos === c.currPos && c.complete()
              }, !0)) : (f(l), t.$content.removeClass("fancybox-is-hidden"), void(t.pos === c.currPos && c.complete())))
          },
          getThumbPos: function(o) {
              var i, a = this,
                  s = !1,
                  r = function(e) {
                      for (var o, i = e[0], a = i.getBoundingClientRect(), s = []; null !== i.parentElement;) "hidden" !== n(i.parentElement).css("overflow") && "auto" !== n(i.parentElement).css("overflow") || s.push(i.parentElement.getBoundingClientRect()), i = i.parentElement;
                      return o = s.every(function(t) {
                          var e = Math.min(a.right, t.right) - Math.max(a.left, t.left),
                              n = Math.min(a.bottom, t.bottom) - Math.max(a.top, t.top);
                          return e > 0 && n > 0
                      }), o && a.bottom > 0 && a.right > 0 && a.left < n(t).width() && a.top < n(t).height()
                  },
                  c = o.opts.$thumb,
                  l = c ? c.offset() : 0;
              return l && c[0].ownerDocument === e && r(c) && (i = a.$refs.stage.offset(), s = {
                  top: l.top - i.top + parseFloat(c.css("border-top-width") || 0),
                  left: l.left - i.left + parseFloat(c.css("border-left-width") || 0),
                  width: c.width(),
                  height: c.height(),
                  scaleX: 1,
                  scaleY: 1
              }), s
          },
          complete: function() {
              var t = this,
                  o = t.current,
                  i = {};
              o.isMoved || !o.isLoaded || o.isComplete || (o.isComplete = !0, o.$slide.siblings().trigger("onReset"), t.preload("inline"), f(o.$slide), o.$slide.addClass("fancybox-slide--complete"), n.each(t.slides, function(e, o) {
                  o.pos >= t.currPos - 1 && o.pos <= t.currPos + 1 ? i[o.pos] = o : o && (n.fancybox.stop(o.$slide), o.$slide.off().remove())
              }), t.slides = i, t.updateCursor(), t.trigger("afterShow"), o.$slide.find("video,audio").first().trigger("play"), (n(e.activeElement).is("[disabled]") || o.opts.autoFocus && "image" != o.type && "iframe" !== o.type) && t.focus())
          },
          preload: function(t) {
              var e = this,
                  n = e.slides[e.currPos + 1],
                  o = e.slides[e.currPos - 1];
              n && n.type === t && e.loadSlide(n), o && o.type === t && e.loadSlide(o)
          },
          focus: function() {
              var t, e = this.current;
              this.isClosing || (e && e.isComplete && (t = e.$slide.find("input[autofocus]:enabled:visible:first"), t.length || (t = e.$slide.find("button,:input,[tabindex],a").filter(":enabled:visible:first"))), t = t && t.length ? t : this.$refs.container, t.focus())
          },
          activate: function() {
              var t = this;
              n(".fancybox-container").each(function() {
                  var e = n(this).data("FancyBox");
                  e && e.id !== t.id && !e.isClosing && (e.trigger("onDeactivate"), e.removeEvents(), e.isVisible = !1)
              }), t.isVisible = !0, (t.current || t.isIdle) && (t.update(), t.updateControls()), t.trigger("onActivate"), t.addEvents()
          },
          close: function(t, e) {
              var o, i, a, s, r, c, l = this,
                  p = l.current,
                  h = function() {
                      l.cleanUp(t)
                  };
              return !l.isClosing && (l.isClosing = !0, l.trigger("beforeClose", t) === !1 ? (l.isClosing = !1, u(function() {
                  l.update()
              }), !1) : (l.removeEvents(), p.timouts && clearTimeout(p.timouts), a = p.$content, o = p.opts.animationEffect, i = n.isNumeric(e) ? e : o ? p.opts.animationDuration : 0, p.$slide.off(d).removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), p.$slide.siblings().trigger("onReset").remove(), i && l.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing"), l.hideLoading(p), l.hideControls(), l.updateCursor(), "zoom" !== o || t !== !0 && a && i && "image" === p.type && !p.hasError && (c = l.getThumbPos(p)) || (o = "fade"), "zoom" === o ? (n.fancybox.stop(a), r = n.fancybox.getTranslate(a), r.width = r.width * r.scaleX, r.height = r.height * r.scaleY, s = p.opts.zoomOpacity, "auto" == s && (s = Math.abs(p.width / p.height - c.width / c.height) > .1), s && (c.opacity = 0), r.scaleX = r.width / c.width, r.scaleY = r.height / c.height, r.width = c.width, r.height = c.height, n.fancybox.setTranslate(p.$content, r), f(p.$content), n.fancybox.animate(p.$content, c, i, h), !0) : (o && i ? t === !0 ? setTimeout(h, i) : n.fancybox.animate(p.$slide.removeClass("fancybox-slide--current"), "fancybox-animated fancybox-slide--previous fancybox-fx-" + o, i, h) : h(), !0)))
          },
          cleanUp: function(t) {
              var o, i, a = this,
                  r = n("body");
              a.current.$slide.trigger("onReset"), a.$refs.container.empty().remove(), a.trigger("afterClose", t), a.$lastFocus && a.current.opts.backFocus && a.$lastFocus.focus(), a.current = null, o = n.fancybox.getInstance(), o ? o.activate() : (s.scrollTop(a.scrollTop).scrollLeft(a.scrollLeft), r.removeClass("fancybox-active compensate-for-scrollbar"), r.hasClass("fancybox-iosfix") && (i = parseInt(e.body.style.top, 10), r.removeClass("fancybox-iosfix").css("top", "").scrollTop(i * -1)), n("#fancybox-style-noscroll").remove())
          },
          trigger: function(t, e) {
              var o, i = Array.prototype.slice.call(arguments, 1),
                  a = this,
                  s = e && e.opts ? e : a.current;
              return s ? i.unshift(s) : s = a, i.unshift(a), n.isFunction(s.opts[t]) && (o = s.opts[t].apply(s, i)), o === !1 ? o : void("afterClose" !== t && a.$refs ? a.$refs.container.trigger(t + ".fb", i) : r.trigger(t + ".fb", i))
          },
          updateControls: function(t) {
              var e = this,
                  n = e.current,
                  o = n.index,
                  i = n.opts.caption,
                  a = e.$refs.container,
                  s = e.$refs.caption;
              n.$slide.trigger("refresh"), e.$caption = i && i.length ? s.html(i) : null, e.isHiddenControls || e.isIdle || e.showControls(), a.find("[data-fancybox-count]").html(e.group.length), a.find("[data-fancybox-index]").html(o + 1), a.find("[data-fancybox-prev]").prop("disabled", !n.opts.loop && o <= 0), a.find("[data-fancybox-next]").prop("disabled", !n.opts.loop && o >= e.group.length - 1), "image" === n.type ? a.find("[data-fancybox-download]").attr("href", n.opts.image.src || n.src).show() : a.find("[data-fancybox-download],[data-fancybox-zoom]").hide()
          },
          hideControls: function() {
              this.isHiddenControls = !0, this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav")
          },
          showControls: function() {
              var t = this,
                  e = t.current ? t.current.opts : t.opts,
                  n = t.$refs.container;
              t.isHiddenControls = !1, t.idleSecondsCounter = 0, n.toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons)).toggleClass("fancybox-show-infobar", !!(e.infobar && t.group.length > 1)).toggleClass("fancybox-show-nav", !!(e.arrows && t.group.length > 1)).toggleClass("fancybox-is-modal", !!e.modal), t.$caption ? n.addClass("fancybox-show-caption ") : n.removeClass("fancybox-show-caption")
          },
          toggleControls: function() {
              this.isHiddenControls ? this.showControls() : this.hideControls()
          }
      }), n.fancybox = {
          version: "3.2.10",
          defaults: a,
          getInstance: function(t) {
              var e = n('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
                  o = Array.prototype.slice.call(arguments, 1);
              return e instanceof p && ("string" === n.type(t) ? e[t].apply(e, o) : "function" === n.type(t) && t.apply(e, o), e)
          },
          open: function(t, e, n) {
              return new p(t, e, n)
          },
          close: function(t) {
              var e = this.getInstance();
              e && (e.close(), t === !0 && this.close())
          },
          destroy: function() {
              this.close(!0), r.off("click.fb-start")
          },
          isMobile: e.createTouch !== o && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
          use3d: function() {
              var n = e.createElement("div");
              return t.getComputedStyle && t.getComputedStyle(n).getPropertyValue("transform") && !(e.documentMode && e.documentMode < 11)
          }(),
          getTranslate: function(t) {
              var e;
              if (!t || !t.length) return !1;
              if (e = t.eq(0).css("transform"), e && e.indexOf("matrix") !== -1 ? (e = e.split("(")[1], e = e.split(")")[0], e = e.split(",")) : e = [], e.length) e = e.length > 10 ? [e[13], e[12], e[0], e[5]] : [e[5], e[4], e[0], e[3]], e = e.map(parseFloat);
              else {
                  e = [0, 0, 1, 1];
                  var n = /\.*translate\((.*)px,(.*)px\)/i,
                      o = n.exec(t.eq(0).attr("style"));
                  o && (e[0] = parseFloat(o[2]), e[1] = parseFloat(o[1]))
              }
              return {
                  top: e[0],
                  left: e[1],
                  scaleX: e[2],
                  scaleY: e[3],
                  opacity: parseFloat(t.css("opacity")),
                  width: t.width(),
                  height: t.height()
              }
          },
          setTranslate: function(t, e) {
              var n = "",
                  i = {};
              if (t && e) return e.left === o && e.top === o || (n = (e.left === o ? t.position().left : e.left) + "px, " + (e.top === o ? t.position().top : e.top) + "px", n = this.use3d ? "translate3d(" + n + ", 0px)" : "translate(" + n + ")"), e.scaleX !== o && e.scaleY !== o && (n = (n.length ? n + " " : "") + "scale(" + e.scaleX + ", " + e.scaleY + ")"), n.length && (i.transform = n), e.opacity !== o && (i.opacity = e.opacity), e.width !== o && (i.width = e.width), e.height !== o && (i.height = e.height), t.css(i)
          },
          animate: function(t, e, i, a, s) {
              n.isFunction(i) && (a = i, i = null), n.isPlainObject(e) || t.removeAttr("style"), t.on(d, function(i) {
                  (!i || !i.originalEvent || t.is(i.originalEvent.target) && "z-index" != i.originalEvent.propertyName) && (n.fancybox.stop(t), n.isPlainObject(e) ? (e.scaleX !== o && e.scaleY !== o && (t.css("transition-duration", ""), e.width = Math.round(t.width() * e.scaleX), e.height = Math.round(t.height() * e.scaleY), e.scaleX = 1, e.scaleY = 1, n.fancybox.setTranslate(t, e)), s === !1 && t.removeAttr("style")) : s !== !0 && t.removeClass(e), n.isFunction(a) && a(i))
              }), n.isNumeric(i) && t.css("transition-duration", i + "ms"), n.isPlainObject(e) ? n.fancybox.setTranslate(t, e) : t.addClass(e), e.scaleX && t.hasClass("fancybox-image-wrap") && t.parent().addClass("fancybox-is-scaling"), t.data("timer", setTimeout(function() {
                  t.trigger("transitionend")
              }, i + 16))
          },
          stop: function(t) {
              clearTimeout(t.data("timer")), t.off("transitionend").css("transition-duration", ""), t.hasClass("fancybox-image-wrap") && t.parent().removeClass("fancybox-is-scaling")
          }
      }, n.fn.fancybox = function(t) {
          var e;
          return t = t || {}, e = t.selector || !1, e ? n("body").off("click.fb-start", e).on("click.fb-start", e, {
              options: t
          }, i) : this.off("click.fb-start").on("click.fb-start", {
              items: this,
              options: t
          }, i), this
      }, r.on("click.fb-start", "[data-fancybox]", i)
  }
}(window, document, window.jQuery || jQuery),
function(t) {
  "use strict";
  var e = function(e, n, o) {
          if (e) return o = o || "", "object" === t.type(o) && (o = t.param(o, !0)), t.each(n, function(t, n) {
              e = e.replace("$" + t, n || "")
          }), o.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + o), e
      },
      n = {
          youtube: {
              matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
              params: {
                  autoplay: 1,
                  autohide: 1,
                  fs: 1,
                  rel: 0,
                  hd: 1,
                  wmode: "transparent",
                  enablejsapi: 1,
                  html5: 1
              },
              paramPlace: 8,
              type: "iframe",
              url: "//www.youtube.com/embed/$4",
              thumb: "//img.youtube.com/vi/$4/hqdefault.jpg"
          },
          vimeo: {
              matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
              params: {
                  autoplay: 1,
                  hd: 1,
                  show_title: 1,
                  show_byline: 1,
                  show_portrait: 0,
                  fullscreen: 1,
                  api: 1
              },
              paramPlace: 3,
              type: "iframe",
              url: "//player.vimeo.com/video/$2"
          },
          metacafe: {
              matcher: /metacafe.com\/watch\/(\d+)\/(.*)?/,
              type: "iframe",
              url: "//www.metacafe.com/embed/$1/?ap=1"
          },
          dailymotion: {
              matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
              params: {
                  additionalInfos: 0,
                  autoStart: 1
              },
              type: "iframe",
              url: "//www.dailymotion.com/embed/video/$1"
          },
          vine: {
              matcher: /vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/,
              type: "iframe",
              url: "//vine.co/v/$1/embed/simple"
          },
          instagram: {
              matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
              type: "image",
              url: "//$1/p/$2/media/?size=l"
          },
          gmap_place: {
              matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
              type: "iframe",
              url: function(t) {
                  return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12]) + "&output=" + (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
              }
          },
          gmap_search: {
              matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
              type: "iframe",
              url: function(t) {
                  return "//maps.google." + t[2] + "/maps?q=" + t[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
              }
          }
      };
  t(document).on("objectNeedsType.fb", function(o, i, a) {
      var s, r, c, l, u, d, f, p = a.src || "",
          h = !1;
      s = t.extend(!0, {}, n, a.opts.media), t.each(s, function(n, o) {
          if (c = p.match(o.matcher)) {
              if (h = o.type, d = {}, o.paramPlace && c[o.paramPlace]) {
                  u = c[o.paramPlace], "?" == u[0] && (u = u.substring(1)), u = u.split("&");
                  for (var i = 0; i < u.length; ++i) {
                      var s = u[i].split("=", 2);
                      2 == s.length && (d[s[0]] = decodeURIComponent(s[1].replace(/\+/g, " ")))
                  }
              }
              return l = t.extend(!0, {}, o.params, a.opts[n], d), p = "function" === t.type(o.url) ? o.url.call(this, c, l, a) : e(o.url, c, l), r = "function" === t.type(o.thumb) ? o.thumb.call(this, c, l, a) : e(o.thumb, c), "vimeo" === n && (p = p.replace("&%23", "#")), !1
          }
      }), h ? (a.src = p, a.type = h, a.opts.thumb || a.opts.$thumb && a.opts.$thumb.length || (a.opts.thumb = r), "iframe" === h && (t.extend(!0, a.opts, {
          iframe: {
              preload: !1,
              attr: {
                  scrolling: "no"
              }
          }
      }), a.contentProvider = f, a.opts.slideClass += " fancybox-slide--" + ("gmap_place" == f || "gmap_search" == f ? "map" : "video"))) : p && (a.type = a.opts.defaultType)
  })
}(window.jQuery || jQuery),
function(t, e, n) {
  "use strict";
  var o = function() {
          return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function(e) {
              return t.setTimeout(e, 1e3 / 60)
          }
      }(),
      i = function() {
          return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function(e) {
              t.clearTimeout(e)
          }
      }(),
      a = function(e) {
          var n = [];
          e = e.originalEvent || e || t.e, e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];
          for (var o in e) e[o].pageX ? n.push({
              x: e[o].pageX,
              y: e[o].pageY
          }) : e[o].clientX && n.push({
              x: e[o].clientX,
              y: e[o].clientY
          });
          return n
      },
      s = function(t, e, n) {
          return e && t ? "x" === n ? t.x - e.x : "y" === n ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : 0
      },
      r = function(t) {
          if (t.is('a,area,button,[role="button"],input,label,select,summary,textarea') || n.isFunction(t.get(0).onclick) || t.data("selectable")) return !0;
          for (var e = 0, o = t[0].attributes, i = o.length; e < i; e++)
              if ("data-fancybox-" === o[e].nodeName.substr(0, 14)) return !0;
          return !1
      },
      c = function(e) {
          var n = t.getComputedStyle(e)["overflow-y"],
              o = t.getComputedStyle(e)["overflow-x"],
              i = ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight,
              a = ("scroll" === o || "auto" === o) && e.scrollWidth > e.clientWidth;
          return i || a
      },
      l = function(t) {
          for (var e = !1;;) {
              if (e = c(t.get(0))) break;
              if (t = t.parent(), !t.length || t.hasClass("fancybox-stage") || t.is("body")) break
          }
          return e
      },
      u = function(t) {
          var e = this;
          e.instance = t, e.$bg = t.$refs.bg, e.$stage = t.$refs.stage, e.$container = t.$refs.container, e.destroy(), e.$container.on("touchstart.fb.touch mousedown.fb.touch", n.proxy(e, "ontouchstart"))
      };
  u.prototype.destroy = function() {
      this.$container.off(".fb.touch")
  }, u.prototype.ontouchstart = function(o) {
      var i = this,
          c = n(o.target),
          u = i.instance,
          d = u.current,
          f = d.$content,
          p = "touchstart" == o.type;
      if (p && i.$container.off("mousedown.fb.touch"), (!o.originalEvent || 2 != o.originalEvent.button) && c.length && !r(c) && !r(c.parent()) && (c.is("img") || !(o.originalEvent.clientX > c[0].clientWidth + c.offset().left))) {
          if (!d || i.instance.isAnimating || i.instance.isClosing) return o.stopPropagation(), void o.preventDefault();
          if (i.realPoints = i.startPoints = a(o), i.startPoints) {
              if (o.stopPropagation(), i.startEvent = o, i.canTap = !0, i.$target = c, i.$content = f, i.opts = d.opts.touch, i.isPanning = !1, i.isSwiping = !1, i.isZooming = !1, i.isScrolling = !1, i.sliderStartPos = i.sliderLastPos || {
                      top: 0,
                      left: 0
                  }, i.contentStartPos = n.fancybox.getTranslate(i.$content), i.contentLastPos = null, i.startTime = (new Date).getTime(), i.distanceX = i.distanceY = i.distance = 0, i.canvasWidth = Math.round(d.$slide[0].clientWidth), i.canvasHeight = Math.round(d.$slide[0].clientHeight), n(e).off(".fb.touch").on(p ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", n.proxy(i, "ontouchend")).on(p ? "touchmove.fb.touch" : "mousemove.fb.touch", n.proxy(i, "ontouchmove")), n.fancybox.isMobile && e.addEventListener("scroll", i.onscroll, !0), !i.opts && !u.canPan() || !c.is(i.$stage) && !i.$stage.find(c).length) return void(c.is("img") && o.preventDefault());
              n.fancybox.isMobile && (l(c) || l(c.parent())) || o.preventDefault(), 1 === i.startPoints.length && ("image" === d.type && (i.contentStartPos.width > i.canvasWidth + 1 || i.contentStartPos.height > i.canvasHeight + 1) ? (n.fancybox.stop(i.$content), i.$content.css("transition-duration", ""), i.isPanning = !0) : i.isSwiping = !0, i.$container.addClass("fancybox-controls--isGrabbing")), 2 !== i.startPoints.length || u.isAnimating || d.hasError || "image" !== d.type || !d.isLoaded && !d.$ghost || (i.canTap = !1, i.isSwiping = !1, i.isPanning = !1, i.isZooming = !0, n.fancybox.stop(i.$content), i.$content.css("transition-duration", ""), i.centerPointStartX = .5 * (i.startPoints[0].x + i.startPoints[1].x) - n(t).scrollLeft(), i.centerPointStartY = .5 * (i.startPoints[0].y + i.startPoints[1].y) - n(t).scrollTop(), i.percentageOfImageAtPinchPointX = (i.centerPointStartX - i.contentStartPos.left) / i.contentStartPos.width, i.percentageOfImageAtPinchPointY = (i.centerPointStartY - i.contentStartPos.top) / i.contentStartPos.height, i.startDistanceBetweenFingers = s(i.startPoints[0], i.startPoints[1]))
          }
      }
  }, u.prototype.onscroll = function(t) {
      self.isScrolling = !0
  }, u.prototype.ontouchmove = function(t) {
      var e = this,
          o = n(t.target);
      return e.isScrolling || !o.is(e.$stage) && !e.$stage.find(o).length ? void(e.canTap = !1) : (e.newPoints = a(t), void((e.opts || e.instance.canPan()) && e.newPoints && e.newPoints.length && (e.isSwiping && e.isSwiping === !0 || t.preventDefault(), e.distanceX = s(e.newPoints[0], e.startPoints[0], "x"), e.distanceY = s(e.newPoints[0], e.startPoints[0], "y"), e.distance = s(e.newPoints[0], e.startPoints[0]), e.distance > 0 && (e.isSwiping ? e.onSwipe(t) : e.isPanning ? e.onPan() : e.isZooming && e.onZoom()))))
  }, u.prototype.onSwipe = function(e) {
      var a, s = this,
          r = s.isSwiping,
          c = s.sliderStartPos.left || 0;
      if (r !== !0) "x" == r && (s.distanceX > 0 && (s.instance.group.length < 2 || 0 === s.instance.current.index && !s.instance.current.opts.loop) ? c += Math.pow(s.distanceX, .8) : s.distanceX < 0 && (s.instance.group.length < 2 || s.instance.current.index === s.instance.group.length - 1 && !s.instance.current.opts.loop) ? c -= Math.pow(-s.distanceX, .8) : c += s.distanceX), s.sliderLastPos = {
          top: "x" == r ? 0 : s.sliderStartPos.top + s.distanceY,
          left: c
      }, s.requestId && (i(s.requestId), s.requestId = null), s.requestId = o(function() {
          s.sliderLastPos && (n.each(s.instance.slides, function(t, e) {
              var o = e.pos - s.instance.currPos;
              n.fancybox.setTranslate(e.$slide, {
                  top: s.sliderLastPos.top,
                  left: s.sliderLastPos.left + o * s.canvasWidth + o * e.opts.gutter
              })
          }), s.$container.addClass("fancybox-is-sliding"))
      });
      else if (Math.abs(s.distance) > 10) {
          if (s.canTap = !1, s.instance.group.length < 2 && s.opts.vertical ? s.isSwiping = "y" : s.instance.isDragging || s.opts.vertical === !1 || "auto" === s.opts.vertical && n(t).width() > 800 ? s.isSwiping = "x" : (a = Math.abs(180 * Math.atan2(s.distanceY, s.distanceX) / Math.PI), s.isSwiping = a > 45 && a < 135 ? "y" : "x"), s.canTap = !1, "y" === s.isSwiping && n.fancybox.isMobile && (l(s.$target) || l(s.$target.parent()))) return void(s.isScrolling = !0);
          s.instance.isDragging = s.isSwiping, s.startPoints = s.newPoints, n.each(s.instance.slides, function(t, e) {
              n.fancybox.stop(e.$slide), e.$slide.css("transition-duration", ""), e.inTransition = !1, e.pos === s.instance.current.pos && (s.sliderStartPos.left = n.fancybox.getTranslate(e.$slide).left)
          }), s.instance.SlideShow && s.instance.SlideShow.isActive && s.instance.SlideShow.stop()
      }
  }, u.prototype.onPan = function() {
      var t = this;
      return s(t.newPoints[0], t.realPoints[0]) < (n.fancybox.isMobile ? 10 : 5) ? void(t.startPoints = t.newPoints) : (t.canTap = !1, t.contentLastPos = t.limitMovement(), t.requestId && (i(t.requestId), t.requestId = null), void(t.requestId = o(function() {
          n.fancybox.setTranslate(t.$content, t.contentLastPos)
      })))
  }, u.prototype.limitMovement = function() {
      var t, e, n, o, i, a, s = this,
          r = s.canvasWidth,
          c = s.canvasHeight,
          l = s.distanceX,
          u = s.distanceY,
          d = s.contentStartPos,
          f = d.left,
          p = d.top,
          h = d.width,
          g = d.height;
      return i = h > r ? f + l : f, a = p + u, t = Math.max(0, .5 * r - .5 * h), e = Math.max(0, .5 * c - .5 * g), n = Math.min(r - h, .5 * r - .5 * h), o = Math.min(c - g, .5 * c - .5 * g), h > r && (l > 0 && i > t && (i = t - 1 + Math.pow(-t + f + l, .8) || 0), l < 0 && i < n && (i = n + 1 - Math.pow(n - f - l, .8) || 0)), g > c && (u > 0 && a > e && (a = e - 1 + Math.pow(-e + p + u, .8) || 0), u < 0 && a < o && (a = o + 1 - Math.pow(o - p - u, .8) || 0)), {
          top: a,
          left: i,
          scaleX: d.scaleX,
          scaleY: d.scaleY
      }
  }, u.prototype.limitPosition = function(t, e, n, o) {
      var i = this,
          a = i.canvasWidth,
          s = i.canvasHeight;
      return n > a ? (t = t > 0 ? 0 : t, t = t < a - n ? a - n : t) : t = Math.max(0, a / 2 - n / 2), o > s ? (e = e > 0 ? 0 : e, e = e < s - o ? s - o : e) : e = Math.max(0, s / 2 - o / 2), {
          top: e,
          left: t
      }
  }, u.prototype.onZoom = function() {
      var e = this,
          a = e.contentStartPos.width,
          r = e.contentStartPos.height,
          c = e.contentStartPos.left,
          l = e.contentStartPos.top,
          u = s(e.newPoints[0], e.newPoints[1]),
          d = u / e.startDistanceBetweenFingers,
          f = Math.floor(a * d),
          p = Math.floor(r * d),
          h = (a - f) * e.percentageOfImageAtPinchPointX,
          g = (r - p) * e.percentageOfImageAtPinchPointY,
          b = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft(),
          m = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop(),
          y = b - e.centerPointStartX,
          v = m - e.centerPointStartY,
          x = c + (h + y),
          w = l + (g + v),
          $ = {
              top: w,
              left: x,
              scaleX: e.contentStartPos.scaleX * d,
              scaleY: e.contentStartPos.scaleY * d
          };
      e.canTap = !1, e.newWidth = f, e.newHeight = p, e.contentLastPos = $, e.requestId && (i(e.requestId), e.requestId = null), e.requestId = o(function() {
          n.fancybox.setTranslate(e.$content, e.contentLastPos)
      })
  }, u.prototype.ontouchend = function(t) {
      var o = this,
          s = Math.max((new Date).getTime() - o.startTime, 1),
          r = o.isSwiping,
          c = o.isPanning,
          l = o.isZooming,
          u = o.isScrolling;
      return o.endPoints = a(t), o.$container.removeClass("fancybox-controls--isGrabbing"), n(e).off(".fb.touch"), e.removeEventListener("scroll", o.onscroll, !0), o.requestId && (i(o.requestId), o.requestId = null), o.isSwiping = !1, o.isPanning = !1, o.isZooming = !1, o.isScrolling = !1, o.instance.isDragging = !1, o.canTap ? o.onTap(t) : (o.speed = 366, o.velocityX = o.distanceX / s * .5, o.velocityY = o.distanceY / s * .5, o.speedX = Math.max(.5 * o.speed, Math.min(1.5 * o.speed, 1 / Math.abs(o.velocityX) * o.speed)), void(c ? o.endPanning() : l ? o.endZooming() : o.endSwiping(r, u)))
  }, u.prototype.endSwiping = function(t, e) {
      var o = this,
          i = !1,
          a = o.instance.group.length;
      o.sliderLastPos = null, "y" == t && !e && Math.abs(o.distanceY) > 50 ? (n.fancybox.animate(o.instance.current.$slide, {
          top: o.sliderStartPos.top + o.distanceY + 150 * o.velocityY,
          opacity: 0
      }, 150), i = o.instance.close(!0, 300)) : "x" == t && o.distanceX > 50 && a > 1 ? i = o.instance.previous(o.speedX) : "x" == t && o.distanceX < -50 && a > 1 && (i = o.instance.next(o.speedX)), i !== !1 || "x" != t && "y" != t || (e || a < 2 ? o.instance.centerSlide(o.instance.current, 150) : o.instance.jumpTo(o.instance.current.index)), o.$container.removeClass("fancybox-is-sliding")
  }, u.prototype.endPanning = function() {
      var t, e, o, i = this;
      i.contentLastPos && (i.opts.momentum === !1 ? (t = i.contentLastPos.left, e = i.contentLastPos.top) : (t = i.contentLastPos.left + i.velocityX * i.speed, e = i.contentLastPos.top + i.velocityY * i.speed), o = i.limitPosition(t, e, i.contentStartPos.width, i.contentStartPos.height), o.width = i.contentStartPos.width, o.height = i.contentStartPos.height, n.fancybox.animate(i.$content, o, 330))
  }, u.prototype.endZooming = function() {
      var t, e, o, i, a = this,
          s = a.instance.current,
          r = a.newWidth,
          c = a.newHeight;
      a.contentLastPos && (t = a.contentLastPos.left, e = a.contentLastPos.top, i = {
          top: e,
          left: t,
          width: r,
          height: c,
          scaleX: 1,
          scaleY: 1
      }, n.fancybox.setTranslate(a.$content, i), r < a.canvasWidth && c < a.canvasHeight ? a.instance.scaleToFit(150) : r > s.width || c > s.height ? a.instance.scaleToActual(a.centerPointStartX, a.centerPointStartY, 150) : (o = a.limitPosition(t, e, r, c), n.fancybox.setTranslate(a.content, n.fancybox.getTranslate(a.$content)), n.fancybox.animate(a.$content, o, 150)))
  }, u.prototype.onTap = function(t) {
      var e, o = this,
          i = n(t.target),
          s = o.instance,
          r = s.current,
          c = t && a(t) || o.startPoints,
          l = c[0] ? c[0].x - o.$stage.offset().left : 0,
          u = c[0] ? c[0].y - o.$stage.offset().top : 0,
          d = function(e) {
              var i = r.opts[e];
              if (n.isFunction(i) && (i = i.apply(s, [r, t])), i) switch (i) {
                  case "close":
                      s.close(o.startEvent);
                      break;
                  case "toggleControls":
                      s.toggleControls(!0);
                      break;
                  case "next":
                      s.next();
                      break;
                  case "nextOrClose":
                      s.group.length > 1 ? s.next() : s.close(o.startEvent);
                      break;
                  case "zoom":
                      "image" == r.type && (r.isLoaded || r.$ghost) && (s.canPan() ? s.scaleToFit() : s.isScaledDown() ? s.scaleToActual(l, u) : s.group.length < 2 && s.close(o.startEvent))
              }
          };
      if ((!t.originalEvent || 2 != t.originalEvent.button) && (i.is("img") || !(l > i[0].clientWidth + i.offset().left))) {
          if (i.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) e = "Outside";
          else if (i.is(".fancybox-slide")) e = "Slide";
          else {
              if (!s.current.$content || !s.current.$content.find(i).addBack().filter(i).length) return;
              e = "Content"
          }
          if (o.tapped) {
              if (clearTimeout(o.tapped), o.tapped = null, Math.abs(l - o.tapX) > 50 || Math.abs(u - o.tapY) > 50) return this;
              d("dblclick" + e)
          } else o.tapX = l, o.tapY = u, r.opts["dblclick" + e] && r.opts["dblclick" + e] !== r.opts["click" + e] ? o.tapped = setTimeout(function() {
              o.tapped = null, d("click" + e)
          }, 500) : d("click" + e);
          return this
      }
  }, n(e).on("onActivate.fb", function(t, e) {
      e && !e.Guestures && (e.Guestures = new u(e))
  })
}(window, document, window.jQuery || jQuery),
function(t, e) {
  "use strict";
  e.extend(!0, e.fancybox.defaults, {
      btnTpl: {
          slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg viewBox="0 0 40 40"><path d="M13,12 L27,20 L13,27 Z" /><path d="M15,10 v19 M23,10 v19" /></svg></button>'
      },
      slideShow: {
          autoStart: !1,
          speed: 3e3
      }
  });
  var n = function(t) {
      this.instance = t, this.init()
  };
  e.extend(n.prototype, {
      timer: null,
      isActive: !1,
      $button: null,
      init: function() {
          var t = this;
          t.$button = t.instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function() {
              t.toggle()
          }), (t.instance.group.length < 2 || !t.instance.group[t.instance.currIndex].opts.slideShow) && t.$button.hide()
      },
      set: function(t) {
          var e = this;
          e.instance && e.instance.current && (t === !0 || e.instance.current.opts.loop || e.instance.currIndex < e.instance.group.length - 1) ? e.timer = setTimeout(function() {
              e.isActive && e.instance.jumpTo((e.instance.currIndex + 1) % e.instance.group.length)
          }, e.instance.current.opts.slideShow.speed) : (e.stop(), e.instance.idleSecondsCounter = 0, e.instance.showControls())
      },
      clear: function() {
          var t = this;
          clearTimeout(t.timer), t.timer = null
      },
      start: function() {
          var t = this,
              e = t.instance.current;
          e && (t.isActive = !0, t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"), t.set(!0))
      },
      stop: function() {
          var t = this,
              e = t.instance.current;
          t.clear(), t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"), t.isActive = !1
      },
      toggle: function() {
          var t = this;
          t.isActive ? t.stop() : t.start()
      }
  }), e(t).on({
      "onInit.fb": function(t, e) {
          e && !e.SlideShow && (e.SlideShow = new n(e))
      },
      "beforeShow.fb": function(t, e, n, o) {
          var i = e && e.SlideShow;
          o ? i && n.opts.slideShow.autoStart && i.start() : i && i.isActive && i.clear()
      },
      "afterShow.fb": function(t, e, n) {
          var o = e && e.SlideShow;
          o && o.isActive && o.set()
      },
      "afterKeydown.fb": function(n, o, i, a, s) {
          var r = o && o.SlideShow;
          !r || !i.opts.slideShow || 80 !== s && 32 !== s || e(t.activeElement).is("button,a,input") || (a.preventDefault(), r.toggle())
      },
      "beforeClose.fb onDeactivate.fb": function(t, e) {
          var n = e && e.SlideShow;
          n && n.stop()
      }
  }), e(t).on("visibilitychange", function() {
      var n = e.fancybox.getInstance(),
          o = n && n.SlideShow;
      o && o.isActive && (t.hidden ? o.clear() : o.set())
  })
}(document, window.jQuery || jQuery),
function(t, e) {
  "use strict";
  var n = function() {
      var e, n, o, i = [
              ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
              ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
              ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
              ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
              ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
          ],
          a = {};
      for (n = 0; n < i.length; n++)
          if (e = i[n], e && e[1] in t) {
              for (o = 0; o < e.length; o++) a[i[0][o]] = e[o];
              return a
          }
      return !1
  }();
  if (!n) return void(e && e.fancybox && (e.fancybox.defaults.btnTpl.fullScreen = !1));
  var o = {
      request: function(e) {
          e = e || t.documentElement, e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)
      },
      exit: function() {
          t[n.exitFullscreen]()
      },
      toggle: function(e) {
          e = e || t.documentElement, this.isFullscreen() ? this.exit() : this.request(e)
      },
      isFullscreen: function() {
          return Boolean(t[n.fullscreenElement])
      },
      enabled: function() {
          return Boolean(t[n.fullscreenEnabled])
      }
  };
  e.extend(!0, e.fancybox.defaults, {
      btnTpl: {
          fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"><svg viewBox="0 0 40 40"><path d="M9,12 h22 v16 h-22 v-16 v16 h22 v-16 Z" /></svg></button>'
      },
      fullScreen: {
          autoStart: !1
      }
  }), e(t).on({
      "onInit.fb": function(t, e) {
          var n;
          e && e.group[e.currIndex].opts.fullScreen ? (n = e.$refs.container, n.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function(t) {
              t.stopPropagation(), t.preventDefault(), o.toggle(n[0])
          }), e.opts.fullScreen && e.opts.fullScreen.autoStart === !0 && o.request(n[0]), e.FullScreen = o) : e && e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()
      },
      "afterKeydown.fb": function(t, e, n, o, i) {
          e && e.FullScreen && 70 === i && (o.preventDefault(), e.FullScreen.toggle(e.$refs.container[0]))
      },
      "beforeClose.fb": function(t) {
          t && t.FullScreen && o.exit()
      }
  }), e(t).on(n.fullscreenchange, function() {
      var t = o.isFullscreen(),
          n = e.fancybox.getInstance();
      n && (n.current && "image" === n.current.type && n.isAnimating && (n.current.$content.css("transition", "none"), n.isAnimating = !1, n.update(!0, !0, 0)), n.trigger("onFullscreenChange", t), n.$refs.container.toggleClass("fancybox-is-fullscreen", t))
  })
}(document, window.jQuery || jQuery),
function(t, e) {
  "use strict";
  e.fancybox.defaults = e.extend(!0, {
      btnTpl: {
          thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg viewBox="0 0 120 120"><path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" /></svg></button>'
      },
      thumbs: {
          autoStart: !1,
          hideOnClose: !0,
          parentEl: ".fancybox-container",
          axis: "y"
      }
  }, e.fancybox.defaults);
  var n = function(t) {
      this.init(t)
  };
  e.extend(n.prototype, {
      $button: null,
      $grid: null,
      $list: null,
      isVisible: !1,
      isActive: !1,
      init: function(t) {
          var e = this;
          e.instance = t, t.Thumbs = e;
          var n = t.group[0],
              o = t.group[1];
          e.opts = t.group[t.currIndex].opts.thumbs, e.$button = t.$refs.toolbar.find("[data-fancybox-thumbs]"), e.opts && n && o && ("image" == n.type || n.opts.thumb || n.opts.$thumb) && ("image" == o.type || o.opts.thumb || o.opts.$thumb) ? (e.$button.show().on("click", function() {
              e.toggle()
          }), e.isActive = !0) : e.$button.hide()
      },
      create: function() {
          var t, n, o = this,
              i = o.instance,
              a = o.opts.parentEl;
          o.$grid = e('<div class="fancybox-thumbs fancybox-thumbs-' + o.opts.axis + '"></div>').appendTo(i.$refs.container.find(a).addBack().filter(a)), t = "<ul>", e.each(i.group, function(e, o) {
              n = o.opts.thumb || (o.opts.$thumb ? o.opts.$thumb.attr("src") : null), n || "image" !== o.type || (n = o.src), n && n.length && (t += '<li data-index="' + e + '"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="' + n + '" /></li>')
          }), t += "</ul>", o.$list = e(t).appendTo(o.$grid).on("click", "li", function() {
              i.jumpTo(e(this).data("index"))
          }), o.$list.find("img").hide().one("load", function() {
              var t, n, o, i, a = e(this).parent().removeClass("fancybox-thumbs-loading"),
                  s = a.outerWidth(),
                  r = a.outerHeight();
              t = this.naturalWidth || this.width, n = this.naturalHeight || this.height, o = t / s, i = n / r, o >= 1 && i >= 1 && (o > i ? (t /= i, n = r) : (t = s, n /= o)), e(this).css({
                  width: Math.floor(t),
                  height: Math.floor(n),
                  "margin-top": n > r ? Math.floor(.3 * r - .3 * n) : Math.floor(.5 * r - .5 * n),
                  "margin-left": Math.floor(.5 * s - .5 * t)
              }).show()
          }).each(function() {
              this.src = e(this).data("src")
          }), "x" === o.opts.axis && o.$list.width(parseInt(o.$grid.css("padding-right")) + i.group.length * o.$list.children().eq(0).outerWidth(!0) + "px")
      },
      focus: function(t) {
          var e, n, o = this,
              i = o.$list;
          o.instance.current && (e = i.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + o.instance.current.index + '"]').addClass("fancybox-thumbs-active"), n = e.position(), "y" === o.opts.axis && (n.top < 0 || n.top > i.height() - e.outerHeight()) ? i.stop().animate({
              scrollTop: i.scrollTop() + n.top
          }, t) : "x" === o.opts.axis && (n.left < i.parent().scrollLeft() || n.left > i.parent().scrollLeft() + (i.parent().width() - e.outerWidth())) && i.parent().stop().animate({
              scrollLeft: n.left
          }, t))
      },
      update: function() {
          this.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), this.isVisible ? (this.$grid || this.create(), this.instance.trigger("onThumbsShow"), this.focus(0)) : this.$grid && this.instance.trigger("onThumbsHide"), this.instance.update()
      },
      hide: function() {
          this.isVisible = !1, this.update()
      },
      show: function() {
          this.isVisible = !0, this.update()
      },
      toggle: function() {
          this.isVisible = !this.isVisible, this.update()
      }
  }), e(t).on({
      "onInit.fb": function(t, e) {
          var o;
          e && !e.Thumbs && (o = new n(e), o.isActive && o.opts.autoStart === !0 && o.show())
      },
      "beforeShow.fb": function(t, e, n, o) {
          var i = e && e.Thumbs;
          i && i.isVisible && i.focus(o ? 0 : 250)
      },
      "afterKeydown.fb": function(t, e, n, o, i) {
          var a = e && e.Thumbs;
          a && a.isActive && 71 === i && (o.preventDefault(), a.toggle())
      },
      "beforeClose.fb": function(t, e) {
          var n = e && e.Thumbs;
          n && n.isVisible && n.opts.hideOnClose !== !1 && n.$grid.hide()
      }
  })
}(document, window.jQuery),
function(t, e) {
  "use strict";

  function n(t) {
      var e = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
          "/": "&#x2F;",
          "`": "&#x60;",
          "=": "&#x3D;"
      };
      return String(t).replace(/[&<>"'`=\/]/g, function(t) {
          return e[t]
      })
  }
  e.extend(!0, e.fancybox.defaults, {
      btnTpl: {
          share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg viewBox="0 0 40 40"><path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z"></svg></button>'
      },
      share: {
          tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p class="fancybox-share__links"><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" /></p></div>'
      }
  }), e(t).on("click", "[data-fancybox-share]", function() {
      var t, o, i = e.fancybox.getInstance();
      i && (t = i.current.opts.hash === !1 ? i.current.src : window.location, o = i.current.opts.share.tpl.replace(/\{\{media\}\}/g, "image" === i.current.type ? encodeURIComponent(i.current.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(t)).replace(/\{\{url_raw\}\}/g, n(t)).replace(/\{\{descr\}\}/g, i.$caption ? encodeURIComponent(i.$caption.text()) : ""), e.fancybox.open({
          src: i.translate(i, o),
          type: "html",
          opts: {
              animationEffect: "fade",
              animationDuration: 250,
              afterLoad: function(t, e) {
                  e.$content.find(".fancybox-share__links a").click(function() {
                      return window.open(this.href, "Share", "width=550, height=450"), !1
                  })
              }
          }
      }))
  })
}(document, window.jQuery || jQuery),
function(t, e, n) {
  "use strict";

  function o() {
      var t = e.location.hash.substr(1),
          n = t.split("-"),
          o = n.length > 1 && /^\+?\d+$/.test(n[n.length - 1]) ? parseInt(n.pop(-1), 10) || 1 : 1,
          i = n.join("-");
      return o < 1 && (o = 1), {
          hash: t,
          index: o,
          gallery: i
      }
  }

  function i(t) {
      var e;
      "" !== t.gallery && (e = n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']").eq(t.index - 1), e.length || (e = n("#" + n.escapeSelector(t.gallery))), e.length && (s = !1, e.trigger("click")))
  }

  function a(t) {
      var e;
      return !!t && (e = t.current ? t.current.opts : t.opts, e.hash || (e.$orig ? e.$orig.data("fancybox") : ""))
  }
  n.escapeSelector || (n.escapeSelector = function(t) {
      var e = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
          n = function(t, e) {
              return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
          };
      return (t + "").replace(e, n)
  });
  var s = !0,
      r = null,
      c = null;
  n(function() {
      n.fancybox.defaults.hash !== !1 && (n(t).on({
          "onInit.fb": function(t, e) {
              var n, i;
              e.group[e.currIndex].opts.hash !== !1 && (n = o(), i = a(e), i && n.gallery && i == n.gallery && (e.currIndex = n.index - 1))
          },
          "beforeShow.fb": function(n, o, i) {
              var l;
              i && i.opts.hash !== !1 && (l = a(o), l && "" !== l && (e.location.hash.indexOf(l) < 0 && (o.opts.origHash = e.location.hash), r = l + (o.group.length > 1 ? "-" + (i.index + 1) : ""), "replaceState" in e.history ? (c && clearTimeout(c), c = setTimeout(function() {
                  e.history[s ? "pushState" : "replaceState"]({}, t.title, e.location.pathname + e.location.search + "#" + r), c = null, s = !1
              }, 300)) : e.location.hash = r))
          },
          "beforeClose.fb": function(o, i, s) {
              var l, u;
              c && clearTimeout(c), s.opts.hash !== !1 && (l = a(i), u = i && i.opts.origHash ? i.opts.origHash : "", l && "" !== l && ("replaceState" in history ? e.history.replaceState({}, t.title, e.location.pathname + e.location.search + u) : (e.location.hash = u, n(e).scrollTop(i.scrollTop).scrollLeft(i.scrollLeft))), r = null)
          }
      }), n(e).on("hashchange.fb", function() {
          var t = o();
          n.fancybox.getInstance() ? !r || r === t.gallery + "-" + t.index || 1 === t.index && r == t.gallery || (r = null, n.fancybox.close()) : "" !== t.gallery && i(t)
      }), setTimeout(function() {
          i(o())
      }, 50))
  })
}(document, window, window.jQuery || jQuery),
function(t, e) {
  "use strict";
  var n = (new Date).getTime();
  e(t).on({
      "onInit.fb": function(t, e, o) {
          e.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function(t) {
              var o = e.current,
                  i = (new Date).getTime();
              e.group.length < 1 || o.opts.wheel === !1 || "auto" === o.opts.wheel && "image" !== o.type || (t.preventDefault(), t.stopPropagation(), o.$slide.hasClass("fancybox-animated") || (t = t.originalEvent || t, i - n < 250 || (n = i, e[(-t.deltaY || -t.deltaX || t.wheelDelta || -t.detail) < 0 ? "next" : "previous"]())))
          })
      }
  })
}(document, window.jQuery || jQuery);

$(function() {
  $('[data-fancybox="pamm-ag-invst"]').fancybox({
      buttons: [
          'close'
      ],
      animationEffect: "fade",
      arrows: true,
      wheel: false,
      touch: false,
      infobar: false,

  });
});;
/*** Script File: /f/js/owl.carousel.min.js, Original size: 42,766, Compressed size: 42,766 ***/
/**
* Owl Carousel v2.2.1
* Copyright 2013-2017 David Deutsch
* Licensed under  ()
*/
! function(a, b, c, d) {
  function e(b, c) {
      this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
          time: null,
          target: null,
          pointer: null,
          stage: {
              start: null,
              current: null
          },
          direction: null
      }, this._states = {
          current: {},
          tags: {
              initializing: ["busy"],
              animating: ["busy"],
              dragging: ["interacting"]
          }
      }, a.each(["onResize", "onThrottledResize"], a.proxy(function(b, c) {
          this._handlers[c] = a.proxy(this[c], this)
      }, this)), a.each(e.Plugins, a.proxy(function(a, b) {
          this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
      }, this)), a.each(e.Workers, a.proxy(function(b, c) {
          this._pipe.push({
              filter: c.filter,
              run: a.proxy(c.run, this)
          })
      }, this)), this.setup(), this.initialize()
  }
  e.Defaults = {
      items: 3,
      loop: !1,
      center: !1,
      rewind: !1,
      mouseDrag: !0,
      touchDrag: !0,
      pullDrag: !0,
      freeDrag: !1,
      margin: 0,
      stagePadding: 0,
      merge: !1,
      mergeFit: !0,
      autoWidth: !1,
      startPosition: 0,
      rtl: !1,
      smartSpeed: 250,
      fluidSpeed: !1,
      dragEndSpeed: !1,
      responsive: {},
      responsiveRefreshRate: 200,
      responsiveBaseElement: b,
      fallbackEasing: "swing",
      info: !1,
      nestedItemSelector: !1,
      itemElement: "div",
      stageElement: "div",
      refreshClass: "owl-refresh",
      loadedClass: "owl-loaded",
      loadingClass: "owl-loading",
      rtlClass: "owl-rtl",
      responsiveClass: "owl-responsive",
      dragClass: "owl-drag",
      itemClass: "owl-item",
      stageClass: "owl-stage",
      stageOuterClass: "owl-stage-outer",
      grabClass: "owl-grab"
  }, e.Width = {
      Default: "default",
      Inner: "inner",
      Outer: "outer"
  }, e.Type = {
      Event: "event",
      State: "state"
  }, e.Plugins = {}, e.Workers = [{
      filter: ["width", "settings"],
      run: function() {
          this._width = this.$element.width()
      }
  }, {
      filter: ["width", "items", "settings"],
      run: function(a) {
          a.current = this._items && this._items[this.relative(this._current)]
      }
  }, {
      filter: ["items", "settings"],
      run: function() {
          this.$stage.children(".cloned").remove()
      }
  }, {
      filter: ["width", "items", "settings"],
      run: function(a) {
          var b = this.settings.margin || "",
              c = !this.settings.autoWidth,
              d = this.settings.rtl,
              e = {
                  width: "auto",
                  "margin-left": d ? b : "",
                  "margin-right": d ? "" : b
              };
          !c && this.$stage.children().css(e), a.css = e
      }
  }, {
      filter: ["width", "items", "settings"],
      run: function(a) {
          var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
              c = null,
              d = this._items.length,
              e = !this.settings.autoWidth,
              f = [];
          for (a.items = {
                  merge: !1,
                  width: b
              }; d--;) c = this._mergers[d], c = this.settings.mergeFit && Math.min(c, this.settings.items) || c, a.items.merge = c > 1 || a.items.merge, f[d] = e ? b * c : this._items[d].width();
          this._widths = f
      }
  }, {
      filter: ["items", "settings"],
      run: function() {
          var b = [],
              c = this._items,
              d = this.settings,
              e = Math.max(2 * d.items, 4),
              f = 2 * Math.ceil(c.length / 2),
              g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0,
              h = "",
              i = "";
          for (g /= 2; g--;) b.push(this.normalize(b.length / 2, !0)), h += c[b[b.length - 1]][0].outerHTML, b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)), i = c[b[b.length - 1]][0].outerHTML + i;
          this._clones = b, a(h).addClass("cloned").appendTo(this.$stage), a(i).addClass("cloned").prependTo(this.$stage)
      }
  }, {
      filter: ["width", "items", "settings"],
      run: function() {
          for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;) d = f[c - 1] || 0, e = this._widths[this.relative(c)] + this.settings.margin, f.push(d + e * a);
          this._coordinates = f
      }
  }, {
      filter: ["width", "items", "settings"],
      run: function() {
          var a = this.settings.stagePadding,
              b = this._coordinates,
              c = {
                  width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
                  "padding-left": a || "",
                  "padding-right": a || ""
              };
          this.$stage.css(c)
      }
  }, {
      filter: ["width", "items", "settings"],
      run: function(a) {
          var b = this._coordinates.length,
              c = !this.settings.autoWidth,
              d = this.$stage.children();
          if (c && a.items.merge)
              for (; b--;) a.css.width = this._widths[this.relative(b)], d.eq(b).css(a.css);
          else c && (a.css.width = a.items.width, d.css(a.css))
      }
  }, {
      filter: ["items"],
      run: function() {
          this._coordinates.length < 1 && this.$stage.removeAttr("style")
      }
  }, {
      filter: ["width", "items", "settings"],
      run: function(a) {
          a.current = a.current ? this.$stage.children().index(a.current) : 0, a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)), this.reset(a.current)
      }
  }, {
      filter: ["position"],
      run: function() {
          this.animate(this.coordinates(this._current))
      }
  }, {
      filter: ["width", "position", "items", "settings"],
      run: function() {
          var a, b, c, d, e = this.settings.rtl ? 1 : -1,
              f = 2 * this.settings.stagePadding,
              g = this.coordinates(this.current()) + f,
              h = g + this.width() * e,
              i = [];
          for (c = 0, d = this._coordinates.length; c < d; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
          this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
      }
  }], e.prototype.initialize = function() {
      if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
          var b, c, e;
          b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && e <= 0 && this.preloadAutoWidthImages(b)
      }
      this.$element.addClass(this.options.loadingClass), this.$stage = a("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
  }, e.prototype.setup = function() {
      var b = this.viewport(),
          c = this.options.responsive,
          d = -1,
          e = null;
      c ? (a.each(c, function(a) {
          a <= b && a > d && (d = Number(a))
      }), e = a.extend({}, this.options, c[d]), "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()), delete e.responsive, e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({}, this.options), this.trigger("change", {
          property: {
              name: "settings",
              value: e
          }
      }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
          property: {
              name: "settings",
              value: this.settings
          }
      })
  }, e.prototype.optionsLogic = function() {
      this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
  }, e.prototype.prepare = function(b) {
      var c = this.trigger("prepare", {
          content: b
      });
      return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)), this.trigger("prepared", {
          content: c.data
      }), c.data
  }, e.prototype.update = function() {
      for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) {
              return this[a]
          }, this._invalidated), e = {}; b < c;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
      this._invalidated = {}, !this.is("valid") && this.enter("valid")
  }, e.prototype.width = function(a) {
      switch (a = a || e.Width.Default) {
          case e.Width.Inner:
          case e.Width.Outer:
              return this._width;
          default:
              return this._width - 2 * this.settings.stagePadding + this.settings.margin
      }
  }, e.prototype.refresh = function() {
      this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
  }, e.prototype.onThrottledResize = function() {
      b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
  }, e.prototype.onResize = function() {
      return !!this._items.length && (this._width !== this.$element.width() && (!!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
  }, e.prototype.registerEventHandlers = function() {
      a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)), this.settings.responsive !== !1 && this.on(b, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
          return !1
      })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)))
  }, e.prototype.onDragStart = function(b) {
      var d = null;
      3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), d = {
          x: d[16 === d.length ? 12 : 4],
          y: d[16 === d.length ? 13 : 5]
      }) : (d = this.$stage.position(), d = {
          x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
          y: d.top
      }), this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = a(b.target), this._drag.stage.start = d, this._drag.stage.current = d, this._drag.pointer = this.pointer(b), a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)), a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function(b) {
          var d = this.difference(this._drag.pointer, this.pointer(b));
          a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)), Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"))
      }, this)))
  }, e.prototype.onDragMove = function(a) {
      var b = null,
          c = null,
          d = null,
          e = this.difference(this._drag.pointer, this.pointer(a)),
          f = this.difference(this._drag.stage.start, e);
      this.is("dragging") && (a.preventDefault(), this.settings.loop ? (b = this.coordinates(this.minimum()), c = this.coordinates(this.maximum() + 1) - b, f.x = ((f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), d = this.settings.pullDrag ? -1 * e.x / 5 : 0, f.x = Math.max(Math.min(f.x, b + d), c + d)), this._drag.stage.current = f, this.animate(f.x))
  }, e.prototype.onDragEnd = function(b) {
      var d = this.difference(this._drag.pointer, this.pointer(b)),
          e = this._drag.stage.current,
          f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
      a(c).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = f, (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
          return !1
      })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
  }, e.prototype.closest = function(b, c) {
      var d = -1,
          e = 30,
          f = this.width(),
          g = this.coordinates();
      return this.settings.freeDrag || a.each(g, a.proxy(function(a, h) {
          return "left" === c && b > h - e && b < h + e ? d = a : "right" === c && b > h - f - e && b < h - f + e ? d = a + 1 : this.op(b, "<", h) && this.op(b, ">", g[a + 1] || h - f) && (d = "left" === c ? a + 1 : a), d === -1
      }, this)), this.settings.loop || (this.op(b, ">", g[this.minimum()]) ? d = b = this.minimum() : this.op(b, "<", g[this.maximum()]) && (d = b = this.maximum())), d
  }, e.prototype.animate = function(b) {
      var c = this.speed() > 0;
      this.is("animating") && this.onTransitionEnd(), c && (this.enter("animating"), this.trigger("translate")), a.support.transform3d && a.support.transition ? this.$stage.css({
          transform: "translate3d(" + b + "px,0px,0px)",
          transition: this.speed() / 1e3 + "s"
      }) : c ? this.$stage.animate({
          left: b + "px"
      }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
          left: b + "px"
      })
  }, e.prototype.is = function(a) {
      return this._states.current[a] && this._states.current[a] > 0
  }, e.prototype.current = function(a) {
      if (a === d) return this._current;
      if (0 === this._items.length) return d;
      if (a = this.normalize(a), this._current !== a) {
          var b = this.trigger("change", {
              property: {
                  name: "position",
                  value: a
              }
          });
          b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
              property: {
                  name: "position",
                  value: this._current
              }
          })
      }
      return this._current
  }, e.prototype.invalidate = function(b) {
      return "string" === a.type(b) && (this._invalidated[b] = !0, this.is("valid") && this.leave("valid")), a.map(this._invalidated, function(a, b) {
          return b
      })
  }, e.prototype.reset = function(a) {
      a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
  }, e.prototype.normalize = function(a, b) {
      var c = this._items.length,
          e = b ? 0 : this._clones.length;
      return !this.isNumeric(a) || c < 1 ? a = d : (a < 0 || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2), a
  }, e.prototype.relative = function(a) {
      return a -= this._clones.length / 2, this.normalize(a, !0)
  }, e.prototype.maximum = function(a) {
      var b, c, d, e = this.settings,
          f = this._coordinates.length;
      if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
      else if (e.autoWidth || e.merge) {
          for (b = this._items.length, c = this._items[--b].width(), d = this.$element.width(); b-- && (c += this._items[b].width() + this.settings.margin, !(c > d)););
          f = b + 1
      } else f = e.center ? this._items.length - 1 : this._items.length - e.items;
      return a && (f -= this._clones.length / 2), Math.max(f, 0)
  }, e.prototype.minimum = function(a) {
      return a ? 0 : this._clones.length / 2
  }, e.prototype.items = function(a) {
      return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
  }, e.prototype.mergers = function(a) {
      return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
  }, e.prototype.clones = function(b) {
      var c = this._clones.length / 2,
          e = c + this._items.length,
          f = function(a) {
              return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
          };
      return b === d ? a.map(this._clones, function(a, b) {
          return f(b)
      }) : a.map(this._clones, function(a, c) {
          return a === b ? f(c) : null
      })
  }, e.prototype.speed = function(a) {
      return a !== d && (this._speed = a), this._speed
  }, e.prototype.coordinates = function(b) {
      var c, e = 1,
          f = b - 1;
      return b === d ? a.map(this._coordinates, a.proxy(function(a, b) {
          return this.coordinates(b)
      }, this)) : (this.settings.center ? (this.settings.rtl && (e = -1, f = b + 1), c = this._coordinates[b], c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0, c = Math.ceil(c))
  }, e.prototype.duration = function(a, b, c) {
      return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
  }, e.prototype.to = function(a, b) {
      var c = this.current(),
          d = null,
          e = a - this.relative(c),
          f = (e > 0) - (e < 0),
          g = this._items.length,
          h = this.minimum(),
          i = this.maximum();
      this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += f * -1 * g), a = c + e, d = ((a - h) % g + g) % g + h, d !== a && d - e <= i && d - e > 0 && (c = d - e, a = d, this.reset(c))) : this.settings.rewind ? (i += 1, a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)), this.speed(this.duration(c, a, b)), this.current(a), this.$element.is(":visible") && this.update()
  }, e.prototype.next = function(a) {
      a = a || !1, this.to(this.relative(this.current()) + 1, a)
  }, e.prototype.prev = function(a) {
      a = a || !1, this.to(this.relative(this.current()) - 1, a)
  }, e.prototype.onTransitionEnd = function(a) {
      if (a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))) return !1;
      this.leave("animating"), this.trigger("translated")
  }, e.prototype.viewport = function() {
      var d;
      return this.options.responsiveBaseElement !== b ? d = a(this.options.responsiveBaseElement).width() : b.innerWidth ? d = b.innerWidth : c.documentElement && c.documentElement.clientWidth ? d = c.documentElement.clientWidth : console.warn("Can not detect viewport width."), d
  }, e.prototype.replace = function(b) {
      this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function() {
          return 1 === this.nodeType
      }).each(a.proxy(function(a, b) {
          b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
      }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
  }, e.prototype.add = function(b, c) {
      var e = this.relative(this._current);
      c = c === d ? this._items.length : this.normalize(c, !0), b = b instanceof jQuery ? b : a(b), this.trigger("add", {
          content: b,
          position: c
      }), b = this.prepare(b), 0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b), 0 !== this._items.length && this._items[c - 1].after(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[e] && this.reset(this._items[e].index()), this.invalidate("items"), this.trigger("added", {
          content: b,
          position: c
      })
  }, e.prototype.remove = function(a) {
      a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
          content: this._items[a],
          position: a
      }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
          content: null,
          position: a
      }))
  }, e.prototype.preloadAutoWidthImages = function(b) {
      b.each(a.proxy(function(b, c) {
          this.enter("pre-loading"), c = a(c), a(new Image).one("load", a.proxy(function(a) {
              c.attr("src", a.target.src), c.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
          }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"))
      }, this))
  }, e.prototype.destroy = function() {
      this.$element.off(".owl.core"), this.$stage.off(".owl.core"), a(c).off(".owl.core"), this.settings.responsive !== !1 && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize));
      for (var d in this._plugins) this._plugins[d].destroy();
      this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
  }, e.prototype.op = function(a, b, c) {
      var d = this.settings.rtl;
      switch (b) {
          case "<":
              return d ? a > c : a < c;
          case ">":
              return d ? a < c : a > c;
          case ">=":
              return d ? a <= c : a >= c;
          case "<=":
              return d ? a >= c : a <= c
      }
  }, e.prototype.on = function(a, b, c, d) {
      a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
  }, e.prototype.off = function(a, b, c, d) {
      a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
  }, e.prototype.trigger = function(b, c, d, f, g) {
      var h = {
              item: {
                  count: this._items.length,
                  index: this.current()
              }
          },
          i = a.camelCase(a.grep(["on", b, d], function(a) {
              return a
          }).join("-").toLowerCase()),
          j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
              relatedTarget: this
          }, h, c));
      return this._supress[b] || (a.each(this._plugins, function(a, b) {
          b.onTrigger && b.onTrigger(j)
      }), this.register({
          type: e.Type.Event,
          name: b
      }), this.$element.trigger(j), this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)), j
  }, e.prototype.enter = function(b) {
      a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
          this._states.current[b] === d && (this._states.current[b] = 0), this._states.current[b]++
      }, this))
  }, e.prototype.leave = function(b) {
      a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
          this._states.current[b]--
      }, this))
  }, e.prototype.register = function(b) {
      if (b.type === e.Type.Event) {
          if (a.event.special[b.name] || (a.event.special[b.name] = {}), !a.event.special[b.name].owl) {
              var c = a.event.special[b.name]._default;
              a.event.special[b.name]._default = function(a) {
                  return !c || !c.apply || a.namespace && a.namespace.indexOf("owl") !== -1 ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments)
              }, a.event.special[b.name].owl = !0
          }
      } else b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags, this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function(c, d) {
          return a.inArray(c, this._states.tags[b.name]) === d
      }, this)))
  }, e.prototype.suppress = function(b) {
      a.each(b, a.proxy(function(a, b) {
          this._supress[b] = !0
      }, this))
  }, e.prototype.release = function(b) {
      a.each(b, a.proxy(function(a, b) {
          delete this._supress[b]
      }, this))
  }, e.prototype.pointer = function(a) {
      var c = {
          x: null,
          y: null
      };
      return a = a.originalEvent || a || b.event, a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a, a.pageX ? (c.x = a.pageX, c.y = a.pageY) : (c.x = a.clientX, c.y = a.clientY), c
  }, e.prototype.isNumeric = function(a) {
      return !isNaN(parseFloat(a))
  }, e.prototype.difference = function(a, b) {
      return {
          x: a.x - b.x,
          y: a.y - b.y
      }
  }, a.fn.owlCarousel = function(b) {
      var c = Array.prototype.slice.call(arguments, 1);
      return this.each(function() {
          var d = a(this),
              f = d.data("owl.carousel");
          f || (f = new e(this, "object" == typeof b && b), d.data("owl.carousel", f), a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(b, c) {
              f.register({
                  type: e.Type.Event,
                  name: c
              }), f.$element.on(c + ".owl.carousel.core", a.proxy(function(a) {
                  a.namespace && a.relatedTarget !== this && (this.suppress([c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release([c]))
              }, f))
          })), "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c)
      })
  }, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
  var e = function(b) {
      this._core = b, this._interval = null, this._visible = null, this._handlers = {
          "initialized.owl.carousel": a.proxy(function(a) {
              a.namespace && this._core.settings.autoRefresh && this.watch()
          }, this)
      }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
  };
  e.Defaults = {
      autoRefresh: !0,
      autoRefreshInterval: 500
  }, e.prototype.watch = function() {
      this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
  }, e.prototype.refresh = function() {
      this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
  }, e.prototype.destroy = function() {
      var a, c;
      b.clearInterval(this._interval);
      for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
      for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
  var e = function(b) {
      this._core = b, this._loaded = [], this._handlers = {
          "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function(b) {
              if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type))
                  for (var c = this._core.settings, e = c.center && Math.ceil(c.items / 2) || c.items, f = c.center && e * -1 || 0, g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f, h = this._core.clones().length, i = a.proxy(function(a, b) {
                          this.load(b)
                      }, this); f++ < e;) this.load(h / 2 + this._core.relative(g)), h && a.each(this._core.clones(this._core.relative(g)), i), g++
          }, this)
      }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
  };
  e.Defaults = {
      lazyLoad: !1
  }, e.prototype.load = function(c) {
      var d = this._core.$stage.children().eq(c),
          e = d && d.find(".owl-lazy");
      !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) {
          var e, f = a(d),
              g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
          this._core.trigger("load", {
              element: f,
              url: g
          }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function() {
              f.css("opacity", 1), this._core.trigger("loaded", {
                  element: f,
                  url: g
              }, "lazy")
          }, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function() {
              f.css({
                  "background-image": 'url("' + g + '")',
                  opacity: "1"
              }), this._core.trigger("loaded", {
                  element: f,
                  url: g
              }, "lazy")
          }, this), e.src = g)
      }, this)), this._loaded.push(d.get(0)))
  }, e.prototype.destroy = function() {
      var a, b;
      for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
      for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.Lazy = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
  var e = function(b) {
      this._core = b, this._handlers = {
          "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function(a) {
              a.namespace && this._core.settings.autoHeight && this.update()
          }, this),
          "changed.owl.carousel": a.proxy(function(a) {
              a.namespace && this._core.settings.autoHeight && "position" == a.property.name && this.update()
          }, this),
          "loaded.owl.lazy": a.proxy(function(a) {
              a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
          }, this)
      }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
  };
  e.Defaults = {
      autoHeight: !1,
      autoHeightClass: "owl-height"
  }, e.prototype.update = function() {
      var b = this._core._current,
          c = b + this._core.settings.items,
          d = this._core.$stage.children().toArray().slice(b, c),
          e = [],
          f = 0;
      a.each(d, function(b, c) {
          e.push(a(c).height())
      }), f = Math.max.apply(null, e), this._core.$stage.parent().height(f).addClass(this._core.settings.autoHeightClass)
  }, e.prototype.destroy = function() {
      var a, b;
      for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
      for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
  var e = function(b) {
      this._core = b, this._videos = {}, this._playing = null, this._handlers = {
          "initialized.owl.carousel": a.proxy(function(a) {
              a.namespace && this._core.register({
                  type: "state",
                  name: "playing",
                  tags: ["interacting"]
              })
          }, this),
          "resize.owl.carousel": a.proxy(function(a) {
              a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault()
          }, this),
          "refreshed.owl.carousel": a.proxy(function(a) {
              a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
          }, this),
          "changed.owl.carousel": a.proxy(function(a) {
              a.namespace && "position" === a.property.name && this._playing && this.stop()
          }, this),
          "prepared.owl.carousel": a.proxy(function(b) {
              if (b.namespace) {
                  var c = a(b.content).find(".owl-video");
                  c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
              }
          }, this)
      }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) {
          this.play(a)
      }, this))
  };
  e.Defaults = {
      video: !1,
      videoHeight: !1,
      videoWidth: !1
  }, e.prototype.fetch = function(a, b) {
      var c = function() {
              return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube"
          }(),
          d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id"),
          e = a.attr("data-width") || this._core.settings.videoWidth,
          f = a.attr("data-height") || this._core.settings.videoHeight,
          g = a.attr("href");
      if (!g) throw new Error("Missing video URL.");
      if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
      else if (d[3].indexOf("vimeo") > -1) c = "vimeo";
      else {
          if (!(d[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
          c = "vzaar"
      }
      d = d[6], this._videos[g] = {
          type: c,
          id: d,
          width: e,
          height: f
      }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
  }, e.prototype.thumbnail = function(b, c) {
      var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
          h = b.find("img"),
          i = "src",
          j = "",
          k = this._core.settings,
          l = function(a) {
              e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e)
          };
      if (b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length) return l(h.attr(i)), h.remove(), !1;
      "youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type ? a.ajax({
          type: "GET",
          url: "//vimeo.com/api/v2/video/" + c.id + ".json",
          jsonp: "callback",
          dataType: "jsonp",
          success: function(a) {
              f = a[0].thumbnail_large, l(f)
          }
      }) : "vzaar" === c.type && a.ajax({
          type: "GET",
          url: "//vzaar.com/api/videos/" + c.id + ".json",
          jsonp: "callback",
          dataType: "jsonp",
          success: function(a) {
              f = a.framegrab_url, l(f)
          }
      })
  }, e.prototype.stop = function() {
      this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
  }, e.prototype.play = function(b) {
      var c, d = a(b.target),
          e = d.closest("." + this._core.settings.itemClass),
          f = this._videos[e.attr("data-video")],
          g = f.width || "100%",
          h = f.height || this._core.$stage.height();
      this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), "youtube" === f.type ? c = '<iframe width="' + g + '" height="' + h + '" src="//www.youtube.com/embed/' + f.id + "?autoplay=1&rel=0&v=" + f.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === f.type ? c = '<iframe src="//player.vimeo.com/video/' + f.id + '?autoplay=1" width="' + g + '" height="' + h + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === f.type && (c = '<iframe frameborder="0"height="' + h + '"width="' + g + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + f.id + '/player?autoplay=true"></iframe>'), a('<div class="owl-video-frame">' + c + "</div>").insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing"))
  }, e.prototype.isInFullScreen = function() {
      var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
      return b && a(b).parent().hasClass("owl-video-frame")
  }, e.prototype.destroy = function() {
      var a, b;
      this._core.$element.off("click.owl.video");
      for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
      for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.Video = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
  var e = function(b) {
      this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
          "change.owl.carousel": a.proxy(function(a) {
              a.namespace && "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
          }, this),
          "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) {
              a.namespace && (this.swapping = "translated" == a.type)
          }, this),
          "translate.owl.carousel": a.proxy(function(a) {
              a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
          }, this)
      }, this.core.$element.on(this.handlers)
  };
  e.Defaults = {
          animateOut: !1,
          animateIn: !1
      }, e.prototype.swap = function() {
          if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
              this.core.speed(0);
              var b, c = a.proxy(this.clear, this),
                  d = this.core.$stage.children().eq(this.previous),
                  e = this.core.$stage.children().eq(this.next),
                  f = this.core.settings.animateIn,
                  g = this.core.settings.animateOut;
              this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.one(a.support.animation.end, c).css({
                  left: b + "px"
              }).addClass("animated owl-animated-out").addClass(g)), f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f))
          }
      }, e.prototype.clear = function(b) {
          a(b.target).css({
              left: ""
          }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
      }, e.prototype.destroy = function() {
          var a, b;
          for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
          for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
      },
      a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
  var e = function(b) {
      this._core = b, this._timeout = null, this._paused = !1, this._handlers = {
          "changed.owl.carousel": a.proxy(function(a) {
              a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._core.settings.autoplay && this._setAutoPlayInterval()
          }, this),
          "initialized.owl.carousel": a.proxy(function(a) {
              a.namespace && this._core.settings.autoplay && this.play()
          }, this),
          "play.owl.autoplay": a.proxy(function(a, b, c) {
              a.namespace && this.play(b, c)
          }, this),
          "stop.owl.autoplay": a.proxy(function(a) {
              a.namespace && this.stop()
          }, this),
          "mouseover.owl.autoplay": a.proxy(function() {
              this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
          }, this),
          "mouseleave.owl.autoplay": a.proxy(function() {
              this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
          }, this),
          "touchstart.owl.core": a.proxy(function() {
              this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
          }, this),
          "touchend.owl.core": a.proxy(function() {
              this._core.settings.autoplayHoverPause && this.play()
          }, this)
      }, this._core.$element.on(this._handlers), this._core.options = a.extend({}, e.Defaults, this._core.options)
  };
  e.Defaults = {
      autoplay: !1,
      autoplayTimeout: 5e3,
      autoplayHoverPause: !1,
      autoplaySpeed: !1
  }, e.prototype.play = function(a, b) {
      this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval())
  }, e.prototype._getNextTimeout = function(d, e) {
      return this._timeout && b.clearTimeout(this._timeout), b.setTimeout(a.proxy(function() {
          this._paused || this._core.is("busy") || this._core.is("interacting") || c.hidden || this._core.next(e || this._core.settings.autoplaySpeed)
      }, this), d || this._core.settings.autoplayTimeout)
  }, e.prototype._setAutoPlayInterval = function() {
      this._timeout = this._getNextTimeout()
  }, e.prototype.stop = function() {
      this._core.is("rotating") && (b.clearTimeout(this._timeout), this._core.leave("rotating"))
  }, e.prototype.pause = function() {
      this._core.is("rotating") && (this._paused = !0)
  }, e.prototype.destroy = function() {
      var a, b;
      this.stop();
      for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
      for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.autoplay = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
  "use strict";
  var e = function(b) {
      this._core = b, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
          next: this._core.next,
          prev: this._core.prev,
          to: this._core.to
      }, this._handlers = {
          "prepared.owl.carousel": a.proxy(function(b) {
              b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
          }, this),
          "added.owl.carousel": a.proxy(function(a) {
              a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop())
          }, this),
          "remove.owl.carousel": a.proxy(function(a) {
              a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1)
          }, this),
          "changed.owl.carousel": a.proxy(function(a) {
              a.namespace && "position" == a.property.name && this.draw()
          }, this),
          "initialized.owl.carousel": a.proxy(function(a) {
              a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
          }, this),
          "refreshed.owl.carousel": a.proxy(function(a) {
              a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
          }, this)
      }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
  };
  e.Defaults = {
      nav: !1,
      navText: ["prev", "next"],
      navSpeed: !1,
      navElement: "div",
      navContainer: !1,
      navContainerClass: "owl-nav",
      navClass: ["owl-prev", "owl-next"],
      slideBy: 1,
      dotClass: "owl-dot",
      dotsClass: "owl-dots",
      dots: !0,
      dotsEach: !1,
      dotsData: !1,
      dotsSpeed: !1,
      dotsContainer: !1
  }, e.prototype.initialize = function() {
      var b, c = this._core.settings;
      this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function(a) {
          this.prev(c.navSpeed)
      }, this)), this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function(a) {
          this.next(c.navSpeed)
      }, this)), c.dotsData || (this._templates = [a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]), this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", a.proxy(function(b) {
          var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
          b.preventDefault(), this.to(d, c.dotsSpeed)
      }, this));
      for (b in this._overrides) this._core[b] = a.proxy(this[b], this)
  }, e.prototype.destroy = function() {
      var a, b, c, d;
      for (a in this._handlers) this.$element.off(a, this._handlers[a]);
      for (b in this._controls) this._controls[b].remove();
      for (d in this.overides) this._core[d] = this._overrides[d];
      for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
  }, e.prototype.update = function() {
      var a, b, c, d = this._core.clones().length / 2,
          e = d + this._core.items().length,
          f = this._core.maximum(!0),
          g = this._core.settings,
          h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
      if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy)
          for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
              if (b >= h || 0 === b) {
                  if (this._pages.push({
                          start: Math.min(f, a - d),
                          end: a - d + h - 1
                      }), Math.min(f, a - d) === f) break;
                  b = 0, ++c
              }
              b += this._core.mergers(this._core.relative(a))
          }
  }, e.prototype.draw = function() {
      var b, c = this._core.settings,
          d = this._core.items().length <= c.items,
          e = this._core.relative(this._core.current()),
          f = c.loop || c.rewind;
      this._controls.$relative.toggleClass("disabled", !c.nav || d), c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !c.dots || d), c.dots && (b = this._pages.length - this._controls.$absolute.children().length, c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : b < 0 && this._controls.$absolute.children().slice(b).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"))
  }, e.prototype.onTrigger = function(b) {
      var c = this._core.settings;
      b.page = {
          index: a.inArray(this.current(), this._pages),
          count: this._pages.length,
          size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
      }
  }, e.prototype.current = function() {
      var b = this._core.relative(this._core.current());
      return a.grep(this._pages, a.proxy(function(a, c) {
          return a.start <= b && a.end >= b
      }, this)).pop()
  }, e.prototype.getPosition = function(b) {
      var c, d, e = this._core.settings;
      return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
  }, e.prototype.next = function(b) {
      a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
  }, e.prototype.prev = function(b) {
      a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
  }, e.prototype.to = function(b, c, d) {
      var e;
      !d && this._pages.length ? (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c)
  }, a.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
  "use strict";
  var e = function(c) {
      this._core = c, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
          "initialized.owl.carousel": a.proxy(function(c) {
              c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
          }, this),
          "prepared.owl.carousel": a.proxy(function(b) {
              if (b.namespace) {
                  var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                  if (!c) return;
                  this._hashes[c] = b.content
              }
          }, this),
          "changed.owl.carousel": a.proxy(function(c) {
              if (c.namespace && "position" === c.property.name) {
                  var d = this._core.items(this._core.relative(this._core.current())),
                      e = a.map(this._hashes, function(a, b) {
                          return a === d ? b : null
                      }).join();
                  if (!e || b.location.hash.slice(1) === e) return;
                  b.location.hash = e
              }
          }, this)
      }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function(a) {
          var c = b.location.hash.substring(1),
              e = this._core.$stage.children(),
              f = this._hashes[c] && e.index(this._hashes[c]);
          f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0)
      }, this))
  };
  e.Defaults = {
      URLhashListener: !1
  }, e.prototype.destroy = function() {
      var c, d;
      a(b).off("hashchange.owl.navigation");
      for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
      for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.Hash = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
  function e(b, c) {
      var e = !1,
          f = b.charAt(0).toUpperCase() + b.slice(1);
      return a.each((b + " " + h.join(f + " ") + f).split(" "), function(a, b) {
          if (g[b] !== d) return e = !c || b, !1
      }), e
  }

  function f(a) {
      return e(a, !0)
  }
  var g = a("<support>").get(0).style,
      h = "Webkit Moz O ms".split(" "),
      i = {
          transition: {
              end: {
                  WebkitTransition: "webkitTransitionEnd",
                  MozTransition: "transitionend",
                  OTransition: "oTransitionEnd",
                  transition: "transitionend"
              }
          },
          animation: {
              end: {
                  WebkitAnimation: "webkitAnimationEnd",
                  MozAnimation: "animationend",
                  OAnimation: "oAnimationEnd",
                  animation: "animationend"
              }
          }
      },
      j = {
          csstransforms: function() {
              return !!e("transform")
          },
          csstransforms3d: function() {
              return !!e("perspective")
          },
          csstransitions: function() {
              return !!e("transition")
          },
          cssanimations: function() {
              return !!e("animation")
          }
      };
  j.csstransitions() && (a.support.transition = new String(f("transition")), a.support.transition.end = i.transition.end[a.support.transition]), j.cssanimations() && (a.support.animation = new String(f("animation")), a.support.animation.end = i.animation.end[a.support.animation]), j.csstransforms() && (a.support.transform = new String(f("transform")), a.support.transform3d = j.csstransforms3d())
}(window.Zepto || window.jQuery, window, document);;
/*** Script File: /f/js/jquery_ui_i18n.min.js, Original size: 58,114, Compressed size: 58,114 ***/
/*! jQuery UI - v1.10.4 - 2014-01-17
* http://jqueryui.com
* Includes: [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object]
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

jQuery(function(e) {
  e.datepicker.regional.af = {
      closeText: "Selekteer",
      prevText: "Vorige",
      nextText: "Volgende",
      currentText: "Vandag",
      monthNames: ["Januarie", "Februarie", "Maart", "April", "Mei", "Junie", "Julie", "Augustus", "September", "Oktober", "November", "Desember"],
      monthNamesShort: ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
      dayNames: ["Sondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrydag", "Saterdag"],
      dayNamesShort: ["Son", "Maa", "Din", "Woe", "Don", "Vry", "Sat"],
      dayNamesMin: ["So", "Ma", "Di", "Wo", "Do", "Vr", "Sa"],
      weekHeader: "Wk",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.af)
}), jQuery(function(e) {
  e.datepicker.regional["ar-DZ"] = {
      closeText: "إغلاق",
      prevText: "&#x3C;السابق",
      nextText: "التالي&#x3E;",
      currentText: "اليوم",
      monthNames: ["جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
      monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      dayNames: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
      dayNamesShort: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
      dayNamesMin: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
      weekHeader: "أسبوع",
      dateFormat: "dd/mm/yy",
      firstDay: 6,
      isRTL: !0,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional["ar-DZ"])
}), jQuery(function(e) {
  e.datepicker.regional.ar = {
      closeText: "إغلاق",
      prevText: "&#x3C;السابق",
      nextText: "التالي&#x3E;",
      currentText: "اليوم",
      monthNames: ["كانون الثاني", "شباط", "آذار", "نيسان", "مايو", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"],
      monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      dayNames: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
      dayNamesShort: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
      dayNamesMin: ["ح", "ن", "ث", "ر", "خ", "ج", "س"],
      weekHeader: "أسبوع",
      dateFormat: "dd/mm/yy",
      firstDay: 6,
      isRTL: !0,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.ar)
}), jQuery(function(e) {
  e.datepicker.regional.az = {
      closeText: "Bağla",
      prevText: "&#x3C;Geri",
      nextText: "İrəli&#x3E;",
      currentText: "Bugün",
      monthNames: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"],
      monthNamesShort: ["Yan", "Fev", "Mar", "Apr", "May", "İyun", "İyul", "Avq", "Sen", "Okt", "Noy", "Dek"],
      dayNames: ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"],
      dayNamesShort: ["B", "Be", "Ça", "Ç", "Ca", "C", "Ş"],
      dayNamesMin: ["B", "B", "Ç", "С", "Ç", "C", "Ş"],
      weekHeader: "Hf",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.az)
}), jQuery(function(e) {
  e.datepicker.regional.be = {
      closeText: "Зачыніць",
      prevText: "&larr;Папяр.",
      nextText: "Наст.&rarr;",
      currentText: "Сёньня",
      monthNames: ["Студзень", "Люты", "Сакавік", "Красавік", "Травень", "Чэрвень", "Ліпень", "Жнівень", "Верасень", "Кастрычнік", "Лістапад", "Сьнежань"],
      monthNamesShort: ["Сту", "Лют", "Сак", "Кра", "Тра", "Чэр", "Ліп", "Жні", "Вер", "Кас", "Ліс", "Сьн"],
      dayNames: ["нядзеля", "панядзелак", "аўторак", "серада", "чацьвер", "пятніца", "субота"],
      dayNamesShort: ["ндз", "пнд", "аўт", "срд", "чцв", "птн", "сбт"],
      dayNamesMin: ["Нд", "Пн", "Аў", "Ср", "Чц", "Пт", "Сб"],
      weekHeader: "Тд",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.be)
}), jQuery(function(e) {
  e.datepicker.regional.bg = {
      closeText: "затвори",
      prevText: "&#x3C;назад",
      nextText: "напред&#x3E;",
      nextBigText: "&#x3E;&#x3E;",
      currentText: "днес",
      monthNames: ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"],
      monthNamesShort: ["Яну", "Фев", "Мар", "Апр", "Май", "Юни", "Юли", "Авг", "Сеп", "Окт", "Нов", "Дек"],
      dayNames: ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"],
      dayNamesShort: ["Нед", "Пон", "Вто", "Сря", "Чет", "Пет", "Съб"],
      dayNamesMin: ["Не", "По", "Вт", "Ср", "Че", "Пе", "Съ"],
      weekHeader: "Wk",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.bg)
}), jQuery(function(e) {
  e.datepicker.regional.bs = {
      closeText: "Zatvori",
      prevText: "&#x3C;",
      nextText: "&#x3E;",
      currentText: "Danas",
      monthNames: ["Januar", "Februar", "Mart", "April", "Maj", "Juni", "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
      dayNames: ["Nedelja", "Ponedeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"],
      dayNamesShort: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
      dayNamesMin: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"],
      weekHeader: "Wk",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.bs)
}), jQuery(function(e) {
  e.datepicker.regional.ca = {
      closeText: "Tanca",
      prevText: "Anterior",
      nextText: "Següent",
      currentText: "Avui",
      monthNames: ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"],
      monthNamesShort: ["gen", "feb", "març", "abr", "maig", "juny", "jul", "ag", "set", "oct", "nov", "des"],
      dayNames: ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"],
      dayNamesShort: ["dg", "dl", "dt", "dc", "dj", "dv", "ds"],
      dayNamesMin: ["dg", "dl", "dt", "dc", "dj", "dv", "ds"],
      weekHeader: "Set",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.ca)
}), jQuery(function(e) {
  e.datepicker.regional.cs = {
      closeText: "Zavřít",
      prevText: "&#x3C;Dříve",
      nextText: "Později&#x3E;",
      currentText: "Nyní",
      monthNames: ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"],
      monthNamesShort: ["led", "úno", "bře", "dub", "kvě", "čer", "čvc", "srp", "zář", "říj", "lis", "pro"],
      dayNames: ["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"],
      dayNamesShort: ["ne", "po", "út", "st", "čt", "pá", "so"],
      dayNamesMin: ["ne", "po", "út", "st", "čt", "pá", "so"],
      weekHeader: "Týd",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.cs)
}), jQuery(function(e) {
  e.datepicker.regional["cy-GB"] = {
      closeText: "Done",
      prevText: "Prev",
      nextText: "Next",
      currentText: "Today",
      monthNames: ["Ionawr", "Chwefror", "Mawrth", "Ebrill", "Mai", "Mehefin", "Gorffennaf", "Awst", "Medi", "Hydref", "Tachwedd", "Rhagfyr"],
      monthNamesShort: ["Ion", "Chw", "Maw", "Ebr", "Mai", "Meh", "Gor", "Aws", "Med", "Hyd", "Tac", "Rha"],
      dayNames: ["Dydd Sul", "Dydd Llun", "Dydd Mawrth", "Dydd Mercher", "Dydd Iau", "Dydd Gwener", "Dydd Sadwrn"],
      dayNamesShort: ["Sul", "Llu", "Maw", "Mer", "Iau", "Gwe", "Sad"],
      dayNamesMin: ["Su", "Ll", "Ma", "Me", "Ia", "Gw", "Sa"],
      weekHeader: "Wy",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional["cy-GB"])
}), jQuery(function(e) {
  e.datepicker.regional.da = {
      closeText: "Luk",
      prevText: "&#x3C;Forrige",
      nextText: "Næste&#x3E;",
      currentText: "Idag",
      monthNames: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
      dayNames: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"],
      dayNamesShort: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
      dayNamesMin: ["Sø", "Ma", "Ti", "On", "To", "Fr", "Lø"],
      weekHeader: "Uge",
      dateFormat: "dd-mm-yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.da)
}), jQuery(function(e) {
  e.datepicker.regional.de = {
      closeText: "Schließen",
      prevText: "&#x3C;Zurück",
      nextText: "Vor&#x3E;",
      currentText: "Heute",
      monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
      monthNamesShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
      dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
      dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
      dayNamesMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
      weekHeader: "KW",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.de)
}), jQuery(function(e) {
  e.datepicker.regional.el = {
      closeText: "Κλείσιμο",
      prevText: "Προηγούμενος",
      nextText: "Επόμενος",
      currentText: "Τρέχων Μήνας",
      monthNames: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
      monthNamesShort: ["Ιαν", "Φεβ", "Μαρ", "Απρ", "Μαι", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ"],
      dayNames: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"],
      dayNamesShort: ["Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ"],
      dayNamesMin: ["Κυ", "Δε", "Τρ", "Τε", "Πε", "Πα", "Σα"],
      weekHeader: "Εβδ",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.el)
}), jQuery(function(e) {
  e.datepicker.regional["en-AU"] = {
      closeText: "Done",
      prevText: "Prev",
      nextText: "Next",
      currentText: "Today",
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      weekHeader: "Wk",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional["en-AU"])
}), jQuery(function(e) {
  e.datepicker.regional["en-GB"] = {
      closeText: "Done",
      prevText: "Prev",
      nextText: "Next",
      currentText: "Today",
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      weekHeader: "Wk",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional["en-GB"])
}), jQuery(function(e) {
  e.datepicker.regional["en-NZ"] = {
      closeText: "Done",
      prevText: "Prev",
      nextText: "Next",
      currentText: "Today",
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      weekHeader: "Wk",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional["en-NZ"])
}), jQuery(function(e) {
  e.datepicker.regional.eo = {
      closeText: "Fermi",
      prevText: "&#x3C;Anta",
      nextText: "Sekv&#x3E;",
      currentText: "Nuna",
      monthNames: ["Januaro", "Februaro", "Marto", "Aprilo", "Majo", "Junio", "Julio", "Aŭgusto", "Septembro", "Oktobro", "Novembro", "Decembro"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aŭg", "Sep", "Okt", "Nov", "Dec"],
      dayNames: ["Dimanĉo", "Lundo", "Mardo", "Merkredo", "Ĵaŭdo", "Vendredo", "Sabato"],
      dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Ĵaŭ", "Ven", "Sab"],
      dayNamesMin: ["Di", "Lu", "Ma", "Me", "Ĵa", "Ve", "Sa"],
      weekHeader: "Sb",
      dateFormat: "dd/mm/yy",
      firstDay: 0,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.eo)
}), jQuery(function(e) {
  e.datepicker.regional.es = {
      closeText: "Cerrar",
      prevText: "&#x3C;Ant",
      nextText: "Sig&#x3E;",
      currentText: "Hoy",
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ogo", "sep", "oct", "nov", "dic"],
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "juv", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      weekHeader: "Sm",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.es)
}), jQuery(function(e) {
  e.datepicker.regional.et = {
      closeText: "Sulge",
      prevText: "Eelnev",
      nextText: "Järgnev",
      currentText: "Täna",
      monthNames: ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"],
      monthNamesShort: ["Jaan", "Veebr", "Märts", "Apr", "Mai", "Juuni", "Juuli", "Aug", "Sept", "Okt", "Nov", "Dets"],
      dayNames: ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"],
      dayNamesShort: ["Pühap", "Esmasp", "Teisip", "Kolmap", "Neljap", "Reede", "Laup"],
      dayNamesMin: ["P", "E", "T", "K", "N", "R", "L"],
      weekHeader: "näd",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.et)
}), jQuery(function(e) {
  e.datepicker.regional.eu = {
      closeText: "Egina",
      prevText: "&#x3C;Aur",
      nextText: "Hur&#x3E;",
      currentText: "Gaur",
      monthNames: ["urtarrila", "otsaila", "martxoa", "apirila", "maiatza", "ekaina", "uztaila", "abuztua", "iraila", "urria", "azaroa", "abendua"],
      monthNamesShort: ["urt.", "ots.", "mar.", "api.", "mai.", "eka.", "uzt.", "abu.", "ira.", "urr.", "aza.", "abe."],
      dayNames: ["igandea", "astelehena", "asteartea", "asteazkena", "osteguna", "ostirala", "larunbata"],
      dayNamesShort: ["ig.", "al.", "ar.", "az.", "og.", "ol.", "lr."],
      dayNamesMin: ["ig", "al", "ar", "az", "og", "ol", "lr"],
      weekHeader: "As",
      dateFormat: "yy-mm-dd",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.eu)
}), jQuery(function(e) {
  e.datepicker.regional.fa = {
      closeText: "بستن",
      prevText: "&#x3C;قبلی",
      nextText: "بعدی&#x3E;",
      currentText: "امروز",
      monthNames: ["ژانویه", "فوریه", "مارس", "آوریل", "می", "ژوئن", "ژوئیه", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"],
      monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      dayNames: ["يکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"],
      dayNamesShort: ["ی", "د", "س", "چ", "پ", "ج", "ش"],
      dayNamesMin: ["ی", "د", "س", "چ", "پ", "ج", "ش"],
      weekHeader: "هف",
      dateFormat: "yy/mm/dd",
      firstDay: 6,
      isRTL: !0,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.fa)
}), jQuery(function(e) {
  e.datepicker.regional.fi = {
      closeText: "Sulje",
      prevText: "&#xAB;Edellinen",
      nextText: "Seuraava&#xBB;",
      currentText: "Tänään",
      monthNames: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"],
      monthNamesShort: ["Tammi", "Helmi", "Maalis", "Huhti", "Touko", "Kesä", "Heinä", "Elo", "Syys", "Loka", "Marras", "Joulu"],
      dayNamesShort: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
      dayNames: ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"],
      dayNamesMin: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
      weekHeader: "Vk",
      dateFormat: "d.m.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.fi)
}), jQuery(function(e) {
  e.datepicker.regional.fo = {
      closeText: "Lat aftur",
      prevText: "&#x3C;Fyrra",
      nextText: "Næsta&#x3E;",
      currentText: "Í dag",
      monthNames: ["Januar", "Februar", "Mars", "Apríl", "Mei", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
      dayNames: ["Sunnudagur", "Mánadagur", "Týsdagur", "Mikudagur", "Hósdagur", "Fríggjadagur", "Leyardagur"],
      dayNamesShort: ["Sun", "Mán", "Týs", "Mik", "Hós", "Frí", "Ley"],
      dayNamesMin: ["Su", "Má", "Tý", "Mi", "Hó", "Fr", "Le"],
      weekHeader: "Vk",
      dateFormat: "dd-mm-yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.fo)
}), jQuery(function(e) {
  e.datepicker.regional["fr-CA"] = {
      closeText: "Fermer",
      prevText: "Précédent",
      nextText: "Suivant",
      currentText: "Aujourd'hui",
      monthNames: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
      monthNamesShort: ["janv.", "févr.", "mars", "avril", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
      dayNames: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
      dayNamesShort: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
      dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
      weekHeader: "Sem.",
      dateFormat: "yy-mm-dd",
      firstDay: 0,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional["fr-CA"])
}), jQuery(function(e) {
  e.datepicker.regional["fr-CH"] = {
      closeText: "Fermer",
      prevText: "&#x3C;Préc",
      nextText: "Suiv&#x3E;",
      currentText: "Courant",
      monthNames: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
      monthNamesShort: ["janv.", "févr.", "mars", "avril", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
      dayNames: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
      dayNamesShort: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
      dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
      weekHeader: "Sm",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional["fr-CH"])
}), jQuery(function(e) {
  e.datepicker.regional.fr = {
      closeText: "Fermer",
      prevText: "Précédent",
      nextText: "Suivant",
      currentText: "Aujourd'hui",
      monthNames: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
      monthNamesShort: ["janv.", "févr.", "mars", "avril", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
      dayNames: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
      dayNamesShort: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
      dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
      weekHeader: "Sem.",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.fr)
}), jQuery(function(e) {
  e.datepicker.regional.gl = {
      closeText: "Pechar",
      prevText: "&#x3C;Ant",
      nextText: "Seg&#x3E;",
      currentText: "Hoxe",
      monthNames: ["Xaneiro", "Febreiro", "Marzo", "Abril", "Maio", "Xuño", "Xullo", "Agosto", "Setembro", "Outubro", "Novembro", "Decembro"],
      monthNamesShort: ["Xan", "Feb", "Mar", "Abr", "Mai", "Xuñ", "Xul", "Ago", "Set", "Out", "Nov", "Dec"],
      dayNames: ["Domingo", "Luns", "Martes", "Mércores", "Xoves", "Venres", "Sábado"],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mér", "Xov", "Ven", "Sáb"],
      dayNamesMin: ["Do", "Lu", "Ma", "Mé", "Xo", "Ve", "Sá"],
      weekHeader: "Sm",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.gl)
}), jQuery(function(e) {
  e.datepicker.regional.he = {
      closeText: "סגור",
      prevText: "&#x3C;הקודם",
      nextText: "הבא&#x3E;",
      currentText: "היום",
      monthNames: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
      monthNamesShort: ["ינו", "פבר", "מרץ", "אפר", "מאי", "יוני", "יולי", "אוג", "ספט", "אוק", "נוב", "דצמ"],
      dayNames: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
      dayNamesShort: ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "שבת"],
      dayNamesMin: ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "שבת"],
      weekHeader: "Wk",
      dateFormat: "dd/mm/yy",
      firstDay: 0,
      isRTL: !0,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.he)
}), jQuery(function(e) {
  e.datepicker.regional.hi = {
      closeText: "बंद",
      prevText: "पिछला",
      nextText: "अगला",
      currentText: "आज",
      monthNames: ["जनवरी ", "फरवरी", "मार्च", "अप्रेल", "मई", "जून", "जूलाई", "अगस्त ", "सितम्बर", "अक्टूबर", "नवम्बर", "दिसम्बर"],
      monthNamesShort: ["जन", "फर", "मार्च", "अप्रेल", "मई", "जून", "जूलाई", "अग", "सित", "अक्ट", "नव", "दि"],
      dayNames: ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"],
      dayNamesShort: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
      dayNamesMin: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
      weekHeader: "हफ्ता",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.hi)
}), jQuery(function(e) {
  e.datepicker.regional.hr = {
      closeText: "Zatvori",
      prevText: "&#x3C;",
      nextText: "&#x3E;",
      currentText: "Danas",
      monthNames: ["Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"],
      monthNamesShort: ["Sij", "Velj", "Ožu", "Tra", "Svi", "Lip", "Srp", "Kol", "Ruj", "Lis", "Stu", "Pro"],
      dayNames: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"],
      dayNamesShort: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
      dayNamesMin: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"],
      weekHeader: "Tje",
      dateFormat: "dd.mm.yy.",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.hr)
}), jQuery(function(e) {
  e.datepicker.regional.hu = {
      closeText: "bezár",
      prevText: "vissza",
      nextText: "előre",
      currentText: "ma",
      monthNames: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Szep", "Okt", "Nov", "Dec"],
      dayNames: ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"],
      dayNamesShort: ["Vas", "Hét", "Ked", "Sze", "Csü", "Pén", "Szo"],
      dayNamesMin: ["V", "H", "K", "Sze", "Cs", "P", "Szo"],
      weekHeader: "Hét",
      dateFormat: "yy.mm.dd.",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !0,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.hu)
}), jQuery(function(e) {
  e.datepicker.regional.hy = {
      closeText: "Փակել",
      prevText: "&#x3C;Նախ.",
      nextText: "Հաջ.&#x3E;",
      currentText: "Այսօր",
      monthNames: ["Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"],
      monthNamesShort: ["Հունվ", "Փետր", "Մարտ", "Ապր", "Մայիս", "Հունիս", "Հուլ", "Օգս", "Սեպ", "Հոկ", "Նոյ", "Դեկ"],
      dayNames: ["կիրակի", "եկուշաբթի", "երեքշաբթի", "չորեքշաբթի", "հինգշաբթի", "ուրբաթ", "շաբաթ"],
      dayNamesShort: ["կիր", "երկ", "երք", "չրք", "հնգ", "ուրբ", "շբթ"],
      dayNamesMin: ["կիր", "երկ", "երք", "չրք", "հնգ", "ուրբ", "շբթ"],
      weekHeader: "ՇԲՏ",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.hy)
}), jQuery(function(e) {
  e.datepicker.regional.id = {
      closeText: "Tutup",
      prevText: "&#x3C;mundur",
      nextText: "maju&#x3E;",
      currentText: "hari ini",
      monthNames: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agus", "Sep", "Okt", "Nop", "Des"],
      dayNames: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
      dayNamesShort: ["Min", "Sen", "Sel", "Rab", "kam", "Jum", "Sab"],
      dayNamesMin: ["Mg", "Sn", "Sl", "Rb", "Km", "jm", "Sb"],
      weekHeader: "Mg",
      dateFormat: "dd/mm/yy",
      firstDay: 0,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.id)
}), jQuery(function(e) {
  e.datepicker.regional.is = {
      closeText: "Loka",
      prevText: "&#x3C; Fyrri",
      nextText: "Næsti &#x3E;",
      currentText: "Í dag",
      monthNames: ["Janúar", "Febrúar", "Mars", "Apríl", "Maí", "Júní", "Júlí", "Ágúst", "September", "Október", "Nóvember", "Desember"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Maí", "Jún", "Júl", "Ágú", "Sep", "Okt", "Nóv", "Des"],
      dayNames: ["Sunnudagur", "Mánudagur", "Þriðjudagur", "Miðvikudagur", "Fimmtudagur", "Föstudagur", "Laugardagur"],
      dayNamesShort: ["Sun", "Mán", "Þri", "Mið", "Fim", "Fös", "Lau"],
      dayNamesMin: ["Su", "Má", "Þr", "Mi", "Fi", "Fö", "La"],
      weekHeader: "Vika",
      dateFormat: "dd.mm.yy",
      firstDay: 0,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.is)
}), jQuery(function(e) {
  e.datepicker.regional.it = {
      closeText: "Chiudi",
      prevText: "&#x3C;Prec",
      nextText: "Succ&#x3E;",
      currentText: "Oggi",
      monthNames: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
      monthNamesShort: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
      dayNames: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
      dayNamesMin: ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa"],
      weekHeader: "Sm",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.it)
}), jQuery(function(e) {
  e.datepicker.regional.ja = {
      closeText: "閉じる",
      prevText: "&#x3C;前",
      nextText: "次&#x3E;",
      currentText: "今日",
      monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      dayNames: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
      dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
      dayNamesMin: ["日", "月", "火", "水", "木", "金", "土"],
      weekHeader: "週",
      dateFormat: "yy/mm/dd",
      firstDay: 0,
      isRTL: !1,
      showMonthAfterYear: !0,
      yearSuffix: "年"
  }, e.datepicker.setDefaults(e.datepicker.regional.ja)
}), jQuery(function(e) {
  e.datepicker.regional.ka = {
      closeText: "დახურვა",
      prevText: "&#x3c; წინა",
      nextText: "შემდეგი &#x3e;",
      currentText: "დღეს",
      monthNames: ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"],
      monthNamesShort: ["იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"],
      dayNames: ["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"],
      dayNamesShort: ["კვ", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"],
      dayNamesMin: ["კვ", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"],
      weekHeader: "კვირა",
      dateFormat: "dd-mm-yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.ka)
}), jQuery(function(e) {
  e.datepicker.regional.kk = {
      closeText: "Жабу",
      prevText: "&#x3C;Алдыңғы",
      nextText: "Келесі&#x3E;",
      currentText: "Бүгін",
      monthNames: ["Қаңтар", "Ақпан", "Наурыз", "Сәуір", "Мамыр", "Маусым", "Шілде", "Тамыз", "Қыркүйек", "Қазан", "Қараша", "Желтоқсан"],
      monthNamesShort: ["Қаң", "Ақп", "Нау", "Сәу", "Мам", "Мау", "Шіл", "Там", "Қыр", "Қаз", "Қар", "Жел"],
      dayNames: ["Жексенбі", "Дүйсенбі", "Сейсенбі", "Сәрсенбі", "Бейсенбі", "Жұма", "Сенбі"],
      dayNamesShort: ["жкс", "дсн", "ссн", "срс", "бсн", "жма", "снб"],
      dayNamesMin: ["Жк", "Дс", "Сс", "Ср", "Бс", "Жм", "Сн"],
      weekHeader: "Не",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.kk)
}), jQuery(function(e) {
  e.datepicker.regional.km = {
      closeText: "ធ្វើ​រួច",
      prevText: "មុន",
      nextText: "បន្ទាប់",
      currentText: "ថ្ងៃ​នេះ",
      monthNames: ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"],
      monthNamesShort: ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"],
      dayNames: ["អាទិត្យ", "ចន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍"],
      dayNamesShort: ["អា", "ច", "អ", "ពុ", "ព្រហ", "សុ", "សៅ"],
      dayNamesMin: ["អា", "ច", "អ", "ពុ", "ព្រហ", "សុ", "សៅ"],
      weekHeader: "សប្ដាហ៍",
      dateFormat: "dd-mm-yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.km)
}), jQuery(function(e) {
  e.datepicker.regional.ko = {
      closeText: "닫기",
      prevText: "이전달",
      nextText: "다음달",
      currentText: "오늘",
      monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
      dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
      dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
      weekHeader: "Wk",
      dateFormat: "yy-mm-dd",
      firstDay: 0,
      isRTL: !1,
      showMonthAfterYear: !0,
      yearSuffix: "년"
  }, e.datepicker.setDefaults(e.datepicker.regional.ko)
}), jQuery(function(e) {
  e.datepicker.regional.ky = {
      closeText: "Жабуу",
      prevText: "&#x3c;Мур",
      nextText: "Кий&#x3e;",
      currentText: "Бүгүн",
      monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
      dayNames: ["жекшемби", "дүйшөмбү", "шейшемби", "шаршемби", "бейшемби", "жума", "ишемби"],
      dayNamesShort: ["жек", "дүй", "шей", "шар", "бей", "жум", "ише"],
      dayNamesMin: ["Жк", "Дш", "Шш", "Шр", "Бш", "Жм", "Иш"],
      weekHeader: "Жум",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.ky)
}), jQuery(function(e) {
  e.datepicker.regional.lb = {
      closeText: "Fäerdeg",
      prevText: "Zréck",
      nextText: "Weider",
      currentText: "Haut",
      monthNames: ["Januar", "Februar", "Mäerz", "Abrëll", "Mee", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
      monthNamesShort: ["Jan", "Feb", "Mäe", "Abr", "Mee", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
      dayNames: ["Sonndeg", "Méindeg", "Dënschdeg", "Mëttwoch", "Donneschdeg", "Freideg", "Samschdeg"],
      dayNamesShort: ["Son", "Méi", "Dën", "Mët", "Don", "Fre", "Sam"],
      dayNamesMin: ["So", "Mé", "Dë", "Më", "Do", "Fr", "Sa"],
      weekHeader: "W",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.lb)
}), jQuery(function(e) {
  e.datepicker.regional.lt = {
      closeText: "Uždaryti",
      prevText: "&#x3C;Atgal",
      nextText: "Pirmyn&#x3E;",
      currentText: "Šiandien",
      monthNames: ["Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"],
      monthNamesShort: ["Sau", "Vas", "Kov", "Bal", "Geg", "Bir", "Lie", "Rugp", "Rugs", "Spa", "Lap", "Gru"],
      dayNames: ["sekmadienis", "pirmadienis", "antradienis", "trečiadienis", "ketvirtadienis", "penktadienis", "šeštadienis"],
      dayNamesShort: ["sek", "pir", "ant", "tre", "ket", "pen", "šeš"],
      dayNamesMin: ["Se", "Pr", "An", "Tr", "Ke", "Pe", "Še"],
      weekHeader: "SAV",
      dateFormat: "yy-mm-dd",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !0,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.lt)
}), jQuery(function(e) {
  e.datepicker.regional.lv = {
      closeText: "Aizvērt",
      prevText: "Iepr.",
      nextText: "Nāk.",
      currentText: "Šodien",
      monthNames: ["Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jūn", "Jūl", "Aug", "Sep", "Okt", "Nov", "Dec"],
      dayNames: ["svētdiena", "pirmdiena", "otrdiena", "trešdiena", "ceturtdiena", "piektdiena", "sestdiena"],
      dayNamesShort: ["svt", "prm", "otr", "tre", "ctr", "pkt", "sst"],
      dayNamesMin: ["Sv", "Pr", "Ot", "Tr", "Ct", "Pk", "Ss"],
      weekHeader: "Ned.",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.lv)
}), jQuery(function(e) {
  e.datepicker.regional.mk = {
      closeText: "Затвори",
      prevText: "&#x3C;",
      nextText: "&#x3E;",
      currentText: "Денес",
      monthNames: ["Јануари", "Февруари", "Март", "Април", "Мај", "Јуни", "Јули", "Август", "Септември", "Октомври", "Ноември", "Декември"],
      monthNamesShort: ["Јан", "Фев", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Ное", "Дек"],
      dayNames: ["Недела", "Понеделник", "Вторник", "Среда", "Четврток", "Петок", "Сабота"],
      dayNamesShort: ["Нед", "Пон", "Вто", "Сре", "Чет", "Пет", "Саб"],
      dayNamesMin: ["Не", "По", "Вт", "Ср", "Че", "Пе", "Са"],
      weekHeader: "Сед",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.mk)
}), jQuery(function(e) {
  e.datepicker.regional.ml = {
      closeText: "ശരി",
      prevText: "മുന്നത്തെ",
      nextText: "അടുത്തത് ",
      currentText: "ഇന്ന്",
      monthNames: ["ജനുവരി", "ഫെബ്രുവരി", "മാര്‍ച്ച്", "ഏപ്രില്‍", "മേയ്", "ജൂണ്‍", "ജൂലൈ", "ആഗസ്റ്റ്", "സെപ്റ്റംബര്‍", "ഒക്ടോബര്‍", "നവംബര്‍", "ഡിസംബര്‍"],
      monthNamesShort: ["ജനു", "ഫെബ്", "മാര്‍", "ഏപ്രി", "മേയ്", "ജൂണ്‍", "ജൂലാ", "ആഗ", "സെപ്", "ഒക്ടോ", "നവം", "ഡിസ"],
      dayNames: ["ഞായര്‍", "തിങ്കള്‍", "ചൊവ്വ", "ബുധന്‍", "വ്യാഴം", "വെള്ളി", "ശനി"],
      dayNamesShort: ["ഞായ", "തിങ്ക", "ചൊവ്വ", "ബുധ", "വ്യാഴം", "വെള്ളി", "ശനി"],
      dayNamesMin: ["ഞാ", "തി", "ചൊ", "ബു", "വ്യാ", "വെ", "ശ"],
      weekHeader: "ആ",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.ml)
}), jQuery(function(e) {
  e.datepicker.regional.ms = {
      closeText: "Tutup",
      prevText: "&#x3C;Sebelum",
      nextText: "Selepas&#x3E;",
      currentText: "hari ini",
      monthNames: ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"],
      monthNamesShort: ["Jan", "Feb", "Mac", "Apr", "Mei", "Jun", "Jul", "Ogo", "Sep", "Okt", "Nov", "Dis"],
      dayNames: ["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"],
      dayNamesShort: ["Aha", "Isn", "Sel", "Rab", "kha", "Jum", "Sab"],
      dayNamesMin: ["Ah", "Is", "Se", "Ra", "Kh", "Ju", "Sa"],
      weekHeader: "Mg",
      dateFormat: "dd/mm/yy",
      firstDay: 0,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.ms)
}), jQuery(function(e) {
  e.datepicker.regional.nb = {
      closeText: "Lukk",
      prevText: "&#xAB;Forrige",
      nextText: "Neste&#xBB;",
      currentText: "I dag",
      monthNames: ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"],
      monthNamesShort: ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"],
      dayNamesShort: ["søn", "man", "tir", "ons", "tor", "fre", "lør"],
      dayNames: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"],
      dayNamesMin: ["sø", "ma", "ti", "on", "to", "fr", "lø"],
      weekHeader: "Uke",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.nb)
}), jQuery(function(e) {
  e.datepicker.regional["nl-BE"] = {
      closeText: "Sluiten",
      prevText: "←",
      nextText: "→",
      currentText: "Vandaag",
      monthNames: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
      monthNamesShort: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
      dayNames: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
      dayNamesShort: ["zon", "maa", "din", "woe", "don", "vri", "zat"],
      dayNamesMin: ["zo", "ma", "di", "wo", "do", "vr", "za"],
      weekHeader: "Wk",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional["nl-BE"])
}), jQuery(function(e) {
  e.datepicker.regional.nl = {
      closeText: "Sluiten",
      prevText: "←",
      nextText: "→",
      currentText: "Vandaag",
      monthNames: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
      monthNamesShort: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
      dayNames: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
      dayNamesShort: ["zon", "maa", "din", "woe", "don", "vri", "zat"],
      dayNamesMin: ["zo", "ma", "di", "wo", "do", "vr", "za"],
      weekHeader: "Wk",
      dateFormat: "dd-mm-yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.nl)
}), jQuery(function(e) {
  e.datepicker.regional.nn = {
      closeText: "Lukk",
      prevText: "&#xAB;Førre",
      nextText: "Neste&#xBB;",
      currentText: "I dag",
      monthNames: ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"],
      monthNamesShort: ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"],
      dayNamesShort: ["sun", "mån", "tys", "ons", "tor", "fre", "lau"],
      dayNames: ["sundag", "måndag", "tysdag", "onsdag", "torsdag", "fredag", "laurdag"],
      dayNamesMin: ["su", "må", "ty", "on", "to", "fr", "la"],
      weekHeader: "Veke",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.nn)
}), jQuery(function(e) {
  e.datepicker.regional.no = {
      closeText: "Lukk",
      prevText: "&#xAB;Forrige",
      nextText: "Neste&#xBB;",
      currentText: "I dag",
      monthNames: ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"],
      monthNamesShort: ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"],
      dayNamesShort: ["søn", "man", "tir", "ons", "tor", "fre", "lør"],
      dayNames: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"],
      dayNamesMin: ["sø", "ma", "ti", "on", "to", "fr", "lø"],
      weekHeader: "Uke",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.no)
}), jQuery(function(e) {
  e.datepicker.regional.pl = {
      closeText: "Zamknij",
      prevText: "&#x3C;Poprzedni",
      nextText: "Następny&#x3E;",
      currentText: "Dziś",
      monthNames: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
      monthNamesShort: ["Sty", "Lu", "Mar", "Kw", "Maj", "Cze", "Lip", "Sie", "Wrz", "Pa", "Lis", "Gru"],
      dayNames: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
      dayNamesShort: ["Nie", "Pn", "Wt", "Śr", "Czw", "Pt", "So"],
      dayNamesMin: ["N", "Pn", "Wt", "Śr", "Cz", "Pt", "So"],
      weekHeader: "Tydz",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.pl)
}), jQuery(function(e) {
  e.datepicker.regional["pt-BR"] = {
      closeText: "Fechar",
      prevText: "&#x3C;Anterior",
      nextText: "Próximo&#x3E;",
      currentText: "Hoje",
      monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      dayNames: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      weekHeader: "Sm",
      dateFormat: "dd/mm/yy",
      firstDay: 0,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional["pt-BR"])
}), jQuery(function(e) {
  e.datepicker.regional.pt = {
      closeText: "Fechar",
      prevText: "Anterior",
      nextText: "Seguinte",
      currentText: "Hoje",
      monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      dayNames: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      weekHeader: "Sem",
      dateFormat: "dd/mm/yy",
      firstDay: 0,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.pt)
}), jQuery(function(e) {
  e.datepicker.regional.rm = {
      closeText: "Serrar",
      prevText: "&#x3C;Suandant",
      nextText: "Precedent&#x3E;",
      currentText: "Actual",
      monthNames: ["Schaner", "Favrer", "Mars", "Avrigl", "Matg", "Zercladur", "Fanadur", "Avust", "Settember", "October", "November", "December"],
      monthNamesShort: ["Scha", "Fev", "Mar", "Avr", "Matg", "Zer", "Fan", "Avu", "Sett", "Oct", "Nov", "Dec"],
      dayNames: ["Dumengia", "Glindesdi", "Mardi", "Mesemna", "Gievgia", "Venderdi", "Sonda"],
      dayNamesShort: ["Dum", "Gli", "Mar", "Mes", "Gie", "Ven", "Som"],
      dayNamesMin: ["Du", "Gl", "Ma", "Me", "Gi", "Ve", "So"],
      weekHeader: "emna",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.rm)
}), jQuery(function(e) {
  e.datepicker.regional.ro = {
      closeText: "Închide",
      prevText: "&#xAB; Luna precedentă",
      nextText: "Luna următoare &#xBB;",
      currentText: "Azi",
      monthNames: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
      monthNamesShort: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      dayNames: ["Duminică", "Luni", "Marţi", "Miercuri", "Joi", "Vineri", "Sâmbătă"],
      dayNamesShort: ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm"],
      dayNamesMin: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"],
      weekHeader: "Săpt",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.ro)
}), jQuery(function(e) {
  e.datepicker.regional.ru = {
      closeText: "Закрыть",
      prevText: "&#x3C;Пред",
      nextText: "След&#x3E;",
      currentText: "Сегодня",
      monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
      dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
      dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
      dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      weekHeader: "Нед",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.ru)
}), jQuery(function(e) {
  e.datepicker.regional.sk = {
      closeText: "Zavrieť",
      prevText: "&#x3C;Predchádzajúci",
      nextText: "Nasledujúci&#x3E;",
      currentText: "Dnes",
      monthNames: ["január", "február", "marec", "apríl", "máj", "jún", "júl", "august", "september", "október", "november", "december"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Máj", "Jún", "Júl", "Aug", "Sep", "Okt", "Nov", "Dec"],
      dayNames: ["nedeľa", "pondelok", "utorok", "streda", "štvrtok", "piatok", "sobota"],
      dayNamesShort: ["Ned", "Pon", "Uto", "Str", "Štv", "Pia", "Sob"],
      dayNamesMin: ["Ne", "Po", "Ut", "St", "Št", "Pia", "So"],
      weekHeader: "Ty",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.sk)
}), jQuery(function(e) {
  e.datepicker.regional.sl = {
      closeText: "Zapri",
      prevText: "&#x3C;Prejšnji",
      nextText: "Naslednji&#x3E;",
      currentText: "Trenutni",
      monthNames: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
      dayNames: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"],
      dayNamesShort: ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"],
      dayNamesMin: ["Ne", "Po", "To", "Sr", "Če", "Pe", "So"],
      weekHeader: "Teden",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.sl)
}), jQuery(function(e) {
  e.datepicker.regional.sq = {
      closeText: "mbylle",
      prevText: "&#x3C;mbrapa",
      nextText: "Përpara&#x3E;",
      currentText: "sot",
      monthNames: ["Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor"],
      monthNamesShort: ["Jan", "Shk", "Mar", "Pri", "Maj", "Qer", "Kor", "Gus", "Sht", "Tet", "Nën", "Dhj"],
      dayNames: ["E Diel", "E Hënë", "E Martë", "E Mërkurë", "E Enjte", "E Premte", "E Shtune"],
      dayNamesShort: ["Di", "Hë", "Ma", "Më", "En", "Pr", "Sh"],
      dayNamesMin: ["Di", "Hë", "Ma", "Më", "En", "Pr", "Sh"],
      weekHeader: "Ja",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.sq)
}), jQuery(function(e) {
  e.datepicker.regional["sr-SR"] = {
      closeText: "Zatvori",
      prevText: "&#x3C;",
      nextText: "&#x3E;",
      currentText: "Danas",
      monthNames: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
      dayNames: ["Nedelja", "Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"],
      dayNamesShort: ["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub"],
      dayNamesMin: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"],
      weekHeader: "Sed",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional["sr-SR"])
}), jQuery(function(e) {
  e.datepicker.regional.sr = {
      closeText: "Затвори",
      prevText: "&#x3C;",
      nextText: "&#x3E;",
      currentText: "Данас",
      monthNames: ["Јануар", "Фебруар", "Март", "Април", "Мај", "Јун", "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар"],
      monthNamesShort: ["Јан", "Феб", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Нов", "Дец"],
      dayNames: ["Недеља", "Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"],
      dayNamesShort: ["Нед", "Пон", "Уто", "Сре", "Чет", "Пет", "Суб"],
      dayNamesMin: ["Не", "По", "Ут", "Ср", "Че", "Пе", "Су"],
      weekHeader: "Сед",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.sr)
}), jQuery(function(e) {
  e.datepicker.regional.sv = {
      closeText: "Stäng",
      prevText: "&#xAB;Förra",
      nextText: "Nästa&#xBB;",
      currentText: "Idag",
      monthNames: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
      dayNamesShort: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"],
      dayNames: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"],
      dayNamesMin: ["Sö", "Må", "Ti", "On", "To", "Fr", "Lö"],
      weekHeader: "Ve",
      dateFormat: "yy-mm-dd",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.sv)
}), jQuery(function(e) {
  e.datepicker.regional.ta = {
      closeText: "மூடு",
      prevText: "முன்னையது",
      nextText: "அடுத்தது",
      currentText: "இன்று",
      monthNames: ["தை", "மாசி", "பங்குனி", "சித்திரை", "வைகாசி", "ஆனி", "ஆடி", "ஆவணி", "புரட்டாசி", "ஐப்பசி", "கார்த்திகை", "மார்கழி"],
      monthNamesShort: ["தை", "மாசி", "பங்", "சித்", "வைகா", "ஆனி", "ஆடி", "ஆவ", "புர", "ஐப்", "கார்", "மார்"],
      dayNames: ["ஞாயிற்றுக்கிழமை", "திங்கட்கிழமை", "செவ்வாய்க்கிழமை", "புதன்கிழமை", "வியாழக்கிழமை", "வெள்ளிக்கிழமை", "சனிக்கிழமை"],
      dayNamesShort: ["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"],
      dayNamesMin: ["ஞா", "தி", "செ", "பு", "வி", "வெ", "ச"],
      weekHeader: "Не",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.ta)
}), jQuery(function(e) {
  e.datepicker.regional.th = {
      closeText: "ปิด",
      prevText: "&#xAB;&#xA0;ย้อน",
      nextText: "ถัดไป&#xA0;&#xBB;",
      currentText: "วันนี้",
      monthNames: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
      monthNamesShort: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."],
      dayNames: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"],
      dayNamesShort: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
      dayNamesMin: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
      weekHeader: "Wk",
      dateFormat: "dd/mm/yy",
      firstDay: 0,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.th)
}), jQuery(function(e) {
  e.datepicker.regional.tj = {
      closeText: "Идома",
      prevText: "&#x3c;Қафо",
      nextText: "Пеш&#x3e;",
      currentText: "Имрӯз",
      monthNames: ["Январ", "Феврал", "Март", "Апрел", "Май", "Июн", "Июл", "Август", "Сентябр", "Октябр", "Ноябр", "Декабр"],
      monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
      dayNames: ["якшанбе", "душанбе", "сешанбе", "чоршанбе", "панҷшанбе", "ҷумъа", "шанбе"],
      dayNamesShort: ["якш", "душ", "сеш", "чор", "пан", "ҷум", "шан"],
      dayNamesMin: ["Як", "Дш", "Сш", "Чш", "Пш", "Ҷм", "Шн"],
      weekHeader: "Хф",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.tj)
}), jQuery(function(e) {
  e.datepicker.regional.tr = {
      closeText: "kapat",
      prevText: "&#x3C;geri",
      nextText: "ileri&#x3e",
      currentText: "bugün",
      monthNames: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
      monthNamesShort: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
      dayNames: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
      dayNamesShort: ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],
      dayNamesMin: ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],
      weekHeader: "Hf",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.tr)
}), jQuery(function(e) {
  e.datepicker.regional.uk = {
      closeText: "Закрити",
      prevText: "&#x3C;",
      nextText: "&#x3E;",
      currentText: "Сьогодні",
      monthNames: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
      monthNamesShort: ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"],
      dayNames: ["неділя", "понеділок", "вівторок", "середа", "четвер", "п’ятниця", "субота"],
      dayNamesShort: ["нед", "пнд", "вів", "срд", "чтв", "птн", "сбт"],
      dayNamesMin: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      weekHeader: "Тиж",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.uk)
}), jQuery(function(e) {
  e.datepicker.regional.vi = {
      closeText: "Đóng",
      prevText: "&#x3C;Trước",
      nextText: "Tiếp&#x3E;",
      currentText: "Hôm nay",
      monthNames: ["Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu", "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"],
      monthNamesShort: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
      dayNames: ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"],
      dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      weekHeader: "Tu",
      dateFormat: "dd/mm/yy",
      firstDay: 0,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
  }, e.datepicker.setDefaults(e.datepicker.regional.vi)
}), jQuery(function(e) {
  e.datepicker.regional["zh-CN"] = {
      closeText: "关闭",
      prevText: "&#x3C;上月",
      nextText: "下月&#x3E;",
      currentText: "今天",
      monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
      weekHeader: "周",
      dateFormat: "yy-mm-dd",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !0,
      yearSuffix: "年"
  }, e.datepicker.setDefaults(e.datepicker.regional["zh-CN"])
}), jQuery(function(e) {
  e.datepicker.regional["zh-HK"] = {
      closeText: "關閉",
      prevText: "&#x3C;上月",
      nextText: "下月&#x3E;",
      currentText: "今天",
      monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
      weekHeader: "周",
      dateFormat: "dd-mm-yy",
      firstDay: 0,
      isRTL: !1,
      showMonthAfterYear: !0,
      yearSuffix: "年"
  }, e.datepicker.setDefaults(e.datepicker.regional["zh-HK"])
}), jQuery(function(e) {
  e.datepicker.regional["zh-TW"] = {
      closeText: "關閉",
      prevText: "&#x3C;上月",
      nextText: "下月&#x3E;",
      currentText: "今天",
      monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
      weekHeader: "周",
      dateFormat: "yy/mm/dd",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !0,
      yearSuffix: "年"
  }, e.datepicker.setDefaults(e.datepicker.regional["zh-TW"])
});;
/*** Script File: /f/js/jquery.flexslider.js, Original size: 53,434, Compressed size: 30,231 ***/
(function($) {
  $.flexslider = function(el, options) {
      var slider = $(el);
      slider.vars = $.extend({}, $.flexslider.defaults, options);
      var namespace = slider.vars.namespace,
          msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
          touch = (("ontouchstart" in window) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
          eventType = "click touchend MSPointerUp keyup",
          watchedEvent = "",
          watchedEventClearTimer, vertical = slider.vars.direction === "vertical",
          reverse = slider.vars.reverse,
          carousel = (slider.vars.itemWidth > 0),
          fade = slider.vars.animation === "fade",
          asNav = slider.vars.asNavFor !== "",
          methods = {},
          focused = true;
      $.data(el, "flexslider", slider);
      methods = {
          init: function() {
              slider.animating = false;
              slider.currentSlide = parseInt((slider.vars.startAt ? slider.vars.startAt : 0), 10);
              if (isNaN(slider.currentSlide)) slider.currentSlide = 0;
              slider.animatingTo = slider.currentSlide;
              slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
              slider.containerSelector = slider.vars.selector.substr(0, slider.vars.selector.search(' '));
              slider.slides = $(slider.vars.selector, slider);
              slider.container = $(slider.containerSelector, slider);
              slider.count = slider.slides.length;
              slider.syncExists = $(slider.vars.sync).length > 0;
              if (slider.vars.animation === "slide") slider.vars.animation = "swing";
              slider.prop = vertical ? "top" : "marginLeft";
              slider.args = {};
              slider.manualPause = false;
              slider.stopped = false;
              slider.started = false;
              slider.startTimeout = null;
              slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
                  var obj = document.createElement('div'),
                      props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
                  for (var i in props)
                      if (obj.style[props[i]] !== undefined) {
                          slider.pfx = props[i].replace('Perspective', '').toLowerCase();
                          slider.prop = "-" + slider.pfx + "-transform";
                          return true
                      };
                  return false
              }());
              slider.ensureAnimationEnd = '';
              if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
              if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);
              if (slider.vars.randomize) {
                  slider.slides.sort(function() {
                      return (Math.round(Math.random()) - 0.5)
                  });
                  slider.container.empty().append(slider.slides)
              };
              slider.doMath();
              slider.setup("init");
              if (slider.vars.controlNav) methods.controlNav.setup();
              if (slider.vars.directionNav) methods.directionNav.setup();
              if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) $(document).bind('keyup', function(event) {
                  var keycode = event.keyCode;
                  if (!slider.animating && (keycode === 39 || keycode === 37)) {
                      var target = (keycode === 39) ? slider.getTarget('next') : (keycode === 37) ? slider.getTarget('prev') : false;
                      slider.flexAnimate(target, slider.vars.pauseOnAction)
                  }
              });
              if (slider.vars.mousewheel) slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
                  event.preventDefault();
                  var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
                  slider.flexAnimate(target, slider.vars.pauseOnAction)
              });
              if (slider.vars.pausePlay) methods.pausePlay.setup();
              if (slider.vars.slideshow && slider.vars.pauseInvisible) methods.pauseInvisible.init();
              if (slider.vars.slideshow) {
                  if (slider.vars.pauseOnHover) slider.hover(function() {
                      if (!slider.manualPlay && !slider.manualPause) slider.pause()
                  }, function() {
                      if (!slider.manualPause && !slider.manualPlay && !slider.stopped) slider.play()
                  });
                  if (!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden())(slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play()
              };
              if (asNav) methods.asNav.setup();
              if (touch && slider.vars.touch) methods.touch();
              if (!fade || (fade && slider.vars.smoothHeight)) $(window).bind("resize orientationchange focus", methods.resize);
              slider.find("img").attr("draggable", "false");
              setTimeout(function() {
                  slider.vars.start(slider)
              }, 200)
          },
          asNav: {
              setup: function() {
                  slider.asNav = true;
                  slider.animatingTo = Math.floor(slider.currentSlide / slider.move);
                  slider.currentItem = slider.currentSlide;
                  slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
                  if (!msGesture) {
                      slider.slides.on(eventType, function(e) {
                          e.preventDefault();
                          var $slide = $(this),
                              target = $slide.index(),
                              posFromLeft = $slide.offset().left - $(slider).scrollLeft();
                          if (posFromLeft <= 0 && $slide.hasClass(namespace + 'active-slide')) {
                              slider.flexAnimate(slider.getTarget("prev"), true)
                          } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                              slider.direction = (slider.currentItem < target) ? "next" : "prev";
                              slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true)
                          }
                      })
                  } else {
                      el._slider = slider;
                      slider.slides.each(function() {
                          var that = this;
                          that._gesture = new MSGesture();
                          that._gesture.target = that;
                          that.addEventListener("MSPointerDown", function(e) {
                              e.preventDefault();
                              if (e.currentTarget._gesture) e.currentTarget._gesture.addPointer(e.pointerId)
                          }, false);
                          that.addEventListener("MSGestureTap", function(e) {
                              e.preventDefault();
                              var $slide = $(this),
                                  target = $slide.index();
                              if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                                  slider.direction = (slider.currentItem < target) ? "next" : "prev";
                                  slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true)
                              }
                          })
                      })
                  }
              }
          },
          controlNav: {
              setup: function() {
                  if (!slider.manualControls) {
                      methods.controlNav.setupPaging()
                  } else methods.controlNav.setupManual()
              },
              setupPaging: function() {
                  var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
                      j = 1,
                      item, slide;
                  slider.controlNavScaffold = $('<ol class="' + namespace + 'control-nav ' + namespace + type + '"></ol>');
                  if (slider.pagingCount > 1)
                      for (var i = 0; i < slider.pagingCount; i++) {
                          slide = slider.slides.eq(i);
                          item = (slider.vars.controlNav === "thumbnails") ? '<img src="' + slide.attr('data-thumb') + '"/>' : '<a>' + j + '</a>';
                          if ('thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions) {
                              var captn = slide.attr('data-thumbcaption');
                              if ('' != captn && undefined != captn) item += '<span class="' + namespace + 'caption">' + captn + '</span>'
                          };
                          slider.controlNavScaffold.append('<li>' + item + '</li>');
                          j++
                      };
                  (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold): slider.append(slider.controlNavScaffold);
                  methods.controlNav.set();
                  methods.controlNav.active();
                  slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
                      event.preventDefault();
                      if (watchedEvent === "" || watchedEvent === event.type) {
                          var $this = $(this),
                              target = slider.controlNav.index($this);
                          if (!$this.hasClass(namespace + 'active')) {
                              slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                              slider.flexAnimate(target, slider.vars.pauseOnAction)
                          }
                      };
                      if (watchedEvent === "") watchedEvent = event.type;
                      methods.setToClearWatchedEvent()
                  })
              },
              setupManual: function() {
                  slider.controlNav = slider.manualControls;
                  methods.controlNav.active();
                  slider.controlNav.bind(eventType, function(event) {
                      event.preventDefault();
                      if (watchedEvent === "" || watchedEvent === event.type) {
                          var $this = $(this),
                              target = slider.controlNav.index($this);
                          if (!$this.hasClass(namespace + 'active')) {
                              (target > slider.currentSlide) ? slider.direction = "next": slider.direction = "prev";
                              slider.flexAnimate(target, slider.vars.pauseOnAction)
                          }
                      };
                      if (watchedEvent === "") watchedEvent = event.type;
                      methods.setToClearWatchedEvent()
                  })
              },
              set: function() {
                  var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
                  slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider)
              },
              active: function() {
                  slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active")
              },
              update: function(action, pos) {
                  if (slider.pagingCount > 1 && action === "add") {
                      slider.controlNavScaffold.append($('<li><a>' + slider.count + '</a></li>'))
                  } else if (slider.pagingCount === 1) {
                      slider.controlNavScaffold.find('li').remove()
                  } else slider.controlNav.eq(pos).closest('li').remove();
                  methods.controlNav.set();
                  (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action): methods.controlNav.active()
              }
          },
          directionNav: {
              setup: function() {
                  var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');
                  if (slider.controlsContainer) {
                      $(slider.controlsContainer).append(directionNavScaffold);
                      slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer)
                  } else {
                      slider.append(directionNavScaffold);
                      slider.directionNav = $('.' + namespace + 'direction-nav li a', slider)
                  };
                  methods.directionNav.update();
                  slider.directionNav.bind(eventType, function(event) {
                      event.preventDefault();
                      var target;
                      if (watchedEvent === "" || watchedEvent === event.type) {
                          target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
                          slider.flexAnimate(target, slider.vars.pauseOnAction)
                      };
                      if (watchedEvent === "") watchedEvent = event.type;
                      methods.setToClearWatchedEvent()
                  })
              },
              update: function() {
                  var disabledClass = namespace + 'disabled';
                  if (slider.pagingCount === 1) {
                      slider.directionNav.addClass(disabledClass).attr('tabindex', '-1')
                  } else if (!slider.vars.animationLoop) {
                      if (slider.animatingTo === 0) {
                          slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1')
                      } else if (slider.animatingTo === slider.last) {
                          slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1')
                      } else slider.directionNav.removeClass(disabledClass).removeAttr('tabindex')
                  } else slider.directionNav.removeClass(disabledClass).removeAttr('tabindex')
              }
          },
          pausePlay: {
              setup: function() {
                  var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a></a></div>');
                  if (slider.controlsContainer) {
                      slider.controlsContainer.append(pausePlayScaffold);
                      slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer)
                  } else {
                      slider.append(pausePlayScaffold);
                      slider.pausePlay = $('.' + namespace + 'pauseplay a', slider)
                  };
                  methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');
                  slider.pausePlay.bind(eventType, function(event) {
                      event.preventDefault();
                      if (watchedEvent === "" || watchedEvent === event.type)
                          if ($(this).hasClass(namespace + 'pause')) {
                              slider.manualPause = true;
                              slider.manualPlay = false;
                              slider.pause()
                          } else {
                              slider.manualPause = false;
                              slider.manualPlay = true;
                              slider.play()
                          };
                      if (watchedEvent === "") watchedEvent = event.type;
                      methods.setToClearWatchedEvent()
                  })
              },
              update: function(state) {
                  (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText): slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText)
              }
          },
          touch: function() {
              var startX, startY, offset, cwidth, dx, startT, scrolling = false,
                  localX = 0,
                  localY = 0,
                  accDx = 0;
              if (!msGesture) {
                  el.addEventListener('touchstart', onTouchStart, false);

                  function onTouchStart(e) {
                      if (slider.animating) {
                          e.preventDefault()
                      } else if ((window.navigator.msPointerEnabled) || e.touches.length === 1) {
                          slider.pause();
                          cwidth = vertical ? slider.h : slider.w;
                          startT = Number(new Date());
                          localX = e.touches[0].pageX;
                          localY = e.touches[0].pageY;
                          offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 : (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) : (carousel && slider.currentSlide === slider.last) ? slider.limit : carousel ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide : reverse ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                          startX = vertical ? localY : localX;
                          startY = vertical ? localX : localY;
                          el.addEventListener('touchmove', onTouchMove, false);
                          el.addEventListener('touchend', onTouchEnd, false)
                      }
                  };

                  function onTouchMove(e) {
                      localX = e.touches[0].pageX;
                      localY = e.touches[0].pageY;
                      dx = vertical ? startX - localY : startX - localX;
                      scrolling = vertical ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));
                      var fxms = 500;
                      if (!scrolling || Number(new Date()) - startT > fxms) {
                          e.preventDefault();
                          if (!fade && slider.transitions) {
                              if (!slider.vars.animationLoop) dx = dx / ((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx) / cwidth + 2) : 1);
                              slider.setProps(offset + dx, "setTouch")
                          }
                      }
                  };

                  function onTouchEnd(e) {
                      el.removeEventListener('touchmove', onTouchMove, false);
                      if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                          var updateDx = reverse ? -dx : dx,
                              target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');
                          if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2)) {
                              slider.flexAnimate(target, slider.vars.pauseOnAction)
                          } else if (!fade) slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true)
                      };
                      el.removeEventListener('touchend', onTouchEnd, false);
                      startX = null;
                      startY = null;
                      dx = null;
                      offset = null
                  }
              } else {
                  el.style.msTouchAction = "none";
                  el._gesture = new MSGesture();
                  el._gesture.target = el;
                  el.addEventListener("MSPointerDown", onMSPointerDown, false);
                  el._slider = slider;
                  el.addEventListener("MSGestureChange", onMSGestureChange, false);
                  el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

                  function onMSPointerDown(e) {
                      e.stopPropagation();
                      if (slider.animating) {
                          e.preventDefault()
                      } else {
                          slider.pause();
                          el._gesture.addPointer(e.pointerId);
                          accDx = 0;
                          cwidth = vertical ? slider.h : slider.w;
                          startT = Number(new Date());
                          offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 : (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) : (carousel && slider.currentSlide === slider.last) ? slider.limit : carousel ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide : reverse ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth
                      }
                  };

                  function onMSGestureChange(e) {
                      e.stopPropagation();
                      var slider = e.target._slider;
                      if (!slider) return;
                      var transX = -e.translationX,
                          transY = -e.translationY;
                      accDx = accDx + (vertical ? transY : transX);
                      dx = accDx;
                      scrolling = vertical ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));
                      if (e.detail === e.MSGESTURE_FLAG_INERTIA) {
                          setImmediate(function() {
                              el._gesture.stop()
                          });
                          return
                      };
                      if (!scrolling || Number(new Date()) - startT > 500) {
                          e.preventDefault();
                          if (!fade && slider.transitions) {
                              if (!slider.vars.animationLoop) dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                              slider.setProps(offset + dx, "setTouch")
                          }
                      }
                  };

                  function onMSGestureEnd(e) {
                      e.stopPropagation();
                      var slider = e.target._slider;
                      if (!slider) return;
                      if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                          var updateDx = reverse ? -dx : dx,
                              target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');
                          if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2)) {
                              slider.flexAnimate(target, slider.vars.pauseOnAction)
                          } else if (!fade) slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true)
                      };
                      startX = null;
                      startY = null;
                      dx = null;
                      offset = null;
                      accDx = 0
                  }
              }
          },
          resize: function() {
              if (!slider.animating && slider.is(':visible')) {
                  if (!carousel) slider.doMath();
                  if (fade) {
                      methods.smoothHeight()
                  } else if (carousel) {
                      slider.slides.width(slider.computedW);
                      slider.update(slider.pagingCount);
                      slider.setProps()
                  } else if (vertical) {
                      slider.viewport.height(slider.h);
                      slider.setProps(slider.h, "setTotal")
                  } else {
                      if (slider.vars.smoothHeight) methods.smoothHeight();
                      slider.newSlides.width(slider.computedW);
                      slider.setProps(slider.computedW, "setTotal")
                  }
              }
          },
          smoothHeight: function(dur) {
              if (!vertical || fade) {
                  var $obj = fade ? slider : slider.viewport;
                  dur ? $obj.animate({
                      height: slider.slides.eq(slider.animatingTo).height()
                  }, dur) : $obj.height(slider.slides.eq(slider.animatingTo).height())
              }
          },
          sync: function(action) {
              var $obj = $(slider.vars.sync).data("flexslider"),
                  target = slider.animatingTo;
              switch (action) {
                  case "animate":
                      $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true);
                      break;
                  case "play":
                      if (!$obj.playing && !$obj.asNav) $obj.play();
                      break;
                  case "pause":
                      $obj.pause();
                      break
              }
          },
          uniqueID: function($clone) {
              $clone.filter('[id]').add($clone.find('[id]')).each(function() {
                  var $this = $(this);
                  $this.attr('id', $this.attr('id') + '_clone')
              });
              return $clone
          },
          pauseInvisible: {
              visProp: null,
              init: function() {
                  var prefixes = ['webkit', 'moz', 'ms', 'o'];
                  if ('hidden' in document) return 'hidden';
                  for (var i = 0; i < prefixes.length; i++)
                      if ((prefixes[i] + 'Hidden') in document) methods.pauseInvisible.visProp = prefixes[i] + 'Hidden';
                  if (methods.pauseInvisible.visProp) {
                      var evtname = methods.pauseInvisible.visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
                      document.addEventListener(evtname, function() {
                          if (methods.pauseInvisible.isHidden()) {
                              if (slider.startTimeout) {
                                  clearTimeout(slider.startTimeout)
                              } else slider.pause()
                          } else if (slider.started) {
                              slider.play()
                          } else(slider.vars.initDelay > 0) ? setTimeout(slider.play, slider.vars.initDelay) : slider.play()
                      })
                  }
              },
              isHidden: function() {
                  return document[methods.pauseInvisible.visProp] || false
              }
          },
          setToClearWatchedEvent: function() {
              clearTimeout(watchedEventClearTimer);
              watchedEventClearTimer = setTimeout(function() {
                  watchedEvent = ""
              }, 3e3)
          }
      };
      slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
          if (!slider.vars.animationLoop && target !== slider.currentSlide) slider.direction = (target > slider.currentSlide) ? "next" : "prev";
          if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";
          if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
              if (asNav && withSync) {
                  var master = $(slider.vars.asNavFor).data('flexslider');
                  slider.atEnd = target === 0 || target === slider.count - 1;
                  master.flexAnimate(target, true, false, true, fromNav);
                  slider.direction = (slider.currentItem < target) ? "next" : "prev";
                  master.direction = slider.direction;
                  if (Math.ceil((target + 1) / slider.visible) - 1 !== slider.currentSlide && target !== 0) {
                      slider.currentItem = target;
                      slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
                      target = Math.floor(target / slider.visible)
                  } else {
                      slider.currentItem = target;
                      slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
                      return false
                  }
              };
              slider.animating = true;
              slider.animatingTo = target;
              if (pause) slider.pause();
              slider.vars.before(slider);
              if (slider.syncExists && !fromNav) methods.sync("animate");
              if (slider.vars.controlNav) methods.controlNav.active();
              if (!carousel) slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');
              slider.atEnd = target === 0 || target === slider.last;
              if (slider.vars.directionNav) methods.directionNav.update();
              if (target === slider.last) {
                  slider.vars.end(slider);
                  if (!slider.vars.animationLoop) slider.pause()
              };
              if (!fade) {
                  var dimension = vertical ? slider.slides.filter(':first').height() : slider.computedW,
                      margin, slideString, calcNext;
                  if (carousel) {
                      margin = slider.vars.itemMargin;
                      calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
                      slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext
                  } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
                      slideString = reverse ? (slider.count + slider.cloneOffset) * dimension : 0
                  } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
                      slideString = reverse ? 0 : (slider.count + 1) * dimension
                  } else slideString = reverse ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
                  slider.setProps(slideString, "", slider.vars.animationSpeed);
                  if (slider.transitions) {
                      if (!slider.vars.animationLoop || !slider.atEnd) {
                          slider.animating = false;
                          slider.currentSlide = slider.animatingTo
                      };
                      slider.container.unbind("webkitTransitionEnd transitionend");
                      slider.container.bind("webkitTransitionEnd transitionend", function() {
                          clearTimeout(slider.ensureAnimationEnd);
                          slider.wrapup(dimension)
                      });
                      clearTimeout(slider.ensureAnimationEnd);
                      slider.ensureAnimationEnd = setTimeout(function() {
                          slider.wrapup(dimension)
                      }, slider.vars.animationSpeed + 100)
                  } else slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function() {
                      slider.wrapup(dimension)
                  })
              } else if (!touch) {
                  slider.slides.eq(slider.currentSlide).css({
                      zIndex: 1
                  }).animate({
                      opacity: 0
                  }, slider.vars.animationSpeed, slider.vars.easing);
                  slider.slides.eq(target).css({
                      zIndex: 2
                  }).animate({
                      opacity: 1
                  }, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup)
              } else {
                  slider.slides.eq(slider.currentSlide).css({
                      opacity: 0,
                      zIndex: 1
                  });
                  slider.slides.eq(target).css({
                      opacity: 1,
                      zIndex: 2
                  });
                  slider.wrapup(dimension)
              };
              if (slider.vars.smoothHeight) methods.smoothHeight(slider.vars.animationSpeed)
          }
      };
      slider.wrapup = function(dimension) {
          if (!fade && !carousel)
              if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
                  slider.setProps(dimension, "jumpEnd")
              } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) slider.setProps(dimension, "jumpStart");
          slider.animating = false;
          slider.currentSlide = slider.animatingTo;
          slider.vars.after(slider)
      };
      slider.animateSlides = function() {
          if (!slider.animating && focused) slider.flexAnimate(slider.getTarget("next"))
      };
      slider.pause = function() {
          clearInterval(slider.animatedSlides);
          slider.animatedSlides = null;
          slider.playing = false;
          if (slider.vars.pausePlay) methods.pausePlay.update("play");
          if (slider.syncExists) methods.sync("pause")
      };
      slider.play = function() {
          if (slider.playing) clearInterval(slider.animatedSlides);
          slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
          slider.started = slider.playing = true;
          if (slider.vars.pausePlay) methods.pausePlay.update("pause");
          if (slider.syncExists) methods.sync("play")
      };
      slider.stop = function() {
          slider.pause();
          slider.stopped = true
      };
      slider.canAdvance = function(target, fromNav) {
          var last = asNav ? slider.pagingCount - 1 : slider.last;
          return fromNav ? true : (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true : (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false : (target === slider.currentSlide && !asNav) ? false : (slider.vars.animationLoop) ? true : (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false : (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false : true
      };
      slider.getTarget = function(dir) {
          slider.direction = dir;
          if (dir === "next") {
              return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1
          } else return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1
      };
      slider.setProps = function(pos, special, dur) {
          var target = (function() {
              var posCheck = pos ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
                  posCalc = (function() {
                      if (carousel) {
                          return (special === "setTouch") ? pos : (reverse && slider.animatingTo === slider.last) ? 0 : reverse ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) : (slider.animatingTo === slider.last) ? slider.limit : posCheck
                      } else switch (special) {
                          case "setTotal":
                              return reverse ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                          case "setTouch":
                              return reverse ? pos : pos;
                          case "jumpEnd":
                              return reverse ? pos : slider.count * pos;
                          case "jumpStart":
                              return reverse ? slider.count * pos : pos;
                          default:
                              return pos
                      }
                  }());
              return (posCalc * -1) + "px"
          }());
          if (slider.transitions) {
              target = vertical ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
              dur = (dur !== undefined) ? (dur / 1e3) + "s" : "0s";
              slider.container.css("-" + slider.pfx + "-transition-duration", dur);
              slider.container.css("transition-duration", dur)
          };
          slider.args[slider.prop] = target;
          if (slider.transitions || dur === undefined) slider.container.css(slider.args);
          slider.container.css('transform', target)
      };
      slider.setup = function(type) {
          if (!fade) {
              var sliderOffset, arr;
              if (type === "init") {
                  slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({
                      overflow: "hidden",
                      position: "relative"
                  }).appendTo(slider).append(slider.container);
                  slider.cloneCount = 0;
                  slider.cloneOffset = 0;
                  if (reverse) {
                      arr = $.makeArray(slider.slides).reverse();
                      slider.slides = $(arr);
                      slider.container.empty().append(slider.slides)
                  }
              };
              if (slider.vars.animationLoop && !carousel) {
                  slider.cloneCount = 2;
                  slider.cloneOffset = 1;
                  if (type !== "init") slider.container.find('.clone').remove();
                  slider.container.append(methods.uniqueID(slider.slides.first().clone().addClass('clone')).attr('aria-hidden', 'true')).prepend(methods.uniqueID(slider.slides.last().clone().addClass('clone')).attr('aria-hidden', 'true'))
              };
              slider.newSlides = $(slider.vars.selector, slider);
              sliderOffset = reverse ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
              if (vertical && !carousel) {
                  slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
                  setTimeout(function() {
                      slider.newSlides.css({
                          display: "block"
                      });
                      slider.doMath();
                      slider.viewport.height(slider.h);
                      slider.setProps(sliderOffset * slider.h, "init")
                  }, (type === "init") ? 100 : 0)
              } else {
                  slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
                  slider.setProps(sliderOffset * slider.computedW, "init");
                  setTimeout(function() {
                      slider.doMath();
                      slider.newSlides.css({
                          width: slider.computedW,
                          "float": "left",
                          display: "block"
                      });
                      if (slider.vars.smoothHeight) methods.smoothHeight()
                  }, (type === "init") ? 100 : 0)
              }
          } else {
              slider.slides.css({
                  width: "100%",
                  "float": "left",
                  marginRight: "-100%",
                  position: "relative"
              });
              if (type === "init")
                  if (!touch) {
                      if (slider.vars.fadeFirstSlide == false) {
                          slider.slides.css({
                              opacity: 0,
                              display: "block",
                              zIndex: 1
                          }).eq(slider.currentSlide).css({
                              zIndex: 2
                          }).css({
                              opacity: 1
                          })
                      } else slider.slides.css({
                          opacity: 0,
                          display: "block",
                          zIndex: 1
                      }).eq(slider.currentSlide).css({
                          zIndex: 2
                      }).animate({
                          opacity: 1
                      }, slider.vars.animationSpeed, slider.vars.easing)
                  } else slider.slides.css({
                      opacity: 0,
                      display: "block",
                      webkitTransition: "opacity " + slider.vars.animationSpeed / 1e3 + "s ease",
                      zIndex: 1
                  }).eq(slider.currentSlide).css({
                      opacity: 1,
                      zIndex: 2
                  });
              if (slider.vars.smoothHeight) methods.smoothHeight()
          };
          if (!carousel) slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide");
          slider.vars.init(slider)
      };
      slider.doMath = function() {
          var slide = slider.slides.first(),
              slideMargin = slider.vars.itemMargin,
              minItems = slider.vars.minItems,
              maxItems = slider.vars.maxItems;
          slider.w = (slider.viewport === undefined) ? slider.width() : slider.viewport.width();
          slider.h = slide.height();
          slider.boxPadding = slide.outerWidth() - slide.width();
          if (carousel) {
              slider.itemT = slider.vars.itemWidth + slideMargin;
              slider.minW = minItems ? minItems * slider.itemT : slider.w;
              slider.maxW = maxItems ? (maxItems * slider.itemT) - slideMargin : slider.w;
              slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1))) / minItems : (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1))) / maxItems : (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;
              slider.visible = Math.floor(slider.w / (slider.itemW));
              slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible) ? slider.vars.move : slider.visible;
              slider.pagingCount = Math.ceil(((slider.count - slider.visible) / slider.move) + 1);
              slider.last = slider.pagingCount - 1;
              slider.limit = (slider.pagingCount === 1) ? 0 : (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin
          } else {
              slider.itemW = slider.w;
              slider.pagingCount = slider.count;
              slider.last = slider.count - 1
          };
          slider.computedW = slider.itemW - slider.boxPadding
      };
      slider.update = function(pos, action) {
          slider.doMath();
          if (!carousel) {
              if (pos < slider.currentSlide) {
                  slider.currentSlide += 1
              } else if (pos <= slider.currentSlide && pos !== 0) slider.currentSlide -= 1;
              slider.animatingTo = slider.currentSlide
          };
          if (slider.vars.controlNav && !slider.manualControls)
              if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
                  methods.controlNav.update("add")
              } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
              if (carousel && slider.currentSlide > slider.last) {
                  slider.currentSlide -= 1;
                  slider.animatingTo -= 1
              };
              methods.controlNav.update("remove", slider.last)
          };
          if (slider.vars.directionNav) methods.directionNav.update()
      };
      slider.addSlide = function(obj, pos) {
          var $obj = $(obj);
          slider.count += 1;
          slider.last = slider.count - 1;
          if (vertical && reverse) {
              (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj): slider.container.prepend($obj)
          } else(pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
          slider.update(pos, "add");
          slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
          slider.setup();
          slider.vars.added(slider)
      };
      slider.removeSlide = function(obj) {
          var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;
          slider.count -= 1;
          slider.last = slider.count - 1;
          if (isNaN(obj)) {
              $(obj, slider.slides).remove()
          } else(vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
          slider.doMath();
          slider.update(pos, "remove");
          slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
          slider.setup();
          slider.vars.removed(slider)
      };
      methods.init()
  };
  $(window).blur(function(e) {
      focused = false
  }).focus(function(e) {
      focused = true
  });
  $.flexslider.defaults = {
      namespace: "flex-",
      selector: ".slides > li",
      animation: "fade",
      easing: "swing",
      direction: "horizontal",
      reverse: false,
      animationLoop: true,
      smoothHeight: false,
      startAt: 0,
      slideshow: true,
      slideshowSpeed: 7e3,
      animationSpeed: 600,
      initDelay: 0,
      randomize: false,
      fadeFirstSlide: true,
      thumbCaptions: false,
      pauseOnAction: true,
      pauseOnHover: false,
      pauseInvisible: true,
      useCSS: true,
      touch: true,
      video: false,
      controlNav: true,
      directionNav: true,
      prevText: "Previous",
      nextText: "Next",
      keyboard: true,
      multipleKeyboard: false,
      mousewheel: false,
      pausePlay: false,
      pauseText: "Pause",
      playText: "Play",
      controlsContainer: "",
      manualControls: "",
      sync: "",
      asNavFor: "",
      itemWidth: 0,
      itemMargin: 0,
      minItems: 1,
      maxItems: 0,
      move: 0,
      allowOneSlide: true,
      start: function() {},
      before: function() {},
      after: function() {},
      end: function() {},
      added: function() {},
      removed: function() {},
      init: function() {}
  };
  $.fn.flexslider = function(options) {
      if (options === undefined) options = {};
      if (typeof options === "object") {
          return this.each(function() {
              var $this = $(this),
                  selector = (options.selector) ? options.selector : ".slides > li",
                  $slides = $this.find(selector);
              if (($slides.length === 1 && options.allowOneSlide === true) || $slides.length === 0) {
                  $slides.fadeIn(400);
                  if (options.start) options.start($this)
              } else if ($this.data('flexslider') === undefined) new $.flexslider(this, options)
          })
      } else {
          var $slider = $(this).data('flexslider');
          switch (options) {
              case "play":
                  $slider.play();
                  break;
              case "pause":
                  $slider.pause();
                  break;
              case "stop":
                  $slider.stop();
                  break;
              case "next":
                  $slider.flexAnimate($slider.getTarget("next"), true);
                  break;
              case "prev":
              case "previous":
                  $slider.flexAnimate($slider.getTarget("prev"), true);
                  break;
              default:
                  if (typeof options === "number") $slider.flexAnimate(options, true)
          }
      }
  }
})(jQuery);
/*** Script File: /f/js/jquery.jscrollpane.min.js, Original size: 14,114, Compressed size: 14,114 ***/
/*!
* jScrollPane - v2.0.19 - 2013-11-16
* http://jscrollpane.kelvinluck.com/
*
* Copyright (c) 2013 Kelvin Luck
* Dual licensed under the MIT or GPL licenses.
*/
! function(a, b, c) {
  a.fn.jScrollPane = function(d) {
      function e(d, e) {
          function f(b) {
              var e, h, j, l, m, n, q = !1,
                  r = !1;
              if (P = b, Q === c) m = d.scrollTop(), n = d.scrollLeft(), d.css({
                  overflow: "hidden",
                  padding: 0
              }), R = d.innerWidth() + tb, S = d.innerHeight(), d.width(R), Q = a('<div class="jspPane" />').css("padding", sb).append(d.children()), T = a('<div class="jspContainer" />').css({
                  width: R + "px",
                  height: S + "px"
              }).append(Q).appendTo(d);
              else {
                  if (d.css("width", ""), q = P.stickToBottom && C(), r = P.stickToRight && D(), l = d.innerWidth() + tb != R || d.outerHeight() != S, l && (R = d.innerWidth() + tb, S = d.innerHeight(), T.css({
                          width: R + "px",
                          height: S + "px"
                      })), !l && ub == U && Q.outerHeight() == V) return d.width(R), void 0;
                  ub = U, Q.css("width", ""), d.width(R), T.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()
              }
              Q.css("overflow", "auto"), U = b.contentWidth ? b.contentWidth : Q[0].scrollWidth, V = Q[0].scrollHeight, Q.css("overflow", ""), W = U / R, X = V / S, Y = X > 1, Z = W > 1, Z || Y ? (d.addClass("jspScrollable"), e = P.maintainPosition && (ab || db), e && (h = A(), j = B()), g(), i(), k(), e && (y(r ? U - R : h, !1), x(q ? V - S : j, !1)), H(), E(), N(), P.enableKeyboardNavigation && J(), P.clickOnTrack && o(), L(), P.hijackInternalLinks && M()) : (d.removeClass("jspScrollable"), Q.css({
                  top: 0,
                  left: 0,
                  width: T.width() - tb
              }), F(), I(), K(), p()), P.autoReinitialise && !rb ? rb = setInterval(function() {
                  f(P)
              }, P.autoReinitialiseDelay) : !P.autoReinitialise && rb && clearInterval(rb), m && d.scrollTop(0) && x(m, !1), n && d.scrollLeft(0) && y(n, !1), d.trigger("jsp-initialised", [Z || Y])
          }

          function g() {
              Y && (T.append(a('<div class="jspVerticalBar" />').append(a('<div class="jspCap jspCapTop" />'), a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragTop" />'), a('<div class="jspDragBottom" />'))), a('<div class="jspCap jspCapBottom" />'))), eb = T.find(">.jspVerticalBar"), fb = eb.find(">.jspTrack"), $ = fb.find(">.jspDrag"), P.showArrows && (jb = a('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp", m(0, -1)).bind("click.jsp", G), kb = a('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp", m(0, 1)).bind("click.jsp", G), P.arrowScrollOnHover && (jb.bind("mouseover.jsp", m(0, -1, jb)), kb.bind("mouseover.jsp", m(0, 1, kb))), l(fb, P.verticalArrowPositions, jb, kb)), hb = S, T.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function() {
                  hb -= a(this).outerHeight()
              }), $.hover(function() {
                  $.addClass("jspHover")
              }, function() {
                  $.removeClass("jspHover")
              }).bind("mousedown.jsp", function(b) {
                  a("html").bind("dragstart.jsp selectstart.jsp", G), $.addClass("jspActive");
                  var c = b.pageY - $.position().top;
                  return a("html").bind("mousemove.jsp", function(a) {
                      r(a.pageY - c, !1)
                  }).bind("mouseup.jsp mouseleave.jsp", q), !1
              }), h())
          }

          function h() {
              fb.height(hb + "px"), ab = 0, gb = P.verticalGutter + fb.outerWidth(), Q.width(R - gb - tb);
              try {
                  0 === eb.position().left && Q.css("margin-left", gb + "px")
              } catch (a) {}
          }

          function i() {
              Z && (T.append(a('<div class="jspHorizontalBar" />').append(a('<div class="jspCap jspCapLeft" />'), a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragLeft" />'), a('<div class="jspDragRight" />'))), a('<div class="jspCap jspCapRight" />'))), lb = T.find(">.jspHorizontalBar"), mb = lb.find(">.jspTrack"), bb = mb.find(">.jspDrag"), P.showArrows && (pb = a('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp", m(-1, 0)).bind("click.jsp", G), qb = a('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp", m(1, 0)).bind("click.jsp", G), P.arrowScrollOnHover && (pb.bind("mouseover.jsp", m(-1, 0, pb)), qb.bind("mouseover.jsp", m(1, 0, qb))), l(mb, P.horizontalArrowPositions, pb, qb)), bb.hover(function() {
                  bb.addClass("jspHover")
              }, function() {
                  bb.removeClass("jspHover")
              }).bind("mousedown.jsp", function(b) {
                  a("html").bind("dragstart.jsp selectstart.jsp", G), bb.addClass("jspActive");
                  var c = b.pageX - bb.position().left;
                  return a("html").bind("mousemove.jsp", function(a) {
                      t(a.pageX - c, !1)
                  }).bind("mouseup.jsp mouseleave.jsp", q), !1
              }), nb = T.innerWidth(), j())
          }

          function j() {
              T.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function() {
                  nb -= a(this).outerWidth()
              }), mb.width(nb + "px"), db = 0
          }

          function k() {
              if (Z && Y) {
                  var b = mb.outerHeight(),
                      c = fb.outerWidth();
                  hb -= b, a(lb).find(">.jspCap:visible,>.jspArrow").each(function() {
                      nb += a(this).outerWidth()
                  }), nb -= c, S -= c, R -= b, mb.parent().append(a('<div class="jspCorner" />').css("width", b + "px")), h(), j()
              }
              Z && Q.width(T.outerWidth() - tb + "px"), V = Q.outerHeight(), X = V / S, Z && (ob = Math.ceil(1 / W * nb), ob > P.horizontalDragMaxWidth ? ob = P.horizontalDragMaxWidth : ob < P.horizontalDragMinWidth && (ob = P.horizontalDragMinWidth), bb.width(ob + "px"), cb = nb - ob, u(db)), Y && (ib = Math.ceil(1 / X * hb), ib > P.verticalDragMaxHeight ? ib = P.verticalDragMaxHeight : ib < P.verticalDragMinHeight && (ib = P.verticalDragMinHeight), $.height(ib + "px"), _ = hb - ib, s(ab))
          }

          function l(a, b, c, d) {
              var e, f = "before",
                  g = "after";
              "os" == b && (b = /Mac/.test(navigator.platform) ? "after" : "split"), b == f ? g = b : b == g && (f = b, e = c, c = d, d = e), a[f](c)[g](d)
          }

          function m(a, b, c) {
              return function() {
                  return n(a, b, this, c), this.blur(), !1
              }
          }

          function n(b, c, d, e) {
              d = a(d).addClass("jspActive");
              var f, g, h = !0,
                  i = function() {
                      0 !== b && vb.scrollByX(b * P.arrowButtonSpeed), 0 !== c && vb.scrollByY(c * P.arrowButtonSpeed), g = setTimeout(i, h ? P.initialDelay : P.arrowRepeatFreq), h = !1
                  };
              i(), f = e ? "mouseout.jsp" : "mouseup.jsp", e = e || a("html"), e.bind(f, function() {
                  d.removeClass("jspActive"), g && clearTimeout(g), g = null, e.unbind(f)
              })
          }

          function o() {
              p(), Y && fb.bind("mousedown.jsp", function(b) {
                  if (b.originalTarget === c || b.originalTarget == b.currentTarget) {
                      var d, e = a(this),
                          f = e.offset(),
                          g = b.pageY - f.top - ab,
                          h = !0,
                          i = function() {
                              var a = e.offset(),
                                  c = b.pageY - a.top - ib / 2,
                                  f = S * P.scrollPagePercent,
                                  k = _ * f / (V - S);
                              if (0 > g) ab - k > c ? vb.scrollByY(-f) : r(c);
                              else {
                                  if (!(g > 0)) return j(), void 0;
                                  c > ab + k ? vb.scrollByY(f) : r(c)
                              }
                              d = setTimeout(i, h ? P.initialDelay : P.trackClickRepeatFreq), h = !1
                          },
                          j = function() {
                              d && clearTimeout(d), d = null, a(document).unbind("mouseup.jsp", j)
                          };
                      return i(), a(document).bind("mouseup.jsp", j), !1
                  }
              }), Z && mb.bind("mousedown.jsp", function(b) {
                  if (b.originalTarget === c || b.originalTarget == b.currentTarget) {
                      var d, e = a(this),
                          f = e.offset(),
                          g = b.pageX - f.left - db,
                          h = !0,
                          i = function() {
                              var a = e.offset(),
                                  c = b.pageX - a.left - ob / 2,
                                  f = R * P.scrollPagePercent,
                                  k = cb * f / (U - R);
                              if (0 > g) db - k > c ? vb.scrollByX(-f) : t(c);
                              else {
                                  if (!(g > 0)) return j(), void 0;
                                  c > db + k ? vb.scrollByX(f) : t(c)
                              }
                              d = setTimeout(i, h ? P.initialDelay : P.trackClickRepeatFreq), h = !1
                          },
                          j = function() {
                              d && clearTimeout(d), d = null, a(document).unbind("mouseup.jsp", j)
                          };
                      return i(), a(document).bind("mouseup.jsp", j), !1
                  }
              })
          }

          function p() {
              mb && mb.unbind("mousedown.jsp"), fb && fb.unbind("mousedown.jsp")
          }

          function q() {
              a("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp"), $ && $.removeClass("jspActive"), bb && bb.removeClass("jspActive")
          }

          function r(a, b) {
              Y && (0 > a ? a = 0 : a > _ && (a = _), b === c && (b = P.animateScroll), b ? vb.animate($, "top", a, s) : ($.css("top", a), s(a)))
          }

          function s(a) {
              a === c && (a = $.position().top), T.scrollTop(0), ab = a;
              var b = 0 === ab,
                  e = ab == _,
                  f = a / _,
                  g = -f * (V - S);
              (wb != b || yb != e) && (wb = b, yb = e, d.trigger("jsp-arrow-change", [wb, yb, xb, zb])), v(b, e), Q.css("top", g), d.trigger("jsp-scroll-y", [-g, b, e]).trigger("scroll")
          }

          function t(a, b) {
              Z && (0 > a ? a = 0 : a > cb && (a = cb), b === c && (b = P.animateScroll), b ? vb.animate(bb, "left", a, u) : (bb.css("left", a), u(a)))
          }

          function u(a) {
              a === c && (a = bb.position().left), T.scrollTop(0), db = a;
              var b = 0 === db,
                  e = db == cb,
                  f = a / cb,
                  g = -f * (U - R);
              (xb != b || zb != e) && (xb = b, zb = e, d.trigger("jsp-arrow-change", [wb, yb, xb, zb])), w(b, e), Q.css("left", g), d.trigger("jsp-scroll-x", [-g, b, e]).trigger("scroll")
          }

          function v(a, b) {
              P.showArrows && (jb[a ? "addClass" : "removeClass"]("jspDisabled"), kb[b ? "addClass" : "removeClass"]("jspDisabled"))
          }

          function w(a, b) {
              P.showArrows && (pb[a ? "addClass" : "removeClass"]("jspDisabled"), qb[b ? "addClass" : "removeClass"]("jspDisabled"))
          }

          function x(a, b) {
              var c = a / (V - S);
              r(c * _, b)
          }

          function y(a, b) {
              var c = a / (U - R);
              t(c * cb, b)
          }

          function z(b, c, d) {
              var e, f, g, h, i, j, k, l, m, n = 0,
                  o = 0;
              try {
                  e = a(b)
              } catch (p) {
                  return
              }
              for (f = e.outerHeight(), g = e.outerWidth(), T.scrollTop(0), T.scrollLeft(0); !e.is(".jspPane");)
                  if (n += e.position().top, o += e.position().left, e = e.offsetParent(), /^body|html$/i.test(e[0].nodeName)) return;
              h = B(), j = h + S, h > n || c ? l = n - P.horizontalGutter : n + f > j && (l = n - S + f + P.horizontalGutter), isNaN(l) || x(l, d), i = A(), k = i + R, i > o || c ? m = o - P.horizontalGutter : o + g > k && (m = o - R + g + P.horizontalGutter), isNaN(m) || y(m, d)
          }

          function A() {
              return -Q.position().left
          }

          function B() {
              return -Q.position().top
          }

          function C() {
              var a = V - S;
              return a > 20 && a - B() < 10
          }

          function D() {
              var a = U - R;
              return a > 20 && a - A() < 10
          }

          function E() {
              T.unbind(Bb).bind(Bb, function(a, b, c, d) {
                  var e = db,
                      f = ab,
                      g = a.deltaFactor || P.mouseWheelSpeed;
                  return vb.scrollBy(c * g, -d * g, !1), e == db && f == ab
              })
          }

          function F() {
              T.unbind(Bb)
          }

          function G() {
              return !1
          }

          function H() {
              Q.find(":input,a").unbind("focus.jsp").bind("focus.jsp", function(a) {
                  z(a.target, !1)
              })
          }

          function I() {
              Q.find(":input,a").unbind("focus.jsp")
          }

          function J() {
              function b() {
                  var a = db,
                      b = ab;
                  switch (c) {
                      case 40:
                          vb.scrollByY(P.keyboardSpeed, !1);
                          break;
                      case 38:
                          vb.scrollByY(-P.keyboardSpeed, !1);
                          break;
                      case 34:
                      case 32:
                          vb.scrollByY(S * P.scrollPagePercent, !1);
                          break;
                      case 33:
                          vb.scrollByY(-S * P.scrollPagePercent, !1);
                          break;
                      case 39:
                          vb.scrollByX(P.keyboardSpeed, !1);
                          break;
                      case 37:
                          vb.scrollByX(-P.keyboardSpeed, !1)
                  }
                  return e = a != db || b != ab
              }
              var c, e, f = [];
              Z && f.push(lb[0]), Y && f.push(eb[0]), Q.focus(function() {
                  d.focus()
              }), d.attr("tabindex", 0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp", function(d) {
                  if (d.target === this || f.length && a(d.target).closest(f).length) {
                      var g = db,
                          h = ab;
                      switch (d.keyCode) {
                          case 40:
                          case 38:
                          case 34:
                          case 32:
                          case 33:
                          case 39:
                          case 37:
                              c = d.keyCode, b();
                              break;
                          case 35:
                              x(V - S), c = null;
                              break;
                          case 36:
                              x(0), c = null
                      }
                      return e = d.keyCode == c && g != db || h != ab, !e
                  }
              }).bind("keypress.jsp", function(a) {
                  return a.keyCode == c && b(), !e
              }), P.hideFocus ? (d.css("outline", "none"), "hideFocus" in T[0] && d.attr("hideFocus", !0)) : (d.css("outline", ""), "hideFocus" in T[0] && d.attr("hideFocus", !1))
          }

          function K() {
              d.attr("tabindex", "-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")
          }

          function L() {
              if (location.hash && location.hash.length > 1) {
                  var b, c, d = escape(location.hash.substr(1));
                  try {
                      b = a("#" + d + ', a[name="' + d + '"]')
                  } catch (e) {
                      return
                  }
                  b.length && Q.find(d) && (0 === T.scrollTop() ? c = setInterval(function() {
                      T.scrollTop() > 0 && (z(b, !0), a(document).scrollTop(T.position().top), clearInterval(c))
                  }, 50) : (z(b, !0), a(document).scrollTop(T.position().top)))
              }
          }

          function M() {
              a(document.body).data("jspHijack") || (a(document.body).data("jspHijack", !0), a(document.body).delegate("a[href*=#]", "click", function(c) {
                  var d, e, f, g, h, i, j = this.href.substr(0, this.href.indexOf("#")),
                      k = location.href;
                  if (-1 !== location.href.indexOf("#") && (k = location.href.substr(0, location.href.indexOf("#"))), j === k) {
                      d = escape(this.href.substr(this.href.indexOf("#") + 1));
                      try {
                          e = a("#" + d + ', a[name="' + d + '"]')
                      } catch (l) {
                          return
                      }
                      e.length && (f = e.closest(".jspScrollable"), g = f.data("jsp"), g.scrollToElement(e, !0), f[0].scrollIntoView && (h = a(b).scrollTop(), i = e.offset().top, (h > i || i > h + a(b).height()) && f[0].scrollIntoView()), c.preventDefault())
                  }
              }))
          }

          function N() {
              var a, b, c, d, e, f = !1;
              T.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp", function(g) {
                  var h = g.originalEvent.touches[0];
                  a = A(), b = B(), c = h.pageX, d = h.pageY, e = !1, f = !0
              }).bind("touchmove.jsp", function(g) {
                  if (f) {
                      var h = g.originalEvent.touches[0],
                          i = db,
                          j = ab;
                      return vb.scrollTo(a + c - h.pageX, b + d - h.pageY), e = e || Math.abs(c - h.pageX) > 5 || Math.abs(d - h.pageY) > 5, i == db && j == ab
                  }
              }).bind("touchend.jsp", function() {
                  f = !1
              }).bind("click.jsp-touchclick", function() {
                  return e ? (e = !1, !1) : void 0
              })
          }

          function O() {
              var a = B(),
                  b = A();
              d.removeClass("jspScrollable").unbind(".jsp"), d.replaceWith(Ab.append(Q.children())), Ab.scrollTop(a), Ab.scrollLeft(b), rb && clearInterval(rb)
          }
          var P, Q, R, S, T, U, V, W, X, Y, Z, $, _, ab, bb, cb, db, eb, fb, gb, hb, ib, jb, kb, lb, mb, nb, ob, pb, qb, rb, sb, tb, ub, vb = this,
              wb = !0,
              xb = !0,
              yb = !1,
              zb = !1,
              Ab = d.clone(!1, !1).empty(),
              Bb = a.fn.mwheelIntent ? "mwheelIntent.jsp" : "mousewheel.jsp";
          "border-box" === d.css("box-sizing") ? (sb = 0, tb = 0) : (sb = d.css("paddingTop") + " " + d.css("paddingRight") + " " + d.css("paddingBottom") + " " + d.css("paddingLeft"), tb = (parseInt(d.css("paddingLeft"), 10) || 0) + (parseInt(d.css("paddingRight"), 10) || 0)), a.extend(vb, {
              reinitialise: function(b) {
                  b = a.extend({}, P, b), f(b)
              },
              scrollToElement: function(a, b, c) {
                  z(a, b, c)
              },
              scrollTo: function(a, b, c) {
                  y(a, c), x(b, c)
              },
              scrollToX: function(a, b) {
                  y(a, b)
              },
              scrollToY: function(a, b) {
                  x(a, b)
              },
              scrollToPercentX: function(a, b) {
                  y(a * (U - R), b)
              },
              scrollToPercentY: function(a, b) {
                  x(a * (V - S), b)
              },
              scrollBy: function(a, b, c) {
                  vb.scrollByX(a, c), vb.scrollByY(b, c)
              },
              scrollByX: function(a, b) {
                  var c = A() + Math[0 > a ? "floor" : "ceil"](a),
                      d = c / (U - R);
                  t(d * cb, b)
              },
              scrollByY: function(a, b) {
                  var c = B() + Math[0 > a ? "floor" : "ceil"](a),
                      d = c / (V - S);
                  r(d * _, b)
              },
              positionDragX: function(a, b) {
                  t(a, b)
              },
              positionDragY: function(a, b) {
                  r(a, b)
              },
              animate: function(a, b, c, d) {
                  var e = {};
                  e[b] = c, a.animate(e, {
                      duration: P.animateDuration,
                      easing: P.animateEase,
                      queue: !1,
                      step: d
                  })
              },
              getContentPositionX: function() {
                  return A()
              },
              getContentPositionY: function() {
                  return B()
              },
              getContentWidth: function() {
                  return U
              },
              getContentHeight: function() {
                  return V
              },
              getPercentScrolledX: function() {
                  return A() / (U - R)
              },
              getPercentScrolledY: function() {
                  return B() / (V - S)
              },
              getIsScrollableH: function() {
                  return Z
              },
              getIsScrollableV: function() {
                  return Y
              },
              getContentPane: function() {
                  return Q
              },
              scrollToBottom: function(a) {
                  r(_, a)
              },
              hijackInternalLinks: a.noop,
              destroy: function() {
                  O()
              }
          }), f(e)
      }
      return d = a.extend({}, a.fn.jScrollPane.defaults, d), a.each(["arrowButtonSpeed", "trackClickSpeed", "keyboardSpeed"], function() {
          d[this] = d[this] || d.speed
      }), this.each(function() {
          var b = a(this),
              c = b.data("jsp");
          c ? c.reinitialise(d) : (a("script", b).filter('[type="text/javascript"],:not([type])').remove(), c = new e(b, d), b.data("jsp", c))
      })
  }, a.fn.jScrollPane.defaults = {
      showArrows: !1,
      maintainPosition: !0,
      stickToBottom: !1,
      stickToRight: !1,
      clickOnTrack: !0,
      autoReinitialise: !1,
      autoReinitialiseDelay: 500,
      verticalDragMinHeight: 0,
      verticalDragMaxHeight: 99999,
      horizontalDragMinWidth: 0,
      horizontalDragMaxWidth: 99999,
      contentWidth: c,
      animateScroll: !1,
      animateDuration: 300,
      animateEase: "linear",
      hijackInternalLinks: !1,
      verticalGutter: 4,
      horizontalGutter: 4,
      mouseWheelSpeed: 3,
      arrowButtonSpeed: 0,
      arrowRepeatFreq: 50,
      arrowScrollOnHover: !1,
      trackClickSpeed: 0,
      trackClickRepeatFreq: 70,
      verticalArrowPositions: "split",
      horizontalArrowPositions: "split",
      enableKeyboardNavigation: !0,
      hideFocus: !1,
      keyboardSpeed: 0,
      initialDelay: 300,
      speed: 30,
      scrollPagePercent: .8
  }
}(jQuery, this);;
/*** Script File: /f/js/jquery.easing.js, Original size: 8,101, Compressed size: 3,531 ***/
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
  def: 'easeOutQuad',
  swing: function(x, t, b, c, d) {
      return jQuery.easing[jQuery.easing.def](x, t, b, c, d)
  },
  easeInQuad: function(x, t, b, c, d) {
      return c * (t /= d) * t + b
  },
  easeOutQuad: function(x, t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b
  },
  easeInOutQuad: function(x, t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t - 2) - 1) + b
  },
  easeInCubic: function(x, t, b, c, d) {
      return c * (t /= d) * t * t + b
  },
  easeOutCubic: function(x, t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b
  },
  easeInOutCubic: function(x, t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t + 2) + b
  },
  easeInQuart: function(x, t, b, c, d) {
      return c * (t /= d) * t * t * t + b
  },
  easeOutQuart: function(x, t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b
  },
  easeInOutQuart: function(x, t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b
  },
  easeInQuint: function(x, t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b
  },
  easeOutQuint: function(x, t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b
  },
  easeInOutQuint: function(x, t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
  },
  easeInSine: function(x, t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
  },
  easeOutSine: function(x, t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b
  },
  easeInOutSine: function(x, t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
  },
  easeInExpo: function(x, t, b, c, d) {
      return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
  },
  easeOutExpo: function(x, t, b, c, d) {
      return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
  },
  easeInOutExpo: function(x, t, b, c, d) {
      if (t == 0) return b;
      if (t == d) return b + c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
  },
  easeInCirc: function(x, t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
  },
  easeOutCirc: function(x, t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
  },
  easeInOutCirc: function(x, t, b, c, d) {
      if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
  },
  easeInElastic: function(x, t, b, c, d) {
      var s = 1.70158,
          p = 0,
          a = c;
      if (t == 0) return b;
      if ((t /= d) == 1) return b + c;
      if (!p) p = d * .3;
      if (a < Math.abs(c)) {
          a = c;
          var s = p / 4
      } else var s = p / (2 * Math.PI) * Math.asin(c / a);
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
  },
  easeOutElastic: function(x, t, b, c, d) {
      var s = 1.70158,
          p = 0,
          a = c;
      if (t == 0) return b;
      if ((t /= d) == 1) return b + c;
      if (!p) p = d * .3;
      if (a < Math.abs(c)) {
          a = c;
          var s = p / 4
      } else var s = p / (2 * Math.PI) * Math.asin(c / a);
      return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b
  },
  easeInOutElastic: function(x, t, b, c, d) {
      var s = 1.70158,
          p = 0,
          a = c;
      if (t == 0) return b;
      if ((t /= d / 2) == 2) return b + c;
      if (!p) p = d * (.3 * 1.5);
      if (a < Math.abs(c)) {
          a = c;
          var s = p / 4
      } else var s = p / (2 * Math.PI) * Math.asin(c / a);
      if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b
  },
  easeInBack: function(x, t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b
  },
  easeOutBack: function(x, t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
  },
  easeInOutBack: function(x, t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
      return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
  },
  easeInBounce: function(x, t, b, c, d) {
      return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b
  },
  easeOutBounce: function(x, t, b, c, d) {
      if ((t /= d) < (1 / 2.75)) {
          return c * (7.5625 * t * t) + b
      } else if (t < (2 / 2.75)) {
          return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b
      } else if (t < (2.5 / 2.75)) {
          return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b
      } else return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b
  },
  easeInOutBounce: function(x, t, b, c, d) {
      if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
      return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b
  }
});
/*** Script File: /f/js/jquery.mousewheel.js, Original size: 7,350, Compressed size: 3,285 ***/
(function(factory) {
  if (typeof define === 'function' && define.amd) {
      define(['jquery'], factory)
  } else if (typeof exports === 'object') {
      module.exports = factory
  } else factory(jQuery)
}(function($) {
  var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
      toBind = ('onwheel' in document || document.documentMode >= 9) ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
      slice = Array.prototype.slice,
      nullLowestDeltaTimeout, lowestDelta;
  if ($.event.fixHooks)
      for (var i = toFix.length; i;) $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
  var special = $.event.special.mousewheel = {
      version: '3.1.9',
      setup: function() {
          if (this.addEventListener) {
              for (var i = toBind.length; i;) this.addEventListener(toBind[--i], handler, false)
          } else this.onmousewheel = handler;
          $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
          $.data(this, 'mousewheel-page-height', special.getPageHeight(this))
      },
      teardown: function() {
          if (this.removeEventListener) {
              for (var i = toBind.length; i;) this.removeEventListener(toBind[--i], handler, false)
          } else this.onmousewheel = null
      },
      getLineHeight: function(elem) {
          return parseInt($(elem)['offsetParent' in $.fn ? 'offsetParent' : 'parent']().css('fontSize'), 10)
      },
      getPageHeight: function(elem) {
          return $(elem).height()
      },
      settings: {
          adjustOldDeltas: true
      }
  };
  $.fn.extend({
      mousewheel: function(fn) {
          return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel')
      },
      unmousewheel: function(fn) {
          return this.unbind('mousewheel', fn)
      }
  })

  function handler(event) {
      var orgEvent = event || window.event,
          args = slice.call(arguments, 1),
          delta = 0,
          deltaX = 0,
          deltaY = 0,
          absDelta = 0;
      event = $.event.fix(orgEvent);
      event.type = 'mousewheel';
      if ('detail' in orgEvent) deltaY = orgEvent.detail * -1;
      if ('wheelDelta' in orgEvent) deltaY = orgEvent.wheelDelta;
      if ('wheelDeltaY' in orgEvent) deltaY = orgEvent.wheelDeltaY;
      if ('wheelDeltaX' in orgEvent) deltaX = orgEvent.wheelDeltaX * -1;
      if ('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
          deltaX = deltaY * -1;
          deltaY = 0
      };
      delta = deltaY === 0 ? deltaX : deltaY;
      if ('deltaY' in orgEvent) {
          deltaY = orgEvent.deltaY * -1;
          delta = deltaY
      };
      if ('deltaX' in orgEvent) {
          deltaX = orgEvent.deltaX;
          if (deltaY === 0) delta = deltaX * -1
      };
      if (deltaY === 0 && deltaX === 0) return;
      if (orgEvent.deltaMode === 1) {
          var lineHeight = $.data(this, 'mousewheel-line-height');
          delta *= lineHeight;
          deltaY *= lineHeight;
          deltaX *= lineHeight
      } else if (orgEvent.deltaMode === 2) {
          var pageHeight = $.data(this, 'mousewheel-page-height');
          delta *= pageHeight;
          deltaY *= pageHeight;
          deltaX *= pageHeight
      };
      absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));
      if (!lowestDelta || absDelta < lowestDelta) {
          lowestDelta = absDelta;
          if (shouldAdjustOldDeltas(orgEvent, absDelta)) lowestDelta /= 40
      };
      if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
          delta /= 40;
          deltaX /= 40;
          deltaY /= 40
      };
      delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / lowestDelta);
      deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / lowestDelta);
      deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / lowestDelta);
      event.deltaX = deltaX;
      event.deltaY = deltaY;
      event.deltaFactor = lowestDelta;
      event.deltaMode = 0;
      args.unshift(event, delta, deltaX, deltaY);
      if (nullLowestDeltaTimeout) clearTimeout(nullLowestDeltaTimeout);
      nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);
      return ($.event.dispatch || $.event.handle).apply(this, args)
  }

  function nullLowestDelta() {
      lowestDelta = null
  }

  function shouldAdjustOldDeltas(orgEvent, absDelta) {
      return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0
  }
}));
/*** Script File: /f/js/jquery.backgroundSize.js, Original size: 7,640, Compressed size: 4,342 ***/
(function($, window, document, Math, undefined) {
  var div = $("<div>")[0],
      rsrc = /url\(["']?(.*?)["']?\)/,
      watched = [],
      positions = {
          top: 0,
          left: 0,
          bottom: 1,
          right: 1,
          center: .5
      };
  if ("backgroundSize" in div.style && !$.debugBGS) return;
  $.cssHooks.backgroundSize = {
      set: function(elem, value) {
          var firstTime = !$.data(elem, "bgsImg"),
              pos, $wrapper, $img;
          $.data(elem, "bgsValue", value);
          if (firstTime) {
              watched.push(elem);
              $.refreshBackgroundDimensions(elem, true);
              $wrapper = $("<div>").css({
                  position: "absolute",
                  zIndex: -1,
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                  overflow: "hidden"
              });
              $img = $("<img>").css({
                  position: "absolute"
              }).appendTo($wrapper), $wrapper.prependTo(elem);
              $.data(elem, "bgsImg", $img[0]);
              pos = ($.css(elem, "backgroundPosition") || $.css(elem, "backgroundPositionX") + " " + $.css(elem, "backgroundPositionY")).split(" ");
              $.data(elem, "bgsPos", [positions[pos[0]] || parseFloat(pos[0]) / 100, positions[pos[1]] || parseFloat(pos[1]) / 100]);
              $.css(elem, "zIndex") == "auto" && (elem.style.zIndex = 0);
              $.css(elem, "position") == "static" && (elem.style.position = "relative");
              $.refreshBackgroundImage(elem)
          } else $.refreshBackground(elem)
      },
      get: function(elem) {
          return $.data(elem, "bgsValue") || ""
      }
  };
  $.cssHooks.backgroundImage = {
      set: function(elem, value) {
          return $.data(elem, "bgsImg") ? $.refreshBackgroundImage(elem, value) : value
      }
  };
  $.refreshBackgroundDimensions = function(elem, noBgRefresh) {
      var $elem = $(elem),
          currDim = {
              width: $elem.innerWidth(),
              height: $elem.innerHeight()
          },
          prevDim = $.data(elem, "bgsDim"),
          changed = !prevDim || currDim.width != prevDim.width || currDim.height != prevDim.height;
      $.data(elem, "bgsDim", currDim);
      if (changed && !noBgRefresh) $.refreshBackground(elem)
  };
  $.refreshBackgroundImage = function(elem, value) {
      var img = $.data(elem, "bgsImg"),
          currSrc = (rsrc.exec(value || $.css(elem, "backgroundImage")) || [])[1],
          prevSrc = img && img.src,
          changed = currSrc != prevSrc,
          imgWidth, imgHeight;
      if (changed) {
          img.style.height = img.style.width = "auto";
          img.onload = function() {
              var dim = {
                  width: img.width,
                  height: img.height
              };
              if (dim.width == 1 && dim.height == 1) return;
              $.data(elem, "bgsImgDim", dim);
              $.data(elem, "bgsConstrain", false);
              $.refreshBackground(elem);
              img.style.visibility = "visible";
              img.onload = null
          };
          img.style.visibility = "hidden";
          img.src = currSrc;
          if (img.readyState || img.complete) {
              img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
              img.src = currSrc
          };
          elem.style.backgroundImage = "none"
      }
  };
  $.refreshBackground = function(elem) {
      var value = $.data(elem, "bgsValue"),
          elemDim = $.data(elem, "bgsDim"),
          imgDim = $.data(elem, "bgsImgDim"),
          $img = $($.data(elem, "bgsImg")),
          pos = $.data(elem, "bgsPos"),
          prevConstrain = $.data(elem, "bgsConstrain"),
          currConstrain, elemRatio = elemDim.width / elemDim.height,
          imgRatio = imgDim.width / imgDim.height,
          delta;
      if (value == "contain") {
          if (imgRatio > elemRatio) {
              $.data(elem, "bgsConstrain", (currConstrain = "width"));
              delta = Math.floor((elemDim.height - elemDim.width / imgRatio) * pos[1]);
              $img.css({
                  top: delta
              });
              if (currConstrain != prevConstrain) $img.css({
                  width: "100%",
                  height: "auto",
                  left: 0
              })
          } else {
              $.data(elem, "bgsConstrain", (currConstrain = "height"));
              delta = Math.floor((elemDim.width - elemDim.height * imgRatio) * pos[0]);
              $img.css({
                  left: delta
              });
              if (currConstrain != prevConstrain) $img.css({
                  height: "100%",
                  width: "auto",
                  top: 0
              })
          }
      } else if (value == "cover")
          if (imgRatio > elemRatio) {
              $.data(elem, "bgsConstrain", (currConstrain = "height"));
              delta = Math.floor((elemDim.height * imgRatio - elemDim.width) * pos[0]);
              $img.css({
                  left: -delta
              });
              if (currConstrain != prevConstrain) $img.css({
                  height: "100%",
                  width: "auto",
                  top: 0
              })
          } else {
              $.data(elem, "bgsConstrain", (currConstrain = "width"));
              delta = Math.floor((elemDim.width / imgRatio - elemDim.height) * pos[1]);
              $img.css({
                  top: -delta
              });
              if (currConstrain != prevConstrain) $img.css({
                  width: "100%",
                  height: "auto",
                  left: 0
              })
          }
  };
  var $event = $.event,
      $special, dummy = {
          _: 0
      },
      frame = 0,
      wasResized, animRunning;
  $special = $event.special.throttledresize = {
      setup: function() {
          $(this).on("resize", $special.handler)
      },
      teardown: function() {
          $(this).off("resize", $special.handler)
      },
      handler: function(event, execAsap) {
          var context = this,
              args = arguments;
          wasResized = true;
          if (!animRunning) {
              $(dummy).animate(dummy, {
                  duration: Infinity,
                  step: function() {
                      frame++;
                      if (frame > $special.threshold && wasResized || execAsap) {
                          event.type = "throttledresize";
                          $event.dispatch.apply(context, args);
                          wasResized = false;
                          frame = 0
                      };
                      if (frame > 9) {
                          $(dummy).stop();
                          animRunning = false;
                          frame = 0
                      }
                  }
              });
              animRunning = true
          }
      },
      threshold: 1
  };
  $(window).on("throttledresize", function() {
      $(watched).each(function() {
          $.refreshBackgroundDimensions(this)
      })
  })
})(jQuery, window, document, Math);
/*** Script File: /f/js/isotope.js, Original size: 444, Compressed size: 283 ***/
$(function() {
  var $container = $(".h-isotope-wrap").isotope({
      itemSelector: ".b-spec",
      masonry: {
          columnWidth: ".grid-sizer"
      }
  });
  $container.on("click", ".b-spec-inner_long .spec-toggle", function() {
      $(this).parents(".b-spec").removeClass("b-spec_w2");
      $container.isotope("layout");
      return false
  })
});
/*** Script File: /f/js/isotope.pkgd.min.js, Original size: 36,059, Compressed size: 36,059 ***/
/*!
* Isotope PACKAGED v2.0.1
* Filter & sort magical layouts
* http://isotope.metafizzy.co
*/

(function(t) {
  function e() {}

  function i(t) {
      function i(e) {
          e.prototype.option || (e.prototype.option = function(e) {
              t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
          })
      }

      function n(e, i) {
          t.fn[e] = function(n) {
              if ("string" == typeof n) {
                  for (var s = o.call(arguments, 1), a = 0, u = this.length; u > a; a++) {
                      var p = this[a],
                          h = t.data(p, e);
                      if (h)
                          if (t.isFunction(h[n]) && "_" !== n.charAt(0)) {
                              var f = h[n].apply(h, s);
                              if (void 0 !== f) return f
                          } else r("no such method '" + n + "' for " + e + " instance");
                      else r("cannot call methods on " + e + " prior to initialization; " + "attempted to call '" + n + "'")
                  }
                  return this
              }
              return this.each(function() {
                  var o = t.data(this, e);
                  o ? (o.option(n), o._init()) : (o = new i(this, n), t.data(this, e, o))
              })
          }
      }
      if (t) {
          var r = "undefined" == typeof console ? e : function(t) {
              console.error(t)
          };
          return t.bridget = function(t, e) {
              i(e), n(t, e)
          }, t.bridget
      }
  }
  var o = Array.prototype.slice;
  "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], i) : i(t.jQuery)
})(window),
function(t) {
  function e(e) {
      var i = t.event;
      return i.target = i.target || i.srcElement || e, i
  }
  var i = document.documentElement,
      o = function() {};
  i.addEventListener ? o = function(t, e, i) {
      t.addEventListener(e, i, !1)
  } : i.attachEvent && (o = function(t, i, o) {
      t[i + o] = o.handleEvent ? function() {
          var i = e(t);
          o.handleEvent.call(o, i)
      } : function() {
          var i = e(t);
          o.call(t, i)
      }, t.attachEvent("on" + i, t[i + o])
  });
  var n = function() {};
  i.removeEventListener ? n = function(t, e, i) {
      t.removeEventListener(e, i, !1)
  } : i.detachEvent && (n = function(t, e, i) {
      t.detachEvent("on" + e, t[e + i]);
      try {
          delete t[e + i]
      } catch (o) {
          t[e + i] = void 0
      }
  });
  var r = {
      bind: o,
      unbind: n
  };
  "function" == typeof define && define.amd ? define("eventie/eventie", r) : "object" == typeof exports ? module.exports = r : t.eventie = r
}(this),
function(t) {
  function e(t) {
      "function" == typeof t && (e.isReady ? t() : r.push(t))
  }

  function i(t) {
      var i = "readystatechange" === t.type && "complete" !== n.readyState;
      if (!e.isReady && !i) {
          e.isReady = !0;
          for (var o = 0, s = r.length; s > o; o++) {
              var a = r[o];
              a()
          }
      }
  }

  function o(o) {
      return o.bind(n, "DOMContentLoaded", i), o.bind(n, "readystatechange", i), o.bind(t, "load", i), e
  }
  var n = t.document,
      r = [];
  e.isReady = !1, "function" == typeof define && define.amd ? (e.isReady = "function" == typeof requirejs, define("doc-ready/doc-ready", ["eventie/eventie"], o)) : t.docReady = o(t.eventie)
}(this),
function() {
  function t() {}

  function e(t, e) {
      for (var i = t.length; i--;)
          if (t[i].listener === e) return i;
      return -1
  }

  function i(t) {
      return function() {
          return this[t].apply(this, arguments)
      }
  }
  var o = t.prototype,
      n = this,
      r = n.EventEmitter;
  o.getListeners = function(t) {
      var e, i, o = this._getEvents();
      if (t instanceof RegExp) {
          e = {};
          for (i in o) o.hasOwnProperty(i) && t.test(i) && (e[i] = o[i])
      } else e = o[t] || (o[t] = []);
      return e
  }, o.flattenListeners = function(t) {
      var e, i = [];
      for (e = 0; t.length > e; e += 1) i.push(t[e].listener);
      return i
  }, o.getListenersAsObject = function(t) {
      var e, i = this.getListeners(t);
      return i instanceof Array && (e = {}, e[t] = i), e || i
  }, o.addListener = function(t, i) {
      var o, n = this.getListenersAsObject(t),
          r = "object" == typeof i;
      for (o in n) n.hasOwnProperty(o) && -1 === e(n[o], i) && n[o].push(r ? i : {
          listener: i,
          once: !1
      });
      return this
  }, o.on = i("addListener"), o.addOnceListener = function(t, e) {
      return this.addListener(t, {
          listener: e,
          once: !0
      })
  }, o.once = i("addOnceListener"), o.defineEvent = function(t) {
      return this.getListeners(t), this
  }, o.defineEvents = function(t) {
      for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]);
      return this
  }, o.removeListener = function(t, i) {
      var o, n, r = this.getListenersAsObject(t);
      for (n in r) r.hasOwnProperty(n) && (o = e(r[n], i), -1 !== o && r[n].splice(o, 1));
      return this
  }, o.off = i("removeListener"), o.addListeners = function(t, e) {
      return this.manipulateListeners(!1, t, e)
  }, o.removeListeners = function(t, e) {
      return this.manipulateListeners(!0, t, e)
  }, o.manipulateListeners = function(t, e, i) {
      var o, n, r = t ? this.removeListener : this.addListener,
          s = t ? this.removeListeners : this.addListeners;
      if ("object" != typeof e || e instanceof RegExp)
          for (o = i.length; o--;) r.call(this, e, i[o]);
      else
          for (o in e) e.hasOwnProperty(o) && (n = e[o]) && ("function" == typeof n ? r.call(this, o, n) : s.call(this, o, n));
      return this
  }, o.removeEvent = function(t) {
      var e, i = typeof t,
          o = this._getEvents();
      if ("string" === i) delete o[t];
      else if (t instanceof RegExp)
          for (e in o) o.hasOwnProperty(e) && t.test(e) && delete o[e];
      else delete this._events;
      return this
  }, o.removeAllListeners = i("removeEvent"), o.emitEvent = function(t, e) {
      var i, o, n, r, s = this.getListenersAsObject(t);
      for (n in s)
          if (s.hasOwnProperty(n))
              for (o = s[n].length; o--;) i = s[n][o], i.once === !0 && this.removeListener(t, i.listener), r = i.listener.apply(this, e || []), r === this._getOnceReturnValue() && this.removeListener(t, i.listener);
      return this
  }, o.trigger = i("emitEvent"), o.emit = function(t) {
      var e = Array.prototype.slice.call(arguments, 1);
      return this.emitEvent(t, e)
  }, o.setOnceReturnValue = function(t) {
      return this._onceReturnValue = t, this
  }, o._getOnceReturnValue = function() {
      return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
  }, o._getEvents = function() {
      return this._events || (this._events = {})
  }, t.noConflict = function() {
      return n.EventEmitter = r, t
  }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
      return t
  }) : "object" == typeof module && module.exports ? module.exports = t : this.EventEmitter = t
}.call(this),
  function(t) {
      function e(t) {
          if (t) {
              if ("string" == typeof o[t]) return t;
              t = t.charAt(0).toUpperCase() + t.slice(1);
              for (var e, n = 0, r = i.length; r > n; n++)
                  if (e = i[n] + t, "string" == typeof o[e]) return e
          }
      }
      var i = "Webkit Moz ms Ms O".split(" "),
          o = document.documentElement.style;
      "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
          return e
      }) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
  }(window),
  function(t) {
      function e(t) {
          var e = parseFloat(t),
              i = -1 === t.indexOf("%") && !isNaN(e);
          return i && e
      }

      function i() {
          for (var t = {
                  width: 0,
                  height: 0,
                  innerWidth: 0,
                  innerHeight: 0,
                  outerWidth: 0,
                  outerHeight: 0
              }, e = 0, i = s.length; i > e; e++) {
              var o = s[e];
              t[o] = 0
          }
          return t
      }

      function o(t) {
          function o(t) {
              if ("string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
                  var o = r(t);
                  if ("none" === o.display) return i();
                  var n = {};
                  n.width = t.offsetWidth, n.height = t.offsetHeight;
                  for (var h = n.isBorderBox = !(!p || !o[p] || "border-box" !== o[p]), f = 0, d = s.length; d > f; f++) {
                      var l = s[f],
                          c = o[l];
                      c = a(t, c);
                      var y = parseFloat(c);
                      n[l] = isNaN(y) ? 0 : y
                  }
                  var m = n.paddingLeft + n.paddingRight,
                      g = n.paddingTop + n.paddingBottom,
                      v = n.marginLeft + n.marginRight,
                      _ = n.marginTop + n.marginBottom,
                      I = n.borderLeftWidth + n.borderRightWidth,
                      L = n.borderTopWidth + n.borderBottomWidth,
                      z = h && u,
                      S = e(o.width);
                  S !== !1 && (n.width = S + (z ? 0 : m + I));
                  var b = e(o.height);
                  return b !== !1 && (n.height = b + (z ? 0 : g + L)), n.innerWidth = n.width - (m + I), n.innerHeight = n.height - (g + L), n.outerWidth = n.width + v, n.outerHeight = n.height + _, n
              }
          }

          function a(t, e) {
              if (n || -1 === e.indexOf("%")) return e;
              var i = t.style,
                  o = i.left,
                  r = t.runtimeStyle,
                  s = r && r.left;
              return s && (r.left = t.currentStyle.left), i.left = e, e = i.pixelLeft, i.left = o, s && (r.left = s), e
          }
          var u, p = t("boxSizing");
          return function() {
              if (p) {
                  var t = document.createElement("div");
                  t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style[p] = "border-box";
                  var i = document.body || document.documentElement;
                  i.appendChild(t);
                  var o = r(t);
                  u = 200 === e(o.width), i.removeChild(t)
              }
          }(), o
      }
      var n = t.getComputedStyle,
          r = n ? function(t) {
              return n(t, null)
          } : function(t) {
              return t.currentStyle
          },
          s = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
      "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], o) : "object" == typeof exports ? module.exports = o(require("get-style-property")) : t.getSize = o(t.getStyleProperty)
  }(window),
  function(t, e) {
      function i(t, e) {
          return t[a](e)
      }

      function o(t) {
          if (!t.parentNode) {
              var e = document.createDocumentFragment();
              e.appendChild(t)
          }
      }

      function n(t, e) {
          o(t);
          for (var i = t.parentNode.querySelectorAll(e), n = 0, r = i.length; r > n; n++)
              if (i[n] === t) return !0;
          return !1
      }

      function r(t, e) {
          return o(t), i(t, e)
      }
      var s, a = function() {
          if (e.matchesSelector) return "matchesSelector";
          for (var t = ["webkit", "moz", "ms", "o"], i = 0, o = t.length; o > i; i++) {
              var n = t[i],
                  r = n + "MatchesSelector";
              if (e[r]) return r
          }
      }();
      if (a) {
          var u = document.createElement("div"),
              p = i(u, "div");
          s = p ? i : r
      } else s = n;
      "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
          return s
      }) : window.matchesSelector = s
  }(this, Element.prototype),
  function(t) {
      function e(t, e) {
          for (var i in e) t[i] = e[i];
          return t
      }

      function i(t) {
          for (var e in t) return !1;
          return e = null, !0
      }

      function o(t) {
          return t.replace(/([A-Z])/g, function(t) {
              return "-" + t.toLowerCase()
          })
      }

      function n(t, n, r) {
          function a(t, e) {
              t && (this.element = t, this.layout = e, this.position = {
                  x: 0,
                  y: 0
              }, this._create())
          }
          var u = r("transition"),
              p = r("transform"),
              h = u && p,
              f = !!r("perspective"),
              d = {
                  WebkitTransition: "webkitTransitionEnd",
                  MozTransition: "transitionend",
                  OTransition: "otransitionend",
                  transition: "transitionend"
              }[u],
              l = ["transform", "transition", "transitionDuration", "transitionProperty"],
              c = function() {
                  for (var t = {}, e = 0, i = l.length; i > e; e++) {
                      var o = l[e],
                          n = r(o);
                      n && n !== o && (t[o] = n)
                  }
                  return t
              }();
          e(a.prototype, t.prototype), a.prototype._create = function() {
              this._transn = {
                  ingProperties: {},
                  clean: {},
                  onEnd: {}
              }, this.css({
                  position: "absolute"
              })
          }, a.prototype.handleEvent = function(t) {
              var e = "on" + t.type;
              this[e] && this[e](t)
          }, a.prototype.getSize = function() {
              this.size = n(this.element)
          }, a.prototype.css = function(t) {
              var e = this.element.style;
              for (var i in t) {
                  var o = c[i] || i;
                  e[o] = t[i]
              }
          }, a.prototype.getPosition = function() {
              var t = s(this.element),
                  e = this.layout.options,
                  i = e.isOriginLeft,
                  o = e.isOriginTop,
                  n = parseInt(t[i ? "left" : "right"], 10),
                  r = parseInt(t[o ? "top" : "bottom"], 10);
              n = isNaN(n) ? 0 : n, r = isNaN(r) ? 0 : r;
              var a = this.layout.size;
              n -= i ? a.paddingLeft : a.paddingRight, r -= o ? a.paddingTop : a.paddingBottom, this.position.x = n, this.position.y = r
          }, a.prototype.layoutPosition = function() {
              var t = this.layout.size,
                  e = this.layout.options,
                  i = {};
              e.isOriginLeft ? (i.left = this.position.x + t.paddingLeft + "px", i.right = "") : (i.right = this.position.x + t.paddingRight + "px", i.left = ""), e.isOriginTop ? (i.top = this.position.y + t.paddingTop + "px", i.bottom = "") : (i.bottom = this.position.y + t.paddingBottom + "px", i.top = ""), this.css(i), this.emitEvent("layout", [this])
          };
          var y = f ? function(t, e) {
              return "translate3d(" + t + "px, " + e + "px, 0)"
          } : function(t, e) {
              return "translate(" + t + "px, " + e + "px)"
          };
          a.prototype._transitionTo = function(t, e) {
              this.getPosition();
              var i = this.position.x,
                  o = this.position.y,
                  n = parseInt(t, 10),
                  r = parseInt(e, 10),
                  s = n === this.position.x && r === this.position.y;
              if (this.setPosition(t, e), s && !this.isTransitioning) return this.layoutPosition(), void 0;
              var a = t - i,
                  u = e - o,
                  p = {},
                  h = this.layout.options;
              a = h.isOriginLeft ? a : -a, u = h.isOriginTop ? u : -u, p.transform = y(a, u), this.transition({
                  to: p,
                  onTransitionEnd: {
                      transform: this.layoutPosition
                  },
                  isCleaning: !0
              })
          }, a.prototype.goTo = function(t, e) {
              this.setPosition(t, e), this.layoutPosition()
          }, a.prototype.moveTo = h ? a.prototype._transitionTo : a.prototype.goTo, a.prototype.setPosition = function(t, e) {
              this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
          }, a.prototype._nonTransition = function(t) {
              this.css(t.to), t.isCleaning && this._removeStyles(t.to);
              for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
          }, a.prototype._transition = function(t) {
              if (!parseFloat(this.layout.options.transitionDuration)) return this._nonTransition(t), void 0;
              var e = this._transn;
              for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
              for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
              if (t.from) {
                  this.css(t.from);
                  var o = this.element.offsetHeight;
                  o = null
              }
              this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
          };
          var m = p && o(p) + ",opacity";
          a.prototype.enableTransition = function() {
              this.isTransitioning || (this.css({
                  transitionProperty: m,
                  transitionDuration: this.layout.options.transitionDuration
              }), this.element.addEventListener(d, this, !1))
          }, a.prototype.transition = a.prototype[u ? "_transition" : "_nonTransition"], a.prototype.onwebkitTransitionEnd = function(t) {
              this.ontransitionend(t)
          }, a.prototype.onotransitionend = function(t) {
              this.ontransitionend(t)
          };
          var g = {
              "-webkit-transform": "transform",
              "-moz-transform": "transform",
              "-o-transform": "transform"
          };
          a.prototype.ontransitionend = function(t) {
              if (t.target === this.element) {
                  var e = this._transn,
                      o = g[t.propertyName] || t.propertyName;
                  if (delete e.ingProperties[o], i(e.ingProperties) && this.disableTransition(), o in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[o]), o in e.onEnd) {
                      var n = e.onEnd[o];
                      n.call(this), delete e.onEnd[o]
                  }
                  this.emitEvent("transitionEnd", [this])
              }
          }, a.prototype.disableTransition = function() {
              this.removeTransitionStyles(), this.element.removeEventListener(d, this, !1), this.isTransitioning = !1
          }, a.prototype._removeStyles = function(t) {
              var e = {};
              for (var i in t) e[i] = "";
              this.css(e)
          };
          var v = {
              transitionProperty: "",
              transitionDuration: ""
          };
          return a.prototype.removeTransitionStyles = function() {
              this.css(v)
          }, a.prototype.removeElem = function() {
              this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
          }, a.prototype.remove = function() {
              if (!u || !parseFloat(this.layout.options.transitionDuration)) return this.removeElem(), void 0;
              var t = this;
              this.on("transitionEnd", function() {
                  return t.removeElem(), !0
              }), this.hide()
          }, a.prototype.reveal = function() {
              delete this.isHidden, this.css({
                  display: ""
              });
              var t = this.layout.options;
              this.transition({
                  from: t.hiddenStyle,
                  to: t.visibleStyle,
                  isCleaning: !0
              })
          }, a.prototype.hide = function() {
              this.isHidden = !0, this.css({
                  display: ""
              });
              var t = this.layout.options;
              this.transition({
                  from: t.visibleStyle,
                  to: t.hiddenStyle,
                  isCleaning: !0,
                  onTransitionEnd: {
                      opacity: function() {
                          this.isHidden && this.css({
                              display: "none"
                          })
                      }
                  }
              })
          }, a.prototype.destroy = function() {
              this.css({
                  position: "",
                  left: "",
                  right: "",
                  top: "",
                  bottom: "",
                  transition: "",
                  transform: ""
              })
          }, a
      }
      var r = t.getComputedStyle,
          s = r ? function(t) {
              return r(t, null)
          } : function(t) {
              return t.currentStyle
          };
      "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], n) : (t.Outlayer = {}, t.Outlayer.Item = n(t.EventEmitter, t.getSize, t.getStyleProperty))
  }(window),
  function(t) {
      function e(t, e) {
          for (var i in e) t[i] = e[i];
          return t
      }

      function i(t) {
          return "[object Array]" === f.call(t)
      }

      function o(t) {
          var e = [];
          if (i(t)) e = t;
          else if (t && "number" == typeof t.length)
              for (var o = 0, n = t.length; n > o; o++) e.push(t[o]);
          else e.push(t);
          return e
      }

      function n(t, e) {
          var i = l(e, t); - 1 !== i && e.splice(i, 1)
      }

      function r(t) {
          return t.replace(/(.)([A-Z])/g, function(t, e, i) {
              return e + "-" + i
          }).toLowerCase()
      }

      function s(i, s, f, l, c, y) {
          function m(t, i) {
              if ("string" == typeof t && (t = a.querySelector(t)), !t || !d(t)) return u && u.error("Bad " + this.constructor.namespace + " element: " + t), void 0;
              this.element = t, this.options = e({}, this.constructor.defaults), this.option(i);
              var o = ++g;
              this.element.outlayerGUID = o, v[o] = this, this._create(), this.options.isInitLayout && this.layout()
          }
          var g = 0,
              v = {};
          return m.namespace = "outlayer", m.Item = y, m.defaults = {
              containerStyle: {
                  position: "relative"
              },
              isInitLayout: !0,
              isOriginLeft: !0,
              isOriginTop: !0,
              isResizeBound: !0,
              isResizingContainer: !0,
              transitionDuration: "0.4s",
              hiddenStyle: {
                  opacity: 0,
                  transform: "scale(0.001)"
              },
              visibleStyle: {
                  opacity: 1,
                  transform: "scale(1)"
              }
          }, e(m.prototype, f.prototype), m.prototype.option = function(t) {
              e(this.options, t)
          }, m.prototype._create = function() {
              this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
          }, m.prototype.reloadItems = function() {
              this.items = this._itemize(this.element.children)
          }, m.prototype._itemize = function(t) {
              for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0, r = e.length; r > n; n++) {
                  var s = e[n],
                      a = new i(s, this);
                  o.push(a)
              }
              return o
          }, m.prototype._filterFindItemElements = function(t) {
              t = o(t);
              for (var e = this.options.itemSelector, i = [], n = 0, r = t.length; r > n; n++) {
                  var s = t[n];
                  if (d(s))
                      if (e) {
                          c(s, e) && i.push(s);
                          for (var a = s.querySelectorAll(e), u = 0, p = a.length; p > u; u++) i.push(a[u])
                      } else i.push(s)
              }
              return i
          }, m.prototype.getItemElements = function() {
              for (var t = [], e = 0, i = this.items.length; i > e; e++) t.push(this.items[e].element);
              return t
          }, m.prototype.layout = function() {
              this._resetLayout(), this._manageStamps();
              var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
              this.layoutItems(this.items, t), this._isLayoutInited = !0
          }, m.prototype._init = m.prototype.layout, m.prototype._resetLayout = function() {
              this.getSize()
          }, m.prototype.getSize = function() {
              this.size = l(this.element)
          }, m.prototype._getMeasurement = function(t, e) {
              var i, o = this.options[t];
              o ? ("string" == typeof o ? i = this.element.querySelector(o) : d(o) && (i = o), this[t] = i ? l(i)[e] : o) : this[t] = 0
          }, m.prototype.layoutItems = function(t, e) {
              t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
          }, m.prototype._getItemsForLayout = function(t) {
              for (var e = [], i = 0, o = t.length; o > i; i++) {
                  var n = t[i];
                  n.isIgnored || e.push(n)
              }
              return e
          }, m.prototype._layoutItems = function(t, e) {
              function i() {
                  o.emitEvent("layoutComplete", [o, t])
              }
              var o = this;
              if (!t || !t.length) return i(), void 0;
              this._itemsOn(t, "layout", i);
              for (var n = [], r = 0, s = t.length; s > r; r++) {
                  var a = t[r],
                      u = this._getItemLayoutPosition(a);
                  u.item = a, u.isInstant = e || a.isLayoutInstant, n.push(u)
              }
              this._processLayoutQueue(n)
          }, m.prototype._getItemLayoutPosition = function() {
              return {
                  x: 0,
                  y: 0
              }
          }, m.prototype._processLayoutQueue = function(t) {
              for (var e = 0, i = t.length; i > e; e++) {
                  var o = t[e];
                  this._positionItem(o.item, o.x, o.y, o.isInstant)
              }
          }, m.prototype._positionItem = function(t, e, i, o) {
              o ? t.goTo(e, i) : t.moveTo(e, i)
          }, m.prototype._postLayout = function() {
              this.resizeContainer()
          }, m.prototype.resizeContainer = function() {
              if (this.options.isResizingContainer) {
                  var t = this._getContainerSize();
                  t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
              }
          }, m.prototype._getContainerSize = h, m.prototype._setContainerMeasure = function(t, e) {
              if (void 0 !== t) {
                  var i = this.size;
                  i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
              }
          }, m.prototype._itemsOn = function(t, e, i) {
              function o() {
                  return n++, n === r && i.call(s), !0
              }
              for (var n = 0, r = t.length, s = this, a = 0, u = t.length; u > a; a++) {
                  var p = t[a];
                  p.on(e, o)
              }
          }, m.prototype.ignore = function(t) {
              var e = this.getItem(t);
              e && (e.isIgnored = !0)
          }, m.prototype.unignore = function(t) {
              var e = this.getItem(t);
              e && delete e.isIgnored
          }, m.prototype.stamp = function(t) {
              if (t = this._find(t)) {
                  this.stamps = this.stamps.concat(t);
                  for (var e = 0, i = t.length; i > e; e++) {
                      var o = t[e];
                      this.ignore(o)
                  }
              }
          }, m.prototype.unstamp = function(t) {
              if (t = this._find(t))
                  for (var e = 0, i = t.length; i > e; e++) {
                      var o = t[e];
                      n(o, this.stamps), this.unignore(o)
                  }
          }, m.prototype._find = function(t) {
              return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = o(t)) : void 0
          }, m.prototype._manageStamps = function() {
              if (this.stamps && this.stamps.length) {
                  this._getBoundingRect();
                  for (var t = 0, e = this.stamps.length; e > t; t++) {
                      var i = this.stamps[t];
                      this._manageStamp(i)
                  }
              }
          }, m.prototype._getBoundingRect = function() {
              var t = this.element.getBoundingClientRect(),
                  e = this.size;
              this._boundingRect = {
                  left: t.left + e.paddingLeft + e.borderLeftWidth,
                  top: t.top + e.paddingTop + e.borderTopWidth,
                  right: t.right - (e.paddingRight + e.borderRightWidth),
                  bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
              }
          }, m.prototype._manageStamp = h, m.prototype._getElementOffset = function(t) {
              var e = t.getBoundingClientRect(),
                  i = this._boundingRect,
                  o = l(t),
                  n = {
                      left: e.left - i.left - o.marginLeft,
                      top: e.top - i.top - o.marginTop,
                      right: i.right - e.right - o.marginRight,
                      bottom: i.bottom - e.bottom - o.marginBottom
                  };
              return n
          }, m.prototype.handleEvent = function(t) {
              var e = "on" + t.type;
              this[e] && this[e](t)
          }, m.prototype.bindResize = function() {
              this.isResizeBound || (i.bind(t, "resize", this), this.isResizeBound = !0)
          }, m.prototype.unbindResize = function() {
              this.isResizeBound && i.unbind(t, "resize", this), this.isResizeBound = !1
          }, m.prototype.onresize = function() {
              function t() {
                  e.resize(), delete e.resizeTimeout
              }
              this.resizeTimeout && clearTimeout(this.resizeTimeout);
              var e = this;
              this.resizeTimeout = setTimeout(t, 100)
          }, m.prototype.resize = function() {
              this.isResizeBound && this.needsResizeLayout() && this.layout()
          }, m.prototype.needsResizeLayout = function() {
              var t = l(this.element),
                  e = this.size && t;
              return e && t.innerWidth !== this.size.innerWidth
          }, m.prototype.addItems = function(t) {
              var e = this._itemize(t);
              return e.length && (this.items = this.items.concat(e)), e
          }, m.prototype.appended = function(t) {
              var e = this.addItems(t);
              e.length && (this.layoutItems(e, !0), this.reveal(e))
          }, m.prototype.prepended = function(t) {
              var e = this._itemize(t);
              if (e.length) {
                  var i = this.items.slice(0);
                  this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
              }
          }, m.prototype.reveal = function(t) {
              var e = t && t.length;
              if (e)
                  for (var i = 0; e > i; i++) {
                      var o = t[i];
                      o.reveal()
                  }
          }, m.prototype.hide = function(t) {
              var e = t && t.length;
              if (e)
                  for (var i = 0; e > i; i++) {
                      var o = t[i];
                      o.hide()
                  }
          }, m.prototype.getItem = function(t) {
              for (var e = 0, i = this.items.length; i > e; e++) {
                  var o = this.items[e];
                  if (o.element === t) return o
              }
          }, m.prototype.getItems = function(t) {
              if (t && t.length) {
                  for (var e = [], i = 0, o = t.length; o > i; i++) {
                      var n = t[i],
                          r = this.getItem(n);
                      r && e.push(r)
                  }
                  return e
              }
          }, m.prototype.remove = function(t) {
              t = o(t);
              var e = this.getItems(t);
              if (e && e.length) {
                  this._itemsOn(e, "remove", function() {
                      this.emitEvent("removeComplete", [this, e])
                  });
                  for (var i = 0, r = e.length; r > i; i++) {
                      var s = e[i];
                      s.remove(), n(s, this.items)
                  }
              }
          }, m.prototype.destroy = function() {
              var t = this.element.style;
              t.height = "", t.position = "", t.width = "";
              for (var e = 0, i = this.items.length; i > e; e++) {
                  var o = this.items[e];
                  o.destroy()
              }
              this.unbindResize(), delete this.element.outlayerGUID, p && p.removeData(this.element, this.constructor.namespace)
          }, m.data = function(t) {
              var e = t && t.outlayerGUID;
              return e && v[e]
          }, m.create = function(t, i) {
              function o() {
                  m.apply(this, arguments)
              }
              return Object.create ? o.prototype = Object.create(m.prototype) : e(o.prototype, m.prototype), o.prototype.constructor = o, o.defaults = e({}, m.defaults), e(o.defaults, i), o.prototype.settings = {}, o.namespace = t, o.data = m.data, o.Item = function() {
                  y.apply(this, arguments)
              }, o.Item.prototype = new y, s(function() {
                  for (var e = r(t), i = a.querySelectorAll(".js-" + e), n = "data-" + e + "-options", s = 0, h = i.length; h > s; s++) {
                      var f, d = i[s],
                          l = d.getAttribute(n);
                      try {
                          f = l && JSON.parse(l)
                      } catch (c) {
                          u && u.error("Error parsing " + n + " on " + d.nodeName.toLowerCase() + (d.id ? "#" + d.id : "") + ": " + c);
                          continue
                      }
                      var y = new o(d, f);
                      p && p.data(d, t, y)
                  }
              }), p && p.bridget && p.bridget(t, o), o
          }, m.Item = y, m
      }
      var a = t.document,
          u = t.console,
          p = t.jQuery,
          h = function() {},
          f = Object.prototype.toString,
          d = "object" == typeof HTMLElement ? function(t) {
              return t instanceof HTMLElement
          } : function(t) {
              return t && "object" == typeof t && 1 === t.nodeType && "string" == typeof t.nodeName
          },
          l = Array.prototype.indexOf ? function(t, e) {
              return t.indexOf(e)
          } : function(t, e) {
              for (var i = 0, o = t.length; o > i; i++)
                  if (t[i] === e) return i;
              return -1
          };
      "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], s) : t.Outlayer = s(t.eventie, t.docReady, t.EventEmitter, t.getSize, t.matchesSelector, t.Outlayer.Item)
  }(window),
  function(t) {
      function e(t) {
          function e() {
              t.Item.apply(this, arguments)
          }
          e.prototype = new t.Item, e.prototype._create = function() {
              this.id = this.layout.itemGUID++, t.Item.prototype._create.call(this), this.sortData = {}
          }, e.prototype.updateSortData = function() {
              if (!this.isIgnored) {
                  this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
                  var t = this.layout.options.getSortData,
                      e = this.layout._sorters;
                  for (var i in t) {
                      var o = e[i];
                      this.sortData[i] = o(this.element, this)
                  }
              }
          };
          var i = e.prototype.destroy;
          return e.prototype.destroy = function() {
              i.apply(this, arguments), this.css({
                  display: ""
              })
          }, e
      }
      "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
  }(window),
  function(t) {
      function e(t, e) {
          function i(t) {
              this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
          }
          return function() {
              function t(t) {
                  return function() {
                      return e.prototype[t].apply(this.isotope, arguments)
                  }
              }
              for (var o = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout"], n = 0, r = o.length; r > n; n++) {
                  var s = o[n];
                  i.prototype[s] = t(s)
              }
          }(), i.prototype.needsVerticalResizeLayout = function() {
              var e = t(this.isotope.element),
                  i = this.isotope.size && e;
              return i && e.innerHeight !== this.isotope.size.innerHeight
          }, i.prototype._getMeasurement = function() {
              this.isotope._getMeasurement.apply(this, arguments)
          }, i.prototype.getColumnWidth = function() {
              this.getSegmentSize("column", "Width")
          }, i.prototype.getRowHeight = function() {
              this.getSegmentSize("row", "Height")
          }, i.prototype.getSegmentSize = function(t, e) {
              var i = t + e,
                  o = "outer" + e;
              if (this._getMeasurement(i, o), !this[i]) {
                  var n = this.getFirstItemSize();
                  this[i] = n && n[o] || this.isotope.size["inner" + e]
              }
          }, i.prototype.getFirstItemSize = function() {
              var e = this.isotope.filteredItems[0];
              return e && e.element && t(e.element)
          }, i.prototype.layout = function() {
              this.isotope.layout.apply(this.isotope, arguments)
          }, i.prototype.getSize = function() {
              this.isotope.getSize(), this.size = this.isotope.size
          }, i.modes = {}, i.create = function(t, e) {
              function o() {
                  i.apply(this, arguments)
              }
              return o.prototype = new i, e && (o.options = e), o.prototype.namespace = t, i.modes[t] = o, o
          }, i
      }
      "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
  }(window),
  function(t) {
      function e(t, e) {
          var o = t.create("masonry");
          return o.prototype._resetLayout = function() {
              this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
              var t = this.cols;
              for (this.colYs = []; t--;) this.colYs.push(0);
              this.maxY = 0
          }, o.prototype.measureColumns = function() {
              if (this.getContainerWidth(), !this.columnWidth) {
                  var t = this.items[0],
                      i = t && t.element;
                  this.columnWidth = i && e(i).outerWidth || this.containerWidth
              }
              this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1)
          }, o.prototype.getContainerWidth = function() {
              var t = this.options.isFitWidth ? this.element.parentNode : this.element,
                  i = e(t);
              this.containerWidth = i && i.innerWidth
          }, o.prototype._getItemLayoutPosition = function(t) {
              t.getSize();
              var e = t.size.outerWidth % this.columnWidth,
                  o = e && 1 > e ? "round" : "ceil",
                  n = Math[o](t.size.outerWidth / this.columnWidth);
              n = Math.min(n, this.cols);
              for (var r = this._getColGroup(n), s = Math.min.apply(Math, r), a = i(r, s), u = {
                      x: this.columnWidth * a,
                      y: s
                  }, p = s + t.size.outerHeight, h = this.cols + 1 - r.length, f = 0; h > f; f++) this.colYs[a + f] = p;
              return u
          }, o.prototype._getColGroup = function(t) {
              if (2 > t) return this.colYs;
              for (var e = [], i = this.cols + 1 - t, o = 0; i > o; o++) {
                  var n = this.colYs.slice(o, o + t);
                  e[o] = Math.max.apply(Math, n)
              }
              return e
          }, o.prototype._manageStamp = function(t) {
              var i = e(t),
                  o = this._getElementOffset(t),
                  n = this.options.isOriginLeft ? o.left : o.right,
                  r = n + i.outerWidth,
                  s = Math.floor(n / this.columnWidth);
              s = Math.max(0, s);
              var a = Math.floor(r / this.columnWidth);
              a -= r % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
              for (var u = (this.options.isOriginTop ? o.top : o.bottom) + i.outerHeight, p = s; a >= p; p++) this.colYs[p] = Math.max(u, this.colYs[p])
          }, o.prototype._getContainerSize = function() {
              this.maxY = Math.max.apply(Math, this.colYs);
              var t = {
                  height: this.maxY
              };
              return this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
          }, o.prototype._getContainerFitWidth = function() {
              for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
              return (this.cols - t) * this.columnWidth - this.gutter
          }, o.prototype.needsResizeLayout = function() {
              var t = this.containerWidth;
              return this.getContainerWidth(), t !== this.containerWidth
          }, o
      }
      var i = Array.prototype.indexOf ? function(t, e) {
          return t.indexOf(e)
      } : function(t, e) {
          for (var i = 0, o = t.length; o > i; i++) {
              var n = t[i];
              if (n === e) return i
          }
          return -1
      };
      "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : t.Masonry = e(t.Outlayer, t.getSize)
  }(window),
  function(t) {
      function e(t, e) {
          for (var i in e) t[i] = e[i];
          return t
      }

      function i(t, i) {
          var o = t.create("masonry"),
              n = o.prototype._getElementOffset,
              r = o.prototype.layout,
              s = o.prototype._getMeasurement;
          e(o.prototype, i.prototype), o.prototype._getElementOffset = n, o.prototype.layout = r, o.prototype._getMeasurement = s;
          var a = o.prototype.measureColumns;
          o.prototype.measureColumns = function() {
              this.items = this.isotope.filteredItems, a.call(this)
          };
          var u = o.prototype._manageStamp;
          return o.prototype._manageStamp = function() {
              this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, u.apply(this, arguments)
          }, o
      }
      "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], i) : i(t.Isotope.LayoutMode, t.Masonry)
  }(window),
  function(t) {
      function e(t) {
          var e = t.create("fitRows");
          return e.prototype._resetLayout = function() {
              this.x = 0, this.y = 0, this.maxY = 0
          }, e.prototype._getItemLayoutPosition = function(t) {
              t.getSize(), 0 !== this.x && t.size.outerWidth + this.x > this.isotope.size.innerWidth && (this.x = 0, this.y = this.maxY);
              var e = {
                  x: this.x,
                  y: this.y
              };
              return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += t.size.outerWidth, e
          }, e.prototype._getContainerSize = function() {
              return {
                  height: this.maxY
              }
          }, e
      }
      "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : e(t.Isotope.LayoutMode)
  }(window),
  function(t) {
      function e(t) {
          var e = t.create("vertical", {
              horizontalAlignment: 0
          });
          return e.prototype._resetLayout = function() {
              this.y = 0
          }, e.prototype._getItemLayoutPosition = function(t) {
              t.getSize();
              var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
                  i = this.y;
              return this.y += t.size.outerHeight, {
                  x: e,
                  y: i
              }
          }, e.prototype._getContainerSize = function() {
              return {
                  height: this.y
              }
          }, e
      }
      "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : e(t.Isotope.LayoutMode)
  }(window),
  function(t) {
      function e(t, e) {
          for (var i in e) t[i] = e[i];
          return t
      }

      function i(t) {
          return "[object Array]" === h.call(t)
      }

      function o(t) {
          var e = [];
          if (i(t)) e = t;
          else if (t && "number" == typeof t.length)
              for (var o = 0, n = t.length; n > o; o++) e.push(t[o]);
          else e.push(t);
          return e
      }

      function n(t, e) {
          var i = f(e, t); - 1 !== i && e.splice(i, 1)
      }

      function r(t, i, r, u, h) {
          function f(t, e) {
              return function(i, o) {
                  for (var n = 0, r = t.length; r > n; n++) {
                      var s = t[n],
                          a = i.sortData[s],
                          u = o.sortData[s];
                      if (a > u || u > a) {
                          var p = void 0 !== e[s] ? e[s] : e,
                              h = p ? 1 : -1;
                          return (a > u ? 1 : -1) * h
                      }
                  }
                  return 0
              }
          }
          var d = t.create("isotope", {
              layoutMode: "masonry",
              isJQueryFiltering: !0,
              sortAscending: !0
          });
          d.Item = u, d.LayoutMode = h, d.prototype._create = function() {
              this.itemGUID = 0, this._sorters = {}, this._getSorters(), t.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
              for (var e in h.modes) this._initLayoutMode(e)
          }, d.prototype.reloadItems = function() {
              this.itemGUID = 0, t.prototype.reloadItems.call(this)
          }, d.prototype._itemize = function() {
              for (var e = t.prototype._itemize.apply(this, arguments), i = 0, o = e.length; o > i; i++) {
                  var n = e[i];
                  n.id = this.itemGUID++
              }
              return this._updateItemsSortData(e), e
          }, d.prototype._initLayoutMode = function(t) {
              var i = h.modes[t],
                  o = this.options[t] || {};
              this.options[t] = i.options ? e(i.options, o) : o, this.modes[t] = new i(this)
          }, d.prototype.layout = function() {
              return !this._isLayoutInited && this.options.isInitLayout ? (this.arrange(), void 0) : (this._layout(), void 0)
          }, d.prototype._layout = function() {
              var t = this._getIsInstant();
              this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
          }, d.prototype.arrange = function(t) {
              this.option(t), this._getIsInstant(), this.filteredItems = this._filter(this.items), this._sort(), this._layout()
          }, d.prototype._init = d.prototype.arrange, d.prototype._getIsInstant = function() {
              var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
              return this._isInstant = t, t
          }, d.prototype._filter = function(t) {
              function e() {
                  f.reveal(n), f.hide(r)
              }
              var i = this.options.filter;
              i = i || "*";
              for (var o = [], n = [], r = [], s = this._getFilterTest(i), a = 0, u = t.length; u > a; a++) {
                  var p = t[a];
                  if (!p.isIgnored) {
                      var h = s(p);
                      h && o.push(p), h && p.isHidden ? n.push(p) : h || p.isHidden || r.push(p)
                  }
              }
              var f = this;
              return this._isInstant ? this._noTransition(e) : e(), o
          }, d.prototype._getFilterTest = function(t) {
              return s && this.options.isJQueryFiltering ? function(e) {
                  return s(e.element).is(t)
              } : "function" == typeof t ? function(e) {
                  return t(e.element)
              } : function(e) {
                  return r(e.element, t)
              }
          }, d.prototype.updateSortData = function(t) {
              this._getSorters(), t = o(t);
              var e = this.getItems(t);
              e = e.length ? e : this.items, this._updateItemsSortData(e)
          }, d.prototype._getSorters = function() {
              var t = this.options.getSortData;
              for (var e in t) {
                  var i = t[e];
                  this._sorters[e] = l(i)
              }
          }, d.prototype._updateItemsSortData = function(t) {
              for (var e = 0, i = t.length; i > e; e++) {
                  var o = t[e];
                  o.updateSortData()
              }
          };
          var l = function() {
              function t(t) {
                  if ("string" != typeof t) return t;
                  var i = a(t).split(" "),
                      o = i[0],
                      n = o.match(/^\[(.+)\]$/),
                      r = n && n[1],
                      s = e(r, o),
                      u = d.sortDataParsers[i[1]];
                  return t = u ? function(t) {
                      return t && u(s(t))
                  } : function(t) {
                      return t && s(t)
                  }
              }

              function e(t, e) {
                  var i;
                  return i = t ? function(e) {
                      return e.getAttribute(t)
                  } : function(t) {
                      var i = t.querySelector(e);
                      return i && p(i)
                  }
              }
              return t
          }();
          d.sortDataParsers = {
              parseInt: function(t) {
                  return parseInt(t, 10)
              },
              parseFloat: function(t) {
                  return parseFloat(t)
              }
          }, d.prototype._sort = function() {
              var t = this.options.sortBy;
              if (t) {
                  var e = [].concat.apply(t, this.sortHistory),
                      i = f(e, this.options.sortAscending);
                  this.filteredItems.sort(i), t !== this.sortHistory[0] && this.sortHistory.unshift(t)
              }
          }, d.prototype._mode = function() {
              var t = this.options.layoutMode,
                  e = this.modes[t];
              if (!e) throw Error("No layout mode: " + t);
              return e.options = this.options[t], e
          }, d.prototype._resetLayout = function() {
              t.prototype._resetLayout.call(this), this._mode()._resetLayout()
          }, d.prototype._getItemLayoutPosition = function(t) {
              return this._mode()._getItemLayoutPosition(t)
          }, d.prototype._manageStamp = function(t) {
              this._mode()._manageStamp(t)
          }, d.prototype._getContainerSize = function() {
              return this._mode()._getContainerSize()
          }, d.prototype.needsResizeLayout = function() {
              return this._mode().needsResizeLayout()
          }, d.prototype.appended = function(t) {
              var e = this.addItems(t);
              if (e.length) {
                  var i = this._filterRevealAdded(e);
                  this.filteredItems = this.filteredItems.concat(i)
              }
          }, d.prototype.prepended = function(t) {
              var e = this._itemize(t);
              if (e.length) {
                  var i = this.items.slice(0);
                  this.items = e.concat(i), this._resetLayout(), this._manageStamps();
                  var o = this._filterRevealAdded(e);
                  this.layoutItems(i), this.filteredItems = o.concat(this.filteredItems)
              }
          }, d.prototype._filterRevealAdded = function(t) {
              var e = this._noTransition(function() {
                  return this._filter(t)
              });
              return this.layoutItems(e, !0), this.reveal(e), t
          }, d.prototype.insert = function(t) {
              var e = this.addItems(t);
              if (e.length) {
                  var i, o, n = e.length;
                  for (i = 0; n > i; i++) o = e[i], this.element.appendChild(o.element);
                  var r = this._filter(e);
                  for (this._noTransition(function() {
                          this.hide(r)
                      }), i = 0; n > i; i++) e[i].isLayoutInstant = !0;
                  for (this.arrange(), i = 0; n > i; i++) delete e[i].isLayoutInstant;
                  this.reveal(r)
              }
          };
          var c = d.prototype.remove;
          return d.prototype.remove = function(t) {
              t = o(t);
              var e = this.getItems(t);
              if (c.call(this, t), e && e.length)
                  for (var i = 0, r = e.length; r > i; i++) {
                      var s = e[i];
                      n(s, this.filteredItems)
                  }
          }, d.prototype.shuffle = function() {
              for (var t = 0, e = this.items.length; e > t; t++) {
                  var i = this.items[t];
                  i.sortData.random = Math.random()
              }
              this.options.sortBy = "random", this._sort(), this._layout()
          }, d.prototype._noTransition = function(t) {
              var e = this.options.transitionDuration;
              this.options.transitionDuration = 0;
              var i = t.call(this);
              return this.options.transitionDuration = e, i
          }, d.prototype.getFilteredItemElements = function() {
              for (var t = [], e = 0, i = this.filteredItems.length; i > e; e++) t.push(this.filteredItems[e].element);
              return t
          }, d
      }
      var s = t.jQuery,
          a = String.prototype.trim ? function(t) {
              return t.trim()
          } : function(t) {
              return t.replace(/^\s+|\s+$/g, "")
          },
          u = document.documentElement,
          p = u.textContent ? function(t) {
              return t.textContent
          } : function(t) {
              return t.innerText
          },
          h = Object.prototype.toString,
          f = Array.prototype.indexOf ? function(t, e) {
              return t.indexOf(e)
          } : function(t, e) {
              for (var i = 0, o = t.length; o > i; i++)
                  if (t[i] === e) return i;
              return -1
          };
      "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], r) : t.Isotope = r(t.Outlayer, t.getSize, t.matchesSelector, t.Isotope.Item, t.Isotope.LayoutMode)
  }(window);;
/*** Script File: /f/js/modernizr.custom.67394.js, Original size: 15,317, Compressed size: 14,691 ***/
window.Modernizr = function(a, b, c) {
      function C(a) {
          j.cssText = a
      }

      function D(a, b) {
          return C(n.join(a + ";") + (b || ""))
      }

      function E(a, b) {
          return typeof a === b
      }

      function F(a, b) {
          return !!~("" + a).indexOf(b)
      }

      function G(a, b) {
          for (var d in a) {
              var e = a[d];
              if (!F(e, "-") && j[e] !== c) return b == "pfx" ? e : !0
          };
          return !1
      }

      function H(a, b, d) {
          for (var e in a) {
              var f = b[a[e]];
              if (f !== c) return d === !1 ? a[e] : E(f, "function") ? f.bind(d || b) : f
          };
          return !1
      }

      function I(a, b, c) {
          var d = a.charAt(0).toUpperCase() + a.slice(1),
              e = (a + " " + p.join(d + " ") + d).split(" ");
          return E(b, "string") || E(b, "undefined") ? G(e, b) : (e = (a + " " + q.join(d + " ") + d).split(" "), H(e, b, c))
      }

      function J() {
          e.input = function(c) {
              for (var d = 0, e = c.length; d < e; d++) u[c[d]] = c[d] in k;
              return u.list && (u.list = !!b.createElement("datalist") && !!a.HTMLDataListElement), u
          }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), e.inputtypes = function(a) {
              for (var d = 0, e, f, h, i = a.length; d < i; d++) k.setAttribute("type", f = a[d]), e = k.type !== "text", e && (k.value = l, k.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(f) && k.style.WebkitAppearance !== c ? (g.appendChild(k), h = b.defaultView, e = h.getComputedStyle && h.getComputedStyle(k, null).WebkitAppearance !== "textfield" && k.offsetHeight !== 0, g.removeChild(k)) : /^(search|tel)$/.test(f) || (/^(url|email)$/.test(f) ? e = k.checkValidity && k.checkValidity() === !1 : e = k.value != l)), t[a[d]] = !!e;
              return t
          }("search tel url email datetime date month week time datetime-local number range color".split(" "))
      };
      var d = "2.8.2",
          e = {},
          f = !0,
          g = b.documentElement,
          h = "modernizr",
          i = b.createElement(h),
          j = i.style,
          k = b.createElement("input"),
          l = ":)",
          m = {}.toString,
          n = " -webkit- -moz- -o- -ms- ".split(" "),
          o = "Webkit Moz O ms",
          p = o.split(" "),
          q = o.toLowerCase().split(" "),
          r = {
              svg: "http://www.w3.org/2000/svg"
          },
          s = {},
          t = {},
          u = {},
          v = [],
          w = v.slice,
          x, y = function(a, c, d, e) {
              var f, i, j, k, l = b.createElement("div"),
                  m = b.body,
                  n = m || b.createElement("body");
              if (parseInt(d, 10))
                  while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
              return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i
          },
          z = function() {
              function d(d, e) {
                  e = e || b.createElement(a[d] || "div"), d = "on" + d;
                  var f = d in e;
                  return f || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(d, ""), f = E(e[d], "function"), E(e[d], "undefined") || (e[d] = c), e.removeAttribute(d))), e = null, f
              };
              var a = {
                  select: "input",
                  change: "input",
                  submit: "form",
                  reset: "form",
                  error: "img",
                  load: "img",
                  abort: "img"
              };
              return d
          }(),
          A = {}.hasOwnProperty,
          B;
      !E(A, "undefined") && !E(A.call, "undefined") ? B = function(a, b) {
          return A.call(a, b)
      } : B = function(a, b) {
          return b in a && E(a.constructor.prototype[b], "undefined")
      }, Function.prototype.bind || (Function.prototype.bind = function(b) {
          var c = this;
          if (typeof c != "function") throw new TypeError();
          var d = w.call(arguments, 1),
              e = function() {
                  if (this instanceof e) {
                      var a = function() {};
                      a.prototype = c.prototype;
                      var f = new a(),
                          g = c.apply(f, d.concat(w.call(arguments)));
                      return Object(g) === g ? g : f
                  };
                  return c.apply(b, d.concat(w.call(arguments)))
              };
          return e
      }), s.flexbox = function() {
          return I("flexWrap")
      }, s.flexboxlegacy = function() {
          return I("boxDirection")
      }, s.canvas = function() {
          var a = b.createElement("canvas");
          return !!a.getContext && !!a.getContext("2d")
      }, s.canvastext = function() {
          return !!e.canvas && !!E(b.createElement("canvas").getContext("2d").fillText, "function")
      }, s.webgl = function() {
          return !!a.WebGLRenderingContext
      }, s.touch = function() {
          var c;
          return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : y(["@media (", n.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
              c = a.offsetTop === 9
          }), c
      }, s.geolocation = function() {
          return "geolocation" in navigator
      }, s.postmessage = function() {
          return !!a.postMessage
      }, s.websqldatabase = function() {
          return !!a.openDatabase
      }, s.indexedDB = function() {
          return !!I("indexedDB", a)
      }, s.hashchange = function() {
          return z("hashchange", a) && (b.documentMode === c || b.documentMode > 7)
      }, s.history = function() {
          return !!a.history && !!history.pushState
      }, s.draganddrop = function() {
          var a = b.createElement("div");
          return "draggable" in a || "ondragstart" in a && "ondrop" in a
      }, s.websockets = function() {
          return "WebSocket" in a || "MozWebSocket" in a
      }, s.rgba = function() {
          return C("background-color:rgba(150,255,150,.5)"), F(j.backgroundColor, "rgba")
      }, s.hsla = function() {
          return C("background-color:hsla(120,40%,100%,.5)"), F(j.backgroundColor, "rgba") || F(j.backgroundColor, "hsla")
      }, s.multiplebgs = function() {
          return C("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(j.background)
      }, s.backgroundsize = function() {
          return I("backgroundSize")
      }, s.borderimage = function() {
          return I("borderImage")
      }, s.borderradius = function() {
          return I("borderRadius")
      }, s.boxshadow = function() {
          return I("boxShadow")
      }, s.textshadow = function() {
          return b.createElement("div").style.textShadow === ""
      }, s.opacity = function() {
          return D("opacity:.55"), /^0.55$/.test(j.opacity)
      }, s.cssanimations = function() {
          return I("animationName")
      }, s.csscolumns = function() {
          return I("columnCount")
      }, s.cssgradients = function() {
          var a = "background-image:",
              b = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
              c = "linear-gradient(left top,#9f9, white);";
          return C((a + "-webkit- ".split(" ").join(b + a) + n.join(c + a)).slice(0, -a.length)), F(j.backgroundImage, "gradient")
      }, s.cssreflections = function() {
          return I("boxReflect")
      }, s.csstransforms = function() {
          return !!I("transform")
      }, s.csstransforms3d = function() {
          var a = !!I("perspective");
          return a && "webkitPerspective" in g.style && y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(b, c) {
              a = b.offsetLeft === 9 && b.offsetHeight === 3
          }), a
      }, s.csstransitions = function() {
          return I("transition")
      }, s.fontface = function() {
          var a;
          return y('@font-face {font-family:"font";src:url("https://")}', function(c, d) {
              var e = b.getElementById("smodernizr"),
                  f = e.sheet || e.styleSheet,
                  g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "";
              a = /src/i.test(g) && g.indexOf(d.split(" ")[0]) === 0
          }), a
      }, s.generatedcontent = function() {
          var a;
          return y(["#", h, "{font:0/0 a}#", h, ':after{content:"', l, '";visibility:hidden;font:3px/1 a}'].join(""), function(b) {
              a = b.offsetHeight >= 3
          }), a
      }, s.video = function() {
          var a = b.createElement("video"),
              c = !1;
          try {
              if (c = !!a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "")
          } catch (d) {};
          return c
      }, s.audio = function() {
          var a = b.createElement("audio"),
              c = !1;
          try {
              if (c = !!a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, "")
          } catch (d) {};
          return c
      }, s.localstorage = function() {
          try {
              return localStorage.setItem(h, h), localStorage.removeItem(h), !0
          } catch (a) {
              return !1
          }
      }, s.sessionstorage = function() {
          try {
              return sessionStorage.setItem(h, h), sessionStorage.removeItem(h), !0
          } catch (a) {
              return !1
          }
      }, s.webworkers = function() {
          return !!a.Worker
      }, s.applicationcache = function() {
          return !!a.applicationCache
      }, s.svg = function() {
          return !!b.createElementNS && !!b.createElementNS(r.svg, "svg").createSVGRect
      }, s.inlinesvg = function() {
          var a = b.createElement("div");
          return a.innerHTML = "<svg/>", (a.firstChild && a.firstChild.namespaceURI) == r.svg
      }, s.smil = function() {
          return !!b.createElementNS && /SVGAnimate/.test(m.call(b.createElementNS(r.svg, "animate")))
      }, s.svgclippaths = function() {
          return !!b.createElementNS && /SVGClipPath/.test(m.call(b.createElementNS(r.svg, "clipPath")))
      };
      for (var K in s) B(s, K) && (x = K.toLowerCase(), e[x] = s[K](), v.push((e[x] ? "" : "no-") + x));
      return e.input || J(), e.addTest = function(a, b) {
              if (typeof a == "object") {
                  for (var d in a) B(a, d) && e.addTest(d, a[d])
              } else {
                  a = a.toLowerCase();
                  if (e[a] !== c) return e;
                  b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b
              };
              return e
          }, C(""), i = k = null,
          function(a, b) {
              function l(a, b) {
                  var c = a.createElement("p"),
                      d = a.getElementsByTagName("head")[0] || a.documentElement;
                  return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
              }

              function m() {
                  var a = s.elements;
                  return typeof a == "string" ? a.split(" ") : a
              }

              function n(a) {
                  var b = j[a[h]];
                  return b || (b = {}, i++, a[h] = i, j[i] = b), b
              }

              function o(a, c, d) {
                  c || (c = b);
                  if (k) return c.createElement(a);
                  d || (d = n(c));
                  var g;
                  return d.cache[a] ? g = d.cache[a].cloneNode() : f.test(a) ? g = (d.cache[a] = d.createElem(a)).cloneNode() : g = d.createElem(a), g.canHaveChildren && !e.test(a) && !g.tagUrn ? d.frag.appendChild(g) : g
              }

              function p(a, c) {
                  a || (a = b);
                  if (k) return a.createDocumentFragment();
                  c = c || n(a);
                  var d = c.frag.cloneNode(),
                      e = 0,
                      f = m(),
                      g = f.length;
                  for (; e < g; e++) d.createElement(f[e]);
                  return d
              }

              function q(a, b) {
                  b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c) {
                      return s.shivMethods ? o(c, a, b) : b.createElem(c)
                  }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + m().join().replace(/[\w\-]+/g, function(a) {
                      return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
                  }) + ");return n}")(s, b.frag)
              }

              function r(a) {
                  a || (a = b);
                  var c = n(a);
                  return s.shivCSS && !g && !c.hasCSS && (c.hasCSS = !!l(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), k || q(a, c), a
              };
              var c = "3.7.0",
                  d = a.html5 || {},
                  e = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                  f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                  g, h = "_html5shiv",
                  i = 0,
                  j = {},
                  k;
              (function() {
                  try {
                      var a = b.createElement("a");
                      a.innerHTML = "<xyz></xyz>", g = "hidden" in a, k = a.childNodes.length == 1 || function() {
                          b.createElement("a");
                          var a = b.createDocumentFragment();
                          return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined"
                      }()
                  } catch (c) {
                      g = !0, k = !0
                  }
              })();
              var s = {
                  elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                  version: c,
                  shivCSS: d.shivCSS !== !1,
                  supportsUnknownElements: k,
                  shivMethods: d.shivMethods !== !1,
                  type: "default",
                  shivDocument: r,
                  createElement: o,
                  createDocumentFragment: p
              };
              a.html5 = s, r(b)
          }(this, b), e._version = d, e._prefixes = n, e._domPrefixes = q, e._cssomPrefixes = p, e.hasEvent = z, e.testProp = function(a) {
              return G([a])
          }, e.testAllProps = I, e.testStyles = y, e.prefixed = function(a, b, c) {
              return b ? I(a, b, c) : I(a, "pfx")
          }, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + v.join(" ") : ""), e
  }(this, this.document),
  function(a, b, c) {
      function d(a) {
          return "[object Function]" == o.call(a)
      }

      function e(a) {
          return "string" == typeof a
      }

      function f() {}

      function g(a) {
          return !a || "loaded" == a || "complete" == a || "uninitialized" == a
      }

      function h() {
          var a = p.shift();
          q = 1, a ? a.t ? m(function() {
              ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
          }, 0) : (a(), h()) : q = 0
      }

      function i(a, c, d, e, f, i, j) {
          function k(b) {
              if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
                  "img" != a && m(function() {
                      t.removeChild(l)
                  }, 50);
                  for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload()
              }
          };
          var j = j || B.errorTimeout,
              l = b.createElement(a),
              o = 0,
              r = 0,
              u = {
                  t: d,
                  s: c,
                  e: f,
                  a: i,
                  x: j
              };
          1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
              k.call(this, r)
          }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
      }

      function j(a, b, c, d, f) {
          return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this
      }

      function k() {
          var a = B;
          return a.loader = {
              load: j,
              i: 0
          }, a
      };
      var l = b.documentElement,
          m = a.setTimeout,
          n = b.getElementsByTagName("script")[0],
          o = {}.toString,
          p = [],
          q = 0,
          r = "MozAppearance" in l.style,
          s = r && !!b.createRange().compareNode,
          t = s ? l : n.parentNode,
          l = a.opera && "[object Opera]" == o.call(a.opera),
          l = !!b.attachEvent && !l,
          u = r ? "object" : l ? "script" : "img",
          v = l ? "script" : u,
          w = Array.isArray || function(a) {
              return "[object Array]" == o.call(a)
          },
          x = [],
          y = {},
          z = {
              timeout: function(a, b) {
                  return b.length && (a.timeout = b[0]), a
              }
          },
          A, B;
      B = function(a) {
          function b(a) {
              var a = a.split("!"),
                  b = x.length,
                  c = a.pop(),
                  d = a.length,
                  c = {
                      url: c,
                      origUrl: c,
                      prefixes: a
                  },
                  e, f, g;
              for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
              for (f = 0; f < b; f++) c = x[f](c);
              return c
          }

          function g(a, e, f, g, h) {
              var i = b(a),
                  j = i.autoCallback;
              i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() {
                  k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2
              })))
          }

          function h(a, b) {
              function c(a, c) {
                  if (a) {
                      if (e(a)) {
                          c || (j = function() {
                              var a = [].slice.call(arguments);
                              k.apply(this, a), l()
                          }), g(a, j, b, 0, h)
                      } else if (Object(a) === a)
                          for (n in m = function() {
                                  var b = 0,
                                      c;
                                  for (c in a) a.hasOwnProperty(c) && b++;
                                  return b
                              }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
                              var a = [].slice.call(arguments);
                              k.apply(this, a), l()
                          } : j[n] = function(a) {
                              return function() {
                                  var b = [].slice.call(arguments);
                                  a && a.apply(this, b), l()
                              }
                          }(k[n])), g(a[n], j, b, n, h))
                  } else !c && l()
              };
              var h = !!a.test,
                  i = a.load || a.both,
                  j = a.callback || f,
                  k = j,
                  l = a.complete || f,
                  m, n;
              c(h ? a.yep : a.nope, !!i), i && c(i)
          };
          var i, j, l = this.yepnope.loader;
          if (e(a)) {
              g(a, 0, l, 0)
          } else if (w(a)) {
              for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l)
          } else Object(a) === a && h(a, l)
      }, B.addPrefix = function(a, b) {
          z[a] = b
      }, B.addFilter = function(a) {
          x.push(a)
      }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function() {
          b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete"
      }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
          var k = b.createElement("script"),
              l, o, e = e || B.errorTimeout;
          k.src = a;
          for (o in d) k.setAttribute(o, d[o]);
          c = j ? h : c || f, k.onreadystatechange = k.onload = function() {
              !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null)
          }, m(function() {
              l || (l = 1, c(1))
          }, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
      }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
          var e = b.createElement("link"),
              j, c = i ? h : c || f;
          e.href = a, e.rel = "stylesheet", e.type = "text/css";
          for (j in d) e.setAttribute(j, d[j]);
          g || (n.parentNode.insertBefore(e, n), m(c, 0))
      }
  }(this, document), Modernizr.load = function() {
      yepnope.apply(window, [].slice.call(arguments, 0))
  };