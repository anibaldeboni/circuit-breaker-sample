import { CircuitBreaker } from './circuit-breaker';

// file deepcode ignore MissingArgument: <please specify a reason of ignoring this>
const cb = new CircuitBreaker('http://localhost:8080');

setInterval(() => {
  cb.exec().then(console.log).catch(console.error);
}, 1000);
