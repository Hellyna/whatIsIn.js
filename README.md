# whatIsIn.js
A minimal function to return a string of the recursive representation of an object.

## Installation

```
npm install whatisin
```

## Usage
On servers(node), you can just `require` to use the function.
~~~js
var whatIsIn = require('whatisin');
console.log(whatIsIn(someVeryComplicatedObject));
~~~
On web browsers, including `whatIsIn.js` should add it to the global window object (untested).
~~~html
<script src="/path/to/whatIsIn.js"></script>
<script>
alert(whatIsIn(someVeryComplicatedObject));
</script>
~~~


## Caveats
For now, this function does not support detecting cyclic references. Coming soon :).
