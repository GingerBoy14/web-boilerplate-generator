const generateTest = (component, file) => `import React from 'react'
import { render } from '@testing-library/react'
import ${component} from '../${file}'

test('Render ${component} test.', () => {
  render(<${component} />)
})\n`

export default generateTest
