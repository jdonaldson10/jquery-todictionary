# jquery-todictionary

Transforms an arbitary `JSON` object into an array of name-value pairs.
This flat structure works great with the default model binder in ASP.NET, especially when trying to bind complex nested structures.

### Install
``` js
npm install jquery-todictionary
```

### Usage
``` js
$.toDictionary([mandatory]data, [optional]prefix, [optional]includeNulls);
```
```js
var data = {
  foo: 'bar',
  enable: true,
  timestamp: new Date(),  
  words: [ 'correct', 'horse', 'battery', 'staple' ],
  details: {
  	prop1: 'aaa',
  	prop2: 'bbb',
  	prop3: {
  	  name: 'Bobby Tables'
  	}
  }
};

console.log($.toDictionary(data));
// expected output:
// [
//   { name: 'foo', value: 'bar' },
//   { name: 'enable', value: true },
//   { name: 'timestamp', value: '2011-10-05T14:48:00.000Z' },
//   { name: 'words[0]', value: 'correct' },
//   { name: 'words[1]', value: 'horse' },
//   { name: 'words[2]', value: 'battery' },
//   { name: 'words[3]', value: 'staple' },
//   { name: 'details.prop1', value: 'aaa' },
//   { name: 'details.prop2', value: 'bbb' },
//   { name: 'details.prop3.name', value: 'Bobby Tables' }
// ]
```

### Credit

Thanks to Robert Koritnik ([@litera](https://github.com/litera)) for the [original implementation](http://erraticdev.blogspot.co.uk/2010/12/sending-complex-json-objects-to-aspnet.html).