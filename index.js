const fs = require('fs');
const puppeteer = require('puppeteer');
const { promisify } = require('util');
const { harFromMessages } = require('chrome-har');

// list of events
const events = [];

// list of event types to watch
const watchedEvents = [
  'Network.dataReceived',
  'Network.loadingFailed',
  'Network.loadingFinished',
  'Network.requestServedFromCache',
  'Network.requestWillBeSent',
  'Network.resourceChangedPriority',
  'Network.responseReceived',
  'Page.domContentEventFired',
  'Page.frameAttached',
  'Page.frameStartedLoading',
  'Page.loadEventFired',
];

const grabPerf = async () => {
  // take in site from environment var
  var urlTarget = process.env.GRAB_SITE;

  // set snapshot option
  const options = {
    path: urlTarget +'.png',
    fullpage: true
  };

  // set the browser flags
  // TODO: improve for custom browser args
  const browser = await puppeteer.launch({
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--enable-logging', '--v=1'
    ]
  });

  // create a page
  const page = await browser.newPage();

  // create a Chrome Devtools Protocol session
  const client = await page.target().createCDPSession();
  
  await client.send('Page.enable');
  await client.send('Network.enable');

  // for every watched event, push to to the events list
  watchedEvents.forEach(method => {
    client.on(method, params => {
      events.push({ method, params });
    });
  });

  // load the page from the environment
  await page.goto('https://'+urlTarget);

  // grab screen shot of rendered page
  await page.screenshot(options);

  // close browser session
  await browser.close();
  
  // write out all captured events in .har file format
  const har = harFromMessages(events);
  await promisify(fs.writeFile)(urlTarget+'.har', JSON.stringify(har));
}

grabPerf();
