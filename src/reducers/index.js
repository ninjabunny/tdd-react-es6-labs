const initialState = {
    checkedValue: []
};

export default function selector(state = initialState, action = '') {
    switch (action.type) {
        case 'SELECT_ANSWER':
            return Object.assign({}, state, {
                checkedValue: [action.value]
            });
        default:
            return state;
    }
}