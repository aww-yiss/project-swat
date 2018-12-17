const fs = require('fs');
const puppeteer = require('puppeteer');
const { promisify } = require('util');
const { harFromMessages } = require('chrome-har');

// list to hold events
const events = [];

// event types to look for
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
  // take in site from environtment var
  var urltograb = process.env.GRAB_SITE;

  // set snapshot option
  const options = {
    path: urltograb +'.png',
    fullpage: true
  };

  // set the brower flags
  // TODO: improve for custom browser args
  const browser = await puppeteer.launch({
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--enable-logging', '--v=1'
    ]
  });

  const page = await browser.newPage();
  const client = await page.target().createCDPSession();
  
  await client.send('Page.enable');
  await client.send('Network.enable');

  watchedEvents.forEach(method => {
    client.on(method, params => {
      events.push({ method, params });
    });
  });
                                                    
  await page.goto('https://'+urltograb);
  await page.screenshot(options);
  await browser.close();
  
  const har = harFromMessages(events);
  await promisify(fs.writeFile)(urltograb+'.har', JSON.stringify(har));
}

grabPerf();
