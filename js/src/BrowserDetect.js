export default class BrowserDetect {
    constructor(userAgent) {
        const browser = this;
        browser.userAgent = userAgent;
        const matched = BrowserDetect._uamatch(userAgent);
        if (matched.browser) {
            browser[matched.browser] = true;
            browser.name = matched.browser;
            browser.version = matched.version;
        }

        // Chrome is Webkit, but Webkit is also Safari.
        if (browser.chrome) {
            browser.webkit = true;
        } else if (browser.webkit) {
            browser.safari = true;
        }

        browser.iPad = (userAgent.match(/iPad/) === 'iPad');
        browser.iPod = (userAgent.match(/iPod/) === 'iPod');
        browser.iPhone = (userAgent.match(/iPhone/) === 'iPhone');
        browser.blackberry = (userAgent.match('/BlackBerry/') === 'BlackBerry' && browser.webkit === true);
        browser.palmPre = (userAgent.match('/webOS/') === 'webOS' && browser.webkit === true);
        browser.mobile = userAgent.match(/iPod|iPad|iPhone|Android|BlackBerry|Opera Mini|Fennec|IEMobile|webOS/i)
            !== null;
        browser.legacyMSIE = (browser.msie === true && browser.version < 11);
        browser.mapUrl = 'http://maps.google.com/maps';
        if (browser.iPad || browser.iPod || this.iPhone) {
            const versionMatch = userAgent.match(/OS (\d)(_\d)/i);
            if (versionMatch !== null) {
                browser.iOSVersion = {
                    major: versionMatch[1],
                    minor: versionMatch[2],
                };

                if (browser.iOSVersion.major > 5) {
                    browser.mapUrl = 'http://maps.apple.com/';
                }
            }
        }
    }

    /**
     * Taken from jquery-migrate
     * @private
     */
    static _uamatch(ua) {
        ua = ua.toLowerCase();

        const match = /(chrome)[ \/]([\w.]+)/.exec(ua)
            || /(webkit)[ \/]([\w.]+)/.exec(ua)
            || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)
            || /(msie) ([\w.]+)/.exec(ua)
            || ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)
            || [];

        return {
            browser: match[1] || '',
            version: match[2] || '0',
        };
    }
}
