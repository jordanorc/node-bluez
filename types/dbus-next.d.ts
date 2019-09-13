import { EventEmitter } from "events";

declare module 'dbus-next' {
    export type ObjectPath = string;

    export namespace interface {
        interface PropertyOptions {

        }
        interface MethodOptions {
            inSignature?: string;
            outSignature?: string;
            name?: string;
            disabled?: boolean;
        }
        interface SignalOptions {

        }

        export class Interface {
            constructor(name: string);
            static configureMembers(members: {properties?: {[key:string]: PropertyOptions}, methods?: {[key:string]: MethodOptions}, signals?: {[key:string]: SignalOptions}}): void;
         }
        export function property(opts: PropertyOptions): PropertyDecorator;
        export function method(opts: MethodOptions): MethodDecorator;
        export function signal(opts: SignalOptions): MethodDecorator;
    }
    export class Variant { }
    export class DBusError extends Error {
        type: string;
        text: string;
        reply?: any;
        constructor(type: string, text: string, reply?: any);
     }
    export class Message { }

    export interface MessageBus {
        getProxyObject(name: string, path: string): Promise<ProxyObject>;
        getProxyObject(name: string, path: string, xml: string): Promise<ProxyObject>;
        disconnect(): void;

        export(path: ObjectPath, interface: interface.Interface): void;
        unexport(path: ObjectPath, interface: interface.Interface): void;
    }
    export interface ProxyObject {
        bus: MessageBus;
        readonly name: string;
        readonly path: ObjectPath;
        readonly nodes: ObjectPath[];
        readonly interfaces: { [name: string]: ClientInterface };

        getInterface(name: string): ClientInterface;
        getInterface<T extends ClientInterface>(name: string): T;
    }
    export interface ClientInterface extends EventEmitter {
        [name: string]: Function;
    }

    export function systemBus(): MessageBus;
    export function sessionBus(options: any): MessageBus;
}