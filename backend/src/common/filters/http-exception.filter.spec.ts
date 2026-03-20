import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

const makeHost = (url = '/test', method = 'GET') => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
  const mockResponse = { status: mockStatus };
  const mockRequest = { url, method };
  const host = {
    switchToHttp: () => ({
      getResponse: () => mockResponse,
      getRequest: () => mockRequest,
    }),
  } as unknown as ArgumentsHost;
  return { host, mockStatus, mockJson };
};

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;

  beforeEach(() => {
    filter = new HttpExceptionFilter();
  });

  it('handles HttpException with a string response', () => {
    const { host, mockStatus, mockJson } = makeHost();
    filter.catch(new HttpException('Not found', HttpStatus.NOT_FOUND), host);
    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: 404, message: 'Not found' }),
    );
  });

  it('handles HttpException with an array message', () => {
    const { host, mockJson } = makeHost();
    filter.catch(
      new HttpException({ message: ['error1', 'error2'] }, 400),
      host,
    );
    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'error1, error2' }),
    );
  });

  it('handles HttpException with an object message', () => {
    const { host, mockJson } = makeHost();
    filter.catch(new HttpException({ message: 'bad input' }, 400), host);
    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'bad input' }),
    );
  });

  it('handles HttpException with no message field', () => {
    const { host, mockJson } = makeHost();
    filter.catch(new HttpException({ error: 'forbidden' }, 403), host);
    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Internal server error' }),
    );
  });

  it('returns 500 for a non-HttpException error', () => {
    const { host, mockStatus, mockJson } = makeHost();
    filter.catch(new Error('unexpected failure'), host);
    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 500,
        message: 'Internal server error',
        path: '/test',
        method: 'GET',
      }),
    );
  });

  it('includes timestamp and path in the response', () => {
    const { host, mockJson } = makeHost('/api/students', 'POST');
    filter.catch(
      new HttpException('Conflict', HttpStatus.CONFLICT),
      host,
    );
    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/api/students', method: 'POST' }),
    );
  });
});
