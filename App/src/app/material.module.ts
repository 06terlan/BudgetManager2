import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatInputModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatBadgeModule,
        MatTableModule
    ],
    exports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatInputModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatBadgeModule,
        MatTableModule
    ]
})
export class Material{

}