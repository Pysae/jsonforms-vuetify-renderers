'use strict';

var core = require('@jsonforms/core');
var vue = require('vue');
var vue$1 = require('@jsonforms/vue');
var components = require('vuetify/components');
var cloneDeep = require('lodash/cloneDeep');
var debounce = require('lodash/debounce');
var merge = require('lodash/merge');
var get = require('lodash/get');
var isPlainObject = require('lodash/isPlainObject');
var mergeWith = require('lodash/mergeWith');
var dayjs = require('dayjs');
var customParsing = require('dayjs/plugin/customParseFormat');
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
var findIndex = require('lodash/findIndex');
var omit = require('lodash/omit');
var startCase = require('lodash/startCase');
var isEmpty = require('lodash/isEmpty');
var isObject = require('lodash/isObject');
var isArray = require('lodash/isArray');
var every = require('lodash/every');
var isString = require('lodash/isString');

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function () {};
      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var defaultStyles = {
  control: {
    root: 'control',
    input: 'input'
  },
  verticalLayout: {
    root: 'vertical-layout',
    item: 'vertical-layout-item'
  },
  horizontalLayout: {
    root: 'horizontal-layout',
    item: 'horizontal-layout-item'
  },
  group: {
    root: 'group',
    label: 'group-label',
    item: 'group-item',
    bare: 'group-bare',
    alignLeft: 'group-align-left'
  },
  arrayList: {
    root: 'array-list',
    toolbar: 'array-list-toolbar',
    title: 'array-list-title',
    validationIcon: 'array-list-validation',
    addButton: 'array-list-add',
    label: 'array-list-label',
    noData: 'array-list-no-data',
    item: 'array-list-item',
    itemHeader: 'array-list-item-header',
    itemLabel: 'array-list-item-label',
    itemContent: 'array-list-item-content',
    itemMoveUp: 'array-list-item-move-up',
    itemMoveDown: 'array-list-item-move-down',
    itemDelete: 'array-list-item-delete'
  },
  listWithDetail: {
    root: 'list-with-detail',
    toolbar: 'list-with-detail-toolbar',
    addButton: 'list-with-detail-add',
    label: 'list-with-detail-label',
    noData: 'list-with-detail-no-data',
    item: 'list-with-detail-item',
    itemLabel: 'list-with-detail-item-label',
    itemContent: 'list-with-detail-item-content',
    itemMoveUp: 'list-with-detail-item-move-up',
    itemMoveDown: 'list-with-detail-item-move-down',
    itemDelete: 'list-with-detail-item-delete'
  },
  label: {
    root: 'label-element'
  },
  categorization: {
    root: 'categorization'
  }
};

var createEmptyStyles = function createEmptyStyles() {
  return {
    control: {},
    verticalLayout: {},
    horizontalLayout: {},
    group: {},
    arrayList: {},
    listWithDetail: {},
    label: {},
    categorization: {}
  };
};
var useStyles = function useStyles(element) {
  var _element$options, _element$options2;
  var userStyles = vue.inject('styles', defaultStyles);
  if (!(element !== null && element !== void 0 && (_element$options = element.options) !== null && _element$options !== void 0 && _element$options.styles)) {
    return userStyles;
  }
  var styles = createEmptyStyles();
  if (userStyles) {
    merge(styles, userStyles);
  } else {
    merge(styles, defaultStyles);
  }
  if (element !== null && element !== void 0 && (_element$options2 = element.options) !== null && _element$options2 !== void 0 && _element$options2.styles) {
    merge(styles, element.options.styles);
  }
  return styles;
};

var classes = function classes(strings) {
  for (var _len = arguments.length, variables = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    variables[_key - 1] = arguments[_key];
  }
  return strings.reduce(function (acc, curr, index) {
    return "".concat(acc).concat(curr).concat(variables[index] || '');
  }, '').trim();
};
var mergeStyles = function mergeStyles(stylesA, stylesB) {
  var styles = cloneDeep(stylesA);
  mergeWith(styles, stylesB, function (aValue, bValue) {
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return "".concat(aValue, " ").concat(bValue);
    }
    return undefined;
  });
  return styles;
};

var useControlAppliedOptions = function useControlAppliedOptions(input) {
  return vue.computed(function () {
    return merge({}, cloneDeep(input.control.value.config), cloneDeep(input.control.value.uischema.options));
  });
};
var useComputedLabel = function useComputedLabel(input, appliedOptions) {
  return vue.computed(function () {
    var _appliedOptions$value;
    return core.computeLabel(input.control.value.label, input.control.value.required, !!((_appliedOptions$value = appliedOptions.value) !== null && _appliedOptions$value !== void 0 && _appliedOptions$value.hideRequiredAsterisk));
  });
};
var useVuetifyLabel = function useVuetifyLabel(input) {
  var styles = useStyles(input.label.value.uischema);
  var appliedOptions = vue.computed(function () {
    return merge({}, cloneDeep(input.label.value.config), cloneDeep(input.label.value.uischema.options));
  });
  var vuetifyProps = function vuetifyProps(path) {
    var _appliedOptions$value2;
    var props = get((_appliedOptions$value2 = appliedOptions.value) === null || _appliedOptions$value2 === void 0 ? void 0 : _appliedOptions$value2.vuetify, path);
    return props && isPlainObject(props) ? props : {};
  };
  return _objectSpread2(_objectSpread2({}, input), {}, {
    appliedOptions: appliedOptions,
    vuetifyProps: vuetifyProps,
    styles: styles
  });
};
var useVuetifyControl = function useVuetifyControl(input) {
  var adaptValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (v) {
    return v;
  };
  var debounceWait = arguments.length > 2 ? arguments[2] : undefined;
  var touched = vue.ref(false);
  var changeEmitter = typeof debounceWait === 'number' ? debounce(input.handleChange, debounceWait) : input.handleChange;
  var onChange = function onChange(value) {
    changeEmitter(input.control.value.path, adaptValue(value));
  };
  var appliedOptions = useControlAppliedOptions(input);
  var isFocused = vue.ref(false);
  var handleFocus = function handleFocus() {
    isFocused.value = true;
  };
  var handleBlur = function handleBlur() {
    touched.value = true;
    isFocused.value = false;
  };
  var filteredErrors = vue.computed(function () {
    return touched.value || !appliedOptions.value.enableFilterErrorsBeforeTouch ? input.control.value.errors : '';
  });
  var persistentHint = function persistentHint() {
    var _appliedOptions$value3;
    return !core.isDescriptionHidden(input.control.value.visible, input.control.value.description, isFocused.value, !!((_appliedOptions$value3 = appliedOptions.value) !== null && _appliedOptions$value3 !== void 0 && _appliedOptions$value3.showUnfocusedDescription));
  };
  var computedLabel = useComputedLabel(input, appliedOptions);
  var controlWrapper = vue.computed(function () {
    var _input$control$value = input.control.value,
      id = _input$control$value.id,
      description = _input$control$value.description,
      errors = _input$control$value.errors,
      label = _input$control$value.label,
      visible = _input$control$value.visible,
      required = _input$control$value.required;
    return {
      id: id,
      description: description,
      errors: errors,
      label: label,
      visible: visible,
      required: required
    };
  });
  var styles = useStyles(input.control.value.uischema);
  var vuetifyProps = function vuetifyProps(path) {
    var _appliedOptions$value4;
    var props = get((_appliedOptions$value4 = appliedOptions.value) === null || _appliedOptions$value4 === void 0 ? void 0 : _appliedOptions$value4.vuetify, path);
    return props && isPlainObject(props) ? props : {};
  };
  var overwrittenControl = vue.computed(function () {
    return _objectSpread2(_objectSpread2({}, input.control.value), {}, {
      errors: filteredErrors.value
    });
  });
  var rawErrors = vue.computed(function () {
    return input.control.value.errors;
  });
  return _objectSpread2(_objectSpread2({}, input), {}, {
    control: overwrittenControl,
    styles: styles,
    isFocused: isFocused,
    appliedOptions: appliedOptions,
    controlWrapper: controlWrapper,
    onChange: onChange,
    vuetifyProps: vuetifyProps,
    persistentHint: persistentHint,
    computedLabel: computedLabel,
    touched: touched,
    handleBlur: handleBlur,
    handleFocus: handleFocus,
    rawErrors: rawErrors
  });
};
var useTranslator = function useTranslator() {
  var jsonforms = vue.inject('jsonforms');
  if (!jsonforms) {
    throw new Error("'jsonforms couldn't be injected. Are you within JSON Forms?");
  }
  if (!jsonforms.i18n || !jsonforms.i18n.translate) {
    throw new Error("'jsonforms i18n couldn't be injected. Are you within JSON Forms?");
  }
  var translate = vue.computed(function () {
    return jsonforms.i18n.translate;
  });
  return translate;
};
var useVuetifyLayout = function useVuetifyLayout(input) {
  var appliedOptions = vue.computed(function () {
    return merge({}, cloneDeep(input.layout.value.config), cloneDeep(input.layout.value.uischema.options));
  });
  var vuetifyProps = function vuetifyProps(path) {
    var _appliedOptions$value5;
    var props = get((_appliedOptions$value5 = appliedOptions.value) === null || _appliedOptions$value5 === void 0 ? void 0 : _appliedOptions$value5.vuetify, path);
    return props && isPlainObject(props) ? props : {};
  };
  return _objectSpread2(_objectSpread2({}, input), {}, {
    styles: useStyles(input.layout.value.uischema),
    appliedOptions: appliedOptions,
    vuetifyProps: vuetifyProps
  });
};
var useVuetifyArrayControl = function useVuetifyArrayControl(input) {
  var appliedOptions = useControlAppliedOptions(input);
  var computedLabel = useComputedLabel(input, appliedOptions);
  var vuetifyProps = function vuetifyProps(path) {
    var _appliedOptions$value6;
    var props = get((_appliedOptions$value6 = appliedOptions.value) === null || _appliedOptions$value6 === void 0 ? void 0 : _appliedOptions$value6.vuetify, path);
    return props && isPlainObject(props) ? props : {};
  };
  var childLabelForIndex = function childLabelForIndex(index) {
    var _input$control$value$, _input$control$value$2;
    if (index === null) {
      return '';
    }
    var childLabelProp = (_input$control$value$ = (_input$control$value$2 = input.control.value.uischema.options) === null || _input$control$value$2 === void 0 ? void 0 : _input$control$value$2.childLabelProp) !== null && _input$control$value$ !== void 0 ? _input$control$value$ : core.getFirstPrimitiveProp(input.control.value.schema);
    if (!childLabelProp) {
      return "".concat(index);
    }
    var labelValue = core.Resolve.data(input.control.value.data, core.composePaths("".concat(index), childLabelProp));
    if (labelValue === undefined || labelValue === null || Number.isNaN(labelValue)) {
      return '';
    }
    return "".concat(labelValue);
  };
  var filteredChildErrors = vue.computed(function () {
    var _appliedOptions$value7;
    var filtered = (_appliedOptions$value7 = appliedOptions.value) !== null && _appliedOptions$value7 !== void 0 && _appliedOptions$value7.enableFilterErrorsBeforeTouch ? [] : input.control.value.childErrors;
    return filtered;
  });
  var overwrittenControl = vue.computed(function () {
    return _objectSpread2(_objectSpread2({}, input.control.value), {}, {
      childErrors: filteredChildErrors.value
    });
  });
  return _objectSpread2(_objectSpread2({}, input), {}, {
    control: overwrittenControl,
    styles: useStyles(input.control.value.uischema),
    appliedOptions: appliedOptions,
    childLabelForIndex: childLabelForIndex,
    computedLabel: computedLabel,
    vuetifyProps: vuetifyProps,
    rawChildErrors: input.control.value.childErrors
  });
};
var useVuetifyBasicControl = function useVuetifyBasicControl(input) {
  var appliedOptions = useControlAppliedOptions(input);
  var vuetifyProps = function vuetifyProps(path) {
    var _appliedOptions$value8;
    var props = get((_appliedOptions$value8 = appliedOptions.value) === null || _appliedOptions$value8 === void 0 ? void 0 : _appliedOptions$value8.vuetify, path);
    return props && isPlainObject(props) ? props : {};
  };
  return _objectSpread2(_objectSpread2({}, input), {}, {
    styles: useStyles(input.control.value.uischema),
    appliedOptions: appliedOptions,
    vuetifyProps: vuetifyProps
  });
};
var useAjv = function useAjv() {
  var _jsonforms$core;
  var jsonforms = vue.inject('jsonforms');
  if (!jsonforms) {
    throw new Error("'jsonforms' couldn't be injected. Are you within JSON Forms?");
  }
  return (_jsonforms$core = jsonforms.core) === null || _jsonforms$core === void 0 ? void 0 : _jsonforms$core.ajv;
};
var useNested = function useNested(element) {
  var nestedInfo = vue.inject('jsonforms.nestedInfo', {
    level: 0
  });
  if (element) {
    vue.provide('jsonforms.nestedInfo', {
      level: nestedInfo.level + 1,
      parentElement: element
    });
  }
  return nestedInfo;
};

var createAjv = function createAjv(options) {
  var ajv = core.createAjv(options);
  ajv.addFormat('password', function (_) {
    return true;
  });
  return ajv;
};

dayjs.extend(customParsing);
dayjs.extend(utc);
dayjs.extend(timezone);
var parseDateTime = function parseDateTime(data, format) {
  if (!data) {
    return null;
  }
  var dayjsData = dayjs(data, format);
  if (!dayjsData.isValid()) {
    return null;
  }
  return dayjsData;
};

var i18nDefaultMessages = {
  arraylayout: {
    add: 'Add',
    "delete": 'Delete',
    moveUp: 'Move Up',
    moveDown: 'Move Down',
    dialogTitle: 'Delete {{ element }}?',
    dialogText: 'The element will be deleted.',
    dialogConfirm: 'Delete',
    dialogCancel: 'Cancel'
  }
};

var labelRenderer = vue.defineComponent({
  name: 'label-renderer',
  components: {
    DispatchRenderer: vue$1.DispatchRenderer,
    VLabel: components.VLabel
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    return useVuetifyLabel(vue$1.useJsonFormsLabel(props));
  }
});
var entry$u = {
  renderer: labelRenderer,
  tester: core.rankWith(1, core.uiTypeIs('Label'))
};

function render$z(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_label = vue.resolveComponent("v-label");
  return _ctx.label.visible ? (vue.openBlock(), vue.createBlock(_component_v_label, vue.mergeProps({
    key: 0,
    "class": _ctx.styles.label.root
  }, _ctx.vuetifyProps('v-label')), {
    "default": vue.withCtx(function () {
      return [vue.createTextVNode(vue.toDisplayString(_ctx.label.text), 1)];
    }),
    _: 1
  }, 16, ["class"])) : vue.createCommentVNode("", true);
}

labelRenderer.render = render$z;

var additionalRenderers = [entry$u
];

var script$4 = vue.defineComponent({
  name: 'validation-badge',
  components: {
    VBadge: components.VBadge,
    VTooltip: components.VTooltip
  },
  props: {
    errors: {
      required: true,
      type: Array
    },
    bordered: {
      type: Boolean,
      "default": false
    },
    color: {
      type: String,
      "default": 'error'
    },
    inline: {
      type: Boolean,
      "default": false
    },
    offsetX: {
      type: [Number, String],
      "default": undefined
    },
    offsetY: {
      type: [Number, String],
      "default": undefined
    },
    overlap: {
      type: Boolean,
      "default": false
    }
  },
  computed: {
    tooltipMessages: function tooltipMessages() {
      var error = [];
      var _iterator = _createForOfIteratorHelper(this.errors),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var e = _step.value;
          var errorObject = e;
          var index = findIndex(error, {
            schemaPath: errorObject.schemaPath
          });
          if (errorObject.message) {
            if (index == -1) {
              error.push({
                schemaPath: errorObject.schemaPath,
                instancePath: errorObject.instancePath,
                labels: [core.createLabelDescriptionFrom(core.createControlElement(errorObject.instancePath), errorObject.schema).text],
                message: errorObject.message
              });
            } else {
              error[index].labels.push(core.createLabelDescriptionFrom(core.createControlElement(errorObject.instancePath), errorObject.schema).text);
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return error.map(function (v) {
        return v.labels.join(',') + ': ' + v.message;
      });
    }
  }
});

var _hoisted_1$9 = vue.createElementVNode("p", null, "Validation Errors", -1);
function render$y(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_badge = vue.resolveComponent("v-badge");
  var _component_v_tooltip = vue.resolveComponent("v-tooltip");
  return vue.openBlock(), vue.createElementBlock("div", null, [_ctx.errors.length > 0 ? (vue.openBlock(), vue.createBlock(_component_v_tooltip, {
    key: 0,
    bottom: ""
  }, {
    activator: vue.withCtx(function (_ref) {
      var props = _ref.props;
      return [vue.createVNode(_component_v_badge, {
        color: _ctx.color,
        bordered: _ctx.bordered,
        inline: _ctx.inline,
        offsetX: _ctx.offsetX,
        offsetY: _ctx.offsetY,
        overlap: _ctx.overlap
      }, {
        badge: vue.withCtx(function () {
          return [vue.createTextVNode(vue.toDisplayString(_ctx.errors.length), 1)];
        }),
        "default": vue.withCtx(function () {
          return [vue.createElementVNode("div", vue.normalizeProps(vue.guardReactiveProps(props)), [vue.renderSlot(_ctx.$slots, "default")], 16)];
        }),
        _: 2
      }, 1032, ["color", "bordered", "inline", "offsetX", "offsetY", "overlap"])];
    }),
    "default": vue.withCtx(function () {
      return [_hoisted_1$9, (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.tooltipMessages, function (message, index) {
        return vue.openBlock(), vue.createElementBlock("p", {
          key: "".concat(index),
          "class": "mb-0"
        }, vue.toDisplayString(message), 1);
      }), 128))];
    }),
    _: 3
  })) : vue.renderSlot(_ctx.$slots, "default", {
    key: 1
  })]);
}

script$4.render = render$y;

var script$3 = vue.defineComponent({
  name: 'validation-icon',
  components: {
    ValidationBadge: script$4,
    VIcon: components.VIcon
  },
  props: {
    errors: {
      required: true,
      type: Array
    }
  }
});

function render$x(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_icon = vue.resolveComponent("v-icon");
  var _component_validation_badge = vue.resolveComponent("validation-badge");
  return _ctx.errors && _ctx.errors.length > 0 ? (vue.openBlock(), vue.createBlock(_component_validation_badge, {
    key: 0,
    errors: _ctx.errors
  }, {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_icon, {
        color: "error"
      }, {
        "default": vue.withCtx(function () {
          return [vue.createTextVNode("mdi-alert-circle-outline")];
        }),
        _: 1
      })];
    }),
    _: 1
  }, 8, ["errors"])) : vue.createCommentVNode("", true);
}

script$3.render = render$x;

var controlRenderer$p = vue.defineComponent({
  name: 'array-layout-renderer',
  components: {
    DispatchRenderer: vue$1.DispatchRenderer,
    VCard: components.VCard,
    VCardActions: components.VCardActions,
    VCardTitle: components.VCardTitle,
    VCardText: components.VCardText,
    VAvatar: components.VAvatar,
    VDialog: components.VDialog,
    VRow: components.VRow,
    VCol: components.VCol,
    VToolbar: components.VToolbar,
    VToolbarTitle: components.VToolbarTitle,
    VTooltip: components.VTooltip,
    VIcon: components.VIcon,
    VBtn: components.VBtn,
    VSpacer: components.VSpacer,
    VExpansionPanels: components.VExpansionPanels,
    VExpansionPanel: components.VExpansionPanel,
    VExpansionPanelTitle: components.VExpansionPanelTitle,
    VExpansionPanelText: components.VExpansionPanelText,
    VContainer: components.VContainer,
    ValidationIcon: script$3,
    ValidationBadge: script$4
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    var control = useVuetifyArrayControl(vue$1.useJsonFormsArrayControl(props));
    var currentlyExpanded = vue.ref(control.appliedOptions.value.initCollapsed ? null : 0);
    var expansionPanelsProps = vue.computed(function () {
      return merge({
        flat: false,
        focusable: true
      }, control.vuetifyProps('v-expansion-panels'));
    });
    var cardProps = vue.computed(function () {
      return control.vuetifyProps('v-card');
    });
    var suggestToDelete = vue.ref(null);
    useNested('array');
    var t = useTranslator();
    return _objectSpread2(_objectSpread2({}, control), {}, {
      currentlyExpanded: currentlyExpanded,
      cardProps: cardProps,
      expansionPanelsProps: expansionPanelsProps,
      suggestToDelete: suggestToDelete,
      t: t
    });
  },
  computed: {
    addDisabled: function addDisabled() {
      return !this.control.enabled || this.appliedOptions.restrict && this.arraySchema !== undefined && this.arraySchema.maxItems !== undefined && this.dataLength >= this.arraySchema.maxItems;
    },
    dataLength: function dataLength() {
      return this.control.data ? this.control.data.length : 0;
    },
    foundUISchema: function foundUISchema() {
      return core.findUISchema(this.control.uischemas, this.control.schema, this.control.uischema.scope, this.control.path, undefined, this.control.uischema, this.control.rootSchema);
    },
    arraySchema: function arraySchema() {
      return core.Resolve.schema(this.control.rootSchema, this.control.uischema.scope, this.control.rootSchema);
    },
    hideAvatar: function hideAvatar() {
      return !!this.appliedOptions.hideAvatar;
    },
    translatedLabels: function translatedLabels() {
      var elementToDeleteText = this.childLabelForIndex(this.suggestToDelete);
      return {
        add: this.translateLabel('add'),
        "delete": this.translateLabel('delete'),
        moveUp: this.translateLabel('moveUp'),
        moveDown: this.translateLabel('moveDown'),
        dialogTitle: this.translateLabel('dialogTitle', {
          element: elementToDeleteText
        }, function (message) {
          return message.replace(/\{\{\s?element\s?\}\}/, elementToDeleteText || 'element');
        }),
        dialogText: this.translateLabel('dialogText'),
        dialogCancel: this.translateLabel('dialogCancel'),
        dialogConfirm: this.translateLabel('dialogConfirm')
      };
    }
  },
  methods: {
    composePaths: core.composePaths,
    createDefaultValue: core.createDefaultValue,
    addButtonClick: function addButtonClick() {
      var _this$control$data;
      this.addItem(this.control.path, core.createDefaultValue(this.control.schema, this.control.rootSchema))();
      if (!this.appliedOptions.collapseNewItems && (_this$control$data = this.control.data) !== null && _this$control$data !== void 0 && _this$control$data.length) {
        this.currentlyExpanded = this.dataLength - 1;
      }
    },
    moveUpClick: function moveUpClick(event, toMove) {
      var _this$moveUp;
      event.stopPropagation();
      (_this$moveUp = this.moveUp) === null || _this$moveUp === void 0 ? void 0 : _this$moveUp.call(this, this.control.path, toMove)();
    },
    moveDownClick: function moveDownClick(event, toMove) {
      var _this$moveDown;
      event.stopPropagation();
      (_this$moveDown = this.moveDown) === null || _this$moveDown === void 0 ? void 0 : _this$moveDown.call(this, this.control.path, toMove)();
    },
    removeItemsClick: function removeItemsClick(toDelete) {
      if (toDelete !== null) {
        var _this$removeItems;
        (_this$removeItems = this.removeItems) === null || _this$removeItems === void 0 ? void 0 : _this$removeItems.call(this, this.control.path, toDelete)();
      }
    },
    childErrors: function childErrors(index) {
      var _this = this;
      return this.control.childErrors.filter(function (e) {
        var errorDataPath = core.getControlPath(e);
        return errorDataPath.startsWith(_this.composePaths(_this.control.path, "".concat(index)));
      });
    },
    translateLabel: function translateLabel(labelType) {
      var additionalContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var transformMessage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (text) {
        return text;
      };
      var i18nKey = core.getI18nKey(this.arraySchema, this.control.uischema, this.control.path, labelType);
      var context = _objectSpread2({
        schema: this.control.schema,
        uischema: this.control.uischema,
        path: this.control.path,
        data: this.control.data
      }, additionalContext);
      var translation = this.t(i18nKey, undefined, context);
      if (translation !== undefined) {
        return translation;
      }
      return this.t("arraylayout.".concat(labelType), transformMessage(i18nDefaultMessages.arraylayout[labelType]), context);
    }
  }
});
var entry$t = {
  renderer: controlRenderer$p,
  tester: core.rankWith(4, core.isObjectArrayWithNesting)
};

var _hoisted_1$8 = {
  "class": "primary--text text--lighten-5"
};
function render$w(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_toolbar_title = vue.resolveComponent("v-toolbar-title");
  var _component_validation_icon = vue.resolveComponent("validation-icon");
  var _component_v_spacer = vue.resolveComponent("v-spacer");
  var _component_v_icon = vue.resolveComponent("v-icon");
  var _component_v_btn = vue.resolveComponent("v-btn");
  var _component_v_tooltip = vue.resolveComponent("v-tooltip");
  var _component_v_toolbar = vue.resolveComponent("v-toolbar");
  var _component_v_card_title = vue.resolveComponent("v-card-title");
  var _component_v_avatar = vue.resolveComponent("v-avatar");
  var _component_validation_badge = vue.resolveComponent("validation-badge");
  var _component_v_col = vue.resolveComponent("v-col");
  var _component_v_row = vue.resolveComponent("v-row");
  var _component_v_container = vue.resolveComponent("v-container");
  var _component_v_expansion_panel_title = vue.resolveComponent("v-expansion-panel-title");
  var _component_dispatch_renderer = vue.resolveComponent("dispatch-renderer");
  var _component_v_expansion_panel_text = vue.resolveComponent("v-expansion-panel-text");
  var _component_v_expansion_panel = vue.resolveComponent("v-expansion-panel");
  var _component_v_expansion_panels = vue.resolveComponent("v-expansion-panels");
  var _component_v_card_text = vue.resolveComponent("v-card-text");
  var _component_v_card_actions = vue.resolveComponent("v-card-actions");
  var _component_v_card = vue.resolveComponent("v-card");
  var _component_v_dialog = vue.resolveComponent("v-dialog");
  return _ctx.control.visible ? (vue.openBlock(), vue.createBlock(_component_v_card, vue.mergeProps({
    key: 0,
    "class": _ctx.styles.arrayList.root
  }, _ctx.cardProps), {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_card_title, {
        "class": vue.normalizeClass(_ctx.styles.arrayList.title)
      }, {
        "default": vue.withCtx(function () {
          return [vue.createVNode(_component_v_toolbar, {
            flat: "",
            "class": vue.normalizeClass(_ctx.styles.arrayList.toolbar)
          }, {
            "default": vue.withCtx(function () {
              return [vue.createVNode(_component_v_toolbar_title, {
                "class": vue.normalizeClass(_ctx.styles.arrayList.label)
              }, {
                "default": vue.withCtx(function () {
                  return [vue.createTextVNode(vue.toDisplayString(_ctx.computedLabel), 1)];
                }),
                _: 1
              }, 8, ["class"]), _ctx.control.childErrors.length > 0 && !_ctx.appliedOptions.hideArraySummaryValidation ? (vue.openBlock(), vue.createBlock(_component_validation_icon, {
                key: 0,
                errors: _ctx.control.childErrors,
                "class": vue.normalizeClass(_ctx.styles.arrayList.validationIcon)
              }, null, 8, ["errors", "class"])) : vue.createCommentVNode("", true), vue.createVNode(_component_v_spacer), vue.renderSlot(_ctx.$slots, "toolbar-elements", {
                labels: _ctx.translatedLabels,
                addClass: _ctx.styles.arrayList.addButton,
                addDisabled: _ctx.addDisabled,
                addClick: _ctx.addButtonClick,
                control: _ctx.control,
                appliedOptions: _ctx.appliedOptions,
                styles: _ctx.styles
              }, function () {
                return [vue.createVNode(_component_v_tooltip, {
                  bottom: ""
                }, {
                  activator: vue.withCtx(function (_ref) {
                    var props = _ref.props;
                    return [vue.createVNode(_component_v_btn, vue.mergeProps({
                      fab: "",
                      text: "",
                      elevation: "0",
                      small: "",
                      "aria-label": _ctx.translatedLabels.add
                    }, props, {
                      "class": _ctx.styles.arrayList.addButton,
                      disabled: _ctx.addDisabled,
                      onClick: _ctx.addButtonClick
                    }), {
                      "default": vue.withCtx(function () {
                        return [vue.createVNode(_component_v_icon, null, {
                          "default": vue.withCtx(function () {
                            return [vue.createTextVNode("mdi-plus")];
                          }),
                          _: 1
                        })];
                      }),
                      _: 2
                    }, 1040, ["aria-label", "class", "disabled", "onClick"])];
                  }),
                  "default": vue.withCtx(function () {
                    return [vue.createTextVNode(" " + vue.toDisplayString(_ctx.translatedLabels.add), 1)];
                  }),
                  _: 1
                })];
              })];
            }),
            _: 3
          }, 8, ["class"])];
        }),
        _: 3
      }, 8, ["class"]), vue.createVNode(_component_v_card_text, null, {
        "default": vue.withCtx(function () {
          return [vue.createVNode(_component_v_container, {
            "justify-space-around": "",
            "align-content-center": "",
            "class": vue.normalizeClass(_ctx.styles.arrayList.container)
          }, {
            "default": vue.withCtx(function () {
              return [vue.createVNode(_component_v_row, {
                justify: "center"
              }, {
                "default": vue.withCtx(function () {
                  return [vue.createVNode(_component_v_expansion_panels, vue.mergeProps({
                    accordion: ""
                  }, _ctx.expansionPanelsProps, {
                    modelValue: _ctx.currentlyExpanded,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
                      return _ctx.currentlyExpanded = $event;
                    })
                  }), {
                    "default": vue.withCtx(function () {
                      return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.control.data, function (_element, index) {
                        return vue.openBlock(), vue.createBlock(_component_v_expansion_panel, {
                          key: "".concat(_ctx.control.path, "-").concat(index),
                          "class": vue.normalizeClass(_ctx.styles.arrayList.item)
                        }, {
                          "default": vue.withCtx(function () {
                            return [vue.createVNode(_component_v_expansion_panel_title, {
                              "class": vue.normalizeClass(_ctx.styles.arrayList.itemHeader)
                            }, {
                              "default": vue.withCtx(function () {
                                return [vue.createVNode(_component_v_container, {
                                  "py-0": "",
                                  "class": vue.normalizeClass(_ctx.styles.arrayList.itemContainer)
                                }, {
                                  "default": vue.withCtx(function () {
                                    return [vue.createVNode(_component_v_row, {
                                      style: vue.normalizeStyle("display: grid; grid-template-columns: ".concat(!_ctx.hideAvatar ? 'min-content' : '', " auto min-content ").concat(_ctx.appliedOptions.showSortButtons ? 'min-content min-content' : ''))
                                    }, {
                                      "default": vue.withCtx(function () {
                                        return [!_ctx.hideAvatar ? (vue.openBlock(), vue.createBlock(_component_v_col, {
                                          key: 0,
                                          "align-self": "center",
                                          "class": "pl-0"
                                        }, {
                                          "default": vue.withCtx(function () {
                                            return [vue.createVNode(_component_validation_badge, {
                                              overlap: "",
                                              bordered: "",
                                              errors: _ctx.childErrors(index)
                                            }, {
                                              "default": vue.withCtx(function () {
                                                return [vue.createVNode(_component_v_avatar, {
                                                  size: "40",
                                                  "aria-label": "Index",
                                                  color: "primary"
                                                }, {
                                                  "default": vue.withCtx(function () {
                                                    return [vue.createElementVNode("span", _hoisted_1$8, vue.toDisplayString(index + 1), 1)];
                                                  }),
                                                  _: 2
                                                }, 1024)];
                                              }),
                                              _: 2
                                            }, 1032, ["errors"])];
                                          }),
                                          _: 2
                                        }, 1024)) : vue.createCommentVNode("", true), vue.createVNode(_component_v_col, {
                                          "align-self": "center",
                                          "class": vue.normalizeClass("pl-0 text-truncate ".concat(_ctx.styles.arrayList.itemLabel))
                                        }, {
                                          "default": vue.withCtx(function () {
                                            return [vue.createTextVNode(vue.toDisplayString(_ctx.childLabelForIndex(index)), 1)];
                                          }),
                                          _: 2
                                        }, 1032, ["class"]), _ctx.appliedOptions.showSortButtons ? (vue.openBlock(), vue.createBlock(_component_v_col, {
                                          key: 1,
                                          "align-self": "center"
                                        }, {
                                          "default": vue.withCtx(function () {
                                            return [vue.createVNode(_component_v_tooltip, {
                                              bottom: ""
                                            }, {
                                              activator: vue.withCtx(function (_ref2) {
                                                var props = _ref2.props;
                                                return [vue.createVNode(_component_v_btn, vue.mergeProps(props, {
                                                  fab: "",
                                                  text: "",
                                                  elevation: "0",
                                                  small: "",
                                                  "class": ["v-expansion-panel-title__icon", _ctx.styles.arrayList.itemMoveUp],
                                                  "aria-label": _ctx.translatedLabels.moveUp,
                                                  disabled: index <= 0 || !_ctx.control.enabled,
                                                  onClick: function onClick($event) {
                                                    return _ctx.moveUpClick($event, index);
                                                  }
                                                }), {
                                                  "default": vue.withCtx(function () {
                                                    return [vue.createVNode(_component_v_icon, {
                                                      "class": "notranslate"
                                                    }, {
                                                      "default": vue.withCtx(function () {
                                                        return [vue.createTextVNode("mdi-arrow-up")];
                                                      }),
                                                      _: 1
                                                    })];
                                                  }),
                                                  _: 2
                                                }, 1040, ["aria-label", "disabled", "class", "onClick"])];
                                              }),
                                              "default": vue.withCtx(function () {
                                                return [vue.createTextVNode(" " + vue.toDisplayString(_ctx.translatedLabels.moveUp), 1)];
                                              }),
                                              _: 2
                                            }, 1024)];
                                          }),
                                          _: 2
                                        }, 1024)) : vue.createCommentVNode("", true), _ctx.appliedOptions.showSortButtons ? (vue.openBlock(), vue.createBlock(_component_v_col, {
                                          key: 2,
                                          "align-self": "center"
                                        }, {
                                          "default": vue.withCtx(function () {
                                            return [vue.createVNode(_component_v_tooltip, {
                                              bottom: ""
                                            }, {
                                              activator: vue.withCtx(function (_ref3) {
                                                var props = _ref3.props;
                                                return [vue.createVNode(_component_v_btn, vue.mergeProps(props, {
                                                  fab: "",
                                                  text: "",
                                                  elevation: "0",
                                                  small: "",
                                                  "class": ["v-expansion-panel-title__icon", _ctx.styles.arrayList.itemMoveDown],
                                                  "aria-label": _ctx.translatedLabels.moveDown,
                                                  disabled: index >= _ctx.dataLength - 1 || !_ctx.control.enabled,
                                                  onClick: function onClick($event) {
                                                    return _ctx.moveDownClick($event, index);
                                                  }
                                                }), {
                                                  "default": vue.withCtx(function () {
                                                    return [vue.createVNode(_component_v_icon, {
                                                      "class": "notranslate"
                                                    }, {
                                                      "default": vue.withCtx(function () {
                                                        return [vue.createTextVNode("mdi-arrow-down")];
                                                      }),
                                                      _: 1
                                                    })];
                                                  }),
                                                  _: 2
                                                }, 1040, ["aria-label", "disabled", "class", "onClick"])];
                                              }),
                                              "default": vue.withCtx(function () {
                                                return [vue.createTextVNode(" " + vue.toDisplayString(_ctx.translatedLabels.moveDown), 1)];
                                              }),
                                              _: 2
                                            }, 1024)];
                                          }),
                                          _: 2
                                        }, 1024)) : vue.createCommentVNode("", true), vue.createVNode(_component_v_col, {
                                          "align-self": "center"
                                        }, {
                                          "default": vue.withCtx(function () {
                                            return [vue.createVNode(_component_v_tooltip, {
                                              bottom: ""
                                            }, {
                                              activator: vue.withCtx(function (_ref4) {
                                                var props = _ref4.props;
                                                return [vue.createVNode(_component_v_btn, vue.mergeProps(props, {
                                                  fab: "",
                                                  text: "",
                                                  elevation: "0",
                                                  small: "",
                                                  "class": ["v-expansion-panel-title__icon", _ctx.styles.arrayList.itemDelete],
                                                  "aria-label": _ctx.translatedLabels["delete"],
                                                  disabled: !_ctx.control.enabled || _ctx.appliedOptions.restrict && _ctx.arraySchema !== undefined && _ctx.arraySchema.minItems !== undefined && _ctx.dataLength <= _ctx.arraySchema.minItems,
                                                  onClick: vue.withModifiers(function ($event) {
                                                    return _ctx.suggestToDelete = index;
                                                  }, ["stop"])
                                                }), {
                                                  "default": vue.withCtx(function () {
                                                    return [vue.createVNode(_component_v_icon, {
                                                      "class": "notranslate"
                                                    }, {
                                                      "default": vue.withCtx(function () {
                                                        return [vue.createTextVNode("mdi-delete")];
                                                      }),
                                                      _: 1
                                                    })];
                                                  }),
                                                  _: 2
                                                }, 1040, ["aria-label", "class", "disabled", "onClick"])];
                                              }),
                                              "default": vue.withCtx(function () {
                                                return [vue.createTextVNode(" " + vue.toDisplayString(_ctx.translatedLabels["delete"]), 1)];
                                              }),
                                              _: 2
                                            }, 1024)];
                                          }),
                                          _: 2
                                        }, 1024)];
                                      }),
                                      _: 2
                                    }, 1032, ["style"])];
                                  }),
                                  _: 2
                                }, 1032, ["class"])];
                              }),
                              _: 2
                            }, 1032, ["class"]), vue.createVNode(_component_v_expansion_panel_text, {
                              "class": vue.normalizeClass(_ctx.styles.arrayList.itemContent)
                            }, {
                              "default": vue.withCtx(function () {
                                return [vue.createVNode(_component_dispatch_renderer, {
                                  schema: _ctx.control.schema,
                                  uischema: _ctx.foundUISchema,
                                  path: _ctx.composePaths(_ctx.control.path, "".concat(index)),
                                  enabled: _ctx.control.enabled,
                                  renderers: _ctx.control.renderers,
                                  cells: _ctx.control.cells
                                }, null, 8, ["schema", "uischema", "path", "enabled", "renderers", "cells"])];
                              }),
                              _: 2
                            }, 1032, ["class"])];
                          }),
                          _: 2
                        }, 1032, ["class"]);
                      }), 128))];
                    }),
                    _: 1
                  }, 16, ["modelValue"])];
                }),
                _: 1
              })];
            }),
            _: 1
          }, 8, ["class"]), _ctx.dataLength === 0 ? (vue.openBlock(), vue.createBlock(_component_v_container, {
            key: 0,
            "class": vue.normalizeClass(_ctx.styles.arrayList.noData)
          }, {
            "default": vue.withCtx(function () {
              return [vue.createTextVNode(" No data ")];
            }),
            _: 1
          }, 8, ["class"])) : vue.createCommentVNode("", true)];
        }),
        _: 1
      }), _ctx.$slots.actions ? (vue.openBlock(), vue.createBlock(_component_v_card_actions, {
        key: 0,
        "class": "pb-8"
      }, {
        "default": vue.withCtx(function () {
          return [vue.renderSlot(_ctx.$slots, "actions", {
            labels: _ctx.translatedLabels,
            addClass: _ctx.styles.arrayList.addButton,
            addDisabled: _ctx.addDisabled,
            addClick: _ctx.addButtonClick,
            control: _ctx.control,
            appliedOptions: _ctx.appliedOptions,
            styles: _ctx.styles
          })];
        }),
        _: 3
      })) : vue.createCommentVNode("", true), vue.createVNode(_component_v_dialog, {
        "model-value": _ctx.suggestToDelete !== null,
        "max-width": "600",
        onKeydown: _cache[3] || (_cache[3] = vue.withKeys(function ($event) {
          return _ctx.suggestToDelete = null;
        }, ["esc"])),
        "onClick:outside": _cache[4] || (_cache[4] = function ($event) {
          return _ctx.suggestToDelete = null;
        })
      }, {
        "default": vue.withCtx(function () {
          return [vue.createVNode(_component_v_card, null, {
            "default": vue.withCtx(function () {
              return [vue.createVNode(_component_v_card_title, {
                "class": "text-h5"
              }, {
                "default": vue.withCtx(function () {
                  return [vue.createTextVNode(vue.toDisplayString(_ctx.translatedLabels.dialogTitle), 1)];
                }),
                _: 1
              }), vue.createVNode(_component_v_card_text, null, {
                "default": vue.withCtx(function () {
                  return [vue.createTextVNode(vue.toDisplayString(_ctx.translatedLabels.dialogText), 1)];
                }),
                _: 1
              }), vue.createVNode(_component_v_card_actions, null, {
                "default": vue.withCtx(function () {
                  return [vue.createVNode(_component_v_spacer), vue.createVNode(_component_v_btn, {
                    text: "",
                    onClick: _cache[1] || (_cache[1] = function ($event) {
                      return _ctx.suggestToDelete = null;
                    })
                  }, {
                    "default": vue.withCtx(function () {
                      return [vue.createTextVNode(vue.toDisplayString(_ctx.translatedLabels.dialogCancel), 1)];
                    }),
                    _: 1
                  }), vue.createVNode(_component_v_btn, {
                    text: "",
                    ref: "confirm",
                    onClick: _cache[2] || (_cache[2] = function ($event) {
                      _ctx.removeItemsClick(_ctx.suggestToDelete === null ? null : [_ctx.suggestToDelete]);
                      _ctx.suggestToDelete = null;
                    })
                  }, {
                    "default": vue.withCtx(function () {
                      return [vue.createTextVNode(vue.toDisplayString(_ctx.translatedLabels.dialogConfirm), 1)];
                    }),
                    _: 1
                  }, 512)];
                }),
                _: 1
              })];
            }),
            _: 1
          })];
        }),
        _: 1
      }, 8, ["model-value"])];
    }),
    _: 3
  }, 16, ["class"])) : vue.createCommentVNode("", true);
}

controlRenderer$p.render = render$w;
controlRenderer$p.__scopeId = "data-v-44c4e38a";

var layoutRenderer$3 = vue.defineComponent({
  name: 'categorization-renderer',
  components: {
    DispatchRenderer: vue$1.DispatchRenderer,
    VContainer: components.VContainer,
    VTabs: components.VTabs,
    VTab: components.VTab,
    VWindow: components.VWindow,
    VWindowItem: components.VWindowItem,
    VRow: components.VRow,
    VCol: components.VCol
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    var activeCategory = vue.ref(0);
    var ajv = useAjv();
    var t = useTranslator();
    return _objectSpread2(_objectSpread2({}, useVuetifyLayout(vue$1.useJsonFormsLayout(props))), {}, {
      activeCategory: activeCategory,
      ajv: ajv,
      t: t
    });
  },
  computed: {
    visibleCategories: function visibleCategories() {
      var _this = this;
      return this.layout.uischema.elements.filter(function (category) {
        return core.isVisible(category, _this.layout.data, _this.layout.path, _this.ajv);
      });
    },
    visibleCategoryLabels: function visibleCategoryLabels() {
      var _this2 = this;
      return this.visibleCategories.map(function (element) {
        var _deriveLabelForUISche;
        return (_deriveLabelForUISche = core.deriveLabelForUISchemaElement(element, _this2.t)) !== null && _deriveLabelForUISche !== void 0 ? _deriveLabelForUISche : '';
      });
    }
  }
});
var isSingleLevelCategorization = core.and(core.uiTypeIs('Categorization'), core.categorizationHasCategory);
var entry$s = {
  renderer: layoutRenderer$3,
  tester: core.rankWith(2, isSingleLevelCategorization)
};

function render$v(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_tab = vue.resolveComponent("v-tab");
  var _component_v_tabs = vue.resolveComponent("v-tabs");
  var _component_v_col = vue.resolveComponent("v-col");
  var _component_dispatch_renderer = vue.resolveComponent("dispatch-renderer");
  var _component_v_window_item = vue.resolveComponent("v-window-item");
  var _component_v_window = vue.resolveComponent("v-window");
  var _component_v_row = vue.resolveComponent("v-row");
  var _component_v_container = vue.resolveComponent("v-container");
  return _ctx.layout.visible ? (vue.openBlock(), vue.createBlock(_component_v_container, {
    key: 0,
    "class": vue.normalizeClass(_ctx.styles.categorization.root)
  }, {
    "default": vue.withCtx(function () {
      return [_ctx.appliedOptions.vertical == true ? (vue.openBlock(), vue.createBlock(_component_v_row, vue.normalizeProps(vue.mergeProps({
        key: 0
      }, _ctx.vuetifyProps('v-row'))), {
        "default": vue.withCtx(function () {
          return [vue.createVNode(_component_v_col, vue.normalizeProps(vue.guardReactiveProps(_ctx.vuetifyProps('v-col.v-tabs'))), {
            "default": vue.withCtx(function () {
              return [vue.createVNode(_component_v_tabs, vue.mergeProps({
                modelValue: _ctx.activeCategory,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
                  return _ctx.activeCategory = $event;
                })
              }, _ctx.vuetifyProps('v-tabs'), {
                vertical: ""
              }), {
                "default": vue.withCtx(function () {
                  return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.visibleCategories, function (_, index) {
                    return vue.openBlock(), vue.createBlock(_component_v_tab, {
                      key: "".concat(_ctx.layout.path, "-").concat(index)
                    }, {
                      "default": vue.withCtx(function () {
                        return [vue.createTextVNode(vue.toDisplayString(_ctx.visibleCategoryLabels[index]), 1)];
                      }),
                      _: 2
                    }, 1024);
                  }), 128))];
                }),
                _: 1
              }, 16, ["modelValue"])];
            }),
            _: 1
          }, 16), vue.createVNode(_component_v_col, vue.normalizeProps(vue.guardReactiveProps(_ctx.vuetifyProps('v-col.v-window'))), {
            "default": vue.withCtx(function () {
              return [vue.createVNode(_component_v_window, vue.mergeProps({
                modelValue: _ctx.activeCategory,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
                  return _ctx.activeCategory = $event;
                }),
                vertical: ""
              }, _ctx.vuetifyProps('v-window')), {
                "default": vue.withCtx(function () {
                  return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.visibleCategories, function (element, index) {
                    return vue.openBlock(), vue.createBlock(_component_v_window_item, {
                      key: "".concat(_ctx.layout.path, "-").concat(index)
                    }, {
                      "default": vue.withCtx(function () {
                        return [vue.createVNode(_component_dispatch_renderer, {
                          schema: _ctx.layout.schema,
                          uischema: element,
                          path: _ctx.layout.path,
                          enabled: _ctx.layout.enabled,
                          renderers: _ctx.layout.renderers,
                          cells: _ctx.layout.cells
                        }, null, 8, ["schema", "uischema", "path", "enabled", "renderers", "cells"])];
                      }),
                      _: 2
                    }, 1024);
                  }), 128))];
                }),
                _: 1
              }, 16, ["modelValue"])];
            }),
            _: 1
          }, 16)];
        }),
        _: 1
      }, 16)) : (vue.openBlock(), vue.createBlock(_component_v_row, vue.normalizeProps(vue.mergeProps({
        key: 1
      }, _ctx.vuetifyProps('v-row'))), {
        "default": vue.withCtx(function () {
          return [vue.createVNode(_component_v_tabs, vue.mergeProps({
            modelValue: _ctx.activeCategory,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
              return _ctx.activeCategory = $event;
            })
          }, _ctx.vuetifyProps('v-tabs')), {
            "default": vue.withCtx(function () {
              return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.visibleCategories, function (_, index) {
                return vue.openBlock(), vue.createBlock(_component_v_tab, {
                  key: "".concat(_ctx.layout.path, "-").concat(index)
                }, {
                  "default": vue.withCtx(function () {
                    return [vue.createTextVNode(vue.toDisplayString(_ctx.visibleCategoryLabels[index]), 1)];
                  }),
                  _: 2
                }, 1024);
              }), 128))];
            }),
            _: 1
          }, 16, ["modelValue"]), vue.createVNode(_component_v_window, vue.mergeProps({
            modelValue: _ctx.activeCategory,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
              return _ctx.activeCategory = $event;
            })
          }, _ctx.vuetifyProps('v-window')), {
            "default": vue.withCtx(function () {
              return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.visibleCategories, function (element, index) {
                return vue.openBlock(), vue.createBlock(_component_v_window_item, {
                  key: "".concat(_ctx.layout.path, "-").concat(index)
                }, {
                  "default": vue.withCtx(function () {
                    return [vue.createVNode(_component_dispatch_renderer, {
                      schema: _ctx.layout.schema,
                      uischema: element,
                      path: _ctx.layout.path,
                      enabled: _ctx.layout.enabled,
                      renderers: _ctx.layout.renderers,
                      cells: _ctx.layout.cells
                    }, null, 8, ["schema", "uischema", "path", "enabled", "renderers", "cells"])];
                  }),
                  _: 2
                }, 1024);
              }), 128))];
            }),
            _: 1
          }, 16, ["modelValue"])];
        }),
        _: 1
      }, 16))];
    }),
    _: 1
  }, 8, ["class"])) : vue.createCommentVNode("", true);
}

layoutRenderer$3.render = render$v;

var layoutRenderer$2 = vue.defineComponent({
  name: 'group-renderer',
  components: {
    DispatchRenderer: vue$1.DispatchRenderer,
    VCard: components.VCard,
    VCardTitle: components.VCardTitle,
    VCardText: components.VCardText
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    return useVuetifyLayout(vue$1.useJsonFormsLayout(props));
  },
  computed: {
    bare: function bare() {
      return !!this.appliedOptions.bare;
    },
    alignLeft: function alignLeft() {
      return !!this.appliedOptions.alignLeft;
    },
    classes: function classes() {
      var classes = ['my-1', 'pa-0', "".concat(this.styles.group.root)];
      if (this.bare) {
        classes.push("".concat(this.styles.group.bare));
      }
      if (this.alignLeft) {
        classes.push("".concat(this.styles.group.alignLeft));
      }
      return classes.join(' ');
    }
  }
});
var entry$r = {
  renderer: layoutRenderer$2,
  tester: core.rankWith(2, core.and(core.isLayout, core.uiTypeIs('Group')))
};

function render$u(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_card_title = vue.resolveComponent("v-card-title");
  var _component_dispatch_renderer = vue.resolveComponent("dispatch-renderer");
  var _component_v_card_text = vue.resolveComponent("v-card-text");
  var _component_v_card = vue.resolveComponent("v-card");
  return _ctx.layout.visible ? (vue.openBlock(), vue.createBlock(_component_v_card, vue.mergeProps({
    key: 0,
    "class": _ctx.classes,
    elevation: !_ctx.bare ? 2 : undefined,
    outlined: _ctx.bare
  }, _ctx.vuetifyProps('v-card')), {
    "default": vue.withCtx(function () {
      return [_ctx.layout.label ? (vue.openBlock(), vue.createBlock(_component_v_card_title, vue.mergeProps({
        key: 0,
        "class": _ctx.styles.group.label
      }, _ctx.vuetifyProps('v-card-title')), {
        "default": vue.withCtx(function () {
          return [vue.createTextVNode(vue.toDisplayString(_ctx.layout.label), 1)];
        }),
        _: 1
      }, 16, ["class"])) : vue.createCommentVNode("", true), (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.layout.uischema.elements, function (element, index) {
        return vue.openBlock(), vue.createBlock(_component_v_card_text, vue.mergeProps(_ctx.vuetifyProps("v-card-text[".concat(index, "]")), {
          key: "".concat(_ctx.layout.path, "-").concat(index),
          "class": _ctx.styles.group.item
        }), {
          "default": vue.withCtx(function () {
            return [vue.createVNode(_component_dispatch_renderer, {
              schema: _ctx.layout.schema,
              uischema: element,
              path: _ctx.layout.path,
              enabled: _ctx.layout.enabled,
              renderers: _ctx.layout.renderers,
              cells: _ctx.layout.cells
            }, null, 8, ["schema", "uischema", "path", "enabled", "renderers", "cells"])];
          }),
          _: 2
        }, 1040, ["class"]);
      }), 128))];
    }),
    _: 1
  }, 16, ["class", "elevation", "outlined"])) : vue.createCommentVNode("", true);
}

layoutRenderer$2.render = render$u;

var layoutRenderer$1 = vue.defineComponent({
  name: 'horizontal-layout-renderer',
  components: {
    DispatchRenderer: vue$1.DispatchRenderer,
    VContainer: components.VContainer,
    VRow: components.VRow,
    VCol: components.VCol
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    return useVuetifyLayout(vue$1.useJsonFormsLayout(props));
  },
  computed: {
    collapse: function collapse() {
      var _this$$vuetify$displa = this.$vuetify.display,
        xs = _this$$vuetify$displa.xs,
        sm = _this$$vuetify$displa.sm,
        md = _this$$vuetify$displa.md,
        lg = _this$$vuetify$displa.lg,
        xl = _this$$vuetify$displa.xl;
      if (this.appliedOptions.breakHorizontal === 'xs' && xs) {
        return true;
      }
      if (this.appliedOptions.breakHorizontal === 'sm' && (xs || sm)) {
        return true;
      }
      if (this.appliedOptions.breakHorizontal === 'md' && (xs || sm || md)) {
        return true;
      }
      if (this.appliedOptions.breakHorizontal === 'lg' && (xs || sm || md || lg)) {
        return true;
      }
      if (this.appliedOptions.breakHorizontal === 'xl' && (xs || sm || md || lg || xl)) {
        return true;
      }
      return false;
    },
    cols: function cols() {
      var _this = this;
      return this.uischema.elements.map(function (_, index) {
        var _this$vuetifyProps;
        if (_this.collapse) {
          return 12;
        }
        var uiSchemaCols = (_this$vuetifyProps = _this.vuetifyProps("v-col[".concat(index, "]"))) === null || _this$vuetifyProps === void 0 ? void 0 : _this$vuetifyProps.cols;
        return uiSchemaCols !== undefined ? uiSchemaCols : false;
      });
    }
  }
});
var entry$q = {
  renderer: layoutRenderer$1,
  tester: core.rankWith(2, core.uiTypeIs('HorizontalLayout'))
};

function render$t(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_dispatch_renderer = vue.resolveComponent("dispatch-renderer");
  var _component_v_col = vue.resolveComponent("v-col");
  var _component_v_row = vue.resolveComponent("v-row");
  var _component_v_container = vue.resolveComponent("v-container");
  return _ctx.layout.visible ? (vue.openBlock(), vue.createBlock(_component_v_container, vue.mergeProps({
    key: 0,
    "class": "".concat(_ctx.styles.horizontalLayout.root)
  }, _ctx.vuetifyProps('v-container')), {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_row, vue.normalizeProps(vue.guardReactiveProps(_ctx.vuetifyProps('v-row'))), {
        "default": vue.withCtx(function () {
          return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.layout.uischema.elements, function (element, index) {
            return vue.openBlock(), vue.createBlock(_component_v_col, vue.mergeProps({
              key: "".concat(_ctx.layout.path, "-").concat(index),
              "class": _ctx.styles.horizontalLayout.item,
              cols: _ctx.cols[index]
            }, _ctx.vuetifyProps("v-col[".concat(index, "]"))), {
              "default": vue.withCtx(function () {
                return [vue.createVNode(_component_dispatch_renderer, {
                  schema: _ctx.layout.schema,
                  uischema: element,
                  path: _ctx.layout.path,
                  enabled: _ctx.layout.enabled,
                  renderers: _ctx.layout.renderers,
                  cells: _ctx.layout.cells
                }, null, 8, ["schema", "uischema", "path", "enabled", "renderers", "cells"])];
              }),
              _: 2
            }, 1040, ["class", "cols"]);
          }), 128))];
        }),
        _: 1
      }, 16)];
    }),
    _: 1
  }, 16, ["class"])) : vue.createCommentVNode("", true);
}

layoutRenderer$1.render = render$t;

var layoutRenderer = vue.defineComponent({
  name: 'vertical-layout-renderer',
  components: {
    DispatchRenderer: vue$1.DispatchRenderer,
    VContainer: components.VContainer,
    VRow: components.VRow,
    VCol: components.VCol
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    return useVuetifyLayout(vue$1.useJsonFormsLayout(props));
  }
});
var entry$p = {
  renderer: layoutRenderer,
  tester: core.rankWith(2, core.uiTypeIs('VerticalLayout'))
};

function render$s(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_dispatch_renderer = vue.resolveComponent("dispatch-renderer");
  var _component_v_col = vue.resolveComponent("v-col");
  var _component_v_row = vue.resolveComponent("v-row");
  var _component_v_container = vue.resolveComponent("v-container");
  return _ctx.layout.visible ? (vue.openBlock(), vue.createBlock(_component_v_container, vue.mergeProps({
    key: 0,
    "fill-height": "",
    "class": "".concat(_ctx.styles.verticalLayout.root)
  }, _ctx.vuetifyProps('v-container')), {
    "default": vue.withCtx(function () {
      return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.layout.uischema.elements, function (element, index) {
        return vue.openBlock(), vue.createBlock(_component_v_row, vue.mergeProps({
          key: "".concat(_ctx.layout.path, "-").concat(index)
        }, _ctx.vuetifyProps("v-row[".concat(index, "]"))), {
          "default": vue.withCtx(function () {
            return [vue.createVNode(_component_v_col, vue.mergeProps({
              cols: "12",
              "class": _ctx.styles.verticalLayout.item
            }, _ctx.vuetifyProps('v-col')), {
              "default": vue.withCtx(function () {
                return [vue.createVNode(_component_dispatch_renderer, {
                  schema: _ctx.layout.schema,
                  uischema: element,
                  path: _ctx.layout.path,
                  enabled: _ctx.layout.enabled,
                  renderers: _ctx.layout.renderers,
                  cells: _ctx.layout.cells
                }, null, 8, ["schema", "uischema", "path", "enabled", "renderers", "cells"])];
              }),
              _: 2
            }, 1040, ["class"])];
          }),
          _: 2
        }, 1040);
      }), 128))];
    }),
    _: 1
  }, 16, ["class"])) : vue.createCommentVNode("", true);
}

layoutRenderer.render = render$s;

var layoutRendererEntry = {
  renderer: layoutRenderer,
  tester: core.rankWith(1, core.isLayout)
};
var layoutRenderers = [layoutRendererEntry, entry$t, entry$s,
entry$r, entry$q, entry$p];

var arrayListRendererEntry = {
  renderer: controlRenderer$p,
  tester: core.rankWith(2, core.schemaTypeIs('array'))
};
var arrayRenderers = [arrayListRendererEntry];

var script$2 = vue.defineComponent({
  name: 'combinator-properties',
  components: {
    DispatchRenderer: vue$1.DispatchRenderer
  },
  props: {
    schema: {
      type: Object,
      required: true
    },
    combinatorKeyword: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  setup: function setup(props) {
    var otherProps = omit(props.schema, props.combinatorKeyword);
    var foundUISchema = core.Generate.uiSchema(otherProps, 'VerticalLayout');
    var isLayout = function isLayout(uischema) {
      return Object.prototype.hasOwnProperty.call(uischema, 'elements');
    };
    var isLayoutWithElements = false;
    if (foundUISchema !== null && isLayout(foundUISchema)) {
      isLayoutWithElements = foundUISchema.elements.length > 0;
    }
    return {
      otherProps: otherProps,
      foundUISchema: foundUISchema,
      isLayoutWithElements: isLayoutWithElements
    };
  }
});

var _hoisted_1$7 = {
  key: 0
};
function render$r(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_dispatch_renderer = vue.resolveComponent("dispatch-renderer");
  return _ctx.isLayoutWithElements ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$7, [vue.createVNode(_component_dispatch_renderer, {
    schema: _ctx.otherProps,
    path: _ctx.path,
    uischema: _ctx.foundUISchema
  }, null, 8, ["schema", "path", "uischema"])])) : vue.createCommentVNode("", true);
}

script$2.render = render$r;

var DisabledIconFocus = {
  updated: function updated(el) {
    el.querySelectorAll('.v-input__icon button').forEach(function (x) {
      return x.setAttribute('tabindex', '-1');
    });
  }
};

var reuseAjvForSchema = function reuseAjvForSchema(ajv, schema) {
  if (Object.prototype.hasOwnProperty.call(schema, 'id') || Object.prototype.hasOwnProperty.call(schema, '$id')) {
    ajv.removeSchema(schema);
  }
  return ajv;
};
var script$1 = vue.defineComponent({
  name: 'additional-properties',
  components: {
    DispatchRenderer: vue$1.DispatchRenderer,
    VCard: components.VCard,
    VTooltip: components.VTooltip,
    VToolbar: components.VToolbar,
    VIcon: components.VIcon,
    VBtn: components.VBtn,
    VCardTitle: components.VCardTitle,
    VSpacer: components.VSpacer,
    VToolbarTitle: components.VToolbarTitle,
    VTextField: components.VTextField,
    VContainer: components.VContainer,
    VRow: components.VRow,
    VCol: components.VCol,
    VHover: components.VHover
  },
  directives: {
    DisabledIconFocus: DisabledIconFocus
  },
  props: {
    input: {
      type: Object,
      required: true
    }
  },
  setup: function setup(props) {
    var control = props.input.control;
    var reservedPropertyNames = Object.keys(control.value.schema.properties || {});
    var additionalKeys = Object.keys(control.value.data).filter(function (k) {
      return !reservedPropertyNames.includes(k);
    });
    var toAdditionalPropertyType = function toAdditionalPropertyType(propName, propValue) {
      var propSchema = undefined;
      var propUiSchema = undefined;
      if (control.value.schema.patternProperties) {
        var matchedPattern = Object.keys(control.value.schema.patternProperties).find(function (pattern) {
          return new RegExp(pattern).test(propName);
        });
        if (matchedPattern) {
          propSchema = control.value.schema.patternProperties[matchedPattern];
        }
      }
      if (!propSchema && _typeof(control.value.schema.additionalProperties) === 'object') {
        propSchema = control.value.schema.additionalProperties;
      }
      if (!propSchema && propValue !== undefined) {
        var _Generate$jsonSchema$;
        propSchema = (_Generate$jsonSchema$ = core.Generate.jsonSchema({
          prop: propValue
        }, {
          additionalProperties: false,
          required: function required() {
            return false;
          }
        }).properties) === null || _Generate$jsonSchema$ === void 0 ? void 0 : _Generate$jsonSchema$.prop;
      }
      if (propSchema) {
        if (propSchema.type === 'object' || propSchema.type === 'array') {
          var _propSchema$title;
          propUiSchema = core.Generate.uiSchema(propSchema, 'Group');
          propUiSchema.label = (_propSchema$title = propSchema.title) !== null && _propSchema$title !== void 0 ? _propSchema$title : startCase(propName);
        } else {
          propUiSchema = core.createControlElement(control.value.path + '/' + core.encode(propName));
        }
      }
      return {
        propertyName: propName,
        path: core.composePaths(control.value.path, propName),
        schema: propSchema,
        uischema: propUiSchema
      };
    };
    var appliedOptions = useControlAppliedOptions(props.input);
    var additionalPropertyItems = vue.ref([]);
    additionalKeys.forEach(function (propName) {
      var additionalProperty = toAdditionalPropertyType(propName, control.value.data[propName]);
      additionalPropertyItems.value.push(additionalProperty);
    });
    var styles = useStyles(control.value.uischema);
    var newPropertyName = vue.ref('');
    var ajv = useAjv();
    var propertyNameSchema = undefined;
    var propertyNameValidator = undefined;
    if (_typeof(control.value.schema.propertyNames) === 'object') {
      propertyNameSchema = control.value.schema.propertyNames;
    }
    if (_typeof(control.value.schema.additionalProperties) !== 'object' && _typeof(control.value.schema.patternProperties) === 'object') {
      var matchPatternPropertiesKeys = {
        type: 'string',
        pattern: Object.keys(control.value.schema.patternProperties).join('|')
      };
      propertyNameSchema = propertyNameSchema ? {
        allOf: [propertyNameSchema, matchPatternPropertiesKeys]
      } : matchPatternPropertiesKeys;
    }
    if (propertyNameSchema) {
      propertyNameValidator = reuseAjvForSchema(ajv, propertyNameSchema).compile(propertyNameSchema);
    }
    var vuetifyProps = function vuetifyProps(path) {
      var _appliedOptions$value;
      var props = get((_appliedOptions$value = appliedOptions.value) === null || _appliedOptions$value === void 0 ? void 0 : _appliedOptions$value.vuetify, path);
      return props && isPlainObject(props) ? props : {};
    };
    var t = useTranslator();
    return {
      t: t,
      vuetifyProps: vuetifyProps,
      ajv: ajv,
      propertyNameValidator: propertyNameValidator,
      control: control,
      styles: styles,
      appliedOptions: appliedOptions,
      additionalPropertyItems: additionalPropertyItems,
      toAdditionalPropertyType: toAdditionalPropertyType,
      newPropertyName: newPropertyName
    };
  },
  computed: {
    addPropertyDisabled: function addPropertyDisabled() {
      return (
        !this.control.enabled ||
        this.appliedOptions.restrict && this.maxPropertiesReached ||
        this.newPropertyErrors.length > 0 || !this.newPropertyName
      );
    },
    maxPropertiesReached: function maxPropertiesReached() {
      return this.control.schema.maxProperties !== undefined &&
      this.control.data &&
      Object.keys(this.control.data).length >= this.control.schema.maxProperties;
    },
    removePropertyDisabled: function removePropertyDisabled() {
      return (
        !this.control.enabled ||
        this.appliedOptions.restrict && this.minPropertiesReached
      );
    },
    minPropertiesReached: function minPropertiesReached() {
      return this.control.schema.minProperties !== undefined &&
      this.control.data &&
      Object.keys(this.control.data).length <= this.control.schema.minProperties;
    },
    newPropertyErrors: function newPropertyErrors() {
      var _this = this;
      if (this.newPropertyName) {
        var messages = this.propertyNameValidator ? core.validate(this.propertyNameValidator, this.newPropertyName).map(function (error) {
          return error.message;
        }).filter(function (message) {
          return message;
        }) : [];
        if (this.reservedPropertyNames.includes(this.newPropertyName) || this.additionalPropertyItems.find(function (ap) {
          return ap.propertyName === _this.newPropertyName;
        }) !== undefined) {
          messages.push("Property '".concat(this.newPropertyName, "' is already defined"));
        }
        if (this.newPropertyName.includes('[')) {
          messages.push('Property name contains invalid char: [');
        }
        if (this.newPropertyName.includes(']')) {
          messages.push('Property name contains invalid char: ]');
        }
        if (this.newPropertyName.includes('.')) {
          messages.push('Property name contains invalid char: .');
        }
        return messages;
      }
      return [];
    },
    placeholder: function placeholder() {
      return this.t(this.i18nKey('newProperty.placeholder'), 'New Property');
    },
    reservedPropertyNames: function reservedPropertyNames() {
      return Object.keys(this.control.schema.properties || {});
    },
    additionalPropertiesTitle: function additionalPropertiesTitle() {
      var _additionalProperties;
      var additionalProperties = this.control.schema.additionalProperties;
      var label = _typeof(additionalProperties) === 'object' && Object.prototype.hasOwnProperty.call(additionalProperties, 'title') ? (_additionalProperties = additionalProperties.title) !== null && _additionalProperties !== void 0 ? _additionalProperties : 'Additional Properties' : 'Additional Properties';
      return this.t(this.i18nKey('title'), label);
    },
    addToLabel: function addToLabel() {
      return this.t(this.i18nKey('btn.add'), 'Add to ${additionalProperties.title}', {
        additionalProperties: {
          title: this.additionalPropertiesTitle
        }
      });
    },
    deleteLabel: function deleteLabel() {
      return this.t(this.i18nKey('btn.delete'), 'Delete from ${additionalProperties.title}', {
        additionalProperties: {
          title: this.additionalPropertiesTitle
        }
      });
    }
  },
  watch: {
    'control.data': {
      handler: function handler(newData) {
        var _this2 = this;
        if (_typeof(this.control.data) === 'object') {
          var keys = Object.keys(newData);
          var hasChanges = false;
          this.additionalPropertyItems.forEach(function (ap) {
            if (ap.schema && (!keys.includes(ap.propertyName) || newData[ap.propertyName] === undefined || newData[ap.propertyName] === null && ap.schema.type !== 'null')
            ) {
              var newValue = core.createDefaultValue(ap.schema, _this2.control.rootSchema);
              hasChanges = newData[ap.propertyName] !== newValue;
              newData[ap.propertyName] = newValue;
            }
          });
          if (hasChanges) {
            this.input.handleChange(this.control.path, newData);
          }
        }
      },
      deep: true
    }
  },
  methods: {
    composePaths: core.composePaths,
    i18nKey: function i18nKey(key) {
      return core.getI18nKey(this.control.schema, this.control.uischema, this.control.path, "additionalProperties.".concat(key));
    },
    addProperty: function addProperty() {
      if (this.newPropertyName) {
        var additionalProperty = this.toAdditionalPropertyType(this.newPropertyName, undefined);
        if (additionalProperty) {
          this.additionalPropertyItems = [].concat(_toConsumableArray(this.additionalPropertyItems), [additionalProperty]);
        }
        if (_typeof(this.control.data) === 'object' && additionalProperty.schema) {
          this.control.data[this.newPropertyName] = core.createDefaultValue(additionalProperty.schema, this.control.rootSchema);
          this.input.handleChange(this.control.path, this.control.data);
        }
      }
      this.newPropertyName = '';
    },
    removeProperty: function removeProperty(propName) {
      this.additionalPropertyItems = this.additionalPropertyItems.filter(function (d) {
        return d.propertyName !== propName;
      });
      if (_typeof(this.control.data) === 'object') {
        delete this.control.data[propName];
        this.input.handleChange(this.control.path, this.control.data);
      }
    }
  }
});

function render$q(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_toolbar_title = vue.resolveComponent("v-toolbar-title");
  var _component_v_spacer = vue.resolveComponent("v-spacer");
  var _component_v_text_field = vue.resolveComponent("v-text-field");
  var _component_v_hover = vue.resolveComponent("v-hover");
  var _component_v_icon = vue.resolveComponent("v-icon");
  var _component_v_btn = vue.resolveComponent("v-btn");
  var _component_v_tooltip = vue.resolveComponent("v-tooltip");
  var _component_v_toolbar = vue.resolveComponent("v-toolbar");
  var _component_v_card_title = vue.resolveComponent("v-card-title");
  var _component_dispatch_renderer = vue.resolveComponent("dispatch-renderer");
  var _component_v_col = vue.resolveComponent("v-col");
  var _component_v_row = vue.resolveComponent("v-row");
  var _component_v_container = vue.resolveComponent("v-container");
  var _component_v_card = vue.resolveComponent("v-card");
  var _directive_disabled_icon_focus = vue.resolveDirective("disabled-icon-focus");
  return _ctx.control.visible ? (vue.openBlock(), vue.createBlock(_component_v_card, {
    key: 0,
    elevation: "0"
  }, {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_card_title, null, {
        "default": vue.withCtx(function () {
          return [vue.createVNode(_component_v_toolbar, {
            flat: ""
          }, {
            "default": vue.withCtx(function () {
              return [vue.createVNode(_component_v_toolbar_title, null, {
                "default": vue.withCtx(function () {
                  return [vue.createTextVNode(vue.toDisplayString(_ctx.additionalPropertiesTitle), 1)];
                }),
                _: 1
              }), vue.createVNode(_component_v_spacer), vue.createVNode(_component_v_hover, null, {
                "default": vue.withCtx(function (_ref) {
                  var isHovering = _ref.isHovering;
                  return [vue.withDirectives(vue.createVNode(_component_v_text_field, vue.mergeProps({
                    required: true,
                    "class": _ctx.styles.control.input,
                    "error-messages": _ctx.newPropertyErrors,
                    modelValue: _ctx.newPropertyName,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
                      return _ctx.newPropertyName = $event;
                    }),
                    clearable: isHovering,
                    placeholder: _ctx.placeholder,
                    disabled: !_ctx.control.enabled
                  }, _ctx.vuetifyProps('v-text-field')), null, 16, ["class", "error-messages", "modelValue", "clearable", "placeholder", "disabled"]), [[_directive_disabled_icon_focus]])];
                }),
                _: 1
              }), vue.createVNode(_component_v_tooltip, {
                bottom: ""
              }, {
                activator: vue.withCtx(function (_ref2) {
                  var props = _ref2.props;
                  return [vue.createVNode(_component_v_btn, vue.mergeProps({
                    fab: "",
                    text: "",
                    elevation: "0",
                    small: "",
                    "aria-label": _ctx.addToLabel
                  }, props, {
                    disabled: _ctx.addPropertyDisabled,
                    onClick: _ctx.addProperty
                  }), {
                    "default": vue.withCtx(function () {
                      return [vue.createVNode(_component_v_icon, null, {
                        "default": vue.withCtx(function () {
                          return [vue.createTextVNode("mdi-plus")];
                        }),
                        _: 1
                      })];
                    }),
                    _: 2
                  }, 1040, ["aria-label", "disabled", "onClick"])];
                }),
                "default": vue.withCtx(function () {
                  return [vue.createTextVNode(" " + vue.toDisplayString(_ctx.addToLabel), 1)];
                }),
                _: 1
              })];
            }),
            _: 1
          })];
        }),
        _: 1
      }), vue.createVNode(_component_v_container, null, {
        "default": vue.withCtx(function () {
          return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.additionalPropertyItems, function (element, index) {
            return vue.openBlock(), vue.createBlock(_component_v_row, {
              key: "".concat(index)
            }, {
              "default": vue.withCtx(function () {
                return [vue.createVNode(_component_v_col, null, {
                  "default": vue.withCtx(function () {
                    return [element.schema && element.uischema ? (vue.openBlock(), vue.createBlock(_component_dispatch_renderer, {
                      key: 0,
                      schema: element.schema,
                      uischema: element.uischema,
                      path: element.path,
                      enabled: _ctx.control.enabled,
                      renderers: _ctx.control.renderers,
                      cells: _ctx.control.cells
                    }, null, 8, ["schema", "uischema", "path", "enabled", "renderers", "cells"])) : vue.createCommentVNode("", true)];
                  }),
                  _: 2
                }, 1024), _ctx.control.enabled ? (vue.openBlock(), vue.createBlock(_component_v_col, {
                  key: 0,
                  "class": "shrink"
                }, {
                  "default": vue.withCtx(function () {
                    return [vue.createVNode(_component_v_tooltip, {
                      bottom: ""
                    }, {
                      activator: vue.withCtx(function (_ref3) {
                        var props = _ref3.props;
                        return [vue.createVNode(_component_v_btn, vue.mergeProps(props, {
                          fab: "",
                          text: "",
                          elevation: "0",
                          small: "",
                          "aria-label": _ctx.deleteLabel,
                          disabled: _ctx.removePropertyDisabled,
                          onClick: function onClick($event) {
                            return _ctx.removeProperty(element.propertyName);
                          }
                        }), {
                          "default": vue.withCtx(function () {
                            return [vue.createVNode(_component_v_icon, {
                              "class": "notranslate"
                            }, {
                              "default": vue.withCtx(function () {
                                return [vue.createTextVNode("mdi-delete")];
                              }),
                              _: 1
                            })];
                          }),
                          _: 2
                        }, 1040, ["aria-label", "disabled", "onClick"])];
                      }),
                      "default": vue.withCtx(function () {
                        return [vue.createTextVNode(" " + vue.toDisplayString(_ctx.deleteLabel), 1)];
                      }),
                      _: 2
                    }, 1024)];
                  }),
                  _: 2
                }, 1024)) : vue.createCommentVNode("", true)];
              }),
              _: 2
            }, 1024);
          }), 128))];
        }),
        _: 1
      })];
    }),
    _: 1
  })) : vue.createCommentVNode("", true);
}

script$1.render = render$q;

var controlRenderer$o = vue.defineComponent({
  name: 'all-of-renderer',
  components: {
    DispatchRenderer: vue$1.DispatchRenderer,
    CombinatorProperties: script$2
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    return useVuetifyControl(vue$1.useJsonFormsAllOfControl(props));
  },
  computed: {
    delegateUISchema: function delegateUISchema() {
      return core.findMatchingUISchema(this.control.uischemas)(this.control.schema, this.control.uischema.scope, this.control.path);
    },
    allOfRenderInfos: function allOfRenderInfos() {
      var result = core.createCombinatorRenderInfos(
      this.control.schema.allOf, this.control.rootSchema, 'allOf', this.control.uischema, this.control.path, this.control.uischemas);
      return result.filter(function (info) {
        return info.uischema;
      });
    }
  }
});
var entry$o = {
  renderer: controlRenderer$o,
  tester: core.rankWith(3, core.isAllOfControl)
};

var _hoisted_1$6 = {
  key: 0
};
var _hoisted_2 = {
  key: 1
};
function render$p(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_dispatch_renderer = vue.resolveComponent("dispatch-renderer");
  var _component_combinator_properties = vue.resolveComponent("combinator-properties");
  return _ctx.control.visible ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$6, [_ctx.delegateUISchema ? (vue.openBlock(), vue.createBlock(_component_dispatch_renderer, {
    key: 0,
    schema: _ctx.control.schema,
    uischema: _ctx.delegateUISchema,
    path: _ctx.control.path,
    enabled: _ctx.control.enabled,
    renderers: _ctx.control.renderers,
    cells: _ctx.control.cells
  }, null, 8, ["schema", "uischema", "path", "enabled", "renderers", "cells"])) : _ctx.allOfRenderInfos ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [vue.createVNode(_component_combinator_properties, {
    schema: _ctx.control.schema,
    combinatorKeyword: "allOf",
    path: _ctx.path
  }, null, 8, ["schema", "path"]), (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.allOfRenderInfos, function (allOfRenderInfo, allOfIndex) {
    return vue.openBlock(), vue.createBlock(_component_dispatch_renderer, {
      key: "".concat(_ctx.control.path, "-").concat(allOfIndex),
      schema: allOfRenderInfo.schema,
      uischema: allOfRenderInfo.uischema,
      path: _ctx.control.path,
      enabled: _ctx.control.enabled,
      renderers: _ctx.control.renderers,
      cells: _ctx.control.cells
    }, null, 8, ["schema", "uischema", "path", "enabled", "renderers", "cells"]);
  }), 128))])) : vue.createCommentVNode("", true)])) : vue.createCommentVNode("", true);
}

controlRenderer$o.render = render$p;

var controlRenderer$n = vue.defineComponent({
  name: 'any-of-renderer',
  components: {
    DispatchRenderer: vue$1.DispatchRenderer,
    CombinatorProperties: script$2,
    VTabs: components.VTabs,
    VTab: components.VTab,
    VWindow: components.VWindow,
    VWindowItem: components.VWindowItem
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    var input = vue$1.useJsonFormsAnyOfControl(props);
    var control = input.control.value;
    var selectedIndex = vue.ref(control.indexOfFittingSchema || 0);
    return _objectSpread2(_objectSpread2({}, useVuetifyControl(input)), {}, {
      selectedIndex: selectedIndex
    });
  },
  computed: {
    anyOfRenderInfos: function anyOfRenderInfos() {
      var result = core.createCombinatorRenderInfos(
      this.control.schema.anyOf, this.control.rootSchema, 'anyOf', this.control.uischema, this.control.path, this.control.uischemas);
      return result.filter(function (info) {
        return info.uischema;
      });
    }
  }
});
var entry$n = {
  renderer: controlRenderer$n,
  tester: core.rankWith(3, core.isAnyOfControl)
};

var _hoisted_1$5 = {
  key: 0
};
function render$o(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_combinator_properties = vue.resolveComponent("combinator-properties");
  var _component_v_tab = vue.resolveComponent("v-tab");
  var _component_v_tabs = vue.resolveComponent("v-tabs");
  var _component_dispatch_renderer = vue.resolveComponent("dispatch-renderer");
  var _component_v_window_item = vue.resolveComponent("v-window-item");
  var _component_v_window = vue.resolveComponent("v-window");
  return _ctx.control.visible ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$5, [vue.createVNode(_component_combinator_properties, {
    schema: _ctx.control.schema,
    combinatorKeyword: "anyOf",
    path: _ctx.path
  }, null, 8, ["schema", "path"]), vue.createVNode(_component_v_tabs, {
    modelValue: _ctx.selectedIndex,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return _ctx.selectedIndex = $event;
    })
  }, {
    "default": vue.withCtx(function () {
      return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.anyOfRenderInfos, function (anyOfRenderInfo, anyOfIndex) {
        return vue.openBlock(), vue.createBlock(_component_v_tab, {
          key: "".concat(_ctx.control.path, "-").concat(anyOfIndex)
        }, {
          "default": vue.withCtx(function () {
            return [vue.createTextVNode(vue.toDisplayString(anyOfRenderInfo.label), 1)];
          }),
          _: 2
        }, 1024);
      }), 128))];
    }),
    _: 1
  }, 8, ["modelValue"]), vue.createVNode(_component_v_window, {
    modelValue: _ctx.selectedIndex,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return _ctx.selectedIndex = $event;
    })
  }, {
    "default": vue.withCtx(function () {
      return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.anyOfRenderInfos, function (anyOfRenderInfo, anyOfIndex) {
        return vue.openBlock(), vue.createBlock(_component_v_window_item, {
          key: "".concat(_ctx.control.path, "-").concat(anyOfIndex)
        }, {
          "default": vue.withCtx(function () {
            return [_ctx.selectedIndex === anyOfIndex ? (vue.openBlock(), vue.createBlock(_component_dispatch_renderer, {
              key: 0,
              schema: anyOfRenderInfo.schema,
              uischema: anyOfRenderInfo.uischema,
              path: _ctx.control.path,
              renderers: _ctx.control.renderers,
              cells: _ctx.control.cells,
              enabled: _ctx.control.enabled
            }, null, 8, ["schema", "uischema", "path", "renderers", "cells", "enabled"])) : vue.createCommentVNode("", true)];
          }),
          _: 2
        }, 1024);
      }), 128))];
    }),
    _: 1
  }, 8, ["modelValue"])])) : vue.createCommentVNode("", true);
}

controlRenderer$n.render = render$o;

var controlRenderer$m = vue.defineComponent({
  name: 'array-control-renderer',
  components: {
    DispatchCell: vue$1.DispatchCell,
    DispatchRenderer: vue$1.DispatchRenderer,
    VCard: components.VCard,
    VCardTitle: components.VCardTitle,
    VCardText: components.VCardText,
    VAvatar: components.VAvatar,
    VRow: components.VRow,
    VCol: components.VCol,
    VToolbar: components.VToolbar,
    VToolbarTitle: components.VToolbarTitle,
    VTooltip: components.VTooltip,
    VIcon: components.VIcon,
    VBtn: components.VBtn,
    VSpacer: components.VSpacer,
    VContainer: components.VContainer,
    ValidationIcon: script$3,
    ValidationBadge: script$4,
    VTable: components.VTable
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    return useVuetifyArrayControl(vue$1.useJsonFormsArrayControl(props));
  },
  computed: {
    arraySchema: function arraySchema() {
      return core.Resolve.schema(this.control.rootSchema, this.control.uischema.scope, this.control.rootSchema);
    },
    dataLength: function dataLength() {
      return this.control.data ? this.control.data.length : 0;
    }
  },
  methods: {
    composePaths: core.composePaths,
    createDefaultValue: core.createDefaultValue,
    addButtonClick: function addButtonClick() {
      this.addItem(this.control.path, core.createDefaultValue(this.control.schema, this.control.rootSchema))();
    },
    moveUpClick: function moveUpClick(event, toMove) {
      var _this$moveUp;
      event.stopPropagation();
      (_this$moveUp = this.moveUp) === null || _this$moveUp === void 0 ? void 0 : _this$moveUp.call(this, this.control.path, toMove)();
    },
    moveDownClick: function moveDownClick(event, toMove) {
      var _this$moveDown;
      event.stopPropagation();
      (_this$moveDown = this.moveDown) === null || _this$moveDown === void 0 ? void 0 : _this$moveDown.call(this, this.control.path, toMove)();
    },
    removeItemsClick: function removeItemsClick(event, toDelete) {
      var _this$removeItems;
      event.stopPropagation();
      (_this$removeItems = this.removeItems) === null || _this$removeItems === void 0 ? void 0 : _this$removeItems.call(this, this.control.path, toDelete)();
    },
    getValidColumnProps: function getValidColumnProps(scopedSchema) {
      if (scopedSchema.type === 'object' && _typeof(scopedSchema.properties) === 'object') {
        return Object.keys(scopedSchema.properties).filter(function (prop) {
          return scopedSchema.properties[prop].type !== 'array';
        });
      }
      return [''];
    },
    title: function title(prop) {
      var _this$control$schema$, _this$control$schema$2, _this$control$schema$3;
      return (_this$control$schema$ = (_this$control$schema$2 = this.control.schema.properties) === null || _this$control$schema$2 === void 0 ? void 0 : (_this$control$schema$3 = _this$control$schema$2[prop]) === null || _this$control$schema$3 === void 0 ? void 0 : _this$control$schema$3.title) !== null && _this$control$schema$ !== void 0 ? _this$control$schema$ : startCase(prop);
    },
    resolveUiSchema: function resolveUiSchema(propName) {
      return this.control.schema.properties ? this.controlWithoutLabel("#/properties/".concat(propName)) : this.controlWithoutLabel('#');
    },
    controlWithoutLabel: function controlWithoutLabel(scope) {
      return {
        type: 'Control',
        scope: scope,
        label: false
      };
    }
  }
});
var entry$m = {
  renderer: controlRenderer$m,
  tester: core.rankWith(3, core.or(core.isObjectArrayControl, core.isPrimitiveArrayControl))
};

var _hoisted_1$4 = {
  key: 0
};
function render$n(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_toolbar_title = vue.resolveComponent("v-toolbar-title");
  var _component_validation_icon = vue.resolveComponent("validation-icon");
  var _component_v_spacer = vue.resolveComponent("v-spacer");
  var _component_v_icon = vue.resolveComponent("v-icon");
  var _component_v_btn = vue.resolveComponent("v-btn");
  var _component_v_tooltip = vue.resolveComponent("v-tooltip");
  var _component_v_toolbar = vue.resolveComponent("v-toolbar");
  var _component_v_card_title = vue.resolveComponent("v-card-title");
  var _component_dispatch_renderer = vue.resolveComponent("dispatch-renderer");
  var _component_v_table = vue.resolveComponent("v-table");
  var _component_v_row = vue.resolveComponent("v-row");
  var _component_v_container = vue.resolveComponent("v-container");
  var _component_v_card_text = vue.resolveComponent("v-card-text");
  var _component_v_card = vue.resolveComponent("v-card");
  return _ctx.control.visible ? (vue.openBlock(), vue.createBlock(_component_v_card, {
    key: 0,
    "class": vue.normalizeClass(_ctx.styles.arrayList.root),
    elevation: "0"
  }, {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_card_title, null, {
        "default": vue.withCtx(function () {
          return [vue.createVNode(_component_v_toolbar, {
            flat: "",
            "class": vue.normalizeClass(_ctx.styles.arrayList.toolbar)
          }, {
            "default": vue.withCtx(function () {
              return [vue.createVNode(_component_v_toolbar_title, {
                "class": vue.normalizeClass(_ctx.styles.arrayList.label)
              }, {
                "default": vue.withCtx(function () {
                  return [vue.createTextVNode(vue.toDisplayString(_ctx.computedLabel), 1)];
                }),
                _: 1
              }, 8, ["class"]), _ctx.control.childErrors.length > 0 ? (vue.openBlock(), vue.createBlock(_component_validation_icon, {
                key: 0,
                errors: _ctx.control.childErrors
              }, null, 8, ["errors"])) : vue.createCommentVNode("", true), vue.createVNode(_component_v_spacer), vue.createVNode(_component_v_tooltip, {
                bottom: ""
              }, {
                activator: vue.withCtx(function (_ref) {
                  var props = _ref.props;
                  return [vue.createVNode(_component_v_btn, vue.mergeProps({
                    fab: "",
                    text: "",
                    elevation: "0",
                    small: "",
                    "aria-label": "Add to ".concat(_ctx.control.label)
                  }, props, {
                    "class": _ctx.styles.arrayList.addButton,
                    disabled: !_ctx.control.enabled || _ctx.appliedOptions.restrict && _ctx.arraySchema !== undefined && _ctx.arraySchema.maxItems !== undefined && _ctx.dataLength >= _ctx.arraySchema.maxItems,
                    onClick: _ctx.addButtonClick
                  }), {
                    "default": vue.withCtx(function () {
                      return [vue.createVNode(_component_v_icon, null, {
                        "default": vue.withCtx(function () {
                          return [vue.createTextVNode("mdi-plus")];
                        }),
                        _: 1
                      })];
                    }),
                    _: 2
                  }, 1040, ["aria-label", "class", "disabled", "onClick"])];
                }),
                "default": vue.withCtx(function () {
                  return [vue.createTextVNode(" " + vue.toDisplayString("Add to ".concat(_ctx.control.label)), 1)];
                }),
                _: 1
              })];
            }),
            _: 1
          }, 8, ["class"])];
        }),
        _: 1
      }), vue.createVNode(_component_v_card_text, null, {
        "default": vue.withCtx(function () {
          return [vue.createVNode(_component_v_container, {
            "justify-space-around": "",
            "align-content-center": ""
          }, {
            "default": vue.withCtx(function () {
              return [vue.createVNode(_component_v_row, {
                justify: "center"
              }, {
                "default": vue.withCtx(function () {
                  return [vue.createVNode(_component_v_table, {
                    "class": "array-container flex"
                  }, {
                    "default": vue.withCtx(function () {
                      return [_ctx.control.schema.type === 'object' ? (vue.openBlock(), vue.createElementBlock("thead", _hoisted_1$4, [vue.createElementVNode("tr", null, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.getValidColumnProps(_ctx.control.schema), function (prop, index) {
                        return vue.openBlock(), vue.createElementBlock("th", {
                          key: "".concat(_ctx.control.path, "-header-").concat(index),
                          scope: "col"
                        }, vue.toDisplayString(_ctx.title(prop)), 1);
                      }), 128)), _ctx.control.enabled ? (vue.openBlock(), vue.createElementBlock("th", {
                        key: 0,
                        "class": vue.normalizeClass(_ctx.appliedOptions.showSortButtons ? 'fixed-cell' : 'fixed-cell-small'),
                        scope: "col"
                      }, null, 2)) : vue.createCommentVNode("", true)])])) : vue.createCommentVNode("", true), vue.createElementVNode("tbody", null, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.control.data, function (element, index) {
                        return vue.openBlock(), vue.createElementBlock("tr", {
                          key: "".concat(_ctx.control.path, "-").concat(index),
                          "class": vue.normalizeClass(_ctx.styles.arrayList.item)
                        }, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.getValidColumnProps(_ctx.control.schema), function (propName) {
                          return vue.openBlock(), vue.createElementBlock("td", {
                            key: _ctx.composePaths(_ctx.composePaths(_ctx.control.path, "".concat(index)), propName)
                          }, [vue.createVNode(_component_dispatch_renderer, {
                            schema: _ctx.control.schema,
                            uischema: _ctx.resolveUiSchema(propName),
                            path: _ctx.composePaths(_ctx.control.path, "".concat(index)),
                            enabled: _ctx.control.enabled,
                            renderers: _ctx.control.renderers,
                            cells: _ctx.control.cells
                          }, null, 8, ["schema", "uischema", "path", "enabled", "renderers", "cells"])]);
                        }), 128)), _ctx.control.enabled ? (vue.openBlock(), vue.createElementBlock("td", {
                          key: 0,
                          "class": vue.normalizeClass(_ctx.appliedOptions.showSortButtons ? 'fixed-cell' : 'fixed-cell-small')
                        }, [vue.createVNode(_component_v_tooltip, {
                          bottom: ""
                        }, {
                          activator: vue.withCtx(function (_ref2) {
                            var props = _ref2.props;
                            return [_ctx.appliedOptions.showSortButtons ? (vue.openBlock(), vue.createBlock(_component_v_btn, vue.mergeProps({
                              key: 0
                            }, props, {
                              fab: "",
                              text: "",
                              elevation: "0",
                              small: "",
                              "aria-label": "Move up",
                              disabled: index <= 0 || !_ctx.control.enabled,
                              "class": _ctx.styles.arrayList.itemMoveUp,
                              onClick: function onClick($event) {
                                return _ctx.moveUpClick($event, index);
                              }
                            }), {
                              "default": vue.withCtx(function () {
                                return [vue.createVNode(_component_v_icon, {
                                  "class": "notranslate"
                                }, {
                                  "default": vue.withCtx(function () {
                                    return [vue.createTextVNode("mdi-arrow-up")];
                                  }),
                                  _: 1
                                })];
                              }),
                              _: 2
                            }, 1040, ["disabled", "class", "onClick"])) : vue.createCommentVNode("", true)];
                          }),
                          "default": vue.withCtx(function () {
                            return [vue.createTextVNode(" Move Up ")];
                          }),
                          _: 2
                        }, 1024), vue.createVNode(_component_v_tooltip, {
                          bottom: ""
                        }, {
                          activator: vue.withCtx(function (_ref3) {
                            var props = _ref3.props;
                            return [_ctx.appliedOptions.showSortButtons ? (vue.openBlock(), vue.createBlock(_component_v_btn, vue.mergeProps({
                              key: 0
                            }, props, {
                              fab: "",
                              text: "",
                              elevation: "0",
                              small: "",
                              "aria-label": "Move down",
                              disabled: index >= _ctx.dataLength - 1 || !_ctx.control.enabled,
                              "class": _ctx.styles.arrayList.itemMoveDown,
                              onClick: function onClick($event) {
                                return _ctx.moveDownClick($event, index);
                              }
                            }), {
                              "default": vue.withCtx(function () {
                                return [vue.createVNode(_component_v_icon, {
                                  "class": "notranslate"
                                }, {
                                  "default": vue.withCtx(function () {
                                    return [vue.createTextVNode("mdi-arrow-down")];
                                  }),
                                  _: 1
                                })];
                              }),
                              _: 2
                            }, 1040, ["disabled", "class", "onClick"])) : vue.createCommentVNode("", true)];
                          }),
                          "default": vue.withCtx(function () {
                            return [vue.createTextVNode(" Move Down ")];
                          }),
                          _: 2
                        }, 1024), vue.createVNode(_component_v_tooltip, {
                          bottom: ""
                        }, {
                          activator: vue.withCtx(function (_ref4) {
                            var props = _ref4.props;
                            return [vue.createVNode(_component_v_btn, vue.mergeProps(props, {
                              fab: "",
                              text: "",
                              elevation: "0",
                              small: "",
                              "aria-label": "Delete",
                              "class": _ctx.styles.arrayList.itemDelete,
                              disabled: !_ctx.control.enabled || _ctx.appliedOptions.restrict && _ctx.arraySchema !== undefined && _ctx.arraySchema.minItems !== undefined && _ctx.dataLength <= _ctx.arraySchema.minItems,
                              onClick: function onClick($event) {
                                return _ctx.removeItemsClick($event, [index]);
                              }
                            }), {
                              "default": vue.withCtx(function () {
                                return [vue.createVNode(_component_v_icon, {
                                  "class": "notranslate"
                                }, {
                                  "default": vue.withCtx(function () {
                                    return [vue.createTextVNode("mdi-delete")];
                                  }),
                                  _: 1
                                })];
                              }),
                              _: 2
                            }, 1040, ["class", "disabled", "onClick"])];
                          }),
                          "default": vue.withCtx(function () {
                            return [vue.createTextVNode(" Delete ")];
                          }),
                          _: 2
                        }, 1024)], 2)) : vue.createCommentVNode("", true)], 2);
                      }), 128))])];
                    }),
                    _: 1
                  })];
                }),
                _: 1
              })];
            }),
            _: 1
          }), _ctx.dataLength === 0 ? (vue.openBlock(), vue.createBlock(_component_v_container, {
            key: 0,
            "class": vue.normalizeClass(_ctx.styles.arrayList.noData)
          }, {
            "default": vue.withCtx(function () {
              return [vue.createTextVNode(" No data ")];
            }),
            _: 1
          }, 8, ["class"])) : vue.createCommentVNode("", true)];
        }),
        _: 1
      })];
    }),
    _: 1
  }, 8, ["class"])) : vue.createCommentVNode("", true);
}

controlRenderer$m.render = render$n;
controlRenderer$m.__scopeId = "data-v-5b6f5c3b";

var controlRenderer$l = vue.defineComponent({
  name: 'enum-array-renderer',
  components: {
    VCheckbox: components.VCheckbox,
    VContainer: components.VContainer,
    VRow: components.VRow,
    VCol: components.VCol
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    return useVuetifyBasicControl(vue$1.useJsonFormsMultiEnumControl(props));
  },
  methods: {
    dataHasEnum: function dataHasEnum(value) {
      var _this$control$data;
      return !!((_this$control$data = this.control.data) !== null && _this$control$data !== void 0 && _this$control$data.includes(value));
    },
    composePaths: core.composePaths,
    toggle: function toggle(value) {
      if (!this.dataHasEnum(value)) {
        this.addItem(this.control.path, value);
      } else {
        var _this$removeItem;
        (_this$removeItem = this.removeItem) === null || _this$removeItem === void 0 ? void 0 : _this$removeItem.call(this, this.control.path, value);
      }
    }
  }
});
var hasOneOfItems = function hasOneOfItems(schema) {
  return schema.oneOf !== undefined && schema.oneOf.length > 0 && schema.oneOf.every(function (entry) {
    return entry["const"] !== undefined;
  });
};
var hasEnumItems = function hasEnumItems(schema) {
  return schema.type === 'string' && schema["enum"] !== undefined;
};
var entry$l = {
  renderer: controlRenderer$l,
  tester: core.rankWith(5, core.and(core.uiTypeIs('Control'), core.and(core.schemaMatches(function (schema) {
    return core.hasType(schema, 'array') && !Array.isArray(schema.items) && schema.uniqueItems === true;
  }), core.schemaSubPathMatches('items', function (schema) {
    return hasOneOfItems(schema) || hasEnumItems(schema);
  }))))
};

function render$m(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_checkbox = vue.resolveComponent("v-checkbox");
  var _component_v_col = vue.resolveComponent("v-col");
  var _component_v_row = vue.resolveComponent("v-row");
  var _component_v_container = vue.resolveComponent("v-container");
  return _ctx.control.visible ? (vue.openBlock(), vue.createBlock(_component_v_container, {
    key: 0,
    fluid: ""
  }, {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_row, null, {
        "default": vue.withCtx(function () {
          return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.control.options, function (o, index) {
            return vue.openBlock(), vue.createBlock(_component_v_col, {
              key: o.value
            }, {
              "default": vue.withCtx(function () {
                return [vue.createVNode(_component_v_checkbox, vue.mergeProps({
                  label: o.label,
                  "model-value": _ctx.dataHasEnum(o.value),
                  id: _ctx.control.id + "-input-".concat(index),
                  path: _ctx.composePaths(_ctx.control.path, "".concat(index)),
                  "error-messages": _ctx.control.errors,
                  disabled: !_ctx.control.enabled,
                  indeterminate: _ctx.control.data === undefined
                }, _ctx.vuetifyProps("v-checkbox[".concat(o.value, "]")), {
                  onChange: function onChange(value) {
                    return _ctx.toggle(o.value);
                  }
                }), null, 16, ["label", "model-value", "id", "path", "error-messages", "disabled", "indeterminate", "onChange"])];
              }),
              _: 2
            }, 1024);
          }), 128))];
        }),
        _: 1
      })];
    }),
    _: 1
  })) : vue.createCommentVNode("", true);
}

controlRenderer$l.render = render$m;

var controlRenderer$k = vue.defineComponent({
  name: 'object-renderer',
  components: {
    DispatchRenderer: vue$1.DispatchRenderer,
    AdditionalProperties: script$1
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    var control = useVuetifyControl(vue$1.useJsonFormsControlWithDetail(props));
    var nested = useNested('object');
    return _objectSpread2(_objectSpread2({}, control), {}, {
      input: control,
      nested: nested
    });
  },
  computed: {
    hasAdditionalProperties: function hasAdditionalProperties() {
      return !isEmpty(this.control.schema.patternProperties) || isObject(this.control.schema.additionalProperties)
      ;
    },
    showAdditionalProperties: function showAdditionalProperties() {
      var _this$control$uischem;
      var showAdditionalProperties = (_this$control$uischem = this.control.uischema.options) === null || _this$control$uischem === void 0 ? void 0 : _this$control$uischem.showAdditionalProperties;
      return showAdditionalProperties === undefined || showAdditionalProperties === true;
    },
    detailUiSchema: function detailUiSchema() {
      var _this = this;
      var uiSchemaGenerator = function uiSchemaGenerator() {
        var uiSchema = core.Generate.uiSchema(_this.control.schema, 'Group');
        if (isEmpty(_this.control.path)) {
          uiSchema.type = 'VerticalLayout';
        } else {
          uiSchema.label = _this.control.label;
        }
        return uiSchema;
      };
      var result = core.findUISchema(this.control.uischemas, this.control.schema, this.control.uischema.scope, this.control.path, uiSchemaGenerator, this.control.uischema, this.control.rootSchema);
      if (this.nested.level > 0) {
        result = cloneDeep(result);
        result.options = _objectSpread2(_objectSpread2({}, result.options), {}, {
          bare: true,
          alignLeft: this.nested.level >= 4 || this.nested.parentElement === 'array'
        });
      }
      return result;
    }
  }
});
var entry$k = {
  renderer: controlRenderer$k,
  tester: core.rankWith(2, core.isObjectControl)
};

var _hoisted_1$3 = {
  key: 0
};
function render$l(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_dispatch_renderer = vue.resolveComponent("dispatch-renderer");
  var _component_additional_properties = vue.resolveComponent("additional-properties");
  return _ctx.control.visible ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, [vue.createVNode(_component_dispatch_renderer, {
    visible: _ctx.control.visible,
    enabled: _ctx.control.enabled,
    schema: _ctx.control.schema,
    uischema: _ctx.detailUiSchema,
    path: _ctx.control.path,
    renderers: _ctx.control.renderers,
    cells: _ctx.control.cells
  }, null, 8, ["visible", "enabled", "schema", "uischema", "path", "renderers", "cells"]), _ctx.hasAdditionalProperties && _ctx.showAdditionalProperties ? (vue.openBlock(), vue.createBlock(_component_additional_properties, {
    key: 0,
    input: _ctx.input
  }, null, 8, ["input"])) : vue.createCommentVNode("", true)])) : vue.createCommentVNode("", true);
}

controlRenderer$k.render = render$l;

var controlRenderer$j = vue.defineComponent({
  name: 'one-of-select-renderer',
  components: {
    DispatchRenderer: vue$1.DispatchRenderer,
    CombinatorProperties: script$2,
    VDialog: components.VDialog,
    VCard: components.VCard,
    VCardTitle: components.VCardTitle,
    VCardText: components.VCardText,
    VCardActions: components.VCardActions,
    VSpacer: components.VSpacer,
    VBtn: components.VBtn,
    VSelect: components.VSelect,
    VHover: components.VHover
  },
  directives: {
    DisabledIconFocus: DisabledIconFocus
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    var input = vue$1.useJsonFormsOneOfControl(props);
    var control = input.control.value;
    var selectedIndex = vue.ref(control.indexOfFittingSchema);
    var selectIndex = vue.ref(selectedIndex.value);
    var newSelectedIndex = vue.ref(0);
    var dialog = vue.ref(false);
    var t = useTranslator();
    return _objectSpread2(_objectSpread2({}, useVuetifyControl(input)), {}, {
      selectedIndex: selectedIndex,
      selectIndex: selectIndex,
      dialog: dialog,
      newSelectedIndex: newSelectedIndex,
      t: t
    });
  },
  computed: {
    indexedOneOfRenderInfos: function indexedOneOfRenderInfos() {
      var result = core.createCombinatorRenderInfos(
      this.control.schema.oneOf, this.control.rootSchema, 'oneOf', this.control.uischema, this.control.path, this.control.uischemas);
      return result.filter(function (info) {
        return info.uischema;
      }).map(function (info, index) {
        return _objectSpread2(_objectSpread2({}, info), {}, {
          index: index
        });
      });
    }
  },
  methods: {
    handleSelectChange: function handleSelectChange() {
      var _this = this;
      if (this.control.enabled && !isEmpty(this.control.data)) {
        this.dialog = true;
        this.$nextTick(function () {
          _this.newSelectedIndex = _this.selectIndex;
          _this.selectIndex = _this.selectedIndex;
        });
        setTimeout(function () {
          return (
            _this.$refs.confirm.$el.focus()
          );
        });
      } else {
        this.$nextTick(function () {
          _this.selectedIndex = _this.selectIndex;
        });
      }
    },
    confirm: function confirm() {
      this.newSelection();
      this.dialog = false;
    },
    cancel: function cancel() {
      this.newSelectedIndex = this.selectedIndex;
      this.dialog = false;
    },
    newSelection: function newSelection() {
      this.handleChange(this.path, this.newSelectedIndex !== undefined && this.newSelectedIndex !== null ? core.createDefaultValue(this.indexedOneOfRenderInfos[this.newSelectedIndex].schema, this.control.rootSchema) : {});
      this.selectIndex = this.newSelectedIndex;
      this.selectedIndex = this.newSelectedIndex;
    }
  }
});
var entry$j = {
  renderer: controlRenderer$j,
  tester: core.rankWith(3, core.isOneOfControl)
};

var _hoisted_1$2 = {
  key: 0
};
function render$k(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_combinator_properties = vue.resolveComponent("combinator-properties");
  var _component_v_select = vue.resolveComponent("v-select");
  var _component_v_hover = vue.resolveComponent("v-hover");
  var _component_dispatch_renderer = vue.resolveComponent("dispatch-renderer");
  var _component_v_card_title = vue.resolveComponent("v-card-title");
  var _component_v_card_text = vue.resolveComponent("v-card-text");
  var _component_v_spacer = vue.resolveComponent("v-spacer");
  var _component_v_btn = vue.resolveComponent("v-btn");
  var _component_v_card_actions = vue.resolveComponent("v-card-actions");
  var _component_v_card = vue.resolveComponent("v-card");
  var _component_v_dialog = vue.resolveComponent("v-dialog");
  var _directive_disabled_icon_focus = vue.resolveDirective("disabled-icon-focus");
  return _ctx.control.visible ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [vue.createVNode(_component_combinator_properties, {
    schema: _ctx.control.schema,
    combinatorKeyword: "oneOf",
    path: _ctx.path
  }, null, 8, ["schema", "path"]), vue.createVNode(_component_v_hover, null, {
    "default": vue.withCtx(function (_ref) {
      var isHovering = _ref.isHovering;
      return [vue.withDirectives(vue.createVNode(_component_v_select, vue.mergeProps({
        id: _ctx.control.id + '-input',
        "class": _ctx.styles.control.input,
        disabled: !_ctx.control.enabled,
        autofocus: _ctx.appliedOptions.focus,
        placeholder: _ctx.appliedOptions.placeholder,
        label: _ctx.computedLabel,
        hint: _ctx.control.description,
        "persistent-hint": _ctx.persistentHint(),
        required: _ctx.control.required,
        "error-messages": _ctx.control.errors,
        clearable: isHovering,
        items: _ctx.indexedOneOfRenderInfos,
        onChange: _ctx.handleSelectChange,
        "item-title": function itemTitle(item) {
          return _ctx.t(item.label, item.label);
        },
        "item-value": "index",
        modelValue: _ctx.selectIndex,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          return _ctx.selectIndex = $event;
        })
      }, _ctx.vuetifyProps('v-select'), {
        onFocus: _ctx.handleFocus,
        onBlur: _ctx.handleBlur
      }), null, 16, ["id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "clearable", "items", "onChange", "item-title", "modelValue", "onFocus", "onBlur"]), [[_directive_disabled_icon_focus]])];
    }),
    _: 1
  }), _ctx.selectedIndex !== undefined && _ctx.selectedIndex !== null ? (vue.openBlock(), vue.createBlock(_component_dispatch_renderer, {
    key: 0,
    schema: _ctx.indexedOneOfRenderInfos[_ctx.selectedIndex].schema,
    uischema: _ctx.indexedOneOfRenderInfos[_ctx.selectedIndex].uischema,
    path: _ctx.control.path,
    renderers: _ctx.control.renderers,
    cells: _ctx.control.cells,
    enabled: _ctx.control.enabled
  }, null, 8, ["schema", "uischema", "path", "renderers", "cells", "enabled"])) : vue.createCommentVNode("", true), vue.createVNode(_component_v_dialog, {
    modelValue: _ctx.dialog,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return _ctx.dialog = $event;
    }),
    persistent: "",
    "max-width": "600",
    onKeydown: vue.withKeys(_ctx.cancel, ["esc"])
  }, {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_card, null, {
        "default": vue.withCtx(function () {
          return [vue.createVNode(_component_v_card_title, {
            "class": "text-h5"
          }, {
            "default": vue.withCtx(function () {
              return [vue.createTextVNode(" Clear form? ")];
            }),
            _: 1
          }), vue.createVNode(_component_v_card_text, null, {
            "default": vue.withCtx(function () {
              return [vue.createTextVNode(" Your data will be cleared if you select this new option. Do you want to proceed? ")];
            }),
            _: 1
          }), vue.createVNode(_component_v_card_actions, null, {
            "default": vue.withCtx(function () {
              return [vue.createVNode(_component_v_spacer), vue.createVNode(_component_v_btn, {
                text: "",
                onClick: _ctx.cancel
              }, {
                "default": vue.withCtx(function () {
                  return [vue.createTextVNode(" No ")];
                }),
                _: 1
              }, 8, ["onClick"]), vue.createVNode(_component_v_btn, {
                text: "",
                ref: "confirm",
                onClick: _ctx.confirm
              }, {
                "default": vue.withCtx(function () {
                  return [vue.createTextVNode(" Yes ")];
                }),
                _: 1
              }, 8, ["onClick"])];
            }),
            _: 1
          })];
        }),
        _: 1
      })];
    }),
    _: 1
  }, 8, ["modelValue", "onKeydown"])])) : vue.createCommentVNode("", true);
}

controlRenderer$j.render = render$k;

var controlRenderer$i = vue.defineComponent({
  name: 'one-of-renderer',
  components: {
    DispatchRenderer: vue$1.DispatchRenderer,
    CombinatorProperties: script$2,
    VDialog: components.VDialog,
    VCard: components.VCard,
    VCardTitle: components.VCardTitle,
    VCardText: components.VCardText,
    VCardActions: components.VCardActions,
    VSpacer: components.VSpacer,
    VBtn: components.VBtn,
    VTabs: components.VTabs,
    VTab: components.VTab,
    VWindow: components.VWindow,
    VWindowItem: components.VWindowItem
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    var input = vue$1.useJsonFormsOneOfControl(props);
    var control = input.control.value;
    var selectedIndex = vue.ref(control.indexOfFittingSchema || 0);
    var tabIndex = vue.ref(selectedIndex.value);
    var newSelectedIndex = vue.ref(0);
    var dialog = vue.ref(false);
    return _objectSpread2(_objectSpread2({}, useVuetifyControl(input)), {}, {
      selectedIndex: selectedIndex,
      tabIndex: tabIndex,
      dialog: dialog,
      newSelectedIndex: newSelectedIndex
    });
  },
  computed: {
    oneOfRenderInfos: function oneOfRenderInfos() {
      var result = core.createCombinatorRenderInfos(
      this.control.schema.oneOf, this.control.rootSchema, 'oneOf', this.control.uischema, this.control.path, this.control.uischemas);
      return result.filter(function (info) {
        return info.uischema;
      });
    }
  },
  methods: {
    handleTabChange: function handleTabChange() {
      var _this = this;
      if (this.control.enabled && !isEmpty(this.control.data)) {
        this.dialog = true;
        this.$nextTick(function () {
          _this.newSelectedIndex = _this.tabIndex;
          _this.tabIndex = _this.selectedIndex;
        });
        setTimeout(function () {
          return (
            _this.$refs.confirm.$el.focus()
          );
        });
      } else {
        this.$nextTick(function () {
          _this.selectedIndex = _this.tabIndex;
        });
      }
    },
    confirm: function confirm() {
      this.openNewTab();
      this.dialog = false;
    },
    cancel: function cancel() {
      this.newSelectedIndex = this.selectedIndex;
      this.dialog = false;
    },
    openNewTab: function openNewTab() {
      this.handleChange(this.path, core.createDefaultValue(this.oneOfRenderInfos[this.newSelectedIndex].schema, this.control.rootSchema));
      this.tabIndex = this.newSelectedIndex;
      this.selectedIndex = this.newSelectedIndex;
    }
  }
});
var entry$i = {
  renderer: controlRenderer$i,
  tester: core.rankWith(4, core.and(core.isOneOfControl, core.optionIs('variant', 'tab')))
};

var _hoisted_1$1 = {
  key: 0
};
function render$j(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_combinator_properties = vue.resolveComponent("combinator-properties");
  var _component_v_tab = vue.resolveComponent("v-tab");
  var _component_v_tabs = vue.resolveComponent("v-tabs");
  var _component_dispatch_renderer = vue.resolveComponent("dispatch-renderer");
  var _component_v_window_item = vue.resolveComponent("v-window-item");
  var _component_v_window = vue.resolveComponent("v-window");
  var _component_v_card_title = vue.resolveComponent("v-card-title");
  var _component_v_card_text = vue.resolveComponent("v-card-text");
  var _component_v_spacer = vue.resolveComponent("v-spacer");
  var _component_v_btn = vue.resolveComponent("v-btn");
  var _component_v_card_actions = vue.resolveComponent("v-card-actions");
  var _component_v_card = vue.resolveComponent("v-card");
  var _component_v_dialog = vue.resolveComponent("v-dialog");
  return _ctx.control.visible ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [vue.createVNode(_component_combinator_properties, {
    schema: _ctx.control.schema,
    combinatorKeyword: "oneOf",
    path: _ctx.path
  }, null, 8, ["schema", "path"]), vue.createVNode(_component_v_tabs, {
    modelValue: _ctx.tabIndex,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return _ctx.tabIndex = $event;
    })
  }, {
    "default": vue.withCtx(function () {
      return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.oneOfRenderInfos, function (oneOfRenderInfo, oneOfIndex) {
        return vue.openBlock(), vue.createBlock(_component_v_tab, {
          onChange: _ctx.handleTabChange,
          key: "".concat(_ctx.control.path, "-").concat(oneOfIndex)
        }, {
          "default": vue.withCtx(function () {
            return [vue.createTextVNode(vue.toDisplayString(oneOfRenderInfo.label), 1)];
          }),
          _: 2
        }, 1032, ["onChange"]);
      }), 128))];
    }),
    _: 1
  }, 8, ["modelValue"]), vue.createVNode(_component_v_window, {
    modelValue: _ctx.selectedIndex,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return _ctx.selectedIndex = $event;
    })
  }, {
    "default": vue.withCtx(function () {
      return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.oneOfRenderInfos, function (oneOfRenderInfo, oneOfIndex) {
        return vue.openBlock(), vue.createBlock(_component_v_window_item, {
          key: "".concat(_ctx.control.path, "-").concat(oneOfIndex)
        }, {
          "default": vue.withCtx(function () {
            return [_ctx.selectedIndex === oneOfIndex ? (vue.openBlock(), vue.createBlock(_component_dispatch_renderer, {
              key: 0,
              schema: oneOfRenderInfo.schema,
              uischema: oneOfRenderInfo.uischema,
              path: _ctx.control.path,
              renderers: _ctx.control.renderers,
              cells: _ctx.control.cells,
              enabled: _ctx.control.enabled
            }, null, 8, ["schema", "uischema", "path", "renderers", "cells", "enabled"])) : vue.createCommentVNode("", true)];
          }),
          _: 2
        }, 1024);
      }), 128))];
    }),
    _: 1
  }, 8, ["modelValue"]), vue.createVNode(_component_v_dialog, {
    modelValue: _ctx.dialog,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return _ctx.dialog = $event;
    }),
    persistent: "",
    "max-width": "600",
    onKeydown: vue.withKeys(_ctx.cancel, ["esc"])
  }, {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_card, null, {
        "default": vue.withCtx(function () {
          return [vue.createVNode(_component_v_card_title, {
            "class": "text-h5"
          }, {
            "default": vue.withCtx(function () {
              return [vue.createTextVNode(" Clear form? ")];
            }),
            _: 1
          }), vue.createVNode(_component_v_card_text, null, {
            "default": vue.withCtx(function () {
              return [vue.createTextVNode(" Your data will be cleared if you navigate away from this tab. Do you want to proceed? ")];
            }),
            _: 1
          }), vue.createVNode(_component_v_card_actions, null, {
            "default": vue.withCtx(function () {
              return [vue.createVNode(_component_v_spacer), vue.createVNode(_component_v_btn, {
                text: "",
                onClick: _ctx.cancel
              }, {
                "default": vue.withCtx(function () {
                  return [vue.createTextVNode(" No ")];
                }),
                _: 1
              }, 8, ["onClick"]), vue.createVNode(_component_v_btn, {
                text: "",
                ref: "confirm",
                onClick: _ctx.confirm
              }, {
                "default": vue.withCtx(function () {
                  return [vue.createTextVNode(" Yes ")];
                }),
                _: 1
              }, 8, ["onClick"])];
            }),
            _: 1
          })];
        }),
        _: 1
      })];
    }),
    _: 1
  }, 8, ["modelValue", "onKeydown"])])) : vue.createCommentVNode("", true);
}

controlRenderer$i.render = render$j;

var complexRenderers = [entry$o, entry$n, entry$m, entry$l, entry$k, entry$j, entry$i];

var script = vue.defineComponent({
  name: 'control-wrapper',
  props: {
    id: {
      required: true,
      type: String
    },
    visible: {
      required: false,
      type: Boolean,
      "default": true
    },
    styles: {
      required: true,
      type: Object
    }
  }
});

var _hoisted_1 = ["id"];
function render$i(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.visible ? (vue.openBlock(), vue.createElementBlock("div", {
    key: 0,
    "class": vue.normalizeClass(_ctx.styles.control.root),
    id: _ctx.id
  }, [vue.renderSlot(_ctx.$slots, "default")], 10, _hoisted_1)) : vue.createCommentVNode("", true);
}

script.render = render$i;

var controlRenderer$h = vue.defineComponent({
  name: 'anyof-string-or-enum-control-renderer',
  components: {
    ControlWrapper: script,
    VHover: components.VHover,
    VCombobox: components.VCombobox
  },
  directives: {
    DisabledIconFocus: DisabledIconFocus
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    return useVuetifyControl(vue$1.useJsonFormsControl(props), function (value) {
      return value || undefined;
    });
  },
  computed: {
    items: function items() {
      return findEnumSchema(this.control.schema.anyOf)["enum"];
    }
  }
});
var findEnumSchema = function findEnumSchema(schemas) {
  return schemas.find(function (s) {
    return s["enum"] !== undefined && (s.type === 'string' || s.type === undefined);
  });
};
var findTextSchema = function findTextSchema(schemas) {
  return schemas.find(function (s) {
    return s.type === 'string' && s["enum"] === undefined;
  });
};
var hasEnumAndText = function hasEnumAndText(schemas) {
  var enumSchema = findEnumSchema(schemas);
  var stringSchema = findTextSchema(schemas);
  var remainingSchemas = schemas.filter(function (s) {
    return s !== enumSchema || s !== stringSchema;
  });
  var wrongType = remainingSchemas.find(function (s) {
    return s.type && s.type !== 'string';
  });
  return !!enumSchema && !!stringSchema && !wrongType;
};
var simpleAnyOf = core.and(core.uiTypeIs('Control'), core.schemaMatches(function (schema) {
  return Array.isArray(schema.anyOf) && hasEnumAndText(schema.anyOf);
}));
var entry$h = {
  renderer: controlRenderer$h,
  tester: core.rankWith(5, simpleAnyOf)
};

function render$h(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_combobox = vue.resolveComponent("v-combobox");
  var _component_v_hover = vue.resolveComponent("v-hover");
  var _component_control_wrapper = vue.resolveComponent("control-wrapper");
  var _directive_disabled_icon_focus = vue.resolveDirective("disabled-icon-focus");
  return vue.openBlock(), vue.createBlock(_component_control_wrapper, vue.mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_hover, null, {
        "default": vue.withCtx(function (_ref) {
          var isHovering = _ref.isHovering;
          return [vue.withDirectives(vue.createVNode(_component_v_combobox, vue.mergeProps({
            id: _ctx.control.id + '-input',
            "class": _ctx.styles.control.input,
            disabled: !_ctx.control.enabled,
            autofocus: _ctx.appliedOptions.focus,
            placeholder: _ctx.appliedOptions.placeholder,
            label: _ctx.computedLabel,
            hint: _ctx.control.description,
            "persistent-hint": _ctx.persistentHint(),
            required: _ctx.control.required,
            "error-messages": _ctx.control.errors,
            "model-value": _ctx.control.data,
            maxlength: _ctx.appliedOptions.restrict ? _ctx.control.schema.maxLength : undefined,
            counter: _ctx.control.schema.maxLength !== undefined ? _ctx.control.schema.maxLength : undefined,
            items: _ctx.items,
            clearable: isHovering
          }, _ctx.vuetifyProps('v-combobox'), {
            "onUpdate:modelValue": _ctx.onChange,
            onFocus: _ctx.handleFocus,
            onBlur: _ctx.handleBlur
          }), null, 16, ["id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "model-value", "maxlength", "counter", "items", "clearable", "onUpdate:modelValue", "onFocus", "onBlur"]), [[_directive_disabled_icon_focus]])];
        }),
        _: 1
      })];
    }),
    _: 1
  }, 16, ["styles", "isFocused", "appliedOptions"]);
}

controlRenderer$h.render = render$h;

var controlRenderer$g = vue.defineComponent({
  name: 'boolean-control-renderer',
  components: {
    VCheckbox: components.VCheckbox,
    ControlWrapper: script
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    return useVuetifyControl(vue$1.useJsonFormsControl(props), function (value) {
      return value || false;
    });
  }
});
var entry$g = {
  renderer: controlRenderer$g,
  tester: core.rankWith(1, core.isBooleanControl)
};

function render$g(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_checkbox = vue.resolveComponent("v-checkbox");
  var _component_control_wrapper = vue.resolveComponent("control-wrapper");
  return vue.openBlock(), vue.createBlock(_component_control_wrapper, vue.mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_checkbox, vue.mergeProps({
        id: _ctx.control.id + '-input',
        "class": _ctx.styles.control.input,
        disabled: !_ctx.control.enabled,
        autofocus: _ctx.appliedOptions.focus,
        placeholder: _ctx.appliedOptions.placeholder,
        label: _ctx.computedLabel,
        hint: _ctx.control.description,
        "persistent-hint": _ctx.persistentHint(),
        required: _ctx.control.required,
        "error-messages": _ctx.control.errors,
        indeterminate: _ctx.control.data === undefined,
        "model-value": _ctx.control.data
      }, _ctx.vuetifyProps('v-checkbox'), {
        "onUpdate:modelValue": _ctx.onChange,
        onFocus: _ctx.handleFocus,
        onBlur: _ctx.handleBlur
      }), null, 16, ["id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "indeterminate", "model-value", "onUpdate:modelValue", "onFocus", "onBlur"])];
    }),
    _: 1
  }, 16, ["styles", "isFocused", "appliedOptions"]);
}

controlRenderer$g.render = render$g;

var controlRenderer$f = vue.defineComponent({
  name: 'boolean-toggle-control-renderer',
  components: {
    ControlWrapper: script,
    VSwitch: components.VSwitch
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    return useVuetifyControl(vue$1.useJsonFormsControl(props), function (value) {
      return value || false;
    });
  }
});
var entry$f = {
  renderer: controlRenderer$f,
  tester: core.rankWith(3, core.and(core.isBooleanControl, core.optionIs('toggle', true)))
};

function render$f(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_switch = vue.resolveComponent("v-switch");
  var _component_control_wrapper = vue.resolveComponent("control-wrapper");
  return vue.openBlock(), vue.createBlock(_component_control_wrapper, vue.mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_switch, vue.mergeProps({
        id: _ctx.control.id + '-input',
        "class": _ctx.styles.control.input,
        disabled: !_ctx.control.enabled,
        autofocus: _ctx.appliedOptions.focus,
        placeholder: _ctx.appliedOptions.placeholder,
        label: _ctx.computedLabel,
        hint: _ctx.control.description,
        "persistent-hint": _ctx.persistentHint(),
        required: _ctx.control.required,
        "error-messages": _ctx.control.errors,
        "input-value": _ctx.control.data,
        "model-value": _ctx.control.data,
        "true-value": true,
        "false-value": false
      }, _ctx.vuetifyProps('v-switch'), {
        "onUpdate:modelValue": _ctx.onChange,
        onFocus: _ctx.handleFocus,
        onBlur: _ctx.handleBlur
      }), null, 16, ["id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "input-value", "model-value", "onUpdate:modelValue", "onFocus", "onBlur"])];
    }),
    _: 1
  }, 16, ["styles", "isFocused", "appliedOptions"]);
}

controlRenderer$f.render = render$f;

var controlRenderer$e = vue.defineComponent({
  name: 'date-control-renderer',
  components: {
    ControlWrapper: script,
    VTextField: components.VTextField
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    var adaptValue = function adaptValue(value) {
      return value || undefined;
    };
    var control = useVuetifyControl(vue$1.useJsonFormsControl(props), adaptValue);
    return _objectSpread2(_objectSpread2({}, control), {}, {
      adaptValue: adaptValue
    });
  }
});
var entry$e = {
  renderer: controlRenderer$e,
  tester: core.rankWith(2, core.isDateControl)
};

function render$e(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_text_field = vue.resolveComponent("v-text-field");
  var _component_control_wrapper = vue.resolveComponent("control-wrapper");
  return vue.openBlock(), vue.createBlock(_component_control_wrapper, vue.mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_text_field, vue.mergeProps({
        id: _ctx.control.id + '-input',
        "class": _ctx.styles.control.input,
        disabled: !_ctx.control.enabled,
        autofocus: _ctx.appliedOptions.focus,
        placeholder: _ctx.appliedOptions.placeholder,
        label: _ctx.computedLabel,
        hint: _ctx.control.description,
        "persistent-hint": _ctx.persistentHint(),
        required: _ctx.control.required,
        "error-messages": _ctx.control.errors
      }, _ctx.vuetifyProps('v-text-field'), {
        "model-value": _ctx.control.data,
        "onUpdate:modelValue": _ctx.onChange,
        onFocus: _ctx.handleFocus,
        onBlur: _ctx.handleBlur,
        type: "date"
      }), null, 16, ["id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "model-value", "onUpdate:modelValue", "onFocus", "onBlur"])];
    }),
    _: 1
  }, 16, ["styles", "isFocused", "appliedOptions"]);
}

controlRenderer$e.render = render$e;

var toISOString = function toISOString(inputDateTime) {
  return inputDateTime === '' ? undefined : inputDateTime + ':00.000Z';
};
var controlRenderer$d = vue.defineComponent({
  name: 'datetime-control-renderer',
  components: {
    ControlWrapper: script,
    VTextField: components.VTextField
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    var adaptValue = function adaptValue(value) {
      return toISOString(value) || undefined;
    };
    var control = useVuetifyControl(vue$1.useJsonFormsControl(props), adaptValue);
    return _objectSpread2(_objectSpread2({}, control), {}, {
      adaptValue: adaptValue
    });
  },
  computed: {
    dataTime: function dataTime() {
      var _this$control$data;
      return ((_this$control$data = this.control.data) !== null && _this$control$data !== void 0 ? _this$control$data : '').substr(0, 16);
    }
  }
});
var entry$d = {
  renderer: controlRenderer$d,
  tester: core.rankWith(2, core.isDateTimeControl)
};

function render$d(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_text_field = vue.resolveComponent("v-text-field");
  var _component_control_wrapper = vue.resolveComponent("control-wrapper");
  return vue.openBlock(), vue.createBlock(_component_control_wrapper, vue.mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_text_field, vue.mergeProps({
        id: _ctx.control.id + '-input',
        "class": _ctx.styles.control.input,
        disabled: !_ctx.control.enabled,
        autofocus: _ctx.appliedOptions.focus,
        placeholder: _ctx.appliedOptions.placeholder,
        label: _ctx.computedLabel,
        hint: _ctx.control.description,
        "persistent-hint": _ctx.persistentHint(),
        required: _ctx.control.required,
        "error-messages": _ctx.control.errors
      }, _ctx.vuetifyProps('v-text-field'), {
        "model-value": _ctx.dataTime,
        "onUpdate:modelValue": _ctx.onChange,
        onFocus: _ctx.handleFocus,
        onBlur: _ctx.handleBlur,
        type: "datetime-local"
      }), null, 16, ["id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "model-value", "onUpdate:modelValue", "onFocus", "onBlur"])];
    }),
    _: 1
  }, 16, ["styles", "isFocused", "appliedOptions"]);
}

controlRenderer$d.render = render$d;

var controlRenderer$c = vue.defineComponent({
  name: 'enum-control-renderer',
  components: {
    ControlWrapper: script,
    VSelect: components.VSelect,
    VHover: components.VHover
  },
  directives: {
    DisabledIconFocus: DisabledIconFocus
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    var t = useTranslator();
    var control = useVuetifyControl(vue$1.useJsonFormsEnumControl(props), function (value) {
      return value !== null ? value : undefined;
    });
    return _objectSpread2(_objectSpread2({}, control), {}, {
      t: t
    });
  }
});
var entry$c = {
  renderer: controlRenderer$c,
  tester: core.rankWith(2, core.isEnumControl)
};

function render$c(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_select = vue.resolveComponent("v-select");
  var _component_v_hover = vue.resolveComponent("v-hover");
  var _component_control_wrapper = vue.resolveComponent("control-wrapper");
  var _directive_disabled_icon_focus = vue.resolveDirective("disabled-icon-focus");
  return vue.openBlock(), vue.createBlock(_component_control_wrapper, vue.mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_hover, null, {
        "default": vue.withCtx(function (_ref) {
          var isHovering = _ref.isHovering;
          return [vue.withDirectives(vue.createVNode(_component_v_select, vue.mergeProps({
            id: _ctx.control.id + '-input',
            "class": _ctx.styles.control.input,
            disabled: !_ctx.control.enabled,
            autofocus: _ctx.appliedOptions.focus,
            placeholder: _ctx.appliedOptions.placeholder,
            label: _ctx.computedLabel,
            hint: _ctx.control.description,
            "persistent-hint": _ctx.persistentHint(),
            required: _ctx.control.required,
            "error-messages": _ctx.control.errors,
            clearable: isHovering,
            "model-value": _ctx.control.data,
            items: _ctx.control.options,
            "item-title": function itemTitle(item) {
              return _ctx.t(item.label, item.label);
            },
            "item-value": "value"
          }, _ctx.vuetifyProps('v-select'), {
            "onUpdate:modelValue": _ctx.onChange,
            onFocus: _ctx.handleFocus,
            onBlur: _ctx.handleBlur
          }), null, 16, ["id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "clearable", "model-value", "items", "item-title", "onUpdate:modelValue", "onFocus", "onBlur"]), [[_directive_disabled_icon_focus]])];
        }),
        _: 1
      })];
    }),
    _: 1
  }, 16, ["styles", "isFocused", "appliedOptions"]);
}

controlRenderer$c.render = render$c;

var NUMBER_REGEX_TEST$1 = /^[+-]?\d+([.]\d+)?([eE][+-]?\d+)?$/;
var controlRenderer$b = vue.defineComponent({
  name: 'integer-control-renderer',
  components: {
    ControlWrapper: script,
    VHover: components.VHover,
    VTextField: components.VTextField
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    var adaptValue = function adaptValue(value) {
      return typeof value === 'number' ? value : value || undefined;
    };
    var input = useVuetifyControl(vue$1.useJsonFormsControl(props), adaptValue);
    var inputValue = vue.ref(vue.unref(input.control).data || '');
    return _objectSpread2(_objectSpread2({}, input), {}, {
      adaptValue: adaptValue,
      inputValue: inputValue
    });
  },
  computed: {
    step: function step() {
      var _options$step;
      var options = this.appliedOptions;
      return (_options$step = options.step) !== null && _options$step !== void 0 ? _options$step : 1;
    },
    allowUnsafeInteger: function allowUnsafeInteger() {
      return this.appliedOptions.allowUnsafeInteger;
    }
  },
  methods: {
    onInputChange: function onInputChange(value) {
      this.inputValue = value;
      this.onChange(this.toNumberOrString(value));
    },
    toNumberOrString: function toNumberOrString(value) {
      if (NUMBER_REGEX_TEST$1.test(value)) {
        var num = Number.parseFloat(value);
        if (Number.isFinite(num) && (this.allowUnsafeInteger || Number.isSafeInteger(num))) {
          return num;
        }
      }
      return value;
    }
  }
});
var entry$b = {
  renderer: controlRenderer$b,
  tester: core.rankWith(1, core.isIntegerControl)
};

function render$b(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_text_field = vue.resolveComponent("v-text-field");
  var _component_v_hover = vue.resolveComponent("v-hover");
  var _component_control_wrapper = vue.resolveComponent("control-wrapper");
  return vue.openBlock(), vue.createBlock(_component_control_wrapper, vue.mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_hover, null, {
        "default": vue.withCtx(function (_ref) {
          var isHovering = _ref.isHovering;
          return [vue.createVNode(_component_v_text_field, vue.mergeProps({
            ref: "input",
            step: _ctx.step,
            id: _ctx.control.id + '-input',
            "class": _ctx.styles.control.input,
            disabled: !_ctx.control.enabled,
            autofocus: _ctx.appliedOptions.focus,
            placeholder: _ctx.appliedOptions.placeholder,
            label: _ctx.computedLabel,
            hint: _ctx.control.description,
            "persistent-hint": _ctx.persistentHint(),
            required: _ctx.control.required,
            "error-messages": _ctx.control.errors,
            "model-value": _ctx.inputValue,
            clearable: isHovering
          }, _ctx.vuetifyProps('v-text-field'), {
            "onUpdate:modelValue": _ctx.onInputChange,
            onFocus: _ctx.handleFocus,
            onBlur: _ctx.handleBlur
          }), null, 16, ["step", "id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "model-value", "clearable", "onUpdate:modelValue", "onFocus", "onBlur"])];
        }),
        _: 1
      })];
    }),
    _: 1
  }, 16, ["styles", "isFocused", "appliedOptions"]);
}

controlRenderer$b.render = render$b;

var controlRenderer$a = vue.defineComponent({
  name: 'multi-string-control-renderer',
  components: {
    ControlWrapper: script,
    VHover: components.VHover,
    VTextarea: components.VTextarea
  },
  directives: {
    DisabledIconFocus: DisabledIconFocus
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    return useVuetifyControl(vue$1.useJsonFormsControl(props), function (value) {
      return value || undefined;
    }, 300);
  }
});
var entry$a = {
  renderer: controlRenderer$a,
  tester: core.rankWith(2, core.and(core.isStringControl, core.isMultiLineControl))
};

function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_textarea = vue.resolveComponent("v-textarea");
  var _component_v_hover = vue.resolveComponent("v-hover");
  var _component_control_wrapper = vue.resolveComponent("control-wrapper");
  var _directive_disabled_icon_focus = vue.resolveDirective("disabled-icon-focus");
  return vue.openBlock(), vue.createBlock(_component_control_wrapper, vue.mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_hover, null, {
        "default": vue.withCtx(function (_ref) {
          var isHovering = _ref.isHovering;
          return [vue.withDirectives(vue.createVNode(_component_v_textarea, vue.mergeProps({
            id: _ctx.control.id + '-input',
            "class": _ctx.styles.control.input,
            disabled: !_ctx.control.enabled,
            autofocus: _ctx.appliedOptions.focus,
            placeholder: _ctx.appliedOptions.placeholder,
            label: _ctx.computedLabel,
            hint: _ctx.control.description,
            "persistent-hint": _ctx.persistentHint(),
            required: _ctx.control.required,
            "error-messages": _ctx.control.errors,
            "model-value": _ctx.control.data,
            maxlength: _ctx.appliedOptions.restrict ? _ctx.control.schema.maxLength : undefined,
            size: _ctx.appliedOptions.trim && _ctx.control.schema.maxLength !== undefined ? _ctx.control.schema.maxLength : undefined,
            clearable: isHovering,
            "multi-line": ""
          }, _ctx.vuetifyProps('v-textarea'), {
            "onUpdate:modelValue": _ctx.onChange,
            onFocus: _ctx.handleFocus,
            onBlur: _ctx.handleBlur
          }), null, 16, ["id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "model-value", "maxlength", "size", "clearable", "onUpdate:modelValue", "onFocus", "onBlur"]), [[_directive_disabled_icon_focus]])];
        }),
        _: 1
      })];
    }),
    _: 1
  }, 16, ["styles", "isFocused", "appliedOptions"]);
}

controlRenderer$a.render = render$a;

var NUMBER_REGEX_TEST = /^[+-]?\d+([.]\d+)?([eE][+-]?\d+)?$/;
var controlRenderer$9 = vue.defineComponent({
  name: 'number-control-renderer',
  components: {
    ControlWrapper: script,
    VHover: components.VHover,
    VTextField: components.VTextField
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    var adaptValue = function adaptValue(value) {
      return typeof value === 'number' ? value : value || undefined;
    };
    var input = useVuetifyControl(vue$1.useJsonFormsControl(props), adaptValue);
    var inputValue = vue.ref(vue.unref(input.control).data || '');
    return _objectSpread2(_objectSpread2({}, input), {}, {
      adaptValue: adaptValue,
      inputValue: inputValue
    });
  },
  computed: {
    step: function step() {
      var _options$step;
      var options = this.appliedOptions;
      return (_options$step = options.step) !== null && _options$step !== void 0 ? _options$step : 0.1;
    }
  },
  methods: {
    onInputChange: function onInputChange(value) {
      var _this = this;
      this.inputValue = value;
      var result = this.toNumberOrString(value);
      if (typeof result === 'number') {
        var inputStringIsInExponentForm = this.inputValue.includes('E') || this.inputValue.includes('e');
        var numberAsString = inputStringIsInExponentForm ? result.toExponential() : result.toPrecision();
        var numberIsInExponentForm = numberAsString.includes('E') || numberAsString.includes('e');
        if (this.inputValue !== numberAsString && inputStringIsInExponentForm === numberIsInExponentForm
        ) {
          this.$nextTick(function () {
            return _this.inputValue = numberAsString;
          });
        }
      }
      this.onChange(result);
    },
    toNumberOrString: function toNumberOrString(value) {
      if (NUMBER_REGEX_TEST.test(value)) {
        var num = Number.parseFloat(value);
        if (Number.isFinite(num)) {
          return num;
        }
      }
      return value;
    }
  }
});
var entry$9 = {
  renderer: controlRenderer$9,
  tester: core.rankWith(1, core.isNumberControl)
};

function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_text_field = vue.resolveComponent("v-text-field");
  var _component_v_hover = vue.resolveComponent("v-hover");
  var _component_control_wrapper = vue.resolveComponent("control-wrapper");
  return vue.openBlock(), vue.createBlock(_component_control_wrapper, vue.mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_hover, null, {
        "default": vue.withCtx(function (_ref) {
          var isHovering = _ref.isHovering;
          return [vue.createVNode(_component_v_text_field, vue.mergeProps({
            ref: "input",
            step: _ctx.step,
            id: _ctx.control.id + '-input',
            "class": _ctx.styles.control.input,
            disabled: !_ctx.control.enabled,
            autofocus: _ctx.appliedOptions.focus,
            placeholder: _ctx.appliedOptions.placeholder,
            label: _ctx.computedLabel,
            hint: _ctx.control.description,
            "persistent-hint": _ctx.persistentHint(),
            required: _ctx.control.required,
            "error-messages": _ctx.control.errors,
            "model-value": _ctx.inputValue,
            clearable: isHovering
          }, _ctx.vuetifyProps('v-text-field'), {
            "onUpdate:modelValue": _ctx.onInputChange,
            onFocus: _ctx.handleFocus,
            onBlur: _ctx.handleBlur
          }), null, 16, ["step", "id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "model-value", "clearable", "onUpdate:modelValue", "onFocus", "onBlur"])];
        }),
        _: 1
      })];
    }),
    _: 1
  }, 16, ["styles", "isFocused", "appliedOptions"]);
}

controlRenderer$9.render = render$9;

var controlRenderer$8 = vue.defineComponent({
  name: 'oneof-enum-control-renderer',
  components: {
    ControlWrapper: script,
    VSelect: components.VSelect,
    VHover: components.VHover
  },
  directives: {
    DisabledIconFocus: DisabledIconFocus
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    var t = useTranslator();
    var control = useVuetifyControl(vue$1.useJsonFormsOneOfEnumControl(props), function (value) {
      return value !== null ? value : undefined;
    });
    return _objectSpread2(_objectSpread2({}, control), {}, {
      t: t
    });
  }
});
var entry$8 = {
  renderer: controlRenderer$8,
  tester: core.rankWith(5, core.isOneOfEnumControl)
};

function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_select = vue.resolveComponent("v-select");
  var _component_v_hover = vue.resolveComponent("v-hover");
  var _component_control_wrapper = vue.resolveComponent("control-wrapper");
  var _directive_disabled_icon_focus = vue.resolveDirective("disabled-icon-focus");
  return vue.openBlock(), vue.createBlock(_component_control_wrapper, vue.mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_hover, null, {
        "default": vue.withCtx(function (_ref) {
          var isHovering = _ref.isHovering;
          return [vue.withDirectives(vue.createVNode(_component_v_select, vue.mergeProps({
            id: _ctx.control.id + '-input',
            "class": _ctx.styles.control.input,
            disabled: !_ctx.control.enabled,
            autofocus: _ctx.appliedOptions.focus,
            placeholder: _ctx.appliedOptions.placeholder,
            label: _ctx.computedLabel,
            hint: _ctx.control.description,
            "persistent-hint": _ctx.persistentHint(),
            required: _ctx.control.required,
            "error-messages": _ctx.control.errors,
            clearable: isHovering,
            "model-value": _ctx.control.data,
            items: _ctx.control.options,
            "item-title": function itemTitle(item) {
              return _ctx.t(item.label, item.label);
            },
            "item-value": "value"
          }, _ctx.vuetifyProps('v-select'), {
            "onUpdate:modelValue": _ctx.onChange,
            onFocus: _ctx.handleFocus,
            onBlur: _ctx.handleBlur
          }), null, 16, ["id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "clearable", "model-value", "items", "item-title", "onUpdate:modelValue", "onFocus", "onBlur"]), [[_directive_disabled_icon_focus]])];
        }),
        _: 1
      })];
    }),
    _: 1
  }, 16, ["styles", "isFocused", "appliedOptions"]);
}

controlRenderer$8.render = render$8;

var controlRenderer$7 = vue.defineComponent({
  name: 'oneof-radio-group-control-renderer',
  components: {
    ControlWrapper: script,
    VRadioGroup: components.VRadioGroup,
    VRadio: components.VRadio,
    VLabel: components.VLabel
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    return useVuetifyControl(vue$1.useJsonFormsOneOfEnumControl(props));
  }
});
var entry$7 = {
  renderer: controlRenderer$7,
  tester: core.rankWith(20, core.and(core.isOneOfEnumControl, core.optionIs('format', 'radio')))
};

function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_label = vue.resolveComponent("v-label");
  var _component_v_radio = vue.resolveComponent("v-radio");
  var _component_v_radio_group = vue.resolveComponent("v-radio-group");
  var _component_control_wrapper = vue.resolveComponent("control-wrapper");
  return vue.openBlock(), vue.createBlock(_component_control_wrapper, vue.mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_label, vue.mergeProps({
        "for": _ctx.control.id + '-input'
      }, _ctx.vuetifyProps('v-label')), {
        "default": vue.withCtx(function () {
          return [vue.createTextVNode(vue.toDisplayString(_ctx.computedLabel), 1)];
        }),
        _: 1
      }, 16, ["for"]), vue.createVNode(_component_v_radio_group, vue.mergeProps({
        id: _ctx.control.id + '-input',
        "class": _ctx.styles.control.input,
        disabled: !_ctx.control.enabled,
        autofocus: _ctx.appliedOptions.focus,
        placeholder: _ctx.appliedOptions.placeholder,
        hint: _ctx.control.description,
        "persistent-hint": _ctx.persistentHint(),
        required: _ctx.control.required,
        "error-messages": _ctx.control.errors
      }, _ctx.vuetifyProps('v-radio-group'), {
        "model-value": _ctx.control.data,
        "onUpdate:modelValue": _ctx.onChange,
        onFocus: _ctx.handleFocus,
        onBlur: _ctx.handleBlur
      }), {
        "default": vue.withCtx(function () {
          return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.control.options, function (o) {
            return vue.openBlock(), vue.createBlock(_component_v_radio, vue.mergeProps(_ctx.vuetifyProps("v-radio[".concat(o.value, "]")), {
              key: o.value,
              label: o.label,
              value: o.value
            }), null, 16, ["label", "value"]);
          }), 128))];
        }),
        _: 1
      }, 16, ["id", "class", "disabled", "autofocus", "placeholder", "hint", "persistent-hint", "required", "error-messages", "model-value", "onUpdate:modelValue", "onFocus", "onBlur"])];
    }),
    _: 1
  }, 16, ["styles", "isFocused", "appliedOptions"]);
}

controlRenderer$7.render = render$7;

var controlRenderer$6 = vue.defineComponent({
  name: 'password-control-renderer',
  components: {
    ControlWrapper: script,
    VTextField: components.VTextField
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    var passwordVisible = vue.ref(false);
    return _objectSpread2(_objectSpread2({}, useVuetifyControl(vue$1.useJsonFormsControl(props), function (value) {
      return value || undefined;
    }, 300)), {}, {
      passwordVisible: passwordVisible
    });
  }
});
var entry$6 = {
  renderer: controlRenderer$6,
  tester: core.rankWith(2, core.and(core.isStringControl, core.formatIs('password')))
};

function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_text_field = vue.resolveComponent("v-text-field");
  var _component_control_wrapper = vue.resolveComponent("control-wrapper");
  return vue.openBlock(), vue.createBlock(_component_control_wrapper, vue.mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_text_field, vue.mergeProps({
        type: _ctx.passwordVisible ? 'text' : 'password',
        "append-icon": _ctx.passwordVisible ? 'mdi-eye' : 'mdi-eye-off',
        "onClick:append": _cache[0] || (_cache[0] = function () {
          return _ctx.passwordVisible = !_ctx.passwordVisible;
        }),
        id: _ctx.control.id + '-input',
        "class": _ctx.styles.control.input,
        disabled: !_ctx.control.enabled,
        autofocus: _ctx.appliedOptions.focus,
        placeholder: _ctx.appliedOptions.placeholder,
        label: _ctx.computedLabel,
        hint: _ctx.control.description,
        "persistent-hint": _ctx.persistentHint(),
        required: _ctx.control.required,
        "error-messages": _ctx.control.errors,
        "model-value": _ctx.control.data,
        maxlength: _ctx.appliedOptions.restrict ? _ctx.control.schema.maxLength : undefined,
        size: _ctx.appliedOptions.trim && _ctx.control.schema.maxLength !== undefined ? _ctx.control.schema.maxLength : undefined
      }, _ctx.vuetifyProps('v-text-field'), {
        "onUpdate:modelValue": _ctx.onChange,
        onFocus: _ctx.handleFocus,
        onBlur: _ctx.handleBlur
      }), null, 16, ["type", "append-icon", "id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "model-value", "maxlength", "size", "onUpdate:modelValue", "onFocus", "onBlur"])];
    }),
    _: 1
  }, 16, ["styles", "isFocused", "appliedOptions"]);
}

controlRenderer$6.render = render$6;

var controlRenderer$5 = vue.defineComponent({
  name: 'radio-group-control-renderer',
  components: {
    ControlWrapper: script,
    VRadioGroup: components.VRadioGroup,
    VRadio: components.VRadio,
    VLabel: components.VLabel
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    return useVuetifyControl(vue$1.useJsonFormsEnumControl(props));
  }
});
var entry$5 = {
  renderer: controlRenderer$5,
  tester: core.rankWith(20, core.and(core.isEnumControl, core.optionIs('format', 'radio')))
};

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_label = vue.resolveComponent("v-label");
  var _component_v_radio = vue.resolveComponent("v-radio");
  var _component_v_radio_group = vue.resolveComponent("v-radio-group");
  var _component_control_wrapper = vue.resolveComponent("control-wrapper");
  return vue.openBlock(), vue.createBlock(_component_control_wrapper, vue.mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_label, vue.mergeProps({
        "for": _ctx.control.id + '-input'
      }, _ctx.vuetifyProps('v-label')), {
        "default": vue.withCtx(function () {
          return [vue.createTextVNode(vue.toDisplayString(_ctx.computedLabel), 1)];
        }),
        _: 1
      }, 16, ["for"]), vue.createVNode(_component_v_radio_group, vue.mergeProps({
        id: _ctx.control.id + '-input',
        "class": _ctx.styles.control.input,
        disabled: !_ctx.control.enabled,
        autofocus: _ctx.appliedOptions.focus,
        placeholder: _ctx.appliedOptions.placeholder,
        hint: _ctx.control.description,
        "persistent-hint": _ctx.persistentHint(),
        required: _ctx.control.required,
        "error-messages": _ctx.control.errors,
        "model-value": _ctx.control.data
      }, _ctx.vuetifyProps('v-radio-group'), {
        "onUpdate:modelValue": _ctx.onChange,
        onFocus: _ctx.handleFocus,
        onBlur: _ctx.handleBlur
      }), {
        "default": vue.withCtx(function () {
          return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.control.options, function (o) {
            return vue.openBlock(), vue.createBlock(_component_v_radio, vue.mergeProps(_ctx.vuetifyProps("v-radio[".concat(o.value, "]")), {
              key: o.value,
              label: o.label,
              value: o.value
            }), null, 16, ["label", "value"]);
          }), 128))];
        }),
        _: 1
      }, 16, ["id", "class", "disabled", "autofocus", "placeholder", "hint", "persistent-hint", "required", "error-messages", "model-value", "onUpdate:modelValue", "onFocus", "onBlur"])];
    }),
    _: 1
  }, 16, ["styles", "isFocused", "appliedOptions"]);
}

controlRenderer$5.render = render$5;

var controlRenderer$4 = vue.defineComponent({
  name: 'slider-control-renderer',
  components: {
    ControlWrapper: script,
    VSlider: components.VSlider
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    return useVuetifyControl(vue$1.useJsonFormsControl(props), function (value) {
      return Number(value);
    });
  }
});
var entry$4 = {
  renderer: controlRenderer$4,
  tester: core.rankWith(4, core.isRangeControl)
};

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_slider = vue.resolveComponent("v-slider");
  var _component_control_wrapper = vue.resolveComponent("control-wrapper");
  return vue.openBlock(), vue.createBlock(_component_control_wrapper, vue.mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_slider, vue.mergeProps({
        step: _ctx.control.schema.multipleOf || 1,
        min: _ctx.control.schema.minimum,
        max: _ctx.control.schema.maximum,
        "thumb-label": true,
        id: _ctx.control.id + '-input',
        "class": _ctx.styles.control.input,
        disabled: !_ctx.control.enabled,
        autofocus: _ctx.appliedOptions.focus,
        placeholder: _ctx.appliedOptions.placeholder,
        label: _ctx.computedLabel,
        hint: _ctx.control.description,
        "persistent-hint": _ctx.persistentHint(),
        required: _ctx.control.required,
        "error-messages": _ctx.control.errors,
        "model-value": _ctx.control.data
      }, _ctx.vuetifyProps('v-slider'), {
        "onUpdate:modelValue": _ctx.onChange,
        onFocus: _ctx.handleFocus,
        onBlur: _ctx.handleBlur
      }), null, 16, ["step", "min", "max", "id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "model-value", "onUpdate:modelValue", "onFocus", "onBlur"])];
    }),
    _: 1
  }, 16, ["styles", "isFocused", "appliedOptions"]);
}

controlRenderer$4.render = render$4;

var controlRenderer$3 = vue.defineComponent({
  name: 'string-control-renderer',
  components: {
    ControlWrapper: script,
    VHover: components.VHover,
    VTextField: components.VTextField,
    VCombobox: components.VCombobox
  },
  directives: {
    DisabledIconFocus: DisabledIconFocus
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    return useVuetifyControl(vue$1.useJsonFormsControl(props), function (value) {
      return value || undefined;
    }, 300);
  },
  computed: {
    suggestions: function suggestions() {
      var _this$control$uischem;
      var suggestions = (_this$control$uischem = this.control.uischema.options) === null || _this$control$uischem === void 0 ? void 0 : _this$control$uischem.suggestion;
      if (suggestions === undefined || !isArray(suggestions) || !every(suggestions, isString)) {
        return undefined;
      }
      return suggestions;
    }
  }
});
var entry$3 = {
  renderer: controlRenderer$3,
  tester: core.rankWith(1, core.isStringControl)
};

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_combobox = vue.resolveComponent("v-combobox");
  var _component_v_text_field = vue.resolveComponent("v-text-field");
  var _component_v_hover = vue.resolveComponent("v-hover");
  var _component_control_wrapper = vue.resolveComponent("control-wrapper");
  var _directive_disabled_icon_focus = vue.resolveDirective("disabled-icon-focus");
  return vue.openBlock(), vue.createBlock(_component_control_wrapper, vue.mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_hover, null, {
        "default": vue.withCtx(function (_ref) {
          var isHovering = _ref.isHovering;
          return [_ctx.suggestions !== undefined ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_v_combobox, vue.mergeProps({
            key: 0,
            id: _ctx.control.id + '-input',
            "class": _ctx.styles.control.input,
            disabled: !_ctx.control.enabled,
            autofocus: _ctx.appliedOptions.focus,
            placeholder: _ctx.appliedOptions.placeholder,
            label: _ctx.computedLabel,
            hint: _ctx.control.description,
            "persistent-hint": _ctx.persistentHint(),
            required: _ctx.control.required,
            "error-messages": _ctx.control.errors,
            maxlength: _ctx.appliedOptions.restrict ? _ctx.control.schema.maxLength : undefined,
            counter: _ctx.control.schema.maxLength !== undefined ? _ctx.control.schema.maxLength : undefined,
            clearable: isHovering,
            "model-value": _ctx.control.data,
            items: _ctx.suggestions,
            "hide-no-data": ""
          }, _ctx.vuetifyProps('v-combobox'), {
            "onUpdate:modelValue": _ctx.onChange,
            onFocus: _ctx.handleFocus,
            onBlur: _ctx.handleBlur
          }), null, 16, ["id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "maxlength", "counter", "clearable", "model-value", "items", "onUpdate:modelValue", "onFocus", "onBlur"])), [[_directive_disabled_icon_focus]]) : (vue.openBlock(), vue.createBlock(_component_v_text_field, vue.mergeProps({
            key: 1,
            id: _ctx.control.id + '-input',
            "class": _ctx.styles.control.input,
            disabled: !_ctx.control.enabled,
            autofocus: _ctx.appliedOptions.focus,
            placeholder: _ctx.appliedOptions.placeholder,
            label: _ctx.computedLabel,
            hint: _ctx.control.description,
            "persistent-hint": _ctx.persistentHint(),
            required: _ctx.control.required,
            "error-messages": _ctx.control.errors,
            "model-value": _ctx.control.data,
            maxlength: _ctx.appliedOptions.restrict ? _ctx.control.schema.maxLength : undefined,
            counter: _ctx.control.schema.maxLength !== undefined ? _ctx.control.schema.maxLength : undefined,
            clearable: isHovering
          }, _ctx.vuetifyProps('v-text-field'), {
            "onUpdate:modelValue": _ctx.onChange,
            onFocus: _ctx.handleFocus,
            onBlur: _ctx.handleBlur
          }), null, 16, ["id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "model-value", "maxlength", "counter", "clearable", "onUpdate:modelValue", "onFocus", "onBlur"]))];
        }),
        _: 1
      })];
    }),
    _: 1
  }, 16, ["styles", "isFocused", "appliedOptions"]);
}

controlRenderer$3.render = render$3;

var appendSecondsIfNecessary = function appendSecondsIfNecessary(value) {
  if (typeof value === 'string') {
    var splitValue = value.split(':');
    if (splitValue.length === 2) {
      splitValue.push('00');
    }
    return splitValue.join(':');
  }
  return value;
};
var controlRenderer$2 = vue.defineComponent({
  name: 'time-control-renderer',
  components: {
    ControlWrapper: script,
    VTextField: components.VTextField
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    var adaptValue = function adaptValue(value) {
      return appendSecondsIfNecessary(value) || undefined;
    };
    var control = useVuetifyControl(vue$1.useJsonFormsControl(props), adaptValue);
    return _objectSpread2(_objectSpread2({}, control), {}, {
      adaptValue: adaptValue
    });
  }
});
var entry$2 = {
  renderer: controlRenderer$2,
  tester: core.rankWith(2, core.isTimeControl)
};

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_text_field = vue.resolveComponent("v-text-field");
  var _component_control_wrapper = vue.resolveComponent("control-wrapper");
  return vue.openBlock(), vue.createBlock(_component_control_wrapper, vue.mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_text_field, vue.mergeProps({
        id: _ctx.control.id + '-input',
        "class": _ctx.styles.control.input,
        disabled: !_ctx.control.enabled,
        autofocus: _ctx.appliedOptions.focus,
        placeholder: _ctx.appliedOptions.placeholder,
        label: _ctx.computedLabel,
        hint: _ctx.control.description,
        "persistent-hint": _ctx.persistentHint(),
        required: _ctx.control.required,
        "error-messages": _ctx.control.errors
      }, _ctx.vuetifyProps('v-text-field'), {
        "model-value": _ctx.control.data,
        "onUpdate:modelValue": _ctx.onChange,
        onFocus: _ctx.handleFocus,
        onBlur: _ctx.handleBlur,
        type: "time"
      }), null, 16, ["id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "model-value", "onUpdate:modelValue", "onFocus", "onBlur"])];
    }),
    _: 1
  }, 16, ["styles", "isFocused", "appliedOptions"]);
}

controlRenderer$2.render = render$2;

var controlRenderers = [entry$h, entry$g, entry$f, entry$e, entry$d, entry$c, entry$b, entry$a, entry$9, entry$8, entry$7, entry$6, entry$5, entry$4, entry$3,
entry$2];

var controlRenderer$1 = vue.defineComponent({
  name: 'autocomplete-enum-control-renderer',
  components: {
    ControlWrapper: script,
    VSelect: components.VSelect,
    VAutocomplete: components.VAutocomplete,
    VHover: components.VHover
  },
  directives: {
    DisabledIconFocus: DisabledIconFocus
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    var t = useTranslator();
    var control = useVuetifyControl(vue$1.useJsonFormsEnumControl(props), function (value) {
      return value !== null ? value : undefined;
    }, 300);
    return _objectSpread2(_objectSpread2({}, control), {}, {
      t: t
    });
  }
});
var entry$1 = {
  renderer: controlRenderer$1,
  tester: core.rankWith(10, core.isEnumControl)
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_select = vue.resolveComponent("v-select");
  var _component_v_autocomplete = vue.resolveComponent("v-autocomplete");
  var _component_v_hover = vue.resolveComponent("v-hover");
  var _component_control_wrapper = vue.resolveComponent("control-wrapper");
  var _directive_disabled_icon_focus = vue.resolveDirective("disabled-icon-focus");
  return vue.openBlock(), vue.createBlock(_component_control_wrapper, vue.mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_hover, null, {
        "default": vue.withCtx(function (_ref) {
          var isHovering = _ref.isHovering;
          return [_ctx.appliedOptions.autocomplete === false ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_v_select, vue.mergeProps({
            key: 0,
            id: _ctx.control.id + '-input',
            "class": _ctx.styles.control.input,
            disabled: !_ctx.control.enabled,
            autofocus: _ctx.appliedOptions.focus,
            placeholder: _ctx.appliedOptions.placeholder,
            label: _ctx.computedLabel,
            hint: _ctx.control.description,
            "persistent-hint": _ctx.persistentHint(),
            required: _ctx.control.required,
            "error-messages": _ctx.control.errors,
            clearable: isHovering,
            "model-value": _ctx.control.data,
            items: _ctx.control.options,
            "item-title": function itemTitle(item) {
              return _ctx.t(item.label, item.label);
            },
            "item-value": "value"
          }, _ctx.vuetifyProps('v-select'), {
            onChange: _ctx.onChange,
            onFocus: _ctx.handleFocus,
            onBlur: _ctx.handleBlur
          }), null, 16, ["id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "clearable", "model-value", "items", "item-title", "onChange", "onFocus", "onBlur"])), [[_directive_disabled_icon_focus]]) : vue.withDirectives((vue.openBlock(), vue.createBlock(_component_v_autocomplete, vue.mergeProps({
            key: 1,
            id: _ctx.control.id + '-input',
            "class": _ctx.styles.control.input,
            disabled: !_ctx.control.enabled,
            autofocus: _ctx.appliedOptions.focus,
            placeholder: _ctx.appliedOptions.placeholder,
            label: _ctx.computedLabel,
            hint: _ctx.control.description,
            "persistent-hint": _ctx.persistentHint(),
            required: _ctx.control.required,
            "error-messages": _ctx.control.errors,
            clearable: isHovering,
            "model-value": _ctx.control.data,
            items: _ctx.control.options,
            "item-title": function itemTitle(item) {
              return _ctx.t(item.label, item.label);
            },
            "item-value": "value"
          }, _ctx.vuetifyProps('v-autocomplete'), {
            "onUpdate:modelValue": _ctx.onChange,
            onFocus: _ctx.handleFocus,
            onBlur: _ctx.handleBlur
          }), null, 16, ["id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "clearable", "model-value", "items", "item-title", "onUpdate:modelValue", "onFocus", "onBlur"])), [[_directive_disabled_icon_focus]])];
        }),
        _: 1
      })];
    }),
    _: 1
  }, 16, ["styles", "isFocused", "appliedOptions"]);
}

controlRenderer$1.render = render$1;

var controlRenderer = vue.defineComponent({
  name: 'autocomplete-oneof-enum-control-renderer',
  components: {
    ControlWrapper: script,
    VSelect: components.VSelect,
    VAutocomplete: components.VAutocomplete,
    VHover: components.VHover
  },
  directives: {
    DisabledIconFocus: DisabledIconFocus
  },
  props: _objectSpread2({}, vue$1.rendererProps()),
  setup: function setup(props) {
    var t = useTranslator();
    var control = useVuetifyControl(vue$1.useJsonFormsOneOfEnumControl(props), function (value) {
      return value !== null ? value : undefined;
    }, 300);
    return _objectSpread2(_objectSpread2({}, control), {}, {
      t: t
    });
  }
});
var entry = {
  renderer: controlRenderer,
  tester: core.rankWith(10, core.isOneOfEnumControl)
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_select = vue.resolveComponent("v-select");
  var _component_v_autocomplete = vue.resolveComponent("v-autocomplete");
  var _component_v_hover = vue.resolveComponent("v-hover");
  var _component_control_wrapper = vue.resolveComponent("control-wrapper");
  var _directive_disabled_icon_focus = vue.resolveDirective("disabled-icon-focus");
  return vue.openBlock(), vue.createBlock(_component_control_wrapper, vue.mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": vue.withCtx(function () {
      return [vue.createVNode(_component_v_hover, null, {
        "default": vue.withCtx(function (_ref) {
          var isHovering = _ref.isHovering;
          return [_ctx.appliedOptions.autocomplete === false ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_v_select, vue.mergeProps({
            key: 0,
            id: _ctx.control.id + '-input',
            "class": _ctx.styles.control.input,
            disabled: !_ctx.control.enabled,
            autofocus: _ctx.appliedOptions.focus,
            placeholder: _ctx.appliedOptions.placeholder,
            label: _ctx.computedLabel,
            hint: _ctx.control.description,
            "persistent-hint": _ctx.persistentHint(),
            required: _ctx.control.required,
            "error-messages": _ctx.control.errors,
            clearable: isHovering,
            "model-value": _ctx.control.data,
            items: _ctx.control.options,
            "item-title": function itemTitle(item) {
              return _ctx.t(item.label, item.label);
            },
            "item-value": "value"
          }, _ctx.vuetifyProps('v-select'), {
            onChange: _ctx.onChange,
            onFocus: _ctx.handleFocus,
            onBlur: _ctx.handleBlur
          }), null, 16, ["id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "clearable", "model-value", "items", "item-title", "onChange", "onFocus", "onBlur"])), [[_directive_disabled_icon_focus]]) : vue.withDirectives((vue.openBlock(), vue.createBlock(_component_v_autocomplete, vue.mergeProps({
            key: 1,
            id: _ctx.control.id + '-input',
            "class": _ctx.styles.control.input,
            disabled: !_ctx.control.enabled,
            autofocus: _ctx.appliedOptions.focus,
            placeholder: _ctx.appliedOptions.placeholder,
            label: _ctx.computedLabel,
            hint: _ctx.control.description,
            "persistent-hint": _ctx.persistentHint(),
            required: _ctx.control.required,
            "error-messages": _ctx.control.errors,
            clearable: isHovering,
            "model-value": _ctx.control.data,
            items: _ctx.control.options,
            "item-title": function itemTitle(item) {
              return _ctx.t(item.label, item.label);
            },
            "item-value": "value"
          }, _ctx.vuetifyProps('v-autocomplete'), {
            "onUpdate:modelValue": _ctx.onChange,
            onFocus: _ctx.handleFocus,
            onBlur: _ctx.handleBlur
          }), null, 16, ["id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "clearable", "model-value", "items", "item-title", "onUpdate:modelValue", "onFocus", "onBlur"])), [[_directive_disabled_icon_focus]])];
        }),
        _: 1
      })];
    }),
    _: 1
  }, 16, ["styles", "isFocused", "appliedOptions"]);
}

controlRenderer.render = render;

var extendedRenderers = [entry$1, entry];

var vuetifyRenderers = [].concat(_toConsumableArray(additionalRenderers), _toConsumableArray(arrayRenderers), _toConsumableArray(complexRenderers), _toConsumableArray(controlRenderers), _toConsumableArray(layoutRenderers));
var extendedVuetifyRenderers = [].concat(_toConsumableArray(extendedRenderers), _toConsumableArray(vuetifyRenderers));

exports.AllOfRenderer = controlRenderer$o;
exports.AnyOfRenderer = controlRenderer$n;
exports.AnyOfStringOrEnumControlRenderer = controlRenderer$h;
exports.ArrayControlRenderer = controlRenderer$m;
exports.ArrayLayoutRenderer = controlRenderer$p;
exports.AutocompleteEnumControlRenderer = controlRenderer$1;
exports.AutocompleteOneOfEnumControlRenderer = controlRenderer;
exports.BooleanControlRenderer = controlRenderer$g;
exports.BooleanToggleControlRenderer = controlRenderer$f;
exports.CategorizationRenderer = layoutRenderer$3;
exports.ControlWrapper = script;
exports.DateControlRenderer = controlRenderer$e;
exports.DateTimeControlRenderer = controlRenderer$d;
exports.DisabledIconFocus = DisabledIconFocus;
exports.EnumArrayRenderer = controlRenderer$l;
exports.EnumControlRenderer = controlRenderer$c;
exports.GroupRenderer = layoutRenderer$2;
exports.HorizontalLayoutRenderer = layoutRenderer$1;
exports.IntegerControlRenderer = controlRenderer$b;
exports.LabelRenderer = labelRenderer;
exports.MultiStringControlRenderer = controlRenderer$a;
exports.NumberControlRenderer = controlRenderer$9;
exports.ObjectRenderer = controlRenderer$k;
exports.OneOfEnumControlRenderer = controlRenderer$8;
exports.OneOfRadioGroupControlRenderer = controlRenderer$7;
exports.OneOfRenderer = controlRenderer$j;
exports.OneOfTabRenderer = controlRenderer$i;
exports.PasswordControlRenderer = controlRenderer$6;
exports.RadioGroupControlRenderer = controlRenderer$5;
exports.SliderControlRenderer = controlRenderer$4;
exports.StringControlRenderer = controlRenderer$3;
exports.TimeControlRenderer = controlRenderer$2;
exports.ValidationBadge = script$4;
exports.ValidationIcon = script$3;
exports.VerticalLayoutRenderer = layoutRenderer;
exports.additionalRenderers = additionalRenderers;
exports.allOfRendererEntry = entry$o;
exports.anyOfRendererEntry = entry$n;
exports.anyOfStringOrEnumControlRendererEntry = entry$h;
exports.arrayControlRendererEntry = entry$m;
exports.arrayLayoutRendererEntry = entry$t;
exports.arrayListRendererEntry = arrayListRendererEntry;
exports.arrayRenderers = arrayRenderers;
exports.autocompleteEnumControlRendererEntry = entry$1;
exports.autocompleteOneOfEnumControlRendererEntry = entry;
exports.booleanControlRendererEntry = entry$g;
exports.booleanToggleControlRendererEntry = entry$f;
exports.categorizationRendererEntry = entry$s;
exports.classes = classes;
exports.complexRenderers = complexRenderers;
exports.controlRenderers = controlRenderers;
exports.createAjv = createAjv;
exports.dateControlRendererEntry = entry$e;
exports.dateTimeControlRendererEntry = entry$d;
exports.defaultStyles = defaultStyles;
exports.enumArrayRendererEntry = entry$l;
exports.enumControlRendererEntry = entry$c;
exports.extendedRenderers = extendedRenderers;
exports.extendedVuetifyRenderers = extendedVuetifyRenderers;
exports.groupRendererEntry = entry$r;
exports.horizontalLayoutRendererEntry = entry$q;
exports.i18nDefaultMessages = i18nDefaultMessages;
exports.integerControlRendererEntry = entry$b;
exports.labelRendererEntry = entry$u;
exports.layoutRenderers = layoutRenderers;
exports.mergeStyles = mergeStyles;
exports.multiStringControlRendererEntry = entry$a;
exports.numberControlRendererEntry = entry$9;
exports.objectRendererEntry = entry$k;
exports.oneOfEnumControlRendererEntry = entry$8;
exports.oneOfRadioGroupControlRendererEntry = entry$7;
exports.oneOfRendererEntry = entry$j;
exports.oneOfTabRendererEntry = entry$i;
exports.parseDateTime = parseDateTime;
exports.passwordControlRendererEntry = entry$6;
exports.radioGroupControlRendererEntry = entry$5;
exports.sliderControlRendererEntry = entry$4;
exports.stringControlRendererEntry = entry$3;
exports.timeControlRendererEntry = entry$2;
exports.useAjv = useAjv;
exports.useComputedLabel = useComputedLabel;
exports.useControlAppliedOptions = useControlAppliedOptions;
exports.useNested = useNested;
exports.useStyles = useStyles;
exports.useTranslator = useTranslator;
exports.useVuetifyArrayControl = useVuetifyArrayControl;
exports.useVuetifyBasicControl = useVuetifyBasicControl;
exports.useVuetifyControl = useVuetifyControl;
exports.useVuetifyLabel = useVuetifyLabel;
exports.useVuetifyLayout = useVuetifyLayout;
exports.verticalLayoutRendererEntry = entry$p;
exports.vuetifyRenderers = vuetifyRenderers;
//# sourceMappingURL=jsonforms-vue-vuetify.cjs.js.map
