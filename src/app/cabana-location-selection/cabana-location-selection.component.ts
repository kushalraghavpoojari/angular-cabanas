import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CabanaSharedService } from '../shared/services/cabana.shared.service';
import { Router } from '@angular/router';
import { LocationModel } from '../models/location.model';

@Component({
	selector: 'app-cabana-location-selection',
	templateUrl: './cabana-location-selection.component.html',
	styleUrls: ['./cabana-location-selection.component.scss']
})
export class CabanaLocationSelectionComponent implements OnInit {
	locations: Array<LocationModel>

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

	/**
	 * Set location as selected for which resources has to be added
	 * @param location selected/ clicked location
	 */
	selectLocation(location: LocationModel): void {
		this.locations.forEach(location => location.isSelected = false );
		if (!location.coordinatesAdded) {
			location.isSelected = true;
			this.sharedService.setCurrentSelectedLocation(location);
		}
	}

	/**
     * Navigate to next route
     */
	onNextClicked(): void {
		this.router.navigate(['/cabana/cabana-resource']);
	}

	/**
     * Navigate to previous route
     */
	goBack(): void {
		this.router.navigate(['cabana/cabana-map-position']);
	}
}
