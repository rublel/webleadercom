import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import appConfig from '../../config/app/';
import { emailDto } from 'src/models/email/email.dto';
import { TEMPLATE_REPOSITORY } from 'src/models/constants';
import { Repository } from 'typeorm';
import { Template } from 'src/models/template/template.dwc.entity';

@Injectable()
export class SendinblueService {
  constructor(
    @Inject(TEMPLATE_REPOSITORY)
    private templateRepository: Repository<Template>,
  ) {}

  async sendMail({ to, subject, htmlContent }: emailDto) {
    const url = 'https://api.sendinblue.com/v3/smtp/email';
    const data = {
      sender: {
        name: 'Support - Proxi Groupe',
        email: 'support@proxigroupe.com',
      },
      to,
      replyTo: {
        email: 'reseau.proxi.groupe@gmail.com',
        name: 'Support - Proxi Groupe',
      },
      subject,
      htmlContent,
    };
    const headers = {
      'Content-Type': 'application/json',
      'api-key': appConfig.sendInBlue.apiKey,
    };

    const circularReplacer = () => {
      const seen = new WeakSet();
      return (k, v) => {
        if (typeof v === 'object' && v !== null) {
          if (seen.has(v)) return;
          seen.add(v);
        }
        return v;
      };
    };
    const response = await axios.post(url, data, { headers });
    return JSON.parse(JSON.stringify(response, circularReplacer()));
  }
}
