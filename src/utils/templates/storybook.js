import S from 'string'
import { ROOT_FOLDER } from '../../constants'

const generateStories = (component, file, path) => `import React from 'react'
import ${component} from './${file}'

const metadata = {
  title: '${S(S(path).chompRight(`${component}/`)).chompLeft(
    `${ROOT_FOLDER}src/`
  )}${component}',
  component: ${component}
}
export default metadata

export const ${component}Story = (args) => <${component} {...args} />

${component}Story.args = {}\n`

export default generateStories
