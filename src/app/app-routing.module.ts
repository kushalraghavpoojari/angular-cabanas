import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CabanaComponent } from './cabana/cabana.component';

import { CabanaInfoComponent } from './cabana-info/cabana-info.component';
import { CabanaMapPositionComponent } from './cabana-map-position/cabana-map-position.component';
import { CabanaResourceSelectionComponent } from './cabana-resource-selection/cabana-resource-selection.component';
import { CabanaResourceComponent } from './cabana-resource/cabana-resource.component';
import { FinalComponent } from './final/final.component';

export const routes: Routes = [{
        path: '',
        component: HomeComponent
    }, {
        path: 'cabana',
        component: CabanaComponent,
        children: [{
                path: '',
                component: CabanaInfoComponent
            }, {
                path: 'cabana-map-position',
                component: CabanaMapPositionComponent
            }, {
                path: 'cabana-resource-selection',
                component: CabanaResourceSelectionComponent
            }, {
                path: 'cabana-resource',
                component: CabanaResourceComponent
            }, {
                path: 'cabana-final',
                component: FinalComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
