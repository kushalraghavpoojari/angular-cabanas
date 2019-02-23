import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CabanaSharedService } from '../shared/cabana.shared.service';
import { Router } from '@angular/router';
import { ModalComponent } from '../shared/Modal/modal.component';

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
	info:string;

	@Input() stepper;

	constructor(public snackBar: MatSnackBar,
		private formBuilder: FormBuilder,
		private sharedService: CabanaSharedService,
		private router: Router,
		public dialog: MatDialog) { }

	ngOnInit() {
		this.cabanaInformationForm = this.formBuilder.group({
			charac: ['', Validators.required],
			numberOfLocations: ['', Validators.required],
			imageName: ['', Validators.required],
			island: ['', Validators.required],
		});
		console.log(this.sharedService.getUserOptions());
	}

	addControl() {
		this.locations.forEach((location) => {
			this.cabanaInformationForm.addControl(location.name, new FormControl('', Validators.required));
			this.cabanaInformationForm.addControl(location.resources, new FormControl('', Validators.required));
			this.cabanaInformationForm.addControl(location.resourceId, new FormControl());
		});
	}
	
	openSnackBar(snackBarType: string) {
		if (snackBarType === 'charac') {
			this.snackBar.open('Please follow "cabanapopup-[island-shorthand]-[cabana-type]" format', 'Got it');
		} else if (snackBarType === 'image') {
			this.snackBar.open('Please enter the full map image name with extension', 'Got it');
		}
	}

	openDialog():void {
		this.dialog.open(ModalComponent, {
			width: '550px',
			data: {
				info: 'Please follow "cabanapopup-[island-shorthand]-[cabana-type]" format',
				additionalInfo: 'Eg: cabanapopup-pelc-standard'
			}
		});
	}

	buildLocations(event) {
		console.log(event.target.value)
		this.locations.length = 0;
		for (let i = 0; i< event.target.value; i++) {
			this.locations.push({
				id: i,
				name: `location${i}`,
				resources: `location-${i}-resources`,
				resourceId: `location-${i}-resource-${i}-Id`
			});
		}
		this.addControl();
	}

	onClickNext() {
		const formValues = this.cabanaInformationForm.value;
		this.sharedService.setCabanaInformation(formValues);
		if (this.cabanaInformationForm.status === 'VALID') {
			this.router.navigate(['/cabana/cabana-map-position']);
		}
	}

}
