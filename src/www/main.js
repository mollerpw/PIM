document.querySelector('header').innerHTML = "<h1>Pim</h1>";

renderFolder();

/* 
onhashchange = changePage;

changePage();

function changePage(){

    let page = location.hash.replace('#','');

    switch(page){
        case "menu":
            let menu = new Menu();
            document.querySelector('main').innerHTML = menu.render();
        break;

        case "contact":
            let contact = new Contact();
            document.querySelector('main').innerHTML = contact.render();
        break;

        case "about":
            let about = new About();
            document.querySelector('main').innerHTML = about.render();
        break;

        default:
            //tanke är om det går fel i routing så kommer man till home page
            let home = new Home();
            document.querySelector('main').innerHTML = home.render();
        break;

    }
}*/