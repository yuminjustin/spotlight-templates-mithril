var style = require('B/assets/css/page.css');
module.exports ={
    view: () => {
        return m("div", {
            "class": style.error_404
        },[m('h1','404'),m('p', 'Ooops!')])
    }
}
