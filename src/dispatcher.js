import forIn from 'lodash.forin';
import EventEmitter from 'eventemitter3';
import Privates from './utils/privates';

let p = new Privates();
class Dispatcher extends EventEmitter
{
    constructor() {
        super();
        p(this).stores = {};
        p(this).enable = true;
    }

    enable() {
        p(this).enable = true;
    }

    disable() {
        p(this).enable = false;
    }

    addStore(name, store) {
        p(this).stores[name] = store;
    }

    getStore(name) {
        return p(this).stores[name];
    }

    dispatch(eventName, payload) {
        if (!p(this).enable) { return false; }
        this.emit(eventName, payload);
        return true;
    }
}

// export instance
export default new Dispatcher();
