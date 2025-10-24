import http from 'k6/http';
import { check, group } from 'k6';

export const options = {
  vus: 1,
  duration: '10s',
};

const BASE_URL = 'http://rdu:8080';

export default function() {
  group('Extended User-Agent Tests', function() {
    const testCases = [
      { name: 'Chrome Browser', ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', expected: 200 },
      { name: 'Firefox Browser', ua: 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0', expected: 200 },
      { name: 'Safari Browser', ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15', expected: 200 },
      { name: 'Mobile Chrome', ua: 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.196 Mobile Safari/537.36', expected: 200 },
      { name: 'Google Bot', ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', expected: 200 },
      { name: 'Bad Bot 1', ua: 'BadBot/1.0', expected: 403 },
      { name: 'Bad Bot 2', ua: 'EvilScraper/2.0', expected: 403 },
      { name: 'Suspicious Bot 1', ua: 'SuspiciousBot/1.0', expected: 302 },
      { name: 'Suspicious Bot 2', ua: 'UnknownCrawler/3.0', expected: 302 },
      { name: 'curl', ua: 'curl/7.68.0', expected: 200 },
      { name: 'Postman', ua: 'PostmanRuntime/7.26.8', expected: 200 },
    ];

    testCases.forEach(testCase => {
      const res = http.get(BASE_URL, { headers: { 'User-Agent': testCase.ua } });
      check(res, {
        [`${testCase.name}: status ${testCase.expected}`]: (r) => r.status === testCase.expected,
      });
    });
  });

  group('HTTP Methods Tests', function() {
    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'];
    
    methods.forEach(method => {
      const res = http.request(method, BASE_URL, null, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      check(res, {
        [`${method} method supported`]: (r) => r.status === 200 || r.status === 405,
      });
    });
  });

  group('Header Variations Tests', function() {
    const headersTests = [
      { 
        name: 'Standard headers',
        headers: { 
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br'
        }
      },
      { 
        name: 'No Accept header',
        headers: { 'User-Agent': 'Mozilla/5.0' }
      },
      { 
        name: 'Custom headers',
        headers: { 
          'User-Agent': 'Mozilla/5.0',
          'X-Custom-Header': 'test-value',
          'X-Forwarded-For': '192.168.1.1'
        }
      },
    ];

    headersTests.forEach(test => {
      const res = http.get(BASE_URL, { headers: test.headers });
      check(res, {
        [`${test.name}: returns 200`]: (r) => r.status === 200,
      });
    });
  });

  group('Path Tests', function() {
    const paths = ['/', '/challenge', '/nonexistent', '/api/test'];
    
    paths.forEach(path => {
      const res = http.get(`${BASE_URL}${path}`, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      check(res, {
        [`Path ${path}: returns valid status`]: (r) => r.status >= 200 && r.status < 500,
      });
    });
  });
}
