import { IsOptional } from 'class-validator';

export class SaveOrderdto {
  @IsOptional()
  user?: any;

  orderItems: string;
  cartTotal: number;
  revenue: number;
  status: boolean;
  isPaid: string;
  address: string;
  phone: string;
  trans: string;
  @IsOptional()
  guest?: string;
}

export default SaveOrderdto;
