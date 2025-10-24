import http from 'k6/http';
import { check } from 'k6';

export default function() {
  const BASE_URL = 'http://rdu:8080';
  
  // Human
  let res = http.get(BASE_URL, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  
  check(res, {
    'Human: status 200': (r) => r.status === 200,
  });

  // Bad Bot
  res = http.get(BASE_URL, {
    headers: { 'User-Agent': 'BadBot/1.0' }
  });
  
  check(res, {
    'Bad Bot: status 403': (r) => r.status === 403,
  });

  // Suspicious
  res = http.get(BASE_URL, {
    headers: { 'User-Agent': 'SuspiciousBot/1.0' }
  });
  
  check(res, {
    'Suspicious: status 302': (r) => r.status === 302,
    'Suspicious: redirect to challenge': (r) => r.headers['Location'] === '/challenge',
  });
}
