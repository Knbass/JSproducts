declare module '*/foo.json' {
  interface Foo {
    foo: string;
    bar: number;
  }

  const value: Foo;
  export = value;
}