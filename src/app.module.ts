import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './cases/categories/category.module';
import { ProductModule } from './cases/products/product.module';
import { SpotModule } from './cases/spots/spot.module';

@Module({
  imports: [
  ConfigModule.forRoot({isGlobal: true}),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const databaseURL = configService.get<string>('DATABASE_URL');
      const dbschema = configService.get<string>('DATABASE_schema', 'public');

      if(!databaseURL){
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
  }),
  CategoryModule,
  ProductModule,
  SpotModule
  ],
})
export class AppModule {}
