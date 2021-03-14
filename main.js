import Vue from "https://unpkg.com/vue";

var app = new Vue({
    el: '#app',
    data: {
        url: null,
        bitlyToken: '50226b2f52086ef66b91d0ea2def2e95c303dbe5',
        shortenUrl: null
    },
    methods: {
        executeShortenUrl() {
            if (this.url === null || this.url === "") {
                alert("Please type or paste your link")
                return
            }
            this.shortenUrl = null
            const data = {
                "domain": "bit.ly",
                "long_url": this.url
            }
            var xhr = new XMLHttpRequest()
            xhr.addEventListener("load", (response) => {
                if (response.currentTarget.readyState === 4 && (response.currentTarget.status === 200 || response.currentTarget.status === 201)) {
                    this.shortenUrl = JSON.parse(xhr.responseText).link
                } else {
                    alert(JSON.parse(response.currentTarget.responseText).description)
                }
            })
            xhr.addEventListener("error", function(e) {
                alert("Sorry, Getting Unexpected Error :(");
            }, false);
            xhr.open("POST", "https://api-ssl.bitly.com/v4/shorten")
            xhr.setRequestHeader("Authorization", '50226b2f52086ef66b91d0ea2def2e95c303dbe5')
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.send(JSON.stringify(data))
        },
        copyShortenUrl() {
            navigator.clipboard.writeText(this.shortenUrl).then(() => {
                    var tooltip = document.getElementById("tooltipcopy");
                    tooltip.innerHTML = "URL has been copied"
                })
                .catch((error) => {
                    alert(`Copy failed! ${error}`)
                })
        },
        outFunc() {
            var tooltip = document.getElementById("tooltipcopy");
            tooltip.innerHTML = "Copy to clipboard";
        }
    }
})