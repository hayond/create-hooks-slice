import type { Reducer, Action } from "https://esm.sh/redux";
import type { Draft } from "https://esm.sh/immer";
import createNextState from "https://esm.sh/immer";
export type CaseReducer<State = unknown, TypeAction extends Action = Action> = (state: State | Draft<State>, action: TypeAction) => State | void | Draft<State>;
export type CaseReducers<State, TypeAction extends Action = Action> = {
  [key: string]: CaseReducer<State, TypeAction>;
};
export default function createReducer<State, TypeAction extends Action = Action>(initialState: State, caseReducers: CaseReducers<State, TypeAction>): Reducer<State, TypeAction> {
  return function reducer(state = initialState, action): State {
    const caseReducer = caseReducers[action.type];

    if (caseReducer) {
      state = createNextState(state, (draft: Draft<State>) => {
        caseReducer(draft, action);
      });
    }

    return state;
  };
}