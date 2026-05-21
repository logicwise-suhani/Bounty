function setMinDateTime() {
    const now = new Date();

    now.setSeconds(0);
    now.setMilliseconds(0);

    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - offset * 60000);

    return localDate.toISOString().slice(0, 16);
};

export default setMinDateTime; 