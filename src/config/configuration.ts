import * as redisStore from 'cache-manager-redis-store';
require('dotenv').config();
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CacheModuleOptions } from '@nestjs/common/cache/interfaces/cache-module.interface';
import { NatsOptions } from '@nestjs/microservices';

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValueString(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }
  private getValueNumber(key: string, throwOnMissing = true): number {
    const value = Number(this.env[key]);
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  // public ensureValues(keys: string[]) {
  //   keys.forEach(k => this.getValueString(k, true));

  //   return this;
  // }

  public getRedisConfig(): CacheModuleOptions {
    return {
      store: redisStore,
      host: this.getValueString('REDIS_HOST'),
      port: this.getValueString('REDIS_PORT'),
      ttl: this.getValueNumber('REDIS_TTL'), // seconds
      max: this.getValueNumber('REDIS_MAX_ITEM'), // maximum number of items in cache
    };
  }

  // public getPort() {
  //   return this.getValue('PORT', true);
  // }
  //
  // public isProduction() {
  //   const mode = this.getValue('MODE', false);
  //   return mode != 'DEV';
  // }

  public getNatsConfig(): string {
    return `nats://${this.getValueString('NATS_HOST')}:${this.getValueNumber(
      'NATS_PORT',
    )}`;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    const ssss = {
      type: 'postgres',

      host: this.getValueString('POSTGRES_HOST'),
      port: parseInt(this.getValueString('POSTGRES_PORT')),
      username: this.getValueString('POSTGRES_USER'),
      password: this.getValueString('POSTGRES_PASSWORD'),
      database: this.getValueString('POSTGRES_DATABASE'),

      entities: ['dist/**/*.entity.js'],
      logging: true,

      // migrationsTableName: 'migration',
      //
      // migrations: ['src/migration/*.ts'],
      //
      // cli: {
      //   migrationsDir: 'src/migration',
      // },

      // ssl: this.isProduction(),
    };
    console.log(ssss, __dirname, __filename);
    return ssss as TypeOrmModuleOptions;
  }
}
// const z=require("../model/db.entity")
const configService = new ConfigService(process.env);

export { configService };
