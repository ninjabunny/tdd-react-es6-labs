const initialState = {
    checkedValue: []
};

export default function selector(state = initialState, action = '') {
    switch (action.type) {
        case 'SELECT':
            return Object.assign({}, state, {
                checkedValue: [action.value,action.value]
            });
        default:
            return state;
    }
}