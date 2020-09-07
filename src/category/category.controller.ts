import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {Repository} from "typeorm";
import {Category} from "./category.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Controller('categories')
export class CategoryController {
    
    constructor(
        @InjectRepository(Category)
        private categoryRepo: Repository<Category>
    ) {}

    @Get()
    async findAll(): Promise<Category[]> {
        return await this.categoryRepo.find();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Category> {
        return this.categoryRepo.findOneOrFail({id});
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() category: Category): Promise<Category> {
        await this.categoryRepo.findOneOrFail({id});
        await this.categoryRepo.update({id}, category);
        return this.categoryRepo.findOneOrFail(id);
    }

    @Post()
    async store(@Body() body: Category): Promise<Category> {
        const category = this.categoryRepo.create(body);
        return await this.categoryRepo.save(category);
    }

    @Delete(':id')
    @HttpCode(204)
    async destroy(@Param('id') id: string) {
        await this.categoryRepo.delete(id);
    }

}
