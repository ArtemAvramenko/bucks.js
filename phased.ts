declare var module: (...modules: any[]) => any;

declare var define: {
    (dependencies: string[], factory: () => Phased.Static);
    amd: any;
}

(function(factory: () => Phased.Static) {
    if (typeof module === "object" && (<any>module).exports) {
        (<any>module).exports = factory();
    }
    else if (typeof define === "function" && define.amd) {
        define([], factory)
    }
    else {
        (<any>this).$$ = factory();
    }
})(function() {

    function createResult(elements?: Element[], isList?: boolean): Phased.SingleMethods<Element> {

        var result = <Phased.SingleMethods<Element>>(function(selector: string | Element | Element[]): Phased.SingleMethods<Element> {
            if (typeof selector === 'string') {
                return result.find(selector);
            }
            if (selector instanceof Array) {
                return createResult(selector, true);
            }
            return createResult([<Element>selector], false);
        });

        if (elements && (elements.length == 0 || !elements[0])) {
            elements = undefined;
        }

        if (isList) {
            (<Phased.ListResult<Element>>result).found = elements;
            (<Phased.ListResult<Element>>result).maybe = elements || [];
        }
        else {
            if (elements) {
                var found = elements[0];
            }
            (<Phased.SingleResult<Element>>result).found = found;
            (<Phased.SingleResult<Element>>result).maybe = found || <Element>{};
        }

        elements = elements || [];
        result.all = createListMethods(elements);

        result.find = (selector: string) => {
            return find(el => el.querySelector(selector));
        }

        result.closest = (selector: string) => {
            var results = $$.all(selector).found;
            return find(el => {
                if (results) {
                    while (el) {
                        if (results.indexOf(el) >= 0) {
                            return el;
                        }
                        el = el.parentElement;
                    }
                }
            });
        }

        result.visible = () => {
            return find(el => isVisible(el));
        }

        result.withAttribute = (attributeName: string, pattern: RegExp) => {
            return find(el => isAttributeMatches(el, attributeName, pattern));
        }

        result.getAttribute = (attributeName: string) => {
            var el = elements[0];
            if (el) {
                return el.getAttribute(attributeName) || '';
            }
            return '';
        }

        return result;

        function find(searcher: (el: Element) => Element | boolean) {
            for (var el of elements) {
                var res = searcher(el);
                if (res) {
                    if (res === true) {
                        res = el;
                    }
                    return <Phased.SingleResult<Element>>createResult([<Element>res]);
                }
            };
            return <Phased.SingleResult<Element>>createResult();
        }
    }

    function createListMethods(elements: Element[]) {

        var listMethods = <Phased.ListMethods<Element>><any>((selector: string) => listMethods.find(selector));

        listMethods.find = (selector: string) => {
            return find(el => el.querySelectorAll(selector));
        }

        listMethods.visible = () => {
            return find(el => isVisible(el));
        }

        listMethods.withAttribute = (attributeName: string, pattern: RegExp) => {
            return find(el => isAttributeMatches(el, attributeName, pattern));
        }

        return listMethods;

        function find(searcher: (el: Element) => NodeListOf<Element> | boolean) {
            var all = <Element[]>[];
            for (var el of elements) {
                var res = searcher(el);
                if (res === true) {
                    all.push(el);
                } else if (res) {
                    var len = (<NodeListOf<Element>>res).length;
                    for (var i = 0; i < len; i++) {
                        all.push(res[i]);
                    }
                }
            };
            return <Phased.ListResult<Element>>createResult(all, true);
        }
    }

    function isVisible(el: Element) {
        while (el) {
            if (el === document.body) {
                return true;
            }
            if (!el) {
                return false;
            }
            let style = (<HTMLElement>el).style;
            if (style && (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0')) {
                return false;
            }
            el = el.parentElement;
        }
        return false;
    }

    function isAttributeMatches(el: Element, attributeName: string, pattern: RegExp) {
        return pattern.test(el.getAttribute(attributeName))
    }

    var $$ = <Phased.Static>createResult([<Element><Node>document])
    return $$;
});
