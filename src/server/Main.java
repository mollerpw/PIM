package server;

import express.Express;
import express.middleware.Middleware;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;

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
           String imageURL = notes.getImageURL();
           res.json(db.updateNote(notes));
       });

       app.put("/notes", (req, res) -> {
           Note notes = (Note) req.getBody(Note.class);

           db.updateNote(notes);
       });

        app.get("/notes", (req, res) -> {

            List<Note> notes= db.Read();
            res.json(notes);

        });

        app.get("/folders", (req, res) -> {
            List<Folder> folders = db.readFolder();
            res.json(folders);

        });

        app.post("/notes/pictures", (req, res) -> {
           String imageUrl = null;

            try {
                List<FileItem> files = req.getFormData("files");
                imageUrl = db.uploadImage(files.get(0));
            } catch (IOException e) {
                e.printStackTrace();
            } catch (FileUploadException e) {
                e.printStackTrace();
            }

            res.send(imageUrl);
        });

        app.post("/notes", (req, res) -> {
            Note notes = (Note) req.getBody(Note.class);
            String noteName = notes.getName();
            String folder = notes.getFolder();
            res.json(db.Create(noteName, folder));
        });

        app.post("/folders", (req, res) -> {
            Folder folder = (Folder) req.getBody(Folder.class);
            String folderName = folder.getName();
            res.json(db.createFolder(folderName));
        });


        app.delete("/folders", (req, res) -> {
            Folder folders = (Folder) req.getBody(Folder.class);
            String folder = folders.getName();
            res.json(db.deleteFolder(folder));
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
