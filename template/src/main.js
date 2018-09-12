import '@babel/polyfill';
import Router from './route'
import Navigation from 'C/nav'
import 'B/assets/css/reset.css';
import 'B/assets/css/page.css';


const root = document.querySelector("#app"),
      nav = document.createElement('div'),
      main = document.createElement('div');
root.innerHTML = "";
nav.id = "nav";
main.id = "main";

root.append(nav);
root.append(main);


m.mount(nav, Navigation)
m.route(main, "/", Router)


/* webpack hot reload */
if (module.hot) {
    module.hot.accept();
}
