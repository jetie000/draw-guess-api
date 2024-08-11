import { Global, Module } from '@nestjs/common';
import { dotenvLoader, TypedConfigModule } from 'nest-typed-config';
import { CommonService } from './common.service';
import { Config } from './config';

@Global()
@Module({
  imports: [
    TypedConfigModule.forRoot({
      schema: Config,
      load: dotenvLoader({
        envFilePath: '.env.development',
      }),
      isGlobal: true,
    }),
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
