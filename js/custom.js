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
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    {code: 'document.documentElement.scrollTop'},
                    (results) => {
                        app.bookmarks = app.bookmarks.concat({
                            title: app.addDropdownTitleInput,
                            description: app.addDropdownDescriptionInput,
                            tags: Array.from(app.addedTags),
                            time: new Date(),
                            hidden: false,
                            position: results[0]
                        });
                        app.addDropdownTitleInput = "";
                        app.addDropdownDescriptionInput = "";
                        app.addDropdownTagInput = "";
                        app.addedTags = new Set();
                    }
                );
            });
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
                    position: bookmark.position,
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
        },
        scrollTo: function (position) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    {code: 'window.scrollTo(' + position + ', 0);'}
                );
            });
        }
    }
});