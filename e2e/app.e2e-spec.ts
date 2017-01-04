import { MoneyjinnClientPage } from './app.po';

describe('moneyjinn-client App', function() {
  let page: MoneyjinnClientPage;

  beforeEach(() => {
    page = new MoneyjinnClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
