import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import {Module} from "module";
import { Category } from "./category.entity";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService]
})
export class CategoryModule {}