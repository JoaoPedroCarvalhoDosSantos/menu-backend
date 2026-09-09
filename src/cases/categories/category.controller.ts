import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  HttpCode, 
  HttpStatus, 
  Param, 
  ParseUUIDPipe, 
  Patch, 
  Post 
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Category } from "./category.entity";
import { CreateCategoryDto } from "./dto/create-category";
import { UpdateCategoryDto } from "./dto/update-category";

@Controller('categories')
export class CategoryController {

    constructor(
        private readonly service: CategoryService
    ) {}

    @Get()
    findAll(): Promise<Category[]> {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(
        @Param('id', ParseUUIDPipe) id: string
    ): Promise<Category> {
        return this.service.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateCategoryDto): Promise<Category> {
        return this.service.create(dto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateCategoryDto,
    ): Promise<Category> {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
        @Param('id', ParseUUIDPipe) id: string
    ): Promise<void> {
        await this.service.remove(id);
    }
}