// doesn't work on browser lodash.clone@3.0.3
// `global is undefined`
//import clone from 'lodash.clone'; // maybe crashed
import clone from './utils/clone';
import Privates from './utils/privates'

const STATE_PLAYING  =  1;  //  1: running
const STATE_STOPPING = -1;  // -1: stopping
const STATE_STOPPED  =  0;  //  0: stopped

let timelineFps = 1000/10;
let p = new Privates();

class Timeline
{
    constructor() {

        p(this).eventList = {};
        p(this).stackList = [];
        p(this).state     = STATE_STOPPED;

        p(this).createId  = (() => {
            let id = 0;
            return () => id++;
        })();

        p(this).registList = (timeEvent) => {
            // 必要な情報を収集
            let id      = timeEvent.id;
            let frames  = timeEvent.frames;

            // Event Listに登録
            //if (!p(this).eventList[id]) {
            p(this).eventList[id] = timeEvent;
            //}

            // Stack Listに登録
            if (!Array.isArray(p(this).stackList[frames])) {
                p(this).stackList[frames] = [];
            }
            p(this).stackList[frames].push(id);
        };


        p(this).animate   = () => {

            let state = p(this).state;
            if (state === STATE_STOPPING) {
                p(this).state = STATE_STOPPED;
                return;
            }

            let eventIds = p(this).stackList.shift();
            if (eventIds) {

                eventIds.forEach(function(eventId) {
                    // eventの取得
                    let timeEvent = p(this).eventList[eventId];

                    // 削除されていなければ実行
                    if (typeof timeEvent.func === 'function') {
                        timeEvent.func.call(timeEvent.context);
                    }

                    // interval設定がされていれば再登録
                    if (timeEvent.interval === true) {

                        // msが設定されていれば再計算
                        if (timeEvent.ms) {
                            timeEvent.frames = Math.floor(timeEvent.ms / timelineFps);
                        }

                        // 最後に改めて存在を確認
                        // このifがないとうまくいかないです
                        if (p(this).eventList[eventId]) {
                            p(this).registList(timeEvent);
                        }
                    }

                }, this);
            }

            // animationの再実行
            setTimeout(p(this).animate, timelineFps);
        };
    }

    set fps(num) {
        let _num = num | 0;
        timelineFps = 1000 / (_num || 30);
    }

    get fps() {
        return Math.round(1000 / timelineFps);
    }

    start() {
        switch(p(this).state) {
        case STATE_STOPPED:
            p(this).animate();
            p(this).state = STATE_PLAYING;
            break;
        default: /* do nothing */
        }
        return p(this).state;
    }

    stop() {
        switch(p(this).state) {
        case STATE_PLAYING:
            p(this).state = STATE_STOPPING;
            break;
        default: /* do nothing */
        }
        return p(this).state;
    }

    setTimeout(func, ms, context) {
        // need to wait how frames
        let frames = Math.floor(ms / timelineFps);
        let timeEvent = {};
        timeEvent.id       = p(this).createId();
        timeEvent.interval = false;
        timeEvent.frames   = frames;
        timeEvent.ms       = ms;
        timeEvent.func     = func;
        timeEvent.context  = context;

        p(this).registList(timeEvent);
        return timeEvent.id;
    }

    setInterval(func, ms, context) {

        let frames = Math.floor(ms / timelineFps);
        let timeEvent = {};
        timeEvent.id       = p(this).createId();
        timeEvent.interval = true;
        timeEvent.frames   = frames;
        timeEvent.ms       = ms;
        timeEvent.func     = func;
        timeEvent.context  = context;

        p(this).registList(timeEvent);
        return timeEvent.id;
    }

    setNextFrame(func, context) {

        let frames = 0;
        let timeEvent = {};
        timeEvent.id       = p(this).createId();
        timeEvent.interval = false;
        timeEvent.frames   = frames;
        timeEvent.func     = func;
        timeEvent.context  = context;

        p(this).registList(timeEvent);
        return timeEvent.id;
    }

    setIntervalFrame(func, context) {

        let frames = 0;
        let timeEvent = {};
        timeEvent.id       = p(this).createId();
        timeEvent.interval = true;
        timeEvent.frames   = frames;
        timeEvent.func     = func;
        timeEvent.context  = context;

        p(this).registList(timeEvent);
        return timeEvent.id;
    }

    clearInterval(id) { delete p(this).eventList[id]; }
    clearIntervalFrame(id) { return clearInterval(id); }
}

// export instance
export default new Timeline();
