import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CabanaSharedService } from '../shared/cabana.shared.service';
import { Router } from '@angular/router';
import { LocationModel } from '../models/location.model';

@Component({
	selector: 'app-cabana-resource-selection',
	templateUrl: './cabana-resource-selection.component.html',
	styleUrls: ['./cabana-resource-selection.component.scss']
})
export class CabanaResourceSelectionComponent implements OnInit {
	locations:Array<LocationModel>

	@Output() locationSelected: EventEmitter<Object> = new EventEmitter<Object>();
	constructor(private sharedService: CabanaSharedService, private router: Router) { }

	ngOnInit() {
		this.locations = this.sharedService.getLocations();
		this.locations.forEach((location) => {
			if (location.coordinatesAdded) {
				location.isSelected = false;
			}
		});
	}

	selectedResourceLocation(location) {
		this.locations.forEach(location => location.isSelected = false );
		if (!location.coordinatesAdded) {
			location.isSelected = true;
			this.sharedService.setCurrentSelectedLocation(location);
			console.log(this.sharedService.getLocations());
		}
	}

	onNextClicked() {
		this.router.navigate(['/cabana/cabana-resource']);
	}
}
