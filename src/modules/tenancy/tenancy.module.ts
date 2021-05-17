import { BadRequestException, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TenancyService } from './tenancy.service';
import { TenancyController } from './tenancy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { Connection, createConnection, getConnection } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { TenancyProvider } from './tenancy.provider';
import { User } from '../user/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  providers: [TenancyService, TenancyProvider],
  exports: [TenancyProvider],
  controllers: [TenancyController]
})
export class TenancyModule {
  constructor(private readonly connection: Connection, private readonly tenantService: TenancyService) { }
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(async (req: Request, res: Response, next: NextFunction) => {
        const name: string = req.params['tenant'];
        const tenant: Tenant = await this.tenantService.findByName(name);
        if (!tenant) {
          throw new BadRequestException('Database Connection Error', 'This tenant does not exists');
        }
        if (!tenant.active) {
          throw new BadRequestException('Tenant Inactived', 'This tenant is not active');
        }
        try {
          getConnection(tenant.name);
          next();
        } catch (e) {
          const migrationdirProd = 'dist/modules/database/migrations/tenant/*.js';
          const createdConnection: Connection = await createConnection({
            name: tenant.name,
            type: 'postgres',
            host: tenant.host,
            port: +tenant.port,
            username: tenant.username,
            password: tenant.password,
            database: tenant.name,
            entities: [
              User
            ],
            ssl: tenant.ssl,
            synchronize: true,
            migrationsRun: false,
            migrations: [migrationdirProd]
          });
          if (createdConnection) {
            next();
          } else {
            throw new BadRequestException('Database Connection Error', 'There is a Error with the Database!');
          }
        }
      })
      .exclude({ path: '/api/tenancy', method: RequestMethod.ALL })
      .forRoutes('*');
  }
}
