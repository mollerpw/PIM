package server;

import com.fasterxml.jackson.core.JsonProcessingException;
import express.utils.Utils;
import org.apache.commons.fileupload.FileItem;

import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Database {

    private Connection conn;

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

    public List<Note> Read(){
        List<Note> notes = null;
        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Notes");
            ResultSet rs = stmt.executeQuery();
            Note[] notesFromRs = (Note[]) Utils.readResultSetToObject(rs, Note[].class);

            notes = List.of(notesFromRs);

        } catch (SQLException | JsonProcessingException e) {
            e.printStackTrace();
        }
        return notes;
    }

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


    public boolean Write(String noteName, String content){
        try {
            PreparedStatement stmt = conn.prepareStatement("UPDATE notes SET content='" + content + "', timestamp ='" + LocalDateTime.now() + "' WHERE name='" + noteName + "';");
            stmt.execute();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean Create(String noteName, String folder){
        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO notes (name, folder, timestamp) VALUES ('" + noteName + "', '" + folder + "', '" + LocalDateTime.now() + "');");
            stmt.execute();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

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

    public void deleteNote(String note) {
        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM Notes WHERE name = ?");
            stmt.setString(1, note);
            stmt.executeUpdate();


        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public boolean deleteFolder(String folder) {
        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM Notes WHERE folder = ?");
            stmt.setString(1, folder);
            stmt.executeUpdate();
            PreparedStatement stmt2 = conn.prepareStatement("DELETE FROM Folders WHERE name = ?");
            stmt2.setString(1, folder);
            stmt2.executeUpdate();
            return true;
        }catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }       

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

}
