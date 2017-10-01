export const logger = store => next => reducer => {
  const state = store.getState()
  const nextState = reducer(state)
  console.log('prev', state)
  console.log('next', nextState)
  return next(_ => nextState)
}
