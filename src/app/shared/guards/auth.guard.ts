import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../data-access/auth.service';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}

export const AuthGuard: CanActivateFn = (): boolean => {
  return inject(PermissionsService).canActivate();
}