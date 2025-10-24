import http from 'k6/http';
import { check, group } from 'k6';

export const options = {
  vus: 5,
  duration: '1m',
};

const BASE_URL = 'http://rdu:8080';

export default function() {
  group('Comprehensive Bot Detection Test', function() {
    // Human scenarios
    const humanTests = [
      { name: 'Chrome', ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      { name: 'Firefox', ua: 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0' },
      { name: 'Safari', ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15' },
    ];

    humanTests.forEach(test => {
      const res = http.get(BASE_URL, { headers: { 'User-Agent': test.ua } });
      check(res, {
        [`${test.name} Human: status 200`]: (r) => r.status === 200,
      });
    });

    // Bad Bot scenarios
    const badBotTests = [
      { name: 'BadBot1', ua: 'BadBot/1.0' },
      { name: 'BadBot2', ua: 'EvilScraper/2.0' },
    ];

    badBotTests.forEach(test => {
      const res = http.get(BASE_URL, { headers: { 'User-Agent': test.ua } });
      check(res, {
        [`${test.name}: status 403`]: (r) => r.status === 403,
      });
    });

    // Suspicious scenarios
    const suspiciousTests = [
      { name: 'Suspicious1', ua: 'SuspiciousBot/1.0' },
      { name: 'Suspicious2', ua: 'UnknownCrawler/3.0' },
    ];

    suspiciousTests.forEach(test => {
      const res = http.get(BASE_URL, { headers: { 'User-Agent': test.ua } });
      check(res, {
        [`${test.name}: status 302`]: (r) => r.status === 302,
        [`${test.name}: redirect to challenge`]: (r) => r.headers['Location'] && r.headers['Location'].includes('/challenge'),
      });
    });
  });

  group('Mixed Traffic Test', function() {
    const mixedUserAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'BadBot/1.0',
      'SuspiciousBot/1.0',
      'curl/7.68.0',
      'PostmanRuntime/7.26.8'
    ];

    const ua = mixedUserAgents[Math.floor(Math.random() * mixedUserAgents.length)];
    const res = http.get(BASE_URL, { headers: { 'User-Agent': ua } });
    
    check(res, {
      'mixed traffic: valid response': (r) => r.status >= 200 && r.status < 500,
    });
  });
}
