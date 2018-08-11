import { RateSummeryComponent } from './rate-summery/rate-summery.component';
import { RouterModule, Routes } from '@angular/router';

const APP_ROUTS : Routes =[
    {path:'', component:RateSummeryComponent}
]

export const routers=RouterModule.forRoot(APP_ROUTS);