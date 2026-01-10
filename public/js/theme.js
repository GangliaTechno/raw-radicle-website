var _____WB$wombat$assign$function_____ = function (name) {
  return (
    (self._wb_wombat &&
      self._wb_wombat.local_init &&
      self._wb_wombat.local_init(name)) ||
    self[name]
  );
};
if (!self.__WB_pmw) {
  self.__WB_pmw = function (obj) {
    this.__WB_source = obj;
    return this;
  };
}
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opens = _____WB$wombat$assign$function_____("opens");
  (function (factory) {
    typeof define == "function" && define.amd
      ? define("index", factory)
      : factory();
  })(function () {
    "use strict";
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor))
        throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        (descriptor.enumerable = descriptor.enumerable || !1),
          (descriptor.configurable = !0),
          "value" in descriptor && (descriptor.writable = !0),
          Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      return (
        protoProps && _defineProperties(Constructor.prototype, protoProps),
        staticProps && _defineProperties(Constructor, staticProps),
        Constructor
      );
    }
    function _defineProperty(obj, key, value) {
      return (
        key in obj
          ? Object.defineProperty(obj, key, {
              value: value,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (obj[key] = value),
        obj
      );
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass != "function" && superClass !== null)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      (subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: { value: subClass, writable: !0, configurable: !0 },
      })),
        superClass && _setPrototypeOf(subClass, superClass);
    }
    function _getPrototypeOf(o) {
      return (
        (_getPrototypeOf = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (o2) {
              return o2.__proto__ || Object.getPrototypeOf(o2);
            }),
        _getPrototypeOf(o)
      );
    }
    function _setPrototypeOf(o, p) {
      return (
        (_setPrototypeOf =
          Object.setPrototypeOf ||
          function (o2, p2) {
            return (o2.__proto__ = p2), o2;
          }),
        _setPrototypeOf(o, p)
      );
    }
    function _isNativeReflectConstruct() {
      if (
        typeof Reflect == "undefined" ||
        !Reflect.construct ||
        Reflect.construct.sham
      )
        return !1;
      if (typeof Proxy == "function") return !0;
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        );
      } catch (e) {
        return !1;
      }
    }
    function _construct(Parent, args, Class) {
      return (
        _isNativeReflectConstruct()
          ? (_construct = Reflect.construct)
          : (_construct = function (Parent2, args2, Class2) {
              var a = [null];
              a.push.apply(a, args2);
              var Constructor = Function.bind.apply(Parent2, a),
                instance = new Constructor();
              return (
                Class2 && _setPrototypeOf(instance, Class2.prototype), instance
              );
            }),
        _construct.apply(null, arguments)
      );
    }
    function _isNativeFunction(fn) {
      return Function.toString.call(fn).indexOf("[native code]") !== -1;
    }
    function _wrapNativeSuper(Class) {
      var _cache = typeof Map == "function" ? new Map() : void 0;
      return (
        (_wrapNativeSuper = function (Class2) {
          if (Class2 === null || !_isNativeFunction(Class2)) return Class2;
          if (typeof Class2 != "function")
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          if (typeof _cache != "undefined") {
            if (_cache.has(Class2)) return _cache.get(Class2);
            _cache.set(Class2, Wrapper);
          }
          function Wrapper() {
            return _construct(
              Class2,
              arguments,
              _getPrototypeOf(this).constructor
            );
          }
          return (
            (Wrapper.prototype = Object.create(Class2.prototype, {
              constructor: {
                value: Wrapper,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
            _setPrototypeOf(Wrapper, Class2)
          );
        }),
        _wrapNativeSuper(Class)
      );
    }
    function _assertThisInitialized(self) {
      if (self === void 0)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return self;
    }
    function _possibleConstructorReturn(self, call) {
      return call && (typeof call == "object" || typeof call == "function")
        ? call
        : _assertThisInitialized(self);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function () {
        var Super = _getPrototypeOf(Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return _possibleConstructorReturn(this, result);
      };
    }
    var Responsive = (function () {
        function Responsive2() {
          var _this = this;
          _classCallCheck(this, Responsive2),
            (this.currentBreakpoint = Responsive2.getCurrentBreakpoint()),
            window.addEventListener("resize", function () {
              var newBreakpoint = Responsive2.getCurrentBreakpoint();
              _this.currentBreakpoint !== newBreakpoint &&
                (document.dispatchEvent(
                  new CustomEvent("breakpoint:changed", {
                    detail: {
                      previousBreakpoint: _this.currentBreakpoint,
                      currentBreakpoint: newBreakpoint,
                    },
                  })
                ),
                (_this.currentBreakpoint = newBreakpoint));
            });
        }
        return (
          _createClass(Responsive2, null, [
            {
              key: "matchesBreakpoint",
              value: function (breakpoint) {
                switch (breakpoint) {
                  case "phone":
                    return window.matchMedia("screen and (max-width: 640px)")
                      .matches;
                  case "tablet":
                    return window.matchMedia(
                      "screen and (min-width: 641px) and (max-width: 1007px)"
                    ).matches;
                  case "tablet-and-up":
                    return window.matchMedia("screen and (min-width: 641px)")
                      .matches;
                  case "pocket":
                    return window.matchMedia("screen and (max-width: 1007px)")
                      .matches;
                  case "lap":
                    return window.matchMedia(
                      "screen and (min-width: 1008px) and (max-width: 1279px)"
                    ).matches;
                  case "lap-and-up":
                    return window.matchMedia("screen and (min-width: 1008px)")
                      .matches;
                  case "desk":
                    return window.matchMedia("screen and (min-width: 1280px)")
                      .matches;
                  case "widescreen":
                    return window.matchMedia("screen and (min-width: 1600px)")
                      .matches;
                  case "supports-hover":
                    return window.matchMedia(
                      "(hover: hover) and (pointer: fine)"
                    ).matches;
                }
              },
            },
            {
              key: "getCurrentBreakpoint",
              value: function () {
                if (window.matchMedia("screen and (max-width: 640px)").matches)
                  return "phone";
                if (
                  window.matchMedia(
                    "screen and (min-width: 641px) and (max-width: 1007px)"
                  ).matches
                )
                  return "tablet";
                if (
                  window.matchMedia(
                    "screen and (min-width: 1008px) and (max-width: 1279px)"
                  ).matches
                )
                  return "lap";
                if (window.matchMedia("screen and (min-width: 1280px)").matches)
                  return "desk";
              },
            },
          ]),
          Responsive2
        );
      })(),
      Carousel = (function () {
        function Carousel2(element) {
          var options =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : {},
            overrideSettings =
              arguments.length > 2 && arguments[2] !== void 0
                ? arguments[2]
                : {};
          _classCallCheck(this, Carousel2),
            (this.element = element),
            (this.initialConfig = Object.assign(
              JSON.parse(element.getAttribute("data-flickity-config")),
              overrideSettings
            )),
            (this.options = options),
            this._attachListeners(),
            this._build();
        }
        return (
          _createClass(Carousel2, [
            {
              key: "destroy",
              value: function () {
                this.flickityInstance.destroy(),
                  this.initialConfig.breakpoints !== void 0 &&
                    document.removeEventListener(
                      "breakpoint:changed",
                      this._onBreakpointChangedListener
                    );
              },
            },
            {
              key: "getFlickityInstance",
              value: function () {
                return this.flickityInstance;
              },
            },
            {
              key: "selectCell",
              value: function (index) {
                var shouldPause =
                    arguments.length > 1 && arguments[1] !== void 0
                      ? arguments[1]
                      : !1,
                  shouldAnimate =
                    arguments.length > 2 && arguments[2] !== void 0
                      ? arguments[2]
                      : !0;
                shouldPause && this.flickityInstance.pausePlayer(),
                  this.flickityInstance.select(index, !1, !shouldAnimate);
              },
            },
            {
              key: "next",
              value: function () {
                this.flickityInstance.next();
              },
            },
            {
              key: "previous",
              value: function () {
                this.flickityInstance.previous();
              },
            },
            {
              key: "pausePlayer",
              value: function () {
                this.flickityInstance.pausePlayer();
              },
            },
            {
              key: "unpausePlayer",
              value: function () {
                this.flickityInstance.unpausePlayer();
              },
            },
            {
              key: "resize",
              value: function () {
                this.flickityInstance.resize();
              },
            },
            {
              key: "getSelectedIndex",
              value: function () {
                return this.flickityInstance.selectedIndex;
              },
            },
            {
              key: "getSelectedCell",
              value: function () {
                return this.flickityInstance.selectedCell.element;
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                this.initialConfig.breakpoints !== void 0 &&
                  ((this._onBreakpointChangedListener =
                    this._onBreakpointChanged.bind(this)),
                  document.addEventListener(
                    "breakpoint:changed",
                    this._onBreakpointChangedListener
                  ));
              },
            },
            {
              key: "_build",
              value: function () {
                var _this = this,
                  config = this._processConfig();
                (this.flickityInstance = new Flickity(this.element, config)),
                  this._validateDraggable(),
                  (this.selectedIndex = this.flickityInstance.selectedIndex),
                  this.flickityInstance.on(
                    "resize",
                    this._validateDraggable.bind(this)
                  ),
                  this.options.onSelect &&
                    this.flickityInstance.on("select", function () {
                      _this.selectedIndex !==
                        _this.flickityInstance.selectedIndex &&
                        (_this.options.onSelect(
                          _this.flickityInstance.selectedIndex,
                          _this.flickityInstance.selectedCell.element
                        ),
                        (_this.selectedIndex =
                          _this.flickityInstance.selectedIndex));
                    }),
                  this.options.onSettle &&
                    this.flickityInstance.on("settle", function (index) {
                      _this.options.onSettle(
                        index,
                        _this.flickityInstance.selectedCell.element
                      );
                    }),
                  this.options.onClick &&
                    this.flickityInstance.on(
                      "staticClick",
                      function (event, pointer, cell, index) {
                        _this.options.onClick(cell, index);
                      }
                    );
              },
            },
            {
              key: "_validateDraggable",
              value: function () {
                var isActive = this.flickityInstance.isActive || !1;
                !isActive ||
                  !this.flickityInstance.options.draggable ||
                  (this.flickityInstance.selectedElements === void 0 ||
                  this.flickityInstance.selectedElements.length ===
                    this.flickityInstance.cells.length
                    ? this.flickityInstance.unbindDrag()
                    : this.flickityInstance.bindDrag());
              },
            },
            {
              key: "_processConfig",
              value: function () {
                var config = Object.assign({}, this.initialConfig);
                if (
                  (delete config.breakpoints,
                  this.initialConfig.breakpoints === void 0)
                )
                  return config;
                var breakpoints = this.initialConfig.breakpoints;
                return (
                  breakpoints.forEach(function (breakpoint) {
                    Responsive.matchesBreakpoint(breakpoint.matches) &&
                      (config = Object.assign(config, breakpoint.settings));
                  }),
                  config
                );
              },
            },
            {
              key: "_onBreakpointChanged",
              value: function () {
                this.flickityInstance.destroy(), this._build();
              },
            },
          ]),
          Carousel2
        );
      })(),
      Animation = (function () {
        function Animation2() {
          _classCallCheck(this, Animation2);
        }
        return (
          _createClass(Animation2, null, [
            {
              key: "slideUp",
              value: function (element) {
                (element.style.height = "".concat(element.scrollHeight, "px")),
                  element.offsetHeight,
                  (element.style.height = 0);
              },
            },
            {
              key: "slideDown",
              value: function (element) {
                if (element.style.height !== "auto") {
                  element.style.height = "".concat(
                    element.firstElementChild.scrollHeight,
                    "px"
                  );
                  var transitionEnded = function transitionEnded2(event) {
                    event.propertyName === "height" &&
                      ((element.style.height = "auto"),
                      element.removeEventListener(
                        "transitionend",
                        transitionEnded2
                      ));
                  };
                  element.addEventListener("transitionend", transitionEnded);
                }
              },
            },
          ]),
          Animation2
        );
      })(),
      Dom = (function () {
        function Dom2() {
          _classCallCheck(this, Dom2);
        }
        return (
          _createClass(Dom2, null, [
            {
              key: "getSiblings",
              value: function (element, filter) {
                for (
                  var includeSelf =
                      arguments.length > 2 && arguments[2] !== void 0
                        ? arguments[2]
                        : !1,
                    siblings = [],
                    currentElement = element;
                  (currentElement = currentElement.previousElementSibling);

                )
                  (!filter || currentElement.matches(filter)) &&
                    siblings.push(currentElement);
                for (
                  includeSelf && siblings.push(element),
                    currentElement = element;
                  (currentElement = currentElement.nextElementSibling);

                )
                  (!filter || currentElement.matches(filter)) &&
                    siblings.push(currentElement);
                return siblings;
              },
            },
            {
              key: "nodeListToArray",
              value: function (nodeList, filter) {
                for (var items = [], i = 0; i !== nodeList.length; ++i)
                  (!filter || nodeList[i].matches(filter)) &&
                    items.push(nodeList[i]);
                return items;
              },
            },
            {
              key: "outerWidthWithMargin",
              value: function (element) {
                var width = element.offsetWidth,
                  style = getComputedStyle(element);
                return (
                  (width +=
                    parseInt(style.marginLeft) + parseInt(style.marginRight)),
                  width
                );
              },
            },
            {
              key: "outerHeightWithMargin",
              value: function (element) {
                var height = element.offsetHeight,
                  style = getComputedStyle(element);
                return (
                  (height +=
                    parseInt(style.marginTop) + parseInt(style.marginBottom)),
                  height
                );
              },
            },
          ]),
          Dom2
        );
      })(),
      Collapsible = (function () {
        function Collapsible2() {
          _classCallCheck(this, Collapsible2),
            (this.domDelegate = new domDelegate.Delegate(document.body)),
            this._attachListeners();
        }
        return (
          _createClass(Collapsible2, [
            {
              key: "_attachListeners",
              value: function () {
                this.domDelegate.on(
                  "click",
                  '[data-action="toggle-collapsible"]',
                  this._toggleCollapsible.bind(this)
                );
              },
            },
            {
              key: "_toggleCollapsible",
              value: function (event, target) {
                var _this = this,
                  parentCollapsible = target.closest(".Collapsible");
                if (
                  !(
                    parentCollapsible.classList.contains(
                      "Collapsible--autoExpand"
                    ) && Responsive.matchesBreakpoint("tablet-and-up")
                  )
                ) {
                  var isOpen = target.getAttribute("aria-expanded") === "true";
                  isOpen
                    ? this._close(parentCollapsible, target)
                    : this._open(parentCollapsible, target),
                    Dom.getSiblings(parentCollapsible).forEach(function (
                      collapsibleToClose
                    ) {
                      return _this._close(collapsibleToClose);
                    }),
                    event.preventDefault();
                }
              },
            },
            {
              key: "_open",
              value: function (collapsible) {
                var toggleButton = collapsible.querySelector(
                    ".Collapsible__Button"
                  ),
                  collapsibleInner = collapsible.querySelector(
                    ".Collapsible__Inner"
                  );
                !collapsibleInner ||
                  toggleButton.getAttribute("aria-expanded") === "true" ||
                  (toggleButton.setAttribute("aria-expanded", "true"),
                  (collapsibleInner.style.overflow = "visible"),
                  Animation.slideDown(collapsibleInner),
                  setTimeout(function () {
                    collapsible.style.overflow = "visible";
                  }, 350));
              },
            },
            {
              key: "_close",
              value: function (collapsible) {
                var toggleButton = collapsible.querySelector(
                    ".Collapsible__Button"
                  ),
                  collapsibleInner = collapsible.querySelector(
                    ".Collapsible__Inner"
                  );
                !collapsibleInner ||
                  toggleButton.getAttribute("aria-expanded") === "false" ||
                  (toggleButton.setAttribute("aria-expanded", "false"),
                  (collapsibleInner.style.overflow = "hidden"),
                  (collapsible.style.overflow = "hidden"),
                  Animation.slideUp(collapsibleInner));
              },
            },
          ]),
          Collapsible2
        );
      })(),
      Accessibility = (function () {
        function Accessibility2() {
          _classCallCheck(this, Accessibility2);
        }
        return (
          _createClass(Accessibility2, null, [
            {
              key: "trapFocus",
              value: function (container, namespace) {
                this.listeners = this.listeners || {};
                var elementToFocus =
                  container.querySelector("[autofocus]") || container;
                container.setAttribute("tabindex", "-1"),
                  elementToFocus.focus(),
                  (this.listeners[namespace] = function (event) {
                    container !== event.target &&
                      !container.contains(event.target) &&
                      container.focus();
                  }),
                  document.addEventListener(
                    "focusin",
                    this.listeners[namespace]
                  );
              },
            },
            {
              key: "removeTrapFocus",
              value: function (container, namespace) {
                container && container.removeAttribute("tabindex"),
                  this.listeners &&
                    this.listeners[namespace] &&
                    document.removeEventListener(
                      "focusin",
                      this.listeners[namespace]
                    );
              },
            },
            {
              key: "clearTrapFocus",
              value: function () {
                for (var key in this.listeners)
                  this.listeners.hasOwnProperty(key) &&
                    document.removeEventListener(
                      "focusin",
                      this.listeners[key]
                    );
                this.listeners = {};
              },
            },
          ]),
          Accessibility2
        );
      })(),
      Drawer = (function () {
        function Drawer2(element) {
          var options =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          _classCallCheck(this, Drawer2),
            (this.element = element),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            (this.delegateBody = new domDelegate.Delegate(document.body)),
            (this.onOpen = options.onOpen || function () {}),
            (this.onClose = options.onClose || function () {}),
            (this.isOpen = !1),
            (this.direction = this.element.classList.contains(
              "Drawer--fromLeft"
            )
              ? "fromLeft"
              : "fromRight"),
            (this.pageOverlayElement = document.querySelector(".PageOverlay")),
            this._attachListeners();
        }
        return (
          _createClass(Drawer2, [
            {
              key: "destroy",
              value: function () {
                this.delegateBody.off(
                  "click",
                  '[data-action="open-drawer"][data-drawer-id="'.concat(
                    this.element.id,
                    '"]'
                  )
                ),
                  this.delegateBody.off(
                    "click",
                    '[data-action="close-drawer"][data-drawer-id="'.concat(
                      this.element.id,
                      '"]'
                    )
                  ),
                  window.removeEventListener(
                    "resize",
                    this._calculateMaxHeightListener
                  );
              },
            },
            {
              key: "toggle",
              value: function () {
                this.isOpen ? this.close() : this.open();
              },
            },
            {
              key: "open",
              value: function (event) {
                if (!this.isOpen)
                  return (
                    this.element.dispatchEvent(
                      new CustomEvent("search:close", { bubbles: !0 })
                    ),
                    event && event.preventDefault(),
                    this.element.setAttribute("aria-hidden", "false"),
                    this._calculateMaxHeight(),
                    document.documentElement.classList.add("no-scroll"),
                    Accessibility.trapFocus(this.element, "drawer"),
                    (document.querySelector(
                      "#shopify-section-header"
                    ).style.zIndex = ""),
                    this.pageOverlayElement.classList.add("is-visible"),
                    this.pageOverlayElement.addEventListener(
                      "click",
                      this._closeListener
                    ),
                    (this.isOpen = !0),
                    this.onOpen(),
                    !1
                  );
              },
            },
            {
              key: "close",
              value: function (event) {
                this.isOpen &&
                  (event && event.preventDefault(),
                  this.element.setAttribute("aria-hidden", "true"),
                  document.documentElement.classList.remove("no-scroll"),
                  Accessibility.removeTrapFocus(this.element, "drawer"),
                  this.pageOverlayElement.classList.remove("is-visible"),
                  this.pageOverlayElement.removeEventListener(
                    "click",
                    this._closeListener
                  ),
                  (this.isOpen = !1),
                  this.onClose());
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                (this._openListener = this.open.bind(this)),
                  (this._closeListener = this.close.bind(this)),
                  (this._calculateMaxHeightListener =
                    this._calculateMaxHeight.bind(this)),
                  this.delegateBody.on(
                    "click",
                    '[data-action="open-drawer"][data-drawer-id="'.concat(
                      this.element.id,
                      '"]'
                    ),
                    this._openListener
                  ),
                  this.delegateBody.on(
                    "click",
                    '[data-action="close-drawer"][data-drawer-id="'.concat(
                      this.element.id,
                      '"]'
                    ),
                    this._closeListener
                  ),
                  this.element.addEventListener(
                    "keyup",
                    this._handleKeyboard.bind(this)
                  ),
                  window.addEventListener(
                    "resize",
                    this._calculateMaxHeightListener
                  );
              },
            },
            {
              key: "_calculateMaxHeight",
              value: function () {
                this.element.style.maxHeight = window.innerHeight + "px";
              },
            },
            {
              key: "_handleKeyboard",
              value: function (event) {
                this.isOpen && event.keyCode === 27 && this.close();
              },
            },
          ]),
          Drawer2
        );
      })(),
      LoadingBar = (function () {
        function LoadingBar2() {
          _classCallCheck(this, LoadingBar2),
            (this.element = document.querySelector(".LoadingBar")),
            document.addEventListener(
              "theme:loading:start",
              this._onLoadingStart.bind(this)
            ),
            document.addEventListener(
              "theme:loading:end",
              this._onLoadingEnd.bind(this)
            ),
            this.element.addEventListener(
              "transitionend",
              this._onTransitionEnd.bind(this)
            );
        }
        return (
          _createClass(LoadingBar2, [
            {
              key: "_onLoadingStart",
              value: function () {
                this.element.classList.add("is-visible"),
                  (this.element.style.width = "40%");
              },
            },
            {
              key: "_onLoadingEnd",
              value: function () {
                (this.element.style.width = "100%"),
                  this.element.classList.add("is-finished");
              },
            },
            {
              key: "_onTransitionEnd",
              value: function (event) {
                event.propertyName === "width" &&
                  this.element.classList.contains("is-finished") &&
                  (this.element.classList.remove("is-visible"),
                  this.element.classList.remove("is-finished"),
                  (this.element.style.width = "0"));
              },
            },
          ]),
          LoadingBar2
        );
      })(),
      Modal = (function () {
        function Modal2() {
          _classCallCheck(this, Modal2),
            (this.domDelegate = new domDelegate.Delegate(document.body)),
            (this.activeModal = null),
            (this.wasLocked = !1),
            (this.pageOverlayElement = document.querySelector(".PageOverlay")),
            this._attachListeners(),
            this._checkOpenByHash();
        }
        return (
          _createClass(Modal2, [
            {
              key: "_attachListeners",
              value: function () {
                (this._closeListener = this._closeModal.bind(this)),
                  (this._handleKeyboardListener =
                    this._handleKeyboard.bind(this)),
                  this.domDelegate.on(
                    "click",
                    '[data-action="open-modal"]',
                    this._openModalEvent.bind(this)
                  ),
                  this.domDelegate.on(
                    "click",
                    '[data-action="close-modal"]',
                    this._closeModal.bind(this)
                  );
              },
            },
            {
              key: "_openModalEvent",
              value: function (event, target) {
                this._openModal(
                  document.getElementById(target.getAttribute("aria-controls"))
                ),
                  event.preventDefault(),
                  event.stopPropagation();
              },
            },
            {
              key: "_openModal",
              value: function (modal) {
                var _this = this;
                this.activeModal ||
                  !modal ||
                  ((this.activeModal = modal),
                  this.domDelegate.on("keyup", this._handleKeyboardListener),
                  document.documentElement.classList.contains("no-scroll") &&
                    (this.wasLocked = !0),
                  fastdom.mutate(function () {
                    Accessibility.clearTrapFocus(),
                      (_this._onTransitionEndedListener =
                        _this._onTransitionEnded.bind(_this)),
                      _this.activeModal.addEventListener(
                        "transitionend",
                        _this._onTransitionEndedListener
                      ),
                      _this.activeModal.setAttribute("aria-hidden", "false"),
                      document.documentElement.classList.add("no-scroll"),
                      _this.activeModal.classList.contains(
                        "Modal--fullScreen"
                      ) ||
                        (_this.pageOverlayElement.classList.add("is-visible"),
                        _this.pageOverlayElement.addEventListener(
                          "click",
                          _this._closeListener
                        ));
                  }));
              },
            },
            {
              key: "_closeModal",
              value: function () {
                var _this2 = this;
                this.activeModal &&
                  (this.activeModal.removeEventListener(
                    "keyup",
                    this._handleKeyboardListener
                  ),
                  this.domDelegate.off("keyup"),
                  fastdom.mutate(function () {
                    _this2.activeModal.classList.contains(
                      "Modal--videoContent"
                    ) &&
                      ((_this2._resetVideoListener =
                        _this2._resetVideo.bind(_this2)),
                      _this2.activeModal.addEventListener(
                        "transitionend",
                        _this2._resetVideoListener
                      )),
                      Accessibility.removeTrapFocus(
                        _this2.activeModal,
                        "modal"
                      ),
                      _this2.activeModal.classList.contains(
                        "Modal--fullScreen"
                      ) ||
                        (_this2.pageOverlayElement.classList.remove(
                          "is-visible"
                        ),
                        _this2.pageOverlayElement.removeEventListener(
                          "click",
                          _this2._closeListener
                        )),
                      _this2.activeModal.setAttribute("aria-hidden", "true"),
                      (_this2.activeModal = null),
                      _this2.wasLocked ||
                        document.documentElement.classList.remove("no-scroll");
                  }));
              },
            },
            {
              key: "_onTransitionEnded",
              value: function (event) {
                event.propertyName === "visibility" &&
                  (Accessibility.trapFocus(this.activeModal, "modal"),
                  this.activeModal.removeEventListener(
                    "transitionend",
                    this._onTransitionEndedListener
                  ));
              },
            },
            {
              key: "_resetVideo",
              value: function (event) {
                if (event.propertyName === "visibility") {
                  var iframe = event.target.querySelector("iframe");
                  (iframe.parentNode.innerHTML =
                    '<iframe class="Image--lazyLoad" data-src='.concat(
                      iframe.getAttribute("data-src"),
                      ' frameborder="0" allowfullscreen>'
                    )),
                    event.target.removeEventListener(
                      "transitionend",
                      this._resetVideoListener
                    );
                }
              },
            },
            {
              key: "_checkOpenByHash",
              value: function () {
                var hash = window.location.hash,
                  modal = document.getElementById(hash.replace("#", ""));
                modal &&
                  modal.classList.contains("Modal") &&
                  this._openModal(modal);
              },
            },
            {
              key: "_handleKeyboard",
              value: function (event) {
                this.activeModal !== null &&
                  event.keyCode === 27 &&
                  this._closeModal();
              },
            },
          ]),
          Modal2
        );
      })(),
      Popover = (function () {
        function Popover2(element, options) {
          _classCallCheck(this, Popover2),
            (this.element = element),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            (this.activator =
              options.activator ||
              document.querySelector(
                '[aria-controls="'.concat(element.getAttribute("id"), '"]')
              )),
            (this.preferredPosition = options.preferredPosition || "bottom"),
            (this.preferredAlignment = options.preferredAlignment || void 0),
            (this.threshold = options.threshold || 20),
            (this.isOpen = !1),
            (this.onValueChanged = options.onValueChanged || function () {}),
            (this.onOpen = options.onOpen || function () {}),
            (this.onClose = options.onClose || function () {}),
            (this.showOverlay =
              options.showOverlay === void 0 ? !0 : options.showOverlay),
            (this.pageOverlayElement = document.querySelector(".PageOverlay")),
            this._attachListeners();
        }
        return (
          _createClass(Popover2, [
            {
              key: "destroy",
              value: function () {
                this.element.removeEventListener(
                  "keyup",
                  this._handleKeyboardListener
                ),
                  this.delegateElement.off("click"),
                  this.activator.removeEventListener(
                    "click",
                    this._toggleListener
                  );
              },
            },
            {
              key: "toggle",
              value: function () {
                this.isOpen ? this.close() : this.open();
              },
            },
            {
              key: "open",
              value: function () {
                var _this = this;
                this.isOpen ||
                  this.activator.getAttribute("aria-controls") !==
                    this.element.id ||
                  (this.element.setAttribute("aria-hidden", "false"),
                  this.activator.setAttribute("aria-expanded", "true"),
                  disableBodyScroll(!0, "[data-scrollable]"),
                  document.documentElement.classList.add("no-scroll"),
                  Responsive.matchesBreakpoint("lap-and-up")
                    ? (document.body.addEventListener(
                        "click",
                        this._clickOutsideListener
                      ),
                      this._position(),
                      this.element.setAttribute("tabindex", "-1"),
                      this.element.addEventListener(
                        "transitionend",
                        function () {
                          _this.element.focus();
                        },
                        { once: !0 }
                      ))
                    : (this.element.removeAttribute("style"),
                      this.showOverlay &&
                        (this.pageOverlayElement.classList.add("is-visible"),
                        this.pageOverlayElement.addEventListener(
                          "click",
                          this._closeListener
                        ))),
                  this.onOpen(this),
                  (this.isOpen = !0));
              },
            },
            {
              key: "close",
              value: function () {
                this.isOpen &&
                  (this.element.setAttribute("aria-hidden", "true"),
                  this.activator.setAttribute("aria-expanded", "false"),
                  disableBodyScroll(!1, "[data-scrollable]"),
                  document.documentElement.classList.remove("no-scroll"),
                  Responsive.matchesBreakpoint("lap-and-up")
                    ? document.body.removeEventListener(
                        "click",
                        this._clickOutsideListener
                      )
                    : this.showOverlay &&
                      (this.pageOverlayElement.classList.remove("is-visible"),
                      this.pageOverlayElement.removeEventListener(
                        "click",
                        this._closeListener
                      )),
                  this.element.removeAttribute("tabindex"),
                  this.activator.focus(),
                  this.onClose(this),
                  (this.isOpen = !1));
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                (this._handleKeyboardListener =
                  this._handleKeyboard.bind(this)),
                  (this._clickOutsideListener = this._clickOutside.bind(this)),
                  (this._closeListener = this.close.bind(this)),
                  (this._toggleListener = this.toggle.bind(this)),
                  this.element.addEventListener(
                    "keyup",
                    this._handleKeyboardListener
                  ),
                  this.activator.addEventListener(
                    "click",
                    this._toggleListener
                  ),
                  this.delegateElement.on(
                    "click",
                    '[data-action="close-popover"]',
                    this.close.bind(this)
                  ),
                  this.delegateElement.on(
                    "click",
                    '[data-action="select-value"]',
                    this._valueChanged.bind(this)
                  ),
                  this.element.hasAttribute("id") &&
                    this.delegateElement.on(
                      "focusout",
                      "#".concat(this.element.getAttribute("id")),
                      this._onFocusOut.bind(this)
                    );
              },
            },
            {
              key: "_valueChanged",
              value: function (event) {
                Dom.getSiblings(event.target, ".is-selected").forEach(function (
                  item
                ) {
                  return item.classList.remove("is-selected");
                }),
                  event.target.classList.add("is-selected"),
                  this.onValueChanged(
                    event.target.getAttribute("data-value"),
                    event.target,
                    this.activator
                  ),
                  this.close();
              },
            },
            {
              key: "_onFocusOut",
              value: function (event) {
                !this.element.contains(event.relatedTarget) &&
                  event.relatedTarget !== this.activator &&
                  this.close();
              },
            },
            {
              key: "_clickOutside",
              value: function (event) {
                !event.target.closest(".Popover") &&
                  !event.target.closest(".Modal") &&
                  event.target !== this.activator &&
                  !this.activator.contains(event.target) &&
                  this.close();
              },
            },
            {
              key: "_position",
              value: function () {
                var _this2 = this,
                  topPosition = 0,
                  rightPosition = 0,
                  position = "",
                  alignment = "",
                  threshold = this.threshold;
                fastdom.measure(function () {
                  var windowHeight = window.innerHeight,
                    activatorBoundingRect =
                      _this2.activator.getBoundingClientRect(),
                    halfHeight = windowHeight / 2;
                  if (_this2.preferredPosition === "bottom")
                    (alignment = "right"),
                      _this2.element.clientHeight <=
                        windowHeight -
                          (activatorBoundingRect.bottom + threshold) ||
                      windowHeight - activatorBoundingRect.bottom >= halfHeight
                        ? (position = "bottom")
                        : (position = "top");
                  else if (_this2.preferredPosition === "top")
                    (alignment = "right"),
                      _this2.element.clientHeight <=
                        activatorBoundingRect.top - threshold ||
                      activatorBoundingRect.top >= halfHeight
                        ? (position = "top")
                        : (position = "bottom");
                  else {
                    position = "left";
                    var halfElementHeight = _this2.element.clientHeight / 2;
                    activatorBoundingRect.top >= halfElementHeight &&
                    windowHeight - activatorBoundingRect.bottom >=
                      halfElementHeight
                      ? (alignment = "center")
                      : windowHeight - activatorBoundingRect.bottom >=
                        halfElementHeight
                      ? (alignment = "bottom")
                      : (alignment = "top");
                  }
                  _this2.preferredAlignment &&
                    (alignment = _this2.preferredAlignment),
                    position === "top"
                      ? ((topPosition =
                          activatorBoundingRect.top -
                          _this2.element.clientHeight -
                          threshold),
                        alignment === "center"
                          ? (rightPosition =
                              window.innerWidth -
                              activatorBoundingRect.right -
                              _this2.element.clientWidth / 2 +
                              3)
                          : (rightPosition =
                              window.innerWidth - activatorBoundingRect.right))
                      : position === "bottom"
                      ? ((topPosition =
                          activatorBoundingRect.bottom + threshold),
                        alignment === "center"
                          ? (rightPosition =
                              window.innerWidth -
                              activatorBoundingRect.right -
                              _this2.element.clientWidth / 2 +
                              3)
                          : (rightPosition =
                              window.innerWidth - activatorBoundingRect.right))
                      : ((rightPosition =
                          window.innerWidth -
                          activatorBoundingRect.left +
                          threshold),
                        alignment === "center"
                          ? (topPosition =
                              activatorBoundingRect.top -
                              _this2.element.clientHeight / 2 +
                              _this2.activator.clientHeight / 2)
                          : alignment === "top"
                          ? (topPosition =
                              activatorBoundingRect.bottom -
                              _this2.element.clientHeight)
                          : (topPosition = activatorBoundingRect.top));
                }),
                  fastdom.mutate(function () {
                    [
                      "Popover--positionBottom",
                      "Popover--positionTop",
                      "Popover--positionCenter",
                      "Popover--alignTop",
                      "Popover--alignCenter",
                      "Popover--alignBottom",
                    ].map(function (item) {
                      return _this2.element.classList.remove(item);
                    }),
                      _this2.element.classList.add(
                        "Popover--position".concat(
                          position.charAt(0).toUpperCase() + position.slice(1)
                        )
                      ),
                      _this2.element.classList.add(
                        "Popover--align".concat(
                          alignment.charAt(0).toUpperCase() + alignment.slice(1)
                        )
                      ),
                      _this2.element.setAttribute(
                        "style",
                        "top: "
                          .concat(parseInt(topPosition), "px; right: ")
                          .concat(parseInt(rightPosition), "px;")
                      );
                  });
              },
            },
            {
              key: "_handleKeyboard",
              value: function (event) {
                this.isOpen && event.keyCode === 27 && this.close();
              },
            },
          ]),
          Popover2
        );
      })(),
      PageTransition = (function () {
        function PageTransition2() {
          _classCallCheck(this, PageTransition2),
            (this.domDelegate = new domDelegate.Delegate(document.body)),
            (this.pageTransition = document.querySelector(".PageTransition")),
            this._attachListeners();
        }
        return (
          _createClass(
            PageTransition2,
            [
              {
                key: "_attachListeners",
                value: function () {
                  this.domDelegate.on(
                    "click",
                    'a[href]:not([href^="#"]):not([href^="javascript:"]):not([href^="mailto:"]):not([href^="tel:"]):not([target="_blank"])',
                    this._onPageUnload.bind(this)
                  );
                },
              },
              {
                key: "_onPageUnload",
                value: function (event, target) {
                  var _this = this;
                  if (
                    !(
                      event.defaultPrevented ||
                      event.ctrlKey ||
                      event.metaKey ||
                      !window.theme.showPageTransition ||
                      !this.pageTransition
                    ) &&
                    (event.preventDefault(),
                    window.theme.showPageTransition && this.pageTransition)
                  ) {
                    var doTransition = function doTransition2(event2) {
                      event2.propertyName === "opacity" &&
                        (_this.pageTransition.removeEventListener(
                          "transitionend",
                          doTransition2
                        ),
                        (window.location.href = target.href));
                    };
                    this.pageTransition.addEventListener(
                      "transitionend",
                      doTransition
                    ),
                      (this.pageTransition.style.visibility = "visible"),
                      (this.pageTransition.style.opacity = "1");
                  }
                },
              },
            ],
            [
              {
                key: "getInstance",
                value: function () {
                  return (
                    this.instance || (this.instance = new PageTransition2()),
                    this.instance
                  );
                },
              },
            ]
          ),
          PageTransition2
        );
      })(),
      ProductItemColorSwatch = (function () {
        function ProductItemColorSwatch2(element) {
          _classCallCheck(this, ProductItemColorSwatch2),
            (this.element = element),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            this.delegateElement.on(
              "change",
              ".ColorSwatch__Radio",
              this._colorChanged.bind(this)
            );
        }
        return (
          _createClass(ProductItemColorSwatch2, [
            {
              key: "_colorChanged",
              value: function (event, target) {
                var productItem = target.closest(".ProductItem"),
                  variantUrl = target.getAttribute("data-variant-url");
                productItem
                  .querySelector(".ProductItem__ImageWrapper")
                  .setAttribute("href", variantUrl),
                  productItem
                    .querySelector(".ProductItem__Title > a")
                    .setAttribute("href", variantUrl);
                var originalImageElement = productItem.querySelector(
                  ".ProductItem__Image:not(.ProductItem__Image--alternate)"
                );
                if (
                  target.hasAttribute("data-image-url") &&
                  target.getAttribute("data-image-id") !==
                    originalImageElement.getAttribute("data-image-id")
                ) {
                  var newImageElement = document.createElement("img");
                  (newImageElement.className =
                    "ProductItem__Image Image--fadeIn Image--lazyLoad"),
                    newImageElement.setAttribute(
                      "data-image-id",
                      target.getAttribute("data-image-id")
                    ),
                    newImageElement.setAttribute(
                      "data-src",
                      target.getAttribute("data-image-url")
                    ),
                    newImageElement.setAttribute(
                      "data-widths",
                      target.getAttribute("data-image-widths")
                    ),
                    newImageElement.setAttribute("data-sizes", "auto"),
                    window.theme.productImageSize === "natural" &&
                      (originalImageElement.parentNode.style.paddingBottom =
                        "".concat(
                          100 / target.getAttribute("data-image-aspect-ratio"),
                          "%"
                        )),
                    originalImageElement.parentNode.style.setProperty(
                      "--aspect-ratio",
                      target.getAttribute("data-image-aspect-ratio")
                    ),
                    originalImageElement.parentNode.replaceChild(
                      newImageElement,
                      originalImageElement
                    );
                }
              },
            },
          ]),
          ProductItemColorSwatch2
        );
      })(),
      Image = (function () {
        function Image2() {
          _classCallCheck(this, Image2);
        }
        return (
          _createClass(Image2, null, [
            {
              key: "getSizedImageUrl",
              value: function (src, size) {
                if (size === null) return src;
                if (size === "master") return src.replace(/http(s)?:/, "");
                var match = src.match(
                  /\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i
                );
                if (match) {
                  var prefix = src.split(match[0]),
                    suffix = match[0];
                  return (prefix[0] + "_" + size + suffix).replace(
                    /http(s)?:/,
                    ""
                  );
                } else return null;
              },
            },
            {
              key: "getSupportedSizes",
              value: function (image, desiredSizes) {
                var supportedSizes = [],
                  imageWidth = image.width;
                return (
                  desiredSizes.forEach(function (width) {
                    imageWidth >= width && supportedSizes.push(width);
                  }),
                  supportedSizes
                );
              },
            },
          ]),
          Image2
        );
      })(),
      ProductImageZoom = (function () {
        function ProductImageZoom2(element, slideshow) {
          _classCallCheck(this, ProductImageZoom2),
            (this.element = element),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            (this.delegateRoot = new domDelegate.Delegate(document.body)),
            (this.slideshow = slideshow),
            this._attachListeners();
        }
        return (
          _createClass(ProductImageZoom2, [
            {
              key: "destroy",
              value: function () {
                this.delegateElement.off("click");
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                this.delegateElement.on(
                  "click",
                  '[data-action="open-product-zoom"]',
                  this._initPhotoSwipe.bind(this)
                ),
                  this.delegateElement.on(
                    "click",
                    ".Product__SlideItem--image",
                    this._initPhotoSwipeFromImageClick.bind(this)
                  );
              },
            },
            {
              key: "_initPhotoSwipe",
              value: function () {
                var images = [];
                this.slideshow.flickityInstance.cells.forEach(function (item) {
                  item.element.classList.contains(
                    "Product__SlideItem--image"
                  ) && images.push(item.element.querySelector("img"));
                }),
                  this._createPhotoSwipeInstance(
                    this._createPhotoSwipeItemsFromImages(images),
                    parseInt(
                      this.slideshow.flickityInstance.selectedElement.getAttribute(
                        "data-image-media-position"
                      )
                    )
                  );
              },
            },
            {
              key: "_initPhotoSwipeFromImageClick",
              value: function (event, target) {
                if (!Responsive.matchesBreakpoint("pocket")) {
                  var images = Dom.nodeListToArray(
                    this.element.querySelectorAll(
                      ".Product__SlideItem--image img"
                    )
                  );
                  this._createPhotoSwipeInstance(
                    this._createPhotoSwipeItemsFromImages(images),
                    parseInt(target.getAttribute("data-image-media-position"))
                  );
                }
              },
            },
            {
              key: "_createPhotoSwipeItemsFromImages",
              value: function (images) {
                return images.map(function (image) {
                  var maxWidth = parseInt(image.getAttribute("data-max-width")),
                    maxHeight = parseInt(image.getAttribute("data-max-height")),
                    maxDimension = Responsive.matchesBreakpoint("phone")
                      ? 1200
                      : 1800,
                    reduceFactor = 1;
                  maxWidth >= maxHeight
                    ? (reduceFactor = Math.max(maxWidth / maxDimension, 1))
                    : (reduceFactor = Math.max(maxHeight / maxDimension, 1));
                  var requestedWidth = Math.floor(maxWidth / reduceFactor),
                    requestedHeight = Math.floor(maxHeight / reduceFactor);
                  return {
                    msrc: image.currentSrc || image.src,
                    w: requestedWidth,
                    h: requestedHeight,
                    initialZoomLevel: 0.65,
                    src: Image.getSizedImageUrl(
                      image.getAttribute("data-original-src"),
                      requestedWidth + "x" + requestedHeight
                    ),
                  };
                });
              },
            },
            {
              key: "_createPhotoSwipeInstance",
              value: function (items, selectedImageIndex) {
                var _this = this,
                  photoswipeContainer = document.querySelector(".pswp");
                this.photoSwipeInstance = new PhotoSwipe(
                  photoswipeContainer,
                  !1,
                  items,
                  {
                    index: selectedImageIndex,
                    showHideOpacity: !0,
                    showAnimationDuration: 500,
                    loop: !1,
                    history: !1,
                    closeOnVerticalDrag: !1,
                    allowPanToNext: !1,
                    pinchToClose: !1,
                    errorMsg:
                      '<p class="pswp__error-msg">' +
                      window.languages.productImageLoadingError +
                      "</p>",
                    scaleMode: "zoom",
                    getDoubleTapZoom: function (isMouseClick, item) {
                      return isMouseClick
                        ? 1.6
                        : item.initialZoomLevel < 0.7
                        ? 1
                        : 1.33;
                    },
                    getThumbBoundsFn: function (index) {
                      var thumbnail = _this.element.querySelector(
                          '.Product__Slideshow .Carousel__Cell[data-image-media-position="'.concat(
                            parseInt(index),
                            '"] img'
                          )
                        ),
                        pageYScroll =
                          window.pageYOffset ||
                          document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect();
                      return {
                        x: rect.left,
                        y: rect.top + pageYScroll,
                        w: rect.width,
                      };
                    },
                  }
                );
                var originalUpdateSize = this.photoSwipeInstance.updateSize,
                  lastWidth = null;
                (this.photoSwipeInstance.updateSize = function () {
                  (lastWidth === null || lastWidth !== window.innerWidth) &&
                    originalUpdateSize(this, arguments),
                    (lastWidth = window.innerWidth);
                }),
                  this.photoSwipeInstance.listen(
                    "beforeChange",
                    this._onSlideChanged.bind(this)
                  ),
                  this.photoSwipeInstance.listen(
                    "destroy",
                    this._destroyPhotoSwipe.bind(this)
                  ),
                  this.photoSwipeInstance.listen(
                    "doubleTap",
                    this._onDoubleTap.bind(this)
                  ),
                  this.photoSwipeInstance.listen(
                    "initialZoomIn",
                    this._onInitialZoomIn.bind(this)
                  ),
                  this.photoSwipeInstance.listen(
                    "initialZoomOut",
                    this._onInitialZoomOut.bind(this)
                  ),
                  this.delegateRoot.on(
                    "pswpTap",
                    ".pswp__scroll-wrap",
                    this._onSingleTap.bind(this)
                  ),
                  this.delegateRoot.on(
                    "pswpTap",
                    ".pswp__button--close",
                    this.photoSwipeInstance.close
                  ),
                  this.delegateRoot.on(
                    "pswpTap",
                    ".pswp__button--prev",
                    this.photoSwipeInstance.prev
                  ),
                  this.delegateRoot.on(
                    "pswpTap",
                    ".pswp__button--next",
                    this.photoSwipeInstance.next
                  ),
                  this.photoSwipeInstance.init();
              },
            },
            {
              key: "_onSlideChanged",
              value: function () {
                this.photoSwipeInstance.getCurrentIndex() === 0
                  ? this.photoSwipeInstance.scrollWrap
                      .querySelector(".pswp__button--prev")
                      .setAttribute("disabled", "disabled")
                  : this.photoSwipeInstance.scrollWrap
                      .querySelector(".pswp__button--prev")
                      .removeAttribute("disabled"),
                  this.photoSwipeInstance.getCurrentIndex() + 1 ===
                  this.photoSwipeInstance.options.getNumItemsFn()
                    ? this.photoSwipeInstance.scrollWrap
                        .querySelector(".pswp__button--next")
                        .setAttribute("disabled", "disabled")
                    : this.photoSwipeInstance.scrollWrap
                        .querySelector(".pswp__button--next")
                        .removeAttribute("disabled");
              },
            },
            {
              key: "_onSingleTap",
              value: function (event) {
                if (!event.detail || event.detail.pointerType === "mouse")
                  event.target.classList.contains("pswp__img") &&
                    this.photoSwipeInstance.toggleDesktopZoom(
                      event.detail.releasePoint
                    );
                else {
                  if (event.target.classList.contains("pswp__button")) return;
                  event.target
                    .closest(".pswp")
                    .querySelector(".pswp__ui")
                    .classList.toggle("pswp__ui--hidden");
                }
              },
            },
            {
              key: "_onDoubleTap",
              value: function (point) {
                var initialZoomLevel =
                  this.photoSwipeInstance.currItem.initialZoomLevel;
                this.photoSwipeInstance.getZoomLevel() !== initialZoomLevel
                  ? this.photoSwipeInstance.zoomTo(initialZoomLevel, point, 333)
                  : this.photoSwipeInstance.zoomTo(
                      initialZoomLevel < 0.7 ? 1 : 1.33,
                      point,
                      333
                    );
              },
            },
            {
              key: "_onInitialZoomIn",
              value: function () {
                document
                  .querySelector(".pswp__ui")
                  .classList.remove("pswp__ui--hidden");
              },
            },
            {
              key: "_onInitialZoomOut",
              value: function () {
                document
                  .querySelector(".pswp__ui")
                  .classList.add("pswp__ui--hidden");
              },
            },
            {
              key: "_destroyPhotoSwipe",
              value: function () {
                this.delegateRoot.off("pswpTap"),
                  (this.photoSwipeInstance = null);
              },
            },
          ]),
          ProductImageZoom2
        );
      })(),
      ProductModel = (function () {
        function ProductModel2(element, stackProductImages) {
          _classCallCheck(this, ProductModel2),
            (this.element = element),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            (this.delegateRoot = new domDelegate.Delegate(
              document.documentElement
            )),
            (this.stackProductImages = stackProductImages),
            this._attachListeners();
          var stylesheet = document.createElement("link");
          (stylesheet.rel = "stylesheet"),
            (stylesheet.href =
              "https://web.archive.org/web/20230519212450/https://cdn.shopify.com/shopifycloud/model-viewer-ui/assets/v1.0/model-viewer-ui.css"),
            document.head.appendChild(stylesheet),
            window.Shopify.loadFeatures([
              {
                name: "model-viewer-ui",
                version: "1.0",
                onLoad: this._setupModelViewerUI.bind(this),
              },
              { name: "shopify-xr", version: "1.0" },
            ]);
        }
        return (
          _createClass(ProductModel2, [
            { key: "destroy", value: function () {} },
            {
              key: "_attachListeners",
              value: function () {
                var _this = this;
                this.element
                  .querySelector("model-viewer")
                  .addEventListener(
                    "shopify_model_viewer_ui_toggle_play",
                    function () {
                      _this.element.dispatchEvent(
                        new CustomEvent("model:played", { bubbles: !0 })
                      );
                    }
                  ),
                  this.element
                    .querySelector("model-viewer")
                    .addEventListener(
                      "shopify_model_viewer_ui_toggle_pause",
                      function () {
                        _this.element.dispatchEvent(
                          new CustomEvent("model:paused", { bubbles: !0 })
                        );
                      }
                    );
              },
            },
            {
              key: "hasBeenSelected",
              value: function () {
                Responsive.matchesBreakpoint("supports-hover") &&
                  this.modelUi.play();
              },
            },
            {
              key: "hasBeenDeselected",
              value: function () {
                this.modelUi.pause();
              },
            },
            {
              key: "_setupModelViewerUI",
              value: function () {
                (this.modelElement =
                  this.element.querySelector("model-viewer")),
                  (this.modelUi = new window.Shopify.ModelViewerUI(
                    this.modelElement
                  ));
              },
            },
          ]),
          ProductModel2
        );
      })(),
      ProductReviews = (function () {
        function ProductReviews2(container) {
          _classCallCheck(this, ProductReviews2),
            (this.element = container),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            this.delegateElement.on(
              "click",
              ".spr-summary-actions-newreview",
              this._onNewReviewClicked.bind(this)
            ),
            (window.SPRCallbacks = {}),
            (window.SPRCallbacks.onFormSuccess =
              this._onFormSuccess.bind(this)),
            (window.SPRCallbacks.onReviewsLoad =
              this._onReviewsLoad.bind(this));
        }
        return (
          _createClass(ProductReviews2, [
            {
              key: "destroy",
              value: function () {
                this.delegateElement.off();
              },
            },
            {
              key: "_updatePagination",
              value: function (event, target) {
                SPR.$(target).data(
                  "page",
                  parseInt(target.getAttribute("data-page")) + 1
                );
              },
            },
            {
              key: "_onFormSuccess",
              value: function () {
                var formSuccess = this.element.querySelector(
                  ".spr-form-message-success"
                );
                window.scrollTo(0, formSuccess.offsetTop - 45);
              },
            },
            {
              key: "_onReviewsLoad",
              value: function () {
                var sprSummaryActions = this.element.querySelector(
                    ".spr-summary-actions"
                  ),
                  previousSprPaginationNext = sprSummaryActions.querySelector(
                    ".spr-pagination-next"
                  ),
                  sprPaginationNext = this.element.querySelector(
                    ".spr-pagination .spr-pagination-next"
                  );
                previousSprPaginationNext && previousSprPaginationNext.remove(),
                  sprPaginationNext &&
                    sprSummaryActions.insertBefore(
                      sprPaginationNext,
                      sprSummaryActions.firstChild
                    );
              },
            },
            {
              key: "_onNewReviewClicked",
              value: function (event, target) {
                (target.style.display = "none"),
                  target.previousElementSibling &&
                    (target.previousElementSibling.style.display = "none");
              },
            },
          ]),
          ProductReviews2
        );
      })(),
      Form = (function () {
        function Form2() {
          _classCallCheck(this, Form2);
        }
        return (
          _createClass(Form2, null, [
            {
              key: "serialize",
              value: function (form) {
                function stringKey(key, value) {
                  var beginBracket = key.lastIndexOf("[");
                  if (beginBracket === -1) {
                    var _hash = {};
                    return (_hash[key] = value), _hash;
                  }
                  var newKey = key.substr(0, beginBracket),
                    newValue = {};
                  return (
                    (newValue[key.substring(beginBracket + 1, key.length - 1)] =
                      value),
                    stringKey(newKey, newValue)
                  );
                }
                for (
                  var hash = {}, i = 0, len = form.elements.length;
                  i < len;
                  i++
                ) {
                  var formElement = form.elements[i];
                  if (
                    !(formElement.name === "" || formElement.disabled) &&
                    formElement.name &&
                    !formElement.disabled &&
                    (formElement.checked ||
                      /select|textarea/i.test(formElement.nodeName) ||
                      /hidden|text|search|tel|url|email|password|datetime|date|month|week|time|datetime-local|number|range|color/i.test(
                        formElement.type
                      ))
                  ) {
                    var stringKeys = stringKey(
                      formElement.name,
                      formElement.value
                    );
                    hash = Form2.extend(hash, stringKeys);
                  }
                }
                return hash;
              },
            },
            {
              key: "extend",
              value: function () {
                for (
                  var extended = {},
                    i = 0,
                    merge = function (obj) {
                      for (var prop in obj)
                        obj.hasOwnProperty(prop) &&
                          (Object.prototype.toString.call(obj[prop]) ===
                          "[object Object]"
                            ? (extended[prop] = Form2.extend(
                                extended[prop],
                                obj[prop]
                              ))
                            : (extended[prop] = obj[prop]));
                    };
                  i < arguments.length;
                  i++
                )
                  merge(arguments[i]);
                return extended;
              },
            },
          ]),
          Form2
        );
      })(),
      Currency = (function () {
        function Currency2() {
          _classCallCheck(this, Currency2);
        }
        return (
          _createClass(Currency2, null, [
            {
              key: "formatMoney",
              value: function (cents, format) {
                typeof cents == "string" && (cents = cents.replace(".", ""));
                var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/,
                  formatString = format || "${{amount}}";
                function defaultTo(value2, defaultValue) {
                  return value2 == null || value2 !== value2
                    ? defaultValue
                    : value2;
                }
                function formatWithDelimiters(
                  number,
                  precision,
                  thousands,
                  decimal
                ) {
                  if (
                    ((precision = defaultTo(precision, 2)),
                    (thousands = defaultTo(thousands, ",")),
                    (decimal = defaultTo(decimal, ".")),
                    isNaN(number) || number == null)
                  )
                    return 0;
                  number = (number / 100).toFixed(precision);
                  var parts = number.split("."),
                    dollarsAmount = parts[0].replace(
                      /(\d)(?=(\d\d\d)+(?!\d))/g,
                      "$1" + thousands
                    ),
                    centsAmount = parts[1] ? decimal + parts[1] : "";
                  return dollarsAmount + centsAmount;
                }
                var value = "";
                switch (formatString.match(placeholderRegex)[1]) {
                  case "amount":
                    value = formatWithDelimiters(cents, 2);
                    break;
                  case "amount_no_decimals":
                    value = formatWithDelimiters(cents, 0);
                    break;
                  case "amount_with_space_separator":
                    value = formatWithDelimiters(cents, 2, " ", ".");
                    break;
                  case "amount_no_decimals_with_comma_separator":
                    value = formatWithDelimiters(cents, 0, ",", ".");
                    break;
                  case "amount_no_decimals_with_space_separator":
                    value = formatWithDelimiters(cents, 0, " ");
                    break;
                  case "amount_with_comma_separator":
                    value = formatWithDelimiters(cents, 2, ".", ",");
                    break;
                }
                return formatString.indexOf("with_comma_separator") !== -1
                  ? formatString
                      .replace(placeholderRegex, value)
                      .replace(",00", "")
                  : formatString
                      .replace(placeholderRegex, value)
                      .replace(".00", "");
              },
            },
          ]),
          Currency2
        );
      })(),
      VariantSelector = (function () {
        function VariantSelector2(element, parentProductVariants) {
          var options =
            arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          _classCallCheck(this, VariantSelector2),
            (this.element = element),
            (this.parentProductVariants = parentProductVariants),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            (this.activator =
              options.activator ||
              document.querySelector(
                '[aria-controls="'.concat(element.getAttribute("id"), '"]')
              )),
            (this.onValueChangedCallback =
              options.onValueChanged || function () {}),
            (this.isOpen = !1),
            (this.pageOverlayElement = document.querySelector(".PageOverlay")),
            (this.variantChoiceList = Dom.nodeListToArray(
              this.element.querySelectorAll(".VariantSelector__Choice")
            )),
            (this.variantCarousel = new Carousel(
              this.element.querySelector(".VariantSelector__Carousel"),
              {
                onSelect: this._variantChanged.bind(this),
                onClick: this._variantSelected.bind(this),
              }
            )),
            this._attachListeners();
        }
        return (
          _createClass(VariantSelector2, [
            {
              key: "destroy",
              value: function () {
                this.element.removeEventListener(
                  "keyup",
                  this._handleKeyboardListener
                ),
                  this.delegateElement.off("click"),
                  this.activator.removeEventListener(
                    "click",
                    this._toggleListener
                  ),
                  this.variantCarousel.destroy();
              },
            },
            {
              key: "toggle",
              value: function () {
                this.isOpen ? this.close() : this.open();
              },
            },
            {
              key: "open",
              value: function () {
                this.isOpen ||
                  (this.element.setAttribute("aria-hidden", "false"),
                  this.activator.setAttribute("aria-expanded", "true"),
                  Accessibility.trapFocus(this.element, "variant-selector"),
                  document.documentElement.classList.add("no-scroll"),
                  this.element.setAttribute("style", ""),
                  this.pageOverlayElement.classList.add("is-visible"),
                  this.pageOverlayElement.addEventListener(
                    "click",
                    this._closeListener
                  ),
                  (this.isOpen = !0));
              },
            },
            {
              key: "close",
              value: function () {
                this.isOpen &&
                  (this.element.setAttribute("aria-hidden", "true"),
                  this.activator.setAttribute("aria-expanded", "false"),
                  Accessibility.removeTrapFocus(
                    this.element,
                    "variant-selector"
                  ),
                  document.documentElement.classList.remove("no-scroll"),
                  this.pageOverlayElement.classList.remove("is-visible"),
                  this.pageOverlayElement.removeEventListener(
                    "click",
                    this._closeListener
                  ),
                  (this.isOpen = !1));
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                (this._handleKeyboardListener =
                  this._handleKeyboard.bind(this)),
                  (this._closeListener = this.close.bind(this)),
                  (this._toggleListener = this.toggle.bind(this)),
                  this.element.addEventListener(
                    "keyup",
                    this._handleKeyboardListener
                  ),
                  this.activator.addEventListener(
                    "click",
                    this._toggleListener
                  ),
                  this.delegateElement.on(
                    "click",
                    '[data-action="select-variant"]',
                    this._onVariantSelect.bind(this)
                  ),
                  this.parentProductVariants.delegateElement.on(
                    "variant:changed",
                    this._onVariantChanged.bind(this)
                  );
              },
            },
            {
              key: "_variantChanged",
              value: function (selectedIndex) {
                var activeChoice = this.variantChoiceList[selectedIndex];
                activeChoice.classList.add("is-selected"),
                  Dom.getSiblings(activeChoice, ".is-selected").forEach(
                    function (item) {
                      return item.classList.remove("is-selected");
                    }
                  );
              },
            },
            {
              key: "_variantSelected",
              value: function (cellElement, cellIndex) {
                this.variantCarousel.getSelectedIndex() === cellIndex
                  ? (this.onValueChangedCallback(
                      cellElement.getAttribute("data-option-value"),
                      cellElement,
                      this.activator
                    ),
                    this.close())
                  : this.variantCarousel.selectCell(cellIndex);
              },
            },
            {
              key: "_onVariantChanged",
              value: function (event) {
                var _this = this,
                  selectedVariant = event.detail.variant,
                  imageWrapperElements = this.element.querySelectorAll(
                    ".VariantSelector__ImageWrapper"
                  ),
                  found = !1;
                Dom.nodeListToArray(imageWrapperElements).forEach(function (
                  image
                ) {
                  var colorPosition =
                      parseInt(
                        image.parentElement.getAttribute("data-option-position")
                      ) - 1,
                    combinationExcludedColor = "";
                  selectedVariant.options.forEach(function (
                    optionValue,
                    index
                  ) {
                    index !== colorPosition &&
                      (combinationExcludedColor += optionValue);
                  }),
                    image.getAttribute("data-variant-title") ===
                    combinationExcludedColor
                      ? (image.setAttribute("aria-hidden", "false"),
                        (found = !0))
                      : image.setAttribute("aria-hidden", "true");
                }),
                  found ||
                    imageWrapperElements.children[0].setAttribute(
                      "aria-hidden",
                      "false"
                    );
                var foundColorIndex = 0;
                Dom.nodeListToArray(
                  this.element.querySelectorAll(".VariantSelector__ChoicePrice")
                ).forEach(function (priceElement, index) {
                  var colorPosition =
                    parseInt(priceElement.getAttribute("data-color-position")) -
                    1;
                  _this.parentProductVariants.productData.variants.forEach(
                    function (variant) {
                      var matchOptionsExcludedColor = !0;
                      variant.options.forEach(function (option, index2) {
                        index2 !== colorPosition &&
                          variant.options[index2] !==
                            selectedVariant.options[index2] &&
                          (matchOptionsExcludedColor = !1);
                      }),
                        matchOptionsExcludedColor &&
                          variant.options[colorPosition] ===
                            selectedVariant.options[colorPosition] &&
                          foundColorIndex++ === index &&
                          (priceElement.innerHTML =
                            '<span class="Heading Text--subdued">'.concat(
                              Currency.formatMoney(
                                variant.price,
                                window.theme.moneyFormat
                              ),
                              "</span>"
                            ));
                    }
                  );
                });
              },
            },
            {
              key: "_onVariantSelect",
              value: function () {
                var selectedCell =
                  this.variantCarousel.flickityInstance.selectedCell.element;
                this.onValueChangedCallback(
                  selectedCell.getAttribute("data-option-value"),
                  selectedCell,
                  this.activator
                ),
                  this.close();
              },
            },
            {
              key: "_handleKeyboard",
              value: function (event) {
                this.isOpen && event.keyCode === 27 && this.close();
              },
            },
          ]),
          VariantSelector2
        );
      })(),
      StoreAvailability = (function () {
        function StoreAvailability2(element, productTitle) {
          _classCallCheck(this, StoreAvailability2),
            (this.element = element),
            (this.productTitle = productTitle),
            (this.existingDrawers = {});
        }
        return (
          _createClass(StoreAvailability2, [
            {
              key: "updateWithVariant",
              value: function (variant) {
                if (this.element) {
                  if (!variant) {
                    this.element.textContent = "";
                    return;
                  }
                  this._renderAvailabilitySection(variant.id);
                }
              },
            },
            {
              key: "_renderAvailabilitySection",
              value: function (id) {
                var _this = this;
                this.element.innerHTML = "";
                var availabilityModal = document.getElementById(
                  "StoreAvailabilityModal-".concat(id)
                );
                return (
                  availabilityModal && availabilityModal.remove(),
                  this.existingDrawers["StoreAvailabilityModal-".concat(id)] &&
                    (this.existingDrawers[
                      "StoreAvailabilityModal-".concat(id)
                    ].destroy(),
                    delete this.existingDrawers[
                      "StoreAvailabilityModal-".concat(id)
                    ]),
                  fetch(
                    ""
                      .concat(window.routes.rootUrlWithoutSlash, "/variants/")
                      .concat(id, "?section_id=store-availability")
                  ).then(function (response) {
                    return response.text().then(function (content) {
                      (_this.element.innerHTML = content),
                        (_this.element.innerHTML =
                          _this.element.firstElementChild.innerHTML);
                      var productTitle = _this.element.querySelector(
                        ".store-availabilities-modal__product-title"
                      );
                      productTitle &&
                        (productTitle.textContent = _this.productTitle);
                      var availabilityModal2 = document.getElementById(
                        "StoreAvailabilityModal-".concat(id)
                      );
                      document.body.appendChild(availabilityModal2),
                        (_this.existingDrawers[
                          "StoreAvailabilityModal-".concat(id)
                        ] = new Drawer(availabilityModal2));
                    });
                  })
                );
              },
            },
          ]),
          StoreAvailability2
        );
      })(),
      ProductVariants = (function () {
        function ProductVariants2(container, options) {
          var _this = this;
          _classCallCheck(this, ProductVariants2),
            (this.element = container),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            (this.options = options);
          var jsonData = JSON.parse(
            this.element.querySelector("[data-product-json]").innerHTML
          );
          (this.productData = jsonData.product),
            (this.variantsInventories = jsonData.inventories || {}),
            (this.masterSelector = this.element.querySelector(
              "#product-select-".concat(this.productData.id)
            )),
            this.productData.variants.forEach(function (variant) {
              variant.id === jsonData.selected_variant_id &&
                ((_this.currentVariant = variant),
                (_this.option1 = variant.option1),
                (_this.option2 = variant.option2),
                (_this.option3 = variant.option3));
            }),
            (this.storeAvailability = new StoreAvailability(
              this.element.querySelector(
                ".ProductMeta__StoreAvailabilityContainer"
              ),
              this.productData.title
            )),
            this.storeAvailability.updateWithVariant(this.currentVariant),
            this._attachListeners(),
            this._createSelectors();
        }
        return (
          _createClass(ProductVariants2, [
            {
              key: "destroy",
              value: function () {
                this.delegateElement.off("click"),
                  this.formPopovers.forEach(function (popover) {
                    return popover.destroy();
                  }),
                  this.formVariantSelectors.forEach(function (selector) {
                    return selector.destroy();
                  });
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                this.delegateElement.on(
                  "click",
                  '[data-action="add-to-cart"]',
                  this._addToCart.bind(this)
                ),
                  this.delegateElement.on(
                    "click",
                    '[data-action="decrease-quantity"]',
                    this._decreaseQuantity.bind(this)
                  ),
                  this.delegateElement.on(
                    "click",
                    '[data-action="increase-quantity"]',
                    this._increaseQuantity.bind(this)
                  ),
                  this.delegateElement.on(
                    "change",
                    '[name="quantity"]',
                    this._validateQuantity.bind(this)
                  ),
                  this.delegateElement.on(
                    "change",
                    '.ProductForm__Option [type="radio"]',
                    this._onOptionChanged.bind(this)
                  );
              },
            },
            {
              key: "_createSelectors",
              value: function () {
                var _this2 = this;
                (this.formPopovers = []),
                  (this.formVariantSelectors = []),
                  Dom.nodeListToArray(
                    this.element.querySelectorAll(".OptionSelector")
                  ).forEach(function (item) {
                    var popover = new Popover(item, {
                      preferredPosition: "left",
                      onValueChanged: _this2._onOptionChanged.bind(_this2),
                    });
                    _this2.formPopovers.push(popover);
                  }),
                  Dom.nodeListToArray(
                    this.element.querySelectorAll(".VariantSelector")
                  ).forEach(function (item) {
                    var variantSelector = new VariantSelector(item, _this2, {
                      onValueChanged: _this2._onOptionChanged.bind(_this2),
                    });
                    _this2.formVariantSelectors.push(variantSelector);
                  });
              },
            },
            {
              key: "_onVariantChanged",
              value: function (previousVariant, newVariant) {
                this._updateProductPrices(newVariant, previousVariant),
                  this._updateInventory(newVariant, previousVariant),
                  this._updateSku(newVariant, previousVariant),
                  this._updateUnitPrice(newVariant, previousVariant),
                  this._updateAddToCartButton(newVariant, previousVariant),
                  this.storeAvailability.updateWithVariant(newVariant),
                  this.element.dispatchEvent(
                    new CustomEvent("variant:changed", {
                      bubbles: !0,
                      detail: {
                        variant: newVariant,
                        previousVariant: previousVariant,
                      },
                    })
                  );
              },
            },
            {
              key: "_updateProductPrices",
              value: function (newVariant, previousVariant) {
                var productMetaPrices = this.element.querySelector(
                    ".ProductMeta__PriceList"
                  ),
                  currencyFormat = window.theme.currencyCodeEnabled
                    ? window.theme.moneyWithCurrencyFormat
                    : window.theme.moneyFormat;
                if (productMetaPrices)
                  if (!newVariant) productMetaPrices.style.display = "none";
                  else {
                    if (
                      previousVariant &&
                      previousVariant.price === newVariant.price &&
                      previousVariant.compare_at_price ===
                        newVariant.compare_at_price
                    )
                      return;
                    (productMetaPrices.innerHTML = ""),
                      newVariant.compare_at_price > newVariant.price
                        ? ((productMetaPrices.innerHTML +=
                            '<span class="ProductMeta__Price Price Price--highlight Text--subdued u-h4" data-money-convertible>'.concat(
                              Currency.formatMoney(
                                newVariant.price,
                                currencyFormat
                              ),
                              "</span>"
                            )),
                          (productMetaPrices.innerHTML +=
                            '<span class="ProductMeta__Price Price Price--compareAt Text--subdued u-h4" data-money-convertible>'.concat(
                              Currency.formatMoney(
                                newVariant.compare_at_price,
                                currencyFormat
                              ),
                              "</span>"
                            )))
                        : (productMetaPrices.innerHTML +=
                            '<span class="ProductMeta__Price Price Text--subdued u-h4" data-money-convertible>'.concat(
                              Currency.formatMoney(
                                newVariant.price,
                                currencyFormat
                              ),
                              "</span>"
                            )),
                      (productMetaPrices.style.display = "");
                  }
              },
            },
            {
              key: "_updateInventory",
              value: function (newVariant) {
                if (this.options.showInventoryQuantity) {
                  var productFormInventory = this.element.querySelector(
                      ".ProductForm__Inventory"
                    ),
                    variantInventory = newVariant
                      ? this.variantsInventories[newVariant.id]
                      : null;
                  !newVariant ||
                  variantInventory.inventory_management === null ||
                  variantInventory.inventory_quantity <= 0 ||
                  (this.options.inventoryQuantityThreshold > 0 &&
                    variantInventory.inventory_quantity >
                      this.options.inventoryQuantityThreshold)
                    ? (productFormInventory.style.display = "none")
                    : ((productFormInventory.innerHTML =
                        variantInventory.inventory_message),
                      (productFormInventory.style.display = ""));
                }
              },
            },
            {
              key: "_updateSku",
              value: function (newVariant) {
                if (!(!this.options.showSku || !newVariant)) {
                  var productSkuNumber = this.element.querySelector(
                    ".ProductMeta__SkuNumber"
                  );
                  productSkuNumber &&
                    newVariant.sku &&
                    (productSkuNumber.innerText = newVariant.sku);
                }
              },
            },
            {
              key: "_updateUnitPrice",
              value: function (newVariant) {
                if (newVariant) {
                  var unitPriceMeasurement = this.element.querySelector(
                    ".ProductMeta__UnitPriceMeasurement"
                  );
                  if (unitPriceMeasurement) {
                    if (!newVariant.hasOwnProperty("unit_price")) {
                      unitPriceMeasurement.style.display = "none";
                      return;
                    }
                    (unitPriceMeasurement.style.display = "block"),
                      (unitPriceMeasurement.querySelector(
                        ".UnitPriceMeasurement__Price"
                      ).innerHTML = Currency.formatMoney(
                        newVariant.unit_price,
                        window.theme.moneyFormat
                      )),
                      (unitPriceMeasurement.querySelector(
                        ".UnitPriceMeasurement__ReferenceUnit"
                      ).textContent =
                        newVariant.unit_price_measurement.reference_unit);
                    var unitPriceReferenceValue =
                      unitPriceMeasurement.querySelector(
                        ".UnitPriceMeasurement__ReferenceValue"
                      );
                    (unitPriceReferenceValue.textContent =
                      newVariant.unit_price_measurement.reference_value),
                      (unitPriceReferenceValue.style.display =
                        newVariant.unit_price_measurement.reference_value === 1
                          ? "none"
                          : "inline");
                  }
                }
              },
            },
            {
              key: "_updateAddToCartButton",
              value: function (newVariant) {
                var addToCartButton = this.element.querySelector(
                    ".ProductForm__AddToCart"
                  ),
                  shopifyPaymentButton = this.element.querySelector(
                    ".shopify-payment-button"
                  );
                addToCartButton &&
                  (addToCartButton.classList.remove("Button--secondary"),
                  addToCartButton.classList.remove("Button--primary"),
                  newVariant
                    ? newVariant.available
                      ? (addToCartButton.removeAttribute("disabled"),
                        addToCartButton.classList.add(
                          addToCartButton.getAttribute(
                            "data-use-primary-button"
                          ) === "true"
                            ? "Button--primary"
                            : "Button--secondary"
                        ),
                        addToCartButton.setAttribute(
                          "data-action",
                          "add-to-cart"
                        ),
                        this.options.showPriceInButton === void 0 ||
                        this.options.showPriceInButton
                          ? (addToCartButton.innerHTML = "\n            <span>"
                              .concat(
                                window.languages.productFormAddToCart,
                                '</span>\n            <span class="Button__SeparatorDot"></span>\n            <span data-money-convertible>'
                              )
                              .concat(
                                Currency.formatMoney(
                                  newVariant.price,
                                  window.theme.moneyFormat
                                ),
                                "</span>\n          "
                              ))
                          : (addToCartButton.innerHTML = "<span>".concat(
                              window.languages.productFormAddToCart,
                              "</span>"
                            )))
                      : (addToCartButton.setAttribute("disabled", "disabled"),
                        addToCartButton.classList.add("Button--secondary"),
                        addToCartButton.removeAttribute("data-action"),
                        (addToCartButton.innerHTML =
                          window.languages.productFormSoldOut))
                    : (addToCartButton.setAttribute("disabled", "disabled"),
                      addToCartButton.removeAttribute("data-action"),
                      addToCartButton.classList.add("Button--secondary"),
                      (addToCartButton.innerHTML =
                        window.languages.productFormUnavailable))),
                  this.options.showPaymentButton &&
                    shopifyPaymentButton &&
                    (!newVariant || !newVariant.available
                      ? (shopifyPaymentButton.style.display = "none")
                      : (shopifyPaymentButton.style.display = "block"));
              },
            },
            {
              key: "_onOptionChanged",
              value: function (newValue, target, activator) {
                if (activator)
                  (this[
                    "option" + target.getAttribute("data-option-position")
                  ] = newValue),
                    (activator.querySelector(
                      ".ProductForm__SelectedValue"
                    ).innerHTML = newValue);
                else {
                  this["option" + target.getAttribute("data-option-position")] =
                    target.value;
                  var selectedValue = target
                    .closest(".ProductForm__Option")
                    .querySelector(".ProductForm__SelectedValue");
                  selectedValue && (selectedValue.innerHTML = target.value);
                }
                var previousVariant = this.currentVariant;
                (this.currentVariant = this._getCurrentVariantFromOptions()),
                  this._onVariantChanged(previousVariant, this.currentVariant),
                  this.currentVariant &&
                    (this.options.enableHistoryState &&
                      this._updateHistoryState(this.currentVariant),
                    this.masterSelector
                      .querySelector("[selected]")
                      .removeAttribute("selected"),
                    this.masterSelector
                      .querySelector(
                        '[value="'.concat(this.currentVariant.id, '"]')
                      )
                      .setAttribute("selected", "selected"),
                    this.masterSelector.dispatchEvent(
                      new Event("change", { bubbles: !0 })
                    ));
              },
            },
            {
              key: "_getCurrentVariantFromOptions",
              value: function () {
                var _this3 = this,
                  found = !1;
                return (
                  this.productData.variants.forEach(function (variant) {
                    variant.option1 === _this3.option1 &&
                      variant.option2 === _this3.option2 &&
                      variant.option3 === _this3.option3 &&
                      (found = variant);
                  }),
                  found || null
                );
              },
            },
            {
              key: "_updateHistoryState",
              value: function (variant) {
                if (history.replaceState) {
                  var newUrl = ""
                    .concat(window.location.protocol, "//")
                    .concat(window.location.host)
                    .concat(window.location.pathname, "?variant=")
                    .concat(variant.id);
                  window.history.replaceState({ path: newUrl }, "", newUrl);
                }
              },
            },
            {
              key: "_addToCart",
              value: function (event) {
                var _this4 = this;
                if (this.options.useAjaxCart) {
                  event.preventDefault();
                  var addToCartButton = this.element.querySelector(
                    ".ProductForm__AddToCart"
                  );
                  addToCartButton.setAttribute("disabled", "disabled"),
                    document.dispatchEvent(
                      new CustomEvent("theme:loading:start")
                    );
                  var formElement = this.element.querySelector(
                    'form[action*="/cart/add"]'
                  );
                  fetch("".concat(window.routes.cartAddUrl, ".js"), {
                    body: JSON.stringify(Form.serialize(formElement)),
                    credentials: "same-origin",
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "X-Requested-With": "XMLHttpRequest",
                    },
                  }).then(function (response) {
                    document.dispatchEvent(
                      new CustomEvent("theme:loading:end")
                    );
                    var quantityElement =
                      formElement.querySelector('[name="quantity"]');
                    response.ok
                      ? (addToCartButton.removeAttribute("disabled"),
                        _this4.element.dispatchEvent(
                          new CustomEvent("product:added", {
                            bubbles: !0,
                            detail: {
                              variant: _this4.currentVariant,
                              quantity: quantityElement
                                ? parseInt(quantityElement.value)
                                : 1,
                            },
                          })
                        ))
                      : response.json().then(function (content) {
                          var errorMessageElement =
                            document.createElement("span");
                          (errorMessageElement.className =
                            "ProductForm__Error Alert Alert--error"),
                            (errorMessageElement.innerHTML =
                              content.description),
                            addToCartButton.removeAttribute("disabled"),
                            addToCartButton.insertAdjacentElement(
                              "afterend",
                              errorMessageElement
                            ),
                            setTimeout(function () {
                              errorMessageElement.remove();
                            }, 2500);
                        });
                  }),
                    event.preventDefault();
                }
              },
            },
            {
              key: "_decreaseQuantity",
              value: function (event, target) {
                target.nextElementSibling.value = Math.max(
                  parseInt(target.nextElementSibling.value) - 1,
                  1
                );
              },
            },
            {
              key: "_increaseQuantity",
              value: function (event, target) {
                target.previousElementSibling.value =
                  parseInt(target.previousElementSibling.value) + 1;
              },
            },
            {
              key: "_validateQuantity",
              value: function (event, target) {
                target.value = Math.max(parseInt(target.value) || 1, 1);
              },
            },
          ]),
          ProductVariants2
        );
      })(),
      ProductVideo = (function () {
        function ProductVideo2(
          element,
          stackProductImages,
          enableVideoLooping
        ) {
          switch (
            (_classCallCheck(this, ProductVideo2),
            (this.element = element),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            (this.stackProductImages = stackProductImages),
            (this.enableVideoLooping = enableVideoLooping),
            (this.player = null),
            this.element.getAttribute("data-media-type"))
          ) {
            case "video":
              var stylesheet = document.createElement("link");
              (stylesheet.rel = "stylesheet"),
                (stylesheet.href =
                  "https://web.archive.org/web/20230519212450/https://cdn.shopify.com/shopifycloud/shopify-plyr/v1.0/shopify-plyr.css"),
                document.head.appendChild(stylesheet),
                window.Shopify.loadFeatures([
                  {
                    name: "video-ui",
                    version: "1.0",
                    onLoad: this._setupHtml5Video.bind(this),
                  },
                ]);
              break;
            case "external_video":
              this._setupExternalVideo();
              break;
          }
        }
        return (
          _createClass(ProductVideo2, [
            {
              key: "destroy",
              value: function () {
                this.player && this.player.destroy();
              },
            },
            {
              key: "hasBeenSelected",
              value: function () {
                Responsive.matchesBreakpoint("supports-hover") && this.play();
              },
            },
            {
              key: "hasBeenDeselected",
              value: function () {
                this.pause();
              },
            },
            {
              key: "play",
              value: function () {
                switch (this.element.getAttribute("data-media-type")) {
                  case "video":
                    this.player.play();
                    break;
                  case "external_video":
                    this.player.playVideo();
                    break;
                }
              },
            },
            {
              key: "pause",
              value: function () {
                switch (this.element.getAttribute("data-media-type")) {
                  case "video":
                    this.player.pause();
                    break;
                  case "external_video":
                    this.player.pauseVideo();
                    break;
                }
              },
            },
            {
              key: "_setupHtml5Video",
              value: function () {
                var _this = this;
                (this.player = new Shopify.Plyr(
                  this.element.querySelector("video"),
                  {
                    controls: [
                      "play",
                      "progress",
                      "mute",
                      "volume",
                      "play-large",
                      "fullscreen",
                    ],
                    loop: { active: this.enableVideoLooping },
                    hideControlsOnPause: !0,
                    clickToPlay: !0,
                    iconUrl:
                      "//web.archive.org/web/20230519212450/https://cdn.shopify.com/shopifycloud/shopify-plyr/v1.0/shopify-plyr.svg",
                    tooltips: { controls: !1, seek: !0 },
                  }
                )),
                  this.player.on("play", function () {
                    _this.element.dispatchEvent(
                      new CustomEvent("video:played", { bubbles: !0 })
                    );
                  }),
                  this.player.on("pause", function () {
                    _this.element.dispatchEvent(
                      new CustomEvent("video:paused", { bubbles: !0 })
                    );
                  });
              },
            },
            {
              key: "_setupExternalVideo",
              value: function () {
                this.element.getAttribute("data-video-host") === "youtube" &&
                  this._loadYouTubeScript().then(
                    this._setupYouTubePlayer.bind(this)
                  );
              },
            },
            {
              key: "_setupYouTubePlayer",
              value: function () {
                var _this2 = this,
                  playerLoadingInterval = setInterval(function () {
                    window.YT !== void 0 &&
                      window.YT.Player !== void 0 &&
                      ((_this2.player = new YT.Player(
                        _this2.element.querySelector("iframe"),
                        {
                          videoId: _this2.element.getAttribute("data-video-id"),
                          events: {
                            onStateChange: function (event) {
                              event.data === window.YT.PlayerState.PLAYING
                                ? _this2.element.dispatchEvent(
                                    new CustomEvent("video:played", {
                                      bubbles: !0,
                                    })
                                  )
                                : event.data === YT.PlayerState.PAUSED &&
                                  _this2.element.dispatchEvent(
                                    new CustomEvent("video:paused", {
                                      bubbles: !0,
                                    })
                                  ),
                                event.data === window.YT.PlayerState.ENDED &&
                                  _this2.enableVideoLooping &&
                                  event.target.seekTo(0);
                            },
                          },
                        }
                      )),
                      clearInterval(playerLoadingInterval));
                  }, 50);
              },
            },
            {
              key: "_loadYouTubeScript",
              value: function () {
                return new Promise(function (resolve, reject) {
                  var script = document.createElement("script");
                  document.body.appendChild(script),
                    (script.onload = resolve),
                    (script.onerror = reject),
                    (script.async = !0),
                    (script.src =
                      "//web.archive.org/web/20230519212450/https://www.youtube.com/iframe_api");
                });
              },
            },
          ]),
          ProductVideo2
        );
      })(),
      ScrollSpy = (function () {
        function ScrollSpy2(container, elementsToSpy, observerOptions) {
          var _this = this;
          _classCallCheck(this, ScrollSpy2),
            (this.container = container),
            (this.targets = []),
            (this.targetIndices = {}),
            (this.indicesInViewPort = []),
            (this.observer = new IntersectionObserver(
              this._onIntersectionChange.bind(this),
              observerOptions
            )),
            elementsToSpy.forEach(function (elementToSpy, index) {
              _this.targets.push(elementToSpy),
                (_this.targetIndices[elementToSpy.id] = index),
                _this.observer.observe(elementToSpy);
            });
        }
        return (
          _createClass(ScrollSpy2, [
            {
              key: "destroy",
              value: function () {
                this.observer.disconnect();
              },
            },
            {
              key: "_onIntersectionChange",
              value: function (changes) {
                for (
                  var oldTargetIndex = this.indicesInViewPort[0] || 0,
                    i = changes.length - 1;
                  i >= 0;
                  i--
                )
                  this._updateIndicesInViewPort(changes[i], oldTargetIndex);
                if (
                  ((this.indicesInViewPort = this.indicesInViewPort.filter(
                    function (value, index, self) {
                      return self.indexOf(value) === index;
                    }
                  )),
                  !(
                    this.indicesInViewPort.length === 0 ||
                    oldTargetIndex === this.indicesInViewPort[0]
                  ))
                ) {
                  var event = new CustomEvent("scrollspy:target:changed", {
                    detail: {
                      newTarget: this.targets[this.indicesInViewPort[0]],
                      oldTarget: this.targets[oldTargetIndex],
                    },
                  });
                  this.container.dispatchEvent(event);
                }
              },
            },
            {
              key: "_updateIndicesInViewPort",
              value: function (change, oldTargetIndex) {
                var index = this.targetIndices[change.target.id];
                if (change.intersectionRatio === 0) {
                  var indexInViewPort = this.indicesInViewPort.indexOf(index);
                  indexInViewPort !== -1 &&
                    this.indicesInViewPort.splice(indexInViewPort, 1);
                } else
                  index < oldTargetIndex
                    ? this.indicesInViewPort.unshift(index)
                    : index >
                      this.indicesInViewPort[this.indicesInViewPort.length - 1]
                    ? this.indicesInViewPort.push(index)
                    : (this.indicesInViewPort.push(index),
                      this.indicesInViewPort.sort());
              },
            },
          ]),
          ScrollSpy2
        );
      })(),
      SearchBar = (function () {
        function SearchBar2() {
          _classCallCheck(this, SearchBar2),
            (this.documentDelegate = new domDelegate.Delegate(document.body)),
            (this.searchElement = document.getElementById("Search")),
            (this.searchInputElement =
              this.searchElement.querySelector('[name="q"]')),
            (this.searchResultsElement =
              this.searchElement.querySelector(".Search__Results")),
            (this.queryMap = {}),
            (this.isOpen = !1),
            (this.pageOverlayElement = document.querySelector(".PageOverlay")),
            this._attachListeners();
        }
        return (
          _createClass(SearchBar2, [
            {
              key: "destroy",
              value: function () {
                this.searchInputElement.removeEventListener(
                  "keydown",
                  this._preventSubmissionListener
                ),
                  this.searchInputElement.removeEventListener(
                    "input",
                    this._onInputListener
                  ),
                  this.documentDelegate.off();
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                (this._preventSubmissionListener =
                  this._preventSubmission.bind(this)),
                  (this._onInputListener = this._debounce(
                    this._onInput.bind(this),
                    250
                  )),
                  this.searchInputElement.addEventListener(
                    "keydown",
                    this._preventSubmissionListener
                  ),
                  this.searchInputElement.addEventListener(
                    "input",
                    this._onInputListener
                  ),
                  this.documentDelegate.on(
                    "click",
                    '[data-action="toggle-search"]',
                    this._toggleSearch.bind(this)
                  ),
                  this.documentDelegate.on(
                    "click",
                    '[data-action="open-search"]',
                    this._openSearch.bind(this)
                  ),
                  this.documentDelegate.on(
                    "click",
                    '[data-action="close-search"]',
                    this._closeSearch.bind(this)
                  ),
                  this.documentDelegate.on(
                    "search:close",
                    this._closeSearch.bind(this)
                  );
              },
            },
            {
              key: "_toggleSearch",
              value: function (event) {
                this.isOpen
                  ? this._closeSearch(event)
                  : this._openSearch(event),
                  event.preventDefault();
              },
            },
            {
              key: "_openSearch",
              value: function () {
                var _this = this;
                this.searchElement.setAttribute("aria-hidden", "false"),
                  document.documentElement.classList.add("no-scroll"),
                  Accessibility.trapFocus(
                    this.searchElement,
                    "search",
                    this.searchElement.querySelector('[name="q"]')
                  );
                var onFocusListener = function onFocusListener2() {
                  _this.searchInputElement.focus(),
                    _this.searchElement.removeEventListener(
                      "transitionend",
                      onFocusListener2
                    );
                };
                this.searchElement.addEventListener(
                  "transitionend",
                  onFocusListener
                ),
                  (this.isOpen = !0),
                  this.pageOverlayElement.classList.add("is-visible"),
                  (document.querySelector(
                    "#shopify-section-header"
                  ).style.zIndex = 10);
              },
            },
            {
              key: "_closeSearch",
              value: function () {
                var _this2 = this;
                this.searchElement.setAttribute("aria-hidden", "true"),
                  document.documentElement.classList.remove("no-scroll"),
                  Accessibility.removeTrapFocus(this.searchElement, "search"),
                  (this.isOpen = !1);
                var onTransitionEnd = function onTransitionEnd2(event) {
                  event.propertyName === "visibility" &&
                    ((document.querySelector(
                      "#shopify-section-header"
                    ).style.zIndex = ""),
                    _this2.pageOverlayElement.removeEventListener(
                      "transitionend",
                      onTransitionEnd2
                    ));
                };
                this.pageOverlayElement.addEventListener(
                  "transitionend",
                  onTransitionEnd
                ),
                  this.pageOverlayElement.classList.remove("is-visible");
              },
            },
            {
              key: "_preventSubmission",
              value: function (event) {
                event.keyCode === 13 &&
                  window.theme.searchMode !== "product" &&
                  event.preventDefault();
              },
            },
            {
              key: "_onInput",
              value: function (event) {
                var _this3 = this;
                if (event.keyCode !== 13) {
                  if (
                    ((this.lastInputValue = event.target.value),
                    this.lastInputValue === "")
                  ) {
                    this._resetSearch();
                    return;
                  }
                  var queryOptions = {
                      method: "GET",
                      credentials: "same-origin",
                    },
                    queries = [
                      fetch(
                        ""
                          .concat(
                            window.routes.searchUrl,
                            "?section_id=predictive-search&q="
                          )
                          .concat(
                            encodeURIComponent(this.lastInputValue),
                            "*&type=product"
                          ),
                        queryOptions
                      ),
                    ];
                  window.theme.searchMode !== "product" &&
                    queries.push(
                      fetch(
                        ""
                          .concat(
                            window.routes.searchUrl,
                            "?section_id=predictive-search&q="
                          )
                          .concat(
                            encodeURIComponent(this.lastInputValue),
                            "*&type="
                          )
                          .concat(
                            window.theme.searchMode.replace("product,", "")
                          ),
                        queryOptions
                      )
                    ),
                    (this.queryMap[this.lastInputValue] = !0),
                    document.dispatchEvent(
                      new CustomEvent("theme:loading:start")
                    ),
                    Promise.all(queries).then(function (responses) {
                      _this3.lastInputValue === event.target.value &&
                        (delete _this3.queryMap[event.target.value],
                        Promise.all(
                          responses.map(function (response) {
                            return response.text();
                          })
                        ).then(function (contents) {
                          window.theme.searchMode === "product"
                            ? (_this3.searchResultsElement.innerHTML =
                                contents[0])
                            : (_this3.searchResultsElement.innerHTML =
                                '<div class="PageLayout PageLayout--breakLap">\n              <div class="PageLayout__Section">'
                                  .concat(
                                    contents[0],
                                    '</div>\n              <div class="PageLayout__Section PageLayout__Section--secondary">'
                                  )
                                  .concat(
                                    contents[1],
                                    "</div>\n            </div>"
                                  )),
                            _this3.searchResultsElement.setAttribute(
                              "aria-hidden",
                              "false"
                            );
                        }),
                        document.dispatchEvent(
                          new CustomEvent("theme:loading:end")
                        ));
                    });
                }
              },
            },
            {
              key: "_resetSearch",
              value: function () {
                window.theme.searchMode === "product"
                  ? (this.searchResultsElement.innerHTML = "")
                  : (this.searchResultsElement.innerHTML =
                      '<div class="PageLayout PageLayout--breakLap">\n              <div class="PageLayout__Section"></div>\n              <div class="PageLayout__Section PageLayout__Section--secondary"></div>\n            </div>'),
                  this.searchResultsElement.setAttribute("aria-hidden", "true"),
                  document.dispatchEvent(new CustomEvent("theme:loading:end"));
              },
            },
            {
              key: "_debounce",
              value: function (fn, delay) {
                var _this4 = this,
                  timer = null;
                return function () {
                  for (
                    var _len = arguments.length,
                      args = new Array(_len),
                      _key = 0;
                    _key < _len;
                    _key++
                  )
                    args[_key] = arguments[_key];
                  clearTimeout(timer),
                    (timer = setTimeout(function () {
                      fn.apply(_this4, args);
                    }, delay));
                };
              },
            },
          ]),
          SearchBar2
        );
      })(),
      CountrySelector = (function () {
        function CountrySelector2(countrySelect, provinceSelect) {
          _classCallCheck(this, CountrySelector2),
            (this.countrySelect = countrySelect),
            (this.provinceSelect = provinceSelect),
            this.countrySelect &&
              this.provinceSelect &&
              (this._attachListeners(), this._initSelectors());
        }
        return (
          _createClass(CountrySelector2, [
            {
              key: "destroy",
              value: function () {
                this.countrySelect &&
                  this.countrySelect.removeEventListener(
                    "change",
                    this._onCountryChangedListener
                  );
              },
            },
            {
              key: "_initSelectors",
              value: function () {
                var defaultCountry =
                  this.countrySelect.getAttribute("data-default");
                if (defaultCountry) {
                  for (var i = 0; i !== this.countrySelect.options.length; ++i)
                    if (this.countrySelect.options[i].text === defaultCountry) {
                      this.countrySelect.selectedIndex = i;
                      break;
                    }
                } else this.countrySelect.selectedIndex = 0;
                var event = new Event("change", { bubbles: !0 });
                this.countrySelect.dispatchEvent(event);
                var defaultProvince =
                  this.provinceSelect.getAttribute("data-default");
                if (defaultProvince) {
                  for (
                    var _i = 0;
                    _i !== this.provinceSelect.options.length;
                    ++_i
                  )
                    if (
                      this.provinceSelect.options[_i].text === defaultProvince
                    ) {
                      this.provinceSelect.selectedIndex = _i;
                      break;
                    }
                }
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                (this._onCountryChangedListener =
                  this._onCountryChanged.bind(this)),
                  this.countrySelect.addEventListener(
                    "change",
                    this._onCountryChangedListener
                  );
              },
            },
            {
              key: "_onCountryChanged",
              value: function () {
                var _this = this,
                  selectedOption =
                    this.countrySelect.options[
                      this.countrySelect.selectedIndex
                    ],
                  provinces = JSON.parse(
                    selectedOption.getAttribute("data-provinces") || "[]"
                  );
                if (
                  ((this.provinceSelect.innerHTML = ""), provinces.length === 0)
                ) {
                  this.provinceSelect.parentNode.style.display = "none";
                  return;
                }
                provinces.forEach(function (data) {
                  _this.provinceSelect.options.add(
                    new Option(data[1], data[0])
                  );
                }),
                  (this.provinceSelect.parentNode.style.display = "block");
              },
            },
          ]),
          CountrySelector2
        );
      })(),
      ShippingEstimator = (function () {
        function ShippingEstimator2(element) {
          _classCallCheck(this, ShippingEstimator2),
            (this.element = element),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            (this.countrySelector = new CountrySelector(
              this.element.querySelector('[name="country"]'),
              this.element.querySelector('[name="province"]')
            )),
            this._attachListeners();
        }
        return (
          _createClass(ShippingEstimator2, [
            {
              key: "onUnload",
              value: function () {
                this.delegateElement.off("click"),
                  this.countrySelector.destroy();
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                this.delegateElement.on(
                  "click",
                  ".ShippingEstimator__Submit",
                  this._fetchRates.bind(this)
                );
              },
            },
            {
              key: "_fetchRates",
              value: function () {
                var _this = this,
                  country =
                    this.element.querySelector('[name="country"]').value,
                  province =
                    this.element.querySelector('[name="province"]').value,
                  zip = this.element.querySelector('[name="zip"]').value;
                document.dispatchEvent(new CustomEvent("theme:loading:start")),
                  fetch(
                    ""
                      .concat(
                        window.routes.cartUrl,
                        "/shipping_rates.json?shipping_address[zip]="
                      )
                      .concat(zip, "&shipping_address[country]=")
                      .concat(country, "&shipping_address[province]=")
                      .concat(province),
                    { credentials: "same-origin", method: "GET" }
                  ).then(function (response) {
                    response.json().then(function (result) {
                      document.dispatchEvent(
                        new CustomEvent("theme:loading:end")
                      );
                      var resultsContainer = _this.element.querySelector(
                          ".ShippingEstimator__Results"
                        ),
                        errorContainer = _this.element.querySelector(
                          ".ShippingEstimator__Error"
                        );
                      if (response.ok) {
                        var shippingRates = result.shipping_rates;
                        if (shippingRates.length === 0)
                          resultsContainer.innerHTML = "<p>".concat(
                            window.languages.shippingEstimatorNoResults,
                            "</p>"
                          );
                        else {
                          var html = "";
                          shippingRates.length === 1
                            ? (html += "<p>".concat(
                                window.languages.shippingEstimatorOneResult,
                                "</p><ul>"
                              ))
                            : (html += "<p>".concat(
                                window.languages.shippingEstimatorMoreResults.replace(
                                  "{{count}}",
                                  shippingRates.length
                                ),
                                "</p><ul>"
                              )),
                            shippingRates.forEach(function (item) {
                              html += "<li>"
                                .concat(item.name, ": ")
                                .concat(
                                  Currency.formatMoney(
                                    item.price,
                                    window.theme.moneyFormat
                                  ),
                                  "</li>"
                                );
                            }),
                            (html += "</ul>"),
                            (resultsContainer.firstElementChild.innerHTML =
                              html);
                        }
                        TweenLite.fromTo(
                          resultsContainer.firstElementChild,
                          0.6,
                          { autoAlpha: 0, y: -15 },
                          { autoAlpha: 1, y: 0, delay: 0.35 }
                        ),
                          (errorContainer.style.display = "none"),
                          (resultsContainer.style.display = "block"),
                          Animation.slideDown(resultsContainer);
                      } else {
                        var errorHtml = "";
                        Object.keys(result).forEach(function (key) {
                          errorHtml += '<li class="Alert__ErrorItem">'
                            .concat(key, " ")
                            .concat(result[key], "</li>");
                        }),
                          (errorContainer.innerHTML =
                            '<ul class="Alert__ErrorList">'.concat(
                              errorHtml,
                              "</ul>"
                            )),
                          (resultsContainer.style.display = "none"),
                          (errorContainer.style.display = "block");
                      }
                    });
                  });
              },
            },
          ]),
          ShippingEstimator2
        );
      })(),
      AddressesSection = function AddressesSection2() {
        var _this = this;
        _classCallCheck(this, AddressesSection2),
          (this.countrySelectors = []),
          Dom.nodeListToArray(
            document.querySelectorAll(".Modal--address")
          ).forEach(function (modal) {
            _this.countrySelectors.push(
              new CountrySelector(
                modal.querySelector('[name="address[country]"]'),
                modal.querySelector('[name="address[province]"]')
              )
            );
          });
      },
      ArticleList = (function () {
        function ArticleList2(container) {
          var _this = this;
          _classCallCheck(this, ArticleList2),
            (this.element = container),
            window.theme.showElementStaggering &&
              ((this.timeline = new TimelineLite({
                delay: window.theme.showPageTransition ? 0.5 : 0,
              })),
              (this.intersectionObserver = new IntersectionObserver(
                this._reveal.bind(this)
              )),
              Dom.nodeListToArray(
                this.element.querySelectorAll(".ArticleItem")
              ).forEach(function (item) {
                _this.intersectionObserver.observe(item);
              }));
        }
        return (
          _createClass(ArticleList2, [
            {
              key: "onUnload",
              value: function () {
                window.theme.showElementStaggering &&
                  (this.intersectionObserver.disconnect(),
                  this.timeline.kill());
              },
            },
            {
              key: "_reveal",
              value: function (results) {
                var _this2 = this,
                  toReveal = [];
                results.forEach(function (result) {
                  (result.isIntersecting || result.intersectionRatio > 0) &&
                    (toReveal.push(result.target),
                    _this2.intersectionObserver.unobserve(result.target));
                }),
                  toReveal.length !== 0 &&
                    this.timeline.staggerFromTo(
                      toReveal,
                      0.45,
                      { autoAlpha: 0, y: 30 },
                      { autoAlpha: 1, y: 0 },
                      0.2
                    );
              },
            },
          ]),
          ArticleList2
        );
      })(),
      ArticleSection = (function () {
        function ArticleSection2(container) {
          var _this = this;
          _classCallCheck(this, ArticleSection2),
            (this.element = container),
            (this.toolbarElement =
              this.element.querySelector(".ArticleToolbar")),
            (this.articleNavElement =
              this.element.querySelector(".ArticleNav"));
          var articleImageElement =
            this.element.querySelector(".Article__Image");
          articleImageElement &&
            window.matchMedia("(-moz-touch-enabled: 0), (hover: hover)")
              .matches &&
            (this.parallaxInstance = new Rellax(".Article__Image", {
              speed: -7,
              center: !1,
              round: !0,
            })),
            window.theme.showElementStaggering &&
              ((this.timeline = new TimelineLite({
                delay: window.theme.showPageTransition ? 0.5 : 0,
              })),
              (this.intersectionObserver = new IntersectionObserver(
                this._reveal.bind(this)
              )),
              Dom.nodeListToArray(
                this.element.querySelectorAll(".ArticleItem")
              ).forEach(function (item) {
                _this.intersectionObserver.observe(item);
              })),
            this._attachListeners();
        }
        return (
          _createClass(ArticleSection2, [
            {
              key: "onUnload",
              value: function () {
                this.parallaxInstance && this.parallaxInstance.destroy(),
                  window.theme.showElementStaggering &&
                    (this.intersectionObserver.disconnect(),
                    this.timeline.kill()),
                  window.removeEventListener("scroll", this._onScrollListener);
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                (this._onScrollListener =
                  this._checkToolbarVisibility.bind(this)),
                  window.addEventListener("scroll", this._onScrollListener);
              },
            },
            {
              key: "_checkToolbarVisibility",
              value: function () {
                var _this2 = this,
                  lastYPosition = 0,
                  headerHeight = 0,
                  navBottom = 0,
                  isFixedHeader = 0,
                  header = document.querySelector(".Header");
                fastdom.measure(function () {
                  (lastYPosition = window.pageYOffset),
                    (headerHeight = header.offsetHeight),
                    (isFixedHeader = parseInt(
                      window
                        .getComputedStyle(document.body)
                        .getPropertyValue("--use-sticky-header") || 0
                    )),
                    _this2.articleNavElement &&
                      (navBottom =
                        _this2.articleNavElement.offsetTop +
                        _this2.articleNavElement.clientHeight -
                        headerHeight);
                }),
                  fastdom.mutate(function () {
                    (_this2.toolbarElement.style.top = isFixedHeader
                      ? headerHeight + "px"
                      : null),
                      _this2.articleNavElement
                        ? lastYPosition > 150 &&
                          _this2.articleNavElement &&
                          lastYPosition < navBottom
                          ? _this2.toolbarElement.classList.add("is-visible")
                          : _this2.toolbarElement.classList.remove("is-visible")
                        : lastYPosition > 150
                        ? _this2.toolbarElement.classList.add("is-visible")
                        : _this2.toolbarElement.classList.remove("is-visible");
                  });
              },
            },
            {
              key: "_reveal",
              value: function (results) {
                var _this3 = this,
                  toReveal = [];
                results.forEach(function (result) {
                  (result.isIntersecting || result.intersectionRatio > 0) &&
                    (toReveal.push(result.target),
                    _this3.intersectionObserver.unobserve(result.target));
                }),
                  toReveal.length !== 0 &&
                    this.timeline.staggerFromTo(
                      toReveal,
                      0.45,
                      { autoAlpha: 0, y: 30 },
                      { autoAlpha: 1, y: 0 },
                      0.2
                    );
              },
            },
          ]),
          ArticleSection2
        );
      })(),
      CartSection = (function () {
        function CartSection2(container) {
          _classCallCheck(this, CartSection2),
            (this.element = container),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            (this.documentDelegate = new domDelegate.Delegate(
              document.documentElement
            )),
            (this.options = JSON.parse(
              this.element.getAttribute("data-section-settings")
            )),
            (this.itemCount = this.options.itemCount),
            (this.isCartNoteOpen = !1),
            this.options.drawer &&
              (this.sidebarDrawer = new Drawer(this.element, {
                onClose: this._onDrawerClosed.bind(this),
              })),
            this.options.hasShippingEstimator &&
              (this.shippingEstimator = new ShippingEstimator(
                this.element.querySelector(".ShippingEstimator")
              )),
            this._attachListeners();
        }
        return (
          _createClass(CartSection2, [
            {
              key: "onUnload",
              value: function () {
                this.options.hasShippingEstimator &&
                  this.shippingEstimator.destroy(),
                  this.delegateElement.off(),
                  document.removeEventListener(
                    "product:added",
                    this._onProductAddedListener
                  );
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                (this._onProductAddedListener =
                  this._onProductAdded.bind(this)),
                  this.delegateElement.on(
                    "change",
                    "#cart-note",
                    this._updateCartNote.bind(this)
                  ),
                  this.options.type !== "page"
                    ? (this.delegateElement.on(
                        "click",
                        '[data-action="update-item-quantity"], [data-action="remove-item"]',
                        this._updateItemQuantity.bind(this)
                      ),
                      this.delegateElement.on(
                        "change",
                        ".QuantitySelector__CurrentQuantity",
                        this._updateItemQuantity.bind(this)
                      ))
                    : this.delegateElement.on(
                        "change",
                        ".QuantitySelector__CurrentQuantity",
                        this._reloadPageWithQuantity.bind(this)
                      ),
                  this.options.drawer &&
                    this.delegateElement.on(
                      "click",
                      '[data-action="toggle-cart-note"]',
                      this._toggleCartNote.bind(this)
                    ),
                  document.addEventListener(
                    "product:added",
                    this._onProductAddedListener
                  ),
                  this.documentDelegate.on(
                    "cart:refresh",
                    this._rerenderCart.bind(this, !1)
                  );
              },
            },
            {
              key: "_updateCartNote",
              value: function (event, target) {
                fetch("".concat(window.routes.cartUrl, "/update.js"), {
                  body: JSON.stringify({ note: target.value }),
                  credentials: "same-origin",
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                  },
                });
              },
            },
            {
              key: "_toggleCartNote",
              value: function () {
                var _this = this,
                  noteContainer = this.element.querySelector(
                    ".Cart__OffscreenNoteContainer"
                  ),
                  cartNote = this.element.querySelector("#cart-note");
                if (
                  (this.element.classList.toggle("has-note-open"),
                  (this.element.querySelector(".Cart__NoteButton").innerHTML =
                    cartNote.value !== ""
                      ? window.languages.cartEditNote
                      : window.languages.cartAddNote),
                  noteContainer.setAttribute(
                    "aria-hidden",
                    noteContainer.getAttribute("aria-hidden") === "true"
                      ? "false"
                      : "true"
                  ),
                  (this.isCartNoteOpen =
                    noteContainer.getAttribute("aria-hidden") === "false"),
                  this.element.classList.contains("has-note-open"))
                ) {
                  var transitionEndListener =
                    function transitionEndListener2() {
                      _this.element.querySelector("#cart-note").focus(),
                        noteContainer.removeEventListener(
                          "transitionend",
                          transitionEndListener2
                        );
                    };
                  noteContainer.addEventListener(
                    "transitionend",
                    transitionEndListener
                  );
                }
              },
            },
            {
              key: "_updateItemQuantity",
              value: function (event, target) {
                var _this2 = this;
                document.dispatchEvent(new CustomEvent("theme:loading:start"));
                var quantity = null,
                  elementToAnimate = null;
                target.tagName === "INPUT"
                  ? (quantity = parseInt(
                      Math.max(parseInt(target.value) || 1, 1)
                    ))
                  : (quantity = parseInt(target.getAttribute("data-quantity"))),
                  quantity === 0 &&
                    (elementToAnimate = target.closest(".CartItemWrapper")),
                  fetch("".concat(window.routes.cartChangeUrl, ".js"), {
                    body: JSON.stringify({
                      line: target.getAttribute("data-line"),
                      quantity: quantity,
                    }),
                    credentials: "same-origin",
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "X-Requested-With": "XMLHttpRequest",
                    },
                  }).then(function (cart) {
                    cart.json().then(function (content) {
                      (_this2.itemCount = content.item_count),
                        _this2._rerenderCart(elementToAnimate),
                        document.dispatchEvent(
                          new CustomEvent("theme:loading:end")
                        );
                    });
                  }),
                  event.preventDefault();
              },
            },
            {
              key: "_reloadPageWithQuantity",
              value: function (event, target) {
                window.location.href = ""
                  .concat(window.routes.cartChangeUrl, "?quantity=")
                  .concat(parseInt(target.value), "&line=")
                  .concat(target.getAttribute("data-line"));
              },
            },
            {
              key: "_onProductAdded",
              value: function (event) {
                var _this3 = this;
                (this.itemCount += event.detail.quantity),
                  this._rerenderCart().then(function () {
                    _this3.sidebarDrawer.open();
                  });
              },
            },
            {
              key: "_onDrawerClosed",
              value: function () {
                this.isCartNoteOpen && this._toggleCartNote();
              },
            },
            {
              key: "_rerenderCart",
              value: function (elementToAnimate) {
                var _this4 = this;
                return fetch(
                  ""
                    .concat(window.routes.cartUrl, "?section_id=")
                    .concat(
                      this.options.drawer && window.theme.pageType !== "cart"
                        ? "mini-cart"
                        : "main-cart",
                      "&timestamp="
                    )
                    .concat(Date.now()),
                  { credentials: "same-origin", method: "GET" }
                ).then(function (content) {
                  if (_this4.options.drawer && elementToAnimate) {
                    var timelineLite = new TimelineLite({
                      onComplete: function () {
                        content.text().then(function (html) {
                          _this4._replaceContent(html);
                        });
                      },
                    });
                    timelineLite.to(
                      elementToAnimate,
                      0.5,
                      { height: 0, opacity: 0, ease: Cubic.easeOut },
                      0
                    ),
                      _this4.itemCount === 0 &&
                        timelineLite.to(
                          _this4.element.querySelector(".Drawer__Footer"),
                          0.5,
                          {
                            y: "100%",
                            transition: "none",
                            ease: Cubic.easeInOut,
                          },
                          0
                        );
                  } else
                    content.text().then(function (html) {
                      _this4._replaceContent(html);
                    });
                });
              },
            },
            {
              key: "_replaceContent",
              value: function (html) {
                var _this5 = this,
                  tempElement = document.createElement("div");
                tempElement.innerHTML = html;
                var cartNodeParent =
                  this.element.querySelector(".Cart").parentNode;
                if (this.options.drawer && window.theme.pageType !== "cart") {
                  var currentScrollPosition =
                    this.element.querySelector(".Drawer__Main").scrollTop;
                  cartNodeParent.replaceChild(
                    tempElement.querySelector(".Cart"),
                    this.element.querySelector(".Cart")
                  ),
                    (this.element.querySelector(".Drawer__Main").scrollTop =
                      currentScrollPosition);
                } else
                  this.itemCount === 0
                    ? (this.element.innerHTML =
                        tempElement.querySelector(
                          ".shopify-section"
                        ).firstElementChild.innerHTML)
                    : (cartNodeParent.replaceChild(
                        tempElement.querySelector(".Cart"),
                        this.element.querySelector(".Cart")
                      ),
                      (this.element.querySelector(".PageHeader").innerHTML =
                        tempElement.querySelector(".PageHeader").innerHTML));
                var cartResult = JSON.parse(
                    tempElement
                      .querySelector('[data-section-type="cart"]')
                      .getAttribute("data-section-settings")
                  ),
                  cartDot = Dom.nodeListToArray(
                    document.querySelectorAll(".Header__CartDot")
                  ),
                  cartQuantity = Dom.nodeListToArray(
                    document.querySelectorAll(".Header__CartCount")
                  );
                (this.itemCount = cartResult.itemCount),
                  cartDot.forEach(function (item) {
                    _this5.itemCount === 0
                      ? item.classList.remove("is-visible")
                      : item.classList.add("is-visible");
                  }),
                  cartQuantity.forEach(function (item) {
                    item.textContent = _this5.itemCount;
                  });
              },
            },
          ]),
          CartSection2
        );
      })(),
      CollectionListSection = (function () {
        function CollectionListSection2(container) {
          _classCallCheck(this, CollectionListSection2),
            (this.element = container);
          var collectionListElement = this.element.querySelector(
            "[data-flickity-config]"
          );
          collectionListElement &&
            (this.carousel = new Carousel(collectionListElement));
        }
        return (
          _createClass(CollectionListSection2, [
            {
              key: "onUnload",
              value: function () {
                this.carousel && this.carousel.destroy();
              },
            },
            {
              key: "onBlockSelect",
              value: function (event) {
                this.carousel &&
                  this.carousel.selectCell(
                    event.target.getAttribute("data-slide-index"),
                    !0,
                    !event.detail.load
                  );
              },
            },
            {
              key: "onBlockDeselect",
              value: function () {
                this.carousel && this.carousel.unpausePlayer();
              },
            },
          ]),
          CollectionListSection2
        );
      })(),
      OverflowScroller = (function () {
        function OverflowScroller2(element) {
          _classCallCheck(this, OverflowScroller2),
            element &&
              ((this.element = element),
              (this.lastKnownY = window.scrollY),
              (this.currentTop = 0),
              (this.initialTopOffset = parseInt(
                window.getComputedStyle(this.element).top
              )),
              this._attachListeners());
        }
        return (
          _createClass(OverflowScroller2, [
            {
              key: "destroy",
              value: function () {
                window.removeEventListener(
                  "scroll",
                  this._checkPositionListener
                );
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                (this._checkPositionListener = this._checkPosition.bind(this)),
                  window.addEventListener(
                    "scroll",
                    this._checkPositionListener
                  );
              },
            },
            {
              key: "_checkPosition",
              value: function () {
                var _this = this;
                fastdom.measure(function () {
                  var bounds = _this.element.getBoundingClientRect(),
                    maxTop =
                      bounds.top +
                      window.scrollY -
                      _this.element.offsetTop +
                      _this.initialTopOffset,
                    minTop = _this.element.clientHeight - window.innerHeight;
                  window.scrollY < _this.lastKnownY
                    ? (_this.currentTop -= window.scrollY - _this.lastKnownY)
                    : (_this.currentTop += _this.lastKnownY - window.scrollY),
                    (_this.currentTop = Math.min(
                      Math.max(_this.currentTop, -minTop),
                      maxTop,
                      _this.initialTopOffset
                    )),
                    (_this.lastKnownY = window.scrollY);
                }),
                  fastdom.mutate(function () {
                    _this.element.style.top = "".concat(_this.currentTop, "px");
                  });
              },
            },
          ]),
          OverflowScroller2
        );
      })(),
      CollectionSection = (function () {
        function CollectionSection2(element) {
          _classCallCheck(this, CollectionSection2),
            (this.element = element),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            (this.toolbarElement =
              this.element.querySelector(".CollectionToolbar")),
            (this.collectionInnerElement = this.element.querySelector(
              ".CollectionInner__Products"
            )),
            (this.settings = JSON.parse(
              this.element.getAttribute("data-section-settings")
            ));
          var sortPopoverElement = document.getElementById(
            "collection-sort-popover"
          );
          sortPopoverElement &&
            (this.sortPopover = new Popover(sortPopoverElement, {
              onValueChanged: this._sortByChanged.bind(this),
            }));
          var filterDrawerElement = document.getElementById(
            "collection-filter-drawer"
          );
          filterDrawerElement &&
            (this.filterDrawer = new Drawer(filterDrawerElement)),
            this.settings.filterPosition === "sidebar" &&
              (this.filterInnerSidebarScroller = new OverflowScroller(
                this.element.querySelector(".CollectionInner__Sidebar")
              ));
          var collectionImageElement = this.element.querySelector(
            ".PageHeader__ImageWrapper"
          );
          collectionImageElement &&
            window.matchMedia("(-moz-touch-enabled: 0), (hover: hover)")
              .matches &&
            (this.parallaxInstance = new Rellax(".PageHeader__ImageWrapper", {
              speed: -7,
              center: !1,
              round: !0,
            })),
            new ProductItemColorSwatch(
              this.element.querySelector(".ProductList")
            ),
            (this.timeline = new TimelineLite({
              delay: window.theme.showPageTransition ? 0.5 : 0,
            })),
            this._setupAnimation(),
            this._attachListeners();
        }
        return (
          _createClass(CollectionSection2, [
            {
              key: "onUnload",
              value: function () {
                this.delegateElement.off("click"),
                  this.sortPopover && this.sortPopover.destroy(),
                  this.filterDrawer && this.filterDrawer.destroy(),
                  this.filterInnerSidebarScroller &&
                    this.filterInnerSidebarScroller.destroy(),
                  this.parallaxInstance && this.parallaxInstance.destroy(),
                  window.theme.showElementStaggering &&
                    (this.intersectionObserver.disconnect(),
                    this.timeline.kill());
              },
            },
            {
              key: "_setupAnimation",
              value: function () {
                var _this = this,
                  forceLoadFromTop =
                    arguments.length > 0 && arguments[0] !== void 0
                      ? arguments[0]
                      : !1;
                window.theme.showElementStaggering &&
                  (this.intersectionObserver &&
                    this.intersectionObserver.disconnect(),
                  forceLoadFromTop
                    ? (this.timeline.clear(),
                      this.timeline.staggerFromTo(
                        this.element.querySelectorAll(
                          ".ProductList .ProductItem"
                        ),
                        0.25,
                        { autoAlpha: 0, y: 25 },
                        { autoAlpha: 1, y: 0 },
                        0.1
                      ))
                    : ((this.intersectionObserver = new IntersectionObserver(
                        this._reveal.bind(this),
                        { threshold: 0.3 }
                      )),
                      Dom.nodeListToArray(
                        this.element.querySelectorAll(
                          ".ProductList .ProductItem"
                        )
                      ).forEach(function (item) {
                        _this.intersectionObserver.observe(item);
                      })));
              },
            },
            {
              key: "_reveal",
              value: function (results) {
                var _this2 = this,
                  toReveal = [];
                results.forEach(function (result) {
                  (result.isIntersecting || result.intersectionRatio > 0) &&
                    (toReveal.push(result.target),
                    _this2.intersectionObserver.unobserve(result.target));
                }),
                  toReveal.length !== 0 &&
                    this.timeline.staggerFromTo(
                      toReveal,
                      0.35,
                      { autoAlpha: 0, y: 25 },
                      { autoAlpha: 1, y: 0 },
                      0.15
                    );
              },
            },
            {
              key: "_changeLayoutMode",
              value: function (event, target) {
                var _this3 = this,
                  layoutType = target.getAttribute("data-grid-type"),
                  newCount = parseInt(target.getAttribute("data-count")),
                  productList =
                    this.collectionInnerElement.querySelector(".ProductList");
                if (productList) {
                  var previousCount = parseInt(
                    productList.getAttribute(
                      "data-".concat(layoutType, "-count")
                    )
                  );
                  if (previousCount === newCount) return;
                  productList.setAttribute(
                    "data-".concat(layoutType, "-count"),
                    newCount
                  ),
                    Dom.nodeListToArray(
                      productList.querySelectorAll(".Grid__Cell")
                    ).forEach(function (item) {
                      if (layoutType === "mobile")
                        item.classList.remove(
                          "1/".concat(previousCount, "--phone")
                        ),
                          item.classList.add("1/".concat(newCount, "--phone"));
                      else {
                        var previousTabletCount = previousCount === 2 ? 2 : 3,
                          newTabletCount = newCount === 2 ? 2 : 3;
                        _this3.settings.filterPosition === "drawer"
                          ? (item.classList.remove(
                              "1/".concat(previousCount, "--lap-and-up")
                            ),
                            item.classList.add(
                              "1/".concat(newCount, "--lap-and-up")
                            ))
                          : (item.classList.remove(
                              "1/".concat(previousCount, "--desk")
                            ),
                            item.classList.add(
                              "1/".concat(newCount, "--desk")
                            )),
                          item.classList.remove(
                            "1/".concat(previousTabletCount, "--tablet-and-up")
                          ),
                          item.classList.add(
                            "1/".concat(newTabletCount, "--tablet-and-up")
                          );
                      }
                      window.theme.showElementStaggering &&
                        (item.firstElementChild.style.visibility = "hidden");
                    }),
                    lazySizes.autoSizer.checkElems();
                }
                target.classList.add("is-active"),
                  Dom.getSiblings(target)[0].classList.remove("is-active"),
                  this._setupAnimation(),
                  fetch("".concat(window.routes.cartUrl, "/update.js"), {
                    body: JSON.stringify({
                      attributes: _defineProperty(
                        {},
                        "collection_".concat(layoutType, "_items_per_row"),
                        newCount
                      ),
                    }),
                    credentials: "same-origin",
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "X-Requested-With": "XMLHttpRequest",
                    },
                  });
              },
            },
            {
              key: "_sortByChanged",
              value: function (sortBy) {
                var currentUrl = new URL(location.href);
                currentUrl.searchParams.set("sort_by", sortBy),
                  currentUrl.searchParams.delete("page"),
                  this._reloadProducts(currentUrl.toString());
              },
            },
            {
              key: "_onFiltersCleared",
              value: function (event) {
                this._reloadProducts(event.target.getAttribute("data-url"));
              },
            },
            {
              key: "_onFilterChanged",
              value: function (event) {
                var formData = new FormData(event.target.closest("form")),
                  searchParamsAsString = new URLSearchParams(
                    formData
                  ).toString();
                this._reloadProducts(
                  ""
                    .concat(window.location.pathname, "?")
                    .concat(searchParamsAsString)
                );
              },
            },
            {
              key: "_reloadProducts",
              value: function (url) {
                var _this4 = this;
                this.abortController && this.abortController.abort(),
                  document.dispatchEvent(
                    new CustomEvent("theme:loading:start")
                  ),
                  history.replaceState &&
                    window.history.pushState({ path: url }, "", url);
                var currentUrl = new URL(window.location);
                currentUrl.searchParams.set(
                  "section_id",
                  this.settings.sectionId
                );
                try {
                  (this.abortController = new AbortController()),
                    fetch(currentUrl.toString(), {
                      signal: this.abortController.signal,
                    }).then(function (response) {
                      response.text().then(function (content) {
                        var tempElement = document.createElement("div");
                        (tempElement.innerHTML = content),
                          (_this4.collectionInnerElement.innerHTML =
                            tempElement.querySelector(
                              ".CollectionInner__Products"
                            ).innerHTML);
                        var toolbarFilter = tempElement.querySelector(
                          ".CollectionToolbar__Item--filter"
                        );
                        if (toolbarFilter) {
                          var newToolbarFilter = _this4.element.querySelector(
                            ".CollectionToolbar__Item--filter"
                          );
                          (newToolbarFilter.innerHTML =
                            toolbarFilter.innerHTML),
                            (newToolbarFilter.className =
                              toolbarFilter.className);
                        }
                        var collectionFiltersDrawer =
                            _this4.element.querySelector(
                              "#collection-filters-drawer-form"
                            ),
                          collectionFiltersSidebar =
                            _this4.element.querySelector(
                              "#collection-filters-sidebar-form"
                            );
                        if (collectionFiltersDrawer) {
                          var newDrawerContent = tempElement.querySelector(
                            "#collection-filters-drawer-form"
                          );
                          Array.from(
                            collectionFiltersDrawer.querySelectorAll(
                              ".Collapsible"
                            )
                          ).forEach(function (collapsible) {
                            var newCollapsible = newDrawerContent.querySelector(
                              '[data-filter-index="'.concat(
                                collapsible.getAttribute("data-filter-index"),
                                '"]'
                              )
                            );
                            collapsible.firstElementChild.getAttribute(
                              "aria-expanded"
                            ) === "true" &&
                              ((newCollapsible.style.overflow = "visible"),
                              newCollapsible.firstElementChild.setAttribute(
                                "aria-expanded",
                                "true"
                              ),
                              (newCollapsible.lastElementChild.style.height =
                                "auto"),
                              (newCollapsible.lastElementChild.style.overflow =
                                "visible"));
                          }),
                            (collectionFiltersDrawer.innerHTML =
                              newDrawerContent.innerHTML),
                            new ProductItemColorSwatch(
                              _this4.element.querySelector(".ProductList")
                            );
                        }
                        if (collectionFiltersSidebar) {
                          var newSidebarContent = tempElement.querySelector(
                            "#collection-filters-sidebar-form"
                          );
                          Array.from(
                            collectionFiltersSidebar.querySelectorAll(
                              ".Collapsible"
                            )
                          ).forEach(function (collapsible) {
                            var newCollapsible =
                              newSidebarContent.querySelector(
                                '[data-filter-index="'.concat(
                                  collapsible.getAttribute("data-filter-index"),
                                  '"]'
                                )
                              );
                            collapsible.firstElementChild.getAttribute(
                              "aria-expanded"
                            ) === "true" &&
                              ((newCollapsible.style.overflow = "visible"),
                              newCollapsible.firstElementChild.setAttribute(
                                "aria-expanded",
                                "true"
                              ),
                              (newCollapsible.lastElementChild.style.height =
                                "auto"),
                              (newCollapsible.lastElementChild.style.overflow =
                                "visible"));
                          }),
                            (collectionFiltersSidebar.innerHTML =
                              newSidebarContent.innerHTML);
                        }
                        document.dispatchEvent(
                          new CustomEvent("theme:loading:end")
                        ),
                          _this4._setupAnimation(!0);
                        var elementOffset =
                          _this4.element
                            .querySelector(".CollectionMain")
                            .getBoundingClientRect().top -
                          parseInt(
                            document.documentElement.style.getPropertyValue(
                              "--header-height"
                            )
                          );
                        Responsive.matchesBreakpoint("lap-and-up") &&
                          _this4.toolbarElement &&
                          _this4.toolbarElement.clientHeight === 0 &&
                          (elementOffset -= 50),
                          elementOffset < 0 &&
                            window.scrollBy({
                              top: elementOffset,
                              behavior: "smooth",
                            });
                      });
                    });
                } catch (exception) {}
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                (this._changeLayoutModeListener =
                  this._changeLayoutMode.bind(this)),
                  this.delegateElement.on(
                    "click",
                    '[data-action="change-layout-mode"]',
                    this._changeLayoutModeListener
                  ),
                  this.delegateElement.on(
                    "click",
                    '[data-action="clear-filters"]',
                    this._onFiltersCleared.bind(this)
                  ),
                  this.delegateElement.on(
                    "change",
                    '[name^="filter."]',
                    this._onFilterChanged.bind(this)
                  ),
                  window.addEventListener("popstate", function (event) {
                    event.state.path &&
                      (window.location.href = event.state.path);
                  });
              },
            },
          ]),
          CollectionSection2
        );
      })(),
      FaqSection = (function () {
        function FaqSection2(element) {
          _classCallCheck(this, FaqSection2),
            (this.element = element),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            this._attachListeners();
        }
        return (
          _createClass(FaqSection2, [
            {
              key: "onUnload",
              value: function () {
                this.delegateElement.off();
              },
            },
            {
              key: "onBlockSelect",
              value: function (event) {
                this._openItem(event.target);
              },
            },
            {
              key: "onBlockDeselect",
              value: function (event) {
                this._closeItem(event.target);
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                this.delegateElement.on(
                  "click",
                  ".Faq__Question",
                  this._toggleItem.bind(this)
                ),
                  this.delegateElement.on(
                    "click",
                    ".FaqSummary__Item",
                    this._switchToCategory.bind(this)
                  );
              },
            },
            {
              key: "_switchToCategory",
              value: function (event, target) {
                target.classList.add("is-active"),
                  Dom.getSiblings(target, ".is-active").forEach(function (
                    item
                  ) {
                    item.classList.remove("is-active");
                  });
              },
            },
            {
              key: "_toggleItem",
              value: function (event, target) {
                var item = target.closest(".Faq__Item");
                item.getAttribute("aria-expanded") === "true"
                  ? this._closeItem(item)
                  : this._openItem(item);
              },
            },
            {
              key: "_openItem",
              value: function (item) {
                var answerWrapper = item.querySelector(".Faq__AnswerWrapper");
                item.setAttribute("aria-expanded", "true"),
                  answerWrapper.setAttribute("aria-hidden", "false"),
                  Animation.slideDown(answerWrapper, !0),
                  Dom.getSiblings(item, '[aria-expanded="true"]').forEach(
                    function (siblingItem) {
                      var siblingAnswerWrapper = siblingItem.querySelector(
                        ".Faq__AnswerWrapper"
                      );
                      siblingItem.setAttribute("aria-expanded", "false"),
                        siblingAnswerWrapper.setAttribute(
                          "aria-hidden",
                          "true"
                        ),
                        Animation.slideUp(siblingAnswerWrapper);
                    }
                  );
              },
            },
            {
              key: "_closeItem",
              value: function (item) {
                var answerWrapper = item.querySelector(".Faq__AnswerWrapper");
                item.setAttribute("aria-expanded", "false"),
                  answerWrapper.setAttribute("aria-hidden", "true"),
                  Animation.slideUp(answerWrapper);
              },
            },
          ]),
          FaqSection2
        );
      })(),
      FeaturedCollectionsSection = (function () {
        function FeaturedCollectionsSection2(container) {
          var _this = this;
          _classCallCheck(this, FeaturedCollectionsSection2),
            (this.element = container),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            (this.options = JSON.parse(
              this.element.getAttribute("data-settings")
            )),
            (this.carousels = []),
            Dom.nodeListToArray(
              this.element.querySelectorAll("[data-flickity-config]")
            ).forEach(function (item) {
              _this.carousels.push(new Carousel(item));
            }),
            new ProductItemColorSwatch(this.element),
            this._setupAnimation(),
            this._attachListeners();
        }
        return (
          _createClass(FeaturedCollectionsSection2, [
            {
              key: "onUnload",
              value: function () {
                this.carousels.forEach(function (item) {
                  return item.destroy();
                }),
                  this.delegateElement.off("click"),
                  this.intersectionObserver.disconnect(),
                  this.timeline.kill();
              },
            },
            {
              key: "onBlockSelect",
              value: function (event) {
                this.element
                  .querySelector(
                    '[aria-controls="'.concat(event.target.id, '"]')
                  )
                  .click();
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                this.delegateElement.on(
                  "click",
                  '[data-action="toggle-tab"]',
                  this._switchTab.bind(this)
                );
              },
            },
            {
              key: "_switchTab",
              value: function (event, target) {
                var _this2 = this;
                if (!target.classList.contains("is-active")) {
                  target.classList.add("is-active"),
                    Dom.getSiblings(target, ".is-active").forEach(function (
                      item
                    ) {
                      item.classList.remove("is-active");
                    });
                  var tabPanelToShow = this.element.querySelector(
                    "#".concat(target.getAttribute("aria-controls"))
                  );
                  this.timeline.eventCallback("onReverseComplete", function () {
                    tabPanelToShow.setAttribute("aria-hidden", "false"),
                      Dom.getSiblings(
                        tabPanelToShow,
                        '.TabPanel[aria-hidden="false"]'
                      ).forEach(function (item) {
                        item.setAttribute("aria-hidden", "true");
                      }),
                      Responsive.matchesBreakpoint("lap-and-up") &&
                        _this2.carousels.forEach(function (carousel) {
                          carousel.flickityInstance.activate(),
                            carousel.flickityInstance.resize();
                        }),
                      _this2.timeline.clear(),
                      _this2._setupAnimation();
                  }),
                    this.options.layout === "grid" &&
                    window.theme.showElementStaggering
                      ? this.timeline.reverse().timeScale(3)
                      : this.timeline.reverse();
                }
              },
            },
            {
              key: "_setupAnimation",
              value: function () {
                var _this3 = this;
                if (
                  (this.intersectionObserver &&
                    this.intersectionObserver.disconnect(),
                  (this.timeline = new TimelineLite({ delay: 0.5 })),
                  this.options.layout === "grid" &&
                    window.theme.showElementStaggering)
                )
                  (this.intersectionObserver = new IntersectionObserver(
                    this._reveal.bind(this)
                  )),
                    Dom.nodeListToArray(
                      this.element.querySelectorAll(
                        '.TabPanel[aria-hidden="false"] .ProductList .ProductItem'
                      )
                    ).forEach(function (item) {
                      _this3.intersectionObserver.observe(item);
                    });
                else {
                  var productList = this.element.querySelector(
                    '.TabPanel[aria-hidden="false"] .ProductList'
                  );
                  productList &&
                    this.timeline.fromTo(
                      productList,
                      0.6,
                      { autoAlpha: 0, y: 25 },
                      { autoAlpha: 1, y: 0 }
                    );
                }
              },
            },
            {
              key: "_reveal",
              value: function (results) {
                var _this4 = this,
                  toReveal = [];
                results.forEach(function (result) {
                  (result.isIntersecting || result.intersectionRatio > 0) &&
                    (toReveal.push(result.target),
                    _this4.intersectionObserver.unobserve(result.target));
                }),
                  toReveal.length !== 0 &&
                    this.timeline.staggerFromTo(
                      toReveal,
                      0.45,
                      { autoAlpha: 0, y: 25 },
                      { autoAlpha: 1, y: 0 },
                      0.2
                    );
              },
            },
          ]),
          FeaturedCollectionsSection2
        );
      })(),
      FeaturedProductSection = (function () {
        function FeaturedProductSection2(container) {
          _classCallCheck(this, FeaturedProductSection2),
            (this.element = container),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            (this.options = JSON.parse(
              this.element.getAttribute("data-section-settings")
            )),
            this.options.usePlaceholder ||
              (this.productVariants = new ProductVariants(
                container,
                this.options
              ));
          var offscreenElement = this.element.querySelector(
            ".Product__OffScreen"
          );
          offscreenElement && this.element.appendChild(offscreenElement),
            this._attachListeners();
        }
        return (
          _createClass(FeaturedProductSection2, [
            {
              key: "onUnload",
              value: function () {
                this.delegateElement.off("click"),
                  this.productVariants && this.productVariants.destroy();
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                this.delegateElement.on(
                  "variant:changed",
                  this._updateMainImage.bind(this)
                );
              },
            },
            {
              key: "_updateMainImage",
              value: function (event) {
                var variant = event.detail.variant,
                  previousVariant = event.detail.previousVariant;
                if (
                  !(
                    !variant ||
                    !variant.featured_image ||
                    (previousVariant.featured_image &&
                      previousVariant.featured_image.id ===
                        variant.featured_image.id)
                  )
                ) {
                  var newImage = variant.featured_image,
                    mainImageContainer = this.element.querySelector(
                      ".FeaturedProduct__Gallery .AspectRatio"
                    );
                  mainImageContainer.style.cssText = "max-width: "
                    .concat(newImage.width, "px; --aspect-ratio: ")
                    .concat(newImage.width / newImage.height);
                  var newImageElement = document.createElement("img");
                  newImageElement.classList.add("Image--lazyLoad"),
                    newImageElement.setAttribute(
                      "data-src",
                      Image.getSizedImageUrl(newImage.src, "1x1").replace(
                        "_1x1.",
                        "_{width}x."
                      )
                    ),
                    newImageElement.setAttribute(
                      "data-widths",
                      "[".concat(
                        Image.getSupportedSizes(
                          newImage,
                          [200, 400, 600, 700, 800, 900, 1e3]
                        ).join(","),
                        "]"
                      )
                    ),
                    newImageElement.setAttribute("data-sizes", "auto"),
                    mainImageContainer.replaceChild(
                      newImageElement,
                      mainImageContainer.querySelector("img")
                    );
                }
              },
            },
          ]),
          FeaturedProductSection2
        );
      })(),
      BackgroundVideoSection = (function () {
        function BackgroundVideoSection2(container) {
          _classCallCheck(this, BackgroundVideoSection2),
            (this.element = container),
            (this.options = JSON.parse(
              this.element.getAttribute("data-section-settings")
            )),
            this._loadScript().then(this._setupPlayer.bind(this));
        }
        return (
          _createClass(BackgroundVideoSection2, [
            {
              key: "_loadScript",
              value: function () {
                var _this = this;
                return new Promise(function (resolve, reject) {
                  var script = document.createElement("script");
                  document.body.appendChild(script),
                    (script.onload = resolve),
                    (script.onerror = reject),
                    (script.async = !0),
                    (script.src =
                      _this.options.videoType === "youtube"
                        ? "//web.archive.org/web/20230519212450/https://www.youtube.com/iframe_api"
                        : "//web.archive.org/web/20230519212450/https://player.vimeo.com/api/player.js");
                });
              },
            },
            {
              key: "onUnload",
              value: function () {
                this.player && this.player.destroy();
              },
            },
            {
              key: "_setupPlayer",
              value: function () {
                var _this2 = this,
                  elementToInsert = this.element.querySelector(
                    ".ImageHero__VideoHolder"
                  ),
                  playerLoadingInterval = setInterval(function () {
                    _this2.options.videoType === "youtube"
                      ? window.YT &&
                        ((_this2.player = new YT.Player(elementToInsert, {
                          videoId: _this2.options.videoId,
                          playerVars: {
                            showinfo: 0,
                            controls: 0,
                            fs: 0,
                            rel: 0,
                            height: "100%",
                            width: "100%",
                            iv_load_policy: 3,
                            html5: 1,
                            loop: 1,
                            playsinline: 1,
                            modestbranding: 1,
                            disablekb: 1,
                            origin: _this2.options.requestHost,
                          },
                          events: {
                            onReady: _this2._onYouTubeReady.bind(_this2),
                            onStateChange:
                              _this2._onYouTubeStateChange.bind(_this2),
                          },
                        })),
                        clearInterval(playerLoadingInterval))
                      : window.Vimeo &&
                        ((_this2.player = new Vimeo.Player(
                          elementToInsert.parentNode,
                          {
                            id: _this2.options.videoId,
                            autoplay: !0,
                            autopause: !1,
                            muted: !0,
                            background: !0,
                            loop: !0,
                          }
                        )),
                        clearInterval(playerLoadingInterval));
                  }, 50);
              },
            },
            {
              key: "_onYouTubeReady",
              value: function (event) {
                this.player.mute(), this.player.playVideo();
              },
            },
            {
              key: "_onYouTubeStateChange",
              value: function (event) {
                event.data === YT.PlayerState.ENDED && this.player.playVideo();
              },
            },
          ]),
          BackgroundVideoSection2
        );
      })(),
      GiftCardSection = (function () {
        function GiftCardSection2(container) {
          _classCallCheck(this, GiftCardSection2),
            (this.element = container),
            this._createQrCode(),
            this._setupPrint();
        }
        return (
          _createClass(GiftCardSection2, [
            {
              key: "_createQrCode",
              value: function () {
                var qrCodeElement = document.getElementById("QrCode");
                new QRCode(qrCodeElement, {
                  text: qrCodeElement.getAttribute("data-identifier"),
                  width: 120,
                  height: 120,
                });
              },
            },
            {
              key: "_setupPrint",
              value: function () {
                var printElement = document.getElementById("PrintGiftCard");
                printElement &&
                  printElement.addEventListener("click", function () {
                    window.print();
                  });
              },
            },
          ]),
          GiftCardSection2
        );
      })(),
      HeaderSection = (function () {
        function HeaderSection2(container) {
          var _this = this;
          _classCallCheck(this, HeaderSection2),
            (this.element = container),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            (this.options = JSON.parse(
              this.element.getAttribute("data-section-settings")
            )),
            (this.lastScrollPosition = -1),
            (this.isTouch = window.matchMedia(
              "(-moz-touch-enabled: 1), (hover: none)"
            ).matches),
            this.options.isSticky && Stickyfill.addOne(this.element.parentNode),
            (this.searchBar = new SearchBar()),
            this._attachListeners(),
            this._verifyNavigationOverlap();
          var mainLogo = this.element.querySelector(
            ".Header__LogoImage--primary"
          );
          mainLogo && !mainLogo.complete
            ? mainLogo.addEventListener("load", function () {
                fastdom.measure(function () {
                  document.documentElement.style.setProperty(
                    "--header-height",
                    _this.element.clientHeight + "px"
                  ),
                    document.documentElement.style.setProperty(
                      "--header-is-not-transparent",
                      _this.options.hasTransparentHeader ? 0 : 1
                    );
                });
              })
            : fastdom.measure(function () {
                document.documentElement.style.setProperty(
                  "--header-height",
                  _this.element.clientHeight + "px"
                ),
                  document.documentElement.style.setProperty(
                    "--header-is-not-transparent",
                    _this.options.hasTransparentHeader ? 0 : 1
                  );
              }),
            window.addEventListener(
              "pageshow",
              this._checkTransparentHeader.bind(this)
            ),
            this._setupLocalizationPopovers();
        }
        return (
          _createClass(HeaderSection2, [
            {
              key: "onUnload",
              value: function () {
                this.element.removeEventListener(
                  "mouseleave",
                  this._closeNavigationListener
                ),
                  this.element.removeEventListener(
                    "mouseenter",
                    this._focusNavigationListener
                  ),
                  this.element.removeEventListener(
                    "focusin",
                    this._focusNavigationListener
                  ),
                  this.delegateElement.off(),
                  window.removeEventListener(
                    "scroll",
                    this._checkTransparentHeaderListener
                  ),
                  window.removeEventListener(
                    "resize",
                    this._verifyNavigationOverlapListener
                  ),
                  this.options.isSticky &&
                    Stickyfill.removeOne(this.element.parentNode),
                  this.searchBar.destroy(),
                  this.localizationPopovers.forEach(function (
                    localizationPopover
                  ) {
                    localizationPopover.destroy();
                  });
              },
            },
            {
              key: "onSelect",
              value: function () {
                this._checkTransparentHeader();
              },
            },
            {
              key: "onBlockSelect",
              value: function (event) {
                var _this2 = this,
                  listItem = event.target.closest(".HorizontalList__Item");
                fastdom.mutate(function () {
                  event.target.setAttribute("aria-hidden", "false"),
                    listItem &&
                      (listItem.classList.add("is-expanded"),
                      Dom.getSiblings(listItem, ".is-expanded").forEach(
                        function (item) {
                          item.classList.remove("is-expanded");
                        }
                      )),
                    _this2.element.classList.remove("Header--transparent");
                });
              },
            },
            {
              key: "onBlockDeselect",
              value: function (event) {
                var listItem = event.target.closest(".HorizontalList__Item");
                fastdom.mutate(function () {
                  event.target.setAttribute("aria-hidden", "true"),
                    listItem && listItem.classList.remove("is-expanded");
                }),
                  this._checkTransparentHeader();
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                (this._checkTransparentHeaderListener =
                  this._checkTransparentHeader.bind(this)),
                  (this._closeNavigationListener =
                    this._closeNavigation.bind(this)),
                  (this._focusNavigationListener =
                    this._focusNavigation.bind(this)),
                  (this._verifyNavigationOverlapListener =
                    this._verifyNavigationOverlap.bind(this)),
                  this.element.addEventListener(
                    "mouseleave",
                    this._closeNavigationListener
                  ),
                  this.delegateElement.on(
                    "mouseenter",
                    ".Header__MainNav .HorizontalList__Item, [aria-haspopup]",
                    this._openMenu.bind(this),
                    !0
                  ),
                  this.delegateElement.on(
                    "focusin",
                    "[aria-haspopup]",
                    this._openMenu.bind(this),
                    !0
                  ),
                  this.delegateElement.on(
                    "focusout",
                    "[aria-haspopup]",
                    this._closeMenu.bind(this),
                    !1
                  ),
                  this.delegateElement.on(
                    "click",
                    '[data-action="toggle-search"]',
                    this._closeNavigationListener
                  ),
                  this.delegateElement.on(
                    "mouseleave",
                    ".DropdownMenu [aria-haspopup]",
                    this._closeMenu.bind(this),
                    !0
                  ),
                  this.delegateElement.on(
                    "mouseenter",
                    ".DropdownMenu [aria-haspopup]",
                    this._adjustDropdownPosition.bind(this),
                    !0
                  ),
                  this.isTouch &&
                    this.delegateElement.on(
                      "click",
                      ".Header__MainNav [aria-haspopup]",
                      this._handleTouchMenu.bind(this)
                    ),
                  this.options.hasTransparentHeader &&
                    (this.element.addEventListener(
                      "mouseenter",
                      this._focusNavigationListener
                    ),
                    this.element.addEventListener(
                      "focusin",
                      this._focusNavigationListener
                    )),
                  this.options.isSticky &&
                    this.options.hasTransparentHeader &&
                    window.addEventListener(
                      "scroll",
                      this._checkTransparentHeaderListener
                    ),
                  (this.options.navigationStyle === "inline" ||
                    this.options.navigationStyle === "logoLeft") &&
                    window.addEventListener(
                      "resize",
                      this._verifyNavigationOverlapListener
                    );
              },
            },
            {
              key: "_setupLocalizationPopovers",
              value: function () {
                (this.localizationPopovers = []),
                  Dom.nodeListToArray(
                    document.querySelectorAll("#header-locale-popover")
                  ).forEach(function (item, index) {
                    item.id = "".concat(item.id, "-").concat(index);
                  }),
                  Dom.nodeListToArray(
                    document.querySelectorAll(
                      '[aria-controls="header-locale-popover"]'
                    )
                  ).forEach(function (item, index) {
                    item.setAttribute(
                      "aria-controls",
                      ""
                        .concat(item.getAttribute("aria-controls"), "-")
                        .concat(index)
                    );
                  }),
                  Dom.nodeListToArray(
                    document.querySelectorAll("#header-currency-popover")
                  ).forEach(function (item, index) {
                    item.id = "".concat(item.id, "-").concat(index);
                  }),
                  Dom.nodeListToArray(
                    document.querySelectorAll(
                      '[aria-controls="header-currency-popover"]'
                    )
                  ).forEach(function (item, index) {
                    item.setAttribute(
                      "aria-controls",
                      ""
                        .concat(item.getAttribute("aria-controls"), "-")
                        .concat(index)
                    );
                  });
                var localePopoverElement1 = document.getElementById(
                  "header-locale-popover-0"
                );
                localePopoverElement1 &&
                  this.localizationPopovers.push(
                    new Popover(localePopoverElement1, {
                      preferredAlignment: "center",
                      preferredPosition: "bottom",
                      threshold: 12,
                    })
                  );
                var localePopoverElement2 = document.getElementById(
                  "header-locale-popover-1"
                );
                localePopoverElement2 &&
                  this.localizationPopovers.push(
                    new Popover(localePopoverElement2, {
                      preferredAlignment: "center",
                      preferredPosition: "bottom",
                      threshold: 12,
                    })
                  );
                var currencyPopoverElement1 = document.getElementById(
                  "header-currency-popover-0"
                );
                currencyPopoverElement1 &&
                  this.localizationPopovers.push(
                    new Popover(currencyPopoverElement1, {
                      preferredAlignment: "center",
                      preferredPosition: "bottom",
                      threshold: 12,
                    })
                  );
                var currencyPopoverElement2 = document.getElementById(
                  "header-currency-popover-1"
                );
                currencyPopoverElement2 &&
                  this.localizationPopovers.push(
                    new Popover(currencyPopoverElement2, {
                      preferredAlignment: "center",
                      preferredPosition: "bottom",
                      threshold: 12,
                    })
                  );
              },
            },
            {
              key: "_focusNavigation",
              value: function () {
                var _this3 = this;
                fastdom.mutate(function () {
                  (!_this3.isTouch || Responsive.matchesBreakpoint("desk")) &&
                    _this3.element.classList.remove("Header--transparent");
                });
              },
            },
            {
              key: "_closeNavigation",
              value: function () {
                var _this4 = this;
                fastdom.mutate(function () {
                  Dom.nodeListToArray(
                    _this4.element.querySelectorAll(".is-expanded")
                  ).forEach(function (item) {
                    item.classList.remove("is-expanded");
                  }),
                    Dom.nodeListToArray(
                      _this4.element.querySelectorAll(
                        '.Header__MainNav [aria-hidden="false"]'
                      )
                    ).forEach(function (item) {
                      item.setAttribute("aria-hidden", "true");
                    });
                }),
                  this.options.hasTransparentHeader &&
                    this._checkTransparentHeader();
              },
            },
            {
              key: "_openMenu",
              value: function (event, target) {
                (event.type === "mouseenter" && target !== event.target) ||
                  fastdom.mutate(function () {
                    target.classList.add("is-expanded"),
                      Dom.nodeListToArray(
                        target.children,
                        '.Header__MainNav [aria-hidden="true"]'
                      ).forEach(function (item) {
                        item.setAttribute("aria-hidden", "false");
                      }),
                      Dom.getSiblings(target, ".is-expanded").forEach(function (
                        item
                      ) {
                        item.classList.remove("is-expanded"),
                          Dom.nodeListToArray(
                            item.children,
                            '.Header__MainNav [aria-hidden="false"]'
                          ).forEach(function (item2) {
                            item2.setAttribute("aria-hidden", "true");
                          });
                      });
                  });
              },
            },
            {
              key: "_closeMenu",
              value: function (event, target) {
                (event.type === "mouseleave" && target !== event.target) ||
                  fastdom.mutate(function () {
                    target.classList.remove("is-expanded"),
                      Dom.nodeListToArray(
                        target.children,
                        '.Header__MainNav [aria-hidden="false"]'
                      ).forEach(function (item) {
                        item.setAttribute("aria-hidden", "true");
                      });
                  });
              },
            },
            {
              key: "_adjustDropdownPosition",
              value: function (event, target) {
                var nestedMenus = Dom.nodeListToArray(
                    target.querySelectorAll(".DropdownMenu")
                  ),
                  shouldOpenLeft = !1;
                fastdom.measure(function () {
                  var windowWidth = window.innerWidth,
                    rightEdge = target.getBoundingClientRect().right;
                  nestedMenus.forEach(function (item) {
                    rightEdge + item.offsetWidth > windowWidth &&
                      (shouldOpenLeft = !0);
                  });
                }),
                  fastdom.mutate(function () {
                    shouldOpenLeft
                      ? nestedMenus.forEach(function (item) {
                          item.classList.add("DropdownMenu--reversed");
                        })
                      : nestedMenus.forEach(function (item) {
                          item.classList.remove("DropdownMenu--reversed");
                        });
                  });
              },
            },
            {
              key: "_handleTouchMenu",
              value: function (event, target) {
                target.classList.contains("is-expanded") ||
                  event.preventDefault();
              },
            },
            {
              key: "_verifyNavigationOverlap",
              value: function () {
                var _this5 = this,
                  isOverlapping = !1,
                  mainTopMenu = this.element.querySelector(".Header__MainNav");
                fastdom.measure(function () {
                  if (mainTopMenu) {
                    var firstNavElementHeight = Dom.outerHeightWithMargin(
                        mainTopMenu.querySelector(".HorizontalList__Item")
                      ),
                      mainNavHeight = mainTopMenu.scrollHeight;
                    mainNavHeight > firstNavElementHeight &&
                      (isOverlapping = !0);
                  }
                }),
                  this.element.classList.remove(
                    "Header--logoLeft",
                    "Header--inline",
                    "Header--center"
                  ),
                  this.element.classList.add(
                    "Header--".concat(this.options.navigationStyle)
                  ),
                  this.element.clientWidth,
                  fastdom.mutate(function () {
                    if (isOverlapping) {
                      if (
                        (_this5.element.classList.remove(
                          "Header--".concat(_this5.options.navigationStyle)
                        ),
                        _this5.element.classList.add("Header--center"),
                        mainTopMenu)
                      ) {
                        var itemTopSet = new Set();
                        Array.from(
                          mainTopMenu.querySelectorAll(".HorizontalList__Item")
                        ).forEach(function (item) {
                          itemTopSet.add(item.getBoundingClientRect().top);
                        }),
                          (isOverlapping = itemTopSet.size > 1);
                      }
                    } else _this5.element.classList.add("Header--".concat(_this5.options.navigationStyle)), _this5.element.classList.remove("Header--center");
                    var logo = _this5.element.querySelector(
                      ".Header__FlexItem--logo"
                    );
                    logo.classList.toggle(
                      "Header__FlexItem--increaseSpace",
                      isOverlapping
                    ),
                      _this5.element.classList.add("Header--initialized"),
                      fastdom.measure(function () {
                        document.documentElement.style.setProperty(
                          "--header-height",
                          _this5.element.clientHeight + "px"
                        );
                      });
                  });
              },
            },
            {
              key: "_checkTransparentHeader",
              value: function () {
                var _this6 = this;
                if (this.options.hasTransparentHeader) {
                  var scrollThreshold = 10;
                  fastdom.measure(function () {
                    _this6.lastScrollPosition = window.pageYOffset;
                  }),
                    fastdom.mutate(function () {
                      _this6.lastScrollPosition <= scrollThreshold
                        ? _this6.element.classList.add("Header--transparent")
                        : _this6.element.classList.remove(
                            "Header--transparent"
                          );
                    });
                }
              },
            },
          ]),
          HeaderSection2
        );
      })(),
      FooterSection = (function () {
        function FooterSection2(container) {
          _classCallCheck(this, FooterSection2), (this.element = container);
          var localePopoverElement = document.getElementById(
            "footer-locale-popover"
          );
          localePopoverElement &&
            (this.localePopover = new Popover(localePopoverElement, {
              preferredAlignment: "center",
              preferredPosition: "top",
              threshold: 12,
            }));
          var currencyPopoverElement = document.getElementById(
            "footer-currency-popover"
          );
          currencyPopoverElement &&
            (this.currencyPopover = new Popover(currencyPopoverElement, {
              preferredAlignment: "center",
              preferredPosition: "top",
              threshold: 12,
            }));
        }
        return (
          _createClass(FooterSection2, [
            {
              key: "onUnload",
              value: function () {
                this.localePopover && this.localePopover.destroy(),
                  this.currencyPopover && this.currencyPopover.destroy();
              },
            },
          ]),
          FooterSection2
        );
      })(),
      ImageWithTextBlockSection = (function () {
        function ImageWithTextBlockSection2(container) {
          _classCallCheck(this, ImageWithTextBlockSection2),
            (this.element = container);
        }
        return (
          _createClass(ImageWithTextBlockSection2, [
            { key: "onUnload", value: function () {} },
          ]),
          ImageWithTextBlockSection2
        );
      })(),
      LoginSection = (function () {
        function LoginSection2(container) {
          _classCallCheck(this, LoginSection2),
            (this.element = container),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            (this.timelineLite = new TimelineLite()),
            (this.customerLoginForm =
              this.element.querySelector("#customer_login")),
            (this.recoverPasswordForm = this.element.querySelector(
              "#recover_customer_password"
            )),
            this.delegateElement.on(
              "click",
              '[data-action="toggle-recover-form"]',
              this._showRecoverPassword.bind(this)
            );
        }
        return (
          _createClass(LoginSection2, [
            {
              key: "_showRecoverPassword",
              value: function () {
                var isLoginActive =
                  this.customerLoginForm.style.display === "block";
                isLoginActive
                  ? this.timelineLite
                      .fromTo(
                        this.customerLoginForm,
                        0.5,
                        { autoAlpha: 1, display: "block", y: 0 },
                        { autoAlpha: 0, y: 20, display: "none" }
                      )
                      .fromTo(
                        this.recoverPasswordForm,
                        0.5,
                        { autoAlpha: 0, display: "none", y: 20 },
                        { autoAlpha: 1, display: "block", y: 0, delay: 0.25 }
                      )
                  : this.timelineLite
                      .fromTo(
                        this.recoverPasswordForm,
                        0.5,
                        { autoAlpha: 1, display: "block", y: 0 },
                        { autoAlpha: 0, y: 20, display: "none" }
                      )
                      .fromTo(
                        this.customerLoginForm,
                        0.5,
                        { autoAlpha: 0, display: "none", y: 20 },
                        { autoAlpha: 1, display: "block", y: 0, delay: 0.25 }
                      );
              },
            },
          ]),
          LoginSection2
        );
      })(),
      MapSection = (function () {
        function MapSection2(element) {
          _classCallCheck(this, MapSection2),
            (this.element = element),
            (this.options = JSON.parse(
              element.getAttribute("data-section-settings")
            )),
            this.options.apiKey &&
              this.options.mapAddress &&
              this._loadScript().then(this._initMap.bind(this));
        }
        return (
          _createClass(MapSection2, [
            {
              key: "_loadScript",
              value: function () {
                var _this = this;
                return new Promise(function (resolve, reject) {
                  var script = document.createElement("script");
                  document.body.appendChild(script),
                    (script.onload = resolve),
                    (script.onerror = reject),
                    (script.async = !0),
                    (script.src =
                      "https://web.archive.org/web/20230519212450/https://maps.googleapis.com/maps/api/js?key=".concat(
                        _this.options.apiKey
                      ));
                });
              },
            },
            {
              key: "_initMap",
              value: function () {
                var _this2 = this,
                  geocoder = new google.maps.Geocoder();
                geocoder.geocode(
                  { address: this.options.mapAddress },
                  function (results, status) {
                    if (status !== google.maps.GeocoderStatus.OK)
                      Shopify.designMode;
                    else {
                      var mapOptions = {
                          zoom: _this2.options.zoom,
                          center: results[0].geometry.location,
                          draggable: !1,
                          clickableIcons: !1,
                          scrollwheel: !1,
                          disableDoubleClickZoom: !0,
                          disableDefaultUI: !0,
                        },
                        map = new google.maps.Map(
                          _this2.element.querySelector(".FeaturedMap__GMap"),
                          mapOptions
                        ),
                        center = map.getCenter();
                      map.setCenter(center);
                      var icon = {
                        path: "M32.7374478,5.617 C29.1154478,1.995 24.2994478,0 19.1774478,0 C14.0544478,0 9.23944778,1.995 5.61744778,5.617 C-1.08555222,12.319 -1.91855222,24.929 3.81344778,32.569 L19.1774478,54.757 L34.5184478,32.6 C40.2734478,24.929 39.4404478,12.319 32.7374478,5.617 Z M19.3544478,26 C15.4954478,26 12.3544478,22.859 12.3544478,19 C12.3544478,15.141 15.4954478,12 19.3544478,12 C23.2134478,12 26.3544478,15.141 26.3544478,19 C26.3544478,22.859 23.2134478,26 19.3544478,26 Z",
                        fillColor: _this2.options.markerColor,
                        fillOpacity: 1,
                        anchor: new google.maps.Point(15, 55),
                        strokeWeight: 0,
                        scale: 0.6,
                      };
                      new google.maps.Marker({
                        map: map,
                        position: map.getCenter(),
                        icon: icon,
                      });
                      var styledMapType = new google.maps.StyledMapType(
                        JSON.parse(
                          _this2.element.querySelector("[data-gmap-style]")
                            .innerHTML
                        )
                      );
                      map.mapTypes.set("styled_map", styledMapType),
                        map.setMapTypeId("styled_map"),
                        google.maps.event.addDomListener(
                          window,
                          "resize",
                          function () {
                            google.maps.event.trigger(map, "resize"),
                              map.setCenter(center);
                          }
                        );
                    }
                  }
                );
              },
            },
          ]),
          MapSection2
        );
      })(),
      NewsletterPopupSection = (function () {
        function NewsletterPopupSection2(element) {
          _classCallCheck(this, NewsletterPopupSection2),
            (this.element = element),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            (this.options = JSON.parse(
              element.getAttribute("data-section-settings")
            ));
          try {
            window.location.hash === "#newsletter-popup" &&
            window.theme.pageType !== null
              ? this._openPopup()
              : (!this.options.showOnlyOnce ||
                  (this.options.showOnlyOnce &&
                    localStorage.getItem("themePopup") === null)) &&
                setTimeout(
                  this._openPopup.bind(this),
                  this.options.apparitionDelay * 1e3
                );
          } catch (error) {}
          this._attachListeners();
        }
        return (
          _createClass(NewsletterPopupSection2, [
            {
              key: "onUnload",
              value: function () {
                this.delegateElement.off();
              },
            },
            {
              key: "onSelect",
              value: function () {
                this._openPopup();
              },
            },
            {
              key: "onDeselect",
              value: function () {
                this._closePopup();
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                this.delegateElement.on(
                  "click",
                  '[data-action="close-popup"]',
                  this._closePopup.bind(this)
                );
              },
            },
            {
              key: "_openPopup",
              value: function () {
                this.element.setAttribute("aria-hidden", "false"),
                  localStorage.setItem("themePopup", "true");
              },
            },
            {
              key: "_closePopup",
              value: function () {
                this.element.setAttribute("aria-hidden", "true");
              },
            },
          ]),
          NewsletterPopupSection2
        );
      })(),
      ProductRecommendationsSection = (function () {
        function ProductRecommendationsSection2(container) {
          _classCallCheck(this, ProductRecommendationsSection2),
            (this.element = container),
            (this.options = JSON.parse(
              this.element.getAttribute("data-section-settings")
            )),
            this.options.useRecommendations
              ? this._loadRecommendations().then(
                  this._createSlideshow.bind(this)
                )
              : this._createSlideshow();
        }
        return (
          _createClass(ProductRecommendationsSection2, [
            {
              key: "onUnload",
              value: function () {
                this.carousel.destroy();
              },
            },
            {
              key: "_loadRecommendations",
              value: function () {
                var _this = this,
                  url = ""
                    .concat(
                      window.routes.productRecommendationsUrl,
                      "?section_id="
                    )
                    .concat(
                      this.element.getAttribute("data-section-id"),
                      "&product_id="
                    )
                    .concat(this.options.productId, "&limit=")
                    .concat(this.options.recommendationsCount);
                return fetch(url).then(function (response) {
                  return response.text().then(function (content) {
                    var container = document.createElement("div");
                    (container.innerHTML = content),
                      (_this.element.querySelector(
                        ".ProductRecommendations"
                      ).innerHTML = container.querySelector(
                        ".ProductRecommendations"
                      ).innerHTML);
                  });
                });
              },
            },
            {
              key: "_createSlideshow",
              value: function () {
                var flickityElement = this.element.querySelector(
                  "[data-flickity-config]"
                );
                flickityElement &&
                  ((this.carousel = new Carousel(flickityElement)),
                  new ProductItemColorSwatch(this.element));
              },
            },
          ]),
          ProductRecommendationsSection2
        );
      })(),
      ProductSection = (function () {
        function ProductSection2(container) {
          var _this = this;
          _classCallCheck(this, ProductSection2),
            (this.element = container),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            (this.options = JSON.parse(
              this.element.getAttribute("data-section-settings")
            )),
            (this.viewInSpaceElement =
              this.element.querySelector("[data-shopify-xr]")),
            (this.productVariants = new ProductVariants(
              container,
              this.options
            )),
            (this.productReviews = new ProductReviews(container));
          var productSlideshowElement = this.element.querySelector(
            ".Product__Slideshow"
          );
          productSlideshowElement &&
            ((this.productSlideshow = new Carousel(
              productSlideshowElement,
              {
                onSelect: this._onImageChanged.bind(this),
                onSettle: this._onImageSettled.bind(this),
              },
              { draggable: !Responsive.matchesBreakpoint("supports-hover") }
            )),
            (this.mediaList = {}),
            (this.previouslySelectedMedia = null),
            productSlideshowElement
              .querySelectorAll('[data-media-type="model"]')
              .forEach(function (model) {
                _this.mediaList[model.getAttribute("data-media-id")] =
                  new ProductModel(model, _this.options.stackProductImages);
              }),
            productSlideshowElement
              .querySelectorAll(
                '[data-media-type="video"], [data-media-type="external_video"]'
              )
              .forEach(function (video) {
                _this.mediaList[video.getAttribute("data-media-id")] =
                  new ProductVideo(
                    video,
                    _this.options.stackProductImages,
                    _this.options.enableVideoLooping
                  );
              }),
            this.options.stackProductImages &&
              ((this.slideshowNavDots = this.element.querySelector(
                ".Product__SlideshowNav--dots"
              )),
              (this.slideshowNavDotsItems = this.slideshowNavDots
                ? Dom.nodeListToArray(
                    this.slideshowNavDots.querySelectorAll("a")
                  )
                : [])),
            this.options.showThumbnails &&
              ((this.slideshowNavThumbnails = this.element.querySelector(
                ".Product__SlideshowNav--thumbnails"
              )),
              (this.slideshowNavThumbnailsItems = this.slideshowNavThumbnails
                ? Dom.nodeListToArray(
                    this.slideshowNavThumbnails.querySelectorAll(
                      ".Product__SlideshowNavImage"
                    )
                  )
                : [])),
            (this.slideshowImages = Dom.nodeListToArray(
              productSlideshowElement.querySelectorAll(".Carousel__Cell")
            )),
            this._setupSlideshowMobileNav()),
            (this.productWrapperElement =
              this.element.querySelector(".Product__Wrapper")),
            (this.productInfoElement =
              this.element.querySelector(".Product__Info")),
            (this.productAsideElement =
              this.element.querySelector(".Product__Aside")),
            (this.productGalleryElement =
              this.element.querySelector(".Product__Gallery")),
            (this.quickNav = this.element.querySelector(".Product__QuickNav")),
            this.options.enableImageZoom &&
              (this.imageZoomInstance = new ProductImageZoom(
                this.element,
                this.productSlideshow
              )),
            Stickyfill.addOne(this.productInfoElement);
          var offscreenElement = this.element.querySelector(
            ".Product__OffScreen"
          );
          offscreenElement && this.element.appendChild(offscreenElement),
            this._setupDeviceFeatures(),
            this._attachListeners();
        }
        return (
          _createClass(ProductSection2, [
            {
              key: "onUnload",
              value: function () {
                this.delegateElement.off("click"),
                  this.productReviews.destroy(),
                  this.productVariants && this.productVariants.destroy(),
                  this.productSlideshow && this.productSlideshow.destroy(),
                  this.options.enableImageZoom &&
                    this.imageZoomInstance.destroy(),
                  this.carouselNavScrollSpy &&
                    this.carouselNavScrollSpy.destroy(),
                  this.quickNav &&
                    window.removeEventListener(
                      "scroll",
                      this._checkQuickNavListener
                    ),
                  this.productInfoScroller &&
                    this.productInfoScroller.destroy(),
                  this.productThumbnailsScroller &&
                    this.productThumbnailsScroller.destroy(),
                  window.ResizeObserver &&
                    this.productInfoResizeObserver &&
                    this.productInfoResizeObserver.disconnect(),
                  Stickyfill.removeOne(this.productInfoElement),
                  document.removeEventListener(
                    "breakpoint:changed",
                    this._onBreakpointChangedListener
                  );
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                (this._onBreakpointChangedListener =
                  this._setupDeviceFeatures.bind(this)),
                  (this._checkQuickNavListener =
                    this._checkQuickNav.bind(this)),
                  this.delegateElement.on(
                    "click",
                    '[data-action="toggle-social-share"]',
                    this._toggleSocialShare.bind(this)
                  ),
                  this.delegateElement.on(
                    "variant:changed",
                    this._updateSlideshowImage.bind(this)
                  ),
                  this.delegateElement.on(
                    "scrollspy:target:changed",
                    this._onScrollTargetChanged.bind(this)
                  ),
                  this.delegateElement.on(
                    "model:played",
                    this._onMediaPlayed.bind(this)
                  ),
                  this.delegateElement.on(
                    "video:played",
                    this._onMediaPlayed.bind(this)
                  ),
                  this.delegateElement.on(
                    "model:paused",
                    this._onMediaPaused.bind(this)
                  ),
                  this.delegateElement.on(
                    "video:paused",
                    this._onMediaPaused.bind(this)
                  ),
                  document.addEventListener(
                    "breakpoint:changed",
                    this._onBreakpointChangedListener
                  ),
                  this.quickNav &&
                    window.addEventListener(
                      "scroll",
                      this._checkQuickNavListener
                    ),
                  !this.options.stackProductImages &&
                    this.options.showThumbnails &&
                    this.delegateElement.on(
                      "click",
                      ".Product__SlideshowNavImage",
                      this._switchToImage.bind(this)
                    );
              },
            },
            {
              key: "_setupSlideshowMobileNav",
              value: function () {
                var _this2 = this;
                if (
                  ((this.slideshowMobileNav = this.element.querySelector(
                    ".Product__SlideshowMobileNav"
                  )),
                  this.slideshowMobileNav)
                ) {
                  var slideshowMobileNavDelegate = new domDelegate.Delegate(
                    this.slideshowMobileNav
                  );
                  slideshowMobileNavDelegate.on(
                    "click",
                    ".dot",
                    function (event, element) {
                      _this2._slideWillChange(),
                        _this2.productSlideshow.selectCell(
                          parseInt(element.getAttribute("data-index"))
                        );
                    }
                  ),
                    slideshowMobileNavDelegate.on(
                      "click",
                      ".Product__SlideshowNavArrow",
                      function (event, element) {
                        _this2._slideWillChange(),
                          element.getAttribute("data-direction") === "next"
                            ? _this2.productSlideshow.next()
                            : _this2.productSlideshow.previous();
                      }
                    );
                }
              },
            },
            {
              key: "_updateSlideshowImage",
              value: function (event) {
                var variant = event.detail.variant,
                  previousVariant = event.detail.previousVariant;
                if (
                  !(
                    !variant ||
                    !variant.featured_media ||
                    (previousVariant &&
                      previousVariant.featured_media &&
                      previousVariant.featured_media.id ===
                        variant.featured_media.id)
                  )
                )
                  if (
                    (this._slideWillChange(),
                    Responsive.matchesBreakpoint("pocket") ||
                      !this.options.stackProductImages)
                  )
                    for (
                      var i = 0;
                      i !== this.productSlideshow.flickityInstance.cells.length;
                      ++i
                    ) {
                      var cellElement =
                          this.productSlideshow.flickityInstance.cells[i]
                            .element,
                        mediaId = parseInt(
                          cellElement.getAttribute("data-media-id")
                        );
                      mediaId === variant.featured_media.id &&
                        this.productSlideshow.selectCell(
                          parseInt(
                            cellElement.getAttribute("data-media-position")
                          ) - 1
                        );
                    }
                  else
                    document
                      .querySelector(
                        '[href="#Media'.concat(variant.featured_media.id, '"]')
                      )
                      .click();
              },
            },
            {
              key: "_onMediaPlayed",
              value: function (event) {
                (this.productSlideshow.getFlickityInstance().options.draggable =
                  !1),
                  this.productSlideshow.getFlickityInstance().unbindDrag(),
                  this.previouslySelectedMedia &&
                    this.previouslySelectedMedia !== event.target &&
                    this.mediaList[
                      this.previouslySelectedMedia.getAttribute("data-media-id")
                    ].hasBeenDeselected(),
                  this.options.stackProductImages &&
                    (this.previouslySelectedMedia = event.target);
              },
            },
            {
              key: "_onMediaPaused",
              value: function () {
                (this.productSlideshow.getFlickityInstance().options.draggable =
                  !Responsive.matchesBreakpoint("supports-hover")),
                  this.productSlideshow.getFlickityInstance().bindDrag();
              },
            },
            {
              key: "_handleMedia",
              value: function (item) {
                if (
                  this.previouslySelectedMedia &&
                  this.previouslySelectedMedia !== item
                ) {
                  switch (
                    this.previouslySelectedMedia.getAttribute("data-media-type")
                  ) {
                    case "video":
                    case "external_video":
                    case "model":
                      this.mediaList[
                        this.previouslySelectedMedia.getAttribute(
                          "data-media-id"
                        )
                      ].hasBeenDeselected();
                  }
                  this.previouslySelectedMedia.getAttribute(
                    "data-media-type"
                  ) === "model" &&
                    this.viewInSpaceElement &&
                    this.viewInSpaceElement.setAttribute(
                      "data-shopify-model3d-id",
                      this.viewInSpaceElement.getAttribute(
                        "data-shopify-model3d-default-id"
                      )
                    );
                }
                switch (item.getAttribute("data-media-type")) {
                  case "video":
                  case "external_video":
                  case "model":
                    this.mediaList[
                      item.getAttribute("data-media-id")
                    ].hasBeenSelected();
                    break;
                }
                item.getAttribute("data-media-type") === "model" &&
                  this.viewInSpaceElement &&
                  this.viewInSpaceElement.setAttribute(
                    "data-shopify-model3d-id",
                    item.getAttribute("data-media-id")
                  ),
                  (this.previouslySelectedMedia = item);
              },
            },
            {
              key: "_onScrollTargetChanged",
              value: function (event) {
                this.options.stackProductImages &&
                  (this.slideshowNavDotsItems.forEach(function (item) {
                    return item.classList.remove("is-selected");
                  }),
                  this.slideshowNavDotsItems[
                    parseInt(
                      event.detail.newTarget.getAttribute("data-media-position")
                    ) - 1
                  ].classList.add("is-selected"),
                  this.options.showThumbnails &&
                    (this.slideshowNavThumbnailsItems.forEach(function (item) {
                      return item.classList.remove("is-selected");
                    }),
                    this.slideshowNavThumbnailsItems[
                      parseInt(
                        event.detail.newTarget.getAttribute(
                          "data-media-position"
                        )
                      ) - 1
                    ].classList.add("is-selected")));
              },
            },
            {
              key: "_switchToImage",
              value: function (event, target) {
                event.preventDefault(), this._slideWillChange();
                for (
                  var i = 0;
                  i !== this.productSlideshow.flickityInstance.cells.length;
                  ++i
                ) {
                  var cellElement =
                      this.productSlideshow.flickityInstance.cells[i].element,
                    mediaId = parseInt(
                      cellElement.getAttribute("data-media-id")
                    );
                  mediaId === parseInt(target.getAttribute("data-media-id")) &&
                    this.productSlideshow.selectCell(
                      parseInt(
                        cellElement.getAttribute("data-media-position")
                      ) - 1
                    );
                }
              },
            },
            {
              key: "_checkQuickNav",
              value: function () {
                var _this3 = this,
                  showAsideQuickNav = !1;
                fastdom.measure(function () {
                  showAsideQuickNav =
                    window.scrollY >=
                    _this3.productAsideElement.offsetTop -
                      _this3.productAsideElement.clientHeight;
                }),
                  fastdom.mutate(function () {
                    showAsideQuickNav
                      ? _this3.quickNav.classList.add("is-flipped")
                      : _this3.quickNav.classList.remove("is-flipped");
                  });
              },
            },
            {
              key: "_toggleSocialShare",
              value: function (event, target) {
                target.classList.toggle("is-active"),
                  target.classList.toggle("RoundButton--secondaryState"),
                  target.setAttribute(
                    "aria-expanded",
                    target.getAttribute("aria-expanded") === "true"
                      ? "false"
                      : "true"
                  ),
                  target.nextElementSibling.setAttribute(
                    "aria-hidden",
                    target.nextElementSibling.getAttribute("aria-hidden") ===
                      "true"
                      ? "false"
                      : "true"
                  );
              },
            },
            {
              key: "_onImageChanged",
              value: function (event, cell) {
                if (Responsive.matchesBreakpoint("pocket")) {
                  var productGalleryActionListElement =
                    this.element.querySelector(
                      ".Product__Gallery .Product__ActionList"
                    );
                  productGalleryActionListElement &&
                    (cell.classList.contains("Product__SlideItem--image")
                      ? productGalleryActionListElement.classList.remove(
                          "is-hidden"
                        )
                      : productGalleryActionListElement.classList.add(
                          "is-hidden"
                        ));
                }
                if (
                  !this.options.stackProductImages &&
                  this.options.showThumbnails
                ) {
                  var mediaId = cell.getAttribute("data-media-id");
                  this.slideshowNavThumbnailsItems.forEach(function (
                    thumbnail
                  ) {
                    thumbnail.getAttribute("data-media-id") === mediaId
                      ? thumbnail.classList.add("is-selected")
                      : thumbnail.classList.remove("is-selected");
                  });
                }
                if (this.slideshowMobileNav) {
                  var selectedIndex =
                    parseInt(cell.getAttribute("data-media-position")) - 1;
                  Dom.nodeListToArray(
                    this.slideshowMobileNav.querySelectorAll(".dot")
                  ).forEach(function (item, index) {
                    index === selectedIndex
                      ? item.classList.add("is-selected")
                      : item.classList.remove("is-selected");
                  });
                }
              },
            },
            {
              key: "_onImageSettled",
              value: function (index, cell) {
                if (
                  (this._handleMedia(cell),
                  Responsive.matchesBreakpoint("lap-and-up"))
                ) {
                  var slides = this.element.querySelectorAll(
                    ".Product__SlideItem:not(.is-selected)"
                  );
                  slides.forEach(function (slide) {
                    slide.classList.add("Product__SlideItem--hidden");
                  });
                }
              },
            },
            {
              key: "_slideWillChange",
              value: function () {
                if (Responsive.matchesBreakpoint("lap-and-up")) {
                  var slides = this.element.querySelectorAll(
                    ".Product__SlideItem"
                  );
                  slides.forEach(function (slide) {
                    slide.classList.remove("Product__SlideItem--hidden");
                  });
                }
              },
            },
            {
              key: "_setupDeviceFeatures",
              value: function (event) {
                var _this4 = this,
                  currentBreakpoint = event
                    ? event.detail.currentBreakpoint
                    : Responsive.getCurrentBreakpoint(),
                  previousBreakpoint = event
                    ? event.detail.previousBreakpoint
                    : null;
                if (currentBreakpoint !== previousBreakpoint)
                  if (
                    currentBreakpoint === "phone" ||
                    currentBreakpoint === "tablet"
                  )
                    this.carouselNavScrollSpy &&
                      this.carouselNavScrollSpy.destroy(),
                      this.productInfoScroller &&
                        this.productInfoScroller.destroy(),
                      this.productThumbnailsScroller &&
                        this.productThumbnailsScroller.destroy(),
                      this.productAsideElement
                        ? (this.productAsideElement.style.minHeight = null)
                        : (this.productWrapperElement.style.minHeight = null),
                      (this.productInfoElement.parentNode.style.maxHeight =
                        null);
                  else {
                    if (
                      this.slideshowImages &&
                      this.slideshowImages.length > 1
                    ) {
                      var offsetTop = 0;
                      this.options.stackProductImages &&
                        this.slideshowNavDots &&
                        (offsetTop =
                          this.slideshowNavDots.firstElementChild.offsetTop),
                        this.options.showThumbnails &&
                          Responsive.matchesBreakpoint("desk") &&
                          (offsetTop = 250),
                        (this.carouselNavScrollSpy = new ScrollSpy(
                          this.element,
                          this.slideshowImages,
                          {
                            rootMargin: "-".concat(offsetTop, "px 0px 0px 0px"),
                          }
                        ));
                    }
                    var productInfoStyles = window.getComputedStyle(
                        this.productInfoElement
                      ),
                      productInfoPadding =
                        parseInt(productInfoStyles.paddingTop) +
                        parseInt(productInfoStyles.paddingBottom),
                      productGalleryHeight = this.productGalleryElement
                        ? parseInt(this.productGalleryElement.scrollHeight)
                        : 0,
                      calculateMinHeight = function () {
                        _this4.productAsideElement
                          ? ((_this4.productAsideElement.style.minHeight =
                              "".concat(
                                _this4.productInfoElement.scrollHeight -
                                  productInfoPadding -
                                  productGalleryHeight,
                                "px"
                              )),
                            (_this4.productInfoElement.closest(
                              ".Product__InfoWrapper"
                            ).style.maxHeight =
                              _this4.productAsideElement.offsetTop +
                              _this4.productInfoElement.scrollHeight -
                              productInfoPadding +
                              "px"))
                          : (_this4.productWrapperElement.style.minHeight =
                              "".concat(
                                _this4.productInfoElement.scrollHeight -
                                  parseInt(productInfoStyles.paddingTop),
                                "px"
                              ));
                      };
                    calculateMinHeight(),
                      window.ResizeObserver &&
                        ((this.productInfoResizeObserver = new ResizeObserver(
                          function () {
                            calculateMinHeight();
                          }
                        )),
                        this.productInfoResizeObserver.observe(
                          this.productInfoElement
                        )),
                      (this.productInfoScroller = new OverflowScroller(
                        this.productInfoElement
                      )),
                      this.options.showThumbnails &&
                        this.slideshowNavThumbnails &&
                        (this.productThumbnailsScroller = new OverflowScroller(
                          this.slideshowNavThumbnails
                        ));
                  }
              },
            },
          ]),
          ProductSection2
        );
      })(),
      RecentlyViewedProductsSection = (function () {
        function RecentlyViewedProductsSection2(container) {
          _classCallCheck(this, RecentlyViewedProductsSection2),
            (this.element = container),
            (this.options = JSON.parse(
              this.element.getAttribute("data-section-settings")
            )),
            new ProductItemColorSwatch(this.element),
            this._fetchProducts();
        }
        return (
          _createClass(RecentlyViewedProductsSection2, [
            {
              key: "onUnload",
              value: function () {
                this.carousel && this.carousel.destroy();
              },
            },
            {
              key: "_fetchProducts",
              value: function () {
                var _this = this,
                  queryString = this._getSearchQueryString();
                queryString !== "" &&
                  fetch(
                    ""
                      .concat(window.routes.searchUrl, "?section_id=")
                      .concat(
                        this.element.getAttribute("data-section-id"),
                        "&type=product&q="
                      )
                      .concat(queryString),
                    { credentials: "same-origin", method: "GET" }
                  ).then(function (response) {
                    response.text().then(function (content) {
                      var tempElement = document.createElement("div");
                      (tempElement.innerHTML = content),
                        (_this.element.innerHTML =
                          tempElement.querySelector(".Section").innerHTML),
                        (_this.element.parentNode.style.display = "block"),
                        (_this.carousel = new Carousel(
                          _this.element.querySelector("[data-flickity-config]")
                        ));
                    });
                  });
              },
            },
            {
              key: "_getSearchQueryString",
              value: function () {
                var items = JSON.parse(
                  localStorage.getItem("recentlyViewedProducts") || "[]"
                );
                return (
                  items.includes(this.options.productId) &&
                    items.splice(items.indexOf(this.options.productId), 1),
                  items
                    .map(function (item) {
                      return "id:" + item;
                    })
                    .join(" OR ")
                );
              },
            },
          ]),
          RecentlyViewedProductsSection2
        );
      })(),
      SectionContainer = (function () {
        function SectionContainer2() {
          _classCallCheck(this, SectionContainer2),
            (this.constructors = []),
            (this.instances = []),
            this._attachListeners();
        }
        return (
          _createClass(SectionContainer2, [
            {
              key: "_attachListeners",
              value: function () {
                document.addEventListener(
                  "shopify:section:load",
                  this._onSectionLoad.bind(this)
                ),
                  document.addEventListener(
                    "shopify:section:unload",
                    this._onSectionUnload.bind(this)
                  ),
                  document.addEventListener(
                    "shopify:section:select",
                    this._onSelect.bind(this)
                  ),
                  document.addEventListener(
                    "shopify:section:deselect",
                    this._onDeselect.bind(this)
                  ),
                  document.addEventListener(
                    "shopify:section:reorder",
                    this._onReorder.bind(this)
                  ),
                  document.addEventListener(
                    "shopify:block:select",
                    this._onBlockSelect.bind(this)
                  ),
                  document.addEventListener(
                    "shopify:block:deselect",
                    this._onBlockDeselect.bind(this)
                  );
              },
            },
            {
              key: "register",
              value: function (type, constructor) {
                var _this = this;
                (this.constructors[type] = constructor),
                  Dom.nodeListToArray(
                    document.querySelectorAll(
                      "[data-section-type=".concat(type, "]")
                    )
                  ).forEach(function (container) {
                    _this._createInstance(container, constructor);
                  });
              },
            },
            {
              key: "_findInstance",
              value: function (array, key, value) {
                for (var i = 0; i < array.length; i++)
                  if (array[i][key] === value) return array[i];
              },
            },
            {
              key: "_removeInstance",
              value: function (array, key, value) {
                for (var i = array.length; i--; )
                  if (array[i][key] === value) {
                    array.splice(i, 1);
                    break;
                  }
                return array;
              },
            },
            {
              key: "_onSectionLoad",
              value: function (event) {
                var container = event.target.querySelector("[data-section-id]");
                container && this._createInstance(container);
              },
            },
            {
              key: "_onSectionUnload",
              value: function (event) {
                var instance = this._findInstance(
                  this.instances,
                  "id",
                  event.detail.sectionId
                );
                instance &&
                  (typeof instance.onUnload == "function" &&
                    instance.onUnload(event),
                  (this.instances = this._removeInstance(
                    this.instances,
                    "id",
                    event.detail.sectionId
                  )));
              },
            },
            {
              key: "_onSelect",
              value: function (event) {
                var instance = this._findInstance(
                  this.instances,
                  "id",
                  event.detail.sectionId
                );
                instance &&
                  typeof instance.onSelect == "function" &&
                  instance.onSelect(event);
              },
            },
            {
              key: "_onDeselect",
              value: function (event) {
                var instance = this._findInstance(
                  this.instances,
                  "id",
                  event.detail.sectionId
                );
                instance &&
                  typeof instance.onDeselect == "function" &&
                  instance.onDeselect(event);
              },
            },
            {
              key: "_onReorder",
              value: function (event) {
                var instance = this._findInstance(
                  this.instances,
                  "id",
                  event.detail.sectionId
                );
                instance &&
                  typeof instance.onReorder == "function" &&
                  instance.onReorder(event);
              },
            },
            {
              key: "_onBlockSelect",
              value: function (event) {
                var instance = this._findInstance(
                  this.instances,
                  "id",
                  event.detail.sectionId
                );
                instance &&
                  typeof instance.onBlockSelect == "function" &&
                  instance.onBlockSelect(event);
              },
            },
            {
              key: "_onBlockDeselect",
              value: function (event) {
                var instance = this._findInstance(
                  this.instances,
                  "id",
                  event.detail.sectionId
                );
                instance &&
                  typeof instance.onBlockDeselect == "function" &&
                  instance.onBlockDeselect(event);
              },
            },
            {
              key: "_createInstance",
              value: function (container, constructor) {
                var id = container.getAttribute("data-section-id"),
                  type = container.getAttribute("data-section-type");
                if (
                  ((constructor = constructor || this.constructors[type]),
                  typeof constructor != "undefined")
                ) {
                  var instance = Object.assign(new constructor(container), {
                    id: id,
                    type: type,
                    container: container,
                  });
                  this.instances.push(instance);
                }
              },
            },
          ]),
          SectionContainer2
        );
      })(),
      ShopNowSection = (function () {
        function ShopNowSection2(container) {
          _classCallCheck(this, ShopNowSection2),
            (this.element = container),
            (this.carousel = new Carousel(
              this.element.querySelector("[data-flickity-config]")
            )),
            new ProductItemColorSwatch(this.element);
        }
        return (
          _createClass(ShopNowSection2, [
            {
              key: "onUnload",
              value: function () {
                this.carousel.destroy();
              },
            },
          ]),
          ShopNowSection2
        );
      })(),
      ShopTheLookSection = (function () {
        function ShopTheLookSection2(container) {
          _classCallCheck(this, ShopTheLookSection2),
            (this.element = container),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            (this.usePocketMode = Responsive.matchesBreakpoint("pocket")),
            (this.pocketActivatorButton = this.element.querySelector(
              '[data-action="open-look"]'
            )),
            this._createOuterCarousel(),
            this._createPocketPopovers(),
            this._attachListeners();
        }
        return (
          _createClass(ShopTheLookSection2, [
            {
              key: "onUnload",
              value: function () {
                this.outerCarousel.destroy(),
                  this.innerCarousels.forEach(function (item) {
                    item.forEach(function (innerItem) {
                      return innerItem.destroy();
                    });
                  }),
                  this.popovers.forEach(function (item) {
                    return item.destroy();
                  }),
                  this.delegateElement.off();
              },
            },
            {
              key: "onBlockSelect",
              value: function (event) {
                this.outerCarousel.selectCell(
                  event.target.getAttribute("data-slide-index"),
                  !0,
                  !event.detail.load
                );
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                this.delegateElement.on(
                  "click",
                  ".ShopTheLook__Dot",
                  this._onDotClicked.bind(this)
                );
              },
            },
            {
              key: "_createPocketPopovers",
              value: function () {
                var _this = this;
                (this.popovers = []),
                  Dom.nodeListToArray(
                    this.element.querySelectorAll(".Popover")
                  ).forEach(function (popover) {
                    _this.popovers.push(
                      new Popover(popover, {
                        activator: _this.pocketActivatorButton,
                        showOverlay: !1,
                        onOpen: _this._openPocketZoom.bind(_this),
                        onClose: _this._closePocketZoom.bind(_this),
                      })
                    );
                  });
              },
            },
            {
              key: "_createOuterCarousel",
              value: function () {
                var _this2 = this;
                (this.outerCarousel = new Carousel(
                  this.element.querySelector(".ShopTheLook"),
                  { onSelect: this._onLookChanged.bind(this) }
                )),
                  (this.innerCarousels = new Array(
                    this.outerCarousel.flickityInstance.cells.length
                  ));
                for (var i = 0; i !== this.innerCarousels.length; ++i)
                  this.innerCarousels[i] = [];
                Dom.nodeListToArray(
                  this.element.querySelectorAll(".ShopTheLook__ProductList")
                ).forEach(function (item) {
                  var lookIndex = parseInt(
                    item.getAttribute("data-look-index")
                  );
                  _this2.innerCarousels[lookIndex].push(
                    new Carousel(item, {
                      onSelect: _this2._onProductChanged.bind(_this2),
                    })
                  ),
                    item.insertBefore(
                      item.querySelector(".flickity-viewport"),
                      item.querySelector(".ShopTheLook__ViewButton")
                    );
                }),
                  this.outerCarousel.resize();
              },
            },
            {
              key: "_onLookChanged",
              value: function (selectedIndex, selectedCell) {
                this.pocketActivatorButton.setAttribute(
                  "aria-controls",
                  "".concat(selectedCell.getAttribute("id"), "-popover")
                );
              },
            },
            {
              key: "_onProductChanged",
              value: function (selectedIndex, selectedCell) {
                var lookItem = this.outerCarousel.getSelectedCell(),
                  activeDot = null;
                Dom.nodeListToArray(
                  lookItem.querySelectorAll(".ShopTheLook__Dot")
                ).forEach(function (dot, index) {
                  dot.classList.remove("is-active"),
                    index === selectedIndex &&
                      (dot.classList.add("is-active"), (activeDot = dot));
                }),
                  lookItem
                    .querySelector(".ShopTheLook__ViewButton")
                    .setAttribute(
                      "href",
                      selectedCell.getAttribute("data-product-url")
                    ),
                  lookItem.dispatchEvent(
                    new CustomEvent("product:changed", {
                      detail: { dot: activeDot },
                    })
                  );
              },
            },
            {
              key: "_onDotClicked",
              value: function (event, target) {
                var shouldAnimateCarousel = !1,
                  hasOnePopoverOpen = !1,
                  lookIndex = this.outerCarousel.getSelectedIndex();
                this.popovers.forEach(function (item) {
                  item.isOpen &&
                    ((hasOnePopoverOpen = !0), (shouldAnimateCarousel = !0));
                }),
                  this.innerCarousels[lookIndex].forEach(function (
                    innerCarousel
                  ) {
                    innerCarousel.selectCell(
                      parseInt(target.getAttribute("data-product-index")) - 1,
                      !1,
                      shouldAnimateCarousel
                    );
                  }),
                  this.usePocketMode &&
                    !hasOnePopoverOpen &&
                    this.popovers[lookIndex].open();
              },
            },
            {
              key: "_openPocketZoom",
              value: function (popover) {
                var _this3 = this;
                this._calculateImageTransform(popover),
                  fastdom.mutate(function () {
                    (document.getElementById(
                      "shopify-section-header"
                    ).style.cssText =
                      "transform: translateY(-100%); transition: transform 0.3s ease-in-out;"),
                      _this3.outerCarousel.flickityInstance.unbindDrag(),
                      _this3.outerCarousel.flickityInstance.element.classList.add(
                        "is-zoomed"
                      ),
                      _this3.outerCarousel
                        .getSelectedCell()
                        .classList.add("is-expanded");
                  });
              },
            },
            {
              key: "_calculateImageTransform",
              value: function (openPopover) {
                var _this4 = this,
                  selectedCell = this.outerCarousel.getSelectedCell();
                fastdom.measure(function () {
                  var scale =
                      window.innerWidth /
                      (selectedCell.offsetWidth -
                        parseInt(
                          window.getComputedStyle(selectedCell).paddingLeft
                        ) *
                          2),
                    heightAfterScale = Math.round(
                      selectedCell.offsetHeight * scale
                    ),
                    hiddenImageHeight = Math.round(
                      Math.max(
                        heightAfterScale -
                          (window.innerHeight -
                            openPopover.element.offsetHeight),
                        0
                      )
                    ),
                    visibleImageHeight = heightAfterScale - hiddenImageHeight,
                    minTranslateY = Math.round(
                      -(
                        selectedCell.getBoundingClientRect().top -
                        (heightAfterScale - selectedCell.offsetHeight) / 2
                      )
                    ),
                    maxTranslateY = Math.round(
                      minTranslateY - hiddenImageHeight
                    );
                  (_this4._calculateTransformForDotListener = function (event) {
                    var dotTopPosition = Math.round(
                        (event.detail.dot.offsetTop +
                          event.detail.dot.offsetHeight / 2) *
                          scale
                      ),
                      offsetToMove = Math.round(
                        dotTopPosition - visibleImageHeight / 2
                      ),
                      translateY = Math.min(
                        Math.max(minTranslateY - offsetToMove, maxTranslateY),
                        minTranslateY
                      );
                    fastdom.mutate(function () {
                      _this4.outerCarousel.flickityInstance.viewport.style.transform =
                        "translate3d(0, "
                          .concat(Math.round(translateY), "px, 0) scale(")
                          .concat(scale, ")");
                    });
                  }),
                    selectedCell.addEventListener(
                      "product:changed",
                      _this4._calculateTransformForDotListener
                    ),
                    selectedCell.dispatchEvent(
                      new CustomEvent("product:changed", {
                        detail: {
                          dot: selectedCell.querySelector(
                            ".ShopTheLook__Dot.is-active"
                          ),
                        },
                      })
                    );
                });
              },
            },
            {
              key: "_closePocketZoom",
              value: function () {
                var _this5 = this,
                  selectedCell = this.outerCarousel.getSelectedCell();
                selectedCell.removeEventListener(
                  "product:changed",
                  this._calculateTransformForDotListener
                ),
                  fastdom.mutate(function () {
                    (document.getElementById(
                      "shopify-section-header"
                    ).style.cssText =
                      "transform: translateY(0); transition: transform 0.3s ease-in-out 0.3s;"),
                      _this5.outerCarousel.flickityInstance.bindDrag(),
                      _this5.outerCarousel.flickityInstance.element.classList.remove(
                        "is-zoomed"
                      ),
                      (_this5.outerCarousel.flickityInstance.viewport.style.transform =
                        null),
                      selectedCell.classList.remove("is-expanded");
                  });
              },
            },
          ]),
          ShopTheLookSection2
        );
      })(),
      SidebarMenuSection = (function () {
        function SidebarMenuSection2(container) {
          _classCallCheck(this, SidebarMenuSection2),
            (this.element = container),
            (this.sidebarDrawer = new Drawer(container));
        }
        return (
          _createClass(SidebarMenuSection2, [
            {
              key: "onUnload",
              value: function () {
                this.sidebarDrawer.destroy();
              },
            },
            {
              key: "onSelect",
              value: function () {
                this.sidebarDrawer.open();
              },
            },
            {
              key: "onDeselect",
              value: function () {
                this.sidebarDrawer.close();
              },
            },
          ]),
          SidebarMenuSection2
        );
      })(),
      SlideshowSection = (function () {
        function SlideshowSection2(container) {
          _classCallCheck(this, SlideshowSection2),
            (this.element = container),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            (this.slideshow = new Carousel(
              this.element.querySelector("[data-flickity-config]"),
              { onSelect: this._onSlideChanged.bind(this) }
            )),
            (this.selectedSlide = null),
            (this.shouldAnimate = !0),
            (this.timeline = new TimelineLite({
              delay: window.theme.showPageTransition ? 0.5 : 0,
            })),
            this.slideshow.flickityInstance.cells.length > 0 &&
              this._transitionToSlide(
                this.slideshow.flickityInstance.selectedCell.element,
                !0
              ),
            this._attachListeners();
        }
        return (
          _createClass(SlideshowSection2, [
            {
              key: "onUnload",
              value: function () {
                this.slideshow.destroy(),
                  this.timeline.kill(),
                  this.delegateElement.off(),
                  document.removeEventListener(
                    "breakpoint:changed",
                    this._onBreakpointChangedListener
                  );
              },
            },
            {
              key: "onBlockSelect",
              value: function (event) {
                this.slideshow.flickityInstance.options.autoPlay &&
                  this.slideshow.flickityInstance.stopPlayer(),
                  (this.shouldAnimate = !event.detail.load),
                  this.slideshow.selectCell(
                    event.target.getAttribute("data-slide-index"),
                    !1,
                    !event.detail.load
                  );
              },
            },
            {
              key: "onBlockDeselect",
              value: function () {
                (this.shouldAnimate = !0),
                  this.slideshow.flickityInstance.options.autoPlay &&
                    this.slideshow.flickityInstance.playPlayer();
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                (this._onBreakpointChangedListener =
                  this._onBreakpointChanged.bind(this)),
                  this.delegateElement.on(
                    "mouseenter",
                    ".Button",
                    this._pauseSlideshow.bind(this),
                    !0
                  ),
                  this.delegateElement.on(
                    "mouseleave",
                    ".Button",
                    this._resumeSlideshow.bind(this),
                    !0
                  ),
                  document.addEventListener(
                    "breakpoint:changed",
                    this._onBreakpointChangedListener
                  );
              },
            },
            {
              key: "_pauseSlideshow",
              value: function () {
                this.slideshow.flickityInstance.options.autoPlay &&
                  this.slideshow.flickityInstance.pausePlayer();
              },
            },
            {
              key: "_resumeSlideshow",
              value: function () {
                this.slideshow.flickityInstance.options.autoPlay &&
                  this.slideshow.flickityInstance.unpausePlayer();
              },
            },
            {
              key: "_onSlideChanged",
              value: function (index, element) {
                this._transitionToSlide(element);
              },
            },
            {
              key: "_transitionToSlide",
              value: function (slide) {
                var _this = this;
                this.timeline.clear(),
                  this.selectedSlide &&
                    (this._slideLeave(this.selectedSlide),
                    this.timeline.addLabel(
                      "enter",
                      this.shouldAnimate ? "-=0.4" : 0
                    )),
                  this._lazyLoadNextImage(),
                  this.timeline.fromTo(
                    slide,
                    this.selectedSlide && this.shouldAnimate ? 0.3 : 0,
                    { autoAlpha: 0 },
                    { autoAlpha: 1, ease: Cubic.easeInOut },
                    "enter"
                  ),
                  this.slideshow.flickityInstance.options.autoPlay &&
                    this.slideshow.flickityInstance.player.state ===
                      "playing" &&
                    this.slideshow.flickityInstance.pausePlayer(),
                  Dom.nodeListToArray(
                    slide.querySelectorAll(".Slideshow__Image")
                  ).forEach(function (image) {
                    image.classList.contains("Image--lazyLoading") ||
                    image.classList.contains("Image--lazyLoad")
                      ? image.addEventListener(
                          "lazyloaded",
                          _this._slideEnter.bind(_this, slide)
                        )
                      : _this._slideEnter(slide);
                  }),
                  (this.selectedSlide = slide);
              },
            },
            {
              key: "_slideLeave",
              value: function (slide) {
                var content = slide.querySelector(".SectionHeader"),
                  buttonWrapper = slide.querySelector(
                    ".SectionHeader__ButtonWrapper"
                  );
                this.timeline.fromTo(
                  slide,
                  this.shouldAnimate ? 0.3 : 0,
                  { autoAlpha: 1 },
                  {
                    autoAlpha: 0,
                    ease: Cubic.easeInOut,
                    delay: this.shouldAnimate ? 0.35 : 0,
                  }
                ),
                  content &&
                    this.timeline.fromTo(
                      content,
                      this.shouldAnimate ? 0.4 : 0,
                      { autoAlpha: 1, y: 0 },
                      { autoAlpha: 0, y: 20, ease: Cubic.easeIn },
                      0
                    ),
                  buttonWrapper &&
                    this.timeline.fromTo(
                      buttonWrapper,
                      this.shouldAnimate ? 0.4 : 0,
                      { autoAlpha: 1, y: 0 },
                      { autoAlpha: 0, y: 10, ease: Cubic.easeIn },
                      0
                    );
              },
            },
            {
              key: "_slideEnter",
              value: function (slide) {
                var images = slide.querySelectorAll(".Slideshow__Image"),
                  content = slide.querySelector(".SectionHeader"),
                  buttonWrapper = slide.querySelector(
                    ".SectionHeader__ButtonWrapper"
                  );
                this.slideshow.flickityInstance.options.autoPlay &&
                  this.slideshow.flickityInstance.player.state === "paused" &&
                  this.slideshow.flickityInstance.unpausePlayer(),
                  window.CSS &&
                    window.CSS.supports(
                      "(object-fit: cover) or (-o-object-fit: cover)"
                    ) &&
                    (window.theme.showImageZooming
                      ? this.timeline.fromTo(
                          images,
                          this.shouldAnimate ? 1.2 : 0,
                          { opacity: 0, scale: 1.2 },
                          { opacity: 1, scale: 1, ease: Quad.easeOut },
                          "enter"
                        )
                      : this.timeline.fromTo(
                          images,
                          this.shouldAnimate ? 1.2 : 0,
                          { opacity: 0 },
                          { opacity: 1, ease: Quad.easeOut },
                          "enter"
                        )),
                  content &&
                    this.timeline.fromTo(
                      content,
                      this.shouldAnimate ? 0.8 : 0,
                      { autoAlpha: 0, y: 30 },
                      {
                        autoAlpha: 1,
                        y: 0,
                        delay: this.shouldAnimate ? 0.8 : 0,
                        ease: Cubic.easeOut,
                      },
                      "enter"
                    ),
                  buttonWrapper &&
                    this.timeline.fromTo(
                      buttonWrapper,
                      this.shouldAnimate ? 0.8 : 0,
                      { autoAlpha: 0, y: 20 },
                      {
                        autoAlpha: 1,
                        y: 0,
                        delay: this.shouldAnimate ? 0.8 : 0,
                        ease: Cubic.easeOut,
                      },
                      "enter"
                    );
              },
            },
            {
              key: "_lazyLoadNextImage",
              value: function () {
                var currentIndex =
                    this.slideshow.flickityInstance.selectedIndex,
                  breakpoint = Responsive.getCurrentBreakpoint();
                if (
                  this.slideshow.flickityInstance.cells.length - 1 >
                  currentIndex
                ) {
                  var nextCellElement =
                      this.slideshow.flickityInstance.cells[currentIndex + 1]
                        .element,
                    imageContainers = Dom.nodeListToArray(
                      nextCellElement.querySelectorAll(
                        ".Slideshow__ImageContainer"
                      )
                    ),
                    imageToReveal = null;
                  breakpoint === "phone"
                    ? (imageToReveal = imageContainers[0])
                    : (imageToReveal = imageContainers[1]),
                    window.lazySizes &&
                      imageToReveal &&
                      imageToReveal.classList.contains("Image--lazyLoad") &&
                      lazySizes.loader.unveil(imageToReveal.firstElementChild);
                }
              },
            },
            {
              key: "_onBreakpointChanged",
              value: function (event) {
                ((event.detail.previousBreakpoint === "phone" &&
                  event.detail.currentBreakpoint !== "phone") ||
                  (event.detail.previousBreakpoint !== "phone" &&
                    event.detail.currentBreakpoint === "phone")) &&
                  ((this.selectedSlide = null),
                  this._transitionToSlide(
                    this.slideshow.flickityInstance.selectedElement
                  ));
              },
            },
          ]),
          SlideshowSection2
        );
      })(),
      TestimonialsSection = (function () {
        function TestimonialsSection2(container) {
          _classCallCheck(this, TestimonialsSection2),
            (this.element = container),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            (this.navItems = Dom.nodeListToArray(
              this.element.querySelectorAll(".TestimonialNav__Item")
            )),
            (this.carousel = new Carousel(
              this.element.querySelector(".TestimonialList"),
              { onSelect: this._testimonialChanged.bind(this) }
            )),
            this._attachListeners();
        }
        return (
          _createClass(TestimonialsSection2, [
            {
              key: "onUnload",
              value: function () {
                this.carousel.destroy(), this.delegateElement.off("click");
              },
            },
            {
              key: "onBlockSelect",
              value: function (event) {
                this.carousel.selectCell(
                  event.target.getAttribute("data-slide-index"),
                  !0
                );
              },
            },
            {
              key: "onBlockDeselect",
              value: function () {
                this.carousel.unpausePlayer();
              },
            },
            {
              key: "_testimonialClicked",
              value: function (event, target) {
                this.carousel.pausePlayer(),
                  this.carousel.selectCell(
                    parseInt(target.getAttribute("data-index"))
                  ),
                  this.carousel.unpausePlayer();
              },
            },
            {
              key: "_testimonialChanged",
              value: function (newIndex) {
                this.navItems.forEach(function (item, index) {
                  item.classList.remove("is-selected"),
                    newIndex === index && item.classList.add("is-selected");
                });
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                this.delegateElement.on(
                  "click",
                  ".TestimonialNav__Item",
                  this._testimonialClicked.bind(this)
                );
              },
            },
          ]),
          TestimonialsSection2
        );
      })(),
      TimelineSection = (function () {
        function TimelineSection2(container) {
          _classCallCheck(this, TimelineSection2),
            (this.element = container),
            (this.delegateElement = new domDelegate.Delegate(this.element)),
            (this.items = Dom.nodeListToArray(
              this.element.querySelectorAll(".Timeline__Item")
            )),
            (this.navItems = Dom.nodeListToArray(
              this.element.querySelectorAll(".Timeline__NavItem")
            )),
            this._attachListeners();
        }
        return (
          _createClass(TimelineSection2, [
            {
              key: "onUnload",
              value: function () {
                this.delegateElement.off("click");
              },
            },
            {
              key: "onBlockSelect",
              value: function (event) {
                this.navItems[
                  parseInt(event.target.getAttribute("data-index"))
                ].click();
              },
            },
            {
              key: "_attachListeners",
              value: function () {
                this.delegateElement.on(
                  "click",
                  ".Timeline__NavItem",
                  this._clickOnNavItem.bind(this)
                );
              },
            },
            {
              key: "_clickOnNavItem",
              value: function (event, target) {
                var newItem =
                  this.items[parseInt(target.getAttribute("data-index"))];
                if (!newItem.classList.contains("is-selected")) {
                  var isContentLarger = !1,
                    navWrapper = target.parentNode,
                    scrollableOffset = 0;
                  fastdom.measure(function () {
                    var scrollableWidth = navWrapper.scrollWidth,
                      visibleWidth = navWrapper.offsetWidth;
                    if (
                      ((isContentLarger = visibleWidth < scrollableWidth),
                      isContentLarger)
                    ) {
                      var beginBound = target.offsetLeft,
                        endBound = beginBound + target.offsetWidth,
                        closerToLeft = beginBound <= visibleWidth - endBound,
                        itemToUse = null;
                      closerToLeft
                        ? (itemToUse = target.previousElementSibling || target)
                        : (itemToUse = target.nextElementSibling || target);
                      var itemBeginBound =
                          itemToUse.offsetLeft - navWrapper.scrollLeft,
                        itemEndBound = itemBeginBound + itemToUse.offsetWidth;
                      itemEndBound > visibleWidth
                        ? (scrollableOffset = itemEndBound - visibleWidth)
                        : itemBeginBound < 0 &&
                          (scrollableOffset = itemBeginBound);
                    }
                  }),
                    fastdom.mutate(function () {
                      isContentLarger &&
                        navWrapper.scrollBy({
                          behavior: "smooth",
                          left: scrollableOffset,
                        }),
                        target.classList.add("is-selected"),
                        Dom.getSiblings(target, ".is-selected").forEach(
                          function (item) {
                            item.classList.remove("is-selected");
                          }
                        ),
                        newItem.classList.add("is-selected"),
                        Dom.getSiblings(newItem, ".is-selected").forEach(
                          function (item) {
                            item.classList.remove("is-selected");
                          }
                        );
                    });
                }
              },
            },
          ]),
          TimelineSection2
        );
      })(),
      PriceRange = (function (_HTMLElement) {
        _inherits(PriceRange2, _HTMLElement);
        var _super = _createSuper(PriceRange2);
        function PriceRange2() {
          return (
            _classCallCheck(this, PriceRange2), _super.apply(this, arguments)
          );
        }
        return (
          _createClass(PriceRange2, [
            {
              key: "connectedCallback",
              value: function () {
                var _this = this;
                (this.rangeLowerBound = this.querySelector(
                  ".price-range__range-group input:first-child"
                )),
                  (this.rangeHigherBound = this.querySelector(
                    ".price-range__range-group input:last-child"
                  )),
                  (this.textInputLowerBound = this.querySelector(
                    ".price-range__input:first-child input"
                  )),
                  (this.textInputHigherBound = this.querySelector(
                    ".price-range__input:last-child input"
                  )),
                  this.textInputLowerBound.addEventListener(
                    "focus",
                    function () {
                      return _this.textInputLowerBound.select();
                    }
                  ),
                  this.textInputHigherBound.addEventListener(
                    "focus",
                    function () {
                      return _this.textInputHigherBound.select();
                    }
                  ),
                  this.textInputLowerBound.addEventListener(
                    "change",
                    function (event) {
                      (event.target.value = Math.max(
                        Math.min(
                          parseInt(event.target.value),
                          parseInt(
                            _this.textInputHigherBound.value || event.target.max
                          ) - 1
                        ),
                        event.target.min
                      )),
                        (_this.rangeLowerBound.value = event.target.value),
                        _this.rangeLowerBound.parentElement.style.setProperty(
                          "--range-min",
                          "".concat(
                            (parseInt(_this.rangeLowerBound.value) /
                              parseInt(_this.rangeLowerBound.max)) *
                              100,
                            "%"
                          )
                        );
                    }
                  ),
                  this.textInputHigherBound.addEventListener(
                    "change",
                    function (event) {
                      (event.target.value = Math.min(
                        Math.max(
                          parseInt(event.target.value),
                          parseInt(
                            _this.textInputLowerBound.value || event.target.min
                          ) + 1
                        ),
                        event.target.max
                      )),
                        (_this.rangeHigherBound.value = event.target.value),
                        _this.rangeHigherBound.parentElement.style.setProperty(
                          "--range-max",
                          "".concat(
                            (parseInt(_this.rangeHigherBound.value) /
                              parseInt(_this.rangeHigherBound.max)) *
                              100,
                            "%"
                          )
                        );
                    }
                  ),
                  this.rangeLowerBound.addEventListener(
                    "change",
                    function (event) {
                      (_this.textInputLowerBound.value = event.target.value),
                        _this.textInputLowerBound.dispatchEvent(
                          new Event("change", { bubbles: !0 })
                        );
                    }
                  ),
                  this.rangeHigherBound.addEventListener(
                    "change",
                    function (event) {
                      (_this.textInputHigherBound.value = event.target.value),
                        _this.textInputHigherBound.dispatchEvent(
                          new Event("change", { bubbles: !0 })
                        );
                    }
                  ),
                  this.rangeLowerBound.addEventListener(
                    "input",
                    function (event) {
                      (event.target.value = Math.min(
                        parseInt(event.target.value),
                        parseInt(
                          _this.textInputHigherBound.value || event.target.max
                        ) - 1
                      )),
                        event.target.parentElement.style.setProperty(
                          "--range-min",
                          "".concat(
                            (parseInt(event.target.value) /
                              parseInt(event.target.max)) *
                              100,
                            "%"
                          )
                        ),
                        (_this.textInputLowerBound.value = event.target.value);
                    }
                  ),
                  this.rangeHigherBound.addEventListener(
                    "input",
                    function (event) {
                      (event.target.value = Math.max(
                        parseInt(event.target.value),
                        parseInt(
                          _this.textInputLowerBound.value || event.target.min
                        ) + 1
                      )),
                        event.target.parentElement.style.setProperty(
                          "--range-max",
                          "".concat(
                            (parseInt(event.target.value) /
                              parseInt(event.target.max)) *
                              100,
                            "%"
                          )
                        ),
                        (_this.textInputHigherBound.value = event.target.value);
                    }
                  );
              },
            },
          ]),
          PriceRange2
        );
      })(_wrapNativeSuper(HTMLElement));
    window.customElements.define("price-range", PriceRange),
      (function () {
        new Collapsible(),
          new Modal(),
          new Responsive(),
          window.theme.pageType !== "password" &&
            window.theme.pageType !== "gift_card" &&
            new LoadingBar();
        var sections = new SectionContainer();
        sections.register("header", HeaderSection),
          sections.register("footer", FooterSection),
          sections.register("sidebar-menu", SidebarMenuSection),
          sections.register("cart", CartSection),
          sections.register("newsletter-popup", NewsletterPopupSection),
          sections.register("slideshow", SlideshowSection),
          sections.register("collection-list", CollectionListSection),
          sections.register("article-list", ArticleList),
          sections.register("featured-product", FeaturedProductSection),
          sections.register("image-with-text-block", ImageWithTextBlockSection),
          sections.register("timeline", TimelineSection),
          sections.register("map", MapSection),
          sections.register("featured-collections", FeaturedCollectionsSection),
          sections.register("shop-the-look", ShopTheLookSection),
          sections.register("testimonials", TestimonialsSection),
          sections.register("background-video", BackgroundVideoSection),
          sections.register("product", ProductSection),
          sections.register(
            "product-recommendations",
            ProductRecommendationsSection
          ),
          sections.register("collection", CollectionSection),
          sections.register("article-list", ArticleList),
          sections.register("article", ArticleSection),
          sections.register("faq", FaqSection),
          sections.register("login", LoginSection),
          sections.register("addresses", AddressesSection),
          sections.register("gift-card", GiftCardSection),
          sections.register(
            "recently-viewed-products",
            RecentlyViewedProductsSection
          ),
          sections.register("shop-now", ShopNowSection),
          (Flickity.defaults.dragThreshold = 7),
          (function () {
            var touchingCarousel = !1,
              touchStartCoords;
            document.body.addEventListener("touchstart", function (e) {
              if (e.target.closest(".flickity-slider")) touchingCarousel = !0;
              else {
                touchingCarousel = !1;
                return;
              }
              touchStartCoords = {
                x: e.touches[0].pageX,
                y: e.touches[0].pageY,
              };
            }),
              document.body.addEventListener(
                "touchmove",
                function (e) {
                  if (touchingCarousel && e.cancelable) {
                    var moveVector = {
                      x: e.touches[0].pageX - touchStartCoords.x,
                      y: e.touches[0].pageY - touchStartCoords.y,
                    };
                    Math.abs(moveVector.x) > Flickity.defaults.dragThreshold &&
                      e.preventDefault();
                  }
                },
                { passive: !1 }
              );
          })(),
          (function () {
            if (window.Flickity) {
              var originalResizeMethod = window.Flickity.prototype.resize,
                lastWidth = window.innerWidth;
              window.Flickity.prototype.resize = function () {
                (window.innerWidth === lastWidth && this.maxCellHeight > 0) ||
                  ((lastWidth = window.innerWidth),
                  originalResizeMethod.apply(this, arguments));
              };
            }
          })(),
          (function () {
            Dom.nodeListToArray(
              document.querySelectorAll(".Rte table")
            ).forEach(function (table) {
              table.outerHTML =
                '<div class="TableWrapper">' + table.outerHTML + "</div>";
            }),
              Dom.nodeListToArray(
                document.querySelectorAll(".Rte iframe")
              ).forEach(function (iframe) {
                (iframe.src.indexOf("youtube") !== -1 ||
                  iframe.src.indexOf("youtu.be") !== -1 ||
                  iframe.src.indexOf("vimeo") !== -1) &&
                  ((iframe.outerHTML =
                    '<div class="VideoWrapper">' + iframe.outerHTML + "</div>"),
                  (iframe.src = iframe.src));
              });
          })(),
          (function () {
            var documentDelegate = new domDelegate.Delegate(document.body),
              announcementBar = document.querySelector(".AnnouncementBar");
            documentDelegate.on(
              "click",
              '[href^="#"], [data-href]',
              function (event, target) {
                var selector = target.hasAttribute("href")
                  ? target.getAttribute("href")
                  : target.getAttribute("data-href");
                if (!(selector === "#" || selector === "#main")) {
                  var element = document.querySelector(selector),
                    offset = parseInt(target.getAttribute("data-offset") || 0);
                  if (
                    (announcementBar &&
                      (offset -= announcementBar.clientHeight),
                    target.hasAttribute("data-focus-on-click"))
                  ) {
                    var prevScrollY = window.pageYOffset;
                    element.focus({ preventScroll: !0 }),
                      window.pageYOffset !== prevScrollY &&
                        window.scrollTo(window.pageXOffset, prevScrollY),
                      element.focus();
                  }
                  window.scrollTo({
                    behavior: "smooth",
                    top: element.offsetTop - offset,
                  }),
                    event.preventDefault();
                }
              }
            );
          })(),
          (function () {
            var windowWidth = window.innerWidth,
              headerSection = document.getElementById("shopify-section-header");
            window.addEventListener("resize", function () {
              var newWidth = -1;
              fastdom.measure(function () {
                newWidth = window.innerWidth;
              }),
                fastdom.mutate(function () {
                  newWidth !== windowWidth &&
                    ((windowWidth = newWidth),
                    document.documentElement.style.setProperty(
                      "--window-height",
                      window.innerHeight + "px"
                    ),
                    headerSection &&
                      document.documentElement.style.setProperty(
                        "--header-height",
                        headerSection.clientHeight + "px"
                      ));
                });
            });
          })(),
          (function () {
            function handleFirstTab(event) {
              event.keyCode === 9 &&
                (document.body.classList.add("is-tabbing"),
                window.removeEventListener("keydown", handleFirstTab));
            }
            window.addEventListener("keydown", handleFirstTab);
          })(),
          window.theme.showPageTransition && PageTransition.getInstance();
      })();
  });
  //# sourceMappingURL=/s/files/1/0013/2146/8022/t/45/assets/theme.js.map?v=69766538163165777771684244781
}
/*
     FILE ARCHIVED ON 21:24:50 May 19, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:48:57 Jan 08, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.691
  exclusion.robots: 0.079
  exclusion.robots.policy: 0.068
  esindex: 0.013
  cdx.remote: 6.784
  LoadShardBlock: 97.694 (3)
  PetaboxLoader3.datanode: 167.23 (5)
  PetaboxLoader3.resolve: 61.811 (2)
  load_resource: 154.735
  loaddict: 75.326
*/
