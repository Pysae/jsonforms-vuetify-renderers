import { computeLabel, isDescriptionHidden, getFirstPrimitiveProp, Resolve, composePaths, createAjv as createAjv$1, rankWith, uiTypeIs, createLabelDescriptionFrom, createControlElement, findUISchema, createDefaultValue, getControlPath, getI18nKey, isObjectArrayWithNesting, isVisible, deriveLabelForUISchemaElement, and, categorizationHasCategory, isLayout, schemaTypeIs, Generate, validate, encode, findMatchingUISchema, createCombinatorRenderInfos, isAllOfControl, isAnyOfControl, or, isObjectArrayControl, isPrimitiveArrayControl, schemaMatches, hasType, schemaSubPathMatches, isObjectControl, isOneOfControl, optionIs, isBooleanControl, isDateControl, isDateTimeControl, isEnumControl, isIntegerControl, isStringControl, isMultiLineControl, isNumberControl, isOneOfEnumControl, formatIs, isRangeControl, isTimeControl } from '@jsonforms/core';
import { inject, computed, ref, provide, defineComponent, resolveComponent, openBlock, createBlock, mergeProps, withCtx, createTextVNode, toDisplayString, createCommentVNode, createElementVNode, createElementBlock, createVNode, normalizeProps, guardReactiveProps, renderSlot, Fragment, renderList, normalizeClass, normalizeStyle, withModifiers, withKeys, resolveDirective, withDirectives, unref } from 'vue';
import { DispatchRenderer, rendererProps, useJsonFormsLabel, useJsonFormsArrayControl, useJsonFormsLayout, useJsonFormsAllOfControl, useJsonFormsAnyOfControl, DispatchCell, useJsonFormsMultiEnumControl, useJsonFormsControlWithDetail, useJsonFormsOneOfControl, useJsonFormsControl, useJsonFormsEnumControl, useJsonFormsOneOfEnumControl } from '@jsonforms/vue';
import { VLabel, VBadge, VTooltip, VIcon, VCard, VCardActions, VCardTitle, VCardText, VAvatar, VDialog, VRow, VCol, VToolbar, VToolbarTitle, VBtn, VSpacer, VExpansionPanels, VExpansionPanel, VExpansionPanelTitle, VExpansionPanelText, VContainer, VTabs, VTab, VWindow, VWindowItem, VTextField, VHover, VTable, VCheckbox, VSelect, VCombobox, VSwitch, VTextarea, VRadioGroup, VRadio, VSlider, VAutocomplete } from 'vuetify/components';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import merge from 'lodash/merge';
import get from 'lodash/get';
import isPlainObject from 'lodash/isPlainObject';
import mergeWith from 'lodash/mergeWith';
import dayjs from 'dayjs';
import customParsing from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import findIndex from 'lodash/findIndex';
import omit from 'lodash/omit';
import startCase from 'lodash/startCase';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import every from 'lodash/every';
import isString from 'lodash/isString';

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
  var userStyles = inject('styles', defaultStyles);
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
  return computed(function () {
    return merge({}, cloneDeep(input.control.value.config), cloneDeep(input.control.value.uischema.options));
  });
};
var useComputedLabel = function useComputedLabel(input, appliedOptions) {
  return computed(function () {
    var _appliedOptions$value;
    return computeLabel(input.control.value.label, input.control.value.required, !!((_appliedOptions$value = appliedOptions.value) !== null && _appliedOptions$value !== void 0 && _appliedOptions$value.hideRequiredAsterisk));
  });
};
var useVuetifyLabel = function useVuetifyLabel(input) {
  var styles = useStyles(input.label.value.uischema);
  var appliedOptions = computed(function () {
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
  var touched = ref(false);
  var changeEmitter = typeof debounceWait === 'number' ? debounce(input.handleChange, debounceWait) : input.handleChange;
  var onChange = function onChange(value) {
    changeEmitter(input.control.value.path, adaptValue(value));
  };
  var appliedOptions = useControlAppliedOptions(input);
  var isFocused = ref(false);
  var handleFocus = function handleFocus() {
    isFocused.value = true;
  };
  var handleBlur = function handleBlur() {
    touched.value = true;
    isFocused.value = false;
  };
  var filteredErrors = computed(function () {
    return touched.value || !appliedOptions.value.enableFilterErrorsBeforeTouch ? input.control.value.errors : '';
  });
  var persistentHint = function persistentHint() {
    var _appliedOptions$value3;
    return !isDescriptionHidden(input.control.value.visible, input.control.value.description, isFocused.value, !!((_appliedOptions$value3 = appliedOptions.value) !== null && _appliedOptions$value3 !== void 0 && _appliedOptions$value3.showUnfocusedDescription));
  };
  var computedLabel = useComputedLabel(input, appliedOptions);
  var controlWrapper = computed(function () {
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
  var overwrittenControl = computed(function () {
    return _objectSpread2(_objectSpread2({}, input.control.value), {}, {
      errors: filteredErrors.value
    });
  });
  var rawErrors = computed(function () {
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
  var jsonforms = inject('jsonforms');
  if (!jsonforms) {
    throw new Error("'jsonforms couldn't be injected. Are you within JSON Forms?");
  }
  if (!jsonforms.i18n || !jsonforms.i18n.translate) {
    throw new Error("'jsonforms i18n couldn't be injected. Are you within JSON Forms?");
  }
  var translate = computed(function () {
    return jsonforms.i18n.translate;
  });
  return translate;
};
var useVuetifyLayout = function useVuetifyLayout(input) {
  var appliedOptions = computed(function () {
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
    var childLabelProp = (_input$control$value$ = (_input$control$value$2 = input.control.value.uischema.options) === null || _input$control$value$2 === void 0 ? void 0 : _input$control$value$2.childLabelProp) !== null && _input$control$value$ !== void 0 ? _input$control$value$ : getFirstPrimitiveProp(input.control.value.schema);
    if (!childLabelProp) {
      return "".concat(index);
    }
    var labelValue = Resolve.data(input.control.value.data, composePaths("".concat(index), childLabelProp));
    if (labelValue === undefined || labelValue === null || Number.isNaN(labelValue)) {
      return '';
    }
    return "".concat(labelValue);
  };
  var filteredChildErrors = computed(function () {
    var _appliedOptions$value7;
    var filtered = (_appliedOptions$value7 = appliedOptions.value) !== null && _appliedOptions$value7 !== void 0 && _appliedOptions$value7.enableFilterErrorsBeforeTouch ? [] : input.control.value.childErrors;
    return filtered;
  });
  var overwrittenControl = computed(function () {
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
  var jsonforms = inject('jsonforms');
  if (!jsonforms) {
    throw new Error("'jsonforms' couldn't be injected. Are you within JSON Forms?");
  }
  return (_jsonforms$core = jsonforms.core) === null || _jsonforms$core === void 0 ? void 0 : _jsonforms$core.ajv;
};
var useNested = function useNested(element) {
  var nestedInfo = inject('jsonforms.nestedInfo', {
    level: 0
  });
  if (element) {
    provide('jsonforms.nestedInfo', {
      level: nestedInfo.level + 1,
      parentElement: element
    });
  }
  return nestedInfo;
};

var createAjv = function createAjv(options) {
  var ajv = createAjv$1(options);
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

var labelRenderer = defineComponent({
  name: 'label-renderer',
  components: {
    DispatchRenderer: DispatchRenderer,
    VLabel: VLabel
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    return useVuetifyLabel(useJsonFormsLabel(props));
  }
});
var entry$u = {
  renderer: labelRenderer,
  tester: rankWith(1, uiTypeIs('Label'))
};

function render$z(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_label = resolveComponent("v-label");
  return _ctx.label.visible ? (openBlock(), createBlock(_component_v_label, mergeProps({
    key: 0,
    "class": _ctx.styles.label.root
  }, _ctx.vuetifyProps('v-label')), {
    "default": withCtx(function () {
      return [createTextVNode(toDisplayString(_ctx.label.text), 1)];
    }),
    _: 1
  }, 16, ["class"])) : createCommentVNode("", true);
}

labelRenderer.render = render$z;

var additionalRenderers = [entry$u
];

var script$4 = defineComponent({
  name: 'validation-badge',
  components: {
    VBadge: VBadge,
    VTooltip: VTooltip
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
                labels: [createLabelDescriptionFrom(createControlElement(errorObject.instancePath), errorObject.schema).text],
                message: errorObject.message
              });
            } else {
              error[index].labels.push(createLabelDescriptionFrom(createControlElement(errorObject.instancePath), errorObject.schema).text);
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

var _hoisted_1$9 = createElementVNode("p", null, "Validation Errors", -1);
function render$y(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_badge = resolveComponent("v-badge");
  var _component_v_tooltip = resolveComponent("v-tooltip");
  return openBlock(), createElementBlock("div", null, [_ctx.errors.length > 0 ? (openBlock(), createBlock(_component_v_tooltip, {
    key: 0,
    bottom: ""
  }, {
    activator: withCtx(function (_ref) {
      var props = _ref.props;
      return [createVNode(_component_v_badge, {
        color: _ctx.color,
        bordered: _ctx.bordered,
        inline: _ctx.inline,
        offsetX: _ctx.offsetX,
        offsetY: _ctx.offsetY,
        overlap: _ctx.overlap
      }, {
        badge: withCtx(function () {
          return [createTextVNode(toDisplayString(_ctx.errors.length), 1)];
        }),
        "default": withCtx(function () {
          return [createElementVNode("div", normalizeProps(guardReactiveProps(props)), [renderSlot(_ctx.$slots, "default")], 16)];
        }),
        _: 2
      }, 1032, ["color", "bordered", "inline", "offsetX", "offsetY", "overlap"])];
    }),
    "default": withCtx(function () {
      return [_hoisted_1$9, (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tooltipMessages, function (message, index) {
        return openBlock(), createElementBlock("p", {
          key: "".concat(index),
          "class": "mb-0"
        }, toDisplayString(message), 1);
      }), 128))];
    }),
    _: 3
  })) : renderSlot(_ctx.$slots, "default", {
    key: 1
  })]);
}

script$4.render = render$y;

var script$3 = defineComponent({
  name: 'validation-icon',
  components: {
    ValidationBadge: script$4,
    VIcon: VIcon
  },
  props: {
    errors: {
      required: true,
      type: Array
    }
  }
});

function render$x(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_icon = resolveComponent("v-icon");
  var _component_validation_badge = resolveComponent("validation-badge");
  return _ctx.errors && _ctx.errors.length > 0 ? (openBlock(), createBlock(_component_validation_badge, {
    key: 0,
    errors: _ctx.errors
  }, {
    "default": withCtx(function () {
      return [createVNode(_component_v_icon, {
        color: "error"
      }, {
        "default": withCtx(function () {
          return [createTextVNode("mdi-alert-circle-outline")];
        }),
        _: 1
      })];
    }),
    _: 1
  }, 8, ["errors"])) : createCommentVNode("", true);
}

script$3.render = render$x;

var controlRenderer$p = defineComponent({
  name: 'array-layout-renderer',
  components: {
    DispatchRenderer: DispatchRenderer,
    VCard: VCard,
    VCardActions: VCardActions,
    VCardTitle: VCardTitle,
    VCardText: VCardText,
    VAvatar: VAvatar,
    VDialog: VDialog,
    VRow: VRow,
    VCol: VCol,
    VToolbar: VToolbar,
    VToolbarTitle: VToolbarTitle,
    VTooltip: VTooltip,
    VIcon: VIcon,
    VBtn: VBtn,
    VSpacer: VSpacer,
    VExpansionPanels: VExpansionPanels,
    VExpansionPanel: VExpansionPanel,
    VExpansionPanelTitle: VExpansionPanelTitle,
    VExpansionPanelText: VExpansionPanelText,
    VContainer: VContainer,
    ValidationIcon: script$3,
    ValidationBadge: script$4
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    var control = useVuetifyArrayControl(useJsonFormsArrayControl(props));
    var currentlyExpanded = ref(control.appliedOptions.value.initCollapsed ? null : 0);
    var expansionPanelsProps = computed(function () {
      return merge({
        flat: false,
        focusable: true
      }, control.vuetifyProps('v-expansion-panels'));
    });
    var cardProps = computed(function () {
      return control.vuetifyProps('v-card');
    });
    var suggestToDelete = ref(null);
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
      return findUISchema(this.control.uischemas, this.control.schema, this.control.uischema.scope, this.control.path, undefined, this.control.uischema, this.control.rootSchema);
    },
    arraySchema: function arraySchema() {
      return Resolve.schema(this.control.rootSchema, this.control.uischema.scope, this.control.rootSchema);
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
    composePaths: composePaths,
    createDefaultValue: createDefaultValue,
    addButtonClick: function addButtonClick() {
      var _this$control$data;
      this.addItem(this.control.path, createDefaultValue(this.control.schema, this.control.rootSchema))();
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
        var errorDataPath = getControlPath(e);
        return errorDataPath.startsWith(_this.composePaths(_this.control.path, "".concat(index)));
      });
    },
    translateLabel: function translateLabel(labelType) {
      var additionalContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var transformMessage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (text) {
        return text;
      };
      var i18nKey = getI18nKey(this.arraySchema, this.control.uischema, this.control.path, labelType);
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
  tester: rankWith(4, isObjectArrayWithNesting)
};

var _hoisted_1$8 = {
  "class": "primary--text text--lighten-5"
};
function render$w(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_toolbar_title = resolveComponent("v-toolbar-title");
  var _component_validation_icon = resolveComponent("validation-icon");
  var _component_v_spacer = resolveComponent("v-spacer");
  var _component_v_icon = resolveComponent("v-icon");
  var _component_v_btn = resolveComponent("v-btn");
  var _component_v_tooltip = resolveComponent("v-tooltip");
  var _component_v_toolbar = resolveComponent("v-toolbar");
  var _component_v_card_title = resolveComponent("v-card-title");
  var _component_v_avatar = resolveComponent("v-avatar");
  var _component_validation_badge = resolveComponent("validation-badge");
  var _component_v_col = resolveComponent("v-col");
  var _component_v_row = resolveComponent("v-row");
  var _component_v_container = resolveComponent("v-container");
  var _component_v_expansion_panel_title = resolveComponent("v-expansion-panel-title");
  var _component_dispatch_renderer = resolveComponent("dispatch-renderer");
  var _component_v_expansion_panel_text = resolveComponent("v-expansion-panel-text");
  var _component_v_expansion_panel = resolveComponent("v-expansion-panel");
  var _component_v_expansion_panels = resolveComponent("v-expansion-panels");
  var _component_v_card_text = resolveComponent("v-card-text");
  var _component_v_card_actions = resolveComponent("v-card-actions");
  var _component_v_card = resolveComponent("v-card");
  var _component_v_dialog = resolveComponent("v-dialog");
  return _ctx.control.visible ? (openBlock(), createBlock(_component_v_card, mergeProps({
    key: 0,
    "class": _ctx.styles.arrayList.root
  }, _ctx.cardProps), {
    "default": withCtx(function () {
      return [createVNode(_component_v_card_title, {
        "class": normalizeClass(_ctx.styles.arrayList.title)
      }, {
        "default": withCtx(function () {
          return [createVNode(_component_v_toolbar, {
            flat: "",
            "class": normalizeClass(_ctx.styles.arrayList.toolbar)
          }, {
            "default": withCtx(function () {
              return [createVNode(_component_v_toolbar_title, {
                "class": normalizeClass(_ctx.styles.arrayList.label)
              }, {
                "default": withCtx(function () {
                  return [createTextVNode(toDisplayString(_ctx.computedLabel), 1)];
                }),
                _: 1
              }, 8, ["class"]), _ctx.control.childErrors.length > 0 && !_ctx.appliedOptions.hideArraySummaryValidation ? (openBlock(), createBlock(_component_validation_icon, {
                key: 0,
                errors: _ctx.control.childErrors,
                "class": normalizeClass(_ctx.styles.arrayList.validationIcon)
              }, null, 8, ["errors", "class"])) : createCommentVNode("", true), createVNode(_component_v_spacer), renderSlot(_ctx.$slots, "toolbar-elements", {
                labels: _ctx.translatedLabels,
                addClass: _ctx.styles.arrayList.addButton,
                addDisabled: _ctx.addDisabled,
                addClick: _ctx.addButtonClick,
                control: _ctx.control,
                appliedOptions: _ctx.appliedOptions,
                styles: _ctx.styles
              }, function () {
                return [createVNode(_component_v_tooltip, {
                  bottom: ""
                }, {
                  activator: withCtx(function (_ref) {
                    var props = _ref.props;
                    return [createVNode(_component_v_btn, mergeProps({
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
                      "default": withCtx(function () {
                        return [createVNode(_component_v_icon, null, {
                          "default": withCtx(function () {
                            return [createTextVNode("mdi-plus")];
                          }),
                          _: 1
                        })];
                      }),
                      _: 2
                    }, 1040, ["aria-label", "class", "disabled", "onClick"])];
                  }),
                  "default": withCtx(function () {
                    return [createTextVNode(" " + toDisplayString(_ctx.translatedLabels.add), 1)];
                  }),
                  _: 1
                })];
              })];
            }),
            _: 3
          }, 8, ["class"])];
        }),
        _: 3
      }, 8, ["class"]), createVNode(_component_v_card_text, null, {
        "default": withCtx(function () {
          return [createVNode(_component_v_container, {
            "justify-space-around": "",
            "align-content-center": "",
            "class": normalizeClass(_ctx.styles.arrayList.container)
          }, {
            "default": withCtx(function () {
              return [createVNode(_component_v_row, {
                justify: "center"
              }, {
                "default": withCtx(function () {
                  return [createVNode(_component_v_expansion_panels, mergeProps({
                    accordion: ""
                  }, _ctx.expansionPanelsProps, {
                    modelValue: _ctx.currentlyExpanded,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
                      return _ctx.currentlyExpanded = $event;
                    })
                  }), {
                    "default": withCtx(function () {
                      return [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.control.data, function (_element, index) {
                        return openBlock(), createBlock(_component_v_expansion_panel, {
                          key: "".concat(_ctx.control.path, "-").concat(index),
                          "class": normalizeClass(_ctx.styles.arrayList.item)
                        }, {
                          "default": withCtx(function () {
                            return [createVNode(_component_v_expansion_panel_title, {
                              "class": normalizeClass(_ctx.styles.arrayList.itemHeader)
                            }, {
                              "default": withCtx(function () {
                                return [createVNode(_component_v_container, {
                                  "py-0": "",
                                  "class": normalizeClass(_ctx.styles.arrayList.itemContainer)
                                }, {
                                  "default": withCtx(function () {
                                    return [createVNode(_component_v_row, {
                                      style: normalizeStyle("display: grid; grid-template-columns: ".concat(!_ctx.hideAvatar ? 'min-content' : '', " auto min-content ").concat(_ctx.appliedOptions.showSortButtons ? 'min-content min-content' : ''))
                                    }, {
                                      "default": withCtx(function () {
                                        return [!_ctx.hideAvatar ? (openBlock(), createBlock(_component_v_col, {
                                          key: 0,
                                          "align-self": "center",
                                          "class": "pl-0"
                                        }, {
                                          "default": withCtx(function () {
                                            return [createVNode(_component_validation_badge, {
                                              overlap: "",
                                              bordered: "",
                                              errors: _ctx.childErrors(index)
                                            }, {
                                              "default": withCtx(function () {
                                                return [createVNode(_component_v_avatar, {
                                                  size: "40",
                                                  "aria-label": "Index",
                                                  color: "primary"
                                                }, {
                                                  "default": withCtx(function () {
                                                    return [createElementVNode("span", _hoisted_1$8, toDisplayString(index + 1), 1)];
                                                  }),
                                                  _: 2
                                                }, 1024)];
                                              }),
                                              _: 2
                                            }, 1032, ["errors"])];
                                          }),
                                          _: 2
                                        }, 1024)) : createCommentVNode("", true), createVNode(_component_v_col, {
                                          "align-self": "center",
                                          "class": normalizeClass("pl-0 text-truncate ".concat(_ctx.styles.arrayList.itemLabel))
                                        }, {
                                          "default": withCtx(function () {
                                            return [createTextVNode(toDisplayString(_ctx.childLabelForIndex(index)), 1)];
                                          }),
                                          _: 2
                                        }, 1032, ["class"]), _ctx.appliedOptions.showSortButtons ? (openBlock(), createBlock(_component_v_col, {
                                          key: 1,
                                          "align-self": "center"
                                        }, {
                                          "default": withCtx(function () {
                                            return [createVNode(_component_v_tooltip, {
                                              bottom: ""
                                            }, {
                                              activator: withCtx(function (_ref2) {
                                                var props = _ref2.props;
                                                return [createVNode(_component_v_btn, mergeProps(props, {
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
                                                  "default": withCtx(function () {
                                                    return [createVNode(_component_v_icon, {
                                                      "class": "notranslate"
                                                    }, {
                                                      "default": withCtx(function () {
                                                        return [createTextVNode("mdi-arrow-up")];
                                                      }),
                                                      _: 1
                                                    })];
                                                  }),
                                                  _: 2
                                                }, 1040, ["aria-label", "disabled", "class", "onClick"])];
                                              }),
                                              "default": withCtx(function () {
                                                return [createTextVNode(" " + toDisplayString(_ctx.translatedLabels.moveUp), 1)];
                                              }),
                                              _: 2
                                            }, 1024)];
                                          }),
                                          _: 2
                                        }, 1024)) : createCommentVNode("", true), _ctx.appliedOptions.showSortButtons ? (openBlock(), createBlock(_component_v_col, {
                                          key: 2,
                                          "align-self": "center"
                                        }, {
                                          "default": withCtx(function () {
                                            return [createVNode(_component_v_tooltip, {
                                              bottom: ""
                                            }, {
                                              activator: withCtx(function (_ref3) {
                                                var props = _ref3.props;
                                                return [createVNode(_component_v_btn, mergeProps(props, {
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
                                                  "default": withCtx(function () {
                                                    return [createVNode(_component_v_icon, {
                                                      "class": "notranslate"
                                                    }, {
                                                      "default": withCtx(function () {
                                                        return [createTextVNode("mdi-arrow-down")];
                                                      }),
                                                      _: 1
                                                    })];
                                                  }),
                                                  _: 2
                                                }, 1040, ["aria-label", "disabled", "class", "onClick"])];
                                              }),
                                              "default": withCtx(function () {
                                                return [createTextVNode(" " + toDisplayString(_ctx.translatedLabels.moveDown), 1)];
                                              }),
                                              _: 2
                                            }, 1024)];
                                          }),
                                          _: 2
                                        }, 1024)) : createCommentVNode("", true), createVNode(_component_v_col, {
                                          "align-self": "center"
                                        }, {
                                          "default": withCtx(function () {
                                            return [createVNode(_component_v_tooltip, {
                                              bottom: ""
                                            }, {
                                              activator: withCtx(function (_ref4) {
                                                var props = _ref4.props;
                                                return [createVNode(_component_v_btn, mergeProps(props, {
                                                  fab: "",
                                                  text: "",
                                                  elevation: "0",
                                                  small: "",
                                                  "class": ["v-expansion-panel-title__icon", _ctx.styles.arrayList.itemDelete],
                                                  "aria-label": _ctx.translatedLabels["delete"],
                                                  disabled: !_ctx.control.enabled || _ctx.appliedOptions.restrict && _ctx.arraySchema !== undefined && _ctx.arraySchema.minItems !== undefined && _ctx.dataLength <= _ctx.arraySchema.minItems,
                                                  onClick: withModifiers(function ($event) {
                                                    return _ctx.suggestToDelete = index;
                                                  }, ["stop"])
                                                }), {
                                                  "default": withCtx(function () {
                                                    return [createVNode(_component_v_icon, {
                                                      "class": "notranslate"
                                                    }, {
                                                      "default": withCtx(function () {
                                                        return [createTextVNode("mdi-delete")];
                                                      }),
                                                      _: 1
                                                    })];
                                                  }),
                                                  _: 2
                                                }, 1040, ["aria-label", "class", "disabled", "onClick"])];
                                              }),
                                              "default": withCtx(function () {
                                                return [createTextVNode(" " + toDisplayString(_ctx.translatedLabels["delete"]), 1)];
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
                            }, 1032, ["class"]), createVNode(_component_v_expansion_panel_text, {
                              "class": normalizeClass(_ctx.styles.arrayList.itemContent)
                            }, {
                              "default": withCtx(function () {
                                return [createVNode(_component_dispatch_renderer, {
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
          }, 8, ["class"]), _ctx.dataLength === 0 ? (openBlock(), createBlock(_component_v_container, {
            key: 0,
            "class": normalizeClass(_ctx.styles.arrayList.noData)
          }, {
            "default": withCtx(function () {
              return [createTextVNode(" No data ")];
            }),
            _: 1
          }, 8, ["class"])) : createCommentVNode("", true)];
        }),
        _: 1
      }), _ctx.$slots.actions ? (openBlock(), createBlock(_component_v_card_actions, {
        key: 0,
        "class": "pb-8"
      }, {
        "default": withCtx(function () {
          return [renderSlot(_ctx.$slots, "actions", {
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
      })) : createCommentVNode("", true), createVNode(_component_v_dialog, {
        "model-value": _ctx.suggestToDelete !== null,
        "max-width": "600",
        onKeydown: _cache[3] || (_cache[3] = withKeys(function ($event) {
          return _ctx.suggestToDelete = null;
        }, ["esc"])),
        "onClick:outside": _cache[4] || (_cache[4] = function ($event) {
          return _ctx.suggestToDelete = null;
        })
      }, {
        "default": withCtx(function () {
          return [createVNode(_component_v_card, null, {
            "default": withCtx(function () {
              return [createVNode(_component_v_card_title, {
                "class": "text-h5"
              }, {
                "default": withCtx(function () {
                  return [createTextVNode(toDisplayString(_ctx.translatedLabels.dialogTitle), 1)];
                }),
                _: 1
              }), createVNode(_component_v_card_text, null, {
                "default": withCtx(function () {
                  return [createTextVNode(toDisplayString(_ctx.translatedLabels.dialogText), 1)];
                }),
                _: 1
              }), createVNode(_component_v_card_actions, null, {
                "default": withCtx(function () {
                  return [createVNode(_component_v_spacer), createVNode(_component_v_btn, {
                    text: "",
                    onClick: _cache[1] || (_cache[1] = function ($event) {
                      return _ctx.suggestToDelete = null;
                    })
                  }, {
                    "default": withCtx(function () {
                      return [createTextVNode(toDisplayString(_ctx.translatedLabels.dialogCancel), 1)];
                    }),
                    _: 1
                  }), createVNode(_component_v_btn, {
                    text: "",
                    ref: "confirm",
                    onClick: _cache[2] || (_cache[2] = function ($event) {
                      _ctx.removeItemsClick(_ctx.suggestToDelete === null ? null : [_ctx.suggestToDelete]);
                      _ctx.suggestToDelete = null;
                    })
                  }, {
                    "default": withCtx(function () {
                      return [createTextVNode(toDisplayString(_ctx.translatedLabels.dialogConfirm), 1)];
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
  }, 16, ["class"])) : createCommentVNode("", true);
}

controlRenderer$p.render = render$w;
controlRenderer$p.__scopeId = "data-v-44c4e38a";

var layoutRenderer$3 = defineComponent({
  name: 'categorization-renderer',
  components: {
    DispatchRenderer: DispatchRenderer,
    VContainer: VContainer,
    VTabs: VTabs,
    VTab: VTab,
    VWindow: VWindow,
    VWindowItem: VWindowItem,
    VRow: VRow,
    VCol: VCol
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    var activeCategory = ref(0);
    var ajv = useAjv();
    var t = useTranslator();
    return _objectSpread2(_objectSpread2({}, useVuetifyLayout(useJsonFormsLayout(props))), {}, {
      activeCategory: activeCategory,
      ajv: ajv,
      t: t
    });
  },
  computed: {
    visibleCategories: function visibleCategories() {
      var _this = this;
      return this.layout.uischema.elements.filter(function (category) {
        return isVisible(category, _this.layout.data, _this.layout.path, _this.ajv);
      });
    },
    visibleCategoryLabels: function visibleCategoryLabels() {
      var _this2 = this;
      return this.visibleCategories.map(function (element) {
        var _deriveLabelForUISche;
        return (_deriveLabelForUISche = deriveLabelForUISchemaElement(element, _this2.t)) !== null && _deriveLabelForUISche !== void 0 ? _deriveLabelForUISche : '';
      });
    }
  }
});
var isSingleLevelCategorization = and(uiTypeIs('Categorization'), categorizationHasCategory);
var entry$s = {
  renderer: layoutRenderer$3,
  tester: rankWith(2, isSingleLevelCategorization)
};

function render$v(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_tab = resolveComponent("v-tab");
  var _component_v_tabs = resolveComponent("v-tabs");
  var _component_v_col = resolveComponent("v-col");
  var _component_dispatch_renderer = resolveComponent("dispatch-renderer");
  var _component_v_window_item = resolveComponent("v-window-item");
  var _component_v_window = resolveComponent("v-window");
  var _component_v_row = resolveComponent("v-row");
  var _component_v_container = resolveComponent("v-container");
  return _ctx.layout.visible ? (openBlock(), createBlock(_component_v_container, {
    key: 0,
    "class": normalizeClass(_ctx.styles.categorization.root)
  }, {
    "default": withCtx(function () {
      return [_ctx.appliedOptions.vertical == true ? (openBlock(), createBlock(_component_v_row, normalizeProps(mergeProps({
        key: 0
      }, _ctx.vuetifyProps('v-row'))), {
        "default": withCtx(function () {
          return [createVNode(_component_v_col, normalizeProps(guardReactiveProps(_ctx.vuetifyProps('v-col.v-tabs'))), {
            "default": withCtx(function () {
              return [createVNode(_component_v_tabs, mergeProps({
                modelValue: _ctx.activeCategory,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
                  return _ctx.activeCategory = $event;
                })
              }, _ctx.vuetifyProps('v-tabs'), {
                vertical: ""
              }), {
                "default": withCtx(function () {
                  return [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.visibleCategories, function (_, index) {
                    return openBlock(), createBlock(_component_v_tab, {
                      key: "".concat(_ctx.layout.path, "-").concat(index)
                    }, {
                      "default": withCtx(function () {
                        return [createTextVNode(toDisplayString(_ctx.visibleCategoryLabels[index]), 1)];
                      }),
                      _: 2
                    }, 1024);
                  }), 128))];
                }),
                _: 1
              }, 16, ["modelValue"])];
            }),
            _: 1
          }, 16), createVNode(_component_v_col, normalizeProps(guardReactiveProps(_ctx.vuetifyProps('v-col.v-window'))), {
            "default": withCtx(function () {
              return [createVNode(_component_v_window, mergeProps({
                modelValue: _ctx.activeCategory,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
                  return _ctx.activeCategory = $event;
                }),
                vertical: ""
              }, _ctx.vuetifyProps('v-window')), {
                "default": withCtx(function () {
                  return [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.visibleCategories, function (element, index) {
                    return openBlock(), createBlock(_component_v_window_item, {
                      key: "".concat(_ctx.layout.path, "-").concat(index)
                    }, {
                      "default": withCtx(function () {
                        return [createVNode(_component_dispatch_renderer, {
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
      }, 16)) : (openBlock(), createBlock(_component_v_row, normalizeProps(mergeProps({
        key: 1
      }, _ctx.vuetifyProps('v-row'))), {
        "default": withCtx(function () {
          return [createVNode(_component_v_tabs, mergeProps({
            modelValue: _ctx.activeCategory,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
              return _ctx.activeCategory = $event;
            })
          }, _ctx.vuetifyProps('v-tabs')), {
            "default": withCtx(function () {
              return [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.visibleCategories, function (_, index) {
                return openBlock(), createBlock(_component_v_tab, {
                  key: "".concat(_ctx.layout.path, "-").concat(index)
                }, {
                  "default": withCtx(function () {
                    return [createTextVNode(toDisplayString(_ctx.visibleCategoryLabels[index]), 1)];
                  }),
                  _: 2
                }, 1024);
              }), 128))];
            }),
            _: 1
          }, 16, ["modelValue"]), createVNode(_component_v_window, mergeProps({
            modelValue: _ctx.activeCategory,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
              return _ctx.activeCategory = $event;
            })
          }, _ctx.vuetifyProps('v-window')), {
            "default": withCtx(function () {
              return [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.visibleCategories, function (element, index) {
                return openBlock(), createBlock(_component_v_window_item, {
                  key: "".concat(_ctx.layout.path, "-").concat(index)
                }, {
                  "default": withCtx(function () {
                    return [createVNode(_component_dispatch_renderer, {
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
  }, 8, ["class"])) : createCommentVNode("", true);
}

layoutRenderer$3.render = render$v;

var layoutRenderer$2 = defineComponent({
  name: 'group-renderer',
  components: {
    DispatchRenderer: DispatchRenderer,
    VCard: VCard,
    VCardTitle: VCardTitle,
    VCardText: VCardText
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    return useVuetifyLayout(useJsonFormsLayout(props));
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
  tester: rankWith(2, and(isLayout, uiTypeIs('Group')))
};

function render$u(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_card_title = resolveComponent("v-card-title");
  var _component_dispatch_renderer = resolveComponent("dispatch-renderer");
  var _component_v_card_text = resolveComponent("v-card-text");
  var _component_v_card = resolveComponent("v-card");
  return _ctx.layout.visible ? (openBlock(), createBlock(_component_v_card, mergeProps({
    key: 0,
    "class": _ctx.classes,
    elevation: !_ctx.bare ? 2 : undefined,
    outlined: _ctx.bare
  }, _ctx.vuetifyProps('v-card')), {
    "default": withCtx(function () {
      return [_ctx.layout.label ? (openBlock(), createBlock(_component_v_card_title, mergeProps({
        key: 0,
        "class": _ctx.styles.group.label
      }, _ctx.vuetifyProps('v-card-title')), {
        "default": withCtx(function () {
          return [createTextVNode(toDisplayString(_ctx.layout.label), 1)];
        }),
        _: 1
      }, 16, ["class"])) : createCommentVNode("", true), (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.layout.uischema.elements, function (element, index) {
        return openBlock(), createBlock(_component_v_card_text, mergeProps(_ctx.vuetifyProps("v-card-text[".concat(index, "]")), {
          key: "".concat(_ctx.layout.path, "-").concat(index),
          "class": _ctx.styles.group.item
        }), {
          "default": withCtx(function () {
            return [createVNode(_component_dispatch_renderer, {
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
  }, 16, ["class", "elevation", "outlined"])) : createCommentVNode("", true);
}

layoutRenderer$2.render = render$u;

var layoutRenderer$1 = defineComponent({
  name: 'horizontal-layout-renderer',
  components: {
    DispatchRenderer: DispatchRenderer,
    VContainer: VContainer,
    VRow: VRow,
    VCol: VCol
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    return useVuetifyLayout(useJsonFormsLayout(props));
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
  tester: rankWith(2, uiTypeIs('HorizontalLayout'))
};

function render$t(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_dispatch_renderer = resolveComponent("dispatch-renderer");
  var _component_v_col = resolveComponent("v-col");
  var _component_v_row = resolveComponent("v-row");
  var _component_v_container = resolveComponent("v-container");
  return _ctx.layout.visible ? (openBlock(), createBlock(_component_v_container, mergeProps({
    key: 0,
    "class": "".concat(_ctx.styles.horizontalLayout.root)
  }, _ctx.vuetifyProps('v-container')), {
    "default": withCtx(function () {
      return [createVNode(_component_v_row, normalizeProps(guardReactiveProps(_ctx.vuetifyProps('v-row'))), {
        "default": withCtx(function () {
          return [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.layout.uischema.elements, function (element, index) {
            return openBlock(), createBlock(_component_v_col, mergeProps({
              key: "".concat(_ctx.layout.path, "-").concat(index),
              "class": _ctx.styles.horizontalLayout.item,
              cols: _ctx.cols[index]
            }, _ctx.vuetifyProps("v-col[".concat(index, "]"))), {
              "default": withCtx(function () {
                return [createVNode(_component_dispatch_renderer, {
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
  }, 16, ["class"])) : createCommentVNode("", true);
}

layoutRenderer$1.render = render$t;

var layoutRenderer = defineComponent({
  name: 'vertical-layout-renderer',
  components: {
    DispatchRenderer: DispatchRenderer,
    VContainer: VContainer,
    VRow: VRow,
    VCol: VCol
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    return useVuetifyLayout(useJsonFormsLayout(props));
  }
});
var entry$p = {
  renderer: layoutRenderer,
  tester: rankWith(2, uiTypeIs('VerticalLayout'))
};

function render$s(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_dispatch_renderer = resolveComponent("dispatch-renderer");
  var _component_v_col = resolveComponent("v-col");
  var _component_v_row = resolveComponent("v-row");
  var _component_v_container = resolveComponent("v-container");
  return _ctx.layout.visible ? (openBlock(), createBlock(_component_v_container, mergeProps({
    key: 0,
    "fill-height": "",
    "class": "".concat(_ctx.styles.verticalLayout.root)
  }, _ctx.vuetifyProps('v-container')), {
    "default": withCtx(function () {
      return [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.layout.uischema.elements, function (element, index) {
        return openBlock(), createBlock(_component_v_row, mergeProps({
          key: "".concat(_ctx.layout.path, "-").concat(index)
        }, _ctx.vuetifyProps("v-row[".concat(index, "]"))), {
          "default": withCtx(function () {
            return [createVNode(_component_v_col, mergeProps({
              cols: "12",
              "class": _ctx.styles.verticalLayout.item
            }, _ctx.vuetifyProps('v-col')), {
              "default": withCtx(function () {
                return [createVNode(_component_dispatch_renderer, {
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
  }, 16, ["class"])) : createCommentVNode("", true);
}

layoutRenderer.render = render$s;

var layoutRendererEntry = {
  renderer: layoutRenderer,
  tester: rankWith(1, isLayout)
};
var layoutRenderers = [layoutRendererEntry, entry$t, entry$s,
entry$r, entry$q, entry$p];

var arrayListRendererEntry = {
  renderer: controlRenderer$p,
  tester: rankWith(2, schemaTypeIs('array'))
};
var arrayRenderers = [arrayListRendererEntry];

var script$2 = defineComponent({
  name: 'combinator-properties',
  components: {
    DispatchRenderer: DispatchRenderer
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
    var foundUISchema = Generate.uiSchema(otherProps, 'VerticalLayout');
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
  var _component_dispatch_renderer = resolveComponent("dispatch-renderer");
  return _ctx.isLayoutWithElements ? (openBlock(), createElementBlock("div", _hoisted_1$7, [createVNode(_component_dispatch_renderer, {
    schema: _ctx.otherProps,
    path: _ctx.path,
    uischema: _ctx.foundUISchema
  }, null, 8, ["schema", "path", "uischema"])])) : createCommentVNode("", true);
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
var script$1 = defineComponent({
  name: 'additional-properties',
  components: {
    DispatchRenderer: DispatchRenderer,
    VCard: VCard,
    VTooltip: VTooltip,
    VToolbar: VToolbar,
    VIcon: VIcon,
    VBtn: VBtn,
    VCardTitle: VCardTitle,
    VSpacer: VSpacer,
    VToolbarTitle: VToolbarTitle,
    VTextField: VTextField,
    VContainer: VContainer,
    VRow: VRow,
    VCol: VCol,
    VHover: VHover
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
        propSchema = (_Generate$jsonSchema$ = Generate.jsonSchema({
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
          propUiSchema = Generate.uiSchema(propSchema, 'Group');
          propUiSchema.label = (_propSchema$title = propSchema.title) !== null && _propSchema$title !== void 0 ? _propSchema$title : startCase(propName);
        } else {
          propUiSchema = createControlElement(control.value.path + '/' + encode(propName));
        }
      }
      return {
        propertyName: propName,
        path: composePaths(control.value.path, propName),
        schema: propSchema,
        uischema: propUiSchema
      };
    };
    var appliedOptions = useControlAppliedOptions(props.input);
    var additionalPropertyItems = ref([]);
    additionalKeys.forEach(function (propName) {
      var additionalProperty = toAdditionalPropertyType(propName, control.value.data[propName]);
      additionalPropertyItems.value.push(additionalProperty);
    });
    var styles = useStyles(control.value.uischema);
    var newPropertyName = ref('');
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
        var messages = this.propertyNameValidator ? validate(this.propertyNameValidator, this.newPropertyName).map(function (error) {
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
              var newValue = createDefaultValue(ap.schema, _this2.control.rootSchema);
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
    composePaths: composePaths,
    i18nKey: function i18nKey(key) {
      return getI18nKey(this.control.schema, this.control.uischema, this.control.path, "additionalProperties.".concat(key));
    },
    addProperty: function addProperty() {
      if (this.newPropertyName) {
        var additionalProperty = this.toAdditionalPropertyType(this.newPropertyName, undefined);
        if (additionalProperty) {
          this.additionalPropertyItems = [].concat(_toConsumableArray(this.additionalPropertyItems), [additionalProperty]);
        }
        if (_typeof(this.control.data) === 'object' && additionalProperty.schema) {
          this.control.data[this.newPropertyName] = createDefaultValue(additionalProperty.schema, this.control.rootSchema);
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
  var _component_v_toolbar_title = resolveComponent("v-toolbar-title");
  var _component_v_spacer = resolveComponent("v-spacer");
  var _component_v_text_field = resolveComponent("v-text-field");
  var _component_v_hover = resolveComponent("v-hover");
  var _component_v_icon = resolveComponent("v-icon");
  var _component_v_btn = resolveComponent("v-btn");
  var _component_v_tooltip = resolveComponent("v-tooltip");
  var _component_v_toolbar = resolveComponent("v-toolbar");
  var _component_v_card_title = resolveComponent("v-card-title");
  var _component_dispatch_renderer = resolveComponent("dispatch-renderer");
  var _component_v_col = resolveComponent("v-col");
  var _component_v_row = resolveComponent("v-row");
  var _component_v_container = resolveComponent("v-container");
  var _component_v_card = resolveComponent("v-card");
  var _directive_disabled_icon_focus = resolveDirective("disabled-icon-focus");
  return _ctx.control.visible ? (openBlock(), createBlock(_component_v_card, {
    key: 0,
    elevation: "0"
  }, {
    "default": withCtx(function () {
      return [createVNode(_component_v_card_title, null, {
        "default": withCtx(function () {
          return [createVNode(_component_v_toolbar, {
            flat: ""
          }, {
            "default": withCtx(function () {
              return [createVNode(_component_v_toolbar_title, null, {
                "default": withCtx(function () {
                  return [createTextVNode(toDisplayString(_ctx.additionalPropertiesTitle), 1)];
                }),
                _: 1
              }), createVNode(_component_v_spacer), createVNode(_component_v_hover, null, {
                "default": withCtx(function (_ref) {
                  var isHovering = _ref.isHovering;
                  return [withDirectives(createVNode(_component_v_text_field, mergeProps({
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
              }), createVNode(_component_v_tooltip, {
                bottom: ""
              }, {
                activator: withCtx(function (_ref2) {
                  var props = _ref2.props;
                  return [createVNode(_component_v_btn, mergeProps({
                    fab: "",
                    text: "",
                    elevation: "0",
                    small: "",
                    "aria-label": _ctx.addToLabel
                  }, props, {
                    disabled: _ctx.addPropertyDisabled,
                    onClick: _ctx.addProperty
                  }), {
                    "default": withCtx(function () {
                      return [createVNode(_component_v_icon, null, {
                        "default": withCtx(function () {
                          return [createTextVNode("mdi-plus")];
                        }),
                        _: 1
                      })];
                    }),
                    _: 2
                  }, 1040, ["aria-label", "disabled", "onClick"])];
                }),
                "default": withCtx(function () {
                  return [createTextVNode(" " + toDisplayString(_ctx.addToLabel), 1)];
                }),
                _: 1
              })];
            }),
            _: 1
          })];
        }),
        _: 1
      }), createVNode(_component_v_container, null, {
        "default": withCtx(function () {
          return [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.additionalPropertyItems, function (element, index) {
            return openBlock(), createBlock(_component_v_row, {
              key: "".concat(index)
            }, {
              "default": withCtx(function () {
                return [createVNode(_component_v_col, null, {
                  "default": withCtx(function () {
                    return [element.schema && element.uischema ? (openBlock(), createBlock(_component_dispatch_renderer, {
                      key: 0,
                      schema: element.schema,
                      uischema: element.uischema,
                      path: element.path,
                      enabled: _ctx.control.enabled,
                      renderers: _ctx.control.renderers,
                      cells: _ctx.control.cells
                    }, null, 8, ["schema", "uischema", "path", "enabled", "renderers", "cells"])) : createCommentVNode("", true)];
                  }),
                  _: 2
                }, 1024), _ctx.control.enabled ? (openBlock(), createBlock(_component_v_col, {
                  key: 0,
                  "class": "shrink"
                }, {
                  "default": withCtx(function () {
                    return [createVNode(_component_v_tooltip, {
                      bottom: ""
                    }, {
                      activator: withCtx(function (_ref3) {
                        var props = _ref3.props;
                        return [createVNode(_component_v_btn, mergeProps(props, {
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
                          "default": withCtx(function () {
                            return [createVNode(_component_v_icon, {
                              "class": "notranslate"
                            }, {
                              "default": withCtx(function () {
                                return [createTextVNode("mdi-delete")];
                              }),
                              _: 1
                            })];
                          }),
                          _: 2
                        }, 1040, ["aria-label", "disabled", "onClick"])];
                      }),
                      "default": withCtx(function () {
                        return [createTextVNode(" " + toDisplayString(_ctx.deleteLabel), 1)];
                      }),
                      _: 2
                    }, 1024)];
                  }),
                  _: 2
                }, 1024)) : createCommentVNode("", true)];
              }),
              _: 2
            }, 1024);
          }), 128))];
        }),
        _: 1
      })];
    }),
    _: 1
  })) : createCommentVNode("", true);
}

script$1.render = render$q;

var controlRenderer$o = defineComponent({
  name: 'all-of-renderer',
  components: {
    DispatchRenderer: DispatchRenderer,
    CombinatorProperties: script$2
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    return useVuetifyControl(useJsonFormsAllOfControl(props));
  },
  computed: {
    delegateUISchema: function delegateUISchema() {
      return findMatchingUISchema(this.control.uischemas)(this.control.schema, this.control.uischema.scope, this.control.path);
    },
    allOfRenderInfos: function allOfRenderInfos() {
      var result = createCombinatorRenderInfos(
      this.control.schema.allOf, this.control.rootSchema, 'allOf', this.control.uischema, this.control.path, this.control.uischemas);
      return result.filter(function (info) {
        return info.uischema;
      });
    }
  }
});
var entry$o = {
  renderer: controlRenderer$o,
  tester: rankWith(3, isAllOfControl)
};

var _hoisted_1$6 = {
  key: 0
};
var _hoisted_2 = {
  key: 1
};
function render$p(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_dispatch_renderer = resolveComponent("dispatch-renderer");
  var _component_combinator_properties = resolveComponent("combinator-properties");
  return _ctx.control.visible ? (openBlock(), createElementBlock("div", _hoisted_1$6, [_ctx.delegateUISchema ? (openBlock(), createBlock(_component_dispatch_renderer, {
    key: 0,
    schema: _ctx.control.schema,
    uischema: _ctx.delegateUISchema,
    path: _ctx.control.path,
    enabled: _ctx.control.enabled,
    renderers: _ctx.control.renderers,
    cells: _ctx.control.cells
  }, null, 8, ["schema", "uischema", "path", "enabled", "renderers", "cells"])) : _ctx.allOfRenderInfos ? (openBlock(), createElementBlock("div", _hoisted_2, [createVNode(_component_combinator_properties, {
    schema: _ctx.control.schema,
    combinatorKeyword: "allOf",
    path: _ctx.path
  }, null, 8, ["schema", "path"]), (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.allOfRenderInfos, function (allOfRenderInfo, allOfIndex) {
    return openBlock(), createBlock(_component_dispatch_renderer, {
      key: "".concat(_ctx.control.path, "-").concat(allOfIndex),
      schema: allOfRenderInfo.schema,
      uischema: allOfRenderInfo.uischema,
      path: _ctx.control.path,
      enabled: _ctx.control.enabled,
      renderers: _ctx.control.renderers,
      cells: _ctx.control.cells
    }, null, 8, ["schema", "uischema", "path", "enabled", "renderers", "cells"]);
  }), 128))])) : createCommentVNode("", true)])) : createCommentVNode("", true);
}

controlRenderer$o.render = render$p;

var controlRenderer$n = defineComponent({
  name: 'any-of-renderer',
  components: {
    DispatchRenderer: DispatchRenderer,
    CombinatorProperties: script$2,
    VTabs: VTabs,
    VTab: VTab,
    VWindow: VWindow,
    VWindowItem: VWindowItem
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    var input = useJsonFormsAnyOfControl(props);
    var control = input.control.value;
    var selectedIndex = ref(control.indexOfFittingSchema || 0);
    return _objectSpread2(_objectSpread2({}, useVuetifyControl(input)), {}, {
      selectedIndex: selectedIndex
    });
  },
  computed: {
    anyOfRenderInfos: function anyOfRenderInfos() {
      var result = createCombinatorRenderInfos(
      this.control.schema.anyOf, this.control.rootSchema, 'anyOf', this.control.uischema, this.control.path, this.control.uischemas);
      return result.filter(function (info) {
        return info.uischema;
      });
    }
  }
});
var entry$n = {
  renderer: controlRenderer$n,
  tester: rankWith(3, isAnyOfControl)
};

var _hoisted_1$5 = {
  key: 0
};
function render$o(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_combinator_properties = resolveComponent("combinator-properties");
  var _component_v_tab = resolveComponent("v-tab");
  var _component_v_tabs = resolveComponent("v-tabs");
  var _component_dispatch_renderer = resolveComponent("dispatch-renderer");
  var _component_v_window_item = resolveComponent("v-window-item");
  var _component_v_window = resolveComponent("v-window");
  return _ctx.control.visible ? (openBlock(), createElementBlock("div", _hoisted_1$5, [createVNode(_component_combinator_properties, {
    schema: _ctx.control.schema,
    combinatorKeyword: "anyOf",
    path: _ctx.path
  }, null, 8, ["schema", "path"]), createVNode(_component_v_tabs, {
    modelValue: _ctx.selectedIndex,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return _ctx.selectedIndex = $event;
    })
  }, {
    "default": withCtx(function () {
      return [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.anyOfRenderInfos, function (anyOfRenderInfo, anyOfIndex) {
        return openBlock(), createBlock(_component_v_tab, {
          key: "".concat(_ctx.control.path, "-").concat(anyOfIndex)
        }, {
          "default": withCtx(function () {
            return [createTextVNode(toDisplayString(anyOfRenderInfo.label), 1)];
          }),
          _: 2
        }, 1024);
      }), 128))];
    }),
    _: 1
  }, 8, ["modelValue"]), createVNode(_component_v_window, {
    modelValue: _ctx.selectedIndex,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return _ctx.selectedIndex = $event;
    })
  }, {
    "default": withCtx(function () {
      return [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.anyOfRenderInfos, function (anyOfRenderInfo, anyOfIndex) {
        return openBlock(), createBlock(_component_v_window_item, {
          key: "".concat(_ctx.control.path, "-").concat(anyOfIndex)
        }, {
          "default": withCtx(function () {
            return [_ctx.selectedIndex === anyOfIndex ? (openBlock(), createBlock(_component_dispatch_renderer, {
              key: 0,
              schema: anyOfRenderInfo.schema,
              uischema: anyOfRenderInfo.uischema,
              path: _ctx.control.path,
              renderers: _ctx.control.renderers,
              cells: _ctx.control.cells,
              enabled: _ctx.control.enabled
            }, null, 8, ["schema", "uischema", "path", "renderers", "cells", "enabled"])) : createCommentVNode("", true)];
          }),
          _: 2
        }, 1024);
      }), 128))];
    }),
    _: 1
  }, 8, ["modelValue"])])) : createCommentVNode("", true);
}

controlRenderer$n.render = render$o;

var controlRenderer$m = defineComponent({
  name: 'array-control-renderer',
  components: {
    DispatchCell: DispatchCell,
    DispatchRenderer: DispatchRenderer,
    VCard: VCard,
    VCardTitle: VCardTitle,
    VCardText: VCardText,
    VAvatar: VAvatar,
    VRow: VRow,
    VCol: VCol,
    VToolbar: VToolbar,
    VToolbarTitle: VToolbarTitle,
    VTooltip: VTooltip,
    VIcon: VIcon,
    VBtn: VBtn,
    VSpacer: VSpacer,
    VContainer: VContainer,
    ValidationIcon: script$3,
    ValidationBadge: script$4,
    VTable: VTable
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    return useVuetifyArrayControl(useJsonFormsArrayControl(props));
  },
  computed: {
    arraySchema: function arraySchema() {
      return Resolve.schema(this.control.rootSchema, this.control.uischema.scope, this.control.rootSchema);
    },
    dataLength: function dataLength() {
      return this.control.data ? this.control.data.length : 0;
    }
  },
  methods: {
    composePaths: composePaths,
    createDefaultValue: createDefaultValue,
    addButtonClick: function addButtonClick() {
      this.addItem(this.control.path, createDefaultValue(this.control.schema, this.control.rootSchema))();
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
  tester: rankWith(3, or(isObjectArrayControl, isPrimitiveArrayControl))
};

var _hoisted_1$4 = {
  key: 0
};
function render$n(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_toolbar_title = resolveComponent("v-toolbar-title");
  var _component_validation_icon = resolveComponent("validation-icon");
  var _component_v_spacer = resolveComponent("v-spacer");
  var _component_v_icon = resolveComponent("v-icon");
  var _component_v_btn = resolveComponent("v-btn");
  var _component_v_tooltip = resolveComponent("v-tooltip");
  var _component_v_toolbar = resolveComponent("v-toolbar");
  var _component_v_card_title = resolveComponent("v-card-title");
  var _component_dispatch_renderer = resolveComponent("dispatch-renderer");
  var _component_v_table = resolveComponent("v-table");
  var _component_v_row = resolveComponent("v-row");
  var _component_v_container = resolveComponent("v-container");
  var _component_v_card_text = resolveComponent("v-card-text");
  var _component_v_card = resolveComponent("v-card");
  return _ctx.control.visible ? (openBlock(), createBlock(_component_v_card, {
    key: 0,
    "class": normalizeClass(_ctx.styles.arrayList.root),
    elevation: "0"
  }, {
    "default": withCtx(function () {
      return [createVNode(_component_v_card_title, null, {
        "default": withCtx(function () {
          return [createVNode(_component_v_toolbar, {
            flat: "",
            "class": normalizeClass(_ctx.styles.arrayList.toolbar)
          }, {
            "default": withCtx(function () {
              return [createVNode(_component_v_toolbar_title, {
                "class": normalizeClass(_ctx.styles.arrayList.label)
              }, {
                "default": withCtx(function () {
                  return [createTextVNode(toDisplayString(_ctx.computedLabel), 1)];
                }),
                _: 1
              }, 8, ["class"]), _ctx.control.childErrors.length > 0 ? (openBlock(), createBlock(_component_validation_icon, {
                key: 0,
                errors: _ctx.control.childErrors
              }, null, 8, ["errors"])) : createCommentVNode("", true), createVNode(_component_v_spacer), createVNode(_component_v_tooltip, {
                bottom: ""
              }, {
                activator: withCtx(function (_ref) {
                  var props = _ref.props;
                  return [createVNode(_component_v_btn, mergeProps({
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
                    "default": withCtx(function () {
                      return [createVNode(_component_v_icon, null, {
                        "default": withCtx(function () {
                          return [createTextVNode("mdi-plus")];
                        }),
                        _: 1
                      })];
                    }),
                    _: 2
                  }, 1040, ["aria-label", "class", "disabled", "onClick"])];
                }),
                "default": withCtx(function () {
                  return [createTextVNode(" " + toDisplayString("Add to ".concat(_ctx.control.label)), 1)];
                }),
                _: 1
              })];
            }),
            _: 1
          }, 8, ["class"])];
        }),
        _: 1
      }), createVNode(_component_v_card_text, null, {
        "default": withCtx(function () {
          return [createVNode(_component_v_container, {
            "justify-space-around": "",
            "align-content-center": ""
          }, {
            "default": withCtx(function () {
              return [createVNode(_component_v_row, {
                justify: "center"
              }, {
                "default": withCtx(function () {
                  return [createVNode(_component_v_table, {
                    "class": "array-container flex"
                  }, {
                    "default": withCtx(function () {
                      return [_ctx.control.schema.type === 'object' ? (openBlock(), createElementBlock("thead", _hoisted_1$4, [createElementVNode("tr", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.getValidColumnProps(_ctx.control.schema), function (prop, index) {
                        return openBlock(), createElementBlock("th", {
                          key: "".concat(_ctx.control.path, "-header-").concat(index),
                          scope: "col"
                        }, toDisplayString(_ctx.title(prop)), 1);
                      }), 128)), _ctx.control.enabled ? (openBlock(), createElementBlock("th", {
                        key: 0,
                        "class": normalizeClass(_ctx.appliedOptions.showSortButtons ? 'fixed-cell' : 'fixed-cell-small'),
                        scope: "col"
                      }, null, 2)) : createCommentVNode("", true)])])) : createCommentVNode("", true), createElementVNode("tbody", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.control.data, function (element, index) {
                        return openBlock(), createElementBlock("tr", {
                          key: "".concat(_ctx.control.path, "-").concat(index),
                          "class": normalizeClass(_ctx.styles.arrayList.item)
                        }, [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.getValidColumnProps(_ctx.control.schema), function (propName) {
                          return openBlock(), createElementBlock("td", {
                            key: _ctx.composePaths(_ctx.composePaths(_ctx.control.path, "".concat(index)), propName)
                          }, [createVNode(_component_dispatch_renderer, {
                            schema: _ctx.control.schema,
                            uischema: _ctx.resolveUiSchema(propName),
                            path: _ctx.composePaths(_ctx.control.path, "".concat(index)),
                            enabled: _ctx.control.enabled,
                            renderers: _ctx.control.renderers,
                            cells: _ctx.control.cells
                          }, null, 8, ["schema", "uischema", "path", "enabled", "renderers", "cells"])]);
                        }), 128)), _ctx.control.enabled ? (openBlock(), createElementBlock("td", {
                          key: 0,
                          "class": normalizeClass(_ctx.appliedOptions.showSortButtons ? 'fixed-cell' : 'fixed-cell-small')
                        }, [createVNode(_component_v_tooltip, {
                          bottom: ""
                        }, {
                          activator: withCtx(function (_ref2) {
                            var props = _ref2.props;
                            return [_ctx.appliedOptions.showSortButtons ? (openBlock(), createBlock(_component_v_btn, mergeProps({
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
                              "default": withCtx(function () {
                                return [createVNode(_component_v_icon, {
                                  "class": "notranslate"
                                }, {
                                  "default": withCtx(function () {
                                    return [createTextVNode("mdi-arrow-up")];
                                  }),
                                  _: 1
                                })];
                              }),
                              _: 2
                            }, 1040, ["disabled", "class", "onClick"])) : createCommentVNode("", true)];
                          }),
                          "default": withCtx(function () {
                            return [createTextVNode(" Move Up ")];
                          }),
                          _: 2
                        }, 1024), createVNode(_component_v_tooltip, {
                          bottom: ""
                        }, {
                          activator: withCtx(function (_ref3) {
                            var props = _ref3.props;
                            return [_ctx.appliedOptions.showSortButtons ? (openBlock(), createBlock(_component_v_btn, mergeProps({
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
                              "default": withCtx(function () {
                                return [createVNode(_component_v_icon, {
                                  "class": "notranslate"
                                }, {
                                  "default": withCtx(function () {
                                    return [createTextVNode("mdi-arrow-down")];
                                  }),
                                  _: 1
                                })];
                              }),
                              _: 2
                            }, 1040, ["disabled", "class", "onClick"])) : createCommentVNode("", true)];
                          }),
                          "default": withCtx(function () {
                            return [createTextVNode(" Move Down ")];
                          }),
                          _: 2
                        }, 1024), createVNode(_component_v_tooltip, {
                          bottom: ""
                        }, {
                          activator: withCtx(function (_ref4) {
                            var props = _ref4.props;
                            return [createVNode(_component_v_btn, mergeProps(props, {
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
                              "default": withCtx(function () {
                                return [createVNode(_component_v_icon, {
                                  "class": "notranslate"
                                }, {
                                  "default": withCtx(function () {
                                    return [createTextVNode("mdi-delete")];
                                  }),
                                  _: 1
                                })];
                              }),
                              _: 2
                            }, 1040, ["class", "disabled", "onClick"])];
                          }),
                          "default": withCtx(function () {
                            return [createTextVNode(" Delete ")];
                          }),
                          _: 2
                        }, 1024)], 2)) : createCommentVNode("", true)], 2);
                      }), 128))])];
                    }),
                    _: 1
                  })];
                }),
                _: 1
              })];
            }),
            _: 1
          }), _ctx.dataLength === 0 ? (openBlock(), createBlock(_component_v_container, {
            key: 0,
            "class": normalizeClass(_ctx.styles.arrayList.noData)
          }, {
            "default": withCtx(function () {
              return [createTextVNode(" No data ")];
            }),
            _: 1
          }, 8, ["class"])) : createCommentVNode("", true)];
        }),
        _: 1
      })];
    }),
    _: 1
  }, 8, ["class"])) : createCommentVNode("", true);
}

controlRenderer$m.render = render$n;
controlRenderer$m.__scopeId = "data-v-5b6f5c3b";

var controlRenderer$l = defineComponent({
  name: 'enum-array-renderer',
  components: {
    VCheckbox: VCheckbox,
    VContainer: VContainer,
    VRow: VRow,
    VCol: VCol
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    return useVuetifyBasicControl(useJsonFormsMultiEnumControl(props));
  },
  methods: {
    dataHasEnum: function dataHasEnum(value) {
      var _this$control$data;
      return !!((_this$control$data = this.control.data) !== null && _this$control$data !== void 0 && _this$control$data.includes(value));
    },
    composePaths: composePaths,
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
  tester: rankWith(5, and(uiTypeIs('Control'), and(schemaMatches(function (schema) {
    return hasType(schema, 'array') && !Array.isArray(schema.items) && schema.uniqueItems === true;
  }), schemaSubPathMatches('items', function (schema) {
    return hasOneOfItems(schema) || hasEnumItems(schema);
  }))))
};

function render$m(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_checkbox = resolveComponent("v-checkbox");
  var _component_v_col = resolveComponent("v-col");
  var _component_v_row = resolveComponent("v-row");
  var _component_v_container = resolveComponent("v-container");
  return _ctx.control.visible ? (openBlock(), createBlock(_component_v_container, {
    key: 0,
    fluid: ""
  }, {
    "default": withCtx(function () {
      return [createVNode(_component_v_row, null, {
        "default": withCtx(function () {
          return [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.control.options, function (o, index) {
            return openBlock(), createBlock(_component_v_col, {
              key: o.value
            }, {
              "default": withCtx(function () {
                return [createVNode(_component_v_checkbox, mergeProps({
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
  })) : createCommentVNode("", true);
}

controlRenderer$l.render = render$m;

var controlRenderer$k = defineComponent({
  name: 'object-renderer',
  components: {
    DispatchRenderer: DispatchRenderer,
    AdditionalProperties: script$1
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    var control = useVuetifyControl(useJsonFormsControlWithDetail(props));
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
        var uiSchema = Generate.uiSchema(_this.control.schema, 'Group');
        if (isEmpty(_this.control.path)) {
          uiSchema.type = 'VerticalLayout';
        } else {
          uiSchema.label = _this.control.label;
        }
        return uiSchema;
      };
      var result = findUISchema(this.control.uischemas, this.control.schema, this.control.uischema.scope, this.control.path, uiSchemaGenerator, this.control.uischema, this.control.rootSchema);
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
  tester: rankWith(2, isObjectControl)
};

var _hoisted_1$3 = {
  key: 0
};
function render$l(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_dispatch_renderer = resolveComponent("dispatch-renderer");
  var _component_additional_properties = resolveComponent("additional-properties");
  return _ctx.control.visible ? (openBlock(), createElementBlock("div", _hoisted_1$3, [createVNode(_component_dispatch_renderer, {
    visible: _ctx.control.visible,
    enabled: _ctx.control.enabled,
    schema: _ctx.control.schema,
    uischema: _ctx.detailUiSchema,
    path: _ctx.control.path,
    renderers: _ctx.control.renderers,
    cells: _ctx.control.cells
  }, null, 8, ["visible", "enabled", "schema", "uischema", "path", "renderers", "cells"]), _ctx.hasAdditionalProperties && _ctx.showAdditionalProperties ? (openBlock(), createBlock(_component_additional_properties, {
    key: 0,
    input: _ctx.input
  }, null, 8, ["input"])) : createCommentVNode("", true)])) : createCommentVNode("", true);
}

controlRenderer$k.render = render$l;

var controlRenderer$j = defineComponent({
  name: 'one-of-select-renderer',
  components: {
    DispatchRenderer: DispatchRenderer,
    CombinatorProperties: script$2,
    VDialog: VDialog,
    VCard: VCard,
    VCardTitle: VCardTitle,
    VCardText: VCardText,
    VCardActions: VCardActions,
    VSpacer: VSpacer,
    VBtn: VBtn,
    VSelect: VSelect,
    VHover: VHover
  },
  directives: {
    DisabledIconFocus: DisabledIconFocus
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    var input = useJsonFormsOneOfControl(props);
    var control = input.control.value;
    var selectedIndex = ref(control.indexOfFittingSchema);
    var selectIndex = ref(selectedIndex.value);
    var newSelectedIndex = ref(0);
    var dialog = ref(false);
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
      var result = createCombinatorRenderInfos(
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
      this.handleChange(this.path, this.newSelectedIndex !== undefined && this.newSelectedIndex !== null ? createDefaultValue(this.indexedOneOfRenderInfos[this.newSelectedIndex].schema, this.control.rootSchema) : {});
      this.selectIndex = this.newSelectedIndex;
      this.selectedIndex = this.newSelectedIndex;
    }
  }
});
var entry$j = {
  renderer: controlRenderer$j,
  tester: rankWith(3, isOneOfControl)
};

var _hoisted_1$2 = {
  key: 0
};
function render$k(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_combinator_properties = resolveComponent("combinator-properties");
  var _component_v_select = resolveComponent("v-select");
  var _component_v_hover = resolveComponent("v-hover");
  var _component_dispatch_renderer = resolveComponent("dispatch-renderer");
  var _component_v_card_title = resolveComponent("v-card-title");
  var _component_v_card_text = resolveComponent("v-card-text");
  var _component_v_spacer = resolveComponent("v-spacer");
  var _component_v_btn = resolveComponent("v-btn");
  var _component_v_card_actions = resolveComponent("v-card-actions");
  var _component_v_card = resolveComponent("v-card");
  var _component_v_dialog = resolveComponent("v-dialog");
  var _directive_disabled_icon_focus = resolveDirective("disabled-icon-focus");
  return _ctx.control.visible ? (openBlock(), createElementBlock("div", _hoisted_1$2, [createVNode(_component_combinator_properties, {
    schema: _ctx.control.schema,
    combinatorKeyword: "oneOf",
    path: _ctx.path
  }, null, 8, ["schema", "path"]), createVNode(_component_v_hover, null, {
    "default": withCtx(function (_ref) {
      var isHovering = _ref.isHovering;
      return [withDirectives(createVNode(_component_v_select, mergeProps({
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
  }), _ctx.selectedIndex !== undefined && _ctx.selectedIndex !== null ? (openBlock(), createBlock(_component_dispatch_renderer, {
    key: 0,
    schema: _ctx.indexedOneOfRenderInfos[_ctx.selectedIndex].schema,
    uischema: _ctx.indexedOneOfRenderInfos[_ctx.selectedIndex].uischema,
    path: _ctx.control.path,
    renderers: _ctx.control.renderers,
    cells: _ctx.control.cells,
    enabled: _ctx.control.enabled
  }, null, 8, ["schema", "uischema", "path", "renderers", "cells", "enabled"])) : createCommentVNode("", true), createVNode(_component_v_dialog, {
    modelValue: _ctx.dialog,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return _ctx.dialog = $event;
    }),
    persistent: "",
    "max-width": "600",
    onKeydown: withKeys(_ctx.cancel, ["esc"])
  }, {
    "default": withCtx(function () {
      return [createVNode(_component_v_card, null, {
        "default": withCtx(function () {
          return [createVNode(_component_v_card_title, {
            "class": "text-h5"
          }, {
            "default": withCtx(function () {
              return [createTextVNode(" Clear form? ")];
            }),
            _: 1
          }), createVNode(_component_v_card_text, null, {
            "default": withCtx(function () {
              return [createTextVNode(" Your data will be cleared if you select this new option. Do you want to proceed? ")];
            }),
            _: 1
          }), createVNode(_component_v_card_actions, null, {
            "default": withCtx(function () {
              return [createVNode(_component_v_spacer), createVNode(_component_v_btn, {
                text: "",
                onClick: _ctx.cancel
              }, {
                "default": withCtx(function () {
                  return [createTextVNode(" No ")];
                }),
                _: 1
              }, 8, ["onClick"]), createVNode(_component_v_btn, {
                text: "",
                ref: "confirm",
                onClick: _ctx.confirm
              }, {
                "default": withCtx(function () {
                  return [createTextVNode(" Yes ")];
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
  }, 8, ["modelValue", "onKeydown"])])) : createCommentVNode("", true);
}

controlRenderer$j.render = render$k;

var controlRenderer$i = defineComponent({
  name: 'one-of-renderer',
  components: {
    DispatchRenderer: DispatchRenderer,
    CombinatorProperties: script$2,
    VDialog: VDialog,
    VCard: VCard,
    VCardTitle: VCardTitle,
    VCardText: VCardText,
    VCardActions: VCardActions,
    VSpacer: VSpacer,
    VBtn: VBtn,
    VTabs: VTabs,
    VTab: VTab,
    VWindow: VWindow,
    VWindowItem: VWindowItem
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    var input = useJsonFormsOneOfControl(props);
    var control = input.control.value;
    var selectedIndex = ref(control.indexOfFittingSchema || 0);
    var tabIndex = ref(selectedIndex.value);
    var newSelectedIndex = ref(0);
    var dialog = ref(false);
    return _objectSpread2(_objectSpread2({}, useVuetifyControl(input)), {}, {
      selectedIndex: selectedIndex,
      tabIndex: tabIndex,
      dialog: dialog,
      newSelectedIndex: newSelectedIndex
    });
  },
  computed: {
    oneOfRenderInfos: function oneOfRenderInfos() {
      var result = createCombinatorRenderInfos(
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
      this.handleChange(this.path, createDefaultValue(this.oneOfRenderInfos[this.newSelectedIndex].schema, this.control.rootSchema));
      this.tabIndex = this.newSelectedIndex;
      this.selectedIndex = this.newSelectedIndex;
    }
  }
});
var entry$i = {
  renderer: controlRenderer$i,
  tester: rankWith(4, and(isOneOfControl, optionIs('variant', 'tab')))
};

var _hoisted_1$1 = {
  key: 0
};
function render$j(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_combinator_properties = resolveComponent("combinator-properties");
  var _component_v_tab = resolveComponent("v-tab");
  var _component_v_tabs = resolveComponent("v-tabs");
  var _component_dispatch_renderer = resolveComponent("dispatch-renderer");
  var _component_v_window_item = resolveComponent("v-window-item");
  var _component_v_window = resolveComponent("v-window");
  var _component_v_card_title = resolveComponent("v-card-title");
  var _component_v_card_text = resolveComponent("v-card-text");
  var _component_v_spacer = resolveComponent("v-spacer");
  var _component_v_btn = resolveComponent("v-btn");
  var _component_v_card_actions = resolveComponent("v-card-actions");
  var _component_v_card = resolveComponent("v-card");
  var _component_v_dialog = resolveComponent("v-dialog");
  return _ctx.control.visible ? (openBlock(), createElementBlock("div", _hoisted_1$1, [createVNode(_component_combinator_properties, {
    schema: _ctx.control.schema,
    combinatorKeyword: "oneOf",
    path: _ctx.path
  }, null, 8, ["schema", "path"]), createVNode(_component_v_tabs, {
    modelValue: _ctx.tabIndex,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return _ctx.tabIndex = $event;
    })
  }, {
    "default": withCtx(function () {
      return [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.oneOfRenderInfos, function (oneOfRenderInfo, oneOfIndex) {
        return openBlock(), createBlock(_component_v_tab, {
          onChange: _ctx.handleTabChange,
          key: "".concat(_ctx.control.path, "-").concat(oneOfIndex)
        }, {
          "default": withCtx(function () {
            return [createTextVNode(toDisplayString(oneOfRenderInfo.label), 1)];
          }),
          _: 2
        }, 1032, ["onChange"]);
      }), 128))];
    }),
    _: 1
  }, 8, ["modelValue"]), createVNode(_component_v_window, {
    modelValue: _ctx.selectedIndex,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return _ctx.selectedIndex = $event;
    })
  }, {
    "default": withCtx(function () {
      return [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.oneOfRenderInfos, function (oneOfRenderInfo, oneOfIndex) {
        return openBlock(), createBlock(_component_v_window_item, {
          key: "".concat(_ctx.control.path, "-").concat(oneOfIndex)
        }, {
          "default": withCtx(function () {
            return [_ctx.selectedIndex === oneOfIndex ? (openBlock(), createBlock(_component_dispatch_renderer, {
              key: 0,
              schema: oneOfRenderInfo.schema,
              uischema: oneOfRenderInfo.uischema,
              path: _ctx.control.path,
              renderers: _ctx.control.renderers,
              cells: _ctx.control.cells,
              enabled: _ctx.control.enabled
            }, null, 8, ["schema", "uischema", "path", "renderers", "cells", "enabled"])) : createCommentVNode("", true)];
          }),
          _: 2
        }, 1024);
      }), 128))];
    }),
    _: 1
  }, 8, ["modelValue"]), createVNode(_component_v_dialog, {
    modelValue: _ctx.dialog,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return _ctx.dialog = $event;
    }),
    persistent: "",
    "max-width": "600",
    onKeydown: withKeys(_ctx.cancel, ["esc"])
  }, {
    "default": withCtx(function () {
      return [createVNode(_component_v_card, null, {
        "default": withCtx(function () {
          return [createVNode(_component_v_card_title, {
            "class": "text-h5"
          }, {
            "default": withCtx(function () {
              return [createTextVNode(" Clear form? ")];
            }),
            _: 1
          }), createVNode(_component_v_card_text, null, {
            "default": withCtx(function () {
              return [createTextVNode(" Your data will be cleared if you navigate away from this tab. Do you want to proceed? ")];
            }),
            _: 1
          }), createVNode(_component_v_card_actions, null, {
            "default": withCtx(function () {
              return [createVNode(_component_v_spacer), createVNode(_component_v_btn, {
                text: "",
                onClick: _ctx.cancel
              }, {
                "default": withCtx(function () {
                  return [createTextVNode(" No ")];
                }),
                _: 1
              }, 8, ["onClick"]), createVNode(_component_v_btn, {
                text: "",
                ref: "confirm",
                onClick: _ctx.confirm
              }, {
                "default": withCtx(function () {
                  return [createTextVNode(" Yes ")];
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
  }, 8, ["modelValue", "onKeydown"])])) : createCommentVNode("", true);
}

controlRenderer$i.render = render$j;

var complexRenderers = [entry$o, entry$n, entry$m, entry$l, entry$k, entry$j, entry$i];

var script = defineComponent({
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
  return _ctx.visible ? (openBlock(), createElementBlock("div", {
    key: 0,
    "class": normalizeClass(_ctx.styles.control.root),
    id: _ctx.id
  }, [renderSlot(_ctx.$slots, "default")], 10, _hoisted_1)) : createCommentVNode("", true);
}

script.render = render$i;

var controlRenderer$h = defineComponent({
  name: 'anyof-string-or-enum-control-renderer',
  components: {
    ControlWrapper: script,
    VHover: VHover,
    VCombobox: VCombobox
  },
  directives: {
    DisabledIconFocus: DisabledIconFocus
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    return useVuetifyControl(useJsonFormsControl(props), function (value) {
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
var simpleAnyOf = and(uiTypeIs('Control'), schemaMatches(function (schema) {
  return Array.isArray(schema.anyOf) && hasEnumAndText(schema.anyOf);
}));
var entry$h = {
  renderer: controlRenderer$h,
  tester: rankWith(5, simpleAnyOf)
};

function render$h(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_combobox = resolveComponent("v-combobox");
  var _component_v_hover = resolveComponent("v-hover");
  var _component_control_wrapper = resolveComponent("control-wrapper");
  var _directive_disabled_icon_focus = resolveDirective("disabled-icon-focus");
  return openBlock(), createBlock(_component_control_wrapper, mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": withCtx(function () {
      return [createVNode(_component_v_hover, null, {
        "default": withCtx(function (_ref) {
          var isHovering = _ref.isHovering;
          return [withDirectives(createVNode(_component_v_combobox, mergeProps({
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

var controlRenderer$g = defineComponent({
  name: 'boolean-control-renderer',
  components: {
    VCheckbox: VCheckbox,
    ControlWrapper: script
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    return useVuetifyControl(useJsonFormsControl(props), function (value) {
      return value || false;
    });
  }
});
var entry$g = {
  renderer: controlRenderer$g,
  tester: rankWith(1, isBooleanControl)
};

function render$g(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_checkbox = resolveComponent("v-checkbox");
  var _component_control_wrapper = resolveComponent("control-wrapper");
  return openBlock(), createBlock(_component_control_wrapper, mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": withCtx(function () {
      return [createVNode(_component_v_checkbox, mergeProps({
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

var controlRenderer$f = defineComponent({
  name: 'boolean-toggle-control-renderer',
  components: {
    ControlWrapper: script,
    VSwitch: VSwitch
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    return useVuetifyControl(useJsonFormsControl(props), function (value) {
      return value || false;
    });
  }
});
var entry$f = {
  renderer: controlRenderer$f,
  tester: rankWith(3, and(isBooleanControl, optionIs('toggle', true)))
};

function render$f(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_switch = resolveComponent("v-switch");
  var _component_control_wrapper = resolveComponent("control-wrapper");
  return openBlock(), createBlock(_component_control_wrapper, mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": withCtx(function () {
      return [createVNode(_component_v_switch, mergeProps({
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

var controlRenderer$e = defineComponent({
  name: 'date-control-renderer',
  components: {
    ControlWrapper: script,
    VTextField: VTextField
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    var adaptValue = function adaptValue(value) {
      return value || undefined;
    };
    var control = useVuetifyControl(useJsonFormsControl(props), adaptValue);
    return _objectSpread2(_objectSpread2({}, control), {}, {
      adaptValue: adaptValue
    });
  }
});
var entry$e = {
  renderer: controlRenderer$e,
  tester: rankWith(2, isDateControl)
};

function render$e(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_text_field = resolveComponent("v-text-field");
  var _component_control_wrapper = resolveComponent("control-wrapper");
  return openBlock(), createBlock(_component_control_wrapper, mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": withCtx(function () {
      return [createVNode(_component_v_text_field, mergeProps({
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
var controlRenderer$d = defineComponent({
  name: 'datetime-control-renderer',
  components: {
    ControlWrapper: script,
    VTextField: VTextField
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    var adaptValue = function adaptValue(value) {
      return toISOString(value) || undefined;
    };
    var control = useVuetifyControl(useJsonFormsControl(props), adaptValue);
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
  tester: rankWith(2, isDateTimeControl)
};

function render$d(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_text_field = resolveComponent("v-text-field");
  var _component_control_wrapper = resolveComponent("control-wrapper");
  return openBlock(), createBlock(_component_control_wrapper, mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": withCtx(function () {
      return [createVNode(_component_v_text_field, mergeProps({
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

var controlRenderer$c = defineComponent({
  name: 'enum-control-renderer',
  components: {
    ControlWrapper: script,
    VSelect: VSelect,
    VHover: VHover
  },
  directives: {
    DisabledIconFocus: DisabledIconFocus
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    var t = useTranslator();
    var control = useVuetifyControl(useJsonFormsEnumControl(props), function (value) {
      return value !== null ? value : undefined;
    });
    return _objectSpread2(_objectSpread2({}, control), {}, {
      t: t
    });
  }
});
var entry$c = {
  renderer: controlRenderer$c,
  tester: rankWith(2, isEnumControl)
};

function render$c(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_select = resolveComponent("v-select");
  var _component_v_hover = resolveComponent("v-hover");
  var _component_control_wrapper = resolveComponent("control-wrapper");
  var _directive_disabled_icon_focus = resolveDirective("disabled-icon-focus");
  return openBlock(), createBlock(_component_control_wrapper, mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": withCtx(function () {
      return [createVNode(_component_v_hover, null, {
        "default": withCtx(function (_ref) {
          var isHovering = _ref.isHovering;
          return [withDirectives(createVNode(_component_v_select, mergeProps({
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
var controlRenderer$b = defineComponent({
  name: 'integer-control-renderer',
  components: {
    ControlWrapper: script,
    VHover: VHover,
    VTextField: VTextField
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    var adaptValue = function adaptValue(value) {
      return typeof value === 'number' ? value : value || undefined;
    };
    var input = useVuetifyControl(useJsonFormsControl(props), adaptValue);
    var inputValue = ref(unref(input.control).data || '');
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
  tester: rankWith(1, isIntegerControl)
};

function render$b(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_text_field = resolveComponent("v-text-field");
  var _component_v_hover = resolveComponent("v-hover");
  var _component_control_wrapper = resolveComponent("control-wrapper");
  return openBlock(), createBlock(_component_control_wrapper, mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": withCtx(function () {
      return [createVNode(_component_v_hover, null, {
        "default": withCtx(function (_ref) {
          var isHovering = _ref.isHovering;
          return [createVNode(_component_v_text_field, mergeProps({
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

var controlRenderer$a = defineComponent({
  name: 'multi-string-control-renderer',
  components: {
    ControlWrapper: script,
    VHover: VHover,
    VTextarea: VTextarea
  },
  directives: {
    DisabledIconFocus: DisabledIconFocus
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    return useVuetifyControl(useJsonFormsControl(props), function (value) {
      return value || undefined;
    }, 300);
  }
});
var entry$a = {
  renderer: controlRenderer$a,
  tester: rankWith(2, and(isStringControl, isMultiLineControl))
};

function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_textarea = resolveComponent("v-textarea");
  var _component_v_hover = resolveComponent("v-hover");
  var _component_control_wrapper = resolveComponent("control-wrapper");
  var _directive_disabled_icon_focus = resolveDirective("disabled-icon-focus");
  return openBlock(), createBlock(_component_control_wrapper, mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": withCtx(function () {
      return [createVNode(_component_v_hover, null, {
        "default": withCtx(function (_ref) {
          var isHovering = _ref.isHovering;
          return [withDirectives(createVNode(_component_v_textarea, mergeProps({
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
var controlRenderer$9 = defineComponent({
  name: 'number-control-renderer',
  components: {
    ControlWrapper: script,
    VHover: VHover,
    VTextField: VTextField
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    var adaptValue = function adaptValue(value) {
      return typeof value === 'number' ? value : value || undefined;
    };
    var input = useVuetifyControl(useJsonFormsControl(props), adaptValue);
    var inputValue = ref(unref(input.control).data || '');
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
  tester: rankWith(1, isNumberControl)
};

function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_text_field = resolveComponent("v-text-field");
  var _component_v_hover = resolveComponent("v-hover");
  var _component_control_wrapper = resolveComponent("control-wrapper");
  return openBlock(), createBlock(_component_control_wrapper, mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": withCtx(function () {
      return [createVNode(_component_v_hover, null, {
        "default": withCtx(function (_ref) {
          var isHovering = _ref.isHovering;
          return [createVNode(_component_v_text_field, mergeProps({
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

var controlRenderer$8 = defineComponent({
  name: 'oneof-enum-control-renderer',
  components: {
    ControlWrapper: script,
    VSelect: VSelect,
    VHover: VHover
  },
  directives: {
    DisabledIconFocus: DisabledIconFocus
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    var t = useTranslator();
    var control = useVuetifyControl(useJsonFormsOneOfEnumControl(props), function (value) {
      return value !== null ? value : undefined;
    });
    return _objectSpread2(_objectSpread2({}, control), {}, {
      t: t
    });
  }
});
var entry$8 = {
  renderer: controlRenderer$8,
  tester: rankWith(5, isOneOfEnumControl)
};

function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_select = resolveComponent("v-select");
  var _component_v_hover = resolveComponent("v-hover");
  var _component_control_wrapper = resolveComponent("control-wrapper");
  var _directive_disabled_icon_focus = resolveDirective("disabled-icon-focus");
  return openBlock(), createBlock(_component_control_wrapper, mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": withCtx(function () {
      return [createVNode(_component_v_hover, null, {
        "default": withCtx(function (_ref) {
          var isHovering = _ref.isHovering;
          return [withDirectives(createVNode(_component_v_select, mergeProps({
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

var controlRenderer$7 = defineComponent({
  name: 'oneof-radio-group-control-renderer',
  components: {
    ControlWrapper: script,
    VRadioGroup: VRadioGroup,
    VRadio: VRadio,
    VLabel: VLabel
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    return useVuetifyControl(useJsonFormsOneOfEnumControl(props));
  }
});
var entry$7 = {
  renderer: controlRenderer$7,
  tester: rankWith(20, and(isOneOfEnumControl, optionIs('format', 'radio')))
};

function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_label = resolveComponent("v-label");
  var _component_v_radio = resolveComponent("v-radio");
  var _component_v_radio_group = resolveComponent("v-radio-group");
  var _component_control_wrapper = resolveComponent("control-wrapper");
  return openBlock(), createBlock(_component_control_wrapper, mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": withCtx(function () {
      return [createVNode(_component_v_label, mergeProps({
        "for": _ctx.control.id + '-input'
      }, _ctx.vuetifyProps('v-label')), {
        "default": withCtx(function () {
          return [createTextVNode(toDisplayString(_ctx.computedLabel), 1)];
        }),
        _: 1
      }, 16, ["for"]), createVNode(_component_v_radio_group, mergeProps({
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
        "default": withCtx(function () {
          return [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.control.options, function (o) {
            return openBlock(), createBlock(_component_v_radio, mergeProps(_ctx.vuetifyProps("v-radio[".concat(o.value, "]")), {
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

var controlRenderer$6 = defineComponent({
  name: 'password-control-renderer',
  components: {
    ControlWrapper: script,
    VTextField: VTextField
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    var passwordVisible = ref(false);
    return _objectSpread2(_objectSpread2({}, useVuetifyControl(useJsonFormsControl(props), function (value) {
      return value || undefined;
    }, 300)), {}, {
      passwordVisible: passwordVisible
    });
  }
});
var entry$6 = {
  renderer: controlRenderer$6,
  tester: rankWith(2, and(isStringControl, formatIs('password')))
};

function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_text_field = resolveComponent("v-text-field");
  var _component_control_wrapper = resolveComponent("control-wrapper");
  return openBlock(), createBlock(_component_control_wrapper, mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": withCtx(function () {
      return [createVNode(_component_v_text_field, mergeProps({
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

var controlRenderer$5 = defineComponent({
  name: 'radio-group-control-renderer',
  components: {
    ControlWrapper: script,
    VRadioGroup: VRadioGroup,
    VRadio: VRadio,
    VLabel: VLabel
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    return useVuetifyControl(useJsonFormsEnumControl(props));
  }
});
var entry$5 = {
  renderer: controlRenderer$5,
  tester: rankWith(20, and(isEnumControl, optionIs('format', 'radio')))
};

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_label = resolveComponent("v-label");
  var _component_v_radio = resolveComponent("v-radio");
  var _component_v_radio_group = resolveComponent("v-radio-group");
  var _component_control_wrapper = resolveComponent("control-wrapper");
  return openBlock(), createBlock(_component_control_wrapper, mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": withCtx(function () {
      return [createVNode(_component_v_label, mergeProps({
        "for": _ctx.control.id + '-input'
      }, _ctx.vuetifyProps('v-label')), {
        "default": withCtx(function () {
          return [createTextVNode(toDisplayString(_ctx.computedLabel), 1)];
        }),
        _: 1
      }, 16, ["for"]), createVNode(_component_v_radio_group, mergeProps({
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
        "default": withCtx(function () {
          return [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.control.options, function (o) {
            return openBlock(), createBlock(_component_v_radio, mergeProps(_ctx.vuetifyProps("v-radio[".concat(o.value, "]")), {
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

var controlRenderer$4 = defineComponent({
  name: 'slider-control-renderer',
  components: {
    ControlWrapper: script,
    VSlider: VSlider
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    return useVuetifyControl(useJsonFormsControl(props), function (value) {
      return Number(value);
    });
  }
});
var entry$4 = {
  renderer: controlRenderer$4,
  tester: rankWith(4, isRangeControl)
};

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_slider = resolveComponent("v-slider");
  var _component_control_wrapper = resolveComponent("control-wrapper");
  return openBlock(), createBlock(_component_control_wrapper, mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": withCtx(function () {
      return [createVNode(_component_v_slider, mergeProps({
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

var controlRenderer$3 = defineComponent({
  name: 'string-control-renderer',
  components: {
    ControlWrapper: script,
    VHover: VHover,
    VTextField: VTextField,
    VCombobox: VCombobox
  },
  directives: {
    DisabledIconFocus: DisabledIconFocus
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    return useVuetifyControl(useJsonFormsControl(props), function (value) {
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
  tester: rankWith(1, isStringControl)
};

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_combobox = resolveComponent("v-combobox");
  var _component_v_text_field = resolveComponent("v-text-field");
  var _component_v_hover = resolveComponent("v-hover");
  var _component_control_wrapper = resolveComponent("control-wrapper");
  var _directive_disabled_icon_focus = resolveDirective("disabled-icon-focus");
  return openBlock(), createBlock(_component_control_wrapper, mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": withCtx(function () {
      return [createVNode(_component_v_hover, null, {
        "default": withCtx(function (_ref) {
          var isHovering = _ref.isHovering;
          return [_ctx.suggestions !== undefined ? withDirectives((openBlock(), createBlock(_component_v_combobox, mergeProps({
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
          }), null, 16, ["id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "maxlength", "counter", "clearable", "model-value", "items", "onUpdate:modelValue", "onFocus", "onBlur"])), [[_directive_disabled_icon_focus]]) : (openBlock(), createBlock(_component_v_text_field, mergeProps({
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
var controlRenderer$2 = defineComponent({
  name: 'time-control-renderer',
  components: {
    ControlWrapper: script,
    VTextField: VTextField
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    var adaptValue = function adaptValue(value) {
      return appendSecondsIfNecessary(value) || undefined;
    };
    var control = useVuetifyControl(useJsonFormsControl(props), adaptValue);
    return _objectSpread2(_objectSpread2({}, control), {}, {
      adaptValue: adaptValue
    });
  }
});
var entry$2 = {
  renderer: controlRenderer$2,
  tester: rankWith(2, isTimeControl)
};

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_text_field = resolveComponent("v-text-field");
  var _component_control_wrapper = resolveComponent("control-wrapper");
  return openBlock(), createBlock(_component_control_wrapper, mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": withCtx(function () {
      return [createVNode(_component_v_text_field, mergeProps({
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

var controlRenderer$1 = defineComponent({
  name: 'autocomplete-enum-control-renderer',
  components: {
    ControlWrapper: script,
    VSelect: VSelect,
    VAutocomplete: VAutocomplete,
    VHover: VHover
  },
  directives: {
    DisabledIconFocus: DisabledIconFocus
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    var t = useTranslator();
    var control = useVuetifyControl(useJsonFormsEnumControl(props), function (value) {
      return value !== null ? value : undefined;
    }, 300);
    return _objectSpread2(_objectSpread2({}, control), {}, {
      t: t
    });
  }
});
var entry$1 = {
  renderer: controlRenderer$1,
  tester: rankWith(10, isEnumControl)
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_select = resolveComponent("v-select");
  var _component_v_autocomplete = resolveComponent("v-autocomplete");
  var _component_v_hover = resolveComponent("v-hover");
  var _component_control_wrapper = resolveComponent("control-wrapper");
  var _directive_disabled_icon_focus = resolveDirective("disabled-icon-focus");
  return openBlock(), createBlock(_component_control_wrapper, mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": withCtx(function () {
      return [createVNode(_component_v_hover, null, {
        "default": withCtx(function (_ref) {
          var isHovering = _ref.isHovering;
          return [_ctx.appliedOptions.autocomplete === false ? withDirectives((openBlock(), createBlock(_component_v_select, mergeProps({
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
          }), null, 16, ["id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "clearable", "model-value", "items", "item-title", "onChange", "onFocus", "onBlur"])), [[_directive_disabled_icon_focus]]) : withDirectives((openBlock(), createBlock(_component_v_autocomplete, mergeProps({
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

var controlRenderer = defineComponent({
  name: 'autocomplete-oneof-enum-control-renderer',
  components: {
    ControlWrapper: script,
    VSelect: VSelect,
    VAutocomplete: VAutocomplete,
    VHover: VHover
  },
  directives: {
    DisabledIconFocus: DisabledIconFocus
  },
  props: _objectSpread2({}, rendererProps()),
  setup: function setup(props) {
    var t = useTranslator();
    var control = useVuetifyControl(useJsonFormsOneOfEnumControl(props), function (value) {
      return value !== null ? value : undefined;
    }, 300);
    return _objectSpread2(_objectSpread2({}, control), {}, {
      t: t
    });
  }
});
var entry = {
  renderer: controlRenderer,
  tester: rankWith(10, isOneOfEnumControl)
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_select = resolveComponent("v-select");
  var _component_v_autocomplete = resolveComponent("v-autocomplete");
  var _component_v_hover = resolveComponent("v-hover");
  var _component_control_wrapper = resolveComponent("control-wrapper");
  var _directive_disabled_icon_focus = resolveDirective("disabled-icon-focus");
  return openBlock(), createBlock(_component_control_wrapper, mergeProps(_ctx.controlWrapper, {
    styles: _ctx.styles,
    isFocused: _ctx.isFocused,
    appliedOptions: _ctx.appliedOptions
  }), {
    "default": withCtx(function () {
      return [createVNode(_component_v_hover, null, {
        "default": withCtx(function (_ref) {
          var isHovering = _ref.isHovering;
          return [_ctx.appliedOptions.autocomplete === false ? withDirectives((openBlock(), createBlock(_component_v_select, mergeProps({
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
          }), null, 16, ["id", "class", "disabled", "autofocus", "placeholder", "label", "hint", "persistent-hint", "required", "error-messages", "clearable", "model-value", "items", "item-title", "onChange", "onFocus", "onBlur"])), [[_directive_disabled_icon_focus]]) : withDirectives((openBlock(), createBlock(_component_v_autocomplete, mergeProps({
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

export { controlRenderer$o as AllOfRenderer, controlRenderer$n as AnyOfRenderer, controlRenderer$h as AnyOfStringOrEnumControlRenderer, controlRenderer$m as ArrayControlRenderer, controlRenderer$p as ArrayLayoutRenderer, controlRenderer$1 as AutocompleteEnumControlRenderer, controlRenderer as AutocompleteOneOfEnumControlRenderer, controlRenderer$g as BooleanControlRenderer, controlRenderer$f as BooleanToggleControlRenderer, layoutRenderer$3 as CategorizationRenderer, script as ControlWrapper, controlRenderer$e as DateControlRenderer, controlRenderer$d as DateTimeControlRenderer, DisabledIconFocus, controlRenderer$l as EnumArrayRenderer, controlRenderer$c as EnumControlRenderer, layoutRenderer$2 as GroupRenderer, layoutRenderer$1 as HorizontalLayoutRenderer, controlRenderer$b as IntegerControlRenderer, labelRenderer as LabelRenderer, controlRenderer$a as MultiStringControlRenderer, controlRenderer$9 as NumberControlRenderer, controlRenderer$k as ObjectRenderer, controlRenderer$8 as OneOfEnumControlRenderer, controlRenderer$7 as OneOfRadioGroupControlRenderer, controlRenderer$j as OneOfRenderer, controlRenderer$i as OneOfTabRenderer, controlRenderer$6 as PasswordControlRenderer, controlRenderer$5 as RadioGroupControlRenderer, controlRenderer$4 as SliderControlRenderer, controlRenderer$3 as StringControlRenderer, controlRenderer$2 as TimeControlRenderer, script$4 as ValidationBadge, script$3 as ValidationIcon, layoutRenderer as VerticalLayoutRenderer, additionalRenderers, entry$o as allOfRendererEntry, entry$n as anyOfRendererEntry, entry$h as anyOfStringOrEnumControlRendererEntry, entry$m as arrayControlRendererEntry, entry$t as arrayLayoutRendererEntry, arrayListRendererEntry, arrayRenderers, entry$1 as autocompleteEnumControlRendererEntry, entry as autocompleteOneOfEnumControlRendererEntry, entry$g as booleanControlRendererEntry, entry$f as booleanToggleControlRendererEntry, entry$s as categorizationRendererEntry, classes, complexRenderers, controlRenderers, createAjv, entry$e as dateControlRendererEntry, entry$d as dateTimeControlRendererEntry, defaultStyles, entry$l as enumArrayRendererEntry, entry$c as enumControlRendererEntry, extendedRenderers, extendedVuetifyRenderers, entry$r as groupRendererEntry, entry$q as horizontalLayoutRendererEntry, i18nDefaultMessages, entry$b as integerControlRendererEntry, entry$u as labelRendererEntry, layoutRenderers, mergeStyles, entry$a as multiStringControlRendererEntry, entry$9 as numberControlRendererEntry, entry$k as objectRendererEntry, entry$8 as oneOfEnumControlRendererEntry, entry$7 as oneOfRadioGroupControlRendererEntry, entry$j as oneOfRendererEntry, entry$i as oneOfTabRendererEntry, parseDateTime, entry$6 as passwordControlRendererEntry, entry$5 as radioGroupControlRendererEntry, entry$4 as sliderControlRendererEntry, entry$3 as stringControlRendererEntry, entry$2 as timeControlRendererEntry, useAjv, useComputedLabel, useControlAppliedOptions, useNested, useStyles, useTranslator, useVuetifyArrayControl, useVuetifyBasicControl, useVuetifyControl, useVuetifyLabel, useVuetifyLayout, entry$p as verticalLayoutRendererEntry, vuetifyRenderers };
//# sourceMappingURL=jsonforms-vue-vuetify.esm.js.map
