import loadtest from 'loadtest';

class LoadTest {
  static execute() {
    const vbody = {};

    const options: loadtest.LoadTestOptions = {
      url: '${URL-HERE}',
      maxRequests: 30,
      concurrency: 3,
      method: 'POST',
      body: vbody,
      contentType: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ${TOKEN-HERE}'
      },
      statusCallback: function(error, result, latency) {
        if (error) {
          console.error('Request error:', error);
        } else {
          console.log('Request status:', result.statusCode);
          console.log('Request latency:', JSON.stringify(latency), 'ms');
        }
      }
    };

    loadtest.loadTest(options, function(error, result) {
      if (error) {
        console.error('Got an error: %s', error);
      } else {
        console.log('Tests run successfully');
        console.log('Total requests:', result?.totalRequests);
        console.log('Total errors:', result?.totalErrors);
        console.log('Total time (ms):', result?.totalTimeSeconds * 1000);
        console.log('Requests per second:', result?.rps);
        console.log('Mean latency (ms):', result?.meanLatencyMs);
      }
    });
  }
}

LoadTest.execute();

