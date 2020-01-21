class App {
    constructor() {
        this.notes = [];
        this.title = '';
        this.text = '';
        this.id = '';

        this.$placeholder = document.querySelector('#placeholder')
        this.$form = document.querySelector("#form");
        this.$notes = document.querySelector("#notes");
        this.$noteTitle = document.querySelector("#note-title");
        this.$noteText = document.querySelector("#note-text");
        this.$formButtons = document.querySelector("#form-buttons");
        this.$formCloseButton = document.querySelector("#form-close-button");

        this.$modal = document.querySelector('.modal');
        this.$modalTitle = document.querySelector('.modal-title');
        this.$modalText = document.querySelector('.modal-text');
        this.$modalCloseButton = document.querySelector('.modal-close-button');

        this.addEventListerns();
    }

    addEventListerns() {
        //initiate all the addEventlisteners
        document.body.addEventListener('click', event => {
            this.handleFormClick(event);
            this.selectNote(event);
            this.openModal(event);
        });

        document.body.addEventListener('mouseover', event => {
            this.openTooltip(event);
        })

        this.$form.addEventListener('submit', event => {
            event.preventDefault();
            const title = this.$noteTitle.value;
            const text =  this.$noteText.value;
            const hasNote = title || text;

            if(hasNote) {
                //add note
                this.addNote({ title, text });
            }
        });

        this.$formCloseButton.addEventListener('click', event => {
            event.stopPropagation();
            this.closeForm();
        })

        this.$modalCloseButton.addEventListener('click', event => {
            this.closeModal(event);
        });
    }

    handleFormClick(event) {
        const isFormClicked = this.$form.contains(event.target);
        const title = this.$noteTitle.value;
        const text =  this.$noteText.value;
        const hasNote = title || text;

        if(isFormClicked) {
            this.openForm();
        } else if(hasNote) {
            this.addNote({title, text});
        }
        else {
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
        this.closeForm();
        this.$noteTitle.value = "";
        this.$noteText.value = "";
    }

    selectNote(event) {
        const $selectedNote = event.target.closest('.note');
        if(!$selectedNote) return;
        //deconstructing the $selectedNote.children
        const [$noteTitle, $noteText] = $selectedNote.children;
        this.title = $noteTitle.innerText;
        this.text = $noteText.innerText;
        //data-id from html element
        this.id = $selectedNote.dataset.id;
    }

    openModal(event) {
        if(event.target.closest('.note')) {
            this.$modal.classList.toggle('open-modal');
            this.$modalTitle.value = this.title;
            this.$modalText.value = this.text;
        }
    }

    editNote() {
        //getting current clicked modals value
        const title = this.$modalTitle.value;
        const text = this.$modalText.value;
        this.notes = this.notes.map(note => 
            //we need to change the this.id to number, because it is a string
            note.id === Number(this.id) ? {...note, title, text} : note
        );
        this.displayNotes();
    }

    closeModal() {
        this.editNote();
        this.$modal.classList.toggle('open-modal');
    }

    openTooltip(event) {
        // console.log(event.target.matches('.toolbar-color'))
        if(!event.target.matches('.toolbar-color')) return;
        // console.log(event.target.nextElementSibling);
        this.id = event.target.nextElementSibling.dataset.id;
        event.target.getBoundingClientReact();
    }

    displayNotes() {
        const hasNotes = this.notes.length > 0;
        this.$placeholder.style.display = hasNotes ? 'none' : 'flex';
        //by using data-id in html element, you can chose specific object with id later,
        //for the edit and update the note
        this.$notes.innerHTML = this.notes.map(note => `
        <div style="background: ${note.color};" class="note" data-id="${note.id}">
          <div class="${note.title && 'note-title'}">${note.title}</div>
          <div class="note-text">${note.text}</div>
          <div class="toolbar-container">
            <div class="toolbar">
              <img class="toolbar-color" src="https://icon.now.sh/palette">
              <img class="toolbar-delete" src="https://icon.now.sh/delete">
            </div>
          </div>
        </div>
     `).join("");
    
    }
}

new App()