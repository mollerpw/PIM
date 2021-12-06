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



        app.listen(2000);
        System.out.println("Server started on port 2000");
    }
}
