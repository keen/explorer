fs = require('fs');

fs.readFile("cypress/reports/merged-reports.json", 'utf8', (err, data) => {

  if(err) {
    return err;
  }
  const parsed = [];
  const excludedTags = ['@smoke-test']

  JSON.parse(data).forEach(testFeature => {
    const testCases = testFeature.elements;
    testCases.forEach(testCase => {
      const stepResults = testCase.steps.map(step => step.result.status);
      if(stepResults.every(stepResult => stepResult === 'skipped')) {
        return;
      }
      const testIdTag = testCase.tags.find(tag => !excludedTags.includes(tag.name));
      const status = stepResults.some(stepResult => stepResult === 'failed') ? "failed": "passed";

      const parsedTest = {
        testKey: testIdTag ?testIdTag.name.substring(1) : "TestId not set",
        start: new Date().toString(),
        finish: new Date().toString(),
        status: status,
        examples: stepResults
      }
      parsed.push(parsedTest)
    })
  })

  fs.writeFile('cypress/reports/parsed-reports.json', JSON.stringify(parsed, null, 4), function (err) {
    if (err) return console.log(err);
  });
});
