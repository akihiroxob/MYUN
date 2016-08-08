import Dispatcher from './dispatcher';
import Timeline   from './timeline';

export default class Actions
{
    constructor() {}

    start()  {
        Dispatcher.enable();
        Timeline.start();
    }

    stop()   {
        Dispatcher.disable();
        Timeline.stop();
    }

    getStore(name) {
        return Dispatcher.getStore(name);
    }

    dispatch(eventName, payload) {
        Dispatcher.dispatch(eventName, payload);
    }

    setTimeout(func, ms, context) {
        return Timeline.setTimeout(func, ms, context);
    }

    setInterval(func, ms, context) {
        return Timeline.setInterval(func, ms, context);
    }

    clearInterval(id) {
        Timeline.clearInterval(id);
    }

    setTimeoutFrame(func, context) {
        return Timeline.setTimeoutFrame(func, context);
    }

    setIntervalFrame(func, context) {
        return Timeline.setIntervalFrame(func, context);
    }
    clearIntervalFrame(id) {
        Timeline.clearIntervalFrame(id);
    }
}
