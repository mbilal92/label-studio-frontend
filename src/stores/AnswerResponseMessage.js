import { types, getParent } from "mobx-state-tree";

// import Utilities from "../utils";

/**
 * Task Store
 */
const AnswerResponseMessage = types
  .model("AnswerResponseMessage", {
    type: types.number,
    message: types.string,
  })
  .views(self => ({
    get app() {
      return getParent(self);
    },

    /**
     * Return JSON with task data
     * @returns {object}
     */
    // get dataObj() {
    //   if (Utilities.Checkers.isStringJSON(self.data)) {
    //     return JSON.parse(self.data);
    //   } else if (typeof self.data === "object") {
    //     return self.data;
    //   } else {
    //     return null;
    //   }
    // },
  }));

export default AnswerResponseMessage;
