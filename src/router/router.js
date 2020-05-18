import Vue from 'vue'
import Router from 'vue-router'

import vNoteMain from '../components/note/v-note-main'
import vNoteEdit from '../components/note/v-note-edit'

Vue.use(Router);

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'note_main',
            component: vNoteMain
        },
        {
            path: '/note_edit',
            name: 'note_edit',
            component: vNoteEdit,
            props: true
        }
    ]
})

export default router;