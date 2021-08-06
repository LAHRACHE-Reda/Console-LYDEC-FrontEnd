import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {MainComponent} from '@modules/main/main.component';


import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ConsommationComponent} from "@pages/consommation/consommation.component";
import {BlankComponent} from "@pages/blank/blank.component";


const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'postes',
                component: BlankComponent
            },
            {
                path: '',
                component: DashboardComponent
            },
            {
              path: 'consommation',
              component: ConsommationComponent
            }
        ]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
