import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { Institution } from './entities/institution.entity';
import { v4 as uuidv4 } from 'uuid';
const bcrypt = require('bcrypt');

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(Institution)
    private institutionsRepository: Repository<Institution>,
  ) {}

  async createInstitution(
    createInstitutionDto: CreateInstitutionDto,
  ): Promise<Institution> {
    const newInstitution = await this.institutionsRepository.create(
      createInstitutionDto,
    );
    newInstitution.id = uuidv4();
    newInstitution.privateKey = uuidv4();

    const newInstitutionHashedKey = { ...newInstitution };

    await bcrypt.hash(newInstitutionHashedKey.privateKey, 10).then((hash) => {
      newInstitutionHashedKey.privateKey = hash;
      this.institutionsRepository.save(newInstitutionHashedKey);
    });
    return newInstitution;
  }
}

/* create(createInstitutionDto: CreateInstitutionDto) {
    return 'This action adds a new institution';
  }

  findAll() {
    return `This action returns all institutions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} institution`;
  }

  update(id: number, updateInstitutionDto: UpdateInstitutionDto) {
    return `This action updates a #${id} institution`;
  }

  remove(id: number) {
    return `This action removes a #${id} institution`;
  } */
