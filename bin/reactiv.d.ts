export declare const version: number;
export declare class Component<P, S> {
    props: P;
    state: S;
    constructor(props: P);
    componentWillMount(props?: any, state?: any): void;
    componentDidMount(props?: any, state?: any): void;
    componentWillUnmount(props?: any, state?: any): void;
    shouldComponentUpdate(next_props?: any, next_state?: any): boolean;
    componentWillReceiveProps(next_props?: any, next_state?: any): void;
    render(): void;
    getState(): S;
    setState(state: S): void;
}
export declare function patch(element: Element, fn: () => void | string): string;
export declare function elementVoid(tag: string, key?: string, statics?: any[], a1?: string, a2?: any, a3?: string, a4?: any, a5?: string, a6?: any): void;
export declare function text(value: any, formatters?: ((value: any) => string)[]): void;
export declare function elementOpen(tag: string | Function, key?: string, statics?: any[], n1?: string, v1?: any, n2?: string, v2?: any, n3?: string, v3?: any): void;
export declare function elementClose(): void;
