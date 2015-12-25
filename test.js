var div = $$.find('#test').maybe;
console.log($$(div).all.find('.test').closest('#test').visible().maybe.textContent);
var a = $$.all('.test').withAttribute('title', /b/).maybe.textContent;
console.log(a);
