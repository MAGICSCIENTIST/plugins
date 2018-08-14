module.exports = {
    isPluginsAdded: function () {
        return typeof swal === "object"
    },
    getMessage: function (msg) {
        if (typeof msg === "object") {
            if (msg.responseText) {
                return msg.responseText;
            }
        }

        return msg + []; //to string
    },
    alert: function (title, msg, type) {
        if (this.isPluginsAdded()) {
            swal(title, this.getMessage(msg), type)
        } else {
            alert(title, this.getMessage(msg))
        }
    },
    error: function (title, msg) {
        this.alert(title, msg, 'error')
    },
    success: function (title, msg) {
        this.alert(title, msg, 'success')
    }
}