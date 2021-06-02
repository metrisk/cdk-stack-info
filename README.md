# CDK Stack Name

Obtains and outputs the CDK stack name.

## Usage

```yaml
on: pull_request
name: "Whats the stack name?"
jobs:
  find-the-stack-name:
    name: Job to find stack name
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install NPM deps
        run: npm ci
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: eu-west-1
      - name: CDK Synth
        run: cdk synth
      - name: Get the stackname
        uses: metrisk/cdk-stack-info
        id: stackname
      - name: Echo stack name
        run: |
          echo ${{ steps.stackname.outputs.cdk-stackname }}
```
