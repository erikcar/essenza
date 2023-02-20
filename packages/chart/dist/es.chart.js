/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("echarts"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "echarts"], factory);
	else if(typeof exports === 'object')
		exports["essenza"] = factory(require("react"), require("echarts"));
	else
		root["essenza"] = factory(root["react"], root["echarts"]);
})(self, (__WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_echarts__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/chart.js":
/*!**********************!*\
  !*** ./src/chart.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var echarts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! echarts */ \"echarts\");\n/* harmony import */ var echarts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(echarts__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chartContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chartContext */ \"./src/chartContext.js\");\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n//import PropTypes from \"prop-types\";\n\n\n\n//import * as React from \"react\";\nconst EChart = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().forwardRef((props, ref) => {\n  const {\n    children,\n    className,\n    source,\n    dimensions,\n    chart,\n    loading,\n    ...rest\n  } = props;\n  const [changed, refresh] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n\n  //chart.update = update;\n  //console.log(\"CHART-DEBUGS-RENDER\", chart);\n\n  const resizeChart = () => {\n    chart.instance?.resize();\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {\n    if (chart.instance) {\n      chart.changed = true;\n    }\n  }, [chart.option, chart]);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {\n    if (chart.instance) {\n      console.log(\"CHART-DEBUGS\", chart);\n      chart.instance.setOption(chart.option);\n      chart.changed = false;\n    }\n  }, [changed, chart]);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {\n    if (chart.instance) {\n      /*if (chart.changed)\r\n          chart.option.dataset = { source: source || [] };\r\n      else\r\n          chart.option = { dataset: { source: source || [] } };*/\n      const s = Array.isArray(source) ? source : [];\n      chart.option.dataset = {\n        source: s,\n        dimensions: dimensions\n      };\n      if (loading && source) chart.instance.hideLoading();\n      console.log(\"CHART-DEBUGS-SOURCE\", chart.option);\n      refresh({});\n    }\n  }, [source]);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    chart.instance = echarts__WEBPACK_IMPORTED_MODULE_1__.init(chart.ref.current);\n    const opt = chart.option;\n    const s = Array.isArray(source) ? source : [];\n    opt.dataset = {\n      source: s,\n      dimensions: dimensions\n    };\n    if (loading && !source) chart.instance.showLoading();\n    chart.instance.setOption(opt);\n    chart.refresh = () => {\n      refresh({});\n    };\n    console.log(\"CHART-DEBUGS-INIT\", opt);\n    window.addEventListener(\"resize\", resizeChart);\n    return () => {\n      chart.instance?.dispose();\n      window.removeEventListener(\"resize\", resizeChart);\n    };\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chartContext__WEBPACK_IMPORTED_MODULE_2__.ChartProvider, {\n    chart: chart\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", _extends({}, rest, {\n    ref: chart.ref,\n    className: className ? className : 'chart '\n  }), children));\n});\nconst propTypes = {\n  /**\r\n   * Initial Map Zoom Value\r\n   */\n  //zoom: PropTypes.number,\n};\nEChart.displayName = 'Chart';\n//EChart.propTypes = propTypes;\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(EChart, {}));\n\n//# sourceURL=webpack://essenza/./src/chart.js?");

/***/ }),

/***/ "./src/chartContext.js":
/*!*****************************!*\
  !*** ./src/chartContext.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ChartProvider\": () => (/* binding */ ChartProvider),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nconst ChartContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext(null);\nconst ChartProvider = ({\n  chart,\n  children\n}) => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ChartContext.Provider, {\n    value: chart\n  }, children);\n};\nconst useChart = () => react__WEBPACK_IMPORTED_MODULE_0___default().useContext(ChartContext);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useChart);\n\n//# sourceURL=webpack://essenza/./src/chartContext.js?");

/***/ }),

/***/ "./src/hook/chartHook.js":
/*!*******************************!*\
  !*** ./src/hook/chartHook.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useEChart\": () => (/* binding */ useEChart)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction useEChart(option) {\n  const chart = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({\n    format: (opt, field, props) => {\n      if (opt.hasOwnProperty(field)) {\n        const target = opt[field];\n        for (const key in props) {\n          if (!Object.hasOwnProperty.call(target, key)) {\n            target[key] = props[key];\n          }\n        }\n      } else opt[field] = props;\n    }\n  }).current;\n  const [opt, setOption] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(option || {});\n  chart.option = opt;\n  chart.setOption = setOption;\n  chart.ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();\n  return chart;\n}\n\n//# sourceURL=webpack://essenza/./src/hook/chartHook.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Bar\": () => (/* reexport safe */ _option_series_Bar__WEBPACK_IMPORTED_MODULE_14__.Bar),\n/* harmony export */   \"CategoryAxis\": () => (/* reexport safe */ _option_axis_CategoryAxis__WEBPACK_IMPORTED_MODULE_15__.CategoryAxis),\n/* harmony export */   \"DataZoom\": () => (/* reexport safe */ _option_zoom_dataZoom__WEBPACK_IMPORTED_MODULE_19__.DataZoom),\n/* harmony export */   \"EChart\": () => (/* reexport safe */ _chart__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   \"ExportCSV\": () => (/* reexport safe */ _option_feature_csv__WEBPACK_IMPORTED_MODULE_12__.ExportCSV),\n/* harmony export */   \"ExportImage\": () => (/* reexport safe */ _option_feature_image__WEBPACK_IMPORTED_MODULE_11__.ExportImage),\n/* harmony export */   \"Features\": () => (/* reexport safe */ _option_feature_features__WEBPACK_IMPORTED_MODULE_10__.Features),\n/* harmony export */   \"Legend\": () => (/* reexport safe */ _option_legend__WEBPACK_IMPORTED_MODULE_4__.Legend),\n/* harmony export */   \"Line\": () => (/* reexport safe */ _option_series_Line__WEBPACK_IMPORTED_MODULE_13__.Line),\n/* harmony export */   \"Serie\": () => (/* reexport safe */ _option_series_serie__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   \"Series\": () => (/* reexport safe */ _option_series_series__WEBPACK_IMPORTED_MODULE_7__.Series),\n/* harmony export */   \"TimeAxis\": () => (/* reexport safe */ _option_axis_TimeAxis__WEBPACK_IMPORTED_MODULE_6__.TimeAxis),\n/* harmony export */   \"Title\": () => (/* reexport safe */ _option_title__WEBPACK_IMPORTED_MODULE_3__.Title),\n/* harmony export */   \"Tooltip\": () => (/* reexport safe */ _option_tooltip__WEBPACK_IMPORTED_MODULE_5__.Tooltip),\n/* harmony export */   \"ValueAxis\": () => (/* reexport safe */ _option_axis_ValueAxis__WEBPACK_IMPORTED_MODULE_16__.ValueAxis),\n/* harmony export */   \"XAxis\": () => (/* reexport safe */ _option_axis_xAxis__WEBPACK_IMPORTED_MODULE_17__.XAxis),\n/* harmony export */   \"YAxis\": () => (/* reexport safe */ _option_axis_yAxis__WEBPACK_IMPORTED_MODULE_18__.YAxis),\n/* harmony export */   \"ZoomInside\": () => (/* reexport safe */ _option_zoom_Inside__WEBPACK_IMPORTED_MODULE_9__.ZoomInside),\n/* harmony export */   \"ZoomSlider\": () => (/* reexport safe */ _option_zoom_Slider__WEBPACK_IMPORTED_MODULE_8__.ZoomSlider),\n/* harmony export */   \"useEChart\": () => (/* reexport safe */ _hook_chartHook__WEBPACK_IMPORTED_MODULE_2__.useEChart)\n/* harmony export */ });\n/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chart */ \"./src/chart.js\");\n/* harmony import */ var _option_series_serie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./option/series/serie */ \"./src/option/series/serie.js\");\n/* harmony import */ var _hook_chartHook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hook/chartHook */ \"./src/hook/chartHook.js\");\n/* harmony import */ var _option_title__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./option/title */ \"./src/option/title.js\");\n/* harmony import */ var _option_legend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./option/legend */ \"./src/option/legend.js\");\n/* harmony import */ var _option_tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./option/tooltip */ \"./src/option/tooltip.js\");\n/* harmony import */ var _option_axis_TimeAxis__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./option/axis/TimeAxis */ \"./src/option/axis/TimeAxis.js\");\n/* harmony import */ var _option_series_series__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./option/series/series */ \"./src/option/series/series.js\");\n/* harmony import */ var _option_zoom_Slider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./option/zoom/Slider */ \"./src/option/zoom/Slider.js\");\n/* harmony import */ var _option_zoom_Inside__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./option/zoom/Inside */ \"./src/option/zoom/Inside.js\");\n/* harmony import */ var _option_feature_features__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./option/feature/features */ \"./src/option/feature/features.js\");\n/* harmony import */ var _option_feature_image__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./option/feature/image */ \"./src/option/feature/image.js\");\n/* harmony import */ var _option_feature_csv__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./option/feature/csv */ \"./src/option/feature/csv.js\");\n/* harmony import */ var _option_series_Line__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./option/series/Line */ \"./src/option/series/Line.js\");\n/* harmony import */ var _option_series_Bar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./option/series/Bar */ \"./src/option/series/Bar.js\");\n/* harmony import */ var _option_axis_CategoryAxis__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./option/axis/CategoryAxis */ \"./src/option/axis/CategoryAxis.js\");\n/* harmony import */ var _option_axis_ValueAxis__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./option/axis/ValueAxis */ \"./src/option/axis/ValueAxis.js\");\n/* harmony import */ var _option_axis_xAxis__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./option/axis/xAxis */ \"./src/option/axis/xAxis.js\");\n/* harmony import */ var _option_axis_yAxis__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./option/axis/yAxis */ \"./src/option/axis/yAxis.js\");\n/* harmony import */ var _option_zoom_dataZoom__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./option/zoom/dataZoom */ \"./src/option/zoom/dataZoom.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://essenza/./src/index.js?");

/***/ }),

/***/ "./src/option/axis/CategoryAxis.js":
/*!*****************************************!*\
  !*** ./src/option/axis/CategoryAxis.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CategoryAxis\": () => (/* binding */ CategoryAxis)\n/* harmony export */ });\n/* harmony import */ var _axis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./axis */ \"./src/option/axis/axis.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\nconst CategoryAxis = props => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_axis__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _extends({\n    type: \"category\"\n  }, props));\n};\n\n//# sourceURL=webpack://essenza/./src/option/axis/CategoryAxis.js?");

/***/ }),

/***/ "./src/option/axis/TimeAxis.js":
/*!*************************************!*\
  !*** ./src/option/axis/TimeAxis.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TimeAxis\": () => (/* binding */ TimeAxis)\n/* harmony export */ });\n/* harmony import */ var _axis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./axis */ \"./src/option/axis/axis.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\nconst TimeAxis = props => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_axis__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _extends({\n    type: \"time\"\n  }, props));\n};\n\n//# sourceURL=webpack://essenza/./src/option/axis/TimeAxis.js?");

/***/ }),

/***/ "./src/option/axis/ValueAxis.js":
/*!**************************************!*\
  !*** ./src/option/axis/ValueAxis.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ValueAxis\": () => (/* binding */ ValueAxis)\n/* harmony export */ });\n/* harmony import */ var _axis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./axis */ \"./src/option/axis/axis.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\nconst ValueAxis = props => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_axis__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _extends({\n    type: \"value\"\n  }, props));\n};\n\n//# sourceURL=webpack://essenza/./src/option/axis/ValueAxis.js?");

/***/ }),

/***/ "./src/option/axis/axis.js":
/*!*********************************!*\
  !*** ./src/option/axis/axis.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Axis\": () => (/* binding */ Axis),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nconst Axis = ({\n  axis,\n  ...rest\n}) => {\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {\n    if (axis) {\n      axis.push(rest);\n    }\n  }, [axis]);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Axis);\n\n//# sourceURL=webpack://essenza/./src/option/axis/axis.js?");

/***/ }),

/***/ "./src/option/axis/xAxis.js":
/*!**********************************!*\
  !*** ./src/option/axis/xAxis.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"XAxis\": () => (/* binding */ XAxis)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chartContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../chartContext */ \"./src/chartContext.js\");\n\n\nconst XAxis = ({\n  children,\n  ...rest\n}) => {\n  const chart = (0,_chartContext__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  const axis = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {\n    let z = null;\n    if (chart && chart.option) {\n      z = [];\n      chart.format(chart.option, \"xAxis\", z);\n    }\n    return z;\n  }, [chart]);\n  return children ? react__WEBPACK_IMPORTED_MODULE_0___default().Children.map(children, child => {\n    if (!child) return null;\n    console.log(\"ECHART-DEBUG-CHILDREN\", child);\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(child.type, {\n      ...{\n        ...child.props,\n        axis: axis\n      }\n    });\n  }) : null;\n};\n\n//# sourceURL=webpack://essenza/./src/option/axis/xAxis.js?");

/***/ }),

/***/ "./src/option/axis/yAxis.js":
/*!**********************************!*\
  !*** ./src/option/axis/yAxis.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"YAxis\": () => (/* binding */ YAxis)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chartContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../chartContext */ \"./src/chartContext.js\");\n\n\nconst YAxis = ({\n  direction,\n  children,\n  ...rest\n}) => {\n  const chart = (0,_chartContext__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  const yaxis = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {\n    let z = null;\n    if (chart && chart.option) {\n      z = [];\n      chart.format(chart.option, \"yAxis\", z);\n    }\n    return z;\n  }, [chart]);\n  return children ? react__WEBPACK_IMPORTED_MODULE_0___default().Children.map(children, child => {\n    if (!child) return null;\n    console.log(\"ECHART-DEBUG-CHILDREN\", child);\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(child.type, {\n      ...{\n        ...child.props,\n        axis: yaxis\n      }\n    });\n  }) : null;\n};\n\n//# sourceURL=webpack://essenza/./src/option/axis/yAxis.js?");

/***/ }),

/***/ "./src/option/feature/csv.js":
/*!***********************************!*\
  !*** ./src/option/feature/csv.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ExportCSV\": () => (/* binding */ ExportCSV)\n/* harmony export */ });\n/* harmony import */ var _chartContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../chartContext */ \"./src/chartContext.js\");\n/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feature */ \"./src/option/feature/feature.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\nconst ExportCSV = ({\n  icon,\n  ...rest\n}) => {\n  const chart = (0,_chartContext__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  rest.icon = icon || 'path://M18 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3zM6 5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z';\n  rest.onclick = function () {\n    const data = chart.instance?.getOption().dataset[0]?.source;\n    if (data) {\n      let csvContent = \"data:text/csv;charset=utf-8,\" + data.map(e => e.time + ',' + e.value).join(\"\\n\");\n      var encodedUri = encodeURI(csvContent);\n      window.open(encodedUri);\n    }\n\n    /* \r\n        var encodedUri = encodeURI(csvContent);\r\n        var link = document.createElement(\"a\");\r\n        link.setAttribute(\"href\", encodedUri);\r\n        link.setAttribute(\"download\", \"my_data.csv\");\r\n        document.body.appendChild(link); \r\n        link.click();\r\n    */\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_feature__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _extends({\n    name: \"myFeature\"\n  }, rest));\n};\n\n//# sourceURL=webpack://essenza/./src/option/feature/csv.js?");

/***/ }),

/***/ "./src/option/feature/feature.js":
/*!***************************************!*\
  !*** ./src/option/feature/feature.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nconst Feature = ({\n  feature,\n  name,\n  ...rest\n}) => {\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {\n    console.log(\"ECHART-DEBUG-SERIES\", feature, rest);\n    if (feature) {\n      feature[name] = rest;\n    }\n  }, [feature]);\n  return null;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Feature);\n\n//# sourceURL=webpack://essenza/./src/option/feature/feature.js?");

/***/ }),

/***/ "./src/option/feature/features.js":
/*!****************************************!*\
  !*** ./src/option/feature/features.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Features\": () => (/* binding */ Features)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chartContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../chartContext */ \"./src/chartContext.js\");\n\n\nconst Features = ({\n  children\n}) => {\n  const chart = (0,_chartContext__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  const option = chart.option;\n  const feature = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {\n    let f = null;\n    if (chart && option) {\n      f = {};\n      chart.format(option, \"toolbox\", {\n        feature: f\n      });\n    }\n    return f;\n  }, [chart, option]);\n  return react__WEBPACK_IMPORTED_MODULE_0___default().Children.map(children, child => {\n    if (!child) return null;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(child.type, {\n      ...{\n        ...child.props,\n        feature: feature\n      }\n    });\n  });\n};\n\n//# sourceURL=webpack://essenza/./src/option/feature/features.js?");

/***/ }),

/***/ "./src/option/feature/image.js":
/*!*************************************!*\
  !*** ./src/option/feature/image.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ExportImage\": () => (/* binding */ ExportImage)\n/* harmony export */ });\n/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feature */ \"./src/option/feature/feature.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\nconst ExportImage = props => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_feature__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _extends({\n    name: \"saveAsImage\"\n  }, props));\n};\n\n//# sourceURL=webpack://essenza/./src/option/feature/image.js?");

/***/ }),

/***/ "./src/option/legend.js":
/*!******************************!*\
  !*** ./src/option/legend.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Legend\": () => (/* binding */ Legend)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chartContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../chartContext */ \"./src/chartContext.js\");\n\n\nconst Legend = props => {\n  const chart = (0,_chartContext__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {\n    if (chart && chart.option) {\n      const update = chart.option.hasOwnProperty(\"legend\");\n      chart.format(chart.option, \"legend\", props);\n      if (props.data && chart.instance) {\n        chart.option.legend = {\n          ...props\n        };\n        chart.instance.setOption({\n          legend: {\n            data: props.data\n          }\n        });\n        //chart.refresh();\n      }\n    }\n  }, [chart, props.data]);\n  return null;\n};\n\n//export default Legend;\n\n//# sourceURL=webpack://essenza/./src/option/legend.js?");

/***/ }),

/***/ "./src/option/series/Bar.js":
/*!**********************************!*\
  !*** ./src/option/series/Bar.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Bar\": () => (/* binding */ Bar)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _serie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./serie */ \"./src/option/series/serie.js\");\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\nconst Bar = props => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_serie__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _extends({\n    type: \"bar\"\n  }, props));\n};\n\n//# sourceURL=webpack://essenza/./src/option/series/Bar.js?");

/***/ }),

/***/ "./src/option/series/Line.js":
/*!***********************************!*\
  !*** ./src/option/series/Line.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Line\": () => (/* binding */ Line)\n/* harmony export */ });\n/* harmony import */ var _serie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./serie */ \"./src/option/series/serie.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\nconst Line = props => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_serie__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _extends({\n    type: \"line\"\n  }, props));\n};\n\n//# sourceURL=webpack://essenza/./src/option/series/Line.js?");

/***/ }),

/***/ "./src/option/series/serie.js":
/*!************************************!*\
  !*** ./src/option/series/serie.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nconst Serie = ({\n  series,\n  chart,\n  ...rest\n}) => {\n  /*useEffect(()=>{\r\n      if(rest?.data){\r\n          chart.setOp\r\n      }\r\n  }, [rest?.data])*/\n\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {\n    console.log(\"ECHART-DEBUG-SERIES\", series, rest);\n    if (series) {\n      series.push(rest);\n    }\n  }, [series]);\n  return null;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Serie);\n\n//# sourceURL=webpack://essenza/./src/option/series/serie.js?");

/***/ }),

/***/ "./src/option/series/series.js":
/*!*************************************!*\
  !*** ./src/option/series/series.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Series\": () => (/* binding */ Series)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chartContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../chartContext */ \"./src/chartContext.js\");\n\n\nconst Series = ({\n  children\n}) => {\n  const chart = (0,_chartContext__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  const option = chart.option;\n  const series = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {\n    let s = null;\n    if (chart && option) {\n      s = [];\n      chart.format(option, \"series\", s);\n    }\n    return s;\n  }, [chart, option]);\n  return react__WEBPACK_IMPORTED_MODULE_0___default().Children.map(children, child => {\n    if (!child) return null;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(child.type, {\n      ...{\n        ...child.props,\n        series: series\n      }\n    });\n  });\n};\n\n//# sourceURL=webpack://essenza/./src/option/series/series.js?");

/***/ }),

/***/ "./src/option/title.js":
/*!*****************************!*\
  !*** ./src/option/title.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Title\": () => (/* binding */ Title)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chartContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../chartContext */ \"./src/chartContext.js\");\n\n\nconst Title = props => {\n  const chart = (0,_chartContext__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {\n    if (chart && chart.option) {\n      chart.format(chart.option, \"title\", props);\n    }\n  }, [chart]);\n  return null;\n};\n\n//# sourceURL=webpack://essenza/./src/option/title.js?");

/***/ }),

/***/ "./src/option/tooltip.js":
/*!*******************************!*\
  !*** ./src/option/tooltip.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Tooltip\": () => (/* binding */ Tooltip)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chartContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../chartContext */ \"./src/chartContext.js\");\n\n\nconst Tooltip = props => {\n  const chart = (0,_chartContext__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {\n    if (chart && chart.option) {\n      chart.format(chart.option, \"tooltip\", props);\n    }\n  }, [chart]);\n  return null;\n};\n\n//# sourceURL=webpack://essenza/./src/option/tooltip.js?");

/***/ }),

/***/ "./src/option/zoom/Inside.js":
/*!***********************************!*\
  !*** ./src/option/zoom/Inside.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ZoomInside\": () => (/* binding */ ZoomInside)\n/* harmony export */ });\n/* harmony import */ var _zoom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zoom */ \"./src/option/zoom/zoom.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\nconst ZoomInside = props => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_zoom__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _extends({\n    type: \"inside\"\n  }, props));\n};\n\n//# sourceURL=webpack://essenza/./src/option/zoom/Inside.js?");

/***/ }),

/***/ "./src/option/zoom/Slider.js":
/*!***********************************!*\
  !*** ./src/option/zoom/Slider.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ZoomSlider\": () => (/* binding */ ZoomSlider)\n/* harmony export */ });\n/* harmony import */ var _zoom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zoom */ \"./src/option/zoom/zoom.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\nconst ZoomSlider = props => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_zoom__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _extends({\n    type: \"slider\"\n  }, props));\n};\n\n//# sourceURL=webpack://essenza/./src/option/zoom/Slider.js?");

/***/ }),

/***/ "./src/option/zoom/dataZoom.js":
/*!*************************************!*\
  !*** ./src/option/zoom/dataZoom.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DataZoom\": () => (/* binding */ DataZoom)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chartContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../chartContext */ \"./src/chartContext.js\");\n\n\nconst DataZoom = ({\n  children\n}) => {\n  const chart = (0,_chartContext__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  const option = chart.option;\n  const zoom = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {\n    let z = null;\n    if (chart && option) {\n      z = [];\n      chart.format(option, \"dataZoom\", z);\n    }\n    return z;\n  }, [chart, option]);\n  return react__WEBPACK_IMPORTED_MODULE_0___default().Children.map(children, child => {\n    if (!child) return null;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(child.type, {\n      ...{\n        ...child.props,\n        zoom: zoom\n      }\n    });\n  });\n};\n\n//# sourceURL=webpack://essenza/./src/option/zoom/dataZoom.js?");

/***/ }),

/***/ "./src/option/zoom/zoom.js":
/*!*********************************!*\
  !*** ./src/option/zoom/zoom.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Zoom\": () => (/* binding */ Zoom),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nconst Zoom = ({\n  zoom,\n  ...rest\n}) => {\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {\n    if (zoom) {\n      zoom.push(rest);\n    }\n  }, [zoom]);\n  return null;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Zoom);\n\n//# sourceURL=webpack://essenza/./src/option/zoom/zoom.js?");

/***/ }),

/***/ "echarts":
/*!**************************!*\
  !*** external "echarts" ***!
  \**************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_echarts__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});