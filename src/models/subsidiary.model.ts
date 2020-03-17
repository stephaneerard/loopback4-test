import {Entity, model, property} from '@loopback/repository';

@model()
export class Subsidiary extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  constructor(data?: Partial<Subsidiary>) {
    super(data);
  }
}

export interface SubsidiaryRelations {
  // describe navigational properties here
}

export type SubsidiaryWithRelations = Subsidiary & SubsidiaryRelations;
