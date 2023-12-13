import { LatLngToAddressPipe } from './lat-lng-to-address.pipe';

describe('LatLngToAddressPipe', () => {
  it('create an instance', () => {
    const pipe = new LatLngToAddressPipe();
    expect(pipe).toBeTruthy();
  });
});
