import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing
import { SecurityRoutingModule } from './security-routing.module';

//Components
import { SecurityUsersComponent } from './views/users/index/index.component';
import { FeatureEditComponent } from './views/users/edit/edit.component';

//Services
import { UsersService } from './services/users.service';

// Shared
import { CoreModule } from '@shared_core/core.module';
import { ComponentsModule } from '@shared_components/components.module';


@NgModule({
    imports: [
        SecurityRoutingModule,
        CommonModule,
        CoreModule,
        ComponentsModule
    ],
    declarations: [
        SecurityUsersComponent,
        FeatureEditComponent
    ],
    providers: [UsersService]
})
export class SecurityModule { }
