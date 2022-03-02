import { Module } from '@nestjs/common';
import { MovieController } from './controllers/MovieController';
import { MovieService } from './services/MovieService';
import { HttpModule } from '@nestjs/axios';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
      baseURL: process.env.BASE_URL,
      params: { api_key: process.env.API_KEY },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend/build'),
    }),
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class AppModule {}
