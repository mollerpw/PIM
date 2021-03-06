package server;

import com.fasterxml.jackson.core.JsonProcessingException;
import express.utils.Utils;
import org.apache.commons.fileupload.FileItem;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Database {

    private Connection conn;

    // Constructor which connects to database and prints true if it works.
    public Database ()  {
        try {
            conn = DriverManager.getConnection("jdbc:sqlite:PIM.db");
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM notes");
            ResultSet rs = stmt.executeQuery();
            System.out.println(rs.next());
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    //Select all notes from the database in order of newest first, returns them as an ArrayList
    public List<Note> Read(){
        List<Note> notes = null;
        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Notes ORDER BY timestamp DESC");
            ResultSet rs = stmt.executeQuery();
            Note[] notesFromRs = (Note[]) Utils.readResultSetToObject(rs, Note[].class);

            notes = List.of(notesFromRs);

        } catch (SQLException | JsonProcessingException e) {
            e.printStackTrace();
        }
        return notes;
    }
    //Select all folders from the database, returns them as an ArrayList
    public List<Folder> readFolder(){
        List<Folder> folders = null;
        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Folders");
            ResultSet rs = stmt.executeQuery();
            Folder[] foldersFromRs = (Folder[]) Utils.readResultSetToObject(rs, Folder[].class);

            folders = List.of(foldersFromRs);

        } catch (SQLException | JsonProcessingException e) {
            e.printStackTrace();
        }
        return folders;
    }

    // Receives a note object and updates the specific note with the new information
    // and returns true if successful
    public boolean updateNote(Note note) {
        try {
            PreparedStatement stmt = conn.prepareStatement("UPDATE notes SET content = ? , timestamp ='" + LocalDateTime.now() + "', imageURL = ? , uploadFile = ? WHERE id = ?");
            stmt.setString(1, note.getContent());
            stmt.setString(2, note.getImageURL());
            stmt.setString(3, note.getUploadFile());
            stmt.setString(4, note.getId());
            stmt.executeUpdate();
            return true;
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }
    //Tries to create a new note, if a note with that name already exists in this folder it returns false
    //Otherwise it gets created and true is returned.
    public boolean Create(Note note) {
        try {

        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Notes WHERE name = ? AND folder = ?");
        stmt.setString(1, note.getName());
        stmt.setString(2,note.getFolder());
        ResultSet rs = stmt.executeQuery();

        if (rs.next()) {
            return false;
        } else {

                PreparedStatement stmt2 = conn.prepareStatement("INSERT INTO Notes (name, folder, timestamp) VALUES (?, ?, '" + LocalDateTime.now() + "');");
                stmt2.setString(1,note.getName());
                stmt2.setString(2,note.getFolder());
                stmt2.executeUpdate();
                return true;
            }
        }catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    //Tries to create a new folder, if a folder with that name already exists it returns false
    //Otherwise it gets created and true is returned.
    public boolean createFolder(String folder){
        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Folders WHERE name = ?");
            stmt.setString(1,folder);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {

                return false;
            }
            else {
                PreparedStatement stmtUpdate = conn.prepareStatement("INSERT INTO Folders (name, timestamp) VALUES (?, '"+ LocalDateTime.now() + "');" );
                stmtUpdate.setString(1,folder);
                stmtUpdate.execute();

                return true;
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Receives a note and deletes it
    public boolean deleteNote(Note note) {
        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM Notes WHERE id = ?");
            stmt.setString(1, note.getId());
            stmt.executeUpdate();
            return true;

        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return false;
        }
    }

    // Receives a folder name and deletes the folder and all notes with that folder name
    public boolean deleteFolder(String folder) {
        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM Notes WHERE folder = ?");
            stmt.setString(1, folder);
            stmt.executeUpdate();
            PreparedStatement stmt2 = conn.prepareStatement("DELETE FROM Folders WHERE name = ?");
            stmt2.setString(1, folder);
            stmt2.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Receives an image and puts it into /images folder and returns the path as a string
    public String uploadImage(FileItem image) {
        String imageUrl = "/images/" + image.getName();

        try (var outPutStream = new FileOutputStream(Paths.get("src/www" + imageUrl).toString())) {
            outPutStream.write(image.get());
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return imageUrl;
    }

    // Receives the imageURL and the id of a note then sets imageURL to NULL
    public boolean deleteImage(String imageUrl, String id) {
        try {
            PreparedStatement stmt = conn.prepareStatement("UPDATE Notes SET imageURL = NULL WHERE id = ?");
            stmt.setString(1, id);
            File image = new File(imageUrl);
            Path path = Paths.get("src/www" + image);
            Files.delete(path);
            stmt.executeUpdate();
            return true;
        }catch (SQLException e) {
            e.printStackTrace();
            return false;
        }catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Receives a file and puts it into /files folder and returns the path as a string
    public String uploadFile(FileItem file) {
        String uploadFile = "/files/" + file.getName();

        try (var outPutStream = new FileOutputStream(Paths.get("src/www" + uploadFile).toString())){
            outPutStream.write(file.get());
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return uploadFile;
    }

    // Receives the uploadedFile and the id of a note then sets uploadFile to NULL
    public boolean deleteFile(String uploadFile, String id) {

        try {
            PreparedStatement stmt = conn.prepareStatement("UPDATE Notes SET uploadFile = NULL WHERE id = ?");
            stmt.setString(1, id);
            File file = new File(uploadFile);
            Path path = Paths.get("src/www" + file);
            Files.delete(path);
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

}
