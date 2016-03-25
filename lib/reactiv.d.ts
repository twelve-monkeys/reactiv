export declare class Component<P, S> {
    props: P;
    state: S;
    constructor(props: P);
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(): boolean;
    componentWillReceiveProps(next_props: any): void;
    render(): void;
    setState(state: S): void;
}
export declare function patch(element: Element, fn: () => void): void;
export declare function elementVoid(tag: string, key?: string, statics?: any, a1?: any, a2?: any, a3?: any, a4?: any, a5?: any, a6?: any): void;
export declare function text(value: any, formatters?: ((value) => string)[]): void;
export declare function elementOpen(tag: string | Function, key?: string, statics?: any[], n1?: any, v1?: any, n2?: any, v2?: any, n3?: any, v3?: any): void;
export declare function elementClose(): void;
