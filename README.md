[![Build Status](https://travis-ci.org/ThatsMrTalbot/ioc.svg?branch=master)](https://travis-ci.org/ThatsMrTalbot/ioc)

# Typescript IoC
_Simple ioc for node & typescript_

## Usage

There are two methods "register" and "instance". 

### Register

Register registers an instance of a class against its constructor or a symbol.

For example registering against a constructor:

```typescript
class Example {
    constructor() {
        // Nothing to do
    }
}

ioc.register(Example, new Example());
```

And registering against a symbol:

```typescript
const ExampleSymbol = Symbol("Example");

ioc.register(ExampleSymbol, new Example());
```

### Instance

Instance allows you to obtain instances from the IoC class. It can provide registered instances or can construct instances if the class implements Dependency.

For example getting a registered instance:

```typescript
let instance = await ioc.instance(Example);
```

And constructing classes that implement Dependency:

```typescript
class Example {
    // Can return Example or Promise<Example>
    static provide(ioc : IoC) : Example {
        return new Example();
    }
}

//...

let instance = await ioc.instance(Example);
```