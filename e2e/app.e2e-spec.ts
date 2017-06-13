import { D3v4angular2Page } from './app.po';

describe('d3v4angular2 App', () => {
  let page: D3v4angular2Page;

  beforeEach(() => {
    page = new D3v4angular2Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
