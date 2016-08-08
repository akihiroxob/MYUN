import Actions    from './actions';
import Timeline   from './timeline';
import Dispatcher from './dispatcher';
import Store      from './store';

var MYUN = {
    Actions,
    Store,
    Dispatcher,
    get fps()    { return Timeline.fps; },
    set fps(fps) { Timeline.fps = fps; }
};

export default MYUN;
