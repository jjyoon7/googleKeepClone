class App {
    constructor() {
        this.notes = [];

        this.$placeholder = document.querySelector('#placeholder')
        this.$form = document.querySelector("#form");
        this.$noteTitle = document.querySelector("#note-title");
        this.$noteText = document.querySelector("#note-text");
        this.$formButtons = document.querySelector("#form-buttons");

        this.addEventListerns();
    }

    addEventListerns() {
        //initiate all the addEventlisteners
        document.body.addEventListener('click', event => {
            this.handleFormClick(event);
        });

        this.$form.addEventListener('submit', event => {
            event.preventDefault();
            const title = this.$noteTitle;
            const text =  this.$noteText;
            const hasNote = title || text;

            if(hasNote) {
                //add note
                this.addNote({ title, text });
            }
        })
    }

    handleFormClick(event) {
        const isFormClicked = this.$form.contains(event.target);
        if(isFormClicked) {
            this.openForm();
        } else {
            this.closeForm();
        }    
    }

    openForm(){
        this.$form.classList.add('form-open');
        this.$noteTitle.style.display = 'block';
        this.$formButtons.style.display = 'block'; 
    }

    closeForm() {
        this.$form.classList.remove('form-open');
        this.$noteTitle.style.display = 'none';
        this.$formButtons.style.display = 'none'; 
    }

    addNote(note) {
        const newNote = {
            title: note.title,
            text: note.text,
            color: 'white',
            id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1
        };
        this.notes = [...this.notes, newNote];
        this.displayNotes();
    }

    displayNotes() {
        const hasNotes = this.notes.length > 0;
        hasNotes ? this.$placeholder.style.display = 'none' : this.$placeholder.style.display = 'flex';
    }
}

new App()