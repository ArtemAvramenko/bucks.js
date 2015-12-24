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
    function createBucks(elements, isList) {
        var bucks = (function (selector) {
            if (typeof selector === 'string') {
                return bucks.find(selector);
            }
            if (selector instanceof Array) {
                return createBucks(selector, true);
            }
            return createBucks([selector], false);
        });
        if (elements && (elements.length == 0 || !elements[0])) {
            elements = undefined;
        }
        if (isList) {
            bucks.found = elements;
            bucks.maybe = elements || [];
        }
        else {
            if (elements) {
                var found = elements[0];
            }
            bucks.found = found;
            bucks.maybe = found || {};
        }
        elements = elements || [];
        bucks.all = createBucksList(elements);
        bucks.find = function (selector) {
            return find(function (el) { return el.querySelector(selector); });
        };
        bucks.closest = function (selector) {
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
        bucks.visible = function () {
            return find(function (el) { return isVisible(el); });
        };
        bucks.withAttribute = function (attributeName, pattern) {
            return find(function (el) { return isAttributeMatches(el, attributeName, pattern); });
        };
        bucks.getAttribute = function (attributeName) {
            var el = elements[0];
            if (el) {
                return el.getAttribute(attributeName) || '';
            }
            return '';
        };
        return bucks;
        function find(searcher) {
            for (var _i = 0; _i < elements.length; _i++) {
                var el = elements[_i];
                var res = searcher(el);
                if (res) {
                    if (res === true) {
                        res = el;
                    }
                    return createBucks([res]);
                }
            }
            ;
            return createBucks();
        }
    }
    function createBucksList(elements) {
        var bucks = (function (selector) { return bucks.find(selector); });
        bucks.find = function (selector) {
            return find(function (el) { return el.querySelectorAll(selector); });
        };
        bucks.visible = function () {
            return find(function (el) { return isVisible(el); });
        };
        bucks.withAttribute = function (attributeName, pattern) {
            return find(function (el) { return isAttributeMatches(el, attributeName, pattern); });
        };
        return bucks;
        function find(searcher) {
            var all = [];
            for (var _i = 0; _i < elements.length; _i++) {
                var el = elements[_i];
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
            return createBucks(all, true);
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
    var $$ = createBucks([document]);
    return $$;
});
