import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CabanaSharedService } from '../shared/services/cabana.shared.service';
import { Router } from '@angular/router';
import { UserOptionsModel } from '../models/userOptions.model';

@Component({
	selector: 'app-cabana-info',
	templateUrl: './cabana-info.component.html',
	styleUrls: ['./cabana-info.component.scss']
})
export class CabanaInfoComponent implements OnInit {
	cabanaInformationForm: FormGroup;
	islands = [ 'accesso10', 'accesso14', 'accesso15', 'accesso16', 'accesso17', 'accesso18', 'accesso21', 'accesso23', 'accesso24', 'accesso25', 'accesso26', 'accesso27', 
				'accesso28', 'accesso29', 'accesso30', 'accesso31', 'accesso32', 'accesso33', 'accesso34', 'accesso35', 'accesso36', 'accesso37', 'accesso38', 'accesso39',
				'accesso40', 'accesso41', 'accesso48', 'accesso70', 'accesso90', 'accesso95', 'accesso96', 'accesso97', 'accesso99', 'accesso75',
				'brevard', 'demo', 'demoUS', 'demoSWPOC', 'demoSki', 'demoCulture', 'DemoHK', 'DemoUK', 'SixFlagsV3'
			];
	locations = [];
	captureImageDetails: boolean = false;

	constructor(private formBuilder: FormBuilder,
		private sharedService: CabanaSharedService,
		private router: Router) { }

	ngOnInit() {
		const userOptions: UserOptionsModel = this.sharedService.getUserOptions();
		this.cabanaInformationForm = this.formBuilder.group({
			charac: ['', Validators.required],
			numberOfLocations: ['', Validators.required],
			imageName: ['', Validators.required],
			island: ['', Validators.required],
		});
		this.sendStateEvent();
	}

	/**
	 * Send Current State
	 */
	sendStateEvent(): void {
		this.sharedService.stateChanged(1);
	}


	/**
	 * Notify User about selected field
	 * @param filed notification field
	 */
	notifyUser(field: string): void {
		const characModalInfo = {
				info :'Please follow "cabanapopup-[island-shorthand]-[cabana-type]" format',
				additionalInfo: 'Eg: cabanapopup-pelc-standard'
			},
			imageModalInfo = {
				info: 'Please enter the full map image name with extension',
				additionalInfo: 'Eg: fullImageName.jpg'
			},
			characSnackbarInfo = 'Please follow "cabanapopup-[island-shorthand]-[cabana-type]" format',
			imageSnackBarInfo = 'Please enter the full map image name with extension';
		if (field === 'charac') {
			this.sharedService.notifyUser(characModalInfo, characSnackbarInfo);
		} else if (field === 'image') {
			this.sharedService.notifyUser(imageModalInfo, imageSnackBarInfo);
		}
	}

	/**
	 * Build Locations
	 * @param event mouse blurr event
	 */
	buildLocations(event: MouseEvent): void {
		const changedValue = +(<HTMLInputElement>event.target).value;

		if (changedValue < this.locations.length) {
			this.removeControl();
		}

		this.locations.length = 0;
		for (let i = 0; i < changedValue; i++) {
			this.locations.push({
				id: i,
				name: `location${i}`,
				resources: `location-${i}-resources`,
				resourceId: `location-${i}-resource-${i}-Id`
			});
		}
		this.addControl();
	}

	/**
	 * Add Control to the form
	 */
	addControl(): void {
		this.locations.forEach((location) => {
			this.cabanaInformationForm.addControl(location.name, new FormControl('', Validators.required));
			this.cabanaInformationForm.addControl(location.resources, new FormControl('', Validators.required));
			this.cabanaInformationForm.addControl(location.resourceId, new FormControl());
		});
	}

	/**
	 * Remove control from the form
	 */
	removeControl(): void {
		const locationPoped = this.locations.pop();
		this.cabanaInformationForm.removeControl(locationPoped.name);
		this.cabanaInformationForm.removeControl(locationPoped.resources);
		this.cabanaInformationForm.removeControl(locationPoped.resourceId);
	}
	

	/**
	 * Navigate on click
	 */
	onClickNext(): void {
		const formValues = this.cabanaInformationForm.value;
		this.sharedService.setCabanaInformation(formValues);
		if (this.cabanaInformationForm.status === 'VALID') {
			this.router.navigate(['/cabana/cabana-map-position']);
		}
	}
}
