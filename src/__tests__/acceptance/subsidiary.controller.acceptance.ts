import {Client, expect} from '@loopback/testlab';
import {HolidaysApiApplication} from '../..';
import {setupApplication} from './test-helper';

describe('SubsidiaryController', () => {
  let app: HolidaysApiApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /subsidiaries', async () => {
    const res = await client.get('/subsidiaries?take=10&skip=10').expect(200);
    expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
  });
});
