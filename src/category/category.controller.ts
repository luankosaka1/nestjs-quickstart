import { CategoryResponse } from './../api-doc/category.response';
import {Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors, ValidationPipe} from '@nestjs/common';
import {Repository} from "typeorm";
import {Category} from "./category.entity";
import {InjectRepository} from "@nestjs/typeorm";
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CategoryDto } from 'src/dto/category.dto';

@UseInterceptors(ClassSerializerInterceptor)
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

    @ApiOkResponse({type: CategoryResponse})
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

    @ApiCreatedResponse({type: CategoryResponse})
    @Post()
    async store(@Body(new ValidationPipe({
        errorHttpStatusCode: 422
    })) body: CategoryDto): Promise<Category> {
        const category = this.categoryRepo.create(body);
        return await this.categoryRepo.save(category);
    }

    @Delete(':id')
    @HttpCode(204)
    async destroy(@Param('id') id: string) {
        await this.categoryRepo.delete(id);
    }

}
