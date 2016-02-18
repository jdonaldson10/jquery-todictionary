# jquery-todictionary
Thanks to Robert Koritnik (@litera) for the original implementation [here](http://erraticdev.blogspot.co.uk/2010/12/sending-complex-json-objects-to-aspnet.html).

Transforms an arbitary `JSON` object into an array of name-value pairs.
This flatter structure works great with the default model binder in ASP.NET, especially when trying to bind complex nested structures.

### Install
``` js
npm install jdonaldson10/jquery-todictionary#master
```

### Usage
``` js
$.toDictionary([mandatory]data, [optional]prefix, [optional]includeNulls);
```