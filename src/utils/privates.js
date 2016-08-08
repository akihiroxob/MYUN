export default function () {
    var wm = new WeakMap();
    return k => wm.get(k) || wm.set(k, {}).get(k);
}
