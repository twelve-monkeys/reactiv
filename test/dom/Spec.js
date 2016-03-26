/// <reference path="../../typings/tsd.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var jsx = require("../../reactiv");
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
var lifecycle = (function () {
    function lifecycle() {
        lc_methods.push("constructor");
        lc_constructor++;
    }
    lifecycle.prototype.componentWillMount = function () {
        lc_methods.push("componentWillMount");
        lc_componentWillMount++;
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
        jsx.patch(node, function () { return jsx.elementVoid(lifecycle); });
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
        expect(duration).toBeLessThan(250);
    });
    it("deals with keys", function () {
        jsx.patch(node, function () {
            jsx.elementVoid("div", "1", null, "id", "iamme");
        });
        expect(node.outerHTML).toBe('<div><div id="iamme"></div></div>');
        jsx.patch(node, function () {
            jsx.elementVoid("div", "1", null, "id", "iamstillme");
        });
        expect(node.outerHTML).toBe('<div><div id="iamstillme"></div></div>');
    });
});
