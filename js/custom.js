let app = new Vue({
    el: "#app",
    data: {
        addDropdownTitleInput: "",
        addDropdownDescriptionInput: "",
        addedTags: new Set(),
        addDropdownTagInput: "",
        bookmarks: [],
        allTags: new Set(),
        searchInput: "",
        tagValidities: {}
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
                time: new Date(),
                hidden: false
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
                this.tagValidities[this.addDropdownTagInput] = true;
                this.addDropdownTagInput = "";
            }
        },
        filterBookmarks: function () {
            this.bookmarks = this.bookmarks.map(bookmark => {
                return {
                    title: bookmark.title,
                    description: bookmark.description,
                    tags: bookmark.tags,
                    time: bookmark.time,
                    hidden:
                        !((bookmark.title.indexOf(this.searchInput) > -1 ||
                        bookmark.description.indexOf(this.searchInput) > -1 ||
                        this.searchInput === "") &&
                        bookmark.tags.filter(tag => this.tagValidities[tag]).length > 0)
                }
            });
        },
        toggle: function (tag) {
            this.tagValidities[tag] = !this.tagValidities[tag];
            if (!this.tagValidities[tag]) {
                $("#btn-" + tag).addClass("not-selected");
            } else {
                $("#btn-" + tag).removeClass("not-selected");
            }
        }
    }
});