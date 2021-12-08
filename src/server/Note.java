package server;

public class Note {
    private String name;
    private String folder;
    private String content;
    private String timestamp;
    private String imageURL;

    public Note() {}


    public Note(String name, String folder) {
        this.name = name;
        this.folder = folder;

    }

    public Note(String name, String content, String folder) {
        this.name = name;
        this.content = content;
    }

    public Note(String name, String content, String folder, String imageURL) {
        this.name = name;
        this.content = content;
        this.folder = folder;
        this.imageURL = imageURL;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFolder() {
        return folder;
    }

    public void setFolder(String folder) {
        this.folder = folder;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }
}
