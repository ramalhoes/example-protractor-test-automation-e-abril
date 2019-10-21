const startBrowser = require('../../controller/front-end/start-browser');

const takeGetTitle = async () => {
    return await browser.getTitle();
}

const waitPageLoad = async () => {
    let count = 0;
    while (count < 100) {
        browser.sleep(100);
        if (await browser.executeScript("return document.readyState") == "complete") {
            count = 100;
        }
        count++;
    }
}

const listPageAndTitles = [
    {
        page: 'Política',
        title: 'Política | VEJA.com'
    },
    {
        page: 'Política',
        title: 'Política | VEJA.com'
    },
    {
        page: 'Previdência',
        title: 'Notícias sobre Reforma da Previdência | VEJA.com'
    },
    {
        page: 'Radar',
        title: 'Radar | VEJA.com'
    },
    {
        page: 'Páginas Amarelas',
        title: 'Notícias sobre Páginas Amarelas | VEJA.com'
    },
    {
        page: 'Revista',
        title: 'Edições - Revista VEJA | VEJA.com'
    },
    {
        page: 'Podcasts',
        title: 'Podcast | VEJA.com'
    }
]

describe('web site testing example Editora Abril', () => {

    beforeAll(() => {
        startBrowser();
        waitPageLoad();
    });

    it('should successfully access the homepage', async () => {

        waitPageLoad();

        const getTitle = await takeGetTitle();
        const logoSite = element(by.id('Fill-4'));

        expect(getTitle).toEqual('VEJA.com - Reportagens exclusivas, notícias, informação e opinião.'); // - checking if the title is equal.
        expect(logoSite.isDisplayed()).toBe(true);  // - checking if the brand logo is is present.
    });

    it('should access a list of pages successfully: Política, Previdência, Radar, Páginas Amarelas, Revista, Podcasts', async () => {

        for (let item of listPageAndTitles) {
            let page = item.page;
            let title = item.title;

            element(by.linkText(page)).click();
            waitPageLoad();
            let getTitle = await takeGetTitle();
            expect(getTitle).toEqual(title); // - checking if the title is equal.
        }
    });
});