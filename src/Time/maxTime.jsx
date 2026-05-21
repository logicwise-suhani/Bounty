function setMaxDateTime() {
    const maxDate = new Date();

    maxDate.setDate(maxDate.getDate() + 30);

    maxDate.setSeconds(0, 0);

    const offset = maxDate.getTimezoneOffset();
    const localMax = new Date(maxDate.getTime() - offset * 60000);

    return localMax.toISOString().slice(0, 16);
};
export default setMaxDateTime; 