permit (
    principal == ?principal,
    action in [
        NotesApp::Action::"ReadNote",
        NotesApp::Action::"UpdateNote",
        NotesApp::Action::"DeleteNote"
    ],
    resource == ?resource
);