import { PartialType } from "@nestjs/swagger";
import { NewProductVariantDto } from "./newProductVariant.dto";


export class UpdateProductVariantDto extends PartialType(NewProductVariantDto) {}