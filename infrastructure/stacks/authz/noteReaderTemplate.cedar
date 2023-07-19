permit (
    principal == ?principal,
    action in [NotesApp::Action::"ReadNote"],
    resource == ?resource
);