/*!
 * jQuery toDictionary() plugin
 *
 * Version 1.3.1
 *
 * Copyright (c) 2018 James Donaldson
 * Licensed under the terms of the MIT license
 * http://www.opensource.org/licenses/mit-license.php
 */
 
(function ($) {

  // Date.prototype.toISOString Polyfill
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString#Polyfill
  if (!Date.prototype.toISOString) {
    (function() {

      function pad(number) {
        if (number < 10) {
          return '0' + number;
        }
        return number;
      }

      Date.prototype.toISOString = function() {
        return this.getUTCFullYear() +
          '-' + pad(this.getUTCMonth() + 1) +
          '-' + pad(this.getUTCDate()) +
          'T' + pad(this.getUTCHours()) +
          ':' + pad(this.getUTCMinutes()) +
          ':' + pad(this.getUTCSeconds()) +
          '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
          'Z';
      };

    }());
  }

  var _flatten = function (input, output, prefix, includeNulls) {
    if ($.isPlainObject(input))
    {
      for (var p in input)
      {
        if (includeNulls === true || typeof (input[p]) !== "undefined" && input[p] !== null)
        {
          _flatten(input[p], output, prefix.length > 0 ? prefix + "." + p : p, includeNulls);
        }
      }
    }
    else
    {
      if ($.isArray(input))
      {
        $.each(input, function (index, value) {
          _flatten(value, output, prefix + '[' + index + ']');
        });
        return;
      }
      if (!$.isFunction(input))
      {
        if (input instanceof Date)
        {
          output.push({ name: prefix, value: input.toISOString() });
        }
        else
        {
          var val = typeof (input);
          switch (val)
          {
            case "boolean":
            case "number":
              val = input;
              break;
            case "object":
              // this property is null, because non-null objects are evaluated in first if branch
              if (includeNulls !== true)
              {
                  return;
              }
            default:
              val = input || "";
          }
          output.push({ name: prefix, value: val });
        }
      }
    }
  };
 
  $.extend({
    toDictionary: function (data, prefix, includeNulls) {
      /// <summary>Flattens an arbitrary JSON object to a dictionary that Asp.net MVC default model binder understands.</summary>
      /// <param name="data" type="Object">Can either be a JSON object or a function that returns one.</data>
      /// <param name="prefix" type="String" Optional="true">Provide this parameter when you want the output names to be prefixed by something (ie. when flattening simple values).</param>
      /// <param name="includeNulls" type="Boolean" Optional="true">Set this to 'true' when you want null valued properties to be included in result (default is 'false').</param>

      // get data first if provided parameter is a function
      data = $.isFunction(data) ? data.call() : data;

      // is second argument "prefix" or "includeNulls"
      if (arguments.length === 2 && typeof (prefix) === "boolean")
      {
        includeNulls = prefix;
        prefix = "";
      }

      // set "includeNulls" default
      includeNulls = typeof (includeNulls) === "boolean" ? includeNulls : false;

      var result = [];
      _flatten(data, result, prefix || "", includeNulls);

      return result;
    }
  });
})(jQuery);