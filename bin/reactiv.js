(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ ])));
//# sourceMappingURL=reactiv.js.map
//# sourceURL=reactiv.entry.ts