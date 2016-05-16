/// <reference path="./jasmine.d.ts" />
import * as jsx from "../reactiv";

// describe("a test", () => {
//     it("exists", () => {
        
//         expect(jsx.version).toBe(42);
//     })
// })



interface messageProps {
    importance: number;
    message: string;
}


class message extends jsx.Component<messageProps, void> {
    render() {
        jsx.elementOpen("div", null, null, "style", { display: "inline", color: this.props.importance > 5 ? "red" : "gray" });
        jsx.text(this.props.message);
        jsx.elementClose();
    }
}

interface importantProps {
    importance: number;
    name: string;
}

interface importantState {
    tired: boolean;
}

class important extends jsx.Component<importantProps, importantState> {
    constructor(props: importantProps) {
        super(props);
        this.setState({ tired: false });
    }
    render() {
        jsx.elementVoid(message as any, null, null, "importance", this.props.importance, "message", this.state.tired ? "tired" : "ok");
    }
}

let lc_methods = [];
let lc_constructor = 0; // check
let lc_componentWillMount = 0; // check
let lc_componentDidMount = 0; // check
let lc_componentWillReceiveProps = 0; // check
let lc_shouldComponentUpdate = 0; // check
let lc_componentWillUpdate = 0; // check
let lc_componentDidUpdate = 0; // check
let lc_componentWillUnmount = 0; // check
let lc_render = 0;// check

let freeze_message = false;
let set_state_on_construct = undefined;
let set_state_on_getState = undefined;
class lifecycle {
    state: any;

    constructor() {
        lc_methods.push("constructor");
        lc_constructor++;
        if (set_state_on_construct) {
            this.state = set_state_on_construct;
        }
    }

    getState() {
        return set_state_on_getState || {frodo:3};
    }

    componentWillMount() {
        lc_methods.push("componentWillMount");
        lc_componentWillMount++;
        // if (set_state_on_construct)
        //     if (this.state !== set_state_on_construct)
        //         throw new Error("state set when constructing should stay");
    }

    componentDidMount() {
        lc_methods.push("componentDidMount");
        lc_componentDidMount++;
    }

    componentWillReceiveProps(nextProps) {
        lc_methods.push("componentWillReceiveProps");
        lc_componentWillReceiveProps++;
    }

    shouldComponentUpdate(nextProps, nextState) {
        lc_methods.push("shouldComponentUpdate");
        lc_shouldComponentUpdate++;
        return !freeze_message;
    }

    componentWillUpdate(nextProps, nextState) {
        lc_methods.push("componentWillUpdate");
        lc_componentWillUpdate++;
    }

    componentDidUpdate(prevProps, prevState) {
        lc_methods.push("componentDidUpdate");
        lc_componentDidUpdate++;
    }

    componentWillUnmount() {
        lc_methods.push("componentWillUnmount");
        lc_componentWillUnmount++;
    }

    render() {
        lc_methods.push("render");
        lc_render++;
        jsx.elementVoid("div", null, null, "frozen", freeze_message ? "yes" : "no");
    }
}

function simulateClick(element: Element) {
    let simulateDivClick = document.createEvent('MouseEvents');
    simulateDivClick.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, null, null);
    return element.dispatchEvent(simulateDivClick);
}

describe("a patch", () => {
    let node: HTMLElement;
    let starting_html: string;

    let original_properties_of = [];

    let get_properties = (container) => Object.getOwnPropertyNames(container);

    beforeEach((done) => {
        starting_html = document.body.innerHTML;
        node = document.createElement("div");
        document.body.appendChild(node);
        setTimeout(() => {
            let conserve_properties_of = [window, document, document.body];
            original_properties_of = conserve_properties_of.map(container => get_properties(container))

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

    afterEach(() => {
        document.body.removeChild(node);
        expect(document.body.innerHTML.trim()).toBe(starting_html.trim());

        let conserve_properties_of = [window, document, document.body];
        let new_properties_of = conserve_properties_of.map(container => get_properties(container))

        expect(new_properties_of).toEqual(original_properties_of);
    });

    it("does nothing if nothing is rendered", () => {
        jsx.patch(node, () => null);
        expect(node.outerHTML).toBe("<div></div>");

        node.setAttribute("data-id", "3");
        node.innerHTML = "somestuff";

        jsx.patch(node, () => null);
        expect(node.outerHTML).toBe('<div data-id="3">somestuff</div>');
    });

    it("can use elementVoid to insert a div", () => {
        jsx.patch(node, () => {
            jsx.elementVoid("div");
        });
        expect(node.outerHTML).toBe("<div><div></div></div>");
    });

    it("will remove something", () => {
        jsx.patch(node, () => {
            jsx.elementOpen("span", null, null);
            jsx.elementClose();
        });
        expect(node.outerHTML).toBe("<div><span></span></div>");

        jsx.patch(node, () => null);

        expect(node.outerHTML).toBe("<div></div>");
    });


    it("can replace and add things", () => {
        jsx.patch(node, () => {
            jsx.elementOpen("div", null, null);
            jsx.elementClose();
        });

        jsx.patch(node, () => {
            jsx.elementOpen("div", null, null);
            jsx.elementClose();
            jsx.elementOpen("div", null, null);
            jsx.elementClose();
        });

        expect(node.outerHTML).toBe("<div><div></div><div></div></div>");
    });

    it("doesn't re-add the same div", () => {
        const fn = () =>
            jsx.patch(node, () => {
                jsx.elementOpen("div", null, null);
                jsx.elementClose();
            });

        for (let i = 0; i < 3; i++) {
            fn();
            expect(node.outerHTML).toBe("<div><div></div></div>");
        }
    });

    it("handles attributes", () => {
        jsx.patch(node, () => {
            jsx.elementOpen("div", null, null, 'id', 'the_id', "style", { color: 'red' });
            jsx.elementClose();
        });

        expect(node.outerHTML).toBe('<div><div id="the_id" style="color: red;"></div></div>');
    });

    it("mutates attributes", () => {
        const style = { color: 'red' } as any;
        jsx.patch(node, () => {
            jsx.elementOpen("div", null, null, 'id', 'the_id', "style", style);
            jsx.elementClose();
        });

        expect(node.outerHTML).toBe('<div><div id="the_id" style="color: red;"></div></div>');

        style.color = "blue";
        jsx.patch(node, () => {
            jsx.elementOpen("div", null, null, 'id', 'the_id', "style", style);
            jsx.elementClose();
        });

        style.backgroundColor = "red";
        delete style.color;

        jsx.patch(node, () => {
            jsx.elementOpen("div", null, null, 'id', 'the_id', "style", style);
            jsx.elementClose();
        });

        expect(node.outerHTML).toBe('<div><div id="the_id" style="background-color: red;"></div></div>');
    });

    it("adds attributes", () => {
        jsx.patch(node, () => {
            jsx.elementOpen("div", null, null, 'id', 'the_id');
            jsx.elementClose();
        });

        expect(node.outerHTML).toBe('<div><div id="the_id"></div></div>');

        jsx.patch(node, () => {
            jsx.elementOpen("div", null, null, 'id', 'the_id', "name", "fred");
            jsx.elementClose();
        });

        expect(node.outerHTML).toBe('<div><div id="the_id" name="fred"></div></div>');
    });

    it("removes attributes", () => {
        jsx.patch(node, () => {
            jsx.elementOpen("div", null, null, 'id', 'the_id', "name", "fred");
            jsx.elementClose();
        });

        expect(node.outerHTML).toBe('<div><div id="the_id" name="fred"></div></div>');

        jsx.patch(node, () => {
            jsx.elementVoid("div", null, null, 'id', 'the_id');
        });

        expect(node.outerHTML).toBe('<div><div id="the_id"></div></div>');
        jsx.patch(node, () => {
            jsx.elementVoid("div", null, ['id', 'the_id', 'frodo', '121'], 'data-frame', 'anterior');
        });

        expect(node.outerHTML).toBe('<div><div id="the_id" frodo="121" data-frame="anterior"></div></div>');
    });

    it("deals with a component", () => {
        jsx.patch(node, () => {
            jsx.elementVoid(lifecycle as any);
        });

        expect(node.outerHTML).toBe('<div><div frozen="no"></div></div>');
    });

    describe("with state set in the constructor", () => {
        beforeEach(() => {
            set_state_on_construct = {frodo:true};
        });
        
        afterEach(() => {
            set_state_on_construct = undefined;
        });
        
        it("doesn't call getState", () => {
            jsx.patch(node, () => {
                jsx.elementVoid(lifecycle as any);
            });
            let vnode = node["__reactiv_view_node"].kids[0];
           
            expect(vnode.component.state.frodo).toBe(true);
        });
    });
    
    describe("with state not set in the constructor", () => {
        beforeEach(() => {
            set_state_on_getState = {frodo:true};
        });
        
        afterEach(() => {
            set_state_on_getState = undefined;
        });
        
        it("calls getState", () => {
            jsx.patch(node, () => {
                jsx.elementVoid(lifecycle as any);
            });
            let vnode = node["__reactiv_view_node"].kids[0];
           
            expect(vnode.component.state.frodo).toBe(true);
        });
    });
    

    it("adds event handlers", () => {
        let prevent_click_default = false;
        let count = 0;

        const test_click = (event) => {
            count++;
            if (prevent_click_default)
                event.preventDefault();
        }

        jsx.patch(node, () => {
            jsx.elementVoid("div", null, ["onClick", test_click]);
        });

        expect(node.outerHTML).toBe('<div><div></div></div>');

        let cancelled = !simulateClick(node.children[0]);
        expect(cancelled).toBe(false);
        expect(count).toBe(1);

        prevent_click_default = true;
        cancelled = !simulateClick(node.children[0]);
        expect(cancelled).toBe(true);
        expect(count).toBe(2);

        jsx.patch(node, () => {
            jsx.elementVoid("div", null, ["onClick", test_click]);
        });

        prevent_click_default = false;
        cancelled = !simulateClick(node.children[0]);
        expect(cancelled).toBe(false);
        expect(count).toBe(3);
    });

    it("removes event handlers", () => {
        let prevent_click_default = false;
        let count = 0;

        const test_click = (event) => {
            count++;
            if (prevent_click_default)
                event.preventDefault();
        }

        jsx.patch(node, () => {
            jsx.elementVoid("div", null, ["onClick", test_click]);
        });

        expect(node.outerHTML).toBe('<div><div></div></div>');

        let cancelled = !simulateClick(node.children[0]);
        expect(cancelled).toBe(false);
        expect(count).toBe(1);

        prevent_click_default = true;
        cancelled = !simulateClick(node.children[0]);
        expect(cancelled).toBe(true);
        expect(count).toBe(2);

        jsx.patch(node, () => {
            jsx.elementVoid("div", null, null);
        });

        cancelled = !simulateClick(node.children[0]);
        expect(cancelled).toBe(false);
        expect(count).toBe(2);
    });

    it("changes event handlers", () => {
        let count = 0;

        const test_click = (event) => {
            count++;
        }

        const test_click2 = (event) => {
            count += 100;
            event.preventDefault();
        }

        jsx.patch(node, () => {
            jsx.elementVoid("div", null, ["onClick", test_click]);
        });

        expect(node.outerHTML).toBe('<div><div></div></div>');
        let cancelled = !simulateClick(node.children[0]);
        expect(cancelled).toBe(false);
        expect(count).toBe(1);

        jsx.patch(node, () => {
            jsx.elementVoid("div", null, ["onClick", test_click2]);
        });

        cancelled = !simulateClick(node.children[0]);
        expect(cancelled).toBe(true);
        expect(count).toBe(101);
    });

    it("allows elements to mutate themselves", () => {
        jsx.patch(node, () => jsx.elementVoid("div"));
        (node.children[0] as HTMLElement).innerHTML = "dynamic";
        jsx.patch(node, () => jsx.elementVoid("div"));
        expect(node.outerHTML).toBe('<div><div>dynamic</div></div>');
    });

    it("constructs components appropriately", () => {
        jsx.patch(node, () => jsx.elementVoid(lifecycle as any));
        expect(lc_constructor).toBe(1);
        jsx.patch(node, () => jsx.elementVoid(lifecycle as any));
        expect(lc_constructor).toBe(1);
        jsx.patch(node, () => null);
        expect(lc_constructor).toBe(1);
        jsx.patch(node, () => jsx.elementVoid(lifecycle as any));
        expect(lc_constructor).toBe(2);
    });

    it("calls componentWillMount appropriately", () => {
        jsx.patch(node, () => jsx.elementVoid(lifecycle as any));
        expect(lc_componentWillMount).toBe(1);
        jsx.patch(node, () => jsx.elementVoid(lifecycle as any));
        expect(lc_componentWillMount).toBe(1);
    });

    it("calls componentDidMount appropriately", () => {
        jsx.patch(node, () => jsx.elementVoid(lifecycle as any));
        expect(lc_componentDidMount).toBe(1);
        jsx.patch(node, () => jsx.elementVoid(lifecycle as any));
        expect(lc_componentDidMount).toBe(1);
    });

    it("calls componentWillUnmount appropriately", () => {
        jsx.patch(node, () => jsx.elementVoid(lifecycle as any));
        expect(lc_componentWillUnmount).toBe(0);
        jsx.patch(node, () => jsx.elementVoid(lifecycle as any));
        expect(lc_componentWillUnmount).toBe(0);
        jsx.patch(node, () => null);
        expect(lc_componentWillUnmount).toBe(1);
    });

    it("calls componentWillUpdate appropriately", () => {
        jsx.patch(node, () => jsx.elementVoid(lifecycle as any, undefined, undefined, "data-index", "1"));
        expect(lc_componentWillUpdate).toBe(0);
        jsx.patch(node, () => jsx.elementVoid(lifecycle as any));
        expect(lc_componentWillUpdate).toBe(1);
        jsx.patch(node, () => null);
        expect(lc_componentWillUpdate).toBe(1);
    });

    it("calls componentDidUpdate appropriately", () => {
        jsx.patch(node, () => jsx.elementVoid(lifecycle as any));
        expect(lc_componentDidUpdate).toBe(0);
        jsx.patch(node, () => jsx.elementVoid(lifecycle as any));
        expect(lc_componentDidUpdate).toBe(1);
        jsx.patch(node, () => null);
        expect(lc_componentDidUpdate).toBe(1);
    });

    it("calls shouldComponentUpdate appropriately", () => {
        jsx.patch(node, () => jsx.elementVoid(lifecycle as any));
        expect(lc_shouldComponentUpdate).toBe(0);
        jsx.patch(node, () => jsx.elementVoid(lifecycle as any));
        expect(lc_shouldComponentUpdate).toBe(1);
        jsx.patch(node, () => null);
        expect(lc_shouldComponentUpdate).toBe(1);
    });

    it("calls mounting lifecycle methods in the correct order", () => {
        jsx.patch(node, () => jsx.elementVoid(lifecycle as any));
        expect(lc_methods.join(" => ")).toBe("constructor => componentWillMount => render => componentDidMount");
    });

    it("calls re-render lifecycle methods in the correct order", () => {
        jsx.patch(node, () => jsx.elementVoid(lifecycle as any));
        lc_methods = [];
        jsx.patch(node, () => jsx.elementVoid(lifecycle as any));
        expect(lc_methods.join(" => ")).toBe("componentWillReceiveProps => shouldComponentUpdate => componentWillUpdate => render => componentDidUpdate");
    });

    it("respects shouldComponentUpdate", () => {
        jsx.patch(node, () => jsx.elementVoid(lifecycle as any));
        lc_methods = [];
        freeze_message = true;
        jsx.patch(node, () => jsx.elementVoid(lifecycle as any));
        expect(lc_methods.join(" => ")).toBe("componentWillReceiveProps => shouldComponentUpdate");
        expect(node.outerHTML).toBe('<div><div frozen="no"></div></div>');
    });

    it("calls unmounting lifecycle methods in the correct order", () => {
        jsx.patch(node, () => jsx.elementVoid(lifecycle as any));
        lc_methods = [];
        jsx.patch(node, () => null);
        expect(lc_methods.join(" => ")).toBe("componentWillUnmount");
    });

    it("unmounts components", () => {
        jsx.patch(node, () => {
            jsx.elementVoid(lifecycle as any, null, null, null);
        });

        expect(node.outerHTML).toBe('<div><div frozen="no"></div></div>');

        expect(lc_componentWillMount).toBe(1);
        expect(lc_componentDidMount).toBe(1);

        jsx.patch(node, () => {
            jsx.elementVoid("div", null, null, null);
        });

        expect(node.outerHTML).toBe('<div><div></div></div>');

        expect(lc_componentWillMount).toBe(1);
        expect(lc_componentDidMount).toBe(1);
        expect(lc_componentWillUnmount).toBe(1);
    });

    it("recognises nested components", () => {
        const start = new Date().getTime();

        jsx.patch(node, () => {
            jsx.elementVoid(important as any, null, null, "importance", 7, "name", "bond, jimmy-bob melon-field bond");
        });

        expect(node.outerHTML).toBe('<div><div style="display: inline; color: red;">ok</div></div>');
    });

    it("is fast", () => {
        const start = new Date().getTime();

        const iterations = 10000;
        let i = 0;
        while (i < iterations) {
            jsx.patch(node, () =>
                jsx.elementVoid(important as any, null, null, "importance", (i++) % 10, "name", "bond, jimmy-bob " + (i % 2 ? "melon-field" : "princess") + " bond"));
        }

        const duration = new Date().getTime() - start;

        console.log("benchmark: " + iterations + " took " + duration + " ms = " + (Math.ceil(duration / iterations * 10000) / 10) + " us per");
        expect(duration).toBeLessThan(2500);
    });

    it("deals with keys", () => {
        jsx.patch(node, () => {
            jsx.elementVoid("div", "1", null, "id", "iamme");
        });

        expect(node.outerHTML).toBe('<div><div id="iamme"></div></div>');

        node.children.item(0).setAttribute("data-added", "item changed outside of renderer")

        jsx.patch(node, () => {
            jsx.elementVoid("div", "1", null, "id", "iamstillme");
        });

        expect(node.outerHTML).toBe('<div><div id="iamstillme" data-added="item changed outside of renderer"></div></div>');
    });
});

describe("a render into text", () => {
    it("should not crash", () =>{
        jsx.patch(null, () => {
            jsx.elementVoid("div", "1", null, "id", "iamme");
        });
    });
    it("should return a div", () =>{
        var result = jsx.patch(null, () => {
            jsx.elementVoid("div");
        });
        
        expect(result).toBe("<div></div>");
    });
    it("should return a div with an id", () =>{
        var result = jsx.patch(null, () => {
            jsx.elementVoid("div", null, null, "id","uno");
        });
        
        expect(result).toBe("<div id=\"uno\"></div>");
    });
    
    it("should return a div with a component", () =>{
        var result = jsx.patch(null, () => {
               jsx.elementVoid(important as any, null, null, "importance", 7, "name", "bond, jimmy-bob melon-field bond");
        });

        expect(result).toBe('<div style="display: inline; color: red;">ok</div>');
 });
});