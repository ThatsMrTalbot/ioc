export interface Constructor<T> {
    new(...params : Array<any>) : T
}

export interface Dependency<T> {
    provide(ioc? : IoC) : Promise<T> | T
}

export class IoC {
    private instances = new Map<any, any>();

    async instance<T>(dep : Symbol) : Promise<T> ;
    async instance<T>(dep : Dependency<T>) : Promise<T> ;
    async instance<T>(dep : Constructor<T>) : Promise<T> ;
    async instance<T>(dep : any) : Promise<T> {
        if (this.instances.has(dep)) {
            return this.instances.get(dep);
        }

        if (typeof dep === 'symbol') {
            throw new Error(`Instance for symbol "${dep}" not registered.`);
        }

        if ('provide' in dep) {
            let instance = await dep.provide(this);
            this.instances.set(dep, instance)
            return instance;
        }

        if ('name' in dep) {
            throw new Error(`Instance for object "${dep.name}" not provided.`)        
        }

        throw new Error(`Instance for object "${dep.toString()}" not provided.`)
    }

    register(key : Symbol, instance : any);
    register<T>(key : Constructor<T>, instance : T);
    register(key : any, instance : any) {
        this.instances.set(key, instance)
    }
}

export default IoC