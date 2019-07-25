let app = new Vue({
    el: "#app",
    data: {
        addDropdownTitleInput: "",
        addDropdownDescriptionInput: "",
        addedTags: [],
        addDropdownTagInput: "",
        bookmarks: []
    },
    methods: {
        addBookmark: function() {
            if (this.addDropdownTitleInput === "") {
                alertify.error("Title cannot be empty.");
                return;
            }
            this.bookmarks = this.bookmarks.concat({
                title: this.addDropdownTitleInput,
                description: this.addDropdownDescriptionInput,
                tags: this.addedTags,
                time: new Date()
            });
            this.addDropdownTitleInput = "";
            this.addDropdownDescriptionInput = "";
            this.addDropdownTagInput = "";
            this.addedTags = [];
        },
        addTag: function() {
            this.addedTags = this.addedTags.concat(this.addDropdownTagInput);
            this.addDropdownTagInput = "";
        }
    }
});