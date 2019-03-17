import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CabanaSharedService } from '../shared/cabana.shared.service';
import { Router } from '@angular/router';

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

	constructor(private formBuilder: FormBuilder,
		private sharedService: CabanaSharedService,
		private router: Router) { }

	ngOnInit() {
		this.cabanaInformationForm = this.formBuilder.group({
			charac: ['', Validators.required],
			numberOfLocations: ['', Validators.required],
			imageName: ['', Validators.required],
			island: ['', Validators.required],
		});
		console.log(this.sharedService.getUserOptions());
	}

	addControl():void {
		this.locations.forEach((location) => {
			this.cabanaInformationForm.addControl(location.name, new FormControl('', Validators.required));
			this.cabanaInformationForm.addControl(location.resources, new FormControl('', Validators.required));
			this.cabanaInformationForm.addControl(location.resourceId, new FormControl());
		});
	}

	removeControl():void {
		const locationToBePoped = this.locations.pop();
		this.cabanaInformationForm.removeControl(locationToBePoped.name);
		this.cabanaInformationForm.removeControl(locationToBePoped.resources);
		this.cabanaInformationForm.removeControl(locationToBePoped.resourceId);
	}

	notifyUser(type: string):void {
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
		if (type === 'charac') {
			this.sharedService.notifyUser(characModalInfo, characSnackbarInfo);
		} else if (type === 'image') {
			this.sharedService.notifyUser(imageModalInfo, imageSnackBarInfo);
		}
	}

	buildLocations(event):void {
		console.log(event.target.value)
		const changedValue = event.target.value;

		if (Number(changedValue) < this.locations.length) {
			this.removeControl();
		}

		this.locations.length = 0;
		for (let i = 0; i< changedValue; i++) {
			this.locations.push({
				id: i,
				name: `location${i}`,
				resources: `location-${i}-resources`,
				resourceId: `location-${i}-resource-${i}-Id`
			});
		}
		this.addControl();
	}

	onClickNext():void {
		const formValues = this.cabanaInformationForm.value;
		this.sharedService.setCabanaInformation(formValues);
		if (this.cabanaInformationForm.status === 'VALID') {
			this.router.navigate(['/cabana/cabana-map-position']);
		}
	}
}
