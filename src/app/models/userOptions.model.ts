export class UserOptionsModel {
    public darkMode: boolean;
    public modal: boolean;
    public snackBar: boolean;
    public uploadImage: boolean;

    constructor(darkMode: boolean, modal: boolean, snackbar: boolean, uploadImage: boolean) {
        this.darkMode = darkMode;
        this.modal = modal;
        this.snackBar = snackbar;
        this.uploadImage = uploadImage;
    }

    updateUserOptions(darkMode: boolean, modal: boolean, snackbar: boolean, uploadImage: boolean) {
        this.darkMode = darkMode;
        this.modal = modal;
        this.snackBar = snackbar;
        this.uploadImage = uploadImage;
    }

    notifyUsingModal() {
        return this.modal;
    }
}