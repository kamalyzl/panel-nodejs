import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'postgres',
    database: 'storedb',
    entities: [Customer],
    synchronize: true, // ⚠️ Solo en desarrollo
  }),
  CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
