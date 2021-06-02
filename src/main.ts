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
      const stackname = artifactsKeys[0]
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
