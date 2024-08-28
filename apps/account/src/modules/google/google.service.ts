import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { GoogleInfo } from './interfaces/google-info.interface';

@Injectable()
export class GoogleService {
  private client = new OAuth2Client();

  async verifyCode(token: string): Promise<GoogleInfo> {
    this.client.setCredentials({ access_token: token });
    const userinfo = await this.client.request({
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
    });
    return userinfo.data as GoogleInfo;
  }
}
