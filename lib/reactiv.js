"use strict";
var Component = (function () {
    function Component(props) {
        this.props = props;
        this.state = {};
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
var open_vnode;
var next_vnode;
var previous_vnode;
function patch(element, fn) {
    var node = element["__reactiv_view_node"];
    if (!node)
        element["__reactiv_view_node"] = node = {
            parent: null,
            tag: element.nodeName.toLowerCase(),
            node: element,
            key: null,
            attrs: {},
            kids: []
        };
    previous_vnode = null;
    open_vnode = null;
    next_vnode = node;
    elementOpen(element.nodeName, null, null);
    fn();
    elementClose();
}
exports.patch = patch;
function elementVoid(tag, key, statics, a1, a2, a3, a4, a5, a6) {
    elementOpen.apply(null, arguments);
    elementClose.apply(null, arguments);
}
exports.elementVoid = elementVoid;
function text(value, formatters) {
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
    var existing_value = open_vnode.attrs[name];
    switch (name) {
        case "style":
            if (open_vnode.component)
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
                    (open_vnode.attrs[name] = existing_value = existing_value || {})[prop] = prop_value;
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
                open_vnode.attrs[name] = value;
            if (name === "className")
                name = "class";
            if (["object", "function"].indexOf(typeof value) !== -1) {
                if (name.slice(0, 2) === "on" && typeof value === "function")
                    (function (fn) {
                        var event_name = name.slice(2).toLowerCase();
                        if (existing_value !== fn)
                            open_vnode.node.removeEventListener(event_name, existing_value);
                        open_vnode.node.addEventListener(event_name, fn);
                    })(value);
            }
            else if (!open_vnode.component)
                node.setAttribute(name, value);
            break;
    }
    return true;
}
;
function _elementOpen(tag, key, statics, n1, v1, n2, v2, n3, v3) {
    sync.apply(null, arguments);
    //    if (open_vnode.component)
    //        return open_vnode;
    var visited = {};
    var node = open_vnode.node;
    if (statics)
        for (var i = 0; i < statics.length; i += 2)
            if (sync_arg(node, statics[i], statics[i + 1]))
                visited[statics[i]] = true;
    for (var i = 3; i < arguments.length; i += 2)
        if (sync_arg(node, arguments[i], arguments[i + 1]))
            visited[arguments[i]] = true;
    for (var name_1 in open_vnode.attrs)
        if (!visited[name_1]) {
            if (name_1.slice(0, 2) === "on" && typeof open_vnode.attrs[name_1] === "function")
                node.removeEventListener(name_1.slice(2).toLowerCase(), open_vnode.attrs[name_1]);
            else if (!open_vnode.component)
                open_vnode.node.removeAttribute(name_1);
            delete open_vnode.attrs[name_1];
        }
    return open_vnode;
}
function elementClose() {
    if (open_vnode) {
        var kids = open_vnode.kids;
        while (true) {
            var child = kids[kids.length - 1];
            if (!child || child === previous_vnode)
                break;
            if (child.component && child.component.componentWillUnmount)
                child.component.componentWillUnmount();
            open_vnode.node.removeChild(child.node);
            kids.splice(kids.indexOf(child), 1);
        }
        for (var _i = 0, _a = kids.slice(); _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.parent !== open_vnode)
                kids.splice(kids.indexOf(child), 1);
        }
    }
    previous_vnode = open_vnode;
    next_vnode = (open_vnode && open_vnode.parent) ? open_vnode.parent.kids[open_vnode.parent.kids.indexOf(open_vnode) + 1] : undefined;
    open_vnode = open_vnode ? open_vnode.parent : null;
}
exports.elementClose = elementClose;
function getProps(tag, key, statics, n1, v1, n2, v2, n3, v3) {
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
    return fn && node && node.component && node.component[fn] ? node.component[fn].apply(open_vnode.component, args) : undefined;
}
function renderComponent(is_new, next_props) {
    if (is_new) {
        call(open_vnode, "render");
        return;
    }
    open_vnode.component.props = open_vnode.component.props || {};
    call(open_vnode, "componentWillReceiveProps", next_props, open_vnode.component.state);
    open_vnode.component.props = next_props;
    if (call(open_vnode, "shouldComponentUpdate", next_props) === false) {
        previous_vnode = next_vnode;
        next_vnode = open_vnode.kids[open_vnode.kids.indexOf(previous_vnode) + 1];
        return;
    }
    call(open_vnode, "componentWillUpdate", open_vnode.component.props, open_vnode.component.state);
    call(open_vnode, "render");
    call(open_vnode, "componentDidUpdate", open_vnode.component.props, open_vnode.component.state);
}
function sync(tag, key, statics, n1, v1, n2, v2, n3, v3) {
    previous_vnode = null;
    var reuse_vnode = next_vnode && next_vnode.key === key;
    if (reuse_vnode)
        if (typeof tag === "string")
            reuse_vnode = next_vnode.tag === tag || next_vnode.tag === tag.toLowerCase();
        else
            reuse_vnode = next_vnode.component && next_vnode.component.constructor["name"] === tag["name"];
    var replacing_child;
    var parent_node;
    var kids = open_vnode ? open_vnode.kids : null;
    if (!reuse_vnode) {
        replacing_child = next_vnode;
        next_vnode = key && open_vnode ? kids.filter(function (c) { return c.key === key; })[0] : null;
        if (!next_vnode)
            if (typeof tag === "function") {
                var fn = tag.bind.apply(tag, [null].concat([]));
                next_vnode = { parent: open_vnode, node: null, tag: tag["name"], key: key, attrs: {}, component: new fn(), kids: [] };
                call(next_vnode, "componentWillMount");
            }
            else {
                var doc = open_vnode && open_vnode.node ? open_vnode.node.ownerDocument : document;
                next_vnode = { parent: open_vnode, node: tag === "#text" ? doc.createTextNode("") : doc.createElement(tag), tag: tag.toLowerCase(), key: key, attrs: {}, kids: [] };
            }
        if (open_vnode) {
            kids.splice(replacing_child ? kids.indexOf(replacing_child) : kids.length, 0, next_vnode);
            parent_node = open_vnode.node;
        }
    }
    open_vnode = next_vnode;
    next_vnode = open_vnode.kids[0];
    var next_props = getProps.apply(null, arguments);
    if (reuse_vnode) {
        if (open_vnode.component)
            renderComponent(!reuse_vnode, next_props);
        return;
    }
    if (open_vnode.component) {
        var state = call(open_vnode, "getState");
        call(open_vnode, "setState", state);
        open_vnode.component.props = next_props;
        renderComponent(!reuse_vnode, next_props);
    }
    renderNode(parent_node, key, kids, replacing_child);
}
function renderNode(parent_node, key, kids, replacing_child) {
    if (open_vnode.component) {
        if (!previous_vnode)
            throw new Error("component didn't call any elements");
        open_vnode.node = previous_vnode.node;
        open_vnode.node["__reactiv_view_node"] = open_vnode;
    }
    if (parent_node && open_vnode.node) {
        if (key)
            kids.filter(function (c) { return c.key === key; }).forEach(function (c) { return c.node = open_vnode.node; });
        // If the node has a key, remove it from the DOM to prevent a large number of re-orders in the case that it moved far or was completely removed. Since we hold on to a reference through the keyMap, we can always add it back.
        if (replacing_child && replacing_child.node && replacing_child.key)
            parent_node.replaceChild(open_vnode.node, replacing_child.node);
        else
            parent_node.insertBefore(open_vnode.node, replacing_child ? replacing_child.node : null);
    }
    if (open_vnode.component && open_vnode.node)
        call(open_vnode, "componentDidMount");
}
