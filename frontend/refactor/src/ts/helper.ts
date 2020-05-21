import { Spinner } from "./spin.js";
export class Helper {
  static keepDiffereces(
    originalContent: { [key: string]: any },
    newContent: { [key: string]: any }
  ): { [key: string]: any } {
    if (Object.keys(originalContent).length != Object.keys(newContent).length)
      return {};
    let res: { [key: string]: any } = {};
    let keys: string[] = Object.keys(originalContent);
    res["id"] = this.sanitize(originalContent["id"]);
    for (let i = 1; i < keys.length; i++) {
      const key = keys[i];
      let a: string = this.sanitize(originalContent[key]);
      let b: string = this.sanitize(newContent[key]);
      if (a !== b) {
        res[key] = b;
      }
    }
    return res;
  }
  static isAdmin() {
    if (sessionStorage.isAdmin == null) return false;
    return JSON.parse(sessionStorage.isAdmin);
  }

  static dynamicResize(
    desiredLength: number,
    parent: HTMLElement,
    childrenType: string
  ) {
    let diff = desiredLength - parent.childElementCount;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        let child = document.createElement(childrenType);
        parent.appendChild(child);
      }
    } else if (diff < 0) {
      for (let i = diff; i < 0; i++) {
        parent.children[parent.childElementCount - 1].remove();
      }
    }
  }

  static tableToJSON(table: HTMLElement, fromRow: number, numOfRows: number) {
    let result: { [key: string]: any }[] = [];
    let headers: string[] = [];

    let thead: HTMLElement = <HTMLElement>table.children[0];
    Array.from(thead.children[0].children).forEach((child) => {
      headers.push((<HTMLElement>child).innerText);
    });

    let tbody: HTMLElement = <HTMLElement>table.children[1];

    for (let i = fromRow; i < fromRow + numOfRows; i++) {
      let obj: { [key: string]: any } = {};
      let cols: HTMLCollection = <HTMLCollection>tbody.children[i].children;
      for (let j = 0; j < cols.length; j++) {
        obj[headers[j]] = (<HTMLElement>cols[j]).innerText;
      }
      result.push(obj);
    }
    return result;
  }

  static jsDom2HTML(element: HTMLElement) {
    let wrap = document.createElement("div");
    wrap.appendChild(element.cloneNode(true));
    return wrap.innerHTML;
  }

  static sanitize(dirtyString: string) {
    return dirtyString.toString().replace(/(\r\n|\n|\r)/gm, "").trim();
  }

  static startLoading() {
    let InvisibleStack: HTMLElement[] = [];
    let loading = <HTMLElement>document.getElementById("loading");
    let app: HTMLElement = <HTMLElement>document.getElementById("app");
    for (let i = 0; i < app.childElementCount; i++) {
      let child: HTMLElement = <HTMLElement>app.children[i];
      if (child.classList.contains("display-none")) InvisibleStack.push(child);
      else child.classList.add("display-none");
    }
    loading.classList.remove("display-none");
    let spinnerDiv = document.createElement("div");
    loading.appendChild(spinnerDiv);
    Helper.createSpinner(spinnerDiv);
    return InvisibleStack;
  }

  static stopLoading(InvisibleStack: HTMLElement[]) {
    let loading = document.getElementById("loading");
    let app: HTMLElement = <HTMLElement>document.getElementById("app");
    loading?.children[0].remove();
    for (let i = 0; i < app.childElementCount; i++) {
      let child = app.children[i];
      child.classList.remove("display-none");
    }
    while (InvisibleStack.length > 0) {
      let element: HTMLElement = <HTMLElement>InvisibleStack.pop();
      element.classList.add("display-none");
    }
  }

  static createSpinner(element: HTMLElement) {
    var opts = {
      lines: 20, // The number of lines to draw
      length: 80, // The length of each line
      width: 15, // The line thickness
      radius: 10, // The radius of the inner circle
      scale: 1, // Scales overall size of the spinner
      corners: 1, // Corner roundness (0..1)
      color: "#000000", // CSS color or array of colors
      fadeColor: "transparent", // CSS color or array of colors
      speed: 1, // Rounds per second
      rotate: 90, // The rotation offset
      animation: "spinner-line-shrink", // The CSS animation name for the lines
      direction: 1, // 1: clockwise, -1: counterclockwise
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      className: "spinner", // The CSS class to assign to the spinner
      top: "50%", // Top position relative to parent
      left: "50%", // Left position relative to parent
      shadow: "0 0 1px white", // Box-shadow for the lines
      position: "absolute", // Element positioning
    };

    var spinner = new Spinner(opts).spin(element);
  }
}
