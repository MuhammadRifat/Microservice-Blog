import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { IPaginateMysql } from 'src/common/dtos/dto.common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      const data = await this.paymentService.create(createPaymentDto);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('bulk')
  async bulkCreate() {
      try {
          const data = await this.paymentService.bulkCreate();

          return {
              success: true,
              data
          }
      } catch (error) {
          throw new HttpException(error.message, error.status);
      }
  }

  @Get()
  async findAll(@Query() paginate: IPaginateMysql) {
    try {
      const data = await this.paymentService.findAll(paginate);

      return {
        success: true,
        ...data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('test')
  async getAllWithUser() {
    try {
      const data = await this.paymentService.getAllWithUser();

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.paymentService.findOne(+id);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    try {
      const data = await this.paymentService.update(+id, updatePaymentDto);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const data = await this.paymentService.remove(+id);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  
}
