export interface Constructor<T> {
    new (...params: Array<any>): T;
}
export interface Dependency<T> {
    provide(ioc?: IoC): Promise<T> | T;
}
export declare class IoC {
    private instances;
    instance<T>(dep: Symbol): Promise<T>;
    instance<T>(dep: Dependency<T>): Promise<T>;
    instance<T>(dep: Constructor<T>): Promise<T>;
    register(key: Symbol, instance: any): any;
    register<T>(key: Constructor<T>, instance: T): any;
}
export default IoC;
