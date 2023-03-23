import { PartialType } from "@nestjs/swagger";
import { NewReviewDto } from "./newReview.dto";

export class UpdateReviewDto extends PartialType(NewReviewDto) {}