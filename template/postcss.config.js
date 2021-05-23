module.exports = {
    plugins: [
        require('autoprefixer')({
            "overrideBrowserslist": [
                "defaults",
                "last 2 versions",
                "iOS >= 8",
                "Firefox >= 20",
                "Android > 4.4"
            ]
        })
    ]
};
