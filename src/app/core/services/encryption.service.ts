import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  SECRET_KEY = 'my-secret-key-123';

  encrypt(data: any): string {
    const json = JSON.stringify(data);
    return CryptoJS.AES.encrypt(json, this.SECRET_KEY).toString();
  }

  decrypt(cipherText: string): any {
    const bytes = CryptoJS.AES.decrypt(cipherText, this.SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  }
}
