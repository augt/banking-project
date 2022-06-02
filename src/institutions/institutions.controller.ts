import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Request, UseGuards } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { Institution } from './entities/institution.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Post('signup')
  async createInstitution(@Body() body: CreateInstitutionDto): Promise<Institution> {
     const newInstitution = await this.institutionsService.createInstitution(body);
      return newInstitution;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateInstitution(@Param('id') id: string, @Body() updateInstitutionDto: UpdateInstitutionDto, @Request() req) {
    const institution = await this.institutionsService.updateInstitution(id, updateInstitutionDto, req);
    return {msg: "institution updated"}
  }
  
}



/* @Post()
  create(@Body() createInstitutionDto: CreateInstitutionDto) {
    return this.institutionsService.create(createInstitutionDto);
  }

  @Get()
  findAll() {
    return this.institutionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.institutionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstitutionDto: UpdateInstitutionDto) {
    return this.institutionsService.update(+id, updateInstitutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.institutionsService.remove(+id);
  } */