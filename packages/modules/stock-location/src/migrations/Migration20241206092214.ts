import { Migration } from '@mikro-orm/migrations';

export class Migration20241206092214 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table if exists "stock_location" add constraint "stock_location_address_id_unique" unique ("address_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "stock_location" drop constraint if exists "stock_location_address_id_unique";');
  }

}
