class JiraClient {
  constructor() {
    this.headers = {
      Authorization: `Basic ${Buffer.from(`brad@lastrev.com:${process.env.JIRA_API}`).toString('base64')}`,
      Accept: 'application/json'
    };
  }

  async handleRateLimit(response) {
    let retryAfter = response.headers.get('Retry-After');
    let resetTime = response.headers.get('X-RateLimit-Reset');

    if (retryAfter) {
      console.log(`Too many requests, retrying after ${retryAfter} seconds.`);
      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
    } else if (resetTime) {
      console.log(`Too many requests, retrying after ${resetTime}.`);
      let timeToWait = new Date(resetTime) - new Date();
      await new Promise((resolve) => setTimeout(resolve, timeToWait));
    }
  }

  async fetchJiraData(endpoint) {
    const url = `https://lastrev.atlassian.net/rest/api/3${endpoint}`;
    let response = await fetch(url, {
      method: 'GET',
      headers: this.headers
    });

    if (response.status === 429) {
      await this.handleRateLimit(response);
      return null;
    }
    return await response.json();
  }
}

const headers = {
  Authorization: `Basic ${Buffer.from(`brad@lastrev.com:${process.env.JIRA_API}`).toString('base64')}`,
  Accept: 'application/json'
};

const handleRateLimit = async (response) => {
  let retryAfter = response.headers.get('Retry-After');
  let resetTime = response.headers.get('X-RateLimit-Reset');

  if (retryAfter) {
    console.log(`Too many requests, retrying after ${retryAfter} seconds.`);
    await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
  } else if (resetTime) {
    console.log(`Too many requests, retrying after ${resetTime}.`);
    let timeToWait = new Date(resetTime) - new Date();
    await new Promise((resolve) => setTimeout(resolve, timeToWait));
  } else {
    console.log('no wait', Object.keys(response));
  }
};

const fetchJiraData = async (endpoint) => {
  const url = `https://lastrev.atlassian.net/rest/api/3${endpoint}`;
  let response = await fetch(url, {
    method: 'GET',
    headers
  });

  if (response.status === 429) {
    await handleRateLimit(response);
    return null;
  }
  return await response.json();
};

export default JiraClient;
