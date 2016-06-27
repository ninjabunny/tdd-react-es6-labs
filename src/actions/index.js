export const selectAnswer = (index,value) => {
    return {
        type: 'SELECT_ANSWER',
        index,
        value
    };
};