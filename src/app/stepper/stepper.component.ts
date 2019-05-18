import { Component, OnInit } from '@angular/core';
import { CabanaSharedService } from '../shared/services/cabana.shared.service';


@Component({
	selector: 'app-stepper',
	templateUrl: './stepper.component.html',
	styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
    states = [{
        number: 1,
        active: false,
        name: 'CabanaInformation'
    }, {
        number: 2,
        active: false,
        name: 'Cabana Map'
    }, {
        number: 3,
        active: false,
        name: 'Location Selection'
    }, {
        number: 4,
        active: false,
        name: 'Resource Map'
    }, {
        number: 5,
        active: false,
        name: 'App Conifg'
    }]
    constructor(private sharedService: CabanaSharedService) { }
    
	ngOnInit() {
        this.sharedService.currentState.subscribe((stateNumber) => {
            if (stateNumber === 1) {
                // reset all previous states to in-active
                this.states.forEach(function(stateInfo) {
                    stateInfo.active = false;
                });
                this.states[0].active = true;
            } else {
                const activeState = this.states.find(stateInfo => stateInfo.number === stateNumber);
                activeState.active = true;
            }
        });
    }


}
