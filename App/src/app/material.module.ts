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
import {MatSidenavModule} from "@angular/material";
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

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
        MatTableModule,
        MatSidenavModule,
        MatDividerModule,
        MatListModule
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
        MatTableModule,
        MatSidenavModule,
        MatDividerModule,
        MatListModule
    ]
})
export class Material{

}
