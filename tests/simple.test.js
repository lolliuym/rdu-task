import http from 'k6/http';
import { check } from 'k6';

export default function() {
  const BASE_URL = 'http://rdu:8080';
  
  // Test 1: Human
  let res = http.get(BASE_URL, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  
  check(res, {
    'Human: status 200': (r) => r.status === 200,
  });

  // Test 2: Bad Bot
  res = http.get(BASE_URL, {
    headers: { 'User-Agent': 'BadBot/1.0' }
  });
  
  check(res, {
    'Bad Bot: status 403': (r) => r.status === 403,
  });

  // Test 3: Suspicious
  res = http.get(BASE_URL, {
    headers: { 'User-Agent': 'SuspiciousBot/1.0' }
  });
  
  check(res, {
    'Suspicious: status 302': (r) => r.status === 302,
    'Suspicious: redirect to challenge': (r) => r.headers['Location'] && r.headers['Location'].includes('/challenge'),
  });
}
