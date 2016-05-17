export const version = 0.1;

interface IComponent {
    componentWillMount?: (props?: any, state?: any) => void;
    componentDidMount?: (props?: any, state?: any) => void;
    componentWillUnmount?: (props?: any, state?: any) => void;
    componentWillUpdate?: (next_props?: any, next_state?: any) => void;
    componentDidUpdate?: (props?: any, state?: any) => void;
    componentWillReceiveProps: (next_props: any, next_state?: any) => void;
    shouldComponentUpdate: (next_props?: any, next_state?: any) => boolean;
    render: (props?: any, state?: any) => any;
    props: any;
    state: any;
    getState(): any;
    setState(state: any);
}

interface VNode {
    parent: VNode;
    key?: string;
    tag: string;
    attrs: { [name: string]: any };
    node?: Node;
    component?: IComponent;
    kids: VNode[];
    text?: string;
}

let root: VNode;
let just_patched: VNode;
let patching: VNode;
let patch_next: VNode;

export class Component<P, S> {
    state: S;
    constructor(public props: P) {
        <IComponent>this; // ninja implements without needing to export
    }
    componentWillMount(props?: any, state?: any) { };
    componentDidMount(props?: any, state?: any) { };
    componentWillUnmount(props?: any, state?: any) { };
    shouldComponentUpdate(next_props?: any, next_state?: any) { return true; }
    componentWillReceiveProps(next_props?: any, next_state?: any) { };
    render() { };
    getState() {
        return this.state;
    }
    setState(state: S) {
        this.state = state;
    }
}

let html = "";

export function patch(element: Element, fn: () => void|string) {
    let node = (element ? element["__reactiv_view_node"] : null) as VNode;
    if (!node && element)
        element["__reactiv_view_node"] = node = {
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

let closingHtml = [];

export function elementVoid(tag: string, key?: string, statics?, a1?, a2?, a3?, a4?, a5?, a6?) {
    elementOpen.apply(null, arguments);
    elementClose.apply(null, arguments);
}

export function text(value: any, formatters?: ((value) => string)[]) {
    if (!root) {
        html += value;
        return;
    }

    const node = _elementOpen("#text", null, null);
    if (node.text !== value) {
        let formatted = node.text = value;
        for (let i = 1; i < arguments.length; i++) {
            const formatter = arguments[i];
            if (formatter)
                formatted = formatter(formatted);
        }
        (node.node as any).data = formatted;
    }
    elementClose();
}

export function elementOpen(tag: string | Function, key?: string, statics?: any[], n1?, v1?, n2?, v2?, n3?, v3?) {
    _elementOpen.apply(null, arguments);
}

function sync_arg(node: HTMLElement, name: string, value: any) {
    if (value === null || value === undefined)
        return false;

    let existing_value = patching.attrs[name];
    switch (name) {
        case "style":
            if (!root) {
                html += " style=\"";
                let first = true;
                for (let key in value)
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

            const style = node.style;

            const visited_style: { [name: string]: boolean } = {};
            for (let prop in <Object>value) {
                const prop_value = value[prop];
                visited_style[prop] = true;
                if (!existing_value || existing_value[prop] !== prop_value) {
                    style[prop] = prop_value;
                    (patching.attrs[name] = existing_value = existing_value || {})[prop] = prop_value;
                }
            }

            for (let prop in existing_value)
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
                    ((fn: (event) => void) => {
                        const event_name = name.slice(2).toLowerCase();
                        if (existing_value !== fn)
                            patching.node.removeEventListener(event_name, existing_value);
                        patching.node.addEventListener(event_name, fn);
                    })(value);
            } else if (!patching.component)
                if (root)
                    node.setAttribute(name, value);
                else
                    html += " " + name + "=\"" + value + "\"";
            break;
    }
    return true;
};


function _elementOpen(tag: string | Function, key?: string, statics?: any[], n1?, v1?, n2?, v2?, n3?, v3?) {

    sync.apply(null, arguments);

    //    if (patching.component)
    //        return patching;

    const visited = {};
    let node = patching.node as HTMLElement;

        if (statics)
            for (let i = 0; i < statics.length; i += 2)
                if (sync_arg(node, statics[i], statics[i + 1]))
                    visited[statics[i]] = true;

    if (root || typeof tag === "string")
    for (let i = 3; i < arguments.length; i += 2)
        if (sync_arg(node, arguments[i], arguments[i + 1]))
            visited[arguments[i]] = true;

    if (!root && typeof tag === "string")
        html += ">";

    for (let name in patching.attrs)
        if (!visited[name]) {
            if (name.slice(0, 2) === "on" && typeof patching.attrs[name] === "function")
                node.removeEventListener(name.slice(2).toLowerCase(), patching.attrs[name]);
            else if (!patching.component)
                if (root)
                    (patching.node as HTMLElement).removeAttribute(name);

            delete patching.attrs[name];
        }

    return patching;
}

export function elementClose() {
    if (!root) {
        if (closingHtml.length)
            html += closingHtml.pop();
        return;
    }
    if (patching) {
        const kids = patching.kids;
        while (true) {
            const child = kids[kids.length - 1];
            if (!child || child === just_patched)
                break;

            if (child.component && child.component.componentWillUnmount)
                child.component.componentWillUnmount();

            patching.node.removeChild(child.node);
            kids.splice(kids.indexOf(child), 1);
        }
        for (let child of kids.slice())
            if (child.parent !== patching)
                kids.splice(kids.indexOf(child), 1);
    }

    just_patched = patching;
    patch_next = (patching && patching.parent) ? patching.parent.kids[patching.parent.kids.indexOf(patching) + 1] : undefined;
    patching = patching ? patching.parent : null;
}

function getProps(tag: string | Function, key?: string, statics?: any[], n1?, v1?, n2?, v2?, n3?, v3?) {
    patching = patch_next;
    patch_next = patching.kids[0];

    const props = {};
    if (statics)
        for (let i = 0; i < statics.length; i += 2) {
            let name = statics[i];
            let value = statics[i + 1];

            if (value !== null && value !== undefined)
                props[name] = value;
        }
    for (let i = 3; i < arguments.length; i += 2) {
        let name = arguments[i];
        let value = arguments[i + 1];

        if (value !== null && value !== undefined)
            props[name] = value;
    }
    return props;
}

function call(node: VNode, fn: string, ...args: any[]): any {
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

function sync(tag: string | Function, key?: string, statics?: any[], n1?, v1?, n2?, v2?, n3?, v3?) {
    just_patched = null;

    let reuse_vnode = patch_next && patch_next.key === key;
    if (reuse_vnode)
        if (typeof tag === "string")
            reuse_vnode = patch_next.tag === tag || patch_next.tag === tag.toLowerCase();
        else
            reuse_vnode = patch_next.component && patch_next.component.constructor["name"] === tag["name"];

    let replacing_child: VNode;
    let parent_node: Node;

    const kids = patching ? patching.kids : null;

    if (reuse_vnode) {
        const next_props = getProps.apply(null, arguments);
        if (patching.component)
            renderComponent(!reuse_vnode, next_props);
        return;
    }

    replacing_child = patch_next;

    patch_next = key && patching ? kids.filter(c => c.key === key)[0] : null;

    let create_component = false;

    if (!patch_next)
        if (typeof tag === "function") {
            patch_next = { parent: patching, node: null, tag: tag["name"], key, attrs: {}, component: null, kids: [] };
            create_component = true;
        } else {
            if (!root) {
                html += "<" + tag;
                closingHtml.push("</" + tag + ">");
            }
            const doc = patching && patching.node ? patching.node.ownerDocument : document;
            patch_next = { parent: patching, node: tag === "#text" ? doc.createTextNode("") : doc.createElement(tag as string), tag: (tag as string).toLowerCase(), key, attrs: {}, kids: [] };
        }

    if (patching) {
        kids.splice(replacing_child ? kids.indexOf(replacing_child) : kids.length, 0, patch_next);
        parent_node = patching.node;
    }

    const next_props = getProps.apply(null, arguments);

    if (create_component) {
        const fn = (tag as Function).bind.apply(tag, [null].concat([]));
        patching.component =  new fn();
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
        patching.node["__reactiv_view_node"] = patching;
    }

    if (parent_node && patching.node) {
        if (key)
            kids.filter(c => c.key === key).forEach(c => c.node = patching.node);

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
