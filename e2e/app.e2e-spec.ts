import { PocRetryHttpPage } from './app.po';

describe('poc-retry-http App', () => {
  let page: PocRetryHttpPage;

  beforeEach(() => {
    page = new PocRetryHttpPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
