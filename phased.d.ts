declare module Phased {

    export interface SingleMethods<TFound extends Element> {
        <T extends Element>(selector: string): SingleResult<T>;
        find<T extends Element>(selector: string): SingleResult<T>;
        find<T extends Element>(searcher: (el: TFound) => T): SingleResult<T>;
        find(searcher: (el: TFound) => boolean): SingleResult<TFound>;
        visible(): SingleResult<TFound>;
        withAttribute(attributeName: string, regExp: RegExp): SingleResult<TFound>;
        getAttribute(attributeName: string): string;
        closest<T extends Element>(selector: string): SingleResult<T>;
        all: ListMethods<TFound>;
    }

    export interface ListMethods<TFound extends Element> {
        <T extends Element>(selector: string): ListResult<T>;
        find<T extends Element>(selector: string): ListResult<T>;
        find<T extends Element>(searcher: (el: TFound) => ArrayLike<T>): ListResult<T>;
        find(searcher: (el: TFound) => boolean): ListResult<TFound>;
        visible(): ListResult<TFound>;
        withAttribute(attributeName: string, regExp: RegExp): ListResult<TFound>;
    }

    export interface SingleResult<T extends Element> extends SingleMethods<T> {
        found: T;
        maybe: T;
    }

    export interface ListResult<T extends Element> extends SingleMethods<T> {
        found: T[];
        maybe: T[];
    }

    export interface Static extends SingleMethods<Element> {
        <T extends Element>(element: T): SingleResult<T>;
        <T extends Element>(element: T[]): ListResult<T>;
    }
}

declare var $$: Phased.Static;
