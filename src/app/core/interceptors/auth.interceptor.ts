import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const encryptionService = inject(EncryptionService);
  const shouldEncrypt = environment.encryption;
  const token = authService.getToken();

  let modifiedReq = req;

  //Encrypt request body
  if (shouldEncrypt && req.body) {
    const encryptedBody = encryptionService.encrypt(req.body);

    modifiedReq = req.clone({
      body: { data: encryptedBody }, // sending inside data key
    });
  }

  //Authorization header
  if (token) {
    modifiedReq = modifiedReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  //Decrypt response body
  return next(modifiedReq).pipe(
    map((event) => {
      if (event instanceof HttpResponse && shouldEncrypt) {
        const body = event.body as { data?: string };

        if (body?.data) {
          try {
            const decrypted = encryptionService.decrypt(body.data);
            return event.clone({ body: decrypted });
          } catch (err) {
            console.warn('Decryption failed:', err);
          }
        }
      }
      return event;
    })
  );
};
