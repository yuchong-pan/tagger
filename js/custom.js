let app = new Vue({
    el: "#app",
    data: {
        addDropdownTitleInput: "",
        addDropdownDescriptionInput: "",
        addedTags: new Set(),
        addDropdownTagInput: "",
        bookmarks: [],
        allTags: new Set()
    },
    methods: {
        addBookmark: function () {
            if (this.addDropdownTitleInput === "") {
                alertify.error("Title cannot be empty.");
                return;
            }
            this.bookmarks = this.bookmarks.concat({
                title: this.addDropdownTitleInput,
                description: this.addDropdownDescriptionInput,
                tags: Array.from(this.addedTags),
                time: new Date()
            });
            this.addDropdownTitleInput = "";
            this.addDropdownDescriptionInput = "";
            this.addDropdownTagInput = "";
            this.addedTags = new Set();
        },
        addTag: function () {
            if (this.addDropdownTagInput !== "") {
                this.addedTags.add(this.addDropdownTagInput);
                this.allTags.add(this.addDropdownTagInput);
                this.addDropdownTagInput = "";
            }
        }
    }
});