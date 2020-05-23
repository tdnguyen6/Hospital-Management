import { Spinner } from "./spin.js";
export class Helper {
    static keepDiffereces(originalContent, newContent, dao) {
        if (Object.keys(originalContent).length != Object.keys(newContent).length)
            return {};
        let res = {};
        let keys = Object.keys(originalContent);
        dao.keys.forEach((key) => {
            res[key] = this.sanitize(originalContent[key]);
        });
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (!dao.keys.includes(key)) {
                let a = this.sanitize(originalContent[key]);
                let b = this.sanitize(newContent[key]);
                if (a != b) {
                    res[key] = b;
                }
            }
        }
        return res;
    }
    static isAdmin() {
        if (sessionStorage.isAdmin == null)
            return false;
        return JSON.parse(sessionStorage.isAdmin);
    }
    static dynamicResize(desiredLength, parent, childrenType) {
        let diff = desiredLength - parent.childElementCount;
        if (diff > 0) {
            for (let i = 0; i < diff; i++) {
                let child = document.createElement(childrenType);
                parent.appendChild(child);
            }
        }
        else if (diff < 0) {
            for (let i = diff; i < 0; i++) {
                parent.children[parent.childElementCount - 1].remove();
            }
        }
    }
    static tableToJSON(table, fromRow = 0, toRow = -1) {
        let result = [];
        let headers = [];
        let thead = table.children[0];
        Array.from(thead.children[0].children).forEach((child) => {
            headers.push(this.sanitize(child.innerText));
        });
        let tbody = table.children[1];
        if (toRow < 0)
            toRow = tbody.childElementCount - 1;
        for (let i = fromRow; i <= toRow; i++) {
            let obj = {};
            let cols = tbody.children[i].children;
            for (let j = 0; j < cols.length; j++) {
                obj[headers[j]] = this.sanitize(cols[j].innerText);
            }
            result.push(obj);
        }
        return result;
    }
    static jsDom2HTML(element) {
        let wrap = document.createElement("div");
        wrap.appendChild(element.cloneNode(true));
        return wrap.innerHTML;
    }
    static sanitize(dirt) {
        if (dirt === "false" || dirt === "true") {
            return +(dirt === "true");
        }
        else if (isNaN(dirt)) {
            return dirt
                .toString()
                .replace(/(\r\n|\n|\r)/gm, "")
                .trim();
        }
        else {
            return +dirt;
        }
    }
    static matchKeys(keys, content) {
        for (let i = 0; i < Object.keys(keys).length; i++) {
            let key = Object.keys(keys)[i];
            if (content[key] != keys[key]) {
                return false;
            }
        }
        return true;
    }
    static startLoading() {
        let InvisibleStack = [];
        let loading = document.getElementById("loading");
        let app = document.getElementById("app");
        for (let i = 0; i < app.childElementCount; i++) {
            let child = app.children[i];
            if (child.classList.contains("display-none"))
                InvisibleStack.push(child);
            else
                child.classList.add("display-none");
        }
        loading.classList.remove("display-none");
        let spinnerDiv = document.createElement("div");
        loading.appendChild(spinnerDiv);
        Helper.createSpinner(spinnerDiv);
        return InvisibleStack;
    }
    static stopLoading(InvisibleStack) {
        let loading = document.getElementById("loading");
        let app = document.getElementById("app");
        loading === null || loading === void 0 ? void 0 : loading.children[0].remove();
        for (let i = 0; i < app.childElementCount; i++) {
            let child = app.children[i];
            child.classList.remove("display-none");
        }
        while (InvisibleStack.length > 0) {
            let element = InvisibleStack.pop();
            element.classList.add("display-none");
        }
    }
    static createSpinner(element) {
        var opts = {
            lines: 20,
            length: 80,
            width: 15,
            radius: 10,
            scale: 1,
            corners: 1,
            color: "#000000",
            fadeColor: "transparent",
            speed: 1,
            rotate: 90,
            animation: "spinner-line-shrink",
            direction: 1,
            zIndex: 2e9,
            className: "spinner",
            top: "50%",
            left: "50%",
            shadow: "0 0 1px white",
            position: "absolute",
        };
        var spinner = new Spinner(opts).spin(element);
    }
    static fillOneRow(content, row, type = "td") {
        Helper.dynamicResize(content.length, row, type);
        for (let i = 0; i < content.length; i++) {
            let col = row.children[i];
            col.innerHTML = content[i];
        }
    }
    static ObjArrToString(ObjArr, joinChar = ";") {
        return ObjArr.map((e) => Object.values(e)).join(joinChar);
    }
    static capFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
