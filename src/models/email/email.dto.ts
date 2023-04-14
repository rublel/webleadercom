import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class emailDto {
  to: Destination[];
  templateId: string;
  params: Params;
}

export class Destination {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export type Params = ImpayeEmailParams;
export type ImpayeEmailParams = {
  month: string;
  year: string;
  monthly_price: number;
};
