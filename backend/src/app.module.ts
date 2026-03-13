import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';

export const buildTypeOrmOptions = (configService: ConfigService) => ({
  type: 'postgres' as const,
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: Number(configService.get<string>('DB_PORT', '5432')),
  username: configService.get<string>('DB_USER', 'postgres'),
  password: configService.getOrThrow<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME', 'postgres'),
  autoLoadEntities: true,
  synchronize: configService.get<string>('DB_SYNC', 'true') === 'true',
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: buildTypeOrmOptions,
    }),
    AuthModule,
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
