// 加载模板并缓存住
(function($) {
    function getLoadTmplFunc() {
        var tmpls = [];

        function loadTmpl(url, callback) {
            var index = checkLoad();
            if (index !== -1) {
                callback(tmpls[index].data);
            } else {
                $.ajax({
                    type: 'GET',
                    url: url,
                    dataType: 'html',
                    cache: true,
                    success: function(data, status, xhr) {
                        tmpls.push({
                            url: url,
                            data: data
                        });
                        callback(data);
                    },
                    error: function(xhr, errorType, error) {

                    },
                    complete: function(xhr, status) {

                    }
                });
            }

            function checkLoad() {
                for (var i = 0; i < tmpls.length; i++) {
                    var item = tmpls[i];
                    if (item && item.url === url) {
                        return i;
                    }
                }
                return -1;
            }
        }
        return loadTmpl;
    }
    window.loadTmpl = getLoadTmplFunc();
})(window.jQuery || window.Zepto);