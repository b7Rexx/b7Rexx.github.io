function callback(a, cb) {
    // console.log(cb);
    cb(a);
}

callback(1, asd);

function asd(val) {
    console.log(val);
}