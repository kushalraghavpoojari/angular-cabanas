export class UserOptions {
    public darkMode: boolean;
    public modal: boolean;
    public snackBar: boolean;

    constructor(darkMode: boolean, modal: boolean, snackbar: boolean) {
        this.darkMode = darkMode;
        this.modal = modal;
        this.snackBar = snackbar;
    }

    updateUserOptions(darkMode: boolean, modal: boolean, snackbar: boolean) {
        this.darkMode = darkMode;
        this.modal = modal;
        this.snackBar = snackbar;
    }

    notifyUsingModal() {
        return this.modal;
    }
}