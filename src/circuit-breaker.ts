import axios from 'axios';

enum CircuitState {
  RED,
  YELLOW,
  GREEN,
}

interface ICircuitBreakerOptions {
  timeout?: number;
  failureThreshold?: number;
  successThreshold?: number;
}

export class CircuitBreaker {
  private timeout: number;
  private failThreshold: number;
  private successThreshold: number;
  private state = CircuitState.GREEN;
  private failureCount = 0;
  private successCount = 0;
  private nextAttempt = Date.now();
  private url: string;

  constructor(url: string, options?: ICircuitBreakerOptions) {
    this.timeout = options?.timeout ?? 3000;
    this.failThreshold = options?.failureThreshold ?? 2;
    this.successThreshold = options?.successThreshold ?? 1;
    this.url = url;
  }

  private success(res: any) {
    this.failureCount = 0;
    if (this.state === CircuitState.YELLOW) {
      this.successCount++;
      if (this.successCount > this.successThreshold) {
        this.state = CircuitState.GREEN;
        this.successCount = 0;
      }
    }

    return res;
  }

  private failure(res: any) {
    this.failureCount++;
    if (this.failureCount >= this.failThreshold) {
      this.state = CircuitState.RED;
      this.nextAttempt = Date.now() + this.timeout;
    }
    return res;
  }

  async exec() {
    if (this.state === CircuitState.RED) {
      if (Date.now() >= this.nextAttempt) {
        this.state = CircuitState.YELLOW;
      } else {
        throw new Error('Circuit is broken');
      }
    }

    try {
      const response = await axios.get(this.url);
      if (response.status === 200) {
        return this.success(response.data);
      }

      return this.failure(response);
    } catch (error: any) {
      return this.failure(error.message);
    }
  }
}
