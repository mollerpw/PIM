package server;

import express.Express;
import express.middleware.Middleware;

import java.io.IOException;
import java.nio.file.Paths;

import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.List;

public class Main {
    public static void main(String[] args) {

        Database db = new Database();
        Express app = new Express();

       app.put("/notes", (req, res) -> {
           Note notes = (Note) req.getBody(Note.class);
           String noteName = notes.getName();
           String content = notes.getContent();
          db.Write(noteName, content);
       });

        app.get("/notes", (req, res) -> {

            List<Note> notes= db.Read();
            res.json(notes);

        });

        app.get("/folders", (req, res) -> {
            List<Note> folders = db.readFolder();
            res.json(folders);

        });

        app.post("/notes", (req, res) -> {
            Note notes = (Note) req.getBody(Note.class);
            String noteName = notes.getName();
            String folder = notes.getFolder();
            db.Create(noteName, folder);
        });

        app.post("/folders", (req, res) -> {
            Note notes = (Note) req.getBody(Note.class);
            String folder = notes.getFolder();
            res.json(db.createFolder(folder));
        });


        app.delete("/folders", (req, res) -> {
            Note notes = (Note) req.getBody(Note.class);
            String folder = notes.getFolder();
            db.deleteFolder(folder);
        });


        app.delete("/notes", (req, res) -> {
            Note notes = (Note) req.getBody(Note.class);
            String note = notes.getName();
            db.deleteNote(note);
        });

        app.listen(2000);
        System.out.println("Server started on port 2000");

        try {
            app.use(Middleware.statics(Paths.get("src/www").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
