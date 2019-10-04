export const getBrowserInfo = () => {
  //浏览器类型及版本
  let message = {};
  let agent = navigator.userAgent.toLowerCase();
  let regStr_ff = /firefox\/[\d.]+/gi
  let regStr_chrome = /chrome\/[\d.]+/gi
  let regStr_saf = /safari\/[\d.]+/gi
  let isIE = agent.indexOf('compatible') > -1 && agent.indexOf('msie' > -1) //判断是否IE<11浏览器
  let isEdge = agent.indexOf('edge') > -1 && !isIE //判断是否IE的Edge浏览器
  let isIE11 = agent.indexOf('trident') > -1 && agent.indexOf('rv:11.0') > -1
  if (isIE) {
    let reIE = new RegExp('msie (\\d+\\.\\d+);')
    reIE.test(agent)
    let fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion === 7) {
      message = 'IE/7'
    } else if (fIEVersion === 8) {
      message = 'IE/8'
    } else if (fIEVersion === 9) {
      message = 'IE/9'
    } else if (fIEVersion === 10) {
      message = 'IE/10'
    }
  } //isIE end
  if (isIE11) {
    message = 'IE/11'
  }
  //firefox
  if (agent.indexOf('firefox') > 0) {
    message = agent.match(regStr_ff)
  }
  //Safari
  if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
    message = agent.match(regStr_saf)
  }
  //Chrome
  if (agent.indexOf('chrome') > 0) {
    message = agent.match(regStr_chrome)
  }
  // Edge
  if (isEdge) {
    message = 'Edge/null'
  }

  let b_name = (message + "").replace(/[0-9./]/ig, ""); //根据正则将所有数字、‘.’‘/’全部去掉，剩下浏览器名
  let b_version = parseInt((message + "").replace(/[^0-9.]/ig, "")); // 根据正则将所有非数字全部去掉，剩下版本

  return {
    name: b_name,
    version: b_version
  }
}
