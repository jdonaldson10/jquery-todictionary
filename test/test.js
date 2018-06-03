import test from 'ava';
import '../jquery-todictionary';
const toDictionary = global.jQuery.toDictionary;

/* SIMPLE INPUTS
 *******************************************************/
test('simple null value', t => {
  const input = { foo: null };
  const expected = [];
  t.deepEqual(toDictionary(input), expected);
});

test('simple undefined value', t => {
  const input = { foo: undefined };
  const expected = [];
  t.deepEqual(toDictionary(input), expected);
});

test('simple boolean:true value', t => {
  const input = { foo: true };
  const expected = [{ name: 'foo', value: true }];
  t.deepEqual(toDictionary(input), expected);
});

test('simple boolean:false value', t => {
  const input = { foo: false };
  const expected = [{ name: 'foo', value: false }];
  t.deepEqual(toDictionary(input), expected);
});

test('simple string value', t => {
  const input = { foo: 'bar' };
  const expected = [{ name: 'foo', value: 'bar' }];
  t.deepEqual(toDictionary(input), expected);
});

test('simple date value', t => {
  const input = { foo: new Date() };
  const expected = [{ name: 'foo', value: input.foo.toISOString() }];
  t.deepEqual(toDictionary(input), expected);
});

test('simple array value', t => {
  const input = { foo: [ 'a', 2, true, new Date() ] };
  const expected = [
    { name: 'foo[0]', value: 'a' },
    { name: 'foo[1]', value: 2 },
    { name: 'foo[2]', value: true },
    { name: 'foo[3]', value: input.foo[3].toISOString() },
  ];
  t.deepEqual(toDictionary(input), expected);
});

test('simple RegExp value', t => {
  const input = { foo: /[a-zA-Z]/g };
  const expected = [];
  t.deepEqual(toDictionary(input), expected);
});

/* NESTED OBJECTS
 *******************************************************/
test('multiple nested structures', t => {
  const input = { 
    a: {
      b: {
        c: {
          foo: 'bar',
          field1: 'xyz',
          field2: 123,
        },     
      },
      bb: [ 1, 2, 3, 4, 5 ],
    },
    x: {
      y: 9001
    },
    timestamp: new Date(),
  };
  const expected = [
    { name: 'a.b.c.foo', value: 'bar' },
    { name: 'a.b.c.field1', value: 'xyz' },
    { name: 'a.b.c.field2', value: 123 },
    { name: 'a.bb[0]', value: 1 },
    { name: 'a.bb[1]', value: 2 },
    { name: 'a.bb[2]', value: 3 },
    { name: 'a.bb[3]', value: 4 },
    { name: 'a.bb[4]', value: 5 },
    { name: 'x.y', value: 9001 },
    { name: 'timestamp', value: input.timestamp.toISOString() },
  ];
  t.deepEqual(toDictionary(input), expected);
});

/* HANDLING FUNCTION INPUTS
 *******************************************************/
test('input as a function is resolved before returning result', t => {
  const input = () => ({ foo: 'bar' });
  const expected = [{ name: 'foo', value: 'bar' }];
  t.deepEqual(toDictionary(input), expected);
});

test('object with function properties are excluded from the result', t => {
  const input = { 
    foo: 'bar',
    func: () => {},
  };
  const expected = [{ name: 'foo', value: 'bar' }];
  t.deepEqual(toDictionary(input), expected);
});

/* PREFIXES
 *******************************************************/
test('supplied prefixes get added start of all resulting field names', t => {
  const input = { 
    foo: 'bar',
    abc: 123,
    xyz: true,
    nested: {
      prop: 'qwerty',
      level2: {
        very: 'deep',
        arr: [ 'a', 'b', 'c' ],
      },
    },
  };
  const expected = [
    { name: 'prefix.foo', value: 'bar' },
    { name: 'prefix.abc', value: 123 },
    { name: 'prefix.xyz', value: true },
    { name: 'prefix.nested.prop', value: 'qwerty' },
    { name: 'prefix.nested.level2.very', value: 'deep' },
    { name: 'prefix.nested.level2.arr[0]', value: 'a' },
    { name: 'prefix.nested.level2.arr[1]', value: 'b' },
    { name: 'prefix.nested.level2.arr[2]', value: 'c' },
  ];
  t.deepEqual(toDictionary(input, 'prefix'), expected);
});

/* INCLUDE NULLS
 *******************************************************/
const testIncludeNullsInput = { 
  foo: 'bar',
  something: null,
  wat: undefined,
  arr: [ 'one', 'two', 'three', null, 12345 ],
};

const expectedIncludeNullsOutput = [
  { name: 'foo', value: 'bar' },
  { name: 'something', value: '' },
  { name: 'wat', value: '' },
  { name: 'arr[0]', value: 'one' },
  { name: 'arr[1]', value: 'two' },
  { name: 'arr[2]', value: 'three' },
  { name: 'arr[4]', value: 12345 },
];

test('includeNulls (as 2nd param)', t => {
  t.deepEqual(toDictionary(testIncludeNullsInput, true), expectedIncludeNullsOutput);
});

test('includeNulls (as 3rd param)', t => {
  t.deepEqual(toDictionary(testIncludeNullsInput, '', true), expectedIncludeNullsOutput);
});

