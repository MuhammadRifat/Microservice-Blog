"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePaymentDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_payment_dto_1 = require("./create-payment.dto");
class UpdatePaymentDto extends (0, mapped_types_1.PartialType)(create_payment_dto_1.CreatePaymentDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdatePaymentDto = UpdatePaymentDto;
//# sourceMappingURL=update-payment.dto.js.map