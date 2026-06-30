import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let tskvLogger: TskvLogger;
  let logSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;
  let debugSpy: jest.SpyInstance;

  beforeEach(() => {
    tskvLogger = new TskvLogger();
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    debugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log simple message', () => {
    tskvLogger.log('hello');
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('level=log\tmessage=hello');
  });

  it('should log with optional params', () => {
    tskvLogger.log('hello', { a: 'b', c: 1 });
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(
      'level=log\tmessage=hello\toptionalParams=[{"a":"b","c":1}]',
    );
  });

  it('should warn correct format', () => {
    tskvLogger.warn('warning');
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith('level=warn\tmessage=warning');
  });

  it('should error correct format', () => {
    tskvLogger.error('error occurred');
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith(
      'level=error\tmessage=error occurred',
    );
  });

  it('should handle Error object', () => {
    const error = new Error('Boom');
    tskvLogger.error(error);
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('level=error\tmessage=Error: Boom'),
    );
  });

  it('should debug correct format', () => {
    tskvLogger.debug('debug info');
    expect(debugSpy).toHaveBeenCalledTimes(1);
    expect(debugSpy).toHaveBeenCalledWith('level=debug\tmessage=debug info');
  });

  it('should remove tabs completely', () => {
    tskvLogger.log('message\twith\ttabs');
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('level=log\tmessage=messagewithtabs');
  });

  it('should remove newlines completely', () => {
    tskvLogger.log('line1\nline2\r\nline3');
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('level=log\tmessage=line1line2line3');
  });

  it('should escape backslashes', () => {
    tskvLogger.log('path\\to\\file');
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(
      'level=log\tmessage=path\\\\to\\\\file',
    );
  });

  it('should handle object message', () => {
    tskvLogger.log({ userId: 123 });
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('level=log\tmessage={"userId":123}');
  });
});
