import {DefaultCrudRepository} from '@loopback/repository';
import {Subsidiary, SubsidiaryRelations} from '../models';
import {InmemoryDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SubsidiaryRepository extends DefaultCrudRepository<
  Subsidiary,
  typeof Subsidiary.prototype.id,
  SubsidiaryRelations
> {
  constructor(
    @inject('datasources.inmemory') dataSource: InmemoryDataSource,
  ) {
    super(Subsidiary, dataSource);
  }
}
