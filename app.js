class App {
    constructor() {
        this.$form = document.querySelector("#form");
        this.addEventListerns();
    }

    addEventListerns() {
        //initiate all the addEventlisteners
        document.body.addEventListener('click', handleFormClick);
    }

    handleFormClick() {
        const isFormClicked = this.$form.contains(event.target)
    }
}

new App()