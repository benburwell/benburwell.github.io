---
---

ENDPOINT_URL = 'https://metrics.benburwell.com/api/events'

# Collects and reports browser metrics
class Metrics
  
  # Constructor for the Metrics class
  constructor: ->

    # Shall we track detailed metrics?
    @dnt = false
    @dnt = true if window.navigator.doNotTrack is '1'
    @dnt = true if window.navigator.doNotTrack is 'yes'
    @dnt = true if window.doNotTrack is '1'

    # Initialize an object to store the metrics
    @m =
      timing_redirect: 0
      timing_appCache: 0
      timing_dns: 0
      timing_tcp: 0
      timing_request: 0
      timing_response: 0
      timing_processing: 0
      timing_onLoad: 0
      timing_click_to_interactive: 0
      timing_total: 0
      path: '[unknown]'
      pageTitle: '[unknown]'
      language: 'Unknown'
      referring_domain: '[none]'
      browser: 'Other'

  # Gather metric values and add them to the field
  collect: ->
    # We collect certain metrics regardless of
    # the user's Do Not Track setting -- these
    # reveal no information about the browser
    # other than the fact that the DNT flag is
    # set.

    t = window.performance?.timing

    @m.timing_redirect = t?.redirectEnd - t?.redirectStart
    @m.timing_appCache = t?.domainLookupStart - t?.fetchStart
    @m.timing_dns = t?.domainLookupEnd - t?.domainLookupStart
    @m.timing_tcp = t?.connectEnd - t?.connectStart
    @m.timing_request = t?.responseStart - t?.requestStart
    @m.timing_response = t?.responseEnd - t?.responseStart
    @m.timing_processing = t?.domComplete - t?.domLoading
    @m.timing_onLoad = t?.loadEventEnd - t?.loadEventStart
    @m.timing_click_to_interactive = t?.domInteractive - t?.navigationStart
    @m.timing_total = t?.loadEventEnd - t?.navigationStart

    @m.path = window.location.pathname
    @m.pageTitle = window.document.title

    if @dnt
      # These metrics are _not_ collected if DNT
      # flag is set, as they can potentially
      # reveal information about the browser or
      # the user
      @m.referring_domain = 'Not Reported' if window.document.referrer
      @m.browser = 'Not Reported'
      @m.language = 'Not Reported'
    else
      # Since the DNT flag is not set, we are going
      # to gather a small bit of info about the
      # visitor
      @m.language = window.navigator.language
      @m.referring_domain = window.document.referrer?.match(/\/\/(.+)\//)?[1]

      # Now the ridiculous process of browser detection
      # Ref: https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent
      ua = window.navigator.userAgent

      if /Firefox/.test(ua) and not /Seamonkey/.test(ua)
        @m.browser = 'Firefox'
      else if /Seamonkey/.test(ua)
        @m.browser = 'Seamonkey'
      else if /Chrome/.test(ua) and not /Chromium/.test(ua)
        @m.browser = 'Chrome'
      else if /Chromium/.test(ua)
        @m.browser = 'Chromium'
      else if /Safari/.test(ua) and not /Chrome/.test(ua) and not /Chromium/.test(ua)
        @m.browser = 'Safari'
      else if /OPR/.test(ua) or /Opera/.test(ua)
        @m.browser = 'Opera'
      else if /MSIE/.test(ua)
        @m.browser = 'Internet Explorer'

  send: ->
    http = new XMLHttpRequest()
    http.open 'POST', ENDPOINT_URL
    http.setRequestHeader 'Content-Type', 'application/json;charset=UTF-8'
    http.send JSON.stringify({type:'benburwell-com.pageview', properties: @m})

setTimeout ->
  m = new Metrics
  m.collect()
  m.send()
, 100
