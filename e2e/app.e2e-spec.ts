import { ScWebFrontendPage } from './app.po';

describe('sc-web-frontend App', () => {
  let page: ScWebFrontendPage;

  beforeEach(() => {
    page = new ScWebFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
