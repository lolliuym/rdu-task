import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function() {
  const res = http.get('http://rdu:8080');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
