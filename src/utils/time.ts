export const getTimeStr = () => {
  let hours = new Date().getHours()
  let message = ''
  if (hours <= 9) {
    message = '早上好'
  } else if (hours > 9 && hours <= 12) {
    message = '上午好'
  } else if (hours > 12 && hours <= 18) {
    message = '下午好'
  } else {
    message = '晚上好'
  }
  return message
}
