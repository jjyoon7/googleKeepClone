class App {
    constructor() {
        this.addEventListerns();
    }

    addEventListerns() {
        //initiate all the addEventlisteners
        document.body.addEventListener('click', handleFormClick);
    }
}

new App()