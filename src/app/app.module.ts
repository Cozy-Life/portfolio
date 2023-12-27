import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/base/home/home.component';
import { SkillComponent } from './component/base/skill/skill.component';
import { QualificationComponent } from './component/base/qualification/qualification.component';
import { ExperienceComponent } from './component/base/experience/experience.component';
import { PartsButtonComponent } from './component/parts/parts-button/parts-button.component';
import { PartsTabGroupComponent } from './component/parts/parts-tab-group/parts-tab-group.component';
import { PartsCheckBoxComponent } from './component/parts/parts-check-box/parts-check-box.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SkillComponent,
    QualificationComponent,
    ExperienceComponent,
    PartsButtonComponent,
    PartsTabGroupComponent,
    PartsCheckBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
