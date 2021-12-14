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

        // Requests the body of the json and creates a Note object with that information,
        // sends note object to updateNote method
        // and responds with the result
       app.put("/notes", (req, res) -> {
           Note notes = (Note) req.getBody(Note.class);
           res.json(db.updateNote(notes));
       });

        // Receives a list from db.Read and puts it into a new list and
        // sends it as a json to /notes
        app.get("/notes", (req, res) -> {

            List<Note> notes= db.Read();
            res.json(notes);

        });

        // Receives a list from db.readFolder and
        // puts it into a new list and
        // sends it as a json to /folders
        app.get("/folders", (req, res) -> {
            List<Folder> folders = db.readFolder();
            res.json(folders);

        });
        // Uploads an image to /notes/pictures
        app.post("/notes/pictures", (req, res) -> {
           String imageUrl = null;

            try {
                List<FileItem> files = req.getFormData("files"); // puts image into list
                imageUrl = db.uploadImage(files.get(0)); // gets the first (only) image
            } catch (IOException e) {
                e.printStackTrace();
            } catch (FileUploadException e) {
                e.printStackTrace();
            }

            res.send(imageUrl); // sends the image as a string
        });

        app.post("/notes/files", (req, res) -> {
           String uploadFile = null;

           try {
               List<FileItem> files = req.getFormData("files");
               uploadFile = db.uploadFile(files.get(0));
           } catch (IOException e) {
               e.printStackTrace();
           } catch (FileUploadException e) {
               e.printStackTrace();
           }
           res.send(uploadFile);
        });

        app.post("/notes", (req, res) -> {
            Note notes = (Note) req.getBody(Note.class);
            res.json(db.Create(notes));
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

            res.json(db.deleteNote(notes));
        });

        app.put("/notes/pictures", (req, res) -> {
            Note notes = (Note) req.getBody(Note.class);
            String id = notes.getId();
            String imageUrl = notes.getImageURL();
            res.json(db.deleteImage(imageUrl, id));
        });

        app.put("/notes/files", (req, res) -> {
            Note notes = (Note) req.getBody(Note.class);
            String id = notes.getId();
            String uploadFile = notes.getUploadFile();
            res.json(db.deleteFile(uploadFile, id));
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
