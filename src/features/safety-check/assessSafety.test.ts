import { assessSafety } from './assessSafety';

describe('assessSafety', () => {
  it('returns low with prompt for more detail when input is empty', () => {
    const result = assessSafety('');
    expect(result.level).toBe('low');
    expect(result.reasons.length).toBeGreaterThan(0);
    expect(result.nextSteps.length).toBeGreaterThan(0);
  });

  it('returns low with prompt when input is only whitespace', () => {
    const result = assessSafety('   \n\t  ');
    expect(result.level).toBe('low');
    expect(result.reasons.length).toBeGreaterThan(0);
  });

  it('returns high when input contains a high-risk keyword', () => {
    const result = assessSafety('Someone asked for my password');
    expect(result.level).toBe('high');
    expect(result.reasons.length).toBeGreaterThan(0);
    expect(result.nextSteps.length).toBeGreaterThan(0);
  });

  it('returns medium when input contains only medium keyword', () => {
    const result = assessSafety('Should I allow wifi permission?');
    expect(result.level).toBe('medium');
    expect(result.reasons.length).toBeGreaterThan(0);
    expect(result.nextSteps.length).toBeGreaterThan(0);
  });

  it('returns low when input has no high or medium keywords', () => {
    const result = assessSafety('Is this email from my mom safe?');
    expect(result.level).toBe('low');
    expect(result.reasons.length).toBeGreaterThan(0);
    expect(result.nextSteps.length).toBeGreaterThan(0);
  });

  it('returns high when both high and medium present (highest wins)', () => {
    const result = assessSafety('Urgent bank link and app store');
    expect(result.level).toBe('high');
    expect(result.reasons.length).toBeGreaterThan(0);
  });

  it('matches keywords case-insensitively', () => {
    const resultHigh = assessSafety('BANK and Password and OTP');
    expect(resultHigh.level).toBe('high');

    const resultMedium = assessSafety('WIFI and Bluetooth');
    expect(resultMedium.level).toBe('medium');
  });

  it('returns high for verification code keyword', () => {
    const result = assessSafety('They want my verification code');
    expect(result.level).toBe('high');
  });

  it('trims input before assessing', () => {
    const result = assessSafety('  password  ');
    expect(result.level).toBe('high');
  });
});
