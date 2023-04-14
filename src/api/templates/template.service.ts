import { Inject, Injectable } from '@nestjs/common';
import { TEMPLATE_REPOSITORY } from 'src/models/constants';
import { Template } from 'src/models/template/template.dwc.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TemplateService {
  constructor(
    @Inject(TEMPLATE_REPOSITORY)
    private readonly templateRepository: Repository<Template>,
  ) {}

  async getTemplate(name: string): Promise<Template> {
    return this.templateRepository
      .createQueryBuilder('templates')
      .where('templates.name = :name', { name })
      .getOne();
  }
}
