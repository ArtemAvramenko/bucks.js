declare var module: (...modules: any[]) => any;

declare var define: {
    (dependencies: string[], factory: () => Bucks.Static);
    amd: any;
}

(function (factory: () => Bucks.Static) {
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

    function createBucks(elements?: Element[], isList?: boolean): Bucks.SingleMethods<Element> {

        var bucks = <Bucks.SingleMethods<Element>>(function(selector: string | Element | Element[]): Bucks.SingleMethods<Element> {
            if (typeof selector === 'string') {
                return bucks.find(selector);
            }
            if (selector instanceof Array) {
                return createBucks(selector, true);
            }
            return createBucks([<Element>selector], false);
        });

        if (elements && (elements.length == 0 || !elements[0])) {
            elements = undefined;
        }

        if (isList) {
            (<Bucks.ListResult<Element>>bucks).found = elements;
            (<Bucks.ListResult<Element>>bucks).maybe = elements || [];
        }
        else {
            if (elements) {
                var found = elements[0];
            }
            (<Bucks.SingleResult<Element>>bucks).found = found;
            (<Bucks.SingleResult<Element>>bucks).maybe = found || <Element>{};
        }

        elements = elements || [];
        bucks.all = createBucksList(elements);

        bucks.find = (selector: string) => {
            return find(el => el.querySelector(selector));
        }

        bucks.closest = (selector: string) => {
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

        bucks.visible = () => {
            return find(el => isVisible(el));
        }

        bucks.withAttribute = (attributeName: string, pattern: RegExp) => {
            return find(el => isAttributeMatches(el, attributeName, pattern));
        }

        bucks.getAttribute = (attributeName: string) => {
            var el = elements[0];
            if (el) {
                return el.getAttribute(attributeName) || '';
            }
            return '';
        }

        return bucks;

        function find(searcher: (el: Element) => Element | boolean) {
            for (var el of elements) {
                var res = searcher(el);
                if (res) {
                    if (res === true) {
                        res = el;
                    }
                    return <Bucks.SingleResult<Element>>createBucks([<Element>res]);
                }
            };
            return <Bucks.SingleResult<Element>>createBucks();
        }
    }

    function createBucksList(elements: Element[]) {

        var bucks = <Bucks.ListMethods<Element>><any>((selector: string) => bucks.find(selector));

        bucks.find = (selector: string) => {
            return find(el => el.querySelectorAll(selector));
        }

        bucks.visible = () => {
            return find(el => isVisible(el));
        }

        bucks.withAttribute = (attributeName: string, pattern: RegExp) => {
            return find(el => isAttributeMatches(el, attributeName, pattern));
        }

        return bucks;

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
            return <Bucks.ListResult<Element>>createBucks(all, true);
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

    var $$ = <Bucks.Static>createBucks([<Element><Node>document])
    return $$;
  });
