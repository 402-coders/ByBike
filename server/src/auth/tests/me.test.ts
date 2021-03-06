import { prismaMock } from '~/common/tests/prisma';
import { request } from '~/common/tests/utils';

const sampleToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoic2FtcGxlLWlkIiwiaWF0IjoxNjUwMDIzNjk2fQ.ckeQDVU0HqNe5CRb56l7FBSOi63t81774fbiRP2BK3U';

describe('get me handler', () => {
  it('returns 401 when there is no access token in headers', async () => {
    const response = await request.get('/api/auth/me');
    expect(response.statusCode).toBe(401);
  });

  it('returns Mister Krzysztof', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: 'sample-id',
      username: 'Krzysztof',
      nickname: 'Krzychu',
      email: 'krzy@szt.of',
      avatar: 'sample-avatar',
      contractType: 'OTHER',
      toWorkDistance: 4,
      isConfigured: false,
    });

    prismaMock.trip.findMany.mockResolvedValue([]);

    const response = await request.get('/api/auth/me').set('accessToken', sampleToken);

    expect(response.status).toBe(200);
    expect(response.body.nickname).toBe('Krzychu');
  });
});
