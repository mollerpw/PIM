package server;

import java.sql.*;

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
}
