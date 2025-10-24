import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Counter, Rate } from 'k6/metrics';

const responseTimeTrend = new Trend('response_time');
const errorRate = new Rate('error_rate');
const requestsCounter = new Counter('total_requests');

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 10 },
    { duration: '30s', target: 20 },
    { duration: '1m', target: 20 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    http_req_failed: ['rate<0.01'],
    error_rate: ['rate<0.05']
  }
};

const BASE_URL = 'http://rdu:8080';
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
  'BadBot/1.0',
  'SuspiciousBot/1.0'
];

export default function() {
  const userAgent = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
  
  const res = http.get(BASE_URL, {
    headers: { 'User-Agent': userAgent }
  });
  
  requestsCounter.add(1);
  responseTimeTrend.add(res.timings.duration);
  
  const isSuccess = check(res, {
    'status is 2xx': (r) => r.status >= 200 && r.status < 300,
    'response time OK': (r) => r.timings.duration < 2000
  });
  
  errorRate.add(!isSuccess);
  sleep(Math.random() * 2);
}
