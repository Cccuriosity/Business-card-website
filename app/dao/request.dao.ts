import { RequestDTO } from "@/app/dto/request.dto";
import { Request } from "@/app/types/request";

export function mapRequestToDomain(dto: RequestDTO): Request {
    return {
        id: dto.id,
        carName: dto.car_name ?? undefined,
        callTime: dto.call_time ?? undefined,
        comment: dto.comment ?? undefined,
        isSolved: dto.is_solved,
        createdAt: dto.created_at,
    };
}
