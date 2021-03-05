import moment from 'moment'
/**
 * @param {string} component - component name
 * @return {string} template of functional component
 */
const generateComponent = (component) =>
  `import PropTypes from 'prop-types'

/**
 * @info ${component} (${moment().format('DD MMM YYYY')}) // CREATION DATE
 *
 * @comment ${component} - React component.
 *
 * @since ${moment().format('DD MMM YYYY')} ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @return {ReactComponent}
 */

const ${component} = (props) => {
  // [INTERFACES]
  /*
  code sample: 
  const { data } = props
  */

  // [ADDITIONAL_HOOKS]
  /*
  code sample: 
  const firestore = useFirestore()
  */

  // [COMPONENT_STATE_HOOKS]
  /*
  code sample:
  const singleton = useRef(true) // references also put here
  const [state, setState] = useState({})
  */

  // [HELPER_FUNCTIONS]

  // [COMPUTED_PROPERTIES]
  /* 
    code sample: 
    const userDisplayName = user.firstName + user.lastName
  */

  // [USE_EFFECTS]

  // [TEMPLATE]
  return <div>${component}</div>
}

// [PROPTYPES]
${component}.propTypes = {}

export default ${component}\n`

export default generateComponent
