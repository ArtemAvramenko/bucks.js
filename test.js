var div = $$.find('#test').maybe;
console.log($$(div).all.find('.test').closest('#test').visible().maybe.textContent);
