'use strict';

(function() {
  var client = new Keen({
    projectId: '56bfd55296773d74919d1035',
    writeKey: 'f59539f4db693c0d240435c13d273e1d' +
      '702cc524d3ecadc4095f13cc0e8ab251' +
      '96c8615c2c815a6d2f4b18ac08b99740' +
      '67b7b1740cd469a761fffd7632065554' +
      '730d6d1a07b32df59516f94144799791' +
      'b03e9776cb9b659b9128c0b79b6e396f'
  });

  setTimeout(function() {
    client.addEvent('pageviews', getMetrics(), function(err, res) {
      if (err) {
        console.error(err);
      }
    });
  }, 1000);

  var getMetrics = function() {
    var metrics = {
      timing: getTimingMetrics(),
      source: getSourceMetrics(),
      visitor: getVisitorMetrics(),
      page: getPageMetrics()
    };
    return metrics;
  };

  var getTimingMetrics = function() {
    if (window.performance && window.performance.timing) {
      var t = window.performance.timing;
      return {
        redirect: t.redirectEnd - t.redirectStart,
        appCache: t.domainLookupStart - t.fetchStart,
        dns: t.domainLookupEnd - t.domainLookupStart,
        tcp: t.connectEnd - t.connectStart,
        request: t.responseStart - t.requestStart,
        response: t.responseEnd - t.responseStart,
        processing: t.domComplete - t.domLoading,
        onLoad: t.loadEventEnd - t.loadEventStart,
        click_to_interactive: t.domInteractive - t.navigationStart,
        total: t.loadEventEnd - t.navigationStart
      };
    } else {
      return {};
    }
  };

  var getVisitorMetrics = function() {
    return {
      browser: getBrowser(),
      language: window.navigator.language
    };
  };

  var getSourceMetrics = function() {
    if (window.document.referrer) {
      var d = window.document.referrer.match(/\/\/(.+)\//);
      var referring_domain = d ? d[1] : '';
    } else {
      var referring_domain = '';
    }
    return {
      referring_domain: referring_domain,
      referrer: window.document.referrer
    };
  };

  var getBrowser = function() {
    var ua = window.navigator.userAgent;
    if (/Firefox/.test(ua) && !/Seamonkey/.test(ua)) {
      return 'Firefox';
    } else if (/Seamonkey/.test(ua)) {
      return 'Seamonkey';
    } else if (/Chrome/.test(ua) && !/Chromium/.test(ua)) {
      return 'Chrome';
    } else if (/Chromium/.test(ua)) {
      return 'Chromium';
    } else if (
      /Safari/.test(ua) && !/Chrome/.test(ua) && !/Chromium/.test(ua)
    ) {
      return 'Safari';
    } else if (/OPR/.test(ua) || /Opera/.test(ua)) {
      return 'Opera';
    } else if (/MSIE/.test(ua)) {
      return 'Internet Explorer';
    } else {
      return 'Unknown';
    }
  };

  var getPageMetrics = function() {
    return {
      path: window.location.pathname,
      title: window.document.title
    };
  };
})();
