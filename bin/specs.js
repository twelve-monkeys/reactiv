/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="./jasmine.d.ts" />
	var jsx = __webpack_require__(1);
	var message = (function (_super) {
	    __extends(message, _super);
	    function message() {
	        _super.apply(this, arguments);
	    }
	    message.prototype.render = function () {
	        jsx.elementOpen("div", null, null, "style", { display: "inline", color: this.props.importance > 5 ? "red" : "gray" });
	        jsx.text(this.props.message);
	        jsx.elementClose();
	    };
	    return message;
	}(jsx.Component));
	var important = (function (_super) {
	    __extends(important, _super);
	    function important(props) {
	        _super.call(this, props);
	        this.setState({ tired: false });
	    }
	    important.prototype.render = function () {
	        jsx.elementVoid(message, null, null, "importance", this.props.importance, "message", this.state.tired ? "tired" : "ok");
	    };
	    return important;
	}(jsx.Component));
	var lc_methods = [];
	var lc_constructor = 0; // check
	var lc_componentWillMount = 0; // check
	var lc_componentDidMount = 0; // check
	var lc_componentWillReceiveProps = 0; // check
	var lc_shouldComponentUpdate = 0; // check
	var lc_componentWillUpdate = 0; // check
	var lc_componentDidUpdate = 0; // check
	var lc_componentWillUnmount = 0; // check
	var lc_render = 0; // check
	var freeze_message = false;
	var set_state_on_construct = undefined;
	var set_state_on_getState = undefined;
	var lifecycle = (function () {
	    function lifecycle() {
	        lc_methods.push("constructor");
	        lc_constructor++;
	        if (set_state_on_construct) {
	            this.state = set_state_on_construct;
	        }
	    }
	    lifecycle.prototype.getState = function () {
	        return set_state_on_getState || { frodo: 3 };
	    };
	    lifecycle.prototype.componentWillMount = function () {
	        lc_methods.push("componentWillMount");
	        lc_componentWillMount++;
	        // if (set_state_on_construct)
	        //     if (this.state !== set_state_on_construct)
	        //         throw new Error("state set when constructing should stay");
	    };
	    lifecycle.prototype.componentDidMount = function () {
	        lc_methods.push("componentDidMount");
	        lc_componentDidMount++;
	    };
	    lifecycle.prototype.componentWillReceiveProps = function (nextProps) {
	        lc_methods.push("componentWillReceiveProps");
	        lc_componentWillReceiveProps++;
	    };
	    lifecycle.prototype.shouldComponentUpdate = function (nextProps, nextState) {
	        lc_methods.push("shouldComponentUpdate");
	        lc_shouldComponentUpdate++;
	        return !freeze_message;
	    };
	    lifecycle.prototype.componentWillUpdate = function (nextProps, nextState) {
	        lc_methods.push("componentWillUpdate");
	        lc_componentWillUpdate++;
	    };
	    lifecycle.prototype.componentDidUpdate = function (prevProps, prevState) {
	        lc_methods.push("componentDidUpdate");
	        lc_componentDidUpdate++;
	    };
	    lifecycle.prototype.componentWillUnmount = function () {
	        lc_methods.push("componentWillUnmount");
	        lc_componentWillUnmount++;
	    };
	    lifecycle.prototype.render = function () {
	        lc_methods.push("render");
	        lc_render++;
	        jsx.elementVoid("div", null, null, "frozen", freeze_message ? "yes" : "no");
	    };
	    return lifecycle;
	}());
	function simulateClick(element) {
	    var simulateDivClick = document.createEvent('MouseEvents');
	    simulateDivClick.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, null, null);
	    return element.dispatchEvent(simulateDivClick);
	}
	describe("a patch", function () {
	    var node;
	    var starting_html;
	    var original_properties_of = [];
	    var get_properties = function (container) { return Object.getOwnPropertyNames(container); };
	    beforeEach(function (done) {
	        starting_html = document.body.innerHTML;
	        node = document.createElement("div");
	        document.body.appendChild(node);
	        setTimeout(function () {
	            var conserve_properties_of = [window, document, document.body];
	            original_properties_of = conserve_properties_of.map(function (container) { return get_properties(container); });
	            lc_methods = [];
	            lc_constructor = 0;
	            lc_componentWillMount = 0;
	            lc_componentDidMount = 0;
	            lc_componentWillReceiveProps = 0;
	            lc_shouldComponentUpdate = 0;
	            lc_componentWillUpdate = 0;
	            lc_componentDidUpdate = 0;
	            lc_componentWillUnmount = 0;
	            lc_render = 0;
	            freeze_message = false;
	            done();
	        });
	    });
	    afterEach(function () {
	        document.body.removeChild(node);
	        expect(document.body.innerHTML.trim()).toBe(starting_html.trim());
	        var conserve_properties_of = [window, document, document.body];
	        var new_properties_of = conserve_properties_of.map(function (container) { return get_properties(container); });
	        expect(new_properties_of).toEqual(original_properties_of);
	    });
	    it("does nothing if nothing is rendered", function () {
	        jsx.patch(node, function () { return null; });
	        expect(node.outerHTML).toBe("<div></div>");
	        node.setAttribute("data-id", "3");
	        node.innerHTML = "somestuff";
	        jsx.patch(node, function () { return null; });
	        expect(node.outerHTML).toBe('<div data-id="3">somestuff</div>');
	    });
	    it("can use elementVoid to insert a div", function () {
	        jsx.patch(node, function () {
	            jsx.elementVoid("div");
	        });
	        expect(node.outerHTML).toBe("<div><div></div></div>");
	    });
	    it("will remove something", function () {
	        jsx.patch(node, function () {
	            jsx.elementOpen("span", null, null);
	            jsx.elementClose();
	        });
	        expect(node.outerHTML).toBe("<div><span></span></div>");
	        jsx.patch(node, function () { return null; });
	        expect(node.outerHTML).toBe("<div></div>");
	    });
	    it("can replace and add things", function () {
	        jsx.patch(node, function () {
	            jsx.elementOpen("div", null, null);
	            jsx.elementClose();
	        });
	        jsx.patch(node, function () {
	            jsx.elementOpen("div", null, null);
	            jsx.elementClose();
	            jsx.elementOpen("div", null, null);
	            jsx.elementClose();
	        });
	        expect(node.outerHTML).toBe("<div><div></div><div></div></div>");
	    });
	    it("doesn't re-add the same div", function () {
	        var fn = function () {
	            return jsx.patch(node, function () {
	                jsx.elementOpen("div", null, null);
	                jsx.elementClose();
	            });
	        };
	        for (var i = 0; i < 3; i++) {
	            fn();
	            expect(node.outerHTML).toBe("<div><div></div></div>");
	        }
	    });
	    it("handles attributes", function () {
	        jsx.patch(node, function () {
	            jsx.elementOpen("div", null, null, 'id', 'the_id', "style", { color: 'red' });
	            jsx.elementClose();
	        });
	        expect(node.outerHTML).toBe('<div><div id="the_id" style="color: red;"></div></div>');
	    });
	    it("mutates attributes", function () {
	        var style = { color: 'red' };
	        jsx.patch(node, function () {
	            jsx.elementOpen("div", null, null, 'id', 'the_id', "style", style);
	            jsx.elementClose();
	        });
	        expect(node.outerHTML).toBe('<div><div id="the_id" style="color: red;"></div></div>');
	        style.color = "blue";
	        jsx.patch(node, function () {
	            jsx.elementOpen("div", null, null, 'id', 'the_id', "style", style);
	            jsx.elementClose();
	        });
	        style.backgroundColor = "red";
	        delete style.color;
	        jsx.patch(node, function () {
	            jsx.elementOpen("div", null, null, 'id', 'the_id', "style", style);
	            jsx.elementClose();
	        });
	        expect(node.outerHTML).toBe('<div><div id="the_id" style="background-color: red;"></div></div>');
	    });
	    it("adds attributes", function () {
	        jsx.patch(node, function () {
	            jsx.elementOpen("div", null, null, 'id', 'the_id');
	            jsx.elementClose();
	        });
	        expect(node.outerHTML).toBe('<div><div id="the_id"></div></div>');
	        jsx.patch(node, function () {
	            jsx.elementOpen("div", null, null, 'id', 'the_id', "name", "fred");
	            jsx.elementClose();
	        });
	        expect(node.outerHTML).toBe('<div><div id="the_id" name="fred"></div></div>');
	    });
	    it("removes attributes", function () {
	        jsx.patch(node, function () {
	            jsx.elementOpen("div", null, null, 'id', 'the_id', "name", "fred");
	            jsx.elementClose();
	        });
	        expect(node.outerHTML).toBe('<div><div id="the_id" name="fred"></div></div>');
	        jsx.patch(node, function () {
	            jsx.elementVoid("div", null, null, 'id', 'the_id');
	        });
	        expect(node.outerHTML).toBe('<div><div id="the_id"></div></div>');
	        jsx.patch(node, function () {
	            jsx.elementVoid("div", null, ['id', 'the_id', 'frodo', '121'], 'data-frame', 'anterior');
	        });
	        expect(node.outerHTML).toBe('<div><div id="the_id" frodo="121" data-frame="anterior"></div></div>');
	    });
	    it("deals with a component", function () {
	        jsx.patch(node, function () {
	            jsx.elementVoid(lifecycle);
	        });
	        expect(node.outerHTML).toBe('<div><div frozen="no"></div></div>');
	    });
	    describe("with state set in the constructor", function () {
	        beforeEach(function () {
	            set_state_on_construct = { frodo: true };
	        });
	        afterEach(function () {
	            set_state_on_construct = undefined;
	        });
	        it("doesn't call getState", function () {
	            jsx.patch(node, function () {
	                jsx.elementVoid(lifecycle);
	            });
	            var vnode = node["__reactiv_view_node"].kids[0];
	            expect(vnode.component.state.frodo).toBe(true);
	        });
	    });
	    describe("with state not set in the constructor", function () {
	        beforeEach(function () {
	            set_state_on_getState = { frodo: true };
	        });
	        afterEach(function () {
	            set_state_on_getState = undefined;
	        });
	        it("calls getState", function () {
	            jsx.patch(node, function () {
	                jsx.elementVoid(lifecycle);
	            });
	            var vnode = node["__reactiv_view_node"].kids[0];
	            expect(vnode.component.state.frodo).toBe(true);
	        });
	    });
	    it("adds event handlers", function () {
	        var prevent_click_default = false;
	        var count = 0;
	        var test_click = function (event) {
	            count++;
	            if (prevent_click_default)
	                event.preventDefault();
	        };
	        jsx.patch(node, function () {
	            jsx.elementVoid("div", null, ["onClick", test_click]);
	        });
	        expect(node.outerHTML).toBe('<div><div></div></div>');
	        var cancelled = !simulateClick(node.children[0]);
	        expect(cancelled).toBe(false);
	        expect(count).toBe(1);
	        prevent_click_default = true;
	        cancelled = !simulateClick(node.children[0]);
	        expect(cancelled).toBe(true);
	        expect(count).toBe(2);
	        jsx.patch(node, function () {
	            jsx.elementVoid("div", null, ["onClick", test_click]);
	        });
	        prevent_click_default = false;
	        cancelled = !simulateClick(node.children[0]);
	        expect(cancelled).toBe(false);
	        expect(count).toBe(3);
	    });
	    it("removes event handlers", function () {
	        var prevent_click_default = false;
	        var count = 0;
	        var test_click = function (event) {
	            count++;
	            if (prevent_click_default)
	                event.preventDefault();
	        };
	        jsx.patch(node, function () {
	            jsx.elementVoid("div", null, ["onClick", test_click]);
	        });
	        expect(node.outerHTML).toBe('<div><div></div></div>');
	        var cancelled = !simulateClick(node.children[0]);
	        expect(cancelled).toBe(false);
	        expect(count).toBe(1);
	        prevent_click_default = true;
	        cancelled = !simulateClick(node.children[0]);
	        expect(cancelled).toBe(true);
	        expect(count).toBe(2);
	        jsx.patch(node, function () {
	            jsx.elementVoid("div", null, null);
	        });
	        cancelled = !simulateClick(node.children[0]);
	        expect(cancelled).toBe(false);
	        expect(count).toBe(2);
	    });
	    it("changes event handlers", function () {
	        var count = 0;
	        var test_click = function (event) {
	            count++;
	        };
	        var test_click2 = function (event) {
	            count += 100;
	            event.preventDefault();
	        };
	        jsx.patch(node, function () {
	            jsx.elementVoid("div", null, ["onClick", test_click]);
	        });
	        expect(node.outerHTML).toBe('<div><div></div></div>');
	        var cancelled = !simulateClick(node.children[0]);
	        expect(cancelled).toBe(false);
	        expect(count).toBe(1);
	        jsx.patch(node, function () {
	            jsx.elementVoid("div", null, ["onClick", test_click2]);
	        });
	        cancelled = !simulateClick(node.children[0]);
	        expect(cancelled).toBe(true);
	        expect(count).toBe(101);
	    });
	    it("allows elements to mutate themselves", function () {
	        jsx.patch(node, function () { return jsx.elementVoid("div"); });
	        node.children[0].innerHTML = "dynamic";
	        jsx.patch(node, function () { return jsx.elementVoid("div"); });
	        expect(node.outerHTML).toBe('<div><div>dynamic</div></div>');
	    });
	    it("constructs components appropriately", function () {
	        jsx.patch(node, function () { return jsx.elementVoid(lifecycle); });
	        expect(lc_constructor).toBe(1);
	        jsx.patch(node, function () { return jsx.elementVoid(lifecycle); });
	        expect(lc_constructor).toBe(1);
	        jsx.patch(node, function () { return null; });
	        expect(lc_constructor).toBe(1);
	        jsx.patch(node, function () { return jsx.elementVoid(lifecycle); });
	        expect(lc_constructor).toBe(2);
	    });
	    it("calls componentWillMount appropriately", function () {
	        jsx.patch(node, function () { return jsx.elementVoid(lifecycle); });
	        expect(lc_componentWillMount).toBe(1);
	        jsx.patch(node, function () { return jsx.elementVoid(lifecycle); });
	        expect(lc_componentWillMount).toBe(1);
	    });
	    it("calls componentDidMount appropriately", function () {
	        jsx.patch(node, function () { return jsx.elementVoid(lifecycle); });
	        expect(lc_componentDidMount).toBe(1);
	        jsx.patch(node, function () { return jsx.elementVoid(lifecycle); });
	        expect(lc_componentDidMount).toBe(1);
	    });
	    it("calls componentWillUnmount appropriately", function () {
	        jsx.patch(node, function () { return jsx.elementVoid(lifecycle); });
	        expect(lc_componentWillUnmount).toBe(0);
	        jsx.patch(node, function () { return jsx.elementVoid(lifecycle); });
	        expect(lc_componentWillUnmount).toBe(0);
	        jsx.patch(node, function () { return null; });
	        expect(lc_componentWillUnmount).toBe(1);
	    });
	    it("calls componentWillUpdate appropriately", function () {
	        jsx.patch(node, function () { return jsx.elementVoid(lifecycle, undefined, undefined, "data-index", "1"); });
	        expect(lc_componentWillUpdate).toBe(0);
	        jsx.patch(node, function () { return jsx.elementVoid(lifecycle); });
	        expect(lc_componentWillUpdate).toBe(1);
	        jsx.patch(node, function () { return null; });
	        expect(lc_componentWillUpdate).toBe(1);
	    });
	    it("calls componentDidUpdate appropriately", function () {
	        jsx.patch(node, function () { return jsx.elementVoid(lifecycle); });
	        expect(lc_componentDidUpdate).toBe(0);
	        jsx.patch(node, function () { return jsx.elementVoid(lifecycle); });
	        expect(lc_componentDidUpdate).toBe(1);
	        jsx.patch(node, function () { return null; });
	        expect(lc_componentDidUpdate).toBe(1);
	    });
	    it("calls shouldComponentUpdate appropriately", function () {
	        jsx.patch(node, function () { return jsx.elementVoid(lifecycle); });
	        expect(lc_shouldComponentUpdate).toBe(0);
	        jsx.patch(node, function () { return jsx.elementVoid(lifecycle); });
	        expect(lc_shouldComponentUpdate).toBe(1);
	        jsx.patch(node, function () { return null; });
	        expect(lc_shouldComponentUpdate).toBe(1);
	    });
	    it("calls mounting lifecycle methods in the correct order", function () {
	        jsx.patch(node, function () { return jsx.elementVoid(lifecycle); });
	        expect(lc_methods.join(" => ")).toBe("constructor => componentWillMount => render => componentDidMount");
	    });
	    it("calls re-render lifecycle methods in the correct order", function () {
	        jsx.patch(node, function () { return jsx.elementVoid(lifecycle); });
	        lc_methods = [];
	        jsx.patch(node, function () { return jsx.elementVoid(lifecycle); });
	        expect(lc_methods.join(" => ")).toBe("componentWillReceiveProps => shouldComponentUpdate => componentWillUpdate => render => componentDidUpdate");
	    });
	    it("respects shouldComponentUpdate", function () {
	        jsx.patch(node, function () { return jsx.elementVoid(lifecycle); });
	        lc_methods = [];
	        freeze_message = true;
	        jsx.patch(node, function () { return jsx.elementVoid(lifecycle); });
	        expect(lc_methods.join(" => ")).toBe("componentWillReceiveProps => shouldComponentUpdate");
	        expect(node.outerHTML).toBe('<div><div frozen="no"></div></div>');
	    });
	    it("calls unmounting lifecycle methods in the correct order", function () {
	        jsx.patch(node, function () { return jsx.elementVoid(lifecycle); });
	        lc_methods = [];
	        jsx.patch(node, function () { return null; });
	        expect(lc_methods.join(" => ")).toBe("componentWillUnmount");
	    });
	    it("unmounts components", function () {
	        jsx.patch(node, function () {
	            jsx.elementVoid(lifecycle, null, null, null);
	        });
	        expect(node.outerHTML).toBe('<div><div frozen="no"></div></div>');
	        expect(lc_componentWillMount).toBe(1);
	        expect(lc_componentDidMount).toBe(1);
	        jsx.patch(node, function () {
	            jsx.elementVoid("div", null, null, null);
	        });
	        expect(node.outerHTML).toBe('<div><div></div></div>');
	        expect(lc_componentWillMount).toBe(1);
	        expect(lc_componentDidMount).toBe(1);
	        expect(lc_componentWillUnmount).toBe(1);
	    });
	    it("recognises nested components", function () {
	        var start = new Date().getTime();
	        jsx.patch(node, function () {
	            jsx.elementVoid(important, null, null, "importance", 7, "name", "bond, jimmy-bob melon-field bond");
	        });
	        expect(node.outerHTML).toBe('<div><div style="display: inline; color: red;">ok</div></div>');
	    });
	    it("is fast", function () {
	        var start = new Date().getTime();
	        var iterations = 10000;
	        var i = 0;
	        while (i < iterations) {
	            jsx.patch(node, function () {
	                return jsx.elementVoid(important, null, null, "importance", (i++) % 10, "name", "bond, jimmy-bob " + (i % 2 ? "melon-field" : "princess") + " bond");
	            });
	        }
	        var duration = new Date().getTime() - start;
	        console.log("benchmark: " + iterations + " took " + duration + " ms = " + (Math.ceil(duration / iterations * 10000) / 10) + " us per");
	        expect(duration).toBeLessThan(2500);
	    });
	    it("deals with keys", function () {
	        jsx.patch(node, function () {
	            jsx.elementVoid("div", "1", null, "id", "iamme");
	        });
	        expect(node.outerHTML).toBe('<div><div id="iamme"></div></div>');
	        node.children.item(0).setAttribute("data-added", "item changed outside of renderer");
	        jsx.patch(node, function () {
	            jsx.elementVoid("div", "1", null, "id", "iamstillme");
	        });
	        expect(node.outerHTML).toBe('<div><div id="iamstillme" data-added="item changed outside of renderer"></div></div>');
	    });
	});
	describe("a render into text", function () {
	    it("should not crash", function () {
	        jsx.patch(null, function () {
	            jsx.elementVoid("div", "1", null, "id", "iamme");
	        });
	    });
	    it("should return a div", function () {
	        var result = jsx.patch(null, function () {
	            jsx.elementVoid("div");
	        });
	        expect(result).toBe("<div></div>");
	    });
	    it("should return a div with an id", function () {
	        var result = jsx.patch(null, function () {
	            jsx.elementVoid("div", null, ["id", "uno"]);
	        });
	        expect(result).toBe("<div id=\"uno\"></div>");
	    });
	    it("should return a div with a component", function () {
	        var result = jsx.patch(null, function () {
	            jsx.elementVoid(important, null, null, "importance", 7, "name", "bond, jimmy-bob melon-field bond");
	        });
	        var element = document.createElement("div");
	        var result2 = jsx.patch(element, function () {
	            jsx.elementVoid(important, null, null, "importance", 7, "name", "bond, jimmy-bob melon-field bond");
	        });
	        expect(result).toBe(element.innerHTML);
	    });
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	exports.version = 0.1;
	var root;
	var just_patched;
	var patching;
	var patch_next;
	var Component = (function () {
	    function Component(props) {
	        this.props = props;
	        this; // ninja implements without needing to export
	    }
	    Component.prototype.componentWillMount = function (props, state) { };
	    ;
	    Component.prototype.componentDidMount = function (props, state) { };
	    ;
	    Component.prototype.componentWillUnmount = function (props, state) { };
	    ;
	    Component.prototype.shouldComponentUpdate = function (next_props, next_state) { return true; };
	    Component.prototype.componentWillReceiveProps = function (next_props, next_state) { };
	    ;
	    Component.prototype.render = function () { };
	    ;
	    Component.prototype.getState = function () {
	        return this.state;
	    };
	    Component.prototype.setState = function (state) {
	        this.state = state;
	    };
	    return Component;
	}());
	exports.Component = Component;
	var html = "";
	function patch(element, fn) {
	    var node = (element ? element.__reactiv_view_node : null);
	    if (!node && element)
	        element.__reactiv_view_node = node = {
	            parent: null,
	            tag: element.nodeName.toLowerCase(),
	            node: element,
	            key: null,
	            attrs: {},
	            kids: []
	        };
	    just_patched = null;
	    patching = null;
	    patch_next = node;
	    root = node;
	    html = null;
	    if (!element) {
	        html = "";
	        fn();
	        return html;
	    }
	    elementOpen(element.nodeName, null, null);
	    fn();
	    elementClose();
	}
	exports.patch = patch;
	var closingHtml = [];
	function elementVoid(tag, key, statics, a1, a2, a3, a4, a5, a6) {
	    elementOpen.apply(null, arguments);
	    elementClose.apply(null, arguments);
	}
	exports.elementVoid = elementVoid;
	function text(value, formatters) {
	    if (!root) {
	        html += value;
	        return;
	    }
	    var node = _elementOpen("#text", null, null);
	    if (node.text !== value) {
	        var formatted = node.text = value;
	        for (var i = 1; i < arguments.length; i++) {
	            var formatter = arguments[i];
	            if (formatter)
	                formatted = formatter(formatted);
	        }
	        node.node.data = formatted;
	    }
	    elementClose();
	}
	exports.text = text;
	function elementOpen(tag, key, statics, n1, v1, n2, v2, n3, v3) {
	    _elementOpen.apply(null, arguments);
	}
	exports.elementOpen = elementOpen;
	function sync_arg(node, name, value) {
	    if (value === null || value === undefined)
	        return false;
	    var existing_value = patching.attrs[name];
	    switch (name) {
	        case "style":
	            if (!root) {
	                html += " style=\"";
	                var first = true;
	                for (var key in value)
	                    if (value.hasOwnProperty(key)) {
	                        if (!first)
	                            html += " ";
	                        first = false;
	                        html += key + ": " + value[key] + ";";
	                    }
	                html += "\"";
	                break;
	            }
	            if (patching.component)
	                throw new Error("components don't have dom nodes, you cannot set styles directly on them");
	            if (typeof value === "string") {
	                node.style.cssText = value;
	                break;
	            }
	            var style = node.style;
	            var visited_style = {};
	            for (var prop in value) {
	                var prop_value = value[prop];
	                visited_style[prop] = true;
	                if (!existing_value || existing_value[prop] !== prop_value) {
	                    style[prop] = prop_value;
	                    (patching.attrs[name] = existing_value = existing_value || {})[prop] = prop_value;
	                }
	            }
	            for (var prop in existing_value)
	                if (!visited_style[prop]) {
	                    delete existing_value[prop];
	                    style[prop] = "";
	                }
	            break;
	        default:
	            if (existing_value !== value)
	                patching.attrs[name] = value;
	            if (name === "className")
	                name = "class";
	            if (["object", "function"].indexOf(typeof value) !== -1) {
	                if (name.slice(0, 2) === "on" && typeof value === "function")
	                    (function (fn) {
	                        var event_name = name.slice(2).toLowerCase();
	                        if (existing_value !== fn)
	                            patching.node.removeEventListener(event_name, existing_value);
	                        patching.node.addEventListener(event_name, fn);
	                    })(value);
	            }
	            else if (!patching.component)
	                if (root)
	                    node.setAttribute(name, value);
	                else
	                    html += " " + name + "=\"" + value + "\"";
	            break;
	    }
	    return true;
	}
	;
	function _elementOpen(tag, key, statics, n1, v1, n2, v2, n3, v3) {
	    sync.apply(null, arguments);
	    //    if (patching.component)
	    //        return patching;
	    var visited = {};
	    var node = patching.node;
	    if (statics)
	        for (var i = 0; i < statics.length; i += 2)
	            if (sync_arg(node, statics[i], statics[i + 1]))
	                visited[statics[i]] = true;
	    if (root || typeof tag === "string")
	        for (var i = 3; i < arguments.length; i += 2)
	            if (sync_arg(node, arguments[i], arguments[i + 1]))
	                visited[arguments[i]] = true;
	    if (!root && typeof tag === "string")
	        html += ">";
	    for (var name_1 in patching.attrs)
	        if (!visited[name_1]) {
	            if (name_1.slice(0, 2) === "on" && typeof patching.attrs[name_1] === "function")
	                node.removeEventListener(name_1.slice(2).toLowerCase(), patching.attrs[name_1]);
	            else if (!patching.component)
	                if (root)
	                    patching.node.removeAttribute(name_1);
	            delete patching.attrs[name_1];
	        }
	    return patching;
	}
	function elementClose() {
	    if (!root) {
	        if (closingHtml.length)
	            html += closingHtml.pop();
	        return;
	    }
	    if (patching) {
	        var kids = patching.kids;
	        while (true) {
	            var child = kids[kids.length - 1];
	            if (!child || child === just_patched)
	                break;
	            if (child.component && child.component.componentWillUnmount)
	                child.component.componentWillUnmount();
	            patching.node.removeChild(child.node);
	            kids.splice(kids.indexOf(child), 1);
	        }
	        for (var _i = 0, _a = kids.slice(); _i < _a.length; _i++) {
	            var child = _a[_i];
	            if (child.parent !== patching)
	                kids.splice(kids.indexOf(child), 1);
	        }
	    }
	    just_patched = patching;
	    patch_next = (patching && patching.parent) ? patching.parent.kids[patching.parent.kids.indexOf(patching) + 1] : undefined;
	    patching = patching ? patching.parent : null;
	}
	exports.elementClose = elementClose;
	function getProps(tag, key, statics, n1, v1, n2, v2, n3, v3) {
	    patching = patch_next;
	    patch_next = patching.kids[0];
	    var props = {};
	    if (statics)
	        for (var i = 0; i < statics.length; i += 2) {
	            var name_2 = statics[i];
	            var value = statics[i + 1];
	            if (value !== null && value !== undefined)
	                props[name_2] = value;
	        }
	    for (var i = 3; i < arguments.length; i += 2) {
	        var name_3 = arguments[i];
	        var value = arguments[i + 1];
	        if (value !== null && value !== undefined)
	            props[name_3] = value;
	    }
	    return props;
	}
	function call(node, fn) {
	    var args = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        args[_i - 2] = arguments[_i];
	    }
	    return fn && node && node.component && node.component[fn] ? node.component[fn].apply(patching.component, args) : undefined;
	}
	function renderComponent(is_new, next_props) {
	    if (is_new) {
	        call(patching, "render");
	        return;
	    }
	    patching.component.props = patching.component.props || {};
	    call(patching, "componentWillReceiveProps", next_props, patching.component.state);
	    patching.component.props = next_props;
	    if (call(patching, "shouldComponentUpdate", next_props) === false) {
	        just_patched = patch_next;
	        patch_next = patching.kids[patching.kids.indexOf(just_patched) + 1];
	        return;
	    }
	    call(patching, "componentWillUpdate", patching.component.props, patching.component.state);
	    call(patching, "render");
	    call(patching, "componentDidUpdate", patching.component.props, patching.component.state);
	}
	function sync(tag, key, statics, n1, v1, n2, v2, n3, v3) {
	    just_patched = null;
	    var reuse_vnode = patch_next && patch_next.key === key;
	    if (reuse_vnode)
	        if (typeof tag === "string")
	            reuse_vnode = patch_next.tag === tag || patch_next.tag === tag.toLowerCase();
	        else
	            reuse_vnode = patch_next.component && patch_next.component.constructor.name === tag.name;
	    var replacing_child;
	    var parent_node;
	    var kids = patching ? patching.kids : null;
	    if (reuse_vnode) {
	        var next_props_1 = getProps.apply(null, arguments);
	        if (patching.component)
	            renderComponent(!reuse_vnode, next_props_1);
	        return;
	    }
	    replacing_child = patch_next;
	    patch_next = key && patching ? kids.filter(function (c) { return c.key === key; })[0] : null;
	    var create_component = false;
	    if (!patch_next)
	        if (typeof tag === "function") {
	            patch_next = { parent: patching, node: null, tag: tag.name, key: key, attrs: {}, component: null, kids: [] };
	            create_component = true;
	        }
	        else {
	            if (!root) {
	                html += "<" + tag;
	                closingHtml.push("</" + tag + ">");
	            }
	            var doc = patching && patching.node ? patching.node.ownerDocument : document;
	            patch_next = { parent: patching, node: tag === "#text" ? doc.createTextNode("") : doc.createElement(tag), tag: tag.toLowerCase(), key: key, attrs: {}, kids: [] };
	        }
	    if (patching) {
	        kids.splice(replacing_child ? kids.indexOf(replacing_child) : kids.length, 0, patch_next);
	        parent_node = patching.node;
	    }
	    var next_props = getProps.apply(null, arguments);
	    if (create_component) {
	        var fn = tag.bind.apply(tag, [null].concat([]));
	        patching.component = new fn();
	        patching.component.props = next_props;
	        patching.component.state = patching.component.state || call(patching, "getState");
	        call(patching, "componentWillMount");
	    }
	    if (patching.component)
	        renderComponent(!reuse_vnode, next_props);
	    if (!reuse_vnode)
	        renderNode(parent_node, key, kids, replacing_child);
	}
	function renderNode(parent_node, key, kids, replacing_child) {
	    if (root) {
	        if (patching.component) {
	            if (!just_patched)
	                throw new Error("component didn't call any elements");
	            patching.node = just_patched.node;
	            patching.node.__reactiv_view_node = patching;
	        }
	        if (parent_node && patching.node) {
	            if (key)
	                kids.filter(function (c) { return c.key === key; }).forEach(function (c) { return c.node = patching.node; });
	            // If the node has a key, remove it from the DOM to prevent a large number of re-orders in the case that it moved far or was completely removed. Since we hold on to a reference through the keyMap, we can always add it back.
	            if (replacing_child && replacing_child.node && replacing_child.key)
	                parent_node.replaceChild(patching.node, replacing_child.node);
	            else
	                parent_node.insertBefore(patching.node, replacing_child ? replacing_child.node : null);
	        }
	    }
	    if (patching.component && patching.node)
	        call(patching, "componentDidMount");
	}


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmVhZjRiYTI1YjkwNTE5MDY0NjAiLCJ3ZWJwYWNrOi8vL3Rlc3RzL2FsbC5zcGVjLnRzIiwid2VicGFjazovLy9yZWFjdGl2LmVudHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdENBLHdDQUF1QztBQUN2QyxLQUFZLEdBQUcsdUJBQU0sQ0FBa0IsQ0FBQztBQWlCeEM7S0FBc0IsMkJBQWlDO0tBQXZEO1NBQXNCLDhCQUFpQztLQU12RCxDQUFDO0tBTEcsd0JBQU0sR0FBTjtTQUNJLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ3RILEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM3QixHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDdkIsQ0FBQztLQUNMLGNBQUM7QUFBRCxFQUFDLENBTnFCLEdBQUcsQ0FBQyxTQUFTLEdBTWxDO0FBV0Q7S0FBd0IsNkJBQTZDO0tBQ2pFLG1CQUFZLEtBQXFCO1NBQzdCLGtCQUFNLEtBQUssQ0FBQyxDQUFDO1NBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0tBQ3BDLENBQUM7S0FD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LENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEUsSUFBSTtpQkFDQSxXQUFXLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsZUFBZSxHQUFHLGVBQWUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDL0YsQ0FBQztLQUNELENBQUM7S0FDRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7U0FDcEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBQzVDLEVBQUMiLCJmaWxlIjoiNmVhZjRiYTI1YjkwNTE5MDY0NjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDZlYWY0YmEyNWI5MDUxOTA2NDYwXG4gKiovIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vamFzbWluZS5kLnRzXCIgLz5cclxuaW1wb3J0ICogYXMganN4IGZyb20gXCIuLi9yZWFjdGl2LmVudHJ5XCI7XHJcblxyXG4vLyBkZXNjcmliZShcImEgdGVzdFwiLCAoKSA9PiB7XHJcbi8vICAgICBpdChcImV4aXN0c1wiLCAoKSA9PiB7XHJcbiAgICAgICAgXHJcbi8vICAgICAgICAgZXhwZWN0KGpzeC52ZXJzaW9uKS50b0JlKDQyKTtcclxuLy8gICAgIH0pXHJcbi8vIH0pXHJcblxyXG5cclxuXHJcbmludGVyZmFjZSBtZXNzYWdlUHJvcHMge1xyXG4gICAgaW1wb3J0YW5jZTogbnVtYmVyO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG59XHJcblxyXG5cclxuY2xhc3MgbWVzc2FnZSBleHRlbmRzIGpzeC5Db21wb25lbnQ8bWVzc2FnZVByb3BzLCB2b2lkPiB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAganN4LmVsZW1lbnRPcGVuKFwiZGl2XCIsIG51bGwsIG51bGwsIFwic3R5bGVcIiwgeyBkaXNwbGF5OiBcImlubGluZVwiLCBjb2xvcjogdGhpcy5wcm9wcy5pbXBvcnRhbmNlID4gNSA/IFwicmVkXCIgOiBcImdyYXlcIiB9KTtcclxuICAgICAgICBqc3gudGV4dCh0aGlzLnByb3BzLm1lc3NhZ2UpO1xyXG4gICAgICAgIGpzeC5lbGVtZW50Q2xvc2UoKTtcclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIGltcG9ydGFudFByb3BzIHtcclxuICAgIGltcG9ydGFuY2U6IG51bWJlcjtcclxuICAgIG5hbWU6IHN0cmluZztcclxufVxyXG5cclxuaW50ZXJmYWNlIGltcG9ydGFudFN0YXRlIHtcclxuICAgIHRpcmVkOiBib29sZWFuO1xyXG59XHJcblxyXG5jbGFzcyBpbXBvcnRhbnQgZXh0ZW5kcyBqc3guQ29tcG9uZW50PGltcG9ydGFudFByb3BzLCBpbXBvcnRhbnRTdGF0ZT4ge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHM6IGltcG9ydGFudFByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB0aXJlZDogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAganN4LmVsZW1lbnRWb2lkKG1lc3NhZ2UgYXMgYW55LCBudWxsLCBudWxsLCBcImltcG9ydGFuY2VcIiwgdGhpcy5wcm9wcy5pbXBvcnRhbmNlLCBcIm1lc3NhZ2VcIiwgdGhpcy5zdGF0ZS50aXJlZCA/IFwidGlyZWRcIiA6IFwib2tcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCBsY19tZXRob2RzID0gW107XHJcbmxldCBsY19jb25zdHJ1Y3RvciA9IDA7IC8vIGNoZWNrXHJcbmxldCBsY19jb21wb25lbnRXaWxsTW91bnQgPSAwOyAvLyBjaGVja1xyXG5sZXQgbGNfY29tcG9uZW50RGlkTW91bnQgPSAwOyAvLyBjaGVja1xyXG5sZXQgbGNfY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IDA7IC8vIGNoZWNrXHJcbmxldCBsY19zaG91bGRDb21wb25lbnRVcGRhdGUgPSAwOyAvLyBjaGVja1xyXG5sZXQgbGNfY29tcG9uZW50V2lsbFVwZGF0ZSA9IDA7IC8vIGNoZWNrXHJcbmxldCBsY19jb21wb25lbnREaWRVcGRhdGUgPSAwOyAvLyBjaGVja1xyXG5sZXQgbGNfY29tcG9uZW50V2lsbFVubW91bnQgPSAwOyAvLyBjaGVja1xyXG5sZXQgbGNfcmVuZGVyID0gMDsvLyBjaGVja1xyXG5cclxubGV0IGZyZWV6ZV9tZXNzYWdlID0gZmFsc2U7XHJcbmxldCBzZXRfc3RhdGVfb25fY29uc3RydWN0ID0gdW5kZWZpbmVkO1xyXG5sZXQgc2V0X3N0YXRlX29uX2dldFN0YXRlID0gdW5kZWZpbmVkO1xyXG5jbGFzcyBsaWZlY3ljbGUge1xyXG4gICAgc3RhdGU6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBsY19tZXRob2RzLnB1c2goXCJjb25zdHJ1Y3RvclwiKTtcclxuICAgICAgICBsY19jb25zdHJ1Y3RvcisrO1xyXG4gICAgICAgIGlmIChzZXRfc3RhdGVfb25fY29uc3RydWN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBzZXRfc3RhdGVfb25fY29uc3RydWN0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gc2V0X3N0YXRlX29uX2dldFN0YXRlIHx8IHtmcm9kbzozfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgbGNfbWV0aG9kcy5wdXNoKFwiY29tcG9uZW50V2lsbE1vdW50XCIpO1xyXG4gICAgICAgIGxjX2NvbXBvbmVudFdpbGxNb3VudCsrO1xyXG4gICAgICAgIC8vIGlmIChzZXRfc3RhdGVfb25fY29uc3RydWN0KVxyXG4gICAgICAgIC8vICAgICBpZiAodGhpcy5zdGF0ZSAhPT0gc2V0X3N0YXRlX29uX2NvbnN0cnVjdClcclxuICAgICAgICAvLyAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInN0YXRlIHNldCB3aGVuIGNvbnN0cnVjdGluZyBzaG91bGQgc3RheVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBsY19tZXRob2RzLnB1c2goXCJjb21wb25lbnREaWRNb3VudFwiKTtcclxuICAgICAgICBsY19jb21wb25lbnREaWRNb3VudCsrO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICAgICAgbGNfbWV0aG9kcy5wdXNoKFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiKTtcclxuICAgICAgICBsY19jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKys7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICAgICAgbGNfbWV0aG9kcy5wdXNoKFwic2hvdWxkQ29tcG9uZW50VXBkYXRlXCIpO1xyXG4gICAgICAgIGxjX3Nob3VsZENvbXBvbmVudFVwZGF0ZSsrO1xyXG4gICAgICAgIHJldHVybiAhZnJlZXplX21lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgICAgIGxjX21ldGhvZHMucHVzaChcImNvbXBvbmVudFdpbGxVcGRhdGVcIik7XHJcbiAgICAgICAgbGNfY29tcG9uZW50V2lsbFVwZGF0ZSsrO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xyXG4gICAgICAgIGxjX21ldGhvZHMucHVzaChcImNvbXBvbmVudERpZFVwZGF0ZVwiKTtcclxuICAgICAgICBsY19jb21wb25lbnREaWRVcGRhdGUrKztcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBsY19tZXRob2RzLnB1c2goXCJjb21wb25lbnRXaWxsVW5tb3VudFwiKTtcclxuICAgICAgICBsY19jb21wb25lbnRXaWxsVW5tb3VudCsrO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsY19tZXRob2RzLnB1c2goXCJyZW5kZXJcIik7XHJcbiAgICAgICAgbGNfcmVuZGVyKys7XHJcbiAgICAgICAganN4LmVsZW1lbnRWb2lkKFwiZGl2XCIsIG51bGwsIG51bGwsIFwiZnJvemVuXCIsIGZyZWV6ZV9tZXNzYWdlID8gXCJ5ZXNcIiA6IFwibm9cIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNpbXVsYXRlQ2xpY2soZWxlbWVudDogRWxlbWVudCkge1xyXG4gICAgbGV0IHNpbXVsYXRlRGl2Q2xpY2sgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKTtcclxuICAgIHNpbXVsYXRlRGl2Q2xpY2suaW5pdE1vdXNlRXZlbnQoJ2NsaWNrJywgdHJ1ZSwgdHJ1ZSwgZG9jdW1lbnQuZGVmYXVsdFZpZXcsIDAsIDAsIDAsIDAsIDAsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBudWxsLCBudWxsKTtcclxuICAgIHJldHVybiBlbGVtZW50LmRpc3BhdGNoRXZlbnQoc2ltdWxhdGVEaXZDbGljayk7XHJcbn1cclxuXHJcbmRlc2NyaWJlKFwiYSBwYXRjaFwiLCAoKSA9PiB7XHJcbiAgICBsZXQgbm9kZTogSFRNTEVsZW1lbnQ7XHJcbiAgICBsZXQgc3RhcnRpbmdfaHRtbDogc3RyaW5nO1xyXG5cclxuICAgIGxldCBvcmlnaW5hbF9wcm9wZXJ0aWVzX29mID0gW107XHJcblxyXG4gICAgbGV0IGdldF9wcm9wZXJ0aWVzID0gKGNvbnRhaW5lcikgPT4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY29udGFpbmVyKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKChkb25lKSA9PiB7XHJcbiAgICAgICAgc3RhcnRpbmdfaHRtbCA9IGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MO1xyXG4gICAgICAgIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb25zZXJ2ZV9wcm9wZXJ0aWVzX29mID0gW3dpbmRvdywgZG9jdW1lbnQsIGRvY3VtZW50LmJvZHldO1xyXG4gICAgICAgICAgICBvcmlnaW5hbF9wcm9wZXJ0aWVzX29mID0gY29uc2VydmVfcHJvcGVydGllc19vZi5tYXAoY29udGFpbmVyID0+IGdldF9wcm9wZXJ0aWVzKGNvbnRhaW5lcikpXHJcblxyXG4gICAgICAgICAgICBsY19tZXRob2RzID0gW107XHJcbiAgICAgICAgICAgIGxjX2NvbnN0cnVjdG9yID0gMDtcclxuICAgICAgICAgICAgbGNfY29tcG9uZW50V2lsbE1vdW50ID0gMDtcclxuICAgICAgICAgICAgbGNfY29tcG9uZW50RGlkTW91bnQgPSAwO1xyXG4gICAgICAgICAgICBsY19jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gMDtcclxuICAgICAgICAgICAgbGNfc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gMDtcclxuICAgICAgICAgICAgbGNfY29tcG9uZW50V2lsbFVwZGF0ZSA9IDA7XHJcbiAgICAgICAgICAgIGxjX2NvbXBvbmVudERpZFVwZGF0ZSA9IDA7XHJcbiAgICAgICAgICAgIGxjX2NvbXBvbmVudFdpbGxVbm1vdW50ID0gMDtcclxuICAgICAgICAgICAgbGNfcmVuZGVyID0gMDtcclxuICAgICAgICAgICAgZnJlZXplX21lc3NhZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgZG9uZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKG5vZGUpO1xyXG4gICAgICAgIGV4cGVjdChkb2N1bWVudC5ib2R5LmlubmVySFRNTC50cmltKCkpLnRvQmUoc3RhcnRpbmdfaHRtbC50cmltKCkpO1xyXG5cclxuICAgICAgICBsZXQgY29uc2VydmVfcHJvcGVydGllc19vZiA9IFt3aW5kb3csIGRvY3VtZW50LCBkb2N1bWVudC5ib2R5XTtcclxuICAgICAgICBsZXQgbmV3X3Byb3BlcnRpZXNfb2YgPSBjb25zZXJ2ZV9wcm9wZXJ0aWVzX29mLm1hcChjb250YWluZXIgPT4gZ2V0X3Byb3BlcnRpZXMoY29udGFpbmVyKSlcclxuXHJcbiAgICAgICAgZXhwZWN0KG5ld19wcm9wZXJ0aWVzX29mKS50b0VxdWFsKG9yaWdpbmFsX3Byb3BlcnRpZXNfb2YpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJkb2VzIG5vdGhpbmcgaWYgbm90aGluZyBpcyByZW5kZXJlZFwiLCAoKSA9PiB7XHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IG51bGwpO1xyXG4gICAgICAgIGV4cGVjdChub2RlLm91dGVySFRNTCkudG9CZShcIjxkaXY+PC9kaXY+XCIpO1xyXG5cclxuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgXCIzXCIpO1xyXG4gICAgICAgIG5vZGUuaW5uZXJIVE1MID0gXCJzb21lc3R1ZmZcIjtcclxuXHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IG51bGwpO1xyXG4gICAgICAgIGV4cGVjdChub2RlLm91dGVySFRNTCkudG9CZSgnPGRpdiBkYXRhLWlkPVwiM1wiPnNvbWVzdHVmZjwvZGl2PicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJjYW4gdXNlIGVsZW1lbnRWb2lkIHRvIGluc2VydCBhIGRpdlwiLCAoKSA9PiB7XHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IHtcclxuICAgICAgICAgICAganN4LmVsZW1lbnRWb2lkKFwiZGl2XCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGV4cGVjdChub2RlLm91dGVySFRNTCkudG9CZShcIjxkaXY+PGRpdj48L2Rpdj48L2Rpdj5cIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcIndpbGwgcmVtb3ZlIHNvbWV0aGluZ1wiLCAoKSA9PiB7XHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IHtcclxuICAgICAgICAgICAganN4LmVsZW1lbnRPcGVuKFwic3BhblwiLCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAganN4LmVsZW1lbnRDbG9zZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGV4cGVjdChub2RlLm91dGVySFRNTCkudG9CZShcIjxkaXY+PHNwYW4+PC9zcGFuPjwvZGl2PlwiKTtcclxuXHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IG51bGwpO1xyXG5cclxuICAgICAgICBleHBlY3Qobm9kZS5vdXRlckhUTUwpLnRvQmUoXCI8ZGl2PjwvZGl2PlwiKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBpdChcImNhbiByZXBsYWNlIGFuZCBhZGQgdGhpbmdzXCIsICgpID0+IHtcclxuICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBqc3guZWxlbWVudE9wZW4oXCJkaXZcIiwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgIGpzeC5lbGVtZW50Q2xvc2UoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IHtcclxuICAgICAgICAgICAganN4LmVsZW1lbnRPcGVuKFwiZGl2XCIsIG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICBqc3guZWxlbWVudENsb3NlKCk7XHJcbiAgICAgICAgICAgIGpzeC5lbGVtZW50T3BlbihcImRpdlwiLCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAganN4LmVsZW1lbnRDbG9zZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBleHBlY3Qobm9kZS5vdXRlckhUTUwpLnRvQmUoXCI8ZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48L2Rpdj5cIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImRvZXNuJ3QgcmUtYWRkIHRoZSBzYW1lIGRpdlwiLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZm4gPSAoKSA9PlxyXG4gICAgICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAganN4LmVsZW1lbnRPcGVuKFwiZGl2XCIsIG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAganN4LmVsZW1lbnRDbG9zZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICAgICAgZXhwZWN0KG5vZGUub3V0ZXJIVE1MKS50b0JlKFwiPGRpdj48ZGl2PjwvZGl2PjwvZGl2PlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImhhbmRsZXMgYXR0cmlidXRlc1wiLCAoKSA9PiB7XHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IHtcclxuICAgICAgICAgICAganN4LmVsZW1lbnRPcGVuKFwiZGl2XCIsIG51bGwsIG51bGwsICdpZCcsICd0aGVfaWQnLCBcInN0eWxlXCIsIHsgY29sb3I6ICdyZWQnIH0pO1xyXG4gICAgICAgICAgICBqc3guZWxlbWVudENsb3NlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGV4cGVjdChub2RlLm91dGVySFRNTCkudG9CZSgnPGRpdj48ZGl2IGlkPVwidGhlX2lkXCIgc3R5bGU9XCJjb2xvcjogcmVkO1wiPjwvZGl2PjwvZGl2PicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJtdXRhdGVzIGF0dHJpYnV0ZXNcIiwgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlID0geyBjb2xvcjogJ3JlZCcgfSBhcyBhbnk7XHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IHtcclxuICAgICAgICAgICAganN4LmVsZW1lbnRPcGVuKFwiZGl2XCIsIG51bGwsIG51bGwsICdpZCcsICd0aGVfaWQnLCBcInN0eWxlXCIsIHN0eWxlKTtcclxuICAgICAgICAgICAganN4LmVsZW1lbnRDbG9zZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBleHBlY3Qobm9kZS5vdXRlckhUTUwpLnRvQmUoJzxkaXY+PGRpdiBpZD1cInRoZV9pZFwiIHN0eWxlPVwiY29sb3I6IHJlZDtcIj48L2Rpdj48L2Rpdj4nKTtcclxuXHJcbiAgICAgICAgc3R5bGUuY29sb3IgPSBcImJsdWVcIjtcclxuICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBqc3guZWxlbWVudE9wZW4oXCJkaXZcIiwgbnVsbCwgbnVsbCwgJ2lkJywgJ3RoZV9pZCcsIFwic3R5bGVcIiwgc3R5bGUpO1xyXG4gICAgICAgICAgICBqc3guZWxlbWVudENsb3NlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCI7XHJcbiAgICAgICAgZGVsZXRlIHN0eWxlLmNvbG9yO1xyXG5cclxuICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBqc3guZWxlbWVudE9wZW4oXCJkaXZcIiwgbnVsbCwgbnVsbCwgJ2lkJywgJ3RoZV9pZCcsIFwic3R5bGVcIiwgc3R5bGUpO1xyXG4gICAgICAgICAgICBqc3guZWxlbWVudENsb3NlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGV4cGVjdChub2RlLm91dGVySFRNTCkudG9CZSgnPGRpdj48ZGl2IGlkPVwidGhlX2lkXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XCI+PC9kaXY+PC9kaXY+Jyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImFkZHMgYXR0cmlidXRlc1wiLCAoKSA9PiB7XHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IHtcclxuICAgICAgICAgICAganN4LmVsZW1lbnRPcGVuKFwiZGl2XCIsIG51bGwsIG51bGwsICdpZCcsICd0aGVfaWQnKTtcclxuICAgICAgICAgICAganN4LmVsZW1lbnRDbG9zZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBleHBlY3Qobm9kZS5vdXRlckhUTUwpLnRvQmUoJzxkaXY+PGRpdiBpZD1cInRoZV9pZFwiPjwvZGl2PjwvZGl2PicpO1xyXG5cclxuICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBqc3guZWxlbWVudE9wZW4oXCJkaXZcIiwgbnVsbCwgbnVsbCwgJ2lkJywgJ3RoZV9pZCcsIFwibmFtZVwiLCBcImZyZWRcIik7XHJcbiAgICAgICAgICAgIGpzeC5lbGVtZW50Q2xvc2UoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZXhwZWN0KG5vZGUub3V0ZXJIVE1MKS50b0JlKCc8ZGl2PjxkaXYgaWQ9XCJ0aGVfaWRcIiBuYW1lPVwiZnJlZFwiPjwvZGl2PjwvZGl2PicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJyZW1vdmVzIGF0dHJpYnV0ZXNcIiwgKCkgPT4ge1xyXG4gICAgICAgIGpzeC5wYXRjaChub2RlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGpzeC5lbGVtZW50T3BlbihcImRpdlwiLCBudWxsLCBudWxsLCAnaWQnLCAndGhlX2lkJywgXCJuYW1lXCIsIFwiZnJlZFwiKTtcclxuICAgICAgICAgICAganN4LmVsZW1lbnRDbG9zZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBleHBlY3Qobm9kZS5vdXRlckhUTUwpLnRvQmUoJzxkaXY+PGRpdiBpZD1cInRoZV9pZFwiIG5hbWU9XCJmcmVkXCI+PC9kaXY+PC9kaXY+Jyk7XHJcblxyXG4gICAgICAgIGpzeC5wYXRjaChub2RlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGpzeC5lbGVtZW50Vm9pZChcImRpdlwiLCBudWxsLCBudWxsLCAnaWQnLCAndGhlX2lkJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGV4cGVjdChub2RlLm91dGVySFRNTCkudG9CZSgnPGRpdj48ZGl2IGlkPVwidGhlX2lkXCI+PC9kaXY+PC9kaXY+Jyk7XHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IHtcclxuICAgICAgICAgICAganN4LmVsZW1lbnRWb2lkKFwiZGl2XCIsIG51bGwsIFsnaWQnLCAndGhlX2lkJywgJ2Zyb2RvJywgJzEyMSddLCAnZGF0YS1mcmFtZScsICdhbnRlcmlvcicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBleHBlY3Qobm9kZS5vdXRlckhUTUwpLnRvQmUoJzxkaXY+PGRpdiBpZD1cInRoZV9pZFwiIGZyb2RvPVwiMTIxXCIgZGF0YS1mcmFtZT1cImFudGVyaW9yXCI+PC9kaXY+PC9kaXY+Jyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImRlYWxzIHdpdGggYSBjb21wb25lbnRcIiwgKCkgPT4ge1xyXG4gICAgICAgIGpzeC5wYXRjaChub2RlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGpzeC5lbGVtZW50Vm9pZChsaWZlY3ljbGUgYXMgYW55KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZXhwZWN0KG5vZGUub3V0ZXJIVE1MKS50b0JlKCc8ZGl2PjxkaXYgZnJvemVuPVwibm9cIj48L2Rpdj48L2Rpdj4nKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKFwid2l0aCBzdGF0ZSBzZXQgaW4gdGhlIGNvbnN0cnVjdG9yXCIsICgpID0+IHtcclxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgc2V0X3N0YXRlX29uX2NvbnN0cnVjdCA9IHtmcm9kbzp0cnVlfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBhZnRlckVhY2goKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXRfc3RhdGVfb25fY29uc3RydWN0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGl0KFwiZG9lc24ndCBjYWxsIGdldFN0YXRlXCIsICgpID0+IHtcclxuICAgICAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGpzeC5lbGVtZW50Vm9pZChsaWZlY3ljbGUgYXMgYW55KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCB2bm9kZSA9IG5vZGVbXCJfX3JlYWN0aXZfdmlld19ub2RlXCJdLmtpZHNbMF07XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGV4cGVjdCh2bm9kZS5jb21wb25lbnQuc3RhdGUuZnJvZG8pLnRvQmUodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgZGVzY3JpYmUoXCJ3aXRoIHN0YXRlIG5vdCBzZXQgaW4gdGhlIGNvbnN0cnVjdG9yXCIsICgpID0+IHtcclxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgc2V0X3N0YXRlX29uX2dldFN0YXRlID0ge2Zyb2RvOnRydWV9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGFmdGVyRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHNldF9zdGF0ZV9vbl9nZXRTdGF0ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBpdChcImNhbGxzIGdldFN0YXRlXCIsICgpID0+IHtcclxuICAgICAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGpzeC5lbGVtZW50Vm9pZChsaWZlY3ljbGUgYXMgYW55KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCB2bm9kZSA9IG5vZGVbXCJfX3JlYWN0aXZfdmlld19ub2RlXCJdLmtpZHNbMF07XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGV4cGVjdCh2bm9kZS5jb21wb25lbnQuc3RhdGUuZnJvZG8pLnRvQmUodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIFxyXG5cclxuICAgIGl0KFwiYWRkcyBldmVudCBoYW5kbGVyc1wiLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHByZXZlbnRfY2xpY2tfZGVmYXVsdCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcblxyXG4gICAgICAgIGNvbnN0IHRlc3RfY2xpY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgaWYgKHByZXZlbnRfY2xpY2tfZGVmYXVsdClcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBqc3guZWxlbWVudFZvaWQoXCJkaXZcIiwgbnVsbCwgW1wib25DbGlja1wiLCB0ZXN0X2NsaWNrXSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGV4cGVjdChub2RlLm91dGVySFRNTCkudG9CZSgnPGRpdj48ZGl2PjwvZGl2PjwvZGl2PicpO1xyXG5cclxuICAgICAgICBsZXQgY2FuY2VsbGVkID0gIXNpbXVsYXRlQ2xpY2sobm9kZS5jaGlsZHJlblswXSk7XHJcbiAgICAgICAgZXhwZWN0KGNhbmNlbGxlZCkudG9CZShmYWxzZSk7XHJcbiAgICAgICAgZXhwZWN0KGNvdW50KS50b0JlKDEpO1xyXG5cclxuICAgICAgICBwcmV2ZW50X2NsaWNrX2RlZmF1bHQgPSB0cnVlO1xyXG4gICAgICAgIGNhbmNlbGxlZCA9ICFzaW11bGF0ZUNsaWNrKG5vZGUuY2hpbGRyZW5bMF0pO1xyXG4gICAgICAgIGV4cGVjdChjYW5jZWxsZWQpLnRvQmUodHJ1ZSk7XHJcbiAgICAgICAgZXhwZWN0KGNvdW50KS50b0JlKDIpO1xyXG5cclxuICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBqc3guZWxlbWVudFZvaWQoXCJkaXZcIiwgbnVsbCwgW1wib25DbGlja1wiLCB0ZXN0X2NsaWNrXSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHByZXZlbnRfY2xpY2tfZGVmYXVsdCA9IGZhbHNlO1xyXG4gICAgICAgIGNhbmNlbGxlZCA9ICFzaW11bGF0ZUNsaWNrKG5vZGUuY2hpbGRyZW5bMF0pO1xyXG4gICAgICAgIGV4cGVjdChjYW5jZWxsZWQpLnRvQmUoZmFsc2UpO1xyXG4gICAgICAgIGV4cGVjdChjb3VudCkudG9CZSgzKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwicmVtb3ZlcyBldmVudCBoYW5kbGVyc1wiLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHByZXZlbnRfY2xpY2tfZGVmYXVsdCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcblxyXG4gICAgICAgIGNvbnN0IHRlc3RfY2xpY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgaWYgKHByZXZlbnRfY2xpY2tfZGVmYXVsdClcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBqc3guZWxlbWVudFZvaWQoXCJkaXZcIiwgbnVsbCwgW1wib25DbGlja1wiLCB0ZXN0X2NsaWNrXSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGV4cGVjdChub2RlLm91dGVySFRNTCkudG9CZSgnPGRpdj48ZGl2PjwvZGl2PjwvZGl2PicpO1xyXG5cclxuICAgICAgICBsZXQgY2FuY2VsbGVkID0gIXNpbXVsYXRlQ2xpY2sobm9kZS5jaGlsZHJlblswXSk7XHJcbiAgICAgICAgZXhwZWN0KGNhbmNlbGxlZCkudG9CZShmYWxzZSk7XHJcbiAgICAgICAgZXhwZWN0KGNvdW50KS50b0JlKDEpO1xyXG5cclxuICAgICAgICBwcmV2ZW50X2NsaWNrX2RlZmF1bHQgPSB0cnVlO1xyXG4gICAgICAgIGNhbmNlbGxlZCA9ICFzaW11bGF0ZUNsaWNrKG5vZGUuY2hpbGRyZW5bMF0pO1xyXG4gICAgICAgIGV4cGVjdChjYW5jZWxsZWQpLnRvQmUodHJ1ZSk7XHJcbiAgICAgICAgZXhwZWN0KGNvdW50KS50b0JlKDIpO1xyXG5cclxuICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBqc3guZWxlbWVudFZvaWQoXCJkaXZcIiwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNhbmNlbGxlZCA9ICFzaW11bGF0ZUNsaWNrKG5vZGUuY2hpbGRyZW5bMF0pO1xyXG4gICAgICAgIGV4cGVjdChjYW5jZWxsZWQpLnRvQmUoZmFsc2UpO1xyXG4gICAgICAgIGV4cGVjdChjb3VudCkudG9CZSgyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiY2hhbmdlcyBldmVudCBoYW5kbGVyc1wiLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuXHJcbiAgICAgICAgY29uc3QgdGVzdF9jbGljayA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdGVzdF9jbGljazIgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgY291bnQgKz0gMTAwO1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IHtcclxuICAgICAgICAgICAganN4LmVsZW1lbnRWb2lkKFwiZGl2XCIsIG51bGwsIFtcIm9uQ2xpY2tcIiwgdGVzdF9jbGlja10pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBleHBlY3Qobm9kZS5vdXRlckhUTUwpLnRvQmUoJzxkaXY+PGRpdj48L2Rpdj48L2Rpdj4nKTtcclxuICAgICAgICBsZXQgY2FuY2VsbGVkID0gIXNpbXVsYXRlQ2xpY2sobm9kZS5jaGlsZHJlblswXSk7XHJcbiAgICAgICAgZXhwZWN0KGNhbmNlbGxlZCkudG9CZShmYWxzZSk7XHJcbiAgICAgICAgZXhwZWN0KGNvdW50KS50b0JlKDEpO1xyXG5cclxuICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBqc3guZWxlbWVudFZvaWQoXCJkaXZcIiwgbnVsbCwgW1wib25DbGlja1wiLCB0ZXN0X2NsaWNrMl0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjYW5jZWxsZWQgPSAhc2ltdWxhdGVDbGljayhub2RlLmNoaWxkcmVuWzBdKTtcclxuICAgICAgICBleHBlY3QoY2FuY2VsbGVkKS50b0JlKHRydWUpO1xyXG4gICAgICAgIGV4cGVjdChjb3VudCkudG9CZSgxMDEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJhbGxvd3MgZWxlbWVudHMgdG8gbXV0YXRlIHRoZW1zZWx2ZXNcIiwgKCkgPT4ge1xyXG4gICAgICAgIGpzeC5wYXRjaChub2RlLCAoKSA9PiBqc3guZWxlbWVudFZvaWQoXCJkaXZcIikpO1xyXG4gICAgICAgIChub2RlLmNoaWxkcmVuWzBdIGFzIEhUTUxFbGVtZW50KS5pbm5lckhUTUwgPSBcImR5bmFtaWNcIjtcclxuICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ganN4LmVsZW1lbnRWb2lkKFwiZGl2XCIpKTtcclxuICAgICAgICBleHBlY3Qobm9kZS5vdXRlckhUTUwpLnRvQmUoJzxkaXY+PGRpdj5keW5hbWljPC9kaXY+PC9kaXY+Jyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImNvbnN0cnVjdHMgY29tcG9uZW50cyBhcHByb3ByaWF0ZWx5XCIsICgpID0+IHtcclxuICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ganN4LmVsZW1lbnRWb2lkKGxpZmVjeWNsZSBhcyBhbnkpKTtcclxuICAgICAgICBleHBlY3QobGNfY29uc3RydWN0b3IpLnRvQmUoMSk7XHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IGpzeC5lbGVtZW50Vm9pZChsaWZlY3ljbGUgYXMgYW55KSk7XHJcbiAgICAgICAgZXhwZWN0KGxjX2NvbnN0cnVjdG9yKS50b0JlKDEpO1xyXG4gICAgICAgIGpzeC5wYXRjaChub2RlLCAoKSA9PiBudWxsKTtcclxuICAgICAgICBleHBlY3QobGNfY29uc3RydWN0b3IpLnRvQmUoMSk7XHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IGpzeC5lbGVtZW50Vm9pZChsaWZlY3ljbGUgYXMgYW55KSk7XHJcbiAgICAgICAgZXhwZWN0KGxjX2NvbnN0cnVjdG9yKS50b0JlKDIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJjYWxscyBjb21wb25lbnRXaWxsTW91bnQgYXBwcm9wcmlhdGVseVwiLCAoKSA9PiB7XHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IGpzeC5lbGVtZW50Vm9pZChsaWZlY3ljbGUgYXMgYW55KSk7XHJcbiAgICAgICAgZXhwZWN0KGxjX2NvbXBvbmVudFdpbGxNb3VudCkudG9CZSgxKTtcclxuICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ganN4LmVsZW1lbnRWb2lkKGxpZmVjeWNsZSBhcyBhbnkpKTtcclxuICAgICAgICBleHBlY3QobGNfY29tcG9uZW50V2lsbE1vdW50KS50b0JlKDEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJjYWxscyBjb21wb25lbnREaWRNb3VudCBhcHByb3ByaWF0ZWx5XCIsICgpID0+IHtcclxuICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ganN4LmVsZW1lbnRWb2lkKGxpZmVjeWNsZSBhcyBhbnkpKTtcclxuICAgICAgICBleHBlY3QobGNfY29tcG9uZW50RGlkTW91bnQpLnRvQmUoMSk7XHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IGpzeC5lbGVtZW50Vm9pZChsaWZlY3ljbGUgYXMgYW55KSk7XHJcbiAgICAgICAgZXhwZWN0KGxjX2NvbXBvbmVudERpZE1vdW50KS50b0JlKDEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJjYWxscyBjb21wb25lbnRXaWxsVW5tb3VudCBhcHByb3ByaWF0ZWx5XCIsICgpID0+IHtcclxuICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ganN4LmVsZW1lbnRWb2lkKGxpZmVjeWNsZSBhcyBhbnkpKTtcclxuICAgICAgICBleHBlY3QobGNfY29tcG9uZW50V2lsbFVubW91bnQpLnRvQmUoMCk7XHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IGpzeC5lbGVtZW50Vm9pZChsaWZlY3ljbGUgYXMgYW55KSk7XHJcbiAgICAgICAgZXhwZWN0KGxjX2NvbXBvbmVudFdpbGxVbm1vdW50KS50b0JlKDApO1xyXG4gICAgICAgIGpzeC5wYXRjaChub2RlLCAoKSA9PiBudWxsKTtcclxuICAgICAgICBleHBlY3QobGNfY29tcG9uZW50V2lsbFVubW91bnQpLnRvQmUoMSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImNhbGxzIGNvbXBvbmVudFdpbGxVcGRhdGUgYXBwcm9wcmlhdGVseVwiLCAoKSA9PiB7XHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IGpzeC5lbGVtZW50Vm9pZChsaWZlY3ljbGUgYXMgYW55LCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgXCJkYXRhLWluZGV4XCIsIFwiMVwiKSk7XHJcbiAgICAgICAgZXhwZWN0KGxjX2NvbXBvbmVudFdpbGxVcGRhdGUpLnRvQmUoMCk7XHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IGpzeC5lbGVtZW50Vm9pZChsaWZlY3ljbGUgYXMgYW55KSk7XHJcbiAgICAgICAgZXhwZWN0KGxjX2NvbXBvbmVudFdpbGxVcGRhdGUpLnRvQmUoMSk7XHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IG51bGwpO1xyXG4gICAgICAgIGV4cGVjdChsY19jb21wb25lbnRXaWxsVXBkYXRlKS50b0JlKDEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJjYWxscyBjb21wb25lbnREaWRVcGRhdGUgYXBwcm9wcmlhdGVseVwiLCAoKSA9PiB7XHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IGpzeC5lbGVtZW50Vm9pZChsaWZlY3ljbGUgYXMgYW55KSk7XHJcbiAgICAgICAgZXhwZWN0KGxjX2NvbXBvbmVudERpZFVwZGF0ZSkudG9CZSgwKTtcclxuICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ganN4LmVsZW1lbnRWb2lkKGxpZmVjeWNsZSBhcyBhbnkpKTtcclxuICAgICAgICBleHBlY3QobGNfY29tcG9uZW50RGlkVXBkYXRlKS50b0JlKDEpO1xyXG4gICAgICAgIGpzeC5wYXRjaChub2RlLCAoKSA9PiBudWxsKTtcclxuICAgICAgICBleHBlY3QobGNfY29tcG9uZW50RGlkVXBkYXRlKS50b0JlKDEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJjYWxscyBzaG91bGRDb21wb25lbnRVcGRhdGUgYXBwcm9wcmlhdGVseVwiLCAoKSA9PiB7XHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IGpzeC5lbGVtZW50Vm9pZChsaWZlY3ljbGUgYXMgYW55KSk7XHJcbiAgICAgICAgZXhwZWN0KGxjX3Nob3VsZENvbXBvbmVudFVwZGF0ZSkudG9CZSgwKTtcclxuICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ganN4LmVsZW1lbnRWb2lkKGxpZmVjeWNsZSBhcyBhbnkpKTtcclxuICAgICAgICBleHBlY3QobGNfc2hvdWxkQ29tcG9uZW50VXBkYXRlKS50b0JlKDEpO1xyXG4gICAgICAgIGpzeC5wYXRjaChub2RlLCAoKSA9PiBudWxsKTtcclxuICAgICAgICBleHBlY3QobGNfc2hvdWxkQ29tcG9uZW50VXBkYXRlKS50b0JlKDEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJjYWxscyBtb3VudGluZyBsaWZlY3ljbGUgbWV0aG9kcyBpbiB0aGUgY29ycmVjdCBvcmRlclwiLCAoKSA9PiB7XHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IGpzeC5lbGVtZW50Vm9pZChsaWZlY3ljbGUgYXMgYW55KSk7XHJcbiAgICAgICAgZXhwZWN0KGxjX21ldGhvZHMuam9pbihcIiA9PiBcIikpLnRvQmUoXCJjb25zdHJ1Y3RvciA9PiBjb21wb25lbnRXaWxsTW91bnQgPT4gcmVuZGVyID0+IGNvbXBvbmVudERpZE1vdW50XCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJjYWxscyByZS1yZW5kZXIgbGlmZWN5Y2xlIG1ldGhvZHMgaW4gdGhlIGNvcnJlY3Qgb3JkZXJcIiwgKCkgPT4ge1xyXG4gICAgICAgIGpzeC5wYXRjaChub2RlLCAoKSA9PiBqc3guZWxlbWVudFZvaWQobGlmZWN5Y2xlIGFzIGFueSkpO1xyXG4gICAgICAgIGxjX21ldGhvZHMgPSBbXTtcclxuICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ganN4LmVsZW1lbnRWb2lkKGxpZmVjeWNsZSBhcyBhbnkpKTtcclxuICAgICAgICBleHBlY3QobGNfbWV0aG9kcy5qb2luKFwiID0+IFwiKSkudG9CZShcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPT4gc2hvdWxkQ29tcG9uZW50VXBkYXRlID0+IGNvbXBvbmVudFdpbGxVcGRhdGUgPT4gcmVuZGVyID0+IGNvbXBvbmVudERpZFVwZGF0ZVwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwicmVzcGVjdHMgc2hvdWxkQ29tcG9uZW50VXBkYXRlXCIsICgpID0+IHtcclxuICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ganN4LmVsZW1lbnRWb2lkKGxpZmVjeWNsZSBhcyBhbnkpKTtcclxuICAgICAgICBsY19tZXRob2RzID0gW107XHJcbiAgICAgICAgZnJlZXplX21lc3NhZ2UgPSB0cnVlO1xyXG4gICAgICAgIGpzeC5wYXRjaChub2RlLCAoKSA9PiBqc3guZWxlbWVudFZvaWQobGlmZWN5Y2xlIGFzIGFueSkpO1xyXG4gICAgICAgIGV4cGVjdChsY19tZXRob2RzLmpvaW4oXCIgPT4gXCIpKS50b0JlKFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9PiBzaG91bGRDb21wb25lbnRVcGRhdGVcIik7XHJcbiAgICAgICAgZXhwZWN0KG5vZGUub3V0ZXJIVE1MKS50b0JlKCc8ZGl2PjxkaXYgZnJvemVuPVwibm9cIj48L2Rpdj48L2Rpdj4nKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiY2FsbHMgdW5tb3VudGluZyBsaWZlY3ljbGUgbWV0aG9kcyBpbiB0aGUgY29ycmVjdCBvcmRlclwiLCAoKSA9PiB7XHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IGpzeC5lbGVtZW50Vm9pZChsaWZlY3ljbGUgYXMgYW55KSk7XHJcbiAgICAgICAgbGNfbWV0aG9kcyA9IFtdO1xyXG4gICAgICAgIGpzeC5wYXRjaChub2RlLCAoKSA9PiBudWxsKTtcclxuICAgICAgICBleHBlY3QobGNfbWV0aG9kcy5qb2luKFwiID0+IFwiKSkudG9CZShcImNvbXBvbmVudFdpbGxVbm1vdW50XCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJ1bm1vdW50cyBjb21wb25lbnRzXCIsICgpID0+IHtcclxuICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBqc3guZWxlbWVudFZvaWQobGlmZWN5Y2xlIGFzIGFueSwgbnVsbCwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGV4cGVjdChub2RlLm91dGVySFRNTCkudG9CZSgnPGRpdj48ZGl2IGZyb3plbj1cIm5vXCI+PC9kaXY+PC9kaXY+Jyk7XHJcblxyXG4gICAgICAgIGV4cGVjdChsY19jb21wb25lbnRXaWxsTW91bnQpLnRvQmUoMSk7XHJcbiAgICAgICAgZXhwZWN0KGxjX2NvbXBvbmVudERpZE1vdW50KS50b0JlKDEpO1xyXG5cclxuICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBqc3guZWxlbWVudFZvaWQoXCJkaXZcIiwgbnVsbCwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGV4cGVjdChub2RlLm91dGVySFRNTCkudG9CZSgnPGRpdj48ZGl2PjwvZGl2PjwvZGl2PicpO1xyXG5cclxuICAgICAgICBleHBlY3QobGNfY29tcG9uZW50V2lsbE1vdW50KS50b0JlKDEpO1xyXG4gICAgICAgIGV4cGVjdChsY19jb21wb25lbnREaWRNb3VudCkudG9CZSgxKTtcclxuICAgICAgICBleHBlY3QobGNfY29tcG9uZW50V2lsbFVubW91bnQpLnRvQmUoMSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcInJlY29nbmlzZXMgbmVzdGVkIGNvbXBvbmVudHNcIiwgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblxyXG4gICAgICAgIGpzeC5wYXRjaChub2RlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGpzeC5lbGVtZW50Vm9pZChpbXBvcnRhbnQgYXMgYW55LCBudWxsLCBudWxsLCBcImltcG9ydGFuY2VcIiwgNywgXCJuYW1lXCIsIFwiYm9uZCwgamltbXktYm9iIG1lbG9uLWZpZWxkIGJvbmRcIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGV4cGVjdChub2RlLm91dGVySFRNTCkudG9CZSgnPGRpdj48ZGl2IHN0eWxlPVwiZGlzcGxheTogaW5saW5lOyBjb2xvcjogcmVkO1wiPm9rPC9kaXY+PC9kaXY+Jyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImlzIGZhc3RcIiwgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGl0ZXJhdGlvbnMgPSAxMDAwMDtcclxuICAgICAgICBsZXQgaSA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGkgPCBpdGVyYXRpb25zKSB7XHJcbiAgICAgICAgICAgIGpzeC5wYXRjaChub2RlLCAoKSA9PlxyXG4gICAgICAgICAgICAgICAganN4LmVsZW1lbnRWb2lkKGltcG9ydGFudCBhcyBhbnksIG51bGwsIG51bGwsIFwiaW1wb3J0YW5jZVwiLCAoaSsrKSAlIDEwLCBcIm5hbWVcIiwgXCJib25kLCBqaW1teS1ib2IgXCIgKyAoaSAlIDIgPyBcIm1lbG9uLWZpZWxkXCIgOiBcInByaW5jZXNzXCIpICsgXCIgYm9uZFwiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnQ7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYmVuY2htYXJrOiBcIiArIGl0ZXJhdGlvbnMgKyBcIiB0b29rIFwiICsgZHVyYXRpb24gKyBcIiBtcyA9IFwiICsgKE1hdGguY2VpbChkdXJhdGlvbiAvIGl0ZXJhdGlvbnMgKiAxMDAwMCkgLyAxMCkgKyBcIiB1cyBwZXJcIik7XHJcbiAgICAgICAgZXhwZWN0KGR1cmF0aW9uKS50b0JlTGVzc1RoYW4oMjUwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImRlYWxzIHdpdGgga2V5c1wiLCAoKSA9PiB7XHJcbiAgICAgICAganN4LnBhdGNoKG5vZGUsICgpID0+IHtcclxuICAgICAgICAgICAganN4LmVsZW1lbnRWb2lkKFwiZGl2XCIsIFwiMVwiLCBudWxsLCBcImlkXCIsIFwiaWFtbWVcIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGV4cGVjdChub2RlLm91dGVySFRNTCkudG9CZSgnPGRpdj48ZGl2IGlkPVwiaWFtbWVcIj48L2Rpdj48L2Rpdj4nKTtcclxuXHJcbiAgICAgICAgbm9kZS5jaGlsZHJlbi5pdGVtKDApLnNldEF0dHJpYnV0ZShcImRhdGEtYWRkZWRcIiwgXCJpdGVtIGNoYW5nZWQgb3V0c2lkZSBvZiByZW5kZXJlclwiKVxyXG5cclxuICAgICAgICBqc3gucGF0Y2gobm9kZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBqc3guZWxlbWVudFZvaWQoXCJkaXZcIiwgXCIxXCIsIG51bGwsIFwiaWRcIiwgXCJpYW1zdGlsbG1lXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBleHBlY3Qobm9kZS5vdXRlckhUTUwpLnRvQmUoJzxkaXY+PGRpdiBpZD1cImlhbXN0aWxsbWVcIiBkYXRhLWFkZGVkPVwiaXRlbSBjaGFuZ2VkIG91dHNpZGUgb2YgcmVuZGVyZXJcIj48L2Rpdj48L2Rpdj4nKTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbmRlc2NyaWJlKFwiYSByZW5kZXIgaW50byB0ZXh0XCIsICgpID0+IHtcclxuICAgIGl0KFwic2hvdWxkIG5vdCBjcmFzaFwiLCAoKSA9PntcclxuICAgICAgICBqc3gucGF0Y2gobnVsbCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBqc3guZWxlbWVudFZvaWQoXCJkaXZcIiwgXCIxXCIsIG51bGwsIFwiaWRcIiwgXCJpYW1tZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgaXQoXCJzaG91bGQgcmV0dXJuIGEgZGl2XCIsICgpID0+e1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBqc3gucGF0Y2gobnVsbCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBqc3guZWxlbWVudFZvaWQoXCJkaXZcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZShcIjxkaXY+PC9kaXY+XCIpO1xyXG4gICAgfSk7XHJcbiAgICBpdChcInNob3VsZCByZXR1cm4gYSBkaXYgd2l0aCBhbiBpZFwiLCAoKSA9PntcclxuICAgICAgICB2YXIgcmVzdWx0ID0ganN4LnBhdGNoKG51bGwsICgpID0+IHtcclxuICAgICAgICAgICAganN4LmVsZW1lbnRWb2lkKFwiZGl2XCIsIG51bGwsIFtcImlkXCIsXCJ1bm9cIl0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmUoXCI8ZGl2IGlkPVxcXCJ1bm9cXFwiPjwvZGl2PlwiKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBpdChcInNob3VsZCByZXR1cm4gYSBkaXYgd2l0aCBhIGNvbXBvbmVudFwiLCAoKSA9PntcclxuICAgICAgICB2YXIgcmVzdWx0ID0ganN4LnBhdGNoKG51bGwsICgpID0+IHtcclxuICAgICAgICAgICAgICAganN4LmVsZW1lbnRWb2lkKGltcG9ydGFudCBhcyBhbnksIG51bGwsIG51bGwsIFwiaW1wb3J0YW5jZVwiLCA3LCBcIm5hbWVcIiwgXCJib25kLCBqaW1teS1ib2IgbWVsb24tZmllbGQgYm9uZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdmFyIHJlc3VsdDIgPSBqc3gucGF0Y2goZWxlbWVudCwoKSA9PiB7XHJcbiAgICAgICAgICAgICAgIGpzeC5lbGVtZW50Vm9pZChpbXBvcnRhbnQgYXMgYW55LCBudWxsLCBudWxsLCBcImltcG9ydGFuY2VcIiwgNywgXCJuYW1lXCIsIFwiYm9uZCwgamltbXktYm9iIG1lbG9uLWZpZWxkIGJvbmRcIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmUoZWxlbWVudC5pbm5lckhUTUwpO1xyXG4gfSk7XHJcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHRlc3RzL2FsbC5zcGVjLnRzXG4gKiovIiwiZXhwb3J0IGNvbnN0IHZlcnNpb24gPSAwLjE7XHJcblxyXG5pbnRlcmZhY2UgSUNvbXBvbmVudCB7XHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQ/OiAocHJvcHM/OiBhbnksIHN0YXRlPzogYW55KSA9PiB2b2lkO1xyXG4gICAgY29tcG9uZW50RGlkTW91bnQ/OiAocHJvcHM/OiBhbnksIHN0YXRlPzogYW55KSA9PiB2b2lkO1xyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQ/OiAocHJvcHM/OiBhbnksIHN0YXRlPzogYW55KSA9PiB2b2lkO1xyXG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZT86IChuZXh0X3Byb3BzPzogYW55LCBuZXh0X3N0YXRlPzogYW55KSA9PiB2b2lkO1xyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlPzogKHByb3BzPzogYW55LCBzdGF0ZT86IGFueSkgPT4gdm9pZDtcclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IChuZXh0X3Byb3BzOiBhbnksIG5leHRfc3RhdGU/OiBhbnkpID0+IHZvaWQ7XHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGU6IChuZXh0X3Byb3BzPzogYW55LCBuZXh0X3N0YXRlPzogYW55KSA9PiBib29sZWFuO1xyXG4gICAgcmVuZGVyOiAocHJvcHM/OiBhbnksIHN0YXRlPzogYW55KSA9PiBhbnk7XHJcbiAgICBwcm9wczogYW55O1xyXG4gICAgc3RhdGU6IGFueTtcclxuICAgIGdldFN0YXRlKCk6IGFueTtcclxuICAgIHNldFN0YXRlKHN0YXRlOiBhbnkpOiB2b2lkO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVk5vZGUge1xyXG4gICAgcGFyZW50OiBWTm9kZTtcclxuICAgIGtleT86IHN0cmluZztcclxuICAgIHRhZzogc3RyaW5nO1xyXG4gICAgYXR0cnM6IHsgW25hbWU6IHN0cmluZ106IGFueSB9O1xyXG4gICAgbm9kZT86IE5vZGU7XHJcbiAgICBjb21wb25lbnQ/OiBJQ29tcG9uZW50O1xyXG4gICAga2lkczogVk5vZGVbXTtcclxuICAgIHRleHQ/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmxldCByb290OiBWTm9kZTtcclxubGV0IGp1c3RfcGF0Y2hlZDogVk5vZGU7XHJcbmxldCBwYXRjaGluZzogVk5vZGU7XHJcbmxldCBwYXRjaF9uZXh0OiBWTm9kZTtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnQ8UCwgUz4ge1xyXG4gICAgc3RhdGU6IFM7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcHM6IFApIHtcclxuICAgICAgICA8SUNvbXBvbmVudD50aGlzOyAvLyBuaW5qYSBpbXBsZW1lbnRzIHdpdGhvdXQgbmVlZGluZyB0byBleHBvcnRcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudChwcm9wcz86IGFueSwgc3RhdGU/OiBhbnkpIHsgfTtcclxuICAgIGNvbXBvbmVudERpZE1vdW50KHByb3BzPzogYW55LCBzdGF0ZT86IGFueSkgeyB9O1xyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQocHJvcHM/OiBhbnksIHN0YXRlPzogYW55KSB7IH07XHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dF9wcm9wcz86IGFueSwgbmV4dF9zdGF0ZT86IGFueSkgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0X3Byb3BzPzogYW55LCBuZXh0X3N0YXRlPzogYW55KSB7IH07XHJcbiAgICByZW5kZXIoKSB7IH07XHJcbiAgICBnZXRTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcclxuICAgIH1cclxuICAgIHNldFN0YXRlKHN0YXRlOiBTKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgaHRtbCA9IFwiXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGF0Y2goZWxlbWVudDogRWxlbWVudCwgZm46ICgpID0+IHZvaWR8c3RyaW5nKSB7XHJcbiAgICBsZXQgbm9kZSA9IChlbGVtZW50ID8gKGVsZW1lbnQgYXMgYW55KS5fX3JlYWN0aXZfdmlld19ub2RlIDogbnVsbCkgYXMgVk5vZGU7XHJcbiAgICBpZiAoIW5vZGUgJiYgZWxlbWVudClcclxuICAgICAgICAoZWxlbWVudCBhcyBhbnkpLl9fcmVhY3Rpdl92aWV3X25vZGUgPSBub2RlID0ge1xyXG4gICAgICAgICAgICBwYXJlbnQ6IG51bGwsXHJcbiAgICAgICAgICAgIHRhZzogZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgICBub2RlOiBlbGVtZW50LFxyXG4gICAgICAgICAgICBrZXk6IG51bGwsXHJcbiAgICAgICAgICAgIGF0dHJzOiB7fSxcclxuICAgICAgICAgICAga2lkczogW11cclxuICAgICAgICB9O1xyXG5cclxuICAgIGp1c3RfcGF0Y2hlZCA9IG51bGw7XHJcbiAgICBwYXRjaGluZyA9IG51bGw7XHJcbiAgICBwYXRjaF9uZXh0ID0gbm9kZTtcclxuICAgIHJvb3QgPSBub2RlO1xyXG5cclxuICAgIGh0bWwgPSBudWxsO1xyXG4gICAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICAgICAgaHRtbCA9IFwiXCI7XHJcbiAgICAgICAgZm4oKTtcclxuICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50T3BlbihlbGVtZW50Lm5vZGVOYW1lLCBudWxsLCBudWxsKTtcclxuICAgIGZuKCk7XHJcbiAgICBlbGVtZW50Q2xvc2UoKTtcclxufVxyXG5cclxubGV0IGNsb3NpbmdIdG1sID0gW10gYXMgc3RyaW5nW107XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudFZvaWQodGFnOiBzdHJpbmcsIGtleT86IHN0cmluZywgc3RhdGljcz86YW55W10sIGExPzpzdHJpbmcsIGEyPzphbnksIGEzPzpzdHJpbmcsIGE0PzphbnksIGE1PzpzdHJpbmcsIGE2PzphbnkpIHtcclxuICAgIGVsZW1lbnRPcGVuLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICBlbGVtZW50Q2xvc2UuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRleHQodmFsdWU6IGFueSwgZm9ybWF0dGVycz86ICgodmFsdWU6YW55KSA9PiBzdHJpbmcpW10pIHtcclxuICAgIGlmICghcm9vdCkge1xyXG4gICAgICAgIGh0bWwgKz0gdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5vZGUgPSBfZWxlbWVudE9wZW4oXCIjdGV4dFwiLCBudWxsLCBudWxsKTtcclxuICAgIGlmIChub2RlLnRleHQgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgbGV0IGZvcm1hdHRlZCA9IG5vZGUudGV4dCA9IHZhbHVlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgaWYgKGZvcm1hdHRlcilcclxuICAgICAgICAgICAgICAgIGZvcm1hdHRlZCA9IGZvcm1hdHRlcihmb3JtYXR0ZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAobm9kZS5ub2RlIGFzIGFueSkuZGF0YSA9IGZvcm1hdHRlZDtcclxuICAgIH1cclxuICAgIGVsZW1lbnRDbG9zZSgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudE9wZW4odGFnOiBzdHJpbmcgfCBGdW5jdGlvbiwga2V5Pzogc3RyaW5nLCBzdGF0aWNzPzogYW55W10sIG4xPzpzdHJpbmcsIHYxPzphbnksIG4yPzpzdHJpbmcsIHYyPzphbnksIG4zPzpzdHJpbmcsIHYzPzphbnkpIHtcclxuICAgIF9lbGVtZW50T3Blbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzeW5jX2FyZyhub2RlOiBIVE1MRWxlbWVudCwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZClcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgbGV0IGV4aXN0aW5nX3ZhbHVlID0gcGF0Y2hpbmcuYXR0cnNbbmFtZV07XHJcbiAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICBjYXNlIFwic3R5bGVcIjpcclxuICAgICAgICAgICAgaWYgKCFyb290KSB7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9IFwiIHN0eWxlPVxcXCJcIjtcclxuICAgICAgICAgICAgICAgIGxldCBmaXJzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gdmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmaXJzdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gXCIgXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgKz0ga2V5ICsgXCI6IFwiICsgdmFsdWVba2V5XSArIFwiO1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gXCJcXFwiXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHBhdGNoaW5nLmNvbXBvbmVudClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvbXBvbmVudHMgZG9uJ3QgaGF2ZSBkb20gbm9kZXMsIHlvdSBjYW5ub3Qgc2V0IHN0eWxlcyBkaXJlY3RseSBvbiB0aGVtXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zdHlsZS5jc3NUZXh0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSBub2RlLnN0eWxlO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdmlzaXRlZF9zdHlsZTogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XHJcbiAgICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gPE9iamVjdD52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcF92YWx1ZSA9IHZhbHVlW3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgdmlzaXRlZF9zdHlsZVtwcm9wXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWV4aXN0aW5nX3ZhbHVlIHx8IGV4aXN0aW5nX3ZhbHVlW3Byb3BdICE9PSBwcm9wX3ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKHN0eWxlIGFzIGFueSlbcHJvcF0gPSBwcm9wX3ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIChwYXRjaGluZy5hdHRyc1tuYW1lXSA9IGV4aXN0aW5nX3ZhbHVlID0gZXhpc3RpbmdfdmFsdWUgfHwge30pW3Byb3BdID0gcHJvcF92YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBleGlzdGluZ192YWx1ZSlcclxuICAgICAgICAgICAgICAgIGlmICghdmlzaXRlZF9zdHlsZVtwcm9wXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBleGlzdGluZ192YWx1ZVtwcm9wXTtcclxuICAgICAgICAgICAgICAgICAgICAoc3R5bGUgYXMgYW55KVtwcm9wXSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdfdmFsdWUgIT09IHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgcGF0Y2hpbmcuYXR0cnNbbmFtZV0gPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBcImNsYXNzTmFtZVwiKVxyXG4gICAgICAgICAgICAgICAgbmFtZSA9IFwiY2xhc3NcIjtcclxuXHJcbiAgICAgICAgICAgIGlmIChbXCJvYmplY3RcIiwgXCJmdW5jdGlvblwiXS5pbmRleE9mKHR5cGVvZiB2YWx1ZSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobmFtZS5zbGljZSgwLCAyKSA9PT0gXCJvblwiICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgICAgICAgICAgICAgICgoZm46ICgpID0+IHZvaWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnRfbmFtZSA9IG5hbWUuc2xpY2UoMikudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nX3ZhbHVlICE9PSBmbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGNoaW5nLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudF9uYW1lLCBleGlzdGluZ192YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGNoaW5nLm5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudF9uYW1lLCBmbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkodmFsdWUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFwYXRjaGluZy5jb21wb25lbnQpXHJcbiAgICAgICAgICAgICAgICBpZiAocm9vdClcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbCArPSBcIiBcIiArIG5hbWUgKyBcIj1cXFwiXCIgKyB2YWx1ZSArIFwiXFxcIlwiO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuXHJcbmZ1bmN0aW9uIF9lbGVtZW50T3Blbih0YWc6IHN0cmluZyB8IEZ1bmN0aW9uLCBrZXk/OiBzdHJpbmcsIHN0YXRpY3M/OiBhbnlbXSwgbjE/OnN0cmluZywgdjE/OmFueSwgbjI/OnN0cmluZywgdjI/OmFueSwgbjM/OnN0cmluZywgdjM/OmFueSkge1xyXG5cclxuICAgIHN5bmMuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuXHJcbiAgICAvLyAgICBpZiAocGF0Y2hpbmcuY29tcG9uZW50KVxyXG4gICAgLy8gICAgICAgIHJldHVybiBwYXRjaGluZztcclxuXHJcbiAgICBjb25zdCB2aXNpdGVkOmFueSA9IHt9O1xyXG4gICAgbGV0IG5vZGUgPSBwYXRjaGluZy5ub2RlIGFzIEhUTUxFbGVtZW50O1xyXG5cclxuICAgICAgICBpZiAoc3RhdGljcylcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGF0aWNzLmxlbmd0aDsgaSArPSAyKVxyXG4gICAgICAgICAgICAgICAgaWYgKHN5bmNfYXJnKG5vZGUsIHN0YXRpY3NbaV0sIHN0YXRpY3NbaSArIDFdKSlcclxuICAgICAgICAgICAgICAgICAgICB2aXNpdGVkW3N0YXRpY3NbaV1dID0gdHJ1ZTtcclxuXHJcbiAgICBpZiAocm9vdCB8fCB0eXBlb2YgdGFnID09PSBcInN0cmluZ1wiKVxyXG4gICAgZm9yIChsZXQgaSA9IDM7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDIpXHJcbiAgICAgICAgaWYgKHN5bmNfYXJnKG5vZGUsIGFyZ3VtZW50c1tpXSwgYXJndW1lbnRzW2kgKyAxXSkpXHJcbiAgICAgICAgICAgIHZpc2l0ZWRbYXJndW1lbnRzW2ldXSA9IHRydWU7XHJcblxyXG4gICAgaWYgKCFyb290ICYmIHR5cGVvZiB0YWcgPT09IFwic3RyaW5nXCIpXHJcbiAgICAgICAgaHRtbCArPSBcIj5cIjtcclxuXHJcbiAgICBmb3IgKGxldCBuYW1lIGluIHBhdGNoaW5nLmF0dHJzKVxyXG4gICAgICAgIGlmICghdmlzaXRlZFtuYW1lXSkge1xyXG4gICAgICAgICAgICBpZiAobmFtZS5zbGljZSgwLCAyKSA9PT0gXCJvblwiICYmIHR5cGVvZiBwYXRjaGluZy5hdHRyc1tuYW1lXSA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUuc2xpY2UoMikudG9Mb3dlckNhc2UoKSwgcGF0Y2hpbmcuYXR0cnNbbmFtZV0pO1xyXG4gICAgICAgICAgICBlbHNlIGlmICghcGF0Y2hpbmcuY29tcG9uZW50KVxyXG4gICAgICAgICAgICAgICAgaWYgKHJvb3QpXHJcbiAgICAgICAgICAgICAgICAgICAgKHBhdGNoaW5nLm5vZGUgYXMgSFRNTEVsZW1lbnQpLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcclxuXHJcbiAgICAgICAgICAgIGRlbGV0ZSBwYXRjaGluZy5hdHRyc1tuYW1lXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBhdGNoaW5nO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudENsb3NlKCkge1xyXG4gICAgaWYgKCFyb290KSB7XHJcbiAgICAgICAgaWYgKGNsb3NpbmdIdG1sLmxlbmd0aClcclxuICAgICAgICAgICAgaHRtbCArPSBjbG9zaW5nSHRtbC5wb3AoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAocGF0Y2hpbmcpIHtcclxuICAgICAgICBjb25zdCBraWRzID0gcGF0Y2hpbmcua2lkcztcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IGtpZHNba2lkcy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgaWYgKCFjaGlsZCB8fCBjaGlsZCA9PT0ganVzdF9wYXRjaGVkKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hpbGQuY29tcG9uZW50ICYmIGNoaWxkLmNvbXBvbmVudC5jb21wb25lbnRXaWxsVW5tb3VudClcclxuICAgICAgICAgICAgICAgIGNoaWxkLmNvbXBvbmVudC5jb21wb25lbnRXaWxsVW5tb3VudCgpO1xyXG5cclxuICAgICAgICAgICAgcGF0Y2hpbmcubm9kZS5yZW1vdmVDaGlsZChjaGlsZC5ub2RlKTtcclxuICAgICAgICAgICAga2lkcy5zcGxpY2Uoa2lkcy5pbmRleE9mKGNoaWxkKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGtpZHMuc2xpY2UoKSlcclxuICAgICAgICAgICAgaWYgKGNoaWxkLnBhcmVudCAhPT0gcGF0Y2hpbmcpXHJcbiAgICAgICAgICAgICAgICBraWRzLnNwbGljZShraWRzLmluZGV4T2YoY2hpbGQpLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBqdXN0X3BhdGNoZWQgPSBwYXRjaGluZztcclxuICAgIHBhdGNoX25leHQgPSAocGF0Y2hpbmcgJiYgcGF0Y2hpbmcucGFyZW50KSA/IHBhdGNoaW5nLnBhcmVudC5raWRzW3BhdGNoaW5nLnBhcmVudC5raWRzLmluZGV4T2YocGF0Y2hpbmcpICsgMV0gOiB1bmRlZmluZWQ7XHJcbiAgICBwYXRjaGluZyA9IHBhdGNoaW5nID8gcGF0Y2hpbmcucGFyZW50IDogbnVsbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UHJvcHModGFnOiBzdHJpbmcgfCBGdW5jdGlvbiwga2V5Pzogc3RyaW5nLCBzdGF0aWNzPzogYW55W10sIG4xPzpzdHJpbmcsIHYxPzphbnksIG4yPzpzdHJpbmcsIHYyPzphbnksIG4zPzpzdHJpbmcsIHYzPzphbnkpIHtcclxuICAgIHBhdGNoaW5nID0gcGF0Y2hfbmV4dDtcclxuICAgIHBhdGNoX25leHQgPSBwYXRjaGluZy5raWRzWzBdO1xyXG5cclxuICAgIGNvbnN0IHByb3BzID0ge307XHJcbiAgICBpZiAoc3RhdGljcylcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YXRpY3MubGVuZ3RoOyBpICs9IDIpIHtcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSBzdGF0aWNzW2ldO1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBzdGF0aWNzW2kgKyAxXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgKHByb3BzIGFzIGFueSlbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMzsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMikge1xyXG4gICAgICAgIGxldCBuYW1lID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IGFyZ3VtZW50c1tpICsgMV07XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAocHJvcHMgYXMgYW55KVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByb3BzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjYWxsKG5vZGU6IFZOb2RlLCBmbjogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IGFueSB7XHJcbiAgICByZXR1cm4gZm4gJiYgbm9kZSAmJiBub2RlLmNvbXBvbmVudCAmJiAobm9kZS5jb21wb25lbnQgYXMgYW55KVtmbl0gPyAobm9kZS5jb21wb25lbnQgYXMgYW55KVtmbl0uYXBwbHkocGF0Y2hpbmcuY29tcG9uZW50LCBhcmdzKSA6IHVuZGVmaW5lZDtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyQ29tcG9uZW50KGlzX25ldzpib29sZWFuLCBuZXh0X3Byb3BzOmFueSkge1xyXG4gICAgaWYgKGlzX25ldykge1xyXG4gICAgICAgIGNhbGwocGF0Y2hpbmcsIFwicmVuZGVyXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwYXRjaGluZy5jb21wb25lbnQucHJvcHMgPSBwYXRjaGluZy5jb21wb25lbnQucHJvcHMgfHwge307XHJcbiAgICBjYWxsKHBhdGNoaW5nLCBcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcIiwgbmV4dF9wcm9wcywgcGF0Y2hpbmcuY29tcG9uZW50LnN0YXRlKTtcclxuICAgIHBhdGNoaW5nLmNvbXBvbmVudC5wcm9wcyA9IG5leHRfcHJvcHM7XHJcblxyXG4gICAgaWYgKGNhbGwocGF0Y2hpbmcsIFwic2hvdWxkQ29tcG9uZW50VXBkYXRlXCIsIG5leHRfcHJvcHMpID09PSBmYWxzZSkge1xyXG4gICAgICAgIGp1c3RfcGF0Y2hlZCA9IHBhdGNoX25leHQ7XHJcbiAgICAgICAgcGF0Y2hfbmV4dCA9IHBhdGNoaW5nLmtpZHNbcGF0Y2hpbmcua2lkcy5pbmRleE9mKGp1c3RfcGF0Y2hlZCkgKyAxXTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbChwYXRjaGluZywgXCJjb21wb25lbnRXaWxsVXBkYXRlXCIsIHBhdGNoaW5nLmNvbXBvbmVudC5wcm9wcywgcGF0Y2hpbmcuY29tcG9uZW50LnN0YXRlKTtcclxuICAgIGNhbGwocGF0Y2hpbmcsIFwicmVuZGVyXCIpO1xyXG4gICAgY2FsbChwYXRjaGluZywgXCJjb21wb25lbnREaWRVcGRhdGVcIiwgcGF0Y2hpbmcuY29tcG9uZW50LnByb3BzLCBwYXRjaGluZy5jb21wb25lbnQuc3RhdGUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzeW5jKHRhZzogc3RyaW5nIHwgRnVuY3Rpb24sIGtleT86IHN0cmluZywgc3RhdGljcz86IGFueVtdLCBuMT86c3RyaW5nLCB2MT86YW55LCBuMj86c3RyaW5nLCB2Mj86YW55LCBuMz86c3RyaW5nLCB2Mz86YW55KSB7XHJcbiAgICBqdXN0X3BhdGNoZWQgPSBudWxsO1xyXG5cclxuICAgIGxldCByZXVzZV92bm9kZSA9IHBhdGNoX25leHQgJiYgcGF0Y2hfbmV4dC5rZXkgPT09IGtleTtcclxuICAgIGlmIChyZXVzZV92bm9kZSlcclxuICAgICAgICBpZiAodHlwZW9mIHRhZyA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgcmV1c2Vfdm5vZGUgPSBwYXRjaF9uZXh0LnRhZyA9PT0gdGFnIHx8IHBhdGNoX25leHQudGFnID09PSB0YWcudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldXNlX3Zub2RlID0gcGF0Y2hfbmV4dC5jb21wb25lbnQgJiYgKHBhdGNoX25leHQuY29tcG9uZW50LmNvbnN0cnVjdG9yIGFzIGFueSkubmFtZSA9PT0gKHRhZyBhcyBhbnkpLm5hbWU7XHJcblxyXG4gICAgbGV0IHJlcGxhY2luZ19jaGlsZDogVk5vZGU7XHJcbiAgICBsZXQgcGFyZW50X25vZGU6IE5vZGU7XHJcblxyXG4gICAgY29uc3Qga2lkcyA9IHBhdGNoaW5nID8gcGF0Y2hpbmcua2lkcyA6IG51bGw7XHJcblxyXG4gICAgaWYgKHJldXNlX3Zub2RlKSB7XHJcbiAgICAgICAgY29uc3QgbmV4dF9wcm9wcyA9IGdldFByb3BzLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgaWYgKHBhdGNoaW5nLmNvbXBvbmVudClcclxuICAgICAgICAgICAgcmVuZGVyQ29tcG9uZW50KCFyZXVzZV92bm9kZSwgbmV4dF9wcm9wcyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcGxhY2luZ19jaGlsZCA9IHBhdGNoX25leHQ7XHJcblxyXG4gICAgcGF0Y2hfbmV4dCA9IGtleSAmJiBwYXRjaGluZyA/IGtpZHMuZmlsdGVyKGMgPT4gYy5rZXkgPT09IGtleSlbMF0gOiBudWxsO1xyXG5cclxuICAgIGxldCBjcmVhdGVfY29tcG9uZW50ID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKCFwYXRjaF9uZXh0KVxyXG4gICAgICAgIGlmICh0eXBlb2YgdGFnID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgcGF0Y2hfbmV4dCA9IHsgcGFyZW50OiBwYXRjaGluZywgbm9kZTogbnVsbCwgdGFnOiAodGFnIGFzIGFueSkubmFtZSwga2V5LCBhdHRyczoge30sIGNvbXBvbmVudDogbnVsbCwga2lkczogW10gfTtcclxuICAgICAgICAgICAgY3JlYXRlX2NvbXBvbmVudCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCFyb290KSB7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9IFwiPFwiICsgdGFnO1xyXG4gICAgICAgICAgICAgICAgY2xvc2luZ0h0bWwucHVzaChcIjwvXCIgKyB0YWcgKyBcIj5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgZG9jID0gcGF0Y2hpbmcgJiYgcGF0Y2hpbmcubm9kZSA/IHBhdGNoaW5nLm5vZGUub3duZXJEb2N1bWVudCA6IGRvY3VtZW50O1xyXG4gICAgICAgICAgICBwYXRjaF9uZXh0ID0geyBwYXJlbnQ6IHBhdGNoaW5nLCBub2RlOiB0YWcgPT09IFwiI3RleHRcIiA/IGRvYy5jcmVhdGVUZXh0Tm9kZShcIlwiKSA6IGRvYy5jcmVhdGVFbGVtZW50KHRhZyBhcyBzdHJpbmcpLCB0YWc6ICh0YWcgYXMgc3RyaW5nKS50b0xvd2VyQ2FzZSgpLCBrZXksIGF0dHJzOiB7fSwga2lkczogW10gfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgaWYgKHBhdGNoaW5nKSB7XHJcbiAgICAgICAga2lkcy5zcGxpY2UocmVwbGFjaW5nX2NoaWxkID8ga2lkcy5pbmRleE9mKHJlcGxhY2luZ19jaGlsZCkgOiBraWRzLmxlbmd0aCwgMCwgcGF0Y2hfbmV4dCk7XHJcbiAgICAgICAgcGFyZW50X25vZGUgPSBwYXRjaGluZy5ub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5leHRfcHJvcHMgPSBnZXRQcm9wcy5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG5cclxuICAgIGlmIChjcmVhdGVfY29tcG9uZW50KSB7XHJcbiAgICAgICAgY29uc3QgZm4gPSAodGFnIGFzIEZ1bmN0aW9uKS5iaW5kLmFwcGx5KHRhZywgW251bGxdLmNvbmNhdChbXSkpO1xyXG4gICAgICAgIHBhdGNoaW5nLmNvbXBvbmVudCA9ICBuZXcgZm4oKTtcclxuICAgICAgICBwYXRjaGluZy5jb21wb25lbnQucHJvcHMgPSBuZXh0X3Byb3BzO1xyXG4gICAgICAgIHBhdGNoaW5nLmNvbXBvbmVudC5zdGF0ZSA9IHBhdGNoaW5nLmNvbXBvbmVudC5zdGF0ZSB8fCBjYWxsKHBhdGNoaW5nLCBcImdldFN0YXRlXCIpO1xyXG4gICAgICAgIGNhbGwocGF0Y2hpbmcsIFwiY29tcG9uZW50V2lsbE1vdW50XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwYXRjaGluZy5jb21wb25lbnQpXHJcbiAgICAgICAgcmVuZGVyQ29tcG9uZW50KCFyZXVzZV92bm9kZSwgbmV4dF9wcm9wcyk7XHJcblxyXG4gICAgaWYgKCFyZXVzZV92bm9kZSlcclxuICAgICAgICByZW5kZXJOb2RlKHBhcmVudF9ub2RlLCBrZXksIGtpZHMsIHJlcGxhY2luZ19jaGlsZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlck5vZGUocGFyZW50X25vZGU6IE5vZGUsIGtleTogc3RyaW5nLCBraWRzOiBWTm9kZVtdLCByZXBsYWNpbmdfY2hpbGQ6IFZOb2RlKSB7XHJcbiAgICBpZiAocm9vdCkge1xyXG4gICAgICAgIGlmIChwYXRjaGluZy5jb21wb25lbnQpIHtcclxuICAgICAgICBpZiAoIWp1c3RfcGF0Y2hlZClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29tcG9uZW50IGRpZG4ndCBjYWxsIGFueSBlbGVtZW50c1wiKTtcclxuICAgICAgICBwYXRjaGluZy5ub2RlID0ganVzdF9wYXRjaGVkLm5vZGU7XHJcbiAgICAgICAgKHBhdGNoaW5nLm5vZGUgYXMgYW55KS5fX3JlYWN0aXZfdmlld19ub2RlID0gcGF0Y2hpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBhcmVudF9ub2RlICYmIHBhdGNoaW5nLm5vZGUpIHtcclxuICAgICAgICBpZiAoa2V5KVxyXG4gICAgICAgICAgICBraWRzLmZpbHRlcihjID0+IGMua2V5ID09PSBrZXkpLmZvckVhY2goYyA9PiBjLm5vZGUgPSBwYXRjaGluZy5ub2RlKTtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIG5vZGUgaGFzIGEga2V5LCByZW1vdmUgaXQgZnJvbSB0aGUgRE9NIHRvIHByZXZlbnQgYSBsYXJnZSBudW1iZXIgb2YgcmUtb3JkZXJzIGluIHRoZSBjYXNlIHRoYXQgaXQgbW92ZWQgZmFyIG9yIHdhcyBjb21wbGV0ZWx5IHJlbW92ZWQuIFNpbmNlIHdlIGhvbGQgb24gdG8gYSByZWZlcmVuY2UgdGhyb3VnaCB0aGUga2V5TWFwLCB3ZSBjYW4gYWx3YXlzIGFkZCBpdCBiYWNrLlxyXG4gICAgICAgIGlmIChyZXBsYWNpbmdfY2hpbGQgJiYgcmVwbGFjaW5nX2NoaWxkLm5vZGUgJiYgcmVwbGFjaW5nX2NoaWxkLmtleSlcclxuICAgICAgICAgICAgcGFyZW50X25vZGUucmVwbGFjZUNoaWxkKHBhdGNoaW5nLm5vZGUsIHJlcGxhY2luZ19jaGlsZC5ub2RlKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHBhcmVudF9ub2RlLmluc2VydEJlZm9yZShwYXRjaGluZy5ub2RlLCByZXBsYWNpbmdfY2hpbGQgPyByZXBsYWNpbmdfY2hpbGQubm9kZSA6IG51bGwpO1xyXG4gICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHBhdGNoaW5nLmNvbXBvbmVudCAmJiBwYXRjaGluZy5ub2RlKVxyXG4gICAgICAgIGNhbGwocGF0Y2hpbmcsIFwiY29tcG9uZW50RGlkTW91bnRcIik7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogcmVhY3Rpdi5lbnRyeS50c1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=