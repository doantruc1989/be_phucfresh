import { PartialType } from "@nestjs/swagger";
import { NewProductDto } from "./newProduct.dto";


export class UpdateProductDto extends PartialType(NewProductDto) {}