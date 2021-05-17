import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { TenancyModule } from './modules/tenancy/tenancy.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UserModule } from './modules/user/user.module';
import { PatientModule } from './modules/patient/patient.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { LocationModule } from './modules/location/location.module';
import { HealthInsuranceModule } from './modules/health-insurance/health-insurance.module';
import { TwilioModule } from './modules/twilio/twilio.module';
import { EmailModule } from './modules/email/email.module';
import { RoleModule } from './modules/role/role.module';
import { ConsultationsModule } from './modules/consultations/consultations.module';
import { GuardModule } from './modules/guard/guard.module';
import { SymptomModule } from './modules/symptom/symptom.module';
import { PrescriptionsModule } from './modules/prescriptions/prescriptions.module';
import { TurnsModule } from './modules/turns/turns.module';
import { IndicationsModule } from './modules/indications/indications.module';
import { DiagnosisModule } from './modules/diagnosis/diagnosis.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AnswerModule } from './modules/answer/answer.module';
import { HealthProviderModule } from './modules/health-provider/health-provider.module';
import { QualificationModule } from './modules/qualification/qualification.module';
import { MercadopagoModule } from './modules/mercadopago/mercadopago.module';
import { PracticeModule } from './modules/practice/practice.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
      path: ':tenant?/api/graphql'
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TenancyModule,
    AuthenticationModule,
    UserModule,
    PatientModule,
    DoctorModule,
    LocationModule,
    HealthInsuranceModule,
    TwilioModule,
    EmailModule,
    RoleModule,
    ConsultationsModule,
    GuardModule,
    SymptomModule,
    PrescriptionsModule,
    TurnsModule,
    IndicationsModule,
    DiagnosisModule,
    OrdersModule,
    AnswerModule,
    HealthProviderModule,
    QualificationModule,
    MercadopagoModule,
    PracticeModule,
    NotificationsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get('PORT');
  }
}
