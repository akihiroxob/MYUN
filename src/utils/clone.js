export default function clone (object) {
    return (function copy(object){
        if (typeof object !== object) { return object; }
        if (object instanceof Array)  { return object.concat(); }
        if (object instanceof Date)   { return new Date(object.getTime()); }
        if (object instanceof Object) {
            var clone = {};
            Object.keys(object).forEach(function(key) {
                clone[key] = copy(object[key]);
            });
            return clone;
        }
    })(object);
};
