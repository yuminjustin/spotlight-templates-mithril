module.exports = {
    plugins: [
        require('autoprefixer')({
            "browsers": [
                "defaults",
                "last 2 versions",
                "iOS >= 8",
                "Firefox >= 20",
                "Android > 4.4"
            ]
        })
    ]
};
