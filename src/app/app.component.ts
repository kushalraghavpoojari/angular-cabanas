import { Component, Renderer2, Input, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSlideToggleChange } from '@angular/material';
import { CabanaSharedService } from './shared/services/cabana.shared.service';
import { UserOptionsModel } from './models/userOptions.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title = 'cabanas-angular';
    userOptions: UserOptionsModel;
    isValidResolution: boolean = true;
    @Input() enableModal: boolean = true;
    @Input() enableSnackBar: boolean = false;
    @Input() enableDarkMode: boolean = false;
    @Input() enableImageUpload: boolean = false;
    
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private overlay: OverlayContainer,
        private renderer: Renderer2,
        private sharedService: CabanaSharedService) { }

    ngOnInit() {
        this.sharedService.createUserOptions(this.enableDarkMode, this.enableModal, this.enableSnackBar, this.enableImageUpload);
        this.userOptions = this.sharedService.getUserOptions();
        this.sharedService.setUserOptions(this.userOptions);
        this.checkDeviceResolution();
    }

    /**
     * Checks if device resolution is valid
     */
    checkDeviceResolution(): void {
        this.isValidResolution = window.innerWidth >= 1024 && window.innerHeight >= 635;
    }
    
    /**
     * Toggles dark mode
     * @param event Mat slide toggle change event
     */
    toggleDarkMode(event: MatSlideToggleChange): void {
        const containerElement = this.overlay.getContainerElement();
        this.enableDarkMode = event.checked;
        if (event.checked) {
            this.renderer.removeClass(this.document.body, 'light-theme');
			this.renderer.removeClass(containerElement, 'light-theme');

			this.renderer.addClass(this.document.body, 'dark-theme');
			this.renderer.addClass(containerElement, 'dark-theme');
        } else {
            this.renderer.removeClass(this.document.body, 'dark-theme');
			this.renderer.removeClass(containerElement, 'dark-theme');

			this.renderer.addClass(this.document.body, 'light-theme');
			this.renderer.addClass(containerElement, 'light-theme');
        }
        this.userOptions.updateUserOptions(this.enableDarkMode, this.enableModal, this.enableSnackBar, this.enableImageUpload);
    }

    /**
     * Toggles notifying user with modal
     * @param event Mat slide toggle change event
     */
    toggleEnableModal(event: MatSlideToggleChange): void {
        this.enableModal = event.checked;
        this.enableSnackBar = !event.checked;
        this.userOptions.updateUserOptions(this.enableDarkMode, this.enableModal, this.enableSnackBar, this.enableImageUpload);
    }

     /**
     * Toggles notifying user with snackbar
     * @param event Mat slide toggle change event
     */
    toggleEnableSnackBar(event: MatSlideToggleChange): void {
        this.enableSnackBar = event.checked;
        this.enableModal = !event.checked;
        this.userOptions.updateUserOptions(this.enableDarkMode, this.enableModal, this.enableSnackBar, this.enableImageUpload);
    }

    toggleImageUpload(event: MatSlideToggleChange): void {
        this.enableImageUpload = !this.enableImageUpload;
        this.userOptions.updateUserOptions(this.enableDarkMode, this.enableModal, this.enableSnackBar, this.enableImageUpload);
    }
}
