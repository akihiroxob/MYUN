import forIn from 'lodash.forin';
import EventEmitter from 'eventemitter3';
import Dispatcher from './dispatcher';

export default class Store extends EventEmitter
{
    constructor() {
        super();
        this.store  = {};
    }

    bindAction(name, func) {
        Dispatcher.on(name, func.bind(this));
    }

    bindActions(events) {
        forIn(events, function(func, name){
            if (typeof func !== 'function') {
                return;
            }
            Dispatcher.on(name, func.bind(this));
        }, this);
    }
}
