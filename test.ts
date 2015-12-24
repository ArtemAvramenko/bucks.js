//console.log($$$.find('#test').maybe.textContent);
var div = $$.find('#test').maybe;
console.log($$(div).all.find('.test').closest('#test').visible().maybe.textContent);

// var issueElement: Element;
//
// var a0 = $$(issueElement).find('div').closest('').closest('').find('').found;
//
// var a1 = $$.all('.task').all.closest('.container').find('.header').maybe.textContent;
//s
// var a2 = $$(issueElement).all('ul li a').withAttribute('href', /\/projects\/\d+$/).maybe.textContent;
//
// var a3 = $$(issueElement).all('ul li a').visible().all.closest('div').found;
//
// var a4 = $$(issueElement).all('ul li a').all.visible().all.getAttribute('href');
//
// var a5 = $$('#viewTaskIframe').all('#Task').found || $$$.all('.ticket--header').maybe.concat($$$.all('.reply--box .content_wrap').maybe)
//
// var a6 = $$.all('div').visible().found;
