import * as core from '@actions/core'
import fs from 'fs'
import path from 'path'

async function cdkStackInfo() {
  try {
    const manifestFilePath = path.join(process.cwd(), "./cdk.out/manifest.json")
    if (fs.existsSync(manifestFilePath)) {
      core.info(manifestFilePath)
      const { artifacts } = require(manifestFilePath)
      delete artifacts.Tree
      const artifactsKeys = Object.keys(artifacts)
      /* 
      * Function names in AWS Lambda cannot exceed 64 characters, by limiting the
      * stack name to 30 characters, it gives the function name 34 characters.
      */
      const desiredNameLength = 30
      const stackname = artifactsKeys[0].length > desiredNameLength ? artifactsKeys[0].substring(0, desiredNameLength) : artifactsKeys[0]
      core.info(artifacts)
      core.info(stackname)
      core.setOutput("cdk-stackname", stackname)
      return
    } else {
      throw new Error(`manifest file doesn't exist: ${manifestFilePath}`)
    }
  } catch (err) {
    core.error(err)
    core.setFailed(err)
    return
  }
}


cdkStackInfo()
