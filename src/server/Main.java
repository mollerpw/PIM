package server;

import express.Express;

public class Main {
    public static void main(String[] args) {

        Database db = new Database();
        Express app = new Express();

        app.get("/notes", (req, res) -> {
            Note notes = req.body(Note.class);
            String noteName = notes.getName();
            String content = notes.getContent();
            db.Write(noteName, content);
        });

        app.put("/notes", (req, res) -> {
           Note notes = req.body(Note.class);
           String noteName = notes.getName();
           String outPut = db.Read(noteName);
           res.json(outPut);

        });

        app.post("/notes", (req, res) -> {
            Note notes = req.body(Note.class);
            String noteName = notes.getName();
            String folder = notes.getFolder();
            db.Create(noteName, folder);
        });


        app.get("/folders", (req, res) -> {
        Note notes = req.body(Note.class);
        String folder = notes.getFolder();

        res.json(db.createFolder(folder));
        });

        app.delete("/notes", (req, res) -> {
            Note notes = req.body(Note.class);
            String note = notes.getName();
            db.deleteNote(note);
        });

        app.listen(2000);
        System.out.println("Server started on port 2000");
    }
}
