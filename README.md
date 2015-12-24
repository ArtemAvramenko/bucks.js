#bucks.js
JavaScript/TypeScript CSS selector library.

Code licensed under [MIT License](LICENSE).

#Example
```
var projectName = $$('#task').all('ul li a').withAttribute('href', /\/projects\/\d+$/).maybe.textContent;
```
