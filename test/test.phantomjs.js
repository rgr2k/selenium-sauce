var SeSauce = require('../inst/selenium-sauce'),
    should = require('./lib/should');

new SeSauce({
    quiet: false,
    webdriver: {
        logLevel: 'silent',
        desiredCapabilities: { browserName: 'phantomjs' }
    },
    httpServer: {
        disable: false,
        port: 8081,
        root: __dirname
    },
    sauceLabs: {
    },
    sauceConnect: {
    }
}, function(browser) {

    // Since this test suite is run once for each browser, we'll output the
    // browser name in the test suite description.
    describe(browser.desiredCapabilities.browserName + ': title', function() {

        this.timeout(120000);

        // Before any tests run, initialize the browser and load the test page.
        // Then call `done()` when finished.
        before(function(done) {
            browser.init(function(err) {
                if(err) throw err;
                browser.url('http://localhost:8081/test.html', done);
            });
        });

        // Test that the browser title is correct.
        it('should have the correct value', function(done) {
            browser.getTitle(function(err, title) {
                title.should.be.exactly('This is test.html!');
                done();
            });
        });

        // After all tests are done, update the SauceLabs job with the test status,
        // and close the browser.
        after(function(done) {
            browser.report(this.currentTest.state === 'passed', done);
        });

    });

});
