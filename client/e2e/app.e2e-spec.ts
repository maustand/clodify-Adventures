import { MeanAdventuresClientPage } from './app.po';

describe('mean-adventures-client App', function() {
  let page: MeanAdventuresClientPage;

  beforeEach(() => {
    page = new MeanAdventuresClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
