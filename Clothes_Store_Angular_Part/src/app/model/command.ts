import { CommandLine } from "./commandline";

import { Product } from "./product";

export class Command {
  id: number;
  user_id: number;
  state: string;
  date: Date;
  adresse: string;
  town: string;
  postal_code: number;
  total_price: number;
  phone_number: number;
  // products: Product[];
  command_lines: CommandLine[];
  deliveryPersonId: number;
}