import * as redisStore from 'cache-manager-redis-store';
require('dotenv').config();
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CacheModuleOptions } from '@nestjs/common/cache/interfaces/cache-module.interface';

/**
 * Класс для настройки конфигурации приложения
 */

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  /**
   * Функция для получения строкового занчения из переменной окружения
   * @param key - имя переменной окружения
   *
   */
  private getValueBoolean(key: string): boolean {
    const value = this.env[key];
    if (!value) {
      return false;
    }
    return value.toLowerCase() === 'true';
  }

  /**
   * Функция для получения строкового занчения из переменной окружения
   * @param key - имя переменной окружения
   * @param throwOnMissing
   */
  private getValueString(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  /**
   * Функция для получения числового занчения из переменной окружения
   * @param key - имя переменной окружения
   * @param throwOnMissing
   */
  private getValueNumber(key: string, throwOnMissing = true): number {
    const value = Number(this.env[key]);
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  /**
   * Параметры для кэширующего Redis
   */

  public getRedisConfig(): CacheModuleOptions {
    return {
      store: redisStore,
      host: this.getValueString('REDIS_HOST'),
      port: this.getValueString('REDIS_PORT'),
      ttl: this.getValueNumber('REDIS_TTL'), // seconds
      max: this.getValueNumber('REDIS_MAX_ITEM'), // maximum number of items in cache
    };
  }

  /**
   * Параметры для Nats
   */

  public getNatsConfig(): string {
    return `nats://${this.getValueString('NATS_HOST')}:${this.getValueNumber(
      'NATS_PORT',
    )}`;
  }

  /**
   * Параметры для postgres
   */

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValueString('POSTGRES_HOST'),
      port: parseInt(this.getValueString('POSTGRES_PORT')),
      username: this.getValueString('POSTGRES_USER'),
      password: this.getValueString('POSTGRES_PASSWORD'),
      database: this.getValueString('POSTGRES_DATABASE'),
      entities: ['dist/**/*.entity.js'],
      logging: this.getValueBoolean('TYPEORM_LOGGING'),
      synchronize: this.getValueBoolean('CREATE_NEWTABLE'),
    };
  }
}

const configService = new ConfigService(process.env);

export { configService };
