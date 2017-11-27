const state = {
    count: 0,
    inc() {
        state.count++
    }
}

export default {
    view: () => m('div', {
        "class": "_nav"
    }, 'Navigation', [
        m("a", {
            href: "#!/"
        }, "index"),
        m("a", {
            href: "#!/dsfgdsg"
        }, "error"),
        m("button", {
            onclick: state.inc
        }, state.count)
    ])
}