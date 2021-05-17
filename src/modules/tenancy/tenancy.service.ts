import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateTenantDto, GetTenantDto } from './dto';
import { Tenant } from './entities/tenant.entity';
import * as CryptoJS from "crypto-js";


@Injectable()
export class TenancyService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>
  ) { }

  encryptKey = CryptoJS.SHA256(process.env.CRYPT_KEY)
  iv = CryptoJS.enc.Base64.parse("");

  async findAll(): Promise<GetTenantDto[]> {
    try {
      const tenants = await this.tenantRepository.find();
      return tenants.map((tenant) => plainToClass(GetTenantDto, tenant));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findByName(name: string) {
    try {
      const tenant = await this.tenantRepository.findOne({ name });
      return tenant
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private encryptProperties(objectToCrypt: any): any {
    const cryptedObject = {}
    Object.keys(objectToCrypt).forEach((key) => {
      cryptedObject[key] = CryptoJS.AES.encrypt(objectToCrypt[key], this.encryptKey, {
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString()
    })
    return cryptedObject;
  }

  private generateCypher(tenant: any): any {
    const payload = this.encryptProperties(tenant);
    return payload
  }

  private decryptValue(valueToDecrypt: any): any {
    return CryptoJS.AES.decrypt(valueToDecrypt, this.
      encryptKey, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8)
  }

  private encryptedTenantkeys = ['host', 'port', 'username', 'password', 'description']

  private decryptTenant(tenant: any): any {
    const decryptedTenant = {}
    Object.keys(tenant).forEach((propertyKey) => {
      if (this.encryptedTenantkeys.includes(propertyKey)) {
        decryptedTenant[propertyKey] = this.decryptValue(tenant[propertyKey])
      } else {
        decryptedTenant[propertyKey] = tenant[propertyKey]
      }
    })
  }

  async create(tenant: CreateTenantDto): Promise<GetTenantDto> {
    try {
      const token = this.generateCypher(tenant)
      const createdTenant = await this.tenantRepository.save({
        name: tenant.name,
        host: token.host,
        port: token.port,
        username: token.username,
        password: token.password,
        ssl: token.ssl,
        description: token.description
      });
      return this.decryptTenant(createdTenant);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
