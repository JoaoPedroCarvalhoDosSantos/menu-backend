import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
  ConfigModule.forRoot({isGlobal: true}),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configServide: ConfigService) => {
      const databaseURL = configService.get<string>('DATABASE_URL');
      const dbschema = configService.get<string>('DATABASE_schema', 'public');

      if(databaseURL){
        throw new Error ('A variável de ambiente DATABASE_URL não foi encontrada!');
      }

      return{
        type: 'postgres',
        url:databaseURL,
        schema: dbschema,
        autoLoadEntities: true,
        synchronize: true
      }
    }
  })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
