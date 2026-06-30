import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let jsonLogger: JsonLogger;
  let logSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;
  let debugSpy: jest.SpyInstance;

  beforeEach(() => {
    jsonLogger = new JsonLogger();
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    debugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
    /*
     * verbose и fatal
     * будут перезаписывать методы (log и error),
     * поэтому не трогаем
     */
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log correct JSON format', () => {
    jsonLogger.log('hello');
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(
      '{"level":"log","message":"hello","optionalParams":[]}',
    );
  });

  it('should log with optional params', () => {
    jsonLogger.log('hello', { userId: 123 });
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(
      '{"level":"log","message":"hello","optionalParams":[{"userId":123}]}',
    );
  });

  it('should warn correct JSON format', () => {
    jsonLogger.warn('warning');
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      '{"level":"warn","message":"warning","optionalParams":[]}',
    );
  });

  it('should error correct JSON format', () => {
    jsonLogger.error('error occurred');
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith(
      '{"level":"error","message":"error occurred","optionalParams":[]}',
    );
  });

  it('should handle Error object', () => {
    const error = new Error('Boom');
    jsonLogger.error(error);
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('"message":"Error: Boom'),
    );
  });

  it('should debug correct JSON format', () => {
    jsonLogger.debug('debug info');
    expect(debugSpy).toHaveBeenCalledTimes(1);
    expect(debugSpy).toHaveBeenCalledWith(
      '{"level":"debug","message":"debug info","optionalParams":[]}',
    );
  });

  it('should escape quotes in message', () => {
    jsonLogger.log('message with "quotes"');
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(
      '{"level":"log","message":"message with \\"quotes\\"","optionalParams":[]}',
    );
  });
});
