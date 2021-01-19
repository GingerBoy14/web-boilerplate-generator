import S from 'string'
import { ROOT_FOLDER } from '../constants'
/**
 * @param {string} component - component name
 * @return {string} template of functional component
 */
const generateComponent = (component) =>
  `const ${component} = (props) => {
  return <div>${component}</div>
}

${component}.propTypes = {}
${component}.defaultProps = {}

export default ${component}\n`

const generateConstant = (name) => `const ${name} = {}\nexport { ${name} }\n`

/**
 * @param {string} component - component name
 * @param {string} fileName - component file name
 * @return {string} exported component from his folder
 */
const generateComponentExport = (component, fileName) =>
  `export { default as ${component} } from './${fileName}'\n`

const generateModuleImport = (name, file = false) =>
  `import { ${name} } from './${name}${file ? '.js' : ''}'\n`

const generateStories = (
  component,
  file,
  path
) => `import ${component} from './${file}'

const metadata = {
  title: '${S(S(path).chompRight(`${component}/`)).chompLeft(
    `${ROOT_FOLDER}src/`
  )}${component}',
  component: ${component}
}
export default metadata

const Template = (args) => <${component} {...args} />

export const ${component}Story = Template.bind({})

${component}Story.args = {}\n`

const generateTests = (component, file) => `import React from 'react'
import { render } from '@testing-library/react'
import ${component} from '../${file}'

test('Render ${component} test.', () => {
  render(<${component} />)
})\n`

const generateModuleExport = (items) => `export { ${items} }\n`

export {
  generateComponentExport,
  generateModuleImport,
  generateModuleExport,
  generateConstant,
  generateComponent,
  generateStories,
  generateTests
}
