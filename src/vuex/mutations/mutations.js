import Vue from 'vue'

export default {
    
        SET_NOTE_LIST_TO_STATE: (state, note_list) => {
            state.note_list = note_list;
        },        

        SET_ADD_NOTE_IN_NOTE_LIST: (state, name_note) => {
            state.note_list.push({"name_note": name_note, "todo_list": []})
        },
        SET_EDIT_NOTE_IN_NOTE_LIST: (state, name_note) => {
            let index_note = name_note[0];
            let new_name_note = name_note[1];
            console.log("index note = ", index_note);
            console.log("new_name_note = ", new_name_note);
            Vue.set(state.note_list[index_note], 'name_note', new_name_note);

        },

        SET_CANCEL_CHANGES_NOTE_LIST: (state, note_copy) => {
            let index_note = note_copy[0];
           
            console.log("index note copy = ", note_copy[0]);
            console.log("note copy = ", note_copy[1]);

            let new_note = JSON.parse(JSON.stringify(note_copy[1]));

            Vue.set(state.note_list[index_note], 'name_note', new_note.name_note);
            Vue.set(state.note_list[index_note], 'todo_list', new_note.todo_list);
        },

        SET_DELETE_NOTE_IN_NOTE_LIST: (state, index) => {
            state.note_list.splice(index, 1);
        },
        SET_ADD_TODO_IN_NOTE_LIST: (state, name_todo) => {
            console.log(state.note_list);
            console.log(name_todo[0]);
            console.log(name_todo[1]);

            state.note_list[name_todo[0]].todo_list.push({"name_todo": name_todo[1], "completed": false});
        },
        SET_EDIT_TODO_IN_NOTE_LIST: (state, name_todo) => {
            console.log(state.note_list);
            console.log(name_todo);
            
            let index_note = name_todo[0];
            let index_todo = name_todo[1];
            let temp = name_todo[2];

            state.note_list[index_note].todo_list.splice(index_todo, 0, {"name_todo": temp, "completed":false});
            state.note_list[index_note].todo_list.splice(index_todo + 1, 1);

        },
        SET_DELETE_TODO_IN_NOTE_LIST: (state, index) => {
            state.note_list[index[0]].todo_list.splice(index[1], 1);
        },
        SET_COMPLETE_TODO_IN_NOTE_LIST: (state, index) => {
            state.note_list[index[0]].todo_list[index[1]].completed = !state.note_list[index[0]].todo_list[index[1]].completed;
        }
}