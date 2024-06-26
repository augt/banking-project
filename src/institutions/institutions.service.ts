import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { Institution } from './entities/institution.entity';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(Institution)
    private institutionsRepository: Repository<Institution>,
  ) {}

  async createInstitution(
    createInstitutionDto: CreateInstitutionDto,
  ): Promise<Institution> {
    const newInstitution =
      await this.institutionsRepository.create(createInstitutionDto);
    newInstitution.id = uuidv4();
    newInstitution.privateKey = uuidv4();

    const newInstitutionHashedKey = { ...newInstitution };

    await hash(newInstitutionHashedKey.privateKey, 10).then((hash) => {
      newInstitutionHashedKey.privateKey = hash;
      this.institutionsRepository.save(newInstitutionHashedKey);
    });
    return newInstitution;
  }

  async getOneById(id: string): Promise<Institution> {
    try {
      const institution = await this.institutionsRepository.findOneBy({ id });
      return institution;
    } catch (err) {
      //handle error
      throw err;
    }
  }

  async updateInstitution(
    id: string,
    updateInstitutionDto: UpdateInstitutionDto,
    req,
  ): Promise<Institution> {
    try {
      if (req.user.id !== id) {
        throw new UnauthorizedException();
      }
      const institution = await this.getOneById(id);

      const updatedInstitution = { ...institution, ...updateInstitutionDto };

      return this.institutionsRepository.save(updatedInstitution);
    } catch {
      if (req.user.id !== id) {
        throw new UnauthorizedException();
      }
      throw new NotFoundException();
    }
  }
}
