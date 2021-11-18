export const getInput = (inputText, actionType) => {
  return {
    type: actionType,
    payload: inputText
  }
}