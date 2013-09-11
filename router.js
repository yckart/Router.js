/*!
 * trouter.js 0.0.1 - https://github.com/yckart/Router.js
 * Really simple routing in javascript
 *
 * @see https://github.com/component/path-to-regexp
 * @see https://github.com/apily/route/blob/master/index.js#L78-99
 *
 * Copyright (c) 2013 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/09/11
 **/

(function () {

    this.Router = {
        routes: {},
        on: function (path, callback) {
            this.routes[path] = {
                regexp: (function (path, keys) {
                    return new RegExp('^' + path
                        .replace(/[\-{}\[\]+?.,\\\^$|#\s]/g, '\\$&')
                        .replace(/\((.*?)\)/g, '([^\/]+)?')
                        .replace(/:(\w+)/g, '([^\/]+)')
                        .replace(/\*(\w*)/g, '(.*?)') + '$',
                    'i');
                }(path)),
                callback: callback
            };
            return this;
        },

        off: function (path) {
            if (path) delete this.routes[path];
            return this;
        },

        trigger: function (path) {
            var routes = this.routes;
            for (var key in routes) {
                var route = routes[key];
                var params = route.regexp.exec(path || location.pathname);
                if (params) route.callback(params);
            }
            return this;
        }
    };

}());