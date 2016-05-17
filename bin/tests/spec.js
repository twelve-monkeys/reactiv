"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./jasmine.d.ts" />
var jsx = require("../reactiv");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHVDQUF1QztBQUN2QyxJQUFZLEdBQUcsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQWlCbEM7SUFBc0IsMkJBQWlDO0lBQXZEO1FBQXNCLDhCQUFpQztJQU12RCxDQUFDO0lBTEcsd0JBQU0sR0FBTjtRQUNJLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3RILEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQUFDLEFBTkQsQ0FBc0IsR0FBRyxDQUFDLFNBQVMsR0FNbEM7QUFXRDtJQUF3Qiw2QkFBNkM7SUFDakUsbUJBQVksS0FBcUI7UUFDN0Isa0JBQU0sS0FBSyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNELDBCQUFNLEdBQU47UUFDSSxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQWMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ25JLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUFSRCxD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RUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQTtRQUVELEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ1osR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDMUQsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3RELElBQUksU0FBUyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRCxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDWixHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztRQUVILFNBQVMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHNDQUFzQyxFQUFFO1FBQ3ZDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGNBQU0sT0FBQSxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUF0QixDQUFzQixDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQWlCLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUN4RCxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxjQUFNLE9BQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLCtCQUErQixDQUFDLENBQUM7SUFDakUsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMscUNBQXFDLEVBQUU7UUFDdEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsY0FBTSxPQUFBLEdBQUcsQ0FBQyxXQUFXLENBQUMsU0FBZ0IsQ0FBQyxFQUFqQyxDQUFpQyxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxjQUFNLE9BQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFnQixDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxjQUFNLE9BQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFnQixDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdDQUF3QyxFQUFFO1FBQ3pDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGNBQU0sT0FBQSxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQWdCLENBQUMsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxjQUFNLE9BQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFnQixDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsdUNBQXVDLEVBQUU7UUFDeEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsY0FBTSxPQUFBLEdBQUcsQ0FBQyxXQUFXLENBQUMsU0FBZ0IsQ0FBQyxFQUFqQyxDQUFpQyxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGNBQU0sT0FBQSxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQWdCLENBQUMsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywwQ0FBMEMsRUFBRTtRQUMzQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxjQUFNLE9BQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFnQixDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsY0FBTSxPQUFBLEdBQUcsQ0FBQyxXQUFXLENBQUMsU0FBZ0IsQ0FBQyxFQUFqQyxDQUFpQyxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHlDQUF5QyxFQUFFO1FBQzFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGNBQU0sT0FBQSxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQWdCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsR0FBRyxDQUFDLEVBQTFFLENBQTBFLENBQUMsQ0FBQztRQUNsRyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsY0FBTSxPQUFBLEdBQUcsQ0FBQyxXQUFXLENBQUMsU0FBZ0IsQ0FBQyxFQUFqQyxDQUFpQyxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdDQUF3QyxFQUFFO1FBQ3pDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGNBQU0sT0FBQSxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQWdCLENBQUMsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxjQUFNLE9BQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFnQixDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsY0FBTSxPQUFBLElBQUksRUFBSixDQUFJLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMkNBQTJDLEVBQUU7UUFDNUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsY0FBTSxPQUFBLEdBQUcsQ0FBQyxXQUFXLENBQUMsU0FBZ0IsQ0FBQyxFQUFqQyxDQUFpQyxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGNBQU0sT0FBQSxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQWdCLENBQUMsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx1REFBdUQsRUFBRTtRQUN4RCxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxjQUFNLE9BQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFnQixDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO0lBQzdHLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdEQUF3RCxFQUFFO1FBQ3pELEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGNBQU0sT0FBQSxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQWdCLENBQUMsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO1FBQ3pELFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsY0FBTSxPQUFBLEdBQUcsQ0FBQyxXQUFXLENBQUMsU0FBZ0IsQ0FBQyxFQUFqQyxDQUFpQyxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsMkdBQTJHLENBQUMsQ0FBQztJQUN0SixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtRQUNqQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxjQUFNLE9BQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFnQixDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQztRQUN6RCxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsY0FBTSxPQUFBLEdBQUcsQ0FBQyxXQUFXLENBQUMsU0FBZ0IsQ0FBQyxFQUFqQyxDQUFpQyxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0RBQW9ELENBQUMsQ0FBQztRQUMzRixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBQ3RFLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHlEQUF5RCxFQUFFO1FBQzFELEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGNBQU0sT0FBQSxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQWdCLENBQUMsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO1FBQ3pELFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsY0FBTSxPQUFBLElBQUksRUFBSixDQUFJLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ2pFLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHFCQUFxQixFQUFFO1FBQ3RCLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ1osR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFnQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBRWxFLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFckMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDWixHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUV0RCxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw4QkFBOEIsRUFBRTtRQUMvQixJQUFNLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRW5DLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ1osR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFnQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsa0NBQWtDLENBQUMsQ0FBQztRQUMvRyxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLCtEQUErRCxDQUFDLENBQUM7SUFDakcsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsU0FBUyxFQUFFO1FBQ1YsSUFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVuQyxJQUFNLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsT0FBTyxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUM7WUFDcEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7Z0JBQ1osT0FBQSxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQWdCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGFBQWEsR0FBRyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUM7WUFBcEosQ0FBb0osQ0FBQyxDQUFDO1FBQzlKLENBQUM7UUFFRCxJQUFNLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQztRQUU5QyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxVQUFVLEdBQUcsUUFBUSxHQUFHLFFBQVEsR0FBRyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7UUFDdkksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxpQkFBaUIsRUFBRTtRQUNsQixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUNaLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUVqRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLGtDQUFrQyxDQUFDLENBQUE7UUFFcEYsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDWixHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLHNGQUFzRixDQUFDLENBQUM7SUFDeEgsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtJQUMzQixFQUFFLENBQUMsa0JBQWtCLEVBQUU7UUFDbkIsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDWixHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLHFCQUFxQixFQUFFO1FBQ3RCLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ3pCLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLGdDQUFnQyxFQUFFO1FBQ2pDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ3pCLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHNDQUFzQyxFQUFFO1FBQ3ZDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ3RCLEdBQUcsQ0FBQyxXQUFXLENBQUMsU0FBZ0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLGtDQUFrQyxDQUFDLENBQUM7UUFDbEgsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFDO1lBQ3pCLEdBQUcsQ0FBQyxXQUFXLENBQUMsU0FBZ0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLGtDQUFrQyxDQUFDLENBQUM7UUFDbEgsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QyxDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDIn0=