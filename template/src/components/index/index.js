var style = require('B/assets/css/page.css');
module.exports = {
    view: () => m("div", {
        "class": style._index
    },[m('h1', 'Hello'), m("img", {
        src: './static/image/black.png'
    })])
}
