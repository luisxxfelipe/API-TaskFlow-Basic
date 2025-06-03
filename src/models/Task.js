class Task {
    constructor(id, title, description, user_id, created_at) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.user_id = user_id;
        this.created_at = created_at;
    }
}

module.exports = Task; 