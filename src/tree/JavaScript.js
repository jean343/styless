import JavaScriptLess from 'less/lib/less/tree/javascript';

export default class JavaScript extends JavaScriptLess {
  jsify(obj) {
    let result = super.jsify(obj);
    if (/^\[props\[\"/.test(result)) {
      result = result.replace(/"/gm, "\\\"");
    }
    return result;
  }

}
