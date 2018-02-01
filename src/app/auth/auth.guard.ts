import { Injectable } from '@angular/core';
import {
    CanActivate,
    CanLoad,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    Route
} from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private router: Router,
                private store: Store<fromApp.State>) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(fromApp.getIsAuth);
    }

    canLoad(route: Route) {
        return this.store.select(fromApp.getIsAuth);
    }
}
