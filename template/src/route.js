var map = [{
    url: '/',
    onmatch: function () {
        return require.ensure([], function (require) {
            return require('C/index')
        }, 'index')
    }
}, {
    url: '/:any',  // 404 page
    onmatch: function () {
        return require.ensure([], function (require) {
            return require('C/error')
        }, 'error')
    }
}]

var routeMaker = function () {
    var route = {}
    for (var i = 0; i < map.length; i++) {
        var r = map[i];
        route[r.url] = {
            onmatch: r.onmatch
        }
    }
    return route
}

window.$router = routeMaker()

export default $router