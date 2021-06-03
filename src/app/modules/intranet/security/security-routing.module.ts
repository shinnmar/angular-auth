import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SecurityUsersComponent } from './views/users/index/index.component';

@NgModule({
    imports: [
        RouterModule,
        RouterModule.forChild([
            {
                path: 'users',
                component: SecurityUsersComponent
            },
            {
                path: '',
                redirectTo: 'users',
                pathMatch: 'full',
            }
        ])
    ],
    exports: [RouterModule]
})
export class SecurityRoutingModule { }
