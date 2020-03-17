import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Subsidiary} from '../models';
import {SubsidiaryRepository} from '../repositories';

export class SubsidiaryController {
  constructor(
    @repository(SubsidiaryRepository)
    public subsidiaryRepository : SubsidiaryRepository,
  ) {}

  @post('/subsidiaries', {
    responses: {
      '200': {
        description: 'Subsidiary model instance',
        content: {'application/json': {schema: getModelSchemaRef(Subsidiary)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Subsidiary, {
            title: 'NewSubsidiary',
            exclude: ['id'],
          }),
        },
      },
    })
    subsidiary: Omit<Subsidiary, 'id'>,
  ): Promise<Subsidiary> {
    return this.subsidiaryRepository.create(subsidiary);
  }

  @get('/subsidiaries/count', {
    responses: {
      '200': {
        description: 'Subsidiary model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Subsidiary) where?: Where<Subsidiary>,
  ): Promise<Count> {
    return this.subsidiaryRepository.count(where);
  }

  @get('/subsidiaries', {
    responses: {
      '200': {
        description: 'Array of Subsidiary model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Subsidiary, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Subsidiary) filter?: Filter<Subsidiary>,
  ): Promise<Subsidiary[]> {
    return this.subsidiaryRepository.find(filter);
  }

  @patch('/subsidiaries', {
    responses: {
      '200': {
        description: 'Subsidiary PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Subsidiary, {partial: true}),
        },
      },
    })
    subsidiary: Subsidiary,
    @param.where(Subsidiary) where?: Where<Subsidiary>,
  ): Promise<Count> {
    return this.subsidiaryRepository.updateAll(subsidiary, where);
  }

  @get('/subsidiaries/{id}', {
    responses: {
      '200': {
        description: 'Subsidiary model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Subsidiary, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Subsidiary, {exclude: 'where'}) filter?: FilterExcludingWhere<Subsidiary>
  ): Promise<Subsidiary> {
    return this.subsidiaryRepository.findById(id, filter);
  }

  @patch('/subsidiaries/{id}', {
    responses: {
      '204': {
        description: 'Subsidiary PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Subsidiary, {partial: true}),
        },
      },
    })
    subsidiary: Subsidiary,
  ): Promise<void> {
    await this.subsidiaryRepository.updateById(id, subsidiary);
  }

  @put('/subsidiaries/{id}', {
    responses: {
      '204': {
        description: 'Subsidiary PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() subsidiary: Subsidiary,
  ): Promise<void> {
    await this.subsidiaryRepository.replaceById(id, subsidiary);
  }

  @del('/subsidiaries/{id}', {
    responses: {
      '204': {
        description: 'Subsidiary DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.subsidiaryRepository.deleteById(id);
  }
}
