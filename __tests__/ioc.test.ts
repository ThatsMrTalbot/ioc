import IoC from '../src'

const TestSymbol = Symbol("Test");

class TestDependency {
    static provide(ioc : IoC) : TestDependency {
        return new TestDependency();
    }
}

class TestConstructor {
    constructor() {
        // Nothing to do
    }
}

describe("Given an IoC instance", () => {
    let ioc : IoC;

    beforeAll(() => {
        ioc = new IoC();    
    })

    describe("When object is registered with a symbol", () => {
        let expected = new TestConstructor()

        beforeAll(() => {
            ioc.register(TestSymbol, expected)    
        })

        it("Then the instance should be provided for the symbol", async () => {
            let instance = await ioc.instance<TestConstructor>(TestSymbol)
            expect(instance).toBe(expected);
        })
    })

    describe("When object is registered with its constructor", () => {
        let expected = new TestConstructor()

        beforeAll(() => {
            ioc.register(TestConstructor, expected)    
        })

        it("Then the instance should be provided for the symbol", async () => {
            let instance = await ioc.instance(TestConstructor)
            expect(instance).toBe(expected);
        })
    })

    describe("When unregistered symbol is requested", () => {
        it("Then an error should be thrown", async () => {
            try {
                await ioc.instance(TestSymbol);
            } catch(object) {
                expect(object.error).toEqual('Instance for symbol "Test" not registered.');
            }
        })
    })

    describe("When unregistered class is requested", () => {
        it("Then an error should be thrown", async () => {
            try {
                await ioc.instance(TestConstructor);
            } catch(object) {
                expect(object.error).toEqual('Instance for symbol "TestConstructor" not registered.');
            }
        })
    })

    describe("When unregistered class that implements Dependency is requested", () => {
        let instance : TestDependency

        beforeAll(async () => {
            instance = await ioc.instance(TestDependency)   
        })
        
        it("Then an instance should be returned", async () => {
            expect(instance).toBeInstanceOf(TestDependency)
        })

        it("Then the same instance should be returned for subsequent calls", async () => {
            let newInstance = await ioc.instance(TestDependency) 
            expect(newInstance).toBe(instance)
        })
    })
})