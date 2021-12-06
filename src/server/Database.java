package server;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;

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

    public String Read(String noteName){
        String output = "";
        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT content FROM notes WHERE name='" + noteName + "';");
            ResultSet rs = stmt.executeQuery();
            output = rs.getString("content") + ", ";
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return output;
    }
    public void Write(String noteName, String content){
        try {
            PreparedStatement stmt = conn.prepareStatement("UPDATE notes SET content='" + content + "', timestamp ='" + LocalDateTime.now() + "' WHERE name='" + noteName + "';");
            stmt.execute();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public void Create(String noteName, String folder){
        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO notes (name, folder, timestamp) VALUES ('" + noteName + "', '" + folder + "', '" + LocalDateTime.now() + "');");
            stmt.execute();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public boolean createFolder(String folder){
        try {
            Connection conn = DriverManager.getConnection("jdbc:sqlite:PIM.db");
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Folders WHERE name = ?");
            stmt.setString(1,folder);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                conn.close();
                return false;
            }
            else {
                PreparedStatement stmtUpdate = conn.prepareStatement("INSERT INTO Folders (name, timestamp) VALUES (?, "+ LocalDateTime.now() + ");" );
                stmtUpdate.setString(1,folder);
                stmt.executeUpdate();
                conn.close();
                return true;
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

}
