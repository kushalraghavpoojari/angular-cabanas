import { Component, Renderer2, Input, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSlideToggleChange } from '@angular/material';
import { CabanaSharedService } from './shared/cabana.shared.service';
import { UserOptions } from './models/userOptions.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title = 'cabanas-angular';
    userOptions:UserOptions;
    isValidResolution: boolean = true;
    @Input() enableModal: boolean = true;
    @Input() enableSnackBar: boolean = false;
    @Input() enableDarkMode: boolean = false;
    
    constructor(private overlay: OverlayContainer, private renderer: Renderer2, private sharedService: CabanaSharedService) { }

    ngOnInit() {
        this.userOptions = new UserOptions(this.enableDarkMode, this.enableModal, this.enableSnackBar);
        this.sharedService.setUserOptions(this.userOptions);
        this.checkDeviceResolution();
    }

    checkDeviceResolution() {
        if(window.innerWidth >= 1024 && window.innerHeight >= 635) {
            this.isValidResolution = true;
        } else {
            this.isValidResolution = false;
        }
    }
    
    toggleDarkMode(event: MatSlideToggleChange): void {
        const containerElement = this.overlay.getContainerElement();
        this.enableDarkMode = event.checked;
        if (event.checked) {
            this.renderer.removeClass(document.body, 'light-theme');
			this.renderer.removeClass(containerElement, 'light-theme');

			this.renderer.addClass(document.body, 'dark-theme');
			this.renderer.addClass(containerElement, 'dark-theme');
        } else {
            this.renderer.removeClass(document.body, 'dark-theme');
			this.renderer.removeClass(containerElement, 'dark-theme');

			this.renderer.addClass(document.body, 'light-theme');
			this.renderer.addClass(containerElement, 'light-theme');
        }
        this.userOptions.updateUserOptions(this.enableDarkMode, this.enableModal, this.enableSnackBar);
    }

    toggleEnableModal(event: MatSlideToggleChange): void {
        this.enableModal = event.checked;
        this.enableSnackBar = !event.checked;
        this.userOptions.updateUserOptions(this.enableDarkMode, this.enableModal, this.enableSnackBar);
    }

    toggleEnableSnackBar(event: MatSlideToggleChange): void {
        this.enableSnackBar = event.checked;
        this.enableModal = !event.checked;
        this.userOptions.updateUserOptions(this.enableDarkMode, this.enableModal, this.enableSnackBar);
    }
}
