import { Ng2KindgaretnSysPage } from './app.po';

describe('ng2-kindgaretn-sys App', function() {
  let page: Ng2KindgaretnSysPage;

  beforeEach(() => {
    page = new Ng2KindgaretnSysPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
