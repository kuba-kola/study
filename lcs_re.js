let a = /[^ A-Za-z0-9]/;
b = (f = '', s = []) => s.every(s => s.includes(f));
c = (o = '', s = []) => {
    for (let i = 0; i < o.length; i++) {
        let t = o.substr(i, o.length);
        if(b(t, s)) {
        return t
    }
};
};
let q = (s = []) => {
let w = s.filter(s => !s.match(a)).sort((g, h) => g.length - h.length);
[e] = w;
if (!w || w.length === 0) {
return ''
};
if (w.length === 1) {
return e
};
let r = null;
y = new Set();
e.split('').forEach((p, d) => {
let u = r === null ? p : (r + p);
if (b(u, s)) { 
r = u
} else {
if (r !== null) {
y.add(r);
r = c(u, s)
}
}
});
if (r !== null) {
y.add(r)
}
let [i] = [...y].sort((g, h) => h.length - g.length);
return i || ''
};
console.log(q(process.argv.slice(2)))