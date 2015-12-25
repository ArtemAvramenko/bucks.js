(function (factory) {
    if (typeof module === "object" && module.exports) {
        module.exports = factory();
    }
    else if (typeof define === "function" && define.amd) {
        define([], factory);
    }
    else {
        this.$$ = factory();
    }
})(function () {
    function createResult(elements, isList) {
        var result = (function (selector) {
            if (typeof selector === 'string') {
                return result.find(selector);
            }
            if (selector instanceof Array) {
                return createResult(selector, true);
            }
            return createResult([selector], false);
        });
        if (elements && (elements.length == 0 || !elements[0])) {
            elements = undefined;
        }
        if (isList) {
            result.found = elements;
            result.maybe = elements || [];
        }
        else {
            if (elements) {
                var found = elements[0];
            }
            result.found = found;
            result.maybe = found || {};
        }
        elements = elements || [];
        result.all = createListMethods(elements);
        result.find = function (selector) {
            var searcher;
            if (typeof selector === 'function') {
                searcher = selector;
            }
            else {
                searcher = function (el) { return el.querySelector(selector); };
            }
            return find(searcher);
        };
        result.closest = function (selector) {
            var results = $$.all(selector).found;
            return find(function (el) {
                if (results) {
                    while (el) {
                        if (results.indexOf(el) >= 0) {
                            return el;
                        }
                        el = el.parentElement;
                    }
                }
            });
        };
        result.visible = function () {
            return find(function (el) { return isVisible(el); });
        };
        result.withAttribute = function (attributeName, pattern) {
            return find(function (el) { return isAttributeMatches(el, attributeName, pattern); });
        };
        result.getAttribute = function (attributeName) {
            var el = elements[0];
            if (el) {
                return el.getAttribute(attributeName) || '';
            }
            return '';
        };
        return result;
        function find(searcher) {
            for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                var el = elements_1[_i];
                var res = searcher(el);
                if (res) {
                    if (res === true) {
                        res = el;
                    }
                    return createResult([res]);
                }
            }
            ;
            return createResult();
        }
    }
    function createListMethods(elements) {
        var listMethods = (function (selector) { return listMethods.find(selector); });
        listMethods.find = function (selector) {
            var searcher;
            if (typeof selector === 'function') {
                searcher = selector;
            }
            else {
                searcher = function (el) { return el.querySelectorAll(selector); };
            }
            return find(searcher);
        };
        listMethods.visible = function () {
            return find(function (el) { return isVisible(el); });
        };
        listMethods.withAttribute = function (attributeName, pattern) {
            return find(function (el) { return isAttributeMatches(el, attributeName, pattern); });
        };
        return listMethods;
        function find(searcher) {
            var all = [];
            for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
                var el = elements_2[_i];
                var res = searcher(el);
                if (res === true) {
                    all.push(el);
                }
                else if (res) {
                    var len = res.length;
                    for (var i = 0; i < len; i++) {
                        all.push(res[i]);
                    }
                }
            }
            ;
            return createResult(all, true);
        }
    }
    function isVisible(el) {
        while (el) {
            if (el === document.body) {
                return true;
            }
            if (!el) {
                return false;
            }
            var style = el.style;
            if (style && (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0')) {
                return false;
            }
            el = el.parentElement;
        }
        return false;
    }
    function isAttributeMatches(el, attributeName, pattern) {
        return pattern.test(el.getAttribute(attributeName));
    }
    var $$ = createResult([document]);
    return $$;
});
