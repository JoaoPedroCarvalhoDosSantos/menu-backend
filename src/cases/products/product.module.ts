import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { Module } from "@nestjs/common";
import { Product } from "./product.entity";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule {}