package server;

public class Note {
    private String name;
    private String folder;
    private String content;
    private String timestamp;
    private String imageUrl;

    public Note() {}


    public Note(String name, String folder) {
        this.name = name;
        this.folder = folder;

    }

    public Note(String name, String content, String folder) {
        this.name = name;
        this.content = content;
    }

    public Note(String name, String content, String folder, String imageUrl) {
        this.name = name;
        this.content = content;
        this.folder = folder;
        this.imageUrl = imageUrl;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
